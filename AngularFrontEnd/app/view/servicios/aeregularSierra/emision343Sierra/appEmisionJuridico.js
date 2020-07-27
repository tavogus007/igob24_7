function regularjuridicoSierraController($scope,$timeout, $rootScope, $routeParams, $location, $http,$q, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,fileUpload1,wsRgistrarPubliciadad, $window, obtFechaActual) {
    var fecha           = new Date();
    var fechactual      = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.divJuridico              = false;
    $scope.divOcultarJuegos         = true;
    $scope.tblTramites              =   {};
    $scope.trmUsuario               =   [];
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.btnEnviarFormLinea  =   "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;
    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual          =   "";
    $scope.nroOrdenActividiadEconomicaActual    =   "";
    $scope.idContribuyenteAEActual              =   "";
    $scope.sCategoria = true;
    $scope.smultiservicios = false;
    $scope.docPubNuevo = [];
    $scope.pos = 0;
    $scope.IsVisible = false;
    $scope.tblDeudas = {};
    $scope.listDeudas = [];
    $scope.btnCalcular = true;

   /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
    $scope.cambioToggleForm = function () {
        //$scope.validarEmisionRenovacion(cambio);  
        $scope.botones = "mostrar";
        $scope.desabilitado = false;
        $scope.mostrarMsgNuevaActividad = true;
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
        $scope.datos.f01_actividadesSecundarias = '';
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
        //$scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_categoria = '';           
        $scope.licenciaToogle1 = false;
        $scope.licenciaToogle2 = true;  
        $scope.licenciaToogle1 = false;
        $scope.licenciaToogle2 = true;
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
        $scope.datos.f01_actividad_principal_array =[];
        $scope.datos.FILE_CI = '';
        $scope.datos.fileArchivosAd = '';   
        //pago adelantado
        $scope.datos.pago_adel = '';
        $scope.datos.pago_adelantado = '';
        $scope.datos.nro_ges = '';
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

    $scope.validarActividadEconomica  =   function(){
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.cambioToggleForm();
        //$scope.listarAE();
    };

    /*$scope.datosRepresentanteLegal = function (idContribuyente) {
        try{
            var paramRepLegal = new datosRepresentanteLgEmpresa();
            paramRepLegal.idEmpresa = idContribuyente;
            paramRepLegal.datos_RepresentanteLgEmpresa(function(resp){
                x = JSON.parse(resp);
                var responseLegal = x.success.dataSql;
                $.unblockUI();
                if(responseLegal.length > 0){
                    var datos = {};
                    $scope.datos.f01_tipo_per = "J";
                    $scope.datos.f01_id_representante_legal = responseLegal[0].idRepresentanteLegal;//idRepresentanteLegal
                    $scope.datos.f01_expedido_rep = responseLegal[0].expedicion;//expedicion
                }
                else{
                    swal('', "No existen ninguno ciudadano", 'error');
                }
            }).error(function(responseLegal){
                swal('', "Datos no Encontrados !!!", 'warning');
                $.unblockUI();
            });
        }catch (error){
            console.log("error");
        }
    };*/

    $scope.datosRepresentanteLegal = function () {
        try{
            console.log('$scope.datos.f01_id_contribuyente  RL   ',$scope.dataGenesisCidadano);
            console.log('representante antiguooooo     ',$scope.datos.f01_id_representante_legal_antiguo);
            var dataRepLegal = '';
            dataRepLegal = '{"ycontribuyente_nro_documento":"'+$scope.datos.f01_num_doc_rep+'","ycontribuyente_nit":""}';
            var resAct = new reglasnegocioSierra();
            resAct.identificador = 'VALLE_PRUEBA-SGEN-3148';
            resAct.parametros = dataRepLegal;
            resAct.llamarregla_sierra(function(responseN){
                console.log('responseN    ',responseN);
                var responseLegal = JSON.parse(responseN);
                console.log('responseLegal    ',responseLegal);
                $.unblockUI();
                if(responseLegal.resultado == true || responseLegal.resultado == 'true'){
                    var datos = {};
                    $scope.datos.f01_tipo_per = "J";
                    $scope.datos.f01_id_representante_legal = responseLegal.data.contribuyente_id;//idRepresentanteLegal
                }
                else {
                    swal('', "Representante Legal no registrado en Sierra", 'warning');
                }
                console.log('$scope.datos.f01_id_representante_legal    ',$scope.datos.f01_id_representante_legal);
            });
        }catch (error){
            console.log("error");
        }
    };

    /*$scope.limpiarmultiple = function(){
        $scope.licdes=[];
        $scope.multiple=[];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.datos.mulact_principal = '';
        $scope.datos.xf01_idcat_multi_principal = '';
        $scope.datos.xf01_descat_multi_principal = '';
    }*/
    datoObjectFiles_ci = [];
    $scope.datos.FILE_CI = '';
    $scope.datos.fileArchivosAd = '';

    /*$scope.catactividadDesarrollada = function(){
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
                $.unblockUI();
            });
        }catch(e){
            alert("Error en la actividad desarrollada");
        }
    }*/

    $scope.catactividadDesarrollada = function(){
        $.blockUI();
        $scope.datos.rdTipoTramite = 'NUEVO';
        //$scope.datos.f01_actividad_desarrollada = "";
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
            $.unblockUI();
        }
    }

    /*$scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        $.blockUI();
        //$scope.datos.rdTipoTramite = 'NUEVO';
        $scope[name] = 'Running';
        var deferred = $q.defer();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFile3 = new Object();
        datoObjectFile4 = new Object();
        datoObjectFile5 = new Object();
        datoObjectFile6 = new Object();
        datoObjectFiles_ci = [];
        $scope.datos.FILE_CI = '';
        $scope.datos.fileArchivosAd = '';
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
                    deferred.resolve($scope.datosActividadLicencia);
                    $scope.datos.f01_tipo_lic = datosLic[0].idTipoLicencia;
                    $scope.datos.f01_tipo_lic_descrip = datosLic[0].TipoLicenciaDescripcion;
                    $scope.datos.f01_categoria_agrupada = datosLic[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_dem = datosLic[0].idActividadDesarrollada343;
                    $scope.datos.f01_categoria_agrupada_descrip = datosLic[0].ADDescripcion;
                    $scope.GetValueZonaSegura(datosLic[0].idActividadDesarrollada);
                    var comboz = document.getElementById('f01_categoria_descrip');
                    selected2 = comboz.options[comboz.selectedIndex].text;
                    $scope.datos.f01_categoria_descripcion = selected2;
                    $scope.datos.f01_categoria_descrip2 = selected2;
                    $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                    $scope.datos.f01_actividadesSecundarias = datosLic[0].ADDescripcion;
                }else{
                    $scope.msg = "Error !!";
                }
                if (idDesarrollada == 907 || idDesarrollada == '907') {
                    $scope.sCategoria = false;
                    $scope.smultiservicios = true;
                    $scope.actividadDesarrolladaM();
                }
                datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
                datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
                datoObjectFiles_ci[0] = datoObjectFile1;
                datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
                datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
                datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
                datoObjectFiles_ci[1] = datoObjectFile2;
                datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
                datoObjectFile3.campo = 'Poder de Representación Legal';
                datoObjectFile3.nombre = 'Poder de Representación Legal';
                datoObjectFiles_ci[2] = datoObjectFile3;
                datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
                datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
                datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
                datoObjectFiles_ci[3] = datoObjectFile4;
                datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
                datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
                datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
                datoObjectFiles_ci[4] = datoObjectFile5;
                datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
                datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
                datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
                datoObjectFiles_ci[5] = datoObjectFile6;
                $scope.datos.FILE_CI = datoObjectFiles_ci;
                $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                $scope.getRequisitosTecnicosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                //$scope.$apply();
                $.unblockUI();
            });
        }catch(e){
                console.log("Error en la actividad desarrollada");
        }
    }*/

    $scope.LicenciaXCategoriaA = function(idDesarrollada, superficie){
        $.blockUI();
        if(superficie){
            //$scope.datos.rdTipoTramite = 'NUEVO';
            $scope[name] = 'Running';
            var deferred = $q.defer();
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFile3 = new Object();
            datoObjectFile4 = new Object();
            datoObjectFile5 = new Object();
            datoObjectFile6 = new Object();
            datoObjectFiles_ci = [];
            $scope.datos.FILE_CI = '';
            $scope.datos.fileArchivosAd = '';
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
                        $scope.datos.f01_categoria_agrupada_descrip = datosLic[0].addescripcion;
                        $scope.datos.f01_proceso = datosLic[0].proceso;
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
                        $scope.sCategoria = false;
                        $scope.smultiservicios = true;
                        $scope.actividadDesarrolladaM();
                    }
                    datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                    datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
                    datoObjectFile1.nombre = 'Cedula de identidad (Anverso)';
                    datoObjectFiles_ci[0] = datoObjectFile1;
                    datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
                    datoObjectFile2.campo = 'Cedula de identidad (Reverso)';
                    datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
                    datoObjectFiles_ci[1] = datoObjectFile2;
                    datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
                    datoObjectFile3.campo = 'Poder de Representación Legal';
                    datoObjectFile3.nombre = 'Poder de Representación Legal';
                    datoObjectFiles_ci[2] = datoObjectFile3;
                    datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
                    datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
                    datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
                    datoObjectFiles_ci[3] = datoObjectFile4;
                    datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
                    datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
                    datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
                    datoObjectFiles_ci[4] = datoObjectFile5;
                    datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
                    datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
                    datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
                    datoObjectFiles_ci[5] = datoObjectFile6;
                    $scope.datos.FILE_CI = datoObjectFiles_ci;
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
                $.unblockUI();
            }
        }else{
            swal('', "Llene el campo de la superficie!!!", 'warning');
            $.unblockUI();
        }
    }

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
                //$scope.$apply();
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

    /*$scope.LicenciaXCategoriaM = function(idDesarrollada, superficie){
        $.blockUI();
        $scope[name] = 'Running';
        var deferred = $q.defer();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        try{
            var nDatosLic = new getDatosLicencia();
            nDatosLic.idActividadDesarrollada = idDesarrollada;
            nDatosLic.superficie = superficie;
            nDatosLic.getDatos_Licencia(function(resDatosLicM){
                var obtLicM = JSON.parse(resDatosLicM);
                var datosLicM = obtLicM.success.dataSql;
                if(datosLicM.length > 0){
                    $scope.multiple = datosLicM;
                    $scope.multiple.f01_tipo_licmid = datosLicM[0].idTipoLicencia;
                    $scope.multiple.f01_tipo_licmdescrip = datosLicM[0].TipoLicenciaDescripcion;
                    $scope.multiple.f01_cat_agrupadamid = datosLicM[0].idActividadDesarrollada;
                    $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].ADDescripcion;
                    $scope.multiple.f01_act_desarrolladamid = idDesarrollada;
                    var combox = document.getElementById('f01_act_desarrolladamid');
                    selected2 = combox.options[combox.selectedIndex].text;
                    $scope.multiple.f01_act_desarrolladamdescrip = selected2;
                    $scope.multiple.f01_tae = datosLicM[0].tae;
                    $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada,$scope.datos.f01_tipo_per);
                    deferred.resolve($scope.multiple);
                    $.unblockUI();
                }else{
                    $scope.msg = "Error !!";
                    $.unblockUI();
                }
            });
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }
    }*/

    $scope.LicenciaXCategoriaM = function(idDesarrollada, superficie){
        $.blockUI();
        console.log('idDesarrollada     ',idDesarrollada,'    superficie   ',superficie);
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
                        $scope.multiple.f01_cat_agrupadamid = datosLicM[0].categoria_id;
                        $scope.multiple.f01_categoria_agrupada = datosLicM[0].categoria_id_anterior;
                        $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].addescripcion;
                        $scope.multiple.f01_act_desarrolladamid = datosLicM[0].idactividaddesarrollada343;
                        $scope.multiple.f01_procesomul = datosLicM[0].proceso;
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
                $.unblockUI();
            }
        }else{
            swal('', "Llene el campo de la superficie!!!", 'warning');
            $.unblockUI();
        }
    }

    $scope.guardarLicencia = function(licencia){
        console.log('licencia    ',licencia);
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
                id = $scope.licenciamul.length + 1;
            }
            if(id<11){
                $scope.id = id;
                $scope.licenciamul.push({
                    id: id,
                    f01_tipo_licmid: licencia.f01_tipo_licmid,
                    f01_cat_agrupadamid: licencia.f01_cat_agrupadamid,
                    f01_categoria_agrupada: licencia.f01_categoria_agrupada,
                    f01_act_desarrolladamid: licencia.f01_act_desarrolladamid,
                    //f01_cat_agrupadamid_anterior: licencia.f01_categoria_agrupada,
                    f01_tipo_licmdescrip: licencia.f01_tipo_licmdescrip,
                    f01_cat_agrupadamdescrip: licencia.f01_cat_agrupadamdescrip,
                    f01_act_desarrolladamdescrip: licencia.f01_act_desarrolladamdescrip,
                    f01_catagrp_principal: $scope.f01_catagrp_principal
                    //f01_tae: licencia.f01_tae
                });
                $scope.licdes = [];
                $scope.multiple = [];
                $scope.dscripcionlic = {};
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
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip","titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada","impresiones": "true|true|true|true|true|true|true|"};
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
                f01_act_desarrolladamdescrip: dato[j].f01_act_desarrolladamdescrip
                //f01_catagrp_principal: dato[j].f01_catagrp_principal
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

    var requisitosDoc = [];
    /*$scope.validacionRequisitos = function(sup){
        requisitosDoc = $rootScope.datosRequisitos;
        datoObjectFinal = [];
        datoObjectFinal2 = [];
        for (var i = 0; i < requisitosDoc.length; i++ ) {
             datoObject = new Object(); 
             datoObject2 = new Object(); 
            if(requisitosDoc.resvalor == " PARA INMUEBLES CON SUPERFICIE MAYOR A 150 M2: PLANO ELABORADO POR ARQUITECTO DETALLANDO LOS AMBIENTES UTILIZADOS" && sup < 150){
                datoObject2.resid        =   requisitosDoc[i].resid; 
                datoObject2.resvalor     =   requisitosDoc[i].resvalor; 
                datoObject2.estado       =   requisitosDoc[i].estado;
                datoObjectFinal2[i]      =   datoObject2;
            }
            else{
                datoObject.resid        =   requisitosDoc[i].resid; 
                datoObject.resvalor     =   requisitosDoc[i].resvalor; 
                datoObject.estado       =   requisitosDoc[i].estado;
                datoObjectFinal[i]      =   datoObject;
            }            
        }
        $rootScope.datosRequisitosmostrar = datoObjectFinal;
    }*/

    $scope.getRequisitosCategoria = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
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

    $scope.lstRequisitosTecnicosMultiples = function(licenciamul){
        var sconsulta   = '[';
        for(i=0; i<licenciamul.length; i++){
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_categoria_agrupada + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'J';
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

    $scope.getRequisitosCategoriaTecnicos = function(idTipoLicencia, idCategoria, persona){
        if(idTipoLicencia == 17 || idTipoLicencia == '17' || idTipoLicencia == '18' || idTipoLicencia == 18){
            $scope.getRequisitosTecnicosActividad(idCategoria, persona);
        }else{
            $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
        }
    }

    $scope.getRequisitosTecnicosActividad = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
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
            $scope.errors["error requisitos tecnicos act"] = error;
        }
    };

    $scope.getRequisitosTecnicosCategoria = function(idCategoria, persona){
        if(persona == 'JURIDICO'){
            persona = 'J';
        }
        try{
            var parametro = new aelstRequisitosTecCategoria();
            parametro.idCategoria = idCategoria;
            parametro.tipopersona = persona;
            parametro.aelst_RequisitosTecCategoria(function(res){
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
        }
    };

    $scope.lst_actividad_desarrollada = function(id){
        try{
            var cat = new bsqActividadDesarrollada();
            cat.idCatAgrupada=id;
            cat.descrip='';
            cat.bsqActividad_Desarrollada(function(res){               
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    //$scope.f01_categoria_descrip = response;
                    $scope.datosdesarrollo = response;
                    $scope.desabilitarActDesarrollada =   false;
                    $scope.sActividadDesarrollada   =   true;  
                    $.unblockUI();                        
                }else{
                    $scope.sActividadDesarrollada   =   false;                            
                    $scope.msg = "Error !!";
                    $.unblockUI();  
                }
            });
        }catch(e){
            alert("Error en licencias");
            $.unblockUI(); 
        }
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
 
    /*$scope.actulizarIdDistrito  =   function(idZona){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var zonaDes      = "";
        //var distNombre  = $scope.datos.f01_zon_prop_valor;
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
    };

    $scope.distritoZonas = function(idMacroJ){ 
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

    $scope.macrodistritosid = function(idzona){
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

    

    $scope.cargarNombVia = function(tipoVia, dato) {
        try{
            var nomvia = new aelstNombreVia();
            nomvia.idzona = $scope.datos.INT_AC_ID_ZONA;
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
        if (valor == 0 || valor == '0'){
            $scope.nombreViaTxt = true;
            $scope.tipoTrayecto = false;
            $scope.datos.f01_factor ="VA";
        } else {
            $scope.nombreViaTxt = false;
            $scope.tipoTrayecto = true;
            $scope.datos.f01_factor = "TM";
            $scope.datos.f01_num_act_n = "";
        }
    };

    $scope.GetValueCategoria = function () {
        var e = document.getElementById("f01_categoria_descrip");
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyenteJuridico = function () {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }

    $scope.GetValueVia = function () {
        setTimeout(function(){
            var e = document.getElementById("f01_num_act_id");
            $scope.datos.f01_num_act = e.options[e.selectedIndex].text;
        },500);
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
        if($scope.datos.f01_categoria_agrupada != 26 || $scope.datos.f01_categoria_agrupada != '26'){
            //var e = document.getElementById("f01_categoria_agrupada");
            //$scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
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
        if($scope.datos.f01_categoria_descrip != 26 || $scope.datos.f01_categoria_descrip != '26'){
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
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip  +" - ";
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip  +" - ";
                    }
                    else{
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip  +" - ";
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip  +" - ";
                    }
                }
            }
            var swmul = 0;
            var procesoMul = '';
            var swproceso = 0;
            for (var k = 0; k < datoslicm.length && swmul == 0; k++) {
                if(datoslicm[k].f01_tipo_licmid == '12' || datoslicm[k].f01_tipo_licmid == 12){
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
            for (var i = 0; i < datoslicm.length && swproceso == 0; i++) {
                if(datoslicm[i].f01_procesomul == 'GEN'){
                    swproceso = 0;
                }else{
                    swproceso = 1;
                }
            }
            if (swproceso == 0) {
                $scope.datos.f01_proceso = 'GEN';
            } else{
                $scope.datos.f01_proceso = 'PRE';
            };
        }
        $scope.actividadDesCat = datosaux;
        $scope.datos.f01_actividadesSecundarias = $scope.actividadDesCat;
        $scope.datos.f01_categorias_multi = datosact;
    }

     $scope.publi=[];
    //$scope.publi.FECHAINICIO=$scope.fechactuall;
    //$scope.publi.FECHAFIN=$scope.fechadatoo;
     $scope.lssubcategoria = function(){
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.TipoLetrero = [
        {"p_idtipoletrero" : "17", "p_descripcion": "ADOSADA SOBRESALIENTE"},
        {"p_idtipoletrero" : "14", "p_descripcion": "ADOSADA"},
        {"p_idtipoletrero" : "15", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
        {"p_idtipoletrero" : "16", "p_descripcion": "PINTADA"}];
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
            $scope.errors["error_rol"] = error;
        }
    };

    $scope.onlyy=false;
    $scope.botonn="new";

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
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.modificarpublicidad = function(dato){
        var superior = dato.INT_ALTO * dato.INT_ANCHO;
        superior = (Math.round(superior * 10) / 10)+"";
        var supe = superior.replace(",",".");
        $scope.onlyy=true;
        $scope.botonn="new";
        $scope.publi.INT_SUP = supe;
        delete $scope.edit[dato.id];
        $scope.publi=[];
        $scope.lssubcategoria();
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
                    if (total < 700) {
                        var validarCorrelativoPub = [$scope.generarCorrelativo('VIAE')];
                        $q.all(validarCorrelativoPub).then(function (resp) {
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
                                idPublicidad_temp: resp[0]
                            });
                            $scope.publi = [];
                            $scope.publi.INT_CATE="II Fija";
                            $scope.publi.idcate=6;
                            $scope.lssubcategoria();
                            $scope.datos.publicidad = $scope.publicid;
                            $scope.Plubli_Grilla($scope.publicid);
                        })
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
                    if (total < 700) {
                        var validarCorrelativoPub = [$scope.generarCorrelativo('VIAE')];
                        $q.all(validarCorrelativoPub).then(function (resp) {
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
                                idPublicidad_temp: resp[0]
                            });
                            $scope.publi=[];
                            $scope.publi.INT_CATE="II Fija";
                            $scope.publi.idcate=6;
                            $scope.lssubcategoria();
                            $scope.datos.publicidad = $scope.publicid;
                            $scope.Plubli_Grilla($scope.publicid);
                        })
                    } else {
                        swal('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        }
        datoObjectFinalV = [];
        var i = $scope.pos;
        for(j = 0; j < $scope.docArrayPub.length; j++){
            datoObjectv = new Object();
            datoObjectv.idP = (i+1);
            datoObjectv.resid = $scope.docArrayPub[j].resid;
            datoObjectv.idnro = $scope.docArrayPub[j].idnro;
            datoObjectv.resvalor = $scope.docArrayPub[j].resvalor+' Nuevo '+public.INT_TIPO_LETRE;
            datoObjectv.nomcampo = $scope.docArrayPub[j].nomcampo;
            datoObjectv.estado   = true;
            datoObjectv.desNom = $scope.docArrayPub[j].desNom +'_' + (i+1);
            datoObjectFinalV[i] = datoObjectv;
            $scope.docPubNuevo.push(datoObjectFinalV[i]);
            i++;
        }
        $scope.pos = i;
        setTimeout(function(){
            iniciarLoadFyle();
        }, 1000);
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
    $scope.verificarSuperficie = function(superficie){
        $scope.validarRequisitosForm();
    }

    //enviarFormProcesosLinea
    $scope.validarEnvio = function(data){
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    /*CIUDADANO - ENVIAR FORMULARIO JURIDICO*/
    $scope.enviarFormProcesosLinea = function(paramForm){
        $scope.ultimoArrayAdjunto();
        $scope.capturarImagen();
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        //$rootScope.validacionRequisitosTec();        
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'EM-LF';
        var datosNeXO = {};
        if (paramForm.OTRO_VIA!="") {
            $scope.nombre_via =paramForm.OTRO_VIA;
        }else{
            $scope.nombre_via =paramForm.f01_nom_via_prop;
        }        
        $scope.divVIAE="mostrar";
        /*RENOVACION DE LICENCIAS*/
        /*if(paramForm.rdTipoTramite == "RENOVACION"){
            datosNeXO['f01_id_actividad_economica']   =   $scope.idActividiadEconomicaActual;
            datosNeXO['f01_nro_orden']   =   $scope.nroOrdenActividiadEconomicaActual;
            datosNeXO['f01_id_contribuyente']   =   $scope.idContribuyenteAEActual;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_id_representante_legal'] = paramForm.f01_id_representante_legal;
        }*/
        if (paramForm.f01_id_contribuyente != undefined || paramForm.f01_id_contribuyente != 'undefined' || paramForm.f01_id_contribuyente != null || paramForm.f01_id_contribuyente != '') {
            datosNeXO['f01_id_contribuyente'] = paramForm.f01_id_contribuyente;
            datosNeXO['f01_id_representante_legal'] = paramForm.f01_id_representante_legal;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_id_representante_legal_antiguo'] = paramForm.f01_id_representante_legal_antiguo;
        }
        datosNeXO['CI_BIGDATA_RL']                  =   paramForm.id_representante;
        var sIdCiudadano = sessionService.get('IDCIUDADANO');
        datosNeXO['f01_nro_frm'] =  sessionService.get('IDTRAMITE');
        datosNeXO['f01_actividadesSecundarias'] =   paramForm.f01_actividadesSecundarias;
        datosNeXO['f01_tipo_sociedad'] = paramForm.f01_tipo_sociedad;
        datosNeXO['f01_tipo_respaldo'] = paramForm.f01_tipo_respaldo;
        datosNeXO['f01_tipo_sociedad_descripcion'] = paramForm.f01_tipo_sociedad_descripcion;
        datosNeXO['f01_tipo_respaldo_descripcion'] = paramForm.f01_tipo_respaldo_descripcion;
        if ($scope.tipoPersona != 'NATURAL'){
            datosNeXO['f01_tipo_per']                   =    'J';
            datosNeXO['f01_tipo_per_desc']              = 'JURIDICO';
            datosNeXO['INT_SOLICITANTE']                =   paramForm.INT_SOLICITANTE;
            datosNeXO['AE_ORD_DEM']                     =   paramForm.AE_ORD_DEM;
            datosNeXO['f01_nit']                        =   paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_num_doc_per_jur']            =   paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_raz_soc_per_jur']            =   paramForm.f01_raz_soc_per_jur;
            datosNeXO['f01_raz_soc']                    =   paramForm.f01_raz_soc;
            datosNeXO['INT_ID_CAT_AGRUPADA']            =   parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_requisitos_tecnicos']        =   $scope.datos.f01_requisitos_tecnicos;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD']         =   paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['f01_num_doc_rep']                =   paramForm.f01_num_doc_rep;
            datosNeXO['f01_tip_doc_rep']                =   paramForm.f01_tip_doc_rep;
            datosNeXO['f01_expedido_rep']               =   paramForm.f01_expedido_rep;
            datosNeXO['f01_email_rep']                  =   paramForm.f01_email_rep;
            datosNeXO['f01_cel_rep']                    =   paramForm.f01_cel_rep;
            datosNeXO['f01_telef_rep']                  =   paramForm.f01_telef_rep;
            datosNeXO['INT_FEC_SOLICITUD']              =   paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA']                     =   sessionService.get('IDCIUDADANO');
            datosNeXO['CI_BIGDATA_RL']                  =   paramForm.id_representante;
            datosNeXO['f01_id_zona_rep']                =   paramForm.f01_id_zona_rep;
            datosNeXO['f01_zona_rep']                   =   paramForm.f01_zon_rep_valor;
            datosNeXO['f01_zon_rep_valor']              =   paramForm.f01_zon_rep_valor;
            datosNeXO['f01_pri_nom_rep']                =   paramForm.f01_pri_nom_rep;
            datosNeXO['f01_seg_nom_rep']                =   paramForm.f01_seg_nom_rep;
            datosNeXO['f01_ter_nom_rep']                =   paramForm.f01_ter_nom_rep;
            datosNeXO['f01_ape_pat_rep']                =   paramForm.f01_ape_pat_rep;
            datosNeXO['f01_ape_mat_rep']                =   paramForm.f01_ape_mat_rep;
            datosNeXO['f01_ape_cas_rep']                =   paramForm.f01_ape_cas_rep;
            datosNeXO['f01_fecha_nac']                  =   paramForm.f01_fecha_nac;
            datosNeXO['INT_ACTIVIDAD']                  =   paramForm.INT_ACTIVIDAD;
            datosNeXO['f01_denominacion']               =   paramForm.f01_denominacion;
            datosNeXO['f01_sup']                        =   paramForm.f01_sup;
            datosNeXO['f01_cap_aprox']                  =   paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor']                     =   paramForm.f01_de_hor;
            datosNeXO['f01_a_hor']                      =   paramForm.f01_a_hor;
            datosNeXO['INT_AC_ESTADO']                  =   paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO']                   =   paramForm.INT_AC_MACRO;
            //datosNeXO['f01_zon_rep_valor']              =   paramForm.f01_zon_rep_valor;
            datosNeXO['f01_tipo_viarep']                =   paramForm.f01_tipo_viarep;
            datosNeXO['f01_nom_via_rep']                =   paramForm.f01_nom_via_rep;
            datosNeXO['OTRO_VIA']                       =   paramForm.OTRO_VIA;
            datosNeXO['f01_num_rep']                    =   paramForm.f01_num_rep;
            datosNeXO['INT_AC_EDIFICIO']                =   paramForm.INT_AC_EDIFICIO;
            datosNeXO['f01_fecha_ini_act']              =   fechactual;
            datosNeXO['f01_estab_es']                   =   paramForm.f01_estab_es;
            datosNeXO['f01_distrito_desc']              =   paramForm.f01_distrito_desc;
            datosNeXO['f01_productosElaborados']        =   paramForm.f01_productosElaborados;
            datosNeXO['f01_proceso'] = paramForm.f01_proceso;
            datosNeXO['f01_tipo_lic']                   =   paramForm.f01_tipo_lic;
            datosNeXO['f01_tipo_lic_sierra']            =   paramForm.f01_tipo_lic_sierra;
            datosNeXO['f01_tipo_lic_descrip']                   =   paramForm.f01_tipo_lic_descrip;
            datosNeXO['f01_categoria_agrupada_descripcion']       =   paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_categoria_agrupada_descrip']       =   paramForm.f01_categoria_agrupada_descrip;
            datosNeXO['f01_categoria_descrip']                    =   paramForm.f01_categoria_descrip;
            datosNeXO['INT_ID_CAT_AGRUPADA']            =  parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada']         = paramForm.f01_categoria_agrupada;
            datosNeXO['f01_categoria_agrupada_sierra']  =   paramForm.f01_categoria_agrupada_sierra;
            datosNeXO['f01_categoria'] = paramForm.f01_categoria_descrip;
            datosNeXO['f01_macro_act']                  =   paramForm.f01_macro_act;
            datosNeXO['f01_macro_act_descrip']          =   paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act']                   =   paramForm.f01_zona_act;//paramForm.f01_zona_act_descrip;
            datosNeXO['pago_adelantado'] = paramForm.pago_adelantado;
            datosNeXO['f01_zona_act_descrip']           =   paramForm.f01_zona_act_descrip;
            datosNeXO['f01_dist_act']                   =   paramForm.f01_dist_act;//"";
            datosNeXO['f01_dist_act_descrip']           =   paramForm.f01_dist_act_descrip;
            datosNeXO['f01_tip_via_act']                =   paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act']                    =   paramForm.f01_num_act;
            datosNeXO['f01_num_act_id'] = paramForm.f01_num_act_id;

            if(paramForm.f01_num_act_id == "0" || paramForm.f01_num_act_id == 0){
                datosNeXO['f01_num_act_n'] = (paramForm.f01_num_act_n).toUpperCase();
            }
            //datosNeXO['f01_num_act_n']                  =   paramForm.f01_num_act_n;
            datosNeXO['f01_factor']                     =   paramForm.f01_factor;
            datosNeXO['f01_num_act1']                   =   paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act']               =   paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act']                   =   paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc']                =   paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1']                   =   paramForm.f01_tel_act1;
            datosNeXO['f01_casilla']                    =   paramForm.f01_casilla;
            datosNeXO['f01_cod_luz']                    =   paramForm.f01_cod_luz;
            datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;            
            datosNeXO['f08_hojas_recibidas']            =   "0";
            datosNeXO['f08_observaciones_i']            =   "0";
            datosNeXO['f01_hojas_recibidas']            =   "0";
            datosNeXO['f01_observaciones_i']            =   "0";            
            datosNeXO['INT_RL_FEC_NACIMIENTO']          =   paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD_DESCRIPCION']      =   document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
            datosNeXO['INT_AC_MACRO_ID']                =   parseInt(paramForm.INT_AC_MACRO_ID);
            datosNeXO['INT_DISTRITO']                   =   paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito_desc']              =   paramForm.f01_distrito_desc;
            datosNeXO['f01_nit_rep'] = paramForm.f01_nit_rep;
            datosNeXO['f01_piso_rep'] = paramForm.f01_piso_rep;
            datosNeXO['f01_bloque_rep'] = paramForm.f01_bloque_rep;
            datosNeXO['f01_genero_rep'] = paramForm.f01_genero_rep;
            datosNeXO['f01_numero_rep'] = paramForm.f01_numero_rep;
            datosNeXO['f01_celular_rep'] = paramForm.f01_celular_rep;
            datosNeXO['f01_edificio_rep'] = paramForm.f01_edificio_rep;
            datosNeXO['f01_telefono_rep'] = paramForm.f01_telefono_rep;
            datosNeXO['f01_tipo_via_rep'] = paramForm.f01_tipo_via_rep;
            datosNeXO['f01_via_rep'] = paramForm.f01_via_rep;
            datosNeXO['f01_cuenta_luz_emp'] = '0';
            datosNeXO['f01_dpto_of_loc_rep'] = paramForm.f01_dpto_of_loc_rep;
            datosNeXO['f01_estado_civil_rep'] = paramForm.f01_estado_civil_rep;
            datosNeXO['f01_nac_rep'] = paramForm.f01_nac_rep;
            datosNeXO['f01_fecha_nac_rep'] = paramForm.f01_fecha_nac_rep;
            datosNeXO['f01_dir_det_rep'] = paramForm.f01_dir_det_rep;
            datosNeXO['f01_idzona_rl_rep'] = paramForm.f01_idzona_rl_rep;
            datosNeXO['f01_edificio_emp'] = paramForm.f01_edificio_emp;
            datosNeXO['f01_id_zona_emp'] = paramForm.f01_id_zona_emp;
            datosNeXO['f01_bloque_emp'] = paramForm.f01_bloque_emp;
            datosNeXO['f01_piso_emp'] = paramForm.f01_piso_emp;
            datosNeXO['f01_dpto_of_loc_emp'] = paramForm.f01_dpto_of_loc_emp;
            datosNeXO['f01_dir_det_emp'] = paramForm.f01_dir_det_emp;
            //DATOS FALTANTES DEL CONTRIBUYENTE - REPRESENTANTE LEGAL
            datosNeXO['f01_macro_des']              =   paramForm.f01_macro_des;
            datosNeXO['INT_ZONA']                   =   paramForm.INT_ZONA;
            datosNeXO['INT_VIA']                    =   paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA']             =   paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_NUM']                    =   paramForm.INT_NUM;
            datosNeXO['INT_EDIF']                   =   paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE']                 =   paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO']                   =   paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP']                =   paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET']                =   paramForm.INT_DIR_DET;
            datosNeXO['f01_tipoZona_act'] = paramForm.f01_tipoZona_act;
            //DATOS INICIALES PERSONA JURIDICA
            datosNeXO['INT_RL_FEC_EMISION_DOCUMENTO']    =  paramForm.INT_RL_FEC_EMISION_DOCUMENTO;
            datosNeXO['f01_num_pod_leg']                 =  paramForm.f01_num_pod_leg;
            datosNeXO['INT_NACIONALIDAD']                =  paramForm.INT_NACIONALIDAD;
            datosNeXO['INT_RL_FEC_NACIMIENTO']           =  paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['f01_ges_vig_pod']                 =  paramForm.f01_ges_vig_pod;
            datosNeXO['f01_num_not']                     =  paramForm.f01_num_notaria;          
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO']            =   paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA']             =   paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA']                =   paramForm.INT_ID_ZONA;         
            datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION']   =  paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
            datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION']    =  paramForm.INT_CAT_AGRUPADA_DESCRIPCION;
            datosNeXO['INT_TIP_VIA']                     =  paramForm.INT_TIP_VIA;
            datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
            datosNeXO['INT_AC_direccionImagenmapa']   =  paramForm.INT_AC_direccionImagenmapa;
            datosNeXO['INT_RL_NUM_DOCUMENTO']=paramForm.INT_RL_NUM_DOCUMENTO;
            datosNeXO['INT_RL_FECHA_NAC']=paramForm.INT_RL_FECHA_NAC;
            datosNeXO['INT_ZONA_DESC']=paramForm.INT_ZONA_DESC;
            datosNeXO['f01_macro_des']=paramForm.f01_macro_des;
            datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['montoDeuda'] = paramForm.montoDeuda;
            var datoObjectdj = [];
            var decjuradaN = new Object();
            if ($rootScope.decJuradaJuridico) {
                decjuradaN.url = $rootScope.decJuradaJuridico;
            } else{
                decjuradaN.url = $scope.datos.declaracion_jurada;
            };
            decjuradaN.campo = 'Declaración Jurada Juridico';
            decjuradaN.nombre = 'DECLARACIÓN JURADA';
            datoObjectdj[0] = decjuradaN;
            datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos.concat(decjuradaN);
            datosNeXO['File_Publicidad'] = $scope.datos.fileArchivosPublicidad;
            //datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos;
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_poder_representante'] = paramForm.f01_poder_representante;
            datosNeXO['f01_test_cons_sociedad_j'] = paramForm.f01_test_cons_sociedad_j;
            datosNeXO['file_num_ident'] = paramForm.file_num_ident;
            datosNeXO['file_fund_emp'] = paramForm.file_fund_emp;
            datosNeXO['file_reg_comer'] = paramForm.file_reg_comer;
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            datosNeXO['f01_actividad_desarrollada']     =   "";           
            /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
            datosNeXO['f01_tip_act']                    =   'SU';
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            datosNeXO['f01_idCodigoZona'] = paramForm.f01_idCodigoZona;
            //PAGO ADELANTADO
            datosNeXO['pago_adelantado'] =  $scope.pago_adelantado;
            datosNeXO['nro_ges'] =  paramForm.nro_ges;  
        }         
        if(datosNeXO['f01_requisitos_tecnicos'] == null){
            datosNeXO['f01_requisitos_tecnicos'] =[];
        } 
        if(paramForm.rdTipoTramite1 == "NUEVO" || paramForm.rdTipoTramite1 == 'NUEVO'){
            datosNeXO['sw_publicidad']      =  "CP" ;
            datosNeXO['swpublicidad']      =  "CP" ;
        }if(paramForm.rdTipoTramite1 == "RENOVACION" || paramForm.rdTipoTramite1 == 'RENOVACION'){
            datosNeXO['sw_publicidad']      =  "SP" ;
            datosNeXO['swpublicidad']      =  "SP" ;
        }        
        datosNeXO['publicidad']                 =   paramForm.publicidad;
        datosNeXO['publicidad_grilla']          =   paramForm.publicidad_grilla;
        datosNeXO['g_tipo']                     =   "AE-LINEA";
        datosNeXO['g_fecha']                    =   fechactual;
        datosNeXO['g_origen']                   =   "IGOB247";
        datosNeXO['licencia_multiple'] = paramForm.licenciam;
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
        //DATOS DE LA ACTIVIDAD ECONOMICA - NO ESTAN REGISTRADAS DE MANERA LOCAL
        if($scope.dataGenesisCidadano && $scope.formDatosAE){
            if($scope.dataGenesisCidadano.length > 0){
                datosNeXO['INT_PMC']                    = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_AE_IDCODIGO_ZONA']       = "21";
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }        
        var sMacroR         =   datosNeXO['f01_macro_des'];
        //var sDistritoR      =   datosNeXO['INT_DISTRITO'];
        var sZonaR          =   datosNeXO['INT_ZONA'];
        var sMacroRDesc     =   datosNeXO['f01_macro_des'];
        //var sDistritoRDesc  =   datosNeXO['f01_distrito_desc'];
        var sZonaRDesc      =   datosNeXO['INT_ZONA_DESC'];
        /*VERIFICAR DATOS - CATEGORIA AGRUPADA - ID MACRODISTRITO*/
        var iCategoriaAgrupada      =   datosNeXO['INT_AC_MACRO_ID'];
        var iMacrodistrito          =   datosNeXO['INT_ID_CAT_AGRUPADA'];
        if(iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != ""){
            //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
                var sIdTramite = $rootScope.tramiteId;
                var datosSerializados = JSON.stringify(datosNeXO);
                archivo1 = "";
                //CREAR CASO AE LINEA
                //REQUISITOS PARA CREAR LA ACTIVIDAD ECONOMICA INT_AC_MACRO_ID, INT_ID_CAT_AGRUPADA
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
                            datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                            datosIF2 = datosIF[1];
                            datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                            $scope.nrotramitec = datosIF[0];
                            sessionService.set('NROTRAMITE', datosIF[0]);
                            sessionService.set('NROTRAMITEID', datosIF[1]);
                            sessionService.set('IDPROCESO', datosIF[6]);
                            var idTramite1 =  sessionService.get('NROTRAMITEID') ;
                            datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDCIUDADANO') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
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
            /*}else{
                swal('', "Complete sus Datos de Direccion", 'warning');
            }*/
        }else{
            swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
        }
    };

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
            swal('', 'Registro no modificado', 'error');
            $.unblockUI(); 
        }
    };

    /*SUBIR REQUISITOS 2018*/
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
            $scope.almacenarRequisitos(rMisDocs,idFiles);
            $scope.adicionarArrayDeRequisitos(sobj,idFile);
        }
    };

    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.fileAdjuntosPublicidad = {};
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
        if ($scope.docPubNuevo.length > 0) {
            angular.forEach($scope.docPubNuevo, function(doc, pos) {
                if(doc.idP+''+doc.resid == idFile){
                    descDoc = doc.desNom;
                }
            })
        }
        var imagenNueva = aArch.files[0].name.split('.');
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        var sDirTramite = sessionService.get('IDTRAMITE');
        if ( aArch.files[0].size > 500000 &&  aArch.files[0].size <= 15000000) {
            if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                var filecompress = compressImage( aArch.files[0]).then(function(respuestaFile){
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[1];
                    nombreFileN = descDoc + '_'+fechaNueva+'.'+tipoFile;
                });
            } 
        } 
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
        var adatafile   =   {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
        $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        var swp = 0;
        var idp = 0;
        for (var i = 0; i < $scope.docArray.length && swp == 0; i++) {
            if ($scope.docArray[i].resid == idFile) {
                idp = $scope.docArray[i].idnro;
                swp = 1;
            }
            else{
                idp = 4;
            };
        };
        if (idp == 4) {
            var uploadUrlP = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
            var myJSONP = '{ "url":"' + uploadUrlP + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
            $scope.fileAdjuntosPublicidad[aArch.name] = JSON.parse(myJSONP);
            $scope.clonarRequisitosPublicidad($scope.fileAdjuntosPublicidad);
        };
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

    $scope.clonarRequisitosPublicidad = function(aRequArchivosP){
        var i = 0;
        $scope.File_Publicidad = {};
        datoObjectFilesP = [];
        var longdato = 0;
        angular.forEach(aRequArchivosP, function(archivo, key) {
            datoObjectFilesP[i] = archivo;
            i = i +1;
        });
        $scope.datos.fileArchivosPublicidad = datoObjectFilesP;
    }

    /*$scope.ultimoArrayAdjunto = function(){
        $scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        datoObjectFile1 = new Object(); 
        datoObjectFile2 = new Object();
        datoObjectFile3 = new Object(); 
        datoObjectFile4 = new Object();
        datoObjectFile5 = new Object(); 
        datoObjectFile6 = new Object();
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[0] = datoObjectFile1;
        datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[1] = datoObjectFile2;
        datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
        datoObjectFile3.campo = 'Poder de Representación Legal';
        datoObjectFile3.nombre = 'Poder de Representación Legal';
        datoObjectFiles_ci[2] = datoObjectFile3;
        datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
        datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
        datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
        datoObjectFiles_ci[3] = datoObjectFile4;
        datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
        datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
        datoObjectFiles_ci[4] = datoObjectFile5;
        datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
        datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
        datoObjectFiles_ci[5] = datoObjectFile6;
        $scope.datos.FILE_CI = datoObjectFiles_ci;
        $scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile4 = new Object();
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + nombre_mapa + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile4.nombre = 'CROQUIS DE UBICACIÓN DE LA ACTIVIDAD ECONÓMICA';
        datoObjectFiles[0] = datoObjectFile4;
        $scope.datos.FILE_MAPA = datoObjectFiles;
        $rootScope.FileAdjuntos =  $scope.datos.FILE_CI.concat($scope.datos.FILE_MAPA,$scope.datos.fileArchivosAd);
    }*/
    $scope.ultimoArrayAdjunto = function(){
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
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                angular.forEach($scope.docArray, function(doc, pos) {
                    if(doc.resid == idFiles[key]){
                        descDoc = doc.desNom;
                    }
                })
                if ($scope.docPubNuevo.length > 0) {
                    angular.forEach($scope.docPubNuevo, function(doc, pos) {
                        if(doc.idP+''+doc.resid == idFiles[key]){
                            descDoc = doc.desNom;
                        }
                    })
                }
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
                if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile){
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[1];
                            var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                        });
                        $.unblockUI();
                    }else{
                        if (imagenNueva[1] == 'pdf' ||  imagenNueva[1] == 'docx' ||  imagenNueva[1] == 'docxlm') {
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
                        if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
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
      //INICIAR DOCUMENTOS DE IDENTIDAD
        angular.forEach($scope.docArray, function(value, key) {
        //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
            if(value.idnro == 1){
                document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Anverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianverso  = $scope.datos.FILE_FOTOCOPIA_CI;
                if(scianverso == '' || scianverso == 'undefined' || scianverso == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = scianverso;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + scianverso + "?app_name=todoangular";
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
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + scianversor + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            if(value.idnro == 6){
                document.getElementById('txt_f01_upload'+value.resid).value = 'FUNDEMPRESA o Matricula de Comercio.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var sfundempresa  = $scope.datos.file_fund_emp;
                if(sfundempresa == '' || sfundempresa == 'undefined' || sfundempresa == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = sfundempresa;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + sfundempresa + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            if(value.idnro == 7){
                document.getElementById('txt_f01_upload'+value.resid).value = 'Poder de Representación Legal.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var spoderrep  = $scope.datos.f01_poder_representante;
                if(spoderrep == '' || spoderrep == 'undefined' || spoderrep == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = spoderrep;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + spoderrep + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            if(value.idnro == 8){
                document.getElementById('txt_f01_upload'+value.resid).value = 'Testimonio de Constitución de Sociedad.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var stestimonio  = $scope.datos.f01_test_cons_sociedad_j;
                if(stestimonio == '' || stestimonio == 'undefined' || stestimonio == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = stestimonio;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + stestimonio + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
                var doctes = $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
            if(value.idnro == 9){
                document.getElementById('txt_f01_upload'+value.resid).value = 'NIT o inscripción al Régimen Simplificado.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var snitidem  = $scope.datos.file_num_ident;
                if(snitidem == '' || snitidem == 'undefined' || snitidem == undefined){
                    document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                }else{
                    document.getElementById('txt_f01_upload'+value.resid).value = snitidem;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + snitidem + "?app_name=todoangular";
                $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
            }
        //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
            if(value.idnro == 3 || value.idnro == 4){
                var sviae  = $scope.datos.rdTipoTramite1;
                if(sviae  == 'RENOVACION'){//sin viae
                    $scope.docArray[key].estado = false;
                }else{
                    $scope.docArray[key].estado = false;
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
        //zonasegura sinmostrar adjuntos
        /*if(value.idnro == 12){
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
        }*/
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
        }
        //zonasegura sinmostrar adjuntos        
            var stipotramite = $scope.datos.rdTipoTramite;
            if(stipotramite){
                if(value.idnro == 16 || value.idnro == 12 || value.idnro == 21 || value.idnro == 22){
                    switch (stipotramite) {
                        /*case 'RENOVACION':
                            $scope.docArray[key].estado = true;
                        break;*/
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
            //////////////////////////////////////////////////////////
        });
        //REQUISITOS DOCUMENTALES SOLO PARA PUBLICIDAD
        if ($scope.datos.rdTipoTramite1 == 'NUEVO') {
            datoObjectFinalV = [];
            var k = 0;
            for(j = 0; j < $scope.docArray.length; j++){
                if ($scope.docArray[j].idnro == 4) {
                    datoObjectv = new Object();
                    datoObjectv.idP = ($scope.pos+1);
                    datoObjectv.resid = $scope.docArray[j].resid;
                    datoObjectv.idnro = $scope.docArray[j].idnro;
                    datoObjectv.resvalor = $scope.docArray[j].resvalor;
                    datoObjectv.nomcampo = $scope.docArray[j].nomcampo;
                    datoObjectv.estado   = true;
                    datoObjectv.desNom = $scope.docArray[j].desNom;
                    datoObjectFinalV[k] = datoObjectv;
                    k++;
                }
            }
            $scope.docArrayPub = datoObjectFinalV;
        }
        if(!$scope.$$phase) {
            $scope.$apply();
        }
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
        $scope.fileAdjuntosPublicidad = {};
        if(data.sArrayFileArRequisitos){
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function(){
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_"+key).val(value.campo);
                    deferred.resolve(data);
                });
                $scope.validarRequisitosForm();

            },3000);
        }
        if(data.sArrayFileArPublicidad){
            $scope.fileAdjuntosPublicidad = data.sArrayFileArPublicidad;
            setTimeout(function(){
                angular.forEach(data.sArrayFileArPublicidad, function(value, key) {
                    $("#txt_"+key).val(value.campo);
                });
                $scope.validarRequisitosForm();
            },3500);
        }
        return deferred.promise;
    }

       /*REQUISITOS2018*/
    $scope.getRequisitosFormulario = function(sidcategoria, stipoper){
        if(stipoper == 'JURIDICO'){
            stipoper = 'J';
        }
        if($scope.datos){
            var idCategoria = sidcategoria;
            var persona = 'J';
            if(typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = sidcategoria;
                ndCategoria.stipopersona = 'J';
                ndCategoria.stipo = 'EMISION';
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
            sconsulta   =   sconsulta + '{"id":' + licenciamul[i].f01_categoria_agrupada + "},";
        }
        sconsulta    =   sconsulta.substring(0,sconsulta.length-1);
        sconsulta   =   sconsulta + ']';
        aidCategoria    =   sconsulta;
        // texto.substring(0,texto.length-1);
        if($scope.datos){
            var aidCategoria = aidCategoria;
            var persona = 'J';
            if(typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona!= null){
                var ndCategoria = new aeRequisitosDoc2018array();
                ndCategoria.asidcategoria = aidCategoria;
                ndCategoria.astipopersona = 'J';
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
        }else{
            alert("Error ");
        }
    };
    /*TERMINA REQUISITOS 2018*/

    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso){
        var sdataArchivo    = datosCaso[0].sp_pmfunction_crearcaso_linea;
        var aDatosCaso      = sdataArchivo.split(',');
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
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
                //console.log("REGISTRO IMAGEN CORRECTAMENTE CORRECTO");
            } else {
                $.unblockUI();
                swal(resultadoApi.error.message);
            }
        });
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
    /*$scope.initMap = function() {
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
    }*/

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
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
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
       /* DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
        });*/
    };

    $scope.capturarImagen = function(){
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        //var latitud = $rootScope.laaa;
        //var longitud = $rootScope.looo;

        var latitud =  $scope.datos.INT_AC_latitud;
        var longitud = $scope.datos.INT_AC_longitud;
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
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

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function (data) {       
        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;
        data.docAdPublicidad = $scope.docPubNuevo;
        data.sArrayFileArPublicidad = $scope.fileAdjuntosPublicidad;
        if(data.f01_tipo_lic == 26 || data.f01_tipo_lic == '26'){
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
            data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
            data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
            data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
            data.f01_num_act != "" && data.f01_num_act != null &&
            data.f01_num_act1 != "" && data.f01_num_act1 != null &&
            data.f01_casilla != "" && data.f01_casilla != null){
                if (data.rdTipoTramite1 == 'NUEVO') {
                    if (JSON.stringify(data.sArrayFileArPublicidad) != '{}') {
                        $scope.serializarInformacion(data);
                        $scope.formulario401(data);
                        $("#declaracionJ").modal("show");
                    } else{
                        swal('', "Datos obligatorios, Adjuntar publicidad y sus documentos", 'warning');
                    };
                } else{
                    $scope.serializarInformacion(data);
                    $scope.formulario401(data);
                    $("#declaracionJ").modal("show");
                };
            }
            else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
        if (data.f01_tipo_lic != 26 || data.f01_tipo_lic != '26'){
            if(data &&  data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
              //data.FILE_CI != ""  && data.FILE_CI != null &&
              //data.rdTipoTramite != "" && data.rdTipoTramite != null &&
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
              data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
              data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
              data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
              data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
              data.f01_num_act != "" && data.f01_num_act != null &&
              data.f01_num_act1 != "" && data.f01_num_act1 != null &&
              data.f01_casilla != "" && data.f01_casilla != null){
              //$rootScope.validacionRequisitosTec();
                if (data.rdTipoTramite1 == 'NUEVO') {
                    if (JSON.stringify(data.sArrayFileArPublicidad) != '{}') {
                        $scope.serializarInformacion(data);
                        $scope.formulario401(data);
                        $("#declaracionJ").modal("show");
                    } else{
                        swal('', "Datos obligatorios, Adjuntar publicidad y sus documentos", 'warning');
                    };
                } else{
                    $scope.serializarInformacion(data);
                    $scope.formulario401(data);
                    $("#declaracionJ").modal("show");
                };
            }else{
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
    }

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
        if($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J'){
            datos.f01_tipo_per_desc = 'JURIDICO';
            urlFormularioN  =   "../../docs/AE_Formulario_401_343J.html";
            $( "#msgformularioJ" ).load(urlFormularioN, function(data) {
                stringFormulario40  =   data;
                datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                datos.f01_seg_nom_prop = ((typeof(datos.f01_seg_nom_prop) == 'undefined' || datos.f01_seg_nom_prop == null) ? "" : datos.f01_seg_nom_prop);
                datos.f01_ape_pat_rep = ((typeof(datos.f01_ape_pat_rep) == 'undefined' || datos.f01_ape_pat_rep == null) ? "" : datos.f01_ape_pat_rep);
                datos.f01_ape_mat_rep = ((typeof(datos.f01_ape_mat_rep) == 'undefined' || datos.f01_ape_mat_rep == null) ? "" : datos.f01_ape_mat_rep);
                datos.f01_ape_cas_rep = ((typeof(datos.f01_ape_cas_rep) == 'undefined' || datos.f01_ape_cas_rep == null) ? "" : datos.f01_ape_cas_rep);
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
                datos.f01_tipo_lic_descrip = ((typeof(datos.f01_tipo_lic_descrip) == 'undefined' || datos.f01_tipo_lic_descrip == null) ? "" : datos.f01_tipo_lic_descrip);
                datos.f01_categoria_agrupada_descrip = ((typeof(datos.f01_categoria_agrupada_descrip) == 'undefined' || datos.f01_categoria_agrupada_descrip == null) ? "" : datos.f01_categoria_agrupada_descrip);
                datos.f01_categoria_agrupada_descripcion = ((typeof(datos.f01_categoria_agrupada_descripcion) == 'undefined' || datos.f01_categoria_agrupada_descripcion == null) ? "" : datos.f01_categoria_agrupada_descripcion);
                if(datos.f01_tipo_lic != '26' || datos.f01_tipo_lic != 26){
                    //$scope.GetValueLicencia();
                    //$scope.GetValueCategoriaAgrupada();
                    //$scope.GetValueCategoria();
                }
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
                '<td>SUPERFICIE</td>';
                for (i = 0; i < datos.publicidad.length; i++){
                    pubMod = pubMod +'<tr>' +
                    '<td>' + datos.publicidad[i].id + '</td>'+
                    '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>'+
                    '<td>' + datos.publicidad[i].INT_CARA + '</td>'+
                    //'<td>' + datos.publicidad[i].INT_NRO_CARA + '</td>'+
                    '<td>' + datos.publicidad[i].INT_DESC + '</td>'+
                    '<td>' + datos.publicidad[i].INT_ANCHO + '</td>'+
                    '<td>' + datos.publicidad[i].INT_ALTO + '</td>'+
                    '<td>' + datos.publicidad[i].INT_SUP + '</td></tr>';
                }
                //CABECERA
                stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                stringFormulario40  =   stringFormulario40.replace("#f01_nro_orden#", datos.f01_nro_orden);
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_form#", '401');
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_per_desc#", datos.f01_tipo_per_desc);
                //DATOS DEL REPRESENTANTE LEGAL
                stringFormulario40  =   stringFormulario40.replace("#f01_pri_nom_rep#", datos.f01_pri_nom_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_seg_nom_rep#", datos.f01_seg_nom_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_ter_nom_rep#", datos.f01_ter_nom_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_pat_rep#", datos.f01_ape_pat_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_mat_rep#", datos.f01_ape_mat_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_ape_cas_rep#", datos.f01_ape_cas_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_doc_rep#", datos.f01_tip_doc_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_doc_rep#", datos.f01_num_doc_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_expedido_rep#", datos.f01_expedido_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_viarep#", datos.f01_tipo_viarep);
                stringFormulario40  =   stringFormulario40.replace("#f01_zon_rep_valor#", datos.f01_zon_rep_valor);
                stringFormulario40  =   stringFormulario40.replace("#f01_nom_via_rep#", datos.f01_nom_via_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_rep#", datos.f01_num_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_telef_rep#", datos.f01_telef_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_cel_rep#", datos.f01_cel_rep);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_pod_leg#", datos.f01_num_pod_leg);
                stringFormulario40  =   stringFormulario40.replace("#f01_ges_vig_pod#", datos.f01_ges_vig_pod);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_notaria#", datos.f01_num_notaria);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_num_doc_per_jur);
                stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
                stringFormulario40  =   stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
                //DATOS DE LA ACTIVIDAD ECONOMICA
                stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc.toUpperCase());
                stringFormulario40  =   stringFormulario40.replace("#f01_de_hor#", datos.f01_de_hor);
                stringFormulario40  =   stringFormulario40.replace("#f01_a_hor#", datos.f01_a_hor);
                stringFormulario40  =   stringFormulario40.replace("#f01_sup#", datos.f01_sup);
                stringFormulario40  =   stringFormulario40.replace("#f01_estab_es#", datos.f01_estab_es);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_act1#", datos.f01_tip_act1);
                stringFormulario40  =   stringFormulario40.replace("#publicidad_grilla#", pubMod);
                stringFormulario40  =   stringFormulario40.replace("#f01_idCodigoZona#", datos.f01_idCodigoZona);
                 //pago adelantado
                var tablapago = '';
                if(datos.pago_adelantado == 'undefined' || datos.pago_adelantado == undefined  || datos.pago_adelantado == 'NO'){
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", 'SIN PAGO ADELANTADO');
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", 'NINGUNA');
                    stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                }else{
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", datos.pago_adelantado);
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", datos.nro_ges);
                    if (datos.montoDeuda) {
                        console.log('datos.montoDeuda     ',datos.montoDeuda);
                        var lstDeuda = datos.montoDeuda;
                        tablapago = '<table id="tablaDe" class="table table-striped table-bordered"><tr>'+
                            '<th>Nº</th>'+
                            '<th>GESTIÓN</th>'+
                            '<th>MONTO ACT. ECO.</th>'+
                            '<th>MONTO ELEM. PUB.</th>'+
                            '<th>DESCUENTO EN %</th>'+
                            '<th>MONTO SIN DESC.</th>'+
                            '<th>DESCUENTO</th>'+
                            '<th>MONTO TOTAL</th>'+
                            '</tr>';
                            for (i = 0; i < lstDeuda.length; i++){
                                tablapago = tablapago +'<tr>' +
                                '<td>' + (i+1) + '</td>'+
                                '<td>' + lstDeuda[i].gestion + '</td>'+
                                '<td>' + lstDeuda[i].monto_ae + '</td>'+
                                '<td>' + lstDeuda[i].monto_viae + '</td>'+
                                '<td>' + lstDeuda[i].descuento + '</td>'+
                                '<td>' + lstDeuda[i].monto_total + '</td>'+
                                '<td>' + lstDeuda[i].monto_total_con_descuento + '</td>'+
                                '<td>' + parseFloat(lstDeuda[i].monto_total - lstDeuda[i].monto_total_con_descuento) + '</td>'+'</tr>';
                            }
                        tablapago = tablapago + '</table>';
                        stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                    }
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
                var multi = '';
                if (datos.f01_tipo_lic_sierra == 26 || datos.f01_tipo_lic_sierra == '26') {
                    stringFormulario40  =   stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descrip);
                    multi = '<tr><td>NRO</td>'+
                    '<td>TIPO DE LICENCIA</td>' +
                    '<td>TIPO DE CATEGORÍA</td>'+
                    '<td>TIPO DE ACTIVIDAD</td>';
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
                if (datos.f01_num_act_id == '0' || datos.f01_num_act_id == 0) {
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act_n);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act);
                };
                if (datos.chkzonasegura == '' || datos.chkzonasegura == 'undefined' || datos.chkzonasegura == undefined) {
                    stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '');
                } else{
                    if (datos.chkzonasegura == 'ZONASEGURA') {
                        stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> SI');
                    } else{
                        stringFormulario40  =   stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> NO');
                    };
                };
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                $scope.msgformularioJ = stringFormulario40;
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
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona =='J'){
            dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
            dataForm['f01_tipo_form'] = '401';
            dataForm['f01_raz_soc_per_jur'] = data.f01_raz_soc_per_jur;
            dataForm['f01_num_doc_per_jur'] = data.f01_num_doc_per_jur;
            dataForm['f01_pri_nom_rep'] = data.f01_pri_nom_rep;
            dataForm['f01_seg_nom_rep'] = data.f01_seg_nom_rep;
            dataForm['f01_ape_pat_rep'] = data.f01_ape_pat_rep;
            dataForm['f01_ape_mat_rep'] = data.f01_ape_mat_rep;
            dataForm['f01_ape_cas_rep'] = data.f01_ape_cas_rep;
            dataForm['f01_tip_doc_rep'] = data.f01_tip_doc_rep;
            dataForm['f01_num_doc_rep'] = data.f01_num_doc_rep;
            dataForm['f01_expedido_rep'] = data.f01_expedido_rep;
            dataForm['f01_num_pod_leg'] = data.f01_num_pod_leg;
            dataForm['f01_num_notaria'] = data.f01_num_notaria;
            dataForm['f01_ges_vig_pod'] = data.f01_ges_vig_pod;
            dataForm['f01_nit'] = data.f01_nit;
            dataForm['f01_zona_rep'] = data.f01_zona_rep;
            dataForm['f01_zon_rep_valor']  =  data.f01_zon_rep_valor;
            dataForm['f01_num_prop'] = data.f01_num_prop;
            dataForm['f01_telef_rep'] = data.f01_telef_rep;
            dataForm['f01_tipo_viarep'] = data.f01_tipo_viarep;
            dataForm['f01_nom_via_rep'] = data.f01_nom_via_rep;
            dataForm['f01_num_rep'] = data.f01_num_rep;
            dataForm['f01_cel_rep'] = data.f01_cel_rep;
            dataForm['f01_cel_prop'] = data.f01_cel_prop;
            dataForm['f01_categoria_descrip'] = data.f01_categoria_agrupada_descripcion;
            dataForm['f01_zona_act_descrip'] = data.f01_zona_act_descrip;
            dataForm['f01_tip_via_act'] = data.f01_tip_via_act;
            dataForm['f01_num_act_id'] = data.f01_num_act_id;
            if(data.f01_num_act_id == '0' || data.f01_num_act_id == 0){
                dataForm['f01_num_act'] = data.f01_num_act_n.toUpperCase();
            }else{
                dataForm['f01_num_act'] = data.f01_num_act;
            }
            if (data.chkzonasegura == '' || data.chkzonasegura == 'undefined' || data.chkzonasegura == undefined) {
                dataForm['zonaSegura'] = '';
            } else{
                if (datos.chkzonasegura == 'ZONASEGURA') {
                    dataForm['zonaSegura'] = '<label>Zona Segura:</label> SI';
                } else{
                    dataForm['zonaSegura'] = '<label>Zona Segura:</label> NO';
                };
            };
            dataForm['f01_num_act1'] = data.f01_num_act1;
            dataForm['f01_sup'] = data.f01_sup;
            dataForm['f01_edificio_act'] = data.f01_edificio_act;
            dataForm['f01_bloque_act'] = data.f01_bloque_act;
            dataForm['f01_piso_act'] = data.f01_piso_act;
            dataForm['f01_dpto_of_loc'] = data.f01_dpto_of_loc;
            dataForm['f01_tel_act1'] = data.f01_tel_act1;
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
            dataForm['f01_macro_act_descrip'] = data.f01_macro_act_descrip;
            dataForm['f01_dist_act'] = data.f01_dist_act;
            dataForm['f01_estab_es'] = data.f01_estab_es;
            dataForm['f01_sup'] = data.f01_sup;
            dataForm['f01_num_pmc'] = data.f01_num_pmc;
            dataForm['f01_nro_orden'] = data.f01_nro_orden;
            //pago adelantado
            var tablapago = '';
            if(data.pago_adelantado == 'undefined' || data.pago_adelantado == undefined  || data.pago_adelantado == 'NO'){
                dataForm['pago_adelantado'] = 'SIN PAGO ADELANTADO';
                dataForm['nro_ges'] = 'NINGUNA';
                dataForm['tablaP'] = tablapago;
            }else{
                dataForm['pago_adelantado'] = data.pago_adelantado;
                dataForm['nro_ges'] = data.nro_ges;
                if (data.montoDeuda) {
                    console.log('datos.montoDeuda     ',data.montoDeuda);
                    var lstDeuda = data.montoDeuda;
                    tablapago = '<table border="0.5" class="table table-striped table-bordered"><tr>'+
                        '<th>Nº</th>'+
                        '<th>GESTIÓN</th>'+
                        '<th>MONTO ACT. ECO.</th>'+
                        '<th>MONTO ELEM. PUB.</th>'+
                        '<th>DESCUENTO EN %</th>'+
                        '<th>MONTO SIN DESC.</th>'+
                        '<th>DESCUENTO</th>'+
                        '<th>MONTO TOTAL</th>'+
                        '</tr>';
                        for (i = 0; i < lstDeuda.length; i++){
                            tablapago = tablapago +'<tr>' +
                            '<td>' + (i+1) + '</td>'+
                            '<td>' + lstDeuda[i].gestion + '</td>'+
                            '<td>' + lstDeuda[i].monto_ae + '</td>'+
                            '<td>' + lstDeuda[i].monto_viae + '</td>'+
                            '<td>' + lstDeuda[i].descuento + '</td>'+
                            '<td>' + lstDeuda[i].monto_total + '</td>'+
                            '<td>' + lstDeuda[i].monto_total_con_descuento + '</td>'+
                            '<td>' + parseFloat(lstDeuda[i].monto_total - lstDeuda[i].monto_total_con_descuento) + '</td>'+'</tr>';
                        }
                    tablapago = tablapago + '</table>';
                    dataForm['tablaP'] = tablapago;
                }
            }
            dataForm['nro_ges'] = data.nro_ges;
            if(data.f01_tip_act =='MA' || data.f01_tip_act =='MATRI'){
                dataForm['f01_tip_act'] =  'MATRIZ';
            }
            if(data.f01_tip_act =='SU' || data.f01_tip_act =='SUCUR'){
                dataForm['f01_tip_act'] = 'SUCURSAL';
            }
            var multi = '';
            if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') {
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
                    '<td>' + data.publicidad[i].INT_ANCHO + '</td>'+
                    '<td>' + data.publicidad[i].INT_ALTO + '</td>'+
                    '<td>' + data.publicidad[i].INT_SUP + '</td></tr>';
            }
            pubMod = pubMod +'</table>';
            dataForm['publicidad_grilla'] = pubMod;
            dataForm['fecha_sist'] = sfecha;
            dataForm['fecha_sist2'] = sfecha;
            dataForm['usuario'] = 'IGOB247 CIUDADANO';
            dataForm['f01_idCodigoZona'] = data.f01_idCodigoZona;
            dataForm['hora_sist'] = sHora;
            $rootScope.datosForm401 = dataForm;
            $rootScope.datosEnv = data;
        }
    }

    $scope.GetValueTipoSociedad = function(){
         var e = document.getElementById("f01_tipo_sociedad");
        $scope.datos.f01_tipo_sociedad_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueTipoRespaldo = function(){
         var e = document.getElementById("f01_tipo_respaldo");
        $scope.datos.f01_tipo_respaldo_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.tipoSociedad = function(){
        $.blockUI();
        try{
            var tipoSoc = '{"xclasifica":"2002"}';
            var tipoSociedad = new reglasnegocioSierra();
            tipoSociedad.identificador = 'SERVICIO_VALLE-PAR-2521';
            tipoSociedad.parametros = tipoSoc;
            tipoSociedad.llamarregla_sierra(function(responseActDes){
                var lstSoc =  JSON.parse(responseActDes);
                if(lstSoc.length > 0){
                    $scope.datosSociedad = lstSoc;
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
            $.unblockUI();
        }
    }

    $scope.tipoDocumentoRespaldo = function(){
        $.blockUI();
        try{
            var tipoSoc = '{"xclasifica":"2010"}';
            var tipoSociedad = new reglasnegocioSierra();
            tipoSociedad.identificador = 'SERVICIO_VALLE-PAR-2521';
            tipoSociedad.parametros = tipoSoc;
            tipoSociedad.llamarregla_sierra(function(responseActDes){
                var lstSoc =  JSON.parse(responseActDes);
                if(lstSoc.length > 0){
                    $scope.datosRespaldo = lstSoc;
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
            $.unblockUI();
        }
    }

    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioJ').html($scope.msgformularioJ);
    }
    
    $scope.cargarDatosJuridicoSierra = function(){
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.sTipoPersona=="JURIDICO" || $scope.sTipoPersona=="J"){  
            $scope.divJuridico = "mostrar";
            if(sessionService.get('ESTADO') == 'NO'){
                $scope.botones = "mostrar";            
            } 
            if(sessionService.get('ESTADO') == 'SI'){
                $scope.botones = "null";
            }
        } 
        //$scope.macrodistritos();
        $scope.getCaptchasXX();
        //$scope.lscategoria();
        //$scope.lssubcategoria();
        //$scope.lsCaracteristica();
        //$scope.listadoDatosLicencia();
        //$scope.actividadDesarrolladaM();
        if ($scope.datos.f01_categoria == "") {
            $scope.catactividadDesarrollada();
        } else{};
    };

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

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
        console.log('dataaaa    ',data);
        $scope.catactividadDesarrollada();
        $scope.tipoSociedad();
        //$scope.macrodistritos();
        $scope.tipoDocumentoRespaldo();
        $scope.multiple = [];
        /*if ((data.INT_AC_latitud == 'undefined' && data.INT_AC_longitud == 'undefined') || (data.INT_AC_latitud == undefined && data.INT_AC_longitud == undefined) || (data.INT_AC_latitud == '' && data.INT_AC_longitud == '')) {
        } else{
            $scope.open_map_ae2(data.INT_AC_latitud, data.INT_AC_longitud);
        };*/
        if (data.f01_zona_act == undefined || data.f01_zona_act == 'undefined' || data.f01_zona_act == null || data.f01_zona_act == '') {
        } else{
            $scope.datos.f01_macro_act = data.f01_macro_act;
            document.getElementById('f01_macro_act').value = $scope.datos.f01_macro_act;
            $scope.datos.f01_zona_act = data.f01_zona_act;
            $scope.distritoZonas($scope.datos.f01_macro_act);
        };
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada_sierra);
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc  =   ((typeof(data.f01_categoria_agrupada_sierra)  == 'undefined' || data.f01_categoria_agrupada_sierra  == null) ? '' : data.f01_categoria_agrupada_sierra);
        if(categoriaAgrupadaDesc != ''){
            $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
        }
        if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') {
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
        if (data.f01_tipo_lic_sierra == '12' || data.f01_tipo_lic_sierra == 12) {
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
        } else{
            if (data.chkzonasegura == undefined || data.chkzonasegura == 'undefined' || data.chkzonasegura == '') {
                $scope.mostrarzonasegura = false;
            } else{
                $scope.mostrarzonasegura = true;
            };
        };
        //MOSTRAR VIAE
        if(data.rdTipoTramite1 == 'NUEVO'){
            $scope.licenciaToogle4 = true;
            if (data.docAdPublicidad) {
                if (data.docAdPublicidad.length > 0) {
                    $scope.docPubNuevo = data.docAdPublicidad;
                    $scope.pos = data.docAdPublicidad.length;
                }
            } else{};
        }
        else{
            $scope.licenciaToogle4 = false;
            if (data.rdTipoTramite1 == 'RENOVACION') {
            } else{
                $scope.docPubNuevo = [];
                $scope.fileAdjuntosPublicidad = {};
                $scope.pos = 0;
            };
        }
        if (data.pago_adelantado == 'SI') {
            $scope.IsVisible = true;
            $scope.datos.montoDeuda = data.montoDeuda;
            $scope.listDeudas = $scope.datos.montoDeuda;
            $scope.tblDeudas.reload();
        } else{
            $scope.IsVisible = false;
            $scope.datos.pago_adelantado = 'NO';
        };

        /*if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            $scope.aDistritoZona = {};
            try{
                var parametros = new distritoZona();
                parametros.idMacro = data.f01_macro_act;
                parametros.obtdist(function(resultado){
                    data = JSON.parse(resultado);
                    if(data.success.length > 0){
                        $scope.aDistritoZona = data.success;
                    }else{
                        $scope.msg = "Error !!";
                    }
                });
            }catch(error){
            }
        }*/

        $scope.obtenerHora();
        $scope.obtenerFecha();
        /*if(typeof($scope.datos.INT_VIA) != 'undefined'){
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
        }*/
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
        if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else{
            if(data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26'){//verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            }else{
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequsitosDoc(data);
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

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite){
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm           =   true;
            $scope.desabilitado             =   true;
            $scope.botones                  =   null;
            $scope.only                     =   true;
        } else {
            $scope.btnGuardarForm   =   false;
            $scope.desabilitado     =   false;
            $scope.botones          =   "mostrar";
        }
        console.log('$scope.dataGenesisCidadano     ',$scope.dataGenesisCidadano);
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        console.log('datosgen   ',datosgen.contribuyente_id);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        if (JSON.stringify(datosgen) == '{}') {
            console.log('esta vacio');
        } else{
            console.log('esta lleno');
            $scope.datos.f01_id_contribuyente = datosgen.contribuyente_id;
            $scope.datos.f01_id_representante_legal_antiguo = datosgen.contribuyente.representante.contribuyente_id;
        };
        console.log('$scope.datos.f01_id_contribuyente     ',$scope.datos.f01_id_contribuyente);
        $scope.datosRepresentanteLegal();
        $.unblockUI();
        //$scope.initMap();
    });

    
    $scope.ShowPa = function(valor) {
        $scope.pago_adelantado = valor;
        if (valor == 'SI') {
            $scope.IsVisible = true;
        } else{
            $scope.IsVisible = false;
        };
    }

    $scope.calcularDeudas = function(nroges){
        console.log('para pagoooo     ',$scope.datos);
        $scope.datos.montoDeuda = [];
        var fechaP = new Date();
        var gestionP = fechaP.getFullYear();
        $scope.mensajeCiudadano = '';
        if ($scope.datos.f01_proceso == 'GEN') {
            $scope.mensajeCiudadano = ' las proximas 24 Hrs., ';
        } else{
            $scope.mensajeCiudadano = ' los proximos 5 días, ';
        };
        $scope.listDeudas = [];
        if ($scope.datos.f01_idCodigoZona == undefined || $scope.datos.f01_idCodigoZona == 'undefined' || $scope.datos.f01_idCodigoZona == null) {
            swal('', 'Seleccione nuevamente el croquis por favor  ', 'warning');
        } else{
            if ($scope.datos.nro_ges == '' || $scope.datos.nro_ges == undefined || $scope.datos.nro_ges == 'undefined') {
                $scope.totalD = 0;
            } else{
                $.blockUI();
                //$scope[name] = 'Running';
                //var deferred = $q.defer();
                var datoObject_cat = '[';
                if ($scope.datos.f01_tipo_lic_sierra == 26 || $scope.datos.f01_tipo_lic_sierra == '26') {
                    var multiservicios = $scope.datos.licenciam;
                    for(i = 0; i < multiservicios.length; i++){
                        datoObject_cat = datoObject_cat + multiservicios[i].f01_cat_agrupadamid+',';
                    }
                    console.log('datoObject_cat    ',datoObject_cat);
                    datoObject_cat = datoObject_cat.substring(0,datoObject_cat.length-1);
                }else{
                    datoObject_cat = datoObject_cat + $scope.datos.f01_categoria_agrupada_sierra;
                }
                datoObject_cat = datoObject_cat + ']';
                if ($scope.datos.rdTipoTramite1 == "NUEVO") {
                    if ($scope.datos.publicidad.length > 0) {
                        var dataPub = $scope.datos.publicidad;
                        console.log('la publicidaddddd    ',dataPub);
                        datoObject_pub = [];
                        for (k = 0; k < dataPub.length; k++) {
                            console.log('dataPub[k]    ',dataPub[k]);
                            datoObjectPublicidad = new Object();
                            datoObjectPublicidad.id_viae = dataPub[k].idPublicidad_temp;
                            datoObjectPublicidad.caras = 1;//'Z1';
                            datoObjectPublicidad.pub_superficie = dataPub[k].INT_SUP;
                            datoObjectPublicidad.tipo_letrero_id = dataPub[k].idcarac;
                            datoObjectPublicidad.caracteristica_id = dataPub[k].id_cara;
                            datoObject_pub[k] = datoObjectPublicidad;
                        };
                        idPubS = JSON.stringify(datoObject_pub);
                    } else{
                        idPubS = '[]';
                    };
                } else{
                    idPubS = '[]';
                };
                var dataDeuda = '';
                var dataActEco = '';
                dataActEco = '{"tm_va":"'+$scope.datos.f01_factor+'","superficie":"'+$scope.datos.f01_sup+'","codigo_zona":"'+$scope.datos.f01_idCodigoZona+'","categorias_id":'+datoObject_cat+',"id_zona":"'+$scope.datos.f01_zona_act+'","viae":'+idPubS+'}';
                dataDeuda = '{"actividad_economica":'+JSON.stringify(dataActEco)+',"yfecha_inicio_cobro":"2020-07-07","yanios":"'+nroges+'"}';
                console.log('dataDeuda     ',dataDeuda);
                var calcularD = new reglasnegocioSierra();
                calcularD.identificador = 'VALLE_PRUEBA-SGEN-3330';
                calcularD.parametros = dataDeuda;
                calcularD.llamarregla_sierra(function(resDeuda){
                    var deudasAE = JSON.parse(resDeuda);
                    var pagoAE = deudasAE.datos;
                    console.log('calculooooo    ',deudasAE);
                    
                    $scope.datos.montoDeuda = pagoAE;
                    datoObjectPago = [];
                    $scope.btnCalcular = false;
                    for (j = 0; j < pagoAE.length; j++) {
                        datoObjectPP = new Object();
                        datoObjectPP.nro = (j+1);
                        datoObjectPP.gestion = pagoAE[j].gestion;
                        datoObjectPP.monto_ae = pagoAE[j].monto_ae;
                        datoObjectPP.monto_viae = pagoAE[j].monto_viae;
                        datoObjectPP.descuento = pagoAE[j].descuento;
                        datoObjectPP.monto_total = pagoAE[j].monto_total;
                        datoObjectPP.monto_total_con_descuento = pagoAE[j].monto_total_con_descuento;
                        datoObjectPP.monto_pagar = parseFloat(pagoAE[j].monto_total - pagoAE[j].monto_total_con_descuento);
                        datoObjectPago[j] = datoObjectPP;
                    };
                    var data = datoObjectPago;
                    $scope.listDeudas = datoObjectPago;
                    //deferred.resolve($scope.listDeudas);
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }
                    console.log('$scope.listDeudas    ',$scope.listDeudas);
                    $scope.tblDeudas.reload();
                    $.unblockUI();
                })
                console.log('$scope.listDeudasssssssssss    ',$scope.listDeudas);
                //return deferred.promise;
            }
        }
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

    $scope.generarCorrelativo = function(tipo){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var resAct = new reglasnegocioSierra();
            resAct.identificador = 'VALLE_PRUEBA-SGEN-3329';
            resAct.parametros = '{"xcorrelativo_tipo":"'+tipo+'"}';
            resAct.llamarregla_sierra(function(responseCorrelativo){
                var dataCorrelativo = JSON.parse(responseCorrelativo);
                correlativo = dataCorrelativo[0].sp_obtener_correlativo_ae;
                //$scope.datos.f01_id_actividad_economica_temp = correlativoAE;
                //console.log('f01_id_actividad_economica_tempppppppp    ',$scope.datos.f01_id_actividad_economica_temp);
                deferred.resolve(correlativo);
            })
        }
        catch(e){
            console.log(e);
        }
        return deferred.promise;
    }

    $scope.$on('$destroy', function() {
        clsIniciarHtmlForm();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciaBtnHabilitar();
    });
};