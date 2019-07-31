app.controller('UsuariosFirmasController', function ($scope,$route, $rootScope, CONFIG,sessionService,ngTableParams,$filter,sweet,FileUploader) {
    var fecha= new Date();
    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    var fechactual=fecha.getFullYear() + "-" + mes + "-" + dia + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    
    var respuestaSuccess = "TRUE";
    var handleUsuarios = function(obj, name){
        obj.success(function(response){
            $scope.usuarios = response;
        }).error(function(response){  
            $scope.errors[name] = $scope.conexion.error(response)
        })
    }
    // **** OK
    /***********s1**********/
    $scope.getUsuRoles = function(usrId){
        console.log(usrId);
        var resUsuRoles = new reglasnegocio();
        resUsuRoles.identificador = 'RCCIUDADANO_122';
        resUsuRoles.parametros = '{"id_usuario_firma":"'+ usrId +'"}';
        resUsuRoles.llamarregla(function(data){
            data = JSON.parse(data);
            $scope.usuariosRoles = response;
            //// Para verificar si tiene o no firmas digitales
            if(response.length == 0)
                $scope.cargarInformacionvista12 = true;
            else
                $scope.cargarInformacionvista12 = null;   
        });
    }
    /*********s2**********/
    $scope.getUsuarios = function(){
        $.blockUI();
        var resUsuario = new reglasnegocio();
        resUsuario.identificador = 'RCCIUDADANO_123';
        resUsuario.parametros = '{}';
        resUsuario.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.usuarios = response;
            $.unblockUI(); 
        });
    };
    /*******************/
    // **** OK
    $scope.seleccionarUsuario = function(usrId,nombre_usuario){
            $rootScope.idusu=usrId;
            $scope.nombre_usuario= " a " + nombre_usuario + ":";
            $scope.getUsuRoles(usrId);
            ////$scope.getRoles(usrId);     /////------- > Comentado por el momentos
            $scope.checkboxes = { 'checked': true, items: {} };
            $scope.checkboxesi = { 'checked': true, items: {} };
    }
    $rootScope.idusu="";
    


    // ***************************upload***********************************
    $scope.uploader = new FileUploader({
    });
    var uploader = $scope.uploader ;
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

    //// *********************** FIN DEL UPLOAD *****************************
//         $scope.guardar = function(data){
//       console.log(data);      
//       var mutli_education = document.formulario.elements["registro[]"];
//       var json="[";
//       for (var i = 0; i <= mutli_education.length - 1; i++) {
//         json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
//       };
//       json = json.substring(0, json.length-1);
//       json = json + "]";
//       console.log(JSON.stringify(json));
//       var valores = JSON.stringify(json);
//             $.ajax({
//               url:CONFIG.API_URL_DMS+'insertar.php',
//               type:"post",
//               data:{"option":"INSERTAR",
//                     "sdoc_sistema":"DMS",
//                     "sdoc_proceso":"ADJUNTO",
//                     "sdoc_id":1,
//                     "sdoc_ci_nodo":"DMS",
//                     "sdoc_datos":valores,
//                     "sdoc_url":$scope.origen1,
//                     "sdoc_version":1,
//                     "sdoc_tiempo":data.vdoc_tiempo,
//                     "sdoc_firma_digital":0,
//                     "sdoc_usuario":sessionService.get('USUARIO'),
//                     "sdoc_tipo_documento":$scope.tipoDocumento1,
//                     "sdoc_tamanio_documento":$scope.tiposize1,
//                     "sdoc_nombre":$scope.tiponame1,
//                     "sdoc_tps_doc_id":$scope.doct_tps_doc_id,
//                     "sdoc_acceso":data.vdoc_acceso,
//                     "sdir_almacenamiento":data.vdoc_url
//                   },
//               success:function(response){
//                 console.log(response);
//                   $scope.opciontiposDocumentacion = null;                    
//                   $scope.noticia='';
//                   $scope.datos = '';
//                   $scope.tiposDocumentacion();
//                   $scope.getDocumento(sessionService.get('USUARIO'),null,null,null);
//                   $scope.tipoDocumento1 = '';
//                   $scope.tiponame1 = '';
//                   $scope.tiposize1 = '';
//                   document.formulario.reset();
//               }
//             });
//     }

//     $scope.resultado1='';
//     $scope.pwd1='';   
//     $scope.valores = function(valor){        
//         $scope.resultado1=$scope.resultado1+valor;        
//         $scope.pwd1=$scope.resultado1;
//         //console.log($scope.pwd1);
             
//     };

    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Nuevo Adjunto";
        $scope.fechadeadjunto=fechactual;
    };

    $scope.$on('api:ready',function(){
        $scope.getUsuarios();       
    });
    $scope.inicioUsuariosRoles = function () {
        $scope.getUsuarios();
    };
});