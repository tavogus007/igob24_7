function aepermisoexcepcionalnaturalController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
    document.signupForm.btnFormLicencia.disabled=true;
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];
    $scope.domicilio_xxx ="";
   /* $scope.listadoActividadesEconomicas = function () {
        var dataGenesis       = ((typeof($rootScope.datosGenesis)    == 'undefined' || $rootScope.datosGenesis == null) ? {}  : $rootScope.datosGenesis); 
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        if(sNumeroRegistros > 0 ){
            var idContribuyente =   $rootScope.datosGenesis[0].idContribuyente;
            var contribuyente   =   new gLstActividadEconomica();
            contribuyente.idContribuyente   =   idContribuyente;
            contribuyente.tipo  =   'N';
            contribuyente.lstActividadEconomica(function(resultado){ 
                $.unblockUI(); 
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    $scope.formDatosAE  =   true;
                    $scope.mostrarMsgActividadTrue  = true;
                    $scope.mostrarMsgActividadFalse = false;
                    var response    =   resultadoApi;
                    $scope.trmUsuario = response.success.dataSql;
                    var data = response.success.dataSql;
                    $scope.tblTramites.reload(); 
                    $scope.desabilitado = true;  
                } else {
                    $scope.mostrarMsgActividadTrue  = false;
                    $scope.mostrarMsgActividadFalse = true;                        
                    $scope.formDatosAE  =   false;
                    $scope.desabilitado = true;
                    swal('', "Datos no Encontrados !!!", 'warning');
                }

                var sformguardado   =   $scope.datos.INT_FORM_ALMACENADO;
                if(typeof sformguardado == 'undefined' || sformguardado != 'G'){
                    $scope.botones = null;
                    $scope.desabilitado = true; 
                    $scope.limpiarDatos();                    
                    swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea registrar.", 'warning');                    
                }else{

                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            });
        }else{
            $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";                                
            $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE  =   false;  
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";                                
                $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            }
            $.unblockUI();
        }
    };*/
    $scope.listadoActividadesEconomicas = function () {
       console.log("ingreso listado actividad economica");
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;



        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
      
        if(tipoPersona == "NATURAL"){
            console.log("ingreso natural");
            tipoPersona = "N";
            $scope.div_natural = true;
            $scope.div_juridico = false;
            $scope.div_nit_jn = true;
            $scope.txtMsgDataNuevaActividad =   "DATOS DEL SOLICITANTE :";
        }else{
            tipoPersona = "J";
            $scope.div_natural = false;
            $scope.div_juridico = true;
            $scope.div_nit_jn = false;
            $scope.txtMsgDataNuevaActividad =   "DATOS PERSONA JURIDICA :";
        }
        
        if(sNumeroRegistros > 0 ){
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            $scope.datos.rdTipoTramite = "RENOVACION";            
         
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
                        $scope.limpiarDatos();
                        //swal('Estimado Ciudadano', "Antes de realizar el registro, debe seleccionar la Actividad Economica.", 'warning');
                    }else{
                        $scope.botones = "mostrar";
                        $scope.desabilitado = true;
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        }else{
            $scope.botones = "mostrar";
            $scope.desabilitado = true;
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE  =   false;
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.datos.rdTipoTramite = "NUEVO";
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";
                $scope.txtMsgDataNuevaActividad =   "Puede registrar una actividad económica a travez de esta página web o visitarnos en plataforma";
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

    $scope.selActividadEconomica =  function(tramite){
     $scope.limpiarDatos();
     console.log("listaractividad");  
     

        $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
        $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
        $scope.sIdAeGrilla  =   tramite.IdActividad;
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = tramite.IdActividad;
        datosGenerales.getDatosAE_Viae(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                codhojaruta = resultadoApi.success.dataSql.datosAE[0].hojaRuta;
                var response = resultadoApi.success.dataSql.datosAE;
                var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;




                if(response.length > 0){
                    if(response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null'){
                        response[0].numeroOrden = 0;
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    else{
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }

                    $scope.div_actividad_economica = true;
                    $scope.div_solicitante = true;
                    $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                    $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                   
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var smacrodes = "";
                    var szona       =   "DISTRITO";



                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.f01_raz_soc   =   response[0].denominacion;
                    $scope.datos.f01_sup  =   response[0].superficie;
                    $scope.datos.f01_cap_aprox   =   response[0].capacidad;
                   
                    try{
                        smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}
                    if(response[0].IdMacrodistrito == 2 || response[0].IdMacrodistrito == '2'){
                       smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " MAXIMILIANO PAREDES";
                    }
                    if(response[0].IdMacrodistrito == 4 || response[0].IdMacrodistrito == '4'){
                       smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " SAN_ANTONIO";
                    }
                    if(response[0].establecimiento =='ALQUI'){
                        $scope.datos.f01_estab_es = "ALQUILADO";
                    }
                    if(response[0].establecimiento =='PROPI'){
                        $scope.datos.f01_estab_es = "PROPIO";
                    }
                    if(response[0].establecimiento =='ANTIC'){
                        $scope.datos.f01_estab_es = "ANTICRÉTICO";
                    }
                    if(response[0].establecimiento =='OTRO'){
                        $scope.datos.f01_estab_es = "OTRO";
                    }
                    $scope.datos.f01_tip_act = response[0].tipoActividad;
                    if(response[0].tipoActividad =='MA' || response[0].tipoActividad =='MATRI'){
                        $scope.datos.f01_tip_act_dec = 'MATRIZ';
                        $scope.datos.f01_tip_act = 'MA';
                    }
                    if(response[0].tipoActividad =='SU' || response[0].tipoActividad =='SUCUR'){
                        $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                        $scope.datos.f01_tip_act = 'SU';
                    }
                    /*DATOS DE LA ACTIVIDAD*/
                    $scope.datos.f01_num_pmc = response[0].padron;
                    $scope.datos.f01_raz_soc = response[0].denominacion;
                    $scope.datos.f01_sup = response[0].superficie;
                    $scope.datos.f01_de_hor = hinicio;
                    $scope.datos.f01_a_hor = hfinal;
                    $scope.datos.f01_nro_actividad = response[0].numeroActividad;
                    $scope.datos.f01_productosElaborados = response[0].productosElaborados;
                    $scope.datos.f01_actividadesSecundarias = response[0].actividadesSecundarias;
                    /*TIPO LICENCIA*/
                    $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;
                    $scope.datos.f01_categoria = response[0].idactividad_desarrollada343;
                    $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                     $scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].ActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_descripcion = response[0].actividad_desarrollada343;
                    
                    $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act_descrip = smacrodes;
                    $scope.datos.INT_AC_DISTRITO = response[0].idDistrito_actividadEconomica;
                    $scope.datos.f01_dist_act          = response[0].idDistrito_actividadEconomica;
                    $scope.datos.INT_AC_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.INT_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act_descrip = response[0].zona;
                    $scope.datos.f01_tip_via_act = response[0].tipoVia;
                    $scope.datos.f01_num_act = response[0].via;
                    $scope.datos.f01_num_act1 = response[0].numero;
                    $scope.datos.f01_edificio_act = response[0].edificio;
                    $scope.datos.f01_bloque_act = response[0].bloque;
                    $scope.datos.f01_piso_act = response[0].piso;
                    $scope.datos.f01_dpto_of_loc = response[0].departamento;
                    $scope.datos.f01_tel_act1 = response[0].telefono;
                    $scope.datos.f01_casilla = response[0].casilla;
                    $scope.datos.f01_factor          =  response[0].tipoTrayecto;
                    $scope.distritoZonas(smacrodes);
                    $scope.actulizarIdDistrito(response[0].zona);


                    if(response[0].idactividad_desarrollada343 == '0' || response[0].idactividad_desarrollada343 == 0){
                      $scope.LicenciaXCategoriaA(response[0].idActividadDesarrollada)  
                    }

                    if(response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined'){
                        response[0].edificio = '';
                        response[0].bloque = '';
                        response[0].piso = '';
                        response[0].departamento = '';
                        response[0].telefono = '';
                    }
                    $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                    $scope.datos.f01_categoria_descrip_ant = response[0].ActividadDesarrollada;
                    $scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act);
                    $scope.getDatosLotus(resultadoApi.success.dataSql.datosAE[0].idActividadEconomica,codhojaruta);
                    $scope.desabilitado = false; 
                    $scope.botones = "mostrar";

                }


                
                //$rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
            }else{
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });

        
    };  






    $scope.getDatosLotus = function(idadcteco, hojar){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var datosLotus = new getDatosAELotus();                        
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta){
                $scope.resultadoLotus = JSON.parse(respuesta);
                $scope.resultadoCP = $scope.resultadoLotus.success.data[0].datos;
                $scope.datos.INT_AC_latitud = $scope.resultadoCP.INT_AC_latitud;
                $scope.datos.INT_AC_longitud = $scope.resultadoCP.INT_AC_longitud;
                //$scope.datos.f01_tipo_lic_descrip = $scope.resultadoCP.f01_tipo_lic_descrip;
                //$scope.datos.f01_categoria_agrupada_descrip = $scope.resultadoCP.f01_categoria_agrupada_descrip;
                //$scope.datos.f01_categoria_agrupada_descripcion = $scope.resultadoCP.f01_categoria_agrupada_descripcion;
                $scope.datos.f01_casilla = $scope.resultadoCP.f01_casilla;
                $scope.datos.f01_num_act =  $scope.resultadoCP.f01_num_act;
                $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                $q.all($scope.resultadoLotus).then(function(data){
                    deferred.resolve($scope.resultadoLotus);
                })
            });
        }catch(e){
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function(data){
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;   
    } 

    $scope.LicenciaXCategoriaA = function(idDesarrollada){
        //$scope.$apply();
        try{
                var tipo = new categoriaagrupadalicenciades();
                tipo.dependencia = idDesarrollada;
                tipo.categoriaagrupadalicencia_des(function(res){
                    $scope.datosActividadLicencia = "";
                    x = JSON.parse(res);
                    response = x.success.data;
                    if(response.length > 0){
                        console.log("response Licencia:: ",response);
                        $scope.datosActividadLicencia = response;
                        $scope.datos.f01_categoria_agrupada = response[0].catagrpuid; 
                        $scope.datos.f01_categoria_agrupada_dem = response[0].idcategoriaagrupada;
                        $scope.datos.f01_categoria_agrupada_descrip = response[0].idcategoriaagrupada;
                        
                        
                    }else{
                        $scope.msg = "Error !!";
                    }
                });
        }catch(e){
                console.log("Error en la actividad desarrollada");
        }
                       
        //$scope.GetValueZonaSegura($scope.datos.f01_categoria_agrupada);
    }

     $scope.mostrarimg  =   function(imagen){         
        if (typeof($scope.datos.FILE_VEHICULO_FOTO) != 'undefined') {
            var nombreArchivoCi    =   "";
            nombreArchivoCi        =   $scope.datos.FILE_VEHICULO_FOTO;
            var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
            var extCi              =   aTipoArchivoCi.split(".")[1];
            try{
                extCi                  =   extCi.toLowerCase();
            }catch(e){}
            if(imagen == 'FILE_VEHICULO_FOTO'){
                $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCI, "_blank");
                }else {
                    console.log("sin archivo");

                }          
            }
        };      
        

        if (typeof($scope.datos.FILE_RUAT_VEHICULO != 'undefined')) {
            var nombreArchivoCiR    =   "";
            nombreArchivoCiR        =   $scope.datos.FILE_RUAT_VEHICULO;
            var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
            var extCiR              =   aTipoArchivoCiR.split(".")[1];   
            try{
                extCiR                  =   extCiR.toLowerCase();
            }catch(e){}

            if(imagen == 'FILE_RUAT_VEHICULO'){
                $scope.archivoCIR =  CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";          
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCIR, "_blank");
                 }else {
                    console.log("sin archivo");

                }   
            } 
        }; 


        if (typeof($scope.datos.FILE_FORMVH_EXCEL != 'undefined')) {
            var nombreArchivoCiR    =   "";
            nombreArchivoCiR        =   $scope.datos.FILE_FORMVH_EXCEL;
            var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
            var extCiR              =   aTipoArchivoCiR.split(".")[1];   
            try{
                extCiR                  =   extCiR.toLowerCase();
            }catch(e){}

            if(imagen == 'FILE_FORMVH_EXCEL'){
                $scope.archivoCIR =  CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";          
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCIR, "_blank");
                 }else {
                    console.log("sin archivo");

                }   
            } 
        }; 


        if (typeof($scope.datos.FILE_CONTRATO_DELIVERY != 'undefined')) {
            var nombreArchivoCiR    =   "";
            nombreArchivoCiR        =   $scope.datos.FILE_CONTRATO_DELIVERY;
            var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
            var extCiR              =   aTipoArchivoCiR.split(".")[1];   
            try{
                extCiR                  =   extCiR.toLowerCase();
            }catch(e){}

            if(imagen == 'FILE_CONTRATO_DELIVERY'){
                $scope.archivoCIR =  CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_CONTRATO_DELIVERY + "?app_name=todoangular";          
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCIR, "_blank");
                 }else {
                    console.log("sin archivo");

                }   
            } 
        }; 


        if (typeof($scope.datos.FILE_FOTO_SOLICITANTE != 'undefined')) {
            var nombreArchivoCiR    =   "";
            nombreArchivoCiR        =   $scope.datos.FILE_FOTO_SOLICITANTE;
            var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
            var extCiR              =   aTipoArchivoCiR.split(".")[1];   
            try{
                extCiR                  =   extCiR.toLowerCase();
            }catch(e){}

            if(imagen == 'FILE_FOTO_SOLICITANTE'){
                $scope.archivoCIR =  CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";          
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCIR, "_blank");
                 }else {
                    console.log("sin archivo");

                }   
            } 
        }; 


        if (typeof($scope.datos.FILE_FOTO_LICENCIA_CI != 'undefined')) {
            var nombreArchivoCiR    =   "";
            nombreArchivoCiR        =   $scope.datos.FILE_FOTO_LICENCIA_CI;
            var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
            var extCiR              =   aTipoArchivoCiR.split(".")[1];   
            try{
                extCiR                  =   extCiR.toLowerCase();
            }catch(e){}

            if(imagen == 'FILE_FOTO_LICENCIA_CI'){
                $scope.archivoCIR =  CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE')+ "/" + sessionService.get('IDTRAMITE') +"/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";          
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    window.open($scope.archivoCIR, "_blank");
                 }else {
                    console.log("sin archivo");

                }   
            } 
        }; 

        
        $.unblockUI();
    }

    $scope.ejecutarFile = function(idfile){

        console.log(idfile,"idfile");

        if(idfile == 'FILE_FOTO_SOLICITANTE' || idfile == 'FILE_FOTO_LICENCIA_CI'){
            swal({
                title: 'ALERTA',
                text: 'El cargado de documentos debe seguir el orden de los documentos de vehiculos.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                closeOnConfirm: false
              }, function() {
                swal.close();
                setTimeout(function(){
    
                    var sid =   document.getElementById(idfile);
                    if(sid){
                        document.getElementById(idfile).click();
                    }else{
                        alert("Error ");
                    }
    
                }, 1000);
              });

        }else{

            var sid =   document.getElementById(idfile);
            if(sid){
                document.getElementById(idfile).click();
            }else{
                alert("Error ");
            }
        }


    };

    $scope.limpiarDatos = function(){
        document.signupForm.btnFormLicencia.disabled=true;
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
        $scope.datos.f01_factor = '';
        $scope.datos.f01_tip_act = '';
        $scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_tipo_lic_descrip = '';
        $scope.datos.f01_categoria = '';
        $scope.datos.f01_categoria_descrip = '';
        $scope.datos.f01_categoria_agrupada = '';
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descrip = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.licdes=[];
        $scope.multiple=[];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.licmul_grilla = '';
        $scope.datos.Licenmul_grilla = '';
        $scope.datos.mulact_principal = '';
        $scope.datos.mulact_principal = '';
        $scope.publicid='';
        $scope.datos.f01_actividad_principal_array =[];
        $scope.datos.fileArchivosAd = '';
        $scope.datos.FILE_CI = '';
        $scope.datos.FILE_MAPA='';
        $scope.datos.f01_nro_actividad ='';
        $scope.datos.f01_num_pmc ='';
        $scope.datos.FILE_VEHICULO_FOTO = "";
        $scope.datos.FILE_RUAT_VEHICULO = "";
        $scope.datos.FILE_FORMVH_EXCEL = "";
        $scope.datos.FILE_CONTRATO_DELIVERY = "";
        $scope.datos.FILE_FOTO_SOLICITANTE = "";
        $scope.datos.FILE_FOTO_LICENCIA_CI = "";
        $scope.div_archivoexcelformulario = false;
        //$scope.div_aeserviciosdelivery = false;
        $scope.div_fotografiafrentenitidasolicitante = false;
        //$scope.div_fotografiaslicenciaconducir = false;
        $scope.div_actividad_economica = false;
        $scope.div_descripcion_prestado = false;
        $scope.div_solicitante = false;
        $scope.div_dias_div = false;
        $scope.desabilitado = false;
        //$scope.botones = "mostrar";
      //  $scope.div_fotosvehiculolateralfrontal = false;
        $scope.div_permisocirculacionvehicular = false;
       // $scope.div_documentosruatvehiculo = false;
        //$scope.divreferencia = false;
        $scope.div_correelec = false;
        $scope.divalimentos = false;
    }


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

  /*  var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        $scope.docdinamicos(data.f01_validador_servicio);
        $scope.macrodistritos();
        $scope.distritoZonas(data.f01_macro_act_descrip);
        $scope.actulizarIdDistrito(data.f01_zona_act_descrip);
        $scope.cargarNombVia(data.f01_tip_via_act,data.f01_zona_act);
         
       
    });*/

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
        /*DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("ERROR");
        });*/
    };

    var aDocAdjuntosmapa = new Object();
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

    $scope.ultimoArrayAdjunto = function(data){

        $scope.ArrayAdjuntoFor4();



       /* if(data == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS' || data == 'TRANSPORTE_PERSONAL' || data == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
             $scope.ArrayAdjuntoFor3();
        }else{
            $scope.ArrayAdjuntoFor4();
        }*/
    }

    $scope.ArrayAdjuntoFor3 = function(){
        console.log("ingresa aqui arma");
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile2 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();


        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile1.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S) (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
        datoObjectFile2.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile3.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS (En un solo documento en formato PDF)';

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_VEHICULO_FOTO;
        datoObjectFile4.nombre = 'CARGAR FOTOGRAFÍA(S) FRONTAL Y LATERAL DE LOS VEHÍCULO(S) (Fotografías con buena resolución en un solo archivo formato PDF o DOC)';

        datoObjectFile5.url = $rootScope.decJuradaNaturalPermiso;
        datoObjectFile5.campo = "DECLARACION JURADADA";
        datoObjectFile5.nombre = 'DECLARACION JURADA';

        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile2;
        datoObjectFiles[2] = datoObjectFile3;
        datoObjectFiles[3] = datoObjectFile4;
        datoObjectFiles[4] = datoObjectFile5;

        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles; 
        $scope.datos.File_Adjunto = datoObjectFiles; 

        console.log("$rootScope.decJuradaNaturalPermiso:: ", $rootScope.decJuradaNaturalPermiso);
    } 


    $scope.ArrayAdjuntoFor4 = function(){
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile2 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        var datoObjectFile6 = new Object();


        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile1.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S) (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
        datoObjectFile2.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile3.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS (En un solo documento en formato PDF)';

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_FORMVH_EXCEL;
        datoObjectFile4.nombre = 'ADJUNTE EL RESPALDO DE LA SOLICITUD: LICENCIA DE FUNCIONAMIENTO, RESOLUCION ADMINISTRATIVA DEL OPERADOR, CONTRATO DE PRESTACIÓN DE SERVICIOS, AUTORIZACIÓN DE LA DIRECCIÓN DE MERCADOS, PARA CONSTRUCCIONES LA AUTORIZACIÓN DEL GAMLP PARA EJECUCIÓN DE OBRAS.';

        datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
        datoObjectFile5.campo = $scope.datos.FILE_VEHICULO_FOTO;
        datoObjectFile5.nombre = $scope.nombreRespaldos;

        datoObjectFile6.url = $rootScope.decJuradaNaturalPermiso;
        datoObjectFile6.campo = "DECLARACION JURADADA";
        datoObjectFile6.nombre = 'DECLARACION JURADA';

        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile2;
        datoObjectFiles[2] = datoObjectFile3;
        datoObjectFiles[3] = datoObjectFile4;
        datoObjectFiles[4] = datoObjectFile5;
        datoObjectFiles[5] = datoObjectFile6;

        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles; 
        $scope.datos.File_Adjunto = datoObjectFiles; 
    } 

    //************************** */

    /*
    $scope.enviarTramiteCeroPapel = function(paramForm){
        $scope.ultimoArrayAdjunto(paramForm.f01_validador_servicio);
        console.log(paramForm);
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'PER_TRA';
        var datosNeXO = {};
        console.log("IDTRAMITE:: ", sessionService.get('IDTRAMITE'));
        if ($scope.tipoPersona == 'NATURAL'){
            datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
            datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias;
            datosNeXO['f01_id_actividad_economica']   =   paramForm.f01_id_actividad_economica;
            datosNeXO['f01_nro_orden']   =   paramForm.f01_nro_orden;
            datosNeXO['f01_id_contribuyente']   =   paramForm.f01_id_contribuyente;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_tipo_per']        =   'N';
            datosNeXO['f01_tipo_per_desc']  = 'NATURAL';
            datosNeXO['f01_expedido_prop']  = paramForm.f01_expedido_prop;
            datosNeXO['f01_email_prop']     = paramForm.f01_email_prop;
            datosNeXO['f01_cel_prop']       = paramForm.f01_cel_prop;
            datosNeXO['f01_telef_prop']     = paramForm.f01_telef_prop;
            datosNeXO['INT_FEC_SOLICITUD']  = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA']         = paramForm.CI_BIGDATA;
            datosNeXO['f01_pri_nom_prop']   = paramForm.f01_pri_nom_prop;
            datosNeXO['f01_ape_pat_prop']   = paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop']   = paramForm.f01_ape_mat_prop;
            datosNeXO['f01_tip_doc_prop']   = paramForm.f01_tip_doc_prop;
            datosNeXO['f01_num_doc_prop']   = paramForm.f01_num_dos_prop;
            datosNeXO['f01_num_dos_prop']   = paramForm.f01_num_dos_prop;
            datosNeXO['f01_fecha_nac']      = paramForm.f01_fecha_nac;
            datosNeXO['f01_macro']          =   paramForm.f01_macro;
            datosNeXO['f01_macro_des']      =   paramForm.f01_macro_des;
            datosNeXO['INT_ZONA']           =   paramForm.INT_ZONA;
            datosNeXO['INT_DISTRITO']       =   paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito']       =   paramForm.f01_distrito;
            datosNeXO['f01_distrito_desc']  =   paramForm.f01_distrito_desc;
            datosNeXO['f01_zona']               =   paramForm.f01_zona;
            datosNeXO['f01_zon_prop']           =   paramForm.f01_zon_prop;
            datosNeXO['f01_zon_prop_desc']      =   paramForm.f01_zon_prop_desc;
            datosNeXO['f01_zon_prop_valor']     =   paramForm.f01_zon_prop_valor;
            datosNeXO['f01_tip_via_prop']       =   paramForm.f01_tip_via_prop;
            datosNeXO['f01_tip_via_prop_desc']  =   paramForm.f01_tip_via_prop;
            datosNeXO['f01_nom_via_prop']       =   paramForm.f01_nom_via_prop;
            datosNeXO['f01_num_prop']           =   paramForm.f01_num_prop;
            datosNeXO['f01_nom_edi_prop']       =   paramForm.f01_nom_edi_prop;
            datosNeXO['f01_bloq_prop']          =   paramForm.f01_bloq_prop;
            datosNeXO['f01_piso_prop']          =   paramForm.INT_PISO;
            datosNeXO['f01_depa_prop']          =   paramForm.INT_NUM_DEP;
            datosNeXO['f01_dir_det_prop']       =   paramForm.f01_dir_det_prop;
            datosNeXO['OTRO_VIA']           = paramForm.OTRO_VIA;
            datosNeXO['INT_AC_EDIFICIO']    = paramForm.INT_AC_EDIFICIO;
            datosNeXO['INT_AC_BLOQUE']      = paramForm.INT_AC_BLOQUE;
            datosNeXO['INT_AC_PISO']        = paramForm.INT_AC_PISO;
            datosNeXO['INT_AC_NUME']        = paramForm.INT_AC_NUME;
            datosNeXO['INT_AC_CEL']         = paramForm.INT_AC_CEL;
            datosNeXO['INT_AC_TEL']         = paramForm.INT_AC_TEL;
            datosNeXO['INT_AC_COR']         = paramForm.INT_AC_COR;
            datosNeXO['INT_DIR_DET']        = paramForm.INT_DIR_DET;
            datosNeXO['INT_VIA']            =   paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA']     =   paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_EDIF']           =   paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE']         =   paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO']           =   paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP']        =   paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET']        =   paramForm.INT_DIR_DET;
            datosNeXO['f01_denominacion']   = paramForm.f01_denominacion;
            datosNeXO['f01_sup']            = paramForm.f01_sup;
            datosNeXO['f01_de_hor']         = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor']          = paramForm.f01_a_hor;
            datosNeXO['f01_estab_es']       = paramForm.f01_estab_es;
            datosNeXO['INT_AC_ESTADO']      = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO']       = paramForm.INT_AC_MACRO;
            datosNeXO['INT_AC_MACRO_ID']            =   parseInt(paramForm.INT_AC_MACRO_ID);
            datosNeXO['f01_tipo_lic_descrip']       =   paramForm.f01_tipo_lic_descrip;
            datosNeXO['f01_requisitos_tecnicos']    =   $scope.datos.f01_requisitos_tecnicos;            
            datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;           
            datosNeXO['f01_macro_act_descrip']      =   paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act_descrip']       =   paramForm.f01_zona_act_descrip;
            datosNeXO['f01_de_hor']                 =   paramForm.f01_de_hor;
            datosNeXO['f01_a_hor']                  =   paramForm.f01_a_hor;
            datosNeXO['f01_tip_via_act']            =   paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act']                =   paramForm.f01_num_act;
            datosNeXO['f01_factor']                 =   paramForm.f01_factor;
            datosNeXO['f01_num_act1']               =   paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act']           =   paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act']             =   paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act']               =   paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc']            =   paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1']               =   paramForm.f01_tel_act1;
            datosNeXO['f01_casilla']                =   paramForm.f01_casilla;
            datosNeXO['f01_cod_luz']                =   '0';
            datosNeXO['f01_bloque_act']             =   paramForm.f01_bloque_act;
            datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
            datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
            datosNeXO['FILE_FOTOCOPIA_CI']                  = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R']                = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['INT_ID_CAT_AGRUPADA']                =  parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_nit'] = paramForm.f01_nit;
            datosNeXO['f01_nit_prop'] = paramForm.f01_nit;
            datosNeXO['f01_tip_doc_prop']           =paramForm.f01_tip_doc_prop;
            datosNeXO['f01_expedido_prop']          =paramForm.f01_expedido_prop;
            datosNeXO['f01_pri_nom_prop']           =paramForm.f01_pri_nom_prop;
            datosNeXO['f01_seg_nom_prop']           ="";
            datosNeXO['f01_ter_nom_prop']           ="";
            datosNeXO['f01_ape_pat_prop']           =paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop']           =paramForm.f01_ape_mat_prop;
            datosNeXO['f01_ape_cas_prop']           ="";
            datosNeXO['f01_nac_prop']               =paramForm.f01_nac_prop;
            datosNeXO['f01_fecha_nac']              =paramForm.f01_fecha_nac;
            datosNeXO['f01_telef_prop']             =paramForm.f01_tel_ciudadano;
            datosNeXO['f01_cel_prop']               =paramForm.f01_cel_prop;
            datosNeXO['f01_email_prop']             =paramForm.f01_email_prop;
            datosNeXO['f01_raz_soc']=paramForm.f01_raz_soc;
            datosNeXO['f01_sup']=paramForm.f01_sup;
            datosNeXO['f01_cap_aprox']=paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor']=paramForm.f01_de_hor;
            datosNeXO['f01_a_hor']=paramForm.f01_a_hor;
            datosNeXO['f01_estab_es']=paramForm.f01_estab_es;
            datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
            datosNeXO['f01_fecha_ini_act']="";
            datosNeXO['f01_fecha_imp']="";
            datosNeXO['f01_fecha_fin_act']="";
            //UBICACION DE LA ACTIVIDAD ECONOMICA
            datosNeXO['f01_macro_act_descrip']=paramForm.f01_macro_act_descrip;
            datosNeXO['f01_macro_act'] = parseInt(paramForm.f01_macro_act);
            datosNeXO['f01_dist_act']=paramForm.f01_dist_act;//"";
            datosNeXO['f01_dist_act_descrip'] = paramForm.f01_dist_act_descrip;
            datosNeXO['f01_zona_act']=paramForm.f01_zona_act;//paramForm.f01_zona_act_descrip;
            datosNeXO['f01_tip_via_act']=paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act']=paramForm.f01_num_act;//paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act_n']=paramForm.f01_num_act_n;//paramForm.f01_num_act;
            datosNeXO['f01_factor']="";
            datosNeXO['f01_num_act1']=paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act']=paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act']=paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act']=paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc']=paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1']=paramForm.f01_tel_act1;
            datosNeXO['f01_casilla']=paramForm.f01_casilla;
            datosNeXO['f01_idCodigoZona']="";
            datosNeXO['f04_res_solicitud_upaee']="";
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['f01_nro_actividad']  =   paramForm.f01_nro_actividad;


            /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
           /* datosNeXO['f01_tip_act']=paramForm.f01_tip_act;
            datosNeXO['f01_tipo_lic']=paramForm.f01_tipo_lic;
            datosNeXO['f01_categoria_agrupada']= parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada_descripcion']=paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_actividad_desarrollada']= paramForm.f01_categoria_descrip2;
            datosNeXO['declaracion_jurada']               =   $rootScope.decJuradaNatural;
            datosNeXO['g_origen_p']='0';
            datosNeXO['File_Adjunto'] =  $scope.datos.File_Adjunto;
            datosNeXO['f01_tip_act']                    =   paramForm.f01_tip_act; 
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;           
            
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_croquis_ae'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
            
        }  
   
        datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria_descrip2']      =  paramForm.f01_categoria_descripcion.toUpperCase();
        datosNeXO['f01_categoria']      =  parseInt(paramForm.f01_categoria_descrip);
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2.toUpperCase();
        datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
        datosNeXO['f01_correo_electronico_ae'] = paramForm.f01_correo_electronico_ae;
        datosNeXO['f01_tipo_act_ae'] = paramForm.f01_tipo_act_ae;
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_cantidad_personal'] = paramForm.f01_cantidad_personal;
        datosNeXO['f01_modalidad_pago'] = paramForm.f01_modalidad_pago;
        datosNeXO['f01_tipo_act_ae_descrip'] = paramForm.f01_tipo_act_ae_descrip;
        datosNeXO['f01_modalidad_pago_descrip'] = paramForm.f01_modalidad_pago_descrip;
        datosNeXO['f01_venta_productos'] = paramForm.f01_venta_productos;
        datosNeXO['f01_venta_recojo'] = paramForm.f01_venta_recojo;
        datosNeXO['f01_distribucion_propia'] = paramForm.f01_distribucion_propia;
        datosNeXO['f01_venta_productos_domicilio'] = paramForm.f01_venta_productos_domicilio;
        datosNeXO['f01_venta_para_recojo'] = paramForm.f01_venta_para_recojo;
        datosNeXO['f01_distribucion_movilidad_propia'] = paramForm.f01_distribucion_movilidad_propia;
        datosNeXO['f01_validador_servicio'] = paramForm.f01_validador_servicio;
        datosNeXO['f01_detalle_otro_pago'] = paramForm.f01_detalle_otro_pago;

        datosNeXO['f01_venta_productos_domicilio_descrip'] = paramForm.f01_venta_productos_domicilio_descrip;
        datosNeXO['f01_distribucion_movilidad_propia_descrip'] = paramForm.f01_distribucion_movilidad_propia_descrip;
        datosNeXO['f01_venta_para_recojo_descrip'] = paramForm.f01_venta_para_recojo_descrip;
        datosNeXO['g_tipo'] = "AE-TIENDA EN LINEA";
        datosNeXO['FILE_VEHICULO_FOTO'] = paramForm.FILE_VEHICULO_FOTO;
        datosNeXO['FILE_RUAT_VEHICULO'] = paramForm.FILE_RUAT_VEHICULO;
        datosNeXO['FILE_FORMVH_EXCEL'] = paramForm.FILE_FORMVH_EXCEL;
        datosNeXO['FILE_CONTRATO_DELIVERY'] = paramForm.FILE_CONTRATO_DELIVERY;
        datosNeXO['FILE_FOTO_SOLICITANTE'] = paramForm.FILE_FOTO_SOLICITANTE;
        datosNeXO['FILE_FOTO_LICENCIA_CI'] = paramForm.FILE_FOTO_LICENCIA_CI;

        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }
        
        var sMacroR         =   datosNeXO['f01_macro_des'];
        var sZonaR          =   datosNeXO['INT_AC_ID_ZONA'];
        var sMacroRDesc     =   datosNeXO['f01_macro_des'];
        var sZonaRDesc      =   datosNeXO['INT_AC_ID_ZONA'];
        var iCategoriaAgrupada      =   datosNeXO['INT_ID_CAT_AGRUPADA'];
        var iMacrodistrito          =   datosNeXO['INT_AC_MACRO_ID'];
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(datosNeXO);
        //var crearCaso   =   new gCrearTramiteLinea();
        var crearCaso = new crearTramiteMovilidad();
        crearCaso.usr_id    = 1;
        crearCaso.datos     = datosSerializados;
        crearCaso.procodigo = idProcodigo;
        crearCaso.tramite_linea(function(response){
            try{
                $scope.botones = null;
                $scope.desabilitado = true;
                response    =   JSON.parse(response);
                var results = response.success.data;
                indice = 0;
                datosIF = results[0].crear_tramite_ge.split(",");
                datosIF2 = datosIF[1];
                datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                console.log(datosIF[0]);
                $scope.nrotramitec = datosIF[0];
                sessionService.set('NROTRAMITE', datosIF[0]);
                sessionService.set('NROTRAMITEID', datosIF[1]);
                sessionService.set('IDPROCESO', datosIF[6]);
                var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                try{
                    $scope.validarFormProcesos(paramForm);
                    $scope.guardarAdjuntosMultiplesMapa(results);
                }catch(e){}

                $.unblockUI();
            }catch(e){
                console.log("falla: ", e);
                alert("conexion fallida ");
            }
        });         
        
    };*/
//************* */
        /*enviarFormProcesos*/
        $scope.validarFormProcesos = function(nroTramite){
            idUsuario = sessionService.get('IDUSUARIO');
            try {
              idUsuario = 4; 
              var tramiteIgob = new datosFormularios();
              tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
              tramiteIgob.frm_tra_enviado = 'SI';
              tramiteIgob.frm_tra_if_codigo = nroTramite;
              tramiteIgob.frm_tra_id_usuario = idUsuario;
              tramiteIgob.validarFormProcesos(function(resultado){
                swal({
                  title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                  text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2>\n'+'“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 48 HORAS”\n',
                  html: true,
                  type: 'success',
                  //timer: 5000,
                });
               // $scope.tramitesCiudadano();


                $scope.ListadoTramitesCiudadano();
                $scope.desabilitado = true;
                $scope.botones =   null;
              });
            } catch (error){
              alertify.success('Registro no modificado');
              $.unblockUI(); 
            }
          };
    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
            $scope.only                     =   true;
        } else {
            $scope.btnGuardarForm   =   false;
            $scope.only             =   false;

        }
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        $.unblockUI();
        
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        if(data.length > 0){
            if(data[0].venviado == 'SI'){                
                if(data[0].datos.INT_FORM_ALMACENADO == 'G'){
                    $scope.desabilitado = true;
                    $scope.botones = null;
                   
                }else{
                    $scope.desabilitado = false;
                    $scope.botones = "mostrar";
                    

                }
            }else{
               
            }
        }
    });
    $scope.btover1 = null;
    $scope.btover2 = null;
    $scope.btover3 = null;
    $scope.btover4 = null;
    $scope.btover5 = null;
    $scope.btover6 = null;
    $scope.btover7 = null;

    
    $scope.cambiarFile = function(obj, valor){
        var arraydoc = ["pdf", "doc", "docx", ".docx",".docxlm"];
        $scope.registroAdj  = [];
        var fechaNueva      = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha      = JSON.parse(resp);
            var fechaServ   = (sfecha.success.fecha).split(' ');
            var fecha_      = fechaServ[0].split('-');
            var hora_       = fechaServ[1].split(':');
            fechaNueva      = fecha_[0] + fecha_[1] +   fecha_[2]   +   '_' +   hora_[0]    +   hora_[1];
        }); 
        $.blockUI();
        setTimeout(function(){         
            var nombre = obj.getAttribute("name");
            var objarchivo = obj.files[0];
            $scope.FILE_VEHICULO_FOTO = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var sDirTramite = sessionService.get('IDTRAMITE');
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
            // FILE_VEHICULO_FOTO
            if (nombre == 'FILE_VEHICULO_FOTO' && (typeof(obj.files[0]) != 'undefined')) 
            {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (  arraydoc.indexOf(ext_doc) >= 0 ) {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                            $scope.FILE_VEHICULO_FOTO = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover1 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                                $scope.FILE_VEHICULO_FOTO = blobcir;
                                $scope.btover1 = "mostrar";
                            });
                            $.unblockUI();
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_VEHICULO_FOTO = "";
                            $scope.FILE_VEHICULO_FOTO = "";
                            $.unblockUI();
                        }
                            
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }

            //FILE_RUAT_VEHICULO
            if (nombre == 'FILE_RUAT_VEHICULO' && (typeof(obj.files[0]) != 'undefined')) 
            {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (  arraydoc.indexOf(ext_doc) >= 0 ) {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                            $scope.FILE_RUAT_VEHICULO = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover3 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                                $scope.FILE_RUAT_VEHICULO = blobcir;
                                $scope.btover3 = "mostrar";
                            });
                            $.unblockUI();
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_RUAT_VEHICULO = "";
                            $scope.FILE_RUAT_VEHICULO = "";
                            $.unblockUI();
                        }
                            
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_FORMVH_EXCEL
            if (nombre == 'FILE_FORMVH_EXCEL' && (typeof(obj.files[0]) != 'undefined')) 
            {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (  arraydoc.indexOf(ext_doc) >= 0 ) {
               // if ( ext_doc == 'xls' || ext_doc == 'xlsx' ) {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                            $scope.FILE_FORMVH_EXCEL = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover4 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                                $scope.FILE_FORMVH_EXCEL = blobcir;
                                $scope.btover4 = "mostrar";
                            });
                            $.unblockUI();
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_FORMVH_EXCEL = "";
                            $scope.FILE_FORMVH_EXCEL = "";
                            $.unblockUI();
                        }
                            
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo Excel', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_CONTRATO_DELIVERY
            if (nombre == 'FILE_CONTRATO_DELIVERY' && (typeof(obj.files[0]) != 'undefined')) 
            {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if ( ext_doc == "pdf" ) {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                            $scope.FILE_CONTRATO_DELIVERY = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover5 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                                $scope.FILE_CONTRATO_DELIVERY = blobcir;
                                $scope.btover5 = "mostrar";
                            });
                            $.unblockUI();
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_CONTRATO_DELIVERY = "";
                            $scope.FILE_CONTRATO_DELIVERY = "";
                            $.unblockUI();
                        }
                            
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_FOTO_SOLICITANTE
            if (nombre == 'FILE_FOTO_SOLICITANTE' && (typeof(obj.files[0]) != 'undefined')) 
            {   
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (  arraydoc.indexOf(ext_doc) >= 0 ) {
               // if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                            $scope.FILE_FOTO_SOLICITANTE = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover6 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                                var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                    var imagenCir = respuesta_compres.name.split('.');
                                    var tipoCir   = imagenCir[1];
                                    var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                    fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                    $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                    $scope.FILE_FOTO_SOLICITANTE = respuesta_compres;
                                    document.getElementById("txt_" + nombre).value  = nombreNuevo;
                                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                    $scope.btover6 = "mostrar";
                                });
                            }else{
                                var zipcir = new JSZip();
                                zipcir.file(nomdocumento, objarchivo);
                                zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                    var nombreNuevo = nombre + fechaNueva + '.zip';
                                    fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                    $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                    $scope.FILE_FOTO_SOLICITANTE = blobcir;
                                    $scope.btover6 = "mostrar";
                                });
                                $.unblockUI();
                            }
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_FOTO_SOLICITANTE = "";
                            $scope.FILE_FOTO_SOLICITANTE = "";
                            $.unblockUI();
                        }
                            
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo png, jpg o jpeg', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_FOTO_LICENCIA_CI
            if (nombre == 'FILE_FOTO_LICENCIA_CI' && (typeof(obj.files[0]) != 'undefined')) 
            {   
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if ( ext_doc == "pdf") {
                        if (objarchivo.size <= 500000) {
                            var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                            $scope.FILE_FOTO_LICENCIA_CI = objarchivo;
                            document.getElementById("txt_" + nombre).value  = nombreNuevo;
                            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                            $scope.btover7 = "mostrar";
                        } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                            if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                                var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                    var imagenCir = respuesta_compres.name.split('.');
                                    var tipoCir   = imagenCir[1];
                                    var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                    fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                    $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                    $scope.FILE_FOTO_LICENCIA_CI = respuesta_compres;
                                    document.getElementById("txt_" + nombre).value  = nombreNuevo;
                                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                    $scope.btover7 = "mostrar";
                                });
                            }else{
                                var zipcir = new JSZip();
                                zipcir.file(nomdocumento, objarchivo);
                                zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                    var nombreNuevo = nombre + fechaNueva + '.zip';
                                    fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                    $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                    $scope.FILE_FOTO_LICENCIA_CI = blobcir;
                                    $scope.btover7 = "mostrar";
                                });
                                $.unblockUI();
                            }
                        }else{
                            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                            document.getElementById("txt_" + nombre).value  = "";
                            document.getElementById("href_" + nombre).href = "";
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $scope.datos.FILE_FOTO_LICENCIA_CI = "";
                            $scope.FILE_FOTO_LICENCIA_CI = "";
                            $.unblockUI();
                        }
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value  = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
        },1000);
        $.unblockUI();
    }

    $scope.cargarDatosPermiso=function(){
        $scope.listadoActividadesEconomicas();
        $scope.macrodistritos();

        $.unblockUI();
        document.signupForm.btnFormLicencia.disabled=true;
    };

    $scope.$on('$destroy', function() {
        setTimeout(function(){
            //clsValidarBtnEnviar();
            //clsIniciarCamposInternet();
            clsIniciarGrillaAE();
           // clsIniciaBtnHabilitar();
            clsIniciarHtmlForm();
        },2000);
    });

        //////////////////////////////nuevo /////////////////////////////

        $scope.declaracionJurada = function(datos){
            $rootScope.datosEnv = "";
            $rootScope.datosEnv = "";
            var fecha= new Date();
            var fechaActualS = "";
            fechaActualS= fecha.getDate() +" - "+ (fecha.getMonth() + 1) +" - "+ fecha.getFullYear();
            var sHora = "";
            sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
            var stringFormulario40  =   "";
            var urlFormularioN  =   "";
            var urlFormularioJ  =   "";
            var snombre =   "";
            var scedulaid   =   "";
            var sexpedido   =   "";
            var snombreREP = "";
            var scirep = "";
            var sempresa = "";
            var snit = ""; 
            $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
            $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
            if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
                $scope.domicilio_xxx= datos.f01_zon_prop_valor+" "+datos.f01_nom_via_prop+" Nº "+datos.f01_num_prop;
            }else{
                $scope.domicilio_xxx= datos.f01_zona_desc+" "+datos.f01_nom_via_rep+" Nº "+datos.f01_num_rep;
                datos.f01_nom_completo = datos.f01_pri_nom_rep+" "+datos.f01_ape_pat_rep+" "+datos.f01_ape_mat_rep;
                datos.f01_num_dos_prop = datos.f01_num_doc_rep;
            }
            if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
                datos.f01_tipo_per_desc = 'NATURAL';
                urlFormularioN  =   "../../docs/Movilidad_PER_TRA.html";
                $( "#msgformularioN" ).load(urlFormularioN, function(data) {
                    stringFormulario40  =   data;
                    datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                    datos.f01_nom_completo = ((typeof(datos.f01_nom_completo) == 'undefined' || datos.f01_nom_completo == null) ? "" : datos.f01_nom_completo);
                    datos.f01_num_dos_prop = ((typeof(datos.f01_num_dos_prop) == 'undefined' || datos.f01_num_dos_prop == null) ? "" : datos.f01_num_dos_prop);
                    datos.f01_expedido_prop = ((typeof(datos.f01_expedido_prop) == 'undefined' || datos.f01_expedido_prop == null) ? "" : datos.f01_expedido_prop);
                    datos.f01_raz_soc = ((typeof(datos.f01_raz_soc) == 'undefined' || datos.f01_raz_soc == null) ? "" : datos.f01_raz_soc);
                    datos.f01_num_pmc = ((typeof(datos.f01_num_pmc) == 'undefined' || datos.f01_num_pmc == null) ? "" : datos.f01_num_pmc);
                    datos.f01_domiciliado = datos.f01_zon_prop_valor+" "+datos.f01_nom_via_prop+" Nº "+datos.f01_num_prop;
                    stringFormulario40  =   stringFormulario40.replace("#f01_nom_completo#", datos.f01_nom_completo);
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                    stringFormulario40  =   stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                    stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc);
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                    stringFormulario40  =   stringFormulario40.replace("#f01_domiciliado#", datos.f01_zon_prop_valor+" "+datos.f01_nom_via_prop+" Nº "+datos.f01_num_prop);
                    stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                    stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                    stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                    $scope.msgformularioN = stringFormulario40;
                    $scope.notifcondicionesuso = stringFormulario40;
                    setTimeout(function(){
                        $scope.fmostrarFormulario();
                    },500);
                })
                $scope.armarDatosForm(datos,fechaActualS, sHora);
            }
            if($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J'){
                datos.f01_tipo_per_desc = 'JURIDICO';
                urlFormularioJ  =   "../../docs/Movilidad_PER_TRA.html";
                $( "#msgformularioN" ).load(urlFormularioJ, function(data) {
                    stringFormulario40  =   data;
                    datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                    datos.f01_nom_completo = datos.f01_pri_nom_rep+" "+datos.f01_ape_pat_rep+" "+datos.f01_ape_mat_rep;
                    datos.f01_num_dos_prop = datos.f01_num_doc_rep;
                    datos.f01_expedido_prop = ((typeof(datos.f01_expedido_rep) == 'undefined' || datos.f01_expedido_rep == null) ? "" : datos.f01_expedido_rep);
                    datos.f01_raz_soc = ((typeof(datos.f01_raz_soc_per_jur) == 'undefined' || datos.f01_raz_soc_per_jur == null) ? "" : datos.f01_raz_soc_per_jur);
                    datos.f01_num_pmc = ((typeof(datos.f01_num_pmc) == 'undefined' || datos.f01_num_pmc == null) ? "" : datos.f01_num_pmc);
                    datos.f01_domiciliado = datos.f01_zona_desc+" "+datos.f01_nom_via_rep+" Nº "+datos.f01_num_rep;
                    stringFormulario40  =   stringFormulario40.replace("#f01_nom_completo#", datos.f01_nom_completo);
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                    stringFormulario40  =   stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                    stringFormulario40  =   stringFormulario40.replace("#f01_domiciliado#", datos.f01_zona_desc+" "+datos.f01_nom_via_rep+" Nº "+datos.f01_num_rep);
                    stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc);
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                    stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                    stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                    stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                    $scope.msgformularioN = stringFormulario40;
                    $scope.notifcondicionesuso = stringFormulario40;
                    setTimeout(function(){
                        $scope.fmostrarFormulario();
                    },500);
                })
                $scope.armarDatosForm(datos,fechaActualS, sHora);
            }
            
        }


        $scope.armarDatosForm = function(data,sfecha,sHora){
            console.log("dataaaaaaa",data),
            $rootScope.datosForm401 = "";
            var dataForm = {};
            //CABECERA
          /*  $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
            if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){*/
                dataForm['f01_nom_completo'] = data.f01_nom_completo;
                dataForm['f01_num_dos_prop'] = data.f01_num_dos_prop;
                dataForm['f01_expedido_prop'] = data.f01_expedido_prop;
                dataForm['f01_raz_soc'] = data.f01_raz_soc;
                dataForm['f01_num_pmc'] = data.f01_num_pmc;
                dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
                dataForm['f01_domiciliado'] = $scope.domicilio_xxx;
                dataForm['fecha_sist'] = sfecha;
                dataForm['fecha_sist2'] = sfecha;
                dataForm['usuario'] = sessionService.get('USUARIO');
                dataForm['hora_sist'] = sHora;
                $rootScope.datosForm401 = dataForm;
                $rootScope.datosEnv = data;
            /*} else {
                dataForm['f01_nom_completo'] = data.f01_nom_completo;
                dataForm['f01_num_dos_prop'] = data.f01_num_doc_rep;
                dataForm['f01_expedido_prop'] = data.f01_expedido_rep;
                dataForm['f01_raz_soc'] = data.f01_raz_soc_per_jur;
                dataForm['f01_num_pmc'] = data.f01_num_pmc;
                dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        
                dataForm['fecha_sist'] = sfecha;
                dataForm['fecha_sist2'] = sfecha;
                dataForm['usuario'] = sessionService.get('USUARIO');
                dataForm['hora_sist'] = sHora;
                $rootScope.datosForm401 = dataForm;
                $rootScope.datosEnv = data;
            }*/

        }

    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioN').html($scope.msgformularioN);
    }

   /* $scope.getRequisitoAE = function(dato){
        if(dato == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS'){
            //$scope.GetValueParam();
            $scope.datos.f01_venta_productos_domicilio_descrip = "VENTA DE PRODUCTOS CON ENTREGA A DOMICILIO";
        }else{
            //OPCION 3
             if(dato == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
                //$scope.GetValueParam();
                $scope.datos.f01_distribucion_movilidad_propia_descrip = "VENTA DE PRODUCTOS CON VEHICULO PROPIO";
            }else{
                //OPCION 2
                if(dato == 'TRANSPORTE_PERSONAL'){
                    $scope.datos.f01_venta_para_recojo_descrip = "VENTA DE PRODUCTOS CON VEHICULO PROPIO"; 
                }
            }
        }
    }*/
/*
    $scope.getRequisito1 = function(dato){
        datoObjectFinal = [];
        datoObjectFinal2 = [];
        datoObjectFinal3 = [];

        //"VENTA DE PRODUCTOS A DOMICILIO"
        if(dato == "TRANSPORTE_DE_ENTREGA_ALIMENTOS"){
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor= "true";
            datoObjectFinal[0] = datoObject;
            datoObjectFinal[1] = datoObject1;
            $scope.datos.f01_venta_productos_domicilio=datoObjectFinal;
        }else{
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor="false";
            datoObjectFinal[0] = datoObject;
            datoObjectFinal[1] = datoObject1;
            $scope.datos.f01_venta_productos_domicilio=datoObjectFinal;
        }

        if(dato == "TRANSPORTE_PERSONAL"){
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor= "true";
            datoObjectFinal2[0] = datoObject;
            datoObjectFinal2[1] = datoObject1;
            $scope.datos.f01_venta_para_recojo=datoObjectFinal2;

        }else{
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor="false";
            datoObjectFinal2[0] = datoObject;
            datoObjectFinal2[1] = datoObject1;
            $scope.datos.f01_venta_para_recojo=datoObjectFinal2;

        }

        if(dato == "TRANSPORTE_DE_ENTREGA_PRODUCTOS"){
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor= "true";
            datoObjectFinal3[0] = datoObject;
            datoObjectFinal3[1] = datoObject1;
            $scope.datos.f01_distribucion_movilidad_propia=datoObjectFinal3;

        }else{
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor="false";
            datoObjectFinal3[0] = datoObject;
            datoObjectFinal3[1] = datoObject1;
            $scope.datos.f01_distribucion_movilidad_propia=datoObjectFinal3;
        }

    }

*/
    $scope.GetValueParam = function(){
      /*  var f = document.getElementById("f01_modalidad_pago");
        $scope.datos.f01_modalidad_pago_descrip = f.options[f.selectedIndex].text;*/
    }

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function (data) {

        if(data.DIAS_VALIDADOR== 'TODOS LOS DIAS'){
            $scope.verificarCamposInternetSegundo(data);
        }else{
            if(data.DIAS_LUNES == undefined &&
            data.DIAS_MARTES == undefined && 
            data.DIAS_MIERCOLES == undefined &&
            data.DIAS_JUEVES == undefined && 
            data.DIAS_VIERNES == undefined && 
            data.DIAS_SABADO == undefined && 
            data.DIAS_DOMINGO == undefined 
            ){
                swal('', "Datos obligatorios, seleccione al menos un día", 'warning');
            
            }else{
                $scope.verificarCamposInternetSegundo(data);
            }
        }
       
    }
    $scope.verificarCamposInternetSegundo = function (data) {
        var valjn = data.tipoPersona;
       /* if(data.tipoPersona == 'NATURAL' || data.tipoPersona == 'N'){
            valjn = data.f01_nit;
        }else{

            valjn = data.f01_num_doc_per_jur;
        }*/
        if(data.f01_validador_servicio == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS' || data.f01_validador_servicio == 'TRANSPORTE_PERSONAL' || data.f01_validador_servicio == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
            if(data.f01_casilla != "" && data.f01_casilla != null &&
            data.PER_TRA_HORA_INICIO != "" && data.PER_TRA_HORA_INICIO != null &&
            data.PER_TRA_HORA_FIN != "" && data.PER_TRA_HORA_FIN != null &&
            data.PER_TRA_NUM_CONTACTO != "" && data.PER_TRA_NUM_CONTACTO != null &&
            data.DIAS_VALIDADOR != "" && data.DIAS_VALIDADOR != null &&
            data.FILE_RUAT_VEHICULO != "" && data.FILE_RUAT_VEHICULO != null &&
            data.FILE_FOTO_SOLICITANTE != "" && data.FILE_FOTO_SOLICITANTE != null &&
            data.FILE_FOTO_LICENCIA_CI != "" && data.FILE_FOTO_LICENCIA_CI != null &&
            data.FILE_FORMVH_EXCEL != "" && data.FILE_FORMVH_EXCEL != null &&
            data.FILE_VEHICULO_FOTO != "" && data.FILE_VEHICULO_FOTO != null
              ){
                $scope.guardarDatos(data);
                $scope.declaracionJurada(data);
                $("#declaracionN").modal("show");
            }else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }else if(data.f01_validador_servicio == 'TRANSPORTE_MATERIA_PRIMA'){
            if(data.f01_productosElaborados != "" && data.f01_productosElaborados != null &&
              data.f01_casilla != "" && data.f01_casilla != null &&
              data.PER_TRA_HORA_INICIO != "" && data.PER_TRA_HORA_INICIO != null &&
              data.PER_TRA_HORA_FIN != "" && data.PER_TRA_HORA_FIN != null &&
              data.PER_TRA_NUM_CONTACTO != "" && data.PER_TRA_NUM_CONTACTO != null &&
              data.DIAS_VALIDADOR != "" && data.DIAS_VALIDADOR != null &&
              data.FILE_RUAT_VEHICULO != "" && data.FILE_RUAT_VEHICULO != null &&
              data.FILE_FOTO_SOLICITANTE != "" && data.FILE_FOTO_SOLICITANTE != null &&
              data.FILE_FOTO_LICENCIA_CI != "" && data.FILE_FOTO_LICENCIA_CI != null &&
              data.FILE_FORMVH_EXCEL != "" && data.FILE_FORMVH_EXCEL != null &&
              data.FILE_VEHICULO_FOTO != "" && data.FILE_VEHICULO_FOTO != null
              ){
                $scope.guardarDatos(data);
                $scope.declaracionJurada(data);
                $("#declaracionN").modal("show");
            }else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }

    }
    $scope.verificasLuis = function (data) {
        console.log("TIPO_PERSONA",sessionService.get('TIPO_PERSONA'));
        if(data.DIAS_VALIDADOR == "TODOS LOS DIAS"){
            $scope.datos.PER_TRA_DIAS="TODOS LOS DIAS";
        }else if(data.DIAS_VALIDADOR == "SELECCIONAR DIAS"){
            var lunes="",martes="",miercoles="",jueves="",viernes="",sabado="",domingo="";
            if(data.DIAS_LUNES != undefined){
                martes = data.DIAS_LUNES;
            }
            if(data.DIAS_MARTES != undefined){
                martes = data.DIAS_MARTES;
            }
            if(data.DIAS_MIERCOLES != undefined){
                miercoles = data.DIAS_MIERCOLES;
            }
            if(data.DIAS_JUEVES != undefined){
                jueves = data.DIAS_JUEVES;
            }
            if(data.DIAS_VIERNES != undefined){
                viernes = data.DIAS_VIERNES;
            }
            if(data.DIAS_SABADO != undefined){
                sabado = data.DIAS_SABADO;
            }
            if(data.DIAS_DOMINGO != undefined){
                domingo = data.DIAS_DOMINGO;
            }
            $scope.datos.PER_TRA_DIAS=lunes+" "+martes+" "+miercoles+" "+jueves+" "+viernes+" "+sabado+" "+domingo;
            console.log("$scope.datos.PER_TRA_DIAS ::::::::: ",$scope.datos.PER_TRA_DIAS);
        }
        $scope.datos.Tipo_tramite_creado="WEB";
        $scope.datos.PER_TRA_NRO_TRAMITE = sessionService.get('IDTRAMITE');
        if(sessionService.get('TIPO_PERSONA') == "NATURAL"){

            $scope.datos.PER_TRA_NOMBRE=data.f01_pri_nom_prop;
            $scope.datos.PER_TRA_PATERNO=data.f01_ape_pat_prop;
            $scope.datos.PER_TRA_MATERNO=data.f01_ape_mat_prop;
            $scope.datos.PER_TRA_CASADA="";
            $scope.datos.PER_TRA_CI=data.f01_num_dos_prop;
            $scope.datos.PER_TRA_EXPEDIDO=data.f01_expedido_prop;
            $scope.datos.PER_TRA_CELULAR=data.f01_cel_prop;
            $scope.datos.PER_TRA_CORREO=data.f01_email_prop;
            $scope.datos.PER_TRA_ZONA=data.f01_zon_prop_valor;
            $scope.datos.PER_TRA_VIA=data.f01_tip_via_prop;
            $scope.datos.PER_TRA_NOMBRE_VIA=data.f01_nom_via_prop;
            $scope.datos.PER_TRA_NRO_V=data.f01_num_prop;
            $scope.datos.PER_TRA_AE_PMC=data.f01_num_pmc;
            $scope.datos.PER_TRA_TIPO_PERSONA="NATURAL";
            $scope.datos.PER_TRA_NIT=data.f01_nit;
            $scope.datos.PER_TRA_TIPO_SER_PRES=data.f01_productosElaborados;
            $scope.datos.PER_TRA_DESCRIP_AE=data.f01_productosElaborados;
            $scope.datos.PER_TRA_CANT_VEHI_SOL=data.f01_casilla;
            $scope.datos.PER_TRA_DESCRIP_FOR=data.f01_validador_servicio;
            $scope.datos.PT_DESCRIP_AE=data.f01_raz_soc;
            $scope.datos.PER_TRA_ID_CIUDADANO=sessionService.get('IDSOLICITANTE');
            $scope.verificarCamposInternet(data);

        }else if(sessionService.get('TIPO_PERSONA') == "JURIDICO"){

            $scope.datos.PER_TRA_MATERNO=data.f01_ape_mat_prop;
            $scope.datos.PER_TRA_CASADA="";
            $scope.datos.PER_TRA_EXPEDIDO=data.f01_expedido_rep;
            $scope.datos.PER_TRA_CELULAR=data.f01_num_rep;
            $scope.datos.PER_TRA_CORREO=data.f01_email_rep;
            $scope.datos.PER_TRA_AE_PMC=data.f01_num_pmc;
            $scope.datos.PER_TRA_TIPO_PERSONA="JURIDICO";
            $scope.datos.PER_TRA_NIT=data.f01_num_doc_per_jur;
            $scope.datos.PER_TRA_TIPO_SER_PRES=data.f01_productosElaborados;
            $scope.datos.PER_TRA_DESCRIP_AE=data.f01_productosElaborados;
            $scope.datos.PER_TRA_CANT_VEHI_SOL=data.f01_casilla;
            $scope.datos.PER_TRA_DESCRIP_FOR=data.f01_validador_servicio;
            $scope.datos.PT_DESCRIP_AE=data.f01_raz_soc;
            $scope.datos.PER_TRA_ID_CIUDADANO=sessionService.get('IDSOLICITANTE');
    
            $scope.datos.PER_TRA_RAZON_SCI=data.f01_raz_soc_per_jur;
            $scope.datos.PER_TRA_PODER=data.f01_num_pod_leg+"/"+data.f01_ges_vig_pod;
            $scope.datos.PER_TRA_NRO_NOTARIA=data.f01_num_notaria;
            $scope.datos.PER_TRA_ZONA_J=data.f01_zona_desc;
            $scope.datos.PER_TRA_VIA_J=data.f01_tipo_viarep;
            $scope.datos.PER_TRA_NOMBRE_VIA_J=data.f01_nom_via_rep;
            $scope.datos.PER_TRA_NOMBRE_VIA_J=data.f01_nom_via_rep;
            $scope.datos.PER_TRA_NRO_VV_J=data.f01_num_rep;
            $scope.datos.PER_TRA_NOMBRE_J=data.f01_pri_nom_rep;
            $scope.datos.PER_TRA_PATERNO_J=data.f01_ape_pat_rep;
            $scope.datos.PER_TRA_MATERNO_J=data.f01_ape_mat_rep;
            $scope.datos.PER_TRA_CI_J=data.f01_num_doc_rep;
            $scope.datos.PER_TRA_EXPEDIDO_J=data.f01_expedido_rep;
            $scope.datos.PER_TRA_CELULAR_J=data.f01_cel_prop;
            $scope.verificarCamposInternet(data);
        }
    }


    $scope.div_archivoexcelformulario = false;
   // $scope.div_aeserviciosdelivery = false;
    //$scope.div_fotografiafrentenitidasolicitante = false;
    //$scope.div_fotografiaslicenciaconducir = false;
   // $scope.div_fotosvehiculolateralfrontal = false;
    $scope.div_permisocirculacionvehicular = false;
   // $scope.div_documentosruatvehiculo = false;
   // $scope.divreferencia = false;
    $scope.div_correelec = false;
    $scope.divalimentos = false;

    $scope.docdinamicos = function(data){
        console.log(data);
        $scope.botones = "mostrar";
        //OPCION 1
        if(data == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS' || data == 'TRANSPORTE_PERSONAL'  || data == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
            $scope.limpiarDatos();
            $scope.desabilitado=true;
            $scope.div_archivoexcelformulario = true;
            $scope.div_permisocirculacionvehicular = true;
            $scope.div_correelec = true;
            $scope.divalimentos = true;
            $scope.div_actividad_economica = true;
            $scope.div_solicitante = true;
            $scope.nombreRespaldos ='ADJUNTAR DOCUMENTACION DE RESPALDO, EJEMPLO CONTRATO DE SERVICIOS, PERMISO DE CONSTRUCCION U OTROS (Fotografías con buena resolución en un solo archivo formato PDF)';
            $scope.div_descripcion_prestado = false;
            switch (data) {
                case 'TRANSPORTE_DE_ENTREGA_ALIMENTOS':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación de entrega de alimentos preparados a domicilio:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 7:00 A 22:00 (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
                  case 'TRANSPORTE_PERSONAL':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación servicio de trasporte de personal:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 24 HORAS (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
                  case 'TRANSPORTE_DE_ENTREGA_PRODUCTOS':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación de entrega de productos en general a domicilio:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 24 HORAS (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
              }



            }else if(data == 'TRANSPORTE_MATERIA_PRIMA'){
                $scope.limpiarDatos();
                $scope.desabilitado=false;
                $scope.div_archivoexcelformulario = true;
                $scope.div_permisocirculacionvehicular = true;
                $scope.div_correelec = true;
                $scope.divalimentos = true;
                $scope.div_actividad_economica = false;
                $scope.div_solicitante = true;
                $scope.div_descripcion_prestado = true;
                $scope.nombreRespaldos ='RRESOLUCIÓN ADMINISTRATIVA PARA OPERADORES DE TRANSPORTE DE CARGA, PERMISO DE CONSTRUCCIÓN O AUTORIZACIONES MENORES OTORGADAS POR EL SERVICIO MUNICIPAL DE ADMINISTRACIÓN TERRITORIAL SERMAT, LICENCIA DE FUNCIONAMIENTO, PATENTE ÚNICA MUNICIPAL O CERTIFICADO DE PRODUCTOR AGROPECUARIO, ENTRE OTROS. (Fotografías con buena resolución en un solo archivo formato PDF)';
                switch (data) {
                    case 'TRANSPORTE_MATERIA_PRIMA':
                        swal({
                            title: "Estimado Ciudadano.",
                            text: 'para la prestación de entrega de carga, insumos, materias primas y productos de abastecimiento se debe indicar que:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON:<br><br> A) MATERIALES DE CONSTRUCCIÓN: MOVIMIENTO DE ÁRIDOS Y TIERRAS 24 HORAS (LUNES A VIERNES), MAYORISTAS 24 HORAS (LUNES A VIERNES), MINORISTAS DE 9:00 A 17:00 (LUNES A VIERNES).<br><br> B) MATERIAS PRIMAS: 24 HORAS (LUNES A DOMINGO)<br><br> C) PRODUCTOS DE 1ERA NECESIDAD: MAYORISTAS: 24 HORAS (LUNES A DOMINGO) Y MINORISTAS: 5:00 A 17:00 (LUNES A VIERNES)”<span>',
                            html: true,
                            type: 'warning',
                            confirmButtonColor: '#DD6B55'
                          });
                      break;
                        }
        }  
    }


    $scope.docDiasDimaico = function(data){
        console.log(data);
        //OPCION 1
        if(data == 'TODOS LOS DIAS'){
            $scope.div_dias_div = false;

            }else if(data == 'SELECCIONAR DIAS'){
                $scope.div_dias_div = true;
        }  
    }
    
    $scope.validarEnvio = function(data){
        console.log("data",data);
        swal({
          title: 'CONFIRMAR',
          text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'SI',
          cancelButtonText: 'NO',
          closeOnConfirm: false
        }, function() {
          swal.close();
          setTimeout(function(){
            $scope.crea_tramite_lotus(data);
          }, 1000);
        });
      };
    
      $scope.crea_tramite_lotus = function (datos) {
        $scope.ultimoArrayAdjunto(datos.PER_TRA_DESCRIP_FOR);
        $.blockUI({ css: { 
          border: 'none', 
          padding: '10px', 
          backgroundColor: '#000', 
          '-webkit-border-radius': '10px', 
          '-moz-border-radius': '10px', 
          opacity: .5, 
          color: '#fff' 
        },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){
          $.blockUI();
          console.log("datos",datos);

          var f = new Date();  
          datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
          datos.g_tipo_tramite = 'PER_TRA';
          console.log("datos enviados",datos);
          data_form = JSON.stringify(datos);
          var tramite = new crearTramiteMovilidad();
          tramite.usr_id = 1;    
          tramite.datos = data_form;
          tramite.procodigo = 'PER_TRA';
          var nroTramiteEnviado = sessionService.get('NROTRAMITE');
          tramite.tramite_linea(function(results){ 
            results = JSON.parse(results);
            if (results !=null) {
              results = results.success.data[0].crea_tramite_linea;
              console.log("resssssssssssult",results);
             /* $scope.mostrar_form_ope = false;
              $scope.datosMostrar = 1;*/
              $scope.validarFormProcesos(results);
              $.unblockUI();
            }else{
              alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
              $.unblockUI();
            }
          }); 
        },300);         
      };
    

}