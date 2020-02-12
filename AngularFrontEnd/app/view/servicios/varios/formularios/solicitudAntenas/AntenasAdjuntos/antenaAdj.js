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
          $.blockUI(); 
          setTimeout(function(){ 
            var nombre = obj.getAttribute("name");
            var tamaniofile = obj.files[0];
            var tipoDoc = obj.files[0].name;
            var nameArrayci = tipoDoc.split('.');
            tipoDoc = nameArrayci[1];
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
          $.unblockUI();
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
      tipoDoc = nameArray[1].toLowerCase();
      var idTramite = sessionService.get('IDTRAMITE');
      var nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
      //$scope.url_img = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/Antenas/"+idTramite + "/";
      $scope.url_img = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+ "/";
      var rMisDocs = new Array();
      if(sobj.files[0]){
          rMisDocs.push(sobj.files[0]);
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
        $.blockUI();  
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
                tipoDoc = nameArray[1].toLowerCase();
                var nombre = nameArray[0] + '.zip';
                if (tamaniofile > 500000 || tamaniofile.size <= 15000000) { 
                  if (tipoDoc == "png" || tipoDoc == "jpg" || tipoDoc == "jpeg" || tipoDoc == "bmp" || tipoDoc == "gif") {
                        $.blockUI();  
                        $scope.veriCompFile = true;
                        var filecompress = compressImage(aArchivos[0]).then(function(respuesta){
                            var imagenCompr = respuesta.name.split('.');
                            var tipoCia = imagenCompr[1];
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.'+tipoCia;
                            fileUpload1.uploadFileToUrl1(respuesta, uploadUrl, nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 
                            var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                            $scope.urlImagenfile = urlImagen;
                            $scope.nombrefile    = nombreNuevo;
                            $.unblockUI();
                        });
                    } else{
                        if (tipoDoc == 'pdf' ||  tipoDoc == 'docx' ||  tipoDoc == 'docxlm') {
                            var zipci = new JSZip();
                            zipci.file(aArchivos[0].name, aArchivos[0]);
                            zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blob) {
                                nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blob, uploadUrl, nombreNuevo);
                                document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 
                                var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                                $scope.urlImagenfile = urlImagen;
                                $scope.nombrefile    = nombreNuevo;


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
                            $.blockUI();  
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
                            fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl,nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo;
                            var urlImagen = url_img+nombreNuevo+"?app_name=todoangular";
                            $scope.urlImagenfile = urlImagen;
                            $scope.nombrefile    = nombreNuevo;
                            $.unblockUI();
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
    //http://192.168.5.141/rest/files/RC_CLI/5b9c6a081a3fe6e3e2000003/LIC_RADIODIFUSION_20191115_99.jpg?app_name=todoangular

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
          swal('Error', 'Por favor seleccione un documento desde  su equipo', 'error');
        }
              
        $.unblockUI();
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
        tipoDoc = nameArray[1];
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
        tipoDoc = nameArray[1];
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

      //http://192.168.5.141/rest/files/req_Antenas/5b7ec213def215dfdc000005/imagennn.jpg?app_name=todoangular
      //http://192.168.5.141/rest/files/RC_CLI/5b7ec213def215dfdc000005/carnet_ciudadano.jpeg?app_name=todoangular
      $scope.getDatosRegistro();
      var tipo_file = "FILE_LIC_RADIODIFUSION";
      var oid_ciu = sessionService.get('IDSOLICITANTE');
      $scope.verificacionFiles(oid_ciu,tipo_file);
      $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));


      //http://192.168.5.141:80/rest/files/req_Antenas/Adjuntossss?app_name=todoangular


      //http://192.168.5.141/rest/files/req_Antenas/57798e502f59181eb2873e5d/carnetV.gif?app_name=todoangular
      //$scope.imagenPortada = 'http://192.168.5.141/rest/files/RC_CLI/57798e502f59181eb2873e5d/carnetrdo.jpeg?app_name=todoangular';
    };

    $scope.$on('api:ready',function(){
      $scope.getDatosRegistro();
      $scope.verificacionFiles(oid_ciu,tipo_file);
      //scope.imagenPortada = 'http://192.168.5.141/rest/files/RC_CLI/57798e502f59181eb2873e5d/carnetrdo.jpeg?app_name=todoangular';

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
                $("#divMsj").css({'display' : 'block' });
                $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                $.unblockUI();
                alertify.warning('No existen datos');  
            } else{

                $scope.obtRepresentanteLegal = $scope.obtDatos;
                var data = response;
                $scope.tablalstReprLegal.reload();
                  
                alertify.warning('existen datos');  
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
    }

    $scope.reg_representante = function(dataRepre){
        console.log("WWWW",dataRepre);
        $.blockUI();
        var dataReprepresentante = '[{}]';
        var datausuario = sessionService.get('IDUSUARIO');
        var resRepresentante = new reglasnegocio();
        resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-3';
        resRepresentante.parametros = '{"nit":"'+ sessionService.get('NITCIUDADANO') +'","ci":"'+ dataRepre.ci_rep +'","nombre":"'+ dataRepre.nom_rep +' '+ dataRepre.pat_rep+' '+ dataRepre.mat_rep +'","ext":"'+ dataRepre.exp_rep +'","numPoder":"'+ dataRepre.nro_poder_rep +'","dataRep":"'+ dataReprepresentante +'","usuario":"'+ datausuario +'"}';
        resRepresentante.llamarregla(function(response){
            $scope.obtDatos = JSON.parse(response);
            if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                $scope.obtRepresentanteLegal = [];
                $("#divMsj").css({'display' : 'block' });
                $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                $.unblockUI();
                alertify.warning('No existen datos');  
            } else{
                if ($scope.obtDatos[0].inserta_representante) {
                    
                    $("#divMsj").css({'display' : 'block' });
                    swal('', 'Representante almacenado correctamente', 'success'); 
                    $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
                    $.unblockUI();
                    alertify.warning('existen datos'); 
                    $("#ci_rep").val("");
                    $("#nom_rep").val("");
                    $("#pat_rep").val("");
                    $("#mat_rep").val("");
                    $("#nro_poder_rep").val("");

                }else{
                    $.unblockUI();

                }

            };
        });
    }
    
    $scope.eliminarRepresnte = function(dataRepre){
        $.blockUI();
        swal({   title: "Esta Seguro de Eliminar el Represetnate?",
            text: "Presione Si para eliminar el Registro!",
            type: "warning",   showCancelButton: true,
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar!",
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
        console.log("WWWW",dataRepre);
        //$.blockUI();
        var dataNom = dataRepre.nombre.split(" "); //split(" ",dataRepre.nombre);
        console.log("sss",dataNom);
        $("#id_rep_upd").val(dataRepre.id_rep);
        $("#nit_rep_upd").val(dataRepre.nit);
        $("#ci_rep_upd").val(dataRepre.ci);
        $("#nom_rep_upd").val(dataNom[0]);
        $("#pat_rep_upd").val(dataNom[1]);
        $("#mat_rep_upd").val(dataNom[2]);
        $("#exp_rep_upd").val(dataRepre.ext);
        $("#nro_poder_rep_upd").val(dataRepre.numero_poder);
        $scope.id_represen = dataRepre.id_rep;

    }

    $scope.act_representante = function(dataRepre){
        $.blockUI();
        var dataReprepresentante = '[{}]';
        var datausuario = sessionService.get('IDUSUARIO');
        var resRepresentante = new reglasnegocio();
        resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-4';
        resRepresentante.parametros = '{"id_registro":'+ $scope.id_represen +', "nit":"'+ sessionService.get('NITCIUDADANO') +'","ci":"'+ $("#nit_rep_upd").val() +'","nombre":"'+ $("#nom_rep_upd").val() +' '+ $("#pat_rep_upd").val()+' '+ $("#mat_rep_upd").val() +'","ext":"'+ $("#exp_rep_upd").val() +'","numPoder":"'+ $("#nro_poder_rep_upd").val() +'","dataRep":"'+ dataReprepresentante +'","usuario":"'+ datausuario +'"}';
        resRepresentante.llamarregla(function(response){
            $scope.obtDatos = JSON.parse(response);
            if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                $scope.obtRepresentanteLegal = [];
                $("#divMsj").css({'display' : 'block' });
                $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
                $.unblockUI();
                alertify.warning('No existen datos');  
            } else{
                if ($scope.obtDatos[0].actualiza_representante) {
                    
                    $("#divMsj").css({'display' : 'block' });
                    swal('', 'Representante Actualizado correctamente', 'success'); 
                    $scope.getRepresentantes(sessionService.get('NITCIUDADANO'));
                    $.unblockUI();
                    alertify.warning('existen datos'); 

                }else{
                    $.unblockUI();

                }

            };
        });
        $.blockUI();

    }
}