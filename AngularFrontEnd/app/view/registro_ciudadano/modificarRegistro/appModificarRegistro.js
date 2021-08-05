function modificarRegistroCiudadanoController($scope,$q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, 
    LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta) 
{
	$scope.sw = 1;
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    var sDireccion = "";
    var idUsuario = sessionService.get('IDUSUARIO');//IDCIUDADANO
    var sFono = "";
    var sCelular = "";
    var sCorreo = "";
    var sw=0;
    var sw2=1;
    var sNumeroAleatorio = ""; 
    var nombreNuevoCIAnverso = "";
    var nombreNuevoCIReverso = "";
    var nombreNuevoPoderLegal = "";
    var nombreNuevoTestimonio = "";
    var nombreNuevoNit = "";
    var nombreNuevoFundaempresa = "";
    $scope.deshabilitadoD = true;
    $scope.deshabilitadoP = true;
    $scope.deshabilitadoM = true;
    $scope.deshabilitadoMc= true;
    $scope.deshabilitadoDs= true;
    $scope.deshabilitadoZ = true;
    $scope.deshabilitadoTv= true;
    $scope.deshabilitadoNv= true; 
    $scope.mostrar = false; 
    $scope.selecteIdi="Natural";
    $scope.tipo="Natural";
    $scope.pais="1";
    $scope.isDisabled = false;
    $scope.btover_c = null;
    $scope.btover2 = null;
    $scope.btover = null;
    var archivoCI="";
    var archivoCIR="";
    var archivoPOD="";
    var archivoTES="";
    var archivoNUM="";
    var archivoFUD="";
    var archivoREG="";
    $scope.habGuardarMod = true;
    var fecha= new Date();
    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    var fechactual=fecha.getFullYear() + "-" + mes + "-" + dia + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var idCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.mostrarMapaJ = false;
    $scope.mostrarMapa = false;
    var direccionvirtual= "";
    var existe = "";
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;
    var nombreimagen= "";
    var idArchivo = "";
    var tipoPersona = "";
    var tipoDocumento = "";
    var cambiaimagen = "NO";
    $scope.img_ninguna=CONFIG.IMG_URL+"/uploads/im4g3nn0ne23133434290756564558453453460696847346.png";
    $scope.fven = true;

    $("#mensaje1").hide();
    $("#mensaje2").hide();
    $("#mensaje3").hide();
    
    $("#mensaje5").hide();
    $("#mensaje6").hide();
    $("#mensaje7").hide();
    $("#mensaje8").hide();
    $("#mensaje9").hide();
    $("#mensaje10").hide();
    $("#mensaje11").hide();
    $("#mensaje12").hide();
    $("#mensaje13").hide();
    $("#mensaje14").hide();
    $("#mensaje15").hide();
    $("#mensaje16").hide();
    $("#mensaje17").hide();
    $("#mensaje18").hide();
    $("#mensaje19").hide();
    $("#mensaje20").hide();
    $("#mensaje21").hide();
    $("#mensaje22").hide();
    $("#mensaje23").hide();
    $("#mensaje24").hide();
    $("#mensaje25").hide();


    $scope.GetValueLugarNacimiento = function () {
        $scope.registro.pais_origen = "";
        if($scope.registro.lugarNacimiento == "OTR")
        {
            $scope.otroLugar = true;
        }
        else
        {
            $scope.otroLugar = false;
        }
    };

    $scope.model = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };
    //UPLOAD  FILES
    var uploader = $scope.uploader = new FileUploader({
     url: CONFIG.UPLOAD_URL
 });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item , options) {
            return this.queue.length < 10;
        }
    });
    // END UPLOAD  
    $scope.uploader = new FileUploader({
     url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu

 });    
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length < 10;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options){};

    uploader.onAfterAddingFile = function(fileItem) {
        tipoDocumento = fileItem._file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        //var count = 0;
        var target_img, output;
        if(fileItem._file.size <= 500000){            
            if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp")
            {
                $scope.botonSubirOriginal = null; 
                $scope.botonSubirError = "oculta";
                $scope.imgmenos = 'mostrar';
            }else{
                swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
                $scope.botonSubirError = null; 
                $scope.botonSubirOriginal = "oculta";   
                $.unblockUI();                  
            }
            $scope.subir="ok";
        }else{
            if (fileItem._file.size <= 15000000) {
                if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp")
                {
                    $scope.botonSubirOriginal = null; 
                    $scope.botonSubirError = "oculta";
                    $scope.imgmenos = null;
                    var current_file = fileItem._file;
                    if (current_file.size > 500000) {
                    /////////////////////COMPRESION DE IMAGENES//////////////////////////////
                        var filecompress = compressImage(current_file).then(function(respuesta){
                            $scope.myFile1 = respuesta;
                        });
                    /////////////////////////////////////////////////////
                    }
                }else{
                    swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
                    $scope.botonSubirError = null; 
                    $scope.botonSubirOriginal = "oculta";
                    $.unblockUI();                                       
                }
            }
            else{
                swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                $.unblockUI();                  
            };
            $scope.subir="ok";
        }
    };

    $scope.falla = function()
    {
	    swal('', 'Tipo de archivo incorrecto elimine porfavor', 'error');   
        $scope.desabilitado2=true;
    }
    
    //end changes
    //Star image 

    $scope.addImage=function(e,idFoto){
        $.blockUI();  
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
    //end image
    //after to upload the image
    uploader.onAfterAddingAll = function(addedFileItems) {
    };
    uploader.onBeforeUploadItem = function(item) {
    };
    uploader.onProgressItem = function(fileItem, progress) {
    };
    uploader.onProgressAll = function(progress) {
    };
    var archivoUpload = "";
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        archivoUpload =fileItem.file.name;
        direccionURL = direccionURL+"/"+archivoUpload;
        cambiaimagen = "SI"
    };
    //end
    /***********************API COMBO PROFESION **************************/
	$scope.getProfesion = function(){
       var validarpromesas = [$scope.getprof()];
       $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
       });
    }

    $scope.getprof = function(){
          var profesion = new rcProfesion();
          profesion.getProfesiones(function(resultado){
          resultadoApi = JSON.parse(resultado);
          $scope.getpro = resultadoApi.success;
        });   
    };

   /* $scope.combopais = function(){
        var pais = new rcPais();
        pais.getPaises(function(resultado){
        resultadoApi = JSON.parse(resultado);
        $scope.comdpais = resultadoApi.success;
      });   
    };*/
        
    /*$scope.combodepa = function(){  
        var depto = new rcDepartamento();
        depto.getDepto(function(resultado){
        resultadoApi = JSON.parse(resultado);
        $scope.comdepa = resultadoApi.success;
        });   

    }*/
    $scope.cargarProvincia_v2 = function(idProvi){
        var prov = new rcProvincias();
        prov.idProv = idProvi;
        prov.getProv(function(resultado){
        resultadoApi = JSON.parse(resultado);
        resultsProv = resultadoApi.success;
        if(resultsProv.length > 0){
            $scope.aProvincias = resultsProv;

           /* if (typeof $scope.aProvincias !== 'undefined') {
                $scope.aProvincias = resultsProv;
            }else{
                console.log("Error datos no definidos, cargar provincia");
            }*/
            
            $scope.deshabilitadoP = false;
            $scope.registro.provincia=0;
            $scope.$apply();
            $.unblockUI();
        }
        else{
            $scope.msg = "Error !!";
            $scope.deshabilitadoP = true;
            $.unblockUI();
        }
            //// Se desactivan los combos dependientes posteriores a Municipio
            $scope.deshabilitadoM = true;
            $scope.deshabilitadoMc = true;
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;
            $scope.registro.municipio = '';
            $scope.registro.macrodistrito = '';
            $scope.registro.distrito = '';
            $scope.registro.zona = '';
            $scope.registro.tipo_via = '';
            $scope.registro.nombrevia = '';
            $scope.registro.otro_via = '';
            $.unblockUI();
        
        });      

    }

    $scope.cargarProvincia = function(idProv){
        var prov = new rcProvincias();
        prov.idProv = idProv;
        prov.getProv(function(resultado){
        resultadoApi = JSON.parse(resultado);
        resultsProv = resultadoApi.success;
        if(resultsProv.length > 0){
            $scope.aProvincias = resultsProv;
            $scope.deshabilitadoP = false;
        } else {
            $scope.msg = "Error !!";
            $scope.deshabilitadoP = true;
            $scope.deshabilitadoM = true;
            $scope.deshabilitadoMc = true;
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;
            $scope.registro.provincia = '';
            $scope.registro.municipio = '';
            $scope.registro.macrodistrito = '';
            $scope.registro.macrodistrito_desc = '';
            $scope.registro.distrito = '';
            $scope.registro.distrito_desc = '';
            $scope.registro.zona = '';
            $scope.registro.zona_desc = '';

        }             
        
        }); 

    }
    $scope.cargarMunicipio = function(idProvincia){
        var mun = new rcMunicipios();
        mun.idMun = idProvincia;
        mun.getMun(function(resultado){
        resultadoApi = JSON.parse(resultado);
        resultsMuni = resultadoApi.success;
        if(resultsMuni.length > 0){
            $scope.aMunicipios = resultsMuni;
            $scope.deshabilitadoM = false;
        }else{
            $scope.msg = "Error !!";
            $scope.deshabilitadoM = true;
            $scope.deshabilitadoMc = true;
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;
            $scope.registro.municipio = 0;
            $scope.registro.macrodistrito = 0;
            $scope.registro.distrito = 0;
            $scope.registro.zona = 0; 
            $scope.registro.zona_d = '';        
        } 
        });
    }
    $scope.cargarMunicipio_v2 = function(idProvincia){	
        var mun = new rcMunicipios();
        mun.idMun = idProvincia;
        mun.getMun(function(resultado){
        resultadoApi = JSON.parse(resultado);
        resultsMuni = resultadoApi.success;
        if(results.length > 0){
            $scope.aMunicipios = resultsMuni;
            $scope.deshabilitadoM = false;
            $scope.registro.municipio = '';
            $scope.$apply();
            $.unblockUI();
        }
        else{
            $scope.msg = "Error !!";
            $scope.deshabilitadoM = true;
            $.unblockUI();
        }
            //// Se desactivan los combos dependientes posteriores a Macrodistrito 
            $scope.deshabilitadoMc = true;
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;
            $scope.deshabilitadoTv = true;
            $scope.deshabilitadoNv = true;
            $scope.registro.macrodistrito = '';
            $scope.registro.distrito = '';
            $scope.registro.zona = '';
            $scope.registro.tipo_via = '';
            $scope.registro.nombrevia = '';
            $scope.registro.otro_via = '';
            $scope.registro.zona_d = '';
            $.unblockUI();  
    });
    }
    /*********************************************************************/
	$scope.getDatosRegistro = function(){	
       var validarpromesas = [$scope.recuperarDatosRegistro()];
       $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
       });
	}
    $scope.recuperarDatosRegistro = function(){	
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $.blockUI();
        var datosCiudadano=new rcNatural();
        datosCiudadano.oid=idCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            results = JSON.parse(resultado);
           // console.log('results',results);
            if (results[0].dtspsl_file_fotocopia_ci) {
                $scope.btover=true;
            }
            if (results[0].dtspsl_file_fotocopia_ci_r) {
                $scope.btover1=true;
            }
            if (results[0].dtspsl_file_condiciones_uso) {
                $scope.btover2=true;
            }
            $scope.registro.valid = results[0].dtspsl_valid;
            $scope.registro.valid2 = results[0].dtspsl_valid2;
            if (results[0].dtspsl_valid=="true") {
                $scope.validadoCI = "mostrar";
            } else{
                $scope.validadoCI = null;
            };
            if (results[0].dtspsl_valid2=="true") {
                $scope.validadoNac = "mostrar";
            } else{
                $scope.validadoNac = null;
            };
            $scope.nombreFile1 = results[0].dtspsl_URL;                    
            $scope.getTipoPersona(results[0].dtspsl_tipo_persona);
            $scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";
            $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";  
            $scope.MacroZona();
            if(results[0].dtspsl_tipo_persona == "NATURAL") 
            {   
                $scope.acepta_servicios =  results[0].dtspsl_acepta_servicios;
                $scope.mostrarNatural = null;
                $scope.mostrarJuridico = "NO_MOSTRAR";
                $scope.tipo = "NATURAL";
                tipoPersona = "NATURAL"; 
                $scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";
                $scope.imagenNombre = results[0].dtspsl_nombre_archivo;    // Recuperar informacion de la Imagen
                $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";  
                $scope.registro.profesion = results[0].dtspsl_profesion;
                $scope.registro.otra_profesion = results[0].dtspsl_otra_profesion;                      
                $scope.registro.nombre = results[0].dtspsl_nombres;
                $scope.registro.paterno = results[0].dtspsl_paterno;
                $scope.registro.materno = results[0].dtspsl_materno;                        
                $scope.registro.tercer = results[0].dtspsl_tercer_apellido;
                $scope.registro.cedula = results[0].dtspsl_ci;
                $scope.registro.pin = results[0].dtspsl_pin;                             ///recuperar pin para las modificaciones
                $scope.registro.activacionf = results[0].dtspsl_activacionf;             ////recuperar  para las modificaciones
                $scope.registro.activaciond = results[0].dtspsl_activaciond;             ////recuperar  para las modificaciones
                $scope.registro.fec_activacionf = results[0].dtspsl_fec_activacionf;     ////recuperar  para las modificaciones
                $scope.registro.fec_activaciond = results[0].dtspsl_fec_activaciond;     ////recuperar  para las modificaciones
                $scope.registro.registrado = results[0].dtspsl_registrado;
                $scope.registro.expedido = results[0].dtspsl_expedido;
                $scope.registro.estado_civil = results[0].dtspsl_id_estado_civil;
                $scope.registro.complemento = results[0].dtspsl_complemento;
                $scope.registro.fecha_vencimiento = results[0].dtspsl_fec_vencimiento;
                $scope.registro.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
                $scope.registro.lugarNacimiento = results[0].dtspsl_lugar_nacimiento;
                $scope.registro.sexo = results[0].dtspsl_sexo;
                $scope.registro.telefono = results[0].dtspsl_telefono;
                $scope.registro.celular = results[0].dtspsl_movil;
                $scope.registro.correo = results[0].dtspsl_correo;
                $scope.registro.ci_discapacitado = results[0].dtspsl_ci_discapacitado;
                $scope.registro.persona_discapacidad = results[0].dtspsl_persona_discapacidad;
                $scope.registro.fec_expiracion_dis = results[0].dtspsl_fec_expiracion_dis;

				if($scope.registro.correo=="")	
					$scope.deshabilitarCorreo=false;
				else
					$scope.deshabilitarCorreo=true;
                $scope.registro.ocupacion = results[0].dtspsl_ocupacion;
                if(results[0].dtspsl_otra_profesion == null)
                {
                    $scope.registro.profesion = results[0].dtspsl_profesion;
                }
                else
                {
                    $scope.registro.otra_profesion = results[0].dtspsl_otra_profesion;
                    $scope.registro.profesion = results[0].dtspsl_profesion;
                }
                $scope.registro.direccion = results[0].dtspsl_direccion;
                //DATOS TAB2 - DATOS DE DIRECCION
                $scope.registro.pais = results[0].dtspsl_pais;
                if($scope.registro.pais === "" || $scope.registro.pais === null || typeof($scope.registro.pais) === 'undefined'){                    
                    $scope.registro.pais    =   '1';
                }
                //CARGANDO DATOS INICIALES
                $scope.actualizaDepartamento(results[0].dtspsl_pais);
                $scope.registro.departamento = results[0].dtspsl_departamento;
                $scope.cargarProvincia(results[0].dtspsl_departamento);
                $scope.registro.provincia = results[0].dtspsl_provincia;  
                $scope.cargarMunicipio(results[0].dtspsl_provincia);
                $scope.registro.municipio = results[0].dtspsl_municipio;
				$scope.idMunicipio = $scope.registro.municipio;	
                $scope.registro.macrodistrito = parseInt(results[0].dtspsl_macrodistrito);  
                $scope.registro.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;               			
                $scope.registro.distrito = parseInt(results[0].dtspsl_distrito);
                $scope.registro.distrito_desc = results[0].dtspsl_distrito_desc;
                $scope.registro.zona = parseInt(results[0].dtspsl_zona);
                $scope.registro.zona_desc = results[0].dtspsl_zona_desc;
                $scope.habilitaVia();
                $scope.registro.zona_d = results[0].dtspsl_zona_desc;
                $scope.registro.tipo_via = results[0].dtspsl_tipo_via;
				$scope.vias(results[0].dtspsl_zona,results[0].dtspsl_tipo_via);	
				$scope.registro.nombrevia = results[0].dtspsl_nombre_via;
                $scope.registro.numero = results[0].dtspsl_numero_casa;
                $scope.registro.edificio = results[0].dtspsl_edificio;
                $scope.registro.bloque = results[0].dtspsl_bloque;
                $scope.registro.piso = results[0].dtspsl_piso;
                $scope.registro.numeroOficina = results[0].dtspsl_oficina;
                $scope.registro.latitud = results[0].dtspsl_latitud;
                $scope.registro.longitud = results[0].dtspsl_longitud; 
                $scope.registro.FILE_FOTOCOPIA_CI = results[0].dtspsl_file_fotocopia_ci;
                $scope.registro.FILE_FOTOCOPIA_CI_R = results[0].dtspsl_file_fotocopia_ci_r;
                $scope.registro.FILE_CONDICIONES_USO = results[0].dtspsl_file_condiciones_uso
                $scope.registro.FILE_FACTURA_LUZ = results[0].dtspsl_file_factura_luz;
                $scope.macrodistritosidM(results[0].dtspsl_zona);
                if (results[0].dtspsl_nombre_via) {
                    if(results[0].dtspsl_nombre_via.indexOf('%%')!=-1){
                        var arrayVia = results[0].dtspsl_nombre_via.split('%%');
                        $scope.registro.nombrevia= arrayVia[0];
                        $scope.registro.otro_via= arrayVia[1];
                    }
                }
                $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
                if (results[0].dtspsl_valid=="true") {
                    $scope.validadoCI = "mostrar";
                } else{
                    $scope.validadoCI = null;
                };
                if (results[0].dtspsl_valid2=="true") {
                    $scope.validadoNac = "mostrar";
                } else{
                    $scope.validadoNac = null;
                };
                ////// Ocultar el mapa Apenas termine de cargarlo
                $scope.cerrarMapa();
                $.unblockUI();
            }
            else if(results[0].dtspsl_tipo_persona == "JURIDICO"){
                $scope.acepta_servicios =  results[0].dtspsl_acepta_servicios;
                $scope.mostrarJuridico = null;
                $scope.mostrarNatural = "NO_MOSTRAR";
                $scope.tipo = "JURIDICO";    
                tipoPersona = "JURIDICO";                         
                //DATOS PERSONALES - TAB1
                $scope.registro.complemento = results[0].dtspsl_complemento;
                $scope.registro.repLegal = results[0].dtspsl_poder_replegal;
                $scope.registro.notaria = results[0].dtspsl_nro_notaria;
                $scope.registro.nit = results[0].dtspsl_nit;
                $scope.registro.pin = results[0].dtspsl_pin;                                 //// Recuperar pin para las modificaciones
                $scope.registro.activacionf = results[0].dtspsl_activacionf;                 ////recuperar  para las modificaciones
                $scope.registro.activaciond = results[0].dtspsl_activaciond;                 ////recuperar  para las modificaciones
                $scope.registro.fec_activacionf = results[0].dtspsl_fec_activacionf;         ////recuperar  para las modificaciones
                $scope.registro.fec_activaciond = results[0].dtspsl_fec_activaciond;         ////recuperar  para las modificaciones

                $scope.registro.razon = results[0].dtspsl_razon_social;
                $scope.registro.mprTelefono = results[0].dtspsl_telefono;
                //mostrarNumComplemento                        
                $scope.registro.mprCelular = results[0].dtspsl_movil;                        
                $scope.registro.mprCorreo = results[0].dtspsl_correo;   
				if($scope.registro.correo=="")	
					$scope.deshabilitarCorreo=false;
				else
					$scope.deshabilitarCorreo=true;				
                $scope.registro.direccion_representante = results[0].dtspsl_direccion;
                $scope.registro.tipoEmpresa = results[0].dtspsl_tipo_empresa;;

                //DATOS TAB2 - DATOS DE DIRECCION
                $scope.registro.pais = results[0].dtspsl_pais;
                if($scope.registro.pais === "" || $scope.registro.pais === null || typeof($scope.registro.pais) === 'undefined'){                    
                    $scope.registro.pais    =   '1';
                }                

                //CARGANDO DATOS INICIALES
                $scope.actualizaDepartamento(results[0].dtspsl_pais);
                $scope.registro.departamento = results[0].dtspsl_departamento;
                $scope.cargarProvincia(results[0].dtspsl_departamento);
                $scope.registro.provincia = results[0].dtspsl_provincia;
                $scope.cargarMunicipio(results[0].dtspsl_provincia);
                $scope.registro.municipio = results[0].dtspsl_municipio;
				$scope.idMunicipio = $scope.registro.municipio;	
                $scope.registro.macrodistrito = parseInt(results[0].dtspsl_macrodistrito);  
                $scope.registro.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;                          
                $scope.registro.distrito = parseInt(results[0].dtspsl_distrito);
                $scope.registro.distrito_desc = results[0].dtspsl_distrito_desc;
                $scope.registro.zona = parseInt(results[0].dtspsl_zona);
                $scope.registro.zona_desc = results[0].dtspsl_zona_desc;					
                $scope.registro.tipo_via = results[0].dtspsl_tipo_via;
				$scope.macrodistritosidM(results[0].dtspsl_zona);
				$scope.vias(results[0].dtspsl_zona,results[0].dtspsl_tipo_via);	
				$scope.registro.nombrevia = results[0].dtspsl_nombre_via;
				
                $scope.registro.numero = results[0].dtspsl_numero_casa;
                $scope.registro.edificio = results[0].dtspsl_edificio;
                $scope.registro.bloque = results[0].dtspsl_bloque;
                $scope.registro.piso = results[0].dtspsl_piso;
                $scope.registro.numeroOficina = results[0].dtspsl_oficina;
				
                $scope.registro.latitud = results[0].dtspsl_latitud;
                $scope.registro.longitud = results[0].dtspsl_longitud;
                $scope.registro.FILE_PODER_LEGAL = results[0].dtspsl_file_poder_legal;  
                $scope.registro.FILE_NUM_IDENT = results[0].dtspsl_file_num_ident;
                $scope.registro.FILE_TEST_CONST = results[0].dtspsl_file_test_const;
                $scope.registro.FILE_FUND_EMP = results[0].dtspsl_file_fund_emp;
                $scope.registro.FILE_REG_COMER = results[0].dtspsl_file_reg_comer;
                $scope.registro.FILE_FACTURA_LUZ = results[0].dtspsl_file_factura_luz;
                /************** Obtener Datos persona RL **********************/
                var sCiRepresentanteLegal   =   ((typeof(results[0].dtspsl_ci_representante) == 'undefined' || results[0].dtspsl_ci_representante == null) ? ""   : results[0].dtspsl_ci_representante.trim());
                if(sCiRepresentanteLegal != null && sCiRepresentanteLegal != "")
                {
                    $scope.representanteLegal = sCiRepresentanteLegal;
                    $scope.obtieneRepLegal();
                    $scope.cerrarMapa();
                    $.unblockUI(); 
                }                               
            }   
		
        });
    };
    $scope.obtieneRepLegal  =   function(){
        try{
            var parametros = new rcJuridico();
            parametros.ci = $scope.representanteLegal,
            parametros.tipo_persona = "NATURAL",
            parametros.estado = 'ACTIVO',
            parametros.actFisica = 'SI',
            parametros.actDigital = 'SI'
            parametros.obtieneRepresentanteLegal(function(resultado){
                data = JSON.parse(resultado);
                $scope.results = data;
                if(data.length != null){
                    $scope.imagenPortada = $scope.results[0].dtspsl_URL;    // Recuperar informacion de la Imagen                       
                    $scope.registro.nombre = $scope.results[0].dtspsl_nombres;
                    $scope.registro.paterno = $scope.results[0].dtspsl_paterno;
                    $scope.registro.materno = $scope.results[0].dtspsl_materno;
                    $scope.registro.cedula = $scope.results[0].dtspsl_ci;
                    $scope.registro.complemento = $scope.results[0].dtspsl_complemento;
                    $scope.registro.cestcivil_id = $scope.results[0].dtspsl_id_estado_civil;
                    $scope.registro.ocupacion = $scope.results[0].dtspsl_ocupacion;
                    $scope.registro.profesion = $scope.results[0].dtspsl_profesion;
                    $scope.registro.otra_profesion = $scope.results[0].dtspsl_otra_profesion;
                    $scope.registro.celularRep = $scope.results[0].dtspsl_movil;
                    $scope.registro.telefonoRep = $scope.results[0].dtspsl_telefono;
                    $scope.registro.correoRep = $scope.results[0].dtspsl_correo;
                    $scope.registro.direccionRep = $scope.results[0].dtspsl_direccion;
                    $scope.registro.sexo = $scope.results[0].dtspsl_sexo;
                    var oidR = $scope.results[0]._id;
                    //$scope.registro.idrepre = oidR.$oid;
                    $scope.registro.idrepre = oidR;
                    if ($scope.results[0].dtspsl_file_fotocopia_ci) {
                        $scope.btover_c=true;
                    }
                    $scope.registro.FILE_FOTOCOPIA_CI = $scope.results[0].dtspsl_file_fotocopia_ci;
                    $scope.registro.FILE_FOTOCOPIA_CI_R = $scope.results[0].dtspsl_file_fotocopia_ci_r;
                }
            });
        }catch(error){
           console.log("error en obtener datos de representante legal");
        }  
    };
    $scope.validaNitRepLegal  =   function(){
        try{
            var parametros = new rcJuridico();
            parametros.ci = $scope.representanteLegal,
            parametros.tipo_persona = "NATURAL",
            parametros.estado = 'ACTIVO',
            parametros.actFisica = 'SI',
            parametros.actDigital = 'SI'
            parametros.obtieneRepresentanteLegal(function(resultado){
                data = JSON.parse(resultado);
                $scope.results = data;
                if(data.length>0){
                    $.unblockUI();
                    $scope.validaNitJuridico();
                    /*var filtroNit= '{"dtspsl_nit":"'+ $scope.cnit + '","dtspsl_estado":"ACTIVO"}';
                    var resRepNit=new reglasnegocio();
                    resRepNit.identificador="MONGO_RC_LAPAZ_175";
                    resRepNit.parametros=filtroNit;
                    resRepLegalMongo.llamarregla(function(data){
                        data=JSON.parse(data);
                        if (data !=null) {
                            $scope.registroCiudadano(data);
                        }else{
                            $scope.errors["error_uos"] = error;
                        }
                    }).error(function(error){
                        $scope.errors["error_uos"] = error;
                    }); */
                }else{
                    swal('Advertencia', 'El número de CI no esta en Registro Ciudadano', 'warning'); 
                    $scope.getCaptchasX();
                    $.unblockUI();
                }
                
            });
        }catch(error){
           console.log("error en obtener datos de representante legal");
        }  
    };
    $scope.validaNitJuridico  =   function(){
        try{
            var parametros = new rcJuridico();
            parametros.nit = $scope.cnit,
            parametros.estado = 'ACTIVO',
            parametros.validaNitRepresentanteLegal(function(resultado){
                data = JSON.parse(resultado);
                $scope.results = data;
                if(data.length != null){
                    $scope.registroCiudadano(data);
                }else{
                    $scope.errors["error_uos"] = error;
                }
            });
        }catch(error){
           console.log("error en obtener datos de representante legal");
        }  
    };
    $scope.validaCiNatural  =   function(){
        try{
            var parametros = new rcNatural();
            parametros.ci = $scope.cedula2,
            parametros.tipo_persona = "NATURAL",
            parametros.estado = 'ACTIVO'
            parametros.validaCi_Natural(function(resultado){
                data = JSON.parse(resultado);
                $scope.results = data;
                if($scope.results != null){
                    $.unblockUI();
                    $scope.registroCiudadano(data);   
                }else{
                    swal('Advertencia', 'El número de CI no esta en Registro Ciudadano', 'warning'); 
                    $scope.getCaptchasX();
                    $.unblockUI();
                }
                
            });
        }catch(error){
           console.log("error en obtener datos de representante legal");
        }  
    };

    $scope.validarEmail =function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    $scope.validaCorreo =function(){
        var $result = $("#result");
        var email = $("#prsCorreo").val();
        $result.text("");
        if ($scope.validarEmail(email)) {
            $("#mensaje1").show();
            $("#mensaje2").hide();
            $scope.correoValido=false;
        } else {
          $("#mensaje1").hide();
          $("#mensaje2").show();
          $scope.correoValido=true;
        }
        return false;
    } 

    $scope.validaCorreoJ =function(){
        var $result = $("#result");
        var email = $("#mprCorreo").val();
        $result.text("");
        if ($scope.validarEmail(email)) {
            $("#mensaje11").show();
            $("#mensaje12").hide();
            $scope.correoValido=false;
        } else {
          $("#mensaje11").hide();
          $("#mensaje12").show();
          $scope.correoValido=true;
        }
        return false;
      } 

$scope.validarFechanac = function(fechanac){
    var sfecha = fechanac;
    var sfechafinal = "";
    if(sfecha != null && sfecha != ""){
        var snuevafecha = "";
        if(sfecha.split("/").length > 1){
            var dateString = sfecha;
            var dateParts = sfecha.split("/");
                snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);// month is 0-based            
            }else{
                snuevafecha = new Date(sfecha);
            }
            var messnuevafecha = "";
            var diasnuevafecha = "";
            if(snuevafecha != 'Invalid Date'){
                messnuevafecha = snuevafecha.getMonth()+1;
                messnuevafecha        =     (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                if (snuevafecha.getUTCDate()<10){
                    diasnuevafecha = "0" + (snuevafecha.getUTCDate());
                }else{
                    diasnuevafecha = snuevafecha.getUTCDate();
                }
                sfechafinal = snuevafecha.getFullYear() + "-" + messnuevafecha + "-" + diasnuevafecha;
            }
        }else{
            sfechafinal =  sfecha;
        }
        return sfechafinal;
    } 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$scope.startDateOpen = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.startDateOpened = true;
};    
$scope.startDateOpen1 = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.startDateOpened1 = true;
};
$scope.startDateOpen2 = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.startDateOpened2 = true;
};
/******************* API ESTADO CIVIL**********************************/
/*$scope.estado_Civil = function(){
   var validarpromesas = [$scope.estadoCivil()];
   $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
       //console.log("respLicencia: ", resp);
   });
}*/
/*$scope.estadoCivil = function(){
    $scope[name] = 'Running';
    var deferred = $q.defer();
    var sestadocivil   = new reglasnegocio();
    sestadocivil.identificador = "RCCIUDADANO_20";
    sestadocivil.parametros = '{}';
    sestadocivil.llamarregla(function(results)
    {
        results = JSON.parse(results);
        if(results.length > 0)
        {
            $scope.aEstadoCivil = results;
             deferred.resolve(results);
        }
        else
        {
            $scope.msg = "Error !!";
        }             
    });
    return deferred.promise;
};*/
/**********************************************************************/    
var aRegistro = {"cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"","fecha_nacimiento":"","fecha_vencimiento":"",
"materno":"","nombre":"","ocupacion":"","profesion":"","otra_profesion":"","paterno":"","sexo":"","valid":"","valid2":"","telefono":"","cedula2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
"nit": "","razonSocial": "","tipoP": ""};
$scope.registro = aRegistro;
$scope.mostrarNatural = null;
     //limpiar campos registro
     $scope.limpiarFormRegistro = function(){
       $scope.registro.cedula = "";
       $scope.registro.cedula2 = "";
       $scope.registro.complemento = "";
       $scope.registro.complemento2 = "";
       $scope.mostrarNumComplemento = "";
       $scope.mostrarNumComplemento2 = "";
       $scope.registro.celular = "";
       $scope.registro.correo = "";
       $scope.registro.direccion = "";
       $scope.registro.estado_civil = "";
       $scope.registro.fecha_nacimiento = "";
       $scope.registro.fecha_vencimiento = "";
       $scope.registro.materno = "";
       $scope.registro.nombre = "";
       $scope.registro.ocupacion = "";
       $scope.registro.profesion = "";
       $scope.registro.otra_profesion = "";
       $scope.registro.paterno = "";
       $scope.registro.sexo = "";
       $scope.registro.repLegal = "";
       $scope.registro.nroDocumento = "";
       $scope.registro.nroNotaria = "";
       $scope.registro.nit = "";
       $scope.registro.razonSocial = "";
       $scope.registro.zona = "";
       $scope.registro.zona_mdst_id = "";
       $scope.registro.yzona_dst_id = "";
       $scope.registro = "";
       $scope.registro.zona = "";
       $scope.registro.tipo_via = "";
       $scope.registro.nombrevia = "";
       $scope.registro.tipoEmpresa = "";

   }
   var tipoPersona = "NATURAL";
   var descripcionPersona = "Natural";
   var descripcionNombre = "";
   var descripcionPaterno = "";
   var descripcionMaterno = "";
   $scope.getTipoPersona = function (val) {
       descripcionPersona = val;
       if (val == "Natural") {
           tipoPersona = "NATURAL";
           $scope.tipo="Natural";
           $scope.limpiarFormRegistro();
       };
       if (val == "Juridica") {
           tipoPersona = "JURIDICO"
           $scope.tipo="Jurídico";
           $scope.limpiarFormRegistro();
       };
       $scope.registro.tipoP = tipoPersona;
    }; 
    var estcivil =  "";
    $rootScope.dataDatospersonales= '';

    $scope.almacenarDocumentos = function(aFiles){
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            //fileUpload.uploadFileToUrl(aFiles[0], uploadUrl);
            $scope.registro.FILE_FOTOCOPIA_CI   = nombreNuevoCIAnverso;
            $scope.Advertencia1 = "ok";
        }
        if (aFiles[1]){
            //fileUpload.uploadFileToUrl(aFiles[1], uploadUrl);
            $scope.registro.FILE_FOTOCOPIA_CI_R   = nombreNuevoCIReverso;
            $scope.Advertencia2 = "ok";
        }
        if (aFiles[2]){
            //fileUpload.uploadFileToUrl(aFiles[2], uploadUrl);
            $scope.registro.FILE_PODER_LEGAL   = nombreNuevoPoderLegal;
            $scope.Advertencia3 = "ok";
        }
        if (aFiles[3]){
            //fileUpload.uploadFileToUrl(aFiles[3], uploadUrl);
            $scope.registro.FILE_TEST_CONST   = nombreNuevoTestimonio;
            $scope.Advertencia4 = "ok";
        }
        if (aFiles[4]){
            //fileUpload.uploadFileToUrl(aFiles[4], uploadUrl);
            $scope.registro.FILE_NUM_IDENT   = nombreNuevoNit;
            $scope.Advertencia5 = "ok";
        }
        if (aFiles[5]){
            //fileUpload.uploadFileToUrl(aFiles[5], uploadUrl);
            $scope.registro.FILE_FUND_EMP   = nombreNuevoFundaempresa;
            $scope.Advertencia6 = "ok";
        }
        if (aFiles[6]){
            //fileUpload.uploadFileToUrl(aFiles[6], uploadUrl);
            $scope.registro.FILE_REG_COMER   = aFiles[6].name;
            $scope.Advertencia7 = "ok";
        }
        if (aFiles[7]){
            fileUpload.uploadFileToUrl(aFiles[7], uploadUrl);
        }
    }; 

    $scope.validarCiCiudadano = function(response){
        var sw=100;
        var filtrov;
        var misDocs = new Array();
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FOTOCOPIA_CI_R);
        misDocs.push($scope.FILE_PODER_LEGAL);
        misDocs.push($scope.FILE_TEST_CONST);
        misDocs.push($scope.FILE_NUM_IDENT);
        misDocs.push($scope.FILE_FUND_EMP);
        misDocs.push($scope.FILE_REG_COMER);
        //the image
        misDocs.push($scope.myFile1);
        $scope.almacenarDocumentos(misDocs);
        $.blockUI();
        var responseJuridico = response;
        $rootScope.dataDatospersonales = response;
        if(response.selecteIdi == "JURIDICO") {
            estcivil = 0;
        } else { 
            estcivil = response.estado_civil;
        }
        
        if(tipoPersona == "JURIDICO") 
        {
            var cnit = response.nit;
            $scope.cnit = response.nit;
            var cnit2 = response.nit2;
            if(cnit == cnit2) {
                $scope.representanteLegal = response.cedula;
                $scope.validaNitRepLegal();  
            } else{
				swal('', 'El número de NIT  no concuerda con el anterior formulario', 'warning'); 
                $.unblockUI();  
                $scope.getCaptchasX();                  
            }                                                   
        } else {
            var ci1=response.cedula;
            var ci2=response.cedula2;
            $scope.cedula2 = response.cedula2;
            if(ci1==ci2)
            {       
                $scope.validaCiNatural();  
            }else{
				swal('', 'El número de ci no concuerda con el anterior formulario', 'warning'); 
                $.unblockUI();  
                $scope.getCaptchasX();
            }
        }
    };

    $scope.actualizaDepartamento = function (dato)
    {
        $.blockUI();
        if (dato == 2) {
           $scope.registro.departamento = '';
           $scope.registro.provincia = '';
           $scope.registro.municipio = '';
           $scope.registro.macrodistrito = '';
           $scope.registro.distrito = '';
           $scope.registro.zona = '';
           $scope.deshabilitadoD = true;
           $scope.deshabilitadoP = true;
           $scope.deshabilitadoM = true;
           $scope.deshabilitadoMc = true;
           $scope.deshabilitadoDs = true;
           $scope.deshabilitadoZ = true;
        } else {
            $scope.deshabilitadoD = false;
            $.blockUI();
        }
        $.unblockUI();
    };
    /**************** API COMBO PAIS *************************************/
    $scope.setNumero = function(){
		$scope.telefono_empresa=0;
		$scope.celular_empresa=0;
    };
	
   
    
    /**************** API COMBO DEPARTAMENTOS ****************************/
    

    $scope.limpiarDepartamento = function (){
        $scope.registro.municipio = '';
        $scope.registro.zona_d = '';
        $scope.registro.distrito = '';
        $scope.registro.distrito_desc = '';
        $scope.registro.macrodistrito = '';
        $scope.registro.macrodistrito_desc = '';
        $scope.registro.zona = '';
        $scope.registro.zona_desc = '';
        $scope.registro.tipo_via = '';
        $scope.registro.numero = '';
        $scope.registro.nombrevia = '';
    }
    
    
	
    /*********************************************************************/   
    /************************ CARGAR MUNICIPIO ******************************/
   


    /************************ CARGAR MACRODISTRITO ****************************/ 
    $scope.cargarMacrodistrito = function(idMac){
        $scope.idMacrod = idMac;
        var smacrodistrito   = new reglasnegocio();
        smacrodistrito.identificador = "RCCIUDADANO_24";
        smacrodistrito.parametros = '{"macrodistrito":"' + idMac + '"}';
        smacrodistrito.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
                $scope.aMacrodistritos = results;
                $scope.deshabilitadoMc = false;
            }else{
               $scope.msg = "Error !!";
               $scope.deshabilitadoMc = true;
               $scope.deshabilitadoDs = true;
               $scope.deshabilitadoZ = true;
               $scope.registro.macrodistrito = 0;
               $scope.registro.distrito = 0;
               $scope.registro.zona = 0;         
           }             
       });
    };
    /***************************** CARGAR DISTRITO ****************************/ 
    $scope.cargarDistrito = function(idDis){
         var sdistrito   = new reglasnegocio();
         sdistrito.identificador = "RCCIUDADANO_25";
         sdistrito.parametros = '{"macrodistrito":"' + idDis + '"}';
         sdistrito.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
                $scope.aDistritos = results;
             }else{
                 $scope.msg = "Error !!";
                 $scope.deshabilitadoDs = true;
                 $scope.deshabilitadoZ = true;
                 $scope.registro.distrito = 0;
                 $scope.registro.zona = 0; 
                 $scope.registro.distrito = '';
                 $scope.registro.zona = '';
                 $scope.registro.tipo_via = '';
                 $scope.registro.nombrevia = '';        
             }             
        });
    };
    $scope.limpiarZona = function(){
        $scope.registro.zona_d = '';
        $scope.registro.distrito = 0;
        $scope.registro.distrito_desc = 0;
        $scope.registro.macrodistrito = 0;
        $scope.registro.macrodistrito_desc = 0;
        $scope.registro.tipo_via = '';
        $scope.registro.numero = '';
        $scope.registro.nombrevia = '';
        document.getElementById('prsZona_d').value = '';
    }

/*******************CARGAR ZONA MACRODISTRITO ******************************/
    $scope.MacroZona  =   function(){
        try{
            var parametros = new ZonaMacro();
            parametros.Zona_Macro(function(resultado){
                data = JSON.parse(resultado);
                    if(data.success.length > 0){
                        $scope.aMacroZona = data.success;
                    }else{
                        $scope.msg = "Error !!";
                    }
            });
        }catch(error){
           console.log("error en zonas");
        }  
    };

    $scope.actulizarIdDistritoM  =   function(zonaid){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var zonaDescrip      = "";
        var distNombre  = zonaid;
        if($scope.aMacroZona){
            angular.forEach($scope.aMacroZona, function(value, key) {
                if(value.dist_id == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    zonaDescrip      =   value.dist_nombre;
                    idMacro     =   value.dist_macro_id;
                }
            });
        }

        $scope.registro.zona_desc   =   zonaDescrip;
        $scope.registro.distrito = idDistrito  
        $scope.registro.distrito_desc = "DISTRITO "+idDistrito;
    };

    $scope.macrodistritosidM = function(zonaid){
        var idMacro = "";
        if(zonaid != "" && zonaid != undefined && zonaid != ' ' && zonaid != 'undefined'){
            var distNombre  = zonaid;
            if($scope.aMacroZona){
                angular.forEach($scope.aMacroZona, function(value, key) {
                    if(value.dist_id == distNombre){
                        idMacro  =   value.dist_macro_id;
                    }
                });
            }

            if(idMacro == ''){
                idMacro = 0;
            }

            $scope.idMacro = idMacro;
            $scope.aMacrodistritos = {};
            $scope.registro.macrodistrito    =   idMacro;
            var datosP = new macrodistritoLstid();
            datosP.idMacro =  idMacro;
            datosP.obtmacrodistrito(function(resultado){
                data = JSON.parse(resultado);
                if(data.success.length > 0){
                    $scope.macrodistritoD = data.success;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }else{
            console.log("no tiene zona registrada");
        }
    };
 /********************************* CARGAR ZONA ****************************/ 
     $scope.cargarZona = function(idZona){
        var szona   = new reglasnegocio();
        szona.identificador = "RCCIUDADANO_26";
        szona.parametros = '{"zona":"' + idZona + '"}';
        szona.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
               $scope.aZonas = results;
               $scope.deshabilitadoZ = false;
           }else{
               $scope.msg = "Error !!";
               $scope.deshabilitadoZ = true;
               $scope.registro.zona = 0;         
           }             
       });
    };
/**************************************************************************/
$scope.mostrarimg  =   function(imagen){         
    if (typeof($scope.FILE_FOTOCOPIA_CI) != 'undefined') {
        $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
    };
    if (typeof($scope.FILE_FOTOCOPIA_CI_R) != 'undefined') {
        $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
    }
    if (typeof($scope.registro.FILE_FOTOCOPIA_CI) != 'undefined') {
        var nombreArchivoCi    =   "";
        nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
        var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
        var extCi              =   aTipoArchivoCi.split(".")[1];

        try{
            extCi                  =   extCi.toLowerCase();
        }catch(e){}

        if(imagen == 'ci'){
            $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
            if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip'){
                window.open($scope.archivoCI, "_blank");
            }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
                $("#fo").modal("show");
            }          
        }
    };      
    if (typeof($scope.registro.FILE_FOTOCOPIA_CI_R != 'undefined')) {
        var nombreArchivoCiR    =   "";
        nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
        var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
        var extCiR              =   aTipoArchivoCiR.split(".")[1];   
        try{
            extCiR                  =   extCiR.toLowerCase();
        }catch(e){}

        if(imagen == 'ciR'){
            $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";             
            if(extCiR == 'pdf' || extCiR == 'docx' ||  extCiR == 'docxlm' || extCiR == 'zip'){
                window.open($scope.archivoCIR, "_blank");
            }else if(extCiR == 'jpeg' || extCiR == 'jpg' ||  extCiR == 'png' ||  extCiR == 'gif'){
                $("#fot").modal("show");             
            }
        } 
    }; 
    $.unblockUI();
}

$scope.mostrarimgjuridico  =   function(imagen){         
    $.blockUI();
    if (typeof($scope.FILE_FOTOCOPIA_CI) != 'undefined') {
        $scope.registro.FILE_FOTOCOPIA_CI = $scope.FILE_FOTOCOPIA_CI.name;
    };
    if (typeof($scope.FILE_FOTOCOPIA_CI_R) != 'undefined') {
        $scope.registro.FILE_FOTOCOPIA_CI_R = $scope.FILE_FOTOCOPIA_CI_R.name;
    }  
    if (typeof($scope.FILE_PODER_LEGAL) != 'undefined') {
        $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
    };
    if (typeof($scope.FILE_TEST_CONST) != 'undefined') {
        $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
    };
    if (typeof($scope.FILE_NUM_IDENT) != 'undefined') {
        $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
    };
    if (typeof($scope.FILE_FUND_EMP) != 'undefined') {
        $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
    };
    if (typeof($scope.FILE_REG_COMER) != 'undefined') {
        $scope.registro.FILE_REG_COMER = $scope.FILE_REG_COMER.name;
    };  

    if (typeof($scope.registro.FILE_FOTOCOPIA_CI) != 'undefined') {
        var nombreArchivoCi    =   "";
        nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
        var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
        var extCi              =   aTipoArchivoCi.split(".")[1]; 
        try{
            extCi           =   extCi.toLowerCase();
        }catch(e){}
        if(imagen == 'ci'){
            $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
            if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip'){
                window.open($scope.archivoCI, "_blank");
            }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
                $("#fotci").modal("show");
            }                      
        }
    };  

    if (typeof($scope.registro.FILE_FOTOCOPIA_CI_R) != 'undefined') {
        var nombreArchivoCiR    =   "";
        nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
        var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
        var extCiR              =   aTipoArchivoCiR.split(".")[1]; 
        try{
            extCiR          =   extCiR.toLowerCase();
        }catch(e){}
        if(imagen == 'ciR'){
            $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";             
            if(extCiR == 'pdf' || extCiR == 'docx' ||  extCiR == 'docxlm' || extCiR == 'zip'){
                window.open($scope.archivoCIR, "_blank");
            }else if(extCiR == 'jpeg' || extCiR == 'jpg' ||  extCiR == 'png' ||  extCiR == 'gif'){
                $("#fotcir").modal("show");             
            }
        }
    };

    if (typeof($scope.registro.FILE_PODER_LEGAL) != 'undefined') {
        var nombreArchivoPod    =   "";
        nombreArchivoPod        =   $scope.registro.FILE_PODER_LEGAL;
        var aTipoArchivoPod     =   nombreArchivoPod.split("?")[0];     
        var extPod              =   aTipoArchivoPod.split(".")[1];
        try{
            extPod          =   extPod.toLowerCase();
        }catch(e){}
        if(imagen == 'pod'){
            $scope.archivoPOD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_PODER_LEGAL + "?app_name=todoangular";             
            if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip'){
                window.open($scope.archivoPOD, "_blank");
            }else if(extPod == 'jpeg' || extPod == 'jpg' ||  extPod == 'png' ||  extPod == 'gif'){
                $("#fotpod").modal("show");             
            }
        }
    };

    if (typeof($scope.registro.FILE_TEST_CONST) != 'undefined') {
        var nombreArchivoTes    =   "";
        nombreArchivoTes        =   $scope.registro.FILE_TEST_CONST;
        var aTipoArchivoTes     =   nombreArchivoTes.split("?")[0];     
        var extTes              =   aTipoArchivoTes.split(".")[1];
        try{
            extTes          =   extTes.toLowerCase();
        }catch(e){}
        if(imagen == 'tes'){
            $scope.archivoTES = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_TEST_CONST + "?app_name=todoangular";             
            if(extTes == 'pdf' || extTes == 'docx' ||  extTes == 'docxlm' || extTes == 'zip'){
                window.open($scope.archivoTES, "_blank");
            }else if(extTes == 'jpeg' || extTes == 'jpg' ||  extTes == 'png' ||  extTes == 'gif'){
                $("#fottes").modal("show");             
            }
        }
    };

    if (typeof($scope.registro.FILE_NUM_IDENT) != 'undefined') {
        var nombreArchivoNum    =   "";
        nombreArchivoNum        =   $scope.registro.FILE_NUM_IDENT;
        var aTipoArchivoNum     =   nombreArchivoNum.split("?")[0];     
        var extNum              =   aTipoArchivoNum.split(".")[1];
        try{
            extNum          =   extNum.toLowerCase();
        }catch(e){} 
        if(imagen == 'numiden'){
            $scope.archivoNUM = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_NUM_IDENT + "?app_name=todoangular";             
            if(extNum == 'pdf' || extNum == 'docx' ||  extNum == 'docxlm' || extNum == 'zip'){
                window.open($scope.archivoNUM, "_blank");
                }else if(extNum == 'jpeg' || extNum == 'jpg' ||  extNum == 'png' ||  extNum == 'gif'){
                $("#fotnumiden").modal("show");             
            }
        }
    };

    if (typeof($scope.registro.FILE_FUND_EMP) != 'undefined') {
        var nombreArchivoFund   =   "";
        nombreArchivoFund        =   $scope.registro.FILE_FUND_EMP;
        var aTipoArchivoFund     =   nombreArchivoFund.split("?")[0];     
        var extFud              =   aTipoArchivoFund.split(".")[1];
        try{
            extFud          =   extFud.toLowerCase();
        }catch(e){}
        if(imagen == 'fund'){
            $scope.archivoFUD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FUND_EMP + "?app_name=todoangular";             
            if(extFud == 'pdf' || extFud == 'docx' ||  extFud == 'docxlm' || extFud == 'zip'){
                window.open($scope.archivoFUD, "_blank");
            }else if(extFud == 'jpeg' || extFud == 'jpg' ||  extFud == 'png' ||  extFud == 'gif'){
                $("#fotfund").modal("show");             
            }
        }
    };

    if (typeof($scope.registro.FILE_REG_COMER) != 'undefined') {
        var nombreArchivoReg    =   "";
        nombreArchivoReg        =   $scope.registro.FILE_REG_COMER;
        var aTipoArchivorReg    =   nombreArchivoReg.split("?")[0];     
        var extReg              =   aTipoArchivorReg.split(".")[1];
        try{
            extReg          =   extReg.toLowerCase();
        }catch(e){} 
        if(imagen == 'reg'){
            $scope.archivoREG = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_REG_COMER + "?app_name=todoangular";             
            if(extReg == 'pdf' || extReg == 'docx' ||  extReg == 'docxlm' || extReg == 'zip'){
                window.open($scope.archivoREG, "_blank");
            }else if(extReg == 'jpeg' || extReg == 'jpg' ||  extReg == 'png' ||  extReg == 'gif'){
                $("#fotreg").modal("show");             
            }
        }
    };        
    $.unblockUI();
}

$scope.habilitaVia = function(){
  $scope.deshabilitadoTv = false;
};
/******************************* Vias *************************************/
$scope.vias= function(zona,tipo){
    $scope.z =zona;
    $scope.t =tipo;
    var svias = new reglasnegocio();
    svias.identificador = "RCCIUDADANO_31";
    svias.parametros = '{"zona":"' + zona + '","tipo":"' + tipo + '"}';
    svias.llamarregla(function(results){
        results = JSON.parse(results);
        $scope.tip_vias =  new Array();
        var aTipoVia    =   {};
        aTipoVia["idv"] = "OTROS";
        aTipoVia["nombrev"] = "OTRO";
        if(results.length > 0 ){
            $scope.tip_vias =   results;
        }else{
            
            $scope.tip_vias.push(aTipoVia);
        }
        $scope.desabilitadoNo=false;
        $scope.deshabilitadoNv=false;
    });
};  


  $scope.cargarMacrodistrito_v2 = function(idMunicipio){
    $scope.idMunicipio = idMunicipio;
    $.blockUI();
    var smacrodistrito   = new reglasnegocio();
    smacrodistrito.identificador = "RCCIUDADANO_24";
    smacrodistrito.parametros = '{"macrodistrito":"' + idMunicipio + '"}';
    smacrodistrito.llamarregla(function(results){
        results = JSON.parse(results);         
        if(results.length > 0){
            $scope.aMacrodistritos = results;
            $scope.deshabilitadoMc = false;
            $scope.registro.macrodistrito = 0;
            $scope.$apply();
            $.unblockUI();
        }
        else{
            $scope.msg = "Error !!";
            $scope.deshabilitadoMc = true;
            $.unblockUI();
        }
            //// Se desactivan los combos dependientes posteriores a Distrito
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;
            $scope.deshabilitadoTv = true;
            $scope.deshabilitadoNv = true;
            $scope.registro.macrodistrito = 0;
            $scope.registro.distrito = 0;
            $scope.registro.zona = 0;
            $scope.registro.tipo_via = '';
            $scope.registro.nombrevia = '';
            $scope.registro.otro_via = '';         

            $scope.$apply();
            $.unblockUI();
    });
};
/**************************************************************************************/
$scope.cargarDistrito_v2 = function(idDis){
    $.blockUI();
    var sdistrito   = new reglasnegocio();
    sdistrito.identificador = "RCCIUDADANO_25";
    sdistrito.parametros = '{"macrodistrito":"' + idDis + '"}';
    sdistrito.llamarregla(function(results){
        results = JSON.parse(results);
        if(results.length > 0)
        {
            $scope.aDistritos = results;
            $scope.deshabilitadoDs = false;
            $scope.registro.distrito = '';
            $scope.registro.zona = '';
            $scope.registro.tipo_via = '';
            $scope.registro.nombrevia = '';
            $scope.$apply();
            $.unblockUI();
        }
        else
        {
            $scope.msg = "Error !!";
            $scope.deshabilitadoDs = true;
            $.unblockUI();                                            
        }
        //// Se desactivan los combos dependientes posteriores a Zona
        $scope.deshabilitadoZ = true;
        $scope.deshabilitadoTv = true;
        $scope.deshabilitadoNv = true;
        $scope.registro.zona = '';
        $scope.registro.tipo_via = '';
        $scope.registro.nombrevia = '';
        $scope.registro.otro_via = ''; 
        ////////////////////
        $.unblockUI();
    });
};
/**************************************************************************************/
$scope.cargarZona_v2 = function(idZona){
    $.blockUI();
    var szona   = new reglasnegocio();
    szona.identificador = "RCCIUDADANO_26";
    szona.parametros = '{"zona":"' + idZona + '"}';
    szona.llamarregla(function(results){
        results = JSON.parse(results);
        if(results.length > 0){
            $scope.aZonas = results;
            $scope.deshabilitadoZ = false;
            $scope.$apply();
            $.unblockUI();
        }else{
            $scope.msg = "Error !!";
            $scope.deshabilitadoZ = true;
            $scope.registro.zona = '';
            $.unblockUI();         
        }
        $scope.deshabilitadoTv = true;
        $scope.deshabilitadoNv = true;
        $scope.registro.nombrevia = '';   
        $scope.registro.tipo_via = '';
        $scope.registro.otro_via = '';
        $.unblockUI();          
    });
};
/**************************************************************************************/
$scope.actulizarIdDistrito =   function(){
    $scope.deshabilitadoTv=false;
    var idDistrito  = "";
    var idZona      = "";
    var distNombre  = $scope.registro.zona;        
    if($scope.aDistritoZona){            
        angular.forEach($scope.aDistritoZona, function(value, key) {
            if(value.dist_nombre == distNombre){
                idDistrito  =   value.dist_dstt_id;                    
                idZona      =   value.dist_id;
            }
        });                  
    }
    $scope.datos.INT_AC_DISTRITO    =   idDistrito;
    $scope.datos.INT_AC_ID_ZONA     =   idZona;
    $scope.datos.INT_ID_ZONA        =   idZona;        
    $scope.deshabilitadoNv=true;        
    $scope.registro.nombrevia = '';
    $scope.registro.tipo_via = '';
    $scope.registro.otro_via = 0;     
};
/**************************************************************************************/
$scope.actulizarIdDistrito_v2  =   function(){
    $scope.deshabilitadoTv=false;
    var idDistrito  = "";
    var idZona      = "";
    var distNombre  = $scope.registro.zona;        
    if($scope.aDistritoZona){            
        angular.forEach($scope.aDistritoZona, function(value, key) {
            if(value.dist_nombre == distNombre){
                idDistrito  =   value.dist_dstt_id;                    
                idZona      =   value.dist_id;
            }
        });                  
    }
    $scope.datos.INT_AC_DISTRITO    =   idDistrito;
    $scope.datos.INT_AC_ID_ZONA     =   idZona;
    $scope.datos.INT_ID_ZONA        =   idZona;        
    $scope.deshabilitadoNv=true;        
    $scope.registro.nombrevia = '';
    $scope.registro.tipo_via = '';
    $scope.registro.otro_via = '';     
};
/**************************************************************************************/
$scope.vias_v2= function(zona,tipo)
{ 
    $scope.z =zona;
    $scope.t =tipo;    
    var svias = new reglasnegocio();
    svias.identificador = "RCCIUDADANO_31";
    svias.parametros = '{"zona":"' + zona + '","tipo":"' + tipo + '"}';

    svias.llamarregla(function(results)
    {
        results = JSON.parse(results);
        $scope.tip_vias =  new Array();
        $scope.tip_vias =   [];
        var aTipoVia    =   {};
        aTipoVia["idv"] = "OTROS";
        aTipoVia["via_nombre_via"] = "OTRO";

        if(results == "[{ }]")
        {
			swal('', 'No existe nombre de la Via', 'warning'); 
            $scope.tip_vias.push(aTipoVia);
        }
        else
        {
            $scope.tip_vias = results;
        }
        $scope.desabilitadoNo=false;
        $scope.deshabilitadoNv=false;
    });
};  
  




/**************************************************************************************/    
    ///////////////////////////////////////////////
    //creando un nuevo registro 
    $scope.validacamposJuridico = function (){                 
        $scope.isDisabled = false;
        //$scope.getCaptchasX();
        if(tipoPersona == 'NATURAL'){
            $scope.opcionpersonaNatural = true;
            $scope.opcionpersonaJuridico = null;
            $scope.tituloVentana = 'Verificacion de número de carnet de identidad';         
        } else {
            $scope.opcionpersonaJuridico = true;
            $scope.opcionpersonaNatural = null;
            $scope.tituloVentana = 'Verificacion de número de NIT';                     
        }
    }

    //MODIFICAR DATOS DEL REGISTRO CIUDADANO
    $scope.registroCiudadano = function (response) {
        //RECUPERANDO DESCRIPCION CAMPOS
        var sMacroDescripcion   =   $('#macrodistrito option:selected').text();
        var sDistritoDescripcion   =   $('#distrito option:selected').text();
        var sZonaDescripcion = '';
        $.blockUI();
        if(aRegistro.tipoP == 'NATURAL')
        {
            var file = $scope.myFile1;            
        }
        else
        {
            var file = $scope.myFile1;
        }
        if (file != null)
        {
            var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
            var nombreFile = file.name;
            var cadenaURL = uploadUrl + nombreFile + '?app_name=' + CONFIG.APP_NAME;
            var cadenaURI = $scope.direccionvirtual +"/" + nombreFile;
            fileUpload.uploadFileToUrl(file, uploadUrl);
        }
        else
        {
            var cadenaURL = $scope.imagenPortada;   // Recuperar informacion de la Imagen  
            var nombreFile = $scope.imagenNombre;   // Recuperar nombre de la Imagen  
        }

        if (existe == 0) {
            if (cambiaimagen == 'SI') 
            {
                var idUsu = sessionService.get('IDUSUARIO');
                var sciudadano = new reglasnegocio();
                sciudadano.identificador = "RCCIUDADANO_42";
                sciudadano.parametros = '{"crch_ciudadano_id":"' + idCiu + '","crch_proceso":"imagenCiudadano","crch_actividad":"1","crch_nombre":"' + nombreFile + '","crch_direccion":"' + cadenaURL + '","cnt_id_usuario":"' + idUsu + '"}';                
                };
            } else {
                var sciudadano = new reglasnegocio();
                sciudadano.identificador = "RCCIUDADANO_54";
                sciudadano.parametros = '{"crch_ciudadano_id":"' + idCiu + '","crch_proceso":"imagenCiudadano","crch_actividad":"1","crch_nombre":"' + nombreFile + '","crch_tamano":"mb","crch_direccion":"' + cadenaURL + '","crch_estado":"A","crch_id_usuario":1}';                
                sciudadano.llamarregla(function(results){ 
                });
            }
        ////////////////////////////////////////////////////////////////////////end saving the file
        var response = $rootScope.dataDatospersonales;
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        sDireccion = response.direccion;
        sFono = response.telefono;
        sCelular = response.celular;
        sCorreo = response.correo;  
        descripcionNombre = response.nombre;
        descripcionPaterno = response.paterno;
        descripcionMaterno = response.materno;
        var datos = {};
        if(response.estado_civil) {
           datos['dtspsl_id_estado_civil'] = response.estado_civil;  
		} else {   
           datos['dtspsl_id_estado_civil'] = '';
		}
       if(response.estado_civil == " ") {
           response.estado_civil = ""
       }
       archivoCI="";
       archivoCIR="";
       archivoPOD="";
       archivoTES="";
       archivoNUM="";
       archivoFUD="";
       archivoREG="";
       if(tipoPersona == "NATURAL"){

        if (response.FILE_FOTOCOPIA_CI!=null) { 
            partes =  response.FILE_FOTOCOPIA_CI.split("\\");
            if (partes.length==1){
                archivoCI = response.FILE_FOTOCOPIA_CI;
            }
            else{
                archivoCI= partes[partes.length-1];
            }
        }
        if (response.FILE_FOTOCOPIA_CI_R!=null){             
            partes =  response.FILE_FOTOCOPIA_CI_R.split("\\");
            if (partes.length==1){
                archivoCIR = response.FILE_FOTOCOPIA_CI_R;
            }
            else{
                archivoCIR= partes[partes.length-1];
            }
        }
    }
    if(tipoPersona == "JURIDICO"){
        archivoCI = response.FILE_FOTOCOPIA_CI;
        archivoCIR = response.FILE_FOTOCOPIA_CI_R;
        if (response.FILE_PODER_LEGAL!=null) { 
            partes =  response.FILE_PODER_LEGAL.split("\\");
            if (partes.length==1){
                archivoPOD = response.FILE_PODER_LEGAL;
            }
            else{
                archivoPOD= partes[partes.length-1];
            }
        } 
        if (response.FILE_TEST_CONST !=null) { 
            partes =  response.FILE_TEST_CONST.split("\\");
            if (partes.length==1){
                archivoTES = response.FILE_TEST_CONST;
            }
            else{
                archivoTES= partes[partes.length-1];
            }
        }
        if (response.FILE_NUM_IDENT !=null) { 
            partes =  response.FILE_NUM_IDENT.split("\\");
            if (partes.length==1){
                archivoNUM = response.FILE_NUM_IDENT;
            }
            else{
                archivoNUM= partes[partes.length-1];
            }
        }
        if (response.FILE_FUND_EMP!=null) { 
            partes =  response.FILE_FUND_EMP.split("\\");
            if (partes.length==1){
                archivoFUD = response.FILE_FUND_EMP;
            }
            else{
                archivoFUD= partes[partes.length-1];
            }
        }
        if (response.FILE_REG_COMER!=null) { 
            partes =  response.FILE_REG_COMER.split("\\");
            if (partes.length==1){
                archivoREG = response.FILE_REG_COMER;
            }
            else{
                archivoREG= partes[partes.length-1];
            }
        }
    }
    if ($scope.subir=="ok") {
            $scope.nombreFile1 = nombreFile;    // Nuevo dato Nombre del Archivo

        }   else    {
            nombreFile1=$scope.imagenPortada_inicio;
        }
        ///////////////////////////////////////////////// RECORRER OBJETO /////////////////////////////////////////////////
        var response2 = response;
        try{
            for (var dato in response)
            {
                if(response[dato] && response[dato]!= null && typeof(response[dato]) != "undefined" && response[dato] != "")
                {
                    if(typeof(response[dato]) == "string" && 
                        dato != "correo" && 
                        dato != "correoRep" &&
                        dato != "dtspsl_file_fotocopia_ci" &&
                        dato != "dtspsl_file_fotocopia_ci_r" &&
                        dato != "dtspsl_file_factura_luz" &&
                        dato != "dtspsl_URL" &&
                        dato != "FILE_FOTOCOPIA_CI" &&
                        dato != "FILE_FOTOCOPIA_CI_R" &&
                        dato != "FILE_FACTURA_LUZ" && 
                        dato != "FILE_PODER_LEGAL"&&
                        dato != "FILE_TEST_CONST" &&
                        dato != "FILE_NUM_IDENT" && 
                        dato != "FILE_FUND_EMP" &&
                        dato != "FILE_REG_COMER") 
                    {
                        for (var i in response2) {
                          if (response2[i] == response[dato]) 
                          {
                            response2[i] = response2[i].toUpperCase();
                                        break; //Stop this loop, we found it!
                                    }
                                } 
                            }
                        }
                    }
                }
                catch(e)
                {}
        ///////////////////////////////////////////////// FIN RECORRER OBJETO
        if(response.municipio != 20101){
            response.zona = "425";
            response.zona_desc = response.zona_d;
            response.distrito = 0;
            response.macrodistrito = 0; 
            response.distrito_desc = 0;
            response.macrodistrito_desc = 0;
        }
        else{
            response.macrodistrito_desc = $('#prsMacrodistrito option:selected').text();
        }
        if(response.nombrevia == 'OTRO'){
			response.nombrevia1 = "OTRO%%"+response.otro_via;
		}else{
			response.nombrevia1 = response.nombrevia;
		}
		if(tipoPersona == "NATURAL") {
            var sfechaNacimiento = document.getElementById('prsFechaNac').value;
            var sfechaVencimiento = document.getElementById('fechaVen').value;
            var sfechacorrecta  = sfechaNacimiento.split('/')[2] + "-" +  sfechaNacimiento.split('/')[1] + "-" + sfechaNacimiento.split('/')[0] ;
            var sfechacorrectaven  = sfechaVencimiento.split('/')[2] + "-" +  sfechaVencimiento.split('/')[1] + "-" + sfechaVencimiento.split('/')[0];
            response.telefono                       = ((typeof(response.telefono) == 'undefined' || response.telefono == null || response.telefono == 'NaN') ? "" : response.telefono);
            sNumeroAleatorio                        = response.pin; 
            var modificarCiudadano                  = new rcNatural();
            modificarCiudadano.nombre               = response.nombre;
            modificarCiudadano.paterno              = response.paterno;
            modificarCiudadano.materno              = response.materno;
            modificarCiudadano.tercer_apellido      = response.tercer;
            modificarCiudadano.ci                   = response.cedula2;
            modificarCiudadano.complemento          = response.complemento;
            modificarCiudadano.expedido             = response.expedido;
			modificarCiudadano.expedido_desc        = $('#prsExpedido option:selected').text(); 
			modificarCiudadano.fec_nacimiento       = sfechacorrecta;
            modificarCiudadano.lugar_nacimiento     = response.lugarNacimiento;
			modificarCiudadano.lugar_nacimiento_desc= $('#prsLugarNacimiento option:selected').text();  
            modificarCiudadano.pais_origen          = response.pais_origen;
            modificarCiudadano.sexo                 = response.sexo;
            modificarCiudadano.id_estado_civil      = response.estado_civil;
            modificarCiudadano.estado_civil         = response.estado_civil;
			modificarCiudadano.estado_civil_desc    = $('#prsEstCivil option:selected').text(); 
			modificarCiudadano.profesion            = response.profesion;
            modificarCiudadano.profesion_desc       = $('#prsProfesion option:selected').text(); 	
            modificarCiudadano.otra_profesion       = response.otra_profesion;
            modificarCiudadano.telefono             = response.telefono;
            modificarCiudadano.movil                = response.celular;
            modificarCiudadano.correo               = response.correo;
            modificarCiudadano.direccion            = response.direccion;
            modificarCiudadano.pais                 = response.pais;
			modificarCiudadano.pais_desc            = $('#paisN option:selected').text();
            modificarCiudadano.departamento         = response.departamento;
			modificarCiudadano.departamento_desc    = $('#departamentoN option:selected').text();
            modificarCiudadano.provincia            = response.provincia;
			modificarCiudadano.provincia_desc       = $('#provinciaN option:selected').text();
            modificarCiudadano.municipio            = response.municipio;
			modificarCiudadano.municipio_desc       = $('#municipioN option:selected').text();
            modificarCiudadano.macrodistrito        = response.macrodistrito;
            modificarCiudadano.macrodistrito_desc   = response.macrodistrito_desc;
            modificarCiudadano.distrito             = response.distrito;
            modificarCiudadano.distrito_desc        = response.distrito_desc;
            modificarCiudadano.zona                 = response.zona;
            modificarCiudadano.zona_desc            = response.zona_desc;
            modificarCiudadano.tipo_via             = response.tipo_via;
			modificarCiudadano.tipo_via_desc        = $('#tipo_viaN option:selected').text();
            modificarCiudadano.nombre_via           = response.nombrevia;
            modificarCiudadano.numero_casa          = response.numero;
            modificarCiudadano.edificio             = response.edificio;
            modificarCiudadano.bloque               = response.bloque;
            modificarCiudadano.piso                 = response.piso;
            modificarCiudadano.oficina              = response.numeroOficina;
            modificarCiudadano.fec_vencimiento      = sfechacorrectaven;
            modificarCiudadano.latitud              = response.latitud;
            modificarCiudadano.longitud             = response.longitud;
            modificarCiudadano.usr_id               = idUsuario;
            modificarCiudadano.activacionf          = $scope.registro.activacionf;
            modificarCiudadano.activaciond          = $scope.registro.activaciond;
            modificarCiudadano.file_fotocopia_ci    = archivoCI;
            modificarCiudadano.file_fotocopia_ci_r  = archivoCIR;
            modificarCiudadano.ci_discapacitado     = response.ci_discapacitado;
            modificarCiudadano.persona_discapacidad = response.persona_discapacidad;
            modificarCiudadano.fec_expiracion_dis   = response.fec_expiracion_dis;
            modificarCiudadano.dtspsl_acepta_servicios = $scope.acepta_servicios;
            if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
                $scope.nombreFile1 = "";
            };
            modificarCiudadano.URL=$scope.nombreFile1;
            modificarCiudadano.oid=oidCiudadano;
            modificarCiudadano.modificarNatural(function(resultado){
                resultadoApi = JSON.parse(resultado); 
                if( typeof(resultadoApi.success) != 'undefined')
                {
                    var mensajeExito = "Se realizo la actualizacion de sus datos!";  
                    setTimeout(function(){
                        alertify.success(mensajeExito);  
                    }, 100);
                }
                else
                {
                    $.unblockUI();                    
                    var mensajeError = resultadoApi.error.message;
                    alertify.error(mensajeError); 
                }
				
                $.unblockUI();  
                $('#formModal').modal('hide');
            });

        }else{
            response.mprTelefono                       = ((typeof(response.mprTelefono) == 'undefined' || response.mprTelefono == null || response.telefono == 'NaN') ? "" : response.mprTelefono);
            sNumeroAleatorio = response.pin;
            var modificarJuridico= new rcJuridico();
            modificarJuridico.nit=response.nit;
            modificarJuridico.razonSocial=response.razon;
            modificarJuridico.telefono=response.mprTelefono;
            modificarJuridico.movil=response.mprCelular;
            modificarJuridico.correo=response.mprCorreo;
            modificarJuridico.ci=response.cedula
            modificarJuridico.complemento=response.complemento;
            modificarJuridico.representante=descripcionNombre.trim() + " " + descripcionPaterno.trim() + " " + descripcionMaterno.trim();
            modificarJuridico.poder_replegal=response.repLegal;
            modificarJuridico.nro_notaria=response.notaria;
            modificarJuridico.profesion=response.profesion;
            modificarJuridico.otra_profesion=response.otra_profesion;
            modificarJuridico.direccion=response.direccion_representante;
            modificarJuridico.pais=response.pais;
			modificarJuridico.pais_desc=$('#pais option:selected').text();
            modificarJuridico.departamento=response.departamento;
			modificarJuridico.departamento_desc=$('#departamento option:selected').text();
            modificarJuridico.provincia=response.provincia;
			modificarJuridico.provincia_desc=$('#provincia option:selected').text();
            modificarJuridico.municipio=response.municipio;
			modificarJuridico.municipio_desc=$('#municipio option:selected').text();
            modificarJuridico.macrodistrito        = response.macrodistrito;
            modificarJuridico.macrodistrito_desc   = response.macrodistrito_desc;
            modificarJuridico.distrito             = response.distrito;
            modificarJuridico.distrito_desc        = response.distrito_desc;
            modificarJuridico.zona                 = response.zona;
            modificarJuridico.zona_desc            = response.zona_desc;
            modificarJuridico.tipo_via=response.tipo_via;
			modificarJuridico.tipo_via_desc=$('#tipo_via option:selected').text();
            modificarJuridico.nombre_via=response.nombrevia;
            modificarJuridico.numero_casa=response.numero;
            modificarJuridico.edificio=response.edificio;
            modificarJuridico.bloque=response.bloque;
            modificarJuridico.piso=response.piso;
            modificarJuridico.oficina=response.numeroOficina;
            modificarJuridico.fec_vencimiento = document.getElementById('fechaVen').value;
            modificarJuridico.latitud=response.latitud;
            modificarJuridico.longitud=response.longitud;
            modificarJuridico.usr_id=idUsuario;
            modificarJuridico.activacionf=response.activacionf;
            modificarJuridico.activaciond=response.activaciond;                 
            modificarJuridico.file_fotocopia_ci=archivoCI;
            modificarJuridico.file_fotocopia_ci_r=archivoCIR;
            modificarJuridico.file_poder_legal=archivoPOD;
            modificarJuridico.file_test_const=archivoTES;
            modificarJuridico.file_num_ident=archivoNUM;
            modificarJuridico.file_fund_emp=archivoFUD;
            modificarJuridico.file_reg_comer=archivoREG;
            modificarJuridico.dtspsl_acepta_servicios = $scope.acepta_servicios;
            if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
                $scope.nombreFile1 = "";
            };
            modificarJuridico.URL=$scope.nombreFile1;

            modificarJuridico.oid=oidCiudadano; 
            modificarJuridico.modificarJuridico(function(resultado){
                resultadoApi = JSON.parse(resultado);
                if( typeof(resultadoApi.success) != 'undefined')
                {
                    var mensajeExito = "Se realizo la actualizacion de sus datos!";  
                    setTimeout(function(){
                        alertify.success(mensajeExito);  
                    }, 100);					
                }
                else
                {
                    $.unblockUI();                    
                    var mensajeExito = resultadoApi.error.message;
                    alertify.error(mensajeExito); 
                }
				
                $.unblockUI();  
                $('#formModal').modal('hide');
            });
        }
     };

    $scope.verificar = function(reg) {
      $scope.swjur = null;
      var buscarCiudadano = new rcNatural();
      buscarCiudadano.ci = reg.cedula;
      /*if (reg.complemento!=null)
        buscarCiudadano.complemento = reg.complemento;*/
        buscarCiudadano.buscarNatural_c(function(resultado) {
        resultadoApi = JSON.parse(resultado);
        if(resultadoApi.length > 0) {
            
            var repLegalmongo = resultadoApi;
            if(repLegalmongo[0].dtspsl_activaciond == "SI" && repLegalmongo[0].dtspsl_activacionf == "SI"){
              $scope.registro.nombre = repLegalmongo[0].dtspsl_nombres;
              $scope.registro.paterno = repLegalmongo[0].dtspsl_paterno;
              $scope.registro.materno = repLegalmongo[0].dtspsl_materno;
              $scope.registro.tercer = repLegalmongo[0].dtspsl_tercer_apellido; 
              $scope.registro.cedula = repLegalmongo[0].dtspsl_ci;
              $scope.registro.celularRep = repLegalmongo[0].dtspsl_movil;
              $scope.registro.telefonoRep = repLegalmongo[0].dtspsl_telefono;
              $scope.registro.correoRep = repLegalmongo[0].dtspsl_correo;
              $scope.registro.direccionRep = repLegalmongo[0].dtspsl_direccion;
              $scope.registro.expedido = repLegalmongo[0].dtspsl_expedido;
              $scope.registro.fecha_nacimiento = repLegalmongo[0].dtspsl_fec_nacimiento;
              $scope.registro.estado_civil = repLegalmongo[0].dtspsl_id_estado_civil;
              $scope.registro.sexo = repLegalmongo[0].dtspsl_sexo;
              $scope.registro.ocupacion = repLegalmongo[0].dtspsl_ocupacion;
              $scope.registro.otra_profesion = repLegalmongo[0].dtspsl_otra_profesion;
              $scope.registro.profesion = repLegalmongo[0].dtspsl_profesion;
              $scope.registro.lugarNacimiento = repLegalmongo[0].dtspsl_lugar_nacimiento;
            }
            else {
              $scope.swjur = 'mostrar';
              sweetAlert('Persona Registrada', 'Estimado Ciudadano(a). Para registrarse como Persona Jurídica, su cuenta debe ser activada. Para ello debe apersonarse a Plataforma del G.A.M.L.P. ó para más información contactarse con nuestra linea gratuita 800 13 5555', 'warning');
			  
			  $scope.registro.nombre = "";
              $scope.registro.paterno = "";
              $scope.registro.materno = "";
              $scope.registro.tercer = "";
              $scope.registro.cedula = "";
              $scope.registro.celularRep = "";
              $scope.registro.telefonoRep = "";
              $scope.registro.correoRep = "";
              $scope.registro.direccionRep = "";
              $scope.registro.expedido = "";
              $scope.registro.fecha_nacimiento = "";
              $scope.registro.estado_civil = "";
              $scope.registro.sexo = "";
              $scope.registro.ocupacion = "";
              $scope.registro.otra_profesion = "";
              $scope.registro.profesion = "";
              $scope.registro.lugarNacimiento = "";
			  
              $scope.obtDatos="";
              $scope.tablaCiudadanos = null;
              $scope.tablaEmpresas = null;
              $scope.bloquear3 = false;
            } 
        } else {
          sweetAlert('', 'Para registrarse como Persona Jurídica, primero debe registrar, a la Persona Natural!!!', 'warning');
			  $scope.registro.nombre = "";
              $scope.registro.paterno = "";
              $scope.registro.materno = "";
              $scope.registro.tercer = "";
              $scope.registro.cedula = "";
              $scope.registro.celularRep = "";
              $scope.registro.telefonoRep = "";
              $scope.registro.correoRep = "";
              $scope.registro.direccionRep = "";
              $scope.registro.expedido = "";
              $scope.registro.fecha_nacimiento = "";
              $scope.registro.estado_civil = "";
              $scope.registro.sexo = "";
              $scope.registro.ocupacion = "";
              $scope.registro.otra_profesion = "";
              $scope.registro.profesion = "";
              $scope.registro.lugarNacimiento = "";
          $scope.obtDatos="";
          $scope.tablaCiudadanos = null;
          $scope.tablaEmpresas = null;
        }           
      });
    };
		
    $scope.envioMensaje = function(mensaje, email){
       var sMensajeValidacion = mensaje.replace(/ /g, "_");
       var parametros = {
           "cuerpo" : sMensajeValidacion,
           "asunto" : "Registro_GAMLP",
           "para" : email
       }
       $.ajax({ 
           data: parametros, 
           url: CONFIG.SERVICE_ENVIO_CORREO,
           type: 'get', 
           beforeSend: function () { 
           }, 
           success: function (response) { 
           }
       }); 
       swal('', mensaje, 'success');
    }; 
    /******************* Almacenar direccion **********************/ 
    $scope.almacenarDirecion = function(sIdReg){
        var sdireccion   = new reglasnegocio();
        sdireccion.identificador = "RCCIUDADANO_55";
        sdireccion.parametros = '{"dtsdrc_direccion":"' + sDireccion +'","dtsdrc_id_zona":1,"dtsdrc_id_dtspesonales":"' + sIdReg +'","dtsdrc_usr_id":1"}';
        sdireccion.llamarregla(function(results){
             });                
    } 

    $scope.getZonaMD = function() {
        var sgetZona = new reglasnegocio();
        sgetZona.identificador = "RCCIUDADANO_44";
    	sgetZona.parametros='{}';
        $scope.aZonaMD = {};
        sgetZona.llamarregla(function(response){
            response = JSON.parse(response);
            if (response.length > 0) {
               $scope.aZonaMD = response;
           } else {
               $scope.aZonaMD = "";
           }
    });
    };
    /******************** lstmacrodistritos *****************************/
    $scope.actualizaZonaMD = function(dato) {
        var sactualizaZonaMD = new reglasnegocio();
        sactualizaZonaMD.identificador = "RCCIUDADANO_46";
        sactualizaZonaMD.parametros = '{"idz":"' + dato + '"}'; 
        sactualizaZonaMD.llamarregla(function(data){
        data = JSON.parse(data);
        $scope.macrod = data;
        $rootScope.txtMacrodistritoDistrito = $scope.macrod[0].ymdst_macrodistrito;
        $rootScope.idMacrodistritoDistrito = $scope.macrod[0].yzona_mdst_id;
        $scope.registro['zona_mdst_id'] = $scope.macrod[0].yzona_mdst_id;
        $rootScope.txtDistrito = $scope.macrod[0].ydst_distrito;
        $rootScope.idDistrito = $scope.macrod[0].yzona_dst_id;
        $scope.registro['yzona_dst_id'] = $scope.macrod[0].yzona_dst_id;
    });
    };

    $scope.actualizaZonaMD = function(dato) {
        var sactualizaZonaMD = new reglasnegocio();
        sactualizaZonaMD.identificador = "RCCIUDADANO_46";
        sactualizaZonaMD.parametros = '{"idz":"' + dato + '"}'; 
        sactualizaZonaMD.llamarregla(function(data){
    		data = JSON.parse(data);
    		$scope.macrod = data;
    		$rootScope.txtMacrodistritoDistrito = $scope.macrod[0].ymdst_macrodistrito;
    		$rootScope.idMacrodistritoDistrito = $scope.macrod[0].yzona_mdst_id;
    		$scope.registro['zona_mdst_id'] = $scope.macrod[0].yzona_mdst_id;
    		$rootScope.txtDistrito = $scope.macrod[0].ydst_distrito;
    		$rootScope.idDistrito = $scope.macrod[0].yzona_dst_id;
    		$scope.registro['yzona_dst_id'] = $scope.macrod[0].yzona_dst_id;
    	});
    };

    $scope.setRepresentanteLegal = function(dato) {
    	$scope.sw = 0;
    };

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// MAPAS PARA RC ///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////    
    
    var map;
    var mapj;
    var markers = [];
    var markersj = [];

    $scope.initMap = function() {
        var haightAshbury = {
            lat: -16.495635, 
            lng: -68.133543
        };
        map = new google.maps.Map(document.getElementById('mapModificar'), {
            zoom: 15,
            center: haightAshbury,
        });

        mapj = new google.maps.Map(document.getElementById('mapModificarJ'), {
            zoom: 15,
            center: haightAshbury,
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
            $scope.deleteMarkers();
            $scope.registro.latitud = event.latLng.lat();
            $scope.registro.longitud = event.latLng.lng();
            $scope.addMarker(event.latLng);
        });

        mapj.addListener('click', function(event) {
            $scope.deleteMarkersJ();
            $scope.registro.latitud = event.latLng.lat();
            $scope.registro.longitud = event.latLng.lng();
            $scope.addMarkerJ(event.latLng);
        });   
    }
    
    $scope.restaurarmapa    =   function(){
        setTimeout(function(){            
            $scope.mostrarMapa = true;
            google.maps.event.trigger(map, 'resize');
            $scope.abrirMapa();
            $scope.$apply();
        }, 300);
    }
    
    $scope.restaurarmapaJ    =   function(){
        setTimeout(function(){
            $scope.mostrarMapaJ = true;
            google.maps.event.trigger(mapj, 'resize');
            $scope.abrirMapaJ();
            $scope.$apply();
        }, 300);
    }    

    $scope.addMarker = function(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
    });
      markers.push(marker);
  }

  $scope.addMarkerJ = function(location) {
      var markerj = new google.maps.Marker({
        position: location,
        map: mapj
    });
      markersj.push(markerj);
  }

    $scope.setMapOnAll = function(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

	$scope.setMapOnAllJ = function(mapj) {
		for (var i = 0; i < markersj.length; i++) {
			markersj[i].setMap(mapj);
		}
	}

    $scope.clearMarkers = function() {
      $scope.setMapOnAll(null);
  }

  $scope.clearMarkersJ = function() {
      $scope.setMapOnAllJ(null);
  }

    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
      $scope.setMapOnAll(map);
  }

  $scope.showMarkersJ = function() {
      $scope.setMapOnAllJ(mapj);
  }


    $scope.deleteMarkers = function() {
      $scope.clearMarkers();
      markersj = [];
  }

  $scope.deleteMarkersJ = function() {
      $scope.clearMarkersJ();
      markersj = [];
  }

  $scope.abrirMapa = function () {
        google.maps.visualRefresh = true;
        $scope.mostrarMapa = true;
        if( 
            (typeof($scope.registro.latitud) !=  'undefined' && $scope.registro.latitud  != "" && $scope.registro.latitud != 0 && $scope.registro.latitud != "0") &&
            (typeof($scope.registro.longitud) != 'undefined' && $scope.registro.longitud != "" && $scope.registro.longitud != 0 && $scope.registro.longitud != "0")
            ){
            var nuevoUbicacion = {
                lat: parseFloat($scope.registro.latitud), 
                lng: parseFloat($scope.registro.longitud)
            };

            //map.setCenter(nuevoUbicacion);
            $scope.addMarker(nuevoUbicacion);
            $scope.open_map_registroN(nuevoUbicacion);

        }else{
            var nuevoUbicacion = {
                lat: -16.495635, 
                lng: -68.133543
            };
            //map.setCenter(nuevoUbicacion);
            $scope.addMarker(nuevoUbicacion);
            $scope.open_map_registroN(nuevoUbicacion);
        }         
    }

    $scope.abrirMapaJ = function () {
        google.maps.visualRefresh = true;
        $scope.mostrarMapaJ = true;
        if( 
            (typeof($scope.registro.latitud) !=  'undefined' && $scope.registro.latitud  != "" && $scope.registro.latitud != 0 && $scope.registro.latitud != "0") &&
            (typeof($scope.registro.longitud) != 'undefined' && $scope.registro.longitud != "" && $scope.registro.longitud != 0 && $scope.registro.longitud != "0")
            ){
            var nuevoUbicacion = {
                lat: parseFloat($scope.registro.latitud), 
                lng: parseFloat($scope.registro.longitud)
            };
            $scope.open_map_registroJ(nuevoUbicacion)


            //mapj.setCenter(nuevoUbicacion);
            $scope.addMarkerJ(nuevoUbicacion);
        }else{
            var nuevoUbicacion = {
                lat: -16.495635, 
                lng: -68.133543
            };
            $scope.open_map_registroJ(nuevoUbicacion)

            mapj.setCenter(nuevoUbicacion);
            $scope.addMarkerJ(nuevoUbicacion);
        }         
    }

    ///////////////////////MAPA GIS///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    var epsg32719 = 'EPSG:32719';
    var epsg4326 = 'EPSG:4326';
    proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
    proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var view = new ol.View({center: ol.proj.fromLonLat([-68.133605,-16.495745]), zoom: 18});
    var vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({ source: vectorSource });
    var iconStyle_1 = new ol.style.Style({
      image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({color: 'red'})
                                })
    });

    var osm = new ol.layer.Tile({
      title: 'Open Street Map',
      visible: true,
      source: new ol.source.OSM()
    });

    var osm_udit = new ol.layer.Tile({
      title: 'OSM',
      visible: true,
      render: 'canvas',
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.6.46:8080/geoserver/DEGEM/wms',
                                      params: {'LAYERS': 'DEGEM:osm_udit', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                      serverType: 'geoserver',
                                      crossOriginKeyword: 'anonymous'
                                    })
    });
            
    var municipios = new ol.layer.Tile({
      title: 'Municipios',
      visible: false,
      render: 'canvas',
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.5.84:8080/geoserver/wms',
                                      params: { 'LAYERS': 'mapa_municipio', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
                                      serverType: 'geoserver',
                                      crossOrigin: 'Anonymous'
                                    })
    });
       
    var zonas_tributarias = new ol.layer.Tile({
      title: 'Zonas Tributarias',
      opacity: 0.3,
      visible: false,
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.5.84:8080/geoserver/wms',
                                      params: { 'LAYERS': 'catastro:zonasvalor2015', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
                                      serverType: 'geoserver',
                                      crossOrigin: 'Anonymous'
                                    })
    });

    var zonas = new ol.layer.Tile({
      title: 'Zonas',
      opacity: 0.3,
      visible: false,
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.5.84:8080/geoserver/wms',
                                      params: { 'LAYERS': 'sit:zonasgu2016', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
                                      serverType: 'geoserver',
                                      crossOrigin: 'Anonymous'
                                    })
    });

    var vias = new ol.layer.Tile({
      title: 'Vias',
      //opacity: 0.3,
      visible: true,
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.5.84:8080/geoserver/wms',
                                      params: { 'LAYERS': 'catastro:vias2', 'VERSION': '1.1.1', 'FORMAT': 'image/png','TILED': true },
                                      serverType: 'geoserver',
                                      crossOrigin: 'Anonymous'
                                    })
    });

    var macrodistritos = new ol.layer.Tile({
      title: 'Macrodistritos',
      //opacity: 0.3,
      visible: true,
      source: new ol.source.TileWMS({
                                      url: 'http://192.168.5.84:8080/geoserver/wms',
                                      params: { 'LAYERS': 'lapaz:macrodistritos_2019', 'VERSION': '1.1.1', 'FORMAT': 'image/png','STYLES':'lp_macrodistritos2019','TILED': true },
                                      serverType: 'geoserver',
                                      crossOrigin: 'Anonymous'
                                    })
    });

    var vectorLayerZonas = new ol.layer.Vector();

    var myStyleZonas = new ol.style.Style({
      stroke : new ol.style.Stroke({color : 'orange',width : 3}),
      fill : new ol.style.Fill({color: 'transparent'})
    });

    var style = new ol.style.Style({
      image: new ol.style.Icon(({
                                  //color: '#ff0000',
                                  crossOrigin: 'anonymous',
                                  src: '../img/dot_2.png'
                              }))
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Circle({
                                  radius: 7,
                                  fill: new ol.style.Fill({color: 'red'})
                                })
    });

    var mapa,datos;
    

    $scope.open_map_registroN = function(nuevoUbicacion)
    {
        //document.getElementById('busqueda_p').style.display = 'inline';
        //document.getElementById('boton1').style.display = 'inline';

        var latitud = nuevoUbicacion.lat;
        var longitud = nuevoUbicacion.lng;
        //var mapa = new ol.Map();  
        
        setTimeout(function()
        {
          var style = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({color: 'red'})
              })
          });

          var iconStyle = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                      color: 'red'
                  })
              })
          });

          $("#mapModificar_1").empty();
            //////////////////////////////////////////////////////////////////
          var epsg32719 = 'EPSG:32719';
          var epsg4326 = 'EPSG:4326';
          proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
          proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
          ////////////////////////////////////////////////////////////////////////
          $scope.mapa = new ol.Map({
              layers: [
                  new ol.layer.Group({
                      title: 'Mapas Base',
                      layers: [
                          osm,
                          municipios,
                          zonas_tributarias,
                          //zonas,
                          vias,
                          //lotes_1,
                          vectorLayer
                        ]
                    })    
                                //  ,
                                //  new ol.layer.Group({
                                //                        title: 'Capas',
                                //                        layers: [
                                //                               
                                //                                ]
                                //                    })
                                //  
                ],
                //overlays: [featureOverlay],
                target: 'mapModificar_1',
                //controls: controls,
                //interactions: mover,
                view: view
          });
          var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
          $scope.mapa.addControl(layerSwitcher);
          ////////////////////////////////////////////////////////////////////////
          vectorLayer.getSource().clear();

          if (isNaN(latitud) && isNaN(longitud))
          {
              console.log("no existe Lat y Lon o son undefined");
          }
          else
          {
              if(latitud === '' || longitud === '')
              {
                  console.log("lat y lon son cadena vacia");
                  map.getView().setCenter(ol.proj.fromLonLat([-68.133605,-16.495745]));
                  map.getView().setZoom(16);
              }
              else
              {
                  console.log("existe lat y lon");
                  latitud = parseFloat(latitud);
                  longitud = parseFloat(longitud);
                  var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                  feature.setStyle(style);
                  vectorSource.addFeature(feature);
                  $scope.mapa.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                  $scope.mapa.getView().setZoom(15);
              }  
          }
          ////////////////////////////////////////////////////////////////////////
          var n_genesis = geo_id_genesis.length;
          //console.log("n_id_gene...",n_genesis);
          //console.log("n_id_sit...",geo_id_sit.length);
          console.log("n_id_serv...",geo_id_sit_servicio.length);
          $scope.mapa.on('click', function (evt)
          {
            vectorSource.clear();
            var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
            var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
            var wkt = '';
            var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
            var latitud = centro_1[1];
            var longitud = centro_1[0];
            wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
            
            $scope.registro.longitud = longitud;
            $scope.registro.latitud = latitud;
            /////////////////////////////////////////////////////////////////////
            var feature = $scope.mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                return feature;
            });
            if (feature){
                var coord = feature.getGeometry().getCoordinates();
                var props = feature.getProperties();
            }
            else
            {
              //alert();
              var url_zonas_tributarias = zonas_tributarias.getSource().getGetFeatureInfoUrl(
                evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                  'INFO_FORMAT': 'application/json',
                  'propertyName': 'grupovalor'
                }
              );

              var url_zonas = zonas.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'zona,macrodistrito,subalcaldia,codigozona,macro,distrito'
                  }
              );
              
              var url_vias = vias.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'nombrevia,tipovia'
                  }
              );
              var url_lotes = lotes_1.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'codigocatastral'
                  }
              );
              reqwest({
                  url: url_zonas_tributarias,
                  type: 'json',
              }).then(function(data) {
                var feature = data.features[0];
                ///////////////////////////////////////////////////////////
                var cod = feature.properties;
                var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                console.log("codigo zona tributaria: ",codigo_zona_tributaria);
                ///////////////////////////////////////////////////////////
              });
              reqwest({
                  url: url_zonas,
                  type: 'json',
              }).then(function(data) {
                var feature = data.features[0];

                ///////////////////////////////////////////////////////////
                var cod = feature.properties;
                var zona = cod.zona;
                var macrodistrito = cod.macrodistrito;
                var cod_zona= cod.codigozona;
                var distrito= cod.distrito;
                /////////////////////////////////////////////
                //console.log("hhhhh",n_genesis);
                for (var i=0;i<n_genesis;i++) {
                    if(geo_id_sit_servicio[i ]=== cod_zona) {
                        cod_zona_genesis = geo_id_genesis[i];
                        console.log("cod zona genesis: ",cod_zona_genesis);
                    }
                }
                /////////////////////////////////////////////
                console.log("zona: ",zona);
                console.log("macrodistrito: ",macrodistrito);
                console.log("distrito: ",distrito);
              });
              
              reqwest({
                  url: url_vias,
                  type: 'json',
              }).then(function(data) 
              {
                var feature = data.features[0];
                if(feature === undefined)
                {
                    console.log("No se encuentran datos para vias...");
                }
                else
                {
                    //////////////////////////////////////////////////////////
                    var cod = feature.properties;
                    var nombre_via = cod.nombrevia;
                    var tipo_via = cod.tipovia;
                    console.log("nombre via: ",nombre_via);
                    console.log("tipo via: ",tipo_via);
                    //////////////////////////////////////////////////////////
                }
              });
            }
            /////////////////////////////////////////////////////////////////////
            var feature = new ol.Feature(
              new ol.geom.Point(ol.proj.fromLonLat(centro_1))
            );
            feature.setStyle(iconStyle);
            vectorSource.addFeature(feature);
          });
        },500);    
    };

    $scope.open_map_registroJ = function(nuevoUbicacion)
    {
        //document.getElementById('busqueda_p').style.display = 'inline';
        //document.getElementById('boton1').style.display = 'inline';

        var latitud = nuevoUbicacion.lat;
        var longitud = nuevoUbicacion.lng;

        setTimeout(function()
        {
          var style = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({color: 'red'})
              })
          });

          var iconStyle = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                      color: 'red'
                  })
              })
          });

          $("#mapModificarJ_1").empty();
            //////////////////////////////////////////////////////////////////
          var epsg32719 = 'EPSG:32719';
          var epsg4326 = 'EPSG:4326';
          proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
          proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
          ////////////////////////////////////////////////////////////////////////
          $scope.mapa = new ol.Map({
              layers: [
                  new ol.layer.Group({
                      title: 'Mapas Base',
                      layers: [
                          osm,
                          municipios,
                          zonas_tributarias,
                          //zonas,
                          vias,
                          //lotes_1,
                          vectorLayer
                        ]
                    })    
                                //  ,
                                //  new ol.layer.Group({
                                //                        title: 'Capas',
                                //                        layers: [
                                //                               
                                //                                ]
                                //                    })
                                //  
                ],
                //overlays: [featureOverlay],
                target: 'mapModificarJ_1',
                //controls: controls,
                //interactions: mover,
                view: view
          });
          var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
          $scope.mapa.addControl(layerSwitcher);
          ////////////////////////////////////////////////////////////////////////
          vectorLayer.getSource().clear();

          if (isNaN(latitud) && isNaN(longitud))
          {
              console.log("no existe Lat y Lon o son undefined");
          }
          else
          {
              if(latitud === '' || longitud === '')
              {
                  console.log("lat y lon son cadena vacia");
                  map.getView().setCenter(ol.proj.fromLonLat([-68.133605,-16.495745]));
                  map.getView().setZoom(16);
              }
              else
              {
                  console.log("existe lat y lon");
                  latitud = parseFloat(latitud);
                  longitud = parseFloat(longitud);
                  var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                  feature.setStyle(style);
                  vectorSource.addFeature(feature);
                  $scope.mapa.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                  $scope.mapa.getView().setZoom(15);
              }  
          }
          ////////////////////////////////////////////////////////////////////////
          var n_genesis = geo_id_genesis.length;
          $scope.mapa.on('click', function (evt)
          {
            vectorSource.clear();
            var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
            var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
            var wkt = '';
            var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
            var latitud = centro_1[1];
            var longitud = centro_1[0];
            wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
            
            console.log("latitud:",latitud);
            console.log("longitud:",longitud);

            $scope.registro.longitud = longitud;
            $scope.registro.latitud = latitud;
            /////////////////////////////////////////////////////////////////////
            var feature = $scope.mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                return feature;
            });
            if (feature){
                var coord = feature.getGeometry().getCoordinates();
                var props = feature.getProperties();
            }
            else
            {
              //alert();
              var url_zonas_tributarias = zonas_tributarias.getSource().getGetFeatureInfoUrl(
                evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                  'INFO_FORMAT': 'application/json',
                  'propertyName': 'grupovalor'
                }
              );

              var url_zonas = zonas.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'zona,macrodistrito,subalcaldia,codigozona,macro,distrito'
                  }
              );
              
              var url_vias = vias.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'nombrevia,tipovia'
                  }
              );
              var url_lotes = lotes_1.getSource().getGetFeatureInfoUrl(
                  evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                      'INFO_FORMAT': 'application/json',
                      'propertyName': 'codigocatastral'
                  }
              );
              reqwest({
                  url: url_zonas_tributarias,
                  type: 'json',
              }).then(function(data) {
                var feature = data.features[0];
                ///////////////////////////////////////////////////////////
                var cod = feature.properties;
                var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                console.log("codigo zona tributaria: ",codigo_zona_tributaria);
                ///////////////////////////////////////////////////////////
              });
              reqwest({
                  url: url_zonas,
                  type: 'json',
              }).then(function(data) {
                var feature = data.features[0];

                ///////////////////////////////////////////////////////////
                var cod = feature.properties;
                var zona = cod.zona;
                var macrodistrito = cod.macrodistrito;
                var cod_zona= cod.codigozona;
                var distrito= cod.distrito;
                console.log("cod zona serv sit: ",cod_zona);
                /////////////////////////////////////////////
                //console.log("hhhhh",n_genesis);
                for (var i=0;i<n_genesis;i++) {
                    if(geo_id_sit_servicio[i ]=== cod_zona) {
                        cod_zona_genesis = geo_id_genesis[i];
                        console.log("cod zona genesis: ",cod_zona_genesis);
                    }
                }
                /////////////////////////////////////////////
                console.log("zona: ",zona);
                console.log("macrodistrito: ",macrodistrito);
                console.log("distrito: ",distrito);
              });
              
              reqwest({
                  url: url_vias,
                  type: 'json',
              }).then(function(data) 
              {
                var feature = data.features[0];
                if(feature === undefined)
                {
                    console.log("No se encuentran datos para vias...");
                }
                else
                {
                    //////////////////////////////////////////////////////////
                    var cod = feature.properties;
                    var nombre_via = cod.nombrevia;
                    var tipo_via = cod.tipovia;
                    console.log("nombre via: ",nombre_via);
                    console.log("tipo via: ",tipo_via);
                    //////////////////////////////////////////////////////////
                }
              });
            }
            /////////////////////////////////////////////////////////////////////
            var feature = new ol.Feature(
              new ol.geom.Point(ol.proj.fromLonLat(centro_1))
            );
            feature.setStyle(iconStyle);
            vectorSource.addFeature(feature);
          });
        },500);   
    };

    $scope.buscar_ubicacion_p = function()
    {
      var nombre_1 = new Array();
      var f = '';
      //var nombre = $("#busqueda_p1").val();
      var nombre_j = document.getElementById('busqueda_pj').value;
      var nombre_n = document.getElementById('busqueda_pn').value;
      if(nombre_j === '')
      {
        var nombre = nombre_n;
      }
      else
      {
        var nombre = nombre_j;
      }
      nombre = nombre.toUpperCase();
      console.log(nombre);
      var ca = "CALLE ";
      ca = ca.concat(nombre);
      var c = 0;
      /////////////////////////////
      var tipo = "lugares";
      var data = '';
      ///////////////////////////////
      if(nombre==='')
      {
        var obj = {'nombre':'INTRODUZCA DATOS!!!...'};
        console.log("Vacio :",obj);
        //map.removeLayer(vectorLayerZonas);
        vectorLayerZonas.getSource().clear();
      }
      else
      {  
        if(tipo == 'lugares')
        {
          $scope.mapa.removeLayer(vectorLayerZonas);
          for (var i=0;i<geo_zonas.features.length;i++)
          {
            var nombre_zona =  geo_zonas.features[i].properties.zonaref;
            var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
            var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
            if(nombre === nombre_zona)
            {
              c=c+1;
              var geo_zona =  geo_zonas.features[i];
              var xx = x_c;
              var yy = y_c;
            }
          }
          if(c>0)
          {
            //alert("mapa_principal");
            geo_zona = JSON.stringify(geo_zona);
            vectorLayerZonas.setSource(new ol.source.Vector({
                                                         features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
            }));

            vectorLayerZonas.setStyle(myStyleZonas);

            $scope.mapa.addLayer(vectorLayerZonas);
            $scope.mapa.getView().setCenter([xx,yy]);
            $scope.mapa.getView().setZoom(15);

            setTimeout(function(){
              //alert();
              vectorLayerZonas.getSource().clear();
            },2400);

          }
        }
        if(c==0)
        {
          var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
          console.log("Vacio :",obj);
        }
      }   
    };

    ////////////////////////////////////////////////////////////////

    $scope.cerrarMapa = function () {
        $scope.mostrarMapa = false;
    };

    $scope.cerrarMapaJ = function () {
        $scope.mostrarMapaJ = false;
    };

    $scope.primeraCargaMapa = function () {
        $scope.mostrarMapa = true;
        $scope.mostrarMapaJ = true;
        setTimeout(function(){ 
            $scope.cerrarMapa();
        },2000);
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

    $scope.$on('api:ready',function(){
        $scope.getDatosRegistro();
        //$scope.estado_Civil();
        $scope.getZonaMD();  
        //$scope.combopais(); 
        //$scope.combodepa();
        $scope.getProfesion();
        $scope.MacroZona();
        if(typeof(google) != "undefined"){ 
            google.maps.visualRefresh = true;
        }
        $scope.initMap();
    });

    $scope.validarFormularioDocumentos = function () {
        if($rootScope.validacionDocumentos){
            var stab = $rootScope.validacionDocumentos;
            setTimeout(function(){
                $('#' + stab).tab('show');
            }, 1000);
        }
    };    

    $scope.inicioEstadoCivil = function () {
        $scope.getDatosRegistro();
        //$scope.estado_Civil();
        $scope.getZonaMD();
        //$scope.combopais();
        //$scope.combodepa();
        $scope.getProfesion();
        $scope.habilitarForm();
        $scope.MacroZona();
        $scope.validarFormularioDocumentos();
        if(typeof(google) != "undefined"){ 
            google.maps.visualRefresh = true;
        }
    };
        
    $scope.habilitarForm = function()
    {
        var habilitar   =   $rootScope.habilitartab;
        if(habilitar    ==  'si'){
            $scope.active2 = "active";
            $scope.active = "";            
        }else{
            $scope.active = "active";
            $scope.active2 = "";     
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
        
    //Documentos Adjuntos
    $scope.cambiarFile = function(obj, valor){
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        $.blockUI();  
        setTimeout(function(){ 
            var nombre = obj.getAttribute("name");
            var tamaniofile = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
            if (nombre == 'FILE_FOTOCOPIA_CI' && (typeof(obj.files[0]) != 'undefined')) {
                var tipoDocci = obj.files[0].name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[1];
                var nombreci = nameArrayci[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocci == "png" || tipoDocci == "jpg" || tipoDocci == "jpeg" || tipoDocci == "bmp" || tipoDocci == "gif" || tipoDocci == "PNG" || tipoDocci == "JPG" || tipoDocci == "JPEG" || tipoDocci == "BMP" || tipoDocci == "GIF") {
                        var filecompress = compressImage($scope.FILE_FOTOCOPIA_CI).then(function(respuestaci){
                            var imagenCia = respuestaci.name.split('.');
                            var tipoCia = imagenCia[1];
                            nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.'+tipoCia;
                            fileUpload1.uploadFileToUrl1(respuestaci, uploadUrl, nombreNuevoCIAnverso);
                            $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                            $scope.FILE_FOTOCOPIA_CI = respuestaci;
                            document.getElementById('txt_FILE_FOTOCOPIA_CI').value = nombreNuevoCIAnverso;                         
                            $scope.btover=true;
                        });
                    } else{
                        if (tipoDocci == 'pdf' ||  tipoDocci == 'docx' ||  tipoDocci == 'docxlm' || tipoDocci == 'PDF' ||  tipoDocci == 'DOCX' ||  tipoDocci == 'DOCXML') {
                            var zipci = new JSZip();
                            zipci.file($scope.FILE_FOTOCOPIA_CI.name, $scope.FILE_FOTOCOPIA_CI);
                            zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobci) {
                                nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobci, uploadUrl, nombreNuevoCIAnverso);
                                $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                                $scope.FILE_FOTOCOPIA_CI = blobci; 
                                $scope.btover=true; 
                                document.getElementById('txt_FILE_FOTOCOPIA_CI').value = nombreNuevoCIAnverso;                         
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                            document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                            $scope.registro.FILE_FOTOCOPIA_CI = '';
                            $scope.FILE_FOTOCOPIA_CI = '';
                            valor = '';
                            $.unblockUI();
                        };                        
                    };
                }  
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm' || tipoDocci == 'PNG' || tipoDocci == 'JPG' || tipoDocci == 'JPEG' || tipoDocci == 'BMP' || tipoDocci == 'GIF' || tipoDocci == 'PDF' || tipoDocci == 'DOCX' || tipoDocci == 'DOCXML') {
                            nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.'+tipoDocci;
                            fileUpload1.uploadFileToUrl1($scope.FILE_FOTOCOPIA_CI, uploadUrl,nombreNuevoCIAnverso);
                            $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                            $scope.btover=true;
                            document.getElementById('txt_FILE_FOTOCOPIA_CI').value = nombreNuevoCIAnverso;                         
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                            document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                            $scope.registro.FILE_FOTOCOPIA_CI = '';
                            $scope.FILE_FOTOCOPIA_CI = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                        document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                        document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                        $scope.registro.FILE_FOTOCOPIA_CI = '';
                        $scope.FILE_FOTOCOPIA_CI = '';
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
            if ($scope.registro.FILE_FOTOCOPIA_CI == '') {
                document.getElementById("fechaVen").disabled=true;
            } else{
                document.getElementById("fechaVen").disabled=false;
            };
            if(nombre == 'FILE_FOTOCOPIA_CI_R' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDoccir = obj.files[0].name;
                var nameArraycir = tipoDoccir.split('.');
                tipoDoccir = nameArraycir[1];                
                var nombrecir = nameArraycir[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDoccir == "png" || tipoDoccir == "jpg" || tipoDoccir == "jpeg" || tipoDoccir == "bmp" || tipoDoccir == "gif"  ||  tipoDoccir == "PNG" || tipoDoccir == "JPG" || tipoDoccir == "JPEG" || tipoDoccir == "BMP" || tipoDoccir == "GIF") {
                        var filecompress = compressImage($scope.FILE_FOTOCOPIA_CI_R).then(function(respuestacir){
                            var imagenCir = respuestacir.name.split('.');
                            var tipoCir = imagenCir[1];
                            nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.'+tipoCir;
                            fileUpload1.uploadFileToUrl1(respuestacir, uploadUrl,nombreNuevoCIReverso);
                            $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                            $scope.FILE_FOTOCOPIA_CI_R = respuestacir;
                            $scope.btover1=true;
                        });
                    } else{
                        if (tipoDoccir == 'pdf' ||  tipoDoccir == 'docx' ||  tipoDoccir == 'docxlm'  ||   tipoDoccir == 'PDF' ||  tipoDoccir == 'DOCX' ||  tipoDoccir == 'DOCXML') {
                            var zipcir = new JSZip();
                            zipcir.file($scope.FILE_FOTOCOPIA_CI_R.name, $scope.FILE_FOTOCOPIA_CI_R);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobcir) {
                                nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl,nombreNuevoCIReverso);
                                $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                                $scope.FILE_FOTOCOPIA_CI_R = blobcir; 
                                $scope.btover1=true;
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
                            document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
                            $scope.registro.FILE_FOTOCOPIA_CI_R = '';
                            $scope.FILE_FOTOCOPIA_CI_R = '';                            
                            valor = '';
                            $.unblockUI();
                        };                        
                    };
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDoccir == 'png' || tipoDoccir == 'jpg' || tipoDoccir == 'jpeg' || tipoDoccir == 'bmp' || tipoDoccir == 'gif' || tipoDoccir == 'pdf' || tipoDoccir == 'docx' || tipoDoccir == 'docxlm'  ||  tipoDoccir == 'PNG' || tipoDoccir == 'JPG' || tipoDoccir == 'JPEG' || tipoDoccir == 'BMP' || tipoDoccir == 'GIF' || tipoDoccir == 'PDF' || tipoDoccir == 'DOCX' || tipoDoccir == 'DOCXML') {
                            nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.'+tipoDoccir;
                            fileUpload1.uploadFileToUrl1($scope.FILE_FOTOCOPIA_CI_R, uploadUrl,nombreNuevoCIReverso);
                            $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                            $scope.btover1=true;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
                            document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
                            $scope.registro.FILE_FOTOCOPIA_CI_R = '';
                            $scope.FILE_FOTOCOPIA_CI_R = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                        document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
                        document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
                        $scope.registro.FILE_FOTOCOPIA_CI_R = '';
                        $scope.FILE_FOTOCOPIA_CI_R = '';                           
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
            if(nombre == 'FILE_PODER_LEGAL' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDocpl = obj.files[0].name;
                var nameArraypl = tipoDocpl.split('.');
                tipoDocpl = nameArraypl[1];
                var nombrepl = nameArraypl[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocpl == "png" || tipoDocpl == "jpg" || tipoDocpl == "jpeg" || tipoDocpl == "bmp" || tipoDocpl == "gif"  ||  tipoDocpl == "PNG" || tipoDocpl == "JPG" || tipoDocpl == "JPEG" || tipoDocpl == "BMP" || tipoDocpl == "GIF") {
                        var filecompress = compressImage($scope.FILE_PODER_LEGAL).then(function(respuestapl){
                            var imagenPoder = respuestapl.name.split('.');
                            var tipoPoder = imagenPoder[1];
                            nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.'+tipoPoder;
                            fileUpload1.uploadFileToUrl1(respuestapl, uploadUrl, nombreNuevoPoderLegal);
                            $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
                            $scope.FILE_PODER_LEGAL = respuestapl;
                        });
                    } else{
                        if (tipoDocpl == 'pdf' ||  tipoDocpl == 'docx' ||  tipoDocpl == 'docxlm'  ||  tipoDocpl == 'PDF' ||  tipoDocpl == 'DOCX' ||  tipoDocpl == 'DOCXML') {
                            nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.'+tipoDocpl;
                            fileUpload1.uploadFileToUrl1($scope.FILE_PODER_LEGAL, uploadUrl,nombreNuevoPoderLegal);
                            $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
                            /*var zippl = new JSZip();
                            zippl.file($scope.FILE_PODER_LEGAL.name, $scope.FILE_PODER_LEGAL);
                            zippl.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobpl) {
                                nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobpl, uploadUrl,nombreNuevoPoderLegal);
                                $scope.registro.FILE_PODER_LEGAL = blobpl.name;
                                $scope.FILE_PODER_LEGAL = blobpl;                            
                            })*/
                        }
                        else{
                            swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                            document.getElementById('FILE_PODER_LEGAL').value = '';
                            $scope.registro.FILE_PODER_LEGAL = '';
                            $scope.FILE_PODER_LEGAL = '';
                            valor = '';
                            $.unblockUI();
                        };                       
                    };  
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocpl == 'png' || tipoDocpl == 'jpg' || tipoDocpl == 'jpeg' || tipoDocpl == 'bmp' || tipoDocpl == 'gif' || tipoDocpl == 'pdf' || tipoDocpl == 'docx' || tipoDocpl == 'docxlm'  ||  tipoDocpl == 'PNG' || tipoDocpl == 'JPG' || tipoDocpl == 'JPEG' || tipoDocpl == 'BMP' || tipoDocpl == 'GIF' || tipoDocpl == 'PDF' || tipoDocpl == 'DOCX' || tipoDocpl == 'DOCXML') {
                            nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.'+tipoDocpl;
                            fileUpload1.uploadFileToUrl1($scope.FILE_PODER_LEGAL, uploadUrl,nombreNuevoPoderLegal);
                            $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                            document.getElementById('FILE_PODER_LEGAL').value = '';
                            $scope.registro.FILE_PODER_LEGAL = '';
                            $scope.FILE_PODER_LEGAL = '';                            
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño del archivo PODER DEL REPRESENTANTE LEGAL es muy grande', 'error');
                        document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                        document.getElementById('FILE_PODER_LEGAL').value = '';
                        $scope.registro.FILE_PODER_LEGAL = '';
                        $scope.FILE_PODER_LEGAL = '';                        
                        valor = '';
                        $.unblockUI();
                    }
                }
            }
            if(nombre == 'FILE_TEST_CONST' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDoctc = obj.files[0].name;
                var nameArraytc = tipoDoctc.split('.');
                tipoDoctc = nameArraytc[1];
                var nombretc = nameArraytc[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDoctc == "png" || tipoDoctc == "jpg" || tipoDoctc == "jpeg" || tipoDoctc == "bmp" || tipoDoctc == "gif"  || tipoDoctc == "PNG" || tipoDoctc == "JPG" || tipoDoctc == "JPEG" || tipoDoctc == "BMP" || tipoDoctc == "GIF") {
                        var filecompress = compressImage($scope.FILE_TEST_CONST).then(function(respuestatc){
                            var imagenTestimonio = respuestatc.name.split('.');
                            var tipoT = imagenTestimonio[1];
                            nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.'+tipoT;
                            fileUpload1.uploadFileToUrl1(respuestatc, uploadUrl,nombreNuevoTestimonio);
                            $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                            $scope.FILE_TEST_CONST = respuestatc;
                        });
                    } else{
                        if (tipoDoctc == 'pdf' ||  tipoDoctc == 'docx' ||  tipoDoctc == 'docxlm'   ||   tipoDoctc == 'PDF' ||  tipoDoctc == 'DOCX' ||  tipoDoctc == 'DOCXML') {
                            var ziptc = new JSZip();
                            ziptc.file($scope.FILE_TEST_CONST.name, $scope.FILE_TEST_CONST);
                            ziptc.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobtc) {
                                nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobtc, uploadUrl,nombreNuevoTestimonio);
                                $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                                $scope.FILE_TEST_CONST = blobtc;                            
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo TESTIMONIO DE CONSTITUCION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_TEST_CONST').value = '';
                            document.getElementById('FILE_TEST_CONST').value = '';
                            $scope.registro.FILE_TEST_CONST = '';
                            $scope.FILE_TEST_CONST = '';
                            valor = '';
                            $.unblockUI();
                        };                        
                    };  
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDoctc == 'png' || tipoDoctc == 'jpg' || tipoDoctc == 'jpeg' || tipoDoctc == 'bmp' || tipoDoctc == 'gif' || tipoDoctc == 'pdf' || tipoDoctc == 'docx' || tipoDoctc == 'docxlm'   ||   tipoDoctc == 'PNG' || tipoDoctc == 'JPG' || tipoDoctc == 'JPEG' || tipoDoctc == 'BMP' || tipoDoctc == 'GIF' || tipoDoctc == 'PDF' || tipoDoctc == 'DOCX' || tipoDoctc == 'DOCXML') {
                            nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.'+tipoDoctc;
                            fileUpload1.uploadFileToUrl1($scope.FILE_TEST_CONST, uploadUrl, nombreNuevoTestimonio);
                            $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo TESTIMONIO DE CONSTITUCION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_TEST_CONST').value = '';                            
                            document.getElementById('FILE_TEST_CONST').value = '';
                            $scope.registro.FILE_TEST_CONST = '';
                            $scope.FILE_TEST_CONST = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño del archivo TESTIMONIO DE CONSTITUCION es muy grande', 'error');
                        document.getElementById('FILE_TEST_CONST').value = '';
                        document.getElementById('txt_FILE_TEST_CONST').value = '';
                        $scope.registro.FILE_TEST_CONST = '';
                        $scope.FILE_TEST_CONST = '';
                        valor = '';
                        $.unblockUI();
                    }
                }
            }
            if(nombre == 'FILE_NUM_IDENT' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDocnu = obj.files[0].name;
                var nameArraynu = tipoDocnu.split('.');
                tipoDocnu = nameArraynu[1];
                var nombrenu = nameArraynu[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocnu == "png" || tipoDocnu == "jpg" || tipoDocnu == "jpeg" || tipoDocnu == "bmp" || tipoDocnu == "gif" || tipoDocnu == "PNG" || tipoDocnu == "JPG" || tipoDocnu == "JPEG" || tipoDocnu == "BMP" || tipoDocnu == "GIF") {
                        var filecompress = compressImage($scope.FILE_NUM_IDENT).then(function(respuestani){
                            var imagenNit = respuestani.name.split('.');
                            var tipoTest = imagenNit[1];
                            nombreNuevoNit = 'nit_'+fechaNueva+'.'+tipoTest;
                            fileUpload1.uploadFileToUrl1(respuestani, uploadUrl, nombreNuevoNit);
                            $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                            $scope.FILE_NUM_IDENT = respuestani;
                        });
                    } else{
                        if (tipoDocnu == 'pdf' ||  tipoDocnu == 'docx' ||  tipoDocnu == 'docxlm'  || tipoDocnu == 'PDF' ||  tipoDocnu == 'DOCX' ||  tipoDocnu == 'DOCXML') {
                            nombreNuevoNit = 'nit_'+fechaNueva+'.'+tipoDocnu;
                            fileUpload1.uploadFileToUrl1($scope.FILE_NUM_IDENT, uploadUrl, nombreNuevoNit);
                            $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                            $.unblockUI();
                            /*var zipnu = new JSZip();
                            zipnu.file($scope.FILE_NUM_IDENT.name, $scope.FILE_NUM_IDENT);
                            zipnu.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobni) {
                                nombreNuevoNit = 'nit_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobni, uploadUrl, nombreNuevoNit);
                                $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                                $scope.FILE_NUM_IDENT = blobni;                            
                            })*/
                        }
                        else{
                            swal('Advertencia', 'El archivo NUMERO DE IDENTIFICACION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('FILE_NUM_IDENT').value = '';
                            document.getElementById('txt_FILE_NUM_IDENT').value = '';
                            $scope.registro.FILE_NUM_IDENT = '';
                            $scope.FILE_NUM_IDENT = '';
                            valor = '';
                            $.unblockUI();
                        };                        
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocnu == 'png' || tipoDocnu == 'jpg' || tipoDocnu == 'jpeg' || tipoDocnu == 'bmp' || tipoDocnu == 'gif' || tipoDocnu == 'pdf' || tipoDocnu == 'docx' || tipoDocnu == 'docxlm'  ||   tipoDocnu == 'PNG' || tipoDocnu == 'JPG' || tipoDocnu == 'JPEG' || tipoDocnu == 'BMP' || tipoDocnu == 'GIF' || tipoDocnu == 'PDF' || tipoDocnu == 'DOCX' || tipoDocnu == 'DOCXML') {
                            nombreNuevoNit = 'nit_'+fechaNueva+'.'+tipoDocnu;
                            fileUpload1.uploadFileToUrl1($scope.FILE_NUM_IDENT, uploadUrl, nombreNuevoNit);
                            $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo NUMERO DE IDENTIFICACION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_NUM_IDENT').value = '';
                            document.getElementById('FILE_NUM_IDENT').value = '';
                            $scope.registro.FILE_NUM_IDENT = '';
                            $scope.FILE_NUM_IDENT = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño del archivo NUMERO DE IDENTIFICACION es muy grande', 'error');
                        document.getElementById('txt_FILE_NUM_IDENT').value = '';
                        document.getElementById('FILE_NUM_IDENT').value = '';
                        $scope.registro.FILE_NUM_IDENT = '';
                        $scope.FILE_NUM_IDENT = '';
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
            if(nombre == 'FILE_FUND_EMP' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDocfe = obj.files[0].name;
                var nameArrayfe = tipoDocfe.split('.');
                tipoDocfe = nameArrayfe[1];
                var nombrefe = nameArrayfe[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocfe == "png" || tipoDocfe == "jpg" || tipoDocfe == "jpeg" || tipoDocfe == "bmp" || tipoDocfe == "gif"  ||  tipoDocfe == "PNG" || tipoDocfe == "JPG" || tipoDocfe == "JPEG" || tipoDocfe == "BMP" || tipoDocfe == "GIF") {
                        var filecompress = compressImage($scope.FILE_FUND_EMP).then(function(respuestafe){
                            var imagenFun = respuestafe.name.split('.');
                            var tipoFun = imagenFun[1];
                            nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.'+tipoFun;
                            fileUpload1.uploadFileToUrl1(respuestafe, uploadUrl, nombreNuevoFundaempresa);
                            $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                            $scope.FILE_FUND_EMP = respuestafe;
                        });
                    } else{
                        if (tipoDocfe == 'pdf' ||  tipoDocfe == 'docx' ||  tipoDocfe == 'docxlm'  || tipoDocfe == 'PDF' ||  tipoDocfe == 'DOCX' ||  tipoDocfe == 'DOCXLM') {
                            var zipfe = new JSZip();
                            zipfe.file($scope.FILE_FUND_EMP.name, $scope.FILE_FUND_EMP);
                            zipfe.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobfe) {
                                nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobfe, uploadUrl ,nombreNuevoFundaempresa);
                                $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                                $scope.FILE_FUND_EMP = blobfe;                            
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo FUNDEMPRESA no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_FUND_EMP').value = '';
                            document.getElementById('FILE_FUND_EMP').value = '';                            
                            $scope.registro.FILE_FUND_EMP = '';
                            $scope.FILE_FUND_EMP = '';
                            valor = '';
                            $.unblockUI();
                        };                        
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocfe == 'png' || tipoDocfe == 'jpg' || tipoDocfe == 'jpeg' || tipoDocfe == 'bmp' || tipoDocfe == 'gif' || tipoDocfe == 'pdf' || tipoDocfe == 'docx' || tipoDocfe == 'docxlm' ||  tipoDocfe == 'PNG' || tipoDocfe == 'JPG' || tipoDocfe == 'JPEG' || tipoDocfe == 'BMP' || tipoDocfe == 'GIF' || tipoDocfe == 'PDF' || tipoDocfe == 'DOCX' || tipoDocfe == 'DOCXLM') {
                            nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.'+tipoDocfe;
                            fileUpload1.uploadFileToUrl1($scope.FILE_FUND_EMP, uploadUrl ,nombreNuevoFundaempresa);
                            $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo FUNDEMPRESA no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('FILE_FUND_EMP').value = '';
                            document.getElementById('txt_FILE_FUND_EMP').value = '';                            
                            $scope.registro.FILE_FUND_EMP = '';
                            $scope.FILE_FUND_EMP = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño del archivo FUNDEMPRESA es muy grande', 'error');
                        document.getElementById('FILE_FUND_EMP').value = '';
                        document.getElementById('txt_FILE_FUND_EMP').value = '';                        
                        $scope.registro.FILE_FUND_EMP = '';
                        $scope.FILE_FUND_EMP = '';
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
            if(nombre == 'FILE_REG_COMER' && (typeof(obj.files[0]) != 'undefined')){
                var tipoDocrc = obj.files[0].name;
                var nameArrayrc = tipoDocrc.split('.');
                tipoDocrc = nameArrayrc[1];
                var nombrerc = nameArrayrc[0] + '.zip';
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocrc == "png" || tipoDocrc == "jpg" || tipoDocrc == "jpeg" || tipoDocrc == "bmp" || tipoDocrc == "gif"  ||  tipoDocrc == "PNG" || tipoDocrc == "JPG" || tipoDocrc == "JPEG" || tipoDocrc == "BMP" || tipoDocrc == "GIF") {
                        var filecompress = compressImage($scope.FILE_REG_COMER).then(function(respuestarc){
                            fileUpload.uploadFileToUrl(respuestarc, uploadUrl);
                            $scope.registro.FILE_REG_COMER = respuestarc.name;
                            $scope.FILE_REG_COMER = respuestarc;
                        });
                    } else{
                        if (tipoDocrc == 'pdf' ||  tipoDocrc == 'docx' ||  tipoDocrc == 'docxlm' ||  tipoDocrc == 'PDF' ||  tipoDocrc == 'DOCX' ||  tipoDocrc == 'DOCXLM') {
                            var ziprc = new JSZip();
                            ziprc.file($scope.FILE_REG_COMER.name, $scope.FILE_REG_COMER);
                            ziprc.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobrc) {
                                blobrc.name = nombrerc;
                                fileUpload.uploadFileToUrl(blobrc, uploadUrl);
                                $scope.registro.FILE_REG_COMER = blobrc.name;
                                $scope.FILE_REG_COMER = blobrc;                            
                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo REGISTRO COMERCIAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_FILE_REG_COMER').value = '';
                            document.getElementById('FILE_REG_COMER').value = '';                            
                            $scope.registro.FILE_REG_COMER = '';
                            $scope.FILE_REG_COMER = '';
                            valor = '';
                            $.unblockUI();
                        };                        
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocrc == 'png' || tipoDocrc == 'jpg' || tipoDocrc == 'jpeg' || tipoDocrc == 'bmp' || tipoDocrc == 'gif' || tipoDocrc == 'pdf' || tipoDocrc == 'docx' || tipoDocrc == 'docxlm' || tipoDocrc == 'PNG' || tipoDocrc == 'JPG' || tipoDocrc == 'JPEG' || tipoDocrc == 'BMP' || tipoDocrc == 'GIF' || tipoDocrc == 'PDF' || tipoDocrc == 'DOCX' || tipoDocrc == 'DOCXLM') {
                            fileUpload.uploadFileToUrl($scope.FILE_REG_COMER, uploadUrl);
                            $scope.registro.FILE_REG_COMER = $scope.FILE_REG_COMER.name;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo REGISTRO COMERCIAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('FILE_REG_COMER').value = '';
                            document.getElementById('txt_FILE_REG_COMER').value = '';                            
                            $scope.registro.FILE_REG_COMER = '';
                            $scope.FILE_REG_COMER = '';                            
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño del archivo REGISTRO COMERCIAL es muy grande', 'error');
                        document.getElementById('FILE_REG_COMER').value = '';
                        document.getElementById('txt_FILE_REG_COMER').value = '';                        
                        $scope.registro.FILE_REG_COMER = '';
                        $scope.FILE_REG_COMER = '';                        
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
        $.unblockUI();
        },1000);
    };
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    catch (e) {}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};