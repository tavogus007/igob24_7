//app.controller('foroController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet,$sce) {
function foroController($rootScope, $scope,$location,$route,CONFIG,$q,sessionService,ngTableParams,$filter,sweet,$sce,FileUploader,fileUpload,$timeout,$window,LogGuardarInfo,$routeParams,registroLog,Data,$http)
{
    $scope.imageCST     = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG     = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    var fecha           = new Date();
    var fechactual      = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size            = 10;
    var idDeGrupo       = "";
    var nombreDeGrupo   = "";
    var idRespuesta     = "";
    var idTema          = "";
    var nombreRespuesta = "";
    var datoRespuesta   = "";
    var fechaRespuesta  = "";
    var likesRespuesta  = "";
    var respuestaHijo   = ""; 
    var idRespuesta2    = "";
    var idTema2         = "";
    var nombreRespuesta2= "";
    var datoRespuesta2  = "";
    var fechaRespuesta2 = "";
    var likesRespuesta2 = "";
    var respuestaHijo2  = ""; 
    var idTemaPrincipal_1=""; 
    var nombreTema_1     = ""; 
    var descripcionTema_1= ""; 
    var imagenPerfilTema_1= ""; 
    var nroTemaLike_1     ="";
    $scope.message = "";
    $scope.htmlGrupo = "";
    $scope.htmlTema = "";
    $scope.htmlTema1 = "";
    $scope.html = "";
    $scope.imagenTema="";
    var nombreCompletoSession= sessionService.get('US_NOMBRE')+" "+sessionService.get('US_PATERNO')+" "+sessionService.get('US_MATERNO'); 
    var nombreImagenPerfil   = sessionService.get('NOMBRE_IMAGEN');
    var direccionImagenPerfil= sessionService.get('URL_IMAGEN_COMPLETO')+"/";
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;
    $scope.img_ninguna=CONFIG.IMG_URL+"/uploads/im4g3nn0ne23133434290756564558453453460696847346.png";
    var completoDireccionImagen = "";
    var completoDireccionImagen2 = "";

    /** CARGA INICIAL **/
    $scope.inicioDocumentos = function (){
        $scope.listadoTemas = null;
        $scope.respuestasTema = null;
        $scope.cargaPrincipal();  
        $scope.getCaptchasX();
        $scope.recuperarDatosRegistro();
    };

    /*** FORMULARIO PRINCIPAL ***////////////
    $scope.cargaPrincipal = function () {
        var principal = new reglasnegocio();
        principal.identificador = 'RCCIUDADANO_PRINCIPALWEB';
        principal.parametros = '{}';   
        $scope.gruposTema = true;
        $scope.listadoTemas = null;
        $scope.respuestasTema = null;
        $scope.htmlGrupo = "";   
        principal.llamarregla(function(response){
            //$scope.principal = 
            var data = JSON.parse(response);
            for (var i = 0; i < data.length; i++) {
                grpId =data[i].xpri_id;
                xg = data[i].xcantgrgupo;
                grpNombreGrupo = data[i].xpri_nombre;
                grpImagenGrupo = data[i].xpri_imagen_grupo;
                grpResgistrado = data[i].xpri_resgistrado;
                grpModificado = data[i].xpri_modificado;
                grpUsuario = data[i].xpri_usuario;
                grpEstado = data[i].xpri_estado;
                grpNroVisto1 = data[i].xpri_nro_visto;
                grpOrden = data[i].xpri_orden;
                grpContTemas = data[i].xcantchat;
                $scope.htmlGrupo +='<div class="col-sm-4">';
                   $scope.htmlGrupo +='<div class="row">';
                       $scope.htmlGrupo +='<div class="col-md-12">';       
                           $scope.htmlGrupo +='<div>';
                               $scope.htmlGrupo +='<a onclick="cargarTema('+grpId+','+"'"+grpNombreGrupo+"'"+');"><div class="box"><img src = "../GestionDocumental/foro/imagenes/'+grpImagenGrupo+'" width =  "100 " height = "80">'+grpNombreGrupo+'</div></a>';  
                           $scope.htmlGrupo +='</div>';
                       $scope.htmlGrupo +='</div>';
                   $scope.htmlGrupo +='</div>';
                   $scope.htmlGrupo +='<div class="row">';
                        $scope.htmlGrupo +='<div class="col-md-12">';
                            $scope.htmlGrupo +='<div class="col-md-6"></div>'; // mitad 1
                            $scope.htmlGrupo +='<div class="col-md-6">'; // mitad 2
                                $scope.htmlGrupo +='<div style="margin-bottom: 0px;align: left;">';
                                $scope.htmlGrupo +='<a align="left" class="col-md-3" cursor: default; color: black !important"><br>';
                                $scope.htmlGrupo +='<p style="font-size: 15px;"><i class="fa fa-eye" style="color:black" style="font-size: 19px; padding: 3px 0px 10px 13px" data-toggle="tooltip" title="Visitas"></i></p>'+grpNroVisto1+' ';
                                $scope.htmlGrupo +='</a>'
                                $scope.htmlGrupo +='<a class="col-md-3" cursor: default; color: white !important"><br>';
                                $scope.htmlGrupo +='<p style="font-size: 15px;"><i class="fa fa-copy" style="font-size:19px;color:orange" style="font-size: 19px; padding: 3px 0px 10px 0px" data-toggle="tooltip" title="Temas"></i></p>'+xg+' </p>';
                                $scope.htmlGrupo +='<a class="col-md-3" onclick="cargarTema('+grpId+','+"'"+grpNombreGrupo+"'"+');"><br>';
                                $scope.htmlGrupo +='<p style="font-size: 15px; font-color: black;"><i class="fa fa-users" style="color:#003366!important" style="font-size: 19px;style="font-color: black; padding: 3px 10px 10px 0px" data-toggle="tooltip" title="Participa"></i></p>';
                                $scope.htmlGrupo +='</a>';
                                
                            $scope.htmlGrupo +='</div>'; // mitad 2
                        $scope.htmlGrupo +='</div>'; // relative
                        $scope.htmlGrupo +='</div>'; // verde
                    $scope.htmlGrupo +='</div>'; // row
                $scope.htmlGrupo +='</div>'; 
            }
            $scope.$apply();
            $scope.get_renderizarGrupos($scope.htmlGrupo);
        });    
    };

    /** FORMULARIOS GRUPOS **/
    
    $scope.getDocumento = function (idGrupo, nombreGrupo){ 
        //setTimeout(function(){
            $scope.gruposTema = null;
            $scope.listadoTemas = true;
            $scope.respuestasTema = null;
            $scope.nombreGrupoTema = nombreGrupo;
            $scope.htmlTema = "";
            $scope.idDeGrupo = idGrupo;
            idDeGrupo = idGrupo;
            nombreDeGrupo = nombreGrupo;
            var resRoles = new reglasnegocio();
            resRoles.identificador = 'RCCIUDADANO_LISTARGRUPOS'; //AZURE Y LOCAL
            resRoles.parametros = '{"id":'+idGrupo+'}';
            resRoles.llamarregla(function(response)
            {
                response = JSON.parse(response);
                if(response == "" || response == "{}" || response == "[{}]" || response == "[{ }]")
                {
                    swal('', 'FORO actual sin temas', 'warning');
                    $scope.nroTemas = 0;
                    $scope.$apply();
                }else
                {
                    $scope.nrovisitasPrincipal(idGrupo);
                    $scope.nroTemas = response.length;
                    $scope.datadocumentos = response;
                    angular.forEach($scope.datadocumentos,function(celda, fila)
                    {  
                        ftmIdTema = celda['grpid'];
                        ftmTema = celda['grpnombregrupo'];
                        ftmRegistro = celda['grpresgistrado'];
                        ftmModificacion = celda['grpmodificado'];
                        ftmNroRespuestas = $rootScope.comentarios;
                        ftmNroRespuestas = celda['conttemasdato'];
                        ftmimagen = celda['imgprin'];
                        ftmNroVisitas = celda['grpnrovisto'];
                        $scope.ftmNroVisitas = celda['grpnrovisto'];

                        ftmEstado = celda['grpestado'];                    
                        
                        ftmAutor = 0; // celda['ftmautor'];//---------------
                        ftmUsuario = 0; // celda['ftmusuario'];//-------------
                        ftmDescripcionTema = 0; // celda['ftmdescripciontema'];//-------------
                        imagenPerfilTema = 0; // celda['imagenperfiltema'];//-------------
                        nroLikesTema = 0; // celda['nrolikestema'];//-------------
                        ftmIdGrupo = 0; // celda['ftmidgrupo'];//-------------
                        ftmPromedioCalificacion = 0; // celda['promediocalificacion'];//-------------
                        
                        $scope.htmlTema +='<div class="col-md-4" class ="fieldset">';
                            $scope.htmlTema +='<div class="row">';
                                $scope.htmlTema +='<div class="col-md-12">';
                                       $scope.htmlTema +='<div>';
                                           $scope.htmlTema +='<a data-target="#registrarTema" onclick="cargarSubTema('+ftmIdTema +','+
                                                                                            "'"+ftmTema+"'"+','+
                                                                                            "'"+ftmAutor+"'"+','+
                                                                                            "'"+ftmNroRespuestas+"'"+','+
                                                                                            "'"+ftmNroVisitas+"'"+','+
                                                                                            "'"+ftmRegistro+"'"+','+
                                                                                            "'"+ftmModificacion+"'"+','+
                                                                                            "'"+ftmEstado+"'"+','+
                                                                                            "'"+ftmUsuario+"'"+','+
                                                                                            "'"+ftmDescripcionTema+"'"+','+
                                                                                            "'"+imagenPerfilTema+"'"+','+
                                                                                            "'"+nroLikesTema+"'"+','+ftmIdGrupo+');"><div class="box"><img src = "../GestionDocumental/foro/imagenes/'+ftmimagen+'" width =  "50 " height = "50"> '+ftmTema+'</div>';
                                       $scope.htmlTema +='</div>';
                                    $scope.htmlTema +='</div>';
                                    $scope.htmlTema +='<div class="col-md-6"></div>'; // mitad 1
                                    $scope.htmlTema +='<div class="col-md-6">'; // mitad 2
                                        $scope.htmlTema +='<div class = "tabla">';  //tabla1
                                            //$scope.htmlTema +='<div class="columna1"><i class="fa fa-heart" style="font-size:22px;" data-toggle="tooltip" title="Me gusta"></i></div>';
                                            $scope.htmlTema +='<div class="columna0"><i class="fa fa-eye" style="font-size:19x;color:black" data-toggle="tooltip" title="Visitas"></i></div>';
                                            $scope.htmlTema +='<div class="columna1"><i class="fa fa-comments" style="font-size:19px;color:orange" data-toggle="tooltip" title="Respuestas"></i></div>';
                                            $scope.htmlTema +='<div class="columna2"><i class="fa fa-users" style="font-size:22px;color:#003366!important;" ng-click="cargarSubTema('+ftmIdTema +','+
                                                                                                                                                                                    "'"+ftmTema+"'"+','+
                                                                                                                                                                                    "'"+ftmAutor+"'"+','+
                                                                                                                                                                                    "'"+ftmNroRespuestas+"'"+','+
                                                                                                                                                                                    "'"+ftmNroVisitas+"'"+','+
                                                                                                                                                                                    "'"+ftmRegistro+"'"+','+
                                                                                                                                                                                    "'"+ftmModificacion+"'"+','+
                                                                                                                                                                                    "'"+ftmEstado+"'"+','+
                                                                                                                                                                                    "'"+ftmUsuario+"'"+','+
                                                                                                                                                                                    "'"+ftmDescripcionTema+"'"+','+
                                                                                                                                                                                    "'"+imagenPerfilTema+"'"+','+
                                                                                                                                                                                    "'"+nroLikesTema+"'"+','+ftmIdGrupo+');"></i></a></div>';
                                                                                                                                                                                    
                                        $scope.htmlTema +='</div>'; //tabla1
                                        $scope.htmlTema +='<div class = "tabla">'; //tabla 2
                                            //$scope.htmlTema +='<div class="columna1" class="bg-primary" ><span style="padding: 0px 10px;">'+nroLikesTema+'</span></div>';
                                            $scope.htmlTema +='<div class="columna0" class="descripcion_f_list" align= "left"><span style="padding: 2px 10px;">'+ftmNroVisitas+'</span></div>';
                                            $scope.htmlTema +='<div class="columna1" class="descripcion_f_list"><span style="padding: 2px 10px;">'+ftmNroRespuestas+'</span></div>';
                                            $scope.htmlTema +='<div class="columna2">.......<span style="padding: 2px 10px;"></span></div>';
                                        $scope.htmlTema +='</div>';//fin tabla2
                                    $scope.htmlTema +='</div>' //fin mitad 2
                                $scope.htmlTema +='</div>';// fin m12
                            $scope.htmlTema +='</div>';// fin row
                        $scope.htmlTema +='</div>'; // fin sm4                                   
                    });
                    $scope.get_renderizarTemas($scope.htmlTema);
                    $scope.$apply();
                }
            }); 
    };

    /*********************************************************************************
    MOSTRAR TEMAS
    *********************************************************************************/
   
    $scope.mostrarTemas = function (ftmIdTema, ftmTema, ftmAutor, ftmNroRespuestas, ftmNroVisitas, ftmRegistro, ftmModificacion, ftmEstado, ftmUsuario, ftmDescripcionTema, imagenPerfilTema, nroLikesTema, ftmIdGrupo ){
        setTimeout(function(){
            $scope.listadoTemas = null;
            $scope.respuestasTema = true;
            $scope.tituloTema = ftmTema;
            $scope.htmlTema1 ='';
            var resTemas = new reglasnegocio();
            resTemas.identificador = 'RCCIUDADANO_97';
            resTemas.parametros ='{"idgrupo":"' + ftmIdTema + '"}';
            resTemas.llamarregla(function(response)
            {
                $scope.datatemas = JSON.parse(response);
                //console.log('$scope.datatemas',$scope.datatemas);
                angular.forEach($scope.datatemas,function(celda, fila)
                {
                    tema_autor = celda['ftmautor'];
                    tema_tema = celda['ftmtema'];
                    tema_descr = celda['ftmdescripciontema'];
                    tema_idgrupo = celda['ftmidgrupo'];
                    tema_idtema = celda['ftmidtema'];
                    tema_registro = celda['ftmregistro'];
                    tema_modificacion = celda['ftmmodificacion'];
                    tema_respuestas = celda['ftmnrorespuestas'];
                    $scope.tema_respuestas = celda['ftmnrorespuestas'];
                    tema_visitas = celda['ftmnrovisitas'];
                    tema_usuario = celda['ftmusuario'];
                    tema_ImagenPerfil = celda['imagenperfiltema'];
                    //console.log('tema_ImagenPerfil--->',tema_ImagenPerfil);
                    tema_likes = celda['nrolikestema'];
                    $scope.tema_likes = celda['nrolikestema'];
                    tema_promedio = celda['promediocalificacion'];
                    if (tema_ImagenPerfil == '' || tema_ImagenPerfil == 'undefined' || tema_ImagenPerfil == undefined || tema_ImagenPerfil == null || tema_ImagenPerfil == 'null'){
                        $scope.imagenPerfil = "../GestionDocumental/foro/imagenes/silueta_1.png";
                    }else{
                        $scope.imagenPerfil = tema_ImagenPerfil;
                    }
                    $scope.htmlTema1 +='<div class="container-fluid" style="background: white;">';
                        $scope.htmlTema1 +='<div class="row fieldset" class="form-control">';
                            $scope.htmlTema1 +='<div>'; 
                                $scope.htmlTema1 +='<div class="col-md-1">';                    
                                    $scope.htmlTema1 +='<img src="'+$scope.imagenPerfil+'" width="60" height="60" class="img-circle">';
                                    $scope.htmlTema1 +='<input type="hidden" name="tema_idgrupo"  id="tema_idgrupo" value="'+ftmIdTema+'" >';
                                $scope.htmlTema1 +='</div>'; 
                                $scope.htmlTema1 +='<div class="col-md-10">';
                                    $scope.htmlTema1 +='<div class="descripcion_f_list"><strong>'+tema_tema+'</strong></div>';
                                    $scope.htmlTema1 +='<div class="descripcion_f_list">'+tema_descr+'</div>&nbsp &nbsp';
                                    $scope.htmlTema1 +='<div class="por_f_list" style="font-size: 14px !important;">'+tema_autor+'</div>';
                                    $scope.htmlTema1 +='<a class="btn btn-info ng-binding" data-toggle="modal" data-toggle="modal" data-target="" style="color: #FFFFFF; background-color: #003366" onclick="return  mostrarOcultar('+tema_idtema+');">Ocultar Respuestas</a>';
                                    $scope.htmlTema1 +='<a class="btn btn-info ng-binding" data-toggle="modal" data-toggle="modal" data-target="" style="color: #FFFFFF; background-color: #003366" onclick="mostrarOcultar('+tema_idtema+');caragarViewRespuestas('+tema_idtema+', '+"'"+ftmTema+"'"+','+"'"+tema_descr+"'"+','+"'"+tema_ImagenPerfil+"'"+','+"'"+tema_likes+"'"+');">Ver Respuestas</a>';
                                
                                    $scope.htmlTema1 +='</div>';
                                $scope.htmlTema1 +='<div class="col-md-1">';

                                    // ICONOS EN RESPUESTAS
                                        $scope.htmlTema1 +='<div class="col-md-2"  style="color:#535E65;text-align:left; padding: 12px 0px 0px 0px">';
                                            $scope.htmlTema1 +='<div class = "tabla">';
                                                $scope.htmlTema1 +='<div class="columna1"><a><i class="fa fa-heart" class="pull-left" style="font-size:22px; color:#A50000"  data-toggle="tooltip" onclick="cargarMegusta('+tema_idtema+');" ng-disabled = "bloquear" title="Me gusta" id = "btnTema"></i></a></div>&nbsp &nbsp'; 
                                                $scope.htmlTema1 +='<div class="columna2"><i class="fa fa-eye" style="font-size:22px;color:black" data-toggle="tooltip" title="Visitas"></i></div>&nbsp &nbsp';
                                                //$scope.htmlTema1 +='<div class="columna3"><i class="fa fa-comments" style="font-size:22px;color:#FFD700" data-toggle="tooltip" title="Respuestas"></i></div><br>';
                                            $scope.htmlTema1 +='</div>';
                                            $scope.htmlTema1 +='<div class = "tabla">';
                                                $scope.htmlTema1 +='<div class="columna1" class="bg-primary" ><span style="padding: 0px 10px;color: black !important;">'+tema_likes+'</span></div>';
                                                $scope.htmlTema1 +='<div class="columna1" class="descripcion_f_list"><span style="color: black !important; padding: 0px 10px;">'+tema_respuestas+'</span></div>';
                                                //$scope.htmlTema1 +='<div class="columna3" class="descripcion_f_list"> <span style="color: black !important; padding: 0px 10px;">CC{{comentarios}}</span></div>';
                                            $scope.htmlTema1 +='</div>';
                                    
                                        $scope.htmlTema1 +='</div>';

                                    //FIN ICONOS REPSUESTAS
                                    $scope.htmlTema1 +='<a class="btn btn-info ng-binding" data-toggle="modal" data-toggle="modal" data-target="#responderTema" id="cambia" onclick="respuestaGen('+tema_idtema+');">Participar</a>';
                                    $scope.htmlTema1 +='<span>&nbsp;&nbsp;&nbsp;</span>';
                                    $scope.htmlTema1 +='<span style="color:#535E65;">'
                                    $scope.htmlTema1 +='<span style="font-size: 14px !important;">';
                                        /* boton like comentario*/
                                        //$scope.htmlTema1 +='</button>';
                                    $scope.htmlTema1 +='</span>';
                                    $scope.htmlTema1 +='</span>';
                                $scope.htmlTema1 +='</div>';
                                //OCULTAR RESPUESTAS///
                                $scope.htmlTema1 +='<div class="col-md-12" id="ocultable'+tema_idtema+'">';
                                    $scope.htmlTema1 +='<div id="respuesta_data'+tema_idtema+'"></div>';
                                $scope.htmlTema1 +='</div>';
                            $scope.htmlTema1 +='</div>';
                            $scope.htmlTema1 +='<div class="col-md-12" style="padding: 0px 0px 10px 0px; margin-bottom: 10px; text-align: right;">';                             
                            $scope.htmlTema1 +='</div>';
                        $scope.htmlTema1 +='</div>';
                    $scope.htmlTema1 +='</div>';
                });
                $scope.$apply();
                $scope.get_renderizarTemas1($scope.htmlTema1);
                $scope.get_renderizarRespuestas($scope.htmlTema1);
            });
       
        },300); 
    };

    /*
     * Renderizar vistas
     */
    /******************/
    $scope.renderRespuestaTema = function(idTemaPrincipal, nombreTema, descripcionTema, imagenPerfilTema, nroTemaLike){
        $scope.html = "";
        $scope.getCaptchasXX();
        idTema = idTemaPrincipal;
        $scope.nombreTema = nombreTema;
        $scope.descripcionTema = descripcionTema;
        $scope.nroLikesTema = nroTemaLike;
        var resDocumentaciones = new reglasnegocio();
        resDocumentaciones.identificador = 'RCCIUDADANO_284';
        resDocumentaciones.parametros ='{"idtemaprincipal":"' + idTemaPrincipal + '"}';
        resDocumentaciones.llamarregla(function(response)
        {
            response = JSON.parse(response);
            $scope.datadocumentos= response;
            $rootScope.comentarios = $scope.datadocumentos.length;
             //RESPUESTA A TEMAS//         
            angular.forEach($scope.datadocumentos,function(celda, fila)
            {
                //$scope.recuperarDatosRegistro();
                idRespuesta = celda['rtmidrespuesta'];
                $scope.idTema = celda['rtmidtema'];
                nombreRespuesta = celda['rtmnombrerespuesta'];
                datoRespuesta = celda['rtmrespuesta'];
                fechaRespuesta = celda['rtmregistro'];
                likesRespuesta1 = celda['rtmnro_likes'];
                respuestaHijo = celda['rtmid_respuesta_hijo'];
                respuestaImagenPerfil = celda['imagenperfilrespuesta'];
                if (respuestaImagenPerfil == '' || respuestaImagenPerfil == 'undefined' || respuestaImagenPerfil == undefined || respuestaImagenPerfil == null || respuestaImagenPerfil == 'null'){
                    $scope.imagenPerfil = "../GestionDocumental/foro/imagenes/silueta_1.png";
                }else{
                    $scope.imagenPerfil = respuestaImagenPerfil;
                }
                oid = celda['rtmusuario'];
                if(respuestaHijo == 0){
                    // respuestas
                    $scope.html = $scope.html+'<div class="container-fluid" style="background: white;">';
                    $scope.html = $scope.html+'<div class="row fieldset_r" class="form-control"">';
                        $scope.htmlTema1 +='<input type="hidden" name="tema_idTema"  id="tema_idTema" value="'+idTema+'" >';
                        $scope.html = $scope.html+'<div>'; 
                            $scope.html = $scope.html+'<div class="col-md-1">';                    
                                $scope.html = $scope.html+'<img src="'+$scope.imagenPerfil+'" width="60" height="60" class="img-circle">';
                            $scope.html = $scope.html+'</div>'; 
                            $scope.html = $scope.html+'<div class="col-md-10">';
                                $scope.html = $scope.html+'<div class="descripcion_f_list">'+datoRespuesta+'</div>';
                                $scope.html = $scope.html+'<div class="por_f_list" style="font-size: 14px !important;">'+nombreRespuesta+'</div>';
                            $scope.html = $scope.html+'</div>';

                            $scope.html = $scope.html+'<div class="col-md-1">';
                                $scope.html = $scope.html+'<a class="btn btn-info ng-binding" data-toggle="modal" data-toggle="modal" data-target="#responderTema" onclick="respuestaGen('+celda['rtmidrespuesta']+');">Responder</a>';
                                $scope.html = $scope.html+'<span>&nbsp;&nbsp;&nbsp;</span>';
                                $scope.html = $scope.html+'<span style="color:#535E65;">'
                                $scope.html = $scope.html+'<span style="font-size: 14px !important;">';
                                    /* boton like comentario*/
                                    $scope.html = $scope.html+'</button>';
                                $scope.html = $scope.html+'</span>';
                                $scope.html = $scope.html+'</span>';
                            $scope.html = $scope.html+'</div>';    




                        $scope.html = $scope.html+'</div>';
                    //$scope.html = $scope.html+'</div>';  


                    $scope.html = $scope.html+'<div class="col-md-12" style="padding: 0px 0px 10px 0px; margin-bottom: 10px; text-align: right;">';
                        $scope.html = $scope.html+'<div>';
                            
                    $scope.html = $scope.html+'</div>';
                    $scope.html = $scope.html+'</div>';


                    /////////////////////////////// respuesta de la respuesta
                    angular.forEach($scope.datadocumentos,function(celda2, fila2){
                        idRespuesta2          = celda2['rtmidrespuesta'];
                        idTema2               = celda2['rtmidtema'];
                        nombreRespuesta2      = celda2['rtmnombrerespuesta'];
                        datoRespuesta2        = celda2['rtmrespuesta'];
                        fechaRespuesta2       = celda2['rtmregistro'];
                        likesRespuesta2       = celda2['rtmnro_likes'];
                        respuestaHijo2        = celda2['rtmid_respuesta_hijo'];
                        respuestaImagenPerfil2= celda2['imagenperfilrespuesta'];
                        oidR                  = celda2['rtmusuario'];

                        if (respuestaImagenPerfil2 == '' || respuestaImagenPerfil2 == 'undefined' || respuestaImagenPerfil2 == undefined || respuestaImagenPerfil2 == 'null' || respuestaImagenPerfil2 == null){
                            $scope.imagenPerfil2 = "../GestionDocumental/foro/imagenes/silueta_1.png";
                        }else{
                            $scope.imagenPerfil2 = respuestaImagenPerfil2;
                        }
                        if(idRespuesta == respuestaHijo2){                                       
                            $scope.html = $scope.html+'<div class="col-md-1"></div><div class="col-md-11" style="background:#80D5D8;font-size:15px;position: relative;top: 5px;left: 0%;">' ;
                            $scope.html = $scope.html+'<div class="row" style="position: relative; top:5px; text-align:left !important; border-bottom:solid 2px #222831">';
                            $scope.html = $scope.html+'<div class="panel panel-default" style="border: none !important; padding: 2px 30px 0px 30px !important; border-color: none !important">' ;
                            $scope.html = $scope.html+'<div class="col-md-1" style="margin-top: 5px; ">';
                            $scope.html = $scope.html+'<img src="'+$scope.imagenPerfil2+'" width="40" height="40" class="img-circle">';
                            $scope.html = $scope.html+'</div>'; 
                            $scope.html = $scope.html+'<div class="col-md-8" style="margin-top: 5px; margin-bottom: 5px; border-top: solid 2px  #222831 !important;">' ;    
                            $scope.html = $scope.html+'<div class="descripcion_f_list">'+datoRespuesta2+'</div>' ;  
                            $scope.html = $scope.html+'<div class="por_f_list" style="font-size: 14px !important;">'+nombreRespuesta2+'</div>' ;    
                            $scope.html = $scope.html+'</div>';
                            $scope.html = $scope.html+'</div>';                                    
                            $scope.html = $scope.html+'</div>';
                            $scope.html = $scope.html+'</div>';
                        }   
                    });
                    $scope.html = $scope.html+'</div>';                 
                    $scope.html = $scope.html+'</div>';
                    $scope.html = $scope.html+'</div>';
                    $scope.html = $scope.html+'</div>';
                }
                // ./respuestas
            });
            $scope.$apply();
            $scope.get_renderizarRespuestas($scope.html);
            var respuesta_data = '#respuesta_data'+idTema;
            $(respuesta_data).html($scope.html);
        });      
    };


    /** RECUPERAR IMAGEN **/
    $scope.$on('api:ready',function()
    {
        $scope.recuperarDatosRegistro();
    });   
    /** Recuperar datos de la IMAGEN DE USUARIO QUE INICIA SESION**/
   $scope.recuperarDatosRegistro = function(){
        var sIdRegistro   = sessionService.get('IDCIUDADANO');
        var datosCiudadano= new rcNatural();
        datosCiudadano.oid= sIdRegistro;
        datosCiudadano.datosCiudadanoNatural(function(resultado)
        { 
            response = JSON.parse(resultado);
            $scope.imagenCiudadano = response[0].dtspsl_URL;
            if(response.length !== 0){
                if (response[0].dtspsl_URL !== '') {
                    $scope.imgPrincipal = response[0].dtspsl_URL;
                    $scope.imagen = CONFIG.APIURL + "/files/RC_CLI/" + sIdRegistro +"/" +  $scope.imagenCiudadano + "?app_name=todoangular";  
                }
                else
                {
                    if (response[0].dtspsl_URL == '' || response[0].dtspsl_URL == 'undefined' || response[0].dtspsl_URL == undefined){
                        $scope.imagen = "../GestionDocumental/foro/imagenes/silueta_1.png";
                    }
                }
            }  
        });
    }; 

    /** Participacion CIUDADANA PRIMERA PANTALLA **/
    /*CUENTA GRUPOS POR TEMA PRINCIPAL*/
    $scope.cuentaGrupos = function(id){
        setTimeout(function(){
            var resNroGrupos = new reglasnegocio();
            resNroGrupos.identificador = 'RCCIUDADANO_CUENTAGRUPOS';
            resNroGrupos.parametros = '{"id":' + id + '}';      
            resNroGrupos.llamarregla(function(response){         
                $scope.grupos = JSON.parse(response);

                if($scope.grupos[0].dms_contar_grupos_principal == undefined || $scope.grupos[0].dms_contar_grupos_principal=='undefined' || $scope.grupos[0].dms_contar_grupos_principal==''){
                    $rootScope.nrogrupos = '0';
                }else{
                    $rootScope.nrogrupos = $scope.grupos[0].dms_contar_grupos_principal;
                }
            for (var i = 0; i < $scope.datadocumentos.length; i++) {
                if($scope.datadocumentos[i].xpri_id == id){
                    $scope.datadocumentos[i].xgrupo = $rootScope.nrogrupos;
                }
            }    
            });
        },100);         
    };
/*CUENTA VISITAS PRINCIPAL*/
    $scope.nrovisitasPrincipal = function(dato){
        var resvisPrin = new reglasnegocio();
        resvisPrin.identificador = 'RCCIUDADANO_VISITAPRINCIP';
        resvisPrin.parametros = '{"idpri":' + dato + '}';      
        resvisPrin.llamarregla(function(response){         
            $scope.visprin = JSON.parse(response);        
            //console.log('CONTADOR VISITAS',$scope.visprin[0].dms_contar_visitas_principal);

        });
    };
    /*CUENTA VISITAS POR GRUPO */
    $scope.nrovisitasGrupo = function(dato){
        var resvisGrupos = new reglasnegocio();
        resvisGrupos.identificador = 'RCCIUDADANO_VISITASGRUPO';
        resvisGrupos.parametros = '{"idgrupo":' + dato + '}';      
        resvisGrupos.llamarregla(function(response){         
            $scope.visgrupos = JSON.parse(response);
            if($scope.visgrupos[0].dms_contar_visitas_grupo == undefined || $scope.visgrupos[0].dms_contar_visitas_grupo == 'undefined'){
                $rootScope.visitas = '0';
            }
            else{
                $rootScope.visitas = $scope.visgrupos[0].dms_contar_visitas_grupo;
            }   
        });
    };

    /*CUENTA NRO TEMAS POR GRUPO */
    $scope.carganroTemas = function(dato){
        var restemasGrupos = new reglasnegocio();
        restemasGrupos.identificador = 'RCCIUDADANO_TEMASGRUPO';
        restemasGrupos.parametros = '{"idgru":' + dato + '}';      
        restemasGrupos.llamarregla(function(response){         
            $scope.temasgrupo = JSON.parse(response);
            if($scope.temasgrupo[0].nrotemas == undefined || $scope.temasgrupo[0].nrotemas == 'undefined'){
                $rootScope.nrotemasGrupo = '0';
            }
            else{
                $rootScope.nrotemasGrupo = $scope.temasgrupo[0].nrotemas;
            } 
        });
    };

    /** NUEVO TEMA **/
    /** FORMULARIOS TEMAS **/ 
    
    /************s4*************/
    $scope.meGustaTema = function(idTemaPrincipal_1){
        var resContarMeGustaTema = new reglasnegocio();
        resContarMeGustaTema.identificador = 'RCCIUDADANO_99';
        resContarMeGustaTema.parametros = '{"idtema":"' + idTemaPrincipal_1 + '"}';
        resContarMeGustaTema.llamarregla(function(response)
        {
            response = JSON.parse(response);
            $scope.nroMeGusta = response[0]['dms_megusta_tema'];
            $scope.$apply();
            $scope.bloquear = true;
        });
    };

    $scope.cuentaLikesTema = function(idTema){
        var nrolikes = new reglasnegocio();          
        nrolikes.identificador = 'RCCIUDADANO_CUENTALIKES';
        nrolikes.parametros = '{"idtema":"' + idTema + '"}';
        nrolikes.llamarregla(function(response)
        {
            response = JSON.parse(response);
            $scope.likesTema = response[0]['dms_contar_likes_tema'];
            $scope.$apply();
        });
    };
    /***************s5****************/
    $scope.adicionarCalificacion = function(nroEstrellas)    {
        var resadicionarCalificacion = new reglasnegocio();
         resadicionarCalificacion.identificador = 'RCCIUDADANO_100';
         resadicionarCalificacion.parametros ='{"nrocalificacion":' + nroEstrellas + ',"idtemaprincipal":' + idTema + '}';
         resadicionarCalificacion.llamarregla(function(response){
        });
    };
    /*******************************/
    /*------- ------- ------- ---------------------- ------- ------- -------*/
    /*------- ------- ------- FORMULARIOS RESPUESTAS ------- ------- -------*/
    /*------- ------- ------- ---------------------- ------- ------- -------*/
    /********s6********************/
    $scope.temasporGrupo = function(dato){
        var t = new reglasnegocio();
        t.identificador = 'RCCIUDADANO_289';
        t.parametros ='{"idtema":"'+dato+'"}';
        t.llamarregla(function(response)
        {
            response = JSON.parse(response);
            var u = response[0]['dms_contar_respuestas'];
            console.log("VALOR", u);
            for (var i = 0; i < $scope.datadocumentos.length; i++) {
                if ($scope.datadocumentos[i].grpid == dato) {
                    $scope.datadocumentos[i].uuuu = u;
                };
            };
            $scope.nroRespuestas  = response[0]['dms_contar_respuestas'];
            $('#btn').attr('value', u);
        });
    }   

    //$scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";

    $scope.adicionarTema = function(datosRol){
        //console.log('datosRol datos nuevo tema----->',datosRol);
        var id_grupo = document.getElementById("tema_idgrupo").value;
        //var id_grupo = 16;
        var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_98';
        var US = sessionService.get('IDUSUARIO');
        $scope.recuperarDatosRegistro();
        resRoles.parametros = '{"ftm_tema":"' + datosRol.ftmtema + '","ftm_autor":"'+ nombreCompletoSession + '","ftm_nro_respuestas":0,"ftm_nro_visitas":0,"ftm_estado":"ACTIVO","ftm_usuario":"' + US + '","ftm_descripcion_tema":"' + datosRol.ftmdescripciontema + '","imagen_perfil_tema":"' + $scope.imagen + '","nro_likes_tema":0,"ftm_id_grupo":' + id_grupo + '}';
        resRoles.llamarregla(function(data)
        {    
        });
        $scope.mostrarTemas(ftmIdTema, ftmTema, ftmAutor, ftmNroRespuestas, ftmNroVisitas, ftmRegistro, ftmModificacion, ftmEstado, ftmUsuario, ftmDescripcionTema, imagenPerfilTema, nroLikesTema, ftmIdGrupo);
        $scope.variabletema = "modal";
    };





    $scope.adicionarRespuesta = function(datosRespuesta){
        //console.log('datosRespuesta datos nuevo tema----->',datosRespuesta);
        //console.log('datosRespuesta.rtmrespuesta',datosRespuesta.rtmrespuesta);
        var resp = document.getElementById('rtmrespuesta').value; 
        //var respuesta_m = resp.replace(/<br\s*\/?>/mg,"\n");
        //val = val.replace(/<br\s*\/?>/mg,"\n");
        var respuesta_m = resp.replace(/\r?\n/g, "--");
        var rol = new reglasnegocio();
        //rol.identificador = 'RCCIUDADANO_103';
        rol.identificador = 'RCCIUDADANO_287';
        var oid = sessionService.get('IDUSUARIO');
        $scope.recuperarDatosRegistro();
        var varidresphijo = document.getElementById("rtmid_respuesta_hijo").value;
        if($scope.idTema == 'undefined'|| $scope.idTema == undefined){
            //$scope.idTema = varidresphijo;
            //console.log('$scope.idTema------------------------------>',$scope.idTema);
            $scope.idTema = varidresphijo;
            //console.log('TEMA PADRE PADRE');
            rol.parametros ='{"rtm_id_tema":"'+ $scope.idTema +'","rtm_nombre_respuesta":"'+ nombreCompletoSession +'","rtm_respuesta":"'+ respuesta_m +'","rtm_estado":"ACTIVO","rtm_usuario":"'+ oid +'","rtm_nro_likes":0,"rtm_id_respuesta_hijo":0, "imagen_perfil_respuesta":"'+ $scope.imagen +'"}';
            rol.llamarregla(function(data)
            {
                //data = JSON.parse(data);
                //console.log('cerrar modal');
                
            });
            //$scope.renderRespuestaTema(varidresphijo, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
            $scope.getCaptchasX();
            $scope.variablerespuesta = "modal";
        }else{
                if(varidresphijo == $scope.idTema){
                //console.log('TEMA PADRE');
                rol.parametros ='{"rtm_id_tema":"'+ $scope.idTema +'","rtm_nombre_respuesta":"'+ nombreCompletoSession +'","rtm_respuesta":"'+ respuesta_m +'","rtm_estado":"ACTIVO","rtm_usuario":"'+ oid +'","rtm_nro_likes":0,"rtm_id_respuesta_hijo":0, "imagen_perfil_respuesta":"'+ $scope.imagen +'"}';
                rol.llamarregla(function(data)
                {
                    //data = JSON.parse(data);
                   
                });

                //$scope.renderRespuestaTema(varidresphijo, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
                $scope.getCaptchasX();
                $scope.variablerespuesta = "modal";

                }else{
                    //console.log('TEMA HIJO');
                    rol.parametros ='{"rtm_id_tema":"'+ $scope.idTema +'","rtm_nombre_respuesta":"'+ nombreCompletoSession +'","rtm_respuesta":"'+ respuesta_m +'","rtm_estado":"ACTIVO","rtm_usuario":"'+ oid +'","rtm_nro_likes":0,"rtm_id_respuesta_hijo":"'+ varidresphijo +'", "imagen_perfil_respuesta":"'+ $scope.imagen +'"}';
                    rol.llamarregla(function(data)
                    {
                        //data = JSON.parse(data);
                     
                    });
                    
                    //$scope.renderRespuestaTema(varidresphijo, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
                    $scope.getCaptchasX();
                    $scope.variablerespuesta = "modal";
                    //$scope.renderRespuestaTema(idTema, nombreTema, descripcionTema, imagenPerfilTema, nroTemaLike);
                }
        }
        $scope.variablerespuesta = "modal";
    };

   
    $scope.meGustaRespuesta = function(idResp, likesRespuesta){
        var idRes   = idResp;
        var likesRes= likesRespuesta.value; 
        if(likesRes == 0)
        {
            var resValue = new reglasnegocio();
            resValue.identificador= 'RCCIUDADANO_285';
            resValue.parametros   = '{"idtemaprincipal":"'+ idRes +'"}';

            resValue.llamarregla(function(response)
            {
                response = JSON.parse(response);
                $scope.nroMeGusta = response[0]['dms_value'];
                $scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);    
            });
            var resContarMeGustaResp = new reglasnegocio();
            resContarMeGustaResp.identificador = 'RCCIUDADANO_104';
            resContarMeGustaResp.parametros ='{"idrespuesta":"'+ idResp +'"}';
            
            resContarMeGustaResp.llamarregla(function(response)
            {
                response = JSON.parse(response);
                $scope.nroMeGusta = response[0]['dms_megusta_respuesta'];
                $scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
            });
        }
        else
        {
            var resValue = new reglasnegocio();
            resValue.identificador= 'RCCIUDADANO_286';
            resValue.parametros   = '{"idtemaprincipal":"'+ idRes +'"}';

            resValue.llamarregla(function(response)
            {
                response = JSON.parse(response);
                $scope.nroMeGusta = response[0]['dms_value'];
                $scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);    
            });
            var resContarMeGustaRespt = new reglasnegocio();
            resContarMeGustaRespt.identificador = 'RCCIUDADANO_282';
            resContarMeGustaRespt.parametros ='{"idrespuesta":"'+ idResp +'"}';
            resContarMeGustaRespt.llamarregla(function(response)
            {
                response = JSON.parse(response);
                $scope.nroMeGusta = response[0]['dms_megusta_respuesta'];
                $scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
            });
        }
    };
    
    /*------- ------- ------- --------------------- ------- ------- -------*/
    /*------- ------- ------- FUNCIONES PRINCIPALES ------- ------- -------*/
    /*------- ------- ------- --------------------- ------- ------- -------*/
    $scope.$on('api:ready',function()
    {
        $scope.renderGrupos();
    });

    $scope.limpiarRespuesta = function()
    {
        document.getElementById("ftmtema").value = '';
        document.getElementById("ftmdescripciontema").value = '';
        document.getElementById("resultadoC").value = '';
        //$scope.only=false;
        //$scope.datosRespuesta = '';
    };

    $scope.get_renderizarGrupos = function(x) //principal
    {
        return $sce.trustAsHtml(x);
    };  

    $scope.get_renderizarTemas = function(x)  //grupos
    {
        return $sce.trustAsHtml(x);
    };

    $scope.get_renderizarTemas1 = function(x) //temas
    {
        return $sce.trustAsHtml(x);

    };
    $scope.get_renderizarRespuestas = function(x)
    {
        return $sce.trustAsHtml(x);
    };  


    $scope.get_renderizarView = function(x)
    {
        return $sce.trustAsHtml(x);
    };


    

    $scope.volverGrupo = function()
    {
        $scope.gruposTema = true;
        $scope.listadoTemas = null;
        $scope.respuestasTema = null;
        //$scope.getDocumento(idDeGrupo, nombreDeGrupo);
    }

    $scope.volverTemasUpdate = function()
    {
        
        $scope.getDocumento(idDeGrupo, nombreDeGrupo);
        //console.log(idDeGrupo,nombreDeGrupo);
        $scope.listadoTemas = true;
        $scope.gruposTema = null;
        
        $scope.respuestasTema = null;
    }   

    $scope.volverTemas = function()
    {
        $scope.gruposTema = null;
        $scope.listadoTemas = true;
        $scope.respuestasTema = null;
    }

    // generador de capcha
    $scope.btnCapcha  = true;
    $scope.ErrorCapcha= '';
    $scope.lmpCaptcha=function(){
        $scope.ErrorCapcha='';
    }

    $scope.getCaptchasX=function(){       
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1); 
        $scope.resultadoC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado)
        {
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
              console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });  
    };
    
   
     // generador de capcha
    $scope.getCaptchasXX=function(){
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1); 
        $scope.resultadoCC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado)
        {
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
              console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    $scope.VerificarCapchaa = function(responce){  
        //console.log('responce',responce);
        var captch  = $("#resultadoCC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado)
        {
            json = JSON.parse(resultado);
            if(json.success[0] == undefined)
            {
                $scope.getCaptchasXX();
                $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
            }
            else
            {
                $scope.adicionarRespuesta(responce);
                //console.log('RESPONCE---->',responce);
            }
        });
        $scope.inicioCapcha();
    };

    $scope.VerificarCapchaTema = function(responce){  
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado)
        {
            json = JSON.parse(resultado);
            if(json.success[0] == undefined)
            {
                $scope.getCaptchasXX();
                $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
            }
            else
            {
                $scope.adicionarTema(responce);
            }
        });
        //$scope.inicioCapcha();
    };

    $scope.VerificarCapcha = function(response){  
        var captch  = $("#resultadoCC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado)
        {
            json = JSON.parse(resultado);
            if(json.success[0] == undefined)
            {
                $scope.getCaptchasXX();
                $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
            }
            else
            {
                $scope.adicionarTema(response);
            }
        });
        $scope.inicioCapcha();
    };

    var tiemporespuesta = null;
    function verificarKeyPress(captch){
        console.log('captch===============>',captch);
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if(nroregsitros == 0){
                $scope.btnCambiar = true;
                $scope.btnCondicion = true;
                $scope.ErrorCapchasXX = "Error en el captcha intentar de nuevo por favor";
                $scope.SuccesCapchasxx="";
                $scope.$apply();
            } else {
                $scope.btnCambiar = false;
                $scope.btnCondicion = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx="Capcha correcto.";
                $scope.$apply();
            }
        });
    }
    $scope.ErrorCapcha='';
    $scope.VerificarCapchaT = function() {  
        console.log('INGRESO...................');
        var captch  = $("#resultadoC").val();
        console.log('')
        if(captch.length == 0)
            $scope.ErrorCapchasX = "";
        if(captch.length > 4){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };
    // ******FIN DE CAPCHA****************

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};