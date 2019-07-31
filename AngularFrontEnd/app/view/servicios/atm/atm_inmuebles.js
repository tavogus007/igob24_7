function atmInmueblesController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
    console.log('controlador inmuebles');
    //var fecha = new Date();
    //var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    $scope.divNatural = null;
    $scope.divJuridico = null;

    $scope.verificarCamposInternetAtm = function (data) {
        /*REQUISITOS2018*/
            $scope.serializarInformacionAtm(data);
    }   

    /*$scope.inicioInmuebles = function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.sTipoPersona == "NATURAL"){
            $scope.divNatural = "mostrar";

        } else {
            $scope.divJuridico = "mostrar";
        }
    };*/

    $scope.validarEnvioAtm = function(data){
        console.log('los datossssssssssssss enviarrr   ',data);
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLineaAtm(data);
            }, 1000);
        });
    };

    $scope.enviarFormProcesosLineaAtm = function(paramForm){
        console.log('paramForm  ======================>',paramForm);
        //$scope.ultimoArrayAdjunto();
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'FA_INM';
        var datosNeXO = {};
        $scope.divVIAE="mostrar";
       
        datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
        if ($scope.tipoPersona == 'NATURAL'){
            datosNeXO['f01_tipo_per']       =   'N';
            datosNeXO['f01_tipo_per_desc']  = 'NATURAL';
            datosNeXO['FA_GEN']  = paramForm.FA_GEN;
            datosNeXO['FA_EXP']  = paramForm.FA_EXP;
            datosNeXO['FA_CORR']     = paramForm.FA_CORR;
            datosNeXO['FA_CEL']       = paramForm.FA_CEL;
            datosNeXO['f01_telef_prop']     = paramForm.f01_telef_prop;
            datosNeXO['INT_FEC_SOLICITUD']  = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA']         = paramForm.CI_BIGDATA;
            datosNeXO['FA_NOMB']   = paramForm.FA_NOMB;
            datosNeXO['FA_AP_PAT']   = paramForm.FA_AP_PAT;
            datosNeXO['FA_AP_MAT']   = paramForm.FA_AP_MAT;
            datosNeXO['f01_tip_doc_prop']   = paramForm.f01_tip_doc_prop;
            datosNeXO['FA_TIPO_VIA']         = paramForm.FA_TIPO_VIA;
            datosNeXO['FA_NUM_DOC']         = paramForm.FA_NUM_DOC;
            datosNeXO['FA_NOM_VIA']         = paramForm.FA_NOM_VIA;

            datosNeXO['IN_CAL_CONTRI']      = paramForm.IN_CAL_CONTRI; 
            datosNeXO['IN_CAL_CONTRI_VALOR']      = paramForm.IN_CAL_CONTRI_VALOR; 

            datosNeXO['FA_CTRI']            = paramForm.FA_CTRI;
            datosNeXO['FA_CTRI_VALOR']      = paramForm.FA_CTRI_VALOR;

            datosNeXO['FA_PMC']             = paramForm.FA_PMC;
            datosNeXO['IN_CAN_TRAM']        = paramForm.IN_CAN_TRAM;


            datosNeXO['FA_TTRI']            = paramForm.FA_TTRI;
            datosNeXO['FA_TTRI_VALOR']      = paramForm.FA_TTRI_VALOR;

            
            
            datosNeXO['g_tipo'] = "FA_INM";
            //DATOS DE DIRECION DEL CONTRIBUYENTE            
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;            
            //datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
        }
        console.log('nexooooooooooooooo    ',datosNeXO);

        var datosSerializados = JSON.stringify(datosNeXO);
        //archivo1 = "";
        var crearCaso   =   new gCrearCaso();
        crearCaso.usr_id    = 1,
        crearCaso.datos     = datosSerializados,
        crearCaso.procodigo = idProcodigo,
        crearCaso.crearCasoAeLinea(function(response){
            console.log('la respuesta    ',response);
            try{
                $scope.botones = null;
                $scope.desabilitado = true;
                response    =   JSON.parse(response);
                var results = response.success.data;
                //indice = 0;
                //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                    datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                    datosIF2 = datosIF[1];
                    datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                    $scope.nrotramitec = datosIF[0];
                    sessionService.set('NROTRAMITE', datosIF[0]);
                    sessionService.set('NROTRAMITEID', datosIF[1]);
                    sessionService.set('IDPROCESO', datosIF[6]);
                    var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                    //datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                    //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                    try{
                       ///$scope.capturarImagen();
                        $scope.validarFormProcesos(paramForm);
                    }catch(e){}

                    $.unblockUI();
            }catch(e){
                console.log("falla: ", e);
                alert("conexion fallida ");
            }
        });         
    };

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
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI(); 
        }
    };

    $scope.inicioInmuebles=function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        //$scope.macrodistritos();
        $scope.tipoTramitesInmuebles();

        var tipo = 1;
        $scope.getCaptchasXX();
        if($scope.sTipoPersona=="NATURAL"){
            $scope.divNatural = "mostrar";

        } else {
            $scope.divJuridico = "mostrar";
        }
    };

    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };

    $scope.tipoTramitesInmuebles = function(){
		var datosInm = new reglasnegocioA();
		datosInm.identificador = 'SERVICIO_VALLE-694';
		datosInm.parametros = '{"xtipo_tramite":2}';//2 es inmuebles
		datosInm.llamarregla(function(resultado){
            dataw = JSON.parse(resultado);
            console.log('resultado',resultado);

            var datos = dataw;    
                console.log('data motores',dataw,dataw.length);
                for(i=0;i<dataw.length;i++){
                    $scope.tramiteId = JSON.parse(datos[i].data).tramite_id;
                    var tramiteNombre = JSON.parse(datos[i].data).nombre_tramite;
                    document.getElementById("FA_TTRI").innerHTML += '<option value='+$scope.tramiteId+'>'+tramiteNombre+'</option>';
                }
            })
        };



       
             
        $scope.subtiposTramitesInmuebles = function(tipo){
            console.log("tipo:: ", tipo);
            var claInm = new reglasnegocioA();
            claInm.identificador = 'SERVICIO_VALLE-695';
            claInm.parametros = '{"xclasificacion":' + tipo + '}';
            claInm.llamarregla(function(res){
                var datas = JSON.parse(res);
                var datosC = datas;    
                    console.log('data motores sub tipo',datosC,datas.length, res);

                    for(i=0;i<datas.length;i++){
                        var tramiteIdCla = JSON.parse(datosC[i].data).clasificacion_tramite_id;
                        var tramiteNombreCla = JSON.parse(datosC[i].data).nombre_tramite;
                        document.getElementById("FA_CTRI").innerHTML += '<option value='+tramiteIdCla+'>'+tramiteNombreCla+'</option>';
    
                    }
                })
            };

           
}