app.controller('serviciosSemdesController', function ($scope, $timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,$window)
{
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    var fecha         = new Date();
    var ci_solicitante= sessionService.get('CICIUDADANO').toString();
    var fechactual    = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var fechactual123 = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    var nino          = 0;
    var nina          = 0; 
    var adolecenteV   = 0;
    var adolecenteM   = 0;
    var total_gral_v  = 0;
    var total_gral_m  = 0;

    $scope.txtMsgConexionGen = '';
    $scope.txtCiudadanoExiste= '';
    $rootScope.looo          = '';
    $rootScope.laaa          = '';

    $scope.mostrarMsgActividadTrue = false;
    $scope.mostrarMsgActividadFalse= false;
    $scope.tablaTramites           = {};
    $scope.tramitesUsuario         = [];
    
    $scope.servicio = 1;
    $scope.datosGuardados = false;
    var stiporol = sessionService.get('US_IDROL');
    $scope.templates =
    [ { name: 'template0.html', url: '../../../app/index.html'},//no existe en bd
      { name: 'template1.html', url: '../../../app/view/servicios/internet/index.html'},// formulario de internet
      { name: 'template2.html', url: '../../../app/index.html'},//no se creo en bd
      { name: 'template3.html', url: '../../../app/view/registro_ciudadano/regMedico/index.html'},// formulario de salud
      { name: 'template4.html', url: '../../../app/view/servicios/publicidad/index.html'}, //formulario de publicidad
      { name: 'template5.html', url: '../../../app/view/servicios/historial/index.html'}, //formulario de publicidad
      { name: 'template6.html', url: '../../../app/view/servicios/internet/index_2.html'}, //formulario juegos
      { name: 'template7.html', url: '../../../app/view/servicios/semdes/solicitud_viaje2.html'} //formulario viajes
    ];
      
   $scope.cargarZonasCiudadano = function  (idMacro,idzona)
   {
        try{
            var zonas = new zonaLstM();
            zonas.idMacro = idMacro;
            zonas.obtzonaM(function(results)
            { 
                results = JSON.parse(results);
                $scope.zonas = results.success;
                setTimeout(function ()
                {
                    $scope.$apply(function ()
                    { $scope.model.selected.f01_NNA_TER_ZONA_valor = idzona; });
                }, 2000);
                $.unblockUI();
            });
         }catch(e){
            console.log("Error al cargar zona ciudadano!",e);
            $.unblockUI();
        }
    }


    $scope.contadorNna = function (nna) 
    {
        $scope.model.selected = angular.copy(nna);
        $scope.comp = nna;
        angular.forEach($scope.comp, function(nna1, nna2, nna3, nna4, nna5, nna6){});
    }    
    $scope.cargarZonasCiudadanoA = function  (idMacro1,idzona1)
    {
        try{
            var zonas = new zonaLstM();
            zonas.idMacro = idMacro1;
            zonas.obtzonaM(function(results)
            { 
                results = JSON.parse(results);
                $scope.zonas = results.success;
                setTimeout(function ()
                {
                    $scope.$apply(function ()
                    {
                        $scope.modelResp.selectedR.f01_ADUL_TER_ZONA_valor = idzona1;
                    });
                }, 2000);
                $.unblockUI();
            });
        }catch(e){
            console.log("Error al cargar zona ciudadano A!",e);
            $.unblockUI();
        }
    }

    $scope.cargarZonas = function (idMacro)
    {
        try{
            var combo = document.getElementById('f01_NNA_TER_MACRO_valor');
            var elegido = combo.options[combo.selectedIndex].text;
            $scope.model.selected.f01_NNA_TER_MACRO =elegido;
            var zonas = new zonaLstM();
            zonas.idMacro = idMacro;
            zonas.obtzonaM(function(results)
            { 
                results = JSON.parse(results);
                $scope.zonas = results.success;
                $.unblockUI();
            });
         }catch(e){
            console.log("Error al cargar Zonas!",e);
            $.unblockUI();
        }
    } 

    $scope.zonaValor = function(valor)
    {
        var combo = document.getElementById('f01_NNA_TER_ZONA_valor');
        var elegido = combo.options[combo.selectedIndex].text;
        $scope.model.selected.f01_NNA_TER_ZONA =elegido;
    };

    $scope.cargarZonasA = function (idMacro1)
    {
        try{
            var combo = document.getElementById('f01_ADUL_TER_MACRO_valor');
            var elegido = combo.options[combo.selectedIndex].text;
            $scope.modelResp.selectedR.f01_ADUL_TER_MACRO =elegido;
            var zonas = new zonaLstM();
            zonas.idMacro = idMacro1;
            zonas.obtzonaM(function(results)
            { 
                results = JSON.parse(results);
                $scope.zonas = results.success;
                $.unblockUI();
            });
         }catch(e){
            console.log("Error al cargar Zonas A!",e);
            $.unblockUI();
        }
    }

    $scope.zonaValorA = function(valor)
    {    
        var combo = document.getElementById('f01_ADUL_TER_ZONA_valor');
        var elegido = combo.options[combo.selectedIndex].text;
        $scope.modelResp.selectedR.f01_ADUL_TER_ZONA =elegido;
    } 

    $scope.mostrarServicios = function(){};    
    
    $scope.serivicosInternet = 
    [ 
        { name: 'Verificación de Documentos para Autorización de Viaje', id:'7'}
    ];

    $scope.crearTramiteSemdes = function()
    {
        if($scope.serivicosInternet)
        {            
            var idTipoTramite = $scope.serivicosInternet[0].id;
            $scope.adicionarServicioGamlp(idTipoTramite);
        }
        nino        = 0;
        nina        = 0;
        adolecenteV = 0;
        adolecenteM = 0;
        total_gral_v= 0;
        total_gral_m= 0;
        href="#registro_ciudadano|servicios|index2.html"
    };

    $scope.seleccionarProceso = function(proceso)
    {
        $scope.procesoSeleccionado = proceso.id;
        $scope.btnNuevoTramtite    = false;
    };

    $scope.limpiarFormTramite = function()
    {
        $scope.procesoSeleccionado = "";
        $scope.btnNuevoTramtite    = true;
    };

    $scope.template  = "";
    var aDocAdjuntos = new Array();

    //RECUPERANDO DATOS DEL REGISTRO CIUDADANO    
    $scope.recuperandoDatosInicialesCiudadano = function()
    {
        $scope.datosIniciales = "";
        var datosForm         = {};            
        var idCiudadano       = sessionService.get('IDUSUARIO');
        var sTipoPersona      = "";
        var recuperarDatos    = new rcNatural();
        recuperarDatos.oid    = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function(resultado)
        {
            resultadoApi       = JSON.parse(resultado);
            datos              = resultadoApi;
            sTipoPersona       = resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona= resultadoApi[0].dtspsl_tipo_persona;
            $scope.ci_anv      = resultadoApi[0].dtspsl_file_fotocopia_ci;
            $scope.ci_rev      = resultadoApi[0].dtspsl_file_fotocopia_ci_r;
            fechactual         = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
         
            if(sTipoPersona == 'NATURAL')
            {
                datosForm['INT_SOLICITANTE'] = datos[0].dtspsl_nombres + " " + datos[0].dtspsl_paterno + " " + datos[0].dtspsl_materno;
                datosForm['INT_TIPO_DOC_IDENTIDAD'] = "CI";
                datosForm['INT_NUM_DOC'] = datos[0].dtspsl_ci;
                datosForm['INT_EXP'] = datos[0].dtspsl_expedido;
                datosForm['INT_CORREO'] = datos[0].dtspsl_correo;
                datosForm['INT_TEL_CELULAR'] = datos[0].dtspsl_movil;                    
                datosForm['INT_TEL'] = datos[0].dtspsl_telefono;
                datosForm['INT_FEC_SOLICITUD'] = fechactual;
                datosForm['CI_BIGDATA'] = datos[0]._id;
                datosForm['INT_PRIMER_NOMBRE'] = datos[0].dtspsl_nombres;
                datosForm['INT_PATERNO'] = datos[0].dtspsl_paterno;
                datosForm['INT_MATERNO'] = datos[0].dtspsl_materno;
                datosForm['INT_FEC_NACIMIENTO'] = datos[0].dtspsl_fec_nacimiento;
                datosForm['INT_MACRODISTRITO'] = datos[0].dtspsl_macrodistrito;
                datosForm['INT_DISTRITO'] = datos[0].dtspsl_distrito;
                datosForm['INT_NUMERO_DOMICILIO'] = '';
                datosForm['INT_TIPO_VIA'] = '';
                datosForm['INT_OCUPACION'] = datos[0].dtspsl_ocupacion;
                datosForm['INT_DIRECCION'] = datos[0].dtspsl_direccion;
                datosForm['TIPO'] = "AE_INT_EMISION";
                datosForm['INT_DENOMINACION'] = datos[0].INT_DENOMINACION;
                datosForm['INT_AC_SUPERFICIE'] = "";
                datosForm['INT_AC_HR_INICIO'] = "";
                datosForm['INT_AC_HR_FINAL'] = "";
                datosForm['INT_AC_ESTADO'] = "";
                datosForm['INT_AC_MACRO'] = "";
                datosForm['INT_AC_ZONA'] = "";
                datosForm['INT_AC_TIP_VIA'] = "";
                datosForm['INT_AC_NOMBRE_VIA'] = "";
                datosForm['INT_AC_NUMERO'] = "";
                datosForm['INT_AC_EDIFICIO'] = "";
                datosForm['INT_AC_BLOQUE'] = "";
                datosForm['INT_AC_PISO'] = "";
                datosForm['INT_AC_NUME'] = "";
                datosForm['INT_AC_TEL'] = "";
                datosForm['INT_AC_COR'] = "";
                datosForm['INT_AC_MACRO_ID'] = "";
                datosForm['INT_TIPO_CONTRIBUYENTE'] = datos[0].dtspsl_tipo_persona;                    
                //DATOS INICIALES DE LA PERSONA NATURAL
                datosForm['INT_MACRO']=datos[0].dtspsl_macrodistrito;
                datosForm['INT_ZONA']=datos[0].dtspsl_zona;                                        
                datosForm['INT_VIA']=datos[0].dtspsl_tipo_via;
                datosForm['INT_NOMBRE_VIA']=datos[0].dtspsl_nombre_via;
                datosForm['INT_NUM']=datos[0].dtspsl_numero_casa;
                datosForm['INT_EDIF']=datos[0].dtspsl_edificio;
                datosForm['INT_BLOQUE']=datos[0].dtspsl_bloque;
                datosForm['INT_PISO']=datos[0].dtspsl_piso;
                datosForm['INT_NUM_DEP']=datos[0].dtspsl_oficina;
                datosForm['INT_DIR_DET']=datos[0].dtspsl_direccion;
                datosForm['INT_TIP_VIA']='';
                datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
            }
            else
            {
                datosForm['INT_TIPO_DOC_IDENTIDAD'] = "NIT";
                datosForm['INT_NUM_DOC'] = datos[0].dtspsl_ci_representante;
                datosForm['INT_EXP'] = datos[0].dtspsl_expedido;//?
                datosForm['INT_CORREO'] = datos[0].dtspsl_correo;
                datosForm['INT_TEL_CELULAR'] = datos[0].dtspsl_movil;
                datosForm['INT_TEL'] = datos[0].dtspsl_telefono;                    
                datosForm['INT_FEC_SOLICITUD'] = fechactual;
                datosForm['CI_BIGDATA'] = datos[0]._id;
                datosForm['INT_FEC_NACIMIENTO'] = datos[0].dtspsl_fec_nacimiento;
                datosForm['TIPO'] = "AE_INT_EMISION";
                datosForm['INT_DENOMINACION'] = datos[0].INT_DENOMINACION;
                datosForm['INT_AC_SUPERFICIE'] = "";
                datosForm['INT_AC_HR_INICIO'] = "";
                datosForm['INT_AC_HR_FINAL'] = "";
                datosForm['INT_AC_ESTADO'] = "";
                datosForm['INT_AC_MACRO'] = "";
                datosForm['INT_AC_ZONA'] = "";
                datosForm['INT_AC_TIP_VIA'] = "";
                datosForm['INT_AC_NOMBRE_VIA'] = "";
                datosForm['INT_AC_NUMERO'] = "";
                datosForm['INT_AC_EDIFICIO'] = "";
                datosForm['INT_AC_BLOQUE'] = "";
                datosForm['INT_AC_PISO'] = "";
                datosForm['INT_AC_NUME'] = "";
                datosForm['INT_AC_NUME'] = "";
                datosForm['INT_AC_TEL'] = "";
                datosForm['INT_AC_COR'] = "";    
                datosForm['INT_AC_MACRO_ID'] = "";                   
                //DATOS INICIALES PERSONERIA JURIDICA
                datosForm['INT_RL_NIT'] = datos[0].dtspsl_nit;
                datosForm['INT_RL_RAZON_SOCIAL'] = datos[0].dtspsl_razon_social;
                datosForm['INT_RL_TIPO_DOCUMENTO'] = "";
                datosForm['INT_RL_NUM_DOCUMENTO'] = "";
                datosForm['INT_TIPO_CONTRIBUYENTE'] = datos[0].dtspsl_tipo_persona;  
                //DATOS COMPLEMENTARIOS JURIDICO                    
                datosForm['INT_RL_FEC_EMISION_DOCUMENTO'] = "2016-03-2016";//*** crear fecha emision  
                datosForm['INT_NUM_NOTARIA'] = datos[0].dtspsl_nro_notaria;
                datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";//*** crear nacionalidad
                datosForm['INT_RL_FEC_NACIMIENTO'] = datos[0].dtspsl_fec_nacimiento;
                datosForm['INT_NIT'] = datos[0].dtspsl_nit;
            }

            if(datos[0].dtspsl_ci_representante != null)
            {
                var filtro= '{"dtspsl_ci":"'+ datos[0].dtspsl_ci_representante + '","dtspsl_estado":"ACTIVO"}';
                var resRepLegalMongo   = new reglasnegocio();
                resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_179";
                resRepLegalMongo.parametros = filtro;
                resRepLegalMongo.llamarregla(function(results)
                {
                    var repLegalmongo = JSON.parse(results);
                    var repLegalmongo = results1.record;
                    var dtsNombres    = ((typeof(repLegalmongo.dtspsl_nombres) == 'undefined') ? "" : repLegalmongo.dtspsl_nombres);
                    var dtsPaterno    = ((typeof(repLegalmongo.dtspsl_paterno) == 'undefined') ? "" : repLegalmongo.dtspsl_paterno);
                    var dtsMaterno    = ((typeof(repLegalmongo.dtspsl_materno) == 'undefined') ? "" : repLegalmongo.dtspsl_materno); 
                    datosForm['INT_SOLICITANTE']      = dtsNombres + ' ' + dtsPaterno + ' ' + dtsMaterno;
                    datosForm['INT_RL_PRIMER_NOMBRE'] = ((typeof(repLegalmongo.dtspsl_nombres) == 'undefined') ? "" :repLegalmongo.dtspsl_nombres);
                    datosForm['INT_RL_PATERNO']       = ((typeof(repLegalmongo.dtspsl_paterno) == 'undefined') ? "" :repLegalmongo.dtspsl_paterno);
                    datosForm['INT_RL_MATERNO']       = ((typeof(repLegalmongo.dtspsl_materno) == 'undefined') ? "" :repLegalmongo.dtspsl_materno);
                    //DATOS DEL REPRESENTANTE LEGAL
                    datosForm['INT_MACRO']            = ((typeof(repLegalmongo.dtspsl_macrodistrito) == 'undefined') ? "" :repLegalmongo.dtspsl_macrodistrito);
                    datosForm['INT_ZONA']             = ((typeof(repLegalmongo.dtspsl_zona) == 'undefined') ? "" :repLegalmongo.dtspsl_zona);
                    datosForm['INT_VIA']              = ((typeof(repLegalmongo.dtspsl_tipo_via) == 'undefined') ? "" :repLegalmongo.dtspsl_tipo_via);
                    datosForm['INT_NOMBRE_VIA']       = ((typeof(repLegalmongo.dtspsl_nombre_via) == 'undefined') ? "" :repLegalmongo.dtspsl_nombre_via);
                    datosForm['INT_NUM']              = ((typeof(repLegalmongo.dtspsl_numero_casa) == 'undefined') ? "" :repLegalmongo.dtspsl_numero_casa);
                    datosForm['INT_EDIF']             = ((typeof(repLegalmongo.dtspsl_edificio) == 'undefined') ? "" :repLegalmongo.dtspsl_edificio);
                    datosForm['INT_BLOQUE']           = ((typeof(repLegalmongo.dtspsl_bloque) == 'undefined') ? "" :repLegalmongo.dtspsl_bloque);
                    datosForm['INT_PISO']             = ((typeof(repLegalmongo.dtspsl_piso) == 'undefined') ? "" :repLegalmongo.dtspsl_piso);
                    datosForm['INT_NUM_DEP']          = ((typeof(repLegalmongo.dtspsl_oficina) == 'undefined') ? "" :repLegalmongo.dtspsl_oficina);
                    datosForm['INT_DIR_DET']          = ((typeof(repLegalmongo.dtspsl_direccion) == 'undefined') ? "" :repLegalmongo.dtspsl_direccion);
                    datosForm['INT_TIP_VIA']          = '';
                }); 
            }
            //VALIDANDO CAMPOS
            if(!datos[0].dtspsl_expedido){
                datosForm['INT_EXP']    =   'LPZ';
            }
            $scope.datosIniciales = datosForm;
        });
    };

    $scope.recuperandoDatosGenesis = function()
    {
        var tipoContribuyente = sessionService.get('TIPO_PERSONA');
        var ciDocumento       = '';//sessionService.get('CICIUDADANO'));
        var nitDocumento      = '';//sessionService.get('CICIUDADANO'));
        var sAccion           = '';//sessionService.get('CICIUDADANO'));
        
        if(tipoContribuyente == 'NATURAL')
        {
            ciDocumento = sessionService.get('CICIUDADANO');
            sAccion     = 'C01';
        }
        else if(tipoContribuyente == 'JURIDICO')
        {
            nitDocumento = sessionService.get('NITCIUDADANO');
            sAccion      = 'C02';
        }
        var paramPersona = {
            "procedure_name":"GENERAL.spDatosContribuyente",
            "body":{"params": [
                {"name":"idContribuyente","param_type":"IN","value":""},
                {"name":"clase","param_type":"IN","value":""},
                {"name":"padron","param_type":"IN","value":""},//datos.vpmc
                {"name":"identificacion","param_type":"IN","value": ciDocumento},//datos.vci
                {"name":"primerNombre","param_type":"IN","value":""},//datos.vnombre
                {"name":"primerApellido","param_type":"IN","value":""},//datos.vappaterno
                {"name":"segundoApellido","param_type":"IN","value":""},//datos.vapmaterno
                {"name":"nit","param_type":"IN","value": nitDocumento},
                {"name":"empresa","param_type":"IN","value":""},
                {"name":"p_accion","param_type":"IN","value":sAccion}
            ]}
        };
        //CONEXION GENESIS - RC
        try{
            var obj=DreamFactory.api[CONFIG.SERVICEGENESIS].callStoredProcWithParams(paramPersona);            
            obj.success(function(response){
                $scope.txtMsgConexionGen = "";
                if(response.length > 0)
                {
                    $scope.dataGenesisCidadano = response;
                }
                else
                {
                    $scope.dataGenesisCidadano = {};
                }
            })
            obj.error(function(response)
            {
                $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
            });
        }catch(e){
            $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";            
        };
    };

    $scope.tramitesCiudadano = function()
    {
        sIdCiudadano= sessionService.get('IDSOLICITANTE');
        var sparam  = new reglasnegocio();
        sparam.identificador = "RCCIUDADANO_79";
        sparam.parametros='{"sidciudadano":"' + sIdCiudadano + '"}';
        sparam.llamarregla(function(results)
        {
            results = JSON.parse(results);
            $scope.tramites = results;     
            angular.forEach(results,function(val, index)
            {
             if(val['form_contenido'])
             {
               results[index].datos = val['form_contenido'];
             }
            });
            $scope.tramitesUsuario = results;
            $scope.tablaTramites.reload();
        });
    };

    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: { vtra_id: 'desc' }
    },{
        total: $scope.tramitesUsuario.length,
        getData: function($defer, params)
        {
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
       
    $scope.iniciandoDatos = function()
    {
        var datosIniciales= $scope.datosIniciales;
        var fechactual    = obtFechaActual.obtenerFechaActual();
        $scope.datos      = {};
        var datosForm_inicio = {};   
        datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
        datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
        datosForm_inicio['INT_SOLICITANTE'] = datosIniciales.INT_SOLICITANTE;
        datosForm_inicio['INT_TIPO_DOC_IDENTIDAD'] = datosIniciales.INT_TIPO_DOC_IDENTIDAD;
        datosForm_inicio['INT_NUM_DOC'] = datosIniciales.INT_NUM_DOC;
        datosForm_inicio['INT_EXP'] = datosIniciales.INT_EXP;
        datosForm_inicio['INT_CORREO'] = datosIniciales.INT_CORREO;
        datosForm_inicio['INT_TEL_CELULAR'] = datosIniciales.INT_TEL_CELULAR;
        datosForm_inicio['INT_TEL'] = datosIniciales.INT_TEL;
        datosForm_inicio['INT_FEC_NACIMIENTO'] = datosIniciales.INT_FEC_NACIMIENTO;
        datosForm_inicio['INT_MATERNO'] = datosIniciales.INT_MATERNO;
        datosForm_inicio['INT_PATERNO'] = datosIniciales.INT_PATERNO;
        datosForm_inicio['INT_PRIMER_NOMBRE'] = datosIniciales.INT_PRIMER_NOMBRE;        
        //DATOS INICIALES PERSONA JURIDICA
        datosForm_inicio['INT_RL_NIT'] = datosIniciales.INT_RL_NIT;
        datosForm_inicio['INT_RL_RAZON_SOCIAL'] = datosIniciales.INT_RL_RAZON_SOCIAL;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = "";
        datosForm_inicio['INT_RL_NUM_DOCUMENTO'] = "";
        datosForm_inicio['INT_TIPO_CONTRIBUYENTE'] = datosIniciales.INT_TIPO_CONTRIBUYENTE;
        //INT_RL_PRIMER_NOMBRE
        datosForm_inicio['INT_RL_PRIMER_NOMBRE'] = datosIniciales.INT_RL_PRIMER_NOMBRE;
        datosForm_inicio['INT_RL_PATERNO'] = datosIniciales.INT_RL_PATERNO;
        datosForm_inicio['INT_RL_MATERNO'] = datosIniciales.INT_RL_MATERNO;
        //DATOS INICIALES PERSONA NATURAL
        datosForm_inicio['INT_MACRO']=datosIniciales.INT_MACRO;      
        datosForm_inicio['INT_ZONA']=datosIniciales.INT_ZONA;                                      
        datosForm_inicio['INT_VIA']=datosIniciales.INT_VIA;
        datosForm_inicio['INT_NOMBRE_VIA']=datosIniciales.INT_NOMBRE_VIA;
        datosForm_inicio['INT_NUM']=datosIniciales.INT_NUM;
        datosForm_inicio['INT_EDIF']=datosIniciales.INT_EDIF;
        datosForm_inicio['INT_BLOQUE']=datosIniciales.INT_BLOQUE;
        datosForm_inicio['INT_PISO']=datosIniciales.INT_PISO;
        datosForm_inicio['INT_NUM_DEP']=datosIniciales.INT_NUM_DEP;
        datosForm_inicio['INT_DIR_DET']=datosIniciales.INT_DIR_DET;
        //DATOS INCIALES PERSONA JURIDICA
        datosForm_inicio['INT_RL_FEC_EMISION_DOCUMENTO']=datosIniciales.INT_RL_FEC_EMISION_DOCUMENTO;        
        datosForm_inicio['INT_NUM_NOTARIA']=datosIniciales.INT_NUM_NOTARIA;
        datosForm_inicio['INT_NACIONALIDAD']=datosIniciales.INT_NACIONALIDAD;
        datosForm_inicio['INT_RL_FEC_NACIMIENTO']=datosIniciales.INT_RL_FEC_NACIMIENTO;
        datosForm_inicio['INT_NIT']=datosIniciales.INT_NIT;
        datosForm_inicio['INT_TIP_VIA']=datosIniciales.INT_TIP_VIA;
        $scope.datos = datosForm_inicio;
        $scope.ninosviajan = datosForm_inicio;
        $scope.ninosviajanA = datosForm_inicio;
    };
        
    $scope.bloquearBtnEnviarForm = function(){ $scope.botones = null;};
    
    //ALMACENAR DOCUMENTOS - GESTION DOCUMENTAL
    $scope.almacenarGDocumental = function(dataArchivo, sUrl)
    {
        var valores= "";
        var cadena = "";
        var nombreFile = dataArchivo.name;
        //VALORES GESTION DOCUMENTAL
        var subirU = {};
        subirU['doc_sistema'] = 'RC_CLI'; 
        subirU['doc_proceso'] = 'ADJUNTO';
        subirU['doc_ci_nodo'] = 'DMS';
        subirU['doc_datos']   = valores;        
        subirU['doc_version'] ='1';      
        subirU['doc_tiempo']  = '0';      
        subirU['doc_firma_digital'] = 0;      
        subirU['doc_acceso']  = "";
        subirU['doc_tipo_documento']= "pdf";      
        subirU['doc_tamanio_documento'] = "0";          
        subirU['doc_tps_doc_id'] = '1';//data.vtps_doc_id
        subirU['doc_tipo_documentacion'] = 'U';      
        subirU['doc_tipo_ingreso'] = 'I';      
        subirU['doc_estado_de_envio'] = 'N';      
        subirU['doc_correlativo'] = '';
        subirU['doc_tipo_documento_ext'] = '';
        subirU['doc_nrotramite_nexo'] = '';
        subirU['doc_id_carpeta'] = '';
        subirU['doc_registro'] = fechactual;
        subirU['doc_modificacion'] = fechactual;
        subirU['doc_usuario'] = sessionService.get('USUARIO');
        subirU['doc_estado'] = 'A';
        subirU['doc_url'] = sUrl;
        subirU['doc_url_logica'] = cadena;
        subirU['doc_nombre'] = nombreFile;
        var ressubirU = {
            table_name:"dms_gt_documentos",
            body:subirU
        };
    };
    
    //ALMACENAR DOCUMENTOS DREAMFACTORY
    $scope.almacenarDocumentos = function(aFiles)
    {
        var sDirTramite = $rootScope.tramiteId;
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aFiles, function(archivo, key)
        {
            if(typeof(archivo) != 'undefined')
            {
                var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
                $scope.almacenarGDocumental(archivo, urlIdcos);
            }
            else
            {
                console.log("Error en el archivo");
            }
        });
    };

    //Almacenando servicios
    $scope.adicionarServicioGamlp = function(datos)
    {    
        var fecha        = new Date();
        var fechactual   = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio  = datos;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite= fechactual;
        var idusu        = 3;
        var aServicio    = new reglasnegocio();
        aServicio.identificador = "RCCIUDADANO_68";
        aServicio.parametros ='{"frm_tra_dvser_id":"' + sIdServicio + '","frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
        aServicio.llamarregla(function(data)
        {
            $.blockUI();
            $scope.tramitesCiudadano();
            sweet.show('', 'Registro almacenado correctamente', 'success');
            $('#registro').modal('hide');
            $scope.getCaptchasX();
        });
    }

    $scope.serializarInformacionViajes = function(obj)
    {
        var fechactual = obtFechaActual.obtenerFechaActual();
        var misDocs    = new Array();
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS_AMBIENTE);
        misDocs.push($scope.FILE_CERTIFICADO_PENAL);

        try {
            var datosSerializados=  JSON.stringify(obj);
            var idCiudadano      = sessionService.get('IDSOLICITANTE');
            var idTramite        = sessionService.get('IDTRAMITE');
            var idServicio       = sessionService.get('IDSERVICIO');
            var Parametros       = new datosFormularios();
            Parametros.frm_tra_dvser_id = idServicio;
            Parametros.data_json = datosSerializados;
            Parametros.frm_tra_id_ciudadano = idCiudadano;
            Parametros.frm_tra_id_usuario = 1;
            Parametros.frm_idTramite = idTramite;
            $rootScope.btnGuardarForm   =   true;
            $.blockUI();
            Parametros.sp_crear_datos_formulario(function(results){ 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0)
                {
                    $.unblockUI();
                    $rootScope.btnGuardarForm   =   false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                }
                else
                {
                    $.unblockUI();
                    sweet.show('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e){
            console.log("Error al serializar la informacion de Viajes",e);
            $.unblockUI();
        }

    };
    //ALMACENANDO FORMULARIO
    $scope.serializarInformacion = function(obj)
    {
        var fechactual          = obtFechaActual.obtenerFechaActual();        
        var misDocs             = new Array();
        //CONVIRTIENDO LOS CAMPOS A MAYUSCULAS
        obj.INT_AC_NOMBRE_VIA   =   ((typeof(obj.INT_AC_NOMBRE_VIA) == 'undefined' || obj.INT_AC_NOMBRE_VIA == null) ? ""   : obj.INT_AC_NOMBRE_VIA.toUpperCase());
        obj.INT_DENOMINACION    =   ((typeof(obj.INT_DENOMINACION)  == 'undefined' || obj.INT_DENOMINACION == null) ? ""    : obj.INT_DENOMINACION.toUpperCase());
        obj.INT_AC_EDIFICIO     =   ((typeof(obj.INT_AC_EDIFICIO)   == 'undefined' || obj.INT_AC_EDIFICIO == null) ? ""     : obj.INT_AC_EDIFICIO.toUpperCase());
        obj.INT_AC_NUMERO       =   ((typeof(obj.INT_AC_NUMERO)     == 'undefined' || obj.INT_AC_NUMERO == null) ? ""       : obj.INT_AC_NUMERO.toUpperCase());
        obj.INT_AC_BLOQUE       =   ((typeof(obj.INT_AC_BLOQUE)     == 'undefined' || obj.INT_AC_BLOQUE == null) ? ""       : obj.INT_AC_BLOQUE.toUpperCase());
        obj.INT_AC_PISO         =   ((typeof(obj.INT_AC_PISO)       == 'undefined' || obj.INT_AC_PISO == null) ? ""         : obj.INT_AC_PISO.toUpperCase());
        obj.INT_AC_NUME         =   ((typeof(obj.INT_AC_NUME)       == 'undefined' || obj.INT_AC_NUME == null) ? ""         : obj.INT_AC_NUME.toUpperCase());
        obj.INT_FEC_SOLICITUD   =   ((typeof(obj.INT_FEC_SOLICITUD) == 'undefined' || obj.INT_FEC_SOLICITUD == null) ? ""   : fechactual);
        obj.INT_DIR_DET         =   ((typeof(obj.INT_DIR_DET)       == 'undefined' || obj.INT_DIR_DET == null) ? ""         : obj.INT_DIR_DET.toUpperCase());
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS_AMBIENTE);
        misDocs.push($scope.FILE_CERTIFICADO_PENAL);
        //RECUPERANDO ADJUNTOS
        $scope.almacenarDocumentos(misDocs);
        try {
            $.blockUI();
            var datosSerializados   =  JSON.stringify(obj);
            var idCiudadano         = sessionService.get('IDSOLICITANTE');
            var idTramite           = sessionService.get('IDTRAMITE');
            var idServicio          = sessionService.get('IDSERVICIO');
            var Parametros = new datosFormularios();
            Parametros.frm_tra_dvser_id = idServicio;
            Parametros.data_json = datosSerializados;
            Parametros.frm_tra_id_ciudadano = idCiudadano;
            Parametros.frm_tra_id_usuario = 1;
            Parametros.frm_idTramite = idTramite;
            $rootScope.btnGuardarForm   =   true;
            Parametros.sp_crear_datos_formulario(function(results)
            { 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0)
                {
                    $.unblockUI();
                    $rootScope.btnGuardarForm = false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                }
                else
                {
                    $.unblockUI();
                    sweet.show('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e){
            console.log("Error al serializar la informacion",e);
            $.unblockUI();
        }
    };

    $scope.confirmarServicioGamlp = function(dat)
    {
        if($scope.procesoSeleccionado != '')
        {
            $scope.adicionarServicioGamlp($scope.procesoSeleccionado);
        }
    }
     $rootScope.TipoAutorizacion1 = function(DDD)
     {  
        if(DDD=='1-F')
        {
            var vallll='../catastro/img/caso1.png';
        }
        if(DDD=='2-F')
        {
            var vallll='../catastro/img/caso2.png';
        }
        if(DDD=='3-F')
        {
            var vallll='../catastro/img/caso3.png';
        }
        if(DDD=='4-F')
        {
            var vallll='../catastro/img/caso4.png';
        }
        if(DDD=='5-D')
        {
            var vallll='../catastro/img/caso5.png';
        }        
        $scope.ooooo = vallll;
    }; 
    $scope.$on('api:ready',function()
    {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.recuperandoDatosGenesis();
    });
    
    $scope.inicioServicios = function ()
    {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano(); 
        $scope.recuperandoDatosGenesis();
    };
    $scope.validarFecha = function (fech , edad)
    {
        fecNacimiento = fech;
        if (fecNacimiento.getDate() < 10)
        {
            dia = "0" + fecNacimiento.getDate();
        }
        else
        {
            dia = fecNacimiento.getDate();
        }
        mes = fecNacimiento.getMonth() + 1;
        if ( mes < 10)
        {
            mes = "0" + mes;
        }
        else
        {
            mes = mes;
        }
        fecNacimiento1 = fecNacimiento.getFullYear() + "-" + mes + "-" + dia; 

        $scope.c = moment(fecNacimiento1, "YYYY-MM-DD");
        $scope.d = moment(fechactual123, "YYYY-MM-DD");
        
        if ($scope.c <= $scope.d){}
        else
        {
            sweet.show('', "La fecha nacimiento debe ser menor a la fecha actual", 'error');
            $scope.model.selected.f01_NNA_G_FEC_NAC=''; 
            $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC='';
        }
        var ed = parseInt(($scope.d - $scope.c)/365/24/60/60/1000);
        if (edad==17 && ed >= 18)
        {
            sweet.show('NO CORRESPONDE', "El ciudadano es mayor de edad", 'error');
            $scope.model.selected.f01_NNA_G_FEC_NAC=''; 
        }
        if (edad==18 && ed < 18)
        {
            sweet.show('NO CORRESPONDE', "El ciudadano es menor de edad", 'error');
            $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC='';
        }
    };
    $scope.validarFechaMenor = function (fech)
    {
        fecNacimiento = fech;
        if (fecNacimiento.getDate() < 10)
        {
            dia = "0" + fecNacimiento.getDate();
        }
        else
        {
            dia = fecNacimiento.getDate();
        }
        mes = fecNacimiento.getMonth() + 1;
        if ( mes < 10)
        {
            mes = "0" + mes;
        }
        else
        {
            mes = mes;
        }
        fecNacimiento1 = fecNacimiento.getFullYear() + "-" + mes + "-" + dia; 
        $scope.e = moment(fecNacimiento1, "YYYY-MM-DD");
        $scope.r = moment(fechactual123, "YYYY-MM-DD");

        if ($scope.e >= $scope.r){}
        else
        {    
            sweet.show('', "La fecha de Caducidad debe ser mayor a la fecha actual", 'error');
            $scope.model.selected.f01_NNA_F_CADUC_CI='';
            $scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI='';
        }
    };
    $scope.verMacrodistrito = function(DescMacro,IdMacro)
    {
        if (DescMacro==="")
        {
            switch(IdMacro)
            {
                case "1":
                    macroNuevo ="MACRODISTRITO COTAHUMA";
                    break;
                case "2":
                    macroNuevo ="MACRODISTRITO MAXILIANO PAREDES";
                    break;
                case "3":
                    macroNuevo ="MACRODISTRITO PERIFÉRICA";
                    break;
                case "4":
                    macroNuevo ="MACRODISTRITO SAN ANTONIO";
                    break;
                case "5":
                    macroNuevo ="MACRODISTRITO SUR";
                    break;
                case "6":
                    macroNuevo ="MACRODISTRITO MALLASA";
                    break;
                case "7":
                    macroNuevo ="MACRODISTRITO CENTRO";
                    break;
                case "8":
                    macroNuevo ="MACRODISTRITO HAMPATURI";
                    break;
                case "9":
                    macroNuevo ="MACRODISTRITO ZONGO";
                    break;
                case "10":
                    macroNuevo ="OTRO";
                    break;
            }
        }
        else
        {
            macroNuevo = DescMacro;
        }
        return macroNuevo;
    };  

    $scope.consultaRC_CI = function(tipoPersona, numeroDoc, opcion, campo, flagTextCambio,tipoDocumento)
    { 
        if(tipoDocumento=="CI")
        {
          if(flagTextCambio == 1)
          {
            $scope.textCambio = "0";
            var buscarCiudadano = new rcNatural();
            buscarCiudadano.tipo_persona = "NATURAL";
            buscarCiudadano.ci = numeroDoc;
            buscarCiudadano.buscarPersona(function(resultado)
            {
                results = JSON.parse(resultado);
                if(results.length > 0)
                {
                    var rcExpedido = ((typeof(results[0].dtspsl_expedido) == 'undefined') ? "" : results[0].dtspsl_expedido);
                    var rcNombre = ((typeof(results[0].dtspsl_nombres) == 'undefined') ? "" : results[0].dtspsl_nombres);
                    var rcPaterno = ((typeof(results[0].dtspsl_paterno) == 'undefined') ? "" : results[0].dtspsl_paterno);
                    var rcMaterno = ((typeof(results[0].dtspsl_materno) == 'undefined') ? "" : results[0].dtspsl_materno);
                    fec12345679 = new Date (results[0].dtspsl_fec_nacimiento);
                    if (fec12345679.getDate() < 10)
                    {
                        dia = "0" + fec12345679.getDate();
                    }
                    else
                    {
                        dia = fec12345679.getDate();
                    }
                    mes = fec12345679.getMonth() + 1;
                    if( mes < 10)
                    {
                        mes = "0" + mes;
                    }
                    else
                    {
                        mes = mes;
                    }
                    fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia; 
                    var rcFecNacimiento = ((typeof(results[0].dtspsl_fec_nacimiento) == 'undefined') ? "" : fechaNacOficial);
                    var rcDireccion = ((typeof(results[0].dtspsl_direccion) == 'undefined') ? "" : results[0].dtspsl_direccion);
                    var rcTelefono = ((typeof(results[0].dtspsl_telefono) == 'undefined') ? "" : results[0].dtspsl_telefono);
                    var rcMovil = ((typeof(results[0].dtspsl_movil) == 'undefined') ? "" : results[0].dtspsl_movil);
                    fec987654321 = new Date (results[0].dtspsl_fec_vencimiento);
                    if (fec987654321.getDate() < 10)
                    {
                        dia = "0" + fec987654321.getDate();
                    }
                    else
                    {
                        dia = fec987654321.getDate();
                    }
                    mes = fec987654321.getMonth() + 1;
                    if ( mes < 10)
                    {
                        mes = "0" + mes;
                    }
                    else 
                    {
                        mes = mes;
                    }
                    fechaCadOficial = fec987654321.getFullYear() + "-" + mes + "-" + dia; 
                    var rcCaducidad = ((typeof(results[0].dtspsl_fec_vencimiento) == 'undefined') ? "" : fechaCadOficial);
                    var rcResidencia= ((typeof(results[0].dtspsl_departamento) == 'undefined') ? "" : results[0].dtspsl_departamento);
                    var rcGenero    = ((typeof(results[0].dtspsl_sexo) == 'undefined') ? "" : results[0].dtspsl_sexo);
                    var rcMacro     = ((typeof(results[0].dtspsl_macrodistrito) == 'undefined') ? "" : results[0].dtspsl_macrodistrito);
                    var rcMacroDesc = $scope.verMacrodistrito(results[0].dtspsl_macrodistrito_desc, rcMacro);
                    var rcZona      = ((typeof(results[0].dtspsl_zona) == 'undefined') ? "" : results[0].dtspsl_zona);
                    var rcLugNacimiento= ((typeof(results[0].dtspsl_lugar_nacimiento) == 'undefined') ? "" : results[0].dtspsl_lugar_nacimiento);
                    var rcZonaDesc     = ((typeof(results[0].dtspsl_zona_desc) == 'undefined') ? "" : results[0].dtspsl_zona_desc);
                    var rcDistritoDesc = ((typeof(results[0].dtspsl_distrito_desc) == 'undefined') ? "" : results[0].dtspsl_distrito_desc);
                    var rcFile_ci_a    = ((typeof(results[0].dtspsl_file_fotocopia_ci) == 'undefined') ? "" : results[0].dtspsl_file_fotocopia_ci);
                    var rcFile_ci_r    = ((typeof(results[0].dtspsl_file_fotocopia_ci_r) == 'undefined') ? "" : results[0].dtspsl_file_fotocopia_ci_r);
                    $rootScope.OIDtemp = ((typeof(results[0]._id) == 'undefined') ? "" : results[0]._id);
                    if(rcMacro == undefined)
                      rcMacro = " ";
                    else
                      rcMacro = rcMacro.toString();
                    switch(opcion)
                    {
                        case "1":
                            if(campo == 1)
                            {
                              $scope.datos.TER_TESTIGO = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            else if(campo == 2)
                            {
                              $scope.datos.TER_TESTIGO1 = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            break;
                        case "2":
                            if(campo == 1)
                            {
                              $scope.datos.TER_TESTIGO = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            else if(campo == 2)
                            {
                              $scope.datos.TER_GARANTE = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            else if(campo == 3)
                            {
                              $scope.datos.TER_GARANTE1 = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            break;
                        case "3":
                            if(campo == 1)
                            {
                              $scope.datos.TER_TUTOR = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            else if(campo == 2)
                            {
                              $scope.datos.TER_GARANTE = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            else if(campo == 3)
                            {
                              $scope.datos.TER_GARANTE1 = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                            }
                            break;
                        case "99":
                            $scope.datos.G_NNA_NOM = rcNombre.trim();
                            $scope.datos.G_NNA_PAT = rcPaterno.trim();
                            $scope.datos.G_NNA_MAT = rcMaterno.trim();
                            $scope.opcion99 = true;
                            break;
                        case "100":
                                fecNacimiento = new Date (results[0].dtspsl_fec_nacimiento);
                                if (fecNacimiento.getDate() < 10)
                                {
                                    dia = "0" + fecNacimiento.getDate();
                                }
                                else
                                {
                                    dia = fecNacimiento.getDate();
                                }
                                mes = fecNacimiento.getMonth() + 1;
                                if ( mes < 10)
                                {
                                    mes = "0" + mes;
                                }
                                else
                                {
                                    mes = mes;
                                }
                                
                                fecNacimiento1 = fecNacimiento.getFullYear() + "-" + mes + "-" + dia; 
                                $scope.c = moment(fecNacimiento1, "YYYY-MM-DD");
                                $scope.d = moment(fechactual123, "YYYY-MM-DD");                    

                                var ed = parseInt(($scope.d - $scope.c)/365/24/60/60/1000);

                            if (ed >= 18)
                            {                           
                                $scope.modelResp.selectedR.f01_ADUL_EXP_CIUD  = rcExpedido.trim(); 
                                $scope.modelResp.selectedR.f01_ADUL_G_NOM  = rcNombre.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_G_APAT =rcPaterno.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_G_AMAT =rcMaterno.trim(); 
                                $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC =rcFecNacimiento.trim();                 
                                $scope.modelResp.selectedR.f01_ADUL_LUG_NAC =rcLugNacimiento.trim();
                                $scope.modelResp.selectedR.f01_ADUL_G_GEN   =rcGenero.trim();
                                $scope.modelResp.selectedR.f01_ADUL_TER_CIUD  =rcResidencia.trim();
                                $scope.modelResp.selectedR.f01_ADUL_TER_MACRO  =rcMacroDesc.trim();
                                $scope.cargarZonasCiudadanoA(rcMacro.trim(),rcZona.trim());
                                $scope.modelResp.selectedR.f01_ADUL_TER_MACRO_valor  =rcMacro.trim();
                                $scope.modelResp.selectedR.f01_ADUL_TER_ZONA  = rcZonaDesc.trim();
                                $scope.modelResp.selectedR.f01_ADUL_DIR  =rcDireccion.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_TER_TEL  =rcTelefono.trim();  
                                $scope.modelResp.selectedR.f01_ADUL_G_TELF  =rcMovil.trim(); 
                                $scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI=rcCaducidad.trim();
                                $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                                $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH = $scope.direccionvirtual+ rcFile_ci_a + "?app_name=todoangular";
                                $scope.archiFileCIAnversoA =  $scope.direccionvirtual+ rcFile_ci_a + "?app_name=todoangular";
                                $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH = $scope.direccionvirtual+ rcFile_ci_r + "?app_name=todoangular";
                                $scope.archiFileCIReversoA =  $scope.direccionvirtual+ rcFile_ci_r + "?app_name=todoangular";
                                $scope.modelResp.selectedR.f01_ADUL_O_ADJ_G_ARCH_CN = "0";
                                $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH_DNI = "0";
                                $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH_DNI = "0";
                                $scope.archiFileOtroA =  "0";
                                $scope.archiFileDNIAnversoA="0";
                                $scope.archiFileDNIAReversoA="0";
                            }
                            else
                            {
                                sweet.show('NO CORRESPONDE', "El ciudadano es menor de edad", 'error');
                                $scope.model.selected.f01_NNA_G_FEC_NAC='';
                                $scope.modelResp.selectedR.f01_ADUL_G_CI  = '';
                                $scope.modelResp.selectedR.f01_ADUL_EXP_CIUD  = '';
                                $scope.modelResp.selectedR.f01_ADUL_G_NOM  = '';  
                                $scope.modelResp.selectedR.f01_ADUL_G_APAT ='';  
                                $scope.modelResp.selectedR.f01_ADUL_G_AMAT ='';          
                                $scope.modelResp.selectedR.f01_ADUL_LUG_NAC ='';
                                $scope.modelResp.selectedR.f01_ADUL_G_GEN   ='';
                                $scope.modelResp.selectedR.f01_ADUL_TER_CIUD  ='';
                                $scope.modelResp.selectedR.f01_ADUL_TER_MACRO  ='';
                                $scope.modelResp.selectedR.f01_ADUL_TER_MACRO_valor  ='';
                                $scope.modelResp.selectedR.f01_ADUL_TER_ZONA  = '';
                                $scope.modelResp.selectedR.f01_ADUL_DIR  ='';  
                                $scope.modelResp.selectedR.f01_ADUL_TER_TEL  ='';  
                                $scope.modelResp.selectedR.f01_ADUL_G_TELF  =''; 
                                $scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI='';
                                $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH = "0";
                                $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH = "0";
                                $scope.modelResp.selectedR.f01_ADUL_O_ADJ_G_ARCH_CN = "0";
                                $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH_DNI = "0";
                                $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH_DNI = "0";
                            }
                            break;
                        case "101":
                                fecNacimiento = new Date (results[0].dtspsl_fec_nacimiento);
                                if (fecNacimiento.getDate() < 10)
                                {
                                    dia = "0" + fecNacimiento.getDate();
                                }
                                else 
                                {
                                    dia = fecNacimiento.getDate();
                                }
                                mes = fecNacimiento.getMonth() + 1;
                                if ( mes < 10)
                                {
                                    mes = "0" + mes;
                                }
                                else
                                {
                                    mes = mes;
                                }
                                fecNacimiento1 = fecNacimiento.getFullYear() + "-" + mes + "-" + dia; 
                                $scope.c = moment(fecNacimiento1, "YYYY-MM-DD");
                                $scope.d = moment(fechactual123, "YYYY-MM-DD");                    

                                var ed = parseInt(($scope.d - $scope.c)/365/24/60/60/1000);
                            
                            if (ed < 18)
                            {  
                                $scope.model.selected.f01_NNA_EXP_CIUD  = rcExpedido.trim(); 
                                $scope.model.selected.f01_NNA_G_NOM  = rcNombre.trim();   
                                $scope.model.selected.f01_NNA_G_APAT =rcPaterno.trim();   
                                $scope.model.selected.f01_NNA_G_AMAT =rcMaterno.trim(); 
                                $scope.model.selected.f01_NNA_G_FEC_NAC =rcFecNacimiento.trim();                 
                                $scope.model.selected.f01_NNA_G_LUG_NAC =rcLugNacimiento.trim(); 
                                $scope.model.selected.f01_NNA_G_GEN =rcGenero.trim(); 
                                $scope.model.selected.f01_NNA_TER_MACRO  =rcMacroDesc.trim();
                                $scope.cargarZonasCiudadano(rcMacro.trim(),rcZona.trim());
                                $scope.model.selected.f01_NNA_TER_MACRO_valor = rcMacro.trim(); 
                                $scope.model.selected.f01_NNA_TER_ZONA  = rcZonaDesc.trim(); 
                                $scope.model.selected.f01_NNA_DIR  =rcDireccion.trim();   
                                $scope.model.selected.f01_NNA_TER_TEL  =rcTelefono.trim();  
                                $scope.model.selected.f01_NNA_G_TELF  =rcMovil.trim(); 
                                $scope.model.selected.f01_NNA_F_CADUC_CI  =rcCaducidad.trim(); 
                                $scope.model.selected.f01_NNA_G_CIUD  =rcResidencia.trim();
                                $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                                $scope.model.selected.f01_NNA_ANVERSO_G_ARCH = $scope.direccionvirtual+ rcFile_ci_a + "?app_name=todoangular";
                                $scope.archiFileCIAnverso =  $scope.direccionvirtual+ rcFile_ci_a + "?app_name=todoangular";
                                $scope.model.selected.f01_NNA_REVERSO_G_ARCH = $scope.direccionvirtual+ rcFile_ci_r + "?app_name=todoangular";
                                $scope.archiFileCIReverso =  $scope.direccionvirtual+ rcFile_ci_r + "?app_name=todoangular";
                                $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN = "0";
                                $scope.archiFileOtro =  "0";                                
                                $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI = "0";
                                $scope.archiFileDNIAnverso =  "0";
                                $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI = "0";
                                $scope.archiFileDNIReverso =  "0";
                            }
                            else
                            {
                                sweet.show('NO CORRESPONDE', "El ciudadano es mayor de edad", 'error'); 
                                $scope.model.selected.f01_NNA_G_CI=''; 
                                $scope.model.selected.f01_NNA_G_FEC_NAC=''; 
                                $scope.model.selected.f01_NNA_EXP_CIUD  = ''; 
                                $scope.model.selected.f01_NNA_G_NOM  = '';   
                                $scope.model.selected.f01_NNA_G_APAT ='';   
                                $scope.model.selected.f01_NNA_G_AMAT ='';              
                                $scope.model.selected.f01_NNA_G_LUG_NAC ='';
                                $scope.model.selected.f01_NNA_G_GEN ='';
                                $scope.model.selected.f01_NNA_TER_MACRO  ='';
                                $scope.model.selected.f01_NNA_TER_MACRO_valor = '';
                                $scope.model.selected.f01_NNA_TER_ZONA  = '';
                                $scope.model.selected.f01_NNA_DIR  = '';   
                                $scope.model.selected.f01_NNA_TER_TEL  =  '';  
                                $scope.model.selected.f01_NNA_G_TELF  =  '';
                                $scope.model.selected.f01_NNA_F_CADUC_CI  = '';
                                $scope.model.selected.f01_NNA_G_CIUD  = '';
                                $scope.model.selected.f01_NNA_ANVERSO_G_ARCH = "0";
                                $scope.model.selected.f01_NNA_REVERSO_G_ARCH = "0";
                                $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN = "0";
                                $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI = "0";
                                $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI = "0";
                            }
                            break;
                    }
                }
                else
                {
                    sweet.show('', "El carnet no se encuentra registrado", 'warning');
                    switch(opcion)
                    {
                        case "1":
                            if(campo == 1)
                            {
                                $scope.datos.TER_TESTIGO = '';
                            }
                            else if(campo == 2)
                            {
                                $scope.datos.TER_TESTIGO1 = '';
                            }
                            break;
                        case "2":
                            if(campo == 1)
                            {
                                $scope.datos.TER_TESTIGO = '';
                            }
                            else if(campo == 2)
                            {
                                $scope.datos.TER_GARANTE = '';
                            }
                            else if(campo == 3)
                            {
                                $scope.datos.TER_GARANTE1 = '';
                            }
                            break;
                        case "3":
                            if(campo == 1)
                            {
                                $scope.datos.TER_TUTOR = '';
                            }
                            else if(campo == 2)
                            {
                                $scope.datos.TER_GARANTE = '';
                            }
                            else if(campo == 3)
                            {
                                $scope.datos.TER_GARANTE1 = '';
                            }
                            break;
                        case "99":
                            $scope.datos.G_NNA_NOM = '';
                            $scope.datos.G_NNA_PAT = '';
                            $scope.datos.G_NNA_MAT = '';
                            $scope.opcion99 = false;
                            break;
                        case "100":
                            document.getElementById('f01_ADUL_G_NOM').value='';
                            document.getElementById('f01_ADUL_G_APAT').value='';
                            document.getElementById('f01_ADUL_G_AMAT').value='';
                            document.getElementById('f01_ADUL_DIR').value='';
                            document.getElementById('f01_ADUL_TER_TEL').value='';
                            document.getElementById('f01_ADUL_G_TELF').value='';
                            document.getElementById('f01_ADUL_F_CADUC_CI').value='';
                            break;
                        case "101":
                            document.getElementById('f01_NNA_G_NOM').value='';
                            document.getElementById('f01_NNA_G_APAT').value='';
                            document.getElementById('f01_NNA_G_AMAT').value='';
                            document.getElementById('f01_NNA_DIR').value='';
                            document.getElementById('f01_NNA_TER_TEL').value='';
                            document.getElementById('f01_NNA_G_TELF').value='';
                            document.getElementById('f01_NNA_F_CADUC_CI').value='';                        
                            break;
                    }
                }
                $.unblockUI(); 
            });
          }
        }   
    }

    //FUNCIONES A ELIMINAR, PORQUE APUNTA AL LOTUS
    $scope.imagenElige = function()
    {
        var cortar = CONFIG.APIURLIF + "/files/IF/genericas/no_disponible.jpg";  
        var verific = cortar.substring(0, 62);
        if(cortar == CONFIG.APIURLIF + "/files/IF/genericas/no_disponible.jpg"){}
        else{}
    }

    $scope.recuperarSerializarInfomacion = function(tramite)
    {
        setTimeout(function()
        {            
            var sIdTramite = tramite.vtra_id;
            var sIdCiudadano = sessionService.get('IDSOLICITANTE');
            var sIdServicio = sessionService.get('IDSERVICIO');
            var parametros  = {
                    "container":"RC_CLI",
                    "folder_path": sIdTramite
            };
            if(sIdCiudadano)
            {
                var filtrov= '{"sidciudadano":"'+ sIdCiudadano + '","sidservicio":"'+sIdServicio+'","sidtramite":"'+sIdTramite+'"}';
                var resRepLegalMongo   = new reglasnegocio();
                resRepLegalMongo.identificador = "RCCIUDADANO_39";
                resRepLegalMongo.parametros = filtrov;
                resRepLegalMongo.llamarregla(function(results)
                {
                    if(results.length > 0)
                    {
                        var data = JSON.parse(results);
                        var datos=JSON.parse(data[0].form_contenido);
                        $scope.publicid =[];
                        $scope.publicid = $scope.datos.publicidad;
                        $rootScope.looo = $scope.datos.INT_AC_latitud;
                        $rootScope.laaa = $scope.datos.INT_AC_longitud;
                        $scope.nroRegistros = datos.length;
                    }else{
                        $scope.nroRegistros = 0;
                        $scope.datos = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                    if (tramite.venviado == "SI") 
                    {
                        $rootScope.btnGuardarForm = true;
                        $rootScope.desabilitado   = true;
                        $scope.desabilitado       = true;
                        $rootScope.botones        = null;
                    }else{
                        $rootScope.btnGuardarForm = false;
                        $rootScope.desabilitado   = false;
                        $scope.desabilitado       = false;
                        $rootScope.botones        = "mostrar";
                    }

                    $rootScope.$broadcast('validarBtnEnviar', results.length);
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                }).error(function(results)
                {
                    console.log("Error al recuperar y serializar la infomacion", results);
                });
            }else{
                    sweet.show('', "No existe el Id del Ciudadano", 'error');
            }
        },1000);

    };

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////PARA SOLICITUD DE VIAJES//////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    $scope.formTipoPermiso  =   function(stipo)
    {
        if(stipo=="1-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="2-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="3-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="4-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="5-D"){
            $scope.PERMISO='D';
        }
        $scope.TER_TIP_PERMISO = stipo;
    };

    $scope.formTipoSolicitud= function(stipo){ $scope.TER_TIP_SOL = stipo; };
    $scope.formSolos        = function(stipo){ $scope.TER_SOLOS = stipo; };
    $scope.formAutoriza     = function(stipo){ $scope.TER_2_PROG = stipo; };
    $scope.formViajan       = function(stipo)
    { 
        $scope.TER_NNA_DEL       = stipo;
        $scope.datos.NNA_CANT_MAS=0;
        $scope.datos.NNA_CANT_FEM=0;
        $scope.datos.NNA_CANT_NN=0;
        $scope.datos.NNA_CAN_MAS=0;
        $scope.datos.NNA_CAN_FEM=0;
        $scope.datos.NNA_NRO_ADO=0;
        $scope.datos.NNA_CANT_TOTAL=0;
        $scope.contarGrillas();
    };

    $scope.getSeleccionaMunicipios  =   function(stipo){ $scope.municipio = stipo; };

    $scope.getProvinciasDepto = function(dep)
    {
        var departamento = dep.split("-");
        $scope.depto = departamento[0];
        var resCiudadanos = new reglasnegocio();
        resCiudadanos.identificador = "RCCIUDADANO_156";
        resCiudadanos.parametros = '{"prv_dpto_codigo":"' + departamento[0] + '"}';
        resCiudadanos.llamarregla(function(data)
        {  
            data = JSON.parse(data);
            $scope.obtDatos = data;
            if ($scope.municipio != 'undefined' || $scope.municipio != null) 
            {
                setTimeout(function()
                {
                    $scope.getSeleccionaMunicipios($scope.municipio);
                    $scope.$apply();
                    document.getElementById('TER_MIN').value = $scope.municipio;
                },1000);
            }
        })
    }; 
    
    $scope.recuperarInfomacionViajes = function()
    {
        if (sessionService.get('ESTADO') == "SI")
        {
            $rootScope.desabilitado = true;
            $rootScope.btnViajes = null;
        }else
        {
            $rootScope.desabilitado = false;
            $rootScope.btnViajes = "mostrar";
        }
        var sIdTramite = sessionService.get('IDTRAMITE');
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
            "container":"RC_CLI",
            "folder_path": sIdTramite
        };
        if (sIdCiudadano)
        {
            var filtrov= '{"sidciudadano":"'+ sIdCiudadano + '","sidservicio":"'+sIdServicio+'","sidtramite":"'+sIdTramite+'"}';
            var resRepLegalMongo   = new reglasnegocio();
            resRepLegalMongo.identificador = "RCCIUDADANO_39";
            resRepLegalMongo.parametros = filtrov;
            resRepLegalMongo.llamarregla(function(results)
            {           
                a= JSON.parse(results);
                if(a[0].form_contenido)
                {
                    var data = JSON.parse(results);
                    var datos=JSON.parse(data[0].form_contenido);
                    $scope.depto = datos.TER_DEST; 
                    $scope.ninosviajan = datos;
                    $scope.ninosviajanA = datos;
                    
                    if (datos.TER_TIP_PERMISO == 'undefined')
                        document.getElementById('TER_TIP_PERMISO').value = '';
                    else
                        document.getElementById('TER_TIP_PERMISO').value = datos.TER_TIP_PERMISO;
                    if (datos.TER_TIP_SOL == 'undefined')
                        document.getElementById('TER_TIP_SOL').value = '';
                    else
                        document.getElementById('TER_TIP_SOL').value = datos.TER_TIP_SOL;
                    if (datos.TER_TIP_SOL == 'undefined')
                        document.getElementById('TER_TIP_SOL').value = '';
                    else
                        document.getElementById('TER_TIP_SOL').value = datos.TER_TIP_SOL;
                    if (datos.g_datos_solicitante == undefined || datos.g_datos_solicitante == '')
                    {
                        document.getElementById('G_CI').value = sessionService.get('CICIUDADANO');  
                        $scope.datos.G_CI=sessionService.get('CICIUDADANO');    
                        document.getElementById('G_NNA_NOM').value = sessionService.get('US_NOMBRE');
                        $scope.datos.G_NNA_NOM=sessionService.get('US_NOMBRE');
                        document.getElementById('G_NNA_PAT').value = sessionService.get('US_PATERNO');
                        $scope.datos.G_NNA_PAT=sessionService.get('US_PATERNO');
                        document.getElementById('G_NNA_MAT').value = sessionService.get('US_MATERNO');
                        $scope.datos.G_NNA_MAT=sessionService.get('US_MATERNO');
                    }
                    else
                    {
                        document.getElementById('G_CI').value = datos.G_CI;
                        document.getElementById('G_NNA_NOM').value = datos.G_NNA_NOM;
                        document.getElementById('G_NNA_PAT').value = datos.G_NNA_PAT;
                        document.getElementById('G_NNA_MAT').value = datos.G_NNA_MAT;
                        $scope.datos.g_datos_solicitante = datos.g_datos_solicitante;
                    }                       

                    if (datos.TER_NOM_INST =='undefined')
                        document.getElementById('TER_NOM_INST').value = '';
                    else
                        document.getElementById('TER_NOM_INST').value = datos.TER_NOM_INST;
                    if (datos.TER_INST_DIR == 'undefined')
                        document.getElementById('TER_INST_DIR').value = '';
                    else
                        document.getElementById('TER_INST_DIR').value = datos.TER_INST_DIR;
                    if (datos.TER_INST_TELF == 'undefined')
                        document.getElementById('TER_INST_TELF').value = '';
                    else
                        document.getElementById('TER_INST_TELF').value = datos.TER_INST_TELF;

                    if (datos.TER_FEC_RET == 'undefined')
                        document.getElementById('TER_FEC_RET').value = '';
                    else
                        document.getElementById('TER_FEC_RET').value = datos.TER_FEC_RET;

                    if (datos.TER_FEC_FIN == 'undefined')
                        document.getElementById('TER_FEC_FIN').value = '';
                    else
                        document.getElementById('TER_FEC_FIN').value = datos.TER_FEC_FIN;

                    if (datos.TER_NNA_DEL == 'undefined')
                        document.getElementById('TER_NNA_DEL').value = '';
                    else
                        document.getElementById('TER_NNA_DEL').value = datos.TER_NNA_DEL;
                    $scope.TER_NNA_DEL = datos.TER_NNA_DEL;
                    if (datos.NNA_CANT_MAS == 'undefined')
                        document.getElementById('NNA_CANT_MAS').value = '';
                    else
                        document.getElementById('NNA_CANT_MAS').value = datos.NNA_CANT_MAS;

                    if (datos.NNA_CANT_FEM == 'undefined')
                        document.getElementById('NNA_CANT_FEM').value = '';
                    else
                        document.getElementById('NNA_CANT_FEM').value = datos.NNA_CANT_FEM;

                    if (datos.NNA_CANT_NN == 'undefined')
                        document.getElementById('NNA_CANT_NN').value = '';
                    else
                        document.getElementById('NNA_CANT_NN').value = datos.NNA_CANT_NN;

                    if (datos.NNA_CAN_MAS == 'undefined')
                        document.getElementById('NNA_CAN_MAS').value = '';
                    else
                        document.getElementById('NNA_CAN_MAS').value = datos.NNA_CAN_MAS;

                    if (datos.NNA_CAN_FEM == 'undefined')
                        document.getElementById('NNA_CAN_FEM').value = '';
                    else
                        document.getElementById('NNA_CAN_FEM').value = datos.NNA_CAN_FEM;

                    if (datos.NNA_NRO_ADO == 'undefined')
                        document.getElementById('NNA_NRO_ADO').value = '';
                    else
                        document.getElementById('NNA_NRO_ADO').value = datos.NNA_NRO_ADO;

                    if (datos.NNA_CANT_MAS == 'undefined')
                        document.getElementById('NNA_CANT_MAS').value = '';
                    else
                        document.getElementById('NNA_CANT_MAS').value = datos.NNA_CANT_MAS;

                    if (datos.NNA_CANT_FEM == 'undefined')
                        document.getElementById('NNA_CANT_FEM').value = '';
                    else
                        document.getElementById('NNA_CANT_FEM').value = datos.NNA_CANT_FEM;

                    if (datos.NNA_CANT_NN == 'undefined')
                        document.getElementById('NNA_CANT_NN').value = '';
                    else
                        document.getElementById('NNA_CANT_NN').value = datos.NNA_CANT_NN;

                    if (datos.NNA_CAN_MAS == 'undefined')
                        document.getElementById('NNA_CAN_MAS').value = '';
                    else
                        document.getElementById('NNA_CAN_MAS').value = datos.NNA_CAN_MAS;

                    if (datos.NNA_CAN_FEM == 'undefined')
                        document.getElementById('NNA_CAN_FEM').value = '';
                    else
                        document.getElementById('NNA_CAN_FEM').value = datos.NNA_CAN_FEM;

                    if (datos.NNA_CANT_TOTAL == 'undefined')
                        document.getElementById('NNA_CANT_TOTAL').value = '';
                    else
                        document.getElementById('NNA_CANT_TOTAL').value = datos.NNA_CANT_TOTAL;

                    if (datos.TER_SOLOS == 'undefined')
                        document.getElementById('TER_SOLOS').value = '';
                    else
                        document.getElementById('TER_SOLOS').value = datos.TER_SOLOS;
                    $scope.TER_SOLOS = datos.TER_SOLOS;

                    if (datos.TER_DEST == 'undefined')
                        document.getElementById('TER_DEST').value = '';
                    else
                    {
                        document.getElementById('TER_DEST').value = datos.TER_DEST;
                        $scope.depto = datos.TER_DEST;
                        $scope.getProvinciasDepto(datos.TER_DEST); 
                    }
                    if (datos.TER_MIN == 'undefined')
                        document.getElementById('TER_MIN').value = '';
                    else
                        document.getElementById('TER_MIN').value = datos.TER_MIN;                
                    $scope.municipio = datos.TER_MIN;

                    if (datos.TER_MOT == 'undefined')
                        document.getElementById('TER_MOT').value = '';
                    else
                        document.getElementById('TER_MOT').value = datos.TER_MOT;

                    $scope.datos = datos;
                    $scope.TER_TIP_PERMISO = datos.TER_TIP_PERMISO;
                    $scope.TER_TIP_SOL = datos.TER_TIP_SOL; 
                    
                    document.getElementById('TER_NNA_VIAJAN').textContent = datos.TER_NNA_VIAJAN; 
                    if(datos.TER_RESP.length == 0)
                    {
                        document.getElementById('TER_RESP').textContent= '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Viaja/ Autoriza|Parentesco/ Condición","campos":"f01_ADUL_TIP_DOC|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN|f01_ADUL_TER_MACRO|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_ARCH|f01_ADUL_G_VA|f01_ADUL_G_PARE_COND","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|true|true|"}]';
                        datos.TER_RESP = '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Viaja/ Autoriza|Parentesco/ Condición","campos":"f01_ADUL_TIP_DOC|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN|f01_ADUL_TER_MACRO|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_ARCH|f01_ADUL_G_VA|f01_ADUL_G_PARE_COND","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|true|true|"}]';
                    }
                    else 
                    {
                        document.getElementById('TER_RESP').textContent=datos.TER_RESP;
                    }
                    if(datos.TER_NNA_VIAJAN.length == 0)
                    {
                        document.getElementById('TER_NNA_VIAJAN').textContent= '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos","campos":"f01_NNA_TIP_DOC|f01_NNA_G_CI|f01_NNA_EXP_CIUD|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC|f01_NNA_G_CIUD|f01_NNA_DEPA_OTRO|f01_NNA_G_GEN|f01_NNA_TER_MACRO|f01_NNA_TER_ZONA|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF|f01_NNA_G_ARCH","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|"}]';
                        datos.TER_NNA_VIAJAN = '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos","campos":"f01_NNA_TIP_DOC|f01_NNA_G_CI|f01_NNA_EXP_CIUD|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC|f01_NNA_G_CIUD|f01_NNA_DEPA_OTRO|f01_NNA_G_GEN|f01_NNA_TER_MACRO|f01_NNA_TER_ZONA|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF|f01_NNA_G_ARCH","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|false|true|false|"}]';
                    }
                    else 
                    {
                        document.getElementById('TER_NNA_VIAJAN').textContent=datos.TER_NNA_VIAJAN;
                    }
                    $scope.modelResp.TER_RESP = JSON.parse(datos.TER_RESP);
                    $scope.datos.TER_NNA_VIAJAN = JSON.parse(datos.TER_NNA_VIAJAN);
                    $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                    $scope.nroRegistros = datos.length;
                    $scope.formTipoPermiso(datos.TER_TIP_PERMISO);
                    $scope.habilitarEnvioTramite(datos);
                    var cadena = 'Tipo de Doc.,f01_ADUL_TIP_DOC,CBO:CI|CEDULA DE IDENTIDAD#CN|CERTIFICADO DE NACIMIENTO#PAS|PASAPORTE#DN|DNI,20,obligatorio,,,No de Documento,f01_ADUL_G_CI,TXT,10,obligatorio,RC,f01_ADUL_EXP_CIUD#f01_ADUL_G_NOM#f01_ADUL_G_APAT#f01_ADUL_G_AMAT#f01_ADUL_G_FEC_NAC#f01_ADUL_LUG_NAC#f01_ADUL_TER_CIUD#f01_ADUL_G_GEN#f01_ADUL_TER_MACRO#f01_ADUL_TER_ZONA#f01_ADUL_DIR#f01_ADUL_TER_TEL#f01_ADUL_G_TELF#f01_ADUL_G_ARCH,Exp.,f01_ADUL_EXP_CIUD,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#EXT|EXTERIOR,5,obligatorio,,,Nombre,f01_ADUL_G_NOM,TXT,20,obligatorio,,,Apellido Paterno,f01_ADUL_G_APAT,TXT,20,escritura,,,Apellido Materno,f01_ADUL_G_AMAT,TXT,20,escritura,,,Fecha de Nac.,f01_ADUL_G_FEC_NAC,FEC,10,obligatorio,,,Lugar de Nac.,f01_ADUL_LUG_NAC,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#10|EXTERIOR,5,obligatorio,,,Ciudad de Residencia,f01_ADUL_TER_CIUD,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#10|EXTERIOR,5,obligatorio,,,Exterior,f01_ADUL_DEPA_OTRO,TXT,20,escritura,,,Género,f01_ADUL_G_GEN,CBO:F|FEMENINO#M|MASCULINO,5,escritura,,,Macro,f01_ADUL_TER_MACRO,CBO:1|MACRODISTRITO 1 COTAHUMA#2|MACRODISTRITO 2 MAXIMILIANO PAREDES#3|MACRODISTRITO 3 PERIFERICA#4|MACRODISTRITO 4 SAN_ANTONIO#5|MACRODISTRITO 5 SUR#6|MACRODISTRITO 6 MALLASA#7|MACRODISTRITO 7 CENTRO#8|MACRODISTRITO 8 HAMPATURI#9|MACRODISTRITO 9 ZONGO#10|OTRO,30,obligatorio,f01_ADUL_TER_ZONA,select zona_id as valor* zona_nombre as dato from ae._ae_distritos * ae._ae_zona where dist_macro_id = xId and zona_distrito_id = dist_id order by 2 ,Zona,f01_ADUL_TER_ZONA,CBO:0|--Seleccione--,30,obligatorio,-,-,Dirección,f01_ADUL_DIR,TXT,50,escritura,,,Telefono,f01_ADUL_TER_TEL,TXT,10,escritura,,,Celular,f01_ADUL_G_TELF,TXT,10,escritura,,,Adjuntos,f01_ADUL_G_ARCH,ARC,10,escritura,,,Viaja/ Autoriza,f01_ADUL_G_VA,CBO:VIAJA|VIAJA#AUTORIZA|AUTORIZA#GARANTIZA|GARANTIZA,20,obligatorio,,,Parentesco/ Condición,f01_ADUL_G_PARE_COND,CBO:PADRE|PADRE#MADRE|MADRE#HERMANO(A)|HERMANO(A)#ABUELO(A)|ABUELO(A)#TIO(A)|TIO(A)#CUÑADO(A)|CUÑADO(A)#PRIMO(A)|PRIMO(A)#SOBRINO(A)|SOBRINO(A)#TUTOR(A)/APODERADO(A)/REP. LEGAL |TUTOR(A)/APODERADO(A)/REP. LEGAL#GARANTE|GARANTE#RESPONSABLE|RESPONSABLE,35,obligatorio,,'
                    var matriz = cadena.split(',');
                    var table = document.getElementById('tabla_TER_RESP');
                    var rowCount = 1;
                    var tableID = 'TER_RESP';
                    
                    for(var k = 1; k < $scope.modelResp.TER_RESP.length;k++)
                    {
                        var row = table.insertRow(rowCount);
                        row.id=tableID+"_row"+(rowCount);
                        var newdiv = document.createElement('td');
                        var j = 0;
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_PARE_COND'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_G_PARE_COND'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_PARE_COND;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_PARE_COND'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_PARE_COND_valor;
                        cell1.appendChild(currenttext); 

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_VA'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_G_VA'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_VA;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_VA'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_VA_valor;
                        cell1.appendChild(currenttext); 

                        if($scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH == "-" || $scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH == "0"|| $scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH == "" ||$scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH == null)
                        {
                            cell1 = row.insertCell(0); 
                            cell1.id = "c_"+'f01_ADUL_G_ARCH'+(rowCount);
                            var newlink = document.createElement('div'); 
                            var currenttext = document.createElement('div');
                            currenttext.innerHTML = '<div class = "col-md-12"><button id="'+'f01_ADUL_G_ARCH'+(rowCount)+'" class = "btn btn-default btn-circle" onclick = "verImagen(0);"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_'+ 'f01_ADUL_G_ARCH'+(rowCount)+'" value="0" readonly="readonly"></div></td>'; 
                            cell1.appendChild(currenttext); 
                        }
                        else
                        {
                            cell1 = row.insertCell(0); 
                            cell1.id = "c_"+'f01_ADUL_G_ARCH'+(rowCount);
                            var newlink = document.createElement('div'); 
                            var currenttext = document.createElement('div');
                            var a=$scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH.split("/");
                            a = a[7].split("?");
                            var h = "'"+$scope.modelResp.TER_RESP[k].f01_ADUL_G_ARCH+"'";
                            currenttext.innerHTML = '<div class = "col-md-12"><button id="'+'f01_ADUL_G_ARCH'+(rowCount)+'" class = "btn btn-default btn-circle" onclick = "verImagen('+h+')"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_f01_ADUL_G_ARCH'+(rowCount)+'" value="'+a[0]+'" readonly="readonly"></div></td>'; 
                            cell1.appendChild(currenttext); 
                        };

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_TELF'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_TELF'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_TELF; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_TER_TEL'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_TER_TEL'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_TEL; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_DIR'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_DIR'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_DIR; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_TER_ZONA'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_TER_ZONA'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_ZONA;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_TER_ZONA'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_ZONA_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_TER_MACRO'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_TER_MACRO'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_MACRO;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_TER_MACRO'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_MACRO_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_GEN'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_G_GEN'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_GEN;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_GEN'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_GEN_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_DEPA_OTRO'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_DEPA_OTRO'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_DEPA_OTRO; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_TER_CIUD'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_TER_CIUD'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_CIUD;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_TER_CIUD'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TER_CIUD_valor;
                        cell1.appendChild(currenttext); 

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_LUG_NAC'+(rowCount);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_LUG_NAC'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_LUG_NAC;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_LUG_NAC'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_LUG_NAC_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_FEC_NAC'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_FEC_NAC'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_FEC_NAC; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_AMAT'+(rowCount);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_AMAT'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_AMAT; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_APAT'+(rowCount); 
                        var currenttext = document.createElement("input");
                        currenttext.id = 'f01_ADUL_G_APAT'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_APAT; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_NOM'+(rowCount); 
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_NOM'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_NOM; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_EXP_CIUD'+(rowCount); 
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_EXP_CIUD'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_EXP_CIUD;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_EXP_CIUD'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_EXP_CIUD_valor;
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_G_CI'+(rowCount); 

                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_G_CI'+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_G_CI; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_ADUL_TIP_DOC'+(rowCount); 

                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_ADUL_TIP_DOC'+(rowCount);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TIP_DOC;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_ADUL_TIP_DOC'+(rowCount)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.modelResp.TER_RESP[k].f01_ADUL_TIP_DOC_valor;
                        cell1.appendChild(currenttext);

                        j++;
                        if(sessionService.get('ESTADO') != "SI")
                        {
                            newdiv.innerHTML = '<button class="btn btn-default btn-circle" onclick="eliminarTabla(' + rowCount + ',\'' + tableID + '\',\'' + cadena + '\');"><i class="fa fa-trash-o" style="color:#249FE6"></i></button> <button class="btn btn-default btn-circle" onclick="editarGrilla(' + rowCount + ',\'' + cadena + '\',\'' + tableID + '\');"><i class="fa fa-pencil" style="color:#249FE6"></i></button></td>';
                            newdiv.id="c_btn_"+row.id;
                            cell1 = row.insertCell(0);
                            cell1.appendChild(newdiv);
                        };
                        rowCount++;
                    };     
                    var cadena2  = 'Tipo de Doc.,f01_NNA_TIP_DOC,CBO:CI|CEDULA DE IDENTIDAD#CN|CERTIFICADO DE NACIMIENTO#PAS|PASAPORTE#DN|DNI,20,obligatorio,,,No de Documento,f01_NNA_G_CI,TXT,15,obligatorio,RC,f01_NNA_EXP_CIUD#f01_NNA_G_NOM#f01_NNA_G_APAT#f01_NNA_G_AMAT#f01_NNA_G_FEC_NAC#f01_NNA_G_LUG_NAC#f01_NNA_G_CIUD#f01_NNA_G_GEN#f01_NNA_TER_MACRO#f01_NNA_TER_ZONA#f01_NNA_DIR#f01_NNA_TER_TEL#f01_NNA_G_TELF#f01_NNA_G_ARCH,Exp.,f01_NNA_EXP_CIUD,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#EXT|EXTERIOR,5,obligatorio,,,Nombre,f01_NNA_G_NOM,TXT,20,obligatorio,,,Apellido Paterno,f01_NNA_G_APAT,TXT,20,escritura,BSQ,f01_NNA_G_NOM#f01_NNA_G_APAT#f01_NNA_G_AMAT,Apellido Materno,f01_NNA_G_AMAT,TXT,20,escritura,BSQ,f01_NNA_G_NOM#f01_NNA_G_APAT#f01_NNA_G_AMAT,Fecha de Nac.,f01_NNA_G_FEC_NAC,FEC,10,obligatorio,,,Lugar de Nac.,f01_NNA_G_LUG_NAC,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#10|EXTERIOR,5,obligatorio,,,Ciudad de Residencia,f01_NNA_G_CIUD,CBO:LPZ|LA PAZ#ORU|ORURO#PTS|POTOSI#CBB|COCHABAMBA#CHQ|CHUQUISACA#TJA|TARIJA#BNI|BENI#PND|PANDO#SCZ|SANTA CRUZ#10|EXTERIOR,5,obligatorio,,,Exterior,f01_NNA_DEPA_OTRO,TXT,20,escritura,,,Género,f01_NNA_G_GEN,CBO:F|FEMENINO#M|MASCULINO,5,obligatorio,,,Macro,f01_NNA_TER_MACRO,CBO:1|MACRODISTRITO 1 COTAHUMA#2|MACRODISTRITO 2 MAXIMILIANO PAREDES#3|MACRODISTRITO 3 PERIFERICA#4|MACRODISTRITO 4 SAN_ANTONIO#5|MACRODISTRITO 5 SUR#6|MACRODISTRITO 6 MALLASA#7|MACRODISTRITO 7 CENTRO#8|MACRODISTRITO 8 HAMPATURI#9|MACRODISTRITO 9 ZONGO#10|OTRO,30,obligatorio,f01_NNA_TER_ZONA,select zona_id as valor* zona_nombre as dato from ae._ae_distritos * ae._ae_zona where dist_macro_id = xId and zona_distrito_id = dist_id order by 2 ,Zona,f01_NNA_TER_ZONA,CBO:0|--Seleccione--,40,obligatorio,-,-,Dirección,f01_NNA_DIR,TXT,50,escritura,,,Telefono,f01_NNA_TER_TEL,TXT,10,escritura,,,Celular,f01_NNA_G_TELF,TXT,10,escritura,,,Adjuntos,f01_NNA_G_ARCH,ARC,10,escritura,,'
                    var matriz2  = cadena2.split(',');
                    var table2   = document.getElementById('tabla_TER_NNA_VIAJAN');
                    var rowCount2= 1;
                    var tableID2 = 'TER_NNA_VIAJAN';

                    for(var k = 1; k < $scope.datos.TER_NNA_VIAJAN.length;k++)
                    {
                        var row = table2.insertRow(rowCount2);
                        row.id=tableID2+"_row"+(rowCount2);
                        var newdiv = document.createElement('td');
                        var j = 0;
                        if($scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH == "-" || $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH == "0"|| $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH == "" ||$scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH == null)
                        {
                            cell1 = row.insertCell(0); 
                            cell1.id = "c_"+'f01_NNA_G_ARCH'+(rowCount2);
                            var newlink = document.createElement('div'); 
                            var currenttext = document.createElement('div');
                            currenttext.innerHTML = '<div class = "col-md-12"><button id="'+'f01_NNA_G_ARCH'+(rowCount2)+'" class = "btn btn-default btn-circle" onclick = "verImagen(0);"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_'+ 'f01_NNA_G_ARCH'+(rowCount2)+'" value="0" readonly="readonly"></div></td>'; 
                            cell1.appendChild(currenttext); 
                        }
                        else
                        {
                            cell1 = row.insertCell(0); 
                            cell1.id = "c_"+'f01_NNA_G_ARCH'+(rowCount2);
                            var newlink = document.createElement('div'); 
                            var currenttext = document.createElement('div');
                            var a=$scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH.split("/");
                            a = a[7].split("?");
                            var h = "'"+$scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_ARCH+"'";
                            currenttext.innerHTML = '<div class = "col-md-12"><button id="'+'f01_NNA_G_ARCH'+(rowCount2)+'" class = "btn btn-default btn-circle" onclick = "verImagen('+h+');"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_'+ 'f01_NNA_G_ARCH'+(rowCount2)+'" value="'+a[0]+'" readonly="readonly"></div></td>'; 
                            cell1.appendChild(currenttext); 
                        }
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_TELF'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_TELF'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_TELF; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_TER_TEL'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_TER_TEL'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TER_TEL; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_DIR'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_DIR'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_DIR; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_TER_ZONA'+(rowCount2);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_TER_ZONA'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TER_ZONA;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_TER_ZONA'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TER_ZONA_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_TER_MACRO'+(rowCount2);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_TER_MACRO'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TER_MACRO;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_TER_MACRO'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TER_MACRO_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_GEN'+(rowCount2);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_G_GEN'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_GEN;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_GEN'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_GEN_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_DEPA_OTRO'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_DEPA_OTRO'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_DEPA_OTRO; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_CIUD'+(rowCount2);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_G_CIUD'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_CIUD;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_CIUD'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_CIUD_valor;
                        cell1.appendChild(currenttext); 

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_LUG_NAC'+(rowCount2);
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_G_LUG_NAC'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_LUG_NAC;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_LUG_NAC'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_LUG_NAC_valor;
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_FEC_NAC'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_FEC_NAC'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_FEC_NAC; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_AMAT'+(rowCount2);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_AMAT'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_AMAT; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_APAT'+(rowCount2); 
                        var currenttext = document.createElement("input");
                        currenttext.id = 'f01_NNA_G_APAT'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_APAT; 
                        cell1.appendChild(currenttext);

                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_NOM'+(rowCount2); 
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_NOM'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_NOM; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_EXP_CIUD'+(rowCount2); 
                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_EXP_CIUD'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_EXP_CIUD;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_EXP_CIUD'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_EXP_CIUD_valor;
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_G_CI'+(rowCount2); 

                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_G_CI'+(rowCount2);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_G_CI; 
                        cell1.appendChild(currenttext);
                        cell1 = row.insertCell(0); 
                        cell1.id = "c_"+'f01_NNA_TIP_DOC'+(rowCount2); 

                        var cbovalor = document.createElement("input"); 
                        cbovalor.id = 'f01_NNA_TIP_DOC'+(rowCount2);
                        cbovalor.type = "text";
                        cbovalor.disabled = "true";
                        cbovalor.readonly = "readonly";
                        cbovalor.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TIP_DOC;
                        cell1.appendChild(cbovalor);
                        var currenttext = document.createElement("input"); 
                        currenttext.id = 'f01_NNA_TIP_DOC'+(rowCount2)+"_valor";
                        currenttext.type = "hidden";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = $scope.datos.TER_NNA_VIAJAN[k].f01_NNA_TIP_DOC_valor;
                        cell1.appendChild(currenttext);                       
                        j++;
                        
                        if(sessionService.get('ESTADO') != "SI")
                        {
                            newdiv.innerHTML = '<button class="btn btn-default btn-circle" onclick="eliminarTabla(' + rowCount2 + ',\'' + tableID2 + '\',\'' + cadena2 + '\');"><i class="fa fa-trash-o" style="color:#249FE6"></i></button> <button class="btn btn-default btn-circle" onclick="editarGrilla(' + rowCount2 + ',\'' + cadena2 + '\',\'' + tableID2 + '\');"><i class="fa fa-pencil" style="color:#249FE6"></i></button></td>';
                            newdiv.id="c_btn_"+row.id;
                            cell1 = row.insertCell(0);
                            cell1.appendChild(newdiv);
                        }
                        rowCount2++;
                    }       
                }
                else
                {
                    $scope.nroRegistros = 0;
                    $scope.datos = [];
                    $scope.adjuntosArray = "";
                    $scope.iniciandoDatos();
                    sessionService.set('IDTRAMITE', sIdTramite); 
                    $scope.datos.G_CI=sessionService.get('CICIUDADANO');    
                    $scope.datos.G_NNA_NOM=sessionService.get('US_NOMBRE');
                    $scope.datos.G_NNA_PAT=sessionService.get('US_PATERNO');
                    $scope.datos.G_NNA_MAT=sessionService.get('US_MATERNO');
                    $scope.datosNNA="";
                    $scope.datosRES = ""; 

                    var r = $("#TER_RESP").val();    
                    if(r != undefined && datos != undefined)
                    {
                        document.getElementById('TER_RESP').textContent= '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Adjuntos2|Viaja/ Autoriza|Parentesco/ Condición","campos":"f01_ADUL_TIP_DOC|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN|f01_ADUL_TER_MACRO|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_ANVERSO_G_ARCH|f01_ADUL_REVERSO_G_ARCH|f01_ADUL_G_VA|f01_ADUL_G_PARE_COND","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|false|true|true|"}]';
                        $scope.modelResp.TER_RESP = '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Viaja/ Autoriza|Parentesco/ Condición","campos":"f01_ADUL_TIP_DOC|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN|f01_ADUL_TER_MACRO|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_ANVERSO_G_ARCH|f01_ADUL_REVERSO_G_ARCH|f01_ADUL_G_VA|f01_ADUL_G_PARE_COND","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|false|true|true|"}]';                        
                        document.getElementById('TER_NNA_VIAJAN').textContent= '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Adjuntos2","campos":"f01_NNA_TIP_DOC|f01_NNA_G_CI|f01_NNA_EXP_CIUD|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC|f01_NNA_G_CIUD|f01_NNA_DEPA_OTRO|f01_NNA_G_GEN|f01_NNA_TER_MACRO|f01_NNA_TER_ZONA|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF|f01_NNA_ANVERSO_G_ARCH|f01_NNA_REVERSO_G_ARCH","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|false|"}]';                        
                        $scope.datos.TER_NNA_VIAJAN = '[{"tipo":"GRD","titulos":"Tipo de Doc.|No de Documento|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telefono|Celular|Adjuntos|Adjuntos2","campos":"f01_NNA_TIP_DOC|f01_NNA_G_CI|f01_NNA_EXP_CIUD|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC|f01_NNA_G_CIUD|f01_NNA_DEPA_OTRO|f01_NNA_G_GEN|f01_NNA_TER_MACRO|f01_NNA_TER_ZONA|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF|f01_NNA_ANVERSO_G_ARCH|f01_NNA_REVERSO_G_ARCH","impresiones":"true|true|true|true|true|true|true|false|true|false|true|false|false|true|true|true|false|false|"}]';                                      
                        
                        document.getElementById('TER_TIP_PERMISO').value = '';                    
                        document.getElementById('TER_TIP_SOL').value = '';              
                        document.getElementById('TER_TIP_SOL').value = '';             
                        document.getElementById('TER_NOM_INST').value = '';
                        document.getElementById('TER_INST_DIR').value = '';
                        document.getElementById('TER_INST_TELF').value = '';
                        document.getElementById('TER_NNA_DEL').value = '';
                        document.getElementById('NNA_CANT_MAS').value = '';
                        document.getElementById('NNA_CANT_FEM').value = '';
                        document.getElementById('NNA_CANT_NN').value = '';
                        document.getElementById('NNA_CAN_MAS').value = '';
                        document.getElementById('NNA_CAN_FEM').value = '';
                        document.getElementById('NNA_NRO_ADO').value = '';
                        document.getElementById('NNA_CANT_MAS').value = '';
                        document.getElementById('NNA_CANT_FEM').value = '';
                        document.getElementById('NNA_CANT_NN').value = '';
                        document.getElementById('NNA_CAN_MAS').value = '';
                        document.getElementById('NNA_CAN_FEM').value = '';
                        document.getElementById('NNA_CANT_TOTAL').value = '';
                        document.getElementById('TER_SOLOS').value = '';
                        document.getElementById('TER_DEST').value = '';
                        document.getElementById('TER_MIN').value = '';             
                        document.getElementById('TER_MOT').value = '';              
                        document.getElementById('TER_FEC_RET').value = '';             
                        document.getElementById('TER_FEC_FIN').value = '';                   
                        $scope.habilitarEnvioTramite($scope.datos);
                        
                    }
                }
                if (sessionService.get('ESTADO') == "SI") { 
                    $rootScope.btnGuardarForm           =   true;
                    $rootScope.desabilitado             =   true;
                    $scope.desabilitado             =   true;
                    $rootScope.botones                  =   null;
                } else {
                    $rootScope.btnGuardarForm   =   false;
                    $rootScope.desabilitado     =   false;
                    $scope.desabilitado     =   false;
                    $rootScope.botones          =   "mostrar";
                }
                $rootScope.$broadcast('validarBtnEnviar', results.length);
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);

                $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':sessionService.get('ESTADO')}]);
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
            });
        }else
        {
            sweet.show('', "No existe el Id del Ciudadano", 'error');
        }
        if($scope.datos.TER_TIP_PERMISO != undefined)
        {
            var stipo=$scope.datos.TER_TIP_PERMISO;
            $scope.formTipoPermiso(stipo);
        }
        $rootScope.btnEnviarFormPermisos = false;
    };
    
    $scope.serializarInfViajes = function(obj)
    {
        var fechactual = obtFechaActual.obtenerFechaActual();
        var misDocs    = new Array();
        //CONVIRTIENDO LOS CAMPOS A MAYUSCULAS
        var ninios = $scope.ninosviajan.TER_NNA_VIAJAN;
        var repons = $scope.ninosviajanA.TER_RESP;
        var tipoper = document.getElementById('TER_TIP_PERMISO').value;
        var tipsol = document.getElementById('TER_TIP_SOL').value;
        var cirespsol = document.getElementById('G_CI').value;
        var nomressol = document.getElementById('G_NNA_NOM').value;
        var appatrespsol = document.getElementById('G_NNA_PAT').value;
        var apmatrespsol = document.getElementById('G_NNA_MAT').value;
        var nominst = document.getElementById('TER_NOM_INST').value;
        var dirinst = document.getElementById('TER_INST_DIR').value;
        var telinst = document.getElementById('TER_INST_TELF').value;
        var fechasalida = document.getElementById('TER_FEC_RET').value;
        var fecharetorno = document.getElementById('TER_FEC_FIN').value;
        var viajansolos = document.getElementById('TER_SOLOS').value;
        var destino = document.getElementById('TER_DEST').value;
        var munpro = document.getElementById('TER_MIN').value;
        var motivo = document.getElementById('TER_MOT').value;
        var otroMotivo = document.getElementById('TER_OTRO_MOT').value;
        var nroviajan = document.getElementById('TER_NNA_DEL').value;
        var nroninos = document.getElementById('NNA_CANT_MAS').value;
        var nroninas = document.getElementById('NNA_CANT_FEM').value;
        var totalnna = document.getElementById('NNA_CANT_NN').value;
        var nroam = document.getElementById('NNA_CAN_MAS').value;
        var nroaf = document.getElementById('NNA_CAN_FEM').value;
        var totala = document.getElementById('NNA_NRO_ADO').value;
        var total = document.getElementById('NNA_CANT_TOTAL').value;
        obj.INT_AC_NOMBRE_VIA   =   ((typeof(obj.INT_AC_NOMBRE_VIA) == 'undefined' || obj.INT_AC_NOMBRE_VIA == null) ? ""   : obj.INT_AC_NOMBRE_VIA.toUpperCase());
        obj.INT_DENOMINACION    =   ((typeof(obj.INT_DENOMINACION)  == 'undefined' || obj.INT_DENOMINACION == null) ? ""    : obj.INT_DENOMINACION.toUpperCase());
        obj.INT_AC_EDIFICIO     =   ((typeof(obj.INT_AC_EDIFICIO)   == 'undefined' || obj.INT_AC_EDIFICIO == null) ? ""     : obj.INT_AC_EDIFICIO.toUpperCase());
        obj.INT_AC_NUMERO       =   ((typeof(obj.INT_AC_NUMERO)     == 'undefined' || obj.INT_AC_NUMERO == null) ? ""       : obj.INT_AC_NUMERO.toUpperCase());
        obj.INT_AC_BLOQUE       =   ((typeof(obj.INT_AC_BLOQUE)     == 'undefined' || obj.INT_AC_BLOQUE == null) ? ""       : obj.INT_AC_BLOQUE.toUpperCase());
        obj.INT_AC_PISO         =   ((typeof(obj.INT_AC_PISO)       == 'undefined' || obj.INT_AC_PISO == null) ? ""         : obj.INT_AC_PISO.toUpperCase());
        obj.INT_AC_NUME         =   ((typeof(obj.INT_AC_NUME)       == 'undefined' || obj.INT_AC_NUME == null) ? ""         : obj.INT_AC_NUME.toUpperCase());
        obj.INT_FEC_SOLICITUD   =   ((typeof(obj.INT_FEC_SOLICITUD) == 'undefined' || obj.INT_FEC_SOLICITUD == null) ? ""   : fechactual);
        obj.INT_DIR_DET         =   ((typeof(obj.INT_DIR_DET)       == 'undefined' || obj.INT_DIR_DET == null) ? ""         : obj.INT_DIR_DET.toUpperCase());
        obj.TER_NNA_VIAJAN      =   ((typeof(ninios)    == 'undefined' || ninios == null) ? "" : ninios);
        obj.TER_RESP            =   ((typeof(repons) == 'undefined' || repons == null) ? "" : repons);
        obj.TER_TIP_PERMISO     =   ((typeof(tipoper) == 'undefined' || tipoper == null) ? "" : tipoper);
        obj.TER_TIP_SOL         =   ((typeof(tipsol) == 'undefined' || tipsol == null) ? "" : tipsol);
        obj.G_CI                =   ((typeof(cirespsol) == 'undefined' || cirespsol == null) ? "" : cirespsol);
        obj.G_NNA_NOM           =   ((typeof(nomressol) == 'undefined' || nomressol == null) ? "" : nomressol.toUpperCase());
        obj.G_NNA_PAT           =   ((typeof(appatrespsol) == 'undefined' || appatrespsol == null) ? "" : appatrespsol.toUpperCase());
        obj.G_NNA_MAT           =   ((typeof(apmatrespsol) == 'undefined' || apmatrespsol == null) ? "" : apmatrespsol.toUpperCase());
        obj.TER_NOM_INST        =   ((typeof(nominst) == 'undefined' || nominst == null) ? "" : nominst.toUpperCase());
        obj.TER_INST_DIR        =   ((typeof(dirinst) == 'undefined' || dirinst == null) ? "" : dirinst.toUpperCase());
        obj.TER_INST_TELF       =   ((typeof(telinst) == 'undefined' || telinst == null) ? "" : telinst);
        obj.TER_FEC_RET         =   ((typeof(fechasalida) == 'undefined' || fechasalida == null) ? "" : fechasalida);
        obj.TER_FEC_FIN         =   ((typeof(fecharetorno) == 'undefined' || fecharetorno == null) ? "" : fecharetorno);
        obj.TER_SOLOS           =   ((typeof(viajansolos) == 'undefined' || viajansolos == null) ? "" : viajansolos);
        obj.TER_DEST            =   ((typeof(destino) == 'undefined' || destino == null) ? "" : destino);
        obj.TER_MIN             =   ((typeof(munpro) == 'undefined' || munpro == null) ? "" : munpro);
        obj.TER_MOT             =   ((typeof(motivo) == 'undefined' || motivo == null) ? "" : motivo);
        obj.TER_OTRO_MOT        =   ((typeof(motivo) == 'undefined' || otroMotivo == null) ? "" : otroMotivo);
        obj.TER_NNA_DEL         =   ((typeof(nroviajan) == 'undefined' || nroviajan == null) ? "" : nroviajan);
        obj.NNA_CANT_MAS        =   ((typeof(nroninos) == 'undefined' || nroninos == null) ? "" : nroninos);
        obj.NNA_CANT_FEM        =   ((typeof(nroninas) == 'undefined' || nroninas == null) ? "" : nroninas);
        obj.NNA_CANT_NN         =   ((typeof(totalnna) == 'undefined' || totalnna == null) ? "" : totalnna);
        obj.NNA_CAN_MAS         =   ((typeof(nroam) == 'undefined' || nroam == null) ? "" : nroam);
        obj.NNA_CAN_FEM         =   ((typeof(nroaf) == 'undefined' || nroaf == null) ? "" : nroaf);
        obj.NNA_NRO_ADO         =   ((typeof(totala) == 'undefined' || totala == null) ? "" : totala);
        obj.NNA_CANT_TOTAL      =   ((typeof(total) == 'undefined' || total == null) ? "" : total);
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS_AMBIENTE);
        misDocs.push($scope.FILE_CERTIFICADO_PENAL);
        //RECUPERANDO ADJUNTOS
        try {
            var datosSerializados= JSON.stringify(obj);
            var idCiudadano      = sessionService.get('IDSOLICITANTE');
            var idTramite        = sessionService.get('IDTRAMITE');
            var idServicio       = sessionService.get('IDSERVICIO');
            var Parametros       = new datosFormularios();
            Parametros.frm_tra_dvser_id= idServicio;
            Parametros.data_json       = datosSerializados;
            Parametros.frm_tra_id_ciudadano= idCiudadano;
            Parametros.frm_tra_id_usuario  = 1;
            Parametros.frm_idTramite       = idTramite;
            $rootScope.btnGuardarForm      =   true;
            $.blockUI(); 

            Parametros.sp_crear_datos_formulario(function(results)
            { 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0)
                {
                    $.unblockUI();
                    $rootScope.btnEnviarForm = false;
                    $rootScope.btnGuardarForm= false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    sweet.show('', "Registro almacenado correctamente el Formulario", 'success');
                    $("#TER_TIP_PERMISO").prop('disabled', true);
                    $("#TER_FEC_RET").prop('disabled', true);
                    $("#TER_FEC_FIN").prop('disabled', true);
                    $("#TER_SOLOS").prop('disabled', true);
                    $("#TER_DEST").prop('disabled', true);
                    $("#TER_MOT").prop('disabled', true);
                    $("#TER_MIN").prop('disabled', true);

                    $("#BTN_DATE_EXIT").prop('disabled', true);
                    $("#BTN_DATE_RETURN").prop('disabled', true);

                    $('#COL_DAT_CHI').toggle();
                    $('td:nth-child(1)').toggle();
                    $('#COL_DAT_ADULT').hide();
                }
                else
                {
                    $.unblockUI();
                    sweet.show('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e)
        {
            console.log("Error al guardar Formulario",e);
            $.unblockUI();
        }
    };
    /************************************************************************/
    $scope.startDateOpen1 = function($event) {     
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened1 = true;
    };

    $scope.startDateOpen2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened2 = true;
    };
    $scope.startDateOpen3 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened3 = true;
    };
    ////////////////////////////////////////////////////////////////////////
    $scope.habilitarEnvioTramite = function(datos)
    { 
        if( datos.TER_NNA_VIAJAN.length>=1 && datos.TER_RESP.length>=1) //&& datos.TER_RESP.length>=1
        {  
            $scope.btnEnviarFormPermisos = true; 
        }
        else 
        {
            $scope.btnEnviarFormPermisos = false;   
        }
    };

    $scope.seleccionarTramite = function (tramite)
    {
        $scope.datos.TER_NNA_VIAJAN='';
        $scope.datos='';
        if($scope.ninosviajanA != undefined)
        {
            $scope.ninosviajanA.TER_RESP='';
        }
        $rootScope.btnEnviarFormPermisos = false;   
        $rootScope.habilitartab = 'si';

        if($scope.ci_anv == undefined || $scope.ci_anv == '') 
        {
            sweet.show('Estimado Ciudadano','Para iniciar alguna solicitud, es necesario completar sus datos y/o documentos digitalizados','warning');             
            window.location.href = "#registro_ciudadano|modificarRegistro|index.html";            
        }
        else if ($scope.ci_rev == undefined || $scope.ci_rev == '')
        {
            sweet.show('Estimado Ciudadano','Para iniciar alguna solicitud, es necesario completar sus datos y/o documentos digitalizados','warning');            
            window.location.href = "#registro_ciudadano|modificarRegistro|index.html";            
        }
        $scope.tramiteSelect = tramite;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI")
        {
            $rootScope.btnViajes = null;
            $scope.desabilitado = true;
            $scope.template         =   $scope.templates[tramite.vdvser_id];            
        }
        else
        {
            $rootScope.btnViajes = "mostrar";
            $scope.desabilitado = false;
            $scope.template         =   $scope.templates[tramite.vdvser_id];
        } 
        $("#tabla_TER_NNA_VIAJAN").find("tr:gt(0)").remove();
        $("#tabla_TER_RESP").find("tr:gt(0)").remove();

        if(document.getElementById('TER_RESP')!= null)
        {
            document.getElementById('TER_RESP').innerText = "";
            document.getElementById('TER_NNA_VIAJAN').innerText = "";
        }
        $scope.recuperarInfomacionViajes();
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon)
        {
            cboTipoCon.style.display = 'none';
        }      
        $rootScope.btnEnviarFormPermisos = false; 
    };
    
    $scope.getListache= function(dato)
    {
        $scope.caras = dato;
    }

    //MOSTRANDO HISTORIAL DEL TRAMITE
    $scope.mostrarHistorico = function (tramite)
    {
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.recuperarSerializarInfo(tramite);
        $scope.template = "";
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI")
        {
            $scope.desabilitado = true;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
        }
        else
        {
            $scope.desabilitado = false;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
        }
        //EXISTE TIPO CONTRIBUYENTE
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon)
        {
            cboTipoCon.style.display = 'none';
        }
    };

    /*DOCUMENTOS MULTIPLES*/
    var idCiu = sessionService.get('IDCIUDADANO');
    $scope.uploader = new FileUploader({ url: CONFIG.APIURL + "?desripcion=ciudadano&&idCiudadano=" + idCiu });
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {};
    
    uploader.onAfterAddingFile = function(fileItem)
    {
        tipoDocumento = fileItem.file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        var count = 0;    
        if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "txt" || tipoDocumento == "plain" || tipoDocumento == "zip" || tipoDocumento == "rar" || tipoDocumento == "vnd.ms-word.document.12" || tipoDocumento == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || tipoDocumento == "vnd.visio" || tipoDocumento == "vnd.ms-publisher" || tipoDocumento == "msaccess" || tipoDocumento == "vnd.openxmlformats-officedocument.wordprocessingml.document")
        {
            $scope.botonSubirOriginal = null; 
            $scope.botonSubirError = "oculta";
        }
        else
        {
            $scope.botonSubirError = null; 
            $scope.botonSubirOriginal = "oculta";
        }
    };
    
    $scope.falla = function()
    {
        sweet.show('', "Tipo de archivo incorrecto elimine porfavor", 'error'); 
        $scope.desabilitado2 = true;
    }
    var archivoUpload = "";
    
    uploader.onSuccessItem = function(fileItem, response, status, headers)
    {
        //FORMANDO LA URL - ARCHIVO
        $scope.direccionvirtual = "RC_CLI";
        var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + $rootScope.tramiteId + "/" + fileItem._file.name + "?app_name=todoangular";
        var fileName = fileItem._file.name;
        var fileSize = (((fileItem._file.size)/1024)/1024);
        fileSize = fileSize.toFixed(2);
        if($scope.datos.ARCHIVOS_MULTIPLES)
        {
            aDocAdjuntos = $scope.datos.ARCHIVOS_MULTIPLES;
        }
        else
        {
            aDocAdjuntos    =   new Array();
        }
        var datosAdjuntos = 
        {
            "nombre_archivo" : fileName,
            "tam_archivo" : fileSize,
            "estado_archivo" : "Env.",
            "opcion_archivo" : "-",
            "url_archivo" : urlIdcos
        };        
        aDocAdjuntos.push(datosAdjuntos);
        $scope.adjuntosArray = aDocAdjuntos;
        var aFile = new Array();
        aFile.push(fileItem._file);
        $scope.almacenarDocumentos(aFile);
        fileItem.remove();
        $scope.datos.ARCHIVOS_MULTIPLES = aDocAdjuntos;
        //VALIDANDO FECHAS OBLIGATORIAS        
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };
    
    /*VALIDANDO BOTONES*/
    var clsValidarBtn = $rootScope.$on('validarBtn', function(event, data)
    {
        if(data.frm_tra_id)
        {
            $scope.tramitesCiudadano();
        }
    });
    $scope.$on('$destroy', function(){ clsValidarBtn(); }); 
    
    $scope.eliminarMultipleAdjunto = function(sIndex)
    {
        if($scope.datos.ARCHIVOS_MULTIPLES)
        {
            $scope.adjuntosArray = $scope.datos.ARCHIVOS_MULTIPLES;        
        }
        if($scope.adjuntosArray)
        {
            $scope.adjuntosArray.splice(sIndex, 1);
        }
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };
    $scope.modelFecha = 
    {
        startDate: new Date('01/01/1950'),
        endDate: new Date()
    };
    $scope.cambioTexto = function()
    {
      $scope.textCambio = "1";
    };
    
    $scope.datosComboRender =   function(sIdCbo, sqlData)
    {
        exp = new RegExp("&", "g");
        sqlData = sqlData.replace(exp,"'");
        var datosComboRender = new gModal();
        datosComboRender.sql = sqlData;
        datosComboRender.reporte_dinamico(function(resultado)
        {
            combo = JSON.parse(resultado).success.data;
            try{
                dpc_guardarDatos(combo[0].sp_reporte_dinamico123);
                dpc_dependencia(sIdCbo);
            }catch(e){
            };
        });
    };
    function dpc_guardarDatos(sArray) 
    {
        dpc_sDatos_inspector    =   new Array();
        dpc_k = 0;
        dpc_sDatos_inspector[dpc_k] = new Array('-- Seleccione --', '-1');
        dpc_k = dpc_k + 1;
        $.each(sArray, function(i, item)
        {
            dpc_sDatos_inspector[dpc_k] = new Array(item.dato, item.valor);
            dpc_k = dpc_k + 1;
        });
    }
    function dpc_dependencia(sIdCbo) 
    {
        dpc_i = 0;
        $("#"+sIdCbo).empty();
        for (dpc_i = 0; dpc_i < dpc_sDatos_inspector.length; dpc_i++)
        {
            dpc_miClave = dpc_sDatos_inspector[dpc_i][0];
            dpc_miValor = dpc_sDatos_inspector[dpc_i][1];
            $("#"+sIdCbo).append('<option value='+dpc_miValor+'>'+dpc_miClave+'</option>');
        }
    }
        $scope.addnna = function () 
        {
            if ($scope.model.selected.f01_NNA_G_CI == undefined)
            {
                if(!$scope.ninosviajan.TER_NNA_VIAJAN)  $scope.ninosviajan.TER_NNA_VIAJAN=[];
                var countNNA= $scope.ninosviajan.TER_NNA_VIAJAN.length+1;
                $scope.contador1= countNNA; 
                $scope.model.TER_NNA_VIAJAN=$scope.ninosviajan.TER_NNA_VIAJAN;
                var nna={
                    id: countNNA,
                    f01_NNA_TIP_DOC:"",
                    f01_NNA_G_CI: "",
                    f01_NNA_EXP_CIUD: "",       
                    f01_NNA_G_NOM: "",
                    f01_NNA_G_APAT: "",
                    f01_NNA_G_AMAT: "",
                    f01_NNA_G_FEC_NAC: "",
                    f01_NNA_G_LUG_NAC: "",
                    f01_NNA_DEP_OTRO: "",
                    f01_NNA_G_GEN: "",
                    f01_NNA_DIR: "",
                    f01_NNA_TER_TEL: "",
                    f01_NNA_G_TELF: "",
                    f01_NNA_ANVERSO_G_ARCH: "",
                    f01_NNA_REVERSO_G_ARCH: ""
                };    
                $scope.archiFileCIAnverso="";
                $scope.archiFileCIReverso="";
                $scope.archiFileOtro =  "";
                $scope.archiFileDNIAnverso="";
                $scope.archiFileDNIReverso="";
                $scope.model.TER_NNA_VIAJAN.push(nna);
                $scope.editnna(nna);
            }
            else
            {
                sweetAlert('GUARDAR','Debe presionar el Botón GUARDAR, para agregar otro registro');
            }
    };
    /*
     * CONTANDO ADULTOS
     */
    $scope.addresp = function () 
    { 
        if ($scope.modelResp.selectedR.f01_ADUL_G_CI == undefined)
        {        
            if(!$scope.ninosviajanA.TER_RESP)  $scope.ninosviajanA.TER_RESP=[];
            var countR= $scope.ninosviajanA.TER_RESP.length+1;  
            $scope.contador2= countR;             
            $scope.modelResp.TER_RESP=$scope.ninosviajanA.TER_RESP;  
            var resp={
                id: countR,         
                f01_ADUL_G_CI: "",
                f01_ADUL_EXP_CIUD: "",
                f01_ADUL_G_PARE: "",
                f01_ADUL_G_NOM: "",
                f01_ADUL_G_APAT: "",
                f01_ADUL_G_AMAT: "",
                f01_ADUL_G_FEC_NAC: "",
                f01_resp_G_LUG_NAC: "",
                f01_ADUL_G_GEN: "",                                     
                f01_ADUL_TER_CIUD: "",
                f01_ADUL_DEPA_OTRO: "",
                f01_ADUL_TER_MACRO: "",
                f01_ADUL_TER_ZONA: "",
                f01_ADUL_DIR: "",
                f01_ADUL_TER_TEL: "",
                f01_ADUL_G_TELF: "" ,
                f01_ADUL_F_CADUC_CI: "",
                f01_ADUL_ANVERSO_G_ARCH: "",
                f01_ADUL_REVERSO_G_ARCH: "",
                f01_ADUL_O_ADJ_G_ARCH_CN: "",
                f01_ADUL_ANVERSO_G_ARCH_DNI: "",
                f01_ADUL_REVERSO_G_ARCH_DNI: ""
            };
            $scope.archiFileCIAnversoA="";
            $scope.archiFileCIReversoA="";
            $scope.archiFileOtroA =  "";
            $scope.archiFileDNIAnversoA="";
            $scope.archiFileDNIAReversoA="";
            $scope.modelResp.TER_RESP.push(resp);
            $scope.editresp(resp);
        }
        else
        {
            sweetAlert('GUARDAR','Debe presionar el Botón GUARDAR, para agregar otro registro');
        }
    };
    $scope.contarGrillas = function()
    {
        nino=0;
        nina=0; 
        adolecenteV=0;
        adolecenteM=0;
        total_gral_v=0;
        total_gral_m=0;
        dato7="";
        dato8="";
        if($scope.ninosviajan.TER_NNA_VIAJAN != undefined)
        {
            var countlen = $scope.ninosviajan.TER_NNA_VIAJAN.length;
            for (var i = 0; i < countlen; i++)
            {
                dato7 = $scope.ninosviajan.TER_NNA_VIAJAN[i].f01_NNA_G_FEC_NAC;
                dato8 = $scope.ninosviajan.TER_NNA_VIAJAN[i].f01_NNA_G_GEN;
                var fec12345679 = new Date ($scope.ninosviajan.TER_NNA_VIAJAN[i].f01_NNA_G_FEC_NAC);
                if (fec12345679.getDate() < 10)
                {
                    dia = "0" + fec12345679.getDate();
                }
                else
                {
                    dia = fec12345679.getDate();
                }
                mes = fec12345679.getMonth() + 1;
                if ( mes < 10)
                {
                    mes = "0" + mes;
                }
                else
                {
                    mes = mes;    
                }
                fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia;
                $scope.f = moment(fechaNacOficial, "YYYY-MM-DD");
                $scope.g = moment(fechactual123, "YYYY-MM-DD");
                var ed = parseInt(($scope.g - $scope.f)/365/24/60/60/1000);            

                if (dato8=="F")
                {
                    if(ed>=12){
                            adolecenteV=adolecenteV+1;
                            $scope.datos.NNA_CAN_FEM=adolecenteV; //NNA_CAN_FEM
                    }else{
                            nino=nino+1;
                            $scope.datos.NNA_CANT_FEM=nino; //NNA_CANT_FEM
                    }
                } 
                if(dato8=="M")
                {
                    if(ed>=12)
                    {
                        adolecenteM=adolecenteM+1;
                        $scope.datos.NNA_CAN_MAS=adolecenteM;

                    }
                    else
                    {
                        nina=nina+1;
                        $scope.datos.NNA_CANT_MAS=nina;
                    }
                } 
            }
            total_gral_v = nino + nina;
            total_gral_m = adolecenteV + adolecenteM;
            $scope.datos.NNA_CANT_NN =  total_gral_v;
            $scope.datos.NNA_NRO_ADO =  total_gral_m;
            $scope.datos.NNA_CANT_TOTAL =  total_gral_v + total_gral_m;
        } 
    };

    $scope.esconderAdjuntos = function(num1)
    {
        if ($scope.model.selected.f01_NNA_TIP_DOC == "CI"){
            $scope.tipoArchivo1 = false;
            $scope.tipoArchivo2 = false;
            $scope.tipoArchivo3 = true;
            $scope.tipoArchivox4 = true;
            $scope.tipoArchivox5 = true;
        }  
        if ($scope.model.selected.f01_NNA_TIP_DOC == "CN"){
            $scope.tipoArchivo1 = true;
            $scope.tipoArchivo2 = true;
            $scope.tipoArchivo3 = false;
            $scope.tipoArchivox4 = true;
            $scope.tipoArchivox5 = true;
        }
        if ($scope.model.selected.f01_NNA_TIP_DOC == "DN"){
            $scope.tipoArchivo1 = true;
            $scope.tipoArchivo2 = true;
            $scope.tipoArchivo3 = true;
            $scope.tipoArchivox4 = false;
            $scope.tipoArchivox5 = false;
        } 

        if ($scope.model.selected.f01_NNA_G_CIUD == "10")
        {
            $scope.tipoArchivo21 = false;
            $scope.model.selected.f01_NNA_DEP_OTRO="";
        }
        else 
        {
            $scope.tipoArchivo21 = true;
        }
        if (num1 == 10)
        {
            $scope.model.selected.f01_NNA_G_CI="";
            $scope.model.selected.f01_NNA_G_NOM="";
            $scope.model.selected.f01_NNA_G_APAT="";
            $scope.model.selected.f01_NNA_G_AMAT="";
            $scope.model.selected.f01_NNA_DIR="";
            $scope.model.selected.f01_NNA_G_LUG_NAC="";
            $scope.model.selected.f01_NNA_TER_MACRO="";
            $scope.model.selected.f01_NNA_TER_ZONA="";
            $scope.model.selected.f01_NNA_DIR="";                       
            $scope.model.selected.f01_NNA_TER_TEL="";
            $scope.model.selected.f01_NNA_G_TELF="";
            $scope.model.selected.f01_NNA_F_CADUC_CI="";
            $scope.model.selected.f01_NNA_EXP_CIUD="";
            $scope.model.selected.f01_NNA_G_FEC_NAC="";
            $scope.model.selected.f01_NNA_G_GEN="";
            $scope.model.selected.f01_NNA_G_CIUD="";
            $scope.model.selected.f01_NNA_DEP_OTRO="";
            $scope.model.selected.f01_NNA_ANVERSO_G_ARCH="";
            $scope.model.selected.f01_NNA_REVERSO_G_ARCH="";
            $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN="";
            $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI="";
            $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI="";
        }
    };

    $scope.esconderAdjuntosA = function(num1)
    {
        if ($scope.modelResp.selectedR.f01_ADUL_TIP_DOC == "CI")
        {
            $scope.tipoArchivo11 = false;
            $scope.tipoArchivo12 = false;
            $scope.tipoArchivoAx1 = true;
            $scope.tipoArchivoAx2 = true;
        } 
        if ($scope.modelResp.selectedR.f01_ADUL_TIP_DOC == "DN")
        {
            $scope.tipoArchivo11 = true;
            $scope.tipoArchivo12 = true;    
            $scope.tipoArchivoAx1 = false;
            $scope.tipoArchivoAx2 = false;
        }
        if ($scope.modelResp.selectedR.f01_ADUL_TER_CIUD == "10")
        {
            $scope.tipoArchivo31 = false;
            $scope.modelResp.selectedR.f01_ADUL_DEPA_OTRO="";
        }
        else
        {
            $scope.tipoArchivo31 = true;
        }

        if (num1 == 10)
        {
            $scope.modelResp.selectedR.f01_ADUL_G_CI="";
            $scope.modelResp.selectedR.f01_ADUL_EXP_CIUD="";
            $scope.modelResp.selectedR.f01_ADUL_G_PARE_COND="";
            $scope.modelResp.selectedR.f01_ADUL_G_NOM="";
            $scope.modelResp.selectedR.f01_ADUL_G_APAT="";
            $scope.modelResp.selectedR.f01_ADUL_G_AMAT="";
            $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC="";
            $scope.modelResp.selectedR.f01_ADUL_LUG_NAC="";
            $scope.modelResp.selectedR.f01_ADUL_G_GEN="";
            $scope.modelResp.selectedR.f01_ADUL_TER_CIUD="";
            $scope.modelResp.selectedR.f01_ADUL_DEPA_OTRO="";
            $scope.modelResp.selectedR.f01_ADUL_TER_MACRO="";
            $scope.modelResp.selectedR.f01_ADUL_TER_ZONA="";
            $scope.modelResp.selectedR.f01_ADUL_DIR="";
            $scope.modelResp.selectedR.f01_ADUL_TER_TEL="";
            $scope.modelResp.selectedR.f01_ADUL_G_TELF="";
            $scope.modelResp.selectedR.f01_ADUL_G_VA="";
            $scope.model.selected.f01_ADUL_ANVERSO_G_ARCH="";
            $scope.model.selected.f01_ADUL_REVERSO_G_ARCH="";
            $scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI="";
            $scope.model.selected.f01_ADUL_O_ADJ_G_ARCH_CN="";
            $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH_DNI = "0";
            $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH_DNI = "0";
        }
    };
 
    $scope.enviarFormPermisoViajes = function(paramForm)
    {
        $rootScope.btnGuardarForm = true;
        var idProcodigoViajes = 'T-VF';
        var datosNeXO = {};
        var ternna_viajan = paramForm.TER_NNA_VIAJAN;
        nino=0;
        nina=0;
        adolecenteV=0;
        adolecenteM=0;
        total_gral_v=0;
        total_gral_m=0;
        var titulosnna = {
          "tipo": "GRD",
          "titulos": "CI|Exp.|Cert. Nac.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telf. 1|Cel. 2",
          "campos": "f01_NNA_G_CI|f01_NNA_EXP_CIUD|f01_NNA_G_CN|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC|f01_NNA_G_CIUD|f01_NNA_DEPA_OTRO|f01_NNA_G_GEN|f01_NNA_TER_MACRO|f01_NNA_TER_ZONA|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF",
          "impresiones": "true|true|true|true|true|true|true|no|true|no|true|no|true|true|no|true|"
        };
        ternna_viajan.unshift(titulosnna);
        paramForm.TER_NNA_VIAJAN = ternna_viajan;
        var titulosrep = {
          "tipo": "GRD",
          "titulos": "CI|Exp.|Parentesco/ Condición|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telf. 1|Cel. 2|Viaja/ Autoriza",
          "campos": "f01_ADUL_G_CI|f01_ADUL_EXP_CIUD|f01_ADUL_G_PARE_COND|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN|f01_ADUL_TER_MACRO|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_VA",
          "impresiones": "true|true|true|true|true|true|true|no|true|no|true|no|true|true|no|true|true|"
        };
        var ter_responsables = paramForm.TER_RESP;
        ter_responsables.unshift(titulosrep);
        paramForm.TER_RESP = ter_responsables;
        datosNeXO['g_tipo'] = "T-VF";
        g_datos_solicitante    =   new Array();
        var datos_solicitante = {};
        datos_solicitante['num_documento'] =   sessionService.get('CICIUDADANO');
        datos_solicitante['nombre'] =   sessionService.get('US_NOMBRE');
        datos_solicitante['paterno'] =   sessionService.get('US_PATERNO');
        datos_solicitante['materno'] =   sessionService.get('US_MATERNO');
        g_datos_solicitante.push(datos_solicitante);
        datosNeXO['datos_solicitante'] =   g_datos_solicitante;
        datosNeXO['G_CI'] = sessionService.get('CICIUDADANO');
        
        if ($scope.PERMISO == 'F')
        {
            datosNeXO['TER_TIP_PERMISO'] = $scope.PERMISO;
            if(paramForm.TER_TIP_PERMISO=="1-F") datosNeXO['FAM_AUTORIZA'] = "MATRIMONIO VIGENTE";
            if(paramForm.TER_TIP_PERMISO=="2-F") datosNeXO['FAM_AUTORIZA'] = "CASO DIVORCIO";
            if(paramForm.TER_TIP_PERMISO=="3-F") datosNeXO['FAM_AUTORIZA'] = "FALLECIMIENTO PADRE O MADRE";
            if(paramForm.TER_TIP_PERMISO=="4-F") datosNeXO['FAM_AUTORIZA'] = "PADRE O MADRE SOLOS";
            datosNeXO['TER_TIP_SOL'] = paramForm.TER_TIP_SOL;
            datosNeXO['G_NNA_NOM'] = paramForm.G_NNA_NOM;
            datosNeXO['G_NNA_PAT'] = paramForm.G_NNA_PAT;
            datosNeXO['G_NNA_MAT'] = paramForm.G_NNA_MAT;
            datosNeXO['TER_FEC_RET'] = paramForm.TER_FEC_RET;
            datosNeXO['TER_FEC_FIN'] = paramForm.TER_FEC_FIN;
            datosNeXO['TER_SOLOS'] = paramForm.TER_SOLOS;
            datosNeXO['TER_NNA_VIAJAN'] = paramForm.TER_NNA_VIAJAN;
            datosNeXO['TER_RESP'] = paramForm.TER_RESP;
            datosNeXO['TER_DEST'] = paramForm.TER_DEST;
            datosNeXO['TER_MIN'] = paramForm.TER_MIN;
            datosNeXO['TER_MOT'] = paramForm.TER_MOT;
            datosNeXO['TER_OTRO_MOT'] = paramForm.TER_OTRO_MOT;
            datosNeXO['DEF_FEC_ING'] = paramForm.DEF_FEC_ING;
            datosNeXO['TER_TIP_CASO'] = "6";
            datosNeXO['DEF_EDAD_ETAPA'] = "NA";
            datosNeXO['DEF_INSTANCIAS'] = "UDIF_T";
        }
        if ($scope.PERMISO == 'D')
        {
            datosNeXO['G_NNA_NOM'] = paramForm.G_NNA_NOM;
            datosNeXO['G_NNA_PAT'] = paramForm.G_NNA_PAT;
            datosNeXO['G_NNA_MAT'] = paramForm.G_NNA_MAT;
            datosNeXO['TER_TIP_PERMISO'] = paramForm.TER_TIP_PERMISO;
            datosNeXO['TER_NOM_INST'] = paramForm.TER_NOM_INST;
            datosNeXO['TER_INST_DIR'] = paramForm.TER_INST_DIR;
            datosNeXO['TER_INST_TELF'] = paramForm.TER_INST_TELF;
            datosNeXO['TER_FEC_RET'] = paramForm.TER_FEC_RET;
            datosNeXO['TER_FEC_FIN'] = paramForm.TER_FEC_FIN;
            datosNeXO['TER_NNA_VIAJAN'] = paramForm.TER_NNA_VIAJAN;
            datosNeXO['TER_RESP'] = paramForm.TER_RESP;
            datosNeXO['TER_DEST'] = paramForm.TER_DEST;
            datosNeXO['TER_MIN'] = paramForm.TER_MIN;
            datosNeXO['TER_MOT'] = paramForm.TER_MOT;
            datosNeXO['TER_OTRO_MOT'] = paramForm.TER_OTRO_MOT;
            datosNeXO['TER_NNA_DEL'] = paramForm.TER_NNA_DEL;
            datosNeXO['NNA_CANT_MAS'] = paramForm.NNA_CANT_MAS;
            datosNeXO['NNA_CANT_FEM'] = paramForm.NNA_CANT_FEM;
            datosNeXO['NNA_CANT_NN'] = paramForm.NNA_CANT_NN;
            datosNeXO['NNA_CAN_MAS'] = paramForm.NNA_CAN_MAS;
            datosNeXO['NNA_CAN_FEM'] = paramForm.NNA_CAN_FEM;
            datosNeXO['NNA_NRO_ADO'] = paramForm.NNA_NRO_ADO;
            datosNeXO['NNA_CANT_TOTAL'] = paramForm.NNA_CANT_TOTAL;
            datosNeXO['DEF_FEC_ING'] = paramForm.DEF_FEC_ING;
            datosNeXO['TER_TIP_CASO'] = "6";
            datosNeXO['DEF_EDAD_ETAPA'] = "NA";
            datosNeXO['DEF_INSTANCIAS'] = "UDIF_T";
        }
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(datosNeXO);
        /*********LLamada al API de forma directa**************/
        var creartramite = new gCrearCaso();
        creartramite.usr_id = 1;
        creartramite.datos = datosSerializados;
        creartramite.procodigo = idProcodigoViajes;
        creartramite.crearSolicitudViaje(function(resultado)
        {
            resultadoApi = JSON.parse(resultado);
            var results = resultadoApi.success.data;
            indice = 0;
            if(results.length > 0)
            {
                datosIF = results[0].sp_pmfunction_generica.split(",");
                datosIF2 = datosIF[2];
                datosIF3 = datosIF[3];
                datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                $scope.nrotramitec = datosIF[0];
                sessionService.set('NROTRAMITE', datosIF[0]);
                sessionService.set('NROTRAMITEID', datosIF[2]);
                sessionService.set('IDPROCESO', datosIF[3]);
                var idTramite1 =  sessionService.get('NROTRAMITEID');
                $scope.tramiteSelect.venviado = "SI";
                $scope.tramiteSelect.vcodigo = datosIF[0];
                $scope.validarFormProcesos(paramForm);
            }
            else
            {
                $scope.msg = "Error al enviar el formulario de permiso de viajes!";
            }
            $.unblockUI();         
        }); 
    };

    $scope.mensajevs = function(){ $scope.mostrarMsgActividadTrue=true; };

    $scope.validarFormProcesos = function(datosForm)
    {
        var idTramite = sessionService.get('IDTRAMITE');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;      
        var sparametros = new reglasnegocio();
        sparametros.identificador = "RCCIUDADANO_81";
        sparametros.parametros ='{"idTramite":"' + idTramite + '","enviado":"SI","codigo":"' + nroTramiteEnviado + '","id_usuario":"' + idUsuario + '" }';
        var ter_responsables = datosForm.TER_RESP;
        ter_responsables.shift();
        datosForm.TER_RESP = ter_responsables;
        var ter_responsablesnna = datosForm.TER_NNA_VIAJAN;
        ter_responsablesnna.shift();
        datosForm.TER_NNA_VIAJAN = ter_responsablesnna;

        sparametros.llamarregla(function(results)
        {
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            sweet.show('Señor Ciudadano su Nro de trámite  es : ' + nroTramiteEnviado, " NOTA: Tiene 7 días para aproximarse a la plataforma DNA terminal con su respectiva documentación, caso contrario su registro será dado de baja, NO SE REQUIERE FOTOCOPIAS."); 
            $rootScope.btnViajes = null;
            $rootScope.desabilitado = true;
            href="#registro_ciudadano|servicios|index2.html"
        });
        $rootScope.btnViajes = null;
        $rootScope.btnEnviarFormPermisos = false;
    };

    $scope.model = {
        TER_NNA_VIAJAN: [],
        selected: {}
    };

    $scope.getTemplate = function (nna) 
    {
        $scope.model.TER_NNA_VIAJAN=$scope.ninosviajan.TER_NNA_VIAJAN;
        if (nna.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };
    $scope.editnna = function (nna) 
    {
        $scope.model.selected = angular.copy(nna);
        $scope.contarGrillas();
    };

    $scope.savenna = function (idx)
    {
        var dato1 = $scope.model.selected.f01_NNA_TIP_DOC;        
        var dato2 = $scope.model.selected.f01_NNA_G_CI;       
        var dato3 = $scope.model.selected.f01_NNA_EXP_CIUD;       
        var dato4 = $scope.model.selected.f01_NNA_G_NOM;        
        var dato5 = $scope.model.selected.f01_NNA_G_APAT;        
        var dato6 = $scope.model.selected.f01_NNA_G_AMAT;
        var dato7 = $scope.model.selected.f01_NNA_G_FEC_NAC;       
        var dato8 = $scope.model.selected.f01_NNA_G_GEN;
        var dato9 = $scope.model.selected.f01_NNA_G_CIUD;
        var dato10 = $scope.model.selected.f01_NNA_DEP_OTRO;
        var dato11 = $scope.model.selected.f01_NNA_DIR;
        var dato12 = $scope.model.selected.f01_NNA_F_CADUC_CI;
        var dato13 = $scope.model.selected.f01_NNA_G_CIUD;
        var dato14 = $scope.model.selected.f01_NNA_DIR;

        if(dato1 == "" || dato2 == "" || dato3 == "" || dato4 == "" || dato7 == "" || dato8 == "" || dato9 == "" || dato12 === undefined || dato13 === undefined || dato14 == "")
        {   
            sweetAlert('','Complete Todos Los Datos de las casillas rojas que son obligatorias','error');
        }
        else
        {
            var contadorNino = dato7;
            if ($scope.model.selected.f01_NNA_G_FEC_NAC.length>0){}
            else
            {
                fec12345679 = new Date ($scope.model.selected.f01_NNA_G_FEC_NAC);
                if (fec12345679.getDate() < 10)
                {
                    dia = "0" + fec12345679.getDate();
                }
                else
                {
                    dia = fec12345679.getDate();
                }
                mes = fec12345679.getMonth() + 1;
                if ( mes < 10)
                {
                    mes = "0" + mes;
                }
                else
                {
                    mes = mes;
                }
                fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia;
                $scope.model.selected.f01_NNA_G_FEC_NAC=fechaNacOficial;
            }
            if ($scope.model.selected.f01_NNA_TIP_DOC == 'CI')
            {
                if ($scope.model.selected.f01_NNA_F_CADUC_CI.length>0){}
                else
                {
                    fec12345679 = new Date ($scope.model.selected.f01_NNA_F_CADUC_CI);
                    if (fec12345679.getDate() < 10)
                    {
                        dia = "0" + fec12345679.getDate();
                    }
                    else
                    {
                        dia = fec12345679.getDate();
                    }
                    mes = fec12345679.getMonth() + 1;
                    if ( mes < 10)
                    {
                        mes = "0" + mes;
                    }
                    else 
                    {
                        mes = mes;
                    }
                    fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia;
                    $scope.model.selected.f01_NNA_F_CADUC_CI=fechaNacOficial;
                }

                if(document.getElementById('f01_NNA_ANVERSO_G_ARCH').value && document.getElementById('f01_NNA_REVERSO_G_ARCH').value) 
                {
                    var multi_datos = document.getElementById('f01_NNA_ANVERSO_G_ARCH');
                        if(multi_datos.files[0] === undefined){}
                        else
                        {
                            $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                            var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                            $scope.model.selected.f01_NNA_ANVERSO_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                        }   
                        var multi_datos = document.getElementById('f01_NNA_REVERSO_G_ARCH');
                        if(multi_datos.files[0] === undefined){}
                        else
                        {
                            $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                            var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                            $scope.model.selected.f01_NNA_REVERSO_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                        }
                        $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN = "0";
                        $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI = "0";
                        $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI = "0";                
                        $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                        $scope.reset();
                        $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                }
                else 
                { 
                    $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                }
            }else{}

            if ($scope.model.selected.f01_NNA_TIP_DOC == 'CN')
            {
                $rootScope.OIDtemp = $scope.model.selected.f01_NNA_G_CI;
                if(document.getElementById('f01_NNA_O_ADJ_G_ARCH_CN').value)
                {
                    var multi_datos = document.getElementById('f01_NNA_O_ADJ_G_ARCH_CN');
                    if(multi_datos.files[0] === undefined){}
                    else
                    {
                        $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                        var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                        $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                    }   
                    $scope.model.selected.f01_NNA_ANVERSO_G_ARCH = "0";
                    $scope.model.selected.f01_NNA_REVERSO_G_ARCH = "0";
                    $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI = "0";
                    $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI = "0";
                    $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                } 
                else 
                { 
                    $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                }  
            }
            if ($scope.model.selected.f01_NNA_TIP_DOC == 'DN')
            {
                $rootScope.OIDtemp = $scope.model.selected.f01_NNA_G_CI;
                if(document.getElementById('f01_NNA_ANVERSO_G_ARCH_DNI').value && document.getElementById('f01_NNA_REVERSO_G_ARCH_DNI').value) 
                {
                    var multi_datos = document.getElementById('f01_NNA_ANVERSO_G_ARCH_DNI');
                    if(multi_datos.files[0] === undefined){}
                    else
                    {
                        $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                        var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                        $scope.model.selected.f01_NNA_ANVERSO_G_ARCH_DNI= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                    }   
                    var multi_datos = document.getElementById('f01_NNA_REVERSO_G_ARCH_DNI');
                    if(multi_datos.files[0] === undefined){}
                    else
                    {
                        $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                        var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                        $scope.model.selected.f01_NNA_REVERSO_G_ARCH_DNI= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                    }
                    $scope.model.selected.f01_NNA_O_ADJ_G_ARCH_CN= "0";
                    $scope.model.selected.f01_NNA_ANVERSO_G_ARCH = "0";
                    $scope.model.selected.f01_NNA_REVERSO_G_ARCH = "0";
                                    
                    $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                }
                else 
                { 
                    $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
                    $scope.reset();
                    $scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;
                }
            }
            $scope.$evalAsync();
        }
        $scope.contarGrillas();
    };
    $scope.validarCompleto = function(telf,cell,num,tipo)
    {
        var telefono=telf.toString(); 
        var celular=cell.toString();     
        if (tipo == 99)
        {  
            if (telefono.length == 7 ){}
            else
            {
               sweetAlert('El Número telefonico debe ser de 7 dígitos :', 'Ej. 2234567');
                if(num = 10){
                $scope.datos.TER_INST_TELF = null;
                }  
                if(num = 20){
                $scope.model.selected.f01_NNA_TER_TEL = null;
                } 
                if(num = 30){
                $scope.modelResp.selectedR.f01_ADUL_TER_TEL = null;
                }  
            }
        }
        else
        {   
            if (celular.length == 8 ){}
            else
            {
                sweetAlert('El Número de celular debe ser de 8 dígitos :', 'Ej. 72345678');
                if(num = 5){
                $scope.model.selected.f01_NNA_G_TELF = null;
                }
                if(num = 15){
                $scope.modelResp.selectedR.f01_ADUL_G_TELF = null;
                }    
            }
        }
    }
    
    $scope.validarTelfDelega = function(telf)
    {
        var telefono=telf.toString();
        var verific = telefono.substring(0, 1);

        if ( verific == "2" ||  verific == "3" || verific == "4") 
        {
            if (telefono.length <=7 ){}
            else
            {
                var tele = telefono.substring(0, 7 );
                tele = parseInt(tele);
                $scope.datos.TER_INST_TELF = tele;
                sweetAlert('Error en Teléfono' , 'Verifique que el telefono empiece con 2-3-4 y tenga 7 dígitos');
            }
        }
        else
        {
            $scope.datos.TER_INST_TELF = null;
            sweetAlert('Error en Teléfono' , 'El primer digito debe comenzar con 2-3-4 Ej. 2237732 o 3225541 o 4124511');
        }

    }
    $scope.validarTelf = function(telf)
    {
        var telefono=telf.toString();
        var verific = telefono.substring(0, 1);    
        if ( verific == "2" ||  verific == "3" || verific == "4")
        {
            if (telefono.length <=7 ){}
            else
            {
                var tele = telefono.substring(0, 7 );
                tele = parseInt(tele);
                $scope.model.selected.f01_NNA_TER_TEL = tele;
                sweetAlert('Error en Teléfono' , 'Verifique que el telefono empiece con 2-3-4 y tenga 7 dígitos');
            }
        }
        else
        {
            $scope.model.selected.f01_NNA_TER_TEL = null;
            sweetAlert('Error en Teléfono' , 'El primer digito debe comenzar con 2-3-4 Ej. 2237732 o 3225541 o 4124511');
         }

     }
    $scope.validarCell = function(cell)
    {
        var telefono=cell.toString();
        var verific = telefono.substring(0, 1);
        if ( verific == "7" ||  verific == "6" )
        {
            if (telefono.length <= 8 ){}
            else
            {
                var tele = telefono.substring(0, 8);
                tele = parseInt(tele);
                $scope.model.selected.f01_NNA_G_TELF = tele;
                sweetAlert('Error en Celular' , 'Verifique que el celular empiece con 6-7 y tenga 8 dígitos');
            }
        }
        else 
        {
            $scope.model.selected.f01_NNA_G_TELF = null;
            sweetAlert('Error en Celular' , 'Verifique que el celular empiece con 6-7 y tenga 8 dígitos');
        }

    }
    $scope.validarTelfA = function(telf)
    {
        var telefono=telf.toString();
        var verific = telefono.substring(0, 1);
        if ( verific == "2" ||  verific == "3" || verific == "4") 
        {
            if (telefono.length <=7 ){}
            else
            {
                var tele = telefono.substring(0, 7);
                tele = parseInt(tele);
                $scope.modelResp.selectedR.f01_ADUL_TER_TEL = tele;
                sweetAlert('Error en Teléfono' , 'Verifique que el telefono empiece con 2-3-4 y tenga 7 dígitos');
            }
      }
      else
      {
        $scope.modelResp.selectedR.f01_ADUL_TER_TEL = null;
        sweetAlert('Error en Teléfono' , 'El primer digito debe comenzar con 2-3-4 Ej. 2237732 o 3225541 o 4124511');
      }

    }
    $scope.validarCellA = function(cell)
    {
        var telefono=cell.toString();
        var verific = telefono.substring(0, 1);
        
        if ( verific == "7" ||  verific == "6" )
        {
            if (telefono.length <= 8 ){}
            else
            {
                var tele = telefono.substring(0, 8);
                tele = parseInt(tele);
                $scope.modelResp.selectedR.f01_ADUL_G_TELF = tele;
                sweetAlert('Error en Celular' , 'Verifique que el celular empiece con 6-7 y tenga 8 dígitos');        
            }
        }
        else 
        {
            $scope.modelResp.selectedR.f01_ADUL_G_TELF = null;
            sweetAlert('Error en Celular' , 'Verifique que el celular empiece con 6-7 y tenga 8 dígitos');
        }
    }

    $scope.reset = function (){ $scope.model.selected = {}; };

    $scope.modelResp = {
        TER_RESP: [],
        selectedR: {}
    };
    $scope.getTemplateResp = function (resp) 
    { 
        $scope.modelResp.TER_RESP=$scope.ninosviajanA.TER_RESP;
        if (resp.id === $scope.modelResp.selectedR.id) 
             return 'editR';
        else return 'displayR';
    };

    $scope.editresp = function (resp) 
    {
        $scope.modelResp.selectedR = angular.copy(resp);
    };

    $scope.saveresp = function (idx) 
    {
        var dato1 = $scope.modelResp.selectedR.f01_ADUL_TIP_DOC;
        var dato2 = $scope.modelResp.selectedR.f01_ADUL_G_CI;
        var dato3 = $scope.modelResp.selectedR.f01_ADUL_EXP_CIUD;
        var dato4 = $scope.modelResp.selectedR.f01_ADUL_G_NOM;
        var dato5 = $scope.modelResp.selectedR.f01_NNA_G_APAT;
        var dato6 = $scope.modelResp.selectedR.f01_NNA_G_AMAT;
        var dato7 = $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC;
        var dato8 = $scope.modelResp.selectedR.f01_ADUL_G_GEN;
        var dato10 = $scope.model.selected.f01_ADUL_DIR;
        var dato11 = $scope.model.selected.f01_ADUL_G_VA;
        var dato12 = $scope.modelResp.selectedR.f01_ADUL_TER_CIUD;
        var dato13 = $scope.modelResp.selectedR.f01_ADUL_G_VA;
        var dato14 = $scope.modelResp.selectedR.f01_ADUL_G_PARE_COND;

        if(dato1 == "" || dato2 == "" || dato3 == "" || dato4 == "" || dato7 == "" || dato8 == "" || dato12 === undefined || dato13 === undefined || dato14 === undefined)
        {
            sweetAlert('','Complete Todos Los Datos de las casillas rojas que son obligatorias','error');
        }
        else
        {
            if ($scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC.length>0){}
            else
            {
                fec12345679 = new Date ($scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC);
                if (fec12345679.getDate() < 10){
                    dia = "0" + fec12345679.getDate();
                } else {
                    dia = fec12345679.getDate();
                }
                mes = fec12345679.getMonth() + 1;
                if ( mes < 10){
                    mes = "0" + mes;
                } else {
                    mes = mes;
                }
                fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia;
                $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC=fechaNacOficial;
            }
            
            if ($scope.modelResp.selectedR.f01_ADUL_TIP_DOC == 'CI')
            {            
                if ($scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI.length>0) {}
                else
                {
                    fec12345679 = new Date ($scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI);
                    if (fec12345679.getDate() < 10){
                        dia = "0" + fec12345679.getDate();
                    } else {
                        dia = fec12345679.getDate();
                    }
                    mes = fec12345679.getMonth() + 1;
                    if ( mes < 10){
                        mes = "0" + mes;
                    } else {
                        mes = mes;
                    }
                    fechaNacOficial = fec12345679.getFullYear() + "-" + mes + "-" + dia;
                    $scope.modelResp.selectedR.f01_ADUL_F_CADUC_CI=fechaNacOficial;
                }

                if(document.getElementById('f01_ADUL_ANVERSO_G_ARCH').value && document.getElementById('f01_ADUL_REVERSO_G_ARCH').value)
                {
                    var multi_datos = document.getElementById('f01_ADUL_ANVERSO_G_ARCH');
                    if(multi_datos.files[0] === undefined){}
                    else
                    {
                        $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                        var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                        $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                    }   
                    var multi_datos = document.getElementById('f01_ADUL_REVERSO_G_ARCH');
                    if(multi_datos.files[0] === undefined){
                    }
                    else
                    {
                        $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                        var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                        $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                    }
                    $scope.modelResp.selectedR.f01_ADUL_O_ADJ_G_ARCH_CN = "0";
                    $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH_DNI = "0";
                    $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH_DNI = "0";
                    $scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
                    $scope.resetresp();
                    $scope.ninosviajanA.TER_RESP = $scope.modelResp.TER_RESP;
                }
                else
                { 
                    $scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
                    $scope.resetresp();
                    $scope.ninosviajanA.TER_RESP = $scope.modelResp.TER_RESP;
                }
                
            }
        
        if ($scope.modelResp.selectedR.f01_ADUL_TIP_DOC == 'DN')
        {
            if(document.getElementById('f01_ADUL_ANVERSO_G_ARCH_DNI').value && document.getElementById('f01_ADUL_REVERSO_G_ARCH_DNI').value)
            {
                $rootScope.OIDtemp = $scope.modelResp.selectedR.f01_ADUL_G_CI;
                var multi_datos = document.getElementById('f01_ADUL_ANVERSO_G_ARCH_DNI');
                if(multi_datos.files[0] === undefined){}
                else
                {
                    $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                    var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                    $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH_DNI= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                }   
                var multi_datos = document.getElementById('f01_ADUL_REVERSO_G_ARCH_DNI');
                if(multi_datos.files[0] === undefined){}
                else
                {
                    $scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ $rootScope.OIDtemp + "/";
                    var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
                    $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH_DNI= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
                }
                $scope.modelResp.selectedR.f01_ADUL_O_ADJ_G_ARCH_CN = "0";
                $scope.modelResp.selectedR.f01_ADUL_ANVERSO_G_ARCH = "0";
                $scope.modelResp.selectedR.f01_ADUL_REVERSO_G_ARCH = "0";
                $scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
                $scope.resetresp();
                $scope.ninosviajanA.TER_RESP = $scope.modelResp.TER_RESP;
            } 
            else
            { 
                $scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
                $scope.resetresp();
                $scope.ninosviajanA.TER_RESP = $scope.modelResp.TER_RESP;
            }
            
        }   
        $scope.$evalAsync();
    }
    };

    $scope.guardarArchivo = function (fArchivo) 
    {
        nombreCampo = fArchivo.id;
        valorCampo = fArchivo.value;
        tipo = fArchivo.type;
        data = '"{';
        if(fArchivo.files === undefined)
        {
            $scope.direccionvirtual= CONFIG.APIURL +"/files/" + $scope.sIdProcesoActual + "/" + $scope.sIdCaso + "/";
            data = data+ '"'+nombreCampo +'":"'+$scope.direccionvirtual+fArchivo.name+'?app_name=todoangular",';
            }
            else
            {
                $scope.direccionvirtual = CONFIG.APIURLIF + "/files/SCANNER/"+sessionService.get('CICIUDADANO')+"/";
                var direccion = fileUpload.uploadFileToUrl(fArchivo.files[0], $scope.direccionvirtual);
                var z=valorCampo.split('\\');
                if (z[2] === undefined)
                {
                    data = data+ '"'+nombreCampo +'":"'+$scope.direccionvirtual+valorCampo+'?app_name=todoangular",';
                }
                else
                {
                    data = data+ '"'+nombreCampo +'":"'+$scope.direccionvirtual+z[2]+'?app_name=todoangular",';                                    
                }
            }
            return data;
        }
    $scope.resetresp = function () { $scope.modelResp.selectedR = {}; };
    $scope.VerificarCapchaaViajes = function(responce)
    {  
        if($scope.modelResp.selectedR.f01_ADUL_G_CI == undefined && $scope.model.selected.f01_NNA_G_CI == undefined)
        {
            if($scope.ninosviajan.TER_NNA_VIAJAN == undefined  && $scope.ninosviajanA.TER_RESP == undefined)
            {
                sweetAlert('DATOS','Debe llenar los datos de los niños(as) que viajan y de los adultos viajan/acompañan');
            }
            else
            {
                $scope.serializarInfViajes(responce);
                $scope.habilitarEnvioTramite(responce);
            }
        }
        else
        {
           sweetAlert('GUARDAR','Debe guardar los datos de los niños(as) que viajan y de los adultos viajan/acompañan con el BOTON GUARDAR');
        }
    };    
    $scope.bloquearForm = function(){ $scope.desabilitado = true;};
    $scope.desBloquearForm = function(){ $scope.desabilitado = false;};
    $scope.cambioServicio = function(dat){ $scope.servicio = dat;}
    $scope.combo = "<select id='servicio' class='seleccionaServicio'>  <option value='1'>Internet</option> <option value='3'>Salud</option> <option value='4'>Publicidad</option> </select> <br>";
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    catch (e) { console.log("Error en Body modal-open", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });
    /*
     * ROMEL CESPEDES FLORES
     */

//Boton de confirmacion
app.directive("confirmButton", function($document, $parse)
{
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var buttonId, html, message, nope, title, yep;      
            buttonId = Math.floor(Math.random() * 10000000000);
            attrs.buttonId = buttonId;
            message = attrs.message || "Are you sure?";
            yep = attrs.yes || "Yes";
            nope = attrs.no || "No";
            title = attrs.title || "Crear nuevo tramite";
            html = "<div style='width:190px;' id=\"button-" + buttonId + "\">\n " + scope.combo + "<span class=\"confirmbutton-msg\">" + message + "</span><br>\n   <button ng-disabled='frmServicio.$invalid' data-dismiss='modal' class=\"confirmbutton-yes btn btn-success\">" + yep + "</button>\n    <button class=\"confirmbutton-no btn btn-danger\">" + nope + "</button> \n</div>";
            element.popover({
                content: html,
                html: true,
                trigger: "manual",
                title: title
            });
            return element.bind('click', function(e) {
                var dontBubble, pop;
                dontBubble = true;
                e.stopPropagation();
                element.popover('show');
                pop = $("#button-" + buttonId);
                pop.closest(".popover").click(function(e) {
                    if (dontBubble) {
                        e.stopPropagation();
                    }
                });
                pop.find('.seleccionaServicio').change(function(e) {
                    scope.cambioServicio(servicio.value);
                }); 
                pop.find('.confirmbutton-yes').click(function(e) {
                    dontBubble = false;
                    var func = $parse(attrs.confirmButton);
                    func(scope);
                });        
                pop.find('.confirmbutton-no').click(function(e) {
                    dontBubble = false;
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });
                
                $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
                  $document.off('click.confirmbutton.' + buttonId);
                  element.popover('hide');
                });
            });
        }
    };
});