app.controller('foroController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet,$sce) {
	$scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
	var fecha= new Date();
	var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
	var size = 10;
	var idDeGrupo = "";
	var nombreDeGrupo = "";
	var idRespuesta = "";
	var idTema = "";
	var nombreRespuesta = "";
	var datoRespuesta = "";
	var fechaRespuesta = "";
	var likesRespuesta = "";
	var respuestaHijo = ""; 

	var idRespuesta2 = "";
	var idTema2 = "";
	var nombreRespuesta2 = "";
	var datoRespuesta2 = "";
	var fechaRespuesta2 = "";
	var likesRespuesta2 = "";
	var respuestaHijo2 = ""; 
	var idTemaPrincipal_1=""; 
	var nombreTema_1 = ""; 
	var descripcionTema_1 = ""; 
	var imagenPerfilTema_1 = ""; 
	var nroTemaLike_1="";

	$scope.message = "";
	$scope.htmlGrupo = "";
	$scope.htmlTema = "";
	$scope.html = "";
	$scope.imagenTema="";

	var nombreCompletoSession = sessionService.get('US_NOMBRE')+" "+sessionService.get('US_PATERNO')+" "+sessionService.get('US_MATERNO'); 
	var nombreImagenPerfil = sessionService.get('NOMBRE_IMAGEN');
	var direccionImagenPerfil = sessionService.get('URL_IMAGEN_COMPLETO')+"/";
	var completoDireccionImagen = "";
	var completoDireccionImagen2 = "";
	
	$scope.renderGrupos = function(){
		$scope.gruposTema = true;
		$scope.listadoTemas = null;
		$scope.respuestasTema = null;
		$scope.htmlGrupo = "";
		var resDocumentaciones = new reglasnegocio();
		resDocumentaciones.identificador = 'RCCIUDADANO_96';
		resDocumentaciones.parametros ='{}';
		resDocumentaciones.llamarregla(function(response){	       
		$scope.datadocumentos = JSON.parse(response);	
		 //var obj = $scope.datadocumentos; 
			angular.forEach($scope.datadocumentos,function(celda, fila){	
				grpId = celda['grpid'];
				grpNombreGrupo = celda['grpnombregrupo'];
				grpImagenGrupo = celda['grpimagengrupo'];
				grpResgistrado = celda['grpresgistrado'];
				grpModificado = celda['grpmodificado'];
				grpUsuario = celda['grpusuario'];
				grpEstado = celda['grpestado'];
				grpNroVisto = celda['grpnrovisto'];
				grpOrden = celda['grporden'];
				grpContTemas = celda['conttemasdato'];

				$scope.htmlGrupo = $scope.htmlGrupo+'<div class="col-sm-4">';
					$scope.htmlGrupo = $scope.htmlGrupo+'<div class="row">';
						$scope.htmlGrupo = $scope.htmlGrupo+'<div class="col-md-12">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<div class="foro_textos">';
								$scope.htmlGrupo = $scope.htmlGrupo+'<div class="foro_titulo">'+grpNombreGrupo+'</div><div class="foro_descripcion">'+grpImagenGrupo+'</div>';
							$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
						$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
					$scope.htmlGrupo = $scope.htmlGrupo+'</div>';

					$scope.htmlGrupo = $scope.htmlGrupo+'<div class="row">';
						$scope.htmlGrupo = $scope.htmlGrupo+'<div class="col-md-12">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<div style="background:#6F7072; margin-bottom: 0px;position: relative;top: -12px;">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<a class="col-md-4" style="text-align: center;background:#6F7072; color: white !important">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<i class="fa fa-eye" style="font-size: 35px; padding: 3px 0px 10px 13px"></i><p style="font-size: 15px;">Visitas '+grpNroVisto+' </p>';
							$scope.htmlGrupo = $scope.htmlGrupo+'</a>';
							$scope.htmlGrupo = $scope.htmlGrupo+'<a class="col-md-4" style="text-align: center;background:#6F7072; color: white !important">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<i class="fa fa-comment" style="font-size: 35px; padding: 3px 0px 10px 0px"></i><p style="font-size: 15px;">Temas '+grpContTemas+'</p>';
							$scope.htmlGrupo = $scope.htmlGrupo+'</a>';
							$scope.htmlGrupo = $scope.htmlGrupo+'<a class="col-md-4" style="text-align: center;background:#6F7072; color: #FFCB0D !important" onclick="cargarTema('+grpId+','+"'"+grpNombreGrupo+"'"+')");">';
							$scope.htmlGrupo = $scope.htmlGrupo+'<i class="fa fa-users" style="font-size: 35px; padding: 3px 0px 10px 0px"></i><p style="font-size: 15px;">Participa</p>';
							$scope.htmlGrupo = $scope.htmlGrupo+'</a>';
							$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
						$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
					$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
				$scope.htmlGrupo = $scope.htmlGrupo+'</div>';
			});
			$scope.get_renderizarGrupos($scope.htmlGrupo);     
		}); 
	};
	/************/
	
	/*------- ------- ------- ----------------- ------- ------- -------*/
	/*------- ------- ------- FORMULARIOS TEMAS ------- ------- -------*/
	/*------- ------- ------- ----------------- ------- ------- -------*/
	$scope.getDocumento = function(idGrupo, nombreGrupo){        
		
		$scope.gruposTema = null;
		$scope.listadoTemas = true;
		$scope.respuestasTema = null;

		$scope.nombreGrupoTema = nombreGrupo;

		$scope.htmlTema = "";

		idDeGrupo = idGrupo;
		nombreDeGrupo = nombreGrupo;
		/**********s2************/
       	 var resRoles = new reglasnegocio();
    	 resRoles.identificador = 'RCCIUDADANO_97';
         resRoles.parametros = '{"idgrupo":' + idGrupo + '}';
         resRoles.llamarregla(function(response){
         response = JSON.parse(response);
			$scope.nroTemas= response.length;
			$scope.datadocumentos = response;	           
			angular.forEach($scope.datadocumentos,function(celda, fila){
				
				ftmIdTema = celda['ftmidtema'];
				ftmTema = celda['ftmtema'];
				ftmAutor = celda['ftmautor'];
				ftmNroRespuestas = celda['ftmnrorespuestas'];
				ftmNroVisitas = celda['ftmnrovisitas'];
				ftmRegistro = celda['ftmregistro'];
				ftmModificacion = celda['ftmmodificacion'];
				ftmEstado = celda['ftmestado'];
				ftmUsuario = celda['ftmusuario'];
				ftmDescripcionTema = celda['ftmdescripciontema'];
				imagenPerfilTema = celda['imagenperfiltema'];
				nroLikesTema = celda['nrolikestema'];
				ftmIdGrupo = celda['ftmidgrupo'];
				ftmPromedioCalificacion = celda['promediocalificacion'];
				

				$scope.htmlTema = $scope.htmlTema+'<div class="container-fluid">';
					$scope.htmlTema = $scope.htmlTema+'<div class="row" style="margin-bottom: 20px; background:white; border-bottom: solid 3px #C5C5C5;">';
						$scope.htmlTema = $scope.htmlTema+'<div class="col-md-2" style="background:white;">';
							$scope.htmlTema = $scope.htmlTema+'<div class="imagen_foro_list">';
								if(imagenPerfilTema == "" || imagenPerfilTema == null)
									{
										completoDireccionImagen = "../GestionDocumental/foro/imagenes/silueta_1.png";
									}
									else
									{
										//completoDireccionImagen = direccionImagenPerfil+imagenPerfilTema;
										completoDireccionImagen = "../GestionDocumental/foro/imagenes/silueta_1.png";
			
									}
								$scope.htmlTema = $scope.htmlTema+'<img src="'+completoDireccionImagen+'" width="100" height="100" class="img-circle">';
							$scope.htmlTema = $scope.htmlTema+'</div>';
						$scope.htmlTema = $scope.htmlTema+'</div>';
						$scope.htmlTema = $scope.htmlTema+'<div class="col-md-6" style="background:white;">';
							$scope.htmlTema = $scope.htmlTema+'<div class="imagen_foro_list">';
								$scope.htmlTema = $scope.htmlTema+'<div class="titulo_f_list">'+ftmTema+'</div>';
								$scope.htmlTema = $scope.htmlTema+'<div class="por_f_list">'+ftmAutor+'</div>';
								$scope.htmlTema = $scope.htmlTema+'<div class="descripcion_f_list">'+ftmDescripcionTema+'</div>';
							$scope.htmlTema = $scope.htmlTema+'</div>';
						$scope.htmlTema = $scope.htmlTema+'</div>';
						// cont. 4
						$scope.htmlTema = $scope.htmlTema+'<div class="col-md-4" style="background: #C5C5C5;font-size: 15px;">';
							// col 6
							$scope.htmlTema = $scope.htmlTema+'<div class="col-md-6" style="text-align:center;color:#535E65; font-size: 15px;">';
								// row 1
								$scope.htmlTema = $scope.htmlTema+'<div class="row">';
									$scope.htmlTema = $scope.htmlTema+'<div class="col-md-12">';					
										$scope.htmlTema = $scope.htmlTema+'<p style="font-size: 15px !important;">Calificación:</p>';switch(ftmPromedioCalificacion)
										{
											case 1:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star"> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i>';break;
											case 2:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star"> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i>';break;
											case 3:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i>';break;
											case 4:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>';break;
											case 5:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>';break;
											default:$scope.htmlTema = $scope.htmlTema+'<i class="fa fa-star-o"><i class="fa fa-star-o"></i><i class="fa fa-star-o"> </i><i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i>';break;
										}
										$scope.htmlTema = $scope.htmlTema+'</i><span> '+ftmPromedioCalificacion+' estrellas</span><center>';
									$scope.htmlTema = $scope.htmlTema+'</div>';
								$scope.htmlTema = $scope.htmlTema+'</div>';
								// ./row 1 
								// row 2
								$scope.htmlTema = $scope.htmlTema+'<div class="row">';
									$scope.htmlTema = $scope.htmlTema+'<div class="col-md-12">';
										$scope.htmlTema = $scope.htmlTema+'<div class="btn_participa" style="top: 14px; z-index: 9999;">';
											$scope.htmlTema = $scope.htmlTema+'<a class="btn btn-primary" onclick="cargarRespuestas('+ftmIdTema +','+
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
												"'"+nroLikesTema+"'"+','+
											ftmIdGrupo+'); ">Participa </a>';
										$scope.htmlTema = $scope.htmlTema+'</div>';
									$scope.htmlTema = $scope.htmlTema+'</div>';
								$scope.htmlTema = $scope.htmlTema+'</div>';
								// ./row 2
							$scope.htmlTema = $scope.htmlTema+'</div>';
							// ./col 6
							$scope.htmlTema = $scope.htmlTema+'<div class="col-md-6" style="color:#535E65; padding: 40px 0px 0px 0px; ">';
								$scope.htmlTema = $scope.htmlTema+'<p style="font-size: 15px !important;"><i class="fa fa-heart" style="font-size:22px;"></i><span style="padding: 0px 10px;">'+nroLikesTema+' me gusta</span></p>';
								$scope.htmlTema = $scope.htmlTema+'<p style="font-size: 15px !important;"><i class="fa fa-rocket" style="font-size:22px;"></i><span style="padding: 0px 10px;">'+ftmNroVisitas+' veces</span></p>';
								$scope.htmlTema = $scope.htmlTema+'<p style="font-size: 15px !important;"><i class="fa fa-comments" style="font-size:22px;"></i><span style="padding: 0px 10px;">'+ftmNroRespuestas+' respuestas</span></p>';
							$scope.htmlTema = $scope.htmlTema+'</div>';
						$scope.htmlTema = $scope.htmlTema+'</div>';
						// cont. 4
					$scope.htmlTema = $scope.htmlTema+'</div>';
				$scope.htmlTema = $scope.htmlTema+'</div>';
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			});
			$scope.get_renderizarTemas($scope.htmlTema);
		}); 

		//$.unblockUI();                 
	};    
	/****************s3******************/
	$scope.adicionarTema = function(datosRol){
		var resRoles = new reglasnegocio();
		resRoles.identificador = 'RCCIUDADANO_98';
		var US = sessionService.get('IDUSUARIO');
		resRoles.parametros = '{"ftm_tema":"' + datosRol.ftmtema + '","ftm_autor":"'+ nombreCompletoSession + '","ftm_nro_respuestas":0,"ftm_nro_visitas":0,"ftm_estado":"ACTIVO","ftm_usuario":"' + US + '","ftm_descripcion_tema":"' + datosRol.ftmdescripciontema + '","imagen_perfil_tema":"' + nombreImagenPerfil + '","nro_likes_tema":0,"ftm_id_grupo":' + idDeGrupo + '}';
		resRoles.llamarregla(function(data){
			data = JSON.parse(data);
				$scope.getDocumento(idDeGrupo, nombreDeGrupo);
				$('#registrarTema').modal('hide');
			})
		};
	/************s4*************/
	$scope.meGustaTema = function(){
		var resContarMeGustaTema = new reglasnegocio();
		resContarMeGustaTema.identificador = 'RCCIUDADANO_99';
		resContarMeGustaTema.parametros = '{"idtema":"' + idTemaPrincipal_1 + '"}';
		resContarMeGustaTema.llamarregla(function(response){
			response = JSON.parse(response);
			$scope.nroMeGusta = response[0]['dms_megusta_tema'];
			$scope.nroLikesTema = response[0]['dms_megusta_tema'];
		});
	};
	/***************s5****************/
    $scope.adicionarCalificacion = function(nroEstrellas){
		var resadicionarCalificacion = new reglasnegocio();
    	 resadicionarCalificacion.identificador = 'RCCIUDADANO_100';
    	 resadicionarCalificacion.parametros ='{"nrocalificacion":' + nroEstrellas + ',"idtemaprincipal":' + idTema + '}';
         resadicionarCalificacion.llamarregla(function(response){
         //response = JSON.parse(response);
		});
	}
 	/*******************************/
	/*------- ------- ------- ---------------------- ------- ------- -------*/
	/*------- ------- ------- FORMULARIOS RESPUESTAS ------- ------- -------*/
	/*------- ------- ------- ---------------------- ------- ------- -------*/
	/********s6**********/
    $scope.mostrarRespuesta = function (ftmIdTema, ftmTema, ftmAutor, ftmNroRespuestas, ftmNroVisitas, ftmRegistro, ftmModificacion, ftmEstado, ftmUsuario, ftmDescripcionTema, imagenPerfilTema, nroLikesTema, ftmIdGrupo ){
		$scope.listadoTemas = null;
		$scope.respuestasTema = true;
		$scope.tituloTema = ftmTema;
		var resContarVisitas = new reglasnegocio();
		resContarVisitas.identificador = 'RCCIUDADANO_101';
		resContarVisitas.parametros ='{"idtema":"' + ftmIdTema + '"}';
		resContarVisitas.llamarregla(function(response){
		response = JSON.parse(response);
			$scope.nroVisto = response[0]['dms_contar_visitas'];
			$scope.nroRespuestas = ftmNroRespuestas;
			$scope.nroMeGusta = nroLikesTema;
			idTemaPrincipal_1 = ftmIdTema; 
			nombreTema_1 = ftmAutor; 
			descripcionTema_1 = ftmDescripcionTema; 
			imagenPerfilTema_1 = imagenPerfilTema; 
			nroTemaLike_1 = nroLikesTema;
			$scope.renderRespuestaTema(ftmIdTema, ftmAutor, ftmDescripcionTema, imagenPerfilTema, nroLikesTema);
		});
	}
	/******************/

	$scope.renderRespuestaTema = function(idTemaPrincipal, nombreTema, descripcionTema, imagenPerfilTema, nroTemaLike){
		//$.blockUI();
		$scope.html = "";
		
		$scope.getCaptchasXX();
		
		idTema = idTemaPrincipal;
		$scope.nombreTema = nombreTema;
		$scope.descripcionTema = descripcionTema;
		$scope.nroLikesTema = nroTemaLike;
		//$scope.imagenTema = '<img src="../GestionDocumental/foro/imagenes/'+imagenPerfilTema+'" alt="Foto perfil">';
		//$scope.imagenTema = imagenPerfilTema;

		if(imagenPerfilTema == "" || imagenPerfilTema == null || imagenPerfilTema == 'null')
		{
			$scope.imagenTema = "../GestionDocumental/foro/imagenes/silueta_1.png";
		}
		else
		{
			$scope.imagenTema = direccionImagenPerfil+imagenPerfilTema;
		}      
		/********s7*********/
		var resDocumentaciones = new reglasnegocio();
		resDocumentaciones.identificador = 'RCCIUDADANO_102';
		resDocumentaciones.parametros ='{"idtemaprincipal":"' + idTemaPrincipal + '"}';
		resDocumentaciones.llamarregla(function(response){
		response = JSON.parse(response);
			$scope.datadocumentos = response;	       
			angular.forEach($scope.datadocumentos,function(celda, fila){
				idRespuesta = celda['rtmidrespuesta'];
				idTema = celda['rtmidtema'];
				nombreRespuesta = celda['rtmnombrerespuesta'];
				datoRespuesta = celda['rtmrespuesta'];
				fechaRespuesta = celda['rtmregistro'];
				likesRespuesta = celda['rtmnro_likes'];
				respuestaHijo = celda['rtmid_respuesta_hijo'];
				respuestaImagenPerfil = celda['imagenperfilrespuesta'];
				if(respuestaHijo == 0)
				{
					// respuestas
					$scope.html = $scope.html+'<div class="container-fluid" style="background: white">';
						$scope.html = $scope.html+'<div class="row">';
							$scope.html = $scope.html+'<div class="panel panel-default" style="border: none !important;">';	

								$scope.html = $scope.html+'<div class="col-md-1">';				
								if(respuestaImagenPerfil == "" || respuestaImagenPerfil == null)
								{
									completoDireccionImagen = "../GestionDocumental/foro/imagenes/silueta_1.png";
								}
								else
								{
									//completoDireccionImagen = direccionImagenPerfil+respuestaImagenPerfil;
									completoDireccionImagen = "../GestionDocumental/foro/imagenes/silueta_1.png";
								}
								$scope.html = $scope.html+'<img src="'+completoDireccionImagen+'" width="60" height="60" class="img-circle">';
								$scope.html = $scope.html+'</div>';	
		 

								$scope.html = $scope.html+'<div class="col-md-11">';
									$scope.html = $scope.html+'<div class="descripcion_f_list">'+datoRespuesta+'</div>';
									$scope.html = $scope.html+'<div class="por_f_list" style="font-size: 14px !important;">'+nombreRespuesta+'</div>';
								$scope.html = $scope.html+'</div>';

								$scope.html = $scope.html+'<div class="col-md-12" style="padding: 0px 0px 10px 0px; margin-bottom: 10px; text-align: right;">';
									$scope.html = $scope.html+'<div>';
										$scope.html = $scope.html+'<a class="btn btn-default" data-toggle="modal" data-toggle="modal" data-target="" onclick="respuestaGen('+celda['rtmidrespuesta']+');">&nbsp;&nbsp;Responder&nbsp;&nbsp;</a>';
										$scope.html = $scope.html+'<span>&nbsp;&nbsp;&nbsp;</span>';
										$scope.html = $scope.html+'<span style="color:#535E65;">'
										$scope.html = $scope.html+'<span style="font-size: 14px !important;">';
											$scope.html = $scope.html+'<a data-toggle="modal" tooltip = "Me gusta" data-target="" onclick="meGusta('+celda['rtmidrespuesta']+');">';
											$scope.html = $scope.html+'<i class="fa fa-heart" style="font-size:16px;color:#535E65 !important;"></i>';
											$scope.html = $scope.html+'<span style="padding: 0px 10px;color: #535E65 !important;">'+likesRespuesta+' me gusta</span>';
											$scope.html = $scope.html+'</a>';
										$scope.html = $scope.html+'</span>';
										$scope.html = $scope.html+'</span>';
									$scope.html = $scope.html+'</div>';
							
									/////////////////////////////// respuesta de la respuesta
									angular.forEach($scope.datadocumentos,function(celda2, fila2){

										idRespuesta2 = celda2['rtmidrespuesta'];
										idTema2 = celda2['rtmidtema'];
										nombreRespuesta2 = celda2['rtmnombrerespuesta'];
										datoRespuesta2 = celda2['rtmrespuesta'];
										fechaRespuesta2 = celda2['rtmregistro'];
										likesRespuesta2 = celda2['rtmnro_likes'];
										respuestaHijo2 = celda2['rtmid_respuesta_hijo'];
										respuestaImagenPerfil2 = celda2['imagenperfilrespuesta'];

										if(idRespuesta == respuestaHijo2)
										{										
											$scope.html = $scope.html+'<div class="col-md-12" style="background:white;font-size:15px;position: relative;top: 5px;left: 0%;">' ;
											$scope.html = $scope.html+'<div class="row" style="position: relative; top:5px; text-align:left !important; border-bottom:solid 2px #6F7072">';
									
												$scope.html = $scope.html+'<div class="panel panel-default" style="border: none !important; padding: 2px 30px 0px 30px !important; border-color: none !important">' ;
													if(respuestaImagenPerfil2 == "" || respuestaImagenPerfil2 == null)
													{
														completoDireccionImagen2 = "../GestionDocumental/foro/imagenes/silueta_1.png";
													}
													else
													{
														//completoDireccionImagen2 = direccionImagenPerfil+respuestaImagenPerfil2;
														completoDireccionImagen2 = "../GestionDocumental/foro/imagenes/silueta_1.png";
													}
													$scope.html = $scope.html+'<div class="col-md-1" style="margin-top: 5px; ">';
													$scope.html = $scope.html+'<img src="'+completoDireccionImagen2+'" width="40" height="40" class="img-circle">';
													$scope.html = $scope.html+'</div>';	

													$scope.html = $scope.html+'<div class="col-md-8" style="margin-top: 5px; margin-bottom: 5px; border-top: solid 2px  #EBA744 !important;">' ;	
														$scope.html = $scope.html+'<div class="descripcion_f_list">'+datoRespuesta2+'</div>' ;	
														$scope.html = $scope.html+'<div class="por_f_list" style="font-size: 14px !important;">'+nombreRespuesta2+'</div>' ;	
													$scope.html = $scope.html+'</div>' ;
												$scope.html = $scope.html+'</div>' ;									

											$scope.html = $scope.html+'</div>';
											$scope.html = $scope.html+'</div>';
										}	
									});
								$scope.html = $scope.html+'</div>';					
							///////////////////////////////////////////////////////////
							$scope.html = $scope.html+'</div>';
						$scope.html = $scope.html+'</div>';
					$scope.html = $scope.html+'</div>';
				}
				// ./respuestas
			});
			$scope.get_renderizarRespuestas($scope.html);
			//$.unblockUI();        
		}); 
	};
    $scope.adicionarRespuesta = function(datosRespuesta){
    	console.log("datosRespuesta:_: ", datosRespuesta);
		var rol = new reglasnegocio();
		rol.identificador = 'RCCIUDADANO_103';
		var US = sessionService.get('IDUSUARIO');
		var varidresphijo = document.getElementById("rtmid_respuesta_hijo").value;
		rol.parametros ='{"rtm_id_tema":"'+ idTemaPrincipal_1 +'","rtm_nombre_respuesta":"'+ nombreCompletoSession +'","rtm_respuesta":"'+ datosRespuesta.rtmrespuesta +'","rtm_estado":"ACTIVO","rtm_usuario":"'+ US +'","rtm_nro_likes":0,"rtm_id_respuesta_hijo":"'+ varidresphijo +'", "imagen_perfil_respuesta":"'+ nombreImagenPerfil +'"}';
        rol.llamarregla(function(data){
		//data = JSON.parse(data);
			 $('#responderTema').modal('hide');
			$scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
			$scope.getCaptchasXX();
		});
	};

	/**********s9*********/
	$scope.meGustaRespuesta = function(idResp){
		var resContarMeGustaResp = new reglasnegocio();
		resContarMeGustaResp.identificador = 'RCCIUDADANO_104';
		resContarMeGustaResp.parametros ='{"idrespuesta":"'+ idResp +'"}';
		resContarMeGustaResp.llamarregla(function(response){
			response = JSON.parse(response);
				$scope.nroMeGusta = response[0]['dms_megusta_respuesta'];
				$scope.renderRespuestaTema(idTemaPrincipal_1, nombreTema_1, descripcionTema_1, imagenPerfilTema_1, nroTemaLike_1);
			});
	};

	/*------- ------- ------- --------------------- ------- ------- -------*/
	/*------- ------- ------- FUNCIONES PRINCIPALES ------- ------- -------*/
	/*------- ------- ------- --------------------- ------- ------- -------*/
	$scope.$on('api:ready',function(){
		//$scope.getDocumento();
		$scope.renderGrupos();
	});

	$scope.limpiarTema = function(){
		$scope.only=false;
		$scope.datosRol = '';
		$scope.getCaptchasX();
	};

	$scope.limpiarRespuesta = function(){
		document.getElementById("rtmid_respuesta_hijo").value = 0;
		$scope.only=false;
		$scope.datosRespuesta = '';

	};

	$scope.get_renderizarGrupos = function(x){
		return $sce.trustAsHtml(x);
	};	

	$scope.get_renderizarTemas = function(x){
		return $sce.trustAsHtml(x);
	};	

	$scope.get_renderizarRespuestas = function(x){
		return $sce.trustAsHtml(x);
	};	

	$scope.volverGrupo = function(){
		$scope.gruposTema = true;
		$scope.listadoTemas = null;
		$scope.respuestasTema = null;
	}	

	$scope.volverTemas = function(){
		$scope.gruposTema = null;
		$scope.listadoTemas = true;
		$scope.respuestasTema = null;
	}
	// generador de capcha
	 $scope.btnCapcha=true;
    $scope.ErrorCapcha='';
    $scope.lmpCaptcha=function()
    {
        $scope.ErrorCapcha='';
    }

 $scope.getCaptchasX=function(){       
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1); 
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
              console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
              });
         
    };
    $scope.VerificarCapcha = function(response)
    {  
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
          verCaptcha.identificador = id;
          verCaptcha.respuesta = captch;
          verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
           if(json.success[0] == undefined){
              $scope.getCaptchasX();
              $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
           }else{
            $scope.adicionarTema(response);
           }
          });
        $scope.inicioCapcha();
    };
     // generador de capcha
    $scope.getCaptchasXX=function(){
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1); 
        $scope.resultadoCC="";
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
              console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
              });
    };
    $scope.VerificarCapchaa = function(responce)
    {  
        var captch  = $("#resultadoCC").val();
            var id = numero;
              var verCaptcha = new captcha();
          verCaptcha.identificador = id;
          verCaptcha.respuesta = captch;
          verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
           if(json.success[0] == undefined){
              $scope.getCaptchasXX();
              $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
           }else{
            $scope.adicionarRespuesta(responce);
           }
          });
        $scope.inicioCapcha();
    };
    // ******FIN DE CAPCHA****************
   

	$scope.inicioDocumentos = function () {
		$scope.listadoTemas = null;
		$scope.respuestasTema = null;
		$scope.renderGrupos();  
		$scope.getCaptchasX();
	}; 


	/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

	///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
		try{ 
		    $('body').removeClass('modal-open');
		    $('.modal-backdrop').remove();
		}
		catch (e) { console.log("error", e); }
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









});