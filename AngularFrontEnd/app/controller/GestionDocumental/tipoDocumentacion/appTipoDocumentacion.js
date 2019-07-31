app.controller('tipoDocumentacionController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar      
    /*******s1**********/
    $scope.getDocumento = function(){        
        var resRoles = new reglasnegocio();
         resRoles.identificador = 'RCCIUDADANO_108';
         resRoles.parametros = '{}';
         resRoles.llamarregla(function(response){
         response = JSON.parse(response);
            $scope.obtDatos = response;            
            $.unblockUI();            
        });      
    }; 
    /***********s2***********/
   $scope.adicionarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_109';
        var US = sessionService.get('IDUSUARIO');
        rol.parametros ='{"tps_doc_tipo_doc":"'+ datosRol.vtps_doc_tipo_doc +'","tps_doc_descripcion":"'+ datosRol.vtps_doc_descripcion +'","tps_doc_codigo_documento":"'+ datosRol.vtps_doc_codigo_documento +'","tps_doc_usr_id":"'+ US +'"}';        
        rol.llamarregla(function(response){
        response = JSON.parse(response);
            $.unblockUI(); 
            sweet.show('', 'Registro insertado', 'success');
            $route.reload();
        });
    };
  /********s3************/
   $scope.modificarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_110';
        var US = sessionService.get('IDUSUARIO');
        rol.parametros ='{"id":"'+ datosRol.vtps_doc_id +'","tps_doc_tipo_doc":"'+ datosRol.vtps_doc_tipo_doc +'","tps_doc_descripcion":"'+ datosRol.vtps_doc_descripcion +'","tps_doc_codigo_documento":"'+ datosRol.vtps_doc_codigo_documento +'","tps_doc_usr_id":"'+ US +'"}';
        rol.parametros.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro modificado', 'success');
            $route.reload();
        });
    }; 
 /**************s4*************/
    $scope.eliminarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_111';
        var US = sessionService.get('IDUSUARIO');
        rol.parametros ='{"id":"'+ datosRol.vtps_doc_id +'","tps_doc_tipo_doc":"'+ datosRol.vtps_doc_tipo_doc +'", "tps_doc_descripcion":"'+ datosRol.vtps_doc_descripcion +'","tps_doc_codigo_documento":"'+ datosRol.vtps_doc_codigo_documento +'","tps_doc_usr_id":"'+ US +'","tps_doc_estado":"B"}';
        rol.llamarregla(function(data){
            data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro eliminado', 'success');
            $route.reload();
        });
    };
 /*****************************/

    $scope.modificarDocumentoCargar = function(rol){
        $scope.only=false;
        $scope.datosRol=rol;
        $scope.boton="upd";
        $scope.titulo="Modificar Tipo de Documentacion";
    };
    $scope.eliminarDocumentoCargar = function(rol){
        $scope.only=true;
        $scope.datosRol=rol;
        $scope.boton="del";
        $scope.titulo="Eliminar Tipo de Documentacion";
    };
    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Registro de Tipo de Documentacion";
    }; 
    $scope.$on('api:ready',function(){
        $scope.getDocumento();       

        // para el modal de Tipo Documentaciones
        $scope.getComboDominios();
        $scope.getComboTipoDocumentacion();
    });
    $scope.inicioDocumentos = function () {
        $scope.getDocumento();
        $scope.getComboDominios();
        $scope.getComboTipoDocumentacion();
    }; 

    // ********** Nuevo ******* //
    // ********** Modal de Tipo Documentaciones *********** //
    /**************s5************/
    $scope.getDocumentacion = function(idtipoDocumento, tipoDoc){
        // **** Recuperar el id del doc para poderlo recargar
        $scope.cargarInformacionvista12 = true;
        $scope.idtipoDoc = idtipoDocumento;        
        $scope.tipoDocumentacion = tipoDoc;
        var resDocs = new reglasnegocio();
        resDocs.identificador = 'RCCIUDADANO_112';
        resDocs.parametros='{"idtipodocumentacion":"'+ idtipoDocumento +'"}';
        resDocs.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.obtDocumentos = response;
            $.unblockUI();
        });      
    };
    /***********s6************/
    $scope.getComboDominios = function(){        
        var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_113';
        resRoles.parametros = '{}';
        resRoles.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.obtDominios = response;            
            $.unblockUI();            
        });      
    }; 
    /*********s7****************/
   $scope.getComboTipoDocumentacion = function(){        
       var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_114';
        resRoles.parametros='{}';
        resRoles.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.obtTipoDocumentacion = response;            
            $.unblockUI();            
        });      
    };
    /************s8****************/
    $scope.adicionarTipo = function(datosTipoDoc){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_115';
        var US = sessionService.get('IDUSUARIO'); 
         if($scope.mostrarDatoCombo!=null)
        {
            var doctdatos = datosTipoDoc.vdoct_datos;     
        }
        else
        {
            var doctdatos = ""; 
        } 
        rol.parametros = '{"doct_tps_doc_id":"'+ $scope.idtipoDoc +'","doct_titulo":"'+ datosTipoDoc.vdoct_titulo +'","doct_dmn_id":"'+ datosTipoDoc.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'","doct_orden":"'+ datosTipoDoc.vdoct_orden +'","doct_datos":"'+ doctdatos +'"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro insertado', 'success');
            $scope.getDocumentacion($scope.idtipoDoc);
        });
    };
    /**************s9*************/
    $scope.modificarTipo = function(datosTipoDoc){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_116';
        var US = sessionService.get('IDUSUARIO'); 
         if($scope.mostrarDatoCombo!=null)
        {
            var doctdatos=datosTipoDoc.vdoct_datos;     
        }
        else
        {
            var doctdatos = ""; 
        } 
        rol.parametros = '{"doct_tps_doc_id":"'+ $scope.idtipoDoc +'","doct_titulo":"'+ datosTipoDoc.vdoct_titulo +'","doct_dmn_id":"'+ datosTipoDoc.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'","doct_orden":"'+ datosTipoDoc.vdoct_orden +'","doct_datos":"'+ doctdatos +'"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro modificado', 'success');            
            $scope.getDocumentacion($scope.idtipoDoc);
        });
    }; 
    /***********s10*********/
    $scope.eliminarTipo = function(datosTipoDoc){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_117';
        var US = sessionService.get('IDUSUARIO'); 
         if($scope.mostrarDatoCombo!=null)
        {
            var doctdatos = datosTipoDoc.vdoct_datos;     
        }
        else
        {
            var doctdatos = ""; 
        } 
        rol.parametros ='{"id":"'+ datosTipoDoc.vdoct_id +'",doct_tps_doc_id":"'+ $scope.idtipoDoc +'","doct_titulo":"'+ datosTipoDoc.vdoct_titulo +'", "doct_dmn_id":"'+ datosTipoDoc.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'","doct_orden":"'+ datosTipoDoc.vdoct_orden +'","doct_datos":"'+ doctdatos +'","doct_estado":"B"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro eliminado', 'success');
            $scope.getDocumentacion($scope.idtipoDoc);
        });
    };
    
    /********************/
    $scope.getCampodatos = function(campoDatos) {
        var valor = $("#vdmn_dominio_desc option:selected").html();
        if(valor!="combo") 
        {
            $scope.mostrarDatoCombo=null;

        }
        else{
            $scope.mostrarDatoCombo=true;
        }
        
    };

    $scope.Adicion = function(){
        $scope.only=false;
        $scope.datosTipoDoc = '';
        $scope.boton="new";
        $scope.titulo="Registro de Tipo " + $scope.tipoDocumentacion;
        $scope.mostrarDatoCombo=null;
    }; 
    $scope.modificacion = function(rol){
        $scope.only=false;
        $scope.datosTipoDoc=rol;
        $scope.boton="upd";
        $scope.titulo="Modificar Tipo " + $scope.tipoDocumentacion;
    };
    $scope.eliminacion = function(rol){
        $scope.only=true;
        $scope.datosTipoDoc=rol;
        $scope.boton="del";
        $scope.titulo="Eliminar Tipo " + $scope.tipoDocumentacion;
    };  
    $scope.volver = function () {
        // $scope.clase222='col-md-12';
        // $scope.clase22='col-md-4';
        $scope.cargarInformacionvista12 = null;       
    }
});