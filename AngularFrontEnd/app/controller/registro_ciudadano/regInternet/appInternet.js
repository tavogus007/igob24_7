//internetController
app.controller('regInternetController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
    
    //UPLOAD  FILES
    var uploader = $scope.uploader = new FileUploader({
           url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
    });
    // END UPLOAD       
    $scope.templates =
    [ { name: 'template1.html', url: '../../../app/view/registro_ciudadano/regInternet/internet.html'},
      { name: 'template2.html', url: '../../../app/view/registro_ciudadano/regMedico/index.html'} ];
    $scope.template = $scope.templates[0];
    $rootScope.prsId = sessionService.get('IDUSUARIO');
        $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    
    var datos = {};
    $scope.datos = datos;
    var sIdCiudadano = "";    
    //Recuperara campos serializados - formulario salud
    /***************************** busqueda formulario ************************/
    $scope.tramitesCiudadano = function () {
        sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        sIdFormulario = sessionService.get('ID_FORMULARIO');//IDCIUDADANO
        var tciudadano = new reglasnegocio();
        tciudadano.id = 65;
        tciudadano.parametros = '{"sserid":"' + sIdFormulario + '","sidciudadano":"' + sIdCiudadano + '"}';
        tciudadano.llamarregla(function(response){ 
            response = JSON.parse(response);    
            if(response.length > 0){
                $scope.obtTramites = response;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };
    /**************************************************************************/
    $scope.recuperarSerializarInfo = function(id){
        sIdTramite = id;
        sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        if(sIdCiudadano){
            var recuperarSer   = new reglasnegocio();
            recuperarSer.id = 39;
            recuperarSer.parametros='{"sidciudadano":"' + sIdCiudadano + '","sidservicio":1,"sidtramite":"' + sIdTramite+ '"}';
            recuperarSer.llamarregla(function(results){
                results = JSON.parse(results);
                if(results.length > 0){
                    datos = JSON.parse(results[0].form_contenido);
                    $scope.datos = datos;
                    console.log("INFORMACION DATOS INTERNET");
                    console.log(datos);                    
                }else{
                    console.log("No existen datos del contenido del formulario de salud");  
                    $scope.datos = "";
                    sessionService.set('IDTRAMITE', sIdTramite);                
                }
            });
        }else{
            alert("NO existe id ciudadano");
        }
    }
    /**************************************************************************/
    //Serializacion de los campos del formulario salud
    $scope.serializarInformacion = function(obj){      
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();        
        console.log("MIS DATOS INTERNET ...");
        console.log(obj);
        var datosSerializados = JSON.stringify(obj);
        var idCiudadano = sessionService.get('IDSOLICITANTE');
        var idTramite = sessionService.get('IDTRAMITE');
        var resFormulario = new reglasnegocio();
        resFormulario.id = 68;
        resFormulario.parametros='{"frm_dvser_id":1,"frm_dato":"' + datosSerializados + '","frm_id_ciudadano":"' + idCiudadano + '","frm_id_tramite":"' + idTramite + '","frm_id_usuario":1}';
        resFormulario.llamarregla(function(data){
            data = JSON.parse(data);
            registroLog.almacenarLog(sessionService.get('IDUSUARIO'), idCiudadano, data.frm_id, "Actualizacion del formulario de salud");
            sweet.show('', "Registro insertado", 'success'); 
            $scope.recuperarSerializarInfo(idTramite);
        })
    }
    
     /**************************************************************************/
    $scope.enviarInformacion = function(obj){      
        //var idCiudadano = sessionService.get('IDSOLICITANTE');
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        var enviarInf = new reglasnegocio();
        enviarInf.id = 160;
        enviarInf.parametros='{"id":"' + idTramite + '",frm_tra_enviado":"SI","frm_tra_id_usuario":"' + idUsuario + '","frm_tra_modificado":"' + fechactual + '"}';
        enviarInf.llamarregla(function(data){
            data = JSON.parse(data);
            sweet.show('', 'Registro modificado', 'success');
            $scope.tramitesCiudadano();
            $scope.desabilitado = true;
            $scope.botones = null;
        })
    }
    /**************************************************************************/
    //Nuevo servicio - modal
    $scope.sTipoServicio = "1";
    $scope.aServiciosGamlp = {};
    $scope.datosServicios = { "idServicioGamlp": 1,"detalle":""};
    $scope.aSerGamlp = {};
    /**************************************************************************/
    $scope.serviciosGamlp = function(){
        var aServicios = new reglasnegocio();
        aServicios.id = 69;
        aServicios.parametros = '{}';  
        aServicios.llamarregla(function(results){
            results = JSON.parse(results);
            $scope.aServiciosGamlp = results;
            $scope.aSerGamlp = results;
            //Recuperando el id_formulario
            if(sessionService.get('ID_FORMULARIO')){
                $scope.sTipoServicio = sessionService.get('ID_FORMULARIO');
            }
            $scope.actulizarDescripcion($scope.sTipoServicio);
        }); 
    }    
    /**************************************************************************/
    //Actualizar Descripcion
    $scope.actulizarDescripcion = function(id){
        var aFiltro = filterFilter($scope.aSerGamlp, {'serdv_id':id});        
        $scope.datosServicios.detalle = aFiltro[0].serdv_descripcion;
    }
    //Almacenando servicios
    /******************************************************************************************/
    $scope.adicionarServicioGamlp = function(datos){        
        var fecha = new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        //var sIdServicio = datos.idServicioGamlp;
        var sIdServicio = datos;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;
        var adicionarServicio   = new reglasnegocio();
        adicionarServicio.id = 68;
        adicionarServicio.parametros = '{"frm_tra_dvser_id":"' + sIdServicio + '","frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":3}';
        adicionarServicio.llamarregla(function(data){
            data = JSON.parse(data);
            $scope.tramitesCiudadano();
            sweet.show('', 'Registro almacenado correctamente', 'success');
        });
    }
    /******************************************************************************************/
    /*$scope.limpiarServicioGamlp = function(){
        var aFiltro = filterFilter($scope.aSerGamlp, {'serdv_id':1});
        $scope.datosServicios = { "idServicioGamlp": 1,"detalle":aFiltro[0].serdv_descripcion};    
    }*/
    //Confirmar grabado
    $scope.confirmarServicioGamlp = function(dat) {
        $scope.adicionarServicioGamlp(dat);        
    }
    
    
    //Iniciando js    
    $scope.$on('api:ready',function(){
        $scope.template = $scope.templates[0];
        $scope.tramitesCiudadano();
        $scope.serviciosGamlp();
        //$scope.recuperarSerializarInfo();
    });
    $scope.inicioRegInternet = function () {
        $scope.tramitesCiudadano();
        $scope.formulario = null;
        $scope.serviciosGamlp();
    }; 
    
    $scope.seleccionarTramite = function (tramite) {
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI") {
            $scope.desabilitado = true;
            $scope.botones = null;
        } else {
            $scope.desabilitado = false;
            $scope.botones = "mostrar";
        }
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        $scope.recuperarSerializarInfo(tramite.vtra_id);
    };

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

//Boton de confirmacion
app.directive("confirmButton", function($document, $parse) {
    ////app = angular.module('TestApp', ['ui']).directive("confirmButton", function($document, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var buttonId, html, message, nope, title, yep;      
      buttonId = Math.floor(Math.random() * 10000000000);
      attrs.buttonId = buttonId;
      message = attrs.message || "Are you sure?";
      yep = attrs.yes || "Yes";
      nope = attrs.no || "No";
      title = attrs.title || "Crear nuevo tramite";
      html = "<div style='width:190px;' id=\"button-" + buttonId + "\">\n  <span class=\"confirmbutton-msg\">" + message + "</span><br>\n   <button  data-dismiss='modal' class=\"confirmbutton-yes btn btn-success\">" + yep + "</button>\n    <button class=\"confirmbutton-no btn btn-danger\">" + nope + "</button>\n</div>";
     element.popover({
        content: html,
        html: true,
        trigger: "manual",
        title: title
      });      
      return element.bind('click', function(e) {
        var dontBubble, pop;
        dontBubble = true;        
        e.stopPropagation();        
        element.popover('show');        
        pop = $("#button-" + buttonId);        
        pop.closest(".popover").click(function(e) {
          if (dontBubble) {
            e.stopPropagation();
          }
        });        
        pop.find('.confirmbutton-yes').click(function(e) {
          dontBubble = false;
          
          var func = $parse(attrs.confirmButton);
          func(scope);
        });        
        pop.find('.confirmbutton-no').click(function(e) {
          dontBubble = false;
          
          $document.off('click.confirmbutton.' + buttonId);
          
          element.popover('hide');
        });
        
        $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
          $document.off('click.confirmbutton.' + buttonId);
          element.popover('hide');
        });
      });
    }
  };
});