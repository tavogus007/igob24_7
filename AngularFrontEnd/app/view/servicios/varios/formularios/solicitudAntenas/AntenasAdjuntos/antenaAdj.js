function solicitudJAntenasController($scope,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter, $route,sweet,$http,FileUploader,$sce,fileUpload,fileUpload1,$timeout , filterFilter,FileUploader, $location, wsRgistrarPubliciadad, obtFechaActual ) 
{
    var tipoPersona = "";
    
    $scope.getDatosRegistro = function(){   
       var validarpromesas = [$scope.recuperarDatosRegistro()];
       //$q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
       //});
    }
    var idCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.recuperarDatosRegistro = function(){ 
        $scope[name] = 'Running';
        //var deferred = $q.defer();
        //$.blockUI();
        var datosCiudadano=new rcNatural();
        datosCiudadano.oid=idCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            results = JSON.parse(resultado);
            console.log("tipo de persona",results[0].dtspsl_tipo_persona);
            $scope.getTipoPersona(results[0].dtspsl_tipo_persona);
            console.log("respuesta del re",results);
            $.unblockUI();
        });
    };
    $scope.getTipoPersona = function (val) {
        //alert(123);
        //console.log("wwwwwwwwww",val);
       descripcionPersona = val;
       if (val == "NATURAL") {
           //alert("Natural");
           tipoPersona = "NATURAL";
           $scope.tipo="Natural";
           //$scope.limpiarFormRegistro();
       };
       if (val == "JURIDICO") {
           //alert("Juridica");
           tipoPersona = "JURIDICO"
           $scope.tipo="Jurídico";
           //$scope.limpiarFormRegistro();
       };
       //$scope.registro.tipoP = tipoPersona;
    }; 
    $scope.addImage=function(e,idFoto){
        $.blockUI(); 
        $scope.img_hoja_referencia = true;
        setTimeout(function(){  
            $scope.idFoto=idFoto;
            var file = e.target.files[0],
            imageType = /image.*/;
            if (!file.type.match(imageType))
                return;
            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);
             $.unblockUI();
                },1000);
    };

    function fileOnload(e) {
        var result=e.target.result;
        switch($scope.idFoto) {
            case 0:
            $('#imgSalida').attr("src",result);
            var b64_2 = result.split('data:image/jpeg;base64,');
            $scope.labels2 = b64_2[1];
            break;  
            case 1:
            $('#imgSalida1').attr("src",result);
            var b64_1 = result.split('data:image/jpeg;base64,');
            $scope.labelºs1 = b64_1[1];
            break;  
        }

    }
    /////////////////////////////////////////////////////////////////
    //creando un nuevo registro 
    $scope.validacamposJuridico = function (){                 
        $scope.isDisabled = false;
        $scope.getCaptchasX();
        if(tipoPersona == 'NATURAL'){
            //alert(1111);
            $scope.opcionpersonaNatural = true;
            $scope.opcionpersonaJuridico = null;
            $scope.tituloVentana = 'Verificacion de número de carnet de identidad';         
        } else {
            //alert(2222);
            $scope.opcionpersonaJuridico = true;
            $scope.opcionpersonaNatural = null;
            $scope.tituloVentana = 'Verificacion de número de NIT';                     
        }
    }
    $scope.btnCapcha=true;
    $scope.ErrorCapcha='';
    $scope.getlimpiareRROR=function()
    {
    $scope.ErrorCapcha='';
    }
    $scope.getCaptchasX=function(){
            $scope.resultadoC="";
            var objCaptcha = new captcha();
            objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNG = i1.substring(1, i1.length - 1);
            $scope.imageCST = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
          });
    };

    $scope.lmpCaptcha = function(datos)
    {
        $scope.ErrorCapcha='';
    }
    var numero = 0;
    $scope.VerificarCapchaR = function(response)
    {   
        //http://192.168.5.141/rest/files/RC_CLI/57798e502f59181eb2873e5d/carnetrdo.jpeg?app_name=todoangular
        $scope.habGuardarMod = true;
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
            swal('', 'Error en el captcha intentar de nuevo por favor', 'warning');   
            $scope.getCaptchasX();
            $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
        }else{
                $scope.validarCiCiudadano(response); 
            }
        });
    };
    var tiemporespuesta = null;
    function verificarKeyPress(captch){
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if(nroregsitros == 0){
                $scope.habGuardarMod = true;
                $scope.ErrorCapchasXX = "Error en el captcha intentar de nuevo por favor";
                $scope.SuccesCapchasxx="";
                $scope.$apply();
            } else {
                $scope.habGuardarMod = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx="Capcha correcto.";
                $scope.$apply();
            }
        });
    }
    $scope.VerificarCapcha = function(datos, prsCI) {  
        $scope.habGuardarMod = true;
        var captch  = $("#resultadoC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasX = "";
        if(captch.length > 4){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1000);
        }
    };  
    // ******FIN DE CAPCHA****************
     $scope.validarCiCiudadano = function(response){
        //console.log("ssssssssssss",$scope.FILE_LIC_RADIODIFUSION);

        var sw=100;
        var filtrov;
        var misDocs = new Array();
        misDocs.push($scope.FILE_LIC_RADIODIFUSION);
        //console.log("array to misdocs",misDocs);
        var tipo_file = "FILE_LIC_RADIODIFUSION";
        var oid_ciu = sessionService.get('IDSOLICITANTE');
        var verifFiles = new reglasnegocio();
        verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
        verifFiles.parametros ='{"oidCiudadano":"' + oid_ciu + '","tipo_file":"'+ tipo_file +'"}';
        verifFiles.llamarregla(function(data){
            data = JSON.parse(data);
            //console.log("wwwwwwwwwwwww",data);
            if(data[0].ant_sp_busquedafile != ''){
                //$scope.verifica = false;
                //console.log("ddddddrespuesta de la busqueda", data);
                $scope.actualizarDocumentos(misDocs);
            }else{
                //$scope.verifica = true;
                //console.log("wwwwwwwwrespuesta de la busqueda", data);
                $scope.almacenarDocumentos(misDocs);
            }
        });
        

        
    };
    $scope.verificacionFiles = function(oid_ciu,tipo_file){
        
        var verifFiles = new reglasnegocio();
        verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
        var idusu = 68;
        verifFiles.parametros ='{"oidCiudadano":"' + oid_ciu + '","tipo_file":"'+ tipo_file +'"}';
        verifFiles.llamarregla(function(data){
            data = JSON.parse(data);
            ///console.log("wwwwwwwwwwwww",data[0].ant_sp_busquedafile);
            if(data[0].ant_sp_busquedafile != ''){
                $scope.$apply();
                $.blockUI();
                setTimeout(function(){
                    $scope.verifica = false;
                    console.log("ddddddrespuesta de la busqueda", data);
                    $scope.rutaArchivoDoc = "RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/";
                    var uploadUrl = CONFIG.APIURL+"/files/"+$scope.rutaArchivoDoc;
                    $scope.name = data[0].ant_sp_busquedafile;//"carnetV.gif";
                    var cadenaURL = uploadUrl + $scope.name + '?app_name=' + CONFIG.APP_NAME;
                    console.log("vvvvv",cadenaURL);
                    $scope.imagenPortada = cadenaURL;
                    $.unblockUI();
                    $scope.$apply();
                },100);

            }else{
                $scope.verifica = true;
                //console.log("wwwwwwwwrespuesta de la busqueda", data);
            }
        });

    }
    $scope.actualizarDocumentos = function(aFiles){
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
            //console.log(fechaNueva,'fechas');
        });
        var tipoDoc = aFiles[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[1];
        nombreNuevo = 'lic_radiodifusion_'+fechaNueva+'.'+tipoDoc;

        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            $scope.registro.FILE_LIC_RADIODIFUSION   = aFiles[0].name;
            var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+aFiles[0].name+'"}';
            fileUpload.uploadFileToUrl(aFiles[0], uploadUrl);
        }

        var guardarfiles = new reglasnegocio();
        guardarfiles.identificador = "RCCIUDADANO_ACT_FILES_ANT";
        var idusu = 68;
        guardarfiles.parametros ='{"oid":"' + oidCiudadano + '","tipoP":"' + tipoPersona + '","files":' + JSON.stringify(fileAnt) + ',"usr_id":' + idusu + '}';
        guardarfiles.llamarregla(function(data){
            $.blockUI();
            swal('', 'Documento actualizado correctamente', 'success');
            $('#formModal').modal('hide');
            $.unblockUI();
        });
    }
    $scope.almacenarDocumentos = function(aFiles){
        //var misFilesAnt = new Array();
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
            //console.log(fechaNueva,'fechas');
        });
        var tipoDoc = aFiles[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[1];
        nombreNuevo = 'lic_radiodifusion_'+fechaNueva+'.'+tipoDoc;
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            $scope.registro.FILE_LIC_RADIODIFUSION   = aFiles[0].name;
            var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+aFiles[0].name+'"}';
            //misFilesAnt.push($scope.FILE_LIC_RADIODIFUSION); 
            fileUpload.uploadFileToUrl(aFiles[0], uploadUrl,nombreNuevo);
            //$scope.Advertencia1 = "ok";
        }

        var guardarfiles = new reglasnegocio();
        guardarfiles.identificador = "RCCIUDADANO_INS_FILES_ANT";
        var idusu = 68;
        guardarfiles.parametros ='{"oid":"' + oidCiudadano + '","tipoP":"' + tipoPersona + '","files":' + JSON.stringify(fileAnt) + ',"usr_id":' + idusu + '}';
        guardarfiles.llamarregla(function(data){
            $.blockUI();
            //$scope.tramitesCiudadano();
            swal('', 'Documento almacenado correctamente', 'success');
            $('#formModal').modal('hide');
            $.unblockUI();
            //$scope.getCaptchasX();
        });

        console.log("registroooooo", $scope.registro);
        /*if (aFiles[7]){
        }*/
    }; 

    $scope.iniAntenasAdjuntos = function() {
      //http://192.168.5.141/rest/files/req_Antenas/5b7ec213def215dfdc000005/imagennn.jpg?app_name=todoangular
      //http://192.168.5.141/rest/files/RC_CLI/5b7ec213def215dfdc000005/carnet_ciudadano.jpeg?app_name=todoangular
      $scope.getDatosRegistro();
      var tipo_file = "FILE_LIC_RADIODIFUSION";
      var oid_ciu = sessionService.get('IDSOLICITANTE');
      $scope.verificacionFiles(oid_ciu,tipo_file);

      //http://192.168.5.141:80/rest/files/req_Antenas/Adjuntossss?app_name=todoangular


      //http://192.168.5.141/rest/files/req_Antenas/57798e502f59181eb2873e5d/carnetV.gif?app_name=todoangular
      //$scope.imagenPortada = 'http://192.168.5.141/rest/files/RC_CLI/57798e502f59181eb2873e5d/carnetrdo.jpeg?app_name=todoangular';
    };

    $scope.$on('api:ready',function(){
      $scope.getDatosRegistro();
      $scope.verificacionFiles(oid_ciu,tipo_file);

      //scope.imagenPortada = 'http://192.168.5.141/rest/files/RC_CLI/57798e502f59181eb2873e5d/carnetrdo.jpeg?app_name=todoangular';

    });
}