app.controller('dms_documentosController', function ($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce) {

  var fecha= new Date();
  var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
  var size = 10;
      //listar 
      $scope.clase22='col-md-12';
      $scope.buscarDocumentos = function (busqueda) {
        $scope.titulo = 'Documentos ';
      // $scope.titulo2 = 'Fecha :';
      // $scope.titulo3 = data.vdpccn_fecha_dispocicion;        
       // $rootScope.idDesecho = busqueda.vdpccn_id;
       if(busqueda == 'undefined' || busqueda == null )
       {
        $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);
      } else
      {
        $scope.getBuscarDocumentos(busqueda);
      }
    }
     //*******************elaborar*********************
    $scope.eleborar = function (){
      $scope.personaNatural1 = true;
      $scope.elaboracionFor = true;
      $scope.boton1="new";
      document.formulario1.reset();
    }
    $scope.volverBandeja = function(){
      $scope.personaNatural1 = null;
      $scope.elaboracionFor = null;
    }
    $scope.fechadeadjunto=fechactual;
    $scope.editorOptions = {
      language: 'es',
      uiColor: '#E5E6E8'
    };
    $scope.$on("ckeditor.ready", function( event ) {
      $scope.isReady = true;
    });
    $scope.test = '<p>De mi consideración</p>\n';
    $scope.save = function() {
      console.log($scope.test);
      $http.post('/examples/test.php', {
       content: $scope.test
     }).success(function() {
       alert('Saved');
     });
   }
   $scope.save = function() {
    console.info($scope.test, 'save');
  }
  /************s1**********/
  $scope.guardarElaboracion = function (data){
    console.log(data);
    var mutli_education = document.formulario1.elements["registro[]"];
          var json="[";
          for (var i = 0; i <= mutli_education.length - 1; i++) {
              json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
          };
          json = json.substring(0, json.length-1);
          json = json + "]";
          console.log(JSON.stringify(json));
    var valores = JSON.stringify(json);
    var adjunto = new reglasnegocio();
    adjunto.identificador = 'RCCIUDADANO_81';
    var US = sessionService.get('USUARIO');
    adjunto.parametros ='{"doc_sistema":"DMS","doc_proceso":"ELABORACION","doc_id":1,"doc_ci_nodo":"DMS", "doc_datos":'+ valores +'","doc_url":"","doc_version":1,"doc_tiempo":"'+ data.vdoc_tiempo +'", "doc_cuerpo":"'+ data.vdoc_cuerpo +'","doc_firma_digital":"0","doc_url_logica":"","doc_tps_doc_id":"'+ data.vtps_doc_id +'","doc_usuario":"'+ US +'","doc_estado":"A","doc_tipo_documentacion":"E"}';
    $.blockUI();   
    adjunto.llamarregla(function(data){
        //var obj = JSON.parse(data);
        //data = JSON.parse(data);
        //obj.success(function(data){ 
          sweet.show('', 'Registro insertado', 'success');
          $.unblockUI(); 
          $scope.tiposDocumentacion();
          $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);                  
          document.formulario1.reset();
          $scope.personaNatural1 = null;
          $scope.elaboracionFor = null;
        });
  }
  /***********************/
        // var adjunto = {};
        // $.blockUI();
        // adjunto['elbr_nro_referencia'] = "28/25";
        // adjunto['elbr_cuerpo'] = data.vcuerpo;
        // adjunto['elbr_estado_doc'] = "P";
        // adjunto['elbr_doc_tiempo'] = data.vdoc_tiempo;
        // adjunto['elbr_doc_datos'] = valores;
        // adjunto['elbr_doc_acceso'] = data.vdoc_acceso;    
        // adjunto['elbr_doc_tps_doc_id'] = data.vtps_doc_id;
        // adjunto['elbr_usuario'] = sessionService.get('USUARIO');
        // adjunto['elbr_modificado'] = fechactual;
        // adjunto['elbr_registrado'] = fechactual;
        // adjunto['elbr_usr_id'] = sessionService.get('IDUSUARIO');
        // adjunto['elbr_estado'] = 'A';
        // var resAdjunto = {"table_name":"dms_elaboraciones",
        //                 "body":adjunto};      
        // var obj = DarseaaamsdFactoasrdyasd.api[CONFIG.SERVICE].createRecords(resAdjunto);
        // obj.success(function(dasdata){ 
        //     sweet.show('', 'Registro insertado', 'success');
        //     $.unblockUI(); 
        //     // $scope.tiposDocumentacion();
        //     // $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);                  
        //     document.formulario1.reset();
        //     // $scope.personaNatural1 = null;
        //     // $scope.elaboracionFor = null;

        // })
        // obj.error(function(data){
        //     sweet.show('', 'Registro no insertado', 'error');
        // })
    //}

    $scope.modificarElaboracion = function (datos){      
      $scope.personaNatural1 = true;
      $scope.elaboracionFor = true;
      $scope.datosRol = datos;
      $scope.documentacion(datos.vdoc_tps_doc_id);    
      var obj = JSON.parse(datos.vdoc_datos); 
      var objs = eval("("+obj+")");
      console.log(objs);
      $scope.registro = objs ;
      $scope.boton1="upd";

    }
    /**********s2***********/
    $scope.modificar = function (datos){
      var mutli_education = document.formulario1.elements["registro[]"];
            var json="[";
            for (var i = 0; i <= mutli_education.length - 1; i++) {
                json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
            };
            json = json.substring(0, json.length-1);
            json = json + "]";
      var valores = JSON.stringify(json);
      $.blockUI();
      var consulta = new reglasnegocio();
      var US = sessionService.get('USUARIO');
      consulta.identificador = 'RCCIUDADANO_91';
      consulta.parametros='{"id":"'+ datos.vdoc_idd +'",doc_tps_doc_id":"'+ datos.vtps_doc_id +'","doc_cuerpo":"'+ datos.vdoc_cuerpo +'","doc_acceso":"'+ datos.vdoc_acceso +'","doc_datos":"'+ valores +'", "doc_tiempo":"'+ datos.vdoc_tiempo +'","doc_usuario":"'+ US +'"}';
      consulta.llamarregla(function(data){
        data = JSON.parse(data);
        $.unblockUI(); 
        sweet.show('', 'Registro modificado', 'success');
        $scope.tiposDocumentacion();
        $scope.getDocumento(sessionService.get('USUARIO'),null,null,null); 
        $scope.personaNatural1 = null;
        $scope.elaboracionFor = null;
      });
    }
    /********************/
    $scope.VistapreviaDoc = function (data){
       // var string = doc.output('datauristring');
       //               $('iframe').attr('src', string);modalImprimir
       console.log(data);
       var url = data.vdoc_url_logica;
       $('iframe').attr("src", url);
     }
    //**********************fin de la elaboracion***********
    /*************************** s3 **************************/
    $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){        
      $.blockUI();
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_90';
      resRoles.parametros = '{"sdoc_usuario":"'+ usuario +'","sdoc_sistema":"'+ sistema +'","sdoc_proceso":"'+ proceso +'","sdoc_ci_nodo":"'+ ci_nodo +'""}';
      resRoles.llamarregla(function(response){
        response = JSON.parse(response);
        $scope.obtDatos = response;            
        $.unblockUI();            
      });      
    };
    /*********************** s4 *********************************/  
    $scope.getBuscarDocumentos = function(datos){        
      $.blockUI();
      var US = sessionService.get('IDUSUARIO');
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_90';
      resRoles.parametros = '{"sdoc_usuario":"'+ US +'","sdoc_sistema":"'+ sistema +'","sdoc_proceso":"'+ proceso +'","sdoc_ci_nodo":"'+ ci_nodo +'""}';
      resRoles.llamarregla(function(response){
        response = JSON.parse(response);
        $scope.obtDatos = response;            
        $.unblockUI();            
      });      
    };
    /*************************************************************/
    $scope.adicionarDocumento1 = function(datosRol){
      console.log(datosRol);
    }
    /************************** s5 *********************************/
    $scope.adicionarDocumento = function(datosRol){
      $.blockUI();
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_73';
      var US = sessionService.get('IDUSUARIO');
      resRoles.parametros = '{"sdoc_sistema":"'+ datosRol.vdoc_id_sistema +'","sdoc_proceso":"'+ datosRol.vdoc_proceso +'","sdoc_id":5,"sdoc_ci_nodo":7158,"sdoc_datos":"'+ datosRol.vdoc_nombre +'","sdoc_url":"'+ datosRol.vdoc_url +'","sdoc_version":1,"sdoc_tiempo":30,"sdoc_firma_digital":1,"sdoc_usuario":"'+ US +'","sdoc_tipo_documento":"'+ datosRol.vdoc_tipo_documento +'","sdoc_tamanio_documento":50}';
      resRoles.llamarregla(function(response){
       response = JSON.parse(response);                
       $.unblockUI();            
       sweet.show('', 'Registro insertado', 'success');
     }); 
    };
    /*********************** S6 **************************************/     
    $scope.modificarDocumento = function(vdoc_id,datosRol){
      $.blockUI();
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_74';
      var US = sessionService.get('IDUSUARIO');
      resRoles.parametros = '{"sdoc_idd":"'+ vdoc_id +'","sdoc_sistema":"'+ datosRol.vdoc_id_sistema +'","sdoc_proceso":"'+ datosRol.vdoc_proceso +'", "sdoc_id":5,"sdoc_ci_nodo":7158,"sdoc_datos":"'+ datosRol.vdoc_nombre +'","sdoc_url":"'+ datosRol.vdoc_url +'", "sdoc_version":1,"sdoc_tiempo":30,"sdoc_firma_digital":1,"sdoc_usuario":"'+ US +'","sdoc_tipo_documento":"'+ datosRol.vdoc_tipo_documento +'","sdoc_tamanio_documento":50}';
      resRoles.llamarregla(function(response){
        response=JSON.parse(response);             
        $.unblockUI();            
        sweet.show('', 'Registro modificado', 'success');
      }); 
    }; 
    /******************************* s7 *************************************/
    $scope.eliminarDocumento = function(vdoc_id){
      $.blockUI();
      console.log(vdoc_id);
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_75';
      var US = sessionService.get('IDUSUARIO');
      resRoles.parametros='{"sdoc_idd":"'+ vdoc_id +'","sdoc_estado":"B","sdoc_usuario":"'+ US +'"}';
      resRoles.llamarregla(function(response){
        //response=JSON.parse(response);            
        $.unblockUI();            
        sweet.show('', 'Registro eliminado', 'success');
        $route.reload();
      }); 
    };
    /******************************* s8 *****************************************/
    $scope.tiposDocumentacion = function(){
      $.blockUI();
      var resDocumentacion = new reglasnegocio();
      resDocumentacion.identificador = 'RCCIUDADANO_76';
      resDocumentacion.parametros ='{}';
      resDocumentacion.llamarregla(function(response){ 
        response = JSON.parse(response);
        $scope.datadocumentaciones = response;    
        $.unblockUI();            
      }); 
    };
    /****************************** s9 ******************************************/
    $scope.documentacion = function( idDocumentacion){
      $.blockUI();
      $scope.html = "";
      $scope.doct_tps_doc_id = idDocumentacion;
      var resDocumentaciones = new reglasnegocio();
      resDocumentaciones.identificador = 'RCCIUDADANO_71';
      resDocumentaciones.parametros ='{"sidtipodoc":"'+ idDocumentacion +'"}';
      resDocumentaciones.llamarregla(function(response){
        response = JSON.parse(response);
        $scope.datadocumentos = response;            
        angular.forEach($scope.datadocumentos,function(celda, fila){
          console.log(celda);
          titulo = celda['vdoct_titulo'];
          idName = celda['vdoct_titulo'] +"_"+ $scope.doct_tps_doc_id;
          dominio = celda['vdmn_dominio_desc'];
          $scope.html = $scope.html + '<div class="col-md-6"> ';
          $scope.html = $scope.html + '<div class="form-group" > ' ;
          $scope.html = $scope.html + '  <label for="url" >' + titulo + ':</label>' ;
          $scope.html = $scope.html + ' <div class="controls"> ' ;
          $scope.html = $scope.html + ' <input id="registro[]" name="registro[]" type="text" class="form-control" placeholder="' + titulo + '" ng-model="registro.' + idName + '">' ;
          $scope.html = $scope.html + ' </div></div></div>';

        });
          //alert($scope.html);
          $scope.get_pre($scope.html);
          $.unblockUI();        
        }); 
    };
    /*****************/
    $scope.cargarInformacion2 = function (datos) {
      console.log(datos);
      console.log(datos.vdoc_datos);     
      console.log(obj);
      var obj = JSON.parse(datos.vdoc_datos); 
      var objs = eval("("+obj+")");
       // 
       console.log(objs);
     //   console.log(datos2);
     $scope.datos2 = objs ;
      // console.log($scope.datos2);
      $scope.sistema = datos.vdoc_sistema;
      $scope.proceso = datos.vdoc_proceso;       
      $scope.clase222='col-md-8';
      $scope.clase22='col-md-4';
      $scope.cargarInformacionvista12 = true;        
    }
    $scope.volver = function () {
      $scope.clase222='col-md-12';
      $scope.clase22='col-md-4';
      $scope.cargarInformacionvista12 = null;       
    }

    $scope.modificarDocumentoCargar = function(rol){
      $scope.only=false;
      $scope.datosRol=rol;
      $scope.boton="upd";
      $scope.titulo="Modificar Roles";
    };
    $scope.eliminarDocumentoCargar = function(rol){
      $scope.only=true;
      $scope.datosRol=rol;
      $scope.boton="del";
      $scope.titulo="Eliminar Roles";
    };
    $scope.limpiar = function(){
      $scope.only=false;
      $scope.datosRol = '';
      $scope.boton="new";
      $scope.titulo="Nuevo Adjunto";
      $scope.fechadeadjunto=fechactual;
    };
    // ***************************upload***********************************
    $scope.uploader = new FileUploader({
    });
    var uploader = $scope.uploader ;
        //console.log(url);
        uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
          }
        });
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
          };

          $scope.tipoDocumento1 = '';
          $scope.tiponame1 = '';
          $scope.tiposize1 = '';

          uploader.onAfterAddingFile = function(fileItem) {
            console.log(fileItem);

            //console.info('onAfterAddingFile', fileItem);
            fileItem.url= CONFIG.UPLOAD_URL+"?desripcion=temporal&&arch_sistema=DMS&&arch_proceso=INFORME&&idusuario="+ sessionService.get('IDUSUARIO'); // direccionamiento para upload
            // console.log(fileItem.url);
            $scope.tipoDocumento = fileItem.file.type;
            $scope.tiponame = fileItem.file.name;
            $scope.tiposize = fileItem.file.size; 

            // $scope.tipoDocumento1 = $scope.tipoDocumento1 +'$'+fileItem.file.type;
            $scope.tiponame1 = $scope.tiponame1+'$'+fileItem.file.name;
            $scope.tiposize1 = $scope.tiposize1+'$'+fileItem.file.size;  

            var nameArray = $scope.tipoDocumento.split('/');
            $scope.tipoDocumento = nameArray[1];
            $scope.tipoDocumento1 =$scope.tipoDocumento1 +'$'+$scope.tipoDocumento;
            console.log($scope.tipoDocumento);       
            
            if($scope.tiposize   < 80000000){ 

              $scope.botonSubirOriginal = null; 
              $scope.botonSubirError = "oculta";
              $scope.botonSubireliminar = true;
            } else {
              sweet.show('', 'El archivo es mayor a 8 MB no pudo ser adjuntada', 'warning');
              $scope.botonSubirError = null; 
              $scope.botonSubirOriginal = "oculta";           
              $scope.botonSubireliminar = null; 
            }        

          };
          uploader.onAfterAddingAll = function(addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
             //console.info('onBeforeUploadItem', item);

           };
           uploader.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
            //console.info('onProgressAll', progress);
          };

          var direccionURL=CONFIG.IMG_URL;
          $scope.origen1='';
          $scope.origen2='';
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers); 
           //  $scope.origen.split('\"'); 
           //  direccionp = direccion[0];
           // direccionpP = direccion[1];
           var respuestaa= response.split('\"');
           $scope.origen1 = $scope.origen1 +'$'+respuestaa[0];
           $scope.origen2 = $scope.origen2 +'$'+respuestaa[1];
           console.log($scope.origen1);
           console.log($scope.origen2);
           $scope.opciontiposDocumentacion = true;
            // $scope.opcionAdjunto = true;   
            
            archivoUpload =fileItem.file.name;             
            direccionURL = direccionURL+"/"+archivoUpload;  

          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
          };
          $scope.falla = function()
          {
            sweet.show('', "Tipo de archivo incorrecto elimine por favor", 'error'); 
            $scope.desabilitado2=true;
            $scope.botonSubireliminar = null;   
          }

    // *********************** FIN DEL UPLOAD *****************************


    $scope.guardar = function(data){
      console.log(data);
      // alert($scope.tipoDocumento1);
      // alert($scope.tiponame1);
      // alert($scope.tiposize1);
      // console.log($scope.origen1);
      
      // var direccion = $scope.origen.split('\"'); 
      // direccionp = direccion[0];
      // direccionpP = direccion[1];
      // console.log(direccionp);
      // // alert(direccionp);

      // var direccionlogica2= direccionp.split("\\");
      // console.log(direccionlogica2.length);
      // var resultado11='';
      // for (var i = 5; i <direccionlogica2.length; i++) {
      //   resultado11 = resultado11+direccionlogica2[i]+'/';
      // };
      // // console.log(resultado11);

      // var cantidad=resultado11.length;
      // var cadena = resultado11.substring(0,cantidad-1);
      // // console.log(cadena);
      // var cadenalogica=CONFIG.IMG_URL+cadena
      // alert('http://localhost:9091/'+cadena);
      // var resultado1=direccionp;
      // do{
      //   resultado1 = resultado1.replace("\\","/");
      // } while(resultado1.indexOf("\\")>=0);
      // console.log(resultado1); 
      var mutli_education = document.formulario.elements["registro[]"];
            var json="[";
            for (var i = 0; i <= mutli_education.length - 1; i++) {
                json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
            };
            json = json.substring(0, json.length-1);
            json = json + "]";
            console.log(JSON.stringify(json));
      var valores = JSON.stringify(json);
      $.ajax({
        url:CONFIG.API_URL_DMS+'insertar5.php',
        type:"post",
        data:{"option":"INSERTAR",
        "sdoc_sistema":"DMS",
        "sdoc_proceso":"ADJUNTO",
        "sdoc_id":1,
        "sdoc_ci_nodo":"DMS",
        "sdoc_datos":valores,
        "sdoc_url":$scope.origen1,
        "sdoc_version":1,
        "sdoc_tiempo":data.vdoc_tiempo,
        "sdoc_firma_digital":0,
        "sdoc_usuario":sessionService.get('USUARIO'),
        "sdoc_tipo_documento":$scope.tipoDocumento1,
        "sdoc_tamanio_documento":$scope.tiposize1,
        "sdoc_nombre":$scope.tiponame1,
        "sdoc_tps_doc_id":$scope.doct_tps_doc_id,
        "sdoc_acceso":data.vdoc_acceso,
        "sdir_almacenamiento":data.vdoc_url

      },
      success:function(response){
        console.log(response);
        $scope.opciontiposDocumentacion = null;                    
        $scope.noticia='';
        $scope.datos = '';
                   // $scope.uploader.queue='';
                   $scope.tiposDocumentacion();
                   $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);
                   $scope.tipoDocumento1 = '';
                   $scope.tiponame1 = '';
                   $scope.tiposize1 = '';
                   document.formulario.reset();

                 }
               });
    }

    $scope.$on('api:ready',function(){
      $scope.getDocumento(sessionService.get('USUARIO'),null,null,null); 
      $scope.tiposDocumentacion();

    });
    $scope.inicioDocumentos = function () {
        $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);  
        $scope.tiposDocumentacion();
    }; 
  });