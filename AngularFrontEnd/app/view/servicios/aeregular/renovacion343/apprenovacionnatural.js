function regularRenovacionController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
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
    $scope.docsFormTam  =   "col-md-12";
    $scope.btnEnviarFormLinea  =   "true";
    $scope.verEmisionRenovacion  =   "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;
    $scope.sCategoria = true;
    $scope.smultiservicios = false;
    $scope.bloqueobtn = "mostrar";
    $scope.multipleNatural = {};
    $scope.fechaActual = '';
    $scope.declaracionJurada = '';
    var headerImage ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCACCAk8DAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAgEI/8QAUBAAAQMDAgMEBQcFDQQLAAAAAQACAwQFERIhBhMxByJBURQyYXGBCBUjQlKRoTNicpLBFhckNDZDc6KxsrPC0TeChNJTVFVjdIOTlNPh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/VKAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMNRVRwGMO9aR2B7hu5x67AIMDZ7nJnVTinbzQ1uXCRzmB25Ib3W5b+cUG6gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCi8T8fijuVVbqGlElQyIxekudyyJTvhpw7Ye363sQVvhfjKsqbvSW+8NNWHvaxnPDTKCXZ2ewNJ330uBBQdeQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBy7tMhrWXbmSwB1FMxvJla0vdqaO80/Z6ZwOoQafZ9w++9Xll1mzT0tqka5kZBD5JerevRo6oOuoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA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";
    var footerImage ="data:image/jpeg;base64,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";

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
                for(j=0; j<datosRequisitosTmp.length; j++){
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado=false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
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
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        }catch (error){
            console.log("error");
        }
    };

    $scope.limpiarmultiple = function(){
        $scope.licdes=[];
        $scope.multiple=[];
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
        $scope.datos.rdTipoTramite = 'RENOVACION';
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        try{
            var nActividadDesarrollada = new getDatosActividadDesarrollada343();
            nActividadDesarrollada.getDatos_ActividadDesarrollada343(function(resActDes){
                var lstActividadDesarrollada = JSON.parse(resActDes);
                $scope.datosActividad = "";
                var datosLic = lstActividadDesarrollada.success.dataSql;
                $scope.datos.f01_actividad_desarrollada = "";
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
            });
        }catch(e){
            alert("Error en la actividad desarrollada");
        }
    }

    $scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        if(idDesarrollada != 211){
            $.blockUI();
            //$scope.datos.rdTipoTramite = 'NUEVO';
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFiles_ci = [];
            $scope.fileArRequisitos = {};
            try{
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
                        if(comboz.selectedIndex != 0){
                            selected2   = comboz.options[comboz.selectedIndex].text;
                            $scope.datos.f01_categoria_descripcion  = selected2;
                            $scope.datos.f01_categoria_descrip2 = selected2;
                            $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                            $scope.datos.f01_actividadesSecundarias = datosLic[0].ADDescripcion;
                        }
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
                    $scope.getRequisitosActividad($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosTecnicosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $.unblockUI();
                });
            }catch(e){
                console.log("Error en la actividad desarrollada");
                $.unblockUI();
            }
        }else{
            swal('', 'Para solicitar Licencia de Funcionamiento de vehículos de expendio de alimentos Food Truck, deben apersonarse a las oficinas de la Unidad de Actividades Económica, Edif. ESPRA Calle Chichas Nro. 1204', 'error');
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
                $.unblockUI();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }
    }

    $scope.obtenerActDes = function(idActividadDesarrollada){
        $scope.datosactividadDes="";
        var dato = new getHomologacion();
        dato.idActividadDesarrollada = idActividadDesarrollada;
        dato.get_Homologacion(function(res){
            x = JSON.parse(res);
            var resp = x.success.dataSql;
			if(resp.length > 0){
				$scope.datos.f01_categoria_agrupada = resp[0].idCategoria;
				$scope.datos.f01_categoria_agrupada_descrip = resp[0].descripcion;
				$scope.datos.f01_tipo_lic = resp[0].idTipoLicencia;//response[0].TipoLicencia;
				$scope.datos.f01_tipo_lic_descrip = resp[0].TipoLicenciaDescripcion;
				$scope.datosactividadDes = resp;
			}
            
        })
    }

    $scope.multiple.f01_cat_agrupadamdescripcion = 'PRUEBA VALOR DE INCIIO';

    $scope.LicenciaXCategoriaMultiservicioRen = function(idDesarrolladaM,superficie){
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
                //$scope.multiple = datosLicM;
                $scope.multipleNatural.f01_tipo_licmid = datosLicM[0].idTipoLicencia;
                $scope.multipleNatural.f01_tipo_licmdescrip = datosLicM[0].TipoLicenciaDescripcion;
                $scope.multipleNatural.f01_cat_agrupadamid = datosLicM[0].idActividadDesarrollada;
                $scope.multipleNatural.f01_cat_agrupadamdescrip = datosLicM[0].ADDescripcion;
                $scope.multipleNatural.f01_act_desarrolladamid = idDesarrolladaM;
                var combox      = document.getElementById('f01_act_desarrolladamid');
                selected2   = combox.options[combox.selectedIndex].text;
                $scope.multipleNatural.f01_act_desarrolladamdescrip  = selected2;
                $scope.multipleNatural.f01_tae  = datosLicM[0].tae;
                $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada,$scope.datos.f01_tipo_per);
                $.unblockUI();
                //$('#f01_cat_agrupadamdescrip').val(datosLicM[0].ADDescripcion);
                //$('#f01_tipo_licmdescrip').val(datosLicM[0].TipoLicenciaDescripcion);
                $rooSscope.$apply();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }

    }


    $scope.guardarLicencia = function(licencia){
        $scope.dscripcionlic ={};
        if(licencia.f01_tipo_licmid =='' || licencia.f01_tipo_licmid == null || licencia.f01_cat_agrupadamid =='' || licencia.f01_cat_agrupadamid == null ) {
            swal('', 'Llene lo campos requeridos para la Categoria Multiple  ', 'error');
        } else {
            var id=0
            if($scope.datos.licenciam =='' || $scope.datos.licenciam == null || $scope.datos.licenciam =="undefined" ){
                if($scope.licenciamul =='' || $scope.licenciamul == null || $scope.licenciamul =="undefined" ){
                    $scope.licenciamul = [];
                    id=0;
                }
                id = $scope.licenciamul.length + 1;
            }else{
                if($scope.licenciamul == undefined){
                    $scope.licenciamul = $scope.datos.licenciam;
                }
                id = $scope.licenciamul.length + 1;
            }
            if(id<11){
                $scope.id = id;
                if($scope.id == 1){
                    $scope.f01_catagrp_principal = 1;
                    $scope.datos.mulact_principal = licencia.f01_act_principal2;
                    $scope.datos.xf01_idcat_multi_principal = licencia.f01_cat_agrupadamid;
                    $scope.datos.xf01_descat_multi_principal = licencia.f01_cat_agrupadamdescrip;
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
                $scope.licdes=[];
                $scope.multipleNatural=[];
                $scope.dscripcionlic = {};
                $scope.multiple.f01_act_desarrolladamid = "";
                document.getElementById("f01_act_desarrolladamid").value='';
                $scope.multiple.f01_tipo_licmid = "";
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.Licencia_Multiple($scope.licenciamul);
                //$scope.validarMensajeInsp(licencia.f01_cat_agrupadamid);
                /*LISTAR REQUISITOS DINAMICOS*/
                $scope.lstRequisitosMultiples2018($scope.licenciamul);
                $scope.lstRequisitosTecnicosMultiples($scope.licenciamul);
            } else {
                swal('', 'El numero de multiples excede los estandares permitidos', 'error');
            }
        }
    }

    $scope.Licencia_Multiple = function(dato){
        $scope.licmul_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip|f01_catagrp_principal","titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada|Actividad Principal","impresiones": "true|false|true|false|true|false|true|false|"};

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

    $scope.detallem = [];
    $scope.editm = {};
    $scope.onlym=false;
    $scope.botonm="new";

    $scope.modificarLic = function(dato){
        $scope.onlym = true;
        $scope.botonm = "upd";
        $scope.multipleNatural = dato;
    }

    $scope.eliminarLic = function(dato){
        if($scope.licenciamul == undefined){
            $scope.licenciamul = $scope.datos.licenciam;
        }
        $scope.licenciamul.splice( $scope.licenciamul.indexOf(dato), 1 );
        $scope.idm = $scope.idm - 1;
    }

    $scope.modificarLicencia = function(dato){
        $scope.onlym=true;
        $scope.botonm="new";
        delete $scope.editm[dato.idm];
        $scope.multipleNatural=[];
        //$scope.validarMensajeInsp(dato.f01_cat_agrupadamid);
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

    $scope.calcularCapacidad = function(superficie) {
        if(superficie) {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.INT_AC_CAPACIDAD = parseFloat(superficie * 0.9).toFixed(2);
        }
        else {
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
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
                setTimeout(function(){
                    iniciarLoadFyle();
                }, 1000);
            })
        }
    };

    $scope.GetValueLicencia = function () {
        $scope.limpiarlic();
        var e = document.getElementById("f01_tipo_lic");
        $scope.datos.f01_tipo_lic_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoriaAgrupada = function () {
        $scope.limpiarcateg();
        var e = document.getElementById('f01_categoria_agrupada');
        $scope.datos.f01_categoria_agrupada_dem = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoria = function () {
        $scope.limpiaractdes();
        var e = document.getElementById('f01_categoria_descrip');
        if(e.selectedIndex != 0){
            $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
            $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
            $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
        }
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;

    }

    $scope.GetValueMacrodistrito = function (macro) {
        var e = document.getElementById("f01_macro_act");
        $scope.datos.f01_macro_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueDistrito = function () {
        var e = document.getElementById("f01_dist_act");
        $scope.datos.f01_dist_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaActividad = function () {
        var e = document.getElementById("INT_AC_ID_ZONA");
        $scope.datos.INT_AC_ID_ZONA_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyente = function () {
        var e = document.getElementById("f01_zon_prop");
        $scope.datos.f01_zon_prop_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaSegura = function (idCategoria){
        if(idCategoria == 3419 || idCategoria == 3420 || idCategoria == 3421 || idCategoria == 3422 || idCategoria == 3423 || idCategoria == 3424){
            $rootScope.mostrarzonasegura = true;
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
        if($scope.datos.f01_categoria_agrupada != 32){
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
        if($scope.datos.f01_categoria_descrip!= 32){
            var e = document.getElementById("f01_categoria_descrip");
            $scope.datos.f01_actividad_desarrollada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadDes = $scope.datos.f01_actividad_desarrollada_descrip;
        }
        $scope.datos.f01_actividadesDesarrolladasc = $scope.actividadDes;
    }

   $scope.GetValueActividadesCatDesarrollada = function(){
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
        //$scope.GetValueZonaSegura(dato.f01_cat_agrupadamid);
    }

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

    $scope.cargarDatos=function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.macrodistritos();
        $scope.inciarUpload();
        $scope.getCaptchasXX();
        if($scope.sTipoPersona=="NATURAL"){
            $scope.divNatural = "mostrar";
        } else {
            $scope.divJuridico = "mostrar";
        }
        //$scope.listadoDatosLicencia();
        //$scope.lsCaracteristica();
        //$scope.getLicenciasmul();
        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
        $scope.catactividadDesarrollada();
        //$scope.MacroZona();
    };

    $scope.inciarUpload =   function(){
        try{
             $('#multiDocsButon').click(function(){
                $('#multiDocsFile').click();
               //$scope.vias();
            });
        }catch(e){}
    };

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
            $scope.desabilitaBebidas             =   true;
            $scope.only                     =   true;
            $scope.datosAnterioresNatural(datos.f01_id_actividad_economica);

        } else {
            if(datos.f01_id_actividad_economica){
                $scope.datosAnterioresNatural(datos.f01_id_actividad_economica);
            }
            $scope.btnGuardarForm   =   false;
            $scope.only             =   false;

        }
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        $.unblockUI();

    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        setTimeout(function(){
            if(
                (typeof($scope.datos.INT_AC_latitud) !=  'undefined' && $scope.datos.INT_AC_latitud  != "" && $scope.datos.INT_AC_latitud != 0 && $scope.datos.INT_AC_latitud != "0") &&
                (typeof($scope.datos.INT_AC_longitud) != 'undefined' && $scope.datos.INT_AC_longitud != "" && $scope.datos.INT_AC_longitud != 0 && $scope.datos.INT_AC_longitud != "0")
            ){
                var nuevoUbicacion = {
                    lat: parseFloat($scope.datos.INT_AC_latitud),
                    lng: parseFloat($scope.datos.INT_AC_longitud)
                };
                map.setCenter(nuevoUbicacion);
                $scope.addMarker(nuevoUbicacion);
            }else{
                 var nuevoUbicacion = {
                    lat: -16.495635,
                    lng: -68.133543
                };
                map.setCenter(nuevoUbicacion);
                $scope.setMapOnAll();
            }
        },100);
        if(data.length > 0){
            if(data[0].venviado != 'SI'){
                if(data[0].datos.INT_FORM_ALMACENADO != 'G'){
                    $scope.validarActividadEconomica();
                    $scope.listadoActividadEconomica();
                }else{
                    if(data[0].datos.rdTipoTramite == 'NUEVO'){
                        $scope.mostrarMsgNuevaActividad = true;
                        $scope.formDatosAE              = false;
                        $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion. Creara una nueva Actividad Economica.";
                    }else{
                        $scope.validarActividadEconomica();
                        $scope.listadoActividadEconomica();
                    }
                }
            }
        }
    });
    //INICIAR VARIABLES EN EL FORMULARIO
     var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        //TIPO DE LICENCIA
        $scope.catactividadDesarrollada();
        if (datos.f01_id_actividad_economica) {
            $scope.datosAnterioresNatural(datos.f01_id_actividad_economica);
        };
        if ((data.INT_AC_latitud == 'undefined' && data.INT_AC_longitud == 'undefined') || (data.INT_AC_latitud == undefined && data.INT_AC_longitud == undefined) || (data.INT_AC_latitud == '' && data.INT_AC_longitud == '')) {
            $scope.open_mapa_ae();
        } else{
            $scope.open_mapa_ae(data.INT_AC_latitud, data.INT_AC_longitud);
        };
        if (data.publicidadAE == undefined || data.publicidadAE == 'undefined') {
            $scope.pubAE = false;
            $scope.pubMensaje = true;
        } else{
            $scope.pubAE = true;
            $scope.pubMensaje = false;
        };
        //VERIFICAR CATEGORIA DESARROLLADA
        var categoriaDescrip = ((typeof(data.f01_categoria_descrip) == 'undefined' || data.f01_categoria_descrip == null) ? '' : data.f01_categoria_descrip);
        if(categoriaDescrip == ''){
            $scope.sActividadDesarrollada = false;
        }
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc = ((typeof(data.f01_categoria_agrupada)             == 'undefined' || data.f01_categoria_agrupada == null) ? '' : data.f01_categoria_agrupada);
        if(categoriaAgrupadaDesc != ''){
            $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
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

        /*REQUISITOS2018*/
        if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else{
            if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){//verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            }else{
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequisitosForm(data);

        if (data.f01_tip_via_act == '' || data.f01_tip_via_act == undefined || data.f01_tip_via_act == 'undefined') {} else{
            $scope.cargarNombVia(data.f01_tip_via_act, data.f01_zona_act);
        };

        if(data.chkzonasegura != undefined){
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
        }else{
            if(data.f01_tipo_lic != 32){
                $scope.GetValueZonaSegura(data.f01_categoria_agrupada);
            }
        }
        //MOSTRAR VIAE
        if(data.rdTipoTramite1 == 'CON_VIAE'){
            $scope.licenciaToogle4 = true;
        }
        else{
            $scope.licenciaToogle4 = false;
        }
        if (data.pago_adel == 'SI') {
            $scope.IsVisible = true;
            $scope.calcularDeudas(data.nro_ges);
            $scope.pago_adelantado = 'SI';
        } else{
            $scope.IsVisible = false;
            $scope.datos.pago_adel = 'NO';
            $scope.totalD = 0;
            $scope.datos.nro_ges = '';
            $scope.pago_adelantado = 'NO';
        };

        $scope.datos.f01_macro_act = data.f01_macro_act;
        $scope.datos.f01_categoria_descrip = data.f01_categoria_descrip;
        //EXTRAYENDO EXPEDIDO
        if(typeof($scope.datos.INT_EXP) != 'undefined'){
            var ideExpedido   =   $scope.datos.INT_EXP;
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
                    $scope.datos.INT_EXP  =   value.value;
                }
            });
        }
        if(typeof(data.f01_tip_via_act) == 'undefined'){
            setTimeout(function(){
                $scope.desabilitadoZ=true;
                $scope.desabilitadoV=true;
            }, 1000);
        }
        $scope.distritoZonas($scope.datos.f01_macro_act);
        $scope.nom_via = data.INT_AC_NOMBRE_VIA;
        if (data.INT_AC_ZONA) {
            $scope.desabilitadoZ=false;
        }
        if (data.INT_AC_TIP_VIA) {
            $scope.desabilitadoV=false;
        }
        /*if(data.INT_AC_TIP_VIA != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.INT_AC_TIP_VIA);
        }*/
        $scope.datos.INT_AC_NOMBRE_VIA = data.INT_AC_NOMBRE_VIA;
        $scope.obtenerHora();
        $scope.obtenerFecha();
        //$scope.open_mapa_ae();
    });
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
                $scope.fechaActual = snuevafecha;
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

    $scope.getDistritos = function(macro){
        try{
            var nDistritos = new aelstdistritos();
            nDistritos.id_macrodistrito = macro;
            nDistritos.aelst_distritos(function(res){
                x = JSON.parse(res);
                var datosdistrito = x.success.data;
                $scope.datosDistritos = datosdistrito;
                for (var i = 0; i < $scope.datosDistritos.length; i++) {
                    if ($scope.datosDistritos[i].iddistrito == $scope.datos.f01_dist_act) {
                        $scope.datos.f01_dist_act = $scope.datosDistritos[i].iddistrito;
                    };
                };
            });
        }catch (error){
            //$scope.errors["error_rol"] = error;
            alert("error en distritos");
        }
    };

    $scope.getZonas = function(distrito){
        try{
            var nZonas = new aelstzonas();
            nZonas.id_distrito = distrito;
            nZonas.aelst_zonas(function(res){
                x = JSON.parse(res);
                var gzonas = x.success.data;
                $scope.datosZonas = gzonas;
                for (var i = 0; i < $scope.datosZonas.length; i++) {
                    if ($scope.datosZonas[i].idzona == $scope.datos.f01_zona_act) {
                        $scope.datos.f01_zona_act = $scope.datosZonas[i].idzona;
                        };
                    };
            });
        }catch (error){
            //$scope.errors["error_rol"] = error;
            alert("error en zonas");
        }
    };

    $scope.cambioToggle1 = function(dato){
        $scope.lscategoria();
        $scope.lssubcategoria();
        if ( dato == "CON_VIAE") {
            $scope.licenciaToogle4 = true;
        } else {
            if($scope.datos.publicidad == ""){
                $scope.datos.publicidad = [];
            }
            var pub = $scope.datos.publicidad.concat($scope.datos.publicidadAE);
            if(pub.length == 0){
                $scope.licenciaToogle4 = false;
            }else{
                swal('', "No se puede seleccionar como actividad sin publicidad,debe eliminar las publicidades registradas", 'warning');
                $scope.datos.rdTipoTramite1 = "CON_VIAE";
                document.getElementById("CON_VIAE").checked = true;
            }
        }
    }

    //RADIO PARA VER SI REALIZARA UNA NUEVA ACTIVIDAD O UNA RENOVACION
    /*$scope.validarEmisionRenovacion = function (camb) {
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (camb != "NUEVO" && datosgen.length > 0) {
            $scope.botones = null;
            $scope.desabilitado = true;
            swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea Renovar", 'warning');
        }else{
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
        }
    }*/

   /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
   $scope.cambioToggleForm = function (cambio) {
        //$scope.validarEmisionRenovacion(cambio);
        if (cambio == "RENOVACION") {
            //RENOVACION
            $scope.mostrarMsgNuevaActividad = false;
            $scope.mostrarMsgActividadTrue = true;
            $scope.mostrarMsgActividadFalse = false;
            $scope.formDatosAE = true;
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
            $scope.datos.f01_tipo_lic = '';
            $scope.datos.f01_tipo_lic_descrip = '';
            $scope.datos.f01_categoria = '';
            $scope.datos.f01_categoria_descrip = '';
            $scope.datos.f01_categoria_agrupada = '';
            $scope.datos.f01_categoria_descripcion = '';
            $scope.datos.f01_categoria_agrupada_descripcion = '';
            $scope.datos.f01_categoria_agrupada_descrip = '';
            $scope.datos.f01_categoria_descrip2 = '';
            $scope.licenciaToogle1 = true;
            $scope.licenciaToogle2 = false;
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
            $scope.publicid='';
            $scope.datos.f01_actividad_principal_array =[];
            $scope.datos.fileArchivosAd = '';
            $scope.datos.FILE_CI = '';
            $scope.datos.FILE_MAPA='';
            $scope.datos.pago_adel = '';
            $scope.datos.nro_ges = '';
            //LISTAMOS LA TABLA SI ESTA VACIA
            $scope.validarActividadEconomica();
        }
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (JSON.stringify(datosgen) === '{}' && cambio != "NUEVO") {
            $scope.mostrarMsgNuevaActividad = false;
            swal('', " Estimado Ciudadano no tiene actividad económica registrada.", 'warning');
        }
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
            }else if(data == 'C'){
                $scope.btnEnviarFormLinea    =   true;
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

    $scope.datosAnterioresNatural = function(datos){
        $scope.datosAnt = [];
        $scope.datosMod = datos;
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica=datos;
        datosGenerales.getDatosAE_Viae(function(resultado){
            resultadoApi = JSON.parse(resultado);
            $scope.datosAnt = resultadoApi.success.dataSql.datosAE[0];
            $scope.datosAntPub = resultadoApi.success.dataSql.datosVIAE;
            $scope.datos.superficiezonseg = $scope.datosAnt.superficie;
            var respuestaVIAE =  resultadoApi.success.dataSql.datosVIAE;
            $scope.datos.publicidadAntiguo = respuestaVIAE;
            $scope.PlubliAntiguo_Grilla(respuestaVIAE);
            $scope.getDatosLotus(datos,$scope.datosAnt.hojaRuta);
            var ncategoria = new getCategoriaLicencia();
            ncategoria.dependencia = $scope.datosAnt.idActividadDesarrollada;
            ncategoria.getCategoria_Licencia(function(results){
                var categorialic = JSON.parse(results);
                var catLicencia = categorialic.success.data;
                if(catLicencia){
                    $scope.datosA = catLicencia;
                }
            });
        });
    };

    $scope.PlubliAntiguo_Grilla = function(dato){
        $scope.publia_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|descripcionTipoLetrero|caracteristica|descripcion|cara|alto|ancho|superficie|INT_CATE|","titulos": "ID|Tipo de Letrero|Caracteristica|Descripción|Cara|Alto|Ancho|Superficie|Categoria","impresiones": "true|true|true|true|true|true|true|true|false"};
        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publia_grilla.push({
                nroElem: j+1,
                descripcionTipoLetrero: dato[j].descripcionTipoLetrero,
                caracteristica: dato[j].caracteristica,
                descripcion: dato[j].descripcion,
                cara: dato[j].cara,
                alto: dato[j].alto,
                ancho: dato[j].ancho,
                superficie: dato[j].superficie,
                INT_CATE: dato[j].INT_CATE,
                estado: dato[j].estado
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.publia_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        $scope.datos.publicidadAntiguo_grilla = encabezado;
    }

    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual  =   "";
    $scope.nroOrdenActividiadEconomicaActual  =   "";
    $scope.idContribuyenteAEActual  =   "";



    $scope.selActividadEconomica =  function(tramite){
        var fechaVencimientoLic = new Date(tramite.licenciaFechaVencimiento);
        var dias = 90;
        var fechatram = "";
        var aniotram = "";
        var dato = tramite.FechaInicio.split('/');
        aniotram = dato[2];
        $scope.datos.publicidad = '';
        $scope.publicid = '';   
        $scope.totalD = 0;
        $scope.datos.nro_ges = '';
        $scope.listDeudas      =   [];
         var codhojaruta = "";
        var datosLotus = "";
        $scope.datosAnterioresNatural(tramite.IdActividad);
        if(tramite.Estado == 'V'){
            if(tramite.IdActividad){
                $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
                $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
            }
            $scope.sIdAeGrilla  =   tramite.IdActividad;
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            if(tipoPersona == "NATURAL"){
                tipoPersona = "N";
            }
            var datosGenerales = new getDatosAEViae();
            datosGenerales.idActividadEconomica = tramite.IdActividad;
            datosGenerales.getDatosAE_Viae(function(resultado){
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    codhojaruta = resultadoApi.success.dataSql.datosAE[0].hojaRuta;
                    var response = resultadoApi.success.dataSql.datosAE;
                    var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;
                    var valida = false;
                    var mensaje = '';
                    $scope.datos.validaBebidas = '';
                    $scope.datos.mostrarMultiservicioBebidas = false;
                    var detalleAct = '';
                    if(response[0].idTipoLicencia == '32'){
                        if(response[0].actividadesSecundariasActual !=''){
                            detalleAct = response[0].actividadesSecundariasActual.split(' - ');
                        }else{
                            detalleAct = response[0].actividadesSecundarias.split(' - ');
                        }
                        for(var i=0;i<detalleAct.length;i++){
                            var actDesarrollada = $scope.datosActividad.find(x => (x.descripcion343).trim() ==  detalleAct[i]);
                            if(actDesarrollada != undefined && actDesarrollada.idTipoLicencia == 18){
                                $scope.datos.mostrarMultiservicioBebidas = true;
                            }
                        }
                    }

                    if(response[0].idTipoLicencia == '18' || $scope.datos.mostrarMultiservicioBebidas == true){
                        if(tramite.deudaActividad == 'ACTIVIDAD SIN DEUDA' || tramite.deudaActividad == 'ACTIVIDAD EN FACILIDAD DE PAGOS' ){
                            fechaVencimientoLic.setDate(fechaVencimientoLic.getDate() - 730);
                            var fechaVenLic = new Date(tramite.licenciaFechaVencimiento);
                            fechaVenLic.setDate(fechaVenLic.getDate() + 60);
                            var vencimientoLic = new Date(tramite.licenciaFechaVencimiento);
                            if(fechaVencimientoLic < $scope.fechaActual &&  $scope.fechaActual <= vencimientoLic){
                                valida = true;
                                $scope.datos.validaBebidas = 'SIMPLIFICADO';
                            }else if(vencimientoLic < $scope.fechaActual && $scope.fechaActual <= fechaVenLic){
                                valida = true;
                                $scope.datos.validaBebidas = 'SIMPLIFICADO-MULTA';
                            }else if($scope.fechaActual > fechaVenLic){
                                valida = true;
                                $scope.datos.validaBebidas = 'MULTA';
                            }else{
                                valida = false;
                                mensaje = "Actividad Economica Vigente!!!";
                            }
                        }else{
                            valida = false;
                            mensaje = "Actividad Económica con deudas";
                        }
                        console.log("$scope.datos.validaBebidas",$scope.datos.validaBebidas);
                    }else{
                        fechaVencimientoLic.setDate(fechaVencimientoLic.getDate() - dias);
                        if(fechaVencimientoLic < $scope.fechaActual){
                            valida = true;
                        }else{
                            valida = false;
                            mensaje = "Actividad Economica Vigente!!!";
                        }
                    }
                    if(valida){
                        if(response.length > 0){
                            if(response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null'){
                                response[0].numeroOrden = 0;
                                $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                                $scope.datos.f01_nro_orden = response[0].numeroOrden;
                            }
                            else{
                                $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                                $scope.datos.f01_nro_orden = response[0].numeroOrden;
                            }
                            $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                            $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                            if(tipoPersona == "N"){
                                var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var smacro      =   "MACRODISTRITO";
                                var smacrodes = "";
                                var szona       =   "DISTRITO";
                                //DATOS DE LA ACTIVIDAD ECONÓMICA
                                $scope.datos.f01_raz_soc   =   response[0].denominacion;
                                //OBLIGATORIOS
                                $scope.datos.f01_sup  =   response[0].superficie;
                                $scope.datos.f01_cap_aprox   =   response[0].capacidad;

                                try{
                                    smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                                    hinicio     =   hinicio.split('-')[0].trim();
                                    hfinal      =   hfinal.split('-')[1].trim();
                                }catch(e){}
                                if(response[0].IdMacrodistrito == 2 || response[0].IdMacrodistrito == '2'){
                                smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " MAXIMILIANO PAREDES";
                                }
                                if(response[0].establecimiento =='ALQUI'){
                                    $scope.datos.f01_estab_es = "ALQUILADO";
                                }
                                if(response[0].establecimiento =='PROPI'){
                                    $scope.datos.f01_estab_es = "PROPIO";
                                }
                                if(response[0].establecimiento =='ANTIC'){
                                    $scope.datos.f01_estab_es = "ANTICRÉTICO";
                                }
                                if(response[0].establecimiento =='OTRO'){
                                    $scope.datos.f01_estab_es = "OTRO";
                                }
                                $scope.datos.f01_tip_act = response[0].tipoActividad;
                                if(response[0].tipoActividad =='MA' || response[0].tipoActividad =='MATRI'){
                                    $scope.datos.f01_tip_act_dec = 'MATRIZ';
                                    $scope.datos.f01_tip_act = 'MA';
                                }
                                if(response[0].tipoActividad =='SU' || response[0].tipoActividad =='SUCUR'){
                                    $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                                    $scope.datos.f01_tip_act = 'SU';
                                }
                                /*DATOS DE LA ACTIVIDAD*/
                                $scope.datos.f01_num_pmc = response[0].padron;
                                $scope.datos.f01_raz_soc = response[0].denominacion;
                                $scope.datos.f01_sup = response[0].superficie;
                                $scope.datos.f01_de_hor = hinicio;
                                $scope.datos.f01_a_hor = hfinal;
                                $scope.datos.f01_nro_actividad = response[0].numeroActividad;
                                $scope.datos.f01_productosElaborados = response[0].productosElaborados;
                                $scope.datos.f01_actividadesSecundarias = response[0].actividadesSecundarias;
                                /*TIPO LICENCIA*/
                                //$scope.datos.f01_tipo_lic = response[0].idTipoLicencia;//response[0].TipoLicencia;
                                $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                                $scope.datos.f01_categoria_descrip = response[0].ActividadDesarrollada;
                                console.log(" $scope.datos.f01_categoria_descrip", $scope.datos.f01_categoria_descrip);
                                $scope.obtenerActDes(response[0].idActividadDesarrollada);
                                //$scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                                /*Ubicación de Actividad Económica*/
                                $scope.distritoZonas(response[0].IdMacrodistrito);
                                $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                                $scope.datos.f01_macro_act = response[0].IdMacrodistrito;
                                $scope.datos.f01_macro_act_descrip = smacrodes;
                                $scope.datos.INT_AC_DISTRITO = response[0].idDistrito_actividadEconomica;
                                $scope.datos.f01_dist_act          = response[0].idDistrito_actividadEconomica;
                                $scope.datos.INT_AC_ID_ZONA = response[0].id_zona_ActividadEconomica;
                                $scope.datos.INT_ID_ZONA = response[0].id_zona_ActividadEconomica;
                                $scope.datos.f01_zona_act = response[0].id_zona_ActividadEconomica;
                                $scope.datos.f01_zona_act_descrip = response[0].zona;
                                $scope.datos.f01_tip_via_act = response[0].tipoVia;
                                $scope.datos.f01_num_act = response[0].via;
                                $scope.datos.f01_num_act1 = response[0].numero;
                                $scope.datos.f01_edificio_act = response[0].edificio;
                                $scope.datos.f01_bloque_act = response[0].bloque;
                                $scope.datos.f01_piso_act = response[0].piso;
                                $scope.datos.f01_dpto_of_loc = response[0].departamento;
                                $scope.datos.f01_tel_act1 = response[0].telefono;
                                $scope.datos.f01_idCodigoZona = response[0].idCodigoZona;
                                $scope.datos.f01_nit = response[0].nit;
                                if(response[0].casilla == ''){
                                    if(response[0].entreCalles == ''){
                                        $scope.datos.f01_casilla = '.';
                                    }else{
                                        $scope.datos.f01_casilla = response[0].entreCalles;
                                    }
                                }else{
                                    $scope.datos.f01_casilla = response[0].casilla;
                                }
                                $scope.datos.f01_factor          =  response[0].tipoTrayecto;
                                $scope.actulizarIdDistrito();
                                if(response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined'){
                                    response[0].edificio = '';
                                    response[0].bloque = '';
                                    response[0].piso = '';
                                    response[0].departamento = '';
                                    response[0].telefono = '';
                                }
                                $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                                $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                                $scope.datos.f01_categoria_descrip_ant = response[0].actividad_desarrollada343;
                                $scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act);
                            }
                            var buscaVia = $scope.datosNombVia.find(x => x.nombVia ==  $scope.datos.f01_num_act);
                            if(buscaVia == undefined){
                                $scope.datos.f01_num_act_n = $scope.datos.f01_num_act;
                                $scope.datos.f01_num_act = 'NINGUNO';
                            }
                                //INT_TRAMITE_RENOVA
                            $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;
                            if(codhojaruta.substring(0,6) == 'EM-LFB' || codhojaruta.substring(0,6) == 'RE-LFB' || codhojaruta.substring(0,6) == 'EMI-AE' || codhojaruta.substring(0,6) == 'REN-LF' || codhojaruta.substring(0,5) == 'RE-LF' || codhojaruta.substring(0,6) == 'AER-EL' || codhojaruta.substring(0,7) == 'MOD_MOD' || codhojaruta.substring(0,8) == 'LICEN-AE' || codhojaruta.substring(0,5) == 'EM-LF' || codhojaruta.substring(0,6) == 'MOD-LF') {
                                var dataLotus = $scope.getDatosLotus(resultadoApi.success.dataSql.datosAE[0].idActividadEconomica,codhojaruta);
                                dataLotus.then(function(respuesta){
                                    if(respuesta.success.data.length > 0){
                                        datosLotus = respuesta.success.data[0].datos;
                                        if (datosLotus.File_Adjunto == 'undefined' || datosLotus.File_Adjunto == null) {
                                            $scope.reqdoc = true;
                                            $scope.docsAdjuntoAntiguo = '';
                                            $scope.datosdocanterior = '';
                                        } else{
                                            $scope.reqdoc = null;
                                            $scope.docsAdjuntoAntiguo = datosLotus.File_Adjunto;
                                            $scope.datosdocanterior = new Object();
                                            for (var i = 0; i < $scope.docsAdjuntoAntiguo.length; i++) {
                                                if ($scope.docsAdjuntoAntiguo[i] == null || $scope.docsAdjuntoAntiguo[i] == 'undefined' || $scope.docsAdjuntoAntiguo[i] == '') {
                                                } else{
                                                    var narchivo = $scope.docsAdjuntoAntiguo[i].url.split('?');
                                                    var achinom = narchivo[0].split('/');
                                                    var dimar = achinom.length;
                                                    var datosdocant = {
                                                        "titulo": $scope.docsAdjuntoAntiguo[i].nombre,
                                                        "nombreAcrh": achinom[dimar-1],
                                                        "url": $scope.docsAdjuntoAntiguo[i].url
                                                    };
                                                    $scope.datosdocanterior[i] = datosdocant;
                                                };
                                            };
                                            if($scope.datos.validaBebidas == 'SIMPLIFICADO' || $scope.datos.validaBebidas == 'SIMPLIFICADO-MULTA' || $scope.datos.validaBebidas == 'MULTA'){
                                                if(datosLotus.f01_zona_segura == "" || datosLotus.f01_zona_segura == undefined){
                                                    $scope.GetZonaSeguraV(0);
                                                }else{
                                                    $scope.GetZonaSeguraV(datosLotus.f01_zona_segura);
                                                }
                                                $scope.datos.INT_AC_longitud = parseFloat(datosLotus.INT_AC_longitud);
                                                $scope.datos.INT_AC_latitud  = parseFloat(datosLotus.INT_AC_latitud);
                                                $scope.open_mapa_ae($scope.datos.INT_AC_latitud,$scope.datos.INT_AC_longitud);
                                            }
                                            var adjunto = datosLotus.File_Adjunto.find(x => x.nombre ==  'CROQUIS DE UBICACIÓN DE LA ACTIVIDAD ECONÓMICA');
                                            if(adjunto != undefined){
                                                $scope.datos.mapa = adjunto.url;
                                            }else{
                                                $scope.datos.mapa = '';
                                            }
                                        };
                                    }else{
                                        //$scope.datos.INT_AC_longitud = "-68.13415467739104";
                                        //$scope.datos.INT_AC_latitud  = "-16.49436035257571";
                                        console.log("datos",$scope.datos);
                                    }
                                });
                            }
                            $scope.botones = "mostrar";
                            $scope.desabilitado = false;
                            $scope.desabilitaBebidas = false;
                            if (lstPublicidad.length > 0) {
                                $scope.datos.rdTipoTramite1 = 'CON_VIAE';
                                $scope.listpub = [];
                                for (var i = 0; i < lstPublicidad.length; i++) {
                                    var lstpublicidad = new Object();
                                    lstpublicidad.idPublicidad = lstPublicidad[i].idPublicidad;
                                    lstpublicidad.INT_NRO_CARA = lstPublicidad[i].cara;
                                    lstpublicidad.INT_SUP = lstPublicidad[i].superficie;
                                    lstpublicidad.idcarac = lstPublicidad[i].idTipoLetrero;
                                    lstpublicidad.INT_TIPO_LETRE = lstPublicidad[i].descripcionTipoLetrero;
                                    lstpublicidad.id_cara = lstPublicidad[i].idCaracteristica;
                                    lstpublicidad.INT_CARA = lstPublicidad[i].caracteristica;
                                    lstpublicidad.idcate = lstPublicidad[i].idCategoria;
                                    lstpublicidad.INT_ALTO = lstPublicidad[i].alto;
                                    lstpublicidad.INT_ANCHO = lstPublicidad[i].ancho;
                                    lstpublicidad.INT_DESC = lstPublicidad[i].descripcion;
                                    lstpublicidad.estado = lstPublicidad[i].estado;
                                    $scope.listpub[i] = lstpublicidad;

                                };
                                $scope.datos.swpublicidad = 'CP';
                                $scope.licenciaToogle4 = true;
                                $scope.datos.publicidadAE = $scope.listpub;
                                $scope.Plubli_Grilla($scope.datos.publicidadAE);
                                $scope.pubAE = true;
                                $scope.pubMensaje = false;
                            }else{
                                $scope.datos.rdTipoTramite1 = 'SIN_VIAE';
                                $scope.datos.swpublicidad = 'SP';
                                $scope.licenciaToogle4 = false;
                                $scope.datos.publicidadAE = [];
                                $scope.datos.publicidad_grilla = [];
                            };
                            if($scope.datos.validaBebidas == 'SIMPLIFICADO' || $scope.datos.validaBebidas == 'SIMPLIFICADO-MULTA' || $scope.datos.validaBebidas == 'MULTA'){
                                $scope.datos.f01_idCodigoZona = response[0].idCodigoZona;
                                /*if($scope.datos.validaBebidas == 'SIMPLIFICADO' || $scope.datos.validaBebidas == 'SIMPLIFICADO-MULTA'){
                                    $scope.desabilitado = true;
                                    $scope.desabilitaBebidas = false;
                                }*/
                                if($scope.datos.validaBebidas == 'SIMPLIFICADO-MULTA' || $scope.datos.validaBebidas == 'MULTA'){
                                    swal('', "USTED TIENE UNA MULTA PENDIENTE POR NO RENOVAR SU LICENCIA DE  FUNCIONAMIENTO  DENTRO DE LOS PLAZOS ESTABLECIDOS SEGÚN NORMATIVA, POR  TANTO UNA VEZ PRESENTADA SU SOLICITUD, DEBERÁ  APERSONARSE A  LAS PLATAFORMA DEL EDIFICIO ESPRA, PISO 8  HORARIOS DE ATENCIÓN  09:00 A  12:30  Y  14:30 A 19:00", 'warning');
                                }
                                var actividadDes = $scope.datosActividad.find(x => x.descripcion343 ==  response[0].actividad_desarrollada343);
                                if(actividadDes != undefined){
                                    $scope.datos.f01_categoria_descrip = actividadDes.idActividadDesarrollada343;
                                    //document.getElementById("f01_categoria_descrip").value = actividadDes.idActividadDesarrollada343;
                                    $scope.datos.f01_categoria_descripcion = actividadDes.descripcion343;
                                    $scope.datos.f01_categoria_descrip2 = actividadDes.descripcion343;
                                    $scope.datos.f01_categoria_agrupada_descripcion = actividadDes.descripcion343;
                                    if($scope.datos.mostrarMultiservicioBebidas == true){
                                        $scope.GetValueCategoria();
                                        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
                                        $scope.datos.licenciam = [];
                                        $scope.licenciamul = [];
                                        for(var i=0;i<detalleAct.length;i++){
                                            var actDesarrollada = $scope.datosActividad.find(x => (x.descripcion343).trim() ==  detalleAct[i].trim());
                                            $scope.LicenciaXCategoriaMultiservicioRen(actDesarrollada.idActividadDesarrollada343, response[0].superficie);
                                            $scope.multipleNatural.f01_act_desarrolladamdescrip = actDesarrollada.descripcion343;
                                           // setTimeout(function(){
                                                $scope.guardarLicencia($scope.multipleNatural);
                                                $scope.GetValueActividadesCatDesarrollada();
                                            //}, 2000);
                                        }
                                    }
                                    $scope.LicenciaXCategoriaA(actividadDes.idActividadDesarrollada343, response[0].superficie);
                                }else{
                                    actividadDes = $scope.datosActividad.find(x => x.descripcion343 ==  response[0].actividad_desarrollada343Actual);
                                    if(actividadDes != undefined){
                                        $scope.datos.f01_categoria_descrip = actividadDes.idActividadDesarrollada343;
                                        //document.getElementById("f01_categoria_descrip").value = actividadDes.idActividadDesarrollada343;
                                        $scope.datos.f01_categoria_descripcion = actividadDes.descripcion343;
                                        $scope.datos.f01_categoria_descrip2 = actividadDes.descripcion343;
                                        $scope.datos.f01_categoria_agrupada_descripcion = actividadDes.descripcion343;
                                        if($scope.datos.mostrarMultiservicioBebidas == true){
                                            $scope.GetValueCategoria();
                                            $scope.datos.licenciam = [];
                                            $scope.licenciamul = [];
                                            for(var i=0;i<detalleAct.length;i++){
                                                var actDesarrollada = $scope.datosActividad.find(x => (x.descripcion343).trim() ==  detalleAct[i].trim());
                                                $scope.LicenciaXCategoriaM(actDesarrollada.idActividadDesarrollada343, response[0].superficie);
                                                $scope.multipleJuridico.f01_act_desarrolladamdescrip = actDesarrollada.descripcion343;
                                            // setTimeout(function(){
                                                    $scope.guardarLicencia($scope.multipleJuridico);
                                                    $scope.GetValueActividadesCatDesarrollada();
                                                //}, 2000);
                                            }
                                        }     
                                        $scope.LicenciaXCategoriaA(actividadDes.idActividadDesarrollada343, response[0].superficie);
                                        $scope.$apply();
                                    }else{
                                        swal('', 'No se encontro el tipo de actividad desarrollada' , 'error');
                                    }
                                }
                                //$scope.datos.f01_categoria_descrip = 
                            }
                        }
                        $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    }else{
                        swal('', mensaje , 'warning');
                    }
                }else{

                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
            if($scope.datos.validaBebidas != 'SIMPLIFICADO' && $scope.datos.validaBebidas != 'SIMPLIFICADO-MULTA' &&  $scope.datos.validaBebidas != 'MULTA'){
                $scope.datos.f01_categoria_descrip = '';
            }
        }else{
            swal('', tramite.deudaActividad, 'warning');

//            sweet.show('', tramite.deudaActividad , 'warning');
        }
    };


    $scope.getDatosLotus = function(idadcteco, hojar){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var datosLotus = new getDatosAELotus();
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta){
                $scope.resultadoLotus = JSON.parse(respuesta);
                console.log("$scope.resultadoLotus",$scope.resultadoLotus,"tamaño",$scope.resultadoLotus.success.data.length);
                if($scope.resultadoLotus.success.data.length > 0){
                    $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                    $q.all($scope.resultadoLotus).then(function(data){
                        deferred.resolve($scope.resultadoLotus);
                    })
                }else{
                    console.log('error', "No se encontraron datos de ubicacion de la actividad económica.");                
                }
            });
        }catch(e){
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function(data){
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;
    }


    $scope.validarActividadEconomica  =   function(){
        $.blockUI();
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.listarAE();
    };

    $scope.listadoActividadEconomica = function(){
       var validarpromesas = [$scope.listarAE()];
       $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia

       });
    }

    $scope.listarAE = function () {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        if(sNumeroRegistros > 0 ){
            $scope.datos.rdTipoTramite = "RENOVACION";
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            var contribuyente   =   new gLstActividadEconomica();
            contribuyente.idContribuyente   =   idContribuyente;
            contribuyente.tipo  =   'N';
            contribuyente.lstActividadEconomica(function(resultado){
                $.unblockUI();
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    if(response.success.dataSql.length > 0){
                        //PRETUNTAR Y LISTAR, SOLO LOS TRÁMITES EN LINEA DE INTERNET
                        $scope.formDatosAE  =   true;
                        $scope.mostrarMsgActividadTrue  = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = response.success.dataSql;
                        var data = response.success.dataSql;
                        $scope.tblTramites.reload();
                        deferred.resolve(response);
                    } else {
                        $scope.mostrarMsgActividadTrue  = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE  =   false;
                    }
                    var sformguardado   =   $scope.datos.INT_FORM_ALMACENADO;
                    if(typeof sformguardado == 'undefined' || sformguardado != 'G'){
                        $scope.botones = null;
                        $scope.desabilitado = true;
                        $scope.desabilitaBebidas = true;
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea Renovar.", 'warning');
                    }else{
                        $scope.botones = "mostrar";
                        /*if($scope.datos.validaBebidas == 'SIMPLIFICADO' || $scope.datos.validaBebidas == 'SIMPLIFICADO-MULTA' || $scope.datos.validaBebidas == 'MULTA'){
                            $scope.desabilitado = true;
                            $scope.desabilitaBebidas = false;
                        }else{*/
                            $scope.desabilitado = false;
                            $scope.desabilitaBebidas = false;
                        //}
                    }
                } else {
                     swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        }else{
            $scope.datos.rdTipoTramite = "NUEVO";
            document.getElementById("rdTipoTramiteN").checked = true;
            $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";
            $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
            $scope.desabilitaBebidas = false;
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE  =   false;
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.datos.rdTipoTramite = "NUEVO";
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";
                $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            }
            $.unblockUI();
        }
        return deferred.promise;
    };

    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.trmUsuario, params.filter()) :
            $scope.trmUsuario;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
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
            //$scope.getRequisitosAdjuntos();
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
            if(sobj.name == 'f01_upload_declaracion_jurada'){
                $scope.almacenarDeclaracion(rMisDocs,idFiles,'f01_nombre_declaracion_jurada','f01_upload_declaracion_jurada','declaracion_jurada');
            }else{
                if(sobj.name == 'f01_carnet_manipulacion'){
                    $scope.almacenarCarnetsManipulacion(rMisDocs,idFiles);
                }/*else if(sobj.name == 'f01_frontis_ae'){
                    $scope.almacenarDeclaracion(rMisDocs,idFiles,'f01_nombre_frontis_ae','f01_upload_frontis_ae','frontis_ae');
                }*/
                else{
                    $scope.almacenarRequisitos(rMisDocs,idFiles);
                    $scope.adicionarArrayDeRequisitos(sobj,idFile);
                }
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
            if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
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
        //$scope.fileArRequisitos.push(JSON.parse(myJSON));
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
        if($scope.datos.f01_tipo_lic == 32){
            $scope.lstRequisitosTecnicosMultiples($scope.datos.licenciam);
        }else{
            $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        }
        //$scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
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
        angular.forEach(aArchivos, function(archivo, key) {
            //var tamaniofile = obj.files[0];
            if(typeof(archivo) != 'undefined'){
                angular.forEach($scope.docArray, function(doc, pos) {
                    if(doc.resid == idFiles[key]){
                        descDoc = doc.desNom;
                    }
                })
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
                if (archivo.size <= 15000000) {
                    if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
                        $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                        document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                    } else{
                        swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    };
                };
                if (archivo.size > 15000000) {
                    swal('Advertencia', 'Tamaño de Archivo no soportado', 'error');
                };
                /*if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile){
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[1];
                            var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                        });
                    }
                }
                else{
                    if (archivo.size <= 500000) {
                        if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                        } else{
                            swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                    if (archivo.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    };
                }*/
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
        if($scope.datos.validaBebidas != 'SIMPLIFICADO' && $scope.datos.validaBebidas != 'SIMPLIFICADO-MULTA'){
            angular.forEach($scope.docArray, function(value, key) {
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
                if($scope.datos.f01_tipo_lic != 18 && $scope.datos.mostrarMultiservicioBebidas != true){
                    //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
                    if(value.idnro == 3 || value.idnro == 4){
                        var sviae  = $scope.datos.rdTipoTramite1;
                        if(sviae  == 'SIN_VIAE'){//sin viae
                            $scope.docArray[key].estado = false;
                        }else{
                            $scope.docArray[key].estado = true;
                        }
                    }
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
                var szonasegura = $scope.datos.chkzonasegura;
                if(szonasegura){
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
            
            });
        }else{
            angular.forEach($scope.docArray, function(value, key) {
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
                var szonasegura = $scope.datos.chkzonasegura;
                if(value.idnro == 13){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                        default:
                                $scope.docArray[key].estado = false;
                    }
                }
                else if(value.idnro == 14){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                        default:
                            $scope.docArray[key].estado = false;
                    }
                }
                else if(value.idnro == 15){
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                        break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                        break;
                        default:
                            $scope.docArray[key].estado = false;
                    }
                }
                else if($scope.docArray[key].desNom == 'foto_frontis'){
                    $scope.docArray[key].estado = true;
                }
                else{
                    $scope.docArray[key].estado = false;
                }                   
            
            });
        }
        try{
           // console.log("error en adjuntos");
        }catch(e){}
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[0] = datoObjectFile1;
        datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[1] = datoObjectFile2;
        $scope.datos.FILE_CI = datoObjectFiles_ci;
    }

    $scope.iniciarRequsitosDoc = function(data){
        var validarpromesas = [$scope.iniciarRequisitosForm(data)];
        $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
        });
    }

    /*REQUISITOS2018*/
    $scope.iniciarRequisitosForm = function(data){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.fileArRequisitos = {};
        if(data.sArrayFileArRequisitos){
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function(){
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_"+key).val(value.campo);
                    deferred.resolve(data);
                });
                $scope.validarRequisitosForm();
                $scope.$apply();
            },3500);
        }
        return deferred.promise;
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
    $scope.iniciarGetRequisitosForm = function(sidcategoria, stipoper){
        if(sidcategoria ==  32 || sidcategoria ==  '32'){//verificamos si la licencia es multiple
            $scope.lstRequisitosMultiples2018($scope.datos.licenciam);
        }else{
            $scope.getRequisitosFormulario(sidcategoria, stipoper);
        }
    }

    /*REQUISITOS2018*/
  $scope.getRequisitosFormulario = function(sidcategoria, stipoper){
        if($scope.datos){
            var idCategoria = sidcategoria;
            var persona = 'N';
            if(typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = idCategoria;
                ndCategoria.stipopersona = persona;
                ndCategoria.aelstRequisitos2018(function(res){
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for(j=0; j<datosRequisitosTmp.length; j++){
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.desObligatorio = datosRequisitosTmp[j].descObligatorio;
                        datoObject.desTipo = "requerid";
                        datoObject.estado   = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }
                    datoObjectFinal.push({"resid":3025,"desNom":"foto_frontis","estado":true,"nomcampo":"f01_upload5","resvalor":"Fotografía del frontis de la actividad económica que evidencie los elementos publicitarios con las que cuente."});
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                        $scope.$apply();
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
                        datoObject.estado = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }
                    datoObjectFinal.push({"resid":3025,"desNom":"foto_frontis","estado":true,"nomcampo":"f01_upload5","resvalor":"Fotografía del frontis de la actividad económica que evidencie los elementos publicitarios con las que cuente."});
                    $scope.docArray =   datoObjectFinal;
                    setTimeout(function(){
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                        $scope.$apply();
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
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=17&size=900x500&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
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
        $scope.onlyy = true;
        $scope.botonn = "upd";
        $scope.publi = dato;
        $scope.publi.INT_ALTO = parseFloat(dato.INT_ALTO);
        $scope.publi.INT_ANCHO = parseFloat(dato.INT_ANCHO);
        //$scope.publi.INT_NRO_CARA = dato.INT_NRO_CARA;
        $scope.publi.INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
        $scope.publi.INT_CARA = dato.INT_CARA;
        $scope.publi.INT_DESC = dato.INT_DESC;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.modificarpublicidad = function(dato){
        if(dato.INT_CARA =='' || dato.INT_CARA == null ||
            dato.INT_TIPO_LETRE =='' || dato.INT_TIPO_LETRE == null ||
            dato.INT_DESC =='' || dato.INT_DESC == null || dato.INT_ALTO =='' || dato.INT_ALTO == null || dato.INT_ANCHO =='' || dato.INT_ANCHO == null ) {
                sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
        }
        else{
            if (dato.estado == 'N') {
                $scope.publi=[];
                $scope.lssubcategoria();
                var superior = parseFloat(dato.INT_ALTO) * parseFloat(dato.INT_ANCHO);
                superior = (Math.round(superior * 10) / 10)+"";
                var supe = parseFloat(superior.replace(",","."));
                if (supe < 18) {
                    var palto   =   dato.INT_ALTO;
                    var pancho  =   dato.INT_ANCHO;
                    palto   =   parseFloat(palto).toFixed(2);
                    palto   =   palto.replace(",",",");
                    pancho  =   parseFloat(pancho).toFixed(2);
                    pancho  =   pancho.replace(",",".");
                    dato.superficie = superior;
                    dato.INT_SUP =  supe.toFixed(2);
                    dato.INT_ALTO = palto;
                    dato.INT_ANCHO = pancho;
                    $scope.botonn="new";
                    $scope.$apply();
                } else {
                    swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    //sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                }
            } else{
                swal({ 
                title: "Modificar",
                text: "Esta seguro de Modificar el Elemento de Identificación ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "SI",
                cancelButtonText: "No", 
                closeOnConfirm: false,
                closeOnCancel: false },
                function(isConfirm){ 
                if (isConfirm) {
                    sweet.close();   
                    $scope.publi = [];
                    var datopublic = dato;
                    for (var i = 0; i < $scope.datos.publicidad.length; i++) {
                        if ($scope.datos.publicidad[i].idPublicidad == dato.idPublicidad) {
                            var superior = parseFloat(datopublic.INT_ALTO) * parseFloat(datopublic.INT_ANCHO);
                            superior = (Math.round(superior * 10) / 10)+"";
                            var supe = parseFloat(superior.replace(",","."));
                            if (supe < 18) {
                                var palto   =   datopublic.INT_ALTO;
                                var pancho  =   datopublic.INT_ANCHO;
                                palto   =   parseFloat(palto).toFixed(2);
                                palto   =   palto.replace(",",",");
                                pancho  =   parseFloat(pancho).toFixed(2);
                                pancho  =   pancho.replace(",",".");
                                $scope.datos.publicidad[i].estado = 'M';
                                $scope.datos.publicidad[i].INT_SUP =  supe.toFixed(2);
                                $scope.datos.publicidad[i].INT_ALTO = palto;
                                $scope.datos.publicidad[i].INT_ANCHO = pancho;
                                $scope.datos.publicidad[i].INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
                                $scope.datos.publicidad[i].INT_CARA = dato.INT_CARA;
                                $scope.datos.publicidad[i].INT_DESC = dato.INT_DESC;
                            } else {
                                sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                            }
                        };              
                    }
                    $scope.lssubcategoria();
                    $scope.Plubli_Grilla($scope.datos.publicidad);
                    $scope.botonn="new";
                    $scope.$apply();
                    } else { 
                        $scope.publi=[];
                        sweet.close();           
                    } 
                });
            }
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

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice($scope.publicid.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
        $scope.datos.publicidad = $scope.publicid;
        $scope.Plubli_Grilla($scope.publicid);
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
            $scope.datos.adjuntoViae.splice($scope.datos.adjuntoViae.indexOf(data), 1 );
            if($scope.datos.fileArRequisitosViae != undefined){
                var key = "f01_upload"+dato.id;
                delete $scope.datos.fileArRequisitosViae[key];
            }
               //$scope.id = $scope.id - 1;
           $scope.eliminarPublicidadGrilla(data);
           $scope.$apply();
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
            //$scope.errors["error_rol"] = error;
            console.log("eeror en caracteristica");
        }
    };

     $scope.guardarpublicidad = function(public){
        if (public.INT_SUPERFICIE) {
            if(public.INT_CARA =='' || public.INT_CARA == null ||
            public.INT_CATE =='' || public.INT_CATE == null || public.INT_TIPO_LETRE =='' || public.INT_TIPO_LETRE == null ||
            public.INT_DESC =='' || public.INT_DESC == null || public.INT_SUPERFICIE =='' || public.INT_SUPERFICIE == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE', 'error');
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
                            INT_SUP:total.toFixed(2),
                            estado:"N"
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
                swal('', 'Llene lo campos requeridos para la VIAE', 'error');
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
                            INT_SUP:total.toFixed(2),
                            estado:"N"
                        });
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                        if($scope.datos.adjuntoViae == undefined){
                            $scope.datos.adjuntoViae = [];
                        }
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
                INT_CATE: dato[j].INT_CATE,
                estado: dato[j].estado
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.publi_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.publicidad_grilla = encabezado;
        var pub_grilla = $scope.datos.publicidad_grilla;
        angular.forEach(pub_grilla, function(celda, fila) {
            if (celda['estado'] == 'V') {
                celda['estado'] = 'Vigente';
            };
            if (celda['estado'] == 'M') {
                celda['estado'] = 'Modificar';
            };
            if (celda['estado'] == 'B') {
                celda['estado'] = 'Baja';
            };
            if (celda['estado'] == 'N') {
                celda['estado'] = 'Nuevo';
            };
        });
        $scope.datos.publicidad_grilla = encabezado;
    }


    $scope.onlyy=false;
    $scope.botonn="new";

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
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

    //$scope.caras = [];
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
            //id      : user.id,
            desc    : user.desc,
            sup     : user.sup
        });
        $scope.user = "";
        $scope.detalle = [];
        //$scope.actulizarCaras();
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
        //$scope.actulizarCaras();
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
        if(!$scope.desabilitado) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startDateOpened = true;
        }
    };

    $scope.$watch('datos.f01_fecha_nac',function() {
        try {
            if ($scope.datos.f01_fecha_nac) {
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

    $scope.calcularCapacidad = function(superficie) {
        if(superficie) {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        }
        else {
            $scope.datos.f01_cap_aprox = 0;
        }
    }
    $scope.calcularCapacidadAuto = function(superficie) {
        if(superficie) {
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        }
        else {
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

   /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function (data) {
        var nit = '';
        if(data.fileArchivosAd == undefined || data.fileArchivosAd == ''){
            data.fileArchivosAd = [];
        }
        if(data.validaBebidas != 'SIMPLIFICADO' && data.validaBebidas != 'SIMPLIFICADO-MULTA'){
            console.log("data.f01_nit",data.f01_nit);
            if(data.f01_nit !='' && data.f01_nit != undefined && data.f01_nit !=0 && data.f01_nit !='0'){
                var resp = data.fileArchivosAd.find( archivos => (archivos.nombre).includes("NIT"));
                if(resp == undefined){
                    nit = 'SIN NIT';
                }
            }else{
                data.f01_nit = '';
            }
        }
        /*REQUISITOS2018*/
        console.log("data.validaBebidas",data.validaBebidas);
        if(nit == ''){
            data.sArrayFileArRequisitos = $scope.fileArRequisitos;
            var taemayor = 0;
            if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
                console.log("data.licenciam",data.licenciam);
                for (var i = 0; i < data.licenciam.length; i++) {
                    if (parseInt(data.licenciam[i].f01_tae) >= taemayor) {
                        taemayor = parseInt(data.licenciam[i]);
                        $scope.datos.idLic = data.licenciam[i].f01_tipo_licmid;
                        $scope.datos.descriplic = data.licenciam[i].f01_tipo_licmdescrip;
                        $scope.datos.idcat = data.licenciam[i].f01_cat_agrupadamid;
                        $scope.datos.descripcat = data.licenciam[i].f01_cat_agrupadamdescrip;
                        $scope.datos.iddesa = data.licenciam[i].f01_act_desarrolladamid;
                        $scope.datos.descripdesa = data.licenciam[i].f01_act_desarrolladamdescrip;
                    }
                };
                sarrayobligatorio   =   true;
               // if(data.fileArchivosAd != undefined && data.fileArchivosAd != "" && data.fileArchivosAd != null){
                    if(data && data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                        data.FILE_CI != ""  && data.FILE_CI != null &&
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
                        data.f01_casilla != "" && data.f01_casilla != null&&
                        data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null){
                        if(data.f01_num_act != 'NINGUNO'){
                            if(data.validaBebidas == 'SIMPLIFICADO' || data.validaBebidas == 'SIMPLIFICADO-MULTA'){
                                if(data.f01_upload_declaracion_jurada != undefined && data.f01_upload_declaracion_jurada != ''){
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }else{
                                    swal('', "Datos obligatorios, Debe adjuntar la declaración jurada firmada", 'warning');
                                }
                            }else{
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#aceptacionCondiciones").modal("show");
                            }
                        }else{
                            if(data.f01_num_act_n != "" && data.f01_num_act_n != null){
                                if(data.validaBebidas == 'SIMPLIFICADO' || data.validaBebidas == 'SIMPLIFICADO-MULTA'){
                                    if(data.f01_upload_declaracion_jurada != undefined && data.f01_upload_declaracion_jurada != ''){
                                        $scope.serializarInformacion(data);
                                        $scope.formulario401(data);
                                        $("#aceptacionCondiciones").modal("show");
                                    }else{
                                        swal('', "Datos obligatorios, Debe adjuntar la declaración jurada firmada", 'warning');
                                    }
                                }else{
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }
                            }else{
                                swal('', "Debe completar el nombre de via", 'warning');
                            }
                        }
                    }
                    else{
                        swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
                    }
               /* }else{
                    console.log("fileArchivosAd",data.fileArchivosAd);
                    swal('', "Datos obligatorios, verifique los documentos adjutos ", 'warning');
                }*/
            }
            if (data.f01_tipo_lic != 32 || data.f01_tipo_lic != '32'){
                console.log(1,data.sArrayFileArRequisitos,2,data.rdTipoTramite1,3,data.FILE_CI,4,data.rdTipoTramite,5,data.INT_AC_latitud,6,data.INT_AC_longitud,7,
                data.f01_raz_soc,8,data.f01_sup,9,data.f01_de_hor,10,data.f01_a_hor,11,data.f01_estab_es,12,data.f01_tipo_lic,13,data.f01_categoria_agrupada,14,
                data.f01_macro_act,15,data.f01_macro_act_descrip,16,data.f01_dist_act,17,data.f01_zona_act,18,data.f01_tip_via_act,19,data.f01_num_act,20,
                data.f01_num_act1,21,data.f01_casilla,22,data.f01_categoria_descrip);
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
                    data.f01_dist_act != "" && data.f01_dist_act != null && 
                    data.f01_zona_act != "" && data.f01_zona_act != null &&                    
                    data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                    data.f01_num_act != "" && data.f01_num_act != null &&
                    data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                    data.f01_casilla != "" && data.f01_casilla != null &&
                    data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null ){
                    //$rootScope.validacionRequisitosTec();
                        console.log("data",data.f01_upload_declaracion_jurada);
                        if(data.f01_num_act != 'NINGUNO'){
                            if(data.validaBebidas == 'SIMPLIFICADO' || data.validaBebidas == 'SIMPLIFICADO-MULTA' ){
                                if(data.f01_upload_declaracion_jurada != undefined && data.f01_upload_declaracion_jurada != ''){
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }else{
                                    swal('', "Datos obligatorios, Debe adjuntar la declaración jurada firmada", 'warning');
                                }
                            }else{
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#aceptacionCondiciones").modal("show");
                            }
                        }else{
                            if(data.f01_num_act_n != "" && data.f01_num_act_n != null){
                                if(data.validaBebidas == 'SIMPLIFICADO' || data.validaBebidas == 'SIMPLIFICADO-MULTA'){
                                    if(data.f01_upload_declaracion_jurada != undefined && data.f01_upload_declaracion_jurada != ''){
                                        $scope.serializarInformacion(data);
                                        $scope.formulario401(data);
                                        $("#aceptacionCondiciones").modal("show");
                                    }else{
                                        swal('', "Datos obligatorios, Debe adjuntar la declaración jurada firmada", 'warning');
                                    }
                                } else{
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#aceptacionCondiciones").modal("show");
                                }
                            }else{
                                swal('', "Debe completar el nombre de via", 'warning');
                            }
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
    var iniciaDeclaracionJuradaRenovacionNatural = $rootScope.$on('iniciaDeclaracionRenovacionNatural', function (event, data) {
        $("#declaracionN").modal("show");
    });

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
            urlFormularioN  =   "../../docs/AE_Formulario_402Renov.html";
            $("#msgformularioN").load(urlFormularioN, function(data) {
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
                var pubMod = '';
                pubMod = '<tr><td>VIAE</td>'+
                '<td>TIPO</td>' +
                '<td>CARACTERÍSTICA</td>'+
                //'<td>CARAS</td>'+
                '<td>DESCRIPCIÓN</td>'+
                '<td>ALTO</td>'+
                '<td>ANCHO</td>'+
                '<td>SUPERFICIE</td>'+
                '<td>ESTADO</td></tr>';
                if(datos.publicidad == "" || datos.publicidad == undefined){
                    datos.publicidad = [];
                }
                if(datos.publicidadAE == "" || datos.publicidadAE == undefined){
                    datos.publicidadAE = [];
                }
                datos.viaePublicidad = datos.publicidadAE.concat(datos.publicidad);
                for (i = 0; i < datos.viaePublicidad.length; i++){
                    pubMod = pubMod +'<tr>' +
                    //'<td>' + datos.viaePublicidad[i].id + '</td>'+
                    '<td>' + (i+1) + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_TIPO_LETRE + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_CARA + '</td>'+
                    //'<td>' + datos.viaePublicidad[i].INT_NRO_CARA + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_DESC + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_ALTO + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_ANCHO + '</td>'+
                    '<td>' + datos.viaePublicidad[i].INT_SUP + '</td>'+
                    '<td>' + datos.viaePublicidad[i].estado + '</td></tr>';
                }
                //CABECERA
                stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                stringFormulario40  =   stringFormulario40.replace("#f01_nro_orden#", datos.f01_nro_orden);
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_form#", '402');
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
                    multi = '<table id="tablaMul" class="table table-striped table-bordered"><tr>'+
                    '<td>NRO</td>'+
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
                    multi = multi + '</table>';
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
                    if ($scope.listDeudas.length > 0) {
                        tablapago = '<table id="tablaDe" class="table table-striped table-bordered"><tr>'+
                            '<th>Nº</th>'+
                            '<th>GESTIÓN</th>'+
                            '<th>MONTO</th>'+
                            '</tr>';
                            for (i = 0; i < $scope.listDeudas.length; i++){
                                tablapago = tablapago +'<tr>' +
                                '<td>' + $scope.listDeudas[i].numero + '</td>'+
                                '<td>' + $scope.listDeudas[i].gestion + '</td>'+
                                '<td>' + $scope.listDeudas[i].total + '</td></tr>';
                            }
                            tablapago = tablapago + '<tr>'+
                                '<td> TOTAL A PAGAR</font></td>'+
                                '<td></td>'+
                                '<td>'+ $scope.totalD +'</font></td>'+
                            '</tr></table>';
                        stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                    }
                }
                stringFormulario40 = stringFormulario40.replace("#f01_idCodigoZona#",datos.f01_idCodigoZona);
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
                var nombreUsuario = sessionService.get('US_NOMBRE')+ ' ' +sessionService.get('US_PATERNO')+ ' ' +sessionService.get('US_MATERNO');
                stringFormulario40  =   stringFormulario40.replace("#usuarioPlataforma#", nombreUsuario);
                if (datos.chkzonasegura == '' || datos.chkzonasegura == 'undefined' || datos.chkzonasegura == undefined) {
                    stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '');
                } else{
                    if (datos.chkzonasegura == 'ZONASEGURA') {
                        stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> SI');
                    } else{
                        stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> NO');
                    };
                };
                stringFormulario40  =   stringFormulario40.replace("#usuarioPlataforma#", nombreUsuario);
                ///datos anteriores
                $scope.datosAnt.segundoNombre = (($scope.datosAnt.segundoNombre == 'undefined' || $scope.datosAnt.segundoNombre == null) ? "" : $scope.datosAnt.segundoNombre);
                $scope.datosAnt.tercerNombre = (($scope.datosAnt.tercerNombre == 'undefined' || $scope.datosAnt.tercerNombre == null) ? "" : $scope.datosAnt.tercerNombre);
                $scope.datosAnt.primerApellido = (($scope.datosAnt.primerApellido == 'undefined' || $scope.datosAnt.primerApellido == null) ? "" : $scope.datosAnt.primerApellido);
                $scope.datosAnt.segundoApellido = (($scope.datosAnt.segundoApellido == 'undefined' || $scope.datosAnt.segundoApellido == null) ? "" : $scope.datosAnt.segundoApellido);
                $scope.datosAnt.tercerApellido = (($scope.datosAnt.tercerApellido == 'undefined' || $scope.datosAnt.tercerApellido == null) ? "" : $scope.datosAnt.tercerApellido);
                $scope.datosAnt.contribuyente_email = (($scope.datosAnt.contribuyente_email == 'undefined' || $scope.datosAnt.contribuyente_email == null) ? "" : $scope.datosAnt.contribuyente_email);
                $scope.datosAnt.contribuyente_edificio = (($scope.datosAnt.contribuyente_edificio == 'undefined' || $scope.datosAnt.contribuyente_edificio == null) ? "" : $scope.datosAnt.contribuyente_edificio);
                $scope.datosAnt.contribuyente_bloque = (($scope.datosAnt.contribuyente_bloque == 'undefined' || $scope.datosAnt.contribuyente_bloque == null) ? "" : $scope.datosAnt.contribuyente_bloque);
                $scope.datosAnt.contribuyente_piso = (($scope.datosAnt.contribuyente_piso == 'undefined' || $scope.datosAnt.contribuyente_piso == null || $scope.datosAnt.contribuyente_piso == 'undef') ? "" : $scope.datosAnt.contribuyente_piso);
                $scope.datosAnt.contribuyente_depto = (($scope.datosAnt.contribuyente_depto == "undefined" || $scope.datosAnt.contribuyente_depto == null) ? "" : $scope.datosAnt.contribuyente_depto);
                $scope.datosAnt.contribuyente_telefono = (($scope.datosAnt.contribuyente_telefono == "undefined" || $scope.datosAnt.contribuyente_telefono == null) ? "" : $scope.datosAnt.contribuyente_telefono);
                if($scope.datosAnt.establecimiento =='ALQUI'){
                    $scope.datosAnt.establecimiento = "ALQUILADO";
                }
                if($scope.datosAnt.establecimiento =='PROPI'){
                    $scope.datosAnt.establecimiento = "PROPIO";
                }
                if($scope.datosAnt.establecimiento =='ANTI'){
                    $scope.datosAnt.establecimiento = "ANTICRÉTICO";
                }
                if($scope.datosAnt.establecimiento =='OTRO'){
                    $scope.datosAnt.establecimiento = "OTRO";
                }
                if($scope.datosAnt.establecimiento =='NINGU'){
                    $scope.datosAnt.establecimiento = "OTRO";
                }
                if($scope.datosAnt.tipoActividad =='MA' || $scope.datosAnt.tipoActividad =='MATRI'){
                    $scope.datosAnt.tipoActividad = 'MATRIZ';
                }
                if($scope.datosAnt.tipoActividad =='SU' || $scope.datosAnt.tipoActividad =='SUCUR'){
                    $scope.datosAnt.tipoActividad = 'SUCURSAL';
                }
                stringFormulario40  =   stringFormulario40.replace("#primerNombre#", $scope.datosAnt.primerNombre);
                //stringFormulario40  =   stringFormulario40.replace("#segundoNombre#", $scope.datosAnt.segundoNombre);
                //stringFormulario40  =   stringFormulario40.replace("#tercerNombre#", $scope.datosAnt.tercerNombre);
                stringFormulario40  =   stringFormulario40.replace("#primerApellido#", $scope.datosAnt.primerApellido);
                stringFormulario40  =   stringFormulario40.replace("#segundoApellido#", $scope.datosAnt.segundoApellido);
                stringFormulario40  =   stringFormulario40.replace("#tercerApellido#", $scope.datosAnt.tercerApellido);
                stringFormulario40  =   stringFormulario40.replace("#identificacion#", $scope.datosAnt.identificacion);
                stringFormulario40  =   stringFormulario40.replace("#tipoIdentidad#", $scope.datosAnt.tipoIdentidad);
                stringFormulario40  =   stringFormulario40.replace("#expedicion#", $scope.datosAnt.expedicion);
                stringFormulario40  =   stringFormulario40.replace("#nit#", $scope.datosAnt.nit);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_email#", $scope.datosAnt.contribuyente_email);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_telefono#", $scope.datosAnt.contribuyente_telefono);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_celular#", $scope.datosAnt.contribuyente_celular);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_zona#", $scope.datosAnt.contribuyente_zona);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_tipo_via#", $scope.datosAnt.contribuyente_tipo_via);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_via#", $scope.datosAnt.contribuyente_via);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_numero#", $scope.datosAnt.contribuyente_numero);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_edificio#", $scope.datosAnt.contribuyente_edificio);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_bloque#", $scope.datosAnt.contribuyente_bloque);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_piso#", $scope.datosAnt.contribuyente_piso);
                stringFormulario40  =   stringFormulario40.replace("#contribuyente_depto#", $scope.datosAnt.contribuyente_depto);
                stringFormulario40  =   stringFormulario40.replace("#numeroActividad#", $scope.datosAnt.numeroActividad);
                stringFormulario40  =   stringFormulario40.replace("#denominacion#", $scope.datosAnt.denominacion);
                stringFormulario40  =   stringFormulario40.replace("#superficie#", $scope.datosAnt.superficie);
                stringFormulario40  =   stringFormulario40.replace("#horarioAtencion#", $scope.datosAnt.horarioAtencion);
                stringFormulario40  =   stringFormulario40.replace("#establecimiento#", $scope.datosAnt.establecimiento);
                stringFormulario40  =   stringFormulario40.replace("#tipoActividad#", $scope.datosAnt.tipoActividad);
                stringFormulario40  =   stringFormulario40.replace("#IdMacrodistrito#", $scope.datosAnt.IdMacrodistrito);
                stringFormulario40  =   stringFormulario40.replace("#Macrodistrito#", $scope.datosAnt.Macrodistrito);
                stringFormulario40  =   stringFormulario40.replace("#Distrito#", $scope.datosAnt.Distrito);
                stringFormulario40  =   stringFormulario40.replace("#zona#", $scope.datosAnt.zona);
                stringFormulario40  =   stringFormulario40.replace("#tipoVia#", $scope.datosAnt.tipoVia);
                stringFormulario40  =   stringFormulario40.replace("#via#", $scope.datosAnt.via);
                stringFormulario40  =   stringFormulario40.replace("#numero#", $scope.datosAnt.numero);
                stringFormulario40  =   stringFormulario40.replace("#idCodigoZona#", $scope.datosAnt.idCodigoZona);
                var pubAnt = '';
                if (datos.publicidadAntiguo_grilla.length > 1) {
                    pubAnt = '<tr><td>VIAE</td>'+
                    '<td>TIPO</td>' +
                    '<td>CARACTERÍSTICA</td>'+
                    //'<td>CARAS</td>'+
                    '<td>DESCRIPCIÓN</td>'+
                    '<td>ALTO</td>'+
                    '<td>ANCHO</td>'+
                    '<td>SUPERFICIE</td></tr>';
                    for (i = 1; i < datos.publicidadAntiguo_grilla.length; i++){
                        pubAnt = pubAnt +'<tr>' +
                        '<td>' + datos.publicidadAntiguo_grilla[i].nroElem + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].caracteristica + '</td>'+
                        //'<td>' + datos.publicidadAntiguo_grilla[i].cara + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].descripcion + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].ancho  + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].alto + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
                    }
                    stringFormulario40  =   stringFormulario40.replace("#publicidadAntiguo_grilla#", pubAnt);
                }
                else{
                    stringFormulario40  =   stringFormulario40.replace("#publicidadAntiguo_grilla#", 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN');
                }
                var multiAnt = '';
                if ($scope.datosAnt.idTipoLicencia == 3375 || $scope.datosAnt.idTipoLicencia == '3375') {
                    stringFormulario40  =   stringFormulario40.replace("#tipocategoria#", 'MULTISERVICIOS');
                    stringFormulario40  =   stringFormulario40.replace("#descripcion#", 'MULTISERVICIOS');
                    /*multiAnt = '<table id="tablaMulAnt" class="table table-striped table-bordered"><tr><td>NRO</td>'+
                    '<td>TIPO DE LICENCIA</td>' +
                    '<td>TIPO DE CATEGORÍA</td>'+
                    '<td>TIPO DE ACTIVIDAD</td></tr>';
                    for (i = 0; i < $scope.datosAntMulti.length; i++){
                        multiAnt = multiAnt +'<tr>' +
                        '<td>' + (i+1) + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_tipo_licmdescrip + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_cat_agrupadamdescrip + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_act_desarrolladamdescrip + '</td></tr>';
                    }
                    multiAnt = multiAnt + '</table>';*/
                    stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", 'MULTISERVICIOS');
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#descripcion#", $scope.datosAnt.descripcion.toUpperCase());
                    try{
                        stringFormulario40  =   stringFormulario40.replace("#tipocategoria#", $scope.datosAnt.ActividadDesarrollada);
                    }catch(e){console.log("Error:", e);}
                    stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", $scope.datosAnt.actividad_desarrollada343);
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);
                };
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
        $scope.datosAnt.primerApellido = (($scope.datosAnt.primerApellido == 'undefined' || $scope.datosAnt.primerApellido == null) ? "" : $scope.datosAnt.primerApellido);
        $scope.datosAnt.segundoApellido = (($scope.datosAnt.segundoApellido == 'undefined' || $scope.datosAnt.segundoApellido == null) ? "" : $scope.datosAnt.segundoApellido);
        $scope.datosAnt.tercerApellido = (($scope.datosAnt.tercerApellido == 'undefined' || $scope.datosAnt.tercerApellido == null) ? "" : $scope.datosAnt.tercerApellido);
        $scope.datosAnt.contribuyente_email = (($scope.datosAnt.contribuyente_email == 'undefined' || $scope.datosAnt.contribuyente_email == null) ? "" : $scope.datosAnt.contribuyente_email);
        $scope.datosAnt.contribuyente_edificio = (($scope.datosAnt.contribuyente_edificio == 'undefined' || $scope.datosAnt.contribuyente_edificio == null) ? "" : $scope.datosAnt.contribuyente_edificio);
        $scope.datosAnt.contribuyente_bloque = (($scope.datosAnt.contribuyente_bloque == 'undefined' || $scope.datosAnt.contribuyente_bloque == null) ? "" : $scope.datosAnt.contribuyente_bloque);
        $scope.datosAnt.contribuyente_piso = (($scope.datosAnt.contribuyente_piso == 'undefined' || $scope.datosAnt.contribuyente_piso == null || $scope.datosAnt.contribuyente_piso == 'undef') ? "" : $scope.datosAnt.contribuyente_piso);
        $scope.datosAnt.contribuyente_depto = (($scope.datosAnt.contribuyente_depto == "undefined" || $scope.datosAnt.contribuyente_depto == null) ? "" : $scope.datosAnt.contribuyente_depto);
        $scope.datosAnt.contribuyente_telefono = (($scope.datosAnt.contribuyente_telefono == "undefined" || $scope.datosAnt.contribuyente_telefono == null) ? "" : $scope.datosAnt.contribuyente_telefono);
        if($scope.datosAnt.establecimiento =='ALQUI'){
            $scope.datosAnt.establecimiento = "ALQUILADO";
        }
        if($scope.datosAnt.establecimiento =='PROPI'){
            $scope.datosAnt.establecimiento = "PROPIO";
        }
        if($scope.datosAnt.establecimiento =='ANTI'){
            $scope.datosAnt.establecimiento = "ANTICRÉTICO";
        }
        if($scope.datosAnt.establecimiento =='OTRO'){
            $scope.datosAnt.establecimiento = "OTRO";
        }
        if($scope.datosAnt.establecimiento =='NINGU'){
            $scope.datosAnt.establecimiento = "OTRO";
        }
        dataForm['primerNombre'] = $scope.datosAnt.primerNombre;
        dataForm['segundoNombre'] = $scope.datosAnt.segundoNombre;
        dataForm['tercerNombre'] = $scope.datosAnt.tercerNombre;
        dataForm['primerApellido'] = $scope.datosAnt.primerApellido;
        dataForm['segundoApellido'] = $scope.datosAnt.segundoApellido;
        dataForm['tercerApellido'] = $scope.datosAnt.tercerApellido;
        dataForm['tipoIdentidad'] = $scope.datosAnt.tipoIdentidad;
        dataForm['identificacion'] = $scope.datosAnt.identificacion;
        dataForm['expedicion'] = $scope.datosAnt.expedicion;
        dataForm['nit'] = $scope.datosAnt.nit;
        dataForm['contribuyente_zona'] = $scope.datosAnt.contribuyente_zona;
        dataForm['contribuyente_tipo_via'] = $scope.datosAnt.contribuyente_tipo_via;
        dataForm['contribuyente_via'] = $scope.datosAnt.contribuyente_via;
        dataForm['contribuyente_numero'] = $scope.datosAnt.contribuyente_numero;
        dataForm['contribuyente_edificio'] = $scope.datosAnt.contribuyente_edificio;
        dataForm['contribuyente_bloque'] = $scope.datosAnt.contribuyente_bloque;
        dataForm['contribuyente_piso'] = $scope.datosAnt.contribuyente_piso;
        dataForm['contribuyente_depto'] = $scope.datosAnt.contribuyente_depto;
        dataForm['contribuyente_telefono'] = $scope.datosAnt.contribuyente_telefono;
        dataForm['contribuyente_celular'] = $scope.datosAnt.contribuyente_celular;
        dataForm['denominacion'] = $scope.datosAnt.denominacion;
        dataForm['superficie'] = $scope.datosAnt.superficie;
        dataForm['idCodigoZona'] = $scope.datosAnt.idCodigoZona;
        dataForm['numeroActividad'] = $scope.datosAnt.numeroActividad;
        dataForm['IdMacrodistrito'] = $scope.datosAnt.IdMacrodistrito;
        dataForm['Macrodistrito'] = $scope.datosAnt.Macrodistrito;
        dataForm['Distrito'] = $scope.datosAnt.Distrito;
        dataForm['zona'] = $scope.datosAnt.zona;
        dataForm['tipoVia'] = $scope.datosAnt.tipoVia;
        dataForm['via'] = $scope.datosAnt.via;
        dataForm['numero'] = $scope.datosAnt.numero;
        dataForm['publicidadAntiguo_grilla'] = $scope.datosAnt.publicidadAntiguo_grilla;
        var multiAnt = '';
        if ($scope.datosAnt.idTipoLicencia == 3375 || $scope.datosAnt.idTipoLicencia == '3375') {
            dataForm['descripcion'] = 'MULTISERVICIOS';
            dataForm['tipocategoria'] =  'MULTISERVICIOS';
            /*multiAnt = '<table id="tablaVAnt" border="0.5" style="width:100%"><tr><td>NRO</td>'+
            '<td>TIPO DE LICENCIA</td>' +
            '<td>TIPO DE CATEGORÍA</td>'+
            '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 0; i < $scope.datosAntMulti.length; i++){
                multiAnt = multiAnt +'<tr>' +
                '<td>' + (i+1) + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_tipo_licmdescrip + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_cat_agrupadamdescrip + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multiAnt = multiAnt + '</table>';*/
            dataForm['ActividadDesarrollada'] =  'MULTISERVICIOS';
            //dataForm['Licenmul_grillaAnt'] =  multiAnt;
        } else{
            dataForm['descripcion'] = $scope.datosAnt.descripcion.toUpperCase();
            try{
                dataForm['tipocategoria'] =  $scope.datosAnt.ActividadDesarrollada;
            }catch(e){console.log("Error:", e);}
            dataForm['ActividadDesarrollada'] =  $scope.datosAnt.actividad_desarrollada343;
            //dataForm['Licenmul_grillaAnt'] =  multiAnt;
        };
        var pubAnt = '';
        if (data.publicidadAntiguo_grilla) {
            pubAnt = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>'+
            '<td>TIPO</td>' +
            '<td>CARACTERÍSTICA</td>'+
            //'<td>CARAS</td>'+
            '<td>DESCRIPCIÓN</td>'+
            '<td>ALTO</td>'+
            '<td>ANCHO</td>'+
            '<td>SUPERFICIE</td></tr>';
            for (i = 1; i < data.publicidadAntiguo_grilla.length; i++){
                pubAnt = pubAnt +'<tr>' +
                '<td>' + data.publicidadAntiguo_grilla[i].nroElem + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].caracteristica + '</td>'+
                //'<td>' + data.publicidadAntiguo_grilla[i].cara + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].descripcion + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].alto + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].ancho + '</td>'+
                '<td>' + data.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
            }
            pubAnt = pubAnt +'</table>';
            dataForm['publicidadAntiguo_grilla'] = pubAnt;
        }
        else{
            dataForm['publicidadAntiguo_grilla'] = 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN';
        }
        //CABECERA
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_tipo_form'] = '402';
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
        '<td>SUPERFICIE</td>'+
        '<td>ESTADO</td></tr>';
        if(data.publicidad == ""){
            data.publicidad = [];
        }
        if(data.publicidadAE == "" || data.publicidadAE == undefined){
            data.publicidadAE = [];
        }
        data.viaePublicidad = data.publicidadAE.concat(data.publicidad);

        for (i = 0; i < data.viaePublicidad.length; i++){
            pubMod = pubMod +'<tr>' +
                '<td>' + (i+1) + '</td>'+
                //'<td>' + data.viaePublicidad[i].idviaePublicidad + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_TIPO_LETRE + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_CARA + '</td>'+
                //'<td>' + data.viaePublicidad[i].INT_NRO_CARA + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_DESC + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_ALTO  + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_ANCHO + '</td>'+
                '<td>' + data.viaePublicidad[i].INT_SUP + '</td>'+
                '<td>' + data.viaePublicidad[i].estado + '</td></tr>';
        }
        pubMod = pubMod +'</table>';
        dataForm['publicidad_grilla'] = pubMod;
        var tablapago = '';
        if($scope.pago_adelantado == 'undefined' || $scope.pago_adelantado == undefined  || $scope.pago_adelantado == 'NO' || datos.pago_adel == 'NO' || datos.pago_adel == undefined || datos.pago_adel == 'undefined'){
            dataForm['pago_adel'] = 'SIN PAGO ADELANTADO';
            dataForm['nro_ges'] = 'NINGUNA';
            dataForm['tablaP'] = tablapago;
        }else{
            dataForm['pago_adel'] = $scope.pago_adelantado;
            dataForm['nro_ges'] = data.nro_ges;
            if (lstD.length > 0) {
                tablapago = '<table border="0.5"><tr>'+
                    '<th>Nº</th>'+
                    '<th>GESTIÓN INICIO</th>'+
                    '<th>GESTIÓN FIN</th>'+
                    '<th>MONTO PATENTE</th>'+
                    '<th>MONTO VIAE</th>'+
                    '<th>MONTO SIN DESC.</th>'+
                    '<th>DESCUENTO</th>'+
                    '<th>MONTO TOTAL</th>'+
                    '</tr>';
                    for (i = 0; i < (lstD.length)-1; i++){
                        tablapago = tablapago +'<tr>' +
                        '<td>' + lstD[i].numero + '</td>'+
                        '<td>' + lstD[i].inicio + '</td>'+
                        '<td>' + lstD[i].fin + '</td>'+
                        '<td>' + lstD[i].montoPatente + '</td>'+
                        '<td>' + lstD[i].montoVIAE + '</td>'+
                        '<td>' + lstD[i].montoTotalSinDescuento + '</td>'+
                        '<td>' + lstD[i].montoDescuento + '</td>'+
                        '<td>' + lstD[i].montoTotal + '</td></tr>';
                    }
                    tablapago = tablapago + '<tr>'+
                        '<td colspan="7"> TOTAL A PAGAR</td>'+
                        '<td>'+ $scope.totalD +'</td>'+
                    '</tr></table>';
                dataForm['tablaP'] = tablapago;
            }
        }
        var divfoodTruck = '';
        if (data.f01_categoria == 211 || data.f01_categoria == '211') {
            divfoodTruck = divfoodTruck + '<table border="0" style="width:100%">'+
                                        '<tr><td colspan="4" style="width: 100%">DATOS DEL VEHÍCULO O REMOLQUE</td></tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">TIPO DE VEHÍCULO:</td>'+
                                        '<td style="width: 25%">'+ data.f01_vehiculo_ft + '</td>';
                                    if (data.f01_vehiculo_ft == "REMOLQUE") {
                                        divfoodTruck = divfoodTruck +
                                        '<td style="width: 25%">OTORGADO: </td>'+
                                        '<td style="width: 25%">'+ data.f01_otorgado_ft + '</td>'+
                                    '</tr>';
                                    }
                                    else{
                                        divfoodTruck = divfoodTruck +
                                        '<td style="width: 25%"></td>'+
                                        '<td style="width: 25%"></td>'+
                                    '</tr>';
                                    }
                                    divfoodTruck = divfoodTruck + '<tr>'+
                                        '<td style="width: 25%">CLASE: </td>'+
                                        '<td style="width: 25%">'+ data.f01_clase_ft + '</td>'+
                                        '<td style="width: 25%">MARCA: </td>'+
                                        '<td style="width: 250%">'+ data.f01_marca_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">TIPO: </td>'+
                                        '<td style="width: 25%">'+ data.f01_tipo_ft + '</td>'+
                                        '<td style="width: 25%">SUBTIPO: </td>'+
                                        '<td style="width: 25%">'+ data.f01_subtipo_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">MODELO: </td>'+
                                        '<td style="width: 25%">'+ data.f01_modelo_ft + '</td>'+
                                        '<td style="width: 25%">MOTOR: </td>'+
                                        '<td style="width: 25%">'+ data.f01_motor_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">Nº CHASIS: </td>'+
                                        '<td style="width: 25%">'+ data.f01_chasis_ft + '</td>'+
                                        '<td style="width: 25%">SERVICIO: </td>'+
                                        '<td style="width: 25%">'+ data.f01_servicio_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">COLOR: </td>'+
                                        '<td style="width: 25%">'+ data.f01_color_ft + '</td>'+
                                        '<td style="width: 25%">RADICATORIA: </td>'+
                                        '<td style="width: 25%">'+ data.f01_radicatoria_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 25%">DOCUMENTO LEGAL: </td>'+
                                        '<td style="width: 25%">'+ data.f01_doclegal_ft + '</td>'+
                                        '<td style="width: 25%">Nº DOCUMENTO LEGAL: </td>'+
                                        '<td style="width: 25%">'+ data.f01_numdoclegal_ft + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td style="width: 50%" colspan="2">UBICACIÓN DEL LUGAR DONDE SE EFECTUARÁ LA INSPECCIÓN DEL VEHÍCULO O REMOLQUE: </td>'+
                                        '<td style="width: 50%" colspan="2">'+ data.f01_lugar_ft + '</td>'+
                                    '</tr></table>';
            dataForm['divft'] = divfoodTruck;
        } else{
            dataForm['divft'] = divfoodTruck;
        };
        dataForm['f01_idCodigoZona'] = data.f01_idCodigoZona;
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
        var nombreUsuario = sessionService.get('US_NOMBRE')+ ' ' +sessionService.get('US_PATERNO')+ ' ' +sessionService.get('US_MATERNO');
        if (data.chkzonasegura == '' || data.chkzonasegura == 'undefined' || data.chkzonasegura == undefined) {
            dataForm['zonaSegura'] = '';
        } else{
            if( data.f01_categoria_agrupada == 3419 ||  data.f01_categoria_agrupada == 3420 ||  data.f01_categoria_agrupada == 3421 ||  data.f01_categoria_agrupada == 3422 ||  data.f01_categoria_agrupada == 3423 ||  data.f01_categoria_agrupada == 3424){
                if (data.chkzonasegura == 'ZONASEGURA') {
                    dataForm['zonaSegura'] = '<label>Zona Segura:</label> SI';
                } else{
                    dataForm['zonaSegura'] = '<label>Zona Segura:</label> NO';
                };
            }else{
                dataForm['zonaSegura'] = '';
            }
        };
        dataForm['usuarioPlataforma'] = nombreUsuario;
        dataForm['idActividadEconomica'] = data.f01_categoria_agrupada;
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }


    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioN').html($scope.msgformularioN);
    }


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
                $scope.formDatosAE = '';
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
        },function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    $scope.adjpublicidad = function (paramf){
        $scope.pubrd ="";
        var longpub = paramf.publicidadAE;
        if(paramf.publicidadAE){
            if(paramf.publicidad.length > 0 ){
                 $scope.pubrd = paramf.publicidadAE.concat(paramf.publicidad);
              }else{
                  $scope.pubrd = paramf.publicidadAE;
              }
            $scope.publigri = [];
            var datpub = $scope.pubrd;
            var j = 0;
            var c = 1;
            for(j = 0; j < datpub.length; j++) {
                $scope.publigri.push({
                    id: j+1,
                    idPublicidad:datpub[j].idPublicidad,
                    INT_CARA: datpub[j].INT_CARA,
                    INT_CATE: datpub[j].INT_CATE,
                    INT_TIPO_LETRE: datpub[j].INT_TIPO_LETRE,
                    INT_DESC: datpub[j].INT_DESC,
                    INT_ALTO: datpub[j].INT_ALTO,
                    INT_ANCHO: datpub[j].INT_ANCHO,
                    id_cara: datpub[j].id_cara,
                    idcarac: datpub[j].idcarac,
                    idcate: datpub[j].idcate,
                    INT_SUP:datpub[j].INT_SUP,
                    estado:datpub[j].estado
                });
            }
            $scope.datos.pubenvio = $scope.publigri;
        }else{
            $scope.datos.pubenvio = paramf.publicidad;
        }
        $scope.datos.publicidad = $scope.datos.pubenvio;
    }


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
                    $scope.adjpublicidad(paramForm);
                    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
                    $scope.btnEnviarForm    =   true;
                    var idProcodigo         =   'RE-LF';
                    var datosNeXO = {};
                    $scope.divVIAE="mostrar";
                    datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias;
                    /*RENOVACION DE LICENCIAS*/
                    if(paramForm.rdTipoTramite == "RENOVACION" || paramForm.rdTipoTramite == 'RENOVACION'){
                        datosNeXO['f01_id_actividad_economica']   =   paramForm.f01_id_actividad_economica;
                        datosNeXO['f01_nro_orden']   =   paramForm.f01_nro_orden;
                        datosNeXO['f01_id_contribuyente']   =   paramForm.f01_id_contribuyente;
                        datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
                    }
                    datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
                    if ($scope.tipoPersona == 'NATURAL'){
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
                        datosNeXO['f01_cod_luz']                =   '0';
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
                        datosNeXO['f01_nit'] = paramForm.f01_nit+"";
                        datosNeXO['f01_nit_prop'] = paramForm.f01_nit+"";
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
                        datosNeXO['f01_raz_soc']=paramForm.f01_raz_soc;
                        datosNeXO['f01_sup']=paramForm.f01_sup;
                        datosNeXO['f01_cap_aprox']=paramForm.f01_cap_aprox;
                        datosNeXO['f01_de_hor']=paramForm.f01_de_hor;
                        datosNeXO['f01_a_hor']=paramForm.f01_a_hor;
                        datosNeXO['f01_estab_es']=paramForm.f01_estab_es;
                        datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
                        datosNeXO['f01_fecha_ini_act']="";
                        datosNeXO['f01_fecha_imp']="";
                        datosNeXO['f01_fecha_fin_act']="";
                        //UBICACION DE LA ACTIVIDAD ECONOMICA
                        datosNeXO['f01_macro_act_descrip']=paramForm.f01_macro_act_descrip;
                        datosNeXO['f01_macro_act'] = parseInt(paramForm.f01_macro_act);
                        datosNeXO['f01_dist_act']=paramForm.f01_dist_act;//"";
                        datosNeXO['f01_dist_act_descrip'] = paramForm.f01_dist_act_descrip;
                        datosNeXO['f01_zona_act']=paramForm.f01_zona_act;//paramForm.f01_zona_act_descrip;
                        datosNeXO['f01_tip_via_act']=paramForm.f01_tip_via_act;
                        datosNeXO['f01_num_act']=paramForm.f01_num_act;//paramForm.f01_tip_via_act;
                        datosNeXO['f01_num_act_n']=paramForm.f01_num_act_n;//paramForm.f01_num_act;
                        datosNeXO['f01_factor']="";
                        datosNeXO['f01_num_act1']=paramForm.f01_num_act1;
                        datosNeXO['f01_edificio_act']=paramForm.f01_edificio_act;
                        datosNeXO['f01_bloque_act']=paramForm.f01_bloque_act;
                        datosNeXO['f01_piso_act']=paramForm.f01_piso_act;
                        datosNeXO['f01_dpto_of_loc']=paramForm.f01_dpto_of_loc;
                        datosNeXO['f01_tel_act1']=paramForm.f01_tel_act1;
                        datosNeXO['f01_casilla']=paramForm.f01_casilla;
                        datosNeXO['f01_idCodigoZona']="";
                        datosNeXO['f04_res_solicitud_upaee']="";
                        datosNeXO['f08_hojas_recibidas']="0";
                        datosNeXO['f08_observaciones_i']="0";
                        datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
                        datosNeXO['f01_nro_actividad']  =   paramForm.f01_nro_actividad;
                        //PAGO ADELANTADO
                        datosNeXO['pago_adel'] =  $scope.pago_adelantado;
                        datosNeXO['nro_ges'] =  paramForm.nro_ges;
                        datosNeXO['f01_gestiones_deudas'] = $scope.listDeudas;
                        datosNeXO['f01_total_deudas'] = $scope.totalD;
                        /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
                        datosNeXO['f01_tip_act']=paramForm.f01_tip_act;
                        datosNeXO['f01_tipo_lic']=paramForm.f01_tipo_lic;
                        datosNeXO['f01_categoria_agrupada']= parseInt(paramForm.f01_categoria_agrupada);
                        datosNeXO['f01_actividad_desarrollada']= paramForm.f01_categoria_descrip2;
                        datosNeXO['declaracion_jurada']               =   $rootScope.decJuradaNatural;

                        var datoObjectdj = [];
                        var decjuradaN = new Object();
                        if ($rootScope.decJuradaNatural) {
                            decjuradaN.url = $rootScope.decJuradaNatural;
                        } else{
                            decjuradaN.url = $scope.datos.declaracion_jurada;
                        };
                        decjuradaN.campo = 'Declaración Jurada Natural';
                        decjuradaN.nombre = 'DECLARACIÓN JURADA';
                        datoObjectdj[0] = decjuradaN;
                        if($scope.datos.File_Adjunto){
                            var i = 0;
                            angular.forEach($scope.datos.fileArRequisitosViae, function(archivo, key) {
                                $scope.datos.File_Adjunto.push(archivo);
                                i = i +1;
                            });
                            datosNeXO['File_Adjunto'] =  $scope.datos.File_Adjunto.concat(decjuradaN);
                        }
                        else{
                            var i = 0;
                            angular.forEach($scope.datos.fileArRequisitosViae, function(archivo, key) {
                                $rootScope.FileAdjuntos.push(archivo);
                                i = i +1;
                            });
                            datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos.concat(decjuradaN);;
                        }
                        console.log(" datosNeXO['File_Adjunto']", datosNeXO['File_Adjunto']);
                        var adjuntos = [];
                        for(var i=0;i<datosNeXO.File_Adjunto.length;i++){
                            if(datosNeXO.File_Adjunto[i] != undefined && datosNeXO.File_Adjunto[i] != null && datosNeXO.File_Adjunto[i] != ''){
                                adjuntos.push(datosNeXO.File_Adjunto[i]);
                            }
                        }
                        datosNeXO.File_Adjunto = adjuntos;
                        if(paramForm.g_origen_p){
                        datosNeXO['g_origen_p'] = paramForm.g_origen_p;
                        }
                        else{
                            datosNeXO['g_origen_p']="";
                        }
                        datosNeXO['f01_tip_act']                    =   paramForm.f01_tip_act;
                        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
                        /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
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
                            datosNeXO['idcat'] = paramForm.idcat;
                            datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
                            datosNeXO['f01_categorias_multi'] = paramForm.f01_categorias_multi;
                            for(var i=0;i<paramForm.licenciam.length;i++){
                                if(paramForm.licenciam[i].f01_tipo_licmid == 18){
                                    paramForm.mostrarMultiservicioBebidas = true;
                                }
                            }
                        }else{
                            datosNeXO['f01_idcat_multi_principal'] = '';
                            datosNeXO['f01_descat_multi_principal'] = '';
                            datosNeXO['f01_act_principal'] = '';
                            datosNeXO['f01_actividad_principal_array'] = '';
                            datosNeXO['f01_categorias_multi'] = '';
                        }
                        //datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
                    }
                        datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
                        datosNeXO['f01_categoria_descrip2']      =  paramForm.f01_categoria_descripcion;
                        datosNeXO['f01_categoria']      =  parseInt(paramForm.f01_categoria_descrip);
                        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
                        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
                        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
                        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
                    if(paramForm.rdTipoTramite1 == "CON_VIAE"){
                        datosNeXO['sw_publicidad']      =  "CP" ;
                        datosNeXO['swpublicidad']      =  "CP" ;
                    }if(paramForm.rdTipoTramite1 == "SIN_VIAE"){
                        datosNeXO['sw_publicidad']      =  "SP" ;
                        datosNeXO['swpublicidad']      =  "SP" ;
                    }
                    datosNeXO['publicidadcop']=paramForm.publicidad;
                    datosNeXO['publicidad']=paramForm.publicidad;
                    datosNeXO['publicidad_grilla']=paramForm.publicidad_grilla;

                    datosNeXO['licencia_multiple']=paramForm.licenciam;
                    datosNeXO['g_tipo'] = "AE-LINEA";
                    datosNeXO['g_fecha'] = fechactual;
                    datosNeXO['g_origen'] = "IGOB247";
                    datosNeXO['acepta_declaracion'] =  $scope.acepta;
                    if(datosNeXO.f01_tipo_lic == 18 || paramForm.mostrarMultiservicioBebidas == true){
                        datosNeXO['f01_upload_declaracion_jurada'] = paramForm.f01_upload_declaracion_jurada;
                        if( paramForm.validaBebidas != '' && paramForm.validaBebidas != undefined ){
                            datosNeXO['validaBebidas'] =  paramForm.validaBebidas;
                        }else{
                            datosNeXO['validaBebidas'] =  "MULTA";
                        }
                        datosNeXO['multiservicioBebidas'] = paramForm.mostrarMultiservicioBebidas;
                        /*if(paramForm.validaBebidas == 'SIMPLIFICADO' || paramForm.validaBebidas == 'SIMPLIFICADO-MULTA'){
                            if(paramForm.f01_nombre_frontis_ae != undefined){
                                var carnets = datosNeXO.File_Adjunto.find(x => x.nombre == 'Fotografía del frontis de la actividad económica que evidencie los elementos publicitarios con las que cuente.');
                                if(carnets == undefined){
                                    datosNeXO.File_Adjunto.push({"url":paramForm.f01_upload_frontis_ae,"campo": paramForm.f01_nombre_frontis_ae ,"nombre":'Fotografía del frontis de la actividad económica que evidencie los elementos publicitarios con las que cuente.'});
                                }
                            }
                        }*/
                        if(paramForm.f01_upload_carnet_manipulacion != undefined){
                            var carnets = datosNeXO.File_Adjunto.find(x => x.nombre == 'Carnets de manipulación vigente');
                            if(carnets == undefined){
                                datosNeXO.File_Adjunto.push({"url":paramForm.f01_upload_carnet_manipulacion,"campo": paramForm.f01_nombre_carnet_manipulacion ,"nombre":'Carnets de manipulación vigente'});
                            }
                        }
                    }
                    if($scope.dataGenesisCidadano && $scope.formDatosAE){
                        if($scope.dataGenesisCidadano.length > 0){
                            datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                            datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                            datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
                        }
                    }
                    datosNeXO['datosAnt'] = JSON.parse("["+((JSON.stringify($scope.datosAnt)).replace("'","")).replace("'","")+"]");
                    datosNeXO['publicidadAntiguo'] = $scope.datos.publicidadAntiguo;
                    var sMacroR         =   datosNeXO['f01_macro_des'];
                    var sZonaR          =   datosNeXO['INT_AC_ID_ZONA'];
                    var sMacroRDesc     =   datosNeXO['f01_macro_des'];
                    var sZonaRDesc      =   datosNeXO['INT_AC_ID_ZONA'];
                    var iCategoriaAgrupada      =   datosNeXO['INT_ID_CAT_AGRUPADA'];
                    var iMacrodistrito          =   datosNeXO['INT_AC_MACRO_ID'];
                    if(iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != ""){
                        //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
                            var sIdTramite = $rootScope.tramiteId;
                            var datosSerializados = JSON.stringify(datosNeXO);
                            console.log("datosSerializados",datosSerializados);
                            archivo1 = "";
                            ////console.log("datosSerializados",datosSerializados);
                            if(datosNeXO.f01_tipo_lic != 18 &&  datosNeXO.multiservicioBebidas != true){
                                var crearCaso   =   new gCrearCaso();
                                crearCaso.usr_id    = 0,
                                crearCaso.datos     = datosSerializados,
                                crearCaso.procodigo = idProcodigo,
                                crearCaso.crearCasoAeLinea(function(response){
                                    try{
                                        $scope.botones = null;
                                        $scope.desabilitado = true;
                                        $scope.desabilitaBebidas = true;
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
                                var crearCaso   =   new gCrearCaso();
                                crearCaso.usr_id    = 0,
                                crearCaso.datos     = datosSerializados,
                                crearCaso.procodigo = "RE-LFB",
                                crearCaso.crearCasoAeLineaBebidas(function(response){
                                    try{
                                        $scope.botones = null;
                                        $scope.desabilitado = true;
                                        $scope.desabilitaBebidas = true;
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
                    /* }else{
                            swal('', "Complete sus Datos de Direccion", 'warning');
                        }  */
                    }else{
                        swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
                    }
                }else{
                    swal('', "Esta solicitud ya fue enviada, el número de su tramite es "+resp.success[0].codigo_tramite, 'warning');
                }
            })
            $.unblockUI();
        },4000)
    };

    $scope.IsVisible = false;
    $scope.ShowPa = function(valor) {
        $scope.pago_adelantado = valor;
        if (valor == 'SI') {
            $scope.IsVisible = true;
        } else{
            $scope.IsVisible = false;
        };
    }

    $scope.tblDeudas        =   {};
    $scope.listDeudas      =   [];

    $scope.calcularDeudas = function(idActEco, nroges){
        if (nroges == '' || nroges == undefined || nroges == 'undefined') {
        } else{
            $.blockUI();
            $scope[name] = 'Running';
            var deferred = $q.defer();
            var infoges = '{"idActividadEconomica": '+ idActEco +',"fechaCorte":"'+'\'' + $scope.fechafinalserver + '\''+'","gestionesPrevias": ' + nroges + '}';
            infoges = JSON.parse(infoges);
            $.ajax({
                type        : 'POST',
                url         : 'http://192.168.5.119:80/Empadronamiento/servicios/deudasPagoPrevio.php',
                data        : infoges,
                //dataType    : 'json',
                crossDomain : true,
                success: function (deudas){
                    $scope.listDeudas = deudas;
                    //$scope.datos.listDeudas = $scope.listDeudas;
                    var data = deudas;
                    deferred.resolve($scope.listDeudas);
                    $scope.tblDeudas.reload();
                    $.unblockUI();
                },
                error: function (data){ console.log(data);$.unblockUI();}
            });
            return deferred.promise;
        }
    }

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.listDeudas.length; i++){
            total = total + parseInt($scope.listDeudas[i].total);
        }
        $scope.totalD = total;
        return total;
    }

    $scope.tblDeudas = new ngTableParams({
        page: 1,
        count: 10,
        filter: {},
        sorting: {
            vtra_id: 'desc'
        }
    }, {
        total: $scope.listDeudas.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.listDeudas, params.filter()) :
            $scope.listDeudas;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.listDeudas;
            params.total($scope.listDeudas.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    $scope.subirViae = function(obj, valor){
        if($scope.tipoAdjunto == 'VIAE'){
            if($scope.datos.fileArRequisitosViae == undefined){
                $scope.datos.fileArRequisitosViae = {};
            }
            $scope.adjuntarRequisitos(obj, valor);
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
        $scope.direccionvirtual = "RC_CLI/" +  $scope.oidCiudadano;
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
    }

    $scope.generaDeclaracionJuarda = function() {
        var contenidoPublicidad = [];
        var encabezado = [
            {text: 'TIPO',alignment: 'center', fontSize: 12, bold: true},
            {text: 'CARACTERÍSTICA',alignment: 'center', fontSize: 12, bold: true},
            {text: 'DESCRIPCIÓN',alignment: 'center', fontSize: 12, bold: true},
            {text: 'ALTO',alignment: 'center', fontSize: 12, bold: true},
            {text: 'ANCHO',alignment: 'center', fontSize: 12, bold: true},
            {text: 'SUPERFICIE',alignment: 'center', fontSize: 12, bold: true},
            {text: 'ESTADO',alignment: 'center', fontSize: 12, bold: true}
        ];
        var nombre_via = $scope.datos.f01_num_act;
        if(nombre_via == 'NINGUNO'){
            nombre_via =  $scope.datos.f01_num_act_n;
        }
        var viae = '';
        contenidoPublicidad.push(encabezado);
        if($scope.datos.rdTipoTramite1 == 'CON_VIAE'){
            console.log("$scope.datos.publicidadAE",$scope.datos.publicidadAE,"$scope.datos.publicidad",$scope.datos.publicidad);
            for(var i=0;i<$scope.datos.publicidadAE.length;i++){
                var estado = '';
                if($scope.datos.publicidadAE[i].estado == 'V'){
                    estado = 'VIGENTE';
                }else if($scope.datos.publicidadAE[i].estado == 'B'){
                    estado = 'BAJA';
                }else if($scope.datos.publicidadAE[i].estado == 'M'){
                    estado = 'MODIFICADO';
                }
                var dato = [
                    {text: $scope.datos.publicidadAE[i].INT_TIPO_LETRE,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidadAE[i].INT_CARA,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidadAE[i].INT_DESC,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidadAE[i].INT_ALTO,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidadAE[i].INT_ANCHO,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidadAE[i].INT_SUP,alignment: 'center', fontSize: 10},
                    {text: estado,alignment: 'center', fontSize: 12}
                ];
                contenidoPublicidad.push(dato);
            }
            for(var i=0;i<$scope.datos.publicidad.length;i++){
                var dato = [
                    {text: $scope.datos.publicidad[i].INT_TIPO_LETRE,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidad[i].INT_CARA,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidad[i].INT_DESC,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidad[i].INT_ALTO,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidad[i].INT_ANCHO,alignment: 'center', fontSize: 10},
                    {text: $scope.datos.publicidad[i].INT_SUP,alignment: 'center', fontSize: 10},
                    {text: 'NUEVO',alignment: 'center', fontSize: 10}
                ];
                contenidoPublicidad.push(dato);
            }
            viae = 'SI';
        }else{
            viae = 'NO';
        }
        var contenidoRequisitos = [];
        encabezado = [
            '',
            {text: 'REQUISITOS',alignment: 'center', fontSize: 10, bold: true}
        ];
        contenidoRequisitos.push(encabezado);
        contenidoRequisitos.push([ {text: 'A',alignment: 'center', fontSize: 10}, {text: 'Cédula de identidad o Cédula de identidad de extranjero (Registro iGob).',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'B',alignment: 'center', fontSize: 10}, {text: 'Número de Identificación Tributaria - NIT para personas jurídicas, opcional para personas naturales.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'C',alignment: 'center', fontSize: 10}, {text: 'Registro de comercio actualizado emitido por el Servicio Plurinacional de Registro de Comercio - SEPREC (categorías A, B y D).',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'D',alignment: 'center', fontSize: 10}, {text: 'Escritura Pública de constitución de la sociedad, para personas jurídicas.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'E',alignment: 'center', fontSize: 10}, {text: 'Poder del representante legal para personas jurídicas.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'F',alignment: 'center', fontSize: 10}, {text: 'Inexistencia de deuda tributaria por patente de funcionamiento y no contar con sanciones administrativas emanadas por el GAMLP.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'G',alignment: 'center', fontSize: 10}, {text: 'En caso de que el inmueble sea propio, el Testimonio de compra venta, Folio Real, Tarjeta de Propiedad, Información Rápida emitida por Derechos Reales que refiera a él o los propietarios del inmueble u otro documento que acredite su derecho propietario.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'H',alignment: 'center', fontSize: 10}, {text: 'En caso de inmuebles obtenidos en arrendamiento, anticresis u otra modalidad de disposición de bienes inmuebles previstas en el Código Civil, se deberá presentar el contrato o minuta respectiva en el que se especifique su uso y destino, o la aceptación del propietario del inmueble para el funcionamiento del establecimiento, adjuntando Información Rápida emitida por Derechos Reales que refiera a él o los propietarios del inmueble o cualquier documentación que acredite el derecho propietario.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'I',alignment: 'center', fontSize: 10}, {text: 'En caso de que el inmueble pertenezca a más de un propietario, el solicitante deberá adjuntar a la solicitud una nota en la que todos los copropietarios acepten el funcionamiento de la actividad de expendio y/o consumo de bebidas alcohólicas.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'J',alignment: 'center', fontSize: 10}, {text: 'Dos fotografías del o los elemento(s) publicitario(s) que identifiquen a la actividad económica, que coincida con la denominación declarada y/o actividad desarrollada.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'K',alignment: 'center', fontSize: 10}, {text: 'Una fotografía de la fachada del bien inmueble donde funcionará la actividad económica, donde se visualice el acceso principal y el número del bien inmueble.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitos.push([ {text: 'L',alignment: 'center', fontSize: 10}, {text: 'La georeferenciación exacta del establecimiento de la actividad económica.',alignment: 'left', fontSize: 10}]);
        var contenidoRequisitosCat = [];
        encabezado = [
            '',
            {text: 'REQUISITOS',alignment: 'center', fontSize: 10, bold: true}
        ];
        contenidoRequisitosCat.push(encabezado);
        contenidoRequisitosCat.push([ {text: 'A.1',alignment: 'center', fontSize: 10}, {text: 'Para actividades económicas que funcionen con gas domiciliario deberán presentar la factura correspondiente, que coincida con la dirección declarada.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitosCat.push([ {text: 'A.2',alignment: 'center', fontSize: 10}, {text: 'Lista del personal que cuenta con carnet de manipulación vigente, la cual debe ser actualizada por el titular, cuando se incorpore un nuevo personal, a través del sistema habilitado.',alignment: 'left', fontSize: 10}]);
        contenidoRequisitosCat.push([ {text: 'A.3',alignment: 'center', fontSize: 10}, {text: 'Certificación de Espacio Cultural Privado emitida por la Secretaría Municipal de Culturas del GAMLP. (Categoría C)',alignment: 'left', fontSize: 10}]);
        var nombre = '';
        if($scope.datos.f01_pri_nom_prop != undefined){
            nombre =  $scope.datos.f01_pri_nom_prop.trim();
        }
        var paterno = '';
        if($scope.datos.f01_ape_pat_prop != undefined){
            paterno =  $scope.datos.f01_ape_pat_prop.trim();
        }
        var materno = '';
        if($scope.datos.f01_ape_mat_prop != undefined){
            materno = $scope.datos.f01_ape_mat_prop.trim();
        }
        var casado = '';
        if($scope.datos.f01_ape_cas_prop != undefined){
            casado =  $scope.datos.f01_ape_cas_prop.trim();
        }
        var docDefinition = {
            pageSize: 'letter',
            pageMargins: [ 50, 50, 50, 50 ],
            header: {
                columns: [
                    {
                        image: headerImage,
                        width: 150
                    },
                    {
                        margin: [100, 0, 0, 20],
                        color:'gray',
                        text: 'SECRETARÍA MUNICIPAL DE DESARROLLO ECONÓMICO'
                    }
                ]
            },
            
            content: [
                { text: '\n\n', fontSize: 10, bold: true },
                {
                    columns: [
                        { width: '*', text: 'FORMULARIO RENOVACIÓN',alignment: 'center', fontSize: 14, bold: true }
                    ]
                },  
                {
                    columns: [
                        { width: '*', text: 'LICENCIA DE FUNCIONAMIENTO ',alignment: 'center', fontSize: 14, bold: true }
                    ]
                },    
                {
                    columns: [
                        { width: '*', text: '(DECLARACIÓN JURADA) ',alignment: 'center', fontSize: 12, bold: true }/*,
                        { 
                            table: {
                                headerRows: 1,
                                widths: [ '*' ],
                                body: [
                                    [ '' ]
                                ]
                            } 
                        }*/
                    ]
                }, 
                { canvas: [{ type: 'line', lineColor: '#00ADB5', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 2 }] },
                { text: '\n', fontSize: 10, bold: true },
                {
                    columns: [
                    { width: 180, text: 'TIPO DE CONTRIBUYENTE:', fontSize: 10, bold: true },
                    { width: '*', text: 'NATURAL', fontSize: 10 }
                    ]
                },   
                { text: '\n', fontSize: 10, bold: true }, 
                {
                    table: {
                        headerRows: 1,
                        color: '#00ADB5',
                        widths: [ '*' ],
                        body: [
                            [ {text:'1. DATOS GENERALES DEL CONTRIBUYENTE', fontSize: 10, bold: true,fillColor: '#00ADB5', } ]
                        ]
                    } 
                },
                { text: '\n', fontSize: 10, bold: true },
                {
                    columns: [
                    { width: 120, text: 'Nombre Completo:', fontSize: 10, bold: true },
                    { width: '*', text: nombre +' '+paterno+' '+materno+' '+casado, fontSize: 10 }
                    ]
                }, 
                {
                    columns: [
                    { width: 120, text: 'Número de identidad:', fontSize: 10, bold: true },
                    { width: '*', text: $scope.datos.f01_num_dos_prop+' ' +$scope.datos.f01_expedido_prop, fontSize: 10 }
                    ]
                }, 
                {
                    columns: [
                    { width: 120, text: 'Dirección:', fontSize: 10, bold: true },
                    { width: '*', text: 'ZONA ' + $scope.datos.f01_zon_prop_valor +' '+$scope.datos.f01_tip_via_prop+' '+$scope.datos.f01_nom_via_prop+' NRO. '+$scope.datos.f01_num_prop, fontSize: 10 }
                    ]
                },   
                {
                    columns: [
                        { width: 120, text: 'Celular:', fontSize: 10, bold: true },
                        { width: 60, text: $scope.datos.f01_cel_prop, fontSize: 10 },
                        { width: 60, text: 'Teléfono Fijo', fontSize: 10, bold: true },
                        { width: 60, text: $scope.datos.f01_telef_prop, fontSize: 10 },
                        { width: 60, text: 'Correo Electrónico', fontSize: 10, bold: true },
                        { width: '*', text: $scope.datos.f01_email_prop, fontSize: 10 }

                    ]
                },   
                { text: '\n', fontSize: 10, bold: true },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'2. DATOS DE LA ACTIVIDAD ECONÓMICA', fontSize: 10, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n', fontSize: 10, bold: true },
                $scope.datos.f01_tipo_lic != 32 ? [
                    {
                        columns: [
                            { width: 120, text: 'Denomicación:', fontSize: 10, bold: true },
                            { width: 149, text: $scope.datos.f01_raz_soc.trim(), fontSize: 10 },
                            { width: 1, text: '', fontSize: 10 },
                            { width: 100, text: 'Actividad Desarrollada:', fontSize: 10, bold: true },
                            { width: '*', text: $scope.datos.f01_categoria_descripcion.trim(), fontSize: 10 }   
                        ]
                    },
                    {
                        columns: [
                            { width: 120, text: 'Tipo de Categoría:', fontSize: 10, bold: true },
                            { width: '*', text: $scope.datos.f01_categoria_agrupada_descrip.trim(), fontSize: 10 }
                        ]
                    },   
                ] : "",
                $scope.datos.f01_tipo_lic === 32 ? [
                    {
                        columns: [
                            { width: 120, text: 'Denomicación:', fontSize: 10, bold: true },
                            { width: 149, text: $scope.datos.f01_raz_soc.trim(), fontSize: 10 },
                            { width: 1, text: '', fontSize: 10 },
                            { width: 100, text: 'Actividad Desarrollada:', fontSize: 10, bold: true },
                            { width: '*', text: $scope.datos.f01_actividadesSecundarias.trim(), fontSize: 10 }   
                        ]
                    },
                    { text: '\n', fontSize: 10, bold: true },
                    {
                        columns: [
                            { width: 120, text: 'Tipo de Categoría:', fontSize: 10, bold: true },
                            { width: '*', text: 'MULTISERVICIO', fontSize: 10 }
                        ]
                    },   
                ] : "",
                { text: '\n', fontSize: 10, bold: true },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'3. UBICACIÓN DE LA ACTIVIDAD ECÓNOMICA', fontSize: 10, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n', fontSize: 10, bold: true },
                {
                    columns: [
                        { width: 120, text: 'Código de Zona:', fontSize: 10, bold: true },
                        { width: 150, text: $scope.datos.f01_idCodigoZona, fontSize: 10 },
                        { width: 100, text: 'Macrodistrito:', fontSize: 10, bold: true },
                        { width: '*', text: $scope.datos.f01_macro_act_descrip.trim(), fontSize: 10 }
                    ]
                },   
                {
                    columns: [
                        { width: 120, text: 'Distrito:', fontSize: 10, bold: true },
                        { width: 150, text:  'DISTRITO ' + $scope.datos.f01_dist_act, fontSize: 10 },
                        { width: 100, text: 'Zona:', fontSize: 10, bold: true },
                        { width: '*', text: $scope.datos.f01_zona_act_descrip.trim(), fontSize: 10 }

                    ]
                },   
                {
                    columns: [
                        { width: 120, text: 'Tipo de Vía:', fontSize: 10, bold: true },
                        { width: 150, text: $scope.datos.f01_tip_via_act.trim(), fontSize: 10 },
                        { width: 100, text: 'Vía:', fontSize: 10, bold: true },
                        { width: '*', text: nombre_via.trim(), fontSize: 10 }
                    ]
                },   
                {
                    columns: [
                        { width: 120, text: 'Número:', fontSize: 10, bold: true },
                        { width: '*', text: $scope.datos.f01_num_act1.trim(), fontSize: 10 }

                    ]
                },   
                { text: '\n', fontSize: 10, bold: true },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'4. VARIABLE DE IDENTIFICACIÓN DE LA ACTIVIDAD ECONÓMICA', fontSize: 10, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n', fontSize: 10, bold: true },
                {
                    columns: [
                        { width: 400, text: 'Cuenta con publicidad emplazada en su actividad económica:', fontSize: 10, bold: true },
                        { width: '*', text: viae, fontSize: 10 }

                    ]
                },   
                { text: '\n', fontSize: 10, bold: true },
                {
                    style: 'tabla',
                    table: {
                        headerRows: 1,
                        widths: [110,55,100,45,45,45,'auto'],
                        body: contenidoPublicidad
                    },fontSize: 1
                },
                { text: '\n', fontSize: 10, bold: true },
                /*{
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'5. REQUISITOS DOCUMENTALES', fontSize: 12, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n Tomo conocimiento que los requisitos comunes para las Categorías A, B, C, D, E Y F son:', fontSize: 11},
                {
                    style: 'tabla',
                    table: {
                        headerRows: 1,
                        widths: [30,'auto'],
                        body: contenidoRequisitos
                    },fontSize: 1
                },
                { text: '\n De contar con una actividad  económica Categoria A, B, C y D también tomo conocimiento que los requisitos son:\n\n', fontSize: 11 },
                {
                    style: 'tabla',
                    table: {
                        headerRows: 1,
                        widths: [30,'auto'],
                        body: contenidoRequisitosCat
                    },fontSize: 1
                },
                { text: '\n', fontSize: 11, bold: true },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'6. CONDICIONES TÉCNICAS Y DE INFRAESTRUCTURA', fontSize: 12, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n Tomo conocimiento que las condiciones técnicas y de infraestructura son las siguientes conforme la categoría de actividad económica desarrollada:\n', fontSize: 11 },
                { text: '\nI. Condiciones generales para las categorías A, B, C, D, E y F. \n\n', fontSize: 11, bold: true },
                { text: '\t\ta) Espacio adecuado e independiente para el depósito de bebidas alcohólicas. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\tb) Señalética en un lugar visible con la leyenda: “TODAS LAS PERSONAS SON IGUALES ANTE LA LEY”.  \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\tc) Señalética con la advertencia: “EL CONSUMO EXCESIVO DE ALCOHOL, ES DAÑINO PARA LA SALUD” y “VENTA PROHIBIDA A MENORES DE 18 AÑOS DE EDAD”. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\td) Instalación de cámaras de seguridad, la cantidad y ubicación de las cámaras que conforman el sistema de cámaras de seguridad y monitoreo interno y externo en el establecimiento de expendio y/o consumo de bebidas alcohólicas deberá ser implementado conforme a parámetros de instalación de cámaras referidas en reglamentación específica.  \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\te) El acceso principal del establecimiento deberá estar ubicado a una distancia mínima de cien (100) metros respecto a la puerta principal de unidades educativas públicas, universidades públicas y actividades económicas legales como ser: unidades educativas privadas de primaria y secundaria, parvularios, hogares de niños, centros de salud con internación, asilos de ancianos, universidades privadas, institutos de educación superior, centros educativos y campos deportivos exceptuando los campos deportivos categoría A previstos en el Reglamento de Administración de Campos Deportivos, actividades económicas originariamente construidas y destinadas a este fin. Dicha distancia deberá ser medida de acuerdo a lo establecido en el Artículo 11 del presente Reglamento. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\tf) La actividad económica deberá funcionar en un inmueble con infraestructura cerrada. \n \n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\tg) Extintor tipo químico ABC de capacidad de 5 Kg. a razón de uno por cada 50m2 de superficie u otro sistema tecnológico de prevención de incendio. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: 'II. Condiciones específicas: a) Establecimientos categorías A, B, C y D \n\n', fontSize: 11, bold: true,alignment: 'justify' },
                { text: '\t\t1. Área destinada para el lavado y secado de los utensilios, debiendo garantizar la higiene. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\t2. Sistemas de ventilación natural y/o mecánica que garanticen la renovación permanente del aire, tanto en el establecimiento como en los servicios sanitarios.  \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\t3. Servicios Sanitarios debidamente señalizados, acordes a la superficie del establecimiento, debiendo contar con grifos ahorradores de agua, secador de manos automático o toallas desechables y jabón líquido, siendo obligatorio brindar el mismo servicio durante todo el funcionamiento de la actividad económica. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\t4. Contenedores diferenciados para el reciclaje según el tipo de residuos mínimamente orgánicos e inorgánicos.  \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\t5. Para establecimientos con superficie mayor a ciento ochenta metros cuadrados (180 m2), la salida de emergencia deberá estar expedita y debidamente señalizada, con apertura obligatoria hacia el exterior o alternativamente presentar, como requisito, un plan de sistema de evacuación.\n \n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\t\t6. Sistema de alarma por emergencias que permita el encendido de luces en toda la actividad económica y coadyuve a la evacuación. \n\n', preserveLeadingSpaces: true, fontSize: 11,alignment: 'justify'},
                { text: '\n', fontSize: 11, bold: true },*/
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'5. REQUERIMIENTOS MEDIOAMBIENTALES Y DE SEGURIDAD', fontSize: 10, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\nLos establecimientos de las categorías A, B, C y D para poder desarrollar su actividad económica de expendio y/o consumo de bebidas alcohólicas, deberán cumplir con todos los requisitos medioambientales y de seguridad, pudiendo las instancias competentes aplicar las medidas legalmente establecidas en reglamentación específica de identificar su incumplimiento. \n', fontSize: 10,alignment: 'justify'},
                { text: 'Debiendo cumplir con los siguientes requisitos:  \n', fontSize: 10,alignment: 'justify'},
                { text: 'a) MEDIOAMBIENTALES.   \n', fontSize: 10,alignment: 'justify'},
                { text: '\t\t1. Certificación Acústica, emitida por el GAMLP.  \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\t2. Estudio de Evaluación de Impacto Sonoro (EEIS), realizado por profesionales certificados en materia ambiental. \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\t3. Letreros que establezcan los decibeles máximos autorizados para la emisión de sonido.  \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: 'b) SEGURIDAD.   \n', fontSize: 10,alignment: 'justify'},
                { text: '\t\t1. Primeros Auxilios.- Contar con un equipo de primeros auxilios.  \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\t2. Seguridad física.- Deberán contar con servicio externo de seguridad física. \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*' ],
                        body: [
                            [ {text:'6. DECLARACIÓN JURADA', fontSize: 10, bold: true,fillColor: '#00ADB5',borderColor: ['#00ADB5', '#00ADB5', '#00ADB5', '#00ADB5'], } ]
                        ]
                    } 
                },
                { text: '\n', fontSize: 10, bold: true },
                { text: 'Declaro bajo juramento no haber modificado la infraestructura y las condiciones técnicas del inmueble sobre las cuales se otorgará la Licencia de Funcionamiento; además declaro que la actividad económica de expendio y/o consumo de bebidas alcohólicas se desarrolla en propiedad privada sin hacer uso de espacio público municipal, así como declaro contar con todas las respectivas autorizaciones específicas, emitidas por instancias municipales, departamentales o nacionales para el desarrollo de mi actividad económica. \n', fontSize: 10,alignment: 'justify'},
                { text: 'También declaro haber tomado conocimiento de todos los requisitos documentales, condiciones técnicas, de infraestructura y de seguridad. Por otra parte, en cumplimiento al Decreto Municipal Nº11/2024 de 24 de abril 2024 que aprobó el reglamento de control al expendio y consumo de bebidas alcohólicas, tomo conocimiento que debo adecuar las condiciones técnicas, de infraestructura y de seguridad de mi establecimiento de expendio y/o consumo de bebidas alcohólicas conforme señala el reglamento. \n', fontSize: 10,alignment: 'justify'},
                { text: 'Asimismo, declaro que el (los) elemento(s) de identificación de mi actividad económica cumple(n) con las condiciones técnicas de resguardo, seguridad, estética visual, sujeción, condición patrimonial (cuando corresponda) respecto a su emplazamiento y no incurre(n) en las restricciones técnicas establecidas en disposiciones legales vigentes, COMPROMETIÉNDOME:   \n', fontSize: 10,alignment: 'justify'},
                { text: '\t\ta)	A informar el retiro y/o modificación del (de los) elemento (s) de identificación según procedimiento establecido para el efecto por el GAMLP.  \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\tb)	A mantener en buen estado de conservación, seguridad y funcionamiento el (los) elemento (s) de identificación, así como el entorno en el que éste se encuentre (n).  \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\tc)	A asumir las medidas de seguridad necesarias, siendo que en caso de que dicho (s) elemento (s) o sus accesorios generen daño físico o material me comprometo a cumplir con el 100% de los costos de reposición y reparación que corresponda.    \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: '\t\td)	No emplazar elemento (s) de identificación de la actividad económica en aceras, espacios públicos o postes de luz.    \n', preserveLeadingSpaces: true, fontSize: 10,alignment: 'justify'},
                { text: 'En tal sentido, de manera expresa otorgo las garantías y máximas seguridades de ingreso, tránsito y permanencia de los servidores públicos municipales acreditados del GAMLP, dentro mi actividad económica y en caso de infringir el ordenamiento normativo aplicable, me someteré fielmente a las sanciones establecidas.  \n', fontSize: 10,alignment: 'justify'},
                { text: 'Autorizo que se proceda con cualquier notificación a través de: Plataforma habilitada (iGob 24/7)   \n', fontSize: 10,alignment: 'justify'},
                { text: '\n\n\n\n\n\n\n_______________________________________________\nFIRMA TITULAR/REPRESENTANTE LEGAL',fontSize: 10,alignment: 'center', bold: true},
                { text: 'DE LA ACTIVIDAD ECONÓMICA',fontSize: 10,alignment: 'center', bold: true},
                { text: 'Nombre y apellido: '+nombre+' '+paterno+' '+materno+' '+casado,fontSize: 10,alignment: 'center'},
                { text: 'C.I.: '+$scope.datos.f01_num_dos_prop+' ' +$scope.datos.f01_expedido_prop,fontSize: 10,alignment: 'center'},
            ],
        };
        var pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download("declaracionJurada");
        $.unblockUI(); 
    };
    /*************************************************************************/
    /*******************************AJUNTO VIAE*******************************/
    /*************************************************************************/
    $scope.tipoAdjunto = '';
    $scope.ejecutarFileDeclaracion = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
            $scope.declaracionJurada = 'declacion_jurada';
        }else{
            alert("Error ");
        }
    };

    $scope.almacenarDeclaracion = function(aArchivos,idFiles,nombre_doc,url_doc,descripcion_doc){
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
        $scope.direccionvirtual = "RC_CLI/" +  $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        var imagenNueva = aArchivos[0].name.split('.');
        var nombreFileN = descripcion_doc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
        if (aArchivos[0].size <= 15000000) {
            if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
                var urlDeclaracion = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl, nombreFileN);
                $scope.datos[nombre_doc] = nombreFileN;
                $scope.datos[url_doc]= urlDeclaracion;
            } else{
                swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
            };
        };
        if (aArchivos[0].size > 15000000) {
            swal('Advertencia', 'Tamaño de Archivo no soportado', 'error');
        };
        $scope.declaracionJurada = '';
    };

    var requisitosZonaSegura = $rootScope.$on('reqZonaSegura', function(){
        $scope.validarRequisitosForm();
    })

    $scope.almacenarCarnetsManipulacion = function(aArchivos,idFiles){
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
        $scope.direccionvirtual = "RC_CLI/" +  $scope.oidCiudadano;
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

    //****************************************LISTADO EMPLEADOS*****************************************************//
    $scope.guardarListaEmpleados = function(){
      
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
            $scope.empleados = {};  
            $scope.ci_empleado = '';
        }

    }

    $scope.eliminarEmpleado = function(dato){
        $scope.datos.listadoEmpleados.splice($scope.datos.listadoEmpleados.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
    }

    $scope.buscarCiudadano = function(ci_empleado){
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
    }
};
