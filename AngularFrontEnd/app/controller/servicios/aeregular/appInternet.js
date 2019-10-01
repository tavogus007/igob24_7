//app.controller('modificarRegistroCiudadanoController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout)
app.controller('regularController', function ($scope,$timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window) {
    
    var fecha= new Date();    
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    //$scope.btnGuardarForm   =   false;
    $scope.desabilitadoZ=true;
    $scope.desabilitadoV=true;
    $scope.desabilitadoNo=true;
    $scope.validarAdjuntos = true;
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.divNatural = null;
    $scope.divJuridico = null;
    $scope.superfcat = false;
    
    $scope.alqant = false;
    $scope.btnEnviarForm = true;
    

    $scope.divSuperficie = null;
    $scope.divAntecedentes = null;

    $scope.divCISolicitante = null;
    $scope.divServicio = null;
    $scope.divSuperficie = null;
    $scope.divAntecedentesP = null;
    $scope.divAntecedentesS = null;
    $scope.divConstitucion = null;
    $scope.divPoder = null;
    $scope.divCIRepresentante = null;
    $scope.divLicenciaFuncionamiento = null;
    $scope.divPoliza = null;
    $scope.divCertificacionAcustica = null;
    $scope.divDocumentoMantenimiento = null;
    $scope.divCertificacionIBNORCA = null;
    $scope.divDeclaracionJurada = null;
    $scope.divContratoalquiler = null;
    $scope.archivo2 = "croquisActividad.jpg";    
    $scope.docsFormTam  =   "col-md-12";

    var archivos = [
                    {"titulo":"Carnet de identidad","desripcion":"Carnet del Solicitante"},
                    {"titulo":"Servicio","desripcion":"Fotocopia de servicio Luz/Agua/Gas"},
                    {"titulo":"Superficie","desripcion":"Croquis de la superficie"},
                    {"titulo":"AntecedentesP","desripcion":"Antecedentes Solicitante"},
                    {"titulo":"AntecedentesS","desripcion":"Antecedentes Propietario"},
                    {"titulo":"Constitucion","desripcion":"Constitucion"},
                    {"titulo":"Poder","desripcion":"Poder Legal"},
                    {"titulo":"CIRepresentante","desripcion":"Carnet del Representante Legal"},
                    {"titulo":"LicenciaFuncionamiento","desripcion":"Licencia de Funcionamiento"},
                    {"titulo":"Poliza","desripcion":"Poliza de seguro"},
                    {"titulo":"CertificacionAcustica","desripcion":"Certificado Acustico"},
                    {"titulo":"DocumentoMantenimiento","desripcion":"Documento de Mantenimiento  del equipo"},
                    {"titulo":"CertificacionIBNORCA","desripcion":"Certificacion IBNORCA"},
                    {"titulo":"DeclaracionJurada","desripcion":"Declaracion Jurada"},
                    {"titulo":"Contratoalquiler","desripcion":"Contrato de Alquiler"}
                    ];
    $scope.divOcultarJuegos = true;

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
    //$scope.irUbicacionLugar($scope.datos.INT_AC_latitud,$scope.datos.INT_AC_longitud);
    /* Bloquer de formulario */
    /*enviarFormProcesos*/
    /**************************************************************/
    $scope.validarFormProcesos = function(datosForm){
        var idTramite = sessionService.get('IDTRAMITE');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        var validarFormP   = new reglasnegocio();
        validarFormP.id = 57;   
        validarFormP.parametros = '{"frm_tra_enviado":"SI","frm_tra_if_codigo":"' + nroTramiteEnviado + '","frm_tra_id_usuario":"' + idUsuario + '","frm_tra_modificado":"' + fechactual + '"}';                              
        validarFormP.llamarregla(function(response){
           //response = JSON.parse(response);
            $scope.tramitesCiudadano();
            $scope.bloquearBtnEnviarForm(); 
            sweet.show("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información."); 
        });
    };
    /**************************************************************/
    ////////////////////////////////////////////////////////////////////
    //UPLOAD  FILES
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;

    var uploader = $scope.uploader = new FileUploader({
           url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
    });
    $scope.uploader = new FileUploader({
                       url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu
                      
    });    
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <2;
            }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    /////////////////////////////////////////////////////////////////
    $scope.verificarSuperficie = function(superficie){
        if (superficie>150) { 
            $scope.divSuperficie = "mostrar";
        } else {
            $scope.divSuperficie = null;
        }
        $scope.verficaAdjuntos();
    }
    /////////////////////////////////////////////////////////////////
    $scope.verificarEstablecimiento = function(establecimiento){
        if (establecimiento=="ALQUILADO"||establecimiento=="ANTICRÉTICO") { 
            $scope.divAntecedentesP = "mostrar";
            $scope.divContratoalquiler = "mostrar";
        } else {
            $scope.divAntecedentesP = null;
            $scope.divContratoalquiler = null;
        }
        $scope.verficaAdjuntos();
    }
    ////////////////////////////////////////////////////////////////////
    $scope.cambiarFile = function(obj, valor){
        $scope.registro[obj.name] = valor;
    }; 
    ////////////////////////////////////////////////////////////////////
    $scope.limpiaradjuntos = function(){
        document.getElementById('FILE_FOTOCOPIA_CI').value="";
        document.getElementById('FILE_FACTURA_SERVICIO').value="";
        document.getElementById('FILE_CROQUIS').value="";
        document.getElementById('FILE_ANTECEDENTES').value="";
        document.getElementById('FILE_ANTECEDENTES1').value="";
        document.getElementById('FILE_CONSTITUCION').value="";
        document.getElementById('FILE_PODER').value="";
        document.getElementById('FILE_FOTOCOPIA_CI_REP').value="";
        document.getElementById('FILE_LICENCIA').value="";
        document.getElementById('FILE_POLIZA').value="";
        document.getElementById('FILE_CERTIFICACION').value="";
        document.getElementById('FILE_COMPROMISO').value="";
        document.getElementById('FILE_IBNORCA').value="";
        document.getElementById('FILE_DECLARACION_JURADA').value="";
        document.getElementById('FILE_ALQUILER_ANTICRETICO').value="";
    }
    ////////////////////////////////////////////////////////////////////
    $scope.enviarFormProcesosLinea = function(paramForm){
        var misDocs = new Array();
        misDocs.push(paramForm.FILE_FOTOCOPIA_CI);
        misDocs.push(paramForm.FILE_FACTURA_SERVICIO);
        misDocs.push(paramForm.FILE_CROQUIS);
        misDocs.push(paramForm.FILE_ANTECEDENTES);
        misDocs.push(paramForm.FILE_ANTECEDENTES1);
        misDocs.push(paramForm.FILE_CONSTITUCION);
        misDocs.push(paramForm.FILE_PODER);
        misDocs.push(paramForm.FILE_FOTOCOPIA_CI_REP);
        misDocs.push(paramForm.FILE_LICENCIA);
        misDocs.push(paramForm.FILE_POLIZA);
        misDocs.push(paramForm.FILE_CERTIFICACION);
        misDocs.push(paramForm.FILE_COMPROMISO);
        misDocs.push(paramForm.FILE_IBNORCA);
        misDocs.push(paramForm.FILE_DECLARACION_JURADA);
        misDocs.push(paramForm.FILE_ALQUILER_ANTICRETICO);
        $scope.btnEnviarForm   =   true;        
        var idProcodigo         =   'AE-ELI-';
        var datosNeXO = {};
        if (paramForm.OTRO_VIA!="") {
            $scope.nombre_via =paramForm.OTRO_VIA;
        }else{
            $scope.nombre_via =paramForm.INT_AC_NOMBRE_VIA;
        }
        
        //paramForm.INT_AC_NOMBRE_VIA=paramForm.OTRO_VIA;
        //$scope.nombre_via =paramForm.OTRO_VIA;
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
        if (paramForm.INT_TIPO_CONTRIBUYENTE == 'NATURAL' ){

            datosNeXO['INT_TIPO_CONTRIBUYENTE'] = paramForm.INT_TIPO_CONTRIBUYENTE;
            datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
            datosNeXO['AE_ORD_DEM'] = paramForm.AE_ORD_DEM;
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FACTURA_SERVICIO'] = paramForm.FILE_FACTURA_SERVICIO;
            datosNeXO['FILE_CROQUIS'] = paramForm.FILE_CROQUIS;
            datosNeXO['FILE_ANTECEDENTES'] = paramForm.FILE_ANTECEDENTES;
            datosNeXO['FILE_ANTECEDENTES1'] = paramForm.FILE_ANTECEDENTES1;
            datosNeXO['FILE_CONSTITUCION'] = paramForm.FILE_CONSTITUCION;
            datosNeXO['FILE_PODER'] = paramForm.FILE_PODER;

            datosNeXO['FILE_FOTOCOPIA_CI_REP'] = paramForm.FILE_FOTOCOPIA_CI_REP;
            datosNeXO['FILE_LICENCIA'] = paramForm.FILE_LICENCIA;
            datosNeXO['FILE_POLIZA'] = paramForm.FILE_POLIZA;
            datosNeXO['FILE_CERTIFICACION'] = paramForm.FILE_CERTIFICACION;
            datosNeXO['FILE_COMPROMISO'] = paramForm.FILE_COMPROMISO;
            datosNeXO['FILE_IBNORCA'] = paramForm.FILE_IBNORCA;
            datosNeXO['FILE_ALQUILER_ANTICRETICO'] = paramForm.FILE_ALQUILER_ANTICRETICO;
            datosNeXO['FILE_DECLARACION_JURADA'] = paramForm.FILE_DECLARACION_JURADA;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['INT_NUM_DOC'] = paramForm.INT_NUM_DOC;
            datosNeXO['INT_EXP'] = paramForm.INT_EXP;
            datosNeXO['INT_CORREO'] = paramForm.INT_CORREO;
            datosNeXO['INT_TEL_CELULAR'] = paramForm.INT_TEL_CELULAR;
            datosNeXO['INT_TEL'] = paramForm.INT_TEL;
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
            datosNeXO['INT_AC_TIP_VIA'] = paramForm.INT_AC_TIP_VIA;
            datosNeXO['INT_AC_NOMBRE_VIA'] = paramForm.INT_AC_NOMBRE_VIA;
            datosNeXO['OTRO_VIA'] = paramForm.OTRO_VIA;
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
            datosNeXO['INT_AC_MACRO_ID'] = paramForm.INT_AC_MACRO_ID;            
            //DATOS FALTANTES DEL CONTRIBUYENTE
            datosNeXO['INT_MACRO']                  =   paramForm.INT_MACRO;      
            datosNeXO['INT_ZONA']                   =   paramForm.INT_ZONA; 
            datosNeXO['INT_MACRO_DESC']                  =  paramForm.INT_MACRO_DESC;      
            datosNeXO['INT_ZONA_DESC']                   =   paramForm.INT_ZONA_DESC;
            datosNeXO['INT_DISTRITO'] = paramForm.INT_DISTRITO;
            datosNeXO['INT_DISTRITO_DESC'] = paramForm.INT_DISTRITO_DESC;
            
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
            datosNeXO['INT_TIP_VIA']                     =  paramForm.INT_TIP_VIA;
            datosNeXO['INT_NACIONALIDAD']                =  paramForm.INT_NACIONALIDAD;
            //datosNeXO['INT_PUBLICIDAD']                  =  paramForm.publicidad;
            //datosNeXO['INT_SW_PUBLICIDAD']               =  paramForm.swpublicidad;
            datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;

        } else {
            datosNeXO['INT_TIPO_CONTRIBUYENTE'] = paramForm.INT_TIPO_CONTRIBUYENTE;
            datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
            datosNeXO['AE_ORD_DEM'] = paramForm.AE_ORD_DEM;

            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FACTURA_SERVICIO'] = paramForm.FILE_FACTURA_SERVICIO;
            datosNeXO['FILE_CROQUIS'] = paramForm.FILE_CROQUIS;
            datosNeXO['FILE_ANTECEDENTES'] = paramForm.FILE_ANTECEDENTES;
            datosNeXO['FILE_ANTECEDENTES1'] = paramForm.FILE_ANTECEDENTES1;
            datosNeXO['FILE_CONSTITUCION'] = paramForm.FILE_CONSTITUCION;
            datosNeXO['FILE_PODER'] = paramForm.FILE_PODER;
            datosNeXO['FILE_FOTOCOPIA_CI_REP'] = paramForm.FILE_FOTOCOPIA_CI_REP;
            datosNeXO['FILE_LICENCIA'] = paramForm.FILE_LICENCIA;
            datosNeXO['FILE_POLIZA'] = paramForm.FILE_POLIZA;
            datosNeXO['FILE_CERTIFICACION'] = paramForm.FILE_CERTIFICACION;
            datosNeXO['FILE_COMPROMISO'] = paramForm.FILE_COMPROMISO;
            datosNeXO['FILE_IBNORCA'] = paramForm.FILE_IBNORCA;
            datosNeXO['FILE_DECLARACION_JURADA'] = paramForm.FILE_DECLARACION_JURADA;
            datosNeXO['FILE_ALQUILER_ANTICRETICO'] = paramForm.FILE_ALQUILER_ANTICRETICO;

            datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['INT_NUM_DOC'] = paramForm.INT_NUM_DOC;
            datosNeXO['INT_EXP'] = paramForm.INT_EXP;
            datosNeXO['INT_CORREO'] = paramForm.INT_CORREO;
            datosNeXO['INT_TEL_CELULAR'] = paramForm.INT_TEL_CELULAR;
            datosNeXO['INT_TEL'] = paramForm.INT_TEL;            
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
            datosNeXO['INT_AC_TIP_VIA'] = paramForm.INT_AC_TIP_VIA;
            datosNeXO['INT_AC_NOMBRE_VIA'] = paramForm.INT_AC_NOMBRE_VIA;
            datosNeXO['OTRO_VIA'] = paramForm.OTRO_VIA;
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
            datosNeXO['INT_AC_MACRO_ID'] = paramForm.INT_AC_MACRO_ID;
            datosNeXO['INT_DISTRITO'] = paramForm.INT_DISTRITO;
            datosNeXO['INT_DISTRITO_DESC'] = paramForm.INT_DISTRITO_DESC;
            
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
            
            datosNeXO['INT_TIP_VIA']                     =  paramForm.INT_TIP_VIA;
            //datosNeXO['INT_PUBLICIDAD']                  =  paramForm.publicidad;
            //datosNeXO['INT_SW_PUBLICIDAD']               =  paramForm.swpublicidad;

            datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
            datosNeXO['INT_AC_direccionImagenmapa']   =  paramForm.INT_AC_direccionImagenmapa;
            
            //datosForm_inicio['INT_RL_TIPO_DOCUMENTO']=datosIniciales.INT_RL_TIPO_DOCUMENTO;
            datosNeXO['INT_RL_NUM_DOCUMENTO']=paramForm.INT_RL_NUM_DOCUMENTO;
            datosNeXO['INT_RL_FECHA_NAC']=paramForm.INT_RL_FECHA_NAC;
            //datosForm_inicio['INT_MACRO']=datosIniciales.INT_MACRO;
            //datosForm_inicio['INT_ZONA']=datosIniciales.INT_ZONA;
            datosNeXO['INT_ZONA_DESC']=paramForm.INT_ZONA_DESC;
            datosNeXO['INT_MACRO_DESC']=paramForm.INT_MACRO_DESC;                
            
        }
        datosNeXO['publicidad']=paramForm.publicidad; 
        datosNeXO['publicidad_grilla']=paramForm.publicidad_grilla;  
        datosNeXO['g_tipo'] = "AE-LINEA";
        datosNeXO['g_fecha'] = "";
        //DATOS DE LA ACTIVIDAD ECONOMICA - NO ESTAN REGISTRADAS DE MANERA LOCAL 
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                console.log("datos del ciudadano 10", $scope.dataGenesisCidadano);
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                //$scope.trmUsuario
                datosNeXO['INT_AE_IDCODIGO_ZONA']       = "21";
                //datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = $scope.trmUsuario[0].IdActividad;
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
                //INT_TRAMITE_RENOVA
            }
        }        
        var sMacroR         =   datosNeXO['INT_MACRO'];
        //var sDistritoR      =   datosNeXO['INT_DISTRITO'];
        var sZonaR          =   datosNeXO['INT_ZONA'];
        var sMacroRDesc     =   datosNeXO['INT_MACRO_DESC'];
        //var sDistritoRDesc  =   datosNeXO['INT_DISTRITO_DESC'];
        var sZonaRDesc      =   datosNeXO['INT_ZONA_DESC'];       
        
        if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
            var sIdTramite = $rootScope.tramiteId;
            var datosSerializados = JSON.stringify(datosNeXO);
            archivo1 = "";
            //CREAR CASO AE LINEA
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
                    if(results.length > 0){
                        datosIF = results[0].sp_pmfunction2.split(",");
                        datosIF2 = datosIF[1];
                        datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                        $scope.nrotramitec = datosIF[0];
                        sessionService.set('NROTRAMITE', datosIF[0]);
                        sessionService.set('NROTRAMITEID', datosIF[1]);
                        sessionService.set('IDPROCESO', datosIF[6]);
                        var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                        datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                        var datosSerializados1 = JSON.stringify(datosNeXO);
                        var parametros1 = {
                        "table_name":"_fr_casos",            
                        "body":{
                                'cas_datos' : datosSerializados1
                           },
                        "ids": idTramite1
                          };
                        try{
                            DreamFactory.api[CONFIG.SERVICE_IF].updateRecordsByIds(parametros1).success(function (response){
                            console.log('ok update');
                            }).error(function(results){
                            console.log('error update',results);
                            });
                        }catch(e){
                        }

                        //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                        try{
                            $scope.capturarImagen();
                            $scope.validarFormProcesos(paramForm);
                            $scope.guardarAdjuntosMultiplesMapa(results);
                        }catch(e){}
                        
                        angular.forEach(misDocs, function(archivo, key) {
                            if (archivo) {
                                partes13 =  archivo.split("\\");
                                if (partes13.length==1){
                                    archivo1 = archivo;
                                }
                                else{
                                    archivo1 = partes13[partes13.length-1];
                                }
                            }
                            if(typeof(archivo) != 'undefined'){
                                $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
                                var urlIdcos = CONFIG.APIURL + "/files/RC_CLI/" + $scope.oidCiudadano + "/" +  sessionService.get('IDTRAMITE') + "/" + archivo1 + "?app_name=todoangular";
                                try{
                                    $scope.guardarAdjuntosPersonalizados(results, archivo, urlIdcos, archivos[indice], datosIF2);
                                }catch(e){}                                
                            }else{
                                //console.log("error en el archivo");
                            }
                            indice = indice + 1;
                        });
                        $.unblockUI();
                    }else{
                        $.unblockUI();                
                        $scope.msg = "Error !!";
                    }
                }catch(e){
                    console.log("falla: ", e);
                    alert("conexion fallida ");
                }
            });
        }else{
            sweet.show('', "Complete sus Datos de Direccion", 'warning');
        }        
    };
    
    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosPersonalizados = function(datosCaso, archivo, urlIdcos, archivoAdj, tramite){
        var sdataArchivo    = datosCaso[0].sp_pmfunction2;
        var aDatosCaso      = sdataArchivo.split(',');
        $scope.archivosMultiples    =   JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES);
        $scope.docsistema           =   'AE_EN_LINEA';
        $scope.sIdProcesoActual     =   sessionService.get('IDPROCESO');//aDatosCaso[3];//datosCaso.idProceso;// 1;
        $scope.sCasoNro             =   aDatosCaso[1];//datosCaso.sNrocaso//49;
        $scope.sCasoNombre          =   '15 - ADJUNTOS';        
        /*var subirU = {};
        subirU['doc_sistema'] = $scope.docsistema;
        subirU['doc_proceso'] = $scope.sIdProcesoActual;
        subirU['doc_id'] = tramite;
        subirU['doc_ci_nodo'] = $scope.sCasoNombre;
        subirU['doc_datos'] = archivoAdj.desripcion;
        subirU['doc_titulo'] = archivoAdj.titulo;
        subirU['doc_palabras'] = archivoAdj.desripcion;
        subirU['doc_url'] = '';
        subirU['doc_version'] ='1';
        subirU['doc_tiempo'] = '0';
        subirU['doc_firma_digital'] = 0;
        subirU['doc_registro'] = fechactual;
        subirU['doc_modificacion'] = fechactual;
        subirU['doc_estado'] = 'A';
        subirU['doc_usuario'] = sessionService.get('USUARIO');
        subirU['doc_tipo_documento'] = '';
        subirU['doc_tamanio_documento'] = '';
        subirU['doc_nombre'] = archivo;
        subirU['doc_tps_doc_id'] = '';
        subirU['doc_url_logica'] = urlIdcos;
        subirU['doc_acceso'] = 'PRIVADO';
        subirU['doc_cuerpo'] = '';
        subirU['doc_tipo_documentacion'] = 'U';
        subirU['doc_tipo_ingreso'] = 'I';
        subirU['doc_estado_de_envio'] = 'N';
        subirU['doc_correlativo'] = '';
        subirU['doc_tipo_documento_ext'] = '';
        subirU['doc_nrotramite_nexo'] = sessionService.get('NROTRAMITE');
        subirU['doc_id_carpeta'] = '';*/
        /*var ressubirU = {
            //table_name:"dms_gt_documentos",
            body:{

                'doc_sistema': $scope.docsistema,
                'doc_proceso': $scope.sIdProcesoActual,
                'doc_id': tramite,
                'doc_ci_nodo': $scope.sCasoNombre,
                'doc_datos': archivoAdj.desripcion,
                'doc_titulo': archivoAdj.titulo,
                'doc_palabras': archivoAdj.desripcion,
                'doc_url': '',
                'doc_version': '1',
                'doc_tiempo': '0',
                'doc_firma_digital': 0,
                'doc_registro': fechactual,
                'doc_modificacion': fechactual,
                'doc_estado': 'A',
                'doc_usuario': sessionService.get('USUARIO'),
                'doc_tipo_documento': '',
                'doc_tamanio_documento': '',
                'doc_nombre': archivo,
                'doc_tps_doc_id': '',
                'doc_url_logica': urlIdcos,
                'doc_acceso': 'PRIVADO',
                'doc_cuerpo': '',
                'doc_tipo_documentacion': 'U',
                'doc_tipo_ingreso': 'I',
                'doc_estado_de_envio': 'N',
                'doc_correlativo': '',
                'doc_tipo_documento_ext': '',
                'doc_nrotramite_nexo': sessionService.get('NROTRAMITE'),
                'doc_id_carpeta': '',

            }
        };*/
/*
        setTimeout(function(){ 
            $.ajax({
                  type:"post",
                  url: "http://localhost:9091/wsIf/crearAdjunto",
                  data:{
                        'doc_sistema': $scope.docsistema,
                        'doc_proceso': $scope.sIdProcesoActual,
                        'doc_id': tramite,
                        'doc_ci_nodo': $scope.sCasoNombre,
                        'doc_datos': archivoAdj.desripcion,
                        'doc_titulo': archivoAdj.titulo,
                        'doc_palabras': archivoAdj.desripcion,
                        'doc_url': '',
                        'doc_version': '1',
                        'doc_tiempo': '0',
                        'doc_firma_digital': 0,
                        'doc_registro': fechactual,
                        'doc_modificacion': fechactual,

                        'doc_estado': 'A',
                        'doc_usuario': sessionService.get('USUARIO'),
                        'doc_tipo_documento': '',
                        'doc_tamanio_documento': '',
                        'doc_nombre': archivo,
                        'doc_tps_doc_id': 0,
                        'doc_url_logica': urlIdcos,
                        'doc_acceso': 'PRIVADO',
                        'doc_cuerpo': '',
                        'doc_tipo_documentacion': 'U',
                        'doc_tipo_ingreso': 'I',
                        'doc_estado_de_envio': 'N',
                        'doc_correlativo': '',
                        'doc_tipo_documento_ext': '',
                        'doc_nrotramite_nexo': sessionService.get('NROTRAMITE'),
                        'doc_id_carpeta': '29',
                  },
                  async: false,
                  success: function(response) {
                    $.unblockUI();
                      var aRespuesta    =   new Array();
                      var sNroRegistros =   0;                              
                      aRespuesta.push(response);
                      console.log("111",response);
                      console.log("222",aRespuesta);
                     
                  },
                  error: function (response, status, error) {
                      $.unblockUI();
                      data = response.responseText;
                  }
            });
        }, 100);
*/

            var documento=new gDocumentos();
            documento.doc_sistema = $scope.docsistema,
            documento.doc_proceso = $scope.sIdProcesoActual,
            documento.doc_id = tramite.toString(),
            documento.doc_ci_nodo = $scope.sCasoNombre,
            documento.doc_datos = archivoAdj.desripcion,
            documento.doc_titulo = archivoAdj.titulo,
            documento.doc_palabras = archivoAdj.desripcion,
            documento.doc_url = urlIdcos,
            documento.doc_version = '1',
            documento.doc_tiempo = '0',
            documento.doc_firma_digital = '0',
            documento.doc_registro = fechactual,
            documento.doc_modificacion = fechactual,
            documento.doc_estado = 'A',
            documento.doc_usuario = sessionService.get('USUARIO'),
            documento.doc_tipo_documento = '',
            documento.doc_tamanio_documento = '',
            documento.doc_nombre = archivo,
            documento.doc_tps_doc_id = 0,
            documento.doc_url_logica = urlIdcos,
            documento.doc_acceso = 'PRIVADO',
            documento.doc_cuerpo = '',
            documento.doc_tipo_documentacion = 'U',
            documento.doc_tipo_ingreso = 'I',
            documento.doc_estado_de_envio = 'N',
            documento.doc_correlativo = '',
            documento.doc_tipo_documento_ext = '',
            documento.doc_nrotramite_nexo = sessionService.get('NROTRAMITE'),
            documento.doc_id_carpeta = '29',
            documento.insertarDoc(function(resultado){
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    console.log("REGISTRO CORRECTO");
                } else {
                    $.unblockUI();
                    sweet.show(resultadoApi.error.message);
                }
            });


    };
  
    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction2;
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
                sweet.show(resultadoApi.error.message);
            }
        });
        
        /*
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
                    },{
                        "name": "docnrotramitenexo",
                        "value": $scope.nrotramitec
                    },{
                        "name": "docusuario",
                        "value": $scope.docusuario
                    }
                ]
            }
        };
        
        var obj = DreamFactory.api[CONFIG.SERVICE_IF].callStoredProcWithParams(resOpcion).success(function (response){
            console.log("Archivos almacenados correctamente.. MAPA");
        }).error(function(error) {
        });
        */
    };
    /****************************************************/
    //$scope.guardar = function(data){    
    $scope.enviarFormProcesos55 = function(data){
        $scope.sIdProcesoActual = sessionService.get('IDPROCESO');
        $scope.sCasoNro = '49';
        $scope.sCasoNombre        ='15 - ADJUNTOS';
        var cadenaURL = uploadUrl + file.name + '?app_name=' + CONFIG.APP_NAME;        
        var cadenaURI = $scope.direccionvirtual +"/" + file.name;
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
    /****************************************************/
    /*
    $scope.enviarFormProcesos55 = function(data){
        $scope.sIdProcesoActual = sessionService.get('IDPROCESO');
        $scope.sCasoNro = '49';
        $scope.sCasoNombre        ='15 - ADJUNTOS';
        var cadenaURL = uploadUrl + file.name + '?app_name=' + CONFIG.APP_NAME;        
        var cadenaURI = $scope.direccionvirtual +"/" + file.name;
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
    */
    /*******************************************************************/
    $scope.macrodistritos = function(){
        $scope.aMacrodistritos = {};
        var smacrodistrito   = new reglasnegocio();
        smacrodistrito.id = 21;
        smacrodistrito = '{}';
        smacrodistrito.llamarregla(function(results){
            results = JSON.parse(results); 
            if(results.length > 0){
                $scope.aMacrodistritos = results;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };
    /*******************************************************************/
    
    $scope.distritoZonas = function(idMacroJ){
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                //console.log(value.mcdstt);
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });                  
        }
        $scope.idMacro = idMacro;
        $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        $scope.aDistritoZona = {};

        /**********API DISTRITOZONA AE*****************/   
        var adistritoZona3  = new reglasnegocio();
        adistritoZona3.id = 34;
        adistritoZona3.parametros = '{"dist_macro_id":"' + idMacro + '"}';
        adistritoZona3.llamarregla(function(results){
        results = JSON.parse(results);
            if(results.length > 0){
                $scope.aDistritoZona = results;
                $scope.desabilitadoZ=false;
                //LIMPINANDO TIPO DE VIA - NOMBRE DE VIA
                $scope.desabilitadoV=true;
                $scope.desabilitadoNo=true;
                $scope.datos.INT_AC_TIP_VIA = "";
                $scope.datos.INT_AC_NOMBRE_VIA = "";
                $scope.datos.INT_AC_ZONA = "";
            }else{                
                $scope.msg = "Error !!";
            }             
        });
        $scope.desabilitadoZ=true;//false;
        $scope.desabilitadoV=true;
        $scope.desabilitadoNo=true;
        $scope.datos.INT_AC_TIP_VIA = "";
        $scope.datos.INT_AC_NOMBRE_VIA = "";
        $scope.datos.INT_AC_ZONA = "";
    };
    /**************** Vias **************************/
    $scope.vias= function(zona,tipo){
        $scope.z =zona;
        $scope.t =tipo;
        var svias = new reglasnegocio();
        svias.id = 31;
        svias.parametros = '{"zona":"' + zona + '","tipo":"' + tipo + '"}'; 
        svias.llamarregla(function(results){
            results = JSON.parse(results);
            $scope.tip_vias =   [];
            var aTipoVia    =   {};
            aTipoVia["idv"] = "OTROS";
            aTipoVia["nombrev"] = "OTRO";
            if(results.length > 0 ){
                $scope.tip_vias =   results;
            }
            $scope.tip_vias.push(aTipoVia);
            $scope.desabilitadoNo=false;
        });
    };
    /*************************************************/
    $scope.recuperarInfo = function(){        
        sIdTramite = sessionService.get('IDTRAMITE');
        sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        sIdServicio = sessionService.get('IDSERVICIO');
        var datosform = {};
        if(sIdCiudadano){            
            var datosCiudadano   = new reglasnegocio();
            datosCiudadano.id = 39;
            datosCiudadano.parametros ='{"sidciudadano":"' + sIdCiudadano + '","sidservicio":"' + sIdServicio + '","sidtramite":"' + sIdTramite + '"}'; 
            datosCiudadano.llamarregla(function(results){
                results = JSON.parse(results);
                if(results.length > 0){
                    datosform = JSON.parse(results[0].form_contenido);
                    $scope.datosform =datosform;
                } else {  
                    sessionService.set('IDTRAMITE', sIdTramite);                
                }
            });
        } else {
            alert("No existe id ciudadano");
        }
    };
    /*************************************************/

    $scope.tipoPersona=function(tipo){
        var sTipoPersona = sessionService.get('TIPO_PERSONA');
        if (sTipoPersona == 'JURIDICO')
            $scope.representante    =   "mostrar";
        else
            $scope.representante    =   null;
    };
    
    //Documentos Adjuntos
    $scope.cambiarFile = function(obj, valor){
        $scope.datos[obj.name] = valor;
        setTimeout(function(){
            $rootScope.$broadcast('almacenarDocumentosInternet');
        }, 500);
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
    
    $scope.cargarDatos=function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.getDatos();  
        $scope.macrodistritos();
        $scope.inciarUpload();
        $scope.getCaptchasXX();
        if($scope.sTipoPersona=="NATURAL"){
            $scope.divNatural = "mostrar";
        } else {
            $scope.divJuridico = "mostrar";
        }
        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
    };
    
    $scope.inciarUpload =   function(){        
        try{
          $('#multiDocsButon').click(function(){                
                $('#multiDocsFile').click();
               //$scope.vias();
          });
        }catch(e){}    
    };
    
    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == "SI") {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
        } else {            
            $scope.btnGuardarForm   =   false;
            $scope.desabilitado     =   false;
            $scope.botones          =   "mostrar";
        }
        $scope.initMap();
    });
    
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
                $scope.validarActividadEco(data[0].datos.TIPO);
            }
        }
    });    
    
    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
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
        
        setTimeout(function(){
            if( 
                (typeof($rootScope.laaa) !=  'undefined' && $rootScope.laaa  != "" && $rootScope.laaa != 0 && $rootScope.laaa != "0") &&
                (typeof($rootScope.looo) != 'undefined' && $rootScope.looo != "" && $rootScope.looo != 0 && $rootScope.looo != "0")
            ){
                var nuevoUbicacion = {
                    lat: $rootScope.laaa, 
                    lng: $rootScope.looo
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
            //$scope.irUbicacionLugar($rootScope.looo,$rootScope.laaa);
        }, 500);
        $scope.nom_via = data.INT_AC_NOMBRE_VIA;
        if (data.INT_AC_ZONA) {
            $scope.desabilitadoZ=false;
        }
        if (data.INT_AC_TIP_VIA) {
            $scope.desabilitadoV=false;
        }
        if (data.INT_AC_NOMBRE_VIA) {
            //$scope.desabilitadoNo=false;    
        }

        /*if (data.INT_AC_ESTADO=="") {
        }else{*/
        $scope.verificarEstablecimiento(data.INT_AC_ESTADO);
        /*console.log(">>>>>>>>0<<<<<<<",data.INT_AC_ESTADO);
        $scope.divContratoalquiler = "mostrar";
        $scope.divAntecedentesP = "mostrar";
        }*/
        $timeout(function(){
        document.getElementById('FILE_ALQUILER_ANTICRETICO').value=((typeof(data.FILE_ALQUILER_ANTICRETICO) == 'undefined' || data.FILE_ALQUILER_ANTICRETICO == null) ? ""   : data.FILE_ALQUILER_ANTICRETICO.toUpperCase());
        document.getElementById('FILE_FOTOCOPIA_CI').value=((typeof(data.FILE_FOTOCOPIA_CI) == 'undefined' || data.FILE_FOTOCOPIA_CI == null) ? ""   : data.FILE_FOTOCOPIA_CI.toUpperCase());
        document.getElementById('FILE_FACTURA_SERVICIO').value=((typeof(data.FILE_FACTURA_SERVICIO) == 'undefined' || data.FILE_FACTURA_SERVICIO == null) ? ""   : data.FILE_FACTURA_SERVICIO.toUpperCase());
        document.getElementById('FILE_CROQUIS').value=((typeof(data.FILE_CROQUIS) == 'undefined' || data.FILE_CROQUIS == null) ? ""   : data.FILE_CROQUIS.toUpperCase());
        document.getElementById('FILE_ANTECEDENTES').value=((typeof(data.FILE_ANTECEDENTES) == 'undefined' || data.FILE_ANTECEDENTES == null) ? ""   : data.FILE_ANTECEDENTES.toUpperCase());
        document.getElementById('FILE_ANTECEDENTES1').value=((typeof(data.FILE_ANTECEDENTES1) == 'undefined' || data.FILE_ANTECEDENTES1 == null) ? ""   : data.FILE_ANTECEDENTES1.toUpperCase());
        document.getElementById('FILE_CONSTITUCION').value=((typeof(data.FILE_CONSTITUCION) == 'undefined' || data.FILE_CONSTITUCION == null) ? ""   : data.FILE_CONSTITUCION.toUpperCase());
        document.getElementById('FILE_PODER').value=((typeof(data.FILE_PODER) == 'undefined' || data.FILE_PODER == null) ? ""   : data.FILE_PODER.toUpperCase());
        document.getElementById('FILE_FOTOCOPIA_CI_REP').value=((typeof(data.FILE_FOTOCOPIA_CI_REP) == 'undefined' || data.FILE_FOTOCOPIA_CI_REP == null) ? ""   : data.FILE_FOTOCOPIA_CI_REP.toUpperCase());
        document.getElementById('FILE_LICENCIA').value=((typeof(data.FILE_LICENCIA) == 'undefined' || data.FILE_LICENCIA == null) ? ""   : data.FILE_LICENCIA.toUpperCase());
        document.getElementById('FILE_POLIZA').value=((typeof(data.FILE_POLIZA) == 'undefined' || data.FILE_POLIZA == null) ? ""   : data.FILE_POLIZA.toUpperCase());        
        document.getElementById('FILE_CERTIFICACION').value=((typeof(data.FILE_CERTIFICACION) == 'undefined' || data.FILE_CERTIFICACION == null) ? ""   : data.FILE_CERTIFICACION.toUpperCase());
        document.getElementById('FILE_COMPROMISO').value=((typeof(data.FILE_COMPROMISO) == 'undefined' || data.FILE_COMPROMISO == null) ? ""   : data.FILE_COMPROMISO.toUpperCase());
        document.getElementById('FILE_IBNORCA').value=((typeof(data.FILE_IBNORCA) == 'undefined' || data.FILE_IBNORCA == null) ? ""   : data.FILE_IBNORCA.toUpperCase());
        document.getElementById('FILE_DECLARACION_JURADA').value=((typeof(data.FILE_DECLARACION_JURADA) == 'undefined' || data.FILE_DECLARACION_JURADA == null) ? ""   : data.FILE_DECLARACION_JURADA.toUpperCase());
        }, 1000);
        if(data.INT_AC_TIP_VIA != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.INT_AC_TIP_VIA);
        }
        
        $scope.datos.INT_AC_NOMBRE_VIA = data.INT_AC_NOMBRE_VIA;
        $scope.acti = data.INT_ACTIVIDAD;
        $scope.seleccionarTipoCategoria(data.INT_ACTIVIDAD);
        //$scope.vias();
        
        if(data.INT_ACTIVIDAD == 'INTB_PUB' || data.INT_ACTIVIDAD == 'INTJ_MCE' || data.INT_ACTIVIDAD == 'INTJ_MEC'){
            $scope.ocultarCamposJuegos();
        }else{
            $scope.mostrarCamposJuegos();
        }        
    });
    
    //DOCUMENTOS ADJUNTOS OBLIGATORIOS
    var clsIniciarFechaObligatorio = $rootScope.$on('inicializarFechaOblitatorio', function(event, data){
        var archivosAdjuntos    =   ((typeof(data.ARCHIVOS_MULTIPLES) == 'undefined') ? "" :data.ARCHIVOS_MULTIPLES);        
        if(archivosAdjuntos.length > 0){
            $scope.adjuntoObligatorio       =   false;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";            
        }else{
            $scope.adjuntoObligatorio       =   true;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        }
    });
    
    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data){
        $scope.btnEnviarForm    =   false;
    });
    
    $scope.$on('$destroy', function() {
        clsValidarBtnEnviar();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciarFechaObligatorio(); 
        clsIniciaBtnHabilitar(); 
        clsIniciarHtmlForm();
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
        console.log("TIPO DE PERSONA:", tipoPersona);
        if(tipoPersona == "NATURAL")
        {
            tipoPersona = "N";
        }
        else
        {
            tipoPersona = "J";
        }
        
        var datosGenerales = new gDatosGenerales();        
        datosGenerales.idActividadEconomica=tramite.IdActividad;
        datosGenerales.tipo=tipoPersona;
        datosGenerales.lstDatosGenerales(function(resultado){            
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response = resultadoApi.success.dataSql;                
                if(response.length > 0){
                    if(tipoPersona == "N")
                    {   
                        console.log("---------10.0.0.0.0.01-------", response);
                        var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                        var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                        var smacro      =   "MACRODISTRITO";
                        var szona       =   "DISTRITO";

                        //DATOS DE LA ACTIVIDAD ECONÓMICA
                        $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                        //OBLIGATORIOS
                        $scope.datos.INT_AC_SUPERFICIE  =   response[0].superficie;
                        $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;

                        try{
                            smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                            szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                            hinicio     =   hinicio.split('-')[0].trim();
                            hfinal      =   hfinal.split('-')[1].trim();
                        }catch(e){}

                        $scope.datos.INT_AC_HR_INICIO   =   hinicio;
                        $scope.datos.INT_AC_HR_FINAL    =   hfinal;
                        $scope.datos.INT_AC_ESTADO      =   response[0].AE_establecimiento;                    
                        $scope.datos.INT_AC_MACRO       =   smacro;
                        $scope.datos.INT_AC_ZONA        =   szona;                    
                        $scope.datos.INT_AC_TIP_VIA     =   response[0].Tipo_Via;
                        $scope.datos.INT_AC_NOMBRE_VIA  =   $scope.datos.INT_AC_NOMBRE_VIA;


                        //OPCIONALES
                        $scope.datos.INT_AC_NUMERO      =   response[0].numero_ae;
                        $scope.datos.INT_AC_EDIFICIO    =   response[0].edificio_ae;
                        $scope.datos.INT_AC_BLOQUE      =   response[0].bloque_ae;
                        $scope.datos.INT_AC_PISO        =   response[0].piso_ae;
                        $scope.datos.INT_AC_NUME        =   response[0].departamento_ae;
                        $scope.datos.INT_AC_CEL         =   "";
                        $scope.datos.INT_AC_TEL         =   response[0].telefono_ae;
                        $scope.datos.INT_AC_COR         =   "";

                        //CAMPOS OCULTOS
                        $scope.datos.INT_AC_MACRO_ID    =   response[0].IdMacroDistrito;
                        $scope.datos.INT_VIA            =   response[0].idzona_ae;
                    }
                    else
                    {
                        console.log("EL SOLICITANTE ES:", tipoPersona);                    
                        tipoPersona = "J";
                        var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                        var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                        var smacro      =   "MACRODISTRITO";
                        var szona       =   "DISTRITO";

                        //DATOS DE LA ACTIVIDAD ECONÓMICA
                        $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                        //OBLIGATORIOS
                        $scope.datos.INT_AC_SUPERFICIE  =   response[0].superficie;
                        $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;

                        try{
                            smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                            szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                            hinicio     =   hinicio.split('-')[0].trim();
                            hfinal      =   hfinal.split('-')[1].trim();
                        }catch(e){}

                        $scope.datos.INT_AC_HR_INICIO   =   hinicio;
                        $scope.datos.INT_AC_HR_FINAL    =   hfinal;
                        $scope.datos.INT_AC_ESTADO      =   response[0].AE_establecimiento;                    
                        $scope.datos.INT_AC_MACRO       =   smacro;
                        $scope.datos.INT_AC_ZONA        =   szona;
                        $scope.datos.INT_AC_TIP_VIA     =   response[0].Tipo_Via;
                        $scope.datos.INT_AC_NOMBRE_VIA  =   $scope.datos.INT_AC_NOMBRE_VIA;

                        //OPCIONALES
                        $scope.datos.INT_AC_NUMERO      =   response[0].numero_ae;
                        $scope.datos.INT_AC_EDIFICIO    =   response[0].edificio_ae;
                        $scope.datos.INT_AC_BLOQUE      =   response[0].bloque_ae;
                        $scope.datos.INT_AC_PISO        =   response[0].piso_ae;
                        $scope.datos.INT_AC_NUME        =   response[0].departamento_ae;
                        $scope.datos.INT_AC_CEL         =   "";
                        $scope.datos.INT_AC_TEL         =   response[0].telefono_ae;
                        $scope.datos.INT_AC_COR         =   "";

                        //CAMPOS OCULTOS
                        $scope.datos.INT_AC_MACRO_ID    =   response[0].IdMacroDistrito;
                        $scope.datos.INT_VIA            =   response[0].idzona_ae;
                    }
                    //INT_TRAMITE_RENOVA                
                    console.log("AL SELECCIONAR EL TRAMITE:", tramite.IdActividad);
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;                
                    //console.log("zona:", response[0].zona_ae);
                    setTimeout(function(){
                        $scope.actulizarIdDistrito();
                        $scope.distritoZonas(smacro);
                        console.log("/-----/",response);
                        //$scope.vias($scope.datos.INT_AC_ZONA,$scope.datos.INT_AC_TIP_VIA);
                    },2000);
                }                
            } else {
                sweet.show('', "Datos no Encontrados !!!", 'warning');            
            }
        });
        
        /*var data = {
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

            console.log("DATA REPRESENTANTE:", response);
            if(response.length > 0){
                if(tipoPersona == "N")
                {   
                    console.log("---------10.0.0.0.0.01-------", response);
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var szona       =   "DISTRITO";

                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                    //OBLIGATORIOS
                    $scope.datos.INT_AC_SUPERFICIE  =   response[0].superficie;
                    $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;
                    
                    try{
                        smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                        szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}
                    
                    $scope.datos.INT_AC_HR_INICIO   =   hinicio;
                    $scope.datos.INT_AC_HR_FINAL    =   hfinal;
                    $scope.datos.INT_AC_ESTADO      =   response[0].AE_establecimiento;                    
                    $scope.datos.INT_AC_MACRO       =   smacro;
                    $scope.datos.INT_AC_ZONA        =   szona;                    
                    $scope.datos.INT_AC_TIP_VIA     =   response[0].Tipo_Via;
                    $scope.datos.INT_AC_NOMBRE_VIA  =   $scope.datos.INT_AC_NOMBRE_VIA;


                    //OPCIONALES
                    $scope.datos.INT_AC_NUMERO      =   response[0].numero_ae;
                    $scope.datos.INT_AC_EDIFICIO    =   response[0].edificio_ae;
                    $scope.datos.INT_AC_BLOQUE      =   response[0].bloque_ae;
                    $scope.datos.INT_AC_PISO        =   response[0].piso_ae;
                    $scope.datos.INT_AC_NUME        =   response[0].departamento_ae;
                    $scope.datos.INT_AC_CEL         =   "";
                    $scope.datos.INT_AC_TEL         =   response[0].telefono_ae;
                    $scope.datos.INT_AC_COR         =   "";
                    
                    //CAMPOS OCULTOS
                    $scope.datos.INT_AC_MACRO_ID    =   response[0].IdMacroDistrito;
                    $scope.datos.INT_VIA            =   response[0].idzona_ae;
                }
                else
                {
                    console.log("EL SOLICITANTE ES:", tipoPersona);                    
                    tipoPersona = "J";
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var szona       =   "DISTRITO";

                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.INT_DENOMINACION   =   response[0].denominacion;
                    //OBLIGATORIOS
                    $scope.datos.INT_AC_SUPERFICIE  =   response[0].superficie;
                    $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;
                    
                    try{
                        smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                        szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}
                    
                    $scope.datos.INT_AC_HR_INICIO   =   hinicio;
                    $scope.datos.INT_AC_HR_FINAL    =   hfinal;
                    $scope.datos.INT_AC_ESTADO      =   response[0].AE_establecimiento;                    
                    $scope.datos.INT_AC_MACRO       =   smacro;
                    $scope.datos.INT_AC_ZONA        =   szona;
                    $scope.datos.INT_AC_TIP_VIA     =   response[0].Tipo_Via;
                    $scope.datos.INT_AC_NOMBRE_VIA  =   $scope.datos.INT_AC_NOMBRE_VIA;

                    //OPCIONALES
                    $scope.datos.INT_AC_NUMERO      =   response[0].numero_ae;
                    $scope.datos.INT_AC_EDIFICIO    =   response[0].edificio_ae;
                    $scope.datos.INT_AC_BLOQUE      =   response[0].bloque_ae;
                    $scope.datos.INT_AC_PISO        =   response[0].piso_ae;
                    $scope.datos.INT_AC_NUME        =   response[0].departamento_ae;
                    $scope.datos.INT_AC_CEL         =   "";
                    $scope.datos.INT_AC_TEL         =   response[0].telefono_ae;
                    $scope.datos.INT_AC_COR         =   "";
                    
                    //CAMPOS OCULTOS
                    $scope.datos.INT_AC_MACRO_ID    =   response[0].IdMacroDistrito;
                    $scope.datos.INT_VIA            =   response[0].idzona_ae;
                }
                //INT_TRAMITE_RENOVA                
                console.log("AL SELECCIONAR EL TRAMITE:", tramite.IdActividad);
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;                
                //console.log("zona:", response[0].zona_ae);
                setTimeout(function(){
                    $scope.actulizarIdDistrito();
                    $scope.distritoZonas(smacro);
                    console.log("/-----/",response);
                    //$scope.vias($scope.datos.INT_AC_ZONA,$scope.datos.INT_AC_TIP_VIA);
                },2000);
            }
        })
        obj.error(function(response){  
            $.unblockUI();
            sweet.show('', "Datos no Encontrados !!!", 'warning');            
        });*/        
    };
    $scope.listarAE = function () {        
        console.log("DATOS DE LA ACTIVIDAD ECONOMICA. :", $scope.datos);
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;        
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        console.log("data genesis :", dataGenesis);
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
            
            var contribuyente=new gLstActividadEconomica();
            contribuyente.idContribuyente=idContribuyente;
            contribuyente.tipo=tipoPersona;
            //try{
            contribuyente.lstActividadEconomica(function(resultado){            
                resultadoApi = JSON.parse(resultado);

                console.log("RESULT API: ", resultadoApi);

                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    if(response.success.dataSql.length > 0){
                        //PRETUNTAR Y LISTAR, SOLO LOS TRÁMITES EN LINEA DE INTERNET                    
                        $scope.formDatosAE  =   true;                    
                        $scope.mostrarMsgActividadTrue  = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = response.success.dataSql;                            
                        var data = response.success.dataSql;   //grabamos la respuesta para el paginado
                        $scope.tblTramites.reload();
                    } else {
                        $scope.mostrarMsgActividadTrue  = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE  =   false;
                    }
                } else {
                     sweet.show('', "Datos no Encontrados !!!", 'warning');
                }
            });
            //}catch(e){
            //     sweet.show('', "Datos no Encontrados !!!", 'warning');
            //};
            
            
            /*var paramPersonaJuridica = {
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
                    console.log("TRAMITE USUARIO:", $scope.trmUsuario);
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
            });*/
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
            //console.log("EL CONTRIBUYENTE NO POSEE ACTIVIDAD ECONOMICA");
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
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        switch(stipo) {
            case "EMISION":
                $scope.formDatosAE   =  false;
                $scope.divAntecedentesS = "mostrar";                
                break;                
            case "RENOVACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;
                $scope.listarAE();
                break;
            case "MODIFICACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;                
                $scope.listarAE();
                break;
            case "CANCELACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;                    
                $scope.listarAE();
                break;
            default:
            text = "NO TIENE TIPO";                    
        }
    };        
    $scope.vesavilirat = function(data){
        if (data.INT_AC_NOMBRE_VIA!='OTRO') {
            var sdata   =   document.getElementById("OTRO_VIA");
            if(sdata){
                document.getElementById("OTRO_VIA").value = "";
            }
        }
    }

    $scope.actulizarIdDistrito  =   function(){
        $scope.desabilitadoV=false;
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
        $scope.desabilitadoNo=true;        
        $scope.datos.INT_AC_NOMBRE_VIA = "";
        $scope.datos.INT_AC_TIP_VIA = "";
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
    
    
    $scope.mostrarCamposJuegos = function(){
        $scope.divOcultarJuegos = true;
    };
    
    $scope.ocultarCamposJuegos = function(){
        $scope.divOcultarJuegos = false;
    };    
    $scope.cambiar=function(datos){
        if (datos == $scope.acti) {

        }else{
            $scope.limpiaradjuntos();
        }
        
    }
    $scope.seleccionarTipoCategoria     =   function(categoria){
        $scope.docsFormTam  =   "col-md-12";
        var tipoCategoria       =   "";
        var sTipoCategoriaDesc  =   "";
        if ($scope.sTipoPersona=="NATURAL"){
            switch(categoria) {
                case "INTA_INT_JUE":
                    tipoCategoria       =   61;
                    $scope.tipoCategoria       =   61;
                    sTipoCategoriaDesc  =   "INTERNETS Y JUEGOS EN RED";
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = "mostrar";
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.mostrarCamposJuegos();
                    break;                
                case "INTB_COM":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();                    
                    break;
                case "INTB_PUB":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    //CAMPOS INNECESARIOS PARA AUTORIZACION JUEGOS - ESPACIOS PUBLICOS                    
                    $scope.ocultarCamposJuegos();
                    break;
                case "INTJ_MCE":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = "mostrar";
                    $scope.divCertificacionAcustica = "mostrar";
                    $scope.divDocumentoMantenimiento = "mostrar";
                    $scope.divCertificacionIBNORCA = "mostrar";
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    //CAMPOS INNECESARIOS PARA AUTORIZACION JUEGOS - ESPACIOS PUBLICOS                    
                    $scope.divOcultarJuegos = true;
                    $scope.ocultarCamposJuegos();                    
                    break;            
                case "INTJ_MEC":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = "mostrar";
                    $scope.divCertificacionAcustica = "mostrar";
                    $scope.divDocumentoMantenimiento = "mostrar";
                    $scope.divCertificacionIBNORCA = "mostrar";
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                default:
                text = "NO TIENE TIPO";                                    
            }
        } else {
            switch(categoria) {
                case "INTA_INT_JUE":
                    tipoCategoria       =   61;
                    $scope.tipoCategoria       =   61;
                    sTipoCategoriaDesc  =   "INTERNETS Y JUEGOS EN RED";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;                
                case "INTB_COM":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;
                case "INTB_PUB":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    //$scope.divContratoalquiler = null;
                    break;
                case "INTJ_MCE":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = "mostrar";
                    //$scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                case "INTJ_MEC":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    //$scope.divSuperficie = null;
                    //$scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = "mostrar";
                    //$scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                default:
                text = "NO TIENE TIPO";                                    
            }
        }
        $timeout(function(){
            $scope.verificarSuperficie(document.getElementById('INT_AC_SUPERFICIE').value);
            $scope.verificarEstablecimiento(document.getElementById('INT_AC_ESTADO').value);
        }, 1000);
        
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

    /*try{google.maps.visualRefresh = true;}catch(e){}
    

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
                //console.log(originalEventArgs[0].latLng.lat());
                //console.log(originalEventArgs[0].latLng.lng());
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
                    //console.log(marker);
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
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    ",lat);
        if(lat==0 || lat == 'undefined' || lat =='' || lat ==null || lat == undefined){
            var mapaObjectFinal1 = new Array();
            $scope.map.markers3 = mapaObjectFinal1;
            $scope.map.control.refresh({latitude: -16.495635, longitude: -68.133543});
        }else{
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
        }

    };
    */
    
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
        DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("ERROR");
        });
    };
    
    //var aDocAdjuntosmapa    =   new Array();
    var aDocAdjuntosmapa = new Object(); 

    /*$scope.almacenarDocumentosInternet = function(aFiles){
        $scope.archivos = aFiles;
        console.log(aFiles);
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('NROTRAMITEID');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aFiles, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
                //$scope.almacenarGDocumental(archivo, urlIdcos);
            }else{
                console.log("error en el archivo");
            }
        });
    };*/

    $scope.capturarImagen = function(){
        console.log("Entrando a captura imagen 4....");
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
    //****************************************************************************************************************************************************************    
    /*
    $scope.map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
    $scope.placeMarkerAndPanTo = function(latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
    }
    var origCenter = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};
    // ***********************  END MAPA   
    $scope.addMarkerMap = function () {
        //$timeout(function () {
            //console.log(recargaMapita);
            //$timeout.cancel(recargaMapita);
            $scope.map.markers2 = markers2;

        //}, 1000);
    }*/
    /*var marker = new google.maps.Marker({ 
        position: gps, 
        map: map,         
        title: "Mi Ubicación" 
    });   
    marker.setPosition(gps); */
    /// datos de publicidad  
    // datos de la la publicidad ******************************************************************************************************************************************************************
    //     DATIOS PUBLICIDAD ->   categoria -> tipo de letrero  ***********************************************************************************************************************************
    
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
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.TipoLetrero = [
        {"p_idtipoletrero" : "51", "p_descripcion": "ADOSADA SOBRESALIENTE"}, 
        {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"}, 
        {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"}, 
        {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
    };

    $scope.ltCaracteristica = function(idlee){
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
        }else{
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
    $scope.toggleMin = function() {
        $scope.minDate = new Date("2011-09-24".replace(/-/g, '\/')); // $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.changeHandler = function () {
        console.log($scope.publi.FECHAINICIO);
        var d = new Date($scope.publi.FECHAINICIO);
        var mes=d.getUTCMonth()+1;
        if(mes.toString().length==1)
            mes='0'+mes;
       $scope.publi.FECHAINICIO= "01/"+mes+"/"+d.getFullYear();
        console.log($scope.publi.FECHAINICIO,d.getFullYear(), d.getUTCMonth(),d.getUTCDate());
    };

    $scope.adicionarpublicidad = function(public){
        //$scope.publi.caras = $scope.carass;
        //console.log(public);
        if(public.FECHAINICIO =='' || public.FECHAINICIO == null || public.INT_CARA =='' || public.INT_CARA == null ||
        public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
        public.INT_DESC =='' || public.INT_DESC == null || public.INT_ALTO =='' || public.INT_ALTO == null || public.INT_ANCHO =='' || public.INT_ANCHO == null ){
            sweet.show('', 'Llene lo campos requerido  ', 'error');
        }
        else{
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
            if(id<6){
                $scope.publicid.push({
                    id: id,
                    //FECHAFIN: public.FECHAFIN,
                    //FECHAINICIO: fecha_publi,
                    FECHAINICIO: public.FECHAINICIO,
                    INT_CARA: public.INT_CARA,
                    INT_CATE: public.INT_CATE,
                    INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                    INT_DESC: public.INT_DESC,
                    INT_ALTO: public.INT_ALTO,
                    INT_ANCHO: public.INT_ANCHO,
                    //caras: $scope.carass,
                    id_cara: public.id_cara,
                    idcarac: public.idcarac,
                    idcate: public.idcate
                });    
            }else{
                sweet.show('', 'Llego al limite de registro de Publicidad', 'error');
            }
            $scope.publi=[];
            //$scope.carass = [];
            //$scope.detalle = [];
            $scope.publi.INT_CATE="II Fija";
            $scope.publi.idcate=6;
            $scope.lssubcategoria();
            //console.log($scope.publicid);
            $scope.datos.publicidad = $scope.publicid;
            $scope.Plubli_Grilla($scope.publicid);
        }
    }
    $scope.Plubli_Grilla = function(dato){
        $scope.publi_grilla = [];
        // var encabezado='{"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho","impresiones": "true|true|true|true|true|true|true|"}';

        /*var encabezado='{"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho","impresiones": "true|true|true|true|true|true|true|"}';*/

        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho","impresiones": "true|true|true|true|true|true|true|"};


        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            //console.log(">>>>>>",dato.publicidad[j]);
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
        //var jsonString = JSON.stringify($scope.publi_grilla);
        //var jsonString = jsonString.replace("[", "");
       //var jsonString = jsonString.replace("]", "");
        //var jsonString = '"TER_PUBLICIDAD": ['+encabezado+','+jsonString +']';
        //var jsonString = '['+ JSON.stringify(encabezado)+','+jsonString +']';
        var jsonString = '['+ (encabezado) +']';
        console.log($scope.publi_grilla);
        console.log(">>>> ",jsonString);

        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        //$scope.datos.publicidad_grilla=jsonString;
        $scope.datos.publicidad_grilla=encabezado;

    }
    $scope.onlyy=false;
    $scope.botonn="new";
    $scope.modificarPlubli = function(dato){
        console.log(dato);
        $scope.onlyy=true;
        $scope.botonn="upd";
        $scope.publi=dato;
        //$scope.carass = dato.caras;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
        //console.log(">>>>",$scope.publi);
    }
    $scope.eliminarPubli = function(dato){
        //console.log(dato);
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
    }
    $scope.modificarpublicidad = function(dato){
        $scope.onlyy=true;
        $scope.botonn="new";
        delete $scope.edit[dato.id];
        $scope.publi=[];
        //$scope.carass = [];
        $scope.lssubcategoria();
    }
    $scope.NumericoAlto = function(alto){
        if(alto){
            alto = alto.replace(/[^,.0-9]+/g, "");
            alto = alto.replace(/,/g, ".");
            $scope.publi.INT_ALTO = alto;
        }
    }
    $scope.NumericoAncho = function(ancho){
        if(ancho){
            ancho = ancho.replace(/[^,.0-9]+/g, "");
            ancho = ancho.replace(/,/g, ".");
            $scope.publi.INT_ANCHO = ancho;
        }
    }
    
    //////////////////////////////////////////////       END PUBLICIDADA        ////////////////////////////////////////////////////////////////////////////////////

    $scope.startDateOpenIni = function($event) {
        console.log("open ini");
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpenedIni = true;
    };
$scope.verficaAdjuntos = function(){
    var categoria  = document.getElementById('INT_ACTIVIDAD').value;
     if(document.getElementById('INT_AC_SUPERFICIE').value > 150){  
    if(document.getElementById('FILE_CROQUIS').value != "" ){
        $scope.superfcat = false;
    } else {
        $scope.superfcat = true;
    }
   }else {
    $scope.superfcat = false;
   }
 
    var estadoAC = document.getElementById('INT_AC_ESTADO').value; //   FILE_ANTECEDENTES1    FILE_ALQUILER_ANTICRETICO
 
         if (estadoAC =="ALQUILADO"||estadoAC =="ANTICRÉTICO") { 
            if(document.getElementById('FILE_ANTECEDENTES1').value != "" && document.getElementById('FILE_ALQUILER_ANTICRETICO').value != ""){
                
                $scope.alqant = false;
            } else {
                $scope.alqant = true;       
            }
                
         } else {
            $scope.alqant = false;      
         }


  if($scope.sTipoPersona=="NATURAL"){
          switch(categoria) {
              case "INTA_INT_JUE":
                  if(document.getElementById('FILE_FOTOCOPIA_CI').value != "" && document.getElementById('FILE_FACTURA_SERVICIO').value != ""  && document.getElementById('FILE_ANTECEDENTES').value != "")
                    $scope.validarAdjuntos = false;

                  break;                
              case "INTB_COM":
                  if(document.getElementById('FILE_FOTOCOPIA_CI').value != "" && document.getElementById('FILE_LICENCIA').value != ""  && document.getElementById('FILE_ANTECEDENTES').value != "")
                    $scope.validarAdjuntos = false;
                           
                  break;
              case "INTB_PUB":
                  if(document.getElementById('FILE_FOTOCOPIA_CI').value != "" && document.getElementById('FILE_LICENCIA').value != ""  && document.getElementById('FILE_ANTECEDENTES').value != "")
                    $scope.validarAdjuntos = false;
       
                  break;
              case "INTJ_MCE":
                  if(document.getElementById('FILE_FOTOCOPIA_CI').value != "" && document.getElementById('FILE_POLIZA').value != ""  && document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_CERTIFICACION').value != "" && document.getElementById('FILE_COMPROMISO').value != "" && document.getElementById('FILE_IBNORCA').value != "")
                    $scope.validarAdjuntos = false;
                      
                  break;            
              case "INTJ_MEC":
                  if(document.getElementById('FILE_FOTOCOPIA_CI').value != "" && document.getElementById('FILE_POLIZA').value != ""  && document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_CERTIFICACION').value != "" && document.getElementById('FILE_COMPROMISO').value != "" && document.getElementById('FILE_IBNORCA').value != "")
                    $scope.validarAdjuntos = false;
        
                  break;
              default:
              text = "NO TIENE TIPO";                                    
          }
      } else {
          switch(categoria) {
              case "INTA_INT_JUE":
                  if(document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_CONSTITUCION').value != ""  && document.getElementById('FILE_PODER').value != "" && document.getElementById('FILE_FOTOCOPIA_CI_REP').value != "")
                    $scope.validarAdjuntos = false;
        
                  break;                
              case "INTB_COM":
                  if(document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_CONSTITUCION').value != ""  && document.getElementById('FILE_PODER').value != "" && document.getElementById('FILE_FOTOCOPIA_CI_REP').value != "" && document.getElementById('FILE_LICENCIA').value != "")
                    $scope.validarAdjuntos = false;
        
                  break;
              case "INTB_PUB":
                  if(document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_CONSTITUCION').value != ""  && document.getElementById('FILE_PODER').value != "" && document.getElementById('FILE_FOTOCOPIA_CI_REP').value != "" && document.getElementById('FILE_LICENCIA').value != "")
                    $scope.validarAdjuntos = false;
       

                  break;
              case "INTJ_MCE":
                  if(document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_PODER').value != "" && document.getElementById('FILE_FOTOCOPIA_CI_REP').value != "" && document.getElementById('FILE_DECLARACION_JURADA').value != "")
                    $scope.validarAdjuntos = false;
                  
       
                  break;
              case "INTJ_MEC":
                  if(document.getElementById('FILE_ANTECEDENTES').value != "" && document.getElementById('FILE_PODER').value != "" && document.getElementById('FILE_FOTOCOPIA_CI_REP').value != "")
                    $scope.validarAdjuntos = false;
        

                  break;
              default:
              text = "NO TIENE TIPO";                       
            }
    }
};
    //   **************************************************************************************************************************************************************************    
    //$scope.serializarInformacionyvan=function(datos){
    //    console.log(datos);
        /*wsRgistrarPubliciadad.registra_publicidades(datos).then(function(response){                
                console.log("datos response:",response);
              });*/
    //}    
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }catch (e) { 
        console.log("error", e); 
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});