app.controller('permisosViajesController', function ($scope,$timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window) {
    var fecha= new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;



    /*$scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };*/

    $scope.modelFecha = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };

    /*$scope.startDateOpen1 = function($event) {
		console.log('startdateopen1',$event);        
        $event.preventDefault();
        $event.stopPropagation();
		
        $scope.startDateOpened1 = true;
    };
    $scope.startDateOpen2 = function($event) {
console.log('startdateopen2',$event);
        $event.preventDefault();
        $event.stopPropagation();
		
        $scope.startDateOpened2 = true;
    };*/
    
    /*$scope.getDatos=function(){
        $scope.estado_formulario = "sin_dato";
		$scope.PERMISO = "";
     //   $scope.people = dataGrid;
    };*/

    $scope.cambioTexto = function(){
      $scope.textCambio = "1";
    }

    if (fecha.getDate()<10)
      dia1 = "0"+ fecha.getDate();
    else
      dia1 = fecha.getDate();

    if ((fecha.getDate()+1)<10)
      dia2 = "0"+ (fecha.getDate()+1);
    else
      dia2 = (fecha.getDate()+1);

    if (fecha.getMonth()<9)
      mes = "0"+ (fecha.getMonth() + 1);
    else
      mes = (fecha.getMonth() + 1);
    
    var fechaActual = fecha.getFullYear() + "-" + mes + "-" + dia1;
    var fechaManiana =  fecha.getFullYear() + "-" + mes + "-" + dia2;
    var fechas =  {"TER_FEC_RET":fechaActual,"TER_FEC_FIN":fechaManiana};
    $scope.datos = fechas;
    $scope.format = 'dd-MM-yyyy';

    $scope.consultaRC_CI = function(tipoPersona, numeroDoc, opcion, campo, flagTextCambio,tipoDocumento){
        if(tipoDocumento=="CI")
        {

          if(flagTextCambio == 1)
          {
            $scope.textCambio = "0";
            if(tipoPersona == 'NATURAL'){
                filtro = "dtspsl_ci = '" + numeroDoc +"'";
            }else{
                filtro = "";
            }

            var misDatos = {
                    "table_name":"ciudadanos",
                    "body":{
                        "filter": filtro
                    }
            };
            $.blockUI();
            DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(misDatos).success(function (response){
                var results = response.record;
                if(results.length > 0){//REGISTRO ENCONTRADO
            var rcExpedido = ((typeof(results[0].dtspsl_expedido) == 'undefined') ? "" : results[0].dtspsl_expedido);
                        var rcNombre = ((typeof(results[0].dtspsl_nombres) == 'undefined') ? "" : results[0].dtspsl_nombres);
                        var rcPaterno = ((typeof(results[0].dtspsl_paterno) == 'undefined') ? "" : results[0].dtspsl_paterno);
                        var rcMaterno = ((typeof(results[0].dtspsl_materno) == 'undefined') ? "" : results[0].dtspsl_materno);
            var rcFecNacimiento = ((typeof(results[0].dtspsl_fec_nacimiento) == 'undefined') ? "" : results[0].dtspsl_fec_nacimiento);//alert(rcFecNacimiento);
                        var rcDireccion = ((typeof(results[0].dtspsl_direccion) == 'undefined') ? "" : results[0].dtspsl_direccion);
                        var rcTelefono = ((typeof(results[0].dtspsl_telefono) == 'undefined') ? "" : results[0].dtspsl_telefono);
                        var rcMovil = ((typeof(results[0].dtspsl_movil) == 'undefined') ? "" : results[0].dtspsl_movil);
                        var rcGenero = ((typeof(results[0].dtspsl_sexo) == 'undefined') ? "" : results[0].dtspsl_sexo);
                        var rcMacro = ((typeof(results[0].dtspsl_macrodistrito) == 'undefined') ? "" : results[0].dtspsl_macrodistrito);
                        var rcZona = ((typeof(results[0].dtspsl_zona) == 'undefined') ? "" : results[0].dtspsl_zona);
                        var rcMacroDesc = ((typeof(results[0].dtspsl_macrodistrito_desc) == 'undefined') ? "" : results[0].dtspsl_macrodistrito_desc);
                        var rcZonaDesc = ((typeof(results[0].dtspsl_zona_desc) == 'undefined') ? "" : results[0].dtspsl_zona_desc);
                        var rcDistritoDesc = ((typeof(results[0].dtspsl_distrito_desc) == 'undefined') ? "" : results[0].dtspsl_distrito_desc);
                        if(rcMacro == undefined)
                          rcMacro = " ";
                        else
                          rcMacro = rcMacro.toString();
                        switch(opcion) {
                            case "1":
                                if(campo == 1){
                                  $scope.datos.TER_TESTIGO = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }else if(campo == 2){
                                  $scope.datos.TER_TESTIGO1 = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }
                                break;
                            case "2":
                                if(campo == 1){
                                  $scope.datos.TER_TESTIGO = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }else if(campo == 2){
                                  $scope.datos.TER_GARANTE = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }else if(campo == 3){
                                  $scope.datos.TER_GARANTE1 = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }
                                break;
                            case "3":
                                if(campo == 1){
                                  $scope.datos.TER_TUTOR = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }else if(campo == 2){
                                  $scope.datos.TER_GARANTE = rcNombre.trim() + ' ' + rcPaterno.trim() + ' ' + rcMaterno.trim();
                                }else if(campo == 3){
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
                $scope.modelResp.selectedR.f01_ADUL_EXP_CIUD  = rcExpedido.trim(); 
                                $scope.modelResp.selectedR.f01_ADUL_G_NOM  = rcNombre.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_G_APAT =rcPaterno.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_G_AMAT =rcMaterno.trim(); 
                $scope.modelResp.selectedR.f01_ADUL_G_FEC_NAC =rcFecNacimiento.trim();                 
                            //    $scope.modelResp.selectedR.f01_NNA_G_FEC_NAC 
                                $scope.modelResp.selectedR.f01_ADUL_G_GEN   =rcGenero.trim(); 
                            //    $scope.modelResp.selectedR.f01_NNA_G_CIUD  
                            //    $scope.modelResp.selectedR.f01_NNA_DEP_OTRO  
                                $scope.modelResp.selectedR.f01_ADUL_DIR  =rcDireccion.trim();   
                                $scope.modelResp.selectedR.f01_ADUL_TER_TEL  =rcTelefono.trim();  
                                $scope.modelResp.selectedR.f01_ADUL_G_TELF  =rcMovil.trim(); 
                                //document.getElementById('f01_ADUL_TER_ZONA' + campo).value=rcZona.trim() + "-" + rcDistritoDesc.trim() + " - " + rcZonaDesc.trim();
                                break;
                            case "101":
                            /*    document.getElementById('f01_NNA_G_NOM').value=rcNombre.trim();
                                document.getElementById('f01_NNA_G_APAT').value=rcPaterno.trim();
                                document.getElementById('f01_NNA_G_AMAT').value=rcMaterno.trim();
                                document.getElementById('f01_NNA_DIR').value=rcDireccion.trim();
                               document.getElementById('f01_NNA_TER_TEL').value=rcTelefono.trim();
                               document.getElementById('f01_NNA_G_TELF').value=rcMovil.trim();
                                document.getElementById('f01_NNA_G_GEN').value=rcGenero.trim();
*/
                            //     $scope.model.selected.f01_NNA_EXP_CIUD 
              //  $scope.model.selected.f01_NNA_G_CN    
                $scope.model.selected.f01_NNA_EXP_CIUD  = rcExpedido.trim(); 
                                $scope.model.selected.f01_NNA_G_NOM  = rcNombre.trim();   
                                $scope.model.selected.f01_NNA_G_APAT =rcPaterno.trim();   
                                $scope.model.selected.f01_NNA_G_AMAT =rcMaterno.trim(); 
                $scope.model.selected.f01_NNA_G_FEC_NAC =rcFecNacimiento.trim();                 
                            //    $scope.model.selected.f01_NNA_G_FEC_NAC 
                                $scope.model.selected.f01_NNA_G_GEN =rcGenero.trim(); //alert(rcGenero.trim());
                            //    $scope.model.selected.f01_NNA_G_CIUD  
                            //    $scope.model.selected.f01_NNA_DEP_OTRO  
                                $scope.model.selected.f01_NNA_DIR  =rcDireccion.trim();   
                                $scope.model.selected.f01_NNA_TER_TEL  =rcTelefono.trim();  
                                $scope.model.selected.f01_NNA_G_TELF  =rcMovil.trim(); 
/*
                                if(rcMacro.trim()=="0"){
                                    document.getElementById('f01_NNA_TER_MACRO').value="10-OTRO";
                                }else{
                                  if(rcMacroDesc == undefined)
                                    document.getElementById('f01_NNA_TER_MACRO').value=rcMacro.trim() + "-";
                                  else
                                    document.getElementById('f01_NNA_TER_MACRO').value=rcMacro.trim() + "-" + rcMacroDesc.trim();
                                }*/
                                //document.getElementById('f01_NNA_TER_ZONA' + campo).value=rcZona.trim() + "-" + rcDistritoDesc.trim() + " - " + rcZonaDesc.trim();
                                break;
                        }
                }else{
                  sweet.show('','El carnet no se encuentra registrado','warning');
                  switch(opcion) {
                      case "1":
                          if(campo == 1){
                            $scope.datos.TER_TESTIGO = '';
                          }else if(campo == 2){
                            $scope.datos.TER_TESTIGO1 = '';
                          }
                          break;
                      case "2":
                          if(campo == 1){
                            $scope.datos.TER_TESTIGO = '';
                          }else if(campo == 2){
                            $scope.datos.TER_GARANTE = '';
                          }else if(campo == 3){
                            $scope.datos.TER_GARANTE1 = '';
                          }
                          break;
                      case "3":
                          if(campo == 1){
                            $scope.datos.TER_TUTOR = '';
                          }else if(campo == 2){
                            $scope.datos.TER_GARANTE = '';
                          }else if(campo == 3){
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
                          break;
                      case "101":
                          document.getElementById('f01_NNA_G_NOM').value='';
                          document.getElementById('f01_NNA_G_APAT').value='';
                          document.getElementById('f01_NNA_G_AMAT').value='';
                          document.getElementById('f01_NNA_DIR').value='';
                          document.getElementById('f01_NNA_TER_TEL').value='';
                          document.getElementById('f01_NNA_G_TELF').value='';
                          break;
                  }
                }
                $.unblockUI();            
            }).error(function(results){
                console.log("Error DreamFactory consultaRC_CI", results);
                $.unblockUI();
            });
          }

        }
          
    }
   
 $scope.mensajevs = function(){
  $scope.mostrarMsgActividadTrue=true;
 };
 $scope.validarFormProcesos = function(datosForm){//alert(253);
        var idTramite = sessionService.get('IDTRAMITE');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        //alert('NroTramite: '+ nroTramiteEnviado);
        idUsuario = 4;		
		var parametros = {
            "procedure_name":"sp_upd_formulario_datos",
            "body":{
                "params": [
					{
                        "name": "idTramite",
                        "value": idTramite
                    },{
                        "name": "enviado",
                        "value": "SI"
                    },{
                        "name": "codigo",
                        "value": nroTramiteEnviado
                    },{
                        "name": "id_usuario",
                        "value": idUsuario
                    },
                ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
            $scope.tramitesCiudadano();
            $scope.bloquearBtnEnviarForm();
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            //sweet.show('', 'Formulario enviado correctamente !', 'success');
            //sweet.show('Formulario enviado correctamente', "Señor ciudadano su nro de trámite" + nroTramiteEnviado, 'success'); 
			sweet.show('Señor Ciudadano su Nro de trámite  es : ' + nroTramiteEnviado, " NOTA: Tiene 7 días para aproximarse a la plataforma DNA terminal con su respectiva documentación, caso contrario su registro será dado de baja."); 
        }).error(function(results){
              sweet.show('', 'Registro no modificado', 'error');
        });		
    };

    $scope.enviarFormProcesos = function(paramForm){
        $scope.btnEnviarForm   =   true;
        var idProcodigo         =   'T-VF';
        var datosNeXO = {};
        

        if (paramForm.TER_TIP_PERMISO == 'F' ){
            datosNeXO['TER_TIP_PERMISO'] = paramForm.TER_TIP_PERMISO;
			datosNeXO['G_NNA_NOM'] = paramForm.G_NNA_NOM;
			datosNeXO['G_NNA_PAT'] = paramForm.G_NNA_PAT;
			datosNeXO['G_NNA_MAT'] = paramForm.G_NNA_MAT;
			datosNeXO['TER_SOLOS'] = paramForm.TER_SOLOS;
			datosNeXO['TER_2_PROG'] = paramForm.TER_2_PROG;
			datosNeXO['DEF_FEC_ING'] = paramForm.DEF_FEC_ING;
			datosNeXO['TER_FEC_RET'] = paramForm.TER_FEC_RET;
			datosNeXO['TER_FEC_FIN'] = paramForm.TER_FEC_FIN;
			datosNeXO['TER_TIP_CASO'] = "6";
			datosNeXO['g_tipo'] = "T-VF",
			datosNeXO['DEF_EDAD_ETAPA'] = "NA";
			datosNeXO['DEF_INSTANCIAS'] = "UDIF_T";
			datosNeXO['TER_TIP_SOL'] = paramForm.TER_TIP_SOL;
			datosNeXO['TER_DEST'] = paramForm.TER_DEST;
			datosNeXO['TER_MIN'] = paramForm.TER_MIN;
			datosNeXO['TER_MOT'] = paramForm.TER_MOT;
			datosNeXO['TER_NNA_VIAJAN'] = paramForm.TER_NNA_VIAJAN;
            datosNeXO['TER_RESP'] = paramForm.TER_RESP;
        }
		if (paramForm.TER_TIP_PERMISO == 'D' ){
            datosNeXO['TER_TIP_PERMISO'] = paramForm.TER_TIP_PERMISO;
			datosNeXO['G_NNA_NOM'] = paramForm.G_NNA_NOM;
			datosNeXO['G_NNA_PAT'] = paramForm.G_NNA_PAT;
			datosNeXO['G_NNA_MAT'] = paramForm.G_NNA_MAT;
			datosNeXO['TER_SOLOS'] = paramForm.TER_SOLOS;
			datosNeXO['TER_2_PROG'] = paramForm.TER_2_PROG;
			datosNeXO['DEF_FEC_ING'] = paramForm.DEF_FEC_ING;
			datosNeXO['TER_FEC_RET'] = paramForm.TER_FEC_RET;
			datosNeXO['TER_FEC_FIN'] = paramForm.TER_FEC_FIN;
			datosNeXO['TER_TIP_CASO'] = "6";
			datosNeXO['g_tipo'] = "T-VF",
			datosNeXO['DEF_EDAD_ETAPA'] = "NA";
			datosNeXO['DEF_INSTANCIAS'] = "UDIF_T";
			datosNeXO['TER_TIP_SOL'] = paramForm.TER_TIP_SOL;
			datosNeXO['TER_DEST'] = paramForm.TER_DEST;
			datosNeXO['TER_MIN'] = paramForm.TER_MIN;
			datosNeXO['TER_MOT'] = paramForm.TER_MOT;
			datosNeXO['TER_NNA_VIAJAN'] = paramForm.TER_NNA_VIAJAN;
            datosNeXO['TER_RESP'] = paramForm.TER_RESP;
        }
        //DATOS DE LA ACTIVIDAD ECONOMICA - NO ESTAN REGISTRADAS DE MANERA LOCAL


        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(datosNeXO);

        var parametros = {
            "procedure_name":"ae.sp_pmfunction2",
            "body":{
                    "params": [
                        {"name": "usr_id","value": 1},
                        {"name": "datos","value": datosSerializados},
                        {"name": "procodigo","value": idProcodigo}
                    ]
                   }
        };
        $.blockUI();
        DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (results){
            if(results.length > 0){
                $scope.validarFormProcesos(paramForm);
                //ALMACENAR ARCHIVOS MULTIPLES
                $scope.guardarAdjuntosMultiples(results);
                $.unblockUI();
                //$scope.btnEnviarForm   =   false;
            }else{
                $.unblockUI();
                $scope.msg = "Error !!";
            }
        }).error(function(results){
              console.log("Error DreamFactory enviarFormProcesos", results);            
                $.unblockUI();
        });
    };

    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosMultiples = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction2;
        var aDatosCaso      = sdataArchivo.split(',');

        $scope.archivosMultiples    =   JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES);
        $scope.docsistema           =   'GENESIS';
        $scope.sIdProcesoActual     =   aDatosCaso[6];//datosCaso.idProceso;// 1;
        $scope.sCasoNro             =   aDatosCaso[1];//datosCaso.sNrocaso//49;



        $scope.sCasoNombre          =   '15 - ADJUNTOS';
        //var datosSerializados = JSON.stringify(datosNeXO);
        /*ACTUALIZAR UN CAMPO DEL FORMULARIO*/
        var resOpcion = {
            "procedure_name":"sp_agregar_adjuntos",
            "body":{
                "params": [
                    {
                        "name": "docsistema",
                        "value": $scope.docsistema
                    },{
                        "name": "docidproceso",
                        "value": $scope.sIdProcesoActual
                    },{
                        "name": "docidcaso",
                        "value": $scope.sCasoNro
                    },{
                        "name": "doccasonombre",
                        "value": $scope.sCasoNombre
                    },{
                        "name": "docarchivos",
                        "value": $scope.archivosMultiples
                    }
                ]
            }
        };

        var obj = DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(resOpcion).success(function (response){
        }).error(function(error)
        {
            console.log("Error en DreamFactory guardarAdjuntosMultiples", error);
        });
    };


    //$scope.guardar = function(data){
    $scope.enviarFormProcesos55 = function(data){
        //var file = $scope.myFile;
        /*$scope.direccionvirtual= $scope.directorio + "/" + $scope.sIdProcesoActual + "/" + $scope.sCasoNro ;
        var uploadUrl = CONFIG.APIURL+"/files"+$scope.direccionvirtual+"/";
        var nombreFile = file.name;
        var tipo = nombreFile.split(".");
        var cadenaURL = uploadUrl + file.name + '?app_name=' + CONFIG.APP_NAME;
        var cadenaURI = $scope.direccionvirtual +"/" + file.name;
        fileUpload.uploadFileToUrl(file, uploadUrl);*/
        ///ruta/1/49/icono_07_transporte.png
        $scope.sIdProcesoActual = '1';
        $scope.sCasoNro = '49';
        $scope.sCasoNombre        ='15 - ADJUNTOS';
        var cadenaURL = uploadUrl + file.name + '?app_name=' + CONFIG.APP_NAME;
        var cadenaURI = $scope.direccionvirtual +"/" + file.name;
        //tipo[1] //tipo documento

        var datosUpload = {};
        if (data.tipificacion==1){
            datosUpload['doc_sistema'] = 'GENESIS';
            datosUpload['doc_proceso'] = $scope.sIdProcesoActual;
            datosUpload['doc_id'] = $scope.sCasoNro;
            datosUpload['doc_ci_nodo'] = $scope.sCasoNombre;
            datosUpload['doc_datos'] = "";
            datosUpload['doc_titulo'] = "";
            datosUpload['doc_palabras'] = "";
            datosUpload['doc_version'] ='1';
            datosUpload['doc_tiempo'] = "";
            datosUpload['doc_firma_digital'] = 0;
            datosUpload['doc_acceso'] = "PRIVADO";//data.publicacion;
            datosUpload['doc_tamanio_documento'] = "0";
            datosUpload['doc_tps_doc_id'] = "";//data.tipificacion;
            datosUpload['doc_tipo_documentacion'] = 'U';
            datosUpload['doc_tipo_ingreso'] = 'I';
            datosUpload['doc_estado_de_envio'] = 'N';
            datosUpload['doc_correlativo'] = '';
            datosUpload['doc_tipo_documento_ext'] = '';
            datosUpload['doc_nrotramite_nexo'] = '';
            datosUpload['doc_id_carpeta'] = '0';
            datosUpload['doc_registro'] = fechactual;
            datosUpload['doc_modificacion'] = fechactual;
            datosUpload['doc_usuario'] = "1";//sessionService.get('USUARIO');
            datosUpload['doc_estado'] = 'A';
            datosUpload['doc_url'] = cadenaURI;
            datosUpload['doc_url_logica'] = cadenaURL;
            datosUpload['doc_nombre'] = nombreFile;
            datosUpload['doc_tipo_documento'] = tipo[1];
        } else {
            datosUpload['doc_sistema'] = 'GENESIS';
            datosUpload['doc_proceso'] = $scope.sIdProcesoActual;
            datosUpload['doc_id'] = $scope.sCasoNro;
            datosUpload['doc_ci_nodo'] = $scope.sCasoNombre;
            datosUpload['doc_datos'] = data.descripcion;
            datosUpload['doc_titulo'] = data.titulo;
            datosUpload['doc_palabras'] = data.palabras;
            datosUpload['doc_version'] ='1';
            datosUpload['doc_tiempo'] = data.dias;
            datosUpload['doc_firma_digital'] = 0;
            datosUpload['doc_acceso'] = data.publicacion;
            datosUpload['doc_tamanio_documento'] = "0";
            datosUpload['doc_tps_doc_id'] = data.tipificacion;
            datosUpload['doc_tipo_documentacion'] = 'U';
            datosUpload['doc_tipo_ingreso'] = 'I';
            datosUpload['doc_estado_de_envio'] = 'N';
            datosUpload['doc_correlativo'] = '';
            datosUpload['doc_tipo_documento_ext'] = '';
            datosUpload['doc_nrotramite_nexo'] = '';
            datosUpload['doc_id_carpeta'] = '0';
            datosUpload['doc_registro'] = fechactual;
            datosUpload['doc_modificacion'] = fechactual;
            datosUpload['doc_usuario'] = sessionService.get('USUARIO');
            datosUpload['doc_estado'] = 'A';
            datosUpload['doc_url'] = cadenaURI;
            datosUpload['doc_url_logica'] = cadenaURL;
            datosUpload['doc_nombre'] = nombreFile;
            datosUpload['doc_tipo_documento'] = tipo[1];
        }
        var ressubirU = {
            table_name:"dms_gt_documentos",
            body:datosUpload
        };
        var obj=DreamFactory.api[CONFIG.SERVICE].createRecords(ressubirU);
        obj.success(function(data){
            $.unblockUI();
            $scope.datosArchi='';
            $scope.myFile=''
            $scope.getArchivosAdjuntos();
        })
        .error(function(data){
            $.unblockUI();
            sweet.show('', 'Registro no insertado', 'error');
        })
    };

    $scope.macrodistritos = function(){
        $scope.aMacrodistritos = {};
        var parametros = {
                "table_name":"_bp_macrodistrito"
        };
        DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(parametros).success(function (results){
            if(results.record.length > 0){
                $scope.aMacrodistritos = results.record;
            }else{
                $scope.msg = "Error !!";
            }
        }).error(function(results){
            console.log("Error DreamFactory macrodistritos", results);
        });
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
        $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        $scope.aDistritoZona = {};
        //filtro = '{"filter": "dist_macro_id='+idMacro+'"}';
        filtro = '{"filter": "dist_macro_id='+idMacro+'"}';
        var parametros = {
                "table_name":"_bp_distritos_zonas",
                "body": filtro
        };
        DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(parametros).success(function (results){
            if(results.record.length > 0){
                $scope.aDistritoZona = results.record;
            }else{
                $scope.msg = "Error !!";
            }
        }).error(function(results){
            console.log("Error en DreamFactory distritoZonas", results);
        });
    };

    $scope.recuperarInfo = function(){
        sIdTramite = sessionService.get('IDTRAMITE'); //alert("recupera info datos");
        sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        sIdServicio = sessionService.get('IDSERVICIO');
        var datosform = {};
        if(sIdCiudadano){

            var datosCiudadano = {
                    "procedure_name":"splistafrmdatos",
                    "body":{
                            "params": [
                                {
                                    "name": "sidciudadano",
                                    "value": sIdCiudadano
                                },
                                {
                                    "name": "sidservicio",
                                    "value": sIdServicio
                                },
                                {
                                    "name": "sidtramite",
                                    "value": sIdTramite
                                }
                            ]
                    }
            };

            DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(datosCiudadano).success(function (results){
                if(results.length > 0){
                    datosform = JSON.parse(results[0].form_contenido);
                    $scope.datosform =datosform;
                } else {
                    sessionService.set('IDTRAMITE', sIdTramite);
                }
            }).error(function(results)
            {
              console.log("Error en DreamFactory callStoredProcWithParams", results)
            });
        }else{
            sweet.show('', "No existe id ciudadano !!!", 'error');

        }
    };

    $scope.tipoPersona=function(tipo){
        var sTipoPersona = sessionService.get('TIPO_PERSONA');
        if (sTipoPersona == 'JURIDICO')
            $scope.representante    =   "mostrar";
        else
            $scope.representante    =   null;
    };

    //Documentos Adjuntos
    $scope.cambiarFile = function(obj, valor){
        //alert("123");
        $scope.datos[obj.name] = valor;
    };

    $scope.cambiarFile2 = function(obj2, valor){
        //alert("123");
        //$scope.datos[obj.name] = valor;
    };

    var clsValidarBtnInternet = $rootScope.$on('validarBtnInternet', function(event, data){

        if (data == "SI") {
            //$scope.btnEnviarForm    =   true;
            $scope.btnGuardarForm   =   true;
            $scope.desabilitado     =   true;
            //$scope.botones          =   null;
        } else {
            //$scope.btnEnviarForm    =   false;
            //$scope.btnGuardarForm   =   false;
            //$scope.desabilitado     =   false;
            //$scope.btnEnviarForm    =   false;
            $scope.btnGuardarForm   =   false;
            $scope.desabilitado     =   false;
            //$scope.botones          =   "mostrar";
        }
    });


    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function(event, data){
        if(data > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = true;
        }
    });

    //validarBtnEnviar
    $scope.validarBtnEnviar =   function(cont){
        if(cont > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = false;
        }
    };

    $scope.cargarDatos=function(){
        //$scope.getDatos();
		//alert(sessionService.get('CICIUDADANO'));
	//	$scope.datos.G_CI =sessionService.get('CICIUDADANO');
	//	$scope.G_CI =sessionService.get('CICIUDADANO');
                  /*      sessionService.set('CICIUDADANO', results[0].dtspsl_ci);
                        sessionService.set('IDUSUARIO', results[0]._id);
                        sessionService.set('IDSOLICITANTE', results[0]._id);
                        sessionService.set('USUARIO', "Ciudadano");
                        if(results[0].dtspsl_tipo_persona = 'NATURAL'){
                            sessionService.set('US_NOMBRE', results[0].dtspsl_nombres);
                            sessionService.set('US_PATERNO', results[0].dtspsl_paterno);
                            sessionService.set('US_MATERNO', results[0].dtspsl_materno);
							*/
        $scope.macrodistritos();
        $scope.inciarUpload();
    };

    $scope.inciarUpload =   function(){
        try{
          $('#multiDocsButon').click(function(){
                $('#multiDocsFile').click();
          });
        }catch(e)
        {
          console.log("Error Inciar Upload", e);
        }
    };

    var clsInicioInternet = $rootScope.$on('inicioInternetRc', function(event, data){
        //$scope.datos.INT_TIPO_CONTRIBUYENTE = 'NATURAL';
        //$scope.tipoPersona($scope.datos.INT_TIPO_CONTRIBUYENTE);
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        if(data.length > 0){
            if(data[0].venviado != 'SI'){
              //  $scope.validarActividadEco(data[0].datos.TIPO);
            }
        }
    });

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        //LISTANDO ZONAS POR EL ID MACRODISTRITO
        if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            var idMacro =   data.INT_AC_MACRO_ID;
            $scope.aDistritoZona = {};
            filtro = '{"filter": "dist_macro_id='+idMacro+'"}';
            var parametros = {
                    "table_name":"_bp_distritos_zonas",
                    "body": filtro
            };
            DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(parametros).success(function (results){
                if(results.record.length > 0){
                    $scope.aDistritoZona = results.record;
                }else{
                    $scope.msg = "Error !!";
                }
            }).error(function(results)
            {
              console.log("Error DreamFactory getRecordsByPost", results);
            });
        }

        //EXTRAYENDO TIPO DE VIA CONTRIBUYENTE, dtspsl_tipo_via
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

        //EXTRAYENDO EXPEDIDO
        if(typeof($scope.datos.INT_EXP) != 'undefined'){
            var ideExpedido   =   $scope.datos.INT_EXP;
            var tipoExpedido  =   [
                { name: 'LA PAZ', value:'LPZ', id: '1'},
                { name: 'ORURO', value:'ORU', id: '2'},
                { name: 'POTOSI', value:'PTS', id: '3'},
                { name: 'COCHABAMBA', value:'CBB', id: '4'},
                { name: 'TARIJA', value:'TJA', id: '5'},
                { name: 'CHUQUISACA', value:'CHQ', id: '6'},
                { name: 'SANTA CRUZ', value:'SCZ', id: '7'},
                { name: 'PANDO', value:'PND', id: '8'},
                { name: 'BENI', value:'BNI', id: '9'},
                { name: 'EXTRANJERO', value:'EXT', id: '10'}
            ];
            angular.forEach(tipoExpedido, function(value, key) {
                if(value.id == ideExpedido){
                    $scope.datos.INT_EXP  =   value.value;
                }
            });
        }
    });

    //DOCUMENTOS ADJUNTOS OBLIGATORIOS
    var clsIniciarFechaObligatorio = $rootScope.$on('inicializarFechaOblitatorio', function(event, data)
    {
        var archivosAdjuntos    =   ((typeof(data.ARCHIVOS_MULTIPLES) == 'undefined') ? "" :data.ARCHIVOS_MULTIPLES);
        if(archivosAdjuntos.length > 0){
            $scope.adjuntoObligatorio       =   false;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";
        }else{
            $scope.adjuntoObligatorio       =   true;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        }
    });

    $scope.$on('$destroy', function() {
       // clsValidarBtnEnviar();
      //  clsIniciarCamposInternet();
       // clsIniciarGrillaAE();
      //  clsIniciarFechaObligatorio();
    });


    /*INTERNET EN LINEA*/
    $scope.tblActividaEco        =   {};
    $scope.lstActividadEco       =   [];
    $scope.formDatosAE           =  false;

    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];

    $scope.selActividadEconomica =  function(tramite){
        $scope.sIdAeGrilla  =   tramite.IdActividad;
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        if(tipoPersona == "NATURAL")
        {
            tipoPersona = "N";
        }
        else
        {
            tipoPersona = "J";
        }
        var data = {
            "procedure_name":"AE.spDatosGeneralesActividadEconomicaSimgep",
            "body":{"params": [
                {"name":"idActividadEconomica","param_type":"IN","value":tramite.IdActividad},
                {"name":"tipo","param_type":"IN","value":tipoPersona}
            ]}
        };
        $.blockUI();
        var obj=DreamFactory.api[CONFIG.SERVICEGENESIS].callStoredProcWithParams(data);
        obj.success(function(response){
            $.unblockUI();
            if(response.length > 0){
                if(tipoPersona == "N")
                {
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" 	: response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" 	: response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var szona       =   "DISTRITO";

                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                    //OBLIGATORIOS
                    $scope.datos.INT_AC_SUPERFICIE	=	response[0].superficie;
                    $scope.datos.INT_AC_CAPACIDAD	=	response[0].capacidad;

                    try{
                        smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                        szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}

                    $scope.datos.INT_AC_HR_INICIO   =	hinicio;
                    $scope.datos.INT_AC_HR_FINAL    =	hfinal;
                    $scope.datos.INT_AC_ESTADO      =	response[0].AE_establecimiento;
                    $scope.datos.INT_AC_MACRO       =	smacro;
                    $scope.datos.INT_AC_ZONA        =	szona;
                    $scope.datos.INT_AC_TIP_VIA     =	response[0].Tipo_Via;
                    $scope.datos.INT_AC_NOMBRE_VIA  =	response[0].via_ae;

                    //OPCIONALES
                    $scope.datos.INT_AC_NUMERO      =	response[0].numero_ae;
                    $scope.datos.INT_AC_EDIFICIO    =	response[0].edificio_ae;
                    $scope.datos.INT_AC_BLOQUE      =	response[0].bloque_ae;
                    $scope.datos.INT_AC_PISO        =	response[0].piso_ae;
                    $scope.datos.INT_AC_NUME        =	response[0].departamento_ae;
                    $scope.datos.INT_AC_CEL         =	"";
                    $scope.datos.INT_AC_TEL         =	response[0].telefono_ae;
                    $scope.datos.INT_AC_COR         =	"";

                    //CAMPOS OCULTOS
                    $scope.datos.INT_AC_MACRO_ID    =	response[0].IdMacroDistrito;
                    $scope.datos.INT_VIA            =	response[0].idzona_ae;
                }
                else
                {
                    tipoPersona = "J";
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" 	: response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" 	: response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var szona       =   "DISTRITO";

                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                    //OBLIGATORIOS
                    $scope.datos.INT_AC_SUPERFICIE	=	response[0].superficie;
                    $scope.datos.INT_AC_CAPACIDAD	=	response[0].capacidad;

                    try{
                        smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                        szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}

                    $scope.datos.INT_AC_HR_INICIO   =	hinicio;
                    $scope.datos.INT_AC_HR_FINAL    =	hfinal;
                    $scope.datos.INT_AC_ESTADO      =	response[0].AE_establecimiento;
                    $scope.datos.INT_AC_MACRO       =	smacro;
                    $scope.datos.INT_AC_ZONA        =	szona;
                    $scope.datos.INT_AC_TIP_VIA     =	response[0].Tipo_Via;
                    $scope.datos.INT_AC_NOMBRE_VIA  =	response[0].via_ae;

                    //OPCIONALES
                    $scope.datos.INT_AC_NUMERO      =	response[0].numero_ae;
                    $scope.datos.INT_AC_EDIFICIO    =	response[0].edificio_ae;
                    $scope.datos.INT_AC_BLOQUE      =	response[0].bloque_ae;
                    $scope.datos.INT_AC_PISO        =	response[0].piso_ae;
                    $scope.datos.INT_AC_NUME        =	response[0].departamento_ae;
                    $scope.datos.INT_AC_CEL         =	"";
                    $scope.datos.INT_AC_TEL         =	response[0].telefono_ae;
                    $scope.datos.INT_AC_COR         =	"";

                    //CAMPOS OCULTOS
                    $scope.datos.INT_AC_MACRO_ID    =	response[0].IdMacroDistrito;
                    $scope.datos.INT_VIA            =	response[0].idzona_ae;
                }
                //INT_TRAMITE_RENOVA
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                $scope.datos.INT_TRAMITE_RENOVA     =	tramite.IdActividad;
                setTimeout(function(){
                    $scope.actulizarIdDistrito();
                    $scope.distritoZonas(smacro);
                },2000);
            }
        })
        obj.error(function(response){
            $.unblockUI();
            sweet.show('', "Datos no Encontrados !!!", 'warning');
        });
    };

    $scope.listarAE = function () {

        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis       =	((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        if(sNumeroRegistros > 0 ){
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            if(tipoPersona == "NATURAL")
            {
                tipoPersona = "N";
            }
            else
            {
                tipoPersona = "J";
            }
            var paramPersonaJuridica = {
                "procedure_name":"AE.spCActividadEconomicaContribuyenteSimgep",
                "body":{"params": [
                    {"name":"idContribuyente","param_type":"IN","value":idContribuyente},
                    {"name":"tipo","param_type":"IN","value":tipoPersona}
                ]}
            };
            $.blockUI();
            var obj=DreamFactory.api[CONFIG.SERVICEGENESIS].callStoredProcWithParams(paramPersonaJuridica);
            obj.success(function(response){
                $.unblockUI();
                if(response.length > 0){
                    //PRETUNTAR Y LISTAR, SOLO LOS TRÁMITES EN LINEA DE INTERNET
                    $scope.formDatosAE  =   true;
                    $scope.mostrarMsgActividadTrue  = true;
                    $scope.mostrarMsgActividadFalse = false;
                    $scope.trmUsuario = response;
                    var data = response;   //grabamos la respuesta para el paginado
                    $scope.tblTramites.reload();

                }else{
                    $scope.mostrarMsgActividadTrue  = false;
                    $scope.mostrarMsgActividadFalse = true;
                    $scope.formDatosAE  =   false;
                }
            })
            obj.error(function(response){
                $.unblockUI();
                sweet.show('', "Datos no Encontrados !!!", 'warning');
            });
        }else{
            //$scope.txtMsgConexionGen
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.formDatosAE  =   false;
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica.";
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

    $scope.actulizarIdDistrito  =   function(){
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = $scope.datos.INT_AC_ZONA;

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
    };

    //ACTUALIZANDO CAMPOS PARA EL CASO DE RENOVACION DE LICENCIAS
    $scope.actulizarIdDistritoRenovacion  =   function(idAcZona){
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = idAcZona;
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
    };



    $scope.seleccionarTipoCategoria     =   function(categoria){
        var tipoCategoria       =   "";
        var sTipoCategoriaDesc  =   "";
        switch(categoria) {
            case "INTA_INT_JUE":
                tipoCategoria       =   61;
                sTipoCategoriaDesc  =   "INTERNETS Y JUEGOS EN RED";
                break;
            case "INTB_COM":
                tipoCategoria   =   62;
                sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                break;
            case "INTB_PUB":
                tipoCategoria   =   62;
                sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                break;
            case "INTJ_MCE":
                tipoCategoria   =   62;
                sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                break;
            case "INTJ_MEC":
                tipoCategoria   =   62;
                sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                break;
            default:
            text = "NO TIENE TIPO";
        }

        //datos.INT_TIPO_LICENCIA
        //INT_CAT_AGRUPADA
        $scope.datos.INT_TIPO_LICENCIA  =   3;
        $scope.datos.INT_TIPO_LICENCIA_DESCRIPCION  =   'JUEGOS DE ENTRETENIMIENTO Y CENTROS DE TELECOMUNICACIONES';
        $scope.datos.INT_CAT_AGRUPADA               =   tipoCategoria;
        $scope.datos.INT_CAT_AGRUPADA_DESCRIPCION   =   sTipoCategoriaDesc;
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
    //google.maps.visualRefresh = true;
    $scope.map = {
        center: {
            latitude: -16.495833,
            longitude: -68.133749
        },
        control:{},
        zoom: 16,
        events: {
            tilesloaded: function (map, eventName, originalEventArgs) {
                //map is trueley ready then this callback is hit
            },
            click: function (mapModel, eventName, originalEventArgs) {
                $scope.lat = originalEventArgs[0].latLng.lat();
                $scope.lng = originalEventArgs[0].latLng.lng();
                $scope.datos.INT_AC_latitud = $scope.lat;
                $scope.datos.INT_AC_longitud = $scope.lng;
                $scope.irUbicacionLugar(originalEventArgs[0].latLng.lat(),originalEventArgs[0].latLng.lng());
                if(activarClick)
                {
                }
            }
        },
        markers: [],
        markers3: [],
        clickedMarker: {
            id: 0,
            title: ''
        },
        marker: {
            events: {
                click: function (marker) {
                    marker.showWindow = true;
                    $scope.$apply();
                },
                dblclick: function (marker) {
                    alert("Double Clicked!");
                }
            }
        },
        refresh: function () {
            $scope.map.control.refresh(origCenter);
        }
    };
    $scope.irUbicacionLugar = function(lat,lng) {
        //var posicion = $scope.selectedItem;
        var latitudAA = lat;
        var longitudAA =lng;
        var mapaObject1 = new Object();
        var mapaObjectFinal1 = new Array();
        mapaObject1 = new Object();
        mapaObject1.id = 1;//Math.floor((Math.random() * 10) + 1);
        mapaObject1.latitude = latitudAA;
        mapaObject1.longitude = longitudAA;
        mapaObjectFinal1[0] = mapaObject1;
        markers3 = mapaObjectFinal1;
        $timeout(function () {
            $scope.map.markers3 = markers3;
            $scope.map.control.refresh({latitude: latitudAA, longitude: longitudAA});
        }, 100);
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
        var resFormulario = {
            container:url,
            file_path:nombre,
            body:blob
        };
        DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("Error submit imagen Base 64", results);
        });
    }
    $scope.capturarImagen= function(){
        var latitud = $scope.lat;
        var longitud = $scope.lng;
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
            var Imagen = base64Img.replace(/data:image\/png;base64,/i,'');
            $scope.Imagenb = Imagen;
            var sDirTramite = $rootScope.tramiteId;
            $scope.url = "RC_CLI/"+ sDirTramite;
            $scope.archivo1 = sDirTramite+"imagen1.jpg";
            $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
            $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL+"/files/"+$scope.url + "/"+ $scope.archivo1 + "?app_name=todoangular";
            $scope.map.control.refresh();
            $scope.map();
        });
    }
    //****************************************************************************************************************************************************************

 $scope.model = {
        TER_NNA_VIAJAN: [],
        selected: {}
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (nna) {//alert(1259);  
		$scope.model.TER_NNA_VIAJAN=$scope.ninosviajan.TER_NNA_VIAJAN;//**********************Maritza
        if (nna.id === $scope.model.selected.id) return 'edit';
        else return 'display';
 
   };

    $scope.editnna = function (nna) {
        $scope.model.selected = angular.copy(nna);
    };

    $scope.savenna = function (idx) {
		if(document.getElementById('f01_NNA_G_ARCH').value)
		{
			var multi_datos = document.getElementById('f01_NNA_G_ARCH');//document.signupForm.elements;
				if(multi_datos.files[0] === undefined){
				}
				else{
				$scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ sessionService.get('IDCIUDADANO')+ "/";
				//  alert( multi_datos.name);
					var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
					$scope.model.selected.f01_NNA_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
				}
				
			$scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
			$scope.reset();
			$scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;//**********************Maritza
		}
		else { //sweet.show('', 'Cargie el archivo de su CI', 'error');
        $scope.model.TER_NNA_VIAJAN[idx] = angular.copy($scope.model.selected);
        $scope.reset();
		$scope.ninosviajan.TER_NNA_VIAJAN = $scope.model.TER_NNA_VIAJAN;//**********************Maritza
      }
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };
    $scope.addnna = function () {	
	if(!$scope.ninosviajan.TER_NNA_VIAJAN) 	$scope.ninosviajan.TER_NNA_VIAJAN=[];
    var countNNA= $scope.ninosviajan.TER_NNA_VIAJAN.length+1;
	$scope.contador1= countNNA;
	$scope.model.TER_NNA_VIAJAN=$scope.ninosviajan.TER_NNA_VIAJAN;
   			 //alert(countNNA);
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
		f01_NNA_G_ARCH: ""
	};		
        $scope.model.TER_NNA_VIAJAN.push(nna);
        $scope.editnna(nna);
    };

//******************* MODEL GRILLA ADULTOS*****************************

     $scope.modelResp = {
        TER_RESP: [],
        selectedR: {}
    };
    $scope.getTemplateResp = function (resp) {
		$scope.modelResp.TER_RESP=$scope.ninosviajan.TER_RESP; //**********************Maritza
        if (resp.id === $scope.modelResp.selectedR.id) return 'editR';
        else return 'displayR';
    };

    $scope.editresp = function (resp) {
        $scope.modelResp.selectedR = angular.copy(resp);
    };

    $scope.saveresp = function (idx) {
		if(document.getElementById('f01_ADUL_G_ARCH').value)
		{
			var multi_datos = document.getElementById('f01_ADUL_G_ARCH');
			if(multi_datos.files[0] === undefined){
			}
			else{
			$scope.direccionvirtual= CONFIG.APIURL+"/files/RC_CLI/"+ sessionService.get('IDCIUDADANO')+ "/";
			//  alert( multi_datos.name);
				var direccion = fileUpload.uploadFileToUrl(multi_datos.files[0], $scope.direccionvirtual);
				$scope.modelResp.selectedR.f01_ADUL_G_ARCH= $scope.direccionvirtual+ multi_datos.files[0].name + "?app_name=todoangular";
			}			
			$scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
			$scope.resetresp();
			$scope.ninosviajan.TER_RESP = $scope.modelResp.TER_RESP;
		}
		else  {//sweet.show('', 'Cargie el archivo de su CI', 'error');
      $scope.modelResp.TER_RESP[idx] = angular.copy($scope.modelResp.selectedR);
      $scope.resetresp();
      $scope.ninosviajan.TER_RESP = $scope.modelResp.TER_RESP;
      }
    };

    $scope.resetresp = function () {
        $scope.modelResp.selectedR = {};
    };
	
    $scope.addresp = function () {
		if(!$scope.ninosviajan.TER_RESP) 	$scope.ninosviajan.TER_RESP=[];
    var countR= $scope.ninosviajan.TER_RESP.length+1;  				
	$scope.modelResp.TER_RESP=$scope.ninosviajan.TER_RESP;  
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
			f01_ADUL_G_TELF: ""	,
			f01_ADUL_G_ARCH:""
        };
         $scope.modelResp.TER_RESP.push(resp);
         $scope.editresp(resp);
    };


    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
      try{ 
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
      }
      catch (e) { console.log("Error modal open", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
