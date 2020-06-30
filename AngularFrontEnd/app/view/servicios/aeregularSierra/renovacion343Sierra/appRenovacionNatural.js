function regularRenovacionSierraController($scope,$timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window) {
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
    $scope.multiple = {};
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

    /*$scope.getRequisitosCategoriaTecnicos = function(idTipoLicencia, idCategoria, persona){
        if(idTipoLicencia == 17 || idTipoLicencia == '17' || idTipoLicencia == 18 || idTipoLicencia == '18'){
            $scope.getRequisitosTecnicosActividad(idCategoria, persona);
        }else{
            $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
        }
    }*/

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

    /*$scope.catactividadDesarrollada = function(){
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
    }*/

    $scope.catactividadDesarrollada = function(){
        $.blockUI();
        $scope.datos.rdTipoTramite = 'RENOVACION';
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        try{
            var dataActDes = '{}';
            var resLstActDes = new reglasnegocioSierra();
            resLstActDes.identificador = 'VALLE_PRUEBA-SGEN-3149';
            resLstActDes.parametros = dataActDes;
            resLstActDes.llamarregla_sierra(function(responseActDes){
                var lstActDes =  JSON.parse(responseActDes);
                if(lstActDes.length > 0){
                    for (var i = lstActDes.length - 1; i >= 0; i--) {
                        if (lstActDes[i].idactividaddesarrollada343 == 907 || lstActDes[i].idactividaddesarrollada343 == '907') {
                            lstActDes[i].descripcion343 = 'MULTISERVICIOS';
                        }
                    };
                    $scope.datosActividad = lstActDes;
                }else{
                    $scope.msg = "Error !!";
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        }catch(e){
            alert("Error en la actividad desarrollada");
        }
    }

    /*$scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        $.blockUI();
        //$scope.datos.rdTipoTramite = 'NUEVO';
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
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
    }*/

    $scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        $.blockUI();
        if(superficie){
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFiles_ci = [];
            try{
                var dataDesLic = '{"id_actividad_desarrollada":"'+idDesarrollada+'", "superficie":"'+superficie+'"}';
                var resDatosLic = new reglasnegocioSierra();
                resDatosLic.identificador = 'VALLE_PRUEBA-SGEN-3151';
                resDatosLic.parametros = dataDesLic;
                resDatosLic.llamarregla_sierra(function(responseDatosLic){
                    var datosLic = JSON.parse(responseDatosLic);
                    if(datosLic.length > 0){
                        $scope.sCategoria = true;
                        $scope.smultiservicios = false;
                        $scope.datosActividadLicencia = datosLic;
                        $scope.datos.f01_tipo_lic = datosLic[0].lic_ant_id;
                        $scope.datos.f01_tipo_lic_sierra = datosLic[0].idtipolicencia;
                        $scope.datos.f01_tipo_lic_descrip = datosLic[0].tipolicenciadescripcion;
                        $scope.datos.f01_categoria_agrupada_sierra = datosLic[0].categoria_id;
                        $scope.datos.f01_categoria_agrupada = datosLic[0].categoria_id_anterior;
                        $scope.datos.f01_categoria_agrupada_dem = datosLic[0].addescripcion;
                        $scope.datos.f01_categoria_agrupada_descrip = datosLic[0].ad3436descripcion;
                        $scope.GetValueZonaSegura(datosLic[0].categoria_id_anterior);
                        var comboz = document.getElementById('f01_categoria_descrip');
                        selected2 = comboz.options[comboz.selectedIndex].text;
                        $scope.datos.f01_categoria_descripcion = selected2;
                        $scope.datos.f01_categoria_descrip2 = selected2;
                        $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                        $scope.datos.f01_actividadesSecundarias = datosLic[0].ad3436descripcion;
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
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $.unblockUI();
                });
            }catch(e){
                console.log("Error en la actividad desarrollada");
            }
        }else{
            swal('', "Llene el campo de la superficie!!!", 'warning');
            $.unblockUI();
        }
    };

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

    /*$scope.actividadDesarrolladaM = function(){
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
    }*/

    $scope.actividadDesarrolladaM = function(){
        $.blockUI();
        var datosMulti = [];
        try{
            var dataActDesM = '{}';
            var resLstActDesM = new reglasnegocioSierra();
            resLstActDesM.identificador = 'VALLE_PRUEBA-SGEN-3149';
            resLstActDesM.parametros = dataActDesM;
            resLstActDesM.llamarregla_sierra(function(responseActDesM){
                var lstActividadDesM = JSON.parse(responseActDesM);
                var dataResp = lstActividadDesM;
                for (var i = 0; i < dataResp.length; i++) {
                    if (dataResp[i].idactividaddesarrollada343 == '907' || dataResp[i].idactividaddesarrollada343 == 907) {
                    } else{
                        objMulti = new Object();
                        objMulti.idactividaddesarrollada343 = dataResp[i].idactividaddesarrollada343;
                        objMulti.codigo343 = dataResp[i].codigo343;
                        objMulti.descripcion343 = dataResp[i].descripcion343;
                        objMulti.estado343 = dataResp[i].estado343;
                        objMulti.fecha343 = dataResp[i].fecha343;
                        objMulti.proceso = dataResp[i].proceso;
                        objMulti.idactividaddesarrollada = dataResp[i].idactividaddesarrollada;
                        objMulti.descripcionad = dataResp[i].descripcionad;
                        objMulti.idtipolicencia = dataResp[i].idtipolicencia;
                        objMulti.descripciontipolicencia = dataResp[i].descripciontipolicencia;
                        datosMulti[i] = objMulti;
                    };
                };
                $scope.datosActividadMul = datosMulti;
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }
    };

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

    $scope.multiple.f01_cat_agrupadamdescripcion = 'PRUEBA VALOR DE INCIIO';

    /*$scope.LicenciaXCategoriaMultiservicioRen = function(idDesarrolladaM,superficie){
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
                console.log($scope.multipleNatural);
                $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada,$scope.datos.f01_tipo_per);
                $.unblockUI();
                //$('#f01_cat_agrupadamdescrip').val(datosLicM[0].ADDescripcion);
                //$('#f01_tipo_licmdescrip').val(datosLicM[0].TipoLicenciaDescripcion);
                $rooSscope.$apply();
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }

    }*/

    $scope.LicenciaXCategoriaM = function(idDesarrollada, superficie){
        if(superficie){
           $.blockUI();
            $scope[name] = 'Running';
            var deferred = $q.defer();
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFiles_ci = [];
            try{
                var dataDesLicM = '{"id_actividad_desarrollada":"'+idDesarrollada+'", "superficie":"'+superficie+'"}';
                var resDatosLicM = new reglasnegocioSierra();
                resDatosLicM.identificador = 'VALLE_PRUEBA-SGEN-3151';
                resDatosLicM.parametros = dataDesLicM;
                resDatosLicM.llamarregla_sierra(function(responseDatosLicM){
                    var obtLicM = JSON.parse(responseDatosLicM);
                    var datosLicM = obtLicM;
                    if(datosLicM.length > 0){
                        $scope.multiple = datosLicM;
                        $scope.multiple.f01_tipo_licmid = datosLicM[0].idtipolicencia;
                        $scope.multiple.f01_tipo_licmdescrip = datosLicM[0].tipolicenciadescripcion;
                        $scope.multiple.f01_cat_agrupadamid_sierra = datosLicM[0].categoria_id;
                        $scope.multiple.f01_categoria_agrupada = datosLicM[0].categoria_id_anterior;
                        $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].addescripcion;
                        $scope.multiple.f01_act_desarrolladamid = datosLicM[0].idactividaddesarrollada343;
                        var combox = document.getElementById('f01_act_desarrolladamid');
                        selected2 = combox.options[combox.selectedIndex].text;
                        $scope.multiple.f01_act_desarrolladamdescrip = selected2;
                        //$scope.multiple.f01_tae = datosLicM[0].tae;
                        $scope.getRequisitosFormulario(datosLicM[0].categoria_id_anterior,$scope.datos.f01_tipo_per);
                        deferred.resolve($scope.multiple);
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                        $.unblockUI();
                    }else{
                        $scope.msg = "Error !!";
                        $.unblockUI();
                    }
                });
            }catch(e){
                console.log("Error en la actividad desarrollada");
            } 
        }else{
            swal('', "Llene el campo de la superficie!!!", 'warning');
            $.unblockUI();
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
                    f01_catagrp_principal: $scope.f01_catagrp_principal
                });
                $scope.licdes=[];
                $scope.multiple=[];
                $scope.dscripcionlic = {};
                $scope.multiple.f01_act_desarrolladamid = "";
                document.getElementById("f01_act_desarrolladamid").value='';
                $scope.multiple.f01_tipo_licmid = "";
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.Licencia_Multiple($scope.licenciamul);
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
        $scope.licenciamul.splice( $scope.licenciamul.indexOf(dato), 1 );
        $scope.idm = $scope.idm - 1;
    }

    $scope.modificarLicencia = function(dato){
        $scope.onlym=true;
        $scope.botonm="new";
        delete $scope.editm[dato.idm];
        $scope.multiple=[];
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
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
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

    $scope.GetValueZonaContribuyenteJuridico = function () {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaSegura = function (idCategoria){
        if(idCategoria == 3419 || idCategoria == 3420 || idCategoria == 3421 || idCategoria == 3422 || idCategoria == 3423 || idCategoria == 3424){
            $scope.mostrarzonasegura = true;
        }else{
            $scope.mostrarzonasegura = false;
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
                $scope.mostrarzonasegura = true;
            }else{
                $scope.mostrarzonasegura = false;
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

   /*$scope.distritoZonas = function(idMacroJ){
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });
        }
        $scope.idMacro = idMacro;
        $scope.datos.f01_macro_act    =   idMacro;
        if($scope.datos.g_origen != 'POS/EMPR2017'){
            $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        }
        $scope.datos.INT_AC_MACRO_ID = idMacro;
        $scope.aDistritoZona = {};
        try{
            var parametros = new distritoZona();
            parametros.idMacro = idMacro;
            parametros.obtdist(function(resultado){
                data = JSON.parse(resultado);
                if(data.success.length > 0){
                    $scope.desabilitadoZ=false;
                    $scope.aDistritoZona = data.success;
                    $scope.desabilitadoV=true;
                    $scope.desabilitadoNo=true;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch(error){
            $scope.desabilitadoZ=true;
            $scope.desabilitadoV=true;
            $scope.desabilitadoNo=true;
        }
    };*/

    /*$scope.macrodistritosid = function(idzona){
        $scope.datos.f01_tip_via_act = '';
        var distNombre  = idzona;
        if($scope.aMacroZona){
            angular.forEach($scope.aMacroZona, function(value, key) {
                if(value.dist_id== distNombre){
                    idMacro  =   value.dist_macro_id;
                }
            });
        }
        $scope.idMacro = idMacro;
        $scope.datos.f01_macro_act    =   idMacro;
        $scope.datos.INT_AC_MACRO = idMacro;
        if($scope.datos.g_origen != 'POS/EMPR2017'){
            $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        }
        $scope.datos.INT_AC_MACRO_ID = idMacro;
        $scope.aMacrodistritos = {};
        var datosP = new macrodistritoLstid();
        datosP.idMacro =  idMacro;
        datosP.obtmacrodistrito(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
                $scope.datos.f01_macro_act_descrip = data.success[0].mcdstt_macrodistrito;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };

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

    $scope.vias= function(zona,tipo){
        $scope.z =zona;
        $scope.t =tipo;
        try{
            var datos = new tipoVia();
            datos.idz = zona;
            datos.tipo = tipo;
            datos.obt_tipoVia(function(results){
                $scope.tip_vias =   [];
                var aTipoVia    =   {};
                aTipoVia["idv"] = "OTROS";
                aTipoVia["nombrev"] = "OTRO";
                data = JSON.parse(resultado);
                if(data.success.length > 0 ){
                    $scope.tip_vias =   data.success;
                }
                $scope.tip_vias.push(aTipoVia);
                $scope.desabilitadoNo=false;
            })
        }catch(error){
            console.log("error en via");
        }
    };*/

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

    $scope.cargarDatosSierra = function(){
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
        if (JSON.stringify($scope.dataGenesisCidadano) == '{}') {
            console.log('esta vacio');
        } else{
            console.log('esta lleno');
            $scope.datos.f01_id_contribuyente = datosgen.contribuyente_id;
        };
        console.log('$scope.datos.f01_id_contribuyente     ',$scope.datos.f01_id_contribuyente);
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
        } else{
            $scope.open_map_ae2(data.INT_AC_latitud, data.INT_AC_longitud);
        };
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada);
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


        switch (data.chkzonasegura) {
            case 'ZONASEGURA':
                $scope.mostrarzonasegura = true;
            break;
            case 'NOZONASEGURA':
                $scope.mostrarzonasegura = true;
            break;
            case '':
                $scope.mostrarzonasegura = false;
            break;
            case 'undefined':
                $scope.mostrarzonasegura = false;
            break;
            case undefined:
                $scope.mostrarzonasegura = false;
            break;
            case null:
                $scope.mostrarzonasegura = false;
            break;
        };
        //MOSTRAR VIAE
        if(data.rdTipoTramite1 == 'NUEVO'){
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
        //$scope.abrirMapa();
        $scope.open_mapa_ae();
        console.log("$s.botones1: ", $scope.botones);
        console.log("publicidad: ", $scope.datos.publicidad);
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
        if ( dato == "NUEVO") {
            $scope.licenciaToogle4 = true;
        } else {
            $scope.licenciaToogle4 = false;
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
        $scope.datosMod = datos;
        var paramidAE = '{"id_actividad_economica":'+datos+'}';
        var envioIdAe = new reglasnegocioSierra();
        envioIdAe.identificador = 'VALLE_PRUEBA-SGEN-3145';
        envioIdAe.parametros = paramidAE;
        envioIdAe.llamarregla_sierra(function(responsedatosAE){
            var respuestaDatos = JSON.parse(responsedatosAE);
            var respuestaDatosPrimerNivel = respuestaDatos[0].sp_obtener_actividad_economica;
            var datosActividadEconomica = JSON.parse(respuestaDatosPrimerNivel);
            var datosAESdoNivel = datosActividadEconomica.datosAE;
            $scope.datosAnt = datosAESdoNivel;
            console.log('$scope.datosAnt    ',$scope.datosAnt);
            $scope.datosAntPub = datosActividadEconomica.datosVIAE;  
            var respuestaVIAE =  datosActividadEconomica.datosVIAE;
            console.log('respuestaVIAE    ',respuestaVIAE.length);
            if (respuestaVIAE.length > 0) {
                $scope.datos.publicidadAntiguo = respuestaVIAE;
                $scope.PlubliAntiguo_Grilla(respuestaVIAE);
            } else{
                $scope.datos.publicidadAntiguo_grilla = [];
            };
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
        var fechatram = "";
        var aniotram = "";
        var dato = tramite.fechainicio.split('/');
        aniotram = dato[2];
        $scope.datos.publicidad = '';
        $scope.publicid = '';
        $scope.totalD = 0;
        $scope.datos.nro_ges = '';
        $scope.listDeudas      =   [];
         var codhojaruta = "";
        var datosLotus = "";
        $scope.datosAnterioresNatural(tramite.idactividad);
        if(aniotram){

            //if(tramite.idactividad){
                $scope.idActividiadEconomicaActual  =   tramite.idactividad;
                $scope.datos.f01_id_actividad_economica = tramite.idactividad;
            //}
            $scope.sIdAeGrilla  =   tramite.idactividad;
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            if(tipoPersona == "NATURAL"){
                tipoPersona = "N";
            }
            var paramidAE = '{"id_actividad_economica":'+tramite.idactividad+'}';
            var envioIdAe = new reglasnegocioSierra();
            envioIdAe.identificador = 'VALLE_PRUEBA-SGEN-3145';
            envioIdAe.parametros = paramidAE;
            envioIdAe.llamarregla_sierra(function(responsedatosAE){
                var respuestaDatos = JSON.parse(responsedatosAE);
                var respuestaDatosPrimerNivel = respuestaDatos[0].sp_obtener_actividad_economica;
                var datosActividadEconomica = JSON.parse(respuestaDatosPrimerNivel);
                console.log('reccccccc     ',datosActividadEconomica);
                if (JSON.stringify(datosActividadEconomica.datosAE[0]) == '{}' || JSON.stringify(datosActividadEconomica.datosAE[0]) == '[{}]') {
                    swal('', "Datos no Encontrados !!!", 'warning');
                } else{
                    codhojaruta = datosActividadEconomica.datosAE.hojaruta;
                    var datosPublicidad = datosActividadEconomica.datosVIAE;
                    console.log("datosPublicidad:: ", datosPublicidad);
                    var datosAESdoNivel = datosActividadEconomica.datosAE;
                    console.log('datosAESdoNivel    ',datosAESdoNivel);
                    $scope.datos.f01_nro_orden = datosAESdoNivel.numeroorden;
                    $scope.idContribuyenteAEActual = datosAESdoNivel.idactividadeconomica;
                    $scope.datos.f01_id_contribuyente = datosAESdoNivel.idContribuyente;
                    console.log('datosAESdoNivel.horarioatencion    ',datosAESdoNivel.horarioatencion);
                    var hinicio     =   ((typeof(datosAESdoNivel.horarioatencion) == 'undefined' || datosAESdoNivel.horarioatencion == null) ? ""   : datosAESdoNivel.horarioatencion.toUpperCase());
                    var hfinal      =   ((typeof(datosAESdoNivel.horarioatencion) == 'undefined' || datosAESdoNivel.horarioatencion == null) ? ""   : datosAESdoNivel.horarioatencion.toUpperCase());
                    hinicio     =   hinicio.split('-')[0].trim();
                    console.log('hinicio    ',hinicio);
                    hfinal      =   hfinal.split('-')[1].trim();
                    $scope.datos.f01_de_hor = hinicio;
                    $scope.datos.f01_a_hor = hfinal;
                    var smacrodes = "";
                    var smacro = "MACRODISTRITO";
                    var szona = "DISTRITO";
                    $scope.datos.f01_raz_soc = datosAESdoNivel.denominacion;
                    $scope.datos.f01_sup = datosAESdoNivel.superficie;
                    $scope.datos.f01_cap_aprox = datosAESdoNivel.capacidad;
                    $scope.calcularCapacidadauto($scope.datos.f01_sup);
                    if(datosAESdoNivel.idmacrodistrito == 2 || datosAESdoNivel.idmacrodistrito == '2')
                        smacrodes = smacro + " " + datosAESdoNivel.idmacrodistrito + " MAXIMILIANO PAREDES";
                    else
                        smacrodes = datosAESdoNivel.macrodistrito;
                    $scope.getEstablecimiento(datosAESdoNivel.establecimiento);
                    $scope.datos.f01_tip_act = datosAESdoNivel.tipoactividad;
                    if(datosAESdoNivel.tipoactividad =='MA' || datosAESdoNivel.tipoactividad =='MATRI'){
                        $scope.datos.f01_tip_act_dec = 'MATRIZ';
                        $scope.datos.f01_tip_act = 'MA';
                    }
                    if(datosAESdoNivel.tipoactividad =='SU' || datosAESdoNivel.tipoactividad =='SUCUR'){
                        $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                        $scope.datos.f01_tip_act = 'SU';
                    }
                    $scope.datos.f01_num_pmc = datosAESdoNivel.padron;
                    $scope.datos.f01_raz_soc = datosAESdoNivel.denominacion;
                    $scope.datos.f01_sup = datosAESdoNivel.superficie;
                    $scope.datos.f01_de_hor = hinicio;
                    $scope.datos.f01_a_hor = hfinal;
                    $scope.datos.f01_nro_actividad = datosAESdoNivel.numeroactividad;
                    $scope.datos.f01_productosElaborados = datosAESdoNivel.productoselaborados;
                    $scope.datos.f01_actividadesSecundarias = datosAESdoNivel.actividadessecundarias;
                    $scope.datos.f01_categoria_agrupada = datosAESdoNivel.idactividaddesarrollada;
                    $scope.datos.f01_categoria_descrip = datosAESdoNivel.actividad_desarrollada343;
                    //$scope.obtenerActDes(datosAESdoNivel.idactividaddesarrollada);
                    $scope.actulizarIdDistrito();
                    $scope.distritoZonas(datosAESdoNivel.idmacrodistrito);
                    $scope.datos.INT_AC_MACRO_ID = datosAESdoNivel.idmacrodistrito;
                    $scope.datos.f01_macro_act = datosAESdoNivel.idmacrodistrito;
                    $scope.datos.f01_macro_act_descrip = smacrodes;
                    console.log('MACROOOOOOO     ',$scope.datos.f01_macro_act_descrip);
                    $scope.datos.INT_AC_DISTRITO = datosAESdoNivel.iddistrito_actividadeconomica;
                    $scope.datos.f01_dist_act          = datosAESdoNivel.iddistrito_actividadeconomica;
                    $scope.datos.INT_AC_ID_ZONA = datosAESdoNivel.id_zona_actividadeconomica;
                    $scope.datos.INT_ID_ZONA = datosAESdoNivel.id_zona_actividadeconomica;
                    $scope.datos.f01_zona_act = datosAESdoNivel.id_zona_actividadeconomica;
                    $scope.datos.f01_zona_act_descrip = datosAESdoNivel.zona;
                    $scope.datos.f01_tip_via_act = datosAESdoNivel.tipovia;
                    $scope.datos.f01_num_act = datosAESdoNivel.via;
                    var listarVias = [$scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act)];
                        $q.all(listarVias).then(function (resp) {
                        $scope.datos.f01_num_act_id = parseInt(datosAESdoNivel.idviaae);
                        $scope.cargarNombViaTxt($scope.datos.f01_num_act);
                        if (datosAESdoNivel.idviaae == 0 || datosAESdoNivel.idviaae == '0')
                            $scope.datos.f01_num_act_n = datosAESdoNivel.nueva_via;
                    });
                    if(datosAESdoNivel.edificio == 'undefined' || datosAESdoNivel.bloque == 'undefined' || datosAESdoNivel.piso == 'undefined' || datosAESdoNivel.departamento == 'undefined' || datosAESdoNivel.telefono == 'undefined'){
                        datosAESdoNivel.edificio = '';
                        datosAESdoNivel.bloque = '';
                        datosAESdoNivel.piso = '';
                        datosAESdoNivel.departamento = '';
                        datosAESdoNivel.telefono = '';
                    }
                    $scope.datos.f01_num_act1 = datosAESdoNivel.numero;
                    $scope.datos.f01_edificio_act = datosAESdoNivel.edificio;
                    $scope.datos.f01_bloque_act = datosAESdoNivel.bloque;
                    $scope.datos.f01_piso_act = datosAESdoNivel.piso;
                    $scope.datos.f01_dpto_of_loc = datosAESdoNivel.departamento;
                    $scope.datos.f01_tel_act1 = datosAESdoNivel.telefono;
                    $scope.datos.f01_casilla = datosAESdoNivel.direcciondetalladaae;
                    $scope.datos.f01_factor = datosAESdoNivel.tipotrayecto;
                    console.log("$scope.datos recuperados::: ", $scope.datos);
                    $scope.datos.f01_tipo_lic_ant = datosAESdoNivel.licencia_descripcion;
                    $scope.datos.f01_categoria_agrupada_ant = datosAESdoNivel.categoria_descripcion;
                    $scope.datos.f01_categoria_descrip_ant = datosAESdoNivel.actividad_desarrollada343;
                    //$scope.datos.INT_TRAMITE_RENOVA = tramite.IdActividad;
                    $scope.botoneslic = true;
                    $scope.desabilitado = false;
                    console.log('codhojaruta    ',codhojaruta);
                    if (codhojaruta.substring(0,6) == 'EMI-AE' || codhojaruta.substring(0,6) == 'REN-LF' || codhojaruta.substring(0,6) == 'AER-EL' || codhojaruta.substring(0,7) == 'MOD_MOD' || codhojaruta.substring(0,8) == 'LICEN-AE' || codhojaruta.substring(0,5) == 'EM-LF' || codhojaruta.substring(0,5) == 'RE-LF') {
                        console.log('hojaaaa   ',codhojaruta);
                        var dataLotus = $scope.getDatosLotus(datosAESdoNivel.idactividadeconomica,codhojaruta);
                        dataLotus.then(function(respuesta){
                            console.log('respuesta    ',respuesta);
                            datosLotus = respuesta.success.data[0].datos;
                            if ((datosLotus.INT_AC_latitud == 'undefined' && datosLotus.INT_AC_longitud == 'undefined') || (datosLotus.INT_AC_latitud == null && datosLotus.INT_AC_longitud == null)) {
                                $scope.croquis = true;
                                $scope.datos.INT_AC_latitud = '';
                                $scope.datos.INT_AC_longitud = '';
                                //$scope.open_map_ae();
                            } else{
                                $scope.croquis = null;
                                $scope.datos.INT_AC_latitud = datosLotus.INT_AC_latitud;
                                $scope.datos.INT_AC_longitud = datosLotus.INT_AC_longitud;
                            };
                            $scope.open_map_ae($scope.datos.INT_AC_latitud, $scope.datos.INT_AC_longitud);
                            console.log('datosLotus.f01_tipo_lic     ',datosLotus.f01_tipo_lic);
                            if (datosLotus.f01_tipo_lic == '18' || datosLotus.f01_tipo_lic == 18) {
                                $scope.mostrarzonasegura = true;
                                if (datosLotus.f01_zona_segura == 'SI')
                                    $scope.datos.chkzonasegura = 'ZONASEGURA';
                                else
                                    $scope.datos.chkzonasegura = 'NOZONASEGURA';
                            } else{
                                $scope.datos.chkzonasegura = null;
                                $scope.mostrarzonasegura = false;
                            };
                            if (datosLotus.f01_tipo_lic == '32' || datosLotus.f01_tipo_lic == 32) {
                                $scope.sinmultiservicios = false;
                                $scope.conmultiservicios = true;
                                for (var i = 0; i < datosAESdoNivel.id_licencia.length; i++) {
                                    $scope.datos.licenciamulAnterior.push({
                                        f01_tipo_licmid: datosAESdoNivel.id_licencia[i].id,
                                        f01_tipo_licmdescrip: datosAESdoNivel.licencias_descripcion[i].descripcion,
                                        f01_act_desarrolladamid: datosAESdoNivel.idcategoria[i].id,
                                        f01_categoria_agrupada: datosAESdoNivel.idactividad_desarrollada343[i].id,
                                        f01_cat_agrupadamdescrip: datosAESdoNivel.categoria_descripcion[i].descripcion,
                                        f01_act_desarrolladamdescrip: datosAESdoNivel.actividad_desarrollada343[i].descripcion,
                                    });
                                };
                                var swma = 0;
                                for (var k = 0; k < $scope.datos.licenciamulAnterior.length && swma == 0; k++) {
                                    if($scope.datos.licenciamulAnterior[k].f01_tipo_licmid == '12' || $scope.datos.licenciamulAnterior[k].f01_tipo_licmid == 12)
                                        swma = 1;
                                    else
                                        swma = 0;
                                };
                                console.log('swma   ',swma);
                                if(swma == 1){
                                    $scope.mostrarzonasegura = true;
                                    if (datosLotus.f01_zona_segura == 'SI')
                                        $scope.datos.chkzonasegura = 'ZONASEGURA';
                                    else
                                        $scope.datos.chkzonasegura = 'NOZONASEGURA';
                                }else{
                                    $scope.mostrarzonasegura = false;
                                }
                            } else{
                                $scope.sinmultiservicios = true;
                                $scope.conmultiservicios = false;
                            };
                            if (datosLotus.File_Adjunto == 'undefined' || datosLotus.File_Adjunto == null) {
                                $scope.reqdoc = true;
                                $scope.docsAdjuntoAntiguo = [];
                                $scope.datos.datosdocanterior = [];
                            } else{
                                $scope.reqdoc = null;
                                $scope.docsAdjuntoAntiguo = datosLotus.File_Adjunto;
                                $scope.datos.datosdocanterior = new Object();
                                for (var i = 0; i < $scope.docsAdjuntoAntiguo.length; i++) {
                                    if ($scope.docsAdjuntoAntiguo[i] == null || $scope.docsAdjuntoAntiguo[i] == 'undefined') {
                                    } else{
                                        var narchivo = $scope.docsAdjuntoAntiguo[i].url.split('?');
                                        var achinom = narchivo[0].split('/');
                                        var dimar = achinom.length;
                                        var datosdocant = {
                                            "titulo": $scope.docsAdjuntoAntiguo[i].nombre,
                                            "nombreAcrh": achinom[dimar-1],
                                            "url": $scope.docsAdjuntoAntiguo[i].url
                                        };
                                        $scope.datos.datosdocanterior[i] = datosdocant;
                                    };
                                };
                            };
                        });
                    }
                }
                console.log("datosPublicidad.length:: ",datosPublicidad.length);
                if (JSON.stringify(datosPublicidad[0]) == '{}' || JSON.stringify(datosPublicidad[0]) == '[{}]') {
                    $scope.datos.rdTipoTramite1 = 'RENOVACION';
                    $scope.datos.swpublicidad = 'SP';
                    $scope.licenciaToogle4 = false;
                }else{
                    $scope.datos.rdTipoTramite1 = 'NUEVO';
                    $scope.listpub = [];
                    for (var i = 0; i < datosPublicidad.length; i++) {
                        var lstpublicidad = new Object();
                        console.log('url   ',datosPublicidad[i].url_publicidad.url);
                        lstpublicidad.idPublicidad = datosPublicidad[i].idpublicidad;
                        lstpublicidad.INT_NRO_CARA = datosPublicidad[i].cara;
                        lstpublicidad.INT_SUP = datosPublicidad[i].superficie;
                        lstpublicidad.idcarac = datosPublicidad[i].idtipoletrero;
                        lstpublicidad.INT_TIPO_LETRE = datosPublicidad[i].descripciontipoletrero;
                        lstpublicidad.id_cara = datosPublicidad[i].idcaracteristica;
                        lstpublicidad.INT_CARA = datosPublicidad[i].caracteristica;
                        lstpublicidad.idcate = datosPublicidad[i].idcategoria;
                        lstpublicidad.INT_ALTO = datosPublicidad[i].alto;
                        lstpublicidad.INT_ANCHO = datosPublicidad[i].ancho;
                        lstpublicidad.INT_DESC = datosPublicidad[i].descripcion;
                        lstpublicidad.estado = 'V';
                        lstpublicidad.urlImagen = datosPublicidad[i].url_publicidad.url;
                        $scope.listpub[i] = lstpublicidad;
                    };
                    $scope.datos.swpublicidad = 'CP';
                    $scope.licenciaToogle4 = true;
                    $scope.datos.publicidad = $scope.listpub;
                    $scope.Plubli_Grilla($scope.datos.publicidad);
                    $scope.publicid = $scope.listpub;
                };
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
            });
        }else{
            swal('', "Actividad Economica Vigente!!!", 'warning');
        }
    };

    $scope.getEstablecimiento = function(datoEstab){
        switch(datoEstab) {
            case 'ALQUI':
                $scope.datos.f01_estab_es = "ALQUILADO";
                break;
            case 'PROPI':
                $scope.datos.f01_estab_es = "PROPIO";
                break;                
            case 'ANTIC':
                $scope.datos.f01_estab_es = "ANTICRÉTICO";
                break;
            case 'OTRO':
                 $scope.datos.f01_estab_es = "OTRO";
                break;
            default:
                $scope.datos.f01_estab_es = datoEstab;
        }
    }

    $scope.getDatosLotus = function(idadcteco, hojar){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var datosLotus = new getDatosAELotus();                        
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta){
                console.log('lotusssssssss     ',respuesta);
                $scope.resultadoLotus = JSON.parse(respuesta);
                console.log('$scope.resultadoLotus     ',$scope.resultadoLotus);
                if ($scope.resultadoLotus.f01_tipo_lic == '32' || $scope.resultadoLotus.f01_tipo_lic == 32) {
                    $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                }
                $q.all($scope.resultadoLotus).then(function(data){
                    deferred.resolve($scope.resultadoLotus);
                })
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
          // console.log("resp: ", resp);
        });
    }

    $scope.listarAE = function () {
        console.log('listaraaaaaaaaaaaaaaaaaaaaaaaaa');
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis;
        if(sNumeroRegistros){
            console.log('sNumeroRegistros    ',sNumeroRegistros);
            $scope.datos.rdTipoTramite = "RENOVACION";
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            var idContribuyente =   dataGenesis.contribuyente_id;
            var dataNat = '{"id_contribuyente":'+idContribuyente+',"tipo":"N"}';
            var lstActEco = new reglasnegocioSierra();
            lstActEco.identificador = 'VALLE_PRUEBA-SGEN-3150';
            lstActEco.parametros = dataNat;
            lstActEco.llamarregla_sierra(function(responseActEco){
                $.unblockUI();
                if (responseActEco == '"{}"' || responseActEco == '"[{}]"' || responseActEco == '"[{ }]"') {
                    swal('', "El contribuyente no cuenta con Actividades Económicas.", 'warning');
                } else{
                    var respLstActEco = JSON.parse(responseActEco);
                    console.log('respLstActEco   ',respLstActEco);
                    console.log('respLstActEco.length     ',respLstActEco.length);
                    if (respLstActEco.length > 0) {
                        $scope.formDatosAE = true;
                        $scope.mostrarMsgActividadTrue  = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = respLstActEco;
                        var data = respLstActEco;   //grabamos la respuesta para el paginado
                        $scope.tblTramites.reload();
                    }else{
                        $scope.mostrarMsgActividadTrue  = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE  =   false;
                    };
                    var sformguardado   =   $scope.datos.INT_FORM_ALMACENADO;
                    if(typeof sformguardado == 'undefined' || sformguardado != 'G'){
                        $scope.botoneslic = false;
                        $scope.desabilitado = true;
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que corresponda.", 'warning');
                    }else{
                        $scope.botoneslic = true;
                        $scope.desabilitado = false;
                    }
                };
            });
        }else{
            $scope.datos.rdTipoTramite = "NUEVO";
            document.getElementById("rdTipoTramiteN").checked = true;
            $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica registrada.";
            $scope.txtMsgDataNuevaActividad =   "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
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
            $scope.almacenarRequisitos(rMisDocs,idFiles);
            $scope.adicionarArrayDeRequisitos(sobj,idFile);
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
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
            if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile){
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[1];
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
        //$scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
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
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
                if (archivo.size <= 15000000) {
                    if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm' || imagenNueva[1] == 'PNG' || imagenNueva[1] == 'JPG' || imagenNueva[1] == 'JPEG' || imagenNueva[1] == 'BMP' || imagenNueva[1] == 'GIF' || imagenNueva[1] == 'PDF' || imagenNueva[1] == 'DOCX' || imagenNueva[1] == 'DOCXLM') {
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
        //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
            if(value.idnro == 3 || value.idnro == 4){
                var sviae  = $scope.datos.rdTipoTramite1;
                if(sviae  == 'RENOVACION'){//sin viae
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
            }
            /*if ($scope.datos.f01_categoria_descrip == 301 || $scope.datos.f01_categoria_descrip == '301') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = false;
                }
            }
            if ($scope.datos.f01_categoria_descrip == 300 || $scope.datos.f01_categoria_descrip == '300') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = true;
                }
            }*/
        });
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
           //console.log("resp: ", resp);
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
                        datoObject.estado = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
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
        /*DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("ERROR");
        });*/
    };

    var aDocAdjuntosmapa = new Object();
    $scope.capturarImagen = function(){
        console.log("Entrando a captura imagen appaRenovacionNatural....");
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        //var latitud = $rootScope.laaa;
        //var longitud = $rootScope.looo;

        var latitud =  $scope.datos.INT_AC_latitud;
        var longitud = $scope.datos.INT_AC_longitud;
        console.log("latitud",latitud);
        console.log("longitud",longitud);

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
        $scope.publi.INT_ALTO = dato.INT_ALTO;
        $scope.publi.INT_ANCHO = dato.INT_ANCHO;
        //$scope.publi.INT_NRO_CARA = dato.INT_NRO_CARA;
        $scope.publi.INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
        $scope.publi.INT_CARA = dato.INT_CARA;
        $scope.publi.INT_DESC = dato.INT_DESC;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.modificarpublicidad = function(dato){
        /*$scope.onlyy=true;
        $scope.botonn="new";
        delete $scope.edit[dato.id];
        $scope.publi=[];
        $scope.lssubcategoria();*/
        if(dato.INT_NRO_CARA =='' || dato.INT_NRO_CARA == null || dato.INT_CARA =='' || dato.INT_CARA == null ||
            dato.INT_TIPO_LETRE =='' || dato.INT_TIPO_LETRE == null ||
            dato.INT_DESC =='' || dato.INT_DESC == null || dato.INT_ALTO =='' || dato.INT_ALTO == null || dato.INT_ANCHO =='' || dato.INT_ANCHO == null ) {
                swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
        }
        else{
            /*swal({
            title: "Modificar",
            text: "Esta seguro de Modificar el Elemento de Identificación ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "SI",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true },
            function(isConfirm){
            if (isConfirm) {*/
                //sweet.close();
                $scope.publi = [];
                var datopublic = dato;
                for (var i = 0; i < $scope.datos.publicidad.length; i++) {
                    if ($scope.datos.publicidad[i].idPublicidad == dato.idPublicidad) {
                        var superior = datopublic.INT_ALTO * datopublic.INT_ANCHO;
                        superior = (Math.round(superior * 10) / 10)+"";
                        var supe = superior.replace(",",".");
                        //superior = superior.replace(",",".");
                        var palto   =   datopublic.INT_ALTO;
                        var pancho  =   datopublic.INT_ANCHO;
                        palto   =   parseFloat(palto).toFixed(2);
                        palto   =   palto.replace(",",",");
                        pancho  =   parseFloat(pancho).toFixed(2);
                        pancho  =   pancho.replace(",",".");
                        $scope.datos.publicidad[i].estado = "N";
                        $scope.datos.publicidad[i].INT_SUP =  supe;
                        $scope.datos.publicidad[i].INT_ALTO = palto;
                        $scope.datos.publicidad[i].INT_ANCHO = pancho;
                        $scope.datos.publicidad[i].INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
                        $scope.datos.publicidad[i].INT_CARA = dato.INT_CARA;
                        $scope.datos.publicidad[i].INT_DESC = dato.INT_DESC;
                        $scope.datos.publicidad[i].INT_NRO_CARA = dato.INT_NRO_CARA;
                    };
                }
                $scope.Plubli_Grilla($scope.datos.publicidad);
                $scope.botonn="new";
                /*} else {
                    $scope.publi=[];
                    //sweet.close();
                }
            });*/
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
               //$scope.id = $scope.id - 1;
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
                    if (total < 700) {
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
                    if (total < 700) {
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

    $scope.calcularCapacidadauto = function(superficie){
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

    /*$scope.cargarNombVia = function(tipoVia, dato) {
        try{
            var nomvia = new aelstNombreVia();
            nomvia.idzona = dato.f01_zona_act;
            nomvia.tipovia = tipoVia;
            nomvia.aelst_NombreVia(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.datosNombVia = response;
                    $scope.nombreViaCmb = true;
                    if (dato.f01_factor == "VA") {
                        $scope.nombreViaTxt = true;
                    } else {
                        $scope.nombreViaTxt = false;
                    }
                } else{
                    $scope.nombreViaCmb = true;
                    $scope.nombreViaTxt = false;
                };
            });
        }catch (error){
            console.log('datos error via:', error);
        }
    };*/

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
        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;
        var taemayor = 0;
        if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
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
            if(data && data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                data.FILE_CI != ""  && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.fileArchivosAd != ""  && data.fileArchivosAd != null &&
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
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null){
                $scope.serializarInformacion(data);
                $scope.formulario401(data);
                $("#declaracionN").modal("show");
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
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null){
                //$rootScope.validacionRequisitosTec();
                    $scope.serializarInformacion(data);
                    $scope.formulario401(data);
                    $("#declaracionN").modal("show");
            }else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
    }

    $scope.formulario401 = function(datos){
        console.log("datos: ", datos);
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
                console.log("datos11: ", datos);

            //urlFormularioN  =   "../../docs/AE_Formulario_401.html";
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
                for (i = 0; i < datos.publicidad.length; i++){
                    pubMod = pubMod +'<tr>' +
                    //'<td>' + datos.publicidad[i].id + '</td>'+
                    '<td>' + (i+1) + '</td>'+
                    '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>'+
                    '<td>' + datos.publicidad[i].INT_CARA + '</td>'+
                    //'<td>' + datos.publicidad[i].INT_NRO_CARA + '</td>'+
                    '<td>' + datos.publicidad[i].INT_DESC + '</td>'+
                    '<td>' + datos.publicidad[i].INT_ANCHO + '</td>'+
                    '<td>' + datos.publicidad[i].INT_ALTO + '</td>'+
                    '<td>' + datos.publicidad[i].INT_SUP + '</td>'+
                    '<td>' + datos.publicidad[i].estado + '</td></tr>';
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
                        '<td>' + datos.publicidadAntiguo_grilla[i].alto + '</td>'+
                        '<td>' + datos.publicidadAntiguo_grilla[i].ancho + '</td>'+
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
                        stringFormulario40  =   stringFormulario40.replace("#tipocategoria#", $scope.datosA[0].tipocategoria);
                    }catch(e){console.log("Error:", e);}
                    stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", $scope.datosAnt.ActividadDesarrollada);
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
                dataForm['tipocategoria'] =  $scope.datosA[0].tipocategoria;
            }catch(e){console.log("Error:", e);}
            dataForm['ActividadDesarrollada'] =  $scope.datosAnt.ActividadDesarrollada;
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
        /*if(data.f01_tip_act =='MA' || data.f01_tip_act =='MATRI'){
            dataForm['f01_tip_act'] =  'MATRIZ';
        }
        if(data.f01_tip_act =='SU' || data.f01_tip_act =='SUCUR'){
            dataForm['f01_tip_act'] = 'SUCURSAL';
        }*/
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
        for (i = 0; i < data.publicidad.length; i++){
            pubMod = pubMod +'<tr>' +
                '<td>' + (i+1) + '</td>'+
                //'<td>' + data.publicidad[i].idPublicidad + '</td>'+
                '<td>' + data.publicidad[i].INT_TIPO_LETRE + '</td>'+
                '<td>' + data.publicidad[i].INT_CARA + '</td>'+
                //'<td>' + data.publicidad[i].INT_NRO_CARA + '</td>'+
                '<td>' + data.publicidad[i].INT_DESC + '</td>'+
                '<td>' + data.publicidad[i].INT_ANCHO + '</td>'+
                '<td>' + data.publicidad[i].INT_ALTO + '</td>'+
                '<td>' + data.publicidad[i].INT_SUP + '</td>'+
                '<td>' + data.publicidad[i].estado + '</td></tr>';
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
            if (datos.chkzonasegura == 'ZONASEGURA') {
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> SI';
            } else{
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> NO';
            };
        };
        dataForm['usuarioPlataforma'] = nombreUsuario;
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
            console.log(" $scope.pubrd:: ",  $scope.pubrd);
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
        console.log("$scope.datos.pubenvio: ", $scope.datos.pubenvio);
        $scope.datos.publicidad = $scope.datos.pubenvio;
    }


    $scope.enviarFormProcesosLinea = function(paramForm){
        $scope.ultimoArrayAdjunto();
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
            datosNeXO['f01_nit'] = paramForm.f01_nit;
            datosNeXO['f01_nit_prop'] = paramForm.f01_nit;
            datosNeXO['f01_tip_doc_prop']           =paramForm.f01_tip_doc_prop;
            datosNeXO['f01_expedido_prop']          =paramForm.f01_expedido_prop;
            datosNeXO['f01_pri_nom_prop']           =paramForm.f01_pri_nom_prop;
            datosNeXO['f01_seg_nom_prop']           ="";
            datosNeXO['f01_ter_nom_prop']           ="";
            datosNeXO['f01_ape_pat_prop']           =paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop']           =paramForm.f01_ape_mat_prop;
            datosNeXO['f01_ape_cas_prop']           ="";
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
            datosNeXO['f01_categoria_agrupada_descripcion']="";
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
                datosNeXO['File_Adjunto'] =  $scope.datos.File_Adjunto.concat(decjuradaN);
            }
            else{
                datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos.concat(decjuradaN);;
            }

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
                datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
            }else{
                datosNeXO['f01_idcat_multi_principal'] = '';
                datosNeXO['f01_descat_multi_principal'] = '';
                datosNeXO['f01_act_principal'] = '';
                datosNeXO['f01_actividad_principal_array'] = '';
            }
            //datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
        }
            datosNeXO['f01_categoria_descrip']      =  paramForm.f01_categoria_descripcion;
            datosNeXO['f01_categoria_descrip2']      =  paramForm.f01_categoria_descripcion.toUpperCase();
            datosNeXO['f01_categoria']      =  parseInt(paramForm.f01_categoria_descrip);
            datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
            datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2.toUpperCase();
        if(paramForm.rdTipoTramite1 == "NUEVO" || paramForm.rdTipoTramite1 == 'NUEVO'){
            datosNeXO['sw_publicidad']      =  "CP" ;
            datosNeXO['swpublicidad']      =  "CP" ;
        }if(paramForm.rdTipoTramite1 == "RENOVACION" || paramForm.rdTipoTramite1 == 'RENOVACION'){
            datosNeXO['sw_publicidad']      =  "SP" ;
            datosNeXO['swpublicidad']      =  "SP" ;
        }
        datosNeXO['publicidadcop']=paramForm.publicidad;
        datosNeXO['publicidad']=paramForm.pubenvio;
        datosNeXO['publicidad_grilla']=paramForm.publicidad_grilla;

        datosNeXO['licencia_multiple']=paramForm.licenciam;
        datosNeXO['g_tipo'] = "AE-LINEA";
        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }
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
                archivo1 = "";
                var crearCaso   =   new gCrearCaso();
                crearCaso.usr_id    = 1,
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
           /* }else{
                swal('', "Complete sus Datos de Direccion", 'warning');
            }  */
        }else{
            swal('', "Datos obligatorios, verifique los datos del formulario E", 'warning');
        }
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
};
