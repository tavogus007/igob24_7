app.controller('publicidad1Controller', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window) {
    var fecha= new Date();    
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    
    // ******************************************************************************************
    //var fecha= new Date();
    //fecha.getFullYear() + "-" + mess + "-" + dia ;
    //$scope.fechaInicio=fechactual;
    // ******************************************************************************************
    var fechadato={"fechaInicioo": $scope.fechadatoo, "fechaFinn": $scope.fechactuall} 
    $scope.datosRol=fechadato;
    // ******************************************************************************************
    

    $scope.fromDate = "2016-04-01T04:00:00.000Z"; // <- [object Date]
    $scope.untilDate = "2016-04-08T04:00:00.000Z"; // <- [object Date]
    //$scope.btnGuardarForm   =   false;
     $scope.startDateOpen3 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened3 = true;
        $scope.startDateOpened13 = false;
        console.log("uno");
    };
    $scope.startDateOpen13 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened13 = true;
        $scope.startDateOpened3 = false;
        console.log("dos");
    };
    //*******************************************************************************************************
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
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
    
    $scope.getDatos=function(){
        $scope.estado_formulario = "sin_dato"; 
    };
    
    /* Bloquer de formulario */
    /*enviarFormProcesos*/
    /****************s1*********************/
      $scope.validarFormProcesos = function(datosForm){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = 4;
       var param = new reglasnegocio();
        param.id = 57;
        param.parametros='{"id":"'+ idTramite +'",frm_tra_enviado":"SI","frm_tra_id_usuario":"'+ idUsuario +'","frm_tra_modificado":"'+ fechactual +'"}';
        param.llamarregla(function(data){
        data = JSON.parse(results);
            $scope.tramitesCiudadano();
            $scope.bloquearBtnEnviarForm();
            sweet.show('', 'Formulario enviado correctamente !', 'success');
        });
    };
    
    /** envio de documento a  GAMLP**/
    /*$scope.envioProcesos = function(paramForm){
        console.log(paramForm);
        var datosNeXO = {};
        datosNeXO['INT_TIPO_CONTRIBUYENTE'] = paramForm.INT_TIPO_CONTRIBUYENTE
        datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
        datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
        datosNeXO['INT_NUM_DOC'] = paramForm.INT_NUM_DOC;
        datosNeXO['INT_EXP'] = paramForm.INT_EXP;
        datosNeXO['INT_CORREO'] = paramForm.INT_CORREO;
        datosNeXO['INT_TEL_CELULAR'] = paramForm.INT_TEL_CELULAR;
        datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
        datosNeXO['CI_BIGDATA'] = paramForm.CI_BIGDATA;
        datosNeXO['INT_PRIMER_NOMBRE'] = paramForm.INT_PRIMER_NOMBRE;
        datosNeXO['INT_PATERNO'] = paramForm.INT_PATERNO;
        datosNeXO['INT_MATERNO'] = paramForm.INT_MATERNO;
        datosNeXO['INT_FEC_NACIMIENTO'] = paramForm.INT_FEC_NACIMIENTO;
        datosNeXO['TIPO_TRAMITE'] = paramForm.TIPO;
        datosNeXO['INT_DENOMINACION'] = paramForm.INT_DENOMINACION;
        datosNeXO['INT_AC_SUPERFICIE'] = paramForm.INT_AC_SUPERFICIE;
        datosNeXO['INT_AC_HR_INICIO'] = paramForm.INT_AC_HR_INICIO;
        datosNeXO['INT_AC_HR_FINAL'] = paramForm.INT_AC_HR_FINAL;
        datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
        datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
        datosNeXO['INT_AC_ZONA'] = paramForm.INT_AC_ZONA;
        datosNeXO['INT_TIP_VIA'] = paramForm.INT_TIP_VIA;
        datosNeXO['INT_AC_NOMBRE_VIA'] = paramForm.INT_AC_NOMBRE_VIA;
        datosNeXO['INT_AC_NUMERO'] = paramForm.INT_AC_NUMERO;
        datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
        datosNeXO['INT_AC_BLOQUE'] = paramForm.INT_AC_BLOQUE;
        datosNeXO['INT_AC_PISO'] = paramForm.INT_AC_PISO;
        datosNeXO['INT_AC_NUME'] = paramForm.INT_AC_NUME;
        datosNeXO['INT_AC_TEL'] = paramForm.INT_AC_TEL;
        datosNeXO['INT_AC_COR'] = paramForm.INT_AC_COR;
        datosNeXO['INT_AC_CAPACIDAD'] = paramForm.INT_AC_CAPACIDAD;
        console.log(datosNeXO);
        $.ajax({ 
            data: datosNeXO, 
            url: 'http://gmlppc12345/sysworkflow/en/neoclassic/p247/services/WSPlataforma.php',             
            type: 'post', 
            beforeSend: function () {                     
            }, 
            success: function (response) {                     
                sweet.show('', 'Formulario enviado al G.A.M.L.P...', 'success');
                $scope.tramitesCiudadano();
                $scope.bloquearForm();
            }
        }); 
    };*/
    
    /*envioProcesos*/
    
    $scope.enviarFormProcesos = function(paramForm){
        
        $scope.btnEnviarForm   =   true;
        
        var idProcodigo         =   'AE-ELI-';
        var datosNeXO = {};
        
        //ELIGIENDO EL TIPO DE PROCESO
        switch(paramForm.INT_ACTIVIDAD) {
            case "INTA_INT_JUE":
                    switch(paramForm.TIPO) {
                        case "EMISION":
                            idProcodigo =   'AE-ELI-';
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
                        idProcodigo =   'AE-ELI-';
                        break;
                    case "RENOVACION":
                        idProcodigo =   'AE-RLI-';
                        break;                          
                    default:
                    text = "NO TIENE TIPO";                    
                }
                datosNeXO['AE_SW_TIPO']    =   'AUTORIZACION';
                datosNeXO['TIPO_TRAMITE']   =   "AE_INT_EMISION";
                //datosNeXO['TIPO_TRAMITE']   =   "AE_INT_" + paramForm.TIPO;
              break;
            case "INTB_PUB":
                switch(paramForm.TIPO) {
                    case "EMISION":
                        idProcodigo =   'AE-ELI-';
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
        console.log("DATA FORMULARIO EN LINEA:",  idProcodigo);
        console.log("DATA FORMULARIO EN LINEA:",  datosNeXO);
        
        if (paramForm.INT_TIPO_CONTRIBUYENTE == 'NATURAL' ){
            datosNeXO['INT_TIPO_CONTRIBUYENTE'] = paramForm.INT_TIPO_CONTRIBUYENTE;
            datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['INT_NUM_DOC'] = paramForm.INT_NUM_DOC;
            datosNeXO['INT_EXP'] = paramForm.INT_EXP;
            datosNeXO['INT_CORREO'] = paramForm.INT_CORREO;
            datosNeXO['INT_TEL_CELULAR'] = paramForm.INT_TEL_CELULAR;
            datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA'] = paramForm.CI_BIGDATA;
            datosNeXO['INT_PRIMER_NOMBRE'] = paramForm.INT_PRIMER_NOMBRE;
            datosNeXO['INT_PATERNO'] = paramForm.INT_PATERNO;
            datosNeXO['INT_MATERNO'] = paramForm.INT_MATERNO;
            datosNeXO['INT_FEC_NACIMIENTO'] = paramForm.INT_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD'] = paramForm.INT_ACTIVIDAD;
            
            datosNeXO['INT_DENOMINACION'] = paramForm.INT_DENOMINACION;
            datosNeXO['INT_AC_SUPERFICIE'] = paramForm.INT_AC_SUPERFICIE;
            datosNeXO['INT_AC_HR_INICIO'] = paramForm.INT_AC_HR_INICIO;
            datosNeXO['INT_AC_HR_FINAL'] = paramForm.INT_AC_HR_FINAL;
            datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
            datosNeXO['INT_AC_ZONA'] = paramForm.INT_AC_ZONA;
            datosNeXO['INT_TIP_VIA'] = paramForm.INT_TIP_VIA;
            datosNeXO['INT_AC_NOMBRE_VIA'] = paramForm.INT_AC_NOMBRE_VIA;
            datosNeXO['INT_AC_NUMERO'] = paramForm.INT_AC_NUMERO;
            datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
            datosNeXO['INT_AC_BLOQUE'] = paramForm.INT_AC_BLOQUE;
            datosNeXO['INT_AC_PISO'] = paramForm.INT_AC_PISO;
            datosNeXO['INT_AC_NUME'] = paramForm.INT_AC_NUME;
            datosNeXO['INT_AC_CEL'] = paramForm.INT_AC_CEL;
            datosNeXO['INT_AC_TEL'] = paramForm.INT_AC_TEL;
            datosNeXO['INT_AC_COR'] = paramForm.INT_AC_COR;
            datosNeXO['INT_AC_CAPACIDAD'] = paramForm.INT_AC_CAPACIDAD;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['INT_ACTIVIDAD_DESCRIPCION'] = document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
            datosNeXO['INT_AC_MACRO_ID'] = $scope.idMacro;            
            
            //DATOS FALTANTES DEL CONTRIBUYENTE
            
            datosNeXO['INT_MACRO']                  =   paramForm.INT_MACRO;      
            datosNeXO['INT_ZONA']                   =   paramForm.INT_ZONA;                                      
            datosNeXO['INT_VIA']                    =   paramForm.INT_VIA;        
            datosNeXO['INT_NOMBRE_VIA']             =   paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_NUM']                    =   paramForm.INT_NUM;
            datosNeXO['INT_EDIF']                   =   paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE']                 =   paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO']                   =   paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP']                =   paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET']                =   paramForm.INT_DIR_DET;
            
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;
            
            datosNeXO['INT_TIPO_LICENCIA']               =  paramForm.INT_TIPO_LICENCIA;
            datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION']   =  paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
            datosNeXO['INT_CAT_AGRUPADA']                =  paramForm.INT_CAT_AGRUPADA;
            datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION']    =  paramForm.INT_CAT_AGRUPADA_DESCRIPCION;
            
        } else {
            datosNeXO['INT_TIPO_CONTRIBUYENTE'] = paramForm.INT_TIPO_CONTRIBUYENTE;
            datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['INT_NUM_DOC'] = paramForm.INT_NUM_DOC;
            datosNeXO['INT_EXP'] = paramForm.INT_EXP;
            datosNeXO['INT_CORREO'] = paramForm.INT_CORREO;
            datosNeXO['INT_TEL_CELULAR'] = paramForm.INT_TEL_CELULAR;
            datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA'] = paramForm.CI_BIGDATA;
            //datosNeXO['INT_PRIMER_NOMBRE'] = paramForm.INT_PRIMER_NOMBRE;
            //datosNeXO['INT_PATERNO'] = paramForm.INT_PATERNO;
            //datosNeXO['INT_MATERNO'] = paramForm.INT_MATERNO;
            datosNeXO['INT_FEC_NACIMIENTO'] = paramForm.INT_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD'] = paramForm.INT_ACTIVIDAD;

            datosNeXO['INT_DENOMINACION'] = paramForm.INT_DENOMINACION;
            datosNeXO['INT_AC_SUPERFICIE'] = paramForm.INT_AC_SUPERFICIE;
            datosNeXO['INT_AC_HR_INICIO'] = paramForm.INT_AC_HR_INICIO;
            datosNeXO['INT_AC_HR_FINAL'] = paramForm.INT_AC_HR_FINAL;
            datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
            datosNeXO['INT_AC_ZONA'] = paramForm.INT_AC_ZONA;
            datosNeXO['INT_TIP_VIA'] = paramForm.INT_TIP_VIA;
            datosNeXO['INT_AC_NOMBRE_VIA'] = paramForm.INT_AC_NOMBRE_VIA;
            datosNeXO['INT_AC_NUMERO'] = paramForm.INT_AC_NUMERO;
            datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
            datosNeXO['INT_AC_BLOQUE'] = paramForm.INT_AC_BLOQUE;
            datosNeXO['INT_AC_PISO'] = paramForm.INT_AC_PISO;
            datosNeXO['INT_AC_NUME'] = paramForm.INT_AC_NUME;
            datosNeXO['INT_AC_CEL'] = paramForm.INT_AC_CEL;
            datosNeXO['INT_AC_TEL'] = paramForm.INT_AC_TEL;
            datosNeXO['INT_AC_COR'] = paramForm.INT_AC_COR;
            datosNeXO['INT_AC_CAPACIDAD'] = paramForm.INT_AC_CAPACIDAD;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['INT_RL_NIT'] = paramForm.INT_RL_NIT;
            datosNeXO['INT_RL_RAZON_SOCIAL'] = paramForm.INT_RL_RAZON_SOCIAL;
            datosNeXO['INT_RL_TIPO_DOCUMENTO'] = paramForm.INT_RL_TIPO_DOCUMENTO;
            datosNeXO['INT_RL_FEC_EMISION_DOCUMENTO'] = paramForm.INT_RL_FEC_EMISION_DOCUMENTO;
            datosNeXO['INT_RL_NUM_DOCUMENTO'] = paramForm.INT_RL_NUM_DOCUMENTO;
            datosNeXO['INT_RL_FEC_CREACION_FUNDEMPRESA'] = paramForm.INT_RL_FEC_CREACION_FUNDEMPRESA;
            datosNeXO['INT_RL_PRIMER_NOMBRE'] = paramForm.INT_RL_PRIMER_NOMBRE;
            datosNeXO['INT_RL_PATERNO'] = paramForm.INT_RL_PATERNO;
            datosNeXO['INT_RL_MATERNO'] = paramForm.INT_RL_MATERNO;
            datosNeXO['INT_RL_CASADA'] = paramForm.INT_RL_CASADA;
            datosNeXO['INT_RL_FEC_NACIMIENTO'] = paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD_DESCRIPCION'] = document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
            datosNeXO['INT_AC_MACRO_ID'] = $scope.idMacro;
            
            //DATOS FALTANTES DEL CONTRIBUYENTE - REPRESENTANTE LEGAL
            
            datosNeXO['INT_MACRO']                  =   paramForm.INT_MACRO;      
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
            datosNeXO['INT_NUM_NOTARIA']                 =  paramForm.INT_NUM_NOTARIA;
            datosNeXO['INT_NACIONALIDAD']                =  paramForm.INT_NACIONALIDAD;
            datosNeXO['INT_RL_FEC_NACIMIENTO']           =  paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['INT_NIT']                         =  paramForm.INT_NIT;
            
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;    
            
            datosNeXO['INT_TIPO_LICENCIA']               =  paramForm.INT_TIPO_LICENCIA;
            datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION']   =  paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
            datosNeXO['INT_CAT_AGRUPADA']                =  paramForm.INT_CAT_AGRUPADA;
            datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION']    =  paramForm.INT_CAT_AGRUPADA_DESCRIPCION;            
        }
        
        console.log("DATOS A SER ENVIADOS:", datosNeXO);
        console.log("DATOS INCIALES DEL PROCESO:", $scope.datosIniciales);
        
        
        //DATOS DE LA ACTIVIDAD ECONOMICA
        if($scope.dataGenesisCidadano){
            if($scope.dataGenesisCidadano.length > 0){
                console.log("datos del ciudadano 10", $scope.dataGenesisCidadano);            
                datosNeXO['INT_PMC'] = $scope.dataGenesisCidadano[0].padron;
            }
        }
        
        if($scope.datos){
            //datosNeXO['ARCHIVOS_MULTIPLES'] = $scope.datos.ARCHIVOS_MULTIPLES;
        }
        
        console.log(datosNeXO);
        var sIdTramite = $rootScope.tramiteId;
        console.log("DATA TRAMITE EN LINEA:", datosNeXO );
        var datosSerializados = JSON.stringify(datosNeXO);       
        
        console.log("TRAMITE ID:",sIdTramite);
        
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
                console.log("RESPUESTA FORM:", results[0].sp_pmfunction2);
                $.unblockUI();                
                //$scope.btnEnviarForm   =   false;
                //console.log("RESPUESTA FORM:", JSON.parse(results[0].sp_pmfunction2));
            }else{
                $.unblockUI();                
                $scope.msg = "Error !!";
            }
        }).error(function(results){
                $.unblockUI();            
        });
    };
    
    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosMultiples = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction2;
        var aDatosCaso      = sdataArchivo.split(',');
        
        $scope.archivosMultiples    =   JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES);
        $scope.docsistema           =   'GENESIS';
        $scope.sIdProcesoActual     =   aDatosCaso[3];//datosCaso.idProceso;// 1;
        $scope.sCasoNro             =   aDatosCaso[1];//datosCaso.sNrocaso//49;
        $scope.sCasoNombre          =   '15 - ADJUNTOS';        
        //var datosSerializados = JSON.stringify(datosNeXO);        
        //console.log("DATA ARCHIVOS MULTIPLES:", $scope.archivosMultiples);        
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
            console.log("Archivos almacenados correctamente..");
        }).error(function(error) {
        });
    };
    
    /****************************************************************/
    //$scope.guardar = function(data){    
    $scope.enviarFormProcesos55 = function(data){
        console.log("ARCHIVOS:", $scope.datos.ARCHIVOS_MULTIPLES);     
        $scope.sIdProcesoActual = '1';
        $scope.sCasoNro = '49';
        $scope.sCasoNombre        ='15 - ADJUNTOS';
        var cadenaURL = uploadUrl + file.name + '?app_name=' + CONFIG.APP_NAME;        
        var cadenaURI = $scope.direccionvirtual +"/" + file.name;
        //tipo[1] //tipo documento
        var datosUpload = {};  
        /*if (data.tipificacion==1){
          ////  
        }
        */
        var usuId = sessionService.get('USUARIO');
        var ressubirU = new reglasnegocio();
        ressubirU.id = 83;
        ressubirU.parametros = '{"doc_sistema":"GENESIS","doc_proceso":"' + $scope.sIdProcesoActual + '","doc_id":"' + $scope.sCasoNro + '","doc_ci_nodo":"' + $scope.sCasoNombre + '", "doc_datos":"", "doc_version":1,"doc_tiempo":"","doc_firma_digital":0,"doc_acceso":"","doc_tamanio_documento":"0","doc_tps_doc_id":"' + data.vtps_doc_id + '","doc_tipo_documentacion":"U","doc_tipo_ingreso":"I","doc_estado_de_envio":"N","doc_correlativo":"", "doc_tipo_documento_ext":"","doc_nrotramite_nexo":"","doc_id_carpeta":"' + $scope.padreIdcarpeta + '","doc_usuario":"' + usuId + '","doc_estado":"A","doc_url":"' + cadenaURI + '","doc_url_logica":"' + cadenaURL + '", "doc_nombre":"' + nombreFile + '","doc_tipo_documento":"' + tipo[1] + '"}';
        ressubirU.llamarregla(function(data){
        data = JSON.parse(data);    
            $.unblockUI(); 
            $scope.datosArchi='';
            $scope.myFile=''
            $scope.getArchivosAdjuntos();  
        })
    };
    /****************************************************************/    
    $scope.macrodistritos = function(){        
        $scope.aMacrodistritos = {};
        var smacrodistrito   = new reglasnegocio();
        smacrodistrito.id = 24;
        smacrodistrito.parametros = '{}';
        smacrodistrito.llamarregla(function(results){
        results = JSON.parse(results);
            if(results.length > 0){
                $scope.aMacrodistritos = results;
            }else{
                $scope.msg = "Error !!";
            }             
        });
    };
    /*******************************************************/
    $scope.distritoZonas = function(idMacroJ){
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                console.log(value.mcdstt);
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });                  
        }
        $scope.idMacro = idMacro;
        console.log("macro:", idMacro);
        $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        //console.log(idMacro);
        $scope.aDistritoZona = {};
        var distritoZonas  = new reglasnegocio();
        distritoZonas.id = 34;
        distritoZonas.parametros = '{"dist_macro_id":"' + idMacro + '"}';
        distritoZonas.llamarregla(function(results){
        results = JSON.parse(results);      
            if(results.length > 0){
                $scope.aDistritoZona = results;                
                console.log("ZONAS:", $scope.aDistritoZona);                
            }else{
                $scope.msg = "Error !!";
            }             
        });
    };
    /*******************************************************/
    $scope.recuperarInfo = function(){
            sIdTramite = sessionService.get('IDTRAMITE');
            sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
            sIdServicio = sessionService.get('IDSERVICIO');
            var datosform = {};
            if(sIdCiudadano){
             var datosCiudadano = new reglasnegocio();
             datosCiudadano.id = 39;
             datosCiudadano.parametros = '{"sidciudadano":"'+ sIdCiudadano + '"},{"sidservicio":"' + sIdServicio + '"},{"sidtramite":"'+ sIdTramite + '"}';
             datosCiudadano.llamarregla(function(results){ 
                results = JSON.parse(results);
                if(results.length > 0){
                    datosform = JSON.parse(results[0].form_contenido);
                    $scope.datosform =datosform;
                    console.log($scope.datosform);
                } else {
                    console.log("No debe borrarse nada");  
                    sessionService.set('IDTRAMITE', sIdTramite);                
                }
            });
         }else{
            alert("No existe id ciudadano");
        }
    };
    /**********************************************************/
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
        console.log($scope.datos);
    };
    
    $scope.cambiarFile2 = function(obj2, valor){
        //alert("123");
        //$scope.datos[obj.name] = valor;        
        //console.log($scope.datos);
        console.log(obj2);
        console.log(valor);
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
    //desde aca sirve
    //iniciando el controlador
    $scope.$on('api:ready',function(){
        $scope.getDatos();  
        $scope.macrodistritos();
        $scope.inciarUpload();
        // publicidad
        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
    });
    $scope.inicioPublicidad = function () {
        if(DreamFactory.isReady()){
            $scope.getDatos();  
            $scope.macrodistritos();
            $scope.inciarUpload();
            // publicidad
            $scope.lscategoria();
            $scope.lssubcategoria();
            $scope.lsCaracteristica();
        }
    }; 

    $scope.inciarUpload =   function(){        
        try{
          $('#multiDocsButon').click(function(){                
                $('#multiDocsFile').click();
          });
        }catch(e){}    
    };
    
    var clsInicioInternet = $rootScope.$on('inicioInternetRc', function(event, data){
        //$scope.datos.INT_TIPO_CONTRIBUYENTE = 'NATURAL';
        //$scope.tipoPersona($scope.datos.INT_TIPO_CONTRIBUYENTE);
    });    
    
    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        
        console.log("INCIANDO DATA:->", data);
        /*************** distritos_zonas **********************/ 
        if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            var idMacro =   data.INT_AC_MACRO_ID;
            $scope.aDistritoZona = {};  

            var aDistritoZona   = new reglasnegocio();
            aDistritoZona.id = 34;
            aDistritoZona.parametros = '{"dist_macro_id":"' + idMacro + '"}';    
            aDistritoZona.llamarregla(function(results){    
            results = JSON.parse(results);
                if(results.length > 0){
                    $scope.aDistritoZona = results;
                }else{
                    $scope.msg = "Error !!";
                }             
            });            
        }
        /*******************************************************/
        if(typeof(data.idcate) != 'undefined'){
            $scope.TipoLetrero={};
            var idcate = data.idcate;
            var parametros = {
                "procedure_name":"pub.sp_tipoletrero_general",
                "body":{"params": [
                    {"name":"idcategoria","param_type":"IN","value":idcate}
                ]}
            };
            DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
                if(response.length > 0){
                    $scope.TipoLetrero = response;
                }else{
                    $scope.msg = "Error !!";
                }             
            }).error(function(results){
            });
        }
        if(typeof(data.idcarac) != 'undefined'){
            $scope.lCaracteristica = {};
            var idcaracc = data.idcarac;
            console.log(idcaracc);
            var parametros = {
                "procedure_name":"pub.sp_letrero_caracteristica",
                "body":{"params": [
                    {"name":"p_idtipoletrero","param_type":"IN","value":idcaracc}
                ]}
            };
            DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
                if(response.length > 0){
                    $scope.lCaracteristica = response;
                    //console.log($scope.lCaracteristica);
                }else{
                    $scope.msg = "Error !!";
                }             
            }).error(function(results){
            });
        }


    });
    
    $scope.$on('$destroy', function() {
        clsValidarBtnEnviar();                
        clsIniciarCamposInternet();        
        //clsValidarBtnInternet();
        //clsInicioInternet();
        //clsValidarBtnInternet();
        //clsInicioInternet();        
    });
    
    
    /*INTERNET EN LINEA*/
    $scope.tblActividaEco        =   {};
    $scope.lstActividadEco       =   [];
    $scope.formDatosAE           =  false;        
    
    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];     
    
    $scope.selActividadEconomica =  function(tramite){
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
        var obj=DreamFactory.api[CONFIG.SERVICEGENESIS].callStoredProcWithParams(data);
        obj.success(function(response){
            if(response.length > 0){
                if(tipoPersona == "NATURAL")
                {
                    tipoPersona = "N";
                    $scope.datos.INT_DENOMINACION   =   "jeubos";
                }
                else
                {
                    tipoPersona = "J";
                    $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                    //OBLIGATORIOS
                    $scope.datos.INT_AC_SUPERFICIE  =   response[0].superficie;
                    $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;
                    $scope.datos.INT_AC_HR_INICIO   =   "";
                    $scope.datos.INT_AC_HR_FINAL    =   "";
                    $scope.datos.INT_AC_ESTADO      =   "";

                    $scope.datos.INT_AC_MACRO       =   response[0].MacroDistrito;
                    $scope.datos.INT_AC_ZONA        =   response[0].zona_ae;
                    $scope.datos.INT_TIP_VIA        =   response[0].Tipo_Via;
                    $scope.datos.INT_AC_NOMBRE_VIA  =   response[0].via_representante;

                    //OPCIONALES
                    $scope.datos.INT_AC_NUMERO      =   response[0].numero_ae;
                    $scope.datos.INT_AC_EDIFICIO    =   response[0].edificio_ae;
                    $scope.datos.INT_AC_BLOQUE      =   response[0].bloque_ae;
                    $scope.datos.INT_AC_PISO        =   response[0].piso_ae;
                    $scope.datos.INT_AC_NUME        =   response[0].numero_ae;
                    $scope.datos.INT_AC_CEL         =   "";
                    $scope.datos.INT_AC_TEL         =   response[0].telefono_ae;
                    $scope.datos.INT_AC_COR         =   "";
                }
            }
        })
        obj.error(function(response){  
            sweet.show('', "Datos no Encontrados !!!", 'warning');            
        });        
    };
    
    //validarActividadEco(datos.TIPO);
    $scope.listarAE = function () {        
        //console.log("DATA GENESSI LENGTH:", $scope.dataGenesisCidadano.length);        
        var sNumeroRegistros  = $scope.dataGenesisCidadano.length;
        console.log("TIPO OBJ RC LISTAR AE:", sNumeroRegistros);
        
        if(sNumeroRegistros > 0){
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

            var obj=DreamFactory.api[CONFIG.SERVICEGENESIS].callStoredProcWithParams(paramPersonaJuridica);
            obj.success(function(response){
                /*console.log("referencial", response);
                $scope.obtDatosRef = response*/                
                /*$scope.lstActividadEco  = response; 
                var data                = response;   //grabamos la respuesta para el paginado
                $scope.tblActividaEco.reload();  */                
                console.log("RESULTADO:", response);            
                $scope.trmUsuario = response; 
                var data = response;   //grabamos la respuesta para el paginado
                $scope.tblTramites.reload();
                
            })
            obj.error(function(response){  
                sweet.show('', "Datos no Encontrados !!!", 'warning');
                $.unblockUI();
            });
        }else{
            console.log("EL CONTRIBUYENTE NO POSEE ACTIVIDAD ECONOMICA");
            $scope.formDatosAE  =   false;
        }
    };
    
    $scope.tblTramites = new ngTableParams({
        page: 1,          
        count: 4,
        filter: {},
        sorting: {}
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.trmUsuario, params.filter()) :
            $scope.trmUsuario;              
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            //$scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));             
        }
    });
    
    /*$scope.tblActividaEco = new ngTableParams({
        page: 1,          
        count: 4,
        filter: {},
        sorting: {}
    }, {
        total: $scope.lstActividadEco.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.lstActividadEco, params.filter()) :
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            params.total($scope.lstActividadEco.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                  
        }
    });*/
    
    $scope.validarActividadEco  =   function(stipo){        
        console.log("AE ECO:", stipo);
        switch(stipo) {
            case "EMISION":
                $scope.formDatosAE   =  false;
                break;                
            case "RENOVACION":
                $scope.formDatosAE   =  true;
                $scope.listarAE();
                break;
            case "MODIFICACION":
                $scope.formDatosAE   =  true;                
                $scope.listarAE();
                break;
            case "CANCELACION":
                $scope.formDatosAE   =  true;                    
                $scope.listarAE();
                break;
            default:
            text = "NO TIENE TIPO";                    
        }
    };        
    
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
        
        console.log("distrito:", idDistrito);
        console.log("distrito:", idZona);
        
        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.INT_ID_ZONA        =   idZona;
        
    };    
    
    $scope.seleccionarTipoCategoria     =   function(categoria){
        console.log("TIPO CATEGORIA:", categoria);
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
        console.log("registro ciudadano:", $scope.datos.INT_CAT_AGRUPADA);        
    }; 



    // datos de la la publicidad ******************************************************************************************************************************************************************   
     // *****************************    DATIOS PUBLICIDAD ->   categoria -> tipo de letrero  *****************************************************************************************************
    
    $scope.lscategoria = function(){
        $scope.DataCategoria = {};
        var parametros = {
            "procedure_name":"pub.sp_categorialetrero"
        };        
        DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
            if(response.length > 0){
                $scope.DataCategoria = response;
            }else{
                $scope.msg = "Error !!";
            }             
        }).error(function(results){
        });
    };


    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    $scope.fechactuall= dia+ "/"+mes+ "/"+ fecha.getFullYear() ;//+ " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.fechadatoo  = "01/01/1900";

    $scope.publi=[];
    //$scope.publi.FECHAINICIO=$scope.fechactuall;
    //$scope.publi.FECHAFIN=$scope.fechadatoo;
    $scope.lssubcategoria = function(){
        //$scope.publi=[];
        //$scope.carass = [];
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        /*$scope.TipoLetrero = {};
        var idcate = "";
        if($scope.DataCategoria){
            angular.forEach($scope.DataCategoria, function(value, key) {
                if(value.p_categoria == idcatee){
                    idcate = value.p_idcategoria;
                }
            });
        }
        $scope.datos.idcate=idcate;*/
        //console.log($scope.datos.idcate);
        var parametros = {
            //"procedure_name":"pub.sp_tipoletrero_general",
            "procedure_name":"pub.sp_tipoletrero"//,
            /*"body":{"params": [
                {"name":"idcategoria","param_type":"IN","value":idcate}
            ]}*/
        
        };
        DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
            if(response.length > 0){
                $scope.TipoLetrero = response;
                //console.log($scope.TipoLetrero);
            }else{
                $scope.msg = "Error !!";
            }             
        }).error(function(results){
        });
    };

    $scope.ltCaracteristica = function(idlee){
        $scope.lCaracteristica = {};
        var idcarac = "";
        if($scope.TipoLetrero){
            angular.forEach($scope.TipoLetrero, function(value, key) {
                if(value.p_descripcion == idlee){
                    idcarac = value.p_idtipoletrero;
                }
            });                  
        }
        //console.log(idlee);
        $scope.publi.idcarac=idcarac;
        //console.log("idTL -> ",idcarac);
        //console.log("idTL *> ",$scope.publi.idcarac);
        var parametros = {
            "procedure_name":"pub.sp_letrero_caracteristica",
            "body":{"params": [
                {"name":"p_idtipoletrero","param_type":"IN","value":idcarac}
            ]}
        };
        DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
            if(response.length > 0){
                $scope.lCaracteristica = response;
                //console.log($scope.lCaracteristica);
            }else{
                $scope.msg = "Error !!";
            }             
        }).error(function(results){
        });
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
        console.log(id_cara);
        $scope.publi.id_cara  =  id_cara;
    };

    $scope.lsCaracteristica = function(){
        $scope.lsTipovia = {};
        var parametros = {
            "procedure_name":"general.sp_catalogo",
            "body":{"params": [
                {"name":"clasificador","param_type":"IN","value":9}
            ]}
        };
        DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(parametros).success(function (response){
            if(response.length > 0){
                $scope.lsTipovia = response;
                //console.log($scope.lsTipovia);
            }else{
                $scope.msg = "Error !!";
            }             
        }).error(function(results){
        });
    };
    
    // detalles del elemento publicidad 
    //$scope.caras = [];
    $scope.detalle = [];
    $scope.edit = {};
    $scope.addUser = function(user){
        
        //if($scope.datos.caras.length>0){
        if($scope.carass =='' || $scope.carass == null || $scope.carass =="undefined" ){
            $scope.carass = [];
            //console.log("-*->",$scope.carass)
        }
        else{
            //$scope.carass = $scope.publi.caras;
            console.log("--*>",$scope.carass)
        }
        $scope.carass.push({
            //id      : user.id,
            desc    : user.desc,
            sup     : user.sup
        });
        //console.log($scope.carass);
        $scope.user = "";
        $scope.detalle = [];
        //$scope.actulizarCaras();
    };
    $scope.deleteUser = function(user){
        $scope.carass.splice( $scope.carass.indexOf(user), 1 );
    };
    $scope.editUser = function(user){
        delete $scope.edit[user.id];
    };
    $scope.showEdition = function($event, id){
        $scope.edit[id] = true;
        var input = angular.element($event.currentTarget).parent().find("input")[0];        
        setTimeout(function(){
            input.focus();
            input.select(); 
        }, 50);
        //$scope.actulizarCaras();
    };
    $scope.actulizarCaras= function () {
        $scope.publi.caras = $scope.carass;
        //console.log("*************",$scope.publi.caras);
    };
    $scope.adicionarpublicidad = function(public){
        //$scope.publi.caras = $scope.carass;
        //console.log(public);
        var id=0
        if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
            if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
                $scope.publicid = [];
                id=0;
            }
            id = $scope.publicid.length + 1;
        }else{
            //$scope.publicid = $scope.datos.publicidad;
            id = $scope.publicid.length + 1;
            console.log("-->",$scope.carass)
        }
        //console.log($scope.publicid.length);
        $scope.publicid.push({
            id: id,
            FECHAFIN: public.FECHAFIN,
            FECHAINICIO: public.FECHAINICIO,
            INT_CARA: public.INT_CARA,
            INT_CATE: public.INT_CATE,
            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
            caras: $scope.carass,
            id_cara: public.id_cara,
            idcarac: public.idcarac,
            idcate: public.idcate
        });
        $scope.publi=[];
        $scope.carass = [];
        $scope.detalle = [];
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.lssubcategoria();
        //console.log($scope.publicid);
        $scope.datos.publicidad = $scope.publicid;
        
    }
    $scope.only=false;
    $scope.botonn="new";
    $scope.modificarPlubli = function(dato){
        console.log(dato);
        $scope.only=true;
        $scope.botonn="upd";
        $scope.publi=dato;
        $scope.carass = dato.caras;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
        //console.log(">>>>",$scope.publi);
    }
    $scope.eliminarPubli = function(dato){
        //console.log(dato);
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
    }
    $scope.modificarpublicidad = function(dato){
        $scope.only=true;
        $scope.botonn="new";
        delete $scope.edit[dato.id];
        $scope.publi=[];
        $scope.carass = [];
        $scope.lssubcategoria();
    }
    //   **************************************************************************************************************************************************************************
    $scope.serializarInformacionyvan=function(datos){
        console.log(datos);
        wsRgistrarPubliciadad.registra_publicidades(datos).then(function(response){
                //$scope.datos.f01_id_contribuyente = response.idPersona;
                console.log("datos response:",response);
              });
        /*http://gmlppc05909/webServicios/registrapublicidad.asmx?op=registra_publicidades
        {"idActividadEconomica":91340, 
        "idContribuyente": 244605, "clase": "N", "ipUsuario": "192.168.32.30", "equipo": "gmlppc05909", "funcionario": "rita.flores", "idCategoria": 6, "idTipoLetrero": 40,
 "idCaracteristica": 1, "fechaInicio": "01/01/2015", "fechaFin": "01/01/1900", "viaMatriz":"VA", "idZona": 262, "tipoVia": "AV", "via": "14 de septiembre", "numero": "78", "placa": "ND",
"caras": [{"desc": "cara superior", "sup": "32,45"}, {"desc": "cara inferir", "sup": "25,45"}]}        
*/
    }

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});