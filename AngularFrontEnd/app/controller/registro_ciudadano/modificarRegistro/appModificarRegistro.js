    app.controller('modificarRegistroCiudadanoController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta)
    {
        $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
        $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
        var sDireccion = "";
    var idUsuario = sessionService.get('IDUSUARIO');//IDCIUDADANO
    var sFono = "";
    var sCelular = "";
    var sCorreo = "";
    var sCi = "";
    var sw=0;
    var sw2=1;
    var sNumeroAleatorio = ""; 
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
    var archivoCI="";
    var archivoCIR="";
    var archivoPOD="";
    var archivoTES="";
    var archivoNUM="";
    var archivoFUD="";
    var archivoREG="";
    //$scope.mapModCiu='';
    $scope.tipo2="Juridico";
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
    var estadocivilId = "";
    var existe = "";
    var existeidArchivo = "";
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
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    // END UPLOAD  
    //changes at upload
    $scope.uploader = new FileUploader({
     url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu

 });    
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length <2;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    };

    uploader.onAfterAddingFile = function(fileItem) {
        if(fileItem.file.size <= 3145728){
            tipoDocumento = fileItem.file.type;
            var nameArray = tipoDocumento.split('/');
            tipoDocumento = nameArray[1];
            var count = 0;
            if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg")
            {
                $scope.botonSubirOriginal = null; 
                $scope.botonSubirError = "oculta";
            }else{
              $scope.botonSubirError = null; 
              $scope.botonSubirOriginal = "oculta";                     
          }
          $scope.subir="ok";
      }else{
        sweet.show('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
        $scope.subir="nega";
        document.getElementById('imgSalida').value='';
                //$scope.myFile1="";
            }
        };

        $scope.falla = function()
        {
            sweet.show('', "Tipo de archivo incorrecto elimine porfavor", 'error'); 
            $scope.desabilitado2=true;
        }
    //end changes
    //Star image 

    $scope.addImage=function(e,idFoto){
        //sweet.show('','imagen guardada','success');
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
    $scope.getprof = function(){
        var resAccesos   = new reglasnegocio();
        resAccesos.identificador = "RCCIUDADANO_27";
        resAccesos.parametros = '{}';
        resAccesos.llamarregla(function(resultado)
        {
            $scope.getpro=JSON.parse(resultado);
            if(resultado == '[]' || resultado == '[{}]' || resultado == ' ' || resultado == '')
            {
                sweet.show('','Error, sin datos','error');
            }
            else
            {
                console.log(resultado);   
            }

        });  
    };

    /*********************************************************************/
    $scope.recuperarDatosRegistro = function(){
        $.blockUI();
        var datosCiudadano=new rcNatural();
        datosCiudadano.oid=idCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            results = JSON.parse(resultado);
            if (results[0].dtspsl_file_fotocopia_ci) {
                $scope.btover=true;
            }

            if (results[0].dtspsl_file_factura_luz) {
                $scope.btover1=true;
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
            //$scope.cadenaURL1 ="";
            $scope.nombreFile1 = results[0].dtspsl_URL;                    
            $scope.getTipoPersona(results[0].dtspsl_tipo_persona);
            $scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";
            $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";  
            if(results[0].dtspsl_tipo_persona=="NATURAL") 
            {
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
                $scope.registro.tipo_via = results[0].dtspsl_tipo_via;
                $scope.registro.nombrevia = results[0].dtspsl_nombre_via;
                $scope.registro.numero = results[0].dtspsl_numero_casa;
                $scope.registro.edificio = results[0].dtspsl_edificio;
                $scope.registro.bloque = results[0].dtspsl_bloque;
                $scope.registro.piso = results[0].dtspsl_piso;
                $scope.registro.numeroOficina = results[0].dtspsl_oficina;
                //CARGANDO DATOS INICIALES
                $scope.actualizaDepartamento(results[0].dtspsl_pais);
                $scope.registro.departamento = results[0].dtspsl_departamento;
                $scope.cargarProvincia(results[0].dtspsl_departamento);
                $scope.registro.provincia = results[0].dtspsl_provincia;                        
                $scope.cargarMunicipio(results[0].dtspsl_provincia);
                $scope.registro.municipio = results[0].dtspsl_municipio;
                $scope.cargarMacrodistrito(results[0].dtspsl_municipio);
                $scope.registro.macrodistrito = parseInt(results[0].dtspsl_macrodistrito);               
                $scope.cargarDistrito(results[0].dtspsl_macrodistrito);
                $scope.registro.distrito = parseInt(results[0].dtspsl_distrito);
                $scope.cargarZona(parseInt(results[0].dtspsl_distrito));
                $scope.registro.zona = parseInt(results[0].dtspsl_zona);
                $scope.habilitaVia();
                $scope.registro.zona_d = results[0].dtspsl_zona_desc;
                $scope.vias(results[0].dtspsl_zona,results[0].dtspsl_tipo_via);
                $scope.registro.latitud = results[0].dtspsl_latitud;
                $scope.registro.longitud = results[0].dtspsl_longitud; 
                $scope.registro.FILE_FOTOCOPIA_CI = results[0].dtspsl_file_fotocopia_ci;
                $scope.registro.FILE_FOTOCOPIA_CI_R = results[0].dtspsl_file_fotocopia_ci_r;
                $scope.registro.FILE_CONDICIONES_USO = results[0].dtspsl_file_condiciones_uso
                
                if ($scope.registro.FILE_FOTOCOPIA_CI == '') {
                    $timeout(function () {
                        //document.getElementById("fechaVen").disabled=true;
                    }, 1000);
                } else{
                    $timeout(function () {
                        //document.getElementById("fechaVen").disabled=false;
                    }, 1000);
                };
                
                $scope.registro.FILE_FACTURA_LUZ = results[0].dtspsl_file_factura_luz;
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
                $scope.mostrarJuridico = null;
                $scope.mostrarNatural = "NO_MOSTRAR";
                $scope.tipo = "JURIDICO";    
                tipoPersona = "JURIDICO";                         
                //DATOS PERSONALES - TAB1
                ////$scope.registro.cedula = results.record[0].dtspsl_ci_representante;
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
                $scope.registro.telefono_representante = results[0].dtspsl_telefono;
                //mostrarNumComplemento                        
                $scope.registro.celular_representante = results[0].dtspsl_movil;                        
                $scope.registro.correo = results[0].dtspsl_correo;                        
                $scope.registro.direccion_representante = results[0].dtspsl_direccion;
                //DATOS TAB2 - DATOS DE DIRECCION
                $scope.registro.pais = results[0].dtspsl_pais;
                if($scope.registro.pais === "" || $scope.registro.pais === null || typeof($scope.registro.pais) === 'undefined'){                    
                    $scope.registro.pais    =   '1';
                }                
                $scope.registro.tipo_via = results[0].dtspsl_tipo_via;

                $scope.registro.nombrevia = results[0].dtspsl_nombre_via;
                $scope.registro.numero = results[0].dtspsl_numero_casa;
                $scope.registro.edificio = results[0].dtspsl_edificio;
                $scope.registro.bloque = results[0].dtspsl_bloque;
                $scope.registro.piso = results[0].dtspsl_piso;
                $scope.registro.numeroOficina = results[0].dtspsl_oficina;
                //CARGANDO DATOS INICIALES
                $scope.actualizaDepartamento(results[0].dtspsl_pais);
                $scope.registro.departamento = results[0].dtspsl_departamento;
                $scope.cargarProvincia(results[0].dtspsl_departamento);
                $scope.registro.provincia = results[0].dtspsl_provincia;
                $scope.cargarMunicipio(results[0].dtspsl_provincia);
                $scope.registro.municipio = results[0].dtspsl_municipio;
                $scope.cargarMacrodistrito(results[0].dtspsl_municipio);
                $scope.registro.macrodistrito = parseInt(results[0].dtspsl_macrodistrito);
                $scope.cargarDistrito(parseInt(results[0].dtspsl_macrodistrito));
                $scope.registro.distrito = parseInt(results[0].dtspsl_distrito);                        
                $scope.cargarZona(parseInt(results[0].dtspsl_distrito));
                $scope.registro.zona = parseInt(results[0].dtspsl_zona);      
                $scope.registro.latitud = results[0].dtspsl_latitud;
                $scope.registro.longitud = results[0].dtspsl_longitud;
                $scope.registro.FILE_PODER_LEGAL = results[0].dtspsl_file_poder_legal;  
                $scope.registro.FILE_NUM_IDENT = results[0].dtspsl_file_num_ident;
                $scope.registro.FILE_TEST_CONST = results[0].dtspsl_file_test_const;
                $scope.registro.FILE_FUND_EMP = results[0].dtspsl_file_fund_emp;
                $scope.registro.FILE_REG_COMER = results[0].dtspsl_file_reg_comer;
                if ($scope.registro.FILE_FOTOCOPIA_CI == '') {
                    $timeout(function () {
                        document.getElementById("fechaVen").disabled=true;
                    }, 1000);
                } else{
                    $timeout(function () {
                        document.getElementById("fechaVen").disabled=false;
                    }, 1000);
                };
                
                $scope.registro.FILE_FACTURA_LUZ = results[0].dtspsl_file_factura_luz;
                var sw;
                /************** Obtener Datos persona RL **********************/
                var sCiRepresentanteLegal   =   ((typeof(results[0].dtspsl_ci_representante) == 'undefined' || results[0].dtspsl_ci_representante == null) ? ""   : results[0].dtspsl_ci_representante.trim());
                
                if(sCiRepresentanteLegal != null && sCiRepresentanteLegal != "")
                {
                    var fitro;
                    var sComplemento    =    ((typeof(results[0].dtspsl_complemento_representante) == 'undefined' || results[0].dtspsl_complemento_representante == null) ? ""   : results[0].dtspsl_complemento_representante.trim());

                if(sComplemento != null && sComplemento != "")
                {   
                    var dtspsl_tipo_persona="NATURAL";
                    var dtspsl_estado="ACTIVO";
                    var dtspsl_activacionf="SI";
                    var dtspsl_activaciond="SI";
                    filtro= '{"dtspsl_ci":"'+ sCiRepresentanteLegal + '","dtspsl_complemento":"'+sComplemento+',"dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
                    sw=0;
                }
                else{                           
                    var dtspsl_tipo_persona="NATURAL";
                    var dtspsl_estado="ACTIVO";
                    var dtspsl_activacionf="SI";
                    var dtspsl_activaciond="SI";
                    filtro= '{"dtspsl_ci":"'+ sCiRepresentanteLegal + '","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
                    sw=1;
                }
                switch (sw) {
                    case 0:
                        var resRepLegalMongo= new reglasnegocio();
                        resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_174";
                        resRepLegalMongo.parametros = filtro;
                        resRepLegalMongo.llamarregla(function(results){
                            results = JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI(); 
                                $scope.imagenPortada = results.dtspsl_URL;    // Recuperar informacion de la Imagen                       
                                $scope.registro.nombre = results.dtspsl_nombres;
                                $scope.registro.paterno = results.dtspsl_paterno;
                                $scope.registro.materno = results.dtspsl_materno;
                                $scope.registro.cedula = results.dtspsl_ci;
                                $scope.registro.complemento = results.dtspsl_complemento;
                                $scope.registro.cestcivil_id = results.dtspsl_id_estado_civil;
                                $scope.registro.ocupacion = results.dtspsl_ocupacion;
                                $scope.registro.profesion = results.dtspsl_profesion;
                                $scope.registro.otra_profesion = results.dtspsl_otra_profesion;
                                $scope.registro.celularRep = results.dtspsl_movil;
                                $scope.registro.telefonoRep = results.dtspsl_telefono;
                                $scope.registro.correoRep = results.dtspsl_correo;
                                $scope.registro.direccionRep = results.dtspsl_direccion;
                                $scope.registro.sexo = results.dtspsl_sexo;
                                $scope.registro.idrepre = results._id;
                                if (results.dtspsl_file_fotocopia_ci) {
                                    $scope.btover_c=true;
                                }
                                $scope.registro.FILE_FOTOCOPIA_CI = results.dtspsl_file_fotocopia_ci;
                                $scope.registro.FILE_FOTOCOPIA_CI_R = results.dtspsl_file_fotocopia_ci_r;
                            }else{
                                 $.unblockUI(); 
                                console.log("NO EXISTE DATOS");
                            }
                        }); 
                    break;
                    case 1:
                        var resRepLegalMongo   = new reglasnegocio();
                        resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_173";
                        resRepLegalMongo.parametros = filtro;
                        resRepLegalMongo.llamarregla(function(results){
                            results = JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI(); 
                                $scope.imagenPortada = results.dtspsl_URL;    // Recuperar informacion de la Imagen                       
                                $scope.registro.nombre = results.dtspsl_nombres;
                                $scope.registro.paterno = results.dtspsl_paterno;
                                $scope.registro.materno = results.dtspsl_materno;
                                $scope.registro.cedula = results.dtspsl_ci;
                                $scope.registro.complemento = results.dtspsl_complemento;
                                $scope.registro.cestcivil_id = results.dtspsl_id_estado_civil;
                                $scope.registro.ocupacion = results.dtspsl_ocupacion;
                                $scope.registro.profesion = results.dtspsl_profesion;
                                $scope.registro.otra_profesion = results.dtspsl_otra_profesion;
                                $scope.registro.celularRep = results.dtspsl_movil;
                                $scope.registro.telefonoRep = results.dtspsl_telefono;
                                $scope.registro.correoRep = results.dtspsl_correo;
                                $scope.registro.direccionRep = results.dtspsl_direccion;
                                $scope.registro.sexo = results.dtspsl_sexo;
                                $scope.registro.idrepre = results._id;
                                if (results.dtspsl_file_fotocopia_ci) {
                                    $scope.btover_c=true;
                                }
                                $scope.registro.FILE_FOTOCOPIA_CI = results.dtspsl_file_fotocopia_ci;
                                $scope.registro.FILE_FOTOCOPIA_CI_R = results.dtspsl_file_fotocopia_ci_r;
                            }else{
                                $.unblockUI(); 
                                console.log("NO EXISTE DATOS");
                            }
                        });
                        $scope.cerrarMapa();
                        $.unblockUI(); 
                    break;
                }
                
            }                       
                ////// Ocultar el mapa Apenas termine de cargarlo
                
            //} 
        }        
    });
};

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
$scope.mostrarCiComplemento = function() {
   $scope.mostrar = true;
};
/******************* API ESTADO CIVIL**********************************/
$scope.estadoCivil = function(){
 var sestadocivil   = new reglasnegocio();
 sestadocivil.identificador = "RCCIUDADANO_20";
 sestadocivil.parametros = '{}';
 sestadocivil.llamarregla(function(results)
 {
    results = JSON.parse(results);
    if(results.length > 0)
    {
        $scope.aEstadoCivil = results;
    }
    else
    {
        $scope.msg = "Error !!";
    }             
});
};
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
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + oidCiudadano + "/";
        if (aFiles[0]){
            if(aFiles[0].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_FOTOCOPIA_CI   = aFiles[0].name;
                $scope.Advertencia1 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                $scope.Advertencia1 = "advertencia";
                aFiles[0].name = "";
                document.getElementById('FILE_FOTOCOPIA_CI').value='';
            }
        }
        if (aFiles[1]){
            if(aFiles[1].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_FOTOCOPIA_CI_R   = aFiles[1].name;
                $scope.Advertencia2 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                $scope.Advertencia2 ="advertencia";
                aFiles[1].name ="";
                document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
            }
        }
        if (aFiles[2]){
            if(aFiles[2].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_PODER_LEGAL   = aFiles[2].name;
                $scope.Advertencia3 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen PODER DEL REPRESENTANTE LEGAL es muy grande', 'error');
                $scope.Advertencia3 = "advertencia";
                aFiles[2].name = "";
                document.getElementById('FILE_PODER_LEGAL').value = '';
            }
        }
        if (aFiles[3]){
            if(aFiles[3].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_TEST_CONST   = aFiles[3].name;
                $scope.Advertencia4 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen TESTIMONIO DE CONSTITUCION es muy grande', 'error');
                $scope.Advertencia4 ="advertencia";
                aFiles[3].name ="";
                document.getElementById('FILE_TEST_CONST').value = '';
            }
        }
        if (aFiles[4]){
            if(aFiles[4].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_NUM_IDENT   = aFiles[4].name;
                $scope.Advertencia5 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen NUMERO DE IDENTIFICACION es muy grande', 'error');
                $scope.Advertencia5 ="advertencia";
                aFiles[4].name ="";
                document.getElementById('FILE_NUM_IDENT').value ='';
            }
        }
        if (aFiles[5]){
            if(aFiles[5].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_FUND_EMP   = aFiles[5].name;
                $scope.Advertencia6 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen FUNDEMPRESA es muy grande', 'error');
                $scope.Advertencia6 = "advertencia";
                aFiles[5].name = "";
                document.getElementById('FILE_NUM_IDENT').value='';
            }
        }
        if (aFiles[6]){
            if(aFiles[6].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                $scope.registro.FILE_REG_COMER   = aFiles[6].name;
                $scope.Advertencia7 = "ok";
            } else {
                sweet.show('Advertencia', 'El tamaño de la imagen REGISTRO COMERCIAL es muy grande', 'error');
                $scope.Advertencia7 = "advertencia";
                aFiles[6].name="";
                document.getElementById('FILE_REG_COMER').value='';
            }
        }
        angular.forEach(aFiles, function(archivo, key) {            
            if(typeof(archivo) != 'undefined'){
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
            }
        });
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
        //misDocs.push($scope.FILE_FACTURA_AGUA);
        //misDocs.push($scope.FILE_FACTURA_GAS);
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
        $scope.comple  = ((typeof(response.complemento) == 'undefined' || response.complemento == null) ? ""   : response.complemento.trim());
        //if(response.complemento != null && response.complemento !="")
        if($scope.comple !="")
            var ci1=response.cedula+"-"+response.complemento;
        else
            var ci1=response.cedula;
        if($scope.mostrarNumComplemento2)
            var ci2=response.cedula2+"-"+response.complemento2;
        else
            var ci2=response.cedula2;
        if(tipoPersona == "JURIDICO") 
        {
            alert("bbb");
            var cnit=response.nit;
            var cnit2=response.nit2;
            var ci11 = response.cedula.split("-");
            var c1111 = ci11[0];
            if(cnit==cnit2) {
               if(response.complemento)
               {
                    var dtspsl_tipo_persona="NATURAL";
                    var dtspsl_estado="ACTIVO";
                    var dtspsl_activacionf="SI";
                    var dtspsl_activaciond="SI";
                    filtrov= '{"dtspsl_ci":"'+ c1111 + '","dtspsl_complemento":"'+response.complemento+'","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
                    sw=0;
                } else{
                    var dtspsl_tipo_persona="NATURAL";
                    var dtspsl_estado="ACTIVO";
                    var dtspsl_activacionf="SI";
                    var dtspsl_activaciond="SI";
                    filtrov= '{"dtspsl_ci":"'+ c1111 + '","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
                    sw=1
                }
                /////////////////////////////////// 
                switch (sw) {
                    case 0:
                        var resRepLegalMongo   = new reglasnegocio();
                        resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_174";
                        resRepLegalMongo.parametros = filtrov;
                        resRepLegalMongo.llamarregla(function(results){
                            var datomongo=JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI();
                                var filtroNit= '{"dtspsl_nit":"'+ cnit + '","dtspsl_estado":"ACTIVO"}';
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
                                }); 
                            }else{
                                sweet.show('', "El número de CI no esta en Registro Ciudadano ", 'warning');
                                $scope.getCaptchasX();
                                $.unblockUI();
                            }
                        });
                    break;
                    case 1:
                        var resRepLegalMongo   = new reglasnegocio();
                        resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_173";
                        resRepLegalMongo.parametros = filtrov;
                        resRepLegalMongo.llamarregla(function(results){
                            var datomongo=JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI();
                                var filtroNit= '{"dtspsl_nit":"'+ cnit + '","dtspsl_estado":"ACTIVO"}';
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
                                }); 
                            }else{
                                sweet.show('', "El número de CI no esta en Registro Ciudadano ", 'warning');
                                $scope.getCaptchasX();
                                $.unblockUI();
                            }
                        });
                    break;
                }        
            } else{

                sweet.show('', "El número de NIT  no concuerda con el anterior formulario ", 'warning'); 
                $.unblockUI();  
                $scope.getCaptchasX();                  
            }                                                   
        } else {
            if(ci1==ci2)
            {       
                if(response.complemento){
                    var filtroA= '{"dtspsl_ci":"'+ response.cedula2 + '","dtspsl_complemento":"'+response.complemento+',"dtspsl_estado":"ACTIVO"}';
                    sw=0;
                } else {
                    var filtroA= '{"dtspsl_ci":"'+ response.cedula2 + '","dtspsl_tipo_persona":"NATURAL","dtspsl_estado":"ACTIVO"}';
                    sw=1;
                }
                switch (sw) {
                    case 0:
                    var resRepBus=new reglasnegocio();
                    resRepBus.identificador="MONGO_RC_LAPAZ_178";
                    resRepBus.parametros=filtroA;
                        resRepBus.llamarregla(function(results){
                            var datomongo=JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI();
                                $scope.registroCiudadano(results);   
                            }else{
                                sweet.show('', "El número de CI no esta en Registro Ciudadano ", 'warning');
                                $scope.getCaptchasX();
                                $.unblockUI();
                            }
                    });      
                    break;
                    case 1:
                    var resRepBus=new reglasnegocio();
                    resRepBus.identificador="MONGO_RC_LAPAZ_177";
                    resRepBus.parametros=filtroA;
                    resRepBus.llamarregla(function(results){
                            var datomongo=JSON.parse(results);
                            if (results !=null) {
                                $.unblockUI();
                                $scope.registroCiudadano(results);
                            }else{
                                sweet.show('', "El número de CI no esta en Registro Ciudadano ", 'warning');
                                $scope.getCaptchasX();
                                $.unblockUI();
                            }
                    });
                    break;
                }
            }else{
                sweet.show('', "El número de ci no concuerda con el anterior formulario ", 'warning');
                $.unblockUI();  
                $scope.getCaptchasX();
            }
        }
    };

        $scope.actualizaDepartamento = function (dato)
        {
            $.blockUI();
            if (dato == 2) {
               $scope.registro.departamento = 0;
               $scope.registro.provincia = 0;
               $scope.registro.municipio = 0;
               $scope.registro.macrodistrito = 0;
               $scope.registro.distrito = 0;
               $scope.registro.zona = 0;
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
    $scope.combopais = function(){
        var spais   = new reglasnegocio();
        spais.identificador = "RCCIUDADANO_29";
        spais.parametros = '{}';
        spais.llamarregla(function(resultado){
            $scope.comdpais = JSON.parse(resultado);
        });  
    };
    
    /**************** API COMBO DEPARTAMENTOS ****************************/
    $scope.combodepa = function(){  
        var sdepartamento   = new reglasnegocio();
        sdepartamento.identificador = "RCCIUDADANO_28";
        sdepartamento.parametros = '{}';    
        sdepartamento.llamarregla(function(resultado){
            $scope.comdepa = JSON.parse(resultado);
        });  
    };
    
    /******************* API CARGAR PROVINCIAS **************************/
    $scope.cargarProvincia = function(idProv){
        var sprovincia   = new reglasnegocio();
        sprovincia.identificador = "RCCIUDADANO_30";
        sprovincia.parametros = '{"departamento":"'+ idProv + '"}';
        sprovincia.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
             $scope.aProvincias = results;
             $scope.deshabilitadoP = false;
         } else {
             $scope.msg = "Error !!";
             $scope.deshabilitadoP = true;
             $scope.deshabilitadoM = true;
             $scope.deshabilitadoMc = true;
             $scope.deshabilitadoDs = true;
             $scope.deshabilitadoZ = true;
             $scope.registro.provincia = 0;
             $scope.registro.municipio = 0;
             $scope.registro.macrodistrito = 0;
             $scope.registro.distrito = 0;
             $scope.registro.zona = 0;
         }             
     });
    };
    /*********************************************************************/   
    /************************ CARGAR MUNICIPIO ******************************/
    $scope.cargarMunicipio = function(idMun){
        var smunicipio   = new reglasnegocio();
        smunicipio.identificador = "RCCIUDADANO_23";
        smunicipio.parametros = '{"provincia":"' + idMun + '"}';
        smunicipio.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
             $scope.aMunicipios = results;
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
         }             
     });
    };
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
         $scope.deshabilitadoDs = false;
     }else{
         $scope.msg = "Error !!";
         $scope.deshabilitadoDs = true;
         $scope.deshabilitadoZ = true;
         $scope.registro.distrito = 0;
         $scope.registro.zona = 0;         
     }             
 });
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
    var nombreArchivoCi    =   "";
    nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
    var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
    var extCi              =   aTipoArchivoCi.split(".")[1];     

    var nombreArchivoCiR    =   "";
    nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
    var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
    var extCiR              =   aTipoArchivoCiR.split(".")[1];     
        try{
            extCi                  =   extCi.toLowerCase();
        }catch(e){}
        try{
            extCiR                  =   extCiR.toLowerCase();
        }catch(e){}
        try{
            extLuz                 =   extLuz.toLowerCase();
        }catch(e){}  
        try{
            extCondiciones        =   extCondiciones.toLowerCase();
        }catch(e){}       
        $.blockUI();         
        if(imagen == 'ci'){
           $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
           if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm'){
               window.open($scope.archivoCI, "_blank");
           }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
            $("#fo").modal("show");
        }                      
    }else if(imagen == 'ciR'){
       $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";             
       if(extCiR == 'pdf' || extCiR == 'docx' ||  extCiR == 'docxlm'){
           window.open($scope.archivoCIR, "_blank");
       }else if(extCiR == 'jpeg' || extCiR == 'jpg' ||  extCiR == 'png' ||  extCiR == 'gif'){
           $("#fot").modal("show");             
       }
   } 
   $.unblockUI();
}
$scope.mostrarimgjuridico  =   function(imagen){         
    var nombreArchivoCi    =   "";
    nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
    var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
    var extCi              =   aTipoArchivoCi.split(".")[1];     

    var nombreArchivoCiR    =   "";
    nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
    var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];     
    var extCiR              =   aTipoArchivoCiR.split(".")[1];  

    var nombreArchivoPod    =   "";
    nombreArchivoPod        =   $scope.registro.FILE_PODER_LEGAL;
    var aTipoArchivoPod     =   nombreArchivoPod.split("?")[0];     
    var extPod              =   aTipoArchivoPod.split(".")[1];

    var nombreArchivoTes    =   "";
    nombreArchivoTes        =   $scope.registro.FILE_TEST_CONST;
    var aTipoArchivoTes     =   nombreArchivoTes.split("?")[0];     
    var extTes              =   aTipoArchivoTes.split(".")[1];


    var nombreArchivoNum    =   "";
    nombreArchivoNum        =   $scope.registro.FILE_NUM_IDENT;
    var aTipoArchivoNum     =   nombreArchivoNum.split("?")[0];     
    var extNum              =   aTipoArchivoNum.split(".")[1];  

    var nombreArchivoFund   =   "";
    nombreArchivoFund        =   $scope.registro.FILE_FUND_EMP;
    var aTipoArchivoFund     =   nombreArchivoFund.split("?")[0];     
    var extFud              =   aTipoArchivoFund.split(".")[1];

    var nombreArchivoReg    =   "";
    nombreArchivoReg        =   $scope.registro.FILE_REG_COMER;
    var aTipoArchivorReg    =   nombreArchivoReg.split("?")[0];     
    var extReg              =   aTipoArchivorReg.split(".")[1];
    try{
        extCi           =   extCi.toLowerCase();
    }catch(e){}
    try{
        extCiR          =   extCiR.toLowerCase();
    }catch(e){}
    try{
        extPod          =   extPod.toLowerCase();
    }catch(e){}  
    try{
        extTes          =   extTes.toLowerCase();
    }catch(e){} 
    try{
        extNum          =   extNum.toLowerCase();
    }catch(e){} 
    try{
        extFud          =   extFud.toLowerCase();
    }catch(e){} 
    try{
        extReg          =   extReg.toLowerCase();
    }catch(e){} 

    $.blockUI();         
    if(imagen == 'ci'){
       $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
       if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm'){
           window.open($scope.archivoCI, "_blank");
       }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
        $("#fotci").modal("show");
    }                      
}else if(imagen == 'ciR'){
   $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";             
   if(extCiR == 'pdf' || extCiR == 'docx' ||  extCiR == 'docxlm'){
       window.open($scope.archivoCIR, "_blank");
   }else if(extCiR == 'jpeg' || extCiR == 'jpg' ||  extCiR == 'png' ||  extCiR == 'gif'){
       $("#fotcir").modal("show");             
   }
}else if(imagen == 'pod'){
   $scope.archivoPOD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_PODER_LEGAL + "?app_name=todoangular";             
   if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm'){
       window.open($scope.archivoPOD, "_blank");
   }else if(extPod == 'jpeg' || extPod == 'jpg' ||  extPod == 'png' ||  extPod == 'gif'){
       $("#fotpod").modal("show");             
   }
}else if(imagen == 'tes'){
   $scope.archivoTES = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_TEST_CONST + "?app_name=todoangular";             
   if(extTes == 'pdf' || extTes == 'docx' ||  extTes == 'docxlm'){
       window.open($scope.archivoTES, "_blank");
   }else if(extTes == 'jpeg' || extTes == 'jpg' ||  extTes == 'png' ||  extTes == 'gif'){
       $("#fottes").modal("show");             
   }
}else if(imagen == 'numiden'){
   $scope.archivoNUM = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_NUM_IDENT + "?app_name=todoangular";             
   if(extNum == 'pdf' || extNum == 'docx' ||  extNum == 'docxlm'){
       window.open($scope.archivoNUM, "_blank");
   }else if(extNum == 'jpeg' || extNum == 'jpg' ||  extNum == 'png' ||  extNum == 'gif'){
       $("#fotnumiden").modal("show");             
   }
}else if(imagen == 'fund'){
   $scope.archivoFUD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FUND_EMP + "?app_name=todoangular";             
   if(extFud == 'pdf' || extFud == 'docx' ||  extFud == 'docxlm'){
       window.open($scope.archivoFUD, "_blank");
   }else if(extFud == 'jpeg' || extFud == 'jpg' ||  extFud == 'png' ||  extFud == 'gif'){
       $("#fotfund").modal("show");             
   }
}else if(imagen == 'reg'){
   $scope.archivoREG = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_REG_COMER + "?app_name=todoangular";             
   if(extReg == 'pdf' || extReg == 'docx' ||  extReg == 'docxlm'){
       window.open($scope.archivoREG, "_blank");
   }else if(extReg == 'jpeg' || extReg == 'jpg' ||  extReg == 'png' ||  extReg == 'gif'){
       $("#fotreg").modal("show");             
   }
} 
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
/***************************************************************************/
    //// ******* para los ng-change de los combos ******* ///
    //// Cuando se hace una seleccion entonces se limpia los registros de los combos dependientes ////
    /*****************************************************************************************/
    $scope.cargarProvincia_v2 = function(idProv){
      $.blockUI();   
      var sprovincia   = new reglasnegocio();
      sprovincia.identificador = "RCCIUDADANO_30";
      $scope.obj={};
      sprovincia.parametros = '{"departamento":"'+ idProv + '"}';
      sprovincia.llamarregla(function(results){
        results = JSON.parse(results);
        if(results.length > 0){
            if (typeof $scope.aProvincias !== 'undefined') {
                $scope.aProvincias = results;
            }else{
                console.log("esta definido");
            }
            
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
            $scope.registro.municipio = 0;
            $scope.registro.macrodistrito = 0;
            $scope.registro.distrito = 0;
            $scope.registro.zona = 0;
            $scope.registro.tipo_via = 0;
            $scope.registro.nombrevia = 0;
            $scope.registro.otro_via = 0;
            $.unblockUI();
        }); 
  };  
  /*****************************************************************************************/
  $scope.cargarMunicipio_v2 = function(idMun){
      $.blockUI();    
      var smunicipio   = new reglasnegocio();
      smunicipio.identificador = "RCCIUDADANO_23";
      smunicipio.parametros = '{"provincia":"' + idMun + '"}';
      smunicipio.llamarregla(function(results){

        results = JSON.parse(results);
        if(results.length > 0){
            $scope.aMunicipios = results;
            $scope.deshabilitadoM = false;
            $scope.registro.municipio = 0;
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
            $scope.registro.macrodistrito = 0;
            $scope.registro.distrito = 0;
            $scope.registro.zona = 0;
            $scope.registro.tipo_via = 0;
            $scope.registro.nombrevia = 0;
            $scope.registro.otro_via = 0;
            $.unblockUI();
        });
  };
  /**************************************************************************************/
  $scope.cargarMacrodistrito_v2 = function(idMac){
    $scope.idMacrod = idMac;
    $.blockUI();
    var smacrodistrito   = new reglasnegocio();
    smacrodistrito.identificador = "RCCIUDADANO_24";
    smacrodistrito.parametros = '{"macrodistrito":"' + idMac + '"}';
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
            $scope.registro.tipo_via = 0;
            $scope.registro.nombrevia = 0;
            $scope.registro.otro_via = 0;         
            //$scope.deshabilitadoDs = true;
            //$scope.deshabilitadoZ = true;
            //$scope.registro.distrito = 0;
            //$scope.registro.zona = 0;
            ////////////////////
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
            $scope.registro.distrito = 0;
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
            $scope.registro.zona = 0;
            $scope.registro.tipo_via = 0;
            $scope.registro.nombrevia = 0;
            $scope.registro.otro_via = 0; 
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
            $scope.registro.zona = 0;
            $.unblockUI();         
        }
        $scope.deshabilitadoTv = true;
        $scope.deshabilitadoNv = true;
        $scope.registro.nombrevia = 0;   
        $scope.registro.tipo_via = 0;
        $scope.registro.otro_via = 0;
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
    $scope.registro.nombrevia = 0;
    $scope.registro.tipo_via = 0;
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
    $scope.registro.nombrevia = 0;
    $scope.registro.tipo_via = 0;
    $scope.registro.otro_via = 0;     
};
/**************************************************************************************/
/*$scope.vias_v2= function(zona,tipo){
    $scope.z = zona;
    $scope.t = tipo;
    var svias= new reglasnegocio();
    svias.identificador = "RCCIUDADANO_31";
    svias.parametros = '{"zona":"'+zona+'","tipo":"'+tipo+'"}'; 

    console.log('svias.parametros',svias.parametros);

    svias.llamarregla(function(results)
    {
        results = JSON.parse(results);
        console.log('results',results);
        if(results == '[{ }]')
        {
            console.log("No existe nombre de la via");
        }
        else
        {
            $scope.tip_vias =   [];
            var aTipoVia    =   {};
            aTipoVia["idv"] = "OTROS";
            aTipoVia["nombrev"] = "OTRO";
            if(results.length > 0 )
            {
                $scope.tip_vias = results;
            }
            $scope.tip_vias.push(aTipoVia);
            $scope.desabilitadoNo =false;
            $scope.deshabilitadoNv=false;
        }
    });
};*/
/* value data */
$scope.vias_v2= function(zona,tipo)
{ 
    $scope.z =zona;
    $scope.t =tipo;

    console.log('ZONA',$scope.z);
    console.log('TIPO',$scope.t);    

    var svias = new reglasnegocio();
    svias.identificador = "RCCIUDADANO_31";
    svias.parametros = '{"zona":"' + zona + '","tipo":"' + tipo + '"}';
    
    console.log('JSON',svias.parametros);

    svias.llamarregla(function(results)
    {
        console.log('results',results);
        results = JSON.parse(results);
        $scope.tip_vias =  new Array();
        $scope.tip_vias =   [];
        var aTipoVia    =   {};
        aTipoVia["idv"] = "OTROS";
        aTipoVia["via_nombre_via"] = "OTRO";

        if(results == "[{ }]")
        {
            sweet.show('', "No existe nombre de la Via", 'warning');
            $scope.tip_vias.push(aTipoVia);
            //$scope.deshabilitadoNv=true;
            /*var aTipoVia    =   {};
            aTipoVia["via_id"] = "OTROS";
            aTipoVia["via_nombre_via"] = "OTRO";*/
            //console.log("aTipoVia",aTipoVia);
        }
        else
        {
            /*var aTipoVia    =   {};
            aTipoVia["via_id"] = "OTROS";
            aTipoVia["via_nombre_via"] = "OTRO";
            console.log("aTipoVia",aTipoVia);*/

            $scope.tip_vias = results;
            console.log("ARRAY", $scope.tip_vias);


            /*if(results.length > 0 )
            {
                $scope.tip_vias = results;
                console.log("ARRAY", $scope.tip_vias);
            }
            else
            {    
                $scope.tip_vias.push(aTipoVia);
            }
            $scope.desabilitadoNo=false;
            $scope.deshabilitadoNv=false;*/

        }
        $scope.desabilitadoNo=false;
        $scope.deshabilitadoNv=false;
    });
};  
  




/**************************************************************************************/    
    /*
    $scope.vesavilirat = function(data){
            $scope.registro.otro_via = "";
        };
        */
    ///////////////////////////////////////////////
    //creando un nuevo registro 
    $scope.validacamposJuridico = function (){
        //$scope.btover=true;                    
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
            //console.log('file is ' + JSON.stringify(file));
            //var uploadUrl = CONFIG.APIURL+"/files/"+$scope.direccionvirtual+"/";
            var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
            //console.log(uploadUrl);
            //console.log(file.name);
            var nombreFile = file.name;
            //var extensionFile = file.match;
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
                //"id" : idArchivo
                var idUsu = sessionService.get('IDUSUARIO');
                var sciudadano = new reglasnegocio();
                sciudadano.identificador = "RCCIUDADANO_42";
                sciudadano.parametros = '{"crch_ciudadano_id":"' + idCiu + '","crch_proceso":"imagenCiudadano","crch_actividad":"1","crch_nombre":"' + nombreFile + '","crch_direccion":"' + cadenaURL + '","cnt_id_usuario":"' + idUsu + '"}';                
                //sciudadano.llamarregla(function(results){
                    //results = JSON.parse(results);
                };//});
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
        if(tipoPersona == "NATURAL") {
            if(response.nombrevia == 'OTRO'){
               response.nombrevia1 = "OTRO%%"+response.otro_via;
           }else{
            response.nombrevia1 = response.nombrevia;
        }
        if($scope.idMacrod == 20101){
            sZonaDescripcion   =   $('#zona option:selected').text();  
        }else{
            sZonaDescripcion = response.zona_d;
        }
            var sfechanaccorrecta = "";
            var sfechavencCorrecta = "";
            sfechanaccorrecta  =   document.getElementById('fechaNac').value;
            sfechavencCorrecta  =   document.getElementById('fechaVen').value;
            
            sNumeroAleatorio = response.pin;  //Math.round(Math.random()*100000) + response.cedula;  
            var modificarCiudadano=new rcNatural();
            modificarCiudadano.nombre=response.nombre;
            modificarCiudadano.paterno=response.paterno;
            modificarCiudadano.materno=response.materno;
            modificarCiudadano.tercer_apellido=response.tercer;
            modificarCiudadano.ci=response.cedula2;
            modificarCiudadano.complemento=response.complemento;
            modificarCiudadano.expedido=response.expedido;
            modificarCiudadano.fec_nacimiento=sfechanaccorrecta;
            modificarCiudadano.lugar_nacimiento=response.lugarNacimiento;
            modificarCiudadano.pais_origen=response.pais_origen;
            modificarCiudadano.sexo=response.sexo;
            modificarCiudadano.id_estado_civil=response.estado_civil;
            modificarCiudadano.profesion=response.profesion;
            modificarCiudadano.otra_profesion=response.otra_profesion;
            modificarCiudadano.telefono=response.telefono;
            modificarCiudadano.movil=response.celular;
            modificarCiudadano.correo=response.correo;
            modificarCiudadano.direccion=response.direccion;

            modificarCiudadano.pais=response.pais;
            modificarCiudadano.departamento=response.departamento;
            modificarCiudadano.provincia=response.provincia;
            modificarCiudadano.municipio=response.municipio;
            modificarCiudadano.macrodistrito=response.macrodistrito;
            modificarCiudadano.macrodistrito_desc=sMacroDescripcion;
            modificarCiudadano.distrito=response.distrito;
            modificarCiudadano.distrito_desc=sDistritoDescripcion;
            modificarCiudadano.zona=response.zona;
            modificarCiudadano.zona_desc=sZonaDescripcion;
            modificarCiudadano.tipo_via=response.tipo_via;
            modificarCiudadano.nombre_via=response.nombrevia1;
            modificarCiudadano.numero_casa=response.numero;
            modificarCiudadano.edificio=response.edificio;
            modificarCiudadano.bloque=response.bloque;
            modificarCiudadano.piso=response.piso;
            modificarCiudadano.oficina=response.numeroOficina;
            modificarCiudadano.fec_vencimiento = sfechavencCorrecta;
            modificarCiudadano.latitud=response.latitud;
            modificarCiudadano.longitud=response.longitud;

            modificarCiudadano.usr_id=idUsuario;
            modificarCiudadano.activacionf=$scope.registro.activacionf;
            modificarCiudadano.activaciond=$scope.registro.activaciond;

            modificarCiudadano.file_fotocopia_ci=archivoCI;
            modificarCiudadano.file_fotocopia_ci_r=archivoCIR;

            if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
                $scope.nombreFile1 = "";
            };
            modificarCiudadano.URL=$scope.nombreFile1;

            modificarCiudadano.oid=oidCiudadano;
            
            modificarCiudadano.modificarNatural(function(resultado){
                resultadoApi = JSON.parse(resultado); 
                if( typeof(resultadoApi.success) != 'undefined')
                {
                    //$scope.registroCiudadanoMensajes(resultadoApi);
                    var mensajeExito = "La Información fue actualizada con Éxito.";
                }
                else
                {
                    $.unblockUI();                    
                    var mensajeExito = resultadoApi.error.message;
                }

                sweet.show('', mensajeExito, 'success');
                $.unblockUI();  
                $('#formModal').modal('hide');
            });

        }else{
            sNumeroAleatorio = response.pin;  //Math.round(Math.random()*100000) + response.nit;
            var ci11 = response.cedula.split("-");
            var c1111 = ci11[0];
            sZonaDescripcion   =   $('#zona option:selected').text();  
            var modificarJuridico= new rcJuridico();
            modificarJuridico.nit=response.nit;
            modificarJuridico.razonSocial=response.razon;
            modificarJuridico.telefono=response.telefono_representante;
            modificarJuridico.movil=response.celular_representante;
            modificarJuridico.correo=response.correo;
            modificarJuridico.ci=c1111
            modificarJuridico.complemento=response.complemento;
            modificarJuridico.representante=descripcionNombre.trim() + " " + descripcionPaterno.trim() + " " + descripcionMaterno.trim();
            //materno=descripcionMaterno.trim();
            modificarJuridico.poder_replegal=response.repLegal;
            modificarJuridico.nro_notaria=response.notaria;
            modificarJuridico.profesion=response.profesion;
            modificarJuridico.otra_profesion=response.otra_profesion;
            modificarJuridico.direccion=response.direccion_representante;

            modificarJuridico.pais=response.pais;
            modificarJuridico.departamento=response.departamento;
            modificarJuridico.provincia=response.provincia;
            modificarJuridico.municipio=response.municipio;
            modificarJuridico.macrodistrito=response.macrodistrito;
            modificarJuridico.macrodistrito_desc=sMacroDescripcion;
            modificarJuridico.distrito=response.distrito;
            modificarJuridico.distrito_desc=sDistritoDescripcion;
            modificarJuridico.zona=response.zona;
            modificarJuridico.zona_desc=sZonaDescripcion;
            modificarJuridico.tipo_via=response.tipo_via;
            modificarJuridico.nombre_via=response.nombrevia;
            modificarJuridico.numero_casa=response.numero;
            modificarJuridico.edificio=response.edificio;
            modificarJuridico.bloque=response.bloque;
            modificarJuridico.piso=response.piso;
            modificarJuridico.oficina=response.numeroOficina;

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

            if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
                $scope.nombreFile1 = "";
            };
            modificarJuridico.URL=$scope.nombreFile1;

            modificarJuridico.oid=oidCiudadano;

            modificarJuridico.modificarJuridico(function(resultado){
                resultadoApi = JSON.parse(resultado);
                if( typeof(resultadoApi.success) != 'undefined')
                {
                    //$scope.registroCiudadanoMensajes(resultadoApi);
                    var mensajeExito = "Datos modificados correctamente.";
                }
                else
                {
                    $.unblockUI();                    
                    var mensajeExito = resultadoApi.error.message;
                }

                sweet.show('', mensajeExito, 'success');
                $.unblockUI();  
                $('#formModal').modal('hide');
            });
        }
     };

     $scope.verificar = function(reg) {
        sw =0;
        $.blockUI();
        var fitro;           
        if(reg.complemento != null)
        {            
            var dtspsl_tipo_persona="NATURAL";
            var dtspsl_estado="ACTIVO";
            var dtspsl_activacionf="SI";
            var dtspsl_activaciond="SI";
            filtro= '{"dtspsl_ci":"'+ reg.cedula + '","dtspsl_complemento":"'+reg.complemento+',"dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
            sw=0;
        }
        else{         
            var dtspsl_tipo_persona="NATURAL";
            var dtspsl_estado="ACTIVO";
            var dtspsl_activacionf="SI";
            var dtspsl_activaciond="SI";
            filtro= '{"dtspsl_ci":"'+ reg.cedula + '","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
            sw=1
        }
        switch (sw) {
            case 0:
                var resRepLegalMongo   = new reglasnegocio();
                resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_174";
                resRepLegalMongo.parametros = filtro;
                resRepLegalMongo.llamarregla(function(results){
                    if (results !=null) {
                        $.unblockUI();
                        if(tipoPersona == 'NATURAL')
                        {
                            sweet.show('', 'Persona ya Registrada!!!' , 'success');
                        }else
                        {
                            $scope.registro.nombre = results.dtspsl_nombres;
                            $scope.registro.paterno = results.dtspsl_paterno;
                            $scope.registro.materno = results.dtspsl_materno;
                            $scope.registro.tercer = "";  //results.dtspsl_paterno;
                            $scope.registro.cedula = results.dtspsl_ci;                
                            $scope.registro.celularRep = results.dtspsl_movil;
                            $scope.registro.telefonoRep = results.dtspsl_telefono;
                            $scope.registro.correoRep = results.dtspsl_correo;
                            $scope.registro.direccionRep = results.dtspsl_direccion;  
                            sweet.show('', 'Datos Encontrados!!!' , 'success');
                        }
                    }else{
                        $.unblockUI();
                        if(tipoPersona == 'NATURAL')
                        {
                            sweet.show('', 'Llene sus datos!!!' , 'success');
                        }
                        else
                        {
                            sweet.show('', 'Debe Registrar primero a la Persona Natural!!!', 'warning');
                            $scope.registro = '';
                        }

                    }
                     $scope.$apply();
                });
            break;
            case 1:
                var resRepLegalMongo   = new reglasnegocio();
                resRepLegalMongo.identificador= "MONGO_RC_LAPAZ_173";
                resRepLegalMongo.parametros = filtro;
                resRepLegalMongo.llamarregla(function(results){
                    var datomongo=JSON.parse(results);
                     //results = JSON.parse(results);
                    if (results !=null) {
                        $.unblockUI();
                        if(tipoPersona == 'NATURAL')
                        {
                            sweet.show('', 'Persona ya Registrada!!!' , 'success');
                        }else
                        {
                                $scope.registro.nombre = datomongo.dtspsl_nombres;
                                $scope.registro.paterno = datomongo.dtspsl_paterno;
                                $scope.registro.materno = datomongo.dtspsl_materno;
                                $scope.registro.tercer = "";  //datomongo.dtspsl_paterno;
                                $scope.registro.cedula = datomongo.dtspsl_ci;                
                                $scope.registro.celularRep = datomongo.dtspsl_movil;
                                $scope.registro.telefonoRep = datomongo.dtspsl_telefono;
                                $scope.registro.correoRep = datomongo.dtspsl_correo;
                                $scope.registro.direccionRep = datomongo.dtspsl_direccion;  
                                sweet.show('', 'Datos Encontrados!!!' , 'success');
                        }
                    }else{
                        $.unblockUI();
                        if(tipoPersona == 'NATURAL')
                        {
                            sweet.show('', 'Llene sus datos!!!' , 'success');
                        }
                        else
                        {
                            sweet.show('', 'Debe Registrar primero a la Persona Natural!!!', 'warning');
                            $scope.registro = '';
                        }

                    }
                     $scope.$apply();
                });
            break;
        }

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
   sweet.show('', mensaje, 'success'); 
}; 
/******************* Almacenar direccion **********************/ 
$scope.almacenarDirecion = function(sIdReg){
    var sdireccion   = new reglasnegocio();
    sdireccion.identificador = "RCCIUDADANO_55";
    sdireccion.parametros = '{"dtsdrc_direccion":"' + sDireccion +'","dtsdrc_id_zona":1,"dtsdrc_id_dtspesonales":"' + sIdReg +'","dtsdrc_usr_id":1"}';
    sdireccion.llamarregla(function(results){
             //results = JSON.parse(results);
         });                
} 

$scope.getZonaMD = function() {
    var sgetZona = new reglasnegocio();
    sgetZona.identificador = "RCCIUDADANO_44";
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
                    /************************************************************************/ 

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
            //mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        mapj = new google.maps.Map(document.getElementById('mapModificarJ'), {
            zoom: 15,
            center: haightAshbury,
            //mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
            $scope.deleteMarkers();
            $scope.registro.latitud = event.latLng.lat();
            $scope.registro.longitud = event.latLng.lng();
            //map.setCenter(event.latLng);
            $scope.addMarker(event.latLng);
        });

        mapj.addListener('click', function(event) {
            $scope.deleteMarkersJ();
            $scope.registro.latitud = event.latLng.lat();
            $scope.registro.longitud = event.latLng.lng();
            //map.setCenter(event.latLng);
            $scope.addMarkerJ(event.latLng);
        });
        //$scope.cerrarMapa();
        // Adds a marker at the center of the map.
        //$scope.addMarker(haightAshbury);    
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
            google.maps.event.trigger(map, 'resize');
            $scope.abrirMapaJ();
            $scope.$apply();
        }, 300);
    }    
    
    // Adds a marker to the map and push to the array.
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
        mapj: mapj
    });
      markersj.push(markerj);
  }

    // Sets the map on all markers in the array.
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

    // Removes the markers from the map, but keeps them in the array.
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

    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
      $scope.clearMarkers();
      markersj = [];
  }

  $scope.deleteMarkersJ = function() {
      $scope.clearMarkersJ();
      markersj = [];
  }

  $scope.abrirMapa = function () {
        //alert("23");
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

            map.setCenter(nuevoUbicacion);
            $scope.addMarker(nuevoUbicacion);
        }else{

            var nuevoUbicacion = {
                lat: -16.495635, 
                lng: -68.133543
            };
            map.setCenter(nuevoUbicacion);
            $scope.addMarker(nuevoUbicacion);
        }         
    }

    $scope.abrirMapaJ = function () {
        //alert("23");
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
            mapj.setCenter(nuevoUbicacion);
            $scope.addMarkerJ(nuevoUbicacion);
        }else{
            var nuevoUbicacion = {
                lat: -16.495635, 
                lng: -68.133543
            };
            mapj.setCenter(nuevoUbicacion);
            $scope.addMarkerJ(nuevoUbicacion);
        }         
    }

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
         //sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
         $scope.getCaptchasX();
         $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
     }else{
        $scope.validarCiCiudadano(response); 
    }
});
    };
    // ******FIN DE CAPCHA****************

    $scope.$on('api:ready',function(){
        $scope.recuperarDatosRegistro();
        $scope.estadoCivil();
        $scope.getZonaMD();  
        $scope.combopais(); 
        $scope.combodepa();
        $scope.getprof();
        if(typeof(google) != "undefined"){ 
            google.maps.visualRefresh = true;
        }
        $scope.initMap();
        //$scope.abrirMapaJ();
    });

    $scope.inicioEstadoCivil = function () {
        $scope.recuperarDatosRegistro();
        $scope.estadoCivil();
        $scope.getZonaMD();
        $scope.combopais();
        $scope.combodepa();
        $scope.getprof();
        $scope.habilitarForm();
        if(typeof(google) != "undefined"){ 
            google.maps.visualRefresh = true;
        }
    };
        
    $scope.habilitarForm = function(){
        var habilitar   =   $rootScope.habilitartab;
        console.log("HABILITAR :", habilitar);
        if(habilitar    ==  'si'){
            $scope.active2 = "active";
            $scope.active = "";            
        }else{
            $scope.active = "active";
            $scope.active2 = "";     
        }
        
    };
        
     //Documentos Adjuntos
    //$scope.activaFech = isDisabled;
    $scope.cambiarFile = function(obj, valor){
        $.blockUI();  
        setTimeout(function(){  
            $scope.registro[obj.name] = valor;
            if ($scope.registro.FILE_FOTOCOPIA_CI == '') {
                document.getElementById("fechaVen").disabled=true;
            } else{
                document.getElementById("fechaVen").disabled=false;
            };
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
});