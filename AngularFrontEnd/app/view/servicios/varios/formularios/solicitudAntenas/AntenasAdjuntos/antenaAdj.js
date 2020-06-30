function solicitudJAntenasController($scope,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter, $route,sweet,$http,FileUploader,$sce,fileUpload,fileUpload1,$timeout , filterFilter,FileUploader, $location, wsRgistrarPubliciadad, obtFechaActual ) 
{
    var tipoPersona = "";
    $scope.principalRegistro = false;
    $scope.btn_grd_repr = false;
    $scope.btn_act_repr = false;
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
            $scope.getTipoPersona(results[0].dtspsl_tipo_persona);
            $.unblockUI();
        });
    };
    $scope.getTipoPersona = function (val) {
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
     $scope.cambiarFile = function(obj, valor){
        if(typeof(obj.files[0]) != 'undefined'){
            setTimeout(function(){ 
                $.blockUI(); 
                var nombre = obj.getAttribute("name");
                var tamaniofile = obj.files[0];
                var tipoDoc = obj.files[0].name;
                var nameArrayci = tipoDoc.split('.');
                tipoDoc = nameArrayci[nameArrayci.length - 1].toLowerCase();
                tipoDoc = tipoDoc.toLowerCase();
                if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm') {
                    $scope.datos[obj.name] =  obj.files[0].name;
                    $scope.subirRequisitos(obj, valor);
                } else{
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(obj.name+'_campo').value = '';
                    valor = '';
                    $.unblockUI();
                };
            //$.unblockUI();
            },1000);
        }   
    };
    $scope.img = [];
    $scope.subirRequisitos  =   function(sobj, svalor){
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });

        var nombrecampo = sobj.id;
        var tipoDoc = sobj.files[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[nameArray.length -1 ].toLowerCase();
        var idTramite = sessionService.get('IDTRAMITE');
        var nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
        //$scope.url_img = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/Antenas/"+idTramite + "/";
        $scope.url_img = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+ "/";
        var rMisDocs = new Array();
        if(sobj.files[0]){
            rMisDocs.push(sobj.files[0]);
            $.blockUI();  
            $scope.almacenarRequisitos(rMisDocs,sobj.id,nombreNuevo,$scope.url_img);
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
    $scope.almacenarRequisitos = function(aArchivos,nombrecampo,nombreNuevo,url_img){
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        $scope.urlImagenfile = '';
        setTimeout(function(){ 
            var nombre = aArchivos[0].name;
            var tamaniofile = aArchivos[0].size;
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            var idTramite = sessionService.get('IDTRAMITE');
            $scope.direccionvirtual = "RC_CLI";
            //var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/Antenas/"+idTramite + "/";
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
            $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/Antenas/" + aArchivos[0].name + "?app_name=todoangular";
            if(typeof(aArchivos[0]) != 'undefined'){
                var tipoDoc = aArchivos[0].name;
                var nameArray = tipoDoc.split('.');
                tipoDoc = nameArray[nameArray.length - 1].toLowerCase();
                var nombre = nameArray[0] + '.zip';
                if (tamaniofile > 500000 || tamaniofile.size <= 15000000) { 
                  if (tipoDoc == "png" || tipoDoc == "jpg" || tipoDoc == "jpeg" || tipoDoc == "bmp" || tipoDoc == "gif") {
                        $scope.veriCompFile = true;
                        var filecompress = compressImage(aArchivos[0]).then(function(respuesta){
                            var imagenCompr = respuesta.name.split('.');
                            var tipoCia = imagenCompr[1];
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.'+tipoCia;
                            $.blockUI();  
                            fileUpload1.uploadFileToUrl1(respuesta, uploadUrl, nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 
                            var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                            UrlExists(urlImagen);
                            $scope.urlImagenfile = urlImagen;
                            if (nombrecampo == "FILE_CI_REP_LEGAL_INV") {
                                $scope.doc_ci_inv = nombreNuevo;
                            }else if (nombrecampo == "FILE_CI_REP_LEGAL_REV") {
                                $scope.doc_ci_rev = nombreNuevo;
                            } else if (nombrecampo == "FILE_PODER_REP_LEGAL") {
                                $scope.doc_po_leg = nombreNuevo;
                            } else{
                                $scope.nombrefile    = nombreNuevo;
                                $scope.urlImagenfileLicencia = $scope.urlImagenfile;
                            }
                            //$.unblockUI();
                        });
                    } else{
                        if (tipoDoc == 'pdf' ||  tipoDoc == 'docx' ||  tipoDoc == 'docxlm') {
                            var zipci = new JSZip();
                            zipci.file(aArchivos[0].name, aArchivos[0]);
                            zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blob) {
                                nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.zip';
                                $.blockUI();  
                                fileUpload1.uploadFileToUrl1(blob, uploadUrl, nombreNuevo);
                                document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 
                                var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                                UrlExists(urlImagen);
                                $scope.urlImagenfile = urlImagen;
                                if (nombrecampo == "FILE_CI_REP_LEGAL_INV") {
                                    $scope.doc_ci_inv = nombreNuevo;
                                }else if (nombrecampo == "FILE_CI_REP_LEGAL_REV") {
                                    $scope.doc_ci_rev = nombreNuevo;
                                } else if (nombrecampo == "FILE_PODER_REP_LEGAL") {
                                    $scope.doc_po_leg = nombreNuevo;
                                } else{
                                    $scope.nombrefile    = nombreNuevo;
                                    $scope.urlImagenfileLicencia = $scope.urlImagenfile;

                                }
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            $.unblockUI();
                        };                        
                    };
                }else{
                  if (tamaniofile <= 500000) {
                        if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm' || tipoDoc == 'PDF') {
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
                            $.blockUI();  
                            fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl,nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo;
                            var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                            //UrlExists(urlImagen);
                            $scope.urlImagenfile = urlImagen;
                            if (nombrecampo == "FILE_CI_REP_LEGAL_INV") {
                                $scope.doc_ci_inv = nombreNuevo;
                            }else if (nombrecampo == "FILE_CI_REP_LEGAL_REV") {
                                $scope.doc_ci_rev = nombreNuevo;
                            } else if (nombrecampo == "FILE_PODER_REP_LEGAL") {
                                $scope.doc_po_leg = nombreNuevo;
                            } else{
                                $scope.nombrefile    = nombreNuevo;
                                $scope.urlImagenfileLicencia = $scope.urlImagenfile;

                            }
                            //$.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('btn_ANTT_CON_ARR').value = ""; 
                            $scope.ANTT_CON_ARR = "";
                            $scope.datos.ANTT_CON_ARR = "";
                            $.unblockUI();
                        };
                  }else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande Ingrese otra por favor.', 'error');
                        $(this).val("");
                        $.unblockUI();
                  };
                }
            }
        $.unblockUI();
        },1000);
    };
    
    function UrlExists(url) {
        $.blockUI();
        $.get(url)
           .done(function() { 
               $.unblockUI();
              }).fail(function() { 
                setTimeout(() => {
                  UrlExists(url);
            }, 3000);
        }) 
    }
    $scope.addImage=function(e,idFoto){
        $.blockUI(); 
        $scope.img_hoja_referencia = true;
        setTimeout(function(){  
            $scope.idFoto=idFoto;
            var file = e.target.files[0];
            imageType = /image.*/;
            imageType1 = /application.*/; //type:"/pdf"
            if (!file.type.match(imageType) && !file.type.match(imageType1) )
                return;

            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);
             $.unblockUI();
                },1000);
    };

    $scope.mostrarimgjuridico  =   function(imagen){ 
        $scope.nombreVistaadj = "LICENCIA DE RADIODIFUSIÓN Y/O LICENCIA VIGENTE DE USO DE FRECUENCIAS DEL ESPECTRO RADIOELÉCTRICO EMITIDA POR LA AUTORIDAD DE REGULACIÓN Y FISCALIZACIÓN DE TELECOMUNICACIONES Y TRANSPORTES:";
        if(imagen == "FILE_LIC_RADIODIFUSION"){
            $scope.nombreVistaadj = $scope.nombreVistaadj;
            $scope.urlImagenfile  = $scope.urlImagenfileLicencia
        }
        $.blockUI();
        var estado = true;
        if ($scope.urlImagenfile != '' && $scope.urlImagenfile != undefined ) {
            try{
                $scope.archivoPOD = $scope.urlImagenfile;             
                var extPod   =  $scope.urlImagenfile.split("?app_name=todoangular");
                extPod       =  extPod[0].split(".");
                extPod       =  extPod[extPod.length-1];
                if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip'){
                    window.open($scope.archivoPOD, "_blank");
                }else{
                    $("#fotpod").modal("show");             
                }
                $.unblockUI();

            }catch(e){
              console.log("error",e);
              $.unblockUI();
            }   
        }else{
          swal('Error', 'Debe ingresar el Adjunto correspondiente', 'error');
        }
        $.unblockUI();
    }
    $scope.mostrarimgrepresentante  =   function(imagen){ 
        $scope.urlci_anv = "CEDULA DE IDENTIDAD DIGITALIZADA (Anverso)";
        $scope.urlci_rev = "CEDULA DE IDENTIDAD DIGITALIZADA (Reverso)";
        $scope.reppodleg = "PODER DE REPRESENTANTE LEGAL";
        if (imagen == "FILE_CI_REP_LEGAL_INV") {
            $scope.nombreVistaadj = $scope.urlci_anv;
            
        } else if(imagen == "FILE_CI_REP_LEGAL_REV") {
            $scope.nombreVistaadj = $scope.urlci_rev;
            
        } else if(imagen == "FILE_PODER_REP_LEGAL") {
            $scope.nombreVistaadj = $scope.reppodleg;
            
        }else if(imagen == "FILE_LIC_RADIODIFUSION"){
            $scope.nombreVistaadj = $scope.urlLicencia;
            
        }
        var urlImagen = "";
        if (imagen == "FILE_CI_REP_LEGAL_INV") {
            nombreNuevo = $scope.doc_ci_inv;

        }else if (imagen == "FILE_CI_REP_LEGAL_REV") {
            nombreNuevo = $scope.doc_ci_rev;
        } else if (imagen == "FILE_PODER_REP_LEGAL") {
            nombreNuevo = $scope.doc_po_leg;
        }
        if (nombreNuevo != "" && nombreNuevo != undefined) {
            
            urlImagen = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+ "/" +nombreNuevo+"?app_name=todoangular";
            $.blockUI();
            $scope.urlImagenrepreleg = urlImagen;
            var estado = true;
            if ($scope.urlImagenrepreleg != '' && $scope.urlImagenrepreleg != undefined ) {
                try{
                    $scope.archivoPOD = $scope.urlImagenrepreleg;             
                    var extPod   =  $scope.urlImagenrepreleg.split("?app_name=todoangular");
                    extPod       =  extPod[0].split(".");
                    extPod       =  extPod[extPod.length-1];
                    if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip'){
                        window.open($scope.archivoPOD, "_blank");
                    }else{
                        $("#fotpod").modal("show");             
                    }
                    $.unblockUI();
    
                }catch(e){
                  console.log("error",e);
                  $.unblockUI();
                }   
            }else{
              swal('Error', 'Por favor seleccione un documento desde  su equipo', 'error');
            }
            $.unblockUI();
        }else{
            //alertify.success('Registro no modificado');
            alertify.warning('Archivo no Almacenado');
        }
    }
    /////////////////////////////////////////////////////////////////
    //creando un nuevo registro 
    $scope.validacamposJuridico = function (){ 
        $scope.campo = document.getElementById('FILE_LIC_RADIODIFUSION_campo').value;
        if ($scope.campo != '' && $scope.campo != undefined) {
            $('#formModal').modal('show');
            $scope.isDisabled = false;
            $scope.getCaptchasX();
            if(tipoPersona == 'NATURAL'){
                $scope.opcionpersonaNatural = true;
                $scope.opcionpersonaJuridico = null;
                $scope.tituloVentana = 'Verificacion de número de carnet de identidad';         
            } else {
                $scope.opcionpersonaJuridico = true;
                $scope.opcionpersonaNatural = null;
                $scope.tituloVentana = 'Verificacion de número de NIT';                     
            }
            
        }else{
            swal('Error','Para realizar el registro es necesario que adjunte un documento Gracias..','error');
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
        var sw=100;
        var filtrov;
        var misDocs = new Array();
        misDocs.push($scope.FILE_LIC_RADIODIFUSION);
        var tipo_file = "FILE_LIC_RADIODIFUSION";
        var oid_ciu = sessionService.get('IDSOLICITANTE');
        var verifFiles = new reglasnegocio();
        verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
        verifFiles.parametros ='{"oidCiudadano":"' + oid_ciu + '","tipo_file":"'+ tipo_file +'"}';
        verifFiles.llamarregla(function(data){
            data = JSON.parse(data);
            if(data[0].ant_sp_busquedafile != ''){
                //$scope.verifica = false;
                $scope.actualizarDocumentos(misDocs);
            }else{
                //$scope.verifica = true;
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
            if(data[0].ant_sp_busquedafile != ''){
                $scope.$apply();
                $.blockUI();
                setTimeout(function(){
                    $scope.verifica = false;
                    $scope.rutaArchivoDoc = "RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/";
                    var uploadUrl = CONFIG.APIURL+"/files/"+$scope.rutaArchivoDoc;
                    $scope.name = data[0].ant_sp_busquedafile;//"carnetV.gif";
                    var cadenaURL = uploadUrl + $scope.name + '?app_name=' + CONFIG.APP_NAME;
                    //$scope.imagenPortada = cadenaURL;
                    $scope.urlImagenfile = cadenaURL;
                    $scope.urlImagenfileLicencia = cadenaURL;
                    document.getElementById('FILE_LIC_RADIODIFUSION_campo').value = $scope.name;
                    $.unblockUI();
                    $scope.$apply();
                },100);

            }else{
                $scope.verifica = true;
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
        });
        var tipoDoc = aFiles[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[nameArray.length -1].toLowerCase();
        nombreNuevo = 'lic_radiodifusion_'+fechaNueva+'.'+tipoDoc;

        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            $scope.registro.FILE_LIC_RADIODIFUSION   = aFiles[0].name;
            //var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+aFiles[0].name+'"}';
            var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+$scope.nombrefile+'"}';
            //fileUpload.uploadFileToUrl(aFiles[0], uploadUrl);
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
        });
        var tipoDoc = aFiles[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[nameArray.length - 1].toLowerCase();
        nombreNuevo = 'lic_radiodifusion_'+fechaNueva+'.'+tipoDoc;
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            $scope.registro.FILE_LIC_RADIODIFUSION   = aFiles[0].name;
            //var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+aFiles[0].name+'"}';
            var fileAnt = '{"FILE_LIC_RADIODIFUSION":"'+$scope.nombrefile+'"}';
            //misFilesAnt.push($scope.FILE_LIC_RADIODIFUSION); 
            //fileUpload.uploadFileToUrl(aFiles[0], uploadUrl,nombreNuevo);
            //$scope.Advertencia1 = "ok";
        }

        var guardarfiles = new reglasnegocio();
        guardarfiles.identificador = "RCCIUDADANO_INS_FILES_ANT";
        var idusu = 68;
        guardarfiles.parametros ='{"oid":"' + oidCiudadano + '","tipoP":"' + tipoPersona + '","files":' + JSON.stringify(fileAnt) + ',"usr_id":' + idusu + '}';
        guardarfiles.llamarregla(function(data){
            $.blockUI();
            swal('', 'Documento almacenado correctamente', 'success');
            $('#formModal').modal('hide');
            $.unblockUI();
        });
    }; 

    $scope.iniAntenasAdjuntos = function() {
      $scope.getDatosRegistro();
      var tipo_file = "FILE_LIC_RADIODIFUSION";
      var oid_ciu = sessionService.get('IDSOLICITANTE');
      $scope.verificacionFiles(oid_ciu,tipo_file);
      $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
      $scope.principalRegistro = false;
    };

    $scope.$on('api:ready',function(){
      $scope.getDatosRegistro();
      $scope.verificacionFiles(oid_ciu,tipo_file);
    });
    /////////////////REPRESENTANTES LEGALES/////////////
    $scope.getRepresentantes = function(nit_representante){
        $.blockUI();
        var resRepresentante = new reglasnegocio();
        resRepresentante.identificador = 'RCCIUDADANO_ANTENA_20-1';
        resRepresentante.parametros = '{"nit_representante":"'+ nit_representante +'"}';
        resRepresentante.llamarregla(function(response){
            $scope.obtDatos = JSON.parse(response);
            if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                $scope.obtRepresentanteLegal = [];
                //$("#divMsj").css({'display' : 'block' });
                $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                $.unblockUI();
            } else{
                $scope.obtRepresentanteLegal = $scope.obtDatos;
                var data = response;
                $scope.tablalstReprLegal.reload();
                $.unblockUI();
            };
        });      
    };

    $scope.obtRepresentanteLegal = [];
    $scope.tablalstReprLegal = new ngTableParams({
        page: 1,
        count: 20,
        filter: {},
        sorting: {}
    }, {
    total: $scope.obtRepresentanteLegal.length,
    getData: function($defer, params) {
        var filteredData = params.filter() ?
        $filter('filter')($scope.obtRepresentanteLegal, params.filter()) :
        $scope.obtRepresentanteLegal;
        var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.obtRepresentanteLegal;
        params.total(orderedData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    $scope.recInfo = function(){
        var nit_ciu = sessionService.get('NITCIUDADANO');
        $("#nit_rep").val(nit_ciu);
        $scope.principalRegistro = true;
        $scope.btn_grd_repr = true;
        $scope.btn_act_repr = false;
    }
    $scope.ocultarDiv = function(){
        $scope.principalRegistro = false;
        $("#FILE_CI_REP_LEGAL_INV_campo").val("");
        $("#FILE_CI_REP_LEGAL_REV_campo").val("");
        $("#FILE_PODER_REP_LEGAL_campo").val("");
        $("#ci_rep").val("");
        $("#nom_rep").val("");
        $("#pat_rep").val("");
        $("#mat_rep").val("");
        $("#nro_poder_rep").val("");
        $("#FILE_CI_REP_LEGAL_INV_campo").val("");
        $("#FILE_CI_REP_LEGAL_REV_campo").val("");
        $("#FILE_PODER_REP_LEGAL_campo").val("");
        $scope.doc_ci_inv = "";
        $scope.doc_ci_rev = "";
        $scope.doc_po_leg = "";

    }
    $scope.reg_representante = function(dataRepre){
        $scope.ci_inv  = $("#FILE_CI_REP_LEGAL_INV_campo").val();
        $scope.ci_rev  = $("#FILE_CI_REP_LEGAL_REV_campo").val();
        $scope.poderLegal = $("#FILE_PODER_REP_LEGAL_campo").val();
        if($scope.ci_inv != "" && $scope.ci_rev != "" && $scope.poderLegal != "" ){
            $.blockUI();
            var dataReprepresentante = '[{"ci_inverso":"'+ $scope.ci_inv +'","ci_reverso":"'+$scope.ci_rev+'","poder_legal":"'+$scope.poderLegal+'"}]';
            var datausuario = sessionService.get('IDUSUARIO');
            var resRepresentante = new reglasnegocio();
            resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-3';
            resRepresentante.parametros = '{"nit":"'+ sessionService.get('NITCIUDADANO') +'","ci":"'+ dataRepre.ci_rep +'","nombre":"'+ dataRepre.nom_rep +'","paterno":"'+ dataRepre.pat_rep+'","materno":"'+ dataRepre.mat_rep +'","ext":"'+ dataRepre.exp_rep +'","numPoder":"'+ dataRepre.nro_poder_rep +'","dataRep":'+ JSON.stringify(dataReprepresentante) +',"usuario":"'+ datausuario +'"}';
            resRepresentante.llamarregla(function(response){
                $scope.obtDatos = JSON.parse(response);
                if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                    $scope.obtRepresentanteLegal = [];
                    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                    $.unblockUI();
                } else{
                    if ($scope.obtDatos[0].inserta_representante) {
                        
                        $("#divMsj").css({'display' : 'block' });
                        swal('', 'Representante almacenado correctamente', 'success'); 
                        $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
                        $.unblockUI();
                        $("#ci_rep").val("");
                        $("#nom_rep").val("");
                        $("#pat_rep").val("");
                        $("#mat_rep").val("");
                        $("#nro_poder_rep").val("");
                        $("#FILE_CI_REP_LEGAL_INV_campo").val("");
                        $("#FILE_CI_REP_LEGAL_REV_campo").val("");
                        $("#FILE_PODER_REP_LEGAL_campo").val("");
                        $scope.principalRegistro = false;

                    }else{
                        $.unblockUI();
                    }
                };
            });
        }else{
            if ($scope.ci_inv == "") {
                alertify.warning('Archivo CI del Representante Anverso no Almacenado');
            } if ($scope.ci_rev == "") {
                alertify.warning('Archivo CI del Representante Reverso no Almacenado');
            } if ($scope.poderLegal == "") {
                alertify.warning('Archivo Poder del Representante Legal no Almacenado');
            } 
        }
    }
    
    $scope.eliminarRepresnte = function(dataRepre){
        $.blockUI();
        swal({   title: "¿Esta Seguro de Eliminar el Represetante?",
            text: "",
            type: "warning",   
            cancelButtonText: "Cancelar",
            showCancelButton:   true,
            confirmButtonColor: "#DD6B55",  
            confirmButtonText:  "Si, Eliminar!",
            closeOnConfirm: false
            }, function(){
                var datausuario = sessionService.get('IDUSUARIO');
                var resRepresentante = new reglasnegocio();
                resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-2';
                resRepresentante.parametros = '{"id_representante":'+ dataRepre.id_rep +',"usuario":"'+ sessionService.get('IDUSUARIO') +'"}';
                resRepresentante.llamarregla(function(response){
                    $scope.obtDatos = JSON.parse(response);
                    if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                        $scope.obtRepresentanteLegal = [];
                        $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                        $.unblockUI(); 
                    } else{
                        if ($scope.obtDatos[0].sp_delete_representante_id) {
                            $("#divMsj").css({'display' : 'block' });
                            swal('Ok!', 'El Representante se Elimino Correctamente', 'success');
                            $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
                            $.unblockUI();
                        }else{
                            $.unblockUI();
                        }
                    };
                });
        }); 
        $.unblockUI(); 
    }

    $scope.editaRepresentante = function(dataRepre){
        //var dataNom = dataRepre.nombre.split(" "); //split(" ",dataRepre.nombre);
        var dataAdjuntos = JSON.parse(dataRepre.datarep);
        $("#id_rep").val(dataRepre.id_rep);
        $("#nit_rep").val(dataRepre.nit);
        $("#ci_rep").val(dataRepre.ci);
        $("#nom_rep").val(dataRepre.nombre);
        $("#pat_rep").val(dataRepre.paterno);
        $("#mat_rep").val(dataRepre.materno);
        $("#exp_rep").val(dataRepre.ext);
        $("#nro_poder_rep").val(dataRepre.numero_poder);
        $("#FILE_CI_REP_LEGAL_INV_campo").val(dataAdjuntos[0].ci_inverso);
        $("#FILE_CI_REP_LEGAL_REV_campo").val(dataAdjuntos[0].ci_reverso);
        $("#FILE_PODER_REP_LEGAL_campo").val(dataAdjuntos[0].poder_legal);
        $scope.doc_ci_inv = dataAdjuntos[0].ci_inverso;
        $scope.doc_ci_rev = dataAdjuntos[0].ci_reverso;
        $scope.doc_po_leg = dataAdjuntos[0].poder_legal;
        $scope.id_represen = dataRepre.id_rep;
        $scope.principalRegistro = true;
        $scope.btn_grd_repr = false;
        $scope.btn_act_repr = true;

    }

    $scope.act_representante = function(dataRepre){
        
        $scope.ci_inv  = $("#FILE_CI_REP_LEGAL_INV_campo").val();
        $scope.ci_rev  = $("#FILE_CI_REP_LEGAL_REV_campo").val();
        $scope.poderLegal = $("#FILE_PODER_REP_LEGAL_campo").val();
        if($scope.ci_inv != "" && $scope.ci_rev != "" && $scope.poderLegal != "" ){
            
            $.blockUI();
            var dataReprepresentanteUPD = JSON.stringify('[{"ci_inverso":"'+ $scope.ci_inv +'","ci_reverso":"'+$scope.ci_rev+'","poder_legal":"'+$scope.poderLegal+'"}]');
            var datausuario = sessionService.get('IDUSUARIO');
            var resRepresentante = new reglasnegocio();
            resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-4';
            resRepresentante.parametros = '{"id_registro":'+ $scope.id_represen +', "nit":"'+ sessionService.get('NITCIUDADANO') +'","ci":"'+ $("#ci_rep").val() +'","nombre":"'+ $("#nom_rep").val() +'","paterno":" '+ $("#pat_rep").val()+' ","materno":"'+ $("#mat_rep").val() +'","ext":"'+ $("#exp_rep").val() +'","numPoder":"'+ $("#nro_poder_rep").val() +'","dataRep":'+ dataReprepresentanteUPD +',"usuario":"'+ datausuario +'"}';
            resRepresentante.llamarregla(function(response){
                $scope.obtDatos = JSON.parse(response);
                if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                    $scope.obtRepresentanteLegal = [];
                    $("#divMsj").css({'display' : 'block' });
                    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                    $.unblockUI();
                } else{
                    if ($scope.obtDatos[0].actualiza_representante) {
                        
                        $("#divMsj").css({'display' : 'block' });
                        swal('', 'Representante Actualizado correctamente', 'success'); 
                        $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
                        $.unblockUI();
                        $scope.principalRegistro = false;
                        $("#ci_rep").val("");
                        $("#nom_rep").val("");
                        $("#pat_rep").val("");
                        $("#mat_rep").val("");
                        $("#nro_poder_rep").val("");
                        $("#FILE_CI_REP_LEGAL_INV_campo").val("");
                        $("#FILE_CI_REP_LEGAL_REV_campo").val("");
                        $("#FILE_PODER_REP_LEGAL_campo").val("");

                    }else{
                        $.unblockUI();
                    }
                };
            });
            $.blockUI();
        }else{
            if ($scope.ci_inv == "") {
                alertify.warning('Archivo CI del Representante Anverso no Almacenado');
                return false;
            } if ($scope.ci_rev == "") {
                alertify.warning('Archivo CI del Representante Reverso no Almacenado');
            } if ($scope.poderLegal == "") {
                alertify.warning('Archivo Poder del Representante Legal no Almacenado');
            } 
        }
    }
}