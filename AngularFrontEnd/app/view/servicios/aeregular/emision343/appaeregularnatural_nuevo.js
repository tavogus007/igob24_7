function regularNuevoController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.desabilitadoZ=true;
    $scope.desabilitadoV=true;
    $scope.desabilitadoNo=true;
    $scope.validarAdjuntos = true;
    $scope.divNatural = null;
    $scope.divJuridico = null;
    $scope.superfcat = false;
    $scope.alqant = false;
    $scope.btnEnviarForm = true;
    $scope.archivo2 = "croquisActividad.jpg";
    $scope.btnEnviarFormLinea  =   "true";
    $scope.verEmisionRenovacion  =   "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;
    $scope.sCategoria = true;
    $scope.smultiservicios = false;
    $scope.empleados = {};  
    $scope.getRequisitosCategoria = function(idCategoria, persona){
        if(persona == 'NATURAL'){
            persona = 'N';
        }
        $scope.categoriaid = idCategoria;
        $scope.tipoper = persona;
        try{
            var ndCategoria = new aelstRequisitosDocCategoria();
            ndCategoria.dependencia = idCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_RequisitosDocCategoria(function(res){
                x = JSON.parse(res);
                var datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j=0; j<datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado=false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
                $scope.getRequisitosTecnicosCategoria(idCategoria,persona);
                $rootScope.datosAdjuntos = datoObjectFinal;
            })
        }catch (error){
            console.log("error en requisitos categoria");
        }
    };

    $scope.getRequisitosCategoriaTecnicos = function(idTipoLicencia, idCategoria, persona){
        if(idTipoLicencia == 17 || idTipoLicencia == '17' || idTipoLicencia == 18 || idTipoLicencia == '18'){
            $scope.getRequisitosTecnicosActividad(idCategoria, persona);
        }else{
            $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
        }
    }

    $scope.getRequisitosTecnicosActividad = function(idCategoria, persona){
        if(persona == 'NATURAL'){
            persona = 'N';
        }
        try{
            var ntActividad = new aelstRequisitosTecActividad();
            ntActividad.dependencia = idCategoria;
            ntActividad.tipopersona = persona;
            ntActividad.aelst_RequisitosTecActividad(function(res){
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j = 0; j<datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
                console.log("dos",$scope.datos.f01_requisitos_tecnicos);
            });
        }catch (error){
            console.log("error");
        }
    };

    $scope.getRequisitosTecnicosCategoria = function(idCategoria, persona){
        if(persona == 'NATURAL'){
            persona = 'N';
        }
        try{
            var parametro = new aelstRequisitosTecCategoria();
            parametro.idCategoria = idCategoria;
            parametro.tipopersona = 'N';
            parametro.aelst_RequisitosTecCategoria(function(res){
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j=0; j < datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                console.log("tres",$scope.datos.f01_requisitos_tecnicos);
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        }catch (error){
            console.log("error");
        }
    };

    $scope.limpiarmultiple = function(){
        $scope.licdes=[];
        //$scope.multiple=[];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.licmul_grilla = '';
        $scope.datos.Licenmul_grilla = '';
        $scope.datos.mulact_principal = '';
        $scope.datos.xf01_idcat_multi_principal = '';
        $scope.datos.xf01_descat_multi_principal = '';
    }

    $scope.catactividadDesarrollada = function(){
        $.blockUI();
        $scope.datos.rdTipoTramite = 'NUEVO';
        //$scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        try{
            var nActividadDesarrollada = new getDatosActividadDesarrollada343();
            nActividadDesarrollada.getDatos_ActividadDesarrollada343(function(resActDes){
                var lstActividadDesarrollada = JSON.parse(resActDes);
                $scope.datosActividad = "";
                var datosLic = lstActividadDesarrollada.success.dataSql;
                //$scope.datos.f01_actividad_desarrollada = "";
                if(datosLic.length > 0){
                    for (var i = datosLic.length - 1; i >= 0; i--) {
                        if (datosLic[i].idActividadDesarrollada343 == 907 || datosLic[i].idActividadDesarrollada343 == '907') {
                            datosLic[i].descripcion343 = 'MULTISERVICIOS';
                        }
                    };
                    $scope.datosActividad = datosLic;
                }else{
                    $scope.msg = "Error !!";
                }
                //$scope.$apply();
                $.unblockUI();
            });
        }catch(e){
            alert("Error en la actdesarrollada");
        }
    }


    $scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        $.blockUI();
        //$scope.datos.rdTipoTramite = 'NUEVO';
        $scope.datos.habilitaEmpredimiento = "";
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        $scope.fileArRequisitos = {};
        try{
            if(superficie){
                var nDatosLic = new getDatosLicencia();
                nDatosLic.idActividadDesarrollada = idDesarrollada;
                nDatosLic.superficie = superficie;
                nDatosLic.getDatos_Licencia(function(resDatosLic){
                    var obtLic = JSON.parse(resDatosLic);
                    var datosLic = obtLic.success.dataSql;
                    if(datosLic.length > 0){
                        $scope.sCategoria = true;
                        $scope.smultiservicios = false;
                        $scope.datosActividadLicencia = datosLic;
                        $scope.datos.f01_tipo_lic = datosLic[0].idTipoLicencia;
                        $scope.datos.f01_tipo_lic_descrip = datosLic[0].TipoLicenciaDescripcion;
                        $scope.datos.f01_categoria_agrupada = datosLic[0].idActividadDesarrollada;
                        $scope.datos.f01_categoria_agrupada_dem = datosLic[0].idActividadDesarrollada343;
                        $scope.datos.f01_categoria_agrupada_descrip = datosLic[0].ADDescripcion;
                        $scope.GetValueZonaSegura(datosLic[0].idActividadDesarrollada);
                        var comboz      = document.getElementById('f01_categoria_descrip');
                        selected2   = comboz.options[comboz.selectedIndex].text;
                        $scope.datos.f01_categoria_descripcion  = selected2;
                        $scope.datos.f01_categoria_descrip2 = selected2;
                        $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                        $scope.datos.f01_actividadesSecundarias = datosLic[0].ADDescripcion;
                    }else{
                        $scope.msg = "Error !!";
                    }
                    if (idDesarrollada == 907 || idDesarrollada == '907') {
                        $scope.actividadDesarrolladaM();
                        $scope.sCategoria = false;
                        $scope.smultiservicios = true;
                    }
                    datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                    datoObjectFile1.campo = 'Cédula de identidad (Anverso)';
                    datoObjectFile1.nombre = 'Cédula de identidad (Reverso)';
                    datoObjectFiles_ci[0] = datoObjectFile1;
                    datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
                    datoObjectFile2.campo = 'Cédula de identidad (Anverso)';
                    datoObjectFile2.nombre = 'Cédula de identidad (Reverso)';
                    datoObjectFiles_ci[1] = datoObjectFile2;
                    $scope.datos.FILE_CI = datoObjectFiles_ci;
                    if($scope.smultiservicios != true){
                        $scope.ConsultaEmprendimiento(idDesarrollada);
                    }
                    $scope.getRequisitosActividad($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosTecnicosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    //$scope.$apply();
                    $.unblockUI();
                });
            }
            else{
                swal('', 'Debe registrar la superficie de la actividad antes del tipo de actividad desarrollada', 'error');
                $.unblockUI();
            }
        }catch(e){
            console.log("Error en la actividad desarrolladaXA");
            $.unblockUI();
        }
    }

    ///////////////////////////////MI PRIMER EMPRENDIMIENTO///////////////////////////
    $scope.ConsultaEmprendimiento = function (idDesarrollada) {
        $.blockUI();
        var identificacion  = "";
        var clase = "";
        if($scope.datos.f01_tipo_per=='N' || $scope.datos.f01_tipo_per_desc=='NATURAL' || $scope.datos.f01_tipo_per=='NATURAL' ){
            clase = "N";
            identificacion = $scope.datos.f01_num_dos_prop;
        }
        try{
            var emprendimiento = new primerEmprendimiento();
            emprendimiento.idActividadDesarrollada = idDesarrollada;
            emprendimiento.clase = clase;
            emprendimiento.identificacion = identificacion;
            emprendimiento.consultaEmprendimiento(function (respuesta) {
                if(JSON.parse(respuesta).success){
                    var res = JSON.parse(respuesta).success.dataSql[0];
                    $scope.datos.habilitaEmpredimiento = res.respuesta;
                }else{
                    $scope.datos.habilitaEmpredimiento = "";
                }
                $.unblockUI();
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
            $.unblockUI();
        } 
    }

    $scope.getRequisitosActividad = function(idCategoria, persona){
        persona = sessionService.get('TIPO_PERSONA');
        try{
            var parametros = new aelstRequisitosDocActividad();
            parametros.dependencia = idCategoria;
            parametros.tipopersona = persona;
            parametros.aelst_RequisitosDocActividad(function(res){
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for(j=0; j < datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado=false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
            });
        }catch (error){
            alert("requisitos actividad");
        }
    };


    $scope.actividadDesarrolladaM = function(){
        $.blockUI();
        var datosMulti = [];
        try{
            var nActividadDesarrollada = new getDatosActividadDesarrollada343();
            nActividadDesarrollada.getDatos_ActividadDesarrollada343(function(resActDesM){
                var lstActividadDesM = JSON.parse(resActDesM);
                var dataResp = lstActividadDesM.success.dataSql;
                for (var i = 0; i < dataResp.length; i++) {
                    if (dataResp[i].idActividadDesarrollada343 == '907' || dataResp[i].idActividadDesarrollada343 == 907) {
                    } else{
                        objMulti = new Object();
                        objMulti.codigo343 = dataResp[i].codigo343;
                        objMulti.descripcion343 = dataResp[i].descripcion343;
                        objMulti.descripcionActividadDesarrollada = dataResp[i].descripcionActividadDesarrollada;
                        objMulti.descripcionTipoLicencia = dataResp[i].descripcionTipoLicencia;
                        objMulti.estado343 = dataResp[i].estado343;
                        objMulti.fecha343 = dataResp[i].fecha343;
                        objMulti.idActividadDesarrollada = dataResp[i].idActividadDesarrollada;
                        objMulti.idActividadDesarrollada343 = dataResp[i].idActividadDesarrollada343;
                        objMulti.idTipoLicencia = dataResp[i].idTipoLicencia;
                        objMulti.proceso = dataResp[i].proceso;
                        datosMulti[i] = objMulti;
                    };
                };
                $scope.datosActividadMul = datosMulti;
                //$scope.$apply();
                $.unblockUI();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
             $.unblockUI();
        }
    }

    $scope.obtenerActDes = function(idActividadDesarrollada){
        $scope.datosactividadDes="";
        var dato = new getHomologacion();
        dato.idActividadDesarrollada = idActividadDesarrollada;
        dato.get_Homologacion(function(res){
            x = JSON.parse(res);
            var resp = x.success.dataSql;
            $scope.datos.f01_categoria_agrupada = resp[0].idCategoria;
            $scope.datos.f01_categoria_agrupada_descrip = resp[0].descripcion;
            $scope.datos.f01_tipo_lic = resp[0].idTipoLicencia;//response[0].TipoLicencia;
            $scope.datos.f01_tipo_lic_descrip = resp[0].TipoLicenciaDescripcion;
            $scope.datosactividadDes = resp;
        })
    }


    $scope.LicenciaXCategoriaM = function(idDesarrolladaM,superficie){
        //$scope.datos.rdTipoTramite = 'NUEVO';
        $.blockUI();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        try{
            var nDatosLicM = new getDatosLicencia();
            nDatosLicM.idActividadDesarrollada = idDesarrolladaM;
            nDatosLicM.superficie = superficie;
            nDatosLicM.getDatos_Licencia(function(resDatosLicM){
                var obtLicM = JSON.parse(resDatosLicM);
                var datosLicM = obtLicM.success.dataSql;
                $scope.multiple = datosLicM;
                $scope.multiple.f01_tipo_licmid = datosLicM[0].idTipoLicencia;
                $scope.multiple.f01_tipo_licmdescrip = datosLicM[0].TipoLicenciaDescripcion;
                $scope.multiple.f01_cat_agrupadamid = datosLicM[0].idActividadDesarrollada;
                $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].ADDescripcion;
                $scope.multiple.f01_act_desarrolladamid = idDesarrolladaM;
                var combox      = document.getElementById('f01_act_desarrolladamid');
                selected2   = combox.options[combox.selectedIndex].text;
                $scope.multiple.f01_act_desarrolladamdescrip  = selected2;
                $scope.multiple.f01_tae  = datosLicM[0].tae;
                $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada,$scope.datos.f01_tipo_per);
                //$scope.$apply();
                $.unblockUI();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }
    }


    $scope.guardarLicencia = function(licencia){
        $scope.dscripcionlic ={};
        if($scope.dscripcionlic.f01_act_desarrolladamdescrip=='--Seleccione--'){
            $scope.dscripcionlic.f01_act_desarrolladamdescrip = '';
        }
        if(licencia.f01_tipo_licmid =='' || licencia.f01_tipo_licmid == null || licencia.f01_cat_agrupadamid =='' || licencia.f01_cat_agrupadamid == null ) {
            swal('', 'Llene lo campos requeridos para la Catergoria Multiple  ', 'error');
        } else {
             var id=0
            if($scope.datos.licenciam =='' || $scope.datos.licenciam == null || $scope.datos.licenciam =="undefined" ){
                if($scope.licenciamul =='' || $scope.licenciamul == null || $scope.licenciamul =="undefined" ){
                    $scope.licenciamul = [];
                    id=0;
                }
                id = $scope.licenciamul.length + 1;
            }else{
                if($scope.licenciamul==undefined){
                    $scope.licenciamul = $scope.datos.licenciam;
                }
                id = $scope.licenciamul.length + 1;
            }
            if(id<11){
                $scope.idm = id;
                if($scope.idm == 1){
                    $scope.f01_catagrp_principal = 1;
                    $scope.datos.mulact_principal = $scope.multiple.f01_act_principal;
                    $scope.datos.xf01_idcat_multi_principal = licencia.f01_cat_agrupadamid;
                    $scope.datos.xf01_descat_multi_principal = $scope.dscripcionlic.f01_cat_agrupadamdescrip;
                }else{
                    $scope.f01_catagrp_principal=0;
                }
                $scope.licenciamul.push({
                    id: id,
                    f01_tipo_licmid: licencia.f01_tipo_licmid,
                    f01_cat_agrupadamid: licencia.f01_cat_agrupadamid,
                    f01_act_desarrolladamid: licencia.f01_act_desarrolladamid,
                    f01_tipo_licmdescrip: licencia.f01_tipo_licmdescrip,
                    f01_cat_agrupadamdescrip: licencia.f01_cat_agrupadamdescrip,
                    f01_act_desarrolladamdescrip: licencia.f01_act_desarrolladamdescrip,
                    f01_catagrp_principal: $scope.f01_catagrp_principal,
                    f01_tae: licencia.f01_tae
                });
                console.log(" $scope.licenciamul", $scope.licenciamul);
                $scope.validaEmpredimientoMultiservicio($scope.licenciamul); 
                $scope.validaBebidas($scope.licenciamul); 
                $scope.licdes = [];
                $scope.multiple = [];
                $scope.dscripcionlic = {};
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.validarMensajeInsp(licencia.f01_cat_agrupadamid);
                 /*LISTAR REQUISITOS DINAMICOS*/
                $scope.lstRequisitosMultiples2018($scope.licenciamul);
                $scope.lstRequisitosTecnicosMultiples($scope.licenciamul);
            } else {
                swal('', 'El numero de multiples excede los estandares permitidos', 'error');
            }
        }
    }

    $scope.validaEmpredimientoMultiservicio = function(actividadesMulti){
        var i = 0;
        while(i<actividadesMulti.length){
            $scope.ConsultaEmprendimiento(actividadesMulti[i].f01_act_desarrolladamid);
            if($scope.datos.habilitaEmpredimiento != 'true'){
                i = actividadesMulti.length;
            }else{
                i++;
            }
        }
    }

    $scope.validarMensajeInsp = function(dato){
        var validacion   =   new validarMultiservicio();
        validacion.cadena   =   dato;
        validacion.validacionActividadDesarrollada(function(resultado){
            var resp = JSON.parse(resultado).success.dataSql[0].flujoLargo;
            if(resp == '1'){
                swal("Estimado Ciudadano!", "Usted participara de una inspección!");
            }
        });
    }

    
    $scope.validaBebidas = function(actividadesMulti){
        console.log("actividadesMulti",actividadesMulti);
        var i = 0;
        while(i<actividadesMulti.length){
            if(actividadesMulti[i].f01_tipo_licmid == 18){
                $scope.datos.mostrarPersonal = true;
                i = actividadesMulti.length;
            }else{
                i++;
                $scope.datos.mostrarPersonal = false;
            }
        }
    }

    $scope.Licencia_Multiple = function(dato){
        $scope.licmul_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip|f01_catagrp_principal","titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada|Actividad Principal","impresiones": "true|true|true|true|true|true|true|true|"};
        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.licmul_grilla.push({
                nroElem: j+1,
                f01_tipo_licmid: dato[j].f01_tipo_licmid,
                f01_tipo_licmdescrip: dato[j].f01_tipo_licmdescrip,
                f01_cat_agrupadamid: dato[j].f01_cat_agrupadamid,
                f01_cat_agrupadamdescrip: dato[j].f01_cat_agrupadamdescrip,
                f01_act_desarrolladamid: dato[j].f01_act_desarrolladamid,
                f01_act_desarrolladamdescrip: dato[j].f01_act_desarrolladamdescrip,
                f01_catagrp_principal: dato[j].f01_catagrp_principal
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.licmul_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.Licenmul_grilla=encabezado;
    }

    $scope.detallem = [];
    $scope.editm = {};
    $scope.onlym=false;
    $scope.botonm="new";

    $scope.modificarLic = function(dato){
        $scope.onlym = true;
        $scope.botonm = "upd";
        $scope.multiple = dato;
    }

    $scope.eliminarLic = function(dato){
        if($scope.licenciamul==undefined){
            $scope.licenciamul = $scope.datos.licenciam;
        }        
        $scope.datos.licenciam.splice( $scope.datos.licenciam.indexOf(dato), 1 );
        $scope.idm = $scope.idm - 1;
        $scope.validaEmpredimientoMultiservicio($scope.datos.licenciam);
        $scope.validaBebidas($scope.licenciamul); 
    }

    $scope.modificarLicencia = function(dato){
        $scope.onlym=true;
        $scope.botonm="new";
        delete $scope.editm[dato.idm];
        $scope.multiple=[];
        $scope.validarMensajeInsp(dato.f01_cat_agrupadamid);
    }
 ///TERMINA LICENCIA MULTIPLE

    //UPLOAD  FILES
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;
    var uploader = $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
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
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    /////////////////////////////////////////////////////////////////
    $scope.verificarSuperficie = function(superficie){
        $scope.validarRequisitosForm();
    }

    $scope.calcularCapacidad = function(superficie){
        if(superficie){
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.INT_AC_CAPACIDAD = parseFloat(superficie * 0.9).toFixed(2);
        }
        else{
            $scope.datos.INT_AC_CAPACIDAD = 0;
        }
    }

    $scope.lstRequisitosTecnicosMultiples = function(licenciamul){
        var sconsulta   = '[';
        for(i=0; i<licenciamul.length; i++){
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'N';
            var ndCategoria = new aelstRequisitostecmul();
            ndCategoria.dependencia = aidCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_Requisitostecmul(function(res){
                var result = JSON.parse(res);
                var datosRequisitosTmp = result.success.data;
                datoObjectFinal = [];
                for(j=0; j < datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idrequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descrequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                console.log("entra requisitos",datoObjectFinal);
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            })
        }
    };

    $scope.limpiarlic = function(){
        $scope.datos.f01_tipo_lic_descrip = '';
        $scope.datos.f01_categoria_agrupada_dem = '';
        $scope.datos.f01_categoria_agrupada_descrip = '';
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
    }

    $scope.limpiarcateg = function(){
        $scope.datos.f01_categoria_agrupada_dem = '';
        $scope.datos.f01_categoria_agrupada_descrip = '';
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
    }

    $scope.limpiaractdes = function(){
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
    }

    $scope.GetValueCategoriaAgrupada = function(){
        $scope.limpiarcateg();
        var e = document.getElementById('f01_categoria_agrupada');
        $scope.datos.f01_categoria_agrupada_dem = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoria = function () {
        $scope.limpiaractdes();
        var e = document.getElementById('f01_categoria_descrip');
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyente = function () {
        var e = document.getElementById("f01_zon_prop");
        $scope.datos.f01_zon_prop_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyenteJuridico = function () {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaSegura = function (idCategoria){
        if(idCategoria == 3419 || idCategoria == 3420 || idCategoria == 3421 || idCategoria == 3422 || idCategoria == 3423 || idCategoria == 3424){
            $rootScope.mostrarzonasegura= true;
        }else{
            $rootScope.mostrarzonasegura = false;
        }
    }

    $scope.GetValueActividadSecundaria = function (){
        $scope.actividadSecund = "";
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var i = 0; i < datoslicm.length; i++) {
                if(i+1 == datoslicm.length){
                     datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip;
                }else{
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip +" - ";
                }
            }
        }
        $scope.actividadSecund = datosaux;
        if($scope.datos.f01_categoria_agrupada != 32 || $scope.datos.f01_categoria_agrupada != '32'){
            var e = document.getElementById("f01_categoria_agrupada");
            $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadSecund = $scope.datos.f01_categoria_agrupada_descrip;
        }
        $scope.datos.f01_actividadesSecundarias = $scope.actividadSecund;
    }

    $scope.GetValueActividadDesarrollada = function(){
        $scope.actividadDes = "";
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if(j+1 == datoslicm.length){
                     datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                }else{
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip +" - ";
                }
            }
        }
        $scope.actividadDes = datosaux;
        if($scope.datos.f01_categoria_descrip != 32 || $scope.datos.f01_categoria_descrip != '32'){
            var e = document.getElementById("f01_categoria_descrip");
            $scope.datos.f01_actividad_desarrollada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadDes = $scope.datos.f01_actividad_desarrollada_descrip;
        }
        $scope.datos.f01_actividadesDesarrolladasc = $scope.actividadDes;
    }

    function SortArray(x, y){
        if (x.f01_act_desarrolladamdescrip < y.f01_act_desarrolladamdescrip) {return -1;}
        if (x.f01_act_desarrolladamdescrip > y.f01_act_desarrolladamdescrip) {return 1;}
        return 0;
    }

    $scope.GetValueActividadesCatDesarrollada = function(){
        $scope.datos.licenciam = $scope.datos.licenciam.sort(SortArray);
        $scope.actividadDesCat = "";
        var datosaux = '';
        var datoscat = '';
        var datosact = '';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if(j+1 == datoslicm.length){
                    if(datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18){
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    }
                    else{
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    }
                }else{
                    if(datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18){
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip  +" - ";;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip  +" - ";
                    }
                    else{
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip  +" - ";;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip  +" - ";
                    }
                }
            }
            var swmul = 0;
            for (var k = 0; k < datoslicm.length && swmul == 0; k++) {
                if(datoslicm[k].f01_cat_agrupadamid == 3419 || datoslicm[k].f01_cat_agrupadamid == 3420 || datoslicm[k].f01_cat_agrupadamid == 3421 || datoslicm[k].f01_cat_agrupadamid == 3422 || datoslicm[k].f01_cat_agrupadamid == 3423 || datoslicm[k].f01_cat_agrupadamid == 3424){
                    swmul = 1;
                }else{
                    swmul = 0;
                }
            }
            if(swmul == 1){
                $rootScope.mostrarzonasegura = true;
            }else{
                $rootScope.mostrarzonasegura = false;
            }
        }
        $scope.actividadDesCat = datosaux;
        $scope.datos.f01_actividadesSecundarias = $scope.actividadDesCat;
        console.log("$scope.datos.f01_actividadesSecundarias",$scope.datos.f01_actividadesSecundarias);
        $scope.datos.f01_categorias_multi = datosact;
    }

    $scope.SeleccionaPrioridad = function(dato){
       var arraydata = [];
        $scope.datos.f01_act_principal = '';
        if(dato.f01_cat_agrupadamid == 5 || dato.f01_cat_agrupadamid == 6  || dato.f01_cat_agrupadamid == 25){
            $scope.datos.f01_act_principal = 50;
        }
        if(dato.f01_cat_agrupadamid == 11 || dato.f01_cat_agrupadamid == 12 || dato.f01_cat_agrupadamid == 13 || dato.f01_cat_agrupadamid == 15  || dato.f01_cat_agrupadamid == 60  || dato.f01_cat_agrupadamid == 61 || dato.f01_cat_agrupadamid == 62){
            $scope.datos.f01_act_principal = 30;
        }
        if(dato.f01_cat_agrupadamid == 22){
            $scope.datos.f01_act_principal = 50;
        }
        if(dato.f01_cat_agrupadamid == 3371 || dato.f01_cat_agrupadamid == 3372 || dato.f01_cat_agrupadamid == 3376 || dato.f01_cat_agrupadamid == 3377 || dato.f01_cat_agrupadamid == 3378 || dato.f01_cat_agrupadamid == 3379 ||
           dato.f01_cat_agrupadamid == 3347 || dato.f01_cat_agrupadamid == 3348 || dato.f01_cat_agrupadamid == 3349 || dato.f01_cat_agrupadamid == 3369 || dato.f01_cat_agrupadamid == 3370){
            $scope.datos.f01_act_principal = 70;
        }
        if( dato.f01_cat_agrupadamid == 16 || dato.f01_cat_agrupadamid == 78 || dato.f01_cat_agrupadamid == 79 || dato.f01_cat_agrupadamid == 80 || dato.f01_cat_agrupadamid == 29 || dato.f01_cat_agrupadamid == 76 ||
            dato.f01_cat_agrupadamid == 71 || dato.f01_cat_agrupadamid == 72 || dato.f01_cat_agrupadamid == 73 || dato.f01_cat_agrupadamid == 74 || dato.f01_cat_agrupadamid == 75 || dato.f01_cat_agrupadamid == 77 ||
            dato.f01_cat_agrupadamid == 82 || dato.f01_cat_agrupadamid == 81 || dato.f01_cat_agrupadamid == 28 || dato.f01_cat_agrupadamid == 53 || dato.f01_cat_agrupadamid == 66 || dato.f01_cat_agrupadamid == 67 ||
            dato.f01_cat_agrupadamid == 68 || dato.f01_cat_agrupadamid == 69 || dato.f01_cat_agrupadamid == 70 || dato.f01_cat_agrupadamid == 20 || dato.f01_cat_agrupadamid == 84 || dato.f01_cat_agrupadamid == 86 ||
            dato.f01_cat_agrupadamid == 87 || dato.f01_cat_agrupadamid == 88 || dato.f01_cat_agrupadamid == 90 || dato.f01_cat_agrupadamid == 91 || dato.f01_cat_agrupadamid == 92 || dato.f01_cat_agrupadamid == 93 ){
            $scope.datos.f01_act_principal = 79;
        }
        if(dato.f01_cat_agrupadamid == 59 || dato.f01_cat_agrupadamid == 83 || dato.f01_cat_agrupadamid == 85 || dato.f01_cat_agrupadamid == 89){
            $scope.datos.f01_act_principal = 70;
        }
        $scope.MultipleSeleccionado   =   dato.id;
        arraydata.push(dato);
        $scope.datos.f01_actividad_principal_array = arraydata;
    }

    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction_crearcaso_linea;
        var aDatosCaso      = sdataArchivo.split(',');
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('NROTRAMITEID');
        $scope.docusuario           =   "Ciudadano";
        $scope.archivosMultiples    =   JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES_MAPA);
        $scope.docsistema           =   'AE_EN_LINEA';
        $scope.sIdProcesoActual     =   sessionService.get('IDPROCESO');//aDatosCaso[6];//datosCaso.idProceso;// 1;
        $scope.sCasoNro             =   sessionService.get('NROTRAMITEID');//x;//aDatosCaso[1];//datosCaso.sNrocaso//49;
        $scope.sCasoNombre          =   '15 - ADJUNTOS';
        var aImagenJson =   JSON.parse($scope.archivosMultiples);
        var imgCroquis  = new gDocumentos();
        imgCroquis.doc_sistema              =   $scope.docsistema;
        imgCroquis.doc_proceso              =   $scope.sIdProcesoActual;
        imgCroquis.doc_id                   =   $scope.sCasoNro;
        imgCroquis.doc_ci_nodo              =   $scope.sCasoNombre;
        imgCroquis.doc_url_logica           =   aImagenJson[0].url_archivo;
        imgCroquis.doc_nombre               =   aImagenJson[0].nombre_archivo;
        imgCroquis.doc_titulo               =   aImagenJson[0].titulo;
        imgCroquis.doc_palabras             =   aImagenJson[0].descripcion;
        imgCroquis.doc_datos                =   aImagenJson[0].docdatos;
        imgCroquis.doc_nrotramite_nexo      =   $scope.nrotramitec;
        imgCroquis.doc_usuario              =   $scope.docusuario;
        imgCroquis.doc_url                  =   aImagenJson[0].url_archivo;
        imgCroquis.doc_version              =   0;
        imgCroquis.doc_tiempo               =   0;
        imgCroquis.doc_firma_digital        =   "";
        imgCroquis.doc_registro             =   "";
        imgCroquis.doc_modificacion         =   "";
        imgCroquis.doc_estado               =   'A';
        imgCroquis.doc_tipo_documento       =   "";
        imgCroquis.doc_tamanio_documento    =   "";
        imgCroquis.doc_tps_doc_id           =   0;
        imgCroquis.doc_acceso               =   "";
        imgCroquis.doc_cuerpo               =   "";
        imgCroquis.doc_tipo_documentacion   =   "";
        imgCroquis.doc_tipo_ingreso         =   "";
        imgCroquis.doc_estado_de_envio      =   "";
        imgCroquis.doc_correlativo          =   "";
        imgCroquis.doc_tipo_documento_ext   =   "";
        imgCroquis.doc_id_carpeta           =   0;
        imgCroquis.insertarDoc(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
            } else {
                $.unblockUI();
                swal(resultadoApi.error.message);
            }
        });
    };

    $scope.macrodistritos = function(){
         $scope.aMacrodistritos = {};
        var datosP = new macrodistritoLst();
        datosP.obtmacro(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
                $scope.aMacrodistritos = data.success;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };

    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function(event, data){
        if(data > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = true;
        }
    });

    //validarBtnEnviar
    $scope.validarBtnEnviar =   function(cont){
        if(cont > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = false;
        }
    };

    $scope.getDatos=function(){
        $scope.estado_formulario = "sin_dato";
    };

    $scope.cargarDatos=function(){ //magali
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.inciarUpload();
        $scope.getCaptchasXX();
        if($scope.sTipoPersona =="NATURAL" || $scope.sTipoPersona =="N"){
            if(sessionService.get('ESTADO') == 'NO'){
                $scope.botones = "mostrar";
                $scope.divNatural = "mostrar";
            }
            if(sessionService.get('ESTADO') == 'SI'){
                $scope.botones = "null";
            }
        }
        $scope.macrodistritos();
        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
        $scope.catactividadDesarrollada();
    };

    $scope.inciarUpload =   function(){
        try{
            $('#multiDocsButon').click(function(){
                $('#multiDocsFile').click();
            });
        }catch(e){}
    };

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
            $scope.only                     =   true;
        } else {
            $scope.btnGuardarForm   =   false;
            $scope.only             =   false;
            $scope.desabilitado     =   false;
            $scope.botones          =   "mostar";
        }
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        $.unblockUI();
        $scope.initMap();
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        if(data.length > 0){
            if(data[0].venviado != 'SI'){
                if(data[0].datos.INT_FORM_ALMACENADO != 'G'){
                    $scope.validarActividadEconomica();
                }else{
                    if(data[0].datos.rdTipoTramite == 'NUEVO'){
                        $scope.mostrarMsgNuevaActividad = true;
                        $scope.formDatosAE              = false;
                        $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion. Creara una nueva Actividad Economica.";
                    }else{
                        $scope.validarActividadEconomica();
                    }
                }
            }
        }
    });
    //INICIAR VARIABLES EN EL FORMULARIO
    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        $scope.catactividadDesarrollada();
        $scope.macrodistritos();
        $scope.multiple = [];
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada);
        if ((data.INT_AC_latitud == 'undefined' && data.INT_AC_longitud == 'undefined') || (data.INT_AC_latitud == undefined && data.INT_AC_longitud == undefined) || (data.INT_AC_latitud == '' && data.INT_AC_longitud == '')) {
        } else{
            $scope.open_map_ae2(data.INT_AC_latitud, data.INT_AC_longitud);
        };
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc  =   ((typeof(data.f01_categoria_agrupada)  == 'undefined' || data.f01_categoria_agrupada  == null) ? '' : data.f01_categoria_agrupada);
        if(categoriaAgrupadaDesc != ''){
            if(data.f01_tipo_lic == 32){
                $scope.lstRequisitosTecnicosMultiples(data.licenciam);
            }else{
                $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        }
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            $scope.sCategoria = false;
            $scope.smultiservicios = true;
            $scope.datos.f01_categoria_descrip = data.f01_categoria;
        }
        else{
            $scope.sCategoria = true;
            $scope.smultiservicios = false;
        }

        if (data.f01_tip_via_act == '' || data.f01_tip_via_act == undefined || data.f01_tip_via_act == 'undefined') {} else{
            $scope.cargarNombVia(data.f01_tip_via_act, data.f01_zona_act);
        };
         if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else{
            if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){//verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            }else{
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequsitosDoc(data);



        switch (data.chkzonasegura) {
            case 'ZONASEGURA':
                 $rootScope.mostrarzonasegura = true;
            break;
            case 'NOZONASEGURA':
                 $rootScope.mostrarzonasegura = true;
            break;
            case '':
                 $rootScope.mostrarzonasegura = false;
            break;
            case 'undefined':
                 $rootScope.mostrarzonasegura = false;
            break;
            case undefined:
                 $rootScope.mostrarzonasegura = false;
            break;
            case null:
                 $rootScope.mostrarzonasegura = false;
            break;
        };
        //MOSTRAR VIAE
        if(data.rdTipoTramite1 == 'CON_VIAE'){
            $scope.licenciaToogle4 = true;
        }
        else{
            $scope.licenciaToogle4 = false;
        }
        if (data.pago_adel == 'SI') {
            $scope.IsVisible = true;
        } else{
            $scope.IsVisible = false;
            $scope.datos.pago_adel = 'NO';
        };

        if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            $rootScope.aDistritoZona = {};
            try{
                var parametros = new distritoZona();
                parametros.idMacro = data.f01_macro_act;
                parametros.obtdist(function(resultado){
                    data = JSON.parse(resultado);
                    if(data.success.length > 0){
                        $rootScope.aDistritoZona = data.success;
                    }else{
                        $scope.msg = "Error !!";
                    }
                });
            }catch(error){
            }
        }

        if(typeof($scope.datos.INT_VIA) != 'undefined'){
            var idTipoVia   =   $scope.datos.INT_VIA;
            var tipoVia     =   [
                { name: 'AVENIDA', id: '1'},
                { name: 'CALLE', id: '2'},
                { name: 'CALLEJON', id: '3'},
                { name: 'PASAJE', id: '4'}
            ];
            angular.forEach(tipoVia, function(value, key) {
                if(value.id == idTipoVia){
                    $scope.datos.INT_TIP_VIA  =   value.name;
                }
            });
        }
        //EXTRAYENDO EXPEDIDO
        if(typeof($scope.datos.f01_expedido_prop) != 'undefined'){
            var ideExpedido   =   $scope.datos.f01_expedido_prop;
            var tipoExpedido  =   [
                { name: 'LA PAZ', value:'LPZ', id: '1'},
                { name: 'ORURO', value:'ORU', id: '2'},
                { name: 'POTOSI', value:'PTS', id: '3'},
                { name: 'COCHABAMBA', value:'CBB', id: '4'},
                { name: 'TARIJA', value:'TJA', id: '5'},
                { name: 'CHUQUISACA', value:'CHQ', id: '6'},
                { name: 'SANTA CRUZ', value:'SCZ', id: '7'},
                { name: 'PANDO', value:'PND', id: '8'},
                { name: 'BENI', value:'BNI', id: '9'},
                { name: 'EXTRANJERO', value:'EXT', id: '10'}
            ];
            angular.forEach(tipoExpedido, function(value, key) {
                if(value.id == ideExpedido){
                    $scope.datos.f01_expedido_prop  =   value.value;
                }
            });
        }
        /*REQUISITOS2018*/
        $scope.open_mapa_ae();
        
    });//INICIAR CAMPOS INTERNET

    //fecha del servidor
    $scope.obtenerFecha = function(){
        var sfecha = "";
        try{
            var fechaactualn = new fechaserver();
            fechaactualn.obtfechahora(function(resultado){
                sfecha  =   JSON.parse(resultado).success.fecha;
            });
            var sfechafinal =   "";
            if(sfecha != null && sfecha != "") {
                var snuevafecha = "";
                var nrof    =   0;
                try{
                    nrof    =   sfecha.split("/").length;
                }catch(e){}
                if(nrof > 1){
                    var dateString = sfecha;
                    var dateParts = sfecha.split("/");
                    snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);// month is 0-based
                }else{
                    snuevafecha = new Date(sfecha);
                }
                var messnuevafecha = "";
                var diasnuevafecha = "";
                if(snuevafecha != 'Invalid Date'){
                    messnuevafecha        =     snuevafecha.getMonth()+1;
                    messnuevafecha        =     (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                    if (snuevafecha.getDate()<10){
                        diasnuevafecha = "0" + (snuevafecha.getDate());
                    }else{
                        diasnuevafecha = snuevafecha.getDate();
                    }
                    sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
                    $scope.anioserver = snuevafecha.getFullYear();
                }
            } else {
                sfechafinal =  sfecha;
            }
            $scope.fechafinalserver = sfechafinal;
            return sfechafinal;
        }catch(e){
            $.unblockUI();
        }
    };

    $scope.obtenerHora = function(){
        var sfecha = "";
        var fechaactualh = new fechaserver();
        fechaactualh.obtfechahora(function(resultado){
            sfecha  =   JSON.parse(resultado).success.fecha;
        });
        var sfechafinal =   "";
        if(sfecha != null && sfecha != "") {
            snuevafecha = new Date(sfecha);
            var shora     = "";
            var sminuto   = "";
            var ssegundo  = "";
            shora       =   snuevafecha.getHours();
            sminuto     =   snuevafecha.getMinutes();
            ssegundo    =   snuevafecha.getSeconds();
            sfechafinal =   shora + ":" + sminuto + ":" + ssegundo;
        } else {
            sfechafinal =  sfecha;
        }
        return sfechafinal;
    };

    $scope.cambioToggle1 = function(dato){
        $scope.lscategoria();
        $scope.lssubcategoria();
        if ( dato == "CON_VIAE") {
            $scope.datos.adjuntoViae = [];
            $scope.licenciaToogle4 = true;
        } else {
            console.log($scope.datos.publicidad.length,$scope.datos.publicidad);
            if($scope.datos.publicidad.length == 0){
                $scope.licenciaToogle4 = false;
            }else{
                swal('', "No se puede seleccionar como actividad sin publicidad,debe eliminar las publicidades registradas", 'warning');
                $scope.datos.rdTipoTramite1 = "CON_VIAE";
                document.getElementById("CON_VIAE").checked = true;
            }
        }
    }

    $scope.IsVisible = false;
    $scope.ShowPa = function(valor) {
        $scope.pago_adelantado = valor;
        if (valor == 'SI') {
            $scope.IsVisible = true;
        } else{
            $scope.IsVisible = false;
        };
    }

   /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
   $scope.cambioToggleForm = function () {
        //$scope.validarRequisitosForm();
        $scope.botones = "mostrar";
        $scope.desabilitado = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.formDatosAE = false;
        $scope.mostrarMsgActividadTrue = false;
        $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
        //NUEVO
        $scope.tipoCategoria = false;
        $scope.actividadDesarrollada = true;
        $scope.datos.f01_id_actividad_economica = '';
        $scope.datos.f01_nro_orden = "";
        $scope.datos.f01_nit = '';
        $scope.datos.f01_raz_soc = '';
        $scope.datos.f01_sup = '';
        $scope.datos.f01_cap_aprox = '';
        $scope.datos.f01_de_hor = '';
        $scope.datos.f01_a_hor = '';
        $scope.datos.f01_fecha_ini_act = '';
        $scope.datos.f01_estab_es = '';
        $scope.datos.f01_macro_act = '';
        $scope.datos.f01_macro_act_descrip = '';
        $scope.datos.f01_dist_act = '';
        $scope.datos.f01_dist_act_descrip = '';
        $scope.datos.f01_tip_via_act = '';
        $scope.datos.f01_zona_act = '';
        $scope.datos.f01_zona_act_descrip = '';
        $scope.datos.f01_num_act = '';
        $scope.datos.f01_num_act1 = '';
        $scope.datos.f01_edificio_act = '';
        $scope.datos.f01_bloque_act = '';
        $scope.datos.f01_piso_act = '';
        $scope.datos.f01_dpto_of_loc = '';
        $scope.datos.f01_tel_act1 = '';
        $scope.datos.f01_cod_luz = '';
        $scope.datos.f01_idCodigoZona = '';
        $scope.datos.f01_casilla = '';
        $scope.datos.f01_productosElaborados = '';
        $scope.datos.f01_factor = '';
        $scope.datos.f01_tip_act = '';
        $scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_tipo_lic_descrip = '';
        $scope.datos.f01_categoria = '';
        $scope.datos.f01_categoria_descrip = '';
        $scope.datos.f01_categoria_agrupada = '';
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descrip = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.licenciaToogle1 = false;
        $scope.licenciaToogle2 = true;
        $scope.licenciamul = '';
        $scope.publicidad = '';
        $scope.publicidad_grilla = '';
        $scope.datos.publicidad ='';
        $scope.licdes=[];
        $scope.multiple=[];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.licmul_grilla = '';
        $scope.datos.Licenmul_grilla = '';
        $scope.datos.mulact_principal = '';
        $scope.publicid = '';
        $scope.datos.f01_actividad_principal_array = [];
        $scope.datos.fileArchivosAd ='';
        $scope.datos.FILE_CI='';
        $scope.datos.FILE_MAPA='';
        //pago adelantado
        $scope.datos.pago_adel = '';
        $scope.datos.nro_ges = '';
    };

    // =========================================FIN DE LA PARTE DE LA VIA===================================//
    //DOCUMENTOS ADJUNTOS OBLIGATORIOS
    var clsIniciarFechaObligatorio = $rootScope.$on('inicializarFechaOblitatorio', function(event, data){
        var archivosAdjuntos    =   ((typeof(data.ARCHIVOS_MULTIPLES) == 'undefined') ? "" :data.ARCHIVOS_MULTIPLES);
        if(archivosAdjuntos.length > 0){
            $scope.adjuntoObligatorio       =   false;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";
        }else{
            $scope.adjuntoObligatorio       =   true;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        }
    });

    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data){
        $scope.btnEnviarForm    =   false;
        if(data){
            if(data == 'G'){
                $scope.btnEnviarFormLinea    =   false;
                $scope.desabilitado     =   true;
            }else if(data == 'C'){
                $scope.btnEnviarFormLinea    =   true;
                $scope.desabilitado     =   false;
                $scope.botones          =   "mostrar";
            }
        }
    });

    $scope.$on('$destroy', function() {
        setTimeout(function(){
            clsValidarBtnEnviar();
            clsIniciarCamposInternet();
            clsIniciarGrillaAE();
            clsIniciaBtnHabilitar();
            clsIniciarHtmlForm();
        },2000);
    });

    /*INTERNET EN LINEA*/
    $scope.tblActividaEco        =   {};
    $scope.lstActividadEco       =   [];
    $scope.formDatosAE           =  false;
    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];

    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual  =   "";
    $scope.nroOrdenActividiadEconomicaActual  =   "";
    $scope.idContribuyenteAEActual  =   "";

    $scope.validarActividadEconomica  =   function(){
        //$.blockUI();
        //$scope.mostrarMsgActividadTrue  = false;
        //$scope.mostrarMsgActividadFalse = false;
        //$scope.mostrarMsgNuevaActividad = false;
        //$scope.listarAE();
        $scope.cambioToggleForm();
    };

    /*$scope.actulizarIdDistrito  =   function(idZona){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var zonaDes      = "";
        var distNombre  = idZona;
        if($scope.aMacroZona){
            angular.forEach($scope.aMacroZona, function(value, key) {
                if(value.dist_id == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    zonaDes      =   value.dist_nombre;
                }
            });
        }
        $scope.datos.f01_dist_act    =   idDistrito;
        $scope.datos.f01_dist_act_descrip = "DISTRITO "+idDistrito;
        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.f01_zona_act_descrip = zonaDes;
        $scope.desabilitadoNo=true;
        //$scope.datos.f01_nom_via_prop = "";
        //$scope.datos.f01_tip_via_prop = "";
    };*/

    $scope.mostrarCamposJuegos = function(){
        $scope.divOcultarJuegos = true;
    };

    $scope.ocultarCamposJuegos = function(){
        $scope.divOcultarJuegos = false;
    }
    ////////////////REQUISITOS 2018/////////
    $scope.aDocObligarios = new Array();
    $scope.cambiarFile = function(obj, valor){
        $scope.datos[obj.name] = valor;
        setTimeout(function(){
            $rootScope.leyenda1 = obj.name;
        }, 500);
        /*REQUISITOS2018*/
        $scope.subirRequisitos(obj, valor);
    };

    /*REQUISITOS2018*/
    $scope.subirRequisitos  =   function(sobj, svalor){
        var rMisDocs = new Array();
        var idFiles = new Array();
        if(sobj.files[0]){
            rMisDocs.push(sobj.files[0]);
            var idFile = sobj.name;
            var tam = idFile.length;
            idFile = parseInt(idFile.substring(10,tam));
            idFiles.push(idFile);
            if(sobj.name == 'f01_carnet_manipulacion'){
                $scope.almacenarCarnetsManipulacion(rMisDocs,idFiles);
            }else{   
                $scope.almacenarRequisitos(rMisDocs,idFiles);
                $scope.adicionarArrayDeRequisitos(sobj,idFile);
            }
        }
    };


    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.adicionarArrayDeRequisitos = function(aArch,idFile){
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        angular.forEach($scope.docArray, function(doc, pos) {
            console.log("doc",doc);
            if(doc.resid == idFile){
                descDoc = doc.desNom;
            }
        })
        var imagenNueva = aArch.files[0].name.split('.');
        var tam = aArch.files[0];
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
            if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif") {
                var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile){
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[imagenFile.length-1];
                    nombreFileN = descDoc + '_'+fechaNueva+'.'+tipoFile;
                });
            }
        }
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
        var adatafile   =   {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
        $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        $scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
    }
    /*REQUISITOS2018*/
    $scope.clonarRequisitosDocumentales = function(aRequArchivos){
        var i = 0;
        $scope.File_Adjunto =   {};
        datoObjectFiles = [];
        var longdato = 0;
        angular.forEach(aRequArchivos, function(archivo, key) {
            datoObjectFiles[i] = archivo;
            i = i +1;
        });
        $scope.datos.fileArchivosAd = datoObjectFiles;
    }

    $scope.ultimoArrayAdjunto = function(){
        //$scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        if($scope.datos.f01_tipo_lic !=32){
            $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        }
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile4 = new Object();
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + nombre_mapa + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.nombre = 'CROQUIS DE UBICACIÓN DE LA ACTIVIDAD ECONÓMICA';
        datoObjectFiles[0] = datoObjectFile4;
        $scope.datos.FILE_MAPA = datoObjectFiles;
        $rootScope.FileAdjuntos =  $scope.datos.FILE_CI.concat($scope.datos.FILE_MAPA,$scope.datos.fileArchivosAd);
    }
    /*REQUISITOS2018*/
    $scope.almacenarRequisitos = function(aArchivos,idFiles){
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            //var tamaniofile = obj.files[0];
            if(typeof(archivo) != 'undefined'){
                console.log("$scope.docArray",$scope.docArray);
                angular.forEach($scope.docArray, function(doc, pos) {
                    console.log("doc.resid",doc.resid,"idFiles",idFiles[key],"if",doc.resid == idFiles[key]);
                    if(doc.resid == idFiles[key]){
                        if( doc.desNom != undefined){
                            descDoc = doc.desNom;
                        }
                    }
                })
                console.log("descDoc",descDoc);
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
                if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile){
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[imagenFile.length-1];
                            var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                        });
                        $.unblockUI();
                    }else{
                        if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        }
                        else{
                            $.unblockUI();
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                }
                else{
                    if (archivo.size <= 500000) {
                        if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else{
                            $.unblockUI();
                            swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                    if (archivo.size > 15000000) {
                        $.unblockUI();
                        swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
                    };
                }
            }else{
            }
        });
    };

    /*REQUISITOS2018*/
    $scope.validarRequisitosForm = function(){
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
      //INICIAR DOCUMENTOS DE IDENTIDAD
        angular.forEach($scope.docArray, function(value, key) {
            console.log("value",value);
        //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
            if(value.idnro == 1){
                document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Anverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianverso  = $scope.datos.FILE_FOTOCOPIA_CI;
                if(scianverso == '' || scianverso == 'undefined' || scianverso == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }
                else{
                    document.getElementById('txt_f01_upload'+value.resid).value = scianverso;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianverso + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            if(value.idnro == 2){
                document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Reverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianversor  = $scope.datos.FILE_FOTOCOPIA_CI_R;
                if(scianversor == '' || scianversor == 'undefined' || scianversor == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = scianversor;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianversor + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            /* //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
            if(value.idnro == 3 || value.idnro == 4){
                var sviae  = $scope.datos.rdTipoTramite1;
                if(sviae  == 'SIN_VIAE'){//sin viae
                    $scope.docArray[key].estado = false;
                }else{
                    $scope.docArray[key].estado = true;
                }
            }*/
            if($scope.datos.f01_tipo_lic != 18 && $scope.datos.mostrarPersonal != true){
                //VALIDANDO LA SUPERFICIE DE LA ACTIVIDAD ECONOMNICA
                var ssuperficie = $scope.datos.f01_sup;
                if(ssuperficie){
                    if(value.idnro == 5){
                        if(ssuperficie <= 100){
                            $scope.docArray[key].estado = false;
                        }else{
                            $scope.docArray[key].estado = true;
                        }
                    }
                }
                //VALIDANDO LA REGLA SI LA ACTIVIDAD ECONOMICA ES PROPIA O ALQUILADA
                var sestablecimiento = $scope.datos.f01_estab_es;
                if(sestablecimiento){
                    if(value.idnro == 10){
                        switch (sestablecimiento) {
                            case 'PROPIO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'ALQUILADO':
                                $scope.docArray[key].estado = true;
                            break;
                            case 'ANTICRÉTICO':
                                $scope.docArray[key].estado = true;
                            break;
                            case 'OTRO':
                                $scope.docArray[key].estado = true;
                            break;
                        }
                    }
                    if(value.idnro == 11){
                        switch (sestablecimiento) {
                            case 'PROPIO':
                                $scope.docArray[key].estado = true;
                            break;
                            case 'ALQUILADO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'ANTICRÉTICO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'OTRO':
                                $scope.docArray[key].estado = false;
                            break;
                        }
                    }
                }
            }
        //zonasegura sinmostrar adjuntos
            var szonasegura = $scope.datos.chkzonasegura;
            if(szonasegura){
                if(value.idnro == 12){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                    }
                }
                if(value.idnro == 13){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                    }
                }
                if(value.idnro == 14){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                    }
                }
                if(value.idnro == 15){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                    }
                }
            }else{
                if(value.idnro == 12){
                    $scope.docArray[key].estado = false;
                }
                if(value.idnro == 13){
                    $scope.docArray[key].estado = false;
                }
                if(value.idnro == 14){
                    $scope.docArray[key].estado = false;
                }
                if(value.idnro == 15){
                    $scope.docArray[key].estado = false;
                }
            }
            var stipotramite = $scope.datos.rdTipoTramite;
            if(stipotramite){
                if(value.idnro == 16 || value.idnro == 12 || value.idnro == 21 || value.idnro == 22 || value.idnro == 28){
                    switch (stipotramite) {
                        case 'NUEVO':
                            $scope.docArray[key].estado = false;
                        break;
                    }
                }
            }
            if ($scope.datos.f01_categoria_descrip == 301 || $scope.datos.f01_categoria_descrip == '301') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = false;
                }
            }
            if ($scope.datos.f01_categoria_descrip == 300 || $scope.datos.f01_categoria_descrip == '300') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = true;
                }
            }
            ////////////////////////FOOD TRUCK//////////////////////////////////
            if ($scope.datos.f01_categoria_descrip == 211 || $scope.datos.f01_categoria_descrip == '211') {
                if(value.idnro == 5 || value.idnro == 10 || value.idnro == 11 || value.idnro == 16 || value.idnro == 23 || value.idnro == 24 || value.idnro == 30){
                    $scope.docArray[key].estado = false;
                }
                var vehiculoft = $scope.datos.f01_vehiculo_ft;
                if(vehiculoft){
                    if(value.idnro == 25){
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = true;
                            break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = false;
                            break;
                        }
                    }
                    if(value.idnro == 26){
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                            break;
                        }
                    }
                    if(value.idnro == 27){
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                            break;
                        }
                    }
                    if(value.idnro == 28){
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                            break;
                        }
                    }
                    if(value.idnro == 29){
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                            break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                            break;
                        }
                    }
                }
            }
            if ($scope.datos.f01_categoria_descrip == 212 || $scope.datos.f01_categoria_descrip == '212') {
                if(value.idnro == 25 || value.idnro == 26 || value.idnro == 27 || value.idnro == 28 || value.idnro == 29 || value.idnro == 30){
                    $scope.docArray[key].estado = false;
                }
            }
            $scope.$apply();
            //////////////////////////////////////////////////////////
        });

    }

    $scope.iniciarRequsitosDoc = function(data){
        var validarpromesas = [$scope.iniciarRequisitosForm(data)];
            $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
        });
    }

    /*REQUISITOS2018*/
    $scope.iniciarRequisitosForm = function(data){
        $scope.fileArRequisitos = {};
        if(data.sArrayFileArRequisitos){
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function(){
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_"+key).val(value.campo);
                    //deferred.resolve(data);
                });
                $scope.validarRequisitosForm();
            },3000);
        }
        //return deferred.promise;
    }

    $scope.archotro = false;
    $scope.archpdf = false;
    $scope.vizualizarImagen = function(imagen){
        var extencionpri = imagen.split('.');
        var extencionseg = extencionpri[4].split('?');
        if( extencionseg[0] == "png" || extencionseg[0] == "jpg" || extencionseg[0] == "JPG"|| extencionseg[0] == "jpeg" || extencionseg[0] == "gif" || extencionseg[0] == "PNG" || extencionseg[0] == "JPEG" || extencionseg[0] == "GIF"){
            var imga = imagen;
            imga = imga.replace(/Ñ/gi,"%d1");
            imga = imga.replace(/ñ/gi,"%f1");
            imga = imga.replace(/Á/gi,"%c1");
            imga = imga.replace(/á/gi,"%e1");
            imga = imga.replace(/É/gi,"%c9");
            imga = imga.replace(/é/gi,"%e9");
            imga = imga.replace(/Í/gi,"%cd");
            imga = imga.replace(/í/gi,"%ed");
            imga = imga.replace(/Ó/gi,"%d3");
            imga = imga.replace(/ó/gi,"%f3");
            imga = imga.replace(/Ú/gi,"%da");
            imga = imga.replace(/ú/gi,"%fa");
            imga = imga.replace(/“/gi,"%93");
            imga = imga.replace(/”/gi,"%94");
            imga = imga.replace(/&/gi,"%26");
            $scope.archotro = true;
            $scope.archpdf = false;
            $scope.archivoP=imga;
            $('#imgSalida').attr("src",imga);
        }else if (extencion[1] == "pdf"){
            $scope.archotro = false;
            $scope.archpdf = true;
            $('#visorFum object').attr('data',imagen);
        }else{ document.location = imagen;}
    }

    /*REQUISITOS2018*/
    $scope.getRequisitosFormulario = function(sidcategoria, stipoper){
        if(stipoper == 'NATURAL'){
            stipoper = 'N';
        }
        if($scope.datos){
            var idCategoria = sidcategoria;
            var persona = stipoper;
            if(typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = idCategoria;
                ndCategoria.stipopersona = 'N';
                ndCategoria.stipo = "EMISION";
                ndCategoria.aelstRequisitos2018(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    console.log("datosRequisitosTmp",datosRequisitosTmp);
                    datoObjectFinal = [];
                    for(j=0; j<datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado   = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }

                    datoObjectFinal.push({"resid":3025,"desNom":"foto_frontis","estado":true,"nomcampo":"f01_upload5","resvalor":"Fotografía del frontis de la actividad económica que evidencie los elementos publicitarios con las que cuente."});
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018 - array*/
    $scope.lstRequisitosMultiples2018 = function(licenciamul){
        var sconsulta   = '[';
        for(i=0; i<licenciamul.length; i++){
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'N';
            if(typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018array();
                ndCategoria.asidcategoria = aidCategoria;
                ndCategoria.astipopersona = persona;
                ndCategoria.aelstRequisitos2018_array(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for(j=0; j<datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObject.estado=true;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018*/
    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
            $scope.tipoAdjunto = '';
        }else{
            alert("Error ");
        }
    };

    // ***********************  MAPA     **************************************************************************************************************************************************
    /////////////////////  MAPA CON OL4 ///////////////////////////////////////////
    var map = new ol.Map();

      var epsg32719 = 'EPSG:32719';
      var epsg4326 = 'EPSG:4326';
      proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
      proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');


      var vectorSourceB = new ol.source.Vector({});
      var vectorLayerZonas = new ol.layer.Vector();

      var vectorSource = new ol.source.Vector();
      var vectorLayer = new ol.layer.Vector({source: vectorSource});

      //map.addLayer(vectorLayerZonas);

      var myStyleZonas = new ol.style.Style({
               stroke : new ol.style.Stroke({color : 'blue',width : 1}),
               fill : new ol.style.Fill({color: 'transparent'})
      });

      var view = new ol.View({
                              //projection: projection19,
                              center: ol.proj.fromLonLat([ -68.122455, -16.498960]),
                              zoom: 16
                              //minZoom: 2,
                              //maxZoom: 20
      });

      var buscar = document.getElementById('buscar');
      var vectorLayer_inci_alta = new ol.layer.Vector();
      var vectorLayer_inci_media = new ol.layer.Vector();
      var vectorLayer_inci_baja = new ol.layer.Vector();

      var vectorLayer_ambulancias = new ol.layer.Vector();
      var vectorLayer_gruas = new ol.layer.Vector();
      var vectorLayer_motos = new ol.layer.Vector();
      var vectorLayer_patrullas = new ol.layer.Vector();
      var vectorLayer_camionetas = new ol.layer.Vector();

      var vectorLayer_poligonos = new ol.layer.Vector();
      map.addLayer(vectorLayer_poligonos);
      var vectorLayer_lineas = new ol.layer.Vector();
      map.addLayer(vectorLayer_lineas);

      var geojson_empiezo = '{"type":"FeatureCollection","name":"puntos_geo_3857","crs":{"type":"name","properties":{"name": "urn:ogc:def:crs:EPSG::3857"}},"features": [';
      var geojson_cuerpo ='';
      var geojson_fin = ']}';
      var geojson_c = '';
      var centro = '';
      var geo_cuerpo_l = '';
      var geo_cuerpo_p = '';

      var geo_empiezo = '{"type":"FeatureCollection","name":"puntos_geo_3857","crs":{"type":"name","properties":{"name": "urn:ogc:def:crs:EPSG::3857"}},"features": [';
      var geo_fin = ']}';

      var coord ='';
      //$scope.popup = '';

      var popup = document.getElementById('popup');
      var popup_closer = document.getElementById('popup-closer');
      var popup_content = document.getElementById('popup-content');
      var olpopup = new ol.Overlay({element: popup,autoPan: false});


      var iconStyle_riesgo = new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                      color: 'blue'
                    })
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

      var osm_udit = new ol.layer.Tile({
                                  title: 'OSM',
                                  visible: true,
                                  //render: 'canvas',
                                  source: new ol.source.TileWMS({
                                                                  url: 'http://192.168.6.46:8080/geoserver/DEGEM/wms',
                                                                  //url: 'http://localhost:8090/geoserver/DEGEM/wms',
                                                                  params: {'LAYERS': 'DEGEM:osm_udit', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                                  serverType: 'geoserver'
                                                                  ,crossOrigin: 'Anonymous'
                                                                })
      });

      var municipios = new ol.layer.Tile({
        title: 'Municipio',
            visible: true,
            source: new ol.source.TileWMS({
                url: 'http://sitservicios.lapaz.bo/geoserver/wms',
                params: { 'LAYERS': 'g_municipio', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
                serverType: 'geoserver',
                crossOriginKeyword: 'anonymous'
        })
      });

      var img_sat_2018 = new ol.layer.Tile({
                                              title: 'Kompsat 2018',
                                              visible: false,
                                              //render: 'canvas',
                                              source: new ol.source.TileWMS({
                                                                              url: 'http://192.168.5.94:8080/geoserver/wms',
                                                                              params: {'LAYERS': 'raster:kompsat_2018', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                                              serverType: 'geoserver',
                                                                              crossOrigin: '*'
                                                                            })
      });

      var macrodistritos = new ol.layer.Tile({
        title: 'Macrodistritos 2017',
        visible: false,
        source: new ol.source.TileWMS({
            url: 'http://192.168.5.94:8080/geoserver/wms',
            params: {'LAYERS': 'lapaz:macrodistritos_2017', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'lp_macrodistritos2017','TILED': true},
            crossOriginKeyword: 'anonymous'
        })
      });

      var riesgos_2011 = new ol.layer.Tile({
            title: 'Zonas de Riesgo',
            opacity: 0.5,
            visible: true,
            source: new ol.source.TileWMS({
                url: 'http://sitservicios.lapaz.bo/geoserver/wms',
                params: { 'LAYERS': 'g_riesgos_2011', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
                serverType: 'geoserver',
                crossOriginKeyword: 'anonymous'
            })
      });

      var distritos_m_2017 = new ol.layer.Tile({
                              title: 'Distritos Municipales 2017',
                              visible: false,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                             url: 'http://192.168.5.94:8080/geoserver/wms',
                                                              params: {'LAYERS': 'lapaz:distritos_2017', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'lp_distritos2017','TILED': true},
                                                              serverType: 'geoserver',
                                                              crossOrigin: '1'
                                                            })
      });

      var restitucion_2006 = new ol.layer.Tile({
                              title: 'Restitucion 2006',
                              visible: false,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                              url: 'http://192.168.5.94:8080/geoserver/wms',
                                                              params: {'LAYERS': 'g_restitucion_2006', 'VERSION': '1.1.0','FORMAT': 'image/png','TILED': true},
                                                              serverType: 'geoserver',
                                                              crossOrigin: '1'
                                                            })
      });

      var planimetria = new ol.layer.Tile({
                              title: 'Planimetria',
                              visible: false,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                              url: 'http://192.168.5.94:8080/geoserver/wms',
                                                              params: {'LAYERS': 'archivo:planimetrias', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'planimetrias_desc','TILED': true},
                                                              serverType: 'geoserver',
                                                              crossOrigin: '1'
                                                            })
      });

      var ortofotos_2006 = new ol.layer.Tile({
                              title: 'Ortofotos 2006',
                              visible: false,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                             url: 'http://192.168.5.94:8080/geoserver/wms',
                                                              params: {'LAYERS': 'lapaz:ortofotos2006', 'VERSION': '1.1.0','FORMAT': 'image/jpeg','TILED': true},
                                                              serverType: 'geoserver',
                                                              crossOrigin: '1'
                                                            })
      });

      function buscar_ubicacion()
      {
        var nombre_1 = new Array();
        var f = '';
        var nombre = document.getElementById('busqueda').value;
        nombre = nombre.toUpperCase();
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
          map.removeLayer(vectorLayerZonas);
        }
        else
        {
          if(tipo == 'lugares')
          {
            map.removeLayer(vectorLayerZonas);
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
              geo_zona = JSON.stringify(geo_zona);
              vectorLayerZonas.setSource(new ol.source.Vector({
                                                           features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
              }));

              vectorLayerZonas.setStyle(myStyleZonas);

              map.addLayer(vectorLayerZonas);
              map.getView().setCenter([xx,yy]);
              map.getView().setZoom(15);
            }
          }
          if(c==0)
          {
            var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
          }
        }
      }
    ///////////////////////////////////////////////////////////////////////////////
    var latitud = 0;
    var longitud = 0;
    var activarClick = false;
    var versionUrl = "";
    var markerToClose = null;
    var dynamicMarkers;
    var vNroInsidenciaG = 0;
    var recargaMapita;
    var map;
    var markers = [];

    $scope.initMap = function() {
        var haightAshbury = {
            lat: -16.495635,
            lng: -68.133543
        };
        try{
            map = new google.maps.Map(document.getElementById('mapActividad'), {
                zoom: 15,
                center: haightAshbury
            });
            map.addListener('click', function(event) {
                $scope.deleteMarkers();
                $rootScope.laaa = event.latLng.lat();
                $rootScope.looo = event.latLng.lng();
                $scope.datos.INT_AC_latitud = $rootScope.laaa;
                $scope.datos.INT_AC_longitud = $rootScope.looo;
                $scope.addMarker(event.latLng);
            });
        }catch(err){}
    }

    // Adds a marker to the map and push to the array.
    $scope.addMarker = function(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    $scope.setMapOnAll = function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    $scope.clearMarkers = function() {
        $scope.setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
        $scope.setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
        $scope.clearMarkers();
        markers = [];
    }

    $scope.convertToDataURLviaCanvas = function (url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    $scope.subirImgBase64= function(imagen,url,nombre){
        var contentType = 'image/png';
        var b64Data = imagen;
        var blob = b64toBlob(b64Data, contentType);
        var blobUrl = URL.createObjectURL(blob);
        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        blob.name = nombre;
        var resFormulario = {
            container:url,
            file_path:nombre,
            body:blob
        };
        fileUpload.uploadFileToUrl(blob, uploadUrl);
    };

    var aDocAdjuntosmapa = new Object();
    $scope.capturarImagen = function(){
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        //var latitud = $rootScope.laaa;
        //var longitud = $rootScope.looo;
        var latitud =  $scope.datos.INT_AC_latitud;
        var longitud = $scope.datos.INT_AC_longitud;

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.url = "RC_CLI/" + $scope.oidCiudadano + "/" + sDirTramite;
        $scope.archivo1 = sDirTramite+"croquisActividad.jpg";
        $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL+"/files/"+$scope.url + "/"+ $scope.archivo1 + "?app_name=todoangular";
        aDocAdjuntosmapa = [];
        var datosAdjuntosmapa = {
            "nombre_archivo" : $scope.archivo1,
            "tam_archivo" : '0',
            "estado_archivo" : "Env.",
            "opcion_archivo" : "-",
            "url_archivo" : $scope.datos.INT_AC_direccionImagenmapa,
            "docdatos" : "Croquis de la actividad",
            "descripcion" : "Croquis de la actividad",
            "titulo" : "Croquis"
        };
        aDocAdjuntosmapa[0]=datosAdjuntosmapa;
        $scope.datos.ARCHIVOS_MULTIPLES_MAPA = aDocAdjuntosmapa;
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=18&size=900x500&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
            var Imagen = base64Img.replace(/data:image\/png;base64,/i,'');
            $scope.Imagenb = Imagen;
            $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
        });
    }
    //DATOS PUBLICIDAD ->   categoria -> tipo de letrero  ***********************************************************************************************************************************
    $scope.verSuperficie = function(p){
        if (p==false || typeof(p)=='undefined'){
            $scope.publi.INT_ALTO = 0;
            $scope.publi.INT_ANCHO = 0;
            $scope.especial="mostrar";
        } else {
            $scope.especial=null;
        }
    }

    $scope.modificarPlubli = function(dato){
        $scope.onlyy=true;
        $scope.botonn="upd";
        $scope.publi=dato;
        $scope.publi.INT_ALTO = parseFloat(dato.INT_ALTO);
        $scope.publi.INT_ANCHO = parseFloat(dato.INT_ANCHO);
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
        if($scope.datos.fileArRequisitosViae != undefined){
            var key = "f01_upload"+dato.id;
            delete $scope.datos.fileArRequisitosViae[key];
        }
    }

    $scope.eliminarPublicidad= function(data){
        swal({
                title: 'Eliminar',
                text: 'Esta seguro de Eliminar la Publicidad?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'SI',
                closeOnConfirm: true
            }, function() {
                $scope.publicid.splice($scope.publicid.indexOf(data), 1);
                $scope.eliminarPublicidadGrilla(data);
        });
    }

    $scope.eliminarPublicidadGrilla = function(fila){
        var indexini    = 0;
        var indexfin    = -1;
        var results     = $scope.datos.publicidad_grilla;
        $.each(results, function(key, value){
            if(key > 0){
                if(fila.alto == value.alto && fila.ancho == value.ancho && fila.caracteristica == value.caracteristica && fila.cara == value.cara && fila.superficie == value.superficie && fila.descripcionTipoLetrero == value.descripcionTipoLetrero){
                    indexfin = indexini;
                }
            }
            indexini++;
        });
        if(indexfin != -1){
            $scope.datos.publicidad_grilla.splice(indexfin, 1);
        }
        $scope.$apply();
    }

    $scope.guardarpublicidad = function(public){
        if (public.INT_SUPERFICIE) {
            if(public.INT_CARA =='' || public.INT_CARA == null ||
            public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
            public.INT_DESC =='' || public.INT_DESC == null || public.INT_SUPERFICIE =='' || public.INT_SUPERFICIE == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id=0
                if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
                    if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
                        $scope.publicid = [];
                        id=0;
                    }
                    id = $scope.publicid.length + 1;
                }else{
                    id = $scope.publicid.length + 1;
                }
                if(id<21){
                    total = parseFloat(public.INT_SUPERFICIE);
                    if (total < 18) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            //INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(0).toFixed(2),
                            INT_ANCHO: parseFloat(0).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP:total.toFixed(2)
                        });
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        } else {
            if(public.INT_CARA =='' || public.INT_CARA == null ||
            public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
            public.INT_DESC =='' || public.INT_DESC == null || public.INT_ALTO =='' || public.INT_ALTO == null || public.INT_ANCHO =='' || public.INT_ANCHO == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id=0
                if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
                    if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
                        $scope.publicid = [];
                        id=0;
                    }
                    id = $scope.publicid.length + 1;
                }else{
                    id = $scope.publicid.length + 1;
                }
                if(id<21){
                    total = parseFloat(public.INT_ALTO) * parseFloat(public.INT_ANCHO);
                    if (total < 18) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            //INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(public.INT_ALTO).toFixed(2),
                            INT_ANCHO: parseFloat(public.INT_ANCHO).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP:total.toFixed(2)
                        });
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                        $scope.datos.adjuntoViae.push({
                            "resid":id,
                            "resvalor":" Fotografías del elemento de identificación de la actividad económica - VIAE "+id+" (Lateral y Frontal)",
                            "nomcampo":"f01_upload_viae"+id,
                            "estado":true
                        });
                        setTimeout(function(){
                            iniciarLoadFyleViae();
                        }, 1000);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        }
    }

    $scope.Plubli_Grilla = function(dato){
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO|INT_SUP|INT_CATE|","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho|Superficie|Categoria","impresiones": "true|true|true|true|true|true|true|true|false"};
        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publi_grilla.push({
                nroElem: j+1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO,
                INT_SUP: dato[j].INT_SUP,
                INT_CATE: dato[j].INT_CATE
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        $scope.datos.publicidad_grilla=encabezado;
    }

    $scope.lscategoria = function(){
        $scope.DataCategoria = {};
        try{
            var parametros = new PUBlstCategoriaL();
            parametros.PUB_lstCategoriaL(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.DataCategoria = response;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        } catch (error){
            console.log('error en categoria publicidad');
        }
    };

    $scope.actulizarCaracteristica = function(){
        var id_cara="";
        var distNombre  = $scope.publi.INT_CARA;
        if($scope.lCaracteristica){
            angular.forEach($scope.lCaracteristica, function(value, key) {
                if(value.p_caracteristica == distNombre){
                    id_cara  =   value.p_idcaracteristica;
                }
            });
        }
        $scope.publi.id_cara  =  id_cara;
    };

    $scope.lsCaracteristica = function(){
        $scope.lsTipovia = {};
        try{
            var parametros = new lstCaracteristica();
            parametros.clasificador = 9;
            parametros.lst_Caracteristica(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.lsTipovia = response;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch (error){
            console.log("eeror en caracteristica");
        }
    };

    $scope.onlyy=false;
    $scope.botonn="new";

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
        $scope.datos.adjuntoViae.splice($scope.datos.adjuntoViae.indexOf(dato), 1 );
    }

    $scope.modificarpublicidad = function(dato){
        var superior = parseFloat(dato.INT_ALTO) * parseFloat(dato.INT_ANCHO);
        superior = (Math.round(superior * 10) / 10)+"";
        var supe = parseFloat(superior.replace(",","."));
        if (supe < 18) {
            $scope.onlyy=true;
            $scope.botonn="new";
            $scope.publi.INT_SUP = supe.toFixed(2);
            $scope.publi.INT_ALTO = parseFloat(dato.INT_ALTO).toFixed(2);
            $scope.publi.INT_ANCHO = parseFloat(dato.INT_ANCHO).toFixed(2);
            $scope.publi=[];
            $scope.lssubcategoria();
        } else {
            swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
        }
    }

    $scope.validaSuperficie = function(dato){
        if(dato.id || dato.idPublicidad){
            var total = parseFloat(dato.INT_ALTO) * parseFloat(dato.INT_ANCHO);
            total = (Math.round(total * 10) / 10)+"";
            var supe = parseFloat(total.replace(",","."));
            if(supe<18){
                dato.INT_SUP = supe.toFixed(2);
            } else {
                swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
            }
        }
    }


    $scope.NumericoAlto = function(alto){
        if(alto){
            alto = alto.replace(/[^,.0-9]+/g, "");
            alto = alto.replace(/,/g, ".");
            $scope.publi.INT_ALTO = alto;
        }
    }

    $scope.NumericoAncho = function(ancho){
        if(ancho){
            ancho = ancho.replace(/[^,.0-9]+/g, "");
            ancho = ancho.replace(/,/g, ".");
            $scope.publi.INT_ANCHO = ancho;
        }
    }

    ///AQUI TERMINA PUBLICIDAD///
    $scope.detalle = [];
    $scope.edit = {};
    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    $scope.fechactuall= dia+ "/"+mes+ "/"+ fecha.getFullYear() ;//+ " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.fechadatoo  = "01/01/1900";

    $scope.publi=[];
    $scope.lssubcategoria = function(){
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.TipoLetrero = [
        {"p_idtipoletrero" : "51", "p_descripcion": "ADOSADA SOBRESALIENTE"},
        {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"},
        {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
        {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
    };

    $scope.ltCaracteristica = function(idlee){
        $scope.lCaracteristica = {};
        var idcarac = "";
        //ID CARACTERISITICA
        if($scope.TipoLetrero){
            angular.forEach($scope.TipoLetrero, function(value, key) {
                if(value.p_descripcion == idlee){
                    idcarac = value.p_idtipoletrero;
                }
            });
        }
        $scope.publi.idcarac=idcarac;
        if(idlee == "ADOSADA SOBRESALIENTE" || idlee == "ADOSADA" ){
         $scope.lCaracteristica = [
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
        {"p_idcaracteristica" : "2", "p_caracteristica": "Electrónica"},
        {"p_idcaracteristica" : "6", "p_caracteristica": "Luminosa"},
        {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"},
        {"p_idcaracteristica" : "9", "p_caracteristica": "Animada"}];
        }else if(idlee == "PINTADA"){
         $scope.lCaracteristica = [
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
        {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"}];
        }else{
         $scope.lCaracteristica = [
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"}
        ];}
    };

    $scope.addUser = function(user){
        if($scope.carass =='' || $scope.carass == null || $scope.carass =="undefined" ){
            $scope.carass = [];
        }else{
        }
        $scope.carass.push({
            desc    : user.desc,
            sup     : user.sup
        });
        $scope.user = "";
        $scope.detalle = [];
    };
    $scope.deleteUser = function(user){
        $scope.carass.splice( $scope.carass.indexOf(user), 1 );
    };
    $scope.editUser = function(user){
        delete $scope.edit[user.id];
    };
    $scope.showEdition = function($event, id){
        $scope.edit[id] = true;
        var input = angular.element($event.currentTarget).parent().find("input")[0];
        setTimeout(function(){
            input.focus();
            input.select();
        }, 50);
    };
    $scope.actulizarCaras= function () {
        $scope.publi.caras = $scope.carass;
    };
    $scope.toggleMin = function() {
        $scope.minDate = new Date("2011-09-24".replace(/-/g, '\/'));
    };

    $scope.toggleMin();

    $scope.changeHandler = function () {
        var d = new Date($scope.publi.FECHAINICIO);
        var mes=d.getUTCMonth()+1;
        if(mes.toString().length==1)
            mes='0'+mes;
       $scope.publi.FECHAINICIO= "01/"+mes+"/"+d.getFullYear();
    };

    $scope.startDateOpen = function($event) {
        if(!$scope.desabilitado)
        {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startDateOpened = true;
        }
    };

    $scope.$watch('datos.f01_fecha_nac',function() {
        try {
            if ($scope.datos.f01_fecha_nac){
                var dia_nacim = $scope.datos.f01_fecha_nac.getDate();
                var mes_nacim = $scope.datos.f01_fecha_nac.getMonth()+1;
                var anio_nacim = $scope.datos.f01_fecha_nac.getFullYear();
                $scope.datos.f01_fecha_nac = dia_nacim+"/"+mes_nacim+"/"+anio_nacim;
            }
        } catch (err) {}
    });

    $scope.seleccionarProcesoCombo = function(proceso){
        $scope.procesoSeleccionado  =   12;
         $scope.btnNuevoTramtite     =   false;
    };

    $scope.calcularCapacidad = function(superficie){
        if(superficie){
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        }
        else{
            $scope.datos.f01_cap_aprox = 0;
        }
    }

    $scope.cargarNombViaTxt = function(valor) {
        if (valor == "NINGUNO"){
            $scope.nombreViaTxt = true;
            $scope.tipoTrayecto = false;
            $scope.datos.f01_factor ="VA";
        } else {
            $scope.nombreViaTxt = false;
            $scope.tipoTrayecto = true;
            $scope.datos.f01_num_act_n =   "";
        }
    };

    $scope.startDateOpenIni = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpenedIni = true;
    };

    $scope.formulario401 = function(datos){
        $rootScope.datosEnv = "";
        var fecha= new Date();
        var fechaActualS = "";
        fechaActualS= fecha.getDate() +" - "+ (fecha.getMonth() + 1) +" - "+ fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40  =   "";
        var urlFormularioN  =   "";
        var snombre =   "";
        var scedulaid   =   "";
        var sexpedido   =   "";
        var snombreREP = "";
        var scirep = "";
        var sempresa = "";
        var snit = "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
            datos.f01_tipo_per_desc = 'NATURAL';
            urlFormularioN  =   "../../docs/AE_Formulario_401_343.html";
            $( "#msgformularioN" ).load(urlFormularioN, function(data) {
                stringFormulario40  =   data;
                datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                datos.f01_seg_nom_prop = ((typeof(datos.f01_seg_nom_prop) == 'undefined' || datos.f01_seg_nom_prop == null) ? "" : datos.f01_seg_nom_prop);
                datos.f01_ape_pat_prop = ((typeof(datos.f01_ape_pat_prop) == 'undefined' || datos.f01_ape_pat_prop == null) ? "" : datos.f01_ape_pat_prop);
                datos.f01_ape_mat_prop = ((typeof(datos.f01_ape_mat_prop) == 'undefined' || datos.f01_ape_mat_prop == null) ? "" : datos.f01_ape_mat_prop);
                datos.f01_ape_cas_prop = ((typeof(datos.f01_ape_cas_prop) == 'undefined' || datos.f01_ape_cas_prop == null) ? "" : datos.f01_ape_cas_prop);
                datos.f01_tip_doc_prop = ((typeof(datos.f01_tip_doc_prop) == 'undefined' || datos.f01_tip_doc_prop == null) ? "" : datos.f01_tip_doc_prop);
                datos.f01_expedido_prop = ((typeof(datos.f01_expedido_prop) == 'undefined' || datos.f01_expedido_prop == null) ? "" : datos.f01_expedido_prop);
                datos.f01_nit_prop = ((typeof(datos.f01_nit_prop) == 'undefined' || datos.f01_nit_prop == null) ? "" : datos.f01_nit_prop);
                datos.f01_zon_prop_valor = ((typeof(datos.f01_zon_prop_valor) == 'undefined' || datos.f01_zon_prop_valor == null) ? "" : datos.f01_zon_prop_valor);
                datos.f01_tip_via_prop = ((typeof(datos.f01_tip_via_prop) == 'undefined' || datos.f01_tip_via_prop == null) ? "" : datos.f01_tip_via_prop);
                datos.f01_num_prop = ((typeof(datos.f01_num_prop) == 'undefined' || datos.f01_num_prop == null) ? "" : datos.f01_num_prop);
                datos.f01_nom_edi_prop = ((typeof(datos.f01_nom_edi_prop) == 'undefined' || datos.f01_nom_edi_prop == null) ? "" : datos.f01_nom_edi_prop);
                datos.f01_bloq_prop = ((typeof(datos.f01_bloq_prop) == 'undefined' || datos.f01_bloq_prop == null) ? "" : datos.f01_bloq_prop);
                datos.f01_piso_prop = ((typeof(datos.f01_piso_prop) == 'undefined' || datos.f01_piso_prop == null) ? "" : datos.f01_piso_prop);
                datos.f01_depa_prop = ((typeof(datos.f01_depa_prop) == 'undefined' || datos.f01_depa_prop == null) ? "" : datos.f01_depa_prop);
                datos.f01_telef_prop = ((typeof(datos.f01_telef_prop) == 'undefined' || datos.f01_telef_prop == null) ? "" : datos.f01_telef_prop);
                datos.f01_cel_prop = ((typeof(datos.f01_cel_prop) == 'undefined' || datos.f01_cel_prop == null) ? "" : datos.f01_cel_prop);
                datos.f01_num_pmc = ((typeof(datos.f01_num_pmc) == 'undefined' || datos.f01_num_pmc == null) ? "" : datos.f01_num_pmc);
                datos.f01_nro_orden = ((typeof(datos.f01_nro_orden) == 'undefined' || datos.f01_nro_orden == null) ? "" : datos.f01_nro_orden);
                datos.f01_tipo_lic_descrip = ((typeof(datos.f01_tipo_lic_descrip) == 'undefined' || datos.f01_tipo_lic_descrip == null) ? "" : datos.f01_tipo_lic_descrip);
                datos.f01_categoria_agrupada_descrip = ((typeof(datos.f01_categoria_agrupada_descrip) == 'undefined' || datos.f01_categoria_agrupada_descrip == null) ? "" : datos.f01_categoria_agrupada_descrip);
                datos.f01_categoria_agrupada_descripcion = ((typeof(datos.f01_categoria_agrupada_descripcion) == 'undefined' || datos.f01_categoria_agrupada_descripcion == null) ? "" : datos.f01_categoria_agrupada_descripcion);
                if(datos.f01_tip_act =='MA' || datos.f01_tip_act =='MATRI'){
                    datos.f01_tip_act1 = 'MATRIZ';
                }
                if(datos.f01_tip_act =='SU' || datos.f01_tip_act =='SUCUR'){
                    datos.f01_tip_act1 = 'SUCURSAL';
                }
                var pubMod ="";
                if(datos.rdTipoTramite1 == 'CON_VIAE'){
                    pubMod = '<tr><td>VIAE</td>'+
                    '<td>TIPO</td>' +
                    '<td>CARACTERÍSTICA</td>'+
                    //'<td>CARAS</td>'+
                    '<td>DESCRIPCIÓN</td>'+
                    '<td>ALTO</td>'+
                    '<td>ANCHO</td>'+
                    '<td>SUPERFICIE</td>';
                    for (i = 0; i < datos.publicidad.length; i++){
                        pubMod = pubMod +'<tr>' +
                        '<td>' + datos.publicidad[i].id + '</td>'+
                        '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>'+
                        '<td>' + datos.publicidad[i].INT_CARA + '</td>'+
                        //'<td>' + datos.publicidad[i].INT_NRO_CARA + '</td>'+
                        '<td>' + datos.publicidad[i].INT_DESC + '</td>'+
                        '<td>' + datos.publicidad[i].INT_ALTO + '</td>'+
                        '<td>' + datos.publicidad[i].INT_ANCHO + '</td>'+
                        '<td>' + datos.publicidad[i].INT_SUP + '</td></tr>';
                    }
                }else{
                    pubMod = pubMod + 'Sin Publicidad';
                }
                //CABECERA
                stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                stringFormulario40  =   stringFormulario40.replace("#f01_nro_orden#", datos.f01_nro_orden);
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_form#", '401');
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_per_desc#", datos.f01_tipo_per_desc);
                //DATOS GENERALES DE CONTRIBUYENTE
                stringFormulario40  =   stringFormulario40.replace("#f01_pri_nom_prop#", datos.f01_pri_nom_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_seg_nom_prop#", datos.f01_seg_nom_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_pat_prop#", datos.f01_ape_pat_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_mat_prop#", datos.f01_ape_mat_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_cas_prop#", datos.f01_ape_cas_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_doc_prop#", datos.f01_tip_doc_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_nit_prop#", datos.f01_nit_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_nit#", datos.f01_nit);
                stringFormulario40  =   stringFormulario40.replace("#f01_zon_prop_valor#", datos.f01_zon_prop_valor);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_via_prop# ", datos.f01_tip_via_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_nom_via_prop#", datos.f01_nom_via_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_prop#", datos.f01_num_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_nom_edi_prop#", datos.f01_nom_edi_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_bloq_prop#", datos.f01_bloq_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_piso_prop#", datos.f01_piso_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_depa_prop#", datos.f01_depa_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_telef_prop#", datos.f01_telef_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_cel_prop#", datos.f01_cel_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
                //DATOS DE LA ACTIVIDAD ECONOMICA
                stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc.toUpperCase());
                stringFormulario40  =   stringFormulario40.replace("#f01_de_hor#", datos.f01_de_hor);
                stringFormulario40  =   stringFormulario40.replace("#f01_a_hor#", datos.f01_a_hor);
                stringFormulario40  =   stringFormulario40.replace("#f01_sup#", datos.f01_sup);
                stringFormulario40  =   stringFormulario40.replace("#f01_estab_es#", datos.f01_estab_es);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_act1#", datos.f01_tip_act1);
                stringFormulario40  =   stringFormulario40.replace("#publicidad_grilla#", pubMod);
                var multi = '';
                if (datos.f01_tipo_lic == 32 || datos.f01_tipo_lic == '32') {
                    stringFormulario40  =   stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descrip);
                    multi = '<tr><td>NRO</td>'+
                    '<td>TIPO DE LICENCIA</td>' +
                    '<td>TIPO DE CATEGORÍA</td>'+
                    '<td>TIPO DE ACTIVIDAD</td></tr>';
                    for (i = 1; i < datos.Licenmul_grilla.length; i++){
                        multi = multi +'<tr>' +
                        '<td>' + datos.Licenmul_grilla[i].nroElem + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
                    }
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grilla#", multi);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descripcion);
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grilla#", multi);
                };
                var tablapago = '';
                if($scope.pago_adelantado == 'undefined' || $scope.pago_adelantado == undefined  || $scope.pago_adelantado == 'NO'){
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", 'SIN PAGO ADELANTADO');
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", 'NINGUNA');
                    stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                }else{
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", $scope.pago_adelantado);
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", datos.nro_ges);
                    stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                }
                var divfoodTruck = '';
                if (datos.f01_categoria == 211 || datos.f01_categoria == '211') {
                    divfoodTruck = divfoodTruck + '<div class="row"><div class="col-md-12" style="margin: 10px">'+
                                                '<h3>DATOS DEL VEHÍCULO O REMOLQUE</h3></div></div>'+
                                        '<div class="row" style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px">'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Tipo de Vehículo: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_vehiculo_ft + '</div>'+
                                            '</div>';
                                            if (datos.f01_vehiculo_ft == "REMOLQUE") {
                                                divfoodTruck = divfoodTruck + '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Otorgado: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_otorgado_ft + '</div>'+
                                            '</div>';
                                            }
                                            divfoodTruck = divfoodTruck + '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Clase: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_clase_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Marca: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_marca_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Tipo: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_tipo_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Subtipo: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_subtipo_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Modelo: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_modelo_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Motor: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_motor_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Nº Chasis: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_chasis_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Servicio: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_servicio_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Color: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_color_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Radicatoria: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_radicatoria_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Documento Legal: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_doclegal_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Nº Documento Legal: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_numdoclegal_ft + '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                '<div class="col-md-6"><label>Ubicación del lugar donde se Efectuara la Inspección del Vehículo o Remolque: </label></div>'+
                                                '<div class="col-md-6">'+ datos.f01_lugar_ft + '</div>'+
                                            '</div></div>';
                    stringFormulario40  =   stringFormulario40.replace("#divft#", divfoodTruck);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#divft#", divfoodTruck);
                };
                //UBICACION DE LA ACTIVIDAD ECONOMICA
                stringFormulario40  =   stringFormulario40.replace("#f01_macro_act_descrip#", datos.f01_macro_act_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_dist_act#", datos.f01_dist_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_categoria_descrip#", datos.f01_categoria_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_zona_act_descrip#", datos.f01_zona_act_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_act1#", datos.f01_num_act1);
                stringFormulario40  =   stringFormulario40.replace("#f01_edificio_act#", datos.f01_edificio_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_bloque_act#", datos.f01_bloque_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_piso_act#", datos.f01_piso_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_dpto_of_loc#", datos.f01_dpto_of_loc);
                stringFormulario40  =   stringFormulario40.replace("#f01_tel_act1#", datos.f01_tel_act1);
                if (datos.f01_num_act == 'NINGUNO') {
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act_n);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act);
                };
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                $scope.msgformularioN = stringFormulario40;
                $scope.notifcondicionesuso = stringFormulario40;
                setTimeout(function(){
                    $scope.fmostrarFormulario();
                },500);
            })
            $scope.armarDatosForm(datos,fechaActualS, sHora);
        }
    }

    $scope.armarDatosForm = function(data,sfecha,sHora){
        $rootScope.datosForm401 = "";
        var dataForm = {};
        //CABECERA
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_tipo_form'] = '401';
        dataForm['f01_num_pmc'] = data.f01_num_pmc;
        dataForm['f01_nro_orden'] = data.f01_nro_orden;
        //DATOS GENERALES DE CONTRIBUYENTE
        dataForm['f01_pri_nom_prop'] = data.f01_pri_nom_prop;
        dataForm['f01_seg_nom_prop'] = data.f01_seg_nom_prop;
        dataForm['f01_ape_pat_prop'] = data.f01_ape_pat_prop;
        dataForm['f01_ape_mat_prop'] = data.f01_ape_mat_prop;
        dataForm['f01_ape_cas_prop'] = data.f01_ape_cas_prop;
        dataForm['f01_tip_doc_prop'] = data.f01_tip_doc_prop;
        dataForm['f01_num_dos_prop'] = data.f01_num_dos_prop;
        dataForm['f01_expedido_prop'] = data.f01_expedido_prop;
        dataForm['f01_nit_prop'] = data.f01_nit_prop;
        dataForm['f01_zon_prop_valor'] = data.f01_zon_prop_valor;
        dataForm['f01_tip_via_prop'] = data.f01_tip_via_prop;
        dataForm['f01_nom_via_prop'] = data.f01_nom_via_prop;
        dataForm['f01_num_prop'] = data.f01_num_prop;
        dataForm['f01_nom_edi_prop'] = data.f01_nom_edi_prop;
        dataForm['f01_bloq_prop'] = data.f01_bloq_prop;
        dataForm['f01_piso_prop'] = data.f01_piso_prop;
        dataForm['f01_depa_prop'] = data.f01_depa_prop;
        dataForm['f01_telef_prop'] = data.f01_telef_prop;
        dataForm['f01_cel_prop'] = data.f01_cel_prop;
        //DATOS DE LA ACTIVIDAD ECONOMICA
        dataForm['f01_raz_soc'] = data.f01_raz_soc;
        dataForm['f01_sup'] = data.f01_sup;
        dataForm['f01_de_hor'] = data.f01_de_hor;
        dataForm['f01_a_hor'] = data.f01_a_hor;
        dataForm['f01_estab_es'] = data.f01_estab_es;
        dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
        dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
        dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;
        if(data.f01_tip_act =='MA' || data.f01_tip_act =='MATRI'){
            dataForm['f01_tip_act'] =  'MATRIZ';
        }
        if(data.f01_tip_act =='SU' || data.f01_tip_act =='SUCUR'){
            dataForm['f01_tip_act'] = 'SUCURSAL';
        }
        var multi = '';
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_tipo_lic_descrip;
            multi = '<table border="0.5" style="width:100%"><tr><td>NRO</td>'+
            '<td>TIPO DE LICENCIA</td>' +
            '<td>TIPO DE CATEGORÍA</td>'+
            '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 1; i < data.Licenmul_grilla.length; i++){
                multi = multi +'<tr>' +
                '<td>' + data.Licenmul_grilla[i].nroElem + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multi = multi + '</table>';
            dataForm['Licenmul_grilla'] =  multi;
        } else{
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;
            dataForm['Licenmul_grilla'] = data.Licenmul_grilla;
        };
        var pubMod = '';
        pubMod = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>'+
        '<td>TIPO</td>' +
        '<td>CARACTERÍSTICA</td>'+
        //'<td>CARAS</td>'+
        '<td>DESCRIPCIÓN</td>'+
        '<td>ALTO</td>'+
        '<td>ANCHO</td>'+
        '<td>SUPERFICIE</td></tr>';
        for (i = 0; i < data.publicidad.length; i++){
            pubMod = pubMod +'<tr>' +
                '<td>' + data.publicidad[i].id + '</td>'+
                '<td>' + data.publicidad[i].INT_TIPO_LETRE + '</td>'+
                '<td>' + data.publicidad[i].INT_CARA + '</td>'+
                //'<td>' + data.publicidad[i].INT_NRO_CARA + '</td>'+
                '<td>' + data.publicidad[i].INT_DESC + '</td>'+
                '<td>' + data.publicidad[i].INT_ALTO  + '</td>'+
                '<td>' + data.publicidad[i].INT_ANCHO + '</td>'+
                '<td>' + data.publicidad[i].INT_SUP + '</td></tr>';
        }
        pubMod = pubMod +'</table>';
        dataForm['publicidad_grilla'] = pubMod;
        //UBICACION DE LA ACTIVIDAD ECONOMICA
        dataForm['f01_macro_act_descrip'] = data.f01_macro_act_descrip;
        dataForm['f01_zona_act_descrip'] = data.f01_zona_act_descrip;
        dataForm['f01_tip_via_act'] = data.f01_tip_via_act;
        dataForm['f01_dist_act'] = data.f01_dist_act;
        if(data.f01_num_act == 'NINGUNO'){
            dataForm['f01_num_act'] = data.f01_num_act_n.toUpperCase();
        }else{
            dataForm['f01_num_act'] = data.f01_num_act;
        }
        dataForm['f01_num_act1'] = data.f01_num_act1;
        dataForm['f01_edificio_act'] = data.f01_edificio_act;
        dataForm['f01_bloque_act'] = data.f01_bloque_act;
        dataForm['f01_piso_act'] = data.f01_piso_act;
        dataForm['f01_dpto_of_loc'] = data.f01_dpto_of_loc;
        dataForm['f01_tel_act1'] = data.f01_tel_act1;
        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;
        //pago adelantado
        if($scope.pago_adelantado == 'undefined' || $scope.pago_adelantado == undefined  || $scope.pago_adelantado == 'NO'){
            dataForm['pago_adel']   =  'SIN PAGO ADELANTADO';
            dataForm['nro_ges'] =   'NINGUNA';
        }else{
            dataForm['pago_adel'] = $scope.pago_adelantado;
            dataForm['nro_ges'] = data.nro_ges;
        }
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }

    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioN').html($scope.msgformularioN);
    }

   /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function (data) {
        $scope.Licencia_Multiple(data.licenciam);
        var nit = '';
        if(data.fileArchivosAd == undefined || data.fileArchivosAd == ''){
            data.fileArchivosAd = [];
        }
        if(data.f01_nit_prop !='' && data.f01_nit_prop != undefined){
            var resp = data.fileArchivosAd.find( archivos => (archivos.nombre).includes("NIT"));
            if(resp == undefined){
                nit = 'SIN NIT';
            }
        }
        /*REQUISITOS2018*/
        if(nit == ''){
            data.sArrayFileArRequisitos = $scope.fileArRequisitos;
            var taemayor = 0;
            if(data.f01_telef_prop=="" || data.f01_telef_prop==" ")
            {
                data.f01_telef_prop = "0";
            }
            if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
                for (var i = 0; i < data.licenciam.length; i++) {
                    if (parseInt(data.licenciam[i].f01_tae) >= taemayor) {
                        taemayor = parseInt(data.licenciam[i].f01_tae);
                        $scope.datos.idLic = data.licenciam[i].f01_tipo_licmid;
                        $scope.datos.descriplic = data.licenciam[i].f01_tipo_licmdescrip;
                        $scope.datos.idcat = data.licenciam[i].f01_cat_agrupadamid;
                        $scope.datos.descripcat = data.licenciam[i].f01_cat_agrupadamdescrip;
                        $scope.datos.iddesa = data.licenciam[i].f01_act_desarrolladamid;
                        $scope.datos.descripdesa = data.licenciam[i].f01_act_desarrolladamdescrip;
                    }
                };
                sarrayobligatorio   =   true;
                console.log(1111,data);
                if(data && //data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                    //data.FILE_CI != ""  && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                //data.fileArchivosAd != ""  && data.fileArchivosAd != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
                data.licenciam != "" && data.licenciam != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_dist_act != "" && data.f01_dist_act != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null){
                    if(data.f01_tel_act1 != "" && data.f01_tel_act1 !=null){
                        if(data.f01_num_act != 'NINGUNO'){
                            if (data.rdTipoTramite1 == 'CON_VIAE' && data.publicidad != "") {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#aceptacionCondiciones").modal("show");
                            }else{
                                if (data.rdTipoTramite1 == 'SIN_VIAE') {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                } else {
                                    swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                                };
                            }
                        }else{
                            if(data.f01_num_act_n != "" && data.f01_num_act_n != null){
                                if (data.rdTipoTramite1 == 'CON_VIAE' && data.publicidad != "") {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }else{
                                    if (data.rdTipoTramite1 == 'SIN_VIAE') {
                                        $scope.serializarInformacion(data);
                                        $scope.formulario401(data);
                                        $("#aceptacionCondiciones").modal("show");
                                    } else {
                                        swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                                    };
                                }
                            }else{
                                swal('', "Debe completar el nombre de via", 'warning');
                            }
                        }
                    }else{
                        swal('', "Datos obligatorios, verifique el campo Teléfono/Celular", 'warning');
                    }
                }
                else{
                    swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
                }
            }
            if (data.f01_tipo_lic != 32 || data.f01_tipo_lic != '32'){
                if(data &&  data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                data.FILE_CI != ""  && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
                data.f01_categoria_agrupada != "" && data.f01_categoria_agrupada != null &&
                //data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_dist_act != "" && data.f01_dist_act != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null){
                    console.log("data.f01_tel_act1",data.f01_tel_act1);
                    if(data.f01_tel_act1 != "" && data.f01_tel_act1 !=null){
                        if(data.f01_num_act != 'NINGUNO'){
                            if (data.rdTipoTramite1 == 'CON_VIAE' && data.publicidad != "") {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#aceptacionCondiciones").modal("show");
                            }else{
                                if (data.rdTipoTramite1 == 'SIN_VIAE') {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                } else {
                                    swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                                };
                            }
                        }else{
                            if(data.f01_num_act_n != "" && data.f01_num_act_n != null){
                                if (data.rdTipoTramite1 == 'CON_VIAE' && data.publicidad != "") {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }else{
                                    if (data.rdTipoTramite1 == 'SIN_VIAE') {
                                        $scope.serializarInformacion(data);
                                        $scope.formulario401(data);
                                        $("#aceptacionCondiciones").modal("show");
                                    } else {
                                        swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                                    };
                                }
                            }else{
                                swal('', "Debe completar el nombre de via", 'warning');
                            }
                        }
                    }else{
                        swal('', "Datos obligatorios, verifique el campo Teléfono/Celular", 'warning');
                    }
                }else{
                    swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
                }
            }
        }else{
            swal('', 'Debe adjuntar el documento digitalizado de su NIT', 'error');
        }
    }

    ////////////////////////////////////////GENERACION DE MENSAJE////////////////////////////////
    var iniciaDeclaracionJurada = $rootScope.$on('iniciaDeclaracion', function (event, data) {
        $("#declaracionN").modal("show");
    });

    /*enviarFormProcesos*/
    $scope.validarFormProcesos = function(datosForm){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function(resultado){
                $scope.tramitesCiudadano();
                $scope.bloquearBtnEnviarForm();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
            });
        } catch (error){
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };
    
    /*CIUDADANO - ENVIAR FORMULARIO NATURAL*/
     //enviarFormProcesosLinea
    $scope.validarEnvio = function(data){
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };
    

    $scope.enviarFormProcesosLinea = function(paramForm){
        $.blockUI({ css: { 
                  border: 'none', 
                  padding: '10px', 
                  backgroundColor: '#000', 
                  '-webkit-border-radius': '10px', 
                  '-moz-border-radius': '10px', 
                  opacity: .5, 
                  color: '#fff' 
                },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){ 
            var validaEnvio   =   new validacionTramite();
            validaEnvio.nroTramite    = sessionService.get('IDTRAMITE');
            validaEnvio.validacionEnvioTramite(function(response){
                var resp = JSON.parse(response);
                if(resp.success[0].codigo_tramite == null){
                    $scope.ultimoArrayAdjunto();
                    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
                    $scope.btnEnviarForm    =   true;
                    var idProcodigo         =   'EM-LF';
                    var datosNeXO = {};
                    $scope.divVIAE="mostrar";
                    datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias;
                    datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
                    if ($scope.tipoPersona == 'NATURAL'){
                        //PAGO ADELANTADO
                        datosNeXO['f01_tipo_per']       =   'N';
                        datosNeXO['f01_tipo_per_desc']  = 'NATURAL';
                        datosNeXO['f01_expedido_prop']  = paramForm.f01_expedido_prop;
                        datosNeXO['f01_email_prop']     = paramForm.f01_email_prop;
                        datosNeXO['f01_cel_prop']       = paramForm.f01_cel_prop;
                        datosNeXO['f01_telef_prop']     = paramForm.f01_telef_prop;
                        datosNeXO['INT_FEC_SOLICITUD']  = paramForm.INT_FEC_SOLICITUD;
                        datosNeXO['CI_BIGDATA']         =   sessionService.get('IDCIUDADANO');
                        datosNeXO['f01_pri_nom_prop']   = paramForm.f01_pri_nom_prop;
                        datosNeXO['f01_ape_pat_prop']   = paramForm.f01_ape_pat_prop;
                        datosNeXO['f01_ape_mat_prop']   = paramForm.f01_ape_mat_prop;
                        datosNeXO['f01_tip_doc_prop']   = paramForm.f01_tip_doc_prop;
                        datosNeXO['f01_num_doc_prop']   = paramForm.f01_num_dos_prop;
                        datosNeXO['f01_num_dos_prop']   = paramForm.f01_num_dos_prop;
                        datosNeXO['f01_fecha_nac']      = paramForm.f01_fecha_nac;
                        //DATOS DE DIRECION DEL CONTRIBUYENTE
                        datosNeXO['f01_macro']          =   paramForm.f01_macro;
                        datosNeXO['f01_macro_des']      =   paramForm.f01_macro_des;
                        datosNeXO['INT_ZONA']           =   paramForm.INT_ZONA;
                        datosNeXO['INT_DISTRITO']       =   paramForm.INT_DISTRITO;
                        datosNeXO['f01_distrito']       =   paramForm.f01_distrito;
                        datosNeXO['f01_distrito_desc']  =   paramForm.f01_distrito_desc;
                        //DIRECCION DEL CONTRIBUYENTE
                        datosNeXO['f01_zona']               =   paramForm.f01_zona;
                        datosNeXO['f01_zon_prop']           =   paramForm.f01_zon_prop;
                        datosNeXO['f01_zon_prop_desc']      =   paramForm.f01_zon_prop_desc;
                        datosNeXO['f01_zon_prop_valor']     =   paramForm.f01_zon_prop_valor;
                        datosNeXO['f01_tip_via_prop']       =   paramForm.f01_tip_via_prop;
                        datosNeXO['f01_tip_via_prop_desc']  =   paramForm.f01_tip_via_prop;
                        datosNeXO['f01_nom_via_prop']       =   paramForm.f01_nom_via_prop;
                        datosNeXO['f01_num_prop']           =   paramForm.f01_num_prop;
                        datosNeXO['f01_nom_edi_prop']       =   paramForm.f01_nom_edi_prop;
                        datosNeXO['f01_bloq_prop']          =   paramForm.f01_bloq_prop;
                        datosNeXO['f01_piso_prop']          =   paramForm.INT_PISO;
                        datosNeXO['f01_depa_prop']          =   paramForm.INT_NUM_DEP;
                        datosNeXO['f01_dir_det_prop']       =   paramForm.f01_dir_det_prop;
                        datosNeXO['OTRO_VIA']           = paramForm.OTRO_VIA;
                        datosNeXO['INT_AC_EDIFICIO']    = paramForm.INT_AC_EDIFICIO;
                        datosNeXO['INT_AC_BLOQUE']      = paramForm.INT_AC_BLOQUE;
                        datosNeXO['INT_AC_PISO']        = paramForm.INT_AC_PISO;
                        datosNeXO['INT_AC_NUME']        = paramForm.INT_AC_NUME;
                        datosNeXO['INT_AC_CEL']         = paramForm.INT_AC_CEL;
                        datosNeXO['INT_AC_TEL']         = paramForm.INT_AC_TEL;
                        datosNeXO['INT_AC_COR']         = paramForm.INT_AC_COR;
                        datosNeXO['INT_DIR_DET']        = paramForm.INT_DIR_DET;
                        datosNeXO['INT_VIA']            =   paramForm.INT_VIA;
                        datosNeXO['INT_NOMBRE_VIA']     =   paramForm.INT_NOMBRE_VIA;
                        datosNeXO['INT_EDIF']           =   paramForm.INT_EDIF;
                        datosNeXO['INT_BLOQUE']         =   paramForm.INT_BLOQUE;
                        datosNeXO['INT_PISO']           =   paramForm.INT_PISO;
                        datosNeXO['INT_NUM_DEP']        =   paramForm.INT_NUM_DEP;
                        datosNeXO['INT_DIR_DET']        =   paramForm.INT_DIR_DET;
                        datosNeXO['f01_denominacion']   = paramForm.f01_denominacion;
                        datosNeXO['f01_sup']            = paramForm.f01_sup;
                        datosNeXO['f01_de_hor']         = paramForm.f01_de_hor;
                        datosNeXO['f01_a_hor']          = paramForm.f01_a_hor;
                        datosNeXO['f01_estab_es']       = paramForm.f01_estab_es;
                        datosNeXO['INT_AC_ESTADO']      = paramForm.INT_AC_ESTADO;
                        datosNeXO['INT_AC_MACRO']       = paramForm.INT_AC_MACRO;
                        datosNeXO['INT_AC_MACRO_ID']            = parseInt(paramForm.INT_AC_MACRO_ID);
                        datosNeXO['f01_tipo_lic_descrip']       =  paramForm.f01_tipo_lic_descrip;
                        datosNeXO['f01_requisitos_tecnicos']    = $scope.datos.f01_requisitos_tecnicos;
                        //PARA LA 70
                        datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
                        datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
                        datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;
                        datosNeXO['f01_macro_act_descrip']      =   paramForm.f01_macro_act_descrip;
                        datosNeXO['f01_macro_act']              =   parseInt(paramForm.f01_macro_act);
                        datosNeXO['f01_zona_act_descrip']       =   paramForm.f01_zona_act_descrip;
                        datosNeXO['f01_de_hor']                 =   paramForm.f01_de_hor;
                        datosNeXO['f01_a_hor']                  =   paramForm.f01_a_hor;
                        datosNeXO['f01_tip_via_act']            =   paramForm.f01_tip_via_act;
                        datosNeXO['f01_num_act']                =   paramForm.f01_num_act;
                        datosNeXO['f01_factor']                 =   paramForm.f01_factor;
                        datosNeXO['f01_num_act1']               =   paramForm.f01_num_act1;
                        datosNeXO['f01_edificio_act']           =   paramForm.f01_edificio_act;
                        datosNeXO['f01_bloque_act']             =   paramForm.f01_bloque_act;
                        datosNeXO['f01_piso_act']               =   paramForm.f01_piso_act;
                        datosNeXO['f01_dpto_of_loc']            =   paramForm.f01_dpto_of_loc;
                        datosNeXO['f01_tel_act1']               =   paramForm.f01_tel_act1;
                        datosNeXO['f01_casilla']                =   paramForm.f01_casilla;
                        datosNeXO['f01_cod_luz']                =   paramForm.f01_cod_luz;
                        datosNeXO['f01_bloque_act']             =   paramForm.f01_bloque_act;
                        datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
                        datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
                        datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
                        datosNeXO['FILE_FOTOCOPIA_CI']                  = paramForm.FILE_FOTOCOPIA_CI;
                        datosNeXO['FILE_FOTOCOPIA_CI_R']                = paramForm.FILE_FOTOCOPIA_CI_R;
                        /*DATA DESDE ACA --*/
                        datosNeXO['INT_ID_CAT_AGRUPADA']                =  parseInt(paramForm.f01_categoria_agrupada);
                        datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
                        datosNeXO['f01_hojas_recibidas']        =  "0";
                        datosNeXO['f01_observaciones_i']        =  "0";
                        /*DATOSDELTITULARDELALICENCIA*/
                        //DATOSGENERALES
                        datosNeXO['f01_nit_prop']               = paramForm.f01_nit_prop+"";
                        datosNeXO['f01_tip_doc_prop']           =paramForm.f01_tip_doc_prop;
                        datosNeXO['f01_expedido_prop']          =paramForm.f01_expedido_prop;
                        datosNeXO['f01_pri_nom_prop']           =paramForm.f01_pri_nom_prop;
                        datosNeXO['f01_seg_nom_prop']           ="";
                        datosNeXO['f01_ter_nom_prop']           ="";
                        datosNeXO['f01_ape_pat_prop']           =paramForm.f01_ape_pat_prop;
                        datosNeXO['f01_ape_mat_prop']           =paramForm.f01_ape_mat_prop;
                        datosNeXO['f01_ape_cas_prop']           =paramForm.f01_ape_cas_prop;
                        datosNeXO['f01_nac_prop']               =paramForm.f01_nac_prop;
                        datosNeXO['f01_fecha_nac']              =paramForm.f01_fecha_nac;
                        datosNeXO['f01_telef_prop']             =paramForm.f01_tel_ciudadano;
                        datosNeXO['f01_cel_prop']               =paramForm.f01_cel_prop;
                        datosNeXO['f01_email_prop']             =paramForm.f01_email_prop;
                        /*DATOSDELAACTIVIDADAECONOMICA*/
                        //DATOS TECNICOS
                        datosNeXO['f01_nit']=paramForm.f01_nit_prop+"";
                        datosNeXO['f01_raz_soc']=paramForm.f01_raz_soc;
                        datosNeXO['f01_sup']=paramForm.f01_sup;
                        datosNeXO['f01_cap_aprox']=paramForm.f01_cap_aprox;
                        datosNeXO['f01_de_hor']=paramForm.f01_de_hor;
                        datosNeXO['f01_a_hor']=paramForm.f01_a_hor;
                        datosNeXO['f01_estab_es']=paramForm.f01_estab_es;
                        datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados.toUpperCase();
                        datosNeXO['f01_fecha_ini_act']="";
                        datosNeXO['f01_fecha_imp']="";
                        datosNeXO['f01_fecha_fin_act']="";
                        //UBICACION DE LA ACTIVIDAD ECONOMICA
                        datosNeXO['f01_dist_act']=paramForm.f01_dist_act;//"";
                        datosNeXO['f01_zona_act']=paramForm.f01_zona_act;//paramForm.f01_zona_act_descrip;
                        datosNeXO['f01_tip_via_act']=paramForm.f01_tip_via_act;
                        if(paramForm.f01_num_act == "NINGUNO"){
                            datosNeXO['f01_num_act_n'] = (paramForm.f01_num_act_n).toUpperCase();
                        }
                        datosNeXO['f01_num_act']=paramForm.f01_num_act;//paramForm.f01_tip_via_act;
                        //datosNeXO['f01_num_act_n']=paramForm.f01_num_act_n;//paramForm.f01_num_act;
                        datosNeXO['f01_factor']="";
                        datosNeXO['f01_num_act1']=paramForm.f01_num_act1;
                        datosNeXO['f01_edificio_act']=paramForm.f01_edificio_act;
                        datosNeXO['f01_bloque_act']=paramForm.f01_bloque_act;
                        datosNeXO['f01_piso_act']=paramForm.f01_piso_act;
                        datosNeXO['f01_dpto_of_loc']=paramForm.f01_dpto_of_loc;
                        datosNeXO['f01_tel_act1']=paramForm.f01_tel_act1;
                        datosNeXO['f01_casilla']=paramForm.f01_casilla;
                        datosNeXO['f01_cod_luz']=paramForm.f01_cod_luz;
                        datosNeXO['f01_idCodigoZona']=paramForm.f01_idCodigoZona;
                        datosNeXO['f04_res_solicitud_upaee']="";
                        datosNeXO['f08_hojas_recibidas']="0";
                        datosNeXO['f08_observaciones_i']="0";
                        datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
                        /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
                        datosNeXO['f01_tipo_lic']=paramForm.f01_tipo_lic;
                        datosNeXO['f01_categoria'] = paramForm.f01_categoria_descrip;
                        datosNeXO['f01_categoria_agrupada'] = paramForm.f01_categoria_agrupada;
                        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
                        datosNeXO['f01_categoria_agrupada']= parseInt(paramForm.f01_categoria_agrupada);
                        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion.toUpperCase();
                        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
                        datosNeXO['f01_actividad_desarrollada']= paramForm.f01_categoria_descrip2;
                        var datoObjectdj = [];
                        var decjuradaN = new Object();
                        if ($rootScope.decJuradaNatural) {
                            decjuradaN.url = $rootScope.decJuradaNatural;
                        } else{
                            decjuradaN.url = $scope.datos.declaracion_jurada;
                        };
                        decjuradaN.campo = 'Declaración Jurada Natural';
                        decjuradaN.nombre = 'DECLARACIÓN JURADA DE DATOS';
                        datoObjectdj[0] = decjuradaN;
                        console.log(" $rootScope.FileAdjuntos", $rootScope.FileAdjuntos);
                        console.log("$scope.datos.File_Adjunto", $scope.datos.File_Adjunto);
                        console.log("$scope.datos.fileArRequisitosViae",$scope.datos.fileArRequisitosViae);
                        if ($scope.datos.File_Adjunto) {
                            var i = 0;
                            angular.forEach($scope.datos.fileArRequisitosViae, function(archivo, key) {
                                $scope.datos.File_Adjunto.push(archivo);
                                i = i +1;
                            });
                            datosNeXO['File_Adjunto'] = $scope.datos.File_Adjunto.concat(decjuradaN);
                        }
                        else {
                            var i = 0;
                            angular.forEach($scope.datos.fileArRequisitosViae, function(archivo, key) {
                                $rootScope.FileAdjuntos.push(archivo);
                                i = i +1;
                            });
                            datosNeXO['File_Adjunto'] = $rootScope.FileAdjuntos.concat(decjuradaN);
                        }
                        var adjuntos = [];
                        for(var i=0;i<datosNeXO.File_Adjunto.length;i++){
                            if(datosNeXO.File_Adjunto[i] != undefined && datosNeXO.File_Adjunto[i] != null && datosNeXO.File_Adjunto[i] != ''){
                                adjuntos.push(datosNeXO.File_Adjunto[i]);
                            }
                        }
                        datosNeXO.File_Adjunto = adjuntos;
                        if(paramForm.f01_upload_carnet_manipulacion != undefined){
                            var carnets = datosNeXO.File_Adjunto.find(x => x.nombre == 'Carnets de manipulación vigente');
                            if(carnets == undefined){
                                datosNeXO.File_Adjunto.push({"url":paramForm.f01_upload_carnet_manipulacion,"campo": paramForm.f01_nombre_carnet_manipulacion ,"nombre":'Carnets de manipulación vigente'});
                            }  
                        }                      //datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos;
                        if(paramForm.g_origen_p){
                            datosNeXO['g_origen_p'] = paramForm.g_origen_p;
                        }
                        else{
                            datosNeXO['g_origen_p']="";
                        }
                        datosNeXO['f01_tip_act']                    =   'SU';
                        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
                        /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
                        console.log("unoooooo",datosNeXO['f01_requisitos_tecnicos']);
                        if(datosNeXO['f01_requisitos_tecnicos'] == null){
                            datosNeXO['f01_requisitos_tecnicos'] =[];
                        }
                        datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
                        datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
                        datosNeXO['f01_croquis_ae'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
                        datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
                        if(paramForm.f01_tipo_lic == 32 || paramForm.f01_tipo_lic == '32'){
                            datosNeXO['f01_idcat_multi_principal'] = paramForm.xf01_idcat_multi_principal;
                            datosNeXO['f01_descat_multi_principal'] = paramForm.xf01_descat_multi_principal;
                            datosNeXO['f01_act_principal'] = paramForm.f01_act_principal;
                            datosNeXO['f01_act_principal2'] = paramForm.f01_act_principal2;
                            datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
                            datosNeXO['f01_categorias_multi'] = paramForm.f01_categorias_multi;
                        }else{
                            datosNeXO['f01_idcat_multi_principal'] = '';
                            datosNeXO['f01_descat_multi_principal'] = '';
                            datosNeXO['f01_act_principal'] = '';
                            datosNeXO['f01_actividad_principal_array'] = '';
                            datosNeXO['f01_categorias_multi'] = '';
                        }
                        //datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
                    }
                    if(paramForm.rdTipoTramite1 == "CON_VIAE" || paramForm.rdTipoTramite1 == 'CON_VIAE'){
                        datosNeXO['sw_publicidad']      =  "CP" ;
                        datosNeXO['swpublicidad']      =  "CP" ;
                        datosNeXO['publicidad']=paramForm.publicidad;
                        datosNeXO['publicidad_grilla']= $scope.publicidadGrilla(paramForm.publicidad);
                    }if(paramForm.rdTipoTramite1 == "SIN_VIAE" || paramForm.rdTipoTramite1 == 'SIN_VIAE'){
                        datosNeXO['sw_publicidad']      =  "SP" ;
                        datosNeXO['swpublicidad']      =  "SP" ;
                        datosNeXO['publicidad']=[];
                        datosNeXO['publicidad_grilla']=[];
                    }
                    datosNeXO['licencia_multiple']=paramForm.licenciam;
                    datosNeXO['g_tipo'] = "AE-LINEA";
                    datosNeXO['g_fecha'] = fechactual;
                    datosNeXO['g_origen'] = "IGOB247";
                    datosNeXO['pago_adel'] = paramForm.pago_adel;//$scope.pago_adelantado;
                    datosNeXO['nro_ges'] =  paramForm.nro_ges;
                    datosNeXO['acepta_declaracion'] =  $scope.acepta;
                    if(paramForm.chkzonasegura == 'ZONASEGURA'){
                        datosNeXO['f01_zona_segura'] = 'SI';
                    }else{
                        if(paramForm.chkzonasegura == 'NOZONASEGURA'){
                            datosNeXO['f01_zona_segura'] = 'NO';
                        }else{
                            datosNeXO['f01_zona_segura'] = '';
                        }
                    }
                    if(paramForm.f01_tipo_lic == 32 || paramForm.f01_tipo_lic == '32'){
                        datosNeXO['descriplic'] = $scope.datos.descriplic;
                        datosNeXO['idLic'] = $scope.datos.idLic;
                        datosNeXO['idcat'] = $scope.datos.idcat;
                        datosNeXO['descripcat'] = $scope.datos.descripcat;
                        datosNeXO['iddesa'] = $scope.datos.iddesa;
                        datosNeXO['descripdesa'] = $scope.datos.descripdesa.toUpperCase();
                    }
                    if (paramForm.f01_categoria_descrip == 211 || paramForm.f01_categoria_descrip == '211') {
                        datosNeXO['f01_vehiculo_ft'] = paramForm.f01_vehiculo_ft;
                        datosNeXO['f01_otorgado_ft'] = paramForm.f01_otorgado_ft;
                        datosNeXO['f01_clase_ft'] = paramForm.f01_clase_ft;
                        datosNeXO['f01_marca_ft'] = paramForm.f01_marca_ft;
                        datosNeXO['f01_tipo_ft'] = paramForm.f01_tipo_ft;
                        datosNeXO['f01_subtipo_ft'] = paramForm.f01_subtipo_ft;
                        datosNeXO['f01_modelo_ft'] = paramForm.f01_modelo_ft;
                        datosNeXO['f01_motor_ft'] = paramForm.f01_motor_ft;
                        datosNeXO['f01_chasis_ft'] = paramForm.f01_chasis_ft;
                        datosNeXO['f01_servicio_ft'] = paramForm.f01_servicio_ft;
                        datosNeXO['f01_color_ft'] = paramForm.f01_color_ft;
                        datosNeXO['f01_radicatoria_ft'] = paramForm.f01_radicatoria_ft;
                        datosNeXO['f01_doclegal_ft'] = paramForm.f01_doclegal_ft;
                        datosNeXO['f01_numdoclegal_ft'] = paramForm.f01_numdoclegal_ft;
                        datosNeXO['f01_lugar_ft'] = paramForm.f01_lugar_ft;
                    }
                    if($scope.dataGenesisCidadano && $scope.formDatosAE){
                        if($scope.dataGenesisCidadano.length > 0){
                            datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                            datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                            datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
                        }
                    }
                    /*if(paramForm.listadoEmpleados != undefined){
                        var grillaEmpleados = [{"tipo": "GRD","campos": "nroEmpl|nombre_completo_emp|ci_emp", "titulos": "Nro.|Nombre Completo|Cédula de Identidad","impresiones": "true|true"}];
                        for(var i=0;i<paramForm.listadoEmpleados.length;i++){
                            grillaEmpleados.push({"nroEmpl":(i+1),"nombre_completo_emp":paramForm.listadoEmpleados[i].nombre_completo_emp,"ci_emp":paramForm.listadoEmpleados[i].ci_emp});
                        }
                        datosNeXO['listadoEmpleados'] = paramForm.listadoEmpleados;
                        datosNeXO['grillaEmpleados'] = grillaEmpleados;
                    }*/
                    var sMacroR         =   datosNeXO['f01_macro_des'];
                    var sZonaR          =   datosNeXO['INT_AC_ID_ZONA'];
                    var sMacroRDesc     =   datosNeXO['f01_macro_des'];
                    var sZonaRDesc      =   datosNeXO['INT_AC_ID_ZONA'];
                    var iCategoriaAgrupada      =   datosNeXO['INT_ID_CAT_AGRUPADA'];
                    var iMacrodistrito          =   datosNeXO['INT_AC_MACRO_ID'];
                    var simplificadoBebidas = 0;
                    if(datosNeXO.f01_tipo_lic == 32){
                        for(var i=0;i<datosNeXO.licencia_multiple.length;i++){
                            if(datosNeXO.licencia_multiple[i].f01_tipo_licmid == 18){
                                console.log("entraa",datosNeXO.licencia_multiple[i].f01_tipo_licmid);
                                simplificadoBebidas = 1;
                            }
                        }
                    }
                    console.log("datosNeXO",datosNeXO);
                    if(iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != ""){
                        //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
                            var sIdTramite = $rootScope.tramiteId;
                            var datosSerializados = JSON.stringify(datosNeXO);
                            archivo1 = "";
                            if(datosNeXO.f01_tipo_lic != 18 && simplificadoBebidas == 0){
                                console.log("entra normal");
                                var crearCaso   =   new gCrearCaso();
                                crearCaso.usr_id    = 0,
                                crearCaso.datos     = datosSerializados,
                                crearCaso.procodigo = idProcodigo,
                                crearCaso.crearCasoAeLinea(function(response){
                                    try{
                                        $scope.botones = null;
                                        $scope.desabilitado = true;
                                        response    =   JSON.parse(response);
                                        var results = response.success.data;
                                        indice = 0;
                                        //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                                        //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                                            datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                                            datosIF2 = datosIF[1];
                                            datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                                            $scope.nrotramitec = datosIF[0];
                                            sessionService.set('NROTRAMITE', datosIF[0]);
                                            sessionService.set('NROTRAMITEID', datosIF[1]);
                                            sessionService.set('IDPROCESO', datosIF[6]);
                                            var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                                            datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                                            //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                                            try{
                                            ///$scope.capturarImagen();
                                                $scope.validarFormProcesos(paramForm);
                                                $scope.guardarAdjuntosMultiplesMapa(results);
                                            }catch(e){}
                                            $.unblockUI();
                                    }catch(e){
                                        console.log("falla: ", e);
                                        alert("conexion fallida ");
                                    }
                                });
                            }else{
                                console.log("entra bebidas");
                                var crearCaso   =   new gCrearCaso();
                                crearCaso.usr_id    = 0,
                                crearCaso.datos     = datosSerializados,
                                crearCaso.procodigo = "EM-LFB",
                                crearCaso.crearCasoAeLineaBebidas(function(response){
                                    try{
                                        $scope.botones = null;
                                        $scope.desabilitado = true;
                                        response    =   JSON.parse(response);
                                        var results = response.success.data;
                                        indice = 0;
                                        //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                                        //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                                            datosIF = results[0].sp_crearcaso_linea_ae.split(",");
                                            datosIF2 = datosIF[1];
                                            datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                                            $scope.nrotramitec = datosIF[0];
                                            sessionService.set('NROTRAMITE', datosIF[0]);
                                            sessionService.set('NROTRAMITEID', datosIF[1]);
                                            sessionService.set('IDPROCESO', datosIF[6]);
                                            var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                                            datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                                            //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                                            try{
                                            ///$scope.capturarImagen();
                                                $scope.validarFormProcesos(paramForm);
                                                $scope.guardarAdjuntosMultiplesMapa(results);
                                            }catch(e){}
                                            $.unblockUI();
                                    }catch(e){
                                        console.log("falla: ", e);
                                        alert("conexion fallida ");
                                    }
                                });
                            }
                            console.log("datosSerializados",datosSerializados);
                    /* }else{
                            swal('', "Complete sus Datos de Direccion", 'warning');
                        }  */
                    }else{
                        swal('', "Datos obligatorios, verifique los datos del formulario E", 'warning');
                    }
                }else{
                    swal('', "Esta solicitud ya fue enviada, el número de su tramite es "+resp.success[0].codigo_tramite, 'warning');
                }
            })
            $.unblockUI();
        },4000)
    };

    $scope.publicidadGrilla = function(dato){
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO|INT_SUP|INT_CATE|","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho|Superficie|Categoria","impresiones": "true|true|true|true|true|true|true|true|false"};
        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publi_grilla.push({
                nroElem: j+1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO,
                INT_SUP: dato[j].INT_SUP,
                INT_CATE: dato[j].INT_CATE
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        return encabezado;
    }


    try{
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }catch (e) {
        console.log("error", e);
    }

    /*************************************************************************/
    /*******************************AJUNTO VIAE*******************************/
    /*************************************************************************/
    $scope.tipoAdjunto = '';
    $scope.ejecutarFileViae = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
            $scope.tipoAdjunto = 'VIAE';
        }else{
            alert("Error ");
        }
    };

    $scope.subirViae = function(obj, valor,tipo){
        if($scope.tipoAdjunto == 'VIAE'){
            if($scope.datos.fileArRequisitosViae == undefined){
                $scope.datos.fileArRequisitosViae = {};
            }
            $scope.adjuntarRequisitos(obj, valor);
            $scope.tipoAdjunto = '';
        }
    };

    $scope.adjuntarRequisitos  =   function(sobj, svalor){
        var rMisDocs = new Array();
        var idFiles = new Array();
        if(sobj.files[0]){
            rMisDocs.push(sobj.files[0]);
            var idFile = sobj.name;
            var tam = idFile.length;
            idFile = parseInt(idFile.substring(10,tam));
            idFiles.push(idFile);
            $scope.almacenarRequisitosViae(rMisDocs,idFiles);
            $scope.adicionarArrayDeRequisitosViae(sobj,idFile);
        }
    };

    $scope.almacenarRequisitosViae = function(aArchivos,idFiles){
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                angular.forEach($scope.datos.adjuntoViae, function(doc, pos) {
                    if(doc.resid == idFiles[key]){
                        descDoc = "viae_"+doc.resid;
                    }
                })
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
                if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile){
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[imagenFile.length-1];
                            var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                        });
                        $.unblockUI();
                    }else{
                        if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        }
                        else{
                            $.unblockUI();
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                }
                else{
                    if (archivo.size <= 500000) {
                        if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else{
                            $.unblockUI();
                            swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                    if (archivo.size > 15000000) {
                        $.unblockUI();
                        swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
                    };
                }
            }else{
            }
        });
    };

    $scope.adicionarArrayDeRequisitosViae = function(aArch,idFile){
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        angular.forEach($scope.datos.adjuntoViae, function(doc, pos) {
            if(doc.resid == idFile){
                descDoc = "viae_"+doc.resid;
            }
        })
        var imagenNueva = aArch.files[0].name.split('.');
        var tam = aArch.files[0];
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
            if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif") {
                var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile){
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[imagenFile.length-1];
                    nombreFileN = descDoc + '_'+fechaNueva+'.'+tipoFile;
                });
            }
        }
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
        $scope.datos.fileArRequisitosViae[aArch.name] = JSON.parse(myJSON);
        console.log("$scope.datos.fileArRequisitosViae",$scope.datos.fileArRequisitosViae);
    }

    //****************************************LISTADO EMPLEADOS*****************************************************//
    $scope.almacenarCarnetsManipulacion = function(aArchivos,idFiles){
        console.log("aArchivos",aArchivos);
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        var imagenNueva = aArchivos[0].name.split('.');
        var nombreFileN = 'carnets_manipulacion' + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
        if (aArchivos[0].size <= 15000000) {
            if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
                var urlDeclaracion = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl, nombreFileN);
                $scope.datos.f01_nombre_carnet_manipulacion = nombreFileN;
                $scope.datos.f01_upload_carnet_manipulacion = urlDeclaracion;
            } else{
                swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
            };
        };
        if (aArchivos[0].size > 15000000) {
            swal('Advertencia', 'Tamaño de Archivo no soportado', 'error');
        };
        $scope.declaracionJurada = '';
    };
    /*$scope.guardarListaEmpleados = function(){
      
        if($.isEmptyObject($scope.empleados) == true){
            swal('Advertencia', 'No se registro ningun dato', 'error');
        }else{
            if($scope.datos.listadoEmpleados == undefined){
                $scope.datos.listadoEmpleados = [];
            }
            var response = $scope.datos.listadoEmpleados.find(x => x.ci_emp == $scope.empleados.ci_emp);
            if(response == undefined){
                $scope.datos.listadoEmpleados.push($scope.empleados);
            }else{
                swal('Advertencia', 'Ya se registro el número de carnet de identidad', 'error');
            }
            console.log("$scope.empleados",$scope.datos.listadoEmpleados.find(x => x.ci_emp == $scope.empleados.ci_emp));
            console.log("$scope.empleados",$scope.empleados);
            $scope.empleados = {};  
            $scope.ci_empleado = '';
        }

    }

    $scope.eliminarEmpleado = function(dato){
        $scope.datos.listadoEmpleados.splice($scope.datos.listadoEmpleados.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
    }

    $scope.buscarCiudadano = function(ci_empleado){
        console.log("ci_empleado",ci_empleado);
        if(ci_empleado != '' || ci_empleado != undefined){
            var buscarRepresentante = new rcNatural();
            buscarRepresentante.tipo_persona = "NATURAL";
            buscarRepresentante.ci = ci_empleado;
            buscarRepresentante.buscarPersona(function (resultado) {
                var response = JSON.parse(resultado);
                if(response.error){
                    swal('Advertencia', response.error.message, 'warning');
                }
                else{
                    $scope.empleados = {"nombre_completo_emp":(response[0].dtspsl_nombres+' '+response[0].dtspsl_paterno+' '+response[0].dtspsl_materno),"ci_emp":response[0].dtspsl_ci,"direccion_emp":response[0].dtspsl_direccion,"oid":response[0]._id};
                }            })
            $scope.ci_empleado = '';
        }else{
            swal('Advertencia', 'No se registro el número de carnet', 'error');

        }
    }*/

    var requisitosZonaSegura = $rootScope.$on('reqZonaSegura', function(){
        $scope.validarRequisitosForm();
    })
};
