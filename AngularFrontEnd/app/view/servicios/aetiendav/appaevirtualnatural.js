function aevirtualnaturalController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];

     $scope.cambioTipoTramite = function(tipotramite){
     	$scope.limpiarDatos();
        if (tipotramite == "Formal") {
        	$scope.listarAE();
            $scope.seltramite = true;
            $scope.divNatural = 'NATURAL';
            $scope.divFormal = true;
            $scope.divInFormal = false;

        } else {
            $scope.seltramite = false;
            $scope.divNatural = 'NATURAL';
            $scope.divFormal = false;
            $scope.divInFormal = true;
            $scope.divFormal = false;


        }

    };

    $scope.listarAE = function () {
        var dataGenesis       = ((typeof($rootScope.datosGenesis)    == 'undefined' || $rootScope.datosGenesis == null) ? {}  : $rootScope.datosGenesis);           
        console.log('$rootScope.datosGenesis:: ', $rootScope.datosGenesis);
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var idContribuyente =   $rootScope.datosGenesis[0].idContribuyente;
        var contribuyente   =   new gLstActividadEconomica();
        contribuyente.idContribuyente   =   idContribuyente;
        contribuyente.tipo  =   'N';
        contribuyente.lstActividadEconomica(function(resultado){ 
            $.unblockUI(); 
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response    =   resultadoApi;
                $scope.trmUsuario = response.success.dataSql;
                var data = response.success.dataSql;
                $scope.tblTramites.reload();   
            } else {
                 swal('', "Datos no Encontrados !!!", 'warning');
            }
        });
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
        var fechatram = "";
        var aniotram = "";
        fechatram = tramite.FechaInicio.split("-");
        aniotram = fechatram[0];
        $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
        $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
        $scope.sIdAeGrilla  =   tramite.IdActividad;
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var datosGenerales = new gDatosGenerales();
        datosGenerales.idActividadEconomica=tramite.IdActividad;
        datosGenerales.tipo="N";
        datosGenerales.lstDatosGenerales(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response = resultadoApi.success.dataSql;
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
                                           
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var szona       =   "DISTRITO";
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
                    $scope.datos.f01_horarioAtencion = response[0].horarioAtencion;
                    $scope.datos.f01_dist_act= response[0].idDistrito;
                    $scope.datos.f01_num_pmc = response[0].padron;
                    $scope.datos.f01_raz_soc=response[0].denominacion;
                    $scope.datos.f01_sup=response[0].superficie;
                    $scope.datos.f01_de_hor=hinicio;
                    $scope.datos.f01_a_hor=hfinal;
                    $scope.datos.f01_productosElaborados=response[0].productosElaborados;
                    $scope.datos.f01_actividadesSecundarias=response[0].actividadesSecundarias;
                    /*TIPO LICENCIA*/
                    $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;//response[0].TipoLicencia;
                    $scope.datos.f01_categoria_descrip = response[0].idActividadDesarrollada;
                    $scope.datos.f01_desc_desarrollada = response[0].desc_desarrollada;

                    $scope.f01_tip_act  = response[0].tipoActividad;
                    $scope.datos.f01_categoria_descrip = response[0].idActividadDesarrollada;   
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
                    $scope.datos.f01_zona_act = response[0].idzona_ae;
                    $scope.datos.f01_zona_act_descrip = response[0].zona_ae;
                    $scope.datos.f01_tip_via_act = response[0].Tipo_Via_ae;
                    $scope.datos.f01_num_act = response[0].via_ae;
                    $scope.datos.f01_num_act1 = response[0].numero_ae;
                    $scope.datos.f01_nro_actividad = response[0].sucursal;
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
                    
                }else{
                	swal('', "Datos no Encontrados !!!", 'warning');
                }
        });
    };  

    $scope.mostrarimg  =   function(imagen){         
	    if (typeof($scope.FILE_FOTOCOPIA_CI) != 'undefined') {
	        $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
	    };
	    if (typeof($scope.FILE_FOTOCOPIA_CI_R) != 'undefined') {
	        $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
	    }
	    if (typeof($scope.registro.FILE_FOTOCOPIA_CI) != 'undefined') {
	        var nombreArchivoCi    =   "";
	        nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
	        var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
	        var extCi              =   aTipoArchivoCi.split(".")[1];

	        try{
	            extCi                  =   extCi.toLowerCase();
	        }catch(e){}

	        if(imagen == 'ci'){
	            $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
	            if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip'){
	                window.open($scope.archivoCI, "_blank");
	            }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
	                $("#fo").modal("show");
	            }          
	        }
	    };      
	    if (typeof($scope.registro.FILE_FOTOCOPIA_CI_R != 'undefined')) {
	        var nombreArchivoCiR    =   "";
	        nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
	        var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
	        var extCiR              =   aTipoArchivoCiR.split(".")[1];   
	        try{
	            extCiR                  =   extCiR.toLowerCase();
	        }catch(e){}

	        if(imagen == 'ciR'){
	            $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";             
	            if(extCiR == 'pdf' || extCiR == 'docx' ||  extCiR == 'docxlm' || extCiR == 'zip'){
	                window.open($scope.archivoCIR, "_blank");
	            }else if(extCiR == 'jpeg' || extCiR == 'jpg' ||  extCiR == 'png' ||  extCiR == 'gif'){
	                $("#fot").modal("show");             
	            }
	        } 
	    }; 
	    $.unblockUI();
	}

    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };

    $scope.limpiarDatos = function(){
    	$scope.datos.f01_raz_soc = "";
		$scope.datos.f01_horarioAtencion = "";
		$scope.datos.f01_desc_desarrollada = "";
		$scope.datos.f01_nro_actividad = "";
		$scope.datos.f01_macro_act_descrip = "";
		$scope.datos.f01_dist_act = "";
		$scope.datos.f01_zona_act_descrip = "";
		$scope.datos.f01_tip_via_act = "";
		$scope.datos.f01_num_act = "";
		$scope.datos.f01_num_act1 = "";
		$scope.datos.f01_descrip_servp = "";
		$scope.datos.f01_ubicacion_descrip = "";
		$scope.datos.f01_correo_elec = "";
		$scope.datos.f01_tel_cel = "";
		$scope.datos.f01_mod_pag = "";
		$scope.datos.f01_serv_adic = "";
    }

    $scope.envioDatos = function(){
    	 swal({
            title: 'CONFIRMAR',
            text: 'Esta seguro de enviar el formulario',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
               
            }, 1000);
        });
    }

    $scope.cargarDatos=function(){
    	$scope.btnEnviarForm    =   true;
        $scope.btnGuardarForm   =   true;
        $scope.botones = "";
    	$.unblockUI();
    };

}