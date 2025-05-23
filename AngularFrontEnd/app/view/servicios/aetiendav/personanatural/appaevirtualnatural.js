function aevirtualnaturalController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];

    $scope.listadoActividadesEconomicas = function () {
        var dataGenesis       = ((typeof($rootScope.datosGenesis)    == 'undefined' || $rootScope.datosGenesis == null) ? {}  : $rootScope.datosGenesis); 
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
        $scope.limpiarDatos(); 
        $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
        $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
        $scope.sIdAeGrilla  =   tramite.IdActividad;
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = tramite.IdActividad;
        datosGenerales.getDatosAE_Viae(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                console.log("Ingresa aqui22!!!!! ", resultadoApi.success);

                codhojaruta = resultadoApi.success.dataSql.datosAE[0].hojaRuta;
                var response = resultadoApi.success.dataSql.datosAE;
                var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;
                if(response.length > 0){
                    console.log("Ingresa aqui!!!!!", response.length);
                    if(response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null'){
                        response[0].numeroOrden = 0;
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    else{
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
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
                  
                    $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                     $scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].ActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_descripcion = response[0].actividad_desarrollada343;
                    $scope.distritoZonas(response[0].IdMacrodistrito);
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
                    $scope.actulizarIdDistrito();
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
                $scope.datos.f01_tipo_lic_descrip = $scope.resultadoCP.f01_tipo_lic_descrip;
                $scope.datos.f01_categoria_agrupada_descrip = $scope.resultadoCP.f01_categoria_agrupada_descrip;
                $scope.datos.f01_categoria_agrupada_descripcion = $scope.resultadoCP.f01_categoria_agrupada_descripcion;
                $scope.datos.f01_casilla = $scope.resultadoCP.f01_casilla;
                
                $scope.open_mapa_ae();
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
            $scope.publicid='';
            $scope.datos.f01_actividad_principal_array =[];
            $scope.datos.fileArchivosAd = '';
            $scope.datos.FILE_CI = '';
            $scope.datos.FILE_MAPA='';
            $scope.datos.f01_nro_actividad ='';
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

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        
    });

    $scope.validarEnvio = function(data){
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        },function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarTramiteCeroPapel(data);
            }, 1000);
        });
    };

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

    $scope.enviarTramiteCeroPapel = function(paramForm){
        console.log(paramForm);
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'GE_AE-';
        var datosNeXO = {};
        datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
        if ($scope.tipoPersona == 'NATURAL'){
            console.log($scope.tipoPersona);
             $scope.capturarImagen();
            datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias;
            datosNeXO['f01_id_actividad_economica']   =   paramForm.f01_id_actividad_economica;
            datosNeXO['f01_nro_orden']   =   paramForm.f01_nro_orden;
            datosNeXO['f01_id_contribuyente']   =   paramForm.f01_id_contribuyente;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_tipo_per']       =   'N';
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
            //PAGO ADELANTADO
            datosNeXO['pago_adel'] =  $scope.pago_adelantado;
            datosNeXO['nro_ges'] =  paramForm.nro_ges;
            datosNeXO['f01_gestiones_deudas'] = $scope.listDeudas;
            datosNeXO['f01_total_deudas'] = $scope.totalD;
            /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
            datosNeXO['f01_tip_act']=paramForm.f01_tip_act;
            datosNeXO['f01_tipo_lic']=paramForm.f01_tipo_lic;
            datosNeXO['f01_categoria_agrupada']= parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada_descripcion']="";
            datosNeXO['f01_actividad_desarrollada']= paramForm.f01_categoria_descrip2;
            datosNeXO['declaracion_jurada']               =   $rootScope.decJuradaNatural;
            datosNeXO['g_origen_p']='0';
            var datoObjectdj = [];
            var decjuradaN = new Object();
            if ($rootScope.decJuradaJuridico) {
                decjuradaN.url = $rootScope.decJuradaJuridico;
            } else{
                decjuradaN.url = $scope.datos.declaracion_jurada;
            };
            decjuradaN.campo = 'Declaración Jurada Juridico';
            decjuradaN.nombre = 'DECLARACIÓN JURADA';
            datoObjectdj[0] = decjuradaN;
            /*if($scope.datos.File_Adjunto){
                datosNeXO['File_Adjunto'] =  $scope.datos.File_Adjunto.concat(decjuradaN);
            }
            else{
                datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos.concat(decjuradaN);;
            }*/
            datosNeXO['f01_tip_act']                    =   paramForm.f01_tip_act; 
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;           
            
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_croquis_ae'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
            if(paramForm.f01_tipo_lic == 32 || paramForm.f01_tipo_lic == '32'){
                datosNeXO['f01_idcat_multi_principal'] = paramForm.xf01_idcat_multi_principal;
                datosNeXO['f01_descat_multi_principal'] = paramForm.xf01_descat_multi_principal;
                datosNeXO['f01_act_principal'] = paramForm.f01_act_principal;
                datosNeXO['f01_act_principal2'] = paramForm.f01_act_principal2;
                datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
            }else{
                datosNeXO['f01_idcat_multi_principal'] = '';
                datosNeXO['f01_descat_multi_principal'] = '';
                datosNeXO['f01_act_principal'] = '';
                datosNeXO['f01_actividad_principal_array'] = '';
            }
        }        
        datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria_descrip2']      =  paramForm.f01_categoria_descripcion.toUpperCase();
        datosNeXO['f01_categoria']      =  parseInt(paramForm.f01_categoria_descrip);
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2.toUpperCase();
        datosNeXO['f01_correo_electronico_ae']=paramForm.f01_correo_electronico_ae;
        datosNeXO['f01_modalidad_pago']=paramForm.f01_modalidad_pago;
        datosNeXO['f01_serv_adic']=paramForm.f01_serv_adic;
        datosNeXO['f01_emite_factura']=paramForm.f01_emite_factura;
        datosNeXO['f01_informacion_adicional']=paramForm.f01_informacion_adicional;
        datosNeXO['g_tipo'] = "AE-TIENDA EN LINEA";
        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }

        console.log("Hola::: ", paramForm);

        var sMacroR         =   datosNeXO['f01_macro_des'];
        var sZonaR          =   datosNeXO['INT_AC_ID_ZONA'];
        var sMacroRDesc     =   datosNeXO['f01_macro_des'];
        var sZonaRDesc      =   datosNeXO['INT_AC_ID_ZONA'];
        var iCategoriaAgrupada      =   datosNeXO['INT_ID_CAT_AGRUPADA'];
        var iMacrodistrito          =   datosNeXO['INT_AC_MACRO_ID'];
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(datosNeXO);
        var crearCaso   =   new gCrearTramiteLinea();
        crearCaso.usr_id    = 1;
        crearCaso.datos     = datosSerializados;
        crearCaso.procodigo = idProcodigo;
        crearCaso.crearTramiteLinea(function(response){
            console.log("dkjsnfskdl", response);
            try{
                $scope.botones = null;
                $scope.desabilitado = true;
                response    =   JSON.parse(response);
                var results = response.success.data;
                console.log("dkjsnfskdl1", results);

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
        
    };

        /*enviarFormProcesos*/
    $scope.validarFormProcesos = function(datosForm){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        console.log('sessionService.get:: ', sessionService.get('NROTRAMITE'));
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
                $scope.ListadoTramitesCiudadano();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
            });
        } catch (error){
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI(); 
        }
    };


    $scope.cargarDatos=function(){
        $scope.listadoActividadesEconomicas();
        $scope.open_mapa_ae();
        $scope.macrodistritos();

    	$scope.btnEnviarForm    =   true;
        $scope.btnGuardarForm   =   true;
        $scope.botones = "";
    	$.unblockUI();
    };
}