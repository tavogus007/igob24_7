app.controller('documentosCompartidosController', function ($scope, $timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce) {

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
            $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null);
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
      $scope.datosRol='';
      $scope.documentacion(0);  
      $scope.fechadeadjunto=fechactual;

    }
    $scope.volverBandeja = function(){
      $scope.personaNatural1 = null;
      $scope.elaboracionFor = null;
    }
    $scope.getFirmar = function(datos){
      $scope.datosParafirma=datos;
      $scope.boton='new';
      $scope.titulo='Firmar';
      $scope.usuario=sessionService.get('USUARIO');
    }

    $scope.updFirmar = function(datos){
        //$.blockUI();
        if($scope.resultado1){
        var consulta = {};
        consulta['doc_modificacion'] = fechactual;
        consulta['doc_firma_digital'] = '1';
        consulta['doc_usuario'] = sessionService.get('USUARIO');

        var USU = sessionService.get('IDUSUARIO');
        var resUsuario = new reglasnegocio();
        resUsuario.identificador = 'RCCIUDADANO_157';
        resUsuario.parametros = '{"doc_modificacion":"'+ fechactual.psrId +'","doc_firma_digital":"1","doc_usuario":"'+ USU +'"}';
        /*
        {
            table_name:"  ",
            id:$scope.datosParafirma.vdoc_idd,
            body:consulta
        };
        */
      resUsuario.llamarregla(function(respuesta){
      respuesta = JSON.parse(respuesta);
        //servicio modificar usuarios
        //var obj=DreamFactory.api[CONFIG.SERVICE].updateRecord(resUsuario);
        //obj.success(function(respuesta){
            $.unblockUI();           
              $.ajax({
                url:CONFIG.API_URL_DMS+'firma/firmador/firmante.php',
                type:"post",
                data:{
                      "sIdDocumento":$scope.datosParafirma.vdoc_idd,
                      "option":1,
                      "susuario":sessionService.get('USUARIO'),
                      //"pasword":datos.pwd1,
                      "pasword":$scope.pwd1
                    },
                success:function(response){  
                  sweet.show('', 'Registro modificado', 'success'); 
                  $scope.tiposDocumentacion();
                  $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null); 
                  $scope.personaNatural1 = null;
                  $scope.elaboracionFor = null; 
                  $scope.pwd1=""; 
                  $scope.resultado1="";
                                     
                }
              })
        })
      } else 
      { sweet.show('', 'Registre PIN', 'error');}
    }

    /*$scope.updFirmar = function(datos){
      // $scope.datadocumentos1[i].vdoct_titulo
        //$.blockUI();
        if($scope.resultado1){
        var consulta = {};
        consulta['doc_modificacion'] = fechactual;
        consulta['doc_firma_digital'] = '1';
        consulta['doc_usuario'] = sessionService.get('USUARIO');
        var resUsuario = {
            table_name:"dms_gt_documentos",
            id:$scope.datosParafirma.vdoc_idd,
            body:consulta
        };
        //servicio modificar usuarios
        var obj=DreamFactory.api[CONFIG.SERVICE].updateRecord(resUsuario);

        obj.success(function(respuesta){
            $.unblockUI();           
              $.ajax({
                url:CONFIG.API_URL_DMS+'firma/firmador/firmante.php',
                type:"post",
                data:{
                      "sIdDocumento":$scope.datosParafirma.vdoc_idd,
                      "option":1,
                      "susuario":sessionService.get('USUARIO'),
                      //"pasword":datos.pwd1,
                      "pasword":$scope.pwd1
                    },
                success:function(response){  
                  sweet.show('', 'Registro modificado', 'success'); 
                  $scope.tiposDocumentacion();
                  $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null); 
                  $scope.personaNatural1 = null;
                  $scope.elaboracionFor = null; 
                  $scope.pwd1=""; 
                  $scope.resultado1="";
                                     
                }
              })
        })
        .error(function(data){
            sweet.show('', 'Registro no almacenado', 'error');
        })
      } else 
      { sweet.show('', 'Registre PIN', 'error');}
    } 
    */

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
    $scope.guardarElaboracion = function (data){
      console.log(data);
      console.log(document.formulario1.elements);
      var mutli_education = document.formulario1.elements["registro[]"];
      var json="[";
      for (var i = 0; i <= mutli_education.length - 1; i++) {
        json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
      };
      json = json.substring(0, json.length-1);
      json = json + "]";
      console.log(JSON.stringify(json));
      var valores = JSON.stringify(json);
      console.log(valores);
      // vtps_doc_id doc_tps_doc_id
      $.blockUI();
       /* 
       // *****************  GUARDAR ELABORACION **********************
         var resElaboracion = {
            "procedure_name":"dms_sp_adicionar_elaborarar",
             "body": {
              "params": [
                {
                  "name": "sistema",
                  "value": "DMS"
                },
                {
                  "name": "sproceso",
                  "value": "ELABORACION"
                },
                {
                  "name": "somdnodo",
                  "value": "DMS"
                },
                {
                  "name": "sdoc_datos",
                  "value": valores
                },
                {
                  "name": "susuario",
                  "value": sessionService.get('USUARIO')
                },
                {
                  "name": "scuerpo",
                  "value": data.vdoc_cuerpo
                },
                {
                  "name": "sdoc_tiempo",
                  "value": data.vdoc_tiempo
                },
                {
                  "name": "sdoc_tps_doc_id",
                  "value": data.vtps_doc_id
                },
                {
                  "name": "sdoc_tipo_ingreso",
                  "value": "I"
                },
                {
                  "name": "sdoc_acceso",
                  "value": data.vdoc_acceso
                }
              ]
            }
        };
        */
        /************s2*************/
   
    var resElaboracion = new reglasnegocio();
    resElaboracion.identificador = 'RCCIUDADANO_66';
    resElaboracion.parametros='{}';
        /************************/
      //var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resElaboracion);
        //obj.success(function (response) {
          resElaboracion.llamarregla(function(response){
          response=JSON.parse(response);
            $.unblockUI();
            $scope.obtDatos = response;            
            console.log(response);
            var valoreid=$scope.obtDatos[0].dms_sp_adicionar_elaborarar;
                   $.ajax({
                    url:CONFIG.API_URL_DMS+'firma/firmador/firmante.php',
                    type:"post",
                    data:{
                          "sIdDocumento":valoreid,
                          "option":0,
                          "susuario":sessionService.get('USUARIO')
                        },
                    success:function(response){
                      console.log(response);
                      // sweet.show('', 'Registro insertado', 'success');                                      
                      document.formulario1.reset();
                      $scope.personaNatural1 = null;
                      $scope.elaboracionFor = null;
                      $scope.tiposDocumentacion();
                      $scope.datosRol='';
                      $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null);
                      //$scope.generarCorrelativo(data.vtps_doc_id,sessionService.get('IDUSUARIO'),valoreid);
                      $scope.datosRol.vdoc_cuerpo = "";
                      // ****************************************generar correlativo *********
                      // $.blockUI();        
                        /*var resCorrelativo = {
                            "procedure_name":"dms_sp_generarcorrelativo",
                             "body": {
                              "params": [
                                {
                                  "name": "sidtipodoc",
                                  "value": data.vtps_doc_id
                                },
                                {
                                  "name": "idusuario",
                                  "value": sessionService.get('IDUSUARIO')
                                }
                              ]
                            }          
                        };*/        
                           /***************s3*****************/
                            var resCorrelativo = new reglasnegocio();
                            resCorrelativo.identificador = 'RCCIUDADANO_158';
                            var usu = sessionService.get('IDUSUARIO');
                            resCorrelativo.parametros = '{"sidtipodoc":"'+ data.vtps_doc_id + '","idusuario":"'+ usu + '"}';
                            resCorrelativo.llamarregla(function(response){
                            response = JSON.parse(response);
                            /**********************************/
                            //var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resCorrelativo);
                            //obj.success(function (response) { 
                            $scope.datacorrelativo = response; 
                            $scope.valorCO= $scope.datacorrelativo[0].dms_sp_generarcorrelativo;
                            
                            /*var consulta = {};    
                              consulta['doc_modificacion'] = fechactual;
                              consulta['doc_correlativo'] = $scope.valorCO;
                              consulta['doc_usuario'] = sessionService.get('USUARIO');
                              var resUsuario = {
                                table_name:"dms_gt_documentos",
                                id:valoreid,
                                body:consulta
                              };
                              //servicio modificar usuarios
                              var obj=DreamFactory.api[CONFIG.SERVICE].updateRecord(resUsuario);
                              /********s4*************/
                              var USU = sessionService.get('IDUSUARIO');
                              var resUsuario = new reglasnegocio();
                              resUsuario.identificador = 'RCCIUDADANO_159';
                              resUsuario.parametros = '{"doc_modificacion":"'+ fechactual.psrId +'","doc_correlativo":"'+ $scope.valorCO +'","doc_usuario":"'+ USU +'"}';
                              resUsuario.llamarregla(function(respuesta){
                              respuesta = JSON.parse(respuesta);
                              /******************/
                              //obj.success(function(respuesta){
                                $.unblockUI();
                                sweet.show('', 'Registro  insertado ', 'success');
                              })
                              /*.error(function(data){
                                sweet.show('', 'Registro no almacenado', 'error');
                              }) */  
                              })
                        /*obj.error(function(error) {
                            sweet.show('', 'Registro no eliminado', 'error');           
                        });*/ 
                      // **********************************************************+++++++++++++++

                    }
                  }); 
                        
        })
        /*obj.error(function(error) {
            $scope.errors["error_roles"] = error;            
        });*/ 
    }

    $scope.modificarElaboracion = function (datos){      
      $scope.personaNatural1 = true;
      $scope.elaboracionFor = true;
      $scope.datosRol = datos;  
      var obj = JSON.parse(datos.vdoc_datos); 
      var objs = eval("("+obj+")");     
      $scope.registro = objs ;
      $scope.documentacion1(datos.vdoc_tps_doc_id);
      $scope.boton1="upd";     
      $scope.logelevaciones(datos);
      $scope.fechadeadjunto=datos.vdoc_registro;
    }

    /*$scope.logelevaciones = function (datos){      
      console.log(datos.vdoc_idd);
     $.blockUI();        
        var resVersion = {
            "procedure_name":"sp_lista_fecha_version",
             "body": {
              "params": [
                {
                  "name": "sidelab",
                  "value": datos.vdoc_idd
                }
              ]
            }          
        };
        /*************s5************/        
        //no existe en la bds sp_lista_fecha_version
        /**********************/
       /* var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resVersion);
        obj.success(function (response) { 
            $scope.datacomboversion = response;
            $.unblockUI(); 
            if( $scope.datacomboversion.length>0){
                $scope.opcionrecuperacion = true;
            } else {
                $scope.datacomboversion = "";
                $scope.opcionrecuperacion = null;
            }
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no tiene datos', 'error');           
        }); 
    }*/

  /*$scope.recuperalogelevaciones = function (idlog){ 
     $.blockUI();        
        var resVersion = {
            "procedure_name":"sp_lista_cuerpo_version",
             "body": {
              "params": [
                {
                  "name": "sidelabv",
                  "value": idlog
                }
              ]
            }          
        };      
        /*************s6************/        
        //no existe en la bds sp_lista_cuerpo_version
        /**********************/ 

        /*var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resVersion);
        obj.success(function (response) { 
            $scope.datacuerpo = response;
            $.unblockUI(); 
            if( $scope.datacuerpo.length>0){
                $scope.valor= $scope.datacuerpo[0].vlog_doc_cuerpo;
                $scope.datosRol.vdoc_cuerpo= $scope.valor;
            } else {
                $scope.datacuerpo = "";
                $scope.datosRol.vdoc_cuerpo = "";      
            }
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no tiene datos', 'error');           
        }); 
    }*/
  
    $scope.documentacion1 = function( idDocumentacion){
        $.blockUI();
        $scope.html = "";
        $scope.doct_tps_doc_id = idDocumentacion;
        /*var resDocumentaciones =  {
            "procedure_name":"sp_dms_lst_documentacion",
            "body":{"params": [{"name":"sidtipodoc","param_type":"IN","value":idDocumentacion}]}
        };
        */      
        /****************************** s7 **************************************/
        var resDocumentaciones = new reglasnegocio();
           resDocumentaciones.identificador = 'RCCIUDADANO_71';
           resDocumentaciones.parametros = '{"sidtipodoc":"' + idDocumentacion + '"}';
           resDocumentaciones.llamarregla(function(data){
            data = JSON.parse(data);
        /****************************** s11 **************************************/
        //var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resDocumentaciones);
        //obj.success(function (data) { 
            $scope.datadocumentos1 = data;
            var i=0;  
            
              while(i<$scope.datadocumentos1.length){              
                
                titulo = $scope.datadocumentos1[i].vdoct_titulo; 
                idName =$scope.datadocumentos1[i].vdoct_titulo+"_"+$scope.doct_tps_doc_id; 
                dominio = $scope.datadocumentos1[i].vdmn_dominio_desc;//celda['vdmn_dominio_desc'];
                datosCmb = $scope.datadocumentos1[i].vdmn_datos;//celda['vdmn_dominio_desc'];             
                
                switch(dominio)
                {
                  case "text":
                    $scope.html = $scope.html + '<div class="col-md-6"> ';
                    $scope.html = $scope.html + '<div class="form-group" > ' ;
                    $scope.html = $scope.html + '<label for="url" >' + titulo + ':</label> ' ;
                    $scope.html = $scope.html + '<div class="controls"> ' ;
                    $scope.html = $scope.html + '<input id="registro[]" name="registro[]" onkeyUp="return conMayusculas(this)" class="form-control" placeholder="'+titulo+'" value="'+$scope.registro[i].valor+'" ng-model="registro.'+idName+'">' ;
                    $scope.html = $scope.html + '</div></div></div> ';
                    break;                  
                  case "combo":
                    $scope.html = $scope.html + '<div class="col-md-6"> ';
                    $scope.html = $scope.html + '<div class="form-group" >';
                    $scope.html = $scope.html + '<label for="url">'+titulo+':</label> ';
                    $scope.html = $scope.html + '<div class="controls">';
                    $scope.html = $scope.html + '<select id="registro[]" name="registro[]" class="form-control" type="'+titulo+'" ng-selected="'+$scope.registro[i].valor+'" ng-model="registro.'+idName+'" >';
                    var arrayDatos = datosCmb.split("|");                     
                    for(i=0; i<arrayDatos.length; i++)
                    {
                      var arrayOptions = arrayDatos[i].split("%");                   
                      if(arrayOptions.length > 0)
                      {
                        $scope.html = $scope.html + '<option value="'+arrayOptions[1]+'">'+arrayOptions[1]+'</option>'; 
                      }
                    }

                    $scope.html = $scope.html + '</select>';
                    $scope.html = $scope.html + '</div>';
                    $scope.html = $scope.html + '</div>';
                    $scope.html = $scope.html + '</div>';
                    break;
                  default:
                    $scope.html = $scope.html + '<div class="col-md-6"> ';
                    $scope.html = $scope.html + '<div class="form-group" > ' ;
                    $scope.html = $scope.html + '<label for="url" >' + titulo + ':</label> ' ;
                    $scope.html = $scope.html + '<div class="controls"> ' ;
                    $scope.html = $scope.html + '<input id="registro[]" name="registro[]" onkeyUp="return conMayusculas(this)" type="text" class="form-control" placeholder="' + titulo + '" ng-model="registro.' + idName + '">' ;
                    $scope.html = $scope.html + '</div></div></div> ';
                    break;
                }
                i=i+1;
              }  
            $scope.get_pre($scope.html);   
            $.unblockUI();        
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no eliminado', 'error');           
        }); 
    };

    $scope.modificar = function (datos){
      console.log(datos);
      console.log(document.formulario1);
      var mutli_education = document.formulario1.elements["registro[]"];
      var json="[";
      for (var i = 0; i <= mutli_education.length - 1; i++) {
        json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
      };
      json = json.substring(0, json.length-1);
      json = json + "]";     
      var valores = JSON.stringify(json);     
               $.ajax({
                url:CONFIG.API_URL_DMS+'elaborar/elaborador/elaborar.php',
                type:"post",
                data:{
                      
                      "option":"MODIFICARELABORACION",
                      "sistema":'DMS',
                      "sproceso":'ELABORACION',
                      "somd_nodo":'DMS',
                      "sdoc_datos":valores,
                      "susuario_registro":sessionService.get('USUARIO'),
                      "scuerpo":datos.vdoc_cuerpo,
                      "sidelaborado":datos.vdoc_idd,
                      "sdoc_tiempo":datos.vdoc_tiempo,
                      "sdoc_tps_doc_id":datos.vtps_doc_id,
                      "sacceso":datos.vdoc_acceso
                    },
                success:function(response){                 
                  $.unblockUI(); 
                  sweet.show('', 'Registro modificado', 'success'); 
                  $scope.tiposDocumentacion();
                  $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null); 
                  $scope.personaNatural1 = null;
                  $scope.elaboracionFor = null;                
                }
              });
    }
    $scope.VistapreviaDoc = function (data){      
       console.log(data);
       var url = data.vdoc_url_logica;
      $('iframe').attr("src", url);
    }
    //**********************fin de la elaboracion ********************************/

    /*$scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){        
        $.blockUI();
        var resRoles = {
            "procedure_name":"dms_sp_listar_doc_compartidos",
             "body": {
              "params": [
                {
                  "name": "sdoc_usuario",
                  "value": usuario
                },
                {
                  "name": "sdoc_sistema",
                  "value": sistema
                },
                {
                  "name": "sdoc_proceso",
                  "value": proceso
                },
                {
                  "name": "sdoc_ci_nodo",
                  "value": ci_nodo
                },
                {
                  "name": "sidusersesion",
                  "value": sessionService.get('IDUSUARIO')
                }
              ]
            }
        };
        //servicio listar roles
        var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resRoles);
        obj.success(function (response) {
            $scope.obtDatos = response;
            $.unblockUI();            
        })
        obj.error(function(error) {
            $scope.errors["error_roles"] = error;            
        });      
    };*/
    /********s8**********/
    //no hay dms_sp_listar_doc_compartidos en la base de datos 
    /*****************/
    /****************************** s9 **************************************/
    $scope.getBuscarDocumentos = function(datos){        
      $.blockUI();
      var resRoles=new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_90';
      var usu = sessionService.get('IDUSUARIO');
      resRoles.parametros = '{"sdoc_usuario":"'+ usu +'","sdoc_sistema":"'+ datos.sistema +'","sdoc_proceso":"'+ datos.proceso +'","sdoc_ci_nodo":"'+ datos.nodo +'"}';
      resRoles.llamarregla(function(response) {
        response = JSON.parse(response);
          $scope.obtDatos = response;            
          $.unblockUI();            
        });      
      };
    /*****************/

     $scope.adicionarDocumento1 = function(datosRol){
      console.log(datosRol);
     }

    /****************************** s10 **************************************/
     $scope.adicionarDocumento = function(datosRol){
      $.blockUI();
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_73';
      var US = sessionService.get('IDUSUARIO');
      resRoles.parametros='{"sdoc_sistema":"'+ datosRol.vdoc_id_sistema +'","sdoc_proceso":"'+ datosRol.vdoc_proceso +'","sdoc_id":5,"sdoc_ci_nodo":7158,"sdoc_datos":"'+ datosRol.vdoc_nombre +'","sdoc_url":"'+ datosRol.vdoc_url +'","sdoc_version":1,"sdoc_tiempo":30,"sdoc_firma_digital":1,"sdoc_usuario":"'+ US +'","sdoc_tipo_documento":"'+ datosRol.vdoc_tipo_documento +'","sdoc_tamanio_documento":50}';
      resRoles.llamarregla(function(response) {
        response = JSON.parse(response);                
        $.unblockUI();            
        sweet.show('', 'Registro insertado', 'success');
      }); 
    };
    
    /****************************** s11 **************************************/
    $scope.modificarDocumento = function(vdoc_id,datosRol){
      $.blockUI();
      var resRoles = new reglasnegocio();
      resRoles.identificador = 'RCCIUDADANO_74';
      var US = sessionService.get('IDUSUARIO');
      resRoles.parametros = '{"sdoc_idd":"'+ vdoc_id +'","sdoc_sistema":"'+ datosRol.vdoc_id_sistema +'","sdoc_proceso":"'+ datosRol.vdoc_proceso +'", "sdoc_id":5,"sdoc_ci_nodo":7158,"sdoc_datos":"'+ datosRol.vdoc_nombre +'","sdoc_url":"'+ datosRol.vdoc_url +'", "sdoc_version":1,"sdoc_tiempo":30,"sdoc_firma_digital":1,"sdoc_usuario":"'+ US +'","sdoc_tipo_documento":"'+ datosRol.vdoc_tipo_documento +'","sdoc_tamanio_documento":50}';
      resRoles.llamarregla(function(response) {
        response = JSON.parse(response);     
        $.unblockUI();            
        sweet.show('', 'Registro modificado', 'success');
      }); 
    };
    /******************************* s12 ************************************/
    $scope.eliminarDocumento = function(vdoc_id){
        $.blockUI();
        console.log(vdoc_id);
        var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_75';
        var US = sessionService.get('IDUSUARIO');
        resRoles.parametros ='{"sdoc_idd":"'+ vdoc_id +'","sdoc_estado":"B","sdoc_usuario":"'+ US +'"}';
        resRoles.llamarregla(function(response) {
        response = JSON.parse(response);   
            $.unblockUI();            
            sweet.show('', 'Registro eliminado', 'success');
            $route.reload();
        }); 
    };
    /**********************************************************************/
  $scope.get_pre = function(x){
      return $sce.trustAsHtml(x);
    };  
    /****************************** s13 *********************************/
  $scope.tiposDocumentacion = function(){
        $.blockUI();
        var resDocumentacion = new reglasnegocio();
        resDocumentacion.identificador = 'RCCIUDADANO_76';
        resDocumentacion.parametros = '{}';
        resDocumentacion.llamarregla(function(response) { 
        response = JSON.parse(response);
            $scope.datadocumentaciones = response;    
            $.unblockUI();            
        }); 
    };
    /**********************************************************************/
  $scope.cargarplantilla = function(dd)
  {    
    if(dd=='S')
    {
      $scope.plantillas($scope.doct_tps_doc_id);
    } else {
      var porId=document.getElementById("vtps_doc_id").options.selectedIndex;           
      var vlaoress='<table  width="575" border="0" cellspacing="2"> ';
      vlaoress = vlaoress + '<tr><td colspan="2" style="text-align: center;"><strong>'+document.getElementById("vtps_doc_id").options[porId].text+'</strong></td></tr>';
      var mutli_education = document.formulario1.elements["registro[]"];
      for (var i = 0; i <= mutli_education.length - 1; i++) {
          console.log(mutli_education[i].value);
          vlaoress = vlaoress + '<tr><td style="text-align: right;"><B>'+mutli_education[i].attributes[2].nodeValue+':</B></td><td>'+mutli_education[i].value+'</td></tr> ';                
      };
              vlaoress = vlaoress+'</table> ';
              
      $scope.datosRol.vdoc_cuerpo=vlaoress;
    }
    
   
  }

  $scope.documentacion = function( idDocumentacion){
        $.blockUI();
        $scope.html = "";
        $scope.doct_tps_doc_id = idDocumentacion;
        /********s14********/
        var resDocumentaciones = new reglasnegocio();
        resDocumentaciones.identificador = 'RCCIUDADANO_71';
        resDocumentaciones.parametros ='{"sidtipodoc":"'+idDocumentacion+'"}';
        resDocumentaciones.llamarregla(function(response){
        response = JSON.parse(response);

        /*var resDocumentaciones =  {
            "procedure_name":"sp_dms_lst_documentacion",
            "body":{"params": [{"name":"sidtipodoc","param_type":"IN","value":idDocumentacion}]}
        };
        */      
        //var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resDocumentaciones);
        //obj.success(function (response) { 
            $scope.datadocumentos = response;                    
             angular.forEach($scope.datadocumentos,function(celda, fila){
              titulo = celda['vdoct_titulo'];
              idName = celda['vdoct_titulo'] +"_"+ $scope.doct_tps_doc_id;
              dominio = celda['vdmn_dominio_desc'];
              datosCmb = celda['vdmn_datos'];             
              switch(dominio)
              {
                case "text":
                  $scope.html = $scope.html + '<div class="col-md-6"> ';
                  $scope.html = $scope.html + '<div class="form-group" > ' ;
                  $scope.html = $scope.html + '<label for="url" >' + titulo + ':</label> ' ;
                  $scope.html = $scope.html + '<div class="controls"> ' ;
                  $scope.html = $scope.html + '<input id="registro[]" onkeyUp="return conMayusculas(this)" name="registro[]" type="text" class="form-control" placeholder="' + titulo + '" ng-model="registro.' + idName + '">' ;
                  $scope.html = $scope.html + '</div></div></div> ';
                  break;
                
                case "combo":
                  $scope.html = $scope.html + '<div class="col-md-6"> ';
                  $scope.html = $scope.html + '<div class="form-group" >';
                  $scope.html = $scope.html + '<label for="url">' + titulo + ':</label> ';
                  $scope.html = $scope.html + '<div class="controls">';
                  $scope.html = $scope.html + '<select id="registro[]" name="registro[]" type="' + titulo + '" class="form-control" ng-model="registro.'+idName+'">';
                  var arrayDatos = datosCmb.split("|");                  
                  for(i=0; i<arrayDatos.length; i++)
                  {
                    var arrayOptions = arrayDatos[i].split("%");                      
                    if(arrayOptions.length > 0)
                    {
                      $scope.html = $scope.html + '<option value="'+arrayOptions[1]+'">'+arrayOptions[1]+'</option>'; 
                    }
                  }

                  $scope.html = $scope.html + '</select>';
                  $scope.html = $scope.html + '</div>';
                  $scope.html = $scope.html + '</div>';
                  $scope.html = $scope.html + '</div>';
                  break;

                default:
                  $scope.html = $scope.html + '<div class="col-md-6"> ';
                  $scope.html = $scope.html + '<div class="form-group" > ' ;
                  $scope.html = $scope.html + '<label for="url" >' + titulo + ':</label> ' ;
                  $scope.html = $scope.html + '<div class="controls"> ' ;
                  $scope.html = $scope.html + '<input id="registro[]" name="registro[]" onkeyUp="return conMayusculas(this)" type="text" class="form-control" placeholder="' + titulo + '" ng-model="registro.' + idName + '">' ;
                  $scope.html = $scope.html + '</div></div></div> ';
                  break;
              }
             
          });
          
          $scope.get_pre($scope.html);   
          $.unblockUI();        
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no eliminado', 'error');           
        }); 
  };

  $scope.cargarInformacion2 = function (datos) {
      var obj = JSON.parse(datos.vdoc_datos); 
      var objs = eval("("+obj+")");       
      $scope.datos2 = objs ;      
      $scope.sistema = datos.vdoc_sistema;
      $scope.proceso = datos.vdoc_proceso;       
      $scope.clase222='col-md-8';
      $scope.clase22='col-md-4';
      $scope.cargarInformacionvista12 = true;        
  };

  $scope.volver = function () {
      $scope.clase222='col-md-12';
      $scope.clase22='col-md-4';
      $scope.cargarInformacionvista12 = null;       
  };

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
      
  uploader.filters.push({
    name: 'customFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      }
  });

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
  };

  $scope.tipoDocumento1 = '';
  $scope.tiponame1 = '';
  $scope.tiposize1 = '';

  uploader.onAfterAddingFile = function(fileItem) {
      fileItem.url= CONFIG.UPLOAD_URL+"?desripcion=temporal&&arch_sistema=DMS&&arch_proceso=INFORME&&idusuario="+ sessionService.get('IDUSUARIO'); // direccionamiento para upload
    
      $scope.tipoDocumento = fileItem.file.type;
      $scope.tiponame = fileItem.file.name;
      $scope.tiposize = fileItem.file.size;

      // $scope.tipoDocumento1 = $scope.tipoDocumento1 +'$'+fileItem.file.type;
      $scope.tiponame1 = $scope.tiponame1+'$'+fileItem.file.name;
      $scope.tiposize1 = $scope.tiposize1+'$'+fileItem.file.size;  

      var nameArray = $scope.tipoDocumento.split('/');
      $scope.tipoDocumento = nameArray[1];
      $scope.tipoDocumento1 =$scope.tipoDocumento1 +'$'+$scope.tipoDocumento;    
            
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
  };

  uploader.onBeforeUploadItem = function(item) {

            
  };

  uploader.onProgressItem = function(fileItem, progress) {
  };

  uploader.onProgressAll = function(progress) {
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
   // *********************** FIN DEL UPLOAD *****************************

  
  $scope.guardar = function(data){    
    var mutli_education = document.formulario1.elements["registro[]"];
    var json="[";
    for (var i = 0; i <= mutli_education.length - 1; i++) {
      json = json + '{"clave":"' + mutli_education[i].attributes[2].nodeValue + '", "valor": "' + mutli_education[i].value + '"},'
    };
    json = json.substring(0, json.length-1);
    json = json + "]";
    var valores = JSON.stringify(json);
    $.ajax({
      url:CONFIG.API_URL_DMS+'insertar.php',
      type:"post",
      data:{  "option":"INSERTAR",
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
              $scope.opciontiposDocumentacion = null;                    
              $scope.noticia='';
              $scope.datos = '';                   
              $scope.tiposDocumentacion();
              $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null);
              $scope.tipoDocumento1 = '';
              $scope.tiponame1 = '';
              $scope.tiposize1 = '';
              document.formulario.reset();
            }
      });
    };

    $scope.resultado1='';
    $scope.pwd1='';   
    $scope.valores = function(valor){        
        $scope.resultado1=$scope.resultado1+valor;        
        $scope.pwd1=$scope.resultado1;   
    };

    $scope.elmiminarcaracter = function(){        
       
        if($scope.resultado1.length>0){
          $scope.resultado1=$scope.resultado1.substring(0, $scope.resultado1.length-1);
          $scope.pwd1=$scope.resultado1;
        }else{
          $scope.resultado1="";
           $scope.pwd1="";
        }             
    };

    /*$scope.plantillas = function(id_tipodoc){
        $.blockUI();        
        var resPlantilla = {
            "procedure_name":"sp_dms_lst_plantilla",
             "body": {
              "params": [
                {
                  "name": "sidtipodoc",
                  "value": id_tipodoc
                }
              ]
            }          
        };        
        var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resPlantilla);
        obj.success(function (response) { 
            $scope.datadoplantilla = response;
            $.unblockUI(); 
            if( $scope.datadoplantilla.length>0){
              $scope.valor= $scope.datadoplantilla[0].vpltlla_plantilla;
              var porId=document.getElementById("vtps_doc_id").options.selectedIndex;           
              var vlaoress='<table  width="575" border="0" cellspacing="2"> ';
              vlaoress = vlaoress + '<tr><td colspan="2" style="text-align: center;"><strong>'+document.getElementById("vtps_doc_id").options[porId].text+'</strong></td></tr>';

              var mutli_education = document.formulario1.elements["registro[]"];
              for (var i = 0; i <= mutli_education.length - 1; i++) {

               vlaoress = vlaoress + '<tr><td style="text-align: right;"><B>'+mutli_education[i].attributes[2].nodeValue+':</B></td><td>'+mutli_education[i].value+'</td></tr> ';                
              };
              vlaoress = vlaoress+'</table> ';
              $scope.datosRol.vdoc_cuerpo=vlaoress + $scope.valor;
            } else {
              var vlaoress='<table> ';
              var mutli_education = document.formulario1.elements["registro[]"];
              for (var i = 0; i <= mutli_education.length - 1; i++) {

               vlaoress = vlaoress + '<tr><td><B>'+mutli_education[i].attributes[2].nodeValue+'</B></td><td>'+mutli_education[i].value+'</td></tr> ';                
              };
              vlaoress = vlaoress+'</table> ';
              $scope.datosRol.vdoc_cuerpo =vlaoress;
            }
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no eliminado', 'error');           
        }); 
    };*/  
  /********s15*********/
  //no existe sp_dms_lst_plantilla en la base de datos 
  /***************/
  $scope.cargarenvio = function(data){
      $scope.envios=data;
      
      $scope.uousus();
  };

  //***************************** INSTER DE ENVIOS ********************
  /*$scope.registroEnvio = function(vid_doc){
        $.blockUI();       
        var resenvios = {
            "procedure_name":"dms_sp_adicionar_enviados",

             "body": {
              "params": [
                {
                  "name": "senv_idd_documento",
                  "value": vid_doc
                },
                {
                  "name": "senv_id_usuario",
                  "value": sessionService.get('IDUSUARIO')
                }
              ]
            }
        };        
        var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resenvios);
        obj.success(function (response) {                  
            $.unblockUI();            
            sweet.show('', 'Documento Enviado !!!', 'success');
        })
        obj.error(function(error) {
            sweet.show('', 'Registro no Enviado', 'error');           
        }); 
    };*/    
    /********s16*********/
    // no hay dms_sp_adicionar_enviados en la base de datos 
    /***************/
  // **************************** FIN DE ENVIOS ***********************

  $scope.uotramite = function(){
     $.ajax({ 
        data:{
              option :"LST_UOS"
              } ,            
        url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSCorrespondenciaParametos.php',
        type: 'post', 
       // dataType : 'json',
        beforeSend: function () { 
             //$("#resultado").html("Procesando, espere por favor..."); 
        }, 
        success: function (response) { 
            var obj = JSON.parse(response); 
            //var objs = eval("("+obj+")"); 
            $scope.datauos=obj.resultRoot;
        }
    });

  };

   $scope.uousus = function(nombrusuario){
    
     $.ajax({ 
        data:{
              option :"DTS_USER",
              USER:nombrusuario
              } ,            
        url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSCorrespondenciaParametos.php',
        type: 'post',
      //  dataType : 'json', 
        beforeSend: function () { 
             //$("#resultado").html("Procesando, espere por favor..."); 
        }, 
        success: function (response) {
          var obj = JSON.parse(response);            
          $scope.datanombre=obj.resultRoot[0].NODO_ID;                 
        }
    });

  };
  
  $scope.enviarr = function(data){  
    var objs = JSON.parse($scope.envios.vdoc_datos);
    var enlace= $scope.envios.vdoc_url_logica; 
    mensaje=objs;
    var array = {};
    array['detalle'] =data.vDescripcion;
    var vatr='{\"detalle\":\"fsara\"}';
    $.ajax({ 
        data:{
              CT_TIPO_TRAMITE :"CORR",
              CT_TIP_HOJA:'V',
              //CT_ORIGEN :data.vdoc_a,              
              CT_ORIGEN :data.viduo,              
              CT_HOJA_ASUNTO :data.vAsunto,
              CT_FOJAS :"0",
              CT_DESCRP :data.vDescripcion,
              CT_NODO_ID:$scope.datanombre,
              ARRAY:JSON.stringify(array),
              ACT_ID:15,
              OBSERVACION:"INFORME DE ENVIO",
              URL:$scope.envios.vdoc_url_logica,
              TIPO_DOCUMENTO:"INFORME"
              } ,           
        url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSCorrespondenciaAdjuntos.php',
        type: 'post', 
        beforeSend: function () { 
             //$("#resultado").html("Procesando, espere por favor..."); 
        }, 
        success: function (response) { 
             $scope.datosRol1="";
             $scope.registroEnvio($scope.envios.vdoc_idd); 
             
        }
    });
  };

  $scope.$on('api:ready',function(){
    $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null); 
    
  });

  $scope.inicioDocumentos = function () {
      $scope.getDocumento(sessionService.get('USUARIO'),'DMS',null,null);  
                  
        
  };
});