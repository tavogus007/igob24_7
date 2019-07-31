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

    $scope.LicenciaXCategoriaA = function(idDesarrollada){
        $.blockUI();
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var infodes = '{"idActividadDesarrollada343": ' + idDesarrollada + '}';
            infodes = JSON.parse(infodes);
            $.ajax({
                type        : 'POST',
                url         : 'http://172.19.161.3:9590/api/cargarTiposLicenciasCategorias',
                data        : infodes,
                dataType    : 'json',
                crossDomain : true,
                headers: {
                    'authorization': 'Bearer' + $rootScope.tokenvalle,
                },
                success: function (datosLic){
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
                        var comboz      = document.getElementById('f01_categoria_descrip');
                        selected2   = comboz.options[comboz.selectedIndex].text;
                        $scope.datos.f01_categoria_descripcion  = selected2;
                        $scope.datos.f01_categoria_descrip2 = selected2;
                        $scope.datos.f01_categoria_agrupada_descripcion = selected2;  
                        $scope.datos.f01_actividadesSecundarias = datosLic[0].ADDescripcion;
                    }else{
                        $scope.msg = "Error !!";
                    };
                    if (idDesarrollada == 907 || idDesarrollada == '907') {
                        $scope.actividadDesarrolladaM();
                        $scope.sCategoria = false;
                        $scope.smultiservicios = true;
                    }
                    $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                    $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per); 
                    $scope.$apply();
                    $.unblockUI();
                },
                error: function (data){ console.log(data);}
            });
            return deferred.promise;
        }catch(e){
            console.log("Error en la actividad desarrollada");
        }
    }

    $scope.catactividadDesarrollada = function(){
        $.blockUI();
        $scope.datos.rdTipoTramite = 'RENOVACION';
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        var infodata = '{"usr_usuario": "administrador","usr_clave": "123456"}';
        infodata = JSON.parse(infodata);        
        try{
            $.ajax({
                type: 'POST',
                url: 'http://172.19.161.3:9590/api/apiLogin',
                dataType: 'json',
                data: infodata,
                success: function (token){
                    $rootScope.tokenvalle = token.token;
                    $.ajax({
                        type        : 'GET',
                        url         : 'http://172.19.161.3:9590/api/consultaActividadesDesarrolladas343',
                        data        : '',
                        dataType    : 'json',
                        crossDomain : true,
                        headers: {
                            'authorization': 'Bearer' + $rootScope.tokenvalle,
                        },
                        success: function (datosLic){
                            $scope.datosActividad = "";
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
                            deferred.resolve($scope.datosActividad);
                            $scope.$apply();
                            $.unblockUI();
                        },
                        error: function (data){ console.log(data);}
                    });
                },
                error: function (data){ console.log(data);}
            });
            return deferred.promise;
        }catch(e){
            alert("Error en la actividad desarrollada");
        }
    }

    $scope.actividadDesarrolladaM = function(){
        $.blockUI();
        $scope[name] = 'Running';
        var deferred = $q.defer();
        var datosMulti = [];
        $.ajax({
            type        : 'GET',
            url         : 'http://172.19.161.3:9590/api/consultaActividadesDesarrolladas343',
            data        : '',
            dataType    : 'json',
            crossDomain : true,
            headers: {
                'authorization': 'Bearer' + $rootScope.tokenvalle,
            },
            success: function (datosLicM){
                dataResp = datosLicM;
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
                deferred.resolve($scope.datosLicenciamul);
                $scope.$apply();
                $.unblockUI();
            },
            error: function (data){ console.log(data);}
        });
    }

    $scope.LicenciaXCategoriaM = function(idDesarrollada){
        setTimeout(function(){
            $.blockUI();
            $scope[name] = 'Running';
            var deferred = $q.defer();
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFiles_ci = [];
            try{
                var infodesM = '{"idActividadDesarrollada343": ' + idDesarrollada + '}';
                infodesM = JSON.parse(infodesM);
                $.ajax({
                    type        : 'POST',
                    url         : 'http://172.19.161.3:9590/api/cargarTiposLicenciasCategorias',
                    data        : infodesM,
                    dataType    : 'json',
                    crossDomain : true,
                    headers: {
                        'authorization': 'Bearer' + $rootScope.tokenvalle,
                    },
                    success: function (datosLicM){
                        $scope.multiple = datosLicM;
                        $scope.multiple.f01_tipo_licmid = datosLicM[0].idTipoLicencia;
                        $scope.multiple.f01_tipo_licmdescrip = datosLicM[0].TipoLicenciaDescripcion;
                        $scope.multiple.f01_cat_agrupadamid = datosLicM[0].idActividadDesarrollada;
                        $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].ADDescripcion;
                        $scope.multiple.f01_act_desarrolladamid = idDesarrollada;
                        var combox      = document.getElementById('f01_act_desarrolladamid');
                        selected2   = combox.options[combox.selectedIndex].text;
                        $scope.multiple.f01_act_desarrolladamdescrip  = selected2;
                        $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada,$scope.datos.f01_tipo_per);
                        deferred.resolve($scope.multiple);
                        $scope.$apply();
                        $.unblockUI();
                    },
                    error: function (data){ console.log(data);}
                });
                return deferred.promise;
            }catch(e){
                console.log("Error en la actividad desarrollada");
            }
        }, 1000);
    }

    $scope.guardarLicencia = function(licencia){
        $scope.dscripcionlic ={};
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
        var datosaux='';
        var datoslicm = {};
        if($scope.datos.licenciam.length > 0){
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if(j+1 == datoslicm.length){
                    if(datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18){
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip;
                    } 
                    else{
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                    }   
                }else{
                    if(datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18){
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip +" - ";
                    }
                    else{
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip +" - ";
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
            $scope.only                     =   true;
        } else {
            $scope.btnGuardarForm   =   false;
            $scope.only             =   false;

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
        //if (data.f01_id_actividad_economica == '' || data.f01_id_actividad_economica == undefined || data.f01_id_actividad_economica == 'undefined' || data.f01_id_actividad_economica == null) {} else{
        $scope.MacroZona();
        $scope.multiple = [];
        //};
        $scope.catactividadDesarrollada();
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada);
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc  =   ((typeof(data.f01_categoria_agrupada)  == 'undefined' || data.f01_categoria_agrupada  == null) ? '' : data.f01_categoria_agrupada);
        if(categoriaAgrupadaDesc != ''){
            $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
        }
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
        if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
            $scope.sCategoria = false;
            $scope.smultiservicios = true;
            //$scope.SeleccionaPrioridad(data.f01_actividad_principal_array);
        }
        else{
            $scope.sCategoria = true;
            $scope.smultiservicios = false;
        }
        //APAGAR COMBOS - ZONA - TIPO DE VIA
        if(typeof(data.f01_zona_act_descrip) == 'undefined'){
            $scope.desabilitadoZ=true;
            $scope.desabilitadoV=true;
        }
        if(data.f01_tip_via_act == 'undefined' || data.f01_tip_via_act == undefined){}else{
            $scope.cargarNombVia(data.f01_tip_via_act, data);
        }
        //MOSTRAR VIAE
        if ( data.rdTipoTramite1 == "NUEVO") {
            $scope.licenciaToogle4 = true;
        } else {                
            $scope.licenciaToogle4 = false;
        }
        if (data.pago_adel == 'SI') {
            $scope.IsVisible = true;
            $scope.calcularDeudas(data.f01_id_actividad_economica,data.nro_ges);
        } else{
            $scope.IsVisible = false;
            $scope.datos.pago_adel = 'NO';
        };
        //MOSTRAR RADIO NUEVA - RENOVACION
        if(typeof(data.rdTipoTramite) != 'undefined'){
            if ( data.rdTipoTramite == "NUEVO") {
                //MOSTRAMOS BOTONES PAGINA
                if ( data.INT_FORM_ALMACENADO == "G") {
                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            }
        }
        /*if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
                var idMacro =   data.INT_AC_MACRO_ID;
                $scope.aDistritoZona = {};
                try{
                    var parametros = new distritoZona();
                    parametros.idMacro = idMacro;
                    parametros.obtdist(function(resultado){
                        data = JSON.parse(resultado);
                        if(data.success.length > 0){
                            $scope.aDistritoZona = data.success;
                        }else{
                            $scope.msg = "Error !!";
                        }
                    })
                }catch(error){
                    console.log("error");
                }
        }*/
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
        if (data.f01_zon_prop_valor) {
            $scope.desabilitadoZ=false;
        }
        if (data.f01_tip_via_prop) {
            $scope.desabilitadoV=false;
        }
        if(data.f01_tip_via_prop != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.f01_tip_via_prop);
        }
        if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else{
            if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){//verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            }else{
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequsitosDoc(data); 
        $scope.obtenerHora();
        $scope.obtenerFecha();
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
    $scope.validarEmisionRenovacion = function (camb) {
        var datosgen       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        if (camb != "NUEVO" && datosgen.length > 0) {           
            $scope.botones = null;
            $scope.desabilitado = true;
            swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea Renovar", 'warning');
        }else{
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
        }
    }
   
   /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
   $scope.cambioToggleForm = function (cambio) {
        $scope.validarEmisionRenovacion(cambio);
        $scope.validarRequisitosForm();
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

    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual  =   "";    
    $scope.nroOrdenActividiadEconomicaActual  =   "";    
    $scope.idContribuyenteAEActual  =   ""; 

    $scope.selActividadEconomica =  function(tramite){  
        $scope.sw_sup = '';
        var fechatram = "";
        var aniotram = "";
        fechatram = tramite.FechaInicio.split("-");
        aniotram = fechatram[0];
        if(aniotram){
            if(tramite.deudaActividad && tramite.deudaActividad == 'ACTIVIDAD SIN DEUDA'){
                //RENOVA ID ACTIVIDAD
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
                        var response = resultadoApi.success.dataSql.datosAE;
                        var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;
                        if(response.length > 0){
                            if(response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null'){
                                response[0].numeroOrden = 0;
                                $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                                $scope.datos.f01_nro_orden = response[0].numeroOrden;
                            }
                            else{
                                $scope.nroOrdenActividiadEconomicaActual  =    response[0].numeroOrden;
                                $scope.datos.f01_nro_orden = response[0].numeroOrden;
                            }
                            $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                            $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                            if(tipoPersona == "N"){                        
                                var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var smacro      =   "MACRODISTRITO";
                                var szona       =   "DISTRITO";

                                //DATOS DE LA ACTIVIDAD ECONÓMICA
                                $scope.datos.f01_denominacion   =   response[0].denominacion;
                                //OBLIGATORIOS
                                $scope.datos.f01_sup  =   response[0].superficie;
                                $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;
                                try{
                                    smacro      =   smacro  +   " " +    response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                                    szona       =   szona  +   " " +    response[0].idDistrito_actividadEconomica + " - " + response[0].id_zona_ActividadEconomica;
                                    hinicio     =   hinicio.split('-')[0].trim();
                                    hfinal      =   hfinal.split('-')[1].trim();
                                }catch(e){}
                                /*DATOS DE LA ACTIVIDAD*/
                                $scope.actulizarIdDistrito(response[0].idzona_ae);
                                $scope.distritoZonas(smacro);
                                $scope.datos.f01_dist_act= response[0].idDistrito_actividadEconomica;
                                $scope.datos.f01_num_pmc = response[0].padron;
                                $scope.datos.f01_raz_soc=response[0].denominacion;
                                $scope.datos.f01_sup=response[0].superficie;
                                if($scope.datos.f01_sup != ''){
                                    $scope.calcularCapacidadAuto($scope.datos.f01_sup);
                                }
                                $scope.datos.f01_de_hor=hinicio;
                                $scope.datos.f01_a_hor=hfinal;
                                $scope.datos.f01_productosElaborados=response[0].productosElaborados;
                                $scope.datos.f01_actividadesSecundarias=response[0].actividadesSecundarias;
                                /*TIPO LICENCIA*/
                                $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;//response[0].TipoLicencia;
                                //$scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                                $scope.datos.f01_categoria_descrip = response[0].idActividadDesarrollada;
                                //$scope.LicenciaXCategoriaA(response[0].idActividadDesarrollada);
                                $scope.f01_tip_act  = response[0].tipoActividad;
                                $scope.datos.f01_categoria_descrip = response[0].idActividadDesarrollada;
                                /*Ubicación de Actividad Económica*/     
                                $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                                $scope.datos.f01_macro_act = response[0].IdMacrodistrito;                          
                                $scope.datos.f01_macro_act_descrip = smacro;
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
                                $scope.datos.f01_tip_act  = response[0].tipoActividad;
                                if(response[0].tipoActividad =='MA' || response[0].tipoActividad =='MATRI'){
                                    $scope.datos.f01_tip_act_dec = 'MATRIZ';
                                    $scope.datos.f01_tip_act = 'MA';
                                }
                                if(response[0].tipoActividad =='SU' || response[0].tipoActividad =='SUCUR'){
                                    $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                                    $scope.datos.f01_tip_act = 'SU';
                                }                                
                                /*Ubicación de Actividad Económica*/     
                                $scope.datos.INT_AC_ID_ZONA = response[0].id_zona_ActividadEconomica;
                                $scope.MacroZona();
                                $scope.datos.f01_zona_act = parseInt(response[0].id_zona_ActividadEconomica);
                                $scope.datos.f01_zona_act_descrip = response[0].zona;
                                $scope.datos.f01_tip_via_act = response[0].tipoVia;
                                $scope.datos.f01_num_act = response[0].via;
                                $scope.datos.f01_num_act1 = response[0].numero;
                                if(response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined' || response[0].casilla == 'undefined'){
                                    response[0].edificio = ''; 
                                    response[0].bloque = ''; 
                                    response[0].piso = '';
                                    response[0].departamento = '';
                                    response[0].telefono = '';
                                    response[0].casilla = '';
                                }                       
                                $scope.datos.f01_edificio_act=response[0].edificio;
                                $scope.datos.f01_bloque_act=response[0].bloque;
                                $scope.datos.f01_piso_act=response[0].piso;
                                $scope.datos.f01_dpto_of_loc=response[0].departamento;
                                $scope.datos.f01_tel_act1=response[0].telefono;
                                $scope.datos.f01_casilla=response[0].casilla;
                                $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                                $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                                $scope.datos.f01_categoria_descrip_ant = response[0].ActividadDesarrollada;
                            }
                            //INT_TRAMITE_RENOVA
                            $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                            $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;
                            /*HABILITANDO CAMPOS*/                    
                            $scope.botones = "mostrar";
                            $scope.desabilitado = false;
                            if (lstPublicidad.length > 0) {
                                $scope.datos.rdTipoTramite1 = 'NUEVO';
                                //$scope.cambioToggle1('NUEVO');
                                $scope.listpub = [];
                                for (var i = 0; i < lstPublicidad.length; i++) {
                                    var lstpublicidad = new Object();
                                    lstpublicidad.INT_TIPO_LETRE = lstPublicidad[i].descripcionTipoLetrero;
                                    lstpublicidad.INT_CARA = lstPublicidad[i].caracteristica;
                                    lstpublicidad.INT_NRO_CARA = lstPublicidad[i].cara;
                                    lstpublicidad.INT_DESC = lstPublicidad[i].descripcion;
                                    lstpublicidad.INT_ALTO = lstPublicidad[i].alto;
                                    lstpublicidad.INT_ANCHO = lstPublicidad[i].ancho;
                                    lstpublicidad.INT_SUP = lstPublicidad[i].superficie;
                                    lstpublicidad.idPublicidad = lstPublicidad[i].idPublicidad;
                                    lstpublicidad.id_cara = lstPublicidad[i].idTipoLetrero;
                                    lstpublicidad.idcarac = lstPublicidad[i].idCaracteristica;
                                    lstpublicidad.idcate = lstPublicidad[i].idCategoria;
                                    $scope.listpub[i] = lstpublicidad;
                                };
                                $scope.datos.swpublicidad = 'CP';
                                $scope.licenciaToogle4 = true;
                                $scope.datos.publicidad = $scope.listpub;
                                $scope.Plubli_Grilla($scope.datos.publicidad);
                                $scope.publicid = $scope.listpub;
                            }
                            else{
                                $scope.datos.rdTipoTramite1 = 'RENOVACION';
                                $scope.datos.swpublicidad = 'SP';
                                $scope.licenciaToogle4 = false;
                                //$scope.cambioToggle1('RENOVACION');
                            };
                                //$scope.vias($scope.datos.INT_AC_ZONA,$scope.datos.INT_AC_TIP_VIA);
                        }
                    } else {
                        swal('', "Datos no Encontrados !!!", 'warning');
                    }
                });
            }else {
                swal('', "Actividad con deuda !!!", 'warning');
            }
        }else{
            swal('', "Actividad Economica Vigente !!!", 'warning');
        }           
    };          

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
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea Renovar.", 'warning');                    
                    }else{
                        $scope.botones = "mostrar";
                        $scope.desabilitado = false;
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

    $scope.actulizarIdDistrito  =   function(idZona){
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
        /*$scope.datos.f01_dist_act    =   idDistrito;
        $scope.datos.f01_dist_act_descrip = "DISTRITO "+idDistrito;
        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.f01_zona_act_descrip = zonaDes;*/
        $scope.datos.f01_dist_act    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.f01_zona_act       = idZona;
        $scope.datos.INT_ID_ZONA        =   idZona;
        $scope.desabilitadoNo=true;
        //$scope.datos.f01_nom_via_prop = "";
        //$scope.datos.f01_tip_via_prop = "";      
    };

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
        /*DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("ERROR");
        });*/
    };

    var aDocAdjuntosmapa = new Object();
    $scope.capturarImagen = function(){
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var latitud = $rootScope.laaa;
        var longitud = $rootScope.looo;
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
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
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
        $scope.publi.INT_NRO_CARA = parseInt(dato.INT_NRO_CARA);
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
                sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
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
                        $scope.datos.publicidad[i].estado = 'M';
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

    $scope.guardarpublicidad = function(public){
        if (public.INT_SUPERFICIE) {
            if(public.INT_NRO_CARA =='' || public.INT_NRO_CARA == null || public.INT_CARA =='' || public.INT_CARA == null ||
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
                    var sup_exc = total - 1;
                    if (total < 700) {                           
                        $scope.id = id;                            
                        $scope.publicid.push({
                            id: id,
                            INT_NRO_CARA: public.INT_NRO_CARA,
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
                            //INT_SUP_EXCLUIDA: sup_exc                            
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
            if(public.INT_NRO_CARA =='' || public.INT_NRO_CARA == null || public.INT_CARA =='' || public.INT_CARA == null ||
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
                    var sup_exc = total - 1;

                    if (total < 700) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            INT_NRO_CARA: public.INT_NRO_CARA,
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
                            //INT_SUP_EXCLUIDA: sup_exc
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

    $scope.Plubli_Grilla = function(dato){
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho","impresiones": "true|true|true|true|true|true|true|"};
        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publi_grilla.push({
                nroElem: j+1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                //INT_CATE: dato[j].INT_CATE,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO
                //INT_SUP_EXCLUIDA: dato[j].INT_SUP_EXCLUIDA
            });
        }
        var jsonString = '['+ (encabezado) +']';
        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        //$scope.datos.publicidad_grilla=jsonString;
        $scope.datos.publicidad_grilla=encabezado;
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

    $scope.cargarNombVia = function(tipoVia, dato) {
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
    };
    
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
        //DOCS OBLIGATORIOS    
        if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
            /*data.f01_categoria_agrupada = 3375;
            data.f01_categoria_descrip = 3375;
            $scope.datos.f01_categoria_agrupada = 3375;
            $scope.datos.f01_categoria_descrip = 3375;*/
            sarrayobligatorio   =   true;
        }
        if(data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32'){
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
              data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
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
              declaracionJ
               $scope.getCaptchasXX();
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
        if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
            datos.f01_tipo_per_desc = 'NATURAL';
            urlFormularioN  =   "../../docs/AE_Formulario_401.html";
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
                var pubMod  = '';
                //if(datos.publicidad.length > 0){
                    pubMod = '<tr><td>VIAE</td>'+
                    '<td>TIPO</td>' +
                    '<td>CARACTERÍSTICA</td>'+
                    '<td>CARAS</td>'+
                    '<td>DESCRIPCIÓN</td>'+
                    '<td>ALTO</td>'+
                    '<td>ANCHO</td>'+
                    '<td>SUPERFICIE</td></tr>';
                    for (i = 0; i < datos.publicidad.length; i++){
                        pubMod = pubMod +'<tr>' +
                        '<td>' + (i+1) + '</td>'+
                        '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>'+
                        '<td>' + datos.publicidad[i].INT_CARA + '</td>'+
                        '<td>' + datos.publicidad[i].INT_NRO_CARA + '</td>'+
                        '<td>' + datos.publicidad[i].INT_DESC + '</td>'+
                        '<td>' + datos.publicidad[i].INT_ANCHO + '</td>'+
                        '<td>' + datos.publicidad[i].INT_ALTO + '</td>'+
                        '<td>' + datos.publicidad[i].INT_SUP + '</td></tr>';
                    }
                    stringFormulario40  =   stringFormulario40.replace("#publicidad_grilla#", pubMod);
                /*}
                else{
                    stringFormulario40  =   stringFormulario40.replace("#publicidad_grilla#", 'ACTIVIDAD ECONÓMICA SIN ELEMENTOS DE PUBLICIDAD');
                }*/
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
                 //pago adelantado
                var tablapago = '';
                if(datos.pago_adel == 'undefined' || datos.pago_adel == undefined  || datos.pago_adel == 'NO'){
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", 'SIN PAGO ADELANTADO');
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", 'NINGUNA');
                    stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                }else{
                    stringFormulario40  =   stringFormulario40.replace("#pago_adel#", datos.pago_adel);
                    stringFormulario40  =   stringFormulario40.replace("#nro_ges#", datos.nro_ges);
                    if ($scope.listDeudas.length > 0) {
                        tablapago = '<tr>'+
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
                            '</tr>';
                        stringFormulario40  =   stringFormulario40.replace("#tablaP#", tablapago);
                    }                   
                }
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
            dataForm['Licenmul_grilla'] = multi;
        };      
        var pubMod = '';
        /*if(data.publicidad == 'undefined' || data.publicidad == undefined){
            dataForm['publicidad_grilla'] = pubMod;
        }*/
        //if(datos.publicidad.length > 0){
            pubMod = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>'+
            '<td>TIPO</td>' +
            '<td>CARACTERÍSTICA</td>'+
            '<td>CARAS</td>'+
            '<td>DESCRIPCIÓN</td>'+
            '<td>ALTO</td>'+
            '<td>ANCHO</td>'+
            '<td>SUPERFICIE</td></tr>';
            for (i = 0; i < data.publicidad.length; i++){
                pubMod = pubMod +'<tr>' +
                    '<td>' + (i+1) + '</td>'+
                    '<td>' + data.publicidad[i].INT_TIPO_LETRE + '</td>'+
                    '<td>' + data.publicidad[i].INT_CARA + '</td>'+
                    '<td>' + data.publicidad[i].INT_NRO_CARA + '</td>'+
                    '<td>' + data.publicidad[i].INT_DESC + '</td>'+
                    '<td>' + data.publicidad[i].INT_ANCHO + '</td>'+
                    '<td>' + data.publicidad[i].INT_ALTO + '</td>'+
                    '<td>' + data.publicidad[i].INT_SUP + '</td></tr>';
            }
            pubMod = pubMod +'</table>';
            dataForm['publicidad_grilla'] = pubMod;
        /*}
        else{
            dataForm['publicidad_grilla'] = 'ACTIVIDAD ECONÓMICA SIN ELEMENTOS DE PUBLICIDAD';
        }*/
        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;      
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
        }, function() {
            swal.close();
            setTimeout(function(){
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    $scope.enviarFormProcesosLinea = function(paramForm){
        $scope.ultimoArrayAdjunto();
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm    =   true;
        var idProcodigo         =   'REN-AE';
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
            datosNeXO['CI_BIGDATA']         = paramForm.CI_BIGDATA;
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
            datosNeXO['f01_nit_prop']               =paramForm.f01_nit_prop;
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
            datosNeXO['f01_nit']="";
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
            datosNeXO['File_Adjunto'] =  $rootScope.FileAdjuntos;
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
        /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
        /*if(paramForm.f01_tipo_lic == 3375){
            datosNeXO['f01_categoria'] = 3375;
            datosNeXO['f01_categoria_descrip'] =3375;
            datosNeXO['f01_categoria_agrupada_descripcion'] = '';
            datosNeXO['f01_categoria_agrupada'] = 3375;
            datosNeXO['f01_actividad_desarrollada'] = '';
            datosNeXO['f01_categoria_agrupada_descrip'] = 0;
            datosNeXO['f01_categoria_agrupada_dem'] = 0;
         }*/
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
        datosNeXO['publicidad']=paramForm.publicidad;
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
                    //$scope.$apply();
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