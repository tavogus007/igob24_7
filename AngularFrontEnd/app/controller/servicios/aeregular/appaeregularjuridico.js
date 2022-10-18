app.controller('regularjuridicoController', function ($scope,$timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window, obtFechaActual) {
    
    var fecha           = new Date();
    var fechactual      = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.divJuridico              = false;
    $scope.divOcultarJuegos         = true;
    $scope.tblTramites              =   {};
    $scope.trmUsuario               =   [];
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.btnEnviarFormLinea  =   "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;


    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual          =   "";    
    $scope.nroOrdenActividiadEconomicaActual    =   "";    
    $scope.idContribuyenteAEActual              =   "";    
    //RADIO PARA VER SI REALIZARA UNA NUEVA ACTIVIDAD O UNA RENOVACION     
   $scope.validarEmisionRenovacion = function (camb) {
       var datosgen = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
       if (camb != "NUEVO" && datosgen.length > 0) {            
            $scope.botones = null;
            $scope.desabilitado = true;
            swal('', "Favor revisar la información y seleccionar la que corresponda.", 'warning');
       }else{
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
       }
   }
   
   /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
   $scope.cambioToggleForm = function (cambio) {
        $scope.validarEmisionRenovacion(cambio);        
        if (cambio == "NUEVO") {
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE = false;
            $scope.mostrarMsgActividadTrue = false;
            $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion. Creara una nueva Actividad Economica.";
            //NUEVO
            $scope.tipoCategoria = false;
            $scope.actividadDesarrollada = true;
            $scope.datos.f01_id_actividad_economica = '';
            $scope.datos.f01_nro_orden = "";
            $scope.datos.f01_nit = '';
            $scope.datos.f01_raz_soc = '';
            $scope.datos.f01_sup = '';
            $scope.datos.f01_cap_aprox = '';
            $scope.datos.f01_de_hor = '';
            $scope.datos.f01_a_hor = '';
            $scope.datos.f01_fecha_ini_act = '';
            $scope.datos.f01_estab_es = '';
            $scope.datos.f01_macro_act = '';
            $scope.datos.f01_macro_act_descrip = '';
            $scope.datos.f01_dist_act = '';
            $scope.datos.f01_dist_act_descrip = '';
            $scope.datos.f01_tip_via_act = '';
            $scope.datos.f01_zona_act = '';
            $scope.datos.f01_zona_act_descrip = '';
            $scope.datos.f01_num_act = '';
            $scope.datos.f01_num_act1 = '';
            $scope.datos.f01_edificio_act = '';
            $scope.datos.f01_bloque_act = '';
            $scope.datos.f01_piso_act = '';
            $scope.datos.f01_dpto_of_loc = '';
            $scope.datos.f01_tel_act1 = '';
            $scope.datos.f01_cod_luz = '';
            $scope.datos.f01_idCodigoZona = '';
            $scope.datos.f01_casilla = '';
            $scope.datos.f01_productosElaborados = '';
            $scope.datos.f01_actividadesSecundarias = '';
            $scope.datos.f01_factor = '';
            $scope.datos.f01_tip_act = '';
            //$scope.datos.f01_tipo_lic = '';
            $scope.datos.f01_categoria = '';           
            $scope.licenciaToogle1 = false;
            $scope.licenciaToogle2 = true;  
            $scope.licenciaToogle1 = false;
            $scope.licenciaToogle2 = true;
            $scope.publicidad = '';
            $scope.publicidad_grilla = '';
            $scope.datos.publicidad ='';
            $scope.licdes=[];
            $scope.multiple=[];
            $scope.dscripcionlic = {};
            $scope.licenciamul = '';
            $scope.datos.licenciam = '';
            $scope.licmul_grilla = '';
            $scope.datos.Licenmul_grilla = '';
            $scope.datos.mulact_principal = '';
            $scope.publicid = '';
            $scope.datos.f01_actividad_principal_array =[];
            $scope.datos.FILE_CI = '';
            $scope.datos.fileArchivosAd = '';

        } else {
            //RENOVACION
            $scope.mostrarMsgNuevaActividad = false;            
            $scope.mostrarMsgActividadTrue = true;    
            $scope.mostrarMsgActividadFalse = false;    
            $scope.formDatosAE = true;
            $scope.tipoCategoria = false;
            $scope.actividadDesarrollada = true;
            $scope.datos.f01_id_actividad_economica = '';
            $scope.datos.f01_nro_orden = "";
            $scope.datos.f01_nit = '';
            $scope.datos.f01_raz_soc = '';
            $scope.datos.f01_sup = '';
            $scope.datos.f01_cap_aprox = '';
            $scope.datos.f01_de_hor = '';
            $scope.datos.f01_a_hor = '';
            $scope.datos.f01_fecha_ini_act = '';
            $scope.datos.f01_estab_es = '';
            $scope.datos.f01_macro_act = '';
            $scope.datos.f01_macro_act_descrip = '';
            $scope.datos.f01_dist_act = '';
            $scope.datos.f01_dist_act_descrip = '';
            $scope.datos.f01_tip_via_act = '';
            $scope.datos.f01_zona_act = '';
            $scope.datos.f01_zona_act_descrip = '';
            $scope.datos.f01_num_act = '';
            $scope.datos.f01_num_act1 = '';
            $scope.datos.f01_edificio_act = '';
            $scope.datos.f01_bloque_act = '';
            $scope.datos.f01_piso_act = '';
            $scope.datos.f01_dpto_of_loc = '';
            $scope.datos.f01_tel_act1 = '';
            $scope.datos.f01_cod_luz = '';
            $scope.datos.f01_idCodigoZona = '';
            $scope.datos.f01_casilla = '';
            $scope.datos.f01_productosElaborados = '';
            $scope.datos.f01_actividadesSecundarias = '';
            $scope.datos.f01_factor = '';
            $scope.datos.f01_tip_act = '';
            $scope.datos.f01_tipo_lic = '';
            $scope.datos.f01_categoria = '';
            $scope.datos.f01_categoria_descrip = '';
            $scope.licenciaToogle1 = true;
            $scope.licenciaToogle2 = false;
            $scope.licenciaToogle1 = false;
            $scope.licenciaToogle2 = true;
            $scope.publicidad = '';
            $scope.publicidad_grilla = '';
            $scope.datos.publicidad ='';
            $scope.licdes=[];
            $scope.multiple=[];
            $scope.dscripcionlic = {};
            $scope.licenciamul = '';
            $scope.datos.licenciam = '';
            $scope.licmul_grilla = '';
            $scope.datos.Licenmul_grilla = '';
            $scope.datos.mulact_principal = '';
            $scope.publicid = '';
            $scope.datos.f01_actividad_principal_array =[];
            $scope.datos.FILE_CI = '';
            $scope.datos.fileArchivosAd = '';
            //LISTAMOS LA TABLA SI ESTA VACIA
            $scope.validarActividadEconomica();
        } 
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (JSON.stringify(datosgen) === '{}' && cambio != "NUEVO") {
            $scope.mostrarMsgNuevaActividad = false;
            swal('', " Estimado Ciudadano no tiene actividad económica registrada.", 'warning');
            $scope.datos.rdTipoTramite = "NUEVO";
        }
    };

    $scope.cambioToggle1 = function(dato){
        if ( dato == "NUEVO") {
                $scope.licenciaToogle4 = true;
        } else {
                $scope.licenciaToogle4 = false;
        }
    }

    $scope.validarActividadEconomica  =   function(){
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.listarAE();
    };

    $scope.listarAE = function () {
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        if(sNumeroRegistros > 0 ){
            $scope.datos.rdTipoTramite = "RENOVACION";            
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            if(tipoPersona == "NATURAL"){
                tipoPersona = "N";
            }else{
                tipoPersona = "J";
            }
            var contribuyente   =   new gLstActividadEconomica();
            contribuyente.idContribuyente   =   idContribuyente;
            contribuyente.tipo  =   tipoPersona;
            contribuyente.lstActividadEconomica(function(resultado){
                resultadoApi = JSON.parse(resultado);
                
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    if(response.success.dataSql.length > 0){
                        //PRETUNTAR Y LISTAR, SOLO LOS TRÃMITES EN LINEA DE INTERNET
                        $scope.formDatosAE  =   true;
                        $scope.mostrarMsgActividadTrue  = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = response.success.dataSql;
                        var data = response.success.dataSql;
                        $scope.tblTramites.reload();
                    } else {
                        $scope.mostrarMsgActividadTrue  = false;
                        $scope.mostrarMsgActividadFalse = true;                        
                        $scope.formDatosAE  =   false;
                    }
                    var sformguardado   =   $scope.datos.INT_FORM_ALMACENADO;
                    if(typeof sformguardado == 'undefined' || sformguardado != 'G'){
                        $scope.botones = null;
                        $scope.desabilitado = true;                        
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que corresponda.", 'warning');                    
                    }else{
                        $scope.botones = "mostrar";
                        $scope.desabilitado = false;
                    }
                } else {
                     swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        }else{
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE  =   false;
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.datos.rdTipoTramite = "NUEVO";
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";                                
                $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion. Creara una nueva Actividad Economica.";
            }
        }
    };

    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.trmUsuario, params.filter()) :
            $scope.trmUsuario;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.datosRepresentanteLegal = function (idContribuyente) {
        try{
            var paramRepLegal = new datosRepresentanteLgEmpresa();
            paramRepLegal.idEmpresa = idContribuyente;
            paramRepLegal.datos_RepresentanteLgEmpresa(function(resp){
                x = JSON.parse(resp);
                var responseLegal = x.success.dataSql;
                $.unblockUI();
                if(responseLegal.length > 0){
                    var datos = {};
                    $scope.datos.f01_tipo_per = "J";
                    $scope.datos.f01_id_representante_legal = responseLegal[0].idRepresentanteLegal;//idRepresentanteLegal
                    $scope.datos.f01_expedido_rep = responseLegal[0].expedicion;//expedicion
                }
                else
                {
                    swal('', "No existen ninguno ciudadano", 'error');
                }
            }).error(function(responseLegal){
                swal('', "Datos no Encontrados !!!", 'warning');
                $.unblockUI();
            });
        }catch (error){
            console.log("error");
        }
    };

    $scope.selActividadEconomica =  function(tramite){  
        var fechatram = "";
        var aniotram = "";
        fechatram = tramite.FechaInicio.split("-");
        aniotram = fechatram[0];
        if(aniotram != $scope.anioserver){
            if(tramite.deudaActividad && tramite.deudaActividad == 'ACTIVIDAD SIN DEUDA'){
                //RENOVA ID ACTIVIDAD
                if(tramite.IdActividad){
                    $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
                    $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
                }
                
                $scope.sIdAeGrilla  =   tramite.IdActividad;
                var tipoPersona     =   sessionService.get('TIPO_PERSONA');
                tipoPersona = "J";

                var datosGenerales = new gDatosGenerales();
                datosGenerales.idActividadEconomica=tramite.IdActividad;
                datosGenerales.tipo=tipoPersona;
                datosGenerales.lstDatosGenerales(function(resultado){
                    resultadoApi = JSON.parse(resultado);
                    if (resultadoApi.success) {
                        var response = resultadoApi.success.dataSql;
                        if(response.length > 0){

                            if(response[0].nroOrdenAE == 0 || response[0].nroOrdenAE == null || response[0].nroOrdenAE == 'null'){
                                response[0].nroOrdenAE = 0;
                                $scope.nroOrdenActividiadEconomicaActual  =  response[0].nroOrdenAE;
                                $scope.datos.f01_nro_orden = response[0].nroOrdenAE;
                            }
                            else{
                                $scope.nroOrdenActividiadEconomicaActual  =    response[0].nroOrdenAE;
                                $scope.datos.f01_nro_orden = response[0].nroOrdenAE;
                            }
                            $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                            $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                            
                            $scope.datosRepresentanteLegal(response[0].idContribuyente);
                            
                            if(tipoPersona != "N")
                            {                        
                                tipoPersona = "J";
                                var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var smacro      =   "MACRODISTRITO";
                                var szona       =   "DISTRITO";

                                //DATOS DE LA ACTIVIDAD ECONÃ“MICA
                                $scope.datos.f01_denominacion   =   response[0].denominacion;
                                //OBLIGATORIOS
                                $scope.datos.f01_sup  =   response[0].superficie;
                                $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;

                                try{
                                    smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                                    szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                                    hinicio     =   hinicio.split('-')[0].trim();
                                    hfinal      =   hfinal.split('-')[1].trim();
                                }catch(e){}
                                
                                /*DATOS DE LA ACTIVIDAD*/
                                $scope.datos.f01_num_pmc = response[0].padron;
                                $scope.datos.f01_raz_soc=response[0].denominacion;
                                $scope.datos.f01_sup=response[0].superficie;
                                $scope.datos.f01_de_hor=hinicio;
                                $scope.datos.f01_a_hor=hfinal;
                                $scope.datos.f01_productosElaborados=response[0].productosElaborados;
                                $scope.datos.f01_actividadesSecundarias=response[0].actividadesSecundarias;
                               
                                /*TIPO LICENCIA*/
                                $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;//response[0].TipoLicencia;
                                $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                                $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                                $scope.f01_tip_act  = response[0].tipoActividad;
                                /*Ubicación de Actividad Económica*/     
                                $scope.datos.INT_AC_MACRO_ID = response[0].IdMacroDistrito;
                                $scope.datos.f01_macro_act = response[0].IdMacroDistrito;                          
                                $scope.datos.f01_macro_act_descrip = smacro;

                                if(response[0].AE_establecimiento =='ALQUI'){
                                  $scope.datos.f01_estab_es = "ALQUILADO";
                                }
                                if(response[0].AE_establecimiento =='PROPI'){
                                    $scope.datos.f01_estab_es = "PROPIO";
                                }
                                if(response[0].AE_establecimiento =='ANTIC'){
                                    $scope.datos.f01_estab_es = "ANTICRÉTICO";
                                }
                                if(response[0].AE_establecimiento =='OTRO'){
                                    $scope.datos.f01_estab_es = "OTRO";
                                }
                                $scope.datos.f01_tip_act  = response[0].tipoActividad;
                                if(response[0].tipoActividad =='MA' || response[0].tipoActividad =='MATRI'){
                                    $scope.datos.f01_tip_act_dec = 'MATRIZ';
                                    $scope.datos.f01_tip_act = 'MA';
                                }
                                if(response[0].tipoActividad =='SU' || response[0].tipoActividad =='SUCUR'){
                                    $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                                    $scope.datos.f01_tip_act = 'SU';
                                }
                                
                                /*Ubicación de Actividad Económica*/                                
                                $scope.datos.INT_AC_ID_ZONA = response[0].idzona_ae;
                                $scope.datos.INT_ID_ZONA = response[0].idzona_ae;
                                $scope.datos.f01_zona_act_descrip = response[0].idzona_ae;
                                $scope.datos.f01_tip_via_act = response[0].Tipo_Via_ae;
                                $scope.datos.f01_num_act = response[0].via_ae;
                                $scope.datos.f01_num_act1 = response[0].numero_ae;

                                if(response[0].edificio_ae == 'undefined' || response[0].bloque_ae == 'undefined' || response[0].piso_ae == 'undefined' || response[0].departamento_ae == 'undefined' || response[0].telefono_ae == 'undefined' || response[0].AE_casilla == 'undefined'){
                                   response[0].edificio_ae = ''; 
                                   response[0].bloque_ae = ''; 
                                   response[0].piso_ae = '';
                                   response[0].departamento_ae = '';
                                   response[0].telefono_ae = '';
                                   response[0].AE_casilla = '';
                                }

                                $scope.datos.f01_edificio_act=response[0].edificio_ae;
                                $scope.datos.f01_bloque_act=response[0].bloque_ae;
                                $scope.datos.f01_piso_act=response[0].piso_ae;
                                $scope.datos.f01_dpto_of_loc=response[0].departamento_ae;
                                $scope.datos.f01_tel_act1=response[0].telefono_ae;
                                $scope.datos.f01_casilla=response[0].AE_casilla;
                            }
                            
                            //INT_TRAMITE_RENOVA
                            $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                            $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;
                            /*HABILITANDO CAMPOS*/                    
                            $scope.botones = "mostrar";
                            $scope.desabilitado = false;                    
                            setTimeout(function(){
                                $scope.actulizarIdDistrito();
                                $scope.distritoZonas(smacro);
                                //$scope.vias($scope.datos.INT_AC_ZONA,$scope.datos.INT_AC_TIP_VIA);
                            },2000);
                        }
                    } else {
                        swal('', "Datos no Encontrados !!!", 'warning');
                    }
                });
            }else {
                    swal('', "Actividad con deuda !!!", 'warning');
            }
        }else{
             swal('', "Actividad Economica Vigente !!!", 'warning');
        }    
    };

   $scope.limpiarmultiple = function(){
        $scope.licdes=[];
        $scope.multiple=[];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.datos.mulact_principal = '';
        $scope.datos.xf01_idcat_multi_principal = '';
        $scope.datos.xf01_descat_multi_principal = '';
    }
       datoObjectFiles_ci = [];
        $scope.datos.FILE_CI = '';
        $scope.datos.fileArchivosAd = '';



    $scope.listadoDatosLicencia = function(){
       var validarpromesas = [$scope.getLicencias()];
       $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
           console.log("resp: ", resp);
       });
    }

    $scope.getLicencias = function(){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        var nLicencias = new datosLicenciaigob();
        nLicencias.datos_Licenciaigob(function(res){
            x = JSON.parse(res);
            response = x.success.data;
            if(response.length > 0){
                $scope.datosLicencia = response;
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    };

    $scope.listadoCategoria = function(idLicencia){
       var validarpromesas = [$scope.getCategorias(idLicencia)];
       $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
           console.log("respCategroia: ", resp);
       }); 
    }

    $scope.getCategorias = function(idLicencia){
        datoObjectFile1 = new Object(); 
        datoObjectFile2 = new Object();
        datoObjectFile3 = new Object(); 
        datoObjectFile4 = new Object();
        datoObjectFile5 = new Object(); 
        datoObjectFile6 = new Object();
       
        if(idLicencia == 3375){
            $scope.licenciamultiple = true;
            $scope.divcategoriamul = false;
            $scope.datos.f01_categoria_agrupada = 0;
            $scope.datos.f01_categoria_descrip = 0;
            $scope.datos.f01_categoria_agrupada = 3375;
            $scope.datos.f01_categoria_descrip = 3375;
            $scope.datos.f01_categoria_agrupada_dem = '';
            $scope.datos.f01_categoria_descripcion = '';
            $scope.datos.f01_categoria_descrip2 = '';
            $scope.datos.f01_categoria  = '';
            $scope.datos.f01_categoria_agrupada_descripcion = '';
        }else{
            $scope.licenciamultiple = false;
            $scope.divcategoriamul = true;
            $scope.limpiarmultiple();
            $scope.datos.f01_actividad_principal_array ='';
        }
        try{
            $scope[name] = 'Running';
            var deferred = $q.defer();
            var aLicencia = new categoriasAgrpLicencia();
            aLicencia.dependencia = idLicencia;
            aLicencia.categorias_AgrpLicencia(function(res){
                x = JSON.parse(res);
                responsew = x.success.data;
                if (responsew.length > 0 ) {
                    $scope.desabilitt = false;
                    $scope.sCategoria = true;
                    deferred.resolve(responsew);
                }else{
                    $scope.sCategoria = false;
                }
                $scope.datosCategoria= responsew;
            });
        }catch (error){
           console.log("error en categorias");
        }

        datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[0] = datoObjectFile1;

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[1] = datoObjectFile2;

        datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
        datoObjectFile3.campo = 'Poder de Representación Legal';
        datoObjectFile3.nombre = 'Poder de Representación Legal';
        datoObjectFiles_ci[2] = datoObjectFile3;

        datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
        datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
        datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
        datoObjectFiles_ci[3] = datoObjectFile4;

        datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
        datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFiles_ci[4] = datoObjectFile5;

        datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
        datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFiles_ci[5] = datoObjectFile6;

        $scope.datos.FILE_CI = datoObjectFiles_ci;
        return deferred.promise;
    };



    //LICENCIAS MULTIPLES//
    $scope.getLicenciasmul = function(){
        try{
            var nLicencias = new datosLicenciasmul();
            nLicencias.datos_Licenciamul(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                $scope.datosLicenciamul= response;
            });
        }catch (error){
            console.log("error en licencias");
        }
    };

    $scope.getCategoriasmul = function(idLicencia){
      $.blockUI();
       // ***********************************************************************************
        try{
            var aLicencia = new categoriasAgrpLicencia();
            aLicencia.dependencia = idLicencia;
            aLicencia.categorias_AgrpLicencia(function(res){
                 x = JSON.parse(res);
                responsew = x.success.data;
                if (responsew.length > 0 ) {
                    $scope.datosCategoriamul= responsew;
                    $.unblockUI();
                }
            });
        }catch (error){
           console.log("error en categorias");
        }
    };


    $scope.actulizarCategoriaPrincipal = function(categoria){
        var idactprinc="";
        var cat  = categoria;
        if($scope.datosCategoriamul){
            angular.forEach($scope.datosCategoriamul, function(value, key) {
                if(value.idtipolicencia == cat){
                    idactprinc  =   value.catdestino;

                }
            });
        }
        $scope.multiple.f01_act_principal2  =  idactprinc;
        $scope.datos.f01_act_principal2  =  idactprinc;
    };

    $scope.actividad_Desarrolladamul = function(id){
        try{
            var cat = new bsqActividadDesarrollada();
            cat.idCatAgrupada=id;
            cat.descrip='';
            cat.bsqActividad_Desarrollada(function(res){
                x = JSON.parse(res);
                responsex = x.success.data;
                if(responsex.length > 0){
                    $scope.sActividadDesarrolladamul   =   true;
                    $scope.datosdesarrollomul = responsex;

                }else{
                    $scope.sActividadDesarrolladamul   =   false;
                    $scope.msg = "Error !!";
                }
            });
        }catch(e){
                alert("Error en licencias");
        }
    };

    $scope.guardarLicencia = function(licencia){
        $scope.dscripcionlic ={};
        var l = document.getElementById("f01_tipo_licmid");
        $scope.dscripcionlic.f01_tipo_licmdescrip = l.options[l.selectedIndex].text;
        var c = document.getElementById("f01_cat_agrupadamid");
        $scope.dscripcionlic.f01_cat_agrupadamdescrip = c.options[c.selectedIndex].text;
        var d = document.getElementById("f01_act_desarrolladamid");
        $scope.dscripcionlic.f01_act_desarrolladamdescrip = d.options[d.selectedIndex].text;
        if($scope.dscripcionlic.f01_act_desarrolladamdescrip=='--Seleccione--'){
            $scope.dscripcionlic.f01_act_desarrolladamdescrip = '';
        }
        if(licencia.f01_tipo_licmid =='' || licencia.f01_tipo_licmid == null || licencia.f01_cat_agrupadamid =='' || licencia.f01_cat_agrupadamid == null ) {
            swal('', 'Llene lo campos requeridos para la Catergoria Multiple  ', 'error');
        } else {
             var id=0
            if($scope.datos.licenciam =='' || $scope.datos.licenciam == null || $scope.datos.licenciam =="undefined" ){
                if($scope.licenciamul =='' || $scope.licenciamul == null || $scope.licenciamul =="undefined" ){
                    $scope.licenciamul = [];
                    id=0;
                }
                id = $scope.licenciamul.length + 1;
            }else{
                id = $scope.licenciamul.length + 1;
            }
            if(id<11){
                $scope.id = id;
                if($scope.id == 1){
                    $scope.f01_catagrp_principal = 1;
                    $scope.datos.mulact_principal = $scope.multiple.f01_act_principal2;
                    $scope.datos.xf01_idcat_multi_principal = licencia.f01_cat_agrupadamid;
                    $scope.datos.xf01_descat_multi_principal = $scope.dscripcionlic.f01_cat_agrupadamdescrip;
                }else{
                    $scope.f01_catagrp_principal=0;
                }

                $scope.licenciamul.push({
                    id: id,
                    f01_tipo_licmid: licencia.f01_tipo_licmid,
                    f01_cat_agrupadamid: licencia.f01_cat_agrupadamid,
                    f01_act_desarrolladamid: licencia.f01_act_desarrolladamid,
                    f01_tipo_licmdescrip: $scope.dscripcionlic.f01_tipo_licmdescrip,
                    f01_cat_agrupadamdescrip: $scope.dscripcionlic.f01_cat_agrupadamdescrip,
                    f01_act_desarrolladamdescrip: $scope.dscripcionlic.f01_act_desarrolladamdescrip,
                    f01_catagrp_principal: $scope.f01_catagrp_principal
                });
                $scope.licdes=[];
                $scope.multiple=[];
                $scope.dscripcionlic = {};
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.Licencia_Multiple($scope.licenciamul);
                /*LISTAR REQUISITOS DINAMICOS*/
                $scope.lstRequisitosMultiples2018($scope.licenciamul);
                $scope.lstRequisitosTecnicosMultiples($scope.licenciamul);

                //$scope.licmul_Grilla($scope.licenciamul);
            } else {
                swal('', 'El numero de multiples excede los estandares permitidos', 'error');
            }
        }
    }

    $scope.Licencia_Multiple = function(dato){
        $scope.licmul_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip|f01_catagrp_principal","titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada|Actividad Principal","impresiones": "true|false|true|false|true|false|true|false|"};

        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.licmul_grilla.push({
                nroElem: j+1,
                f01_tipo_licmid: dato[j].f01_tipo_licmid,
                f01_tipo_licmdescrip: dato[j].f01_tipo_licmdescrip,
                f01_cat_agrupadamid: dato[j].f01_cat_agrupadamid,
                f01_cat_agrupadamdescrip: dato[j].f01_cat_agrupadamdescrip,
                f01_act_desarrolladamid: dato[j].f01_act_desarrolladamid,
                f01_act_desarrolladamdescrip: dato[j].f01_act_desarrolladamdescrip,
                f01_catagrp_principal: dato[j].f01_catagrp_principal

            });
        }
        var jsonString = '['+ (encabezado) +']';

        angular.forEach($scope.licmul_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        $scope.datos.Licenmul_grilla=encabezado;
    }

    $scope.detallem = [];
    $scope.editm = {};
    $scope.onlym=false;
    $scope.botonm="new";

    $scope.modificarLic = function(dato){
        $scope.onlym = true;
        $scope.botonm = "upd";
        $scope.multiple = dato;
    }

    $scope.eliminarLic = function(dato){
        $scope.licenciamul.splice( $scope.licenciamul.indexOf(dato), 1 );
        $scope.idm = $scope.idm - 1;
    }

    $scope.modificarLicencia = function(dato){
        $scope.onlym=true;
        $scope.botonm="new";
        delete $scope.editm[dato.idm];
        $scope.multiple=[];
    }
  ///TERMINA LICENCIA MULTIPLE

    var requisitosDoc = [];
    $scope.validacionRequisitos = function(sup){
        requisitosDoc = $rootScope.datosRequisitos;
        datoObjectFinal = [];
        datoObjectFinal2 = [];
        for (var i = 0; i < requisitosDoc.length; i++ ) {
             datoObject = new Object(); 
             datoObject2 = new Object(); 
            if(requisitosDoc.resvalor == " PARA INMUEBLES CON SUPERFICIE MAYOR A 150 M2: PLANO ELABORADO POR ARQUITECTO DETALLANDO LOS AMBIENTES UTILIZADOS" && sup < 150){
                datoObject2.resid        =   requisitosDoc[i].resid; 
                datoObject2.resvalor     =   requisitosDoc[i].resvalor; 
                datoObject2.estado       =   requisitosDoc[i].estado;
                datoObjectFinal2[i]      =   datoObject2;
            }
            else{
                datoObject.resid        =   requisitosDoc[i].resid; 
                datoObject.resvalor     =   requisitosDoc[i].resvalor; 
                datoObject.estado       =   requisitosDoc[i].estado;
                datoObjectFinal[i]      =   datoObject;
            }
            
        }
        $rootScope.datosRequisitosmostrar = datoObjectFinal;
    }

    $scope.getRequisitosCategoria = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
        }
        $scope.categoriaid = idCategoria;
        $scope.tipoper = persona;
        try{
            var ndCategoria = new aelstRequisitosDocCategoria();
            ndCategoria.dependencia = idCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_RequisitosDocCategoria(function(res){
                x = JSON.parse(res);
                var datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j=0; j<datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado=false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
                $scope.getRequisitosTecnicosCategoria(idCategoria,persona);
                $rootScope.datosAdjuntos = datoObjectFinal;
                //$scope.getRequisitosAdjuntos($rootScope.datosRequisitos);
                })
        }catch (error){
           console.log("error en requisitos categoria");
        }
    };

    $scope.lstRequisitosTecnicosMultiples = function(licenciamul){
        var sconsulta   = '[';
        for(i=0; i<licenciamul.length; i++){
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        // texto.substring(0,texto.length-1);
        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'J';
            if(typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona!= null){
                var ndCategoria = new aelstRequisitostecmul();
                ndCategoria.dependencia = aidCategoria;
                ndCategoria.tipopersona = persona;
                ndCategoria.aelst_Requisitostecmul(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for(j=0; j < datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idrequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descrequisito;
                        datoObject.estado = false;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                    $rootScope.datosTecnicos = datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                    }, 1000);
                    })
            }
         }
    };

    $scope.getRequisitosCategoriaTecnicos = function(idTipoLicencia, idCategoria, persona){
        if(idTipoLicencia == 100 || idTipoLicencia == 101){
            $scope.getRequisitosTecnicosActividad(idCategoria, persona);
        }else{
            $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
        }
    }

    $scope.getRequisitosTecnicosActividad = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
        }
        try{
            var ntActividad = new aelstRequisitosTecActividad();
            ntActividad.dependencia = idCategoria;
            ntActividad.tipopersona = persona;
            ntActividad.aelst_RequisitosTecActividad(function(res){
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j=0; j<datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado=false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        }catch (error){
            $scope.errors["error requisitos tecnicos act"] = error;
        }
    };

    $scope.getRequisitosTecnicosCategoria = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
        }
        try{
             var parametro = new aelstRequisitosTecCategoria();
            parametro.idCategoria = idCategoria;
            parametro.tipopersona = persona;
            parametro.aelst_RequisitosTecCategoria(function(res){
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
            for(j=0; j<datosRequisitosTmp.length; j++){
                datoObject = new Object();
                datoObject.resid = datosRequisitosTmp[j].idRequisito;
                datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                datoObject.estado=false;
                datoObjectFinal[j] = datoObject;
            }
            $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
            $rootScope.datosTecnicos = datoObjectFinal;
        });
        }catch (error){
        }
    };

    $scope.lst_actividad_desarrollada = function(id){
        try{
            var cat = new bsqActividadDesarrollada();
            cat.idCatAgrupada=id;
            cat.descrip='';
            cat.bsqActividad_Desarrollada(function(res){               
                x = JSON.parse(res);
                response = x.success.data;                    

                if(response.length > 0){
                    //$scope.f01_categoria_descrip = response;
                    $scope.datosdesarrollo = response;
                    $scope.desabilitarActDesarrollada =   false;
                    $scope.sActividadDesarrollada   =   true;                        
                }else{
                    $scope.sActividadDesarrollada   =   false;                            
                    $scope.msg = "Error !!";
                }
            });
        }catch(e){
                alert("Error en licencias");
        }
    };

    $scope.macrodistritos = function(){
        $scope.aMacrodistritos = {};
        var datosP = new macrodistritoLst();
        datosP.obtmacro(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
                $scope.aMacrodistritos = data.success;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };
 
    $scope.actulizarIdDistrito  =   function(){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = $scope.datos.f01_zona_act_descrip;
        if($scope.aDistritoZona){
            angular.forEach($scope.aDistritoZona, function(value, key) {
                if(value.dist_nombre == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    idZona      =   value.dist_id;
                }
            });
        }

        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.INT_ID_ZONA        =   idZona;
        $scope.desabilitadoNo=true;       
    };

    $scope.distritoZonas = function(idMacroJ){ 
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });
        }        
        $scope.idMacro = idMacro;
        $scope.datos.f01_macro_act    =   idMacro;
        if($scope.datos.g_origen != 'POS/EMPR2017'){
            $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        }
        $scope.aDistritoZona = {};
        try{
            var parametros = new distritoZona();
            parametros.idMacro = idMacro;
            parametros.obtdist(function(resultado){
                data = JSON.parse(resultado);
                if(data.success.length > 0){
                    $scope.desabilitadoZ=false;
                    $scope.aDistritoZona = data.success;
                    $scope.desabilitadoV=true;
                    $scope.desabilitadoNo=true;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch(error){
            $scope.desabilitadoZ=true;
            $scope.desabilitadoV=true;
            $scope.desabilitadoNo=true;
        }
    };

    $scope.cargarNombViaTxt = function(valor) {
        if (valor == "NINGUNO"){
            $scope.nombreViaTxt = true;
            $scope.tipoTrayecto = false;
            $scope.datos.f01_factor ="VA";
        } else {
            $scope.nombreViaTxt = false;
            $scope.tipoTrayecto = true;
            $scope.datos.f01_num_act_n =   "";
        }
    };

    $scope.cargarNombVia = function(tipoVia, dato) {
        try{
            var nomvia = new aelstNombreVia();
            nomvia.idzona = $scope.datos.INT_ID_ZONA;
            nomvia.tipovia = tipoVia;
            nomvia.aelst_NombreVia(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.datosNombVia = response;
                    $scope.nombreViaCmb = true;
                    if (dato.f01_factor == "VA") { 
                        $scope.nombreViaTxt = true;
                    } else {
                        $scope.nombreViaTxt = false;
                    }
                } else{
                    $scope.nombreViaCmb = true;
                    $scope.nombreViaTxt = false;
                }; 
            });
        }catch (error){
            console.log('datos error via:', error);
        }      
    };

    $scope.GetValueLicencia = function () {
        $scope.limpiarlic();
        var e = document.getElementById("f01_tipo_lic");
        $scope.datos.f01_tipo_lic_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoriaAgrupada = function () {
        $scope.limpiarcateg();
        var e = document.getElementById("f01_categoria_agrupada");
        $scope.datos.f01_categoria_agrupada_dem = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
    }
    
    $scope.GetValueCategoria = function () {
        $scope.limpiaractdes();
        var e = document.getElementById("f01_categoria_descrip");
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueMacrodistrito = function (macro) {
        var e = document.getElementById("f01_macro_act");
        $scope.datos.f01_macro_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueDistrito = function () {
        var e = document.getElementById("f01_dist_act");
        $scope.datos.f01_dist_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaActividad = function () {
        var e = document.getElementById("INT_AC_ID_ZONA");
        $scope.datos.INT_AC_ID_ZONA_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyente = function () {
        var e = document.getElementById("f01_zon_prop");
        $scope.datos.f01_zon_prop_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyenteJuridico = function () {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }


   $scope.GetValueActividadSecundaria = function (){
        $scope.actividadSecund = "";
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var i = 0; i < datoslicm.length; i++) {
                if(i+1 == datoslicm.length){
                     datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip;
                }else{
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip +" - ";
                }
            }
        }

        $scope.actividadSecund = datosaux;
        if($scope.datos.f01_categoria_agrupada != 3375){
            var e = document.getElementById("f01_categoria_agrupada");
            $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;

            $scope.actividadSecund = $scope.datos.f01_categoria_agrupada_descrip;
        }

        $scope.datos.f01_actividadesSecundarias = $scope.actividadSecund;
    }

    $scope.GetValueActividadDesarrollada = function(){
        $scope.actividadDes = "";
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if(j+1 == datoslicm.length){
                     datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                }else{
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip +" - ";
                }
            }
        }
        $scope.actividadDes = datosaux;
        if($scope.datos.f01_categoria_descrip!= 3375){
            var e = document.getElementById("f01_categoria_descrip");
            $scope.datos.f01_actividad_desarrollada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadDes = $scope.datos.f01_actividad_desarrollada_descrip;
        }
        $scope.datos.f01_actividadesDesarrolladasc = $scope.actividadDes;
    }

    $scope.GetValueActividadesCatDesarrollada = function(){
        $scope.actividadDesCat = "";
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if(j+1 == datoslicm.length){
                    if(datoslicm[j].f01_tipo_licmid == '100' || datoslicm[j].f01_tipo_licmid == '101'){
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip;
                    } 
                    else{
                        if(datoslicm[j].f01_tipo_licmid == '1' || datoslicm[j].f01_tipo_licmid == '3' || datoslicm[j].f01_tipo_licmid == '4'){
                            datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        } 
                    }   
                }else{
                    if(datoslicm[j].f01_tipo_licmid == '100' || datoslicm[j].f01_tipo_licmid == '101'){
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip +" - ";
                    }
                    else{
                        if(datoslicm[j].f01_tipo_licmid == '1' || datoslicm[j].f01_tipo_licmid == '3' || datoslicm[j].f01_tipo_licmid == '4'){
                            datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip +" - ";
                        } 
                    }   
                }
            }
        }
        $scope.actividadDesCat = datosaux;
        $scope.datos.f01_actividadesSecundarias = $scope.actividadDesCat;
    }

    $scope.SeleccionaPrioridad = function(dato){
       var arraydata = [];
        $scope.datos.f01_act_principal = '';
        if(dato.f01_cat_agrupadamid == 5 || dato.f01_cat_agrupadamid == 6  || dato.f01_cat_agrupadamid == 25){
            $scope.datos.f01_act_principal = 50;
        }
        if(dato.f01_cat_agrupadamid == 11 || dato.f01_cat_agrupadamid == 12 || dato.f01_cat_agrupadamid == 13 || dato.f01_cat_agrupadamid == 15  || dato.f01_cat_agrupadamid == 60  || dato.f01_cat_agrupadamid == 61 || dato.f01_cat_agrupadamid == 62){
            $scope.datos.f01_act_principal = 30;
        }
        if(dato.f01_cat_agrupadamid == 22){
            $scope.datos.f01_act_principal = 50;
        }
        if(dato.f01_cat_agrupadamid == 3371 || dato.f01_cat_agrupadamid == 3372 || dato.f01_cat_agrupadamid == 3376 || dato.f01_cat_agrupadamid == 3377 || dato.f01_cat_agrupadamid == 3378 || dato.f01_cat_agrupadamid == 3379 ||
           dato.f01_cat_agrupadamid == 3347 || dato.f01_cat_agrupadamid == 3348 || dato.f01_cat_agrupadamid == 3349 || dato.f01_cat_agrupadamid == 3369 || dato.f01_cat_agrupadamid == 3370){
            $scope.datos.f01_act_principal = 70;
        }

        if( dato.f01_cat_agrupadamid == 16 || dato.f01_cat_agrupadamid == 78 || dato.f01_cat_agrupadamid == 79 || dato.f01_cat_agrupadamid == 80 || dato.f01_cat_agrupadamid == 29 || dato.f01_cat_agrupadamid == 76 ||
            dato.f01_cat_agrupadamid == 71 || dato.f01_cat_agrupadamid == 72 || dato.f01_cat_agrupadamid == 73 || dato.f01_cat_agrupadamid == 74 || dato.f01_cat_agrupadamid == 75 || dato.f01_cat_agrupadamid == 77 ||
            dato.f01_cat_agrupadamid == 82 || dato.f01_cat_agrupadamid == 81 || dato.f01_cat_agrupadamid == 28 || dato.f01_cat_agrupadamid == 53 || dato.f01_cat_agrupadamid == 66 || dato.f01_cat_agrupadamid == 67 ||
            dato.f01_cat_agrupadamid == 68 || dato.f01_cat_agrupadamid == 69 || dato.f01_cat_agrupadamid == 70 || dato.f01_cat_agrupadamid == 20 || dato.f01_cat_agrupadamid == 84 || dato.f01_cat_agrupadamid == 86 ||
            dato.f01_cat_agrupadamid == 87 || dato.f01_cat_agrupadamid == 88 || dato.f01_cat_agrupadamid == 90 || dato.f01_cat_agrupadamid == 91 || dato.f01_cat_agrupadamid == 92 || dato.f01_cat_agrupadamid == 93 ){
            $scope.datos.f01_act_principal = 79;
        }

        if(dato.f01_cat_agrupadamid == 59 || dato.f01_cat_agrupadamid == 83 || dato.f01_cat_agrupadamid == 85 || dato.f01_cat_agrupadamid == 89){
            $scope.datos.f01_act_principal = 70;
        }

        $scope.MultipleSeleccionado   =   dato.id;
        arraydata.push(dato);
        $scope.datos.f01_actividad_principal_array = arraydata;
        //$scope.GetValueZonaSegura(dato.f01_cat_agrupadamid);
    }

     $scope.publi=[];
    //$scope.publi.FECHAINICIO=$scope.fechactuall;
    //$scope.publi.FECHAFIN=$scope.fechadatoo;
     $scope.lssubcategoria = function(){
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.TipoLetrero = [
        {"p_idtipoletrero" : "51", "p_descripcion": "ADOSADA SOBRESALIENTE"},
        {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"},
        {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
        {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
    };
    
    $scope.ltCaracteristica = function(idlee){
        $scope.lCaracteristica = {};
        var idcarac = "";        
        
        //ID CARACTERISITICA
        if($scope.TipoLetrero){
            angular.forEach($scope.TipoLetrero, function(value, key) {
                if(value.p_descripcion == idlee){
                    idcarac = value.p_idtipoletrero;                    
                }
            });
        }        
        $scope.publi.idcarac=idcarac;
        
        if(idlee == "ADOSADA SOBRESALIENTE" || idlee == "ADOSADA" ){
         $scope.lCaracteristica = [
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
        {"p_idcaracteristica" : "2", "p_caracteristica": "Electrónica"},
        {"p_idcaracteristica" : "6", "p_caracteristica": "Luminosa"},
        {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"},
        {"p_idcaracteristica" : "9", "p_caracteristica": "Animada"}];
        }else if(idlee == "PINTADA"){
         $scope.lCaracteristica = [

        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
        {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"}];
        }else{
         $scope.lCaracteristica = [
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"}
        ];}
    };
    $scope.actulizarCaracteristica = function(){
        var id_cara="";
        var distNombre  = $scope.publi.INT_CARA;
        if($scope.lCaracteristica){
            angular.forEach($scope.lCaracteristica, function(value, key) {
                if(value.p_caracteristica == distNombre){
                    id_cara  =   value.p_idcaracteristica;
                }
            });
        }
        $scope.publi.id_cara  =  id_cara;
    };

    $scope.lsCaracteristica = function(){
        $scope.lsTipovia = {};
        try{
            var parametros = new lstCaracteristica();
            parametros.clasificador = 9;
            parametros.lst_Caracteristica(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.lsTipovia = response;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch (error){
            //$scope.errors["error_rol"] = error;
            console.log("eeror en caracteristica");
        }
    };

    $scope.lscategoria = function(){
        $scope.DataCategoria = {};
        try{
            var parametros = new PUBlstCategoriaL();
            parametros.PUB_lstCategoriaL(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.DataCategoria = response;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        } catch (error){
            $scope.errors["error_rol"] = error;
        }
    };

    $scope.onlyy=false;
    $scope.botonn="new";

    $scope.modificarPlubli = function(dato){
        $scope.onlyy=true;
        $scope.botonn="upd";
        $scope.publi=dato;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
    }

    $scope.modificarpublicidad = function(dato){
        $scope.onlyy=true;
        $scope.botonn="new";
        delete $scope.edit[dato.id];
        $scope.publi=[];
        //$scope.carass = [];
        $scope.lssubcategoria();
    }


    $scope.guardarpublicidad = function(public){
        if (public.INT_SUPERFICIE) {
            if(public.INT_NRO_CARA =='' || public.INT_NRO_CARA == null || public.INT_CARA =='' || public.INT_CARA == null ||
            public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
            public.INT_DESC =='' || public.INT_DESC == null || public.INT_SUPERFICIE =='' || public.INT_SUPERFICIE == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id=0
                if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
                    if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
                        $scope.publicid = [];
                        id=0;
                    }
                    id = $scope.publicid.length + 1;
                }else{
                    id = $scope.publicid.length + 1;
                }
                if(id<21){
                    total = parseFloat(public.INT_SUPERFICIE);
                    if (total < 700) {                           
                        $scope.id = id;                            
                        $scope.publicid.push({
                            id: id,
                            INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(0).toFixed(2),
                            INT_ANCHO: parseFloat(0).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP:total.toFixed(2)
                        });
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        } else {
            if(public.INT_NRO_CARA =='' || public.INT_NRO_CARA == null || public.INT_CARA =='' || public.INT_CARA == null ||
            public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
            public.INT_DESC =='' || public.INT_DESC == null || public.INT_ALTO =='' || public.INT_ALTO == null || public.INT_ANCHO =='' || public.INT_ANCHO == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id=0
                if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
                    if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
                        $scope.publicid = [];
                        id=0;
                    }
                    id = $scope.publicid.length + 1;
                }else{
                    id = $scope.publicid.length + 1;
                }
                if(id<21){
                    total = parseFloat(public.INT_ALTO) * parseFloat(public.INT_ANCHO);
                    if (total < 700) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(public.INT_ALTO).toFixed(2),
                            INT_ANCHO: parseFloat(public.INT_ANCHO).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP:total.toFixed(2)
                        });
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        }
    }


    $scope.Plubli_Grilla = function(dato){
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho","impresiones": "true|true|true|true|true|true|true|"};


        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publi_grilla.push({
                nroElem: j+1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                //INT_CATE: dato[j].INT_CATE,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO
            });
        }
        
        var jsonString = '['+ (encabezado) +']';
      
        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        $scope.datos.publicidad_grilla=encabezado;
    }

    $scope.calcularCapacidad = function(superficie)
    {
        if(superficie)
        {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        }
        else
        {
            $scope.datos.f01_cap_aprox = 0;   
        }    
    }
    $scope.verificarSuperficie = function(superficie){
        $scope.validarRequisitosForm();
    }

    //enviarFormProcesosLinea
    $scope.validarEnvio = function(data){
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    /*CIUDADANO - ENVIAR FORMULARIO JURIDICO*/
    $scope.enviarFormProcesosLinea = function(paramForm){
        $scope.capturarImagen();
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        //$rootScope.validacionRequisitosTec();
        
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'AER-LICEN';
        var datosNeXO = {};
        if (paramForm.OTRO_VIA!="") {
            $scope.nombre_via =paramForm.OTRO_VIA;
        }else{
            $scope.nombre_via =paramForm.f01_nom_via_prop;
        }
        
        $scope.divVIAE="mostrar";
        /*RENOVACION DE LICENCIAS*/
        if(paramForm.rdTipoTramite == "RENOVACION"){
            datosNeXO['f01_id_actividad_economica']   =   $scope.idActividiadEconomicaActual;
            datosNeXO['f01_nro_orden']   =   $scope.nroOrdenActividiadEconomicaActual;
            datosNeXO['f01_id_contribuyente']   =   $scope.idContribuyenteAEActual;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_id_representante_legal'] = paramForm.f01_id_representante_legal;
        }
        
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        switch(paramForm.INT_ACTIVIDAD) {
            case "INTA_INT_JUE":
                    switch(paramForm.TIPO) {
                        case "EMISION":
                            idProcodigo =   'AER-EL';
                            break;
                        case "RENOVACION":
                            idProcodigo =   'AE-RLI-';
                            break;
                        case "MODIFICACION":
                            idProcodigo =   'AE-MLI-';
                            break;
                        case "CANCELACION":
                            idProcodigo =   'AE-CLI-';
                            break;
                        default:
                        text = "NO TIENE TIPO";
                    }
                    datosNeXO['AE_SW_TIPO']    =   'LICENCIA';
                    datosNeXO['TIPO_TRAMITE']   =   "AE_INT_" + paramForm.TIPO;
                  break;
            case "INTB_COM":
                switch(paramForm.TIPO) {
                    case "EMISION":
                        idProcodigo =   'AER-EL';
                        break;
                    case "RENOVACION":
                        idProcodigo =   'AE-RLI-';
                        break;
                    default:
                    text = "NO TIENE TIPO";
                }
                datosNeXO['AE_SW_TIPO']    =   'AUTORIZACION';
                datosNeXO['TIPO_TRAMITE']   =   "AE_INT_EMISION";
              break;
            case "INTB_PUB":
                switch(paramForm.TIPO) {
                    case "EMISION":
                        idProcodigo =   'AER-EL';
                        break;
                    case "RENOVACION":
                        idProcodigo =   'AE-RLI-';
                        break;
                    default:
                    text = "NO TIENE TIPO";
                }
                datosNeXO['AE_SW_TIPO']    =   'AUTORIZACION';
                datosNeXO['TIPO_TRAMITE'] = "AE_INT_EMISION";
              break;
            case "INTJ_MCE":
                switch(paramForm.TIPO) {
                    case "EMISION":
                        idProcodigo =   'AE-EAJ';
                        break;
                    case "RENOVACION":
                        idProcodigo =   'AE-RAJ';
                        break;
                    default:
                    text = "NO TIENE TIPO";
                }
                datosNeXO['AE_SW_TIPO']     =   "AUTORIZACION";
                datosNeXO['TIPO_TRAMITE']   =   "AE_JUE_" + paramForm.TIPO;
              break;
            case "INTJ_MEC":
                switch(paramForm.TIPO) {
                    case "EMISION":
                        idProcodigo =   'AE-EAJ';
                        break;
                    case "RENOVACION":
                        idProcodigo =   'AE-RAJ';
                        break;
                    default:
                    text = "NO TIENE TIPO";
                }
                datosNeXO['TIPO_TRAMITE']   =   "AE_JUE_EMISION";
                datosNeXO['AE_SW_TIPO']     =   "AUTORIZACION";
              break;
            default:
              text = "NO TIENE CATEGORIA.";
        }
        
        datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
        
        if(paramForm.f01_tipo_lic == '1' || paramForm.f01_tipo_lic == '3' || paramForm.f01_tipo_lic == '4'){
            var e = document.getElementById("f01_categoria_agrupada");
            datosNeXO['f01_actividadesSecundarias'] = e.options[e.selectedIndex].text;
        }else{
            if(paramForm.f01_tipo_lic == 3375){
                datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias; 
            }else{
                 datosNeXO['f01_actividadesSecundarias'] = '';
            }
        }
        
        if ($scope.tipoPersona != 'NATURAL'){
            datosNeXO['f01_tipo_per']                   =    'J';
            datosNeXO['f01_tipo_per_desc']              = 'JURIDICO';
            datosNeXO['INT_SOLICITANTE']                =   paramForm.INT_SOLICITANTE;
            datosNeXO['AE_ORD_DEM']                     =   paramForm.AE_ORD_DEM;
            datosNeXO['f01_nit']                        =   paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_num_doc_per_jur']            =   paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_raz_soc_per_jur']            =   paramForm.f01_raz_soc_per_jur;
            datosNeXO['f01_raz_soc']                    =   paramForm.f01_raz_soc;
            datosNeXO['f01_tipo_lic_descrip']           =   paramForm.f01_tipo_lic;
            datosNeXO['INT_ID_CAT_AGRUPADA']            =   parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_requisitos_tecnicos']        =   $scope.datos.f01_requisitos_tecnicos;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD']         =   paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['f01_num_doc_rep']                =   paramForm.f01_num_doc_rep;
            datosNeXO['f01_tip_doc_rep']                =   paramForm.f01_tip_doc_rep;
            datosNeXO['f01_expedido_rep']               =   paramForm.f01_expedido_rep;
            datosNeXO['f01_email_rep']                  =   paramForm.f01_email_rep;
            datosNeXO['f01_cel_rep']                    =   paramForm.f01_cel_rep;
            datosNeXO['f01_telef_rep']                  =   paramForm.f01_telef_rep;
            datosNeXO['INT_FEC_SOLICITUD']              =   paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA']                     =   sessionService.get('IDSOLICITANTE');
            datosNeXO['f01_id_zona_rep']                =   paramForm.f01_id_zona_rep;
            datosNeXO['f01_zona_rep']                   =   paramForm.f01_zon_rep_valor;
            datosNeXO['f01_zon_rep_valor']              =   paramForm.f01_zon_rep_valor;

            datosNeXO['f01_pri_nom_rep']                =   paramForm.f01_pri_nom_rep;
            datosNeXO['f01_seg_nom_rep']                =   paramForm.f01_seg_nom_rep;
            datosNeXO['f01_ter_nom_rep']                =   paramForm.f01_ter_nom_rep;
            datosNeXO['f01_ape_pat_rep']                =   paramForm.f01_ape_pat_rep;
            datosNeXO['f01_ape_mat_rep']                =   paramForm.f01_ape_mat_rep;
            datosNeXO['f01_ape_cas_rep']                =   paramForm.f01_ape_cas_rep;
            datosNeXO['f01_fecha_nac']                  =   paramForm.f01_fecha_nac;
            datosNeXO['INT_ACTIVIDAD']                  =   paramForm.INT_ACTIVIDAD;

            datosNeXO['f01_denominacion']               =   paramForm.f01_denominacion;
            datosNeXO['f01_sup']                        =   paramForm.f01_sup;
            datosNeXO['f01_cap_aprox']                  =   paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor']                     =   paramForm.f01_de_hor;
            datosNeXO['f01_a_hor']                      =   paramForm.f01_a_hor;
            datosNeXO['INT_AC_ESTADO']                  =   paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO']                   =   paramForm.INT_AC_MACRO;
            datosNeXO['f01_zon_rep_valor']              =   paramForm.f01_zon_rep_valor;
            datosNeXO['f01_tipo_viarep']                =   paramForm.f01_tipo_viarep;
            datosNeXO['f01_nom_via_rep']                =   paramForm.f01_nom_via_rep;
            datosNeXO['OTRO_VIA']                       =   paramForm.OTRO_VIA;
            datosNeXO['f01_num_rep']                    =   paramForm.f01_num_rep;
            datosNeXO['INT_AC_EDIFICIO']                =   paramForm.INT_AC_EDIFICIO;
            datosNeXO['f01_fecha_ini_act']              =   fechactual;
            datosNeXO['f01_estab_es']                   =   paramForm.f01_estab_es;

            datosNeXO['f01_distrito_desc']              =   paramForm.f01_distrito_desc;

            datosNeXO['f01_productosElaborados']        =   '';
            datosNeXO['f01_tipo_lic']                   =   paramForm.f01_tipo_lic;
            datosNeXO['f01_categoria_agrupada_descripcion']       =   paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_categoria_descrip']                    =   paramForm.f01_categoria_descrip;

            datosNeXO['INT_ID_CAT_AGRUPADA']            =  parseInt(paramForm.f01_categoria_agrupada);

            datosNeXO['f01_categoria_agrupada']         = paramForm.f01_categoria_agrupada;
            datosNeXO['f01_macro_act']                  =   paramForm.f01_macro_act;
            datosNeXO['f01_macro_act_descrip']          =   paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act']                   =   paramForm.INT_ID_ZONA;//paramForm.f01_zona_act_descrip;
            datosNeXO['f01_zona_act_descrip']           =   paramForm.f01_zona_act_descrip;
            datosNeXO['f01_dist_act']                   =   paramForm.INT_AC_DISTRITO;//"";
            datosNeXO['f01_dist_act_descrip']           =   paramForm.f01_dist_act_descrip;
            datosNeXO['f01_tip_via_act']                =   paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act']                    =   paramForm.f01_num_act;
            datosNeXO['f01_num_act_n']                  =   paramForm.f01_num_act_n;
            datosNeXO['f01_factor']                     =   paramForm.f01_factor;
            datosNeXO['f01_num_act1']                   =   paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act']               =   paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act']                   =   paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc']                =   paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1']                   =   paramForm.f01_tel_act1;
            datosNeXO['f01_casilla']                    =   paramForm.f01_casilla;
            datosNeXO['f01_cod_luz']                    =   paramForm.f01_cod_luz;
            datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;
            
            datosNeXO['f08_hojas_recibidas']            =   "0";
            datosNeXO['f08_observaciones_i']            =   "0";

            datosNeXO['f01_hojas_recibidas']            =   "0";
            datosNeXO['f01_observaciones_i']            =   "0";
            
            datosNeXO['INT_RL_FEC_NACIMIENTO']          =   paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD_DESCRIPCION']      =   document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
            datosNeXO['INT_AC_MACRO_ID']                =   paramForm.INT_AC_MACRO_ID;
            datosNeXO['INT_DISTRITO']                   =   paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito_desc']              =   paramForm.f01_distrito_desc;

            //DATOS FALTANTES DEL CONTRIBUYENTE - REPRESENTANTE LEGAL

            datosNeXO['f01_macro_des']              =   paramForm.f01_macro_des;
            datosNeXO['INT_ZONA']                   =   paramForm.INT_ZONA;
            datosNeXO['INT_VIA']                    =   paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA']             =   paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_NUM']                    =   paramForm.INT_NUM;
            datosNeXO['INT_EDIF']                   =   paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE']                 =   paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO']                   =   paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP']                =   paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET']                =   paramForm.INT_DIR_DET;

            //DATOS INICIALES PERSONA JURIDICA

            datosNeXO['INT_RL_FEC_EMISION_DOCUMENTO']    =  paramForm.INT_RL_FEC_EMISION_DOCUMENTO;
            datosNeXO['f01_num_pod_leg']                 =  paramForm.f01_ges_vig_pod;
            datosNeXO['INT_NACIONALIDAD']                =  paramForm.INT_NACIONALIDAD;
            datosNeXO['INT_RL_FEC_NACIMIENTO']           =  paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['f01_ges_vig_pod']                 =  paramForm.f01_ges_vig_pod;
            datosNeXO['f01_num_not']                     =  paramForm.f01_num_notaria;
            
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;
         
            datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION']   =  paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
            datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION']    =  paramForm.INT_CAT_AGRUPADA_DESCRIPCION;
            datosNeXO['INT_TIP_VIA']                     =  paramForm.INT_TIP_VIA;

            datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
            datosNeXO['INT_AC_direccionImagenmapa']   =  paramForm.INT_AC_direccionImagenmapa;
            datosNeXO['INT_RL_NUM_DOCUMENTO']=paramForm.INT_RL_NUM_DOCUMENTO;
            datosNeXO['INT_RL_FECHA_NAC']=paramForm.INT_RL_FECHA_NAC;
            datosNeXO['INT_ZONA_DESC']=paramForm.INT_ZONA_DESC;
            datosNeXO['f01_macro_des']=paramForm.f01_macro_des;
            datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos;
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_poder_representante'] = paramForm.f01_poder_representante;
            datosNeXO['f01_test_cons_sociedad_j'] = paramForm.f01_test_cons_sociedad_j;
            datosNeXO['file_num_ident'] = paramForm.file_num_ident;
            datosNeXO['file_fund_emp'] = paramForm.file_fund_emp;
            datosNeXO['file_reg_comer'] = paramForm.file_reg_comer;
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            datosNeXO['f01_tip_act']                    =   paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada']     =   "";           
            /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
            datosNeXO['f01_tip_act']                    =   paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            if(paramForm.f01_tipo_lic == 3375){
                datosNeXO['f01_idcat_multi_principal'] = paramForm.xf01_idcat_multi_principal;
                datosNeXO['f01_descat_multi_principal'] = paramForm.xf01_descat_multi_principal;
                datosNeXO['f01_act_principal'] = paramForm.f01_act_principal;
                datosNeXO['f01_act_principal2'] = paramForm.f01_act_principal2;  
                datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
            }else{
                datosNeXO['f01_idcat_multi_principal'] = '';
                datosNeXO['f01_descat_multi_principal'] = '';
                datosNeXO['f01_act_principal'] = ''; 
                 datosNeXO['f01_act_principal2'] = '';
            }   
        } 
        
        /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
         if(paramForm.f01_tipo_lic == 3375){
            datosNeXO['f01_categoria'] = 3375;
            datosNeXO['f01_categoria_descrip'] =3375
            datosNeXO['f01_categoria_agrupada_descripcion'] = '';
            datosNeXO['f01_categoria_agrupada'] = 3375;
            datosNeXO['f01_actividad_desarrollada'] = '';
            datosNeXO['f01_categoria_agrupada_descrip'] = 0;
            datosNeXO['f01_categoria_agrupada_dem'] = 0;
         }
         if(paramForm.f01_tipo_lic == 1 || paramForm.f01_tipo_lic == 2 || paramForm.f01_tipo_lic == 3 ||paramForm.f01_tipo_lic == 4 ||paramForm.f01_tipo_lic == 100 ||paramForm.f01_tipo_lic == 101){
            datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
            datosNeXO['f01_categoria_descrip2']      =  paramForm.f01_categoria_descripcion;
            datosNeXO['f01_categoria']      =  paramForm.f01_categoria_descrip;
            datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion; 
            datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
            datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
        }

        if(datosNeXO['f01_requisitos_tecnicos'] == null){
            datosNeXO['f01_requisitos_tecnicos'] =[];
        } 
        if(paramForm.rdTipoTramite1 == "NUEVO" || paramForm.rdTipoTramite1 == 'NUEVO'){
            datosNeXO['sw_publicidad']      =  "CP" ;
            datosNeXO['swpublicidad']      =  "CP" ;
        }if(paramForm.rdTipoTramite1 == "RENOVACION" || paramForm.rdTipoTramite1 == 'RENOVACION'){
            datosNeXO['sw_publicidad']      =  "SP" ;
            datosNeXO['swpublicidad']      =  "SP" ;
        }
        
        datosNeXO['publicidad']                 =   paramForm.publicidad;
        datosNeXO['publicidad_grilla']          =   paramForm.publicidad_grilla;
        datosNeXO['g_tipo']                     =   "AE-LINEA";
        datosNeXO['g_fecha']                    =   fechactual;
        datosNeXO['g_origen']                   =   "IGOB247";
        
        //DATOS DE LA ACTIVIDAD ECONOMICA - NO ESTAN REGISTRADAS DE MANERA LOCAL
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_AE_IDCODIGO_ZONA']       = "21";
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }
        
        var sMacroR         =   datosNeXO['f01_macro_des'];
        //var sDistritoR      =   datosNeXO['INT_DISTRITO'];
        var sZonaR          =   datosNeXO['INT_ZONA'];
        var sMacroRDesc     =   datosNeXO['f01_macro_des'];
        //var sDistritoRDesc  =   datosNeXO['f01_distrito_desc'];
        var sZonaRDesc      =   datosNeXO['INT_ZONA_DESC'];
        /*VERIFICAR DATOS - CATEGORIA AGRUPADA - ID MACRODISTRITO*/
        var iCategoriaAgrupada      =   datosNeXO['INT_AC_MACRO_ID'];
        var iMacrodistrito          =   datosNeXO['INT_ID_CAT_AGRUPADA'];
         
        
        if(iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != ""){
            //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
                var sIdTramite = $rootScope.tramiteId;
                var datosSerializados = JSON.stringify(datosNeXO);
                archivo1 = "";
                //CREAR CASO AE LINEA
                //REQUISITOS PARA CREAR LA ACTIVIDAD ECONOMICA INT_AC_MACRO_ID, INT_ID_CAT_AGRUPADA

                var crearCaso   =   new gCrearCaso();
                crearCaso.usr_id    = 1,
                crearCaso.datos     = datosSerializados,
                crearCaso.procodigo = idProcodigo,
                crearCaso.crearCasoAeLinea(function(response){
                    try{
                        $scope.botones = null;
                        $scope.desabilitado = true;
                        response    =   JSON.parse(response);
                        var results = response.success.data;
                        indice = 0;
                            datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                            datosIF2 = datosIF[1];
                            datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                            $scope.nrotramitec = datosIF[0];
                            sessionService.set('NROTRAMITE', datosIF[0]);
                            sessionService.set('NROTRAMITEID', datosIF[1]);
                            sessionService.set('IDPROCESO', datosIF[6]);
                            var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                            datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";

                            //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                            try{
                               ///$scope.capturarImagen();
                                $scope.validarFormProcesos(paramForm);
                                $scope.guardarAdjuntosMultiplesMapa(results);
                            }catch(e){}

                            $.unblockUI();
                    }catch(e){
                        console.log("falla: ", e);
                        alert("conexion fallida ");
                    }
                });
            /*}else{
                swal('', "Complete sus Datos de Direccion", 'warning');
            }*/            
            
        }else{
            swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
        }
    };

     /*enviarFormProcesos*/
    $scope.validarFormProcesos = function(datosForm){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4; 
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function(resultado){
                $scope.tramitesCiudadano();
                $scope.bloquearBtnEnviarForm();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
            });
        } catch (error){
            swal('', 'Registro no modificado', 'error');
            $.unblockUI(); 
        }
    };

    /*SUBIR REQUISITOS 2018*/
     ////////////////REQUISITOS 2018/////////
    $scope.aDocObligarios = new Array();
    $scope.cambiarFile = function(obj, valor){
       $scope.datos[obj.name] = valor;
       setTimeout(function(){
            $rootScope.leyenda1 = obj.name;
       }, 500);
        /*REQUISITOS2018*/
        $scope.subirRequisitos(obj, valor);
    };

    /*REQUISITOS2018*/
    $scope.subirRequisitos  =   function(sobj, svalor){
        var rMisDocs = new Array();
        if(sobj.files[0]){
            rMisDocs.push(sobj.files[0]);
            $scope.almacenarRequisitos(rMisDocs);
            $scope.adicionarArrayDeRequisitos(sobj);
        }
    };

    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.adicionarArrayDeRequisitos = function(aArch){
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + aArch.files[0].name + "?app_name=todoangular";
        var adatafile   =   {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + aArch.files[0].name + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
        $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        $scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
        //$scope.fileArRequisitos.push(JSON.parse(myJSON));
    }

    /*REQUISITOS2018*/
    $scope.clonarRequisitosDocumentales = function(aRequArchivos){
        var i = 0;
        $scope.File_Adjunto =   {};
        datoObjectFiles = [];
        var longdato = 0;
        angular.forEach(aRequArchivos, function(archivo, key) {
            datoObjectFiles[i] = archivo;
            i = i +1;
        });
        $scope.datos.fileArchivosAd = datoObjectFiles;
    }

    $scope.ultimoArrayAdjunto = function(){
        atoObjectFile1 = new Object(); 
        datoObjectFile2 = new Object();
        datoObjectFile3 = new Object(); 
        datoObjectFile4 = new Object();
        datoObjectFile5 = new Object(); 
        datoObjectFile6 = new Object();
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[0] = datoObjectFile1;

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[1] = datoObjectFile2;

        datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
        datoObjectFile3.campo = 'Poder de Representación Legal';
        datoObjectFile3.nombre = 'Poder de Representación Legal';
        datoObjectFiles_ci[2] = datoObjectFile3;

        datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
        datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
        datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
        datoObjectFiles_ci[3] = datoObjectFile4;

        datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
        datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFiles_ci[4] = datoObjectFile5;

        datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
        datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFiles_ci[5] = datoObjectFile6;

        $scope.datos.FILE_CI = datoObjectFiles_ci;
        $scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile4 = new Object();
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + nombre_mapa + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.nombre = 'CROQUIS DE UBICACIÓN DE LA ACTIVIDAD ECONÓMICA';
        datoObjectFiles[0] = datoObjectFile4;
        $scope.datos.FILE_MAPA = datoObjectFiles;
        $rootScope.FileAdjuntos =  $scope.datos.FILE_CI.concat($scope.datos.FILE_MAPA,$scope.datos.fileArchivosAd);
    }
    /*REQUISITOS2018*/
    $scope.almacenarRequisitos = function(aArchivos){
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
                //console.log("error en el archivo");
            }
        });
    };

    /*REQUISITOS2018*/
    $scope.validarRequisitosForm = function(){
      //INICIAR DOCUMENTOS DE IDENTIDAD
      angular.forEach($scope.docArray, function(value, key) {
        //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
        if(value.idnro == 1){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Anverso).jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var scianverso  = $scope.datos.FILE_FOTOCOPIA_CI;
          if(scianverso == '' || scianverso == 'undefined' || scianverso == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = scianverso;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianverso + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        if(value.idnro == 2){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Reverso).jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var scianversor  = $scope.datos.FILE_FOTOCOPIA_CI_R;
          if(scianversor == '' || scianversor == 'undefined' || scianversor == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = scianversor;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianversor + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        if(value.idnro == 6){
          document.getElementById('txt_f01_upload'+value.resid).value = 'FUNDEMPRESA o Matricula de Comercio.jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var sfundempresa  = $scope.datos.file_fund_emp;
          if(sfundempresa == '' || sfundempresa == 'undefined' || sfundempresa == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = sfundempresa;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sfundempresa + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        if(value.idnro == 7){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Poder de Representación Legal.jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var spoderrep  = $scope.datos.f01_poder_representante;
          if(spoderrep == '' || spoderrep == 'undefined' || spoderrep == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = spoderrep;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + spoderrep + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        if(value.idnro == 8){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Testimonio de Constitución de Sociedad.jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var stestimonio  = $scope.datos.f01_test_cons_sociedad_j;
          if(stestimonio == '' || stestimonio == 'undefined' || stestimonio == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = stestimonio;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + stestimonio + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
          var doctes = $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
         
        }
        if(value.idnro == 9){
          document.getElementById('txt_f01_upload'+value.resid).value = 'NIT o inscripción al Régimen Simplificado.jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var snitidem  = $scope.datos.file_num_ident;
          if(snitidem == '' || snitidem == 'undefined' || snitidem == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = snitidem;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + snitidem + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }

        //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
        if(value.idnro == 3 || value.idnro == 4){
            var sviae  = $scope.datos.rdTipoTramite1;
            if(sviae  == 'RENOVACION'){//sin viae
                $scope.docArray[key].estado = false;
            }else{
                $scope.docArray[key].estado = true;
            }
        }
        //VALIDANDO LA SUPERFICIE DE LA ACTIVIDAD ECONOMNICA
        var ssuperficie = $scope.datos.f01_sup;
        if(ssuperficie){
          if(value.idnro == 5){
              if(ssuperficie <= 100){
                $scope.docArray[key].estado = false;
              }else{
                $scope.docArray[key].estado = true;
              }
          }
        }

        //VALIDANDO LA REGLA SI LA ACTIVIDAD ECONOMICA ES PROPIA O ALQUILADA
        var sestablecimiento = $scope.datos.f01_estab_es;
        if(sestablecimiento){
          if(value.idnro == 10){
            switch (sestablecimiento) {
              case 'PROPIO':
                $scope.docArray[key].estado = false;
              break;
              case 'ALQUILADO':
                $scope.docArray[key].estado = true;
              break;
              case 'ANTICRÉTICO':
                $scope.docArray[key].estado = true;
              break;
              case 'OTRO':
                $scope.docArray[key].estado = true;
              break;
            }
          }

          if(value.idnro == 11){
            switch (sestablecimiento) {
              case 'PROPIO':
                $scope.docArray[key].estado = true;
              break;
              case 'ALQUILADO':
                $scope.docArray[key].estado = false;
              break;
              case 'ANTICRÉTICO':
                $scope.docArray[key].estado = false;
              break;
              case 'OTRO':
                $scope.docArray[key].estado = false;
              break;
            }
          }
        }

        //zonasegura sinmostrar adjuntos
         if(value.idnro == 12){
            $scope.docArray[key].estado = false;
          }

        if(value.idnro == 13){
            $scope.docArray[key].estado = false;
        }

        if(value.idnro == 14){
            $scope.docArray[key].estado = false;
        }

        if(value.idnro == 15){
            $scope.docArray[key].estado = false;
        }
        //zonasegura sinmostrar adjuntos
        
        var stipotramite = $scope.datos.rdTipoTramite;
        if(stipotramite){
          if(value.idnro == 16){
            switch (stipotramite) {
              case 'RENOVACION':
                $scope.docArray[key].estado = true;
              break;
              case 'NUEVO':
                $scope.docArray[key].estado = false;
              break;
            }
          }
        }
      });
      try{
        console.log("error en adjuntos");
      }catch(e){}
    }

    scope.iniciarRequsitosDoc = function(data){
        var validarpromesas = [$scope.iniciarRequisitosForm(data)];
        $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
           console.log("resp: ", resp);
        });
    }

    /*REQUISITOS2018*/
    $scope.iniciarRequisitosForm = function(data){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.fileArRequisitos = {};
        if(data.sArrayFileArRequisitos){
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function(){
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_"+key).val(value.campo);
                    deferred.resolve(data);
                });
                $scope.validarRequisitosForm();

            },3500);
        }
         return deferred.promise;
    }

    /*REQUISITOS2018*/
    $scope.iniciarGetRequisitosForm = function(sidcategoria, stipoper){
        if(sidcategoria ==  3375){//verificamos si la licencia es multiple
          $scope.lstRequisitosMultiples2018($scope.datos.licenciam);
        }else{
          $scope.getRequisitosFormulario(sidcategoria, stipoper);
        }
    }

       /*REQUISITOS2018*/
    $scope.getRequisitosFormulario = function(sidcategoria, stipoper){
        if(stipoper == 'JURIDICO'){
            stipoper = 'J';
        }
        if($scope.datos){
            var idCategoria = sidcategoria;
            var persona = stipoper;
            if(typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = idCategoria;
                ndCategoria.stipopersona = persona;
                ndCategoria.aelstRequisitos2018(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for(j=0; j<datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado   = true;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });


            }
         }
    };

    /*REQUISITOS2018 - array*/
    $scope.lstRequisitosMultiples2018 = function(licenciamul){
        var sconsulta   = '[';
        for(i=0; i<licenciamul.length; i++){
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        // texto.substring(0,texto.length-1);

        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'J';
            if(typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018array();
                ndCategoria.asidcategoria = aidCategoria;
                ndCategoria.astipopersona = persona;
                ndCategoria.aelstRequisitos2018_array(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for(j=0; j<datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado=true;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
         }
    };

    /*REQUISITOS2018*/
    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };
    /*TERMINA REQUISITOS 2018*/

    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction_crearcaso_linea;
        var aDatosCaso      = sdataArchivo.split(',');
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('NROTRAMITEID');
        $scope.docusuario           =   "Ciudadano";
        $scope.archivosMultiples    =   JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES_MAPA);
        $scope.docsistema           =   'AE_EN_LINEA';
        $scope.sIdProcesoActual     =   sessionService.get('IDPROCESO');//aDatosCaso[6];//datosCaso.idProceso;// 1;
        $scope.sCasoNro             =   sessionService.get('NROTRAMITEID');//x;//aDatosCaso[1];//datosCaso.sNrocaso//49;
       $scope.sCasoNombre          =   '15 - ADJUNTOS';
        var aImagenJson =   JSON.parse($scope.archivosMultiples);
        var imgCroquis  = new gDocumentos();
        imgCroquis.doc_sistema              =   $scope.docsistema;
        imgCroquis.doc_proceso              =   $scope.sIdProcesoActual;
        imgCroquis.doc_id                   =   $scope.sCasoNro;
        imgCroquis.doc_ci_nodo              =   $scope.sCasoNombre;
        imgCroquis.doc_url_logica           =   aImagenJson[0].url_archivo;
        imgCroquis.doc_nombre               =   aImagenJson[0].nombre_archivo;
        imgCroquis.doc_titulo               =   aImagenJson[0].titulo;
        imgCroquis.doc_palabras             =   aImagenJson[0].descripcion;
        imgCroquis.doc_datos                =   aImagenJson[0].docdatos;
        imgCroquis.doc_nrotramite_nexo      =   $scope.nrotramitec;
        imgCroquis.doc_usuario              =   $scope.docusuario;
        imgCroquis.doc_url                  =   aImagenJson[0].url_archivo;
        imgCroquis.doc_version              =   0;
        imgCroquis.doc_tiempo               =   0;
        imgCroquis.doc_firma_digital        =   "";
        imgCroquis.doc_registro             =   "";
        imgCroquis.doc_modificacion         =   "";
        imgCroquis.doc_estado               =   'A';
        imgCroquis.doc_tipo_documento       =   "";
        imgCroquis.doc_tamanio_documento    =   "";
        imgCroquis.doc_tps_doc_id           =   0;
        imgCroquis.doc_acceso               =   "";
        imgCroquis.doc_cuerpo               =   "";
        imgCroquis.doc_tipo_documentacion   =   "";
        imgCroquis.doc_tipo_ingreso         =   "";
        imgCroquis.doc_estado_de_envio      =   "";
        imgCroquis.doc_correlativo          =   "";
        imgCroquis.doc_tipo_documento_ext   =   "";
        imgCroquis.doc_id_carpeta           =   0;
        imgCroquis.insertarDoc(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                console.log("REGISTRO IMAGEN CORRECTAMENTE CORRECTO");
            } else {
                $.unblockUI();
                swal(resultadoApi.error.message);
            }
        });

    };

    // ***********************  MAPA     **************************************************************************************************************************************************
    
    var latitud = 0;
    var longitud = 0;
    var activarClick = false;
    var versionUrl = "";
    var markerToClose = null;
    var dynamicMarkers;
    var vNroInsidenciaG = 0;
    var recargaMapita;
    var map;
    var markers = [];

    $scope.initMap = function() {
        var haightAshbury = {
            lat: -16.495635,
            lng: -68.133543
        };
        try{
            map = new google.maps.Map(document.getElementById('mapActividad'), {
                zoom: 15,
                center: haightAshbury
            });
            map.addListener('click', function(event) {
                $scope.deleteMarkers();
                $rootScope.laaa = event.latLng.lat();
                $rootScope.looo = event.latLng.lng();
                $scope.datos.INT_AC_latitud = $rootScope.laaa;
                $scope.datos.INT_AC_longitud = $rootScope.looo;
                $scope.addMarker(event.latLng);
            });
        }catch(err){}
        console.log("haightAshbury: ", haightAshbury);
    }

    // Adds a marker to the map and push to the array.
    $scope.addMarker = function(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker);
    }

    // Sets the map on all markers in the array.
    $scope.setMapOnAll = function(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    $scope.clearMarkers = function() {
      $scope.setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
      $scope.setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
      $scope.clearMarkers();
      markers = [];
    }

    $scope.convertToDataURLviaCanvas = function (url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
        
    };
    $scope.subirImgBase64= function(imagen,url,nombre){
        var contentType = 'image/png';
        var b64Data = imagen;
        var blob = b64toBlob(b64Data, contentType);
        var blobUrl = URL.createObjectURL(blob);
        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        blob.name = nombre;
        var resFormulario = {
            container:url,
            file_path:nombre,
            body:blob
        };
        fileUpload.uploadFileToUrl(blob, uploadUrl);
       /* DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
        });*/
    };

    $scope.capturarImagen = function(){
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var latitud = $rootScope.laaa;
        var longitud = $rootScope.looo;
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.url = "RC_CLI/" + $scope.oidCiudadano + "/" + sDirTramite;
        $scope.archivo1 = sDirTramite+"croquisActividad.jpg";
        $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL+"/files/"+$scope.url + "/"+ $scope.archivo1 + "?app_name=todoangular";
        aDocAdjuntosmapa = [];
        var datosAdjuntosmapa = {
            "nombre_archivo" : $scope.archivo1,
            "tam_archivo" : '0',
            "estado_archivo" : "Env.",

            "opcion_archivo" : "-",
            "url_archivo" : $scope.datos.INT_AC_direccionImagenmapa,
            "docdatos" : "Croquis de la actividad",
            "descripcion" : "Croquis de la actividad",
            "titulo" : "Croquis"
        };
        aDocAdjuntosmapa[0]=datosAdjuntosmapa;
        $scope.datos.ARCHIVOS_MULTIPLES_MAPA = aDocAdjuntosmapa;
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
            var Imagen = base64Img.replace(/data:image\/png;base64,/i,'');
            $scope.Imagenb = Imagen;
            $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
        });
    }

    ///termina MAPA

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
        /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function (data) {
         //DOCS OBLIGATORIOS
        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;

        if(data.f01_tipo_lic == 3375){
            data.f01_categoria_agrupada = 3375;
            data.f01_categoria_descrip = 3375;
            $scope.datos.f01_categoria_agrupada = 3375;
            $scope.datos.f01_categoria_descrip = 3375;
            sarrayobligatorio   =   true;
        }

        if(data.f01_tipo_lic == 3375){
          if(data && data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
            data.FILE_CI != ""  && data.FILE_CI != null &&
            data.rdTipoTramite != "" && data.rdTipoTramite != null &&
            data.fileArchivosAd != ""  && data.fileArchivosAd != null &&
            data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
            data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
            data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
            data.f01_raz_soc != "" && data.f01_raz_soc != null &&
            data.f01_sup != "" && data.f01_sup != null &&
            data.f01_de_hor != "" && data.f01_de_hor != null &&
            data.f01_a_hor != "" && data.f01_a_hor != null &&
            data.f01_estab_es != "" && data.f01_estab_es != null &&
            data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
            data.licenciam != "" && data.licenciam != null &&
            data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
            data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
            data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
            data.f01_num_act != "" && data.f01_num_act != null &&
            data.f01_num_act1 != "" && data.f01_num_act1 != null ){
            $scope.serializarInformacion(data);
          }
          else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
          }

        }
        if (data.f01_tipo_lic != 3375){
          if(data &&  data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
              data.FILE_CI != ""  && data.FILE_CI != null &&
              data.rdTipoTramite != "" && data.rdTipoTramite != null &&
              data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
              data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
              data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
              data.f01_raz_soc != "" && data.f01_raz_soc != null &&
              data.f01_sup != "" && data.f01_sup != null &&
              data.f01_de_hor != "" && data.f01_de_hor != null &&
              data.f01_a_hor != "" && data.f01_a_hor != null &&
              data.f01_estab_es != "" && data.f01_estab_es != null &&
              data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
              data.f01_categoria_agrupada != "" && data.f01_categoria_agrupada != null &&
              data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
              data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
              data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
              data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
              data.f01_num_act != "" && data.f01_num_act != null &&
              data.f01_num_act1 != "" && data.f01_num_act1 != null ){
              //$rootScope.validacionRequisitosTec();
              $scope.serializarInformacion(data);
            }else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }


        /*
        if(data &&
            data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
            data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
            data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
            data.f01_raz_soc != "" && data.f01_raz_soc != null &&
            data.f01_sup != "" && data.f01_sup != null &&
            data.f01_de_hor != "" && data.f01_de_hor != null &&
            data.f01_a_hor != "" && data.f01_a_hor != null &&
            data.f01_estab_es != "" && data.f01_estab_es != null &&
            data.f01_productosElaborados != "" && data.f01_productosElaborados != null &&
            data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
            data.f01_categoria_agrupada != "" && data.f01_categoria_agrupada != null &&
            data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
            data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
            data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
            data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
            data.f01_num_act != "" && data.f01_num_act != null &&
            data.f01_num_act1 != "" && data.f01_num_act1 != null ){
            //$rootScope.validacionRequisitosTec();
            $scope.serializarInformacion(data);
        }else{
            swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
        }*/
    }
    
    $scope.cargarDatosJuridico = function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');

        if($scope.sTipoPersona=="JURIDICO"){  
            $scope.divJuridico = "mostrar";
        } 
        $scope.macrodistritos();
        $scope.getCaptchasXX();

        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
        $scope.getLicenciasmul();
        $scope.listadoDatosLicencia();
    };

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        if(data.length > 0){
            if(data[0].venviado != 'SI'){                
                if(data[0].datos.INT_FORM_ALMACENADO != 'G'){
                    $scope.validarActividadEconomica();
                }else{                    
                    if(data[0].datos.rdTipoTramite == 'NUEVO'){
                        $scope.mostrarMsgNuevaActividad = true;
                        $scope.formDatosAE              = false;
                        $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion. Creara una nueva Actividad Economica.";
                    }else{
                        $scope.validarActividadEconomica();
                    }
                }
            }
        }
    });

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        //TIPO DE LICENCIA
        $scope.listadoDatosLicencia();
        $scope.getLicenciasmul();
        if(typeof(data.f01_tipo_lic) != 'undefined'){ 
            $scope.listadoCategoria(data.f01_tipo_lic);
            if(typeof(data.f01_categoria_agrupada) != 'undefined'){
                $scope.lst_actividad_desarrollada(data.f01_categoria_agrupada);
            }else{
                $scope.desabilitarActDesarrollada =   true;
            }
        }else{
            $scope.desabilitarTipoCategoria =   true;
            $scope.desabilitarActDesarrollada =   true;
        }
        
        //VERIFICAR CATEGORIA DESARROLLADA
        var categoriaDescrip         =   ((typeof(data.f01_categoria_descrip)             == 'undefined' || data.f01_categoria_descrip             == null) ? '' : data.f01_categoria_descrip);
        $scope.sActividadDesarrollada=true;
        if(categoriaDescrip == ''){            
            $scope.sActividadDesarrollada=false;
        }

        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc         =   ((typeof(data.f01_categoria_agrupada)             == 'undefined' || data.f01_categoria_agrupada             == null) ? '' : data.f01_categoria_agrupada);
        if(categoriaAgrupadaDesc != ''){   
            $scope.getRequisitosCategoriaTecnicos(data.f01_tipo_lic,categoriaAgrupadaDesc, data.f01_tipo_per);
        }

        if(data.f01_tipo_lic == 3375){
            $scope.sCategoria = false ;
            $scope.sActividadDesarrollada = false;
            $scope.SeleccionaPrioridad(data.f01_actividad_principal_array);
        }

        /*REQUISITOS2018*/
        $scope.iniciarGetRequisitosForm(data.f01_categoria_agrupada, data.f01_tipo_per);
        //$scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
        $scope.iniciarRequsitosDoc(data);
        //APAGAR COMBOS - ZONA - TIPO DE VIA

         //APAGAR COMBOS - ZONA - TIPO DE VIA
        if(typeof(data.f01_zona_act_descrip) == 'undefined'){
            setTimeout(function(){
                $scope.desabilitadoZ=true;
                $scope.desabilitadoV=true;
            }, 1000);
        }
        
        if(typeof(data.f01_tip_via_act) == 'undefined'){
            setTimeout(function(){
                $scope.desabilitadoZ=true;
                $scope.desabilitadoV=true;
            }, 1000);
        }else{
            $scope.cargarNombVia(data.f01_tip_via_act, data);
        }
        
        //MOSTRAR VIAE
        if(typeof(data.rdTipoTramite1) != 'undefined'){
            if ( data.rdTipoTramite1 == "NUEVO") {
                $scope.licenciaToogle4 = true;
            } else if(data.rdTipoTramite1 == "RENOVACION") {                
                $scope.licenciaToogle4 = false;
            }
        }
        
        //MOSTRAR RADIO NUEVA - RENOVACION
        if(typeof(data.rdTipoTramite) != 'undefined'){
            if ( data.rdTipoTramite == "NUEVO") {
                //MOSTRAMOS BOTONES PAGINA
                if ( data.INT_FORM_ALMACENADO == "G") {
                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            }
        }        

        if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            var idMacro =   data.INT_AC_MACRO_ID;
            $scope.aDistritoZona = {};
            try{
                var parametros = new distritoZona();
                parametros.idMacro = idMacro;
                parametros.obtdist(function(resultado){
                    data = JSON.parse(resultado);
                    if(data.success.length > 0){
                        $scope.aDistritoZona = data.success;
                    }else{
                        $scope.msg = "Error !!";
                    }
                })
            }catch(error){
                console.log("error");
            }
        }
        
        if(typeof($scope.datos.INT_VIA) != 'undefined'){
            var idTipoVia   =   $scope.datos.INT_VIA;
            var tipoVia     =   [
                { name: 'AVENIDA', id: '1'},
                { name: 'CALLE', id: '2'},
                { name: 'CALLEJON', id: '3'},
                { name: 'PASAJE', id: '4'}
            ];
            angular.forEach(tipoVia, function(value, key) {
                if(value.id == idTipoVia){
                    $scope.datos.INT_TIP_VIA  =   value.name;
                }
            });
        }

        setTimeout(function(){
            if(
                (typeof($scope.datos.INT_AC_latitud) !=  'undefined' && $scope.datos.INT_AC_latitud  != "" && $scope.datos.INT_AC_latitud != 0 && $scope.datos.INT_AC_latitud != "0") &&
                (typeof($scope.datos.INT_AC_longitud) != 'undefined' && $scope.datos.INT_AC_longitud != "" && $scope.datos.INT_AC_longitud != 0 && $scope.datos.INT_AC_longitud != "0")
            ){
                var nuevoUbicacion = {
                    lat: parseFloat($scope.datos.INT_AC_latitud),
                    lng: parseFloat($scope.datos.INT_AC_longitud)
                };
                map.setCenter(nuevoUbicacion);
                $scope.addMarker(nuevoUbicacion);
            }else{
                 var nuevoUbicacion = {
                    lat: -16.495635,
                    lng: -68.133543
                };
                map.setCenter(nuevoUbicacion);
                $scope.setMapOnAll();
            }
        },500);

        if(data.f01_tip_via_prop != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.f01_tip_via_prop);
        }
        $scope.datos.f01_nom_via_prop = data.f01_nom_via_prop;

        $scope.obtenerHora();
        $scope.obtenerFecha();

    });//INICIAR CAMPOS INTERNET
    
    $scope.vias= function(zona,tipo){
        $scope.z =zona;
        $scope.t =tipo;
        try{
            var datos = new tipoVia();
            datos.idz = zona;
            datos.tipo = tipo;
            datos.obt_tipoVia(function(results){
                $scope.tip_vias =   [];
                var aTipoVia    =   {};
                aTipoVia["idv"] = "OTROS";
                aTipoVia["nombrev"] = "OTRO";
                data = JSON.parse(resultado);
                if(data.success.length > 0 ){
                    $scope.tip_vias =   data.success;
                }
                $scope.tip_vias.push(aTipoVia);
                $scope.desabilitadoNo=false;
            })
        }catch(error){
            console.log("error en via");
        }
    };

     //fecha del servidor
    $scope.obtenerFecha = function(){
        var sfecha = "";
        try{
            var fechaactualn = new fechaserver();
            fechaactualn.obtfechahora(function(resultado){
                sfecha  =   JSON.parse(resultado).success.fecha;
            });

            var sfechafinal =   "";
            if(sfecha != null && sfecha != "") {
                var snuevafecha = "";
                var nrof    =   0;
                try{
                    nrof    =   sfecha.split("/").length;
                }catch(e){}
                if(nrof > 1){
                    var dateString = sfecha;
                    var dateParts = sfecha.split("/");
                    snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);// month is 0-based
                }else{
                    snuevafecha = new Date(sfecha);
                }

                var messnuevafecha = "";
                var diasnuevafecha = "";
                if(snuevafecha != 'Invalid Date'){
                    messnuevafecha        =     snuevafecha.getMonth()+1;
                    messnuevafecha        =     (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                    if (snuevafecha.getDate()<10){
                        diasnuevafecha = "0" + (snuevafecha.getDate());
                    }else{
                        diasnuevafecha = snuevafecha.getDate();
                    }
                    sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
                $scope.anioserver = snuevafecha.getFullYear();
                }
            } else {
                sfechafinal =  sfecha;
            }
                $scope.fechafinalserver = sfechafinal;
            return sfechafinal;
        }catch(e){
            $.unblockUI();
        }
    };

   $scope.obtenerHora = function(){
        var sfecha = "";
        var fechaactualh = new fechaserver();
        fechaactualh.obtfechahora(function(resultado){
            sfecha  =   JSON.parse(resultado).success.fecha;
        });
        var sfechafinal =   "";
        if(sfecha != null && sfecha != "") {
            snuevafecha = new Date(sfecha);
            var shora     = "";
            var sminuto   = "";
            var ssegundo  = "";
            shora       =   snuevafecha.getHours();
            sminuto     =   snuevafecha.getMinutes();
            ssegundo    =   snuevafecha.getSeconds();
            sfechafinal =   shora + ":" + sminuto + ":" + ssegundo;
        } else {
            sfechafinal =  sfecha;
        }
        return sfechafinal;
     };

    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data){
        $scope.btnEnviarForm    =   false;
        if(data){
            if(data == 'G'){
                $scope.btnEnviarFormLinea    =   false;
            }else if(data == 'C'){
                $scope.btnEnviarFormLinea    =   true;
            }
        }    
    });


    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
        } else {
            $scope.btnGuardarForm   =   false;
        }

        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
         }
        $scope.initMap();
    });

     $scope.$on('$destroy', function() {
        clsIniciarHtmlForm();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciaBtnHabilitar();
    });

});
