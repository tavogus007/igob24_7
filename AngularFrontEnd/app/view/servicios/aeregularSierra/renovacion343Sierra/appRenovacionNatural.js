function regularRenovacionSierraController($scope, $timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter, FileUploader, ngTableParams, $filter, fileUpload, fileUpload1, wsRgistrarPubliciadad, $window) {
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.desabilitadoNo = true;
    $scope.divNatural = null;
    $scope.divJuridico = null;
    $scope.btnEnviarForm = true;
    $scope.archivo2 = "croquisActividad.jpg";
    $scope.btnEnviarFormLinea = "true";
    $scope.verEmisionRenovacion = "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;
    $scope.sCategoria = true;
    $scope.smultiservicios = false;
    $scope.docsAdjuntoAntiguo = [];
    $scope.datos.datosdocanterior = [];
    $scope.docPubNuevo = [];
    $scope.datos.licenciamulAnterior = [];
    $scope.pos = 0;
    $scope.sinmultiservicios = true;
    $scope.conmultiservicios = false;
    $scope.pubMensaje = false;
    $scope.datos.publicidadAntiguo_grilla = [];
    $scope.btnCalcular = true;
    $scope.IsVisible = false;
    $scope.tblDeudas = {};
    $scope.listDeudas = [];
    $scope.divDeudasPendientes = false;
    $scope.btnFUM = false;
    $scope.formDatosAE = false;
    $scope.tblTramites = {};
    $scope.trmUsuario = [];


    $scope.getRequisitosCategoria = function(idCategoria, persona) {
        if (persona == 'NATURAL') {
            persona = 'N';
        }
        $scope.categoriaid = idCategoria;
        $scope.tipoper = persona;
        try {
            var ndCategoria = new aelstRequisitosDocCategoria();
            ndCategoria.dependencia = idCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_RequisitosDocCategoria(function(res) {
                x = JSON.parse(res);
                var datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
                $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
                $rootScope.datosAdjuntos = datoObjectFinal;
            })
        } catch (error) {
            console.log("error en requisitos categoria");
        }
    };

    $scope.getRequisitosTecnicosActividad = function(idCategoria, persona) {
        if (persona == 'NATURAL') {
            persona = 'N';
        }
        try {
            var ntActividad = new aelstRequisitosTecActividad();
            ntActividad.dependencia = idCategoria;
            ntActividad.tipopersona = persona;
            ntActividad.aelst_RequisitosTecActividad(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        } catch (error) {
            console.log("error");
        }
    };

    $scope.getRequisitosTecnicosCategoria = function(idCategoria, persona) {
        if (persona == 'NATURAL') {
            persona = 'N';
        }
        try {
            var parametro = new aelstRequisitosTecCategoria();
            parametro.idCategoria = idCategoria;
            parametro.tipopersona = 'N';
            parametro.aelst_RequisitosTecCategoria(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        } catch (error) {
            console.log("error");
        }
    };

    $scope.limpiarmultiple = function() {
        $scope.licdes = [];
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

    $scope.catactividadDesarrollada = function() {
        $.blockUI();
        $scope.datos.rdTipoTramite = 'RENOVACION';
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        try {
            var dataActDes = '{}';
            var resLstActDes = new reglasnegocioSierra();
            resLstActDes.identificador = 'VALLE_PRUEBA-SGEN-3149';
            resLstActDes.parametros = dataActDes;
            resLstActDes.llamarregla_sierra(function(responseActDes) {
                var lstActDes = JSON.parse(responseActDes);
                if (lstActDes.length > 0) {
                    for (var i = lstActDes.length - 1; i >= 0; i--) {
                        if (lstActDes[i].idactividaddesarrollada343 == 907 || lstActDes[i].idactividaddesarrollada343 == '907') {
                            lstActDes[i].descripcion343 = 'MULTISERVICIOS';
                        }
                    };
                    $scope.datosActividad = lstActDes;
                } else {
                    $scope.msg = "Error !!";
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        } catch (e) {
            alert("Error en la actividad desarrollada");
        }
    }

    $scope.LicenciaXCategoriaA = function(idDesarrollada) {
        $.blockUI();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        try {
            var dataDesLic = '{"id_actividad_desarrollada":"' + idDesarrollada + '"}';
            var resDatosLic = new reglasnegocioSierra();
            resDatosLic.identificador = 'VALLE_PRUEBA-SGEN-3151';
            resDatosLic.parametros = dataDesLic;
            resDatosLic.llamarregla_sierra(function(responseDatosLic) {
                var datosLic = JSON.parse(responseDatosLic);
                if (datosLic.length > 0) {
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
                } else {
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
                $scope.datos.File_contribuyente = datoObjectFiles_ci;
                $scope.getRequisitosActividad($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                $scope.getRequisitosTecnicosCategoria($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
        }

    };

    $scope.getRequisitosActividad = function(idCategoria, persona) {
        persona = sessionService.get('TIPO_PERSONA');
        try {
            var parametros = new aelstRequisitosDocActividad();
            parametros.dependencia = idCategoria;
            parametros.tipopersona = persona;
            parametros.aelst_RequisitosDocActividad(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
            });
        } catch (error) {
            alert("requisitos actividad");
        }
    };

    $scope.actividadDesarrolladaM = function() {
        $.blockUI();
        var datosMulti = [];
        try {
            var dataActDesM = '{}';
            var resLstActDesM = new reglasnegocioSierra();
            resLstActDesM.identificador = 'VALLE_PRUEBA-SGEN-3149';
            resLstActDesM.parametros = dataActDesM;
            resLstActDesM.llamarregla_sierra(function(responseActDesM) {
                var lstActividadDesM = JSON.parse(responseActDesM);
                var dataResp = lstActividadDesM;
                for (var i = 0; i < dataResp.length; i++) {
                    if (dataResp[i].idactividaddesarrollada343 == '907' || dataResp[i].idactividaddesarrollada343 == 907) {} else {
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
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
            $.unblockUI();
        }
    };

    $scope.obtenerActDes = function(idActividadDesarrollada) {
        $scope.datosactividadDes = "";
        var resHomologacion = new reglasnegocioSierra();
        resHomologacion.identificador = 'VALLE_PRUEBA-SGEN-3338';
        resHomologacion.parametros = '{"ycategoria_id":"' + idActividadDesarrollada + '"}';
        resHomologacion.llamarregla_sierra(function(resHomologacion) {
            var lstHomologacion = JSON.parse(resHomologacion);
            $scope.datosactividadDes = lstHomologacion;
        })
    }

    $scope.LicenciaXCategoriaM = function(idDesarrollada) {
        $.blockUI();
        $scope[name] = 'Running';
        var deferred = $q.defer();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        try {
            var dataDesLicM = '{"id_actividad_desarrollada":"' + idDesarrollada + '"}';
            var resDatosLicM = new reglasnegocioSierra();
            resDatosLicM.identificador = 'VALLE_PRUEBA-SGEN-3151';
            resDatosLicM.parametros = dataDesLicM;
            resDatosLicM.llamarregla_sierra(function(responseDatosLicM) {
                var obtLicM = JSON.parse(responseDatosLicM);
                var datosLicM = obtLicM;
                if (datosLicM.length > 0) {
                    $scope.multiple = datosLicM;
                    $scope.multiple.f01_tipo_licmid = datosLicM[0].idtipolicencia;
                    $scope.multiple.f01_tipo_licmdescrip = datosLicM[0].tipolicenciadescripcion;
                    document.getElementById('f01_tipo_licmdescrip').value = $scope.multiple.f01_tipo_licmdescrip;
                    $scope.multiple.f01_cat_agrupadamid = datosLicM[0].categoria_id;
                    $scope.multiple.f01_categoria_agrupada = datosLicM[0].categoria_id_anterior;
                    $scope.multiple.f01_cat_agrupadamdescrip = datosLicM[0].addescripcion;
                    document.getElementById('f01_cat_agrupadamdescrip').value = $scope.multiple.f01_cat_agrupadamdescrip;
                    $scope.multiple.f01_act_desarrolladamid = datosLicM[0].idactividaddesarrollada343;
                    $scope.multiple.f01_procesomul = datosLicM[0].proceso;
                    var combox = document.getElementById('f01_act_desarrolladamid');
                    selected2 = combox.options[combox.selectedIndex].text;
                    $scope.multiple.f01_act_desarrolladamdescrip = selected2;
                    $scope.getRequisitosFormulario(datosLicM[0].categoria_id_anterior, $scope.datos.f01_tipo_per);
                    deferred.resolve($scope.multiple);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $.unblockUI();
                } else {
                    $scope.msg = "Error !!";
                    $.unblockUI();
                }
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
            $.unblockUI();
        }
        return deferred.promise;
    }

    $scope.guardarLicencia = function(licencia) {
        $scope.dscripcionlic = {};
        if ($scope.dscripcionlic.f01_act_desarrolladamdescrip == '--Seleccione--') {
            $scope.dscripcionlic.f01_act_desarrolladamdescrip = '';
        }
        if ($scope.multiple.f01_tipo_licmid == '' || $scope.multiple.f01_tipo_licmid == null || $scope.multiple.f01_cat_agrupadamid == '' || $scope.multiple.f01_cat_agrupadamid == null) {
            swal('', 'Llene lo campos requeridos para la Catergoria Multiple  ', 'error');
        } else {
            var id = 0
            if ($scope.datos.licenciam == '' || $scope.datos.licenciam == null || $scope.datos.licenciam == "undefined") {
                if ($scope.licenciamul == '' || $scope.licenciamul == null || $scope.licenciamul == "undefined") {
                    $scope.licenciamul = [];
                    id = 0;
                }
                id = $scope.licenciamul.length + 1;
            } else {
                id = $scope.licenciamul.length + 1;
            }
            if (id < 11) {
                $scope.id = id;
                $scope.licenciamul.push({
                    id: id,
                    f01_tipo_licmid: $scope.multiple.f01_tipo_licmid,
                    f01_cat_agrupadamid: $scope.multiple.f01_cat_agrupadamid,
                    f01_categoria_agrupada: $scope.multiple.f01_categoria_agrupada,
                    f01_act_desarrolladamid: $scope.multiple.f01_act_desarrolladamid,
                    f01_tipo_licmdescrip: $scope.multiple.f01_tipo_licmdescrip,
                    f01_cat_agrupadamdescrip: $scope.multiple.f01_cat_agrupadamdescrip,
                    f01_act_desarrolladamdescrip: $scope.multiple.f01_act_desarrolladamdescrip,
                    f01_catagrp_principal: $scope.f01_catagrp_principal
                });
                $scope.licdes = [];
                $scope.multiple = [];
                $scope.dscripcionlic = {};
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.Licencia_Multiple($scope.licenciamul);
                /*LISTAR REQUISITOS DINAMICOS*/
                $scope.lstRequisitosMultiples2018($scope.licenciamul);
                $scope.lstRequisitosTecnicosMultiples($scope.licenciamul);
                $scope.multiple.f01_act_desarrolladamid = '';
            } else {
                swal('', 'El numero de multiples excede los estandares permitidos', 'error');
            }
        }
    }

    $scope.Licencia_Multiple = function(dato) {
        $scope.licmul_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip", "titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada", "impresiones": "true|true|true|true|true|true|true|" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.licmul_grilla.push({
                nroElem: j + 1,
                f01_tipo_licmid: dato[j].f01_tipo_licmid,
                f01_tipo_licmdescrip: dato[j].f01_tipo_licmdescrip,
                f01_cat_agrupadamid: dato[j].f01_cat_agrupadamid,
                f01_cat_agrupadamdescrip: dato[j].f01_cat_agrupadamdescrip,
                f01_act_desarrolladamid: dato[j].f01_act_desarrolladamid,
                f01_act_desarrolladamdescrip: dato[j].f01_act_desarrolladamdescrip
            });
        }
        var jsonString = '[' + (encabezado) + ']';
        angular.forEach($scope.licmul_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.Licenmul_grilla = encabezado;
    }

    $scope.detallem = [];
    $scope.editm = {};
    $scope.onlym = false;
    $scope.botonm = "new";

    $scope.modificarLic = function(dato) {
        $scope.onlym = true;
        $scope.botonm = "upd";
        $scope.multiple = dato;
    }

    $scope.eliminarLic = function(dato) {
        $scope.licenciamul.splice($scope.licenciamul.indexOf(dato), 1);
        $scope.idm = $scope.idm - 1;
    }

    $scope.modificarLicencia = function(dato) {
            $scope.onlym = true;
            $scope.botonm = "new";
            delete $scope.editm[dato.idm];
            $scope.multiple = [];
        }
        ///TERMINA LICENCIA MULTIPLE

    //UPLOAD  FILES
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL + "ciudadano/" + idCiu;

    var uploader = $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            return this.queue.length < 10;
        }
    });
    $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL + "?desripcion=ciudadano&&idCiudadano=" + idCiu

    });
    var uploader = $scope.uploader;

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length < 2;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    /////////////////////////////////////////////////////////////////
    $scope.verificarSuperficie = function(superficie) {
        $scope.validarRequisitosForm();
    }

    $scope.lstRequisitosTecnicosMultiples = function(licenciamul) {
        var sconsulta = '[';
        for (i = 0; i < licenciamul.length; i++) {
            sconsulta = sconsulta + '{"id":' + licenciamul[i].f01_categoria_agrupada + "},";
        }
        sconsulta = sconsulta.substring(0, sconsulta.length - 1);
        sconsulta = sconsulta + ']';
        aidCategoria = sconsulta;
        if ($scope.datos) {
            var aidCategoria = aidCategoria;
            var persona = 'N';
            var ndCategoria = new aelstRequisitostecmul();
            ndCategoria.dependencia = aidCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_Requisitostecmul(function(res) {
                var result = JSON.parse(res);
                var datosRequisitosTmp = result.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idrequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descrequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
                setTimeout(function() {
                    iniciarLoadFyle();
                }, 1000);
            })
        }
    };

    $scope.GetValueCategoria = function() {
        $scope.limpiaractdes();
        var e = document.getElementById('f01_categoria_descrip');
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueMacrodistrito = function(macro) {
        var e = document.getElementById("f01_macro_act");
        $scope.datos.f01_macro_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueDistrito = function() {
        var e = document.getElementById("f01_dist_act");
        $scope.datos.f01_dist_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaActividad = function() {
        var e = document.getElementById("INT_AC_ID_ZONA");
        $scope.datos.INT_AC_ID_ZONA_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyente = function() {
        var e = document.getElementById("f01_zon_prop");
        $scope.datos.f01_zon_prop_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyenteJuridico = function() {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }

    $scope.GetValueVia = function() {
        //setTimeout(function(){
        var e = document.getElementById("f01_num_act_id");
        $scope.datos.f01_num_act = e.options[e.selectedIndex].text;
        //},500);
    }

    $scope.GetValueZonaSegura = function(idCategoria) {
        if (idCategoria == 3419 || idCategoria == 3420 || idCategoria == 3421 || idCategoria == 3422 || idCategoria == 3423 || idCategoria == 3424) {
            $rootScope.mostrarzonasegura = true;
        } else {
            $rootScope.mostrarzonasegura = false;
        }
    }

    $scope.GetValueActividadSecundaria = function() {
        $scope.actividadSecund = "";
        var datosaux = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var i = 0; i < datoslicm.length; i++) {
                if (i + 1 == datoslicm.length) {
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip;
                } else {
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip + " - ";
                }
            }
        }
        $scope.actividadSecund = datosaux;
        if ($scope.datos.f01_categoria_agrupada != 26 || $scope.datos.f01_categoria_agrupada != '26') {
            var e = document.getElementById("f01_categoria_agrupada");
            $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadSecund = $scope.datos.f01_categoria_agrupada_descrip;
        }
        $scope.datos.f01_actividadesSecundarias = $scope.actividadSecund;
    }

    $scope.GetValueActividadDesarrollada = function() {
        $scope.actividadDes = "";
        var datosaux = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if (j + 1 == datoslicm.length) {
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                } else {
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip + " - ";
                }
            }
        }
        $scope.actividadDes = datosaux;
        if ($scope.datos.f01_categoria_descrip != 26) {
            var e = document.getElementById("f01_categoria_descrip");
            $scope.datos.f01_actividad_desarrollada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadDes = $scope.datos.f01_actividad_desarrollada_descrip;
        }
        $scope.datos.f01_actividadesDesarrolladasc = $scope.actividadDes;
    }

    $scope.GetValueActividadesCatDesarrollada = function() {
        $scope.actividadDesCat = "";
        var datosaux = '';
        var datosact = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if (j + 1 == datoslicm.length) {
                    if (datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18) {
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    } else {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    }
                } else {
                    if (datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18) {
                        datosaux = datosaux + datoslicm[j].f01_cat_agrupadamdescrip + " - ";
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    } else {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip + " - ";
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    }
                }
            }
            var swmul = 0;
            var procesoMul = '';
            var swproceso = 0;
            for (var k = 0; k < datoslicm.length && swmul == 0; k++) {
                if (datoslicm[k].f01_tipo_licmid == '12' || datoslicm[k].f01_tipo_licmid == 12) {
                    swmul = 1;
                } else {
                    swmul = 0;
                }
            }
            if (swmul == 1) {
                $rootScope.mostrarzonasegura = true;
            } else {
                $rootScope.mostrarzonasegura = false;
            }
            for (var i = 0; i < datoslicm.length && swproceso == 0; i++) {
                if (datoslicm[i].f01_procesomul == 'GEN') {
                    swproceso = 0;
                } else {
                    swproceso = 1;
                }
            }
            if (swproceso == 0) {
                $scope.datos.f01_proceso = 'GEN';
            } else {
                $scope.datos.f01_proceso = 'PRE';
            };
        }
        $scope.actividadDesCat = datosaux;
        $scope.datos.f01_actividadesSecundarias = $scope.actividadDesCat;
        $scope.datos.f01_categorias_multi = datosact;
    }

    $scope.limpiaractdes = function() {
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
    }

    //ALMACENAR ARHIVOS EN EL IF-GENESIS
    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso) {
        var sdataArchivo = datosCaso[0].sp_pmfunction_crearcaso_linea;
        var aDatosCaso = sdataArchivo.split(',');
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('NROTRAMITEID');
        $scope.docusuario = "Ciudadano";
        $scope.archivosMultiples = JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES_MAPA);
        $scope.docsistema = 'AE_EN_LINEA';
        $scope.sIdProcesoActual = sessionService.get('IDPROCESO'); //aDatosCaso[6];//datosCaso.idProceso;// 1;
        $scope.sCasoNro = sessionService.get('NROTRAMITEID'); //x;//aDatosCaso[1];//datosCaso.sNrocaso//49;
        $scope.sCasoNombre = '15 - ADJUNTOS';
        var aImagenJson = JSON.parse($scope.archivosMultiples);
        var imgCroquis = new gDocumentos();
        imgCroquis.doc_sistema = $scope.docsistema;
        imgCroquis.doc_proceso = $scope.sIdProcesoActual;
        imgCroquis.doc_id = $scope.sCasoNro;
        imgCroquis.doc_ci_nodo = $scope.sCasoNombre;
        imgCroquis.doc_url_logica = aImagenJson[0].url_archivo;
        imgCroquis.doc_nombre = aImagenJson[0].nombre_archivo;
        imgCroquis.doc_titulo = aImagenJson[0].titulo;
        imgCroquis.doc_palabras = aImagenJson[0].descripcion;
        imgCroquis.doc_datos = aImagenJson[0].docdatos;
        imgCroquis.doc_nrotramite_nexo = $scope.nrotramitec;
        imgCroquis.doc_usuario = $scope.docusuario;
        imgCroquis.doc_url = aImagenJson[0].url_archivo;
        imgCroquis.doc_version = 0;
        imgCroquis.doc_tiempo = 0;
        imgCroquis.doc_firma_digital = "";
        imgCroquis.doc_registro = "";
        imgCroquis.doc_modificacion = "";
        imgCroquis.doc_estado = 'A';
        imgCroquis.doc_tipo_documento = "";
        imgCroquis.doc_tamanio_documento = "";
        imgCroquis.doc_tps_doc_id = 0;
        imgCroquis.doc_acceso = "";
        imgCroquis.doc_cuerpo = "";
        imgCroquis.doc_tipo_documentacion = "";
        imgCroquis.doc_tipo_ingreso = "";
        imgCroquis.doc_estado_de_envio = "";
        imgCroquis.doc_correlativo = "";
        imgCroquis.doc_tipo_documento_ext = "";
        imgCroquis.doc_id_carpeta = 0;
        imgCroquis.insertarDoc(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {} else {
                $.unblockUI();
                swal(resultadoApi.error.message);
            }
        });
    };

    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function(event, data) {
        if (data > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = true;
        }
    });

    //validarBtnEnviar
    $scope.validarBtnEnviar = function(cont) {
        if (cont > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = false;
        }
    };

    $scope.cargarDatosSierra = function() {
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.inciarUpload();
        $scope.getCaptchasXX();
        if ($scope.sTipoPersona == "NATURAL") {
            $scope.divNatural = "mostrar";
        } else {
            $scope.divJuridico = "mostrar";
        }
        $scope.lssubcategoria();
        $scope.catactividadDesarrollada();
        $scope.getlstDeudas();
    };

    $scope.inciarUpload = function() {
        try {
            $('#multiDocsButon').click(function() {
                $('#multiDocsFile').click();
                //$scope.vias();
            });
        } catch (e) {}
    };

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite) {
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm = true;
            $scope.desabilitado = true;
            $scope.botones = null;
            $scope.only = true;
        } else {
            $scope.btnGuardarForm = false;
            $scope.only = false;
            $scope.desabilitado = false;
            $scope.botones = "mostar";
        }
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        if (JSON.stringify($scope.dataGenesisCidadano) == '{}') {} else {
            $scope.datos.f01_id_contribuyente = datosgen.contribuyente_id;
            $scope.datos.f01_id_contribuyente_temp = datosgen.contribuyente_ant_id;
            $scope.datos.f01_num_pmc = datosgen.contribuyente.padron;
        };
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data) {
        $scope.formDatosAE = false;
        $scope.mostrarMsgActividadTrue = false;
        $scope.mostrarMsgActividadFalse = false;
        if (data.length > 0) {
            if (data[0].venviado != 'SI') {
                if (data[0].datos.INT_FORM_ALMACENADO != 'G') {
                    $scope.validarActividadEconomica();
                } else {
                    if (data[0].datos.rdTipoTramite == 'NUEVO') {
                        $scope.mostrarMsgNuevaActividad = true;
                        $scope.formDatosAE = false;
                        $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion. Creara una nueva Actividad Economica.";
                    } else {
                        $scope.validarActividadEconomica();
                    }
                }
            }
        }
    });
    //INICIAR VARIABLES EN EL FORMULARIO
    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data) {
        //TIPO DE LICENCIA
        $scope.catactividadDesarrollada();
        if (data.f01_zona_act == undefined || data.f01_zona_act == 'undefined' || data.f01_zona_act == null || data.f01_zona_act == '') {} else {
            document.getElementById('f01_macro_act').value = $scope.datos.f01_macro_act;
            $scope.datos.f01_macro_act = data.f01_macro_act;
            $scope.datos.f01_zona_act = data.f01_zona_act;
            $scope.distritoZonas($scope.datos.f01_macro_act);
        };
        if (datos.f01_id_actividad_economica) {
            $scope.datosAnterioresNatural(datos.f01_id_actividad_economica);
        };
        if ((data.INT_AC_latitud == 'undefined' && data.INT_AC_longitud == 'undefined') || (data.INT_AC_latitud == undefined && data.INT_AC_longitud == undefined) || (data.INT_AC_latitud == '' && data.INT_AC_longitud == '')) {} else {};
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada_sierra);
        //VERIFICAR CATEGORIA DESARROLLADA
        var categoriaDescrip = ((typeof(data.f01_categoria_descrip) == 'undefined' || data.f01_categoria_descrip == null) ? '' : data.f01_categoria_descrip);
        if (categoriaDescrip == '') {
            $scope.sActividadDesarrollada = false;
        }
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc = ((typeof(data.f01_categoria_agrupada_sierra) == 'undefined' || data.f01_categoria_agrupada_sierra == null) ? '' : data.f01_categoria_agrupada_sierra);
        if (categoriaAgrupadaDesc != '') {
            $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
        }
        if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') {
            $scope.sCategoria = false;
            $scope.smultiservicios = true;
            $scope.datos.f01_categoria_descrip = data.f01_categoria;
        } else {
            $scope.sCategoria = true;
            $scope.smultiservicios = false;
        }
        /*REQUISITOS2018*/
        if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else {
            if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') { //verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            } else {
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequisitosForm(data);
        if (data.f01_tip_via_act == '' || data.f01_tip_via_act == undefined || data.f01_tip_via_act == 'undefined') {} else {
            $scope.cargarNombVia(data.f01_tip_via_act, data.f01_zona_act);
        };
        if (data.f01_tipo_lic_sierra == '12' || data.f01_tipo_lic_sierra == 12) {
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
        } else {
            $rootScope.mostrarzonasegura = false;
        };
        if (data.licenciamulAnterior) {
            if (data.licenciamulAnterior.length > 0) {
                $scope.sinmultiservicios = false;
                $scope.conmultiservicios = true;
            } else {
                $scope.sinmultiservicios = true;
                $scope.conmultiservicios = false;
            };
        }
        //MOSTRAR VIAE
        if (data.rdTipoTramite1 == 'NUEVO') {
            $scope.licenciaToogle4 = true;
            if (data.docAdPublicidad) {
                if (data.docAdPublicidad.length > 0) {
                    $scope.docPubNuevo = data.docAdPublicidad;
                    $scope.pos = data.docAdPublicidad.length;
                }
            }
        } else {
            $scope.licenciaToogle4 = false;
            if (data.rdTipoTramite1 == 'RENOVACION') {} else {
                $scope.docPubNuevo = [];
                $scope.fileAdjuntosPublicidad = {};
                $scope.pos = 0;
            };
        }
        if (data.pago_adelantado == true) {
            $scope.IsVisible = true;
            $scope.datos.montoDeuda = data.montoDeuda;
            $scope.datos.listDeudas = data.listDeudas;
            $scope.datos.pago_adelantado = true;
            $scope.tblDeudas.reload();
        } else {
            $scope.IsVisible = false;
            $scope.datos.pago_adelantado = false;
            $scope.datos.montoDeuda = [];
        };
        $scope.datos.f01_macro_act = data.f01_macro_act;
        $scope.datos.f01_categoria_descrip = data.f01_categoria_descrip;
        //EXTRAYENDO EXPEDIDO
        if (typeof($scope.datos.INT_EXP) != 'undefined') {
            var ideExpedido = $scope.datos.INT_EXP;
            var tipoExpedido = [
                { name: 'LA PAZ', value: 'LPZ', id: '1' },
                { name: 'ORURO', value: 'ORU', id: '2' },
                { name: 'POTOSI', value: 'PTS', id: '3' },
                { name: 'COCHABAMBA', value: 'CBB', id: '4' },
                { name: 'TARIJA', value: 'TJA', id: '5' },
                { name: 'CHUQUISACA', value: 'CHQ', id: '6' },
                { name: 'SANTA CRUZ', value: 'SCZ', id: '7' },
                { name: 'PANDO', value: 'PND', id: '8' },
                { name: 'BENI', value: 'BNI', id: '9' },
                { name: 'EXTRANJERO', value: 'EXT', id: '10' }
            ];
            angular.forEach(tipoExpedido, function(value, key) {
                if (value.id == ideExpedido) {
                    $scope.datos.INT_EXP = value.value;
                }
            });
        }
        if (data.listDeudasPendientes) {
            $scope.divDeudasPendientes = true;
            if (data.urlFum_duodecimas) {
                $scope.btnFUM = true;
            } else {
                $scope.btnFUM = false;
            };
        } else {
            $scope.divDeudasPendientes = false;
        };
        $scope.datos.INT_AC_NOMBRE_VIA = data.INT_AC_NOMBRE_VIA;
        $scope.obtenerHora();
        $scope.obtenerFecha();
    });
    //fecha del servidor
    $scope.obtenerFecha = function() {
        var sfecha = "";
        try {
            var fechaactualn = new fechaserver();
            fechaactualn.obtfechahora(function(resultado) {
                sfecha = JSON.parse(resultado).success.fecha;
            });

            var sfechafinal = "";
            if (sfecha != null && sfecha != "") {
                var snuevafecha = "";
                var nrof = 0;
                try {
                    nrof = sfecha.split("/").length;
                } catch (e) {}
                if (nrof > 1) {
                    var dateString = sfecha;
                    var dateParts = sfecha.split("/");
                    snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // month is 0-based
                } else {
                    snuevafecha = new Date(sfecha);
                }
                var messnuevafecha = "";
                var diasnuevafecha = "";
                if (snuevafecha != 'Invalid Date') {
                    messnuevafecha = snuevafecha.getMonth() + 1;
                    messnuevafecha = (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                    if (snuevafecha.getDate() < 10) {
                        diasnuevafecha = "0" + (snuevafecha.getDate());
                    } else {
                        diasnuevafecha = snuevafecha.getDate();
                    }
                    sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
                    $scope.anioserver = snuevafecha.getFullYear();
                }
            } else {
                sfechafinal = sfecha;
            }
            $scope.fechafinalserver = sfechafinal;
            return sfechafinal;
        } catch (e) {
            $.unblockUI();
        }
    };

    $scope.obtenerHora = function() {
        var sfecha = "";
        var fechaactualh = new fechaserver();
        fechaactualh.obtfechahora(function(resultado) {
            sfecha = JSON.parse(resultado).success.fecha;
        });
        var sfechafinal = "";
        if (sfecha != null && sfecha != "") {
            snuevafecha = new Date(sfecha);
            var shora = "";
            var sminuto = "";
            var ssegundo = "";
            shora = snuevafecha.getHours();
            sminuto = snuevafecha.getMinutes();
            ssegundo = snuevafecha.getSeconds();
            sfechafinal = shora + ":" + sminuto + ":" + ssegundo;
        } else {
            sfechafinal = sfecha;
        }
        return sfechafinal;
    };

    $scope.cambioToggle1 = function(dato) {
        $scope.lssubcategoria();
        if (dato == "NUEVO") {
            $scope.licenciaToogle4 = true;
        } else {
            $scope.licenciaToogle4 = false;
        }
    }

    // =========================================FIN DE LA PARTE DE LA VIA===================================//
    //DOCUMENTOS ADJUNTOS OBLIGATORIOS
    var clsIniciarFechaObligatorio = $rootScope.$on('inicializarFechaOblitatorio', function(event, data) {
        var archivosAdjuntos = ((typeof(data.ARCHIVOS_MULTIPLES) == 'undefined') ? "" : data.ARCHIVOS_MULTIPLES);
        if (archivosAdjuntos.length > 0) {
            $scope.adjuntoObligatorio = false;
            $scope.adjuntoCssObligatorio = "border-style: solid; border-width: 1px; border-color: #577C27;";
        } else {
            $scope.adjuntoObligatorio = true;
            $scope.adjuntoCssObligatorio = "border-style: solid; border-width: 1px; border-color: #FF4040;";
        }
    });

    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data) {
        $scope.btnEnviarForm = false;
        if (data) {
            if (data == 'G') {
                $scope.btnEnviarFormLinea = false;
            } else if (data == 'C') {
                $scope.btnEnviarFormLinea = true;
            }
        }
    });

    $scope.$on('$destroy', function() {
        setTimeout(function() {
            clsValidarBtnEnviar();
            clsIniciarCamposInternet();
            clsIniciarGrillaAE();
            clsIniciaBtnHabilitar();
            clsIniciarHtmlForm();
        }, 2000);
    });

    $scope.datosAnterioresNatural = function(datos) {
        $scope.datosMod = datos;
        var paramidAE = '{"id_actividad_economica":' + datos + '}';
        var envioIdAe = new reglasnegocioSierra();
        envioIdAe.identificador = 'VALLE_PRUEBA-SGEN-3145';
        envioIdAe.parametros = paramidAE;
        envioIdAe.llamarregla_sierra(function(responsedatosAE) {
            var respuestaDatos = JSON.parse(responsedatosAE);
            var respuestaDatosPrimerNivel = respuestaDatos[0].sp_obtener_actividad_economica;
            var datosActividadEconomica = JSON.parse(respuestaDatosPrimerNivel);
            var datosAESdoNivel = datosActividadEconomica.datosAE;
            $scope.datosAnt = datosAESdoNivel;
            $scope.datosAntPub = datosActividadEconomica.datosVIAE;
            var respuestaVIAE = datosActividadEconomica.datosVIAE;
            if (JSON.stringify(respuestaVIAE[0]) == '{}' || JSON.stringify(respuestaVIAE[0]) == '[{}]') {
                $scope.datos.publicidadAntiguo_grilla = [];
            } else {
                $scope.datos.publicidadAntiguo = respuestaVIAE;
                $scope.PlubliAntiguo_Grilla(respuestaVIAE);
            };
        });
    };

    $scope.PlubliAntiguo_Grilla = function(dato) {
        $scope.publia_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|descripcionTipoLetrero|caracteristica|descripcion|cara|alto|ancho|superficie|INT_CATE|", "titulos": "ID|Tipo de Letrero|Caracteristica|Descripción|Cara|Alto|Ancho|Superficie|Categoria", "impresiones": "true|true|true|true|true|true|true|true|false" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.publia_grilla.push({
                nroElem: j + 1,
                descripcionTipoLetrero: dato[j].descripciontipoletrero,
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
        var jsonString = '[' + (encabezado) + ']';
        angular.forEach($scope.publia_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.publicidadAntiguo_grilla = encabezado;
    }

    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual = "";
    $scope.nroOrdenActividiadEconomicaActual = "";
    $scope.idContribuyenteAEActual = "";

    $scope.selActividadEconomica = function(tramite) {
        var aniotram = "";
        var fechaAct = tramite.fecha_vencimiento_licencia.split('/');
        if (fechaAct.length > 1) {
            var fechaVenLic = fechaAct[2] + "-" + fechaAct[1] + "-" + fechaAct[0];
            var fechaCastR = new Date(fechaVenLic);
            aniotram = fechaCastR.getFullYear();
        } else {
            var fechaVenLic = new Date(tramite.fecha_vencimiento_licencia);
            aniotram = fechaVenLic.getFullYear();
        };
        $scope.datos.publicidad = '';
        $scope.publicid = '';
        $scope.totalD = 0;
        $scope.datos.nro_ges = '';
        $scope.datos.listDeudas = [];
        var codhojaruta = "";
        var datosLotus = "";
        $scope.datos.deudasPendiente = '';
        $scope.datos.listDeudasPendientes = '';
        $scope.divDeudasPendientes = false;
        if (tramite.estado == 'baja') {
            swal('', "Actividad Económica dada de BAJA !!!", 'warning');
        } else {
            if (tramite.estado == 'pre_baja') {
                swal('', "Actividad Económica en PRE BAJA !!!", 'warning');
            } else {
                if (aniotram <= $scope.anioserver) {
                    $scope.datosAnterioresNatural(tramite.idactividad);
                    $scope.idActividiadEconomicaActual = tramite.idactividad;
                    $scope.datos.f01_id_actividad_economica = tramite.idactividad;
                    $scope.sIdAeGrilla = tramite.idactividad;
                    var tipoPersona = sessionService.get('TIPO_PERSONA');
                    if (tipoPersona == "NATURAL") {
                        tipoPersona = "N";
                    }
                    var paramidAE = '{"id_actividad_economica":' + tramite.idactividad + '}';
                    var envioIdAe = new reglasnegocioSierra();
                    envioIdAe.identificador = 'VALLE_PRUEBA-SGEN-3145';
                    envioIdAe.parametros = paramidAE;
                    envioIdAe.llamarregla_sierra(function(responsedatosAE) {
                        var respuestaDatos = JSON.parse(responsedatosAE);
                        var respuestaDatosPrimerNivel = respuestaDatos[0].sp_obtener_actividad_economica;
                        var datosActividadEconomica = JSON.parse(respuestaDatosPrimerNivel);
                        //if (typeof datosActividadEconomica.datosAE == null || JSON.stringify(datosActividadEconomica.datosAE[0]) == '{}' || JSON.stringify(datosActividadEconomica.datosAE[0]) == '[{}]') {
                        if (datosActividadEconomica.datosAE == null) {
                            swal('', "Datos no Encontrados !!!", 'warning');
                        } else {
                            codhojaruta = datosActividadEconomica.datosAE.hojaruta;
                            var datosPublicidad = datosActividadEconomica.datosVIAE;
                            var datosAESdoNivel = datosActividadEconomica.datosAE;
                            $scope.datos.f01_nro_orden = datosAESdoNivel.numeroorden;
                            $scope.idContribuyenteAEActual = datosAESdoNivel.idactividadeconomica;
                            $scope.datos.f01_id_actividad_economica_temp = datosAESdoNivel.idactividadeconomica_ant;
                            $scope.datos.f01_id_contribuyente = datosAESdoNivel.idContribuyente;
                            $scope.datos.f01_id_contribuyente_temp = datosAESdoNivel.idContribuyente_ant;
                            var hinicio = '';
                            var hfinal = '';
                            if (datosAESdoNivel.horarioatencion == undefined || datosAESdoNivel.horarioatencion == 'undefined' || datosAESdoNivel.horarioatencion == null || datosAESdoNivel.horarioatencion == '') {} else {
                                hinicio = ((typeof(datosAESdoNivel.horarioatencion) == 'undefined' || datosAESdoNivel.horarioatencion == null) ? "" : datosAESdoNivel.horarioatencion.toUpperCase());
                                hfinal = ((typeof(datosAESdoNivel.horarioatencion) == 'undefined' || datosAESdoNivel.horarioatencion == null) ? "" : datosAESdoNivel.horarioatencion.toUpperCase());
                                hinicio = hinicio.split('-')[0];
                                hfinal = hfinal.split('-')[1];
                            };
                            $scope.datos.f01_de_hor = hinicio;
                            $scope.datos.f01_a_hor = hfinal;
                            var smacrodes = "";
                            var smacro = "MACRODISTRITO";
                            var szona = "DISTRITO";
                            $scope.datos.f01_raz_soc = datosAESdoNivel.denominacion.replace(/"/, "");
                            $scope.datos.f01_sup = datosAESdoNivel.superficie;
                            $scope.datos.f01_cap_aprox = datosAESdoNivel.capacidad;
                            $scope.calcularCapacidadauto($scope.datos.f01_sup);
                            if (datosAESdoNivel.idmacrodistrito == 2 || datosAESdoNivel.idmacrodistrito == '2')
                                smacrodes = smacro + " " + datosAESdoNivel.idmacrodistrito + " MAXIMILIANO PAREDES";
                            else
                                smacrodes = datosAESdoNivel.macrodistrito;
                            $scope.getEstablecimiento(datosAESdoNivel.establecimiento);
                            $scope.datos.f01_tip_act = datosAESdoNivel.tipoactividad;
                            if (datosAESdoNivel.tipoactividad == 'MA' || datosAESdoNivel.tipoactividad == 'MATRI') {
                                $scope.datos.f01_tip_act_dec = 'MATRIZ';
                                $scope.datos.f01_tip_act = 'MA';
                            }
                            if (datosAESdoNivel.tipoactividad == 'SU' || datosAESdoNivel.tipoactividad == 'SUCUR') {
                                $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                                $scope.datos.f01_tip_act = 'SU';
                            }
                            $scope.datos.f01_num_pmc = datosAESdoNivel.padron;
                            $scope.datos.f01_raz_soc = datosAESdoNivel.denominacion;
                            $scope.datos.f01_sup = datosAESdoNivel.superficie;
                            $scope.datos.f01_de_hor = hinicio;
                            $scope.datos.f01_a_hor = hfinal;
                            $scope.datos.f01_nro_actividad = datosAESdoNivel.numeroactividad;
                            $scope.datos.f01_productosElaborados = datosAESdoNivel.productoselaborados.replace(/"/, "");
                            $scope.datos.f01_actividadesSecundarias = datosAESdoNivel.actividadessecundarias;
                            $scope.datos.f01_categoria_descrip = datosAESdoNivel.actividad_desarrollada343;
                            $scope.obtenerActDes(datosAESdoNivel.idcategoria);
                            $scope.distritoZonas(datosAESdoNivel.idmacrodistrito);
                            $scope.datos.INT_AC_MACRO_ID = datosAESdoNivel.idmacrodistrito;
                            $scope.datos.f01_macro_act = datosAESdoNivel.idmacrodistrito;
                            $scope.datos.f01_macro_act_descrip = smacrodes;
                            $scope.datos.INT_AC_DISTRITO = datosAESdoNivel.iddistrito_actividadeconomica;
                            $scope.datos.f01_dist_act = datosAESdoNivel.iddistrito_actividadeconomica;
                            $scope.datos.INT_AC_ID_ZONA = datosAESdoNivel.id_zona_actividadeconomica;
                            $scope.datos.INT_ID_ZONA = datosAESdoNivel.id_zona_actividadeconomica;
                            $scope.datos.f01_zona_act = datosAESdoNivel.id_zona_actividadeconomica;
                            $scope.datos.f01_zona_act_descrip = datosAESdoNivel.zona;
                            $scope.datos.f01_tip_via_act = datosAESdoNivel.tipovia;
                            if (datosAESdoNivel.via == 'undefined' || datosAESdoNivel.via == undefined || datosAESdoNivel.via == null || datosAESdoNivel.via == '') {
                                $scope.datos.f01_num_act = datosAESdoNivel.nueva_via;
                            } else {
                                $scope.datos.f01_num_act = datosAESdoNivel.via;
                            };
                            $scope.datos.f01_idCodigoZona = datosAESdoNivel.idcodigozona;
                            var listarVias = [$scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act)];
                            $q.all(listarVias).then(function(resp) {
                                $scope.datos.f01_num_act_id = parseInt(datosAESdoNivel.idviaae);
                                $scope.cargarNombViaTxt($scope.datos.f01_num_act);
                                if (datosAESdoNivel.idviaae == 0 || datosAESdoNivel.idviaae == '0')
                                    $scope.datos.f01_num_act_n = datosAESdoNivel.nueva_via.replace(/"/, "");
                            });
                            if (datosAESdoNivel.edificio == 'undefined' || datosAESdoNivel.bloque == 'undefined' || datosAESdoNivel.piso == 'undefined' || datosAESdoNivel.departamento == 'undefined' || datosAESdoNivel.telefono == 'undefined') {
                                datosAESdoNivel.edificio = '';
                                datosAESdoNivel.bloque = '';
                                datosAESdoNivel.piso = '';
                                datosAESdoNivel.departamento = '';
                                datosAESdoNivel.telefono = '';
                            }
                            $scope.datos.f01_num_act1 = datosAESdoNivel.numero.replace(/"/, "");
                            $scope.datos.f01_edificio_act = datosAESdoNivel.edificio;
                            $scope.datos.f01_bloque_act = datosAESdoNivel.bloque;
                            $scope.datos.f01_piso_act = datosAESdoNivel.piso;
                            $scope.datos.f01_dpto_of_loc = datosAESdoNivel.departamento;
                            $scope.datos.f01_tel_act1 = datosAESdoNivel.telefono;
                            $scope.datos.f01_casilla = datosAESdoNivel.direcciondetalladaae.replace(/"/, "");
                            $scope.datos.f01_factor = datosAESdoNivel.tipotrayecto;
                            $scope.datos.f01_tipo_lic_ant = datosAESdoNivel.licencia_descripcion;
                            $scope.datos.f01_categoria_agrupada_ant = datosAESdoNivel.categoria_descripcion;
                            $scope.datos.f01_categoria_descrip_ant = datosAESdoNivel.actividad_desarrollada343;
                            $scope.datos.f01_vencimientoLicencia = datosAESdoNivel.fechavencimientolicencia;
                            console.log('vencimiento    ', $scope.datos.f01_vencimientoLicencia);
                            $scope.datos.INT_TRAMITE_RENOVA = tramite.idactividad;
                            $scope.botoneslic = true;
                            $scope.desabilitado = false;
                            if (codhojaruta.substring(0, 6) == 'EMI-AE' || codhojaruta.substring(0, 6) == 'REN-LF' || codhojaruta.substring(0, 6) == 'AER-EL' || codhojaruta.substring(0, 7) == 'MOD_MOD' || codhojaruta.substring(0, 8) == 'LICEN-AE' || codhojaruta.substring(0, 5) == 'EM-LF' || codhojaruta.substring(0, 5) == 'RE-LF') {
                                var dataLotus = $scope.getDatosLotus(datosAESdoNivel.idactividadeconomica_ant, codhojaruta);
                                dataLotus.then(function(respuesta) {
                                    console.log('respuesta    ', respuesta);
                                    datosLotus = respuesta.success.data[0].datos;
                                    if ((datosLotus.INT_AC_latitud == 'undefined' && datosLotus.INT_AC_longitud == 'undefined') || (datosLotus.INT_AC_latitud == null && datosLotus.INT_AC_longitud == null)) {
                                        $scope.croquis = true;
                                        $scope.datos.INT_AC_latitud = '';
                                        $scope.datos.INT_AC_longitud = '';
                                    } else {
                                        $scope.croquis = null;
                                        $scope.datos.INT_AC_latitud = datosLotus.INT_AC_latitud;
                                        $scope.datos.INT_AC_longitud = datosLotus.INT_AC_longitud;
                                    };
                                    $scope.open_mapa_ae($scope.datos.INT_AC_latitud, $scope.datos.INT_AC_longitud);
                                    if (datosLotus.f01_tipo_lic == '18' || datosLotus.f01_tipo_lic == 18) {
                                        $rootScope.mostrarzonasegura = true;
                                        if (datosLotus.f01_zona_segura == 'SI')
                                            $scope.datos.chkzonasegura = 'ZONASEGURA';
                                        else
                                            $scope.datos.chkzonasegura = 'NOZONASEGURA';
                                    } else {
                                        $scope.datos.chkzonasegura = null;
                                        $rootScope.mostrarzonasegura = false;
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
                                            if ($scope.datos.licenciamulAnterior[k].f01_tipo_licmid == '12' || $scope.datos.licenciamulAnterior[k].f01_tipo_licmid == 12)
                                                swma = 1;
                                            else
                                                swma = 0;
                                        };
                                        if (swma == 1) {
                                            $rootScope.mostrarzonasegura = true;
                                            if (datosLotus.f01_zona_segura == 'SI')
                                                $scope.datos.chkzonasegura = 'ZONASEGURA';
                                            else
                                                $scope.datos.chkzonasegura = 'NOZONASEGURA';
                                        } else {
                                            $rootScope.mostrarzonasegura = false;
                                        }
                                    } else {
                                        $scope.sinmultiservicios = true;
                                        $scope.conmultiservicios = false;
                                    };
                                    if (datosLotus.File_Adjunto == 'undefined' || datosLotus.File_Adjunto == null) {
                                        $scope.reqdoc = true;
                                        $scope.docsAdjuntoAntiguo = [];
                                        $scope.datos.datosdocanterior = [];
                                    } else {
                                        $scope.reqdoc = null;
                                        $scope.docsAdjuntoAntiguo = datosLotus.File_Adjunto;
                                        $scope.datos.datosdocanterior = new Object();
                                        for (var i = 0; i < $scope.docsAdjuntoAntiguo.length; i++) {
                                            if ($scope.docsAdjuntoAntiguo[i] == null || $scope.docsAdjuntoAntiguo[i] == 'undefined') {} else {
                                                var narchivo = $scope.docsAdjuntoAntiguo[i].url.split('?');
                                                var achinom = narchivo[0].split('/');
                                                var dimar = achinom.length;
                                                var datosdocant = {
                                                    "titulo": $scope.docsAdjuntoAntiguo[i].nombre,
                                                    "nombreAcrh": achinom[dimar - 1],
                                                    "url": $scope.docsAdjuntoAntiguo[i].url
                                                };
                                                $scope.datos.datosdocanterior[i] = datosdocant;
                                            };
                                        };
                                    };
                                });
                            }
                        }
                        if (JSON.stringify(datosPublicidad[0]) == '{}' || JSON.stringify(datosPublicidad[0]) == '[{}]' || JSON.stringify(datosPublicidad) == '[]') {
                            $scope.datos.rdTipoTramite1 = 'RENOVACION';
                            $scope.datos.swpublicidad = 'SP';
                            $scope.licenciaToogle4 = false;
                            $scope.pubMensaje = true;
                        } else {
                            $scope.datos.rdTipoTramite1 = 'NUEVO';
                            $scope.listpub = [];
                            $scope.pubMensaje = false;
                            for (var i = 0; i < datosPublicidad.length; i++) {
                                var lstpublicidad = new Object();
                                console.log('url   ', datosPublicidad[i].url_publicidad.url);
                                lstpublicidad.idPublicidad = datosPublicidad[i].idpublicidad;
                                lstpublicidad.idPublicidad_temp = datosPublicidad[i].idpublicidad_ant;
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
                        var verificarDuodecima = [$scope.verificarDeudaDuodecima(tramite.idactividad)];
                        $q.all(verificarDuodecima).then(function(respDou) {
                            if (respDou[0] == '[{}]' || respDou[0] == '"[{}]"') {
                                $scope.generarDeudasPendientes();
                            } else {
                                var lstDeudas = JSON.parse(respDou);
                                datoObjectDeudasPen = [];
                                var lstDeudasP = JSON.parse(lstDeudas[0].resultado);
                                if (lstDeudasP.deuda_estado == 'pagado' && lstDeudasP.deuda_tipo_inspag == 'DUODECIMA') {
                                    $scope.mensajeVerificaPago = 'ESTIMADO CIUDADANO, UD. NO CUENTA CON DEUDAS. PUEDE SOLICITAR LA OPCIÓN DE PAGO ADELANTADO.';
                                    $scope.mostrarMsgPagoTrue = false;
                                    $scope.mostrarMsgPagoFalse = true;
                                    $scope.divDeudasPendientes = false;
                                    $scope.datos.pago_duodecimas = 'SI';
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                } else {
                                    $scope.mensajeVerificaPago = 'ESTIMADO CIUDADANO SU(S) DEUDA(S) AÚN NO FUERON PAGADAS.';
                                    $scope.datos.deudasPendiente = lstDeudas;
                                    $scope.mostrarMsgPagoTrue = true;
                                    $scope.mostrarMsgPagoFalse = false;
                                    $scope.divDeudasPendientes = true;
                                    $scope.datos.pago_duodecimas = 'NO';
                                    for (var i = 0; i < lstDeudas.length; i++) {
                                        var dataDeudas = JSON.parse(lstDeudas[i].resultado);
                                        datoObjectDP = new Object();
                                        datoObjectDP.nro = (i + 1);
                                        datoObjectDP.deuda_id = dataDeudas.deuda_actividad_id;
                                        datoObjectDP.gestion = dataDeudas.deuda_data.gestion;
                                        datoObjectDP.monto_ae = dataDeudas.deuda_data.montoDeterminado_ae_bs;
                                        datoObjectDP.monto_viae = dataDeudas.deuda_data.viaeBs;
                                        datoObjectDP.descuento = dataDeudas.deuda_data.porcentaje_desc_pago_adelantado;
                                        datoObjectDP.monto_total = dataDeudas.deuda_data.deuda_tributaria_bs;
                                        datoObjectDP.monto_descuento_bs_padelantado = dataDeudas.deuda_data.monto_descuento_bs_padelantado;
                                        datoObjectDP.monto_total_bs_padelantado = dataDeudas.deuda_data.monto_total_bs_padelantado;
                                        datoObjectDeudasPen[i] = datoObjectDP;
                                        $scope.datos.fecha_duodecima = dataDeudas.deuda_data.fecha_calculo_deuda;
                                    };
                                    $scope.divDeudasPendientes = true;
                                    $scope.datos.listDeudasPendientes = datoObjectDeudasPen;
                                };
                            };
                        });
                        $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    });
                } else {
                    swal('', "Actividad Economica Vigente!!!", 'warning');
                }
            };
        };
    };

    $scope.getEstablecimiento = function(datoEstab) {
        switch (datoEstab) {
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

    $scope.getDatosLotus = function(idadcteco, hojar) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try {
            var datosLotus = new getDatosAELotus();
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta) {
                $scope.resultadoLotus = JSON.parse(respuesta);
                if ($scope.resultadoLotus.f01_tipo_lic == '32' || $scope.resultadoLotus.f01_tipo_lic == 32) {
                    $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                }
                $q.all($scope.resultadoLotus).then(function(data) {
                    deferred.resolve($scope.resultadoLotus);
                })
            });
        } catch (e) {
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function(data) {
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;
    }

    $scope.validarActividadEconomica = function() {
        $.blockUI();
        var validarpromesas = [$scope.listarAE()];
        $q.all(validarpromesas).then(function(resp) { //AE - Validar Envio Licencia
            $scope.mostrarMsgActividadTrue = false;
            $scope.mostrarMsgActividadFalse = false;
            $scope.mostrarMsgNuevaActividad = false;
        });
    };

    $scope.listarAE = function() {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.sIdAeGrilla = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var sNumeroRegistros = dataGenesis;
        if (sNumeroRegistros) {
            $scope.datos.rdTipoTramite = "RENOVACION";
            var tipoPersona = sessionService.get('TIPO_PERSONA');
            var idContribuyente = dataGenesis.contribuyente_id;
            var lstActEco = new reglasnegocioSierra();
            lstActEco.identificador = 'VALLE_PRUEBA-SGEN-3150';
            lstActEco.parametros = '{"id_contribuyente":' + idContribuyente + '}';
            lstActEco.llamarregla_sierra(function(responseActEco) {
                $.unblockUI();
                if (responseActEco == '"{}"' || responseActEco == '"[{}]"' || responseActEco == '"[{ }]"') {
                    swal('', "El contribuyente no cuenta con Actividades Económicas.", 'warning');
                } else {
                    var respLstActEco = JSON.parse(responseActEco);
                    if (respLstActEco.length > 0) {
                        var cont = 0;
                        var datosListaAE = [];
                        for (var i = 0; i < respLstActEco.length; i++) {
                            if (respLstActEco[i].estado == 'baja') {} else {
                                objAE = new Object();
                                objAE.ant_idactividad = respLstActEco[i].ant_idactividad;
                                objAE.descripcion = respLstActEco[i].descripcion;
                                objAE.deudaactividad = respLstActEco[i].deudaactividad;
                                objAE.direccion = respLstActEco[i].direccion;
                                objAE.estado = respLstActEco[i].estado;
                                objAE.fecha_emision_licencia = respLstActEco[i].fecha_emision_licencia;
                                objAE.fecha_vencimiento_licencia = respLstActEco[i].fecha_vencimiento_licencia;
                                objAE.fechainicio = respLstActEco[i].fechainicio;
                                objAE.gestiones = respLstActEco[i].gestiones;
                                objAE.idactividad = respLstActEco[i].idactividad;
                                objAE.licencia_estado = respLstActEco[i].licencia_estado;
                                objAE.nro = respLstActEco[i].nro;
                                objAE.plan_pagos_boolean = respLstActEco[i].plan_pagos_boolean;
                                objAE.plan_pagos_detalles = respLstActEco[i].plan_pagos_detalles;
                                datosListaAE[cont] = objAE;
                                cont++;
                            };
                        };
                        $scope.formDatosAE = true;
                        $scope.mostrarMsgActividadTrue = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = datosListaAE;
                        var data = datosListaAE;
                        deferred.resolve(respLstActEco);
                        $scope.tblTramites.reload();
                    } else {
                        $scope.mostrarMsgActividadTrue = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE = false;
                    };
                    var sformguardado = $scope.datos.INT_FORM_ALMACENADO;
                    if (typeof sformguardado == 'undefined' || sformguardado != 'G') {
                        $scope.botoneslic = false;
                        $scope.desabilitado = true;
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que corresponda.", 'warning');
                    } else {
                        $scope.botoneslic = true;
                        $scope.desabilitado = false;
                    }
                };
            });
        } else {
            $scope.datos.rdTipoTramite = "NUEVO";
            document.getElementById("rdTipoTramiteN").checked = true;
            $scope.txtMsgDataRenovacion = "Estimado Ciudadano no tiene actividad económica registrada.";
            $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
            $scope.mostrarMsgActividadTrue = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE = false;
            if ($scope.txtMsgConexionGen != '') {
                $scope.txtMsgDataRenovacion = $scope.txtMsgConexionGen;
            } else {
                $scope.datos.rdTipoTramite = "NUEVO";
                $scope.txtMsgDataRenovacion = "Estimado Ciudadano no tiene actividad económica registrada.";
                $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
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

    ////////////////REQUISITOS 2018/////////
    $scope.aDocObligarios = new Array();
    $scope.cambiarFile = function(obj, valor) {
        $scope.datos[obj.name] = valor;
        setTimeout(function() {
            $rootScope.leyenda1 = obj.name;
            //$scope.getRequisitosAdjuntos();
        }, 500);
        /*REQUISITOS2018*/
        $scope.subirRequisitos(obj, valor);
    };

    /*REQUISITOS2018*/
    $scope.subirRequisitos = function(sobj, svalor) {
        var rMisDocs = new Array();
        var idFiles = new Array();
        if (sobj.files[0]) {
            rMisDocs.push(sobj.files[0]);
            var idFile = sobj.name;
            var tam = idFile.length;
            idFile = parseInt(idFile.substring(10, tam));
            idFiles.push(idFile);
            $scope.almacenarRequisitos(rMisDocs, idFiles);
            $scope.adicionarArrayDeRequisitos(sobj, idFile);
        }
    };

    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.fileAdjuntosPublicidad = {};
    $scope.fileAdjuntosAE = {};

    $scope.adicionarArrayDeRequisitos = function(aArch, idFile) {
            var descDoc = "";
            var fechaNueva = "";
            var idp = 4;
            var fechaserver = new fechaHoraServer();
            fechaserver.fechahora(function(resp) {
                var sfecha = JSON.parse(resp);
                var fechaServ = (sfecha.success.fecha).split(' ');
                var fecha_ = fechaServ[0].split('-');
                var hora_ = fechaServ[1].split(':');
                fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
            });
            angular.forEach($scope.docArray, function(doc, pos) {
                if (doc.resid == idFile) {
                    descDoc = doc.desNom;
                    idp = doc.idnro;
                }
            })
            if ($scope.docPubNuevo.length > 0 && ipd == 4) {
                angular.forEach($scope.docPubNuevo, function(doc, pos) {
                    if (doc.idP + '' + doc.resid == idFile) {
                        descDoc = doc.desNom;
                    }
                })
            }
            var imagenNueva = aArch.files[0].name.split('.');
            var tam = aArch.files[0];
            var nombreFileN = descDoc + '_' + fechaNueva + '.' + imagenNueva[1];
            $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
            var sDirTramite = sessionService.get('IDTRAMITE');
            $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
            if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
                if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                    var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile) {
                        var imagenFile = respuestaFile.name.split('.');
                        var tipoFile = imagenFile[1];
                        nombreFileN = descDoc + '_' + fechaNueva + '.' + tipoFile;
                    });
                }
            }
            var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
            var adatafile = {};
            var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_" + aArch.id).text() + '" }';
            $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
            $scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
            if (idp == 4) {
                var uploadUrlP = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                var myJSONP = '{ "url":"' + uploadUrlP + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_" + aArch.id).text() + '" }';
                $scope.fileAdjuntosPublicidad[aArch.name] = JSON.parse(myJSONP);
                $scope.clonarRequisitosPublicidad($scope.fileAdjuntosPublicidad);
            } else {
                var myJSONAE = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_" + aArch.id).text() + '"}';
                $scope.fileAdjuntosAE[aArch.name] = JSON.parse(myJSONAE);
                $scope.clonarRequisitosDocumentalesAE($scope.fileAdjuntosAE);
            };
        }
        /*REQUISITOS2018*/
    $scope.clonarRequisitosDocumentales = function(aRequArchivos) {
        var i = 0;
        $scope.File_Adjunto = {};
        datoObjectFiles = [];
        angular.forEach(aRequArchivos, function(archivo, key) {
            datoObjectFiles[i] = archivo;
            i = i + 1;
        });
        $scope.datos.fileArchivosAd = datoObjectFiles;
    }

    $scope.clonarRequisitosPublicidad = function(aRequArchivosP) {
        var i = 0;
        $scope.File_Publicidad = {};
        datoObjectFilesP = [];
        angular.forEach(aRequArchivosP, function(archivo, key) {
            datoObjectFilesP[i] = archivo;
            i = i + 1;
        });
        $scope.datos.fileArchivosPublicidad = datoObjectFilesP;
    }

    $scope.clonarRequisitosDocumentalesAE = function(aRequArchivosAE) {
        var k = 0;
        datoObjectFilesAE = [];
        angular.forEach(aRequArchivosAE, function(archivo, key) {
            datoObjectFilesAE[k] = archivo;
            k = k + 1;
        });
        $scope.datos.fileArchivosAE = datoObjectFilesAE;
    }

    $scope.ultimoArrayAdjunto = function() {
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
        $rootScope.FileAdjuntos = $scope.datos.FILE_CI.concat($scope.datos.FILE_MAPA, $scope.datos.fileArchivosAd);
        $rootScope.File_ae = $scope.datos.fileArchivosAE.concat($scope.datos.FILE_MAPA);
    }

    $scope.almacenarRequisitos = function(aArchivos, idFiles) {
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            if (typeof(archivo) != 'undefined') {
                angular.forEach($scope.docArray, function(doc, pos) {
                    if (doc.resid == idFiles[key]) {
                        descDoc = doc.desNom;
                    }
                })
                if ($scope.docPubNuevo.length > 0) {
                    angular.forEach($scope.docPubNuevo, function(doc, pos) {
                        if (doc.idP + '' + doc.resid == idFiles[key]) {
                            descDoc = doc.desNom;
                        }
                    })
                }
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_' + fechaNueva + '.' + imagenNueva[1];
                if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile) {
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[1];
                            var nombreNuevo = descDoc + '_' + fechaNueva + '.' + tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreNuevo;
                        });
                        $.unblockUI();
                    } else {
                        if (imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else {
                            $.unblockUI();
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                } else {
                    if (archivo.size <= 500000) {
                        if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else {
                            $.unblockUI();
                            swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                    if (archivo.size > 15000000) {
                        $.unblockUI();
                        swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
                    };
                }
            } else {}
        });
    };

    /*REQUISITOS2018*/
    $scope.validarRequisitosForm = function() {
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        //INICIAR DOCUMENTOS DE IDENTIDAD
        angular.forEach($scope.docArray, function(value, key) {
            //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
            if (value.idnro == 1) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Cedula de identidad (Anverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianverso = $scope.datos.FILE_FOTOCOPIA_CI;
                if (scianverso == '' || scianverso == 'undefined' || scianverso == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = scianverso;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianverso + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 2) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Cedula de identidad (Reverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianversor = $scope.datos.FILE_FOTOCOPIA_CI_R;
                if (scianversor == '' || scianversor == 'undefined' || scianversor == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = scianversor;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianversor + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
            if (value.idnro == 3 || value.idnro == 4) {
                var sviae = $scope.datos.rdTipoTramite1;
                if (sviae == 'RENOVACION') { //sin viae
                    $scope.docArray[key].estado = false;
                } else {
                    $scope.docArray[key].estado = false;
                }
            }
            //VALIDANDO LA SUPERFICIE DE LA ACTIVIDAD ECONOMNICA
            var ssuperficie = $scope.datos.f01_sup;
            if (ssuperficie) {
                if (value.idnro == 5) {
                    if (ssuperficie <= 100) {
                        $scope.docArray[key].estado = false;
                    } else {
                        $scope.docArray[key].estado = true;
                    }
                }
            }
            //VALIDANDO LA REGLA SI LA ACTIVIDAD ECONOMICA ES PROPIA O ALQUILADA
            var sestablecimiento = $scope.datos.f01_estab_es;
            if (sestablecimiento) {
                if (value.idnro == 10) {
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
                if (value.idnro == 11) {
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
            if (szonasegura) {
                if (value.idnro == 13) {
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
                if (value.idnro == 14) {
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
                if (value.idnro == 15) {
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
            ////////////////////////FOOD TRUCK//////////////////////////////////
            if ($scope.datos.f01_categoria_descrip == 211 || $scope.datos.f01_categoria_descrip == '211') {
                if (value.idnro == 5 || value.idnro == 10 || value.idnro == 11 || value.idnro == 16 || value.idnro == 23 || value.idnro == 24 || value.idnro == 30) {
                    $scope.docArray[key].estado = false;
                }
                var vehiculoft = $scope.datos.f01_vehiculo_ft;
                if (vehiculoft) {
                    if (value.idnro == 25) {
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = true;
                                break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = false;
                                break;
                        }
                    }
                    if (value.idnro == 26) {
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                                break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                                break;
                        }
                    }
                    if (value.idnro == 27) {
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                                break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                                break;
                        }
                    }
                    if (value.idnro == 28) {
                        switch (vehiculoft) {
                            case 'VEHICULO':
                                $scope.docArray[key].estado = false;
                                break;
                            case 'REMOLQUE':
                                $scope.docArray[key].estado = true;
                                break;
                        }
                    }
                    if (value.idnro == 29) {
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
                if (value.idnro == 25 || value.idnro == 26 || value.idnro == 27 || value.idnro == 28 || value.idnro == 29 || value.idnro == 30) {
                    $scope.docArray[key].estado = false;
                }
            }
            //////////////////////////////////////////////////////////
        });
        try {
            // console.log("error en adjuntos");
        } catch (e) {}
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[0] = datoObjectFile1;
        datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
        datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
        datoObjectFiles_ci[1] = datoObjectFile2;
        $scope.datos.FILE_CI = datoObjectFiles_ci;
        if ($scope.datos.rdTipoTramite1 == 'NUEVO') {
            datoObjectFinalV = [];
            var k = 0;
            for (j = 0; j < $scope.docArray.length; j++) {
                if ($scope.docArray[j].idnro == 4) {
                    datoObjectv = new Object();
                    datoObjectv.idP = ($scope.pos + 1);
                    datoObjectv.resid = $scope.docArray[j].resid;
                    datoObjectv.idnro = $scope.docArray[j].idnro;
                    datoObjectv.resvalor = $scope.docArray[j].resvalor;
                    datoObjectv.nomcampo = $scope.docArray[j].nomcampo;
                    datoObjectv.estado = true;
                    datoObjectv.desNom = $scope.docArray[j].desNom;
                    datoObjectFinalV[k] = datoObjectv;
                    k++;
                }
            }
            $scope.docArrayPub = datoObjectFinalV;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.iniciarRequsitosDoc = function(data) {
        var validarpromesas = [$scope.iniciarRequisitosForm(data)];
        $q.all(validarpromesas).then(function(resp) { //AE - Validar Envio Licencia
            //console.log("resp: ", resp);
        });
    }

    /*REQUISITOS2018*/
    $scope.iniciarRequisitosForm = function(data) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.fileArRequisitos = {};
        $scope.fileAdjuntosPublicidad = {};
        if (data.sArrayFileArRequisitos) {
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function() {
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_" + key).val(value.campo);
                    deferred.resolve(data);
                });
                $scope.validarRequisitosForm();
            }, 3500);
        }
        if (data.sArrayFileArPublicidad) {
            $scope.fileAdjuntosPublicidad = data.sArrayFileArPublicidad;
            setTimeout(function() {
                angular.forEach(data.sArrayFileArPublicidad, function(value, key) {
                    $("#txt_" + key).val(value.campo);
                });
                $scope.validarRequisitosForm();
            }, 3500);
        }
        return deferred.promise;
    }

    $scope.archotro = false;
    $scope.archpdf = false;

    /*REQUISITOS2018*/
    $scope.getRequisitosFormulario = function(sidcategoria, stipoper) {
        if ($scope.datos) {
            var idCategoria = sidcategoria;
            var persona = 'N';
            if (typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona != null) {
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = idCategoria;
                ndCategoria.stipopersona = persona;
                ndCategoria.aelstRequisitos2018(function(res) {
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for (j = 0; j < datosRequisitosTmp.length; j++) {
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.desObligatorio = datosRequisitosTmp[j].descObligatorio;
                        datoObject.desTipo = "requerid";
                        datoObject.estado = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray = datoObjectFinal;
                    setTimeout(function() {
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018 - array*/
    $scope.lstRequisitosMultiples2018 = function(licenciamul) {
        var sconsulta = '[';
        for (i = 0; i < licenciamul.length; i++) {
            sconsulta = sconsulta + '{"id":' + licenciamul[i].f01_categoria_agrupada + "},";
        }
        sconsulta = sconsulta.substring(0, sconsulta.length - 1);
        sconsulta = sconsulta + ']';
        aidCategoria = sconsulta;
        if ($scope.datos) {
            var aidCategoria = aidCategoria;
            var persona = 'N';
            if (typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona != null) {
                var ndCategoria = new aeRequisitosDoc2018array();
                ndCategoria.asidcategoria = aidCategoria;
                ndCategoria.astipopersona = persona;
                ndCategoria.aelstRequisitos2018_array(function(res) {
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for (j = 0; j < datosRequisitosTmp.length; j++) {
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray = datoObjectFinal;
                    setTimeout(function() {
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018*/
    $scope.ejecutarFile = function(idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    // ***********************  MAPA     **************************************************************************************************************************************************
    var latitud = 0;
    var longitud = 0;

    $scope.convertToDataURLviaCanvas = function(url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
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

    $scope.subirImgBase64 = function(imagen, url, nombre) {
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
            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        blob.name = nombre;
        var resFormulario = {
            container: url,
            file_path: nombre,
            body: blob
        };
        fileUpload.uploadFileToUrl(blob, uploadUrl);
    };

    var aDocAdjuntosmapa = new Object();
    $scope.capturarImagen = function() {
            $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
            var latitud = $scope.datos.INT_AC_latitud;
            var longitud = $scope.datos.INT_AC_longitud;
            $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
            var sDirTramite = sessionService.get('IDTRAMITE');
            $scope.url = "RC_CLI/" + $scope.oidCiudadano + "/" + sDirTramite;
            $scope.archivo1 = sDirTramite + "croquisActividad.jpg";
            $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL + "/files/" + $scope.url + "/" + $scope.archivo1 + "?app_name=todoangular";
            aDocAdjuntosmapa = [];
            var datosAdjuntosmapa = {
                "nombre_archivo": $scope.archivo1,
                "tam_archivo": '0',
                "estado_archivo": "Env.",
                "opcion_archivo": "-",
                "url_archivo": $scope.datos.INT_AC_direccionImagenmapa,
                "docdatos": "Croquis de la actividad",
                "descripcion": "Croquis de la actividad",
                "titulo": "Croquis"
            };
            aDocAdjuntosmapa[0] = datosAdjuntosmapa;
            $scope.datos.ARCHIVOS_MULTIPLES_MAPA = aDocAdjuntosmapa;
            $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center=' + latitud + ',' + longitud + '&zoom=17&size=900x500&maptype=roadmap&markers=color:red|label:S|' + latitud + ',' + longitud + '&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img) {
                var Imagen = base64Img.replace(/data:image\/png;base64,/i, '');
                $scope.Imagenb = Imagen;
                $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
            });
        }
        //DATOS PUBLICIDAD ->   categoria -> tipo de letrero  ***********************************************************************************************************************************
    $scope.verSuperficie = function(p) {
        if (p == false || typeof(p) == 'undefined') {
            $scope.publi.INT_ALTO = 0;
            $scope.publi.INT_ANCHO = 0;
            $scope.especial = "mostrar";
        } else {
            $scope.especial = null;
        }
    }

    $scope.modificarPlubli = function(dato) {
        $scope.onlyy = true;
        $scope.botonn = "upd";
        $scope.publi = dato;
        $scope.publi.INT_ALTO = dato.INT_ALTO;
        $scope.publi.INT_ANCHO = dato.INT_ANCHO;
        $scope.publi.INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
        $scope.publi.INT_CARA = dato.INT_CARA;
        $scope.publi.INT_DESC = dato.INT_DESC;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.modificarpublicidad = function(dato) {
        if (dato.INT_CARA == '' || dato.INT_CARA == null ||
            dato.INT_TIPO_LETRE == '' || dato.INT_TIPO_LETRE == null ||
            dato.INT_DESC == '' || dato.INT_DESC == null || dato.INT_ALTO == '' || dato.INT_ALTO == null || dato.INT_ANCHO == '' || dato.INT_ANCHO == null) {
            swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
        } else {
            if (dato.estado == 'N') {
                $scope.publi = [];
                $scope.lssubcategoria();
                var superior = dato.INT_ALTO * dato.INT_ANCHO;
                superior = (Math.round(superior * 10) / 10) + "";
                var supe = superior.replace(",", ".");
                //superior = superior.replace(",",".");
                var palto = dato.INT_ALTO;
                var pancho = dato.INT_ANCHO;
                palto = parseFloat(palto).toFixed(2);
                palto = palto.replace(",", ",");
                pancho = parseFloat(pancho).toFixed(2);
                pancho = pancho.replace(",", ".");
                dato.superficie = superior;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            } else {
                swal({
                        title: "Modificar",
                        text: "Esta seguro de Modificar el Elemento de Identificación ?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "SI",
                        cancelButtonText: "No",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            swal.close();
                            $scope.publi = [];
                            var datopublic = dato;
                            for (var i = 0; i < $scope.datos.publicidad.length; i++) {
                                if ($scope.datos.publicidad[i].idPublicidad == dato.idPublicidad) {
                                    var superior = datopublic.INT_ALTO * datopublic.INT_ANCHO;
                                    superior = (Math.round(superior * 10) / 10) + "";
                                    var supe = superior.replace(",", ".");
                                    //superior = superior.replace(",",".");
                                    var palto = datopublic.INT_ALTO;
                                    var pancho = datopublic.INT_ANCHO;
                                    palto = parseFloat(palto).toFixed(2);
                                    palto = palto.replace(",", ",");
                                    pancho = parseFloat(pancho).toFixed(2);
                                    pancho = pancho.replace(",", ".");
                                    $scope.datos.publicidad[i].estado = 'M';
                                    $scope.datos.publicidad[i].INT_SUP = supe;
                                    $scope.datos.publicidad[i].INT_ALTO = palto;
                                    $scope.datos.publicidad[i].INT_ANCHO = pancho;
                                    $scope.datos.publicidad[i].INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
                                    $scope.datos.publicidad[i].INT_CARA = dato.INT_CARA;
                                    $scope.datos.publicidad[i].INT_DESC = dato.INT_DESC;
                                };
                            }
                            datoObjectFinalV = [];
                            var i = $scope.pos;
                            for (j = 0; j < $scope.docArrayPub.length; j++) {
                                datoObjectv = new Object();
                                datoObjectv.idP = (i + 1);
                                datoObjectv.resid = $scope.docArrayPub[j].resid;
                                datoObjectv.idnro = $scope.docArrayPub[j].idnro;
                                datoObjectv.resvalor = $scope.docArrayPub[j].resvalor + ' Modificado ' + dato.INT_TIPO_LETRE;
                                datoObjectv.nomcampo = $scope.docArrayPub[j].nomcampo;
                                datoObjectv.estado = true;
                                datoObjectv.desNom = $scope.docArrayPub[j].desNom + '_' + (i + 1);
                                datoObjectFinalV[i] = datoObjectv;
                                $scope.docPubNuevo.push(datoObjectFinalV[i]);
                                i++;
                            }
                            $scope.pos = i;
                            setTimeout(function() {
                                iniciarLoadFyle();
                            }, 1000);
                            $scope.lssubcategoria();
                            $scope.Plubli_Grilla($scope.datos.publicidad);
                            $scope.botonn = "new";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        } else {
                            $scope.publi = [];
                            swal.close();
                        }
                    });
            }
        }
    }

    $scope.eliminarPubli = function(data) {
        if (data.estado == 'N') {
            $scope.publicid.splice($scope.publicid.indexOf(data), 1);
            $scope.id = $scope.id - 1;
        } else {
            swal({
                title: 'Eliminar',
                text: 'Esta seguro de dar de Baja la Publicidad?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'SI',
                closeOnConfirm: true
            }, function() {
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.BajaPublicidad(data);
            });
        };
    }

    $scope.BajaPublicidad = function(data) {
        var datopublic = $scope.datos.publicidad;
        for (var i = 0; i < datopublic.length; i++) {
            if (datopublic[i].idPublicidad == data.idPublicidad) {
                datopublic[i].estado = 'B';
            }
        }
        $scope.datos.publicidad = datopublic;
        $scope.Plubli_Grilla($scope.publicid);
        datoObjectFinalV = [];
        var i = $scope.pos;
        for (j = 0; j < $scope.docArrayPub.length; j++) {
            datoObjectv = new Object();
            datoObjectv.idP = (i + 1);
            datoObjectv.resid = $scope.docArrayPub[j].resid;
            datoObjectv.idnro = $scope.docArrayPub[j].idnro;
            datoObjectv.resvalor = $scope.docArrayPub[j].resvalor + ' Baja ' + data.INT_TIPO_LETRE;
            datoObjectv.nomcampo = $scope.docArrayPub[j].nomcampo;
            datoObjectv.estado = true;
            datoObjectv.desNom = $scope.docArrayPub[j].desNom + '_' + (i + 1);
            datoObjectFinalV[i] = datoObjectv;
            $scope.docPubNuevo.push(datoObjectFinalV[i]);
            i++;
        }
        $scope.pos = i;
        setTimeout(function() {
            iniciarLoadFyle();
        }, 1000);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.lscategoria = function() {
        $scope.DataCategoria = {};
        try {
            var parametros = new PUBlstCategoriaL();
            parametros.PUB_lstCategoriaL(function(res) {
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.DataCategoria = response;
                } else {
                    $scope.msg = "Error !!";
                }
            });
        } catch (error) {
            console.log('error en categoria publicidad');
        }
    };

    $scope.actulizarCaracteristica = function() {
        var id_cara = "";
        var distNombre = $scope.publi.INT_CARA;
        if ($scope.lCaracteristica) {
            angular.forEach($scope.lCaracteristica, function(value, key) {
                if (value.descripcion == distNombre) {
                    id_cara = value.id_pub_caracteristica;
                }
            });
        }
        $scope.publi.id_cara = id_cara;
    };

    $scope.lsCaracteristica = function() {
        $scope.lsTipovia = {};
        try {
            var parametros = new lstCaracteristica();
            parametros.clasificador = 9;
            parametros.lst_Caracteristica(function(res) {
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.lsTipovia = response;
                } else {
                    $scope.msg = "Error !!";
                }
            });
        } catch (error) {
            //$scope.errors["error_rol"] = error;
            console.log("eeror en caracteristica");
        }
    };

    $scope.guardarpublicidad = function(public) {
        if (public.INT_SUPERFICIE) {
            if (public.INT_CARA == '' || public.INT_CARA == null ||
                public.INT_CATE == '' || public.INT_CATE == null || public.INT_TIPO_LETRE == '' || public.INT_TIPO_LETRE == null ||
                public.INT_DESC == '' || public.INT_DESC == null || public.INT_SUPERFICIE == '' || public.INT_SUPERFICIE == null) {
                swal('', 'Llene lo campos requeridos para la VIAE', 'error');
            } else {
                var id = 0
                if ($scope.datos.publicidad == '' || $scope.datos.publicidad == null || $scope.datos.publicidad == "undefined") {
                    if ($scope.publicid == '' || $scope.publicid == null || $scope.publicid == "undefined") {
                        $scope.publicid = [];
                        id = 0;
                    }
                    id = $scope.publicid.length + 1;
                } else {
                    id = $scope.publicid.length + 1;
                }
                if (id < 21) {
                    total = parseFloat(public.INT_SUPERFICIE);
                    if (total <= 18) {
                        var validarCorrelativoPub = [$scope.generarCorrelativo('VIAE')];
                        $q.all(validarCorrelativoPub).then(function(resp) {
                            $scope.id = id;
                            $scope.publicid.push({
                                id: id,
                                INT_CARA: public.INT_CARA,
                                INT_CATE: public.INT_CATE,
                                INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                                INT_DESC: public.INT_DESC.toUpperCase(),
                                INT_ALTO: parseFloat(0).toFixed(2),
                                INT_ANCHO: parseFloat(0).toFixed(2),
                                id_cara: public.id_cara,
                                idcarac: public.idcarac,
                                idcate: public.idcate,
                                INT_SUP: total.toFixed(2),
                                estado: "N",
                                idPublicidad_temp: resp[0]
                            });
                            $scope.publi = [];
                            $scope.publi.INT_CATE = "II Fija";
                            $scope.publi.idcate = 6;
                            $scope.lssubcategoria();
                            $scope.datos.publicidad = $scope.publicid;
                            $scope.Plubli_Grilla($scope.publicid);
                        })
                        datoObjectFinalV = [];
                        var i = $scope.pos;
                        for (j = 0; j < $scope.docArrayPub.length; j++) {
                            datoObjectv = new Object();
                            datoObjectv.idP = (i + 1);
                            datoObjectv.resid = $scope.docArrayPub[j].resid;
                            datoObjectv.idnro = $scope.docArrayPub[j].idnro;
                            datoObjectv.resvalor = $scope.docArrayPub[j].resvalor + ' Nuevo ' + public.INT_TIPO_LETRE;
                            datoObjectv.nomcampo = $scope.docArrayPub[j].nomcampo;
                            datoObjectv.estado = true;
                            datoObjectv.desNom = $scope.docArrayPub[j].desNom + '_' + (i + 1);
                            datoObjectFinalV[i] = datoObjectv;
                            $scope.docPubNuevo.push(datoObjectFinalV[i]);
                            i++;
                        }
                        $scope.pos = i;
                        setTimeout(function() {
                            iniciarLoadFyle();
                        }, 1000);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estandares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        } else {
            if (public.INT_CARA == '' || public.INT_CARA == null ||
                public.INT_CATE == '' || public.INT_CATE == null || public.INT_TIPO_LETRE == '' || public.INT_TIPO_LETRE == null ||
                public.INT_DESC == '' || public.INT_DESC == null || public.INT_ALTO == '' || public.INT_ALTO == null || public.INT_ANCHO == '' || public.INT_ANCHO == null) {
                swal('', 'Llene lo campos requeridos para la VIAE', 'error');
            } else {
                var id = 0
                if ($scope.datos.publicidad == '' || $scope.datos.publicidad == null || $scope.datos.publicidad == "undefined") {
                    if ($scope.publicid == '' || $scope.publicid == null || $scope.publicid == "undefined") {
                        $scope.publicid = [];
                        id = 0;
                    }
                    id = $scope.publicid.length + 1;
                } else {
                    id = $scope.publicid.length + 1;
                }
                if (id < 21) {
                    total = parseFloat(public.INT_ALTO) * parseFloat(public.INT_ANCHO);
                    if (total <= 18) {
                        var superior = (Math.round(total * 10) / 10) + "";
                        var supe = superior.replace(",", ".");
                        var validarCorrelativoPub = [$scope.generarCorrelativo('VIAE')];
                        $q.all(validarCorrelativoPub).then(function(resp) {
                            $scope.id = id;
                            $scope.publicid.push({
                                id: id,
                                INT_CARA: public.INT_CARA,
                                INT_CATE: public.INT_CATE,
                                INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                                INT_DESC: public.INT_DESC.toUpperCase(),
                                INT_ALTO: parseFloat(public.INT_ALTO).toFixed(2),
                                INT_ANCHO: parseFloat(public.INT_ANCHO).toFixed(2),
                                id_cara: public.id_cara,
                                idcarac: public.idcarac,
                                idcate: public.idcate,
                                INT_SUP: supe, //total.toFixed(2),
                                estado: "N",
                                idPublicidad_temp: resp[0]
                            });
                            $scope.publi = [];
                            $scope.publi.INT_CATE = "II Fija";
                            $scope.publi.idcate = 6;
                            $scope.lssubcategoria();
                            $scope.datos.publicidad = $scope.publicid;
                            $scope.Plubli_Grilla($scope.publicid);
                        })
                        datoObjectFinalV = [];
                        var i = $scope.pos;
                        for (j = 0; j < $scope.docArrayPub.length; j++) {
                            datoObjectv = new Object();
                            datoObjectv.idP = (i + 1);
                            datoObjectv.resid = $scope.docArrayPub[j].resid;
                            datoObjectv.idnro = $scope.docArrayPub[j].idnro;
                            datoObjectv.resvalor = $scope.docArrayPub[j].resvalor + ' Nuevo ' + public.INT_TIPO_LETRE;
                            datoObjectv.nomcampo = $scope.docArrayPub[j].nomcampo;
                            datoObjectv.estado = true;
                            datoObjectv.desNom = $scope.docArrayPub[j].desNom + '_' + (i + 1);
                            datoObjectFinalV[i] = datoObjectv;
                            $scope.docPubNuevo.push(datoObjectFinalV[i]);
                            i++;
                        }
                        $scope.pos = i;
                        setTimeout(function() {
                            iniciarLoadFyle();
                        }, 1000);
                    } else {
                        swal('', 'La superficie de la VIAE excede los estandares permitidos', 'error');
                    }
                } else {
                    swal('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        }
    }

    $scope.Plubli_Grilla = function(dato) {
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|INT_TIPO_LETRE|INT_CARA|INT_DESC|INT_ALTO|INT_ANCHO|INT_SUP|INT_CATE|", "titulos": "ID|Tipo de Letrero|Caracteristica|Descripción|Alto|Ancho|Superficie|Categoria", "impresiones": "true|true|true|true|true|true|true|true" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.publi_grilla.push({
                nroElem: j + 1,
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
        var jsonString = '[' + (encabezado) + ']';
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

    $scope.onlyy = false;
    $scope.botonn = "new";
    $scope.detalle = [];
    $scope.edit = {};

    var mes = fecha.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = '0' + mes;
    var dia = fecha.getDate();
    if (dia.toString().length == 1)
        dia = '0' + dia;
    $scope.fechactuall = dia + "/" + mes + "/" + fecha.getFullYear(); //+ " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.fechadatoo = "01/01/1900";

    $scope.publi = [];

    $scope.lssubcategoria = function() {
        try {
            $scope.publi.INT_CATE = "II Fija";
            $scope.publi.idcate = 6;
            var resTipoLetrero = new reglasnegocioSierra();
            resTipoLetrero.identificador = 'VALLE_PRUEBA-SGEN-3361';
            resTipoLetrero.parametros = '{}';
            resTipoLetrero.llamarregla_sierra(function(responseTipLet) {
                var lstTipoLetrero = JSON.parse(responseTipLet);
                var listLetreros = JSON.parse(lstTipoLetrero[0].pub_tipo_letrero);
                if (lstTipoLetrero.length > 0) {
                    $scope.TipoLetrero = listLetreros;
                } else {
                    $scope.msg = "Error !!";
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        } catch (e) {
            //alert("Error en la actividad desarrollada");
            $.unblockUI();
        }
    }

    $scope.ltCaracteristica = function(idlee) {
        $scope.lCaracteristica = {};
        var idcarac = "";
        try {
            var resTipoLetrero = new reglasnegocioSierra();
            resTipoLetrero.identificador = 'VALLE_PRUEBA-SGEN-3362';
            resTipoLetrero.parametros = '{"caracteristica":"' + idlee + '"}';
            resTipoLetrero.llamarregla_sierra(function(responseCaracteristica) {
                var lstCaracteristica = JSON.parse(responseCaracteristica);
                if (lstCaracteristica.length > 0) {
                    $scope.lCaracteristica = lstCaracteristica;
                    if ($scope.TipoLetrero) {
                        angular.forEach($scope.TipoLetrero, function(value, key) {
                            if (value.descripcion == idlee) {
                                idcarac = value.tipo_letrero_id;
                            }
                        });
                    }
                    $scope.publi.idcarac = idcarac;
                } else {
                    $scope.msg = "Error !!";
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $.unblockUI();
            });
        } catch (e) {
            //alert("Error en la actividad desarrollada");
            $.unblockUI();
        }
    }

    $scope.addUser = function(user) {
        if ($scope.carass == '' || $scope.carass == null || $scope.carass == "undefined") {
            $scope.carass = [];
        } else {}
        $scope.carass.push({
            //id      : user.id,
            desc: user.desc,
            sup: user.sup
        });
        $scope.user = "";
        $scope.detalle = [];
    };
    $scope.deleteUser = function(user) {
        $scope.carass.splice($scope.carass.indexOf(user), 1);
    };
    $scope.editUser = function(user) {
        delete $scope.edit[user.id];
    };
    $scope.showEdition = function($event, id) {
        $scope.edit[id] = true;
        var input = angular.element($event.currentTarget).parent().find("input")[0];
        setTimeout(function() {
            input.focus();
            input.select();
        }, 50);
    };
    $scope.actulizarCaras = function() {
        $scope.publi.caras = $scope.carass;
    };
    $scope.toggleMin = function() {
        $scope.minDate = new Date("2011-09-24".replace(/-/g, '\/'));
    };

    $scope.toggleMin();

    $scope.changeHandler = function() {
        var d = new Date($scope.publi.FECHAINICIO);
        var mes = d.getUTCMonth() + 1;
        if (mes.toString().length == 1)
            mes = '0' + mes;
        $scope.publi.FECHAINICIO = "01/" + mes + "/" + d.getFullYear();
    };

    $scope.startDateOpen = function($event) {
        if (!$scope.desabilitado) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startDateOpened = true;
        }
    };

    $scope.$watch('datos.f01_fecha_nac', function() {
        try {
            if ($scope.datos.f01_fecha_nac) {
                var dia_nacim = $scope.datos.f01_fecha_nac.getDate();
                var mes_nacim = $scope.datos.f01_fecha_nac.getMonth() + 1;
                var anio_nacim = $scope.datos.f01_fecha_nac.getFullYear();
                $scope.datos.f01_fecha_nac = dia_nacim + "/" + mes_nacim + "/" + anio_nacim;
            }
        } catch (err) {}
    });

    $scope.calcularCapacidad = function(superficie) {
        if (superficie) {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        } else {
            $scope.datos.f01_cap_aprox = 0;
        }
    }

    $scope.calcularCapacidadauto = function(superficie) {
        if (superficie) {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        } else {
            $scope.datos.f01_cap_aprox = 0;
        }
    }

    $scope.cargarNombViaTxt = function(valor) {
        if (valor == "0" || valor == 0) {
            $scope.nombreViaTxt = true;
            $scope.tipoTrayecto = false;
            $scope.datos.f01_factor = "VA";
        } else {
            $scope.nombreViaTxt = false;
            $scope.tipoTrayecto = true;
            $scope.datos.f01_factor = "TM";
        }
    };

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function(data) {
        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;
        data.docAdPublicidad = $scope.docPubNuevo;
        data.sArrayFileArPublicidad = $scope.fileAdjuntosPublicidad;
        if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') {
            sarrayobligatorio = true;
            if (data && (JSON.stringify(data.sArrayFileArRequisitos) != '{}') && data.rdTipoTramite1 != null &&
                data.FILE_CI != "" && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.fileArchivosAd != "" && data.fileArchivosAd != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic_sierra != "" && data.f01_tipo_lic_sierra != null &&
                data.licenciam != "" && data.licenciam != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null) {
                if (data.rdTipoTramite1 == 'NUEVO' && data.publicidad != "") {
                    if (JSON.stringify(data.docAdPublicidad) != '[]') {
                        if (JSON.stringify(data.sArrayFileArPublicidad) != '{}') {
                            if (data.pago_adelantado == true && data.nro_ges != "") {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#declaracionN").modal("show");
                            } else {
                                if (data.pago_adelantado == false || (data.pago_adelantado == "" || data.pago_adelantado == undefined || data.pago_adelantado == 'undefined')) {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#declaracionN").modal("show");
                                } else {
                                    swal('', "Datos obligatorios, Por favor seleccione las gestiones a pagar", 'warning');
                                }
                            };
                        } else {
                            swal('', "Datos obligatorios, Por favor adjuntar requisitos documentales de la publicidad", 'warning');
                        };
                    } else {
                        $scope.serializarInformacion(data);
                        $scope.formulario401(data);
                        $("#declaracionN").modal("show");
                    };
                } else {
                    if (data.rdTipoTramite1 == 'RENOVACION') {
                        if (data.pago_adelantado == true && data.nro_ges != "") {
                            $scope.formulario401(data);
                            $("#declaracionN").modal("show");
                        } else {
                            if (data.pago_adelantado == false || (data.pago_adelantado == "" || data.pago_adelantado == undefined || data.pago_adelantado == 'undefined')) {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#declaracionN").modal("show");
                            } else {
                                swal('', "Datos obligatorios, Por favor seleccione las gestiones a pagar", 'warning');
                            }
                        };
                    } else {
                        swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                    };
                };
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
        if (data.f01_tipo_lic_sierra != 26 || data.f01_tipo_lic_sierra != '26') {
            if (data && (JSON.stringify(data.sArrayFileArRequisitos) != '{}') && data.rdTipoTramite1 != null &&
                data.FILE_CI != "" && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic_sierra != "" && data.f01_tipo_lic_sierra != null &&
                data.f01_categoria_agrupada != "" && data.f01_categoria_agrupada != null &&
                //data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null) {
                if (data.rdTipoTramite1 == 'NUEVO' && data.publicidad != "") {
                    if (JSON.stringify(data.docAdPublicidad) != '[]') {
                        if (JSON.stringify(data.sArrayFileArPublicidad) != '{}') {
                            if (data.pago_adelantado == true && data.nro_ges != "") {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#declaracionN").modal("show");
                            } else {
                                if (data.pago_adelantado == false || (data.pago_adelantado == "" || data.pago_adelantado == undefined || data.pago_adelantado == 'undefined')) {
                                    $scope.serializarInformacion(data);
                                    $scope.formulario401(data);
                                    $("#declaracionN").modal("show");
                                } else {
                                    swal('', "Datos obligatorios, Por favor seleccione las gestiones a pagar", 'warning');
                                }
                            };
                        } else {
                            swal('', "Datos obligatorios, Por favor adjuntar requisitos documentales de la publicidad", 'warning');
                        };
                    } else {
                        $scope.serializarInformacion(data);
                        $scope.formulario401(data);
                        $("#declaracionN").modal("show");
                    };
                } else {
                    if (data.rdTipoTramite1 == 'RENOVACION') {
                        if (data.pago_adelantado == true && data.nro_ges != "") {
                            $scope.formulario401(data);
                            $("#declaracionN").modal("show");
                        } else {
                            if (data.pago_adelantado == false || (data.pago_adelantado == "" || data.pago_adelantado == undefined || data.pago_adelantado == 'undefined')) {
                                $scope.serializarInformacion(data);
                                $scope.formulario401(data);
                                $("#declaracionN").modal("show");
                            } else {
                                swal('', "Datos obligatorios, Por favor seleccione las gestiones a pagar", 'warning');
                            }
                        };
                    } else {
                        swal('', "Datos obligatorios, Por favor verificar los datos del elemento publicitario y/o adjuntar las fotografías", 'warning');
                    };
                };
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
    }

    $scope.formulario401 = function(datos) {
        $rootScope.datosEnv = "";
        var fecha = new Date();
        var fechaActualS = "";
        fechaActualS = fecha.getDate() + " - " + (fecha.getMonth() + 1) + " - " + fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40 = "";
        var urlFormularioN = "";
        var snombre = "";
        var scedulaid = "";
        var sexpedido = "";
        var snombreREP = "";
        var scirep = "";
        var sempresa = "";
        var snit = "";
        var validarCorrelativoPub = [$scope.generarCorrelativo('FORM_402')];
        $q.all(validarCorrelativoPub).then(function(resp) {
            $rootScope.f01_correlativo_form402 = resp[0];
            $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
            if ($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N') {
                datos.f01_tipo_per_desc = 'NATURAL';
                urlFormularioN = "../../docs/AE_Formulario_402Renov.html";
                $("#msgformularioN").load(urlFormularioN, function(data) {
                    stringFormulario40 = data;
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
                    if (datos.f01_tip_act == 'MA' || datos.f01_tip_act == 'MATRI') {
                        datos.f01_tip_act1 = 'MATRIZ';
                    }
                    if (datos.f01_tip_act == 'SU' || datos.f01_tip_act == 'SUCUR') {
                        datos.f01_tip_act1 = 'SUCURSAL';
                    }
                    var pubMod = '';
                    if (datos.rdTipoTramite1 == 'NUEVO') {
                        pubMod = '<tr><td>VIAE</td>' +
                            '<td>TIPO</td>' +
                            '<td>CARACTERÍSTICA</td>' +
                            '<td>DESCRIPCIÓN</td>' +
                            '<td>ALTO</td>' +
                            '<td>ANCHO</td>' +
                            '<td>SUPERFICIE</td>' +
                            '<td>ESTADO</td></tr>';
                        for (i = 0; i < datos.publicidad.length; i++) {
                            pubMod = pubMod + '<tr>' +
                                '<td>' + (i + 1) + '</td>' +
                                '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>' +
                                '<td>' + datos.publicidad[i].INT_CARA + '</td>' +
                                '<td>' + datos.publicidad[i].INT_DESC + '</td>' +
                                '<td>' + datos.publicidad[i].INT_ANCHO + '</td>' +
                                '<td>' + datos.publicidad[i].INT_ALTO + '</td>' +
                                '<td>' + datos.publicidad[i].INT_SUP + '</td>' +
                                '<td>' + datos.publicidad[i].estado + '</td></tr>';
                        }
                        stringFormulario40 = stringFormulario40.replace("#publicidad_grilla#", pubMod);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#publicidad_grilla#", 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN');
                    };
                    //CABECERA
                    stringFormulario40 = stringFormulario40.replace("#f01_id_actividad_economica_temp#", datos.f01_id_actividad_economica_temp);
                    stringFormulario40 = stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                    stringFormulario40 = stringFormulario40.replace("#f01_nro_orden#", $rootScope.f01_correlativo_form402);
                    stringFormulario40 = stringFormulario40.replace("#f01_tipo_form#", '402');
                    stringFormulario40 = stringFormulario40.replace("#f01_tipo_per_desc#", datos.f01_tipo_per_desc);
                    //DATOS GENERALES DE CONTRIBUYENTE
                    stringFormulario40 = stringFormulario40.replace("#f01_pri_nom_prop#", datos.f01_pri_nom_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_seg_nom_prop#", datos.f01_seg_nom_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_ape_pat_prop#", datos.f01_ape_pat_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_ape_mat_prop#", datos.f01_ape_mat_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_ape_cas_prop#", datos.f01_ape_cas_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_tip_doc_prop#", datos.f01_tip_doc_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_nit_prop#", datos.f01_nit_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_nit#", datos.f01_nit);
                    stringFormulario40 = stringFormulario40.replace("#f01_zon_prop_valor#", datos.f01_zon_prop_valor);
                    stringFormulario40 = stringFormulario40.replace("#f01_tip_via_prop# ", datos.f01_tip_via_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_nom_via_prop#", datos.f01_nom_via_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_num_prop#", datos.f01_num_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_nom_edi_prop#", datos.f01_nom_edi_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_bloq_prop#", datos.f01_bloq_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_piso_prop#", datos.f01_piso_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_depa_prop#", datos.f01_depa_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_telef_prop#", datos.f01_telef_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_cel_prop#", datos.f01_cel_prop);
                    stringFormulario40 = stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
                    //DATOS DE LA ACTIVIDAD ECONOMICA
                    stringFormulario40 = stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc.toUpperCase());
                    stringFormulario40 = stringFormulario40.replace("#f01_de_hor#", datos.f01_de_hor);
                    stringFormulario40 = stringFormulario40.replace("#f01_a_hor#", datos.f01_a_hor);
                    stringFormulario40 = stringFormulario40.replace("#f01_sup#", datos.f01_sup);
                    stringFormulario40 = stringFormulario40.replace("#f01_estab_es#", datos.f01_estab_es);
                    stringFormulario40 = stringFormulario40.replace("#f01_tip_act1#", datos.f01_tip_act1);
                    stringFormulario40 = stringFormulario40.replace("#publicidad_grilla#", pubMod);
                    var multi = '';
                    if (datos.f01_tipo_lic_sierra == 26 || datos.f01_tipo_lic_sierra == '26') {
                        stringFormulario40 = stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                        stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                        stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descrip);
                        multi = '<table id="tablaMul" class="table table-striped table-bordered"><tr>' +
                            '<td>NRO</td>' +
                            '<td>TIPO DE LICENCIA</td>' +
                            '<td>TIPO DE CATEGORÍA</td>' +
                            '<td>TIPO DE ACTIVIDAD</td></tr>';
                        for (i = 1; i < datos.Licenmul_grilla.length; i++) {
                            multi = multi + '<tr>' +
                                '<td>' + datos.Licenmul_grilla[i].nroElem + '</td>' +
                                '<td>' + datos.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>' +
                                '<td>' + datos.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>' +
                                '<td>' + datos.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
                        }
                        multi = multi + '</table>';
                        stringFormulario40 = stringFormulario40.replace("#Licenmul_grilla#", multi);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                        stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                        stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descripcion);
                        stringFormulario40 = stringFormulario40.replace("#Licenmul_grilla#", multi);
                    };
                    stringFormulario40 = stringFormulario40.replace("#f01_idCodigoZona#", datos.f01_idCodigoZona);
                    var divfoodTruck = '';
                    if (datos.f01_categoria == 211 || datos.f01_categoria == '211') {
                        divfoodTruck = divfoodTruck + '<div class="row"><div class="col-md-12" style="margin: 10px">' +
                            '<h3>DATOS DEL VEHÍCULO O REMOLQUE</h3></div></div>' +
                            '<div class="row" style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px">' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Tipo de Vehículo: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_vehiculo_ft + '</div>' +
                            '</div>';
                        if (datos.f01_vehiculo_ft == "REMOLQUE") {
                            divfoodTruck = divfoodTruck + '<div class="col-md-6">' +
                                '<div class="col-md-6"><label>Otorgado: </label></div>' +
                                '<div class="col-md-6">' + datos.f01_otorgado_ft + '</div>' +
                                '</div>';
                        }
                        divfoodTruck = divfoodTruck + '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Clase: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_clase_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Marca: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_marca_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Tipo: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_tipo_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Subtipo: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_subtipo_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Modelo: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_modelo_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Motor: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_motor_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Nº Chasis: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_chasis_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Servicio: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_servicio_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Color: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_color_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Radicatoria: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_radicatoria_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Documento Legal: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_doclegal_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Nº Documento Legal: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_numdoclegal_ft + '</div>' +
                            '</div>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Ubicación del lugar donde se Efectuara la Inspección del Vehículo o Remolque: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_lugar_ft + '</div>' +
                            '</div></div>';
                        stringFormulario40 = stringFormulario40.replace("#divft#", divfoodTruck);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#divft#", divfoodTruck);
                    };
                    //UBICACION DE LA ACTIVIDAD ECONOMICA
                    stringFormulario40 = stringFormulario40.replace("#f01_macro_act_descrip#", datos.f01_macro_act_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_dist_act#", datos.f01_dist_act);
                    stringFormulario40 = stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                    stringFormulario40 = stringFormulario40.replace("#f01_categoria_descrip#", datos.f01_categoria_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_zona_act_descrip#", datos.f01_zona_act_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_num_act1#", datos.f01_num_act1);
                    stringFormulario40 = stringFormulario40.replace("#f01_edificio_act#", datos.f01_edificio_act);
                    stringFormulario40 = stringFormulario40.replace("#f01_bloque_act#", datos.f01_bloque_act);
                    stringFormulario40 = stringFormulario40.replace("#f01_piso_act#", datos.f01_piso_act);
                    stringFormulario40 = stringFormulario40.replace("#f01_dpto_of_loc#", datos.f01_dpto_of_loc);
                    stringFormulario40 = stringFormulario40.replace("#f01_tel_act1#", datos.f01_tel_act1);
                    if (datos.f01_num_act_id == '0' || datos.f01_num_act_id == 0) {
                        stringFormulario40 = stringFormulario40.replace("#f01_num_act#", datos.f01_num_act_n);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#f01_num_act#", datos.f01_num_act);
                    };
                    stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
                    stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
                    stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                    var nombreUsuario = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
                    stringFormulario40 = stringFormulario40.replace("#usuarioPlataforma#", nombreUsuario);
                    if (datos.chkzonasegura == '' || datos.chkzonasegura == 'undefined' || datos.chkzonasegura == undefined) {
                        stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '');
                    } else {
                        if (datos.chkzonasegura == 'ZONASEGURA') {
                            stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> SI');
                        } else {
                            stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> NO');
                        };
                    };
                    stringFormulario40 = stringFormulario40.replace("#usuarioPlataforma#", nombreUsuario);
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
                    if ($scope.datosAnt.establecimiento == 'ALQUI') {
                        $scope.datosAnt.establecimiento = "ALQUILADO";
                    }
                    if ($scope.datosAnt.establecimiento == 'PROPI') {
                        $scope.datosAnt.establecimiento = "PROPIO";
                    }
                    if ($scope.datosAnt.establecimiento == 'ANTI') {
                        $scope.datosAnt.establecimiento = "ANTICRÉTICO";
                    }
                    if ($scope.datosAnt.establecimiento == 'OTRO') {
                        $scope.datosAnt.establecimiento = "OTRO";
                    }
                    if ($scope.datosAnt.establecimiento == 'NINGU') {
                        $scope.datosAnt.establecimiento = "OTRO";
                    }
                    if ($scope.datosAnt.tipoActividad == 'MA' || $scope.datosAnt.tipoActividad == 'MATRI') {
                        $scope.datosAnt.tipoActividad = 'MATRIZ';
                    }
                    if ($scope.datosAnt.tipoActividad == 'SU' || $scope.datosAnt.tipoActividad == 'SUCUR') {
                        $scope.datosAnt.tipoActividad = 'SUCURSAL';
                    }
                    stringFormulario40 = stringFormulario40.replace("#primerNombre#", $scope.datosAnt.primerNombre);
                    stringFormulario40 = stringFormulario40.replace("#primerApellido#", $scope.datosAnt.primerApellido);
                    stringFormulario40 = stringFormulario40.replace("#segundoApellido#", $scope.datosAnt.segundoApellido);
                    stringFormulario40 = stringFormulario40.replace("#tercerApellido#", $scope.datosAnt.tercerApellido);
                    stringFormulario40 = stringFormulario40.replace("#identificacion#", $scope.datosAnt.identificacion);
                    stringFormulario40 = stringFormulario40.replace("#tipoIdentidad#", $scope.datosAnt.tipoIdentidad);
                    stringFormulario40 = stringFormulario40.replace("#expedicion#", $scope.datosAnt.expedicion);
                    stringFormulario40 = stringFormulario40.replace("#nit#", $scope.datosAnt.nit);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_email#", $scope.datosAnt.contribuyente_email);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_telefono#", $scope.datosAnt.contribuyente_telefono);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_celular#", $scope.datosAnt.contribuyente_celular);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_zona#", $scope.datosAnt.contribuyente_zona);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_tipo_via#", $scope.datosAnt.contribuyente_tipo_via);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_via#", $scope.datosAnt.contribuyente_via);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_numero#", $scope.datosAnt.contribuyente_numero);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_edificio#", $scope.datosAnt.contribuyente_edificio);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_bloque#", $scope.datosAnt.contribuyente_bloque);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_piso#", $scope.datosAnt.contribuyente_piso);
                    stringFormulario40 = stringFormulario40.replace("#contribuyente_depto#", $scope.datosAnt.contribuyente_depto);
                    stringFormulario40 = stringFormulario40.replace("#numeroActividad#", $scope.datosAnt.numeroactividad);
                    stringFormulario40 = stringFormulario40.replace("#denominacion#", $scope.datosAnt.denominacion);
                    stringFormulario40 = stringFormulario40.replace("#superficie#", $scope.datosAnt.superficie);
                    stringFormulario40 = stringFormulario40.replace("#horarioAtencion#", $scope.datosAnt.horarioatencion);
                    stringFormulario40 = stringFormulario40.replace("#establecimiento#", $scope.datosAnt.establecimiento);
                    stringFormulario40 = stringFormulario40.replace("#tipoActividad#", $scope.datosAnt.tipoactividad);
                    stringFormulario40 = stringFormulario40.replace("#IdMacrodistrito#", '');
                    stringFormulario40 = stringFormulario40.replace("#Macrodistrito#", $scope.datosAnt.macrodistrito);
                    stringFormulario40 = stringFormulario40.replace("#Distrito#", $scope.datosAnt.distrito);
                    stringFormulario40 = stringFormulario40.replace("#zona#", $scope.datosAnt.zona);
                    stringFormulario40 = stringFormulario40.replace("#tipoVia#", $scope.datosAnt.tipovia);
                    stringFormulario40 = stringFormulario40.replace("#via#", $scope.datosAnt.via);
                    stringFormulario40 = stringFormulario40.replace("#numero#", $scope.datosAnt.numero);
                    stringFormulario40 = stringFormulario40.replace("#idCodigoZona#", $scope.datosAnt.idcodigozona);
                    var pubAnt = '';
                    if (datos.publicidadAntiguo_grilla.length > 1) {
                        pubAnt = '<tr><td>VIAE</td>' +
                            '<td>TIPO</td>' +
                            '<td>CARACTERÍSTICA</td>' +
                            '<td>DESCRIPCIÓN</td>' +
                            '<td>ALTO</td>' +
                            '<td>ANCHO</td>' +
                            '<td>SUPERFICIE</td></tr>';
                        for (i = 1; i < datos.publicidadAntiguo_grilla.length; i++) {
                            pubAnt = pubAnt + '<tr>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].nroElem + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].caracteristica + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].descripcion + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].alto + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].ancho + '</td>' +
                                '<td>' + datos.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
                        }
                        stringFormulario40 = stringFormulario40.replace("#publicidadAntiguo_grilla#", pubAnt);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#publicidadAntiguo_grilla#", 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN');
                    }
                    var multiAnt = '';
                    if ($scope.datosAnt.idtipolicencia == 26 || $scope.datosAnt.idtipolicencia == '26') {
                        stringFormulario40 = stringFormulario40.replace("#tipocategoria#", 'MULTISERVICIOS');
                        stringFormulario40 = stringFormulario40.replace("#descripcion#", 'MULTISERVICIOS');
                        multiAnt = '<table id="tablaMulAnt" class="table table-striped table-bordered"><tr><td>NRO</td>' +
                            '<td>TIPO DE LICENCIA</td>' +
                            '<td>TIPO DE CATEGORÍA</td>' +
                            '<td>TIPO DE ACTIVIDAD</td></tr>';
                        for (i = 0; i < $scope.datos.licenciamulAnterior.length; i++) {
                            multiAnt = multiAnt + '<tr>' +
                                '<td>' + (i + 1) + '</td>' +
                                '<td>' + $scope.datos.licenciamulAnterior[i].f01_tipo_licmdescrip + '</td>' +
                                '<td>' + $scope.datos.licenciamulAnterior[i].f01_cat_agrupadamdescrip + '</td>' +
                                '<td>' + $scope.datos.licenciamulAnterior[i].f01_act_desarrolladamdescrip + '</td></tr>';
                        }
                        multiAnt = multiAnt + '</table>';
                        stringFormulario40 = stringFormulario40.replace("#ActividadDesarrollada#", 'MULTISERVICIOS');
                        stringFormulario40 = stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#descripcion#", $scope.datosAnt.licencia_descripcion);
                        stringFormulario40 = stringFormulario40.replace("#tipocategoria#", $scope.datosAnt.categoria_descripcion);
                        stringFormulario40 = stringFormulario40.replace("#ActividadDesarrollada#", $scope.datosAnt.ActividadDesarrollada);
                        stringFormulario40 = stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);
                    };
                    $scope.msgformularioN = stringFormulario40;
                    $scope.notifcondicionesuso = stringFormulario40;
                    setTimeout(function() {
                        $scope.fmostrarFormulario();
                    }, 500);
                })
                $scope.armarDatosForm(datos, fechaActualS, sHora);
            }
        })
    }

    $scope.armarDatosForm = function(data, sfecha, sHora) {
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
        if ($scope.datosAnt.establecimiento == 'ALQUI') {
            $scope.datosAnt.establecimiento = "ALQUILADO";
        }
        if ($scope.datosAnt.establecimiento == 'PROPI') {
            $scope.datosAnt.establecimiento = "PROPIO";
        }
        if ($scope.datosAnt.establecimiento == 'ANTI') {
            $scope.datosAnt.establecimiento = "ANTICRÉTICO";
        }
        if ($scope.datosAnt.establecimiento == 'OTRO') {
            $scope.datosAnt.establecimiento = "OTRO";
        }
        if ($scope.datosAnt.establecimiento == 'NINGU') {
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
        dataForm['idCodigoZona'] = $scope.datosAnt.idcodigozona;
        dataForm['numeroActividad'] = $scope.datosAnt.numeroactividad;
        dataForm['IdMacrodistrito'] = '';
        dataForm['Macrodistrito'] = $scope.datosAnt.macrodistrito;
        dataForm['Distrito'] = $scope.datosAnt.distrito;
        dataForm['zona'] = $scope.datosAnt.zona;
        dataForm['tipoVia'] = $scope.datosAnt.tipovia;
        dataForm['via'] = $scope.datosAnt.via;
        dataForm['numero'] = $scope.datosAnt.numero;
        var multiAnt = '';
        if ($scope.datosAnt.idtipolicencia == 26 || $scope.datosAnt.idtipolicencia == '26') {
            dataForm['descripcion'] = 'MULTISERVICIOS';
            dataForm['tipocategoria'] = 'MULTISERVICIOS';
            multiAnt = '<table id="tablaVAnt" border="0.5" style="width:100%"><tr><td>NRO</td>' +
                '<td>TIPO DE LICENCIA</td>' +
                '<td>TIPO DE CATEGORÍA</td>' +
                '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 0; i < $scope.datos.licenciamulAnterior.length; i++) {
                multiAnt = multiAnt + '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + $scope.datos.licenciamulAnterior[i].f01_tipo_licmdescrip + '</td>' +
                    '<td>' + $scope.datos.licenciamulAnterior[i].f01_cat_agrupadamdescrip + '</td>' +
                    '<td>' + $scope.datos.licenciamulAnterior[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multiAnt = multiAnt + '</table>';
            dataForm['ActividadDesarrollada'] = 'MULTISERVICIOS';
            dataForm['Licenmul_grillaAnt'] = multiAnt;
        } else {
            dataForm['descripcion'] = $scope.datosAnt.licencia_descripcion;
            dataForm['tipocategoria'] = $scope.datosAnt.categoria_descripcion;
            dataForm['ActividadDesarrollada'] = $scope.datosAnt.ActividadDesarrollada;
            dataForm['Licenmul_grillaAnt'] = multiAnt;
        };
        var pubAnt = '';
        if (data.publicidadAntiguo_grilla.length > 1) {
            pubAnt = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>' +
                '<td>TIPO</td>' +
                '<td>CARACTERÍSTICA</td>' +
                '<td>DESCRIPCIÓN</td>' +
                '<td>ALTO</td>' +
                '<td>ANCHO</td>' +
                '<td>SUPERFICIE</td></tr>';
            for (i = 1; i < data.publicidadAntiguo_grilla.length; i++) {
                pubAnt = pubAnt + '<tr>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].nroElem + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].caracteristica + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].descripcion + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].alto + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].ancho + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
            }
            pubAnt = pubAnt + '</table>';
            dataForm['publicidadAntiguo_grilla'] = pubAnt;
        } else {
            dataForm['publicidadAntiguo_grilla'] = 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN';
        };
        //CABECERA
        dataForm['f01_id_actividad_economica_temp'] = data.f01_id_actividad_economica_temp;
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_tipo_form'] = '402';
        dataForm['f01_num_pmc'] = data.f01_num_pmc;
        dataForm['f01_nro_orden'] = $rootScope.f01_correlativo_form402; //data.f01_nro_orden;
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
        if (data.f01_tipo_lic_sierra == 26 || data.f01_tipo_lic_sierra == '26') {
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_tipo_lic_descrip;
            multi = '<table border="0.5" style="width:100%"><tr><td>NRO</td>' +
                '<td>TIPO DE LICENCIA</td>' +
                '<td>TIPO DE CATEGORÍA</td>' +
                '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 1; i < data.Licenmul_grilla.length; i++) {
                multi = multi + '<tr>' +
                    '<td>' + data.Licenmul_grilla[i].nroElem + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multi = multi + '</table>';
            dataForm['Licenmul_grilla'] = multi;
        } else {
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;
            dataForm['Licenmul_grilla'] = data.Licenmul_grilla;
        };
        var pubMod = '';
        pubMod = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>' +
            '<td>TIPO</td>' +
            '<td>CARACTERÍSTICA</td>' +
            '<td>DESCRIPCIÓN</td>' +
            '<td>ALTO</td>' +
            '<td>ANCHO</td>' +
            '<td>SUPERFICIE</td>' +
            '<td>ESTADO</td></tr>';
        for (i = 0; i < data.publicidad.length; i++) {
            pubMod = pubMod + '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + data.publicidad[i].INT_TIPO_LETRE + '</td>' +
                '<td>' + data.publicidad[i].INT_CARA + '</td>' +
                '<td>' + data.publicidad[i].INT_DESC + '</td>' +
                '<td>' + data.publicidad[i].INT_ANCHO + '</td>' +
                '<td>' + data.publicidad[i].INT_ALTO + '</td>' +
                '<td>' + data.publicidad[i].INT_SUP + '</td>' +
                '<td>' + data.publicidad[i].estado + '</td></tr>';
        }
        pubMod = pubMod + '</table>';
        dataForm['publicidad_grilla'] = pubMod;
        var tablapago = '';
        if (data.pago_adelantado == true) {
            dataForm['pago_adel'] = 'SI'; //data.pago_adelantado;
            dataForm['nro_ges'] = data.nro_ges;
            dataForm['tablaP'] = '';
        } else {
            dataForm['pago_adel'] = 'SIN PAGO ADELANTADO';
            dataForm['nro_ges'] = 'NINGUNA';
            dataForm['tablaP'] = tablapago;
        }
        var divfoodTruck = '';
        if (data.f01_categoria == 211 || data.f01_categoria == '211') {
            divfoodTruck = divfoodTruck + '<table border="0" style="width:100%">' +
                '<tr><td colspan="4" style="width: 100%">DATOS DEL VEHÍCULO O REMOLQUE</td></tr>' +
                '<tr>' +
                '<td style="width: 25%">TIPO DE VEHÍCULO:</td>' +
                '<td style="width: 25%">' + data.f01_vehiculo_ft + '</td>';
            if (data.f01_vehiculo_ft == "REMOLQUE") {
                divfoodTruck = divfoodTruck +
                    '<td style="width: 25%">OTORGADO: </td>' +
                    '<td style="width: 25%">' + data.f01_otorgado_ft + '</td>' +
                    '</tr>';
            } else {
                divfoodTruck = divfoodTruck +
                    '<td style="width: 25%"></td>' +
                    '<td style="width: 25%"></td>' +
                    '</tr>';
            }
            divfoodTruck = divfoodTruck + '<tr>' +
                '<td style="width: 25%">CLASE: </td>' +
                '<td style="width: 25%">' + data.f01_clase_ft + '</td>' +
                '<td style="width: 25%">MARCA: </td>' +
                '<td style="width: 250%">' + data.f01_marca_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">TIPO: </td>' +
                '<td style="width: 25%">' + data.f01_tipo_ft + '</td>' +
                '<td style="width: 25%">SUBTIPO: </td>' +
                '<td style="width: 25%">' + data.f01_subtipo_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">MODELO: </td>' +
                '<td style="width: 25%">' + data.f01_modelo_ft + '</td>' +
                '<td style="width: 25%">MOTOR: </td>' +
                '<td style="width: 25%">' + data.f01_motor_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">Nº CHASIS: </td>' +
                '<td style="width: 25%">' + data.f01_chasis_ft + '</td>' +
                '<td style="width: 25%">SERVICIO: </td>' +
                '<td style="width: 25%">' + data.f01_servicio_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">COLOR: </td>' +
                '<td style="width: 25%">' + data.f01_color_ft + '</td>' +
                '<td style="width: 25%">RADICATORIA: </td>' +
                '<td style="width: 25%">' + data.f01_radicatoria_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">DOCUMENTO LEGAL: </td>' +
                '<td style="width: 25%">' + data.f01_doclegal_ft + '</td>' +
                '<td style="width: 25%">Nº DOCUMENTO LEGAL: </td>' +
                '<td style="width: 25%">' + data.f01_numdoclegal_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 50%" colspan="2">UBICACIÓN DEL LUGAR DONDE SE EFECTUARÁ LA INSPECCIÓN DEL VEHÍCULO O REMOLQUE: </td>' +
                '<td style="width: 50%" colspan="2">' + data.f01_lugar_ft + '</td>' +
                '</tr></table>';
            dataForm['divft'] = divfoodTruck;
        } else {
            dataForm['divft'] = divfoodTruck;
        };
        dataForm['f01_idCodigoZona'] = data.f01_idCodigoZona;
        //UBICACION DE LA ACTIVIDAD ECONOMICA
        dataForm['f01_macro_act_descrip'] = data.f01_macro_act_descrip;
        dataForm['f01_zona_act_descrip'] = data.f01_zona_act_descrip;
        dataForm['f01_tip_via_act'] = data.f01_tip_via_act;
        dataForm['f01_dist_act'] = data.f01_dist_act;
        if (data.f01_num_act_id == '0' || data.f01_num_act_id == 0) {
            dataForm['f01_num_act'] = data.f01_num_act_n.toUpperCase();
        } else {
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
        var nombreUsuario = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        if (data.chkzonasegura == '' || data.chkzonasegura == 'undefined' || data.chkzonasegura == undefined) {
            dataForm['zonaSegura'] = '';
        } else {
            if (datos.chkzonasegura == 'ZONASEGURA') {
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> SI';
            } else {
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> NO';
            };
        };
        dataForm['usuarioPlataforma'] = nombreUsuario;
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }

    $scope.fmostrarFormulario = function() {
        $("#exampleModalCenter1").modal({ backdrop: 'static', keyboard: false });
        $('#msgformularioN').html($scope.msgformularioN);
    }

    /*enviarFormProcesos*/
    $scope.validarFormProcesos = function(datosForm) {
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
            tramiteIgob.validarFormProcesos(function(resultado) {
                $scope.tramitesCiudadano();
                $scope.bloquearBtnEnviarForm();
                swal("ESTIMADO CIUDADANO.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Usted podrá realizar el seguimiento o consulta de su trámite a la línea gratuita 800148145, caso contrario puede apersonarse a las Plataformas Empresariales de Actividades Económicas, ubicadas en los Macrodistritos del municipio de La Paz.");
            });
        } catch (error) {
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };
    /*CIUDADANO - ENVIAR FORMULARIO NATURAL*/
    //enviarFormProcesosLinea
    $scope.validarEnvio = function(data) {
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
            setTimeout(function() {
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    $scope.enviarFormProcesosLinea = function(paramForm) {
        $scope.ultimoArrayAdjunto();
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm = true;
        var idProcodigo = 'RE-LF';
        var datosNeXO = {};
        datosNeXO['f01_actividadesSecundarias'] = paramForm.f01_actividadesSecundarias;
        /*RENOVACION DE LICENCIAS*/
        datosNeXO['f01_id_actividad_economica'] = paramForm.f01_id_actividad_economica;
        datosNeXO['f01_id_actividad_economica_temp'] = paramForm.f01_id_actividad_economica_temp;
        datosNeXO['f01_id_contribuyente'] = paramForm.f01_id_contribuyente;
        datosNeXO['f01_id_contribuyente_temp'] = paramForm.f01_id_contribuyente_temp;
        datosNeXO['f01_nro_orden'] = paramForm.f01_nro_orden;
        datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
        datosNeXO['INT_PMC'] = paramForm.f01_num_pmc; //$scope.dataGenesisCidadano[0].padron;
        datosNeXO['INT_ID_CONTRIBUYENTE'] = paramForm.f01_id_contribuyente; //$scope.dataGenesisCidadano[0].idContribuyente;
        datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
        datosNeXO['f01_nro_frm'] = sessionService.get('IDTRAMITE');
        if ($scope.tipoPersona == 'NATURAL') {
            datosNeXO['f01_tipo_per'] = 'N';
            datosNeXO['f01_tipo_per_desc'] = 'NATURAL';
            datosNeXO['f01_expedido_prop'] = paramForm.f01_expedido_prop;
            datosNeXO['f01_email_prop'] = paramForm.f01_email_prop;
            datosNeXO['f01_cel_prop'] = paramForm.f01_cel_prop;
            datosNeXO['f01_telef_prop'] = paramForm.f01_telef_prop;
            datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA'] = sessionService.get('IDCIUDADANO');
            datosNeXO['f01_pri_nom_prop'] = paramForm.f01_pri_nom_prop;
            datosNeXO['f01_ape_pat_prop'] = paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop'] = paramForm.f01_ape_mat_prop;
            datosNeXO['f01_tip_doc_prop'] = paramForm.f01_tip_doc_prop;
            datosNeXO['f01_num_doc_prop'] = paramForm.f01_num_dos_prop;
            datosNeXO['f01_num_dos_prop'] = paramForm.f01_num_dos_prop;
            datosNeXO['f01_fecha_nac'] = paramForm.f01_fecha_nac;
            //DATOS DE DIRECION DEL CONTRIBUYENTE
            datosNeXO['f01_macro'] = paramForm.f01_macro;
            datosNeXO['f01_macro_des'] = paramForm.f01_macro_des;
            datosNeXO['INT_ZONA'] = paramForm.INT_ZONA;
            datosNeXO['INT_DISTRITO'] = paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito'] = paramForm.f01_distrito;
            datosNeXO['f01_distrito_desc'] = paramForm.f01_distrito_desc;
            //DIRECCION DEL CONTRIBUYENTE
            datosNeXO['f01_zona'] = paramForm.f01_zona;
            datosNeXO['f01_zon_prop'] = paramForm.f01_zon_prop;
            datosNeXO['f01_zon_prop_desc'] = paramForm.f01_zon_prop_desc;
            datosNeXO['f01_zon_prop_valor'] = paramForm.f01_zon_prop_valor;
            datosNeXO['f01_tip_via_prop'] = paramForm.f01_tip_via_prop;
            datosNeXO['f01_tip_via_prop_desc'] = paramForm.f01_tip_via_prop;
            datosNeXO['f01_nom_via_prop'] = paramForm.f01_nom_via_prop;
            datosNeXO['f01_num_prop'] = paramForm.f01_num_prop;
            datosNeXO['f01_nom_edi_prop'] = paramForm.f01_nom_edi_prop;
            datosNeXO['f01_bloq_prop'] = paramForm.f01_bloq_prop;
            datosNeXO['f01_piso_prop'] = paramForm.INT_PISO;
            datosNeXO['f01_depa_prop'] = paramForm.INT_NUM_DEP;
            datosNeXO['f01_dir_det_prop'] = paramForm.f01_dir_det_prop;
            datosNeXO['OTRO_VIA'] = paramForm.OTRO_VIA;
            datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
            datosNeXO['INT_AC_BLOQUE'] = paramForm.INT_AC_BLOQUE;
            datosNeXO['INT_AC_PISO'] = paramForm.INT_AC_PISO;
            datosNeXO['INT_AC_NUME'] = paramForm.INT_AC_NUME;
            datosNeXO['INT_AC_CEL'] = paramForm.INT_AC_CEL;
            datosNeXO['INT_AC_TEL'] = paramForm.INT_AC_TEL;
            datosNeXO['INT_AC_COR'] = paramForm.INT_AC_COR;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['INT_VIA'] = paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA'] = paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_EDIF'] = paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE'] = paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO'] = paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP'] = paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['f01_denominacion'] = paramForm.f01_denominacion;
            datosNeXO['f01_sup'] = paramForm.f01_sup;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_estab_es'] = paramForm.f01_estab_es;
            datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
            datosNeXO['INT_AC_MACRO_ID'] = parseInt(paramForm.INT_AC_MACRO_ID);
            datosNeXO['f01_tipo_lic_descrip'] = paramForm.f01_tipo_lic_descrip;
            datosNeXO['f01_requisitos_tecnicos'] = $scope.datos.f01_requisitos_tecnicos;
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO'] = paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA'] = paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA'] = paramForm.INT_ID_ZONA;
            datosNeXO['f01_macro_act_descrip'] = paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act_descrip'] = paramForm.f01_zona_act_descrip;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_tip_via_act'] = paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act'] = paramForm.f01_num_act;
            datosNeXO['f01_num_act_id'] = paramForm.f01_num_act_id;
            if (paramForm.f01_num_act_id == "0" || paramForm.f01_num_act_id == 0) {
                datosNeXO['f01_num_act_n'] = (paramForm.f01_num_act_n).toUpperCase();
            }
            datosNeXO['f01_factor'] = paramForm.f01_factor;
            datosNeXO['f01_num_act1'] = paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act'] = paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act'] = paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc'] = paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1'] = paramForm.f01_tel_act1;
            datosNeXO['f01_casilla'] = paramForm.f01_casilla;
            datosNeXO['f01_cod_luz'] = '0';
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['INT_AC_latitud'] = paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud'] = paramForm.INT_AC_longitud;
            datosNeXO['f01_requisitos_actividad_economica'] = paramForm.f01_requisitos_actividad_economica;
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            /*DATA DESDE ACA --*/
            datosNeXO['INT_ID_CAT_AGRUPADA'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_requisitos_actividad_economica'] = paramForm.f01_requisitos_actividad_economica;
            datosNeXO['f01_hojas_recibidas'] = "0";
            datosNeXO['f01_observaciones_i'] = "0";
            /*DATOSDELTITULARDELALICENCIA*/
            //DATOSGENERALES
            datosNeXO['f01_nit'] = paramForm.f01_nit;
            datosNeXO['f01_nit_prop'] = paramForm.f01_nit;
            datosNeXO['f01_tip_doc_prop'] = paramForm.f01_tip_doc_prop;
            datosNeXO['f01_expedido_prop'] = paramForm.f01_expedido_prop;
            datosNeXO['f01_pri_nom_prop'] = paramForm.f01_pri_nom_prop;
            datosNeXO['f01_seg_nom_prop'] = "";
            datosNeXO['f01_ter_nom_prop'] = "";
            datosNeXO['f01_ape_pat_prop'] = paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop'] = paramForm.f01_ape_mat_prop;
            datosNeXO['f01_ape_cas_prop'] = "";
            datosNeXO['f01_nac_prop'] = paramForm.f01_nac_prop;
            datosNeXO['f01_fecha_nac'] = paramForm.f01_fecha_nac;
            datosNeXO['f01_telef_prop'] = paramForm.f01_tel_ciudadano;
            datosNeXO['f01_cel_prop'] = paramForm.f01_cel_prop;
            datosNeXO['f01_email_prop'] = paramForm.f01_email_prop;
            datosNeXO['f01_genero_prop'] = paramForm.f01_genero_prop;
            datosNeXO['f01_cuenta_luz_prop'] = paramForm.f01_cuenta_luz_prop;
            datosNeXO['f01_medidor_prop'] = paramForm.f01_medidor_prop;
            datosNeXO['f01_estado_civil_prop'] = paramForm.f01_estado_civil_prop;
            datosNeXO['f01_latitud_prop'] = paramForm.f01_latitud_prop;
            datosNeXO['f01_longitud_prop'] = paramForm.f01_longitud_prop;
            datosNeXO['f01_dir_det_prop'] = paramForm.f01_dir_det_prop;
            /*DATOSDELAACTIVIDADAECONOMICA*/
            //DATOS TECNICOS
            datosNeXO['f01_raz_soc'] = paramForm.f01_raz_soc;
            datosNeXO['f01_sup'] = paramForm.f01_sup;
            datosNeXO['f01_cap_aprox'] = paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_estab_es'] = paramForm.f01_estab_es;
            datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
            datosNeXO['f01_fecha_ini_act'] = "";
            datosNeXO['f01_fecha_imp'] = "";
            datosNeXO['f01_fecha_fin_act'] = "";
            //UBICACION DE LA ACTIVIDAD ECONOMICA
            datosNeXO['f01_macro_act_descrip'] = paramForm.f01_macro_act_descrip;
            datosNeXO['f01_macro_act'] = parseInt(paramForm.f01_macro_act);
            datosNeXO['f01_dist_act'] = paramForm.f01_dist_act; //"";
            datosNeXO['f01_dist_act_descrip'] = paramForm.f01_dist_act_descrip;
            datosNeXO['f01_zona_act'] = paramForm.f01_zona_act; //paramForm.f01_zona_act_descrip;
            datosNeXO['f01_tip_via_act'] = paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act'] = paramForm.f01_num_act; //paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act_n'] = paramForm.f01_num_act_n; //paramForm.f01_num_act;
            datosNeXO['f01_factor'] = "";
            datosNeXO['f01_num_act1'] = paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act'] = paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act'] = paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc'] = paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1'] = paramForm.f01_tel_act1;
            datosNeXO['f01_casilla'] = paramForm.f01_casilla;
            datosNeXO['f01_idCodigoZona'] = "";
            datosNeXO['f04_res_solicitud_upaee'] = "";
            datosNeXO['f08_hojas_recibidas'] = "0";
            datosNeXO['f08_observaciones_i'] = "0";
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['f01_nro_actividad'] = paramForm.f01_nro_actividad;
            //PAGO ADELANTADO
            if (paramForm.pago_adelantado == true) {
                datosNeXO['pago_adelantado'] = 'SI'; //$scope.pago_adelantado;
            } else {
                datosNeXO['pago_adelantado'] = 'NO';
            };
            datosNeXO['nro_ges'] = paramForm.nro_ges;
            datosNeXO['listDeudas'] = paramForm.listDeudas;
            datosNeXO['f01_total_deudas'] = $scope.totalD;
            /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_tipo_lic'] = paramForm.f01_tipo_lic;
            datosNeXO['f01_tipo_lic_sierra'] = paramForm.f01_tipo_lic_sierra;
            datosNeXO['f01_proceso'] = paramForm.f01_proceso;
            datosNeXO['f01_categoria_agrupada'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada_sierra'] = paramForm.f01_categoria_agrupada_sierra;
            datosNeXO['f01_categoria_agrupada_descripcion'] = "";
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            datosNeXO['declaracion_jurada'] = $rootScope.decJuradaNatural;
            datosNeXO['montoDeuda'] = paramForm.montoDeuda;
            datosNeXO['f01_vencimientoLicencia'] = paramForm.f01_vencimientoLicencia;
            var datoObjectdj = [];
            var decjuradaN = new Object();
            if ($rootScope.decJuradaNatural) {
                decjuradaN.url = $rootScope.decJuradaNatural;
                datosNeXO['declaracion_jurada'] = $rootScope.decJuradaNatural;
            } else {
                decjuradaN.url = $scope.datos.declaracion_jurada;
                datosNeXO['declaracion_jurada'] = $scope.datos.declaracion_jurada;
            };
            decjuradaN.campo = 'Declaración Jurada Natural';
            decjuradaN.nombre = 'DECLARACIÓN JURADA';
            datoObjectdj[0] = decjuradaN;
            datosNeXO['File_Publicidad'] = $scope.datos.fileArchivosPublicidad;
            if (paramForm.g_origen_p) {
                datosNeXO['g_origen_p'] = paramForm.g_origen_p;
            } else {
                datosNeXO['g_origen_p'] = "";
            }
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
            if (datosNeXO['f01_requisitos_tecnicos'] == null) {
                datosNeXO['f01_requisitos_tecnicos'] = [];
            }
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_croquis_ae'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
        }
        datosNeXO['f01_categoria_descrip'] = paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria_descrip2'] = paramForm.f01_categoria_descripcion.toUpperCase();
        datosNeXO['f01_categoria'] = parseInt(paramForm.f01_categoria_descrip);
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2.toUpperCase();
        if (paramForm.rdTipoTramite1 == "NUEVO" || paramForm.rdTipoTramite1 == 'NUEVO') {
            datosNeXO['sw_publicidad'] = "CP";
            datosNeXO['swpublicidad'] = "CP";
        }
        if (paramForm.rdTipoTramite1 == "RENOVACION" || paramForm.rdTipoTramite1 == 'RENOVACION') {
            datosNeXO['sw_publicidad'] = "SP";
            datosNeXO['swpublicidad'] = "SP";
        }
        datosNeXO['publicidad'] = paramForm.publicidad;
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
        datosNeXO['publicidad_grilla'] = paramForm.publicidad_grilla;
        datosNeXO['licencia_multiple'] = paramForm.licenciam;
        datosNeXO['g_tipo'] = "AE-LINEA";
        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        datosNeXO['pago_duodecimas'] = paramForm.pago_duodecimas;
        datosNeXO['fecha_duodecima'] = paramForm.fecha_duodecima;
        datosNeXO['condicion_uso'] = $rootScope.condicion_uso;
        datosNeXO['f01_correlativo_form402'] = $rootScope.f01_correlativo_form402;
        var datoObjectdjCU = [];
        var decjuradaCU = new Object();
        decjuradaCU.url = $rootScope.condicion_uso;
        decjuradaCU.campo = 'Condición de uso';
        decjuradaCU.nombre = 'CONDICIÓN DE USO';
        datoObjectdjCU[0] = decjuradaCU;
        datosNeXO['File_Adjunto'] = $rootScope.FileAdjuntos.concat(decjuradaN, datoObjectdjCU);
        datosNeXO['File_ae'] = $rootScope.File_ae.concat(decjuradaN);
        datosNeXO['File_contribuyente'] = $scope.datos.File_contribuyente.concat(datoObjectdjCU);
        if (paramForm.chkzonasegura == 'ZONASEGURA') {
            datosNeXO['f01_zona_segura'] = 'SI';
        } else {
            if (paramForm.chkzonasegura == 'NOZONASEGURA') {
                datosNeXO['f01_zona_segura'] = 'NO';
            } else {
                datosNeXO['f01_zona_segura'] = '';
            }
        }
        datosNeXO['id_zona_segura'] = paramForm.id_zona_segura;
        var sMacroR = datosNeXO['f01_macro_des'];
        var sZonaR = datosNeXO['INT_AC_ID_ZONA'];
        var sMacroRDesc = datosNeXO['f01_macro_des'];
        var sZonaRDesc = datosNeXO['INT_AC_ID_ZONA'];
        var iCategoriaAgrupada = datosNeXO['INT_ID_CAT_AGRUPADA'];
        var iMacrodistrito = datosNeXO['INT_AC_MACRO_ID'];
        if (iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != "") {
            //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
            var sIdTramite = $rootScope.tramiteId;
            var datosSerializados = JSON.stringify(datosNeXO);
            archivo1 = "";
            var crearCaso = new gCrearCaso();
            crearCaso.usr_id = 1,
                crearCaso.datos = datosSerializados,
                crearCaso.procodigo = idProcodigo,
                crearCaso.crearCasoAeLinea(function(response) {
                    try {
                        $scope.botones = null;
                        $scope.desabilitado = true;
                        response = JSON.parse(response);
                        var results = response.success.data;
                        indice = 0;
                        datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                        datosIF2 = datosIF[1];
                        datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
                        $scope.nrotramitec = datosIF[0];
                        sessionService.set('NROTRAMITE', datosIF[0]);
                        sessionService.set('NROTRAMITEID', datosIF[1]);
                        sessionService.set('IDPROCESO', datosIF[6]);
                        var idTramite1 = sessionService.get('NROTRAMITEID');
                        datosNeXO['INT_AC_direccionImagenmapa'] = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                        //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                        try {
                            ///$scope.capturarImagen();
                            $scope.validarFormProcesos(paramForm);
                            $scope.guardarAdjuntosMultiplesMapa(results);
                        } catch (e) {}
                        $.unblockUI();
                    } catch (e) {
                        console.log("falla: ", e);
                        alert("conexion fallida ");
                    }
                });
            /* }else{
                 swal('', "Complete sus Datos de Direccion", 'warning');
             }  */
        } else {
            swal('', "Datos obligatorios, verifique los datos del formulario E", 'warning');
        }
    };

    $scope.ShowPa = function(valor) {
        $scope.calculo_total = 0;
        var fechaVen = $scope.datos.f01_vencimientoLicencia.split('/');
        var resFechaVen = fechaVen[2] + "-" + fechaVen[1] + "-" + fechaVen[0];
        var fechaAct = $scope.fechafinalserver.split('/');
        var resFechaAct = fechaAct[2] + "-" + fechaAct[1] + "-" + fechaAct[0];
        var fecha1 = moment(resFechaVen);
        var fecha2 = moment(resFechaAct);
        var diasAnticipacion = fecha1.diff(fecha2, 'days');
        console.log(diasAnticipacion, ' dias de diferencia');
        var e = new Date();
        e.setMonth(e.getMonth() + 23);
        $scope.datos.pago_adelantado = valor;
        if (valor == 'true' || valor == true) {
            if (diasAnticipacion >= 30) {
                $scope.datos.pago_adelantado = valor;
                $scope.IsVisible = true;
            } else {
                if (typeof $scope.datos.pago_duodecimas != undefined) {
                    if ($scope.datos.pago_duodecimas == 'SI') {
                        $scope.datos.pago_adelantado = valor;
                        $scope.IsVisible = true;
                    } else {
                        swal('', "Estimado ciudadano, aún no puede elegir esta opción debido a que tiene deudas pendientes que no fueron pagadas", 'warning');
                        $scope.IsVisible = false;
                        $scope.datos.pago_adelantado = false;
                        $scope.datos.nro_ges = '';
                    };
                } else {
                    swal('', "Estimado ciudadano esta opción debe solicitarla con 30 días de anticipación a la fecha de vencimiento de su Licencia de Funcionamiento.\n Su licencia de Funcionamiento venció el " + $scope.datos.f01_vencimientoLicencia + " \n Primero debe realizar el pago de sus deudas pendientes. Una vez realizado el pago puede realizar la solicitud de Pago Adelantado", 'warning');
                    $scope.IsVisible = false;
                    $scope.btnFUM = false;
                    $scope.datos.pago_adelantado = false;
                    $scope.datos.nro_ges = '';
                };
            }
        } else {
            $scope.IsVisible = false;
        };
    }

    $scope.calcularDeudas = function(nroges) {
        $scope.datos.montoDeuda = [];
        var fechaP = new Date();
        var gestionP = fechaP.getFullYear();
        $scope.mensajeCiudadano = '';
        if ($scope.datos.f01_proceso == 'GEN') {
            $scope.mensajeCiudadano = ' las proximas 24 Hrs., ';
        } else {
            $scope.mensajeCiudadano = ' los proximos 5 días, ';
        };
        $scope.datos.listDeudas = [];
        if ($scope.datos.f01_idCodigoZona == undefined || $scope.datos.f01_idCodigoZona == 'undefined' || $scope.datos.f01_idCodigoZona == null) {
            swal('', 'Seleccione nuevamente el croquis por favor  ', 'warning');
        } else {
            if ($scope.datos.nro_ges == '' || $scope.datos.nro_ges == undefined || $scope.datos.nro_ges == 'undefined') {
                $scope.totalD = 0;
            } else {
                $.blockUI();
                var datoObject_cat = '[';
                if ($scope.datos.f01_tipo_lic_sierra == 26 || $scope.datos.f01_tipo_lic_sierra == '26') {
                    var multiservicios = $scope.datos.licenciam;
                    for (i = 0; i < multiservicios.length; i++) {
                        datoObject_cat = datoObject_cat + multiservicios[i].f01_cat_agrupadamid + ',';
                    }
                    datoObject_cat = datoObject_cat.substring(0, datoObject_cat.length - 1);
                } else {
                    datoObject_cat = datoObject_cat + $scope.datos.f01_categoria_agrupada_sierra;
                }
                datoObject_cat = datoObject_cat + ']';
                if ($scope.datos.rdTipoTramite1 == "NUEVO") {
                    if ($scope.datos.publicidad.length > 0) {
                        var dataPub = $scope.datos.publicidad;
                        datoObject_pub = [];
                        var pospub = 0;
                        for (k = 0; k < dataPub.length; k++) {
                            if (dataPub[k].estado == 'B') {} else {
                                datoObjectPublicidad = new Object();
                                if (dataPub[k].estado == 'N') {
                                    datoObjectPublicidad.id_viae = dataPub[k].idPublicidad_temp;
                                } else {
                                    datoObjectPublicidad.id_viae = dataPub[k].idPublicidad;
                                };
                                datoObjectPublicidad.caras = 1;
                                datoObjectPublicidad.pub_superficie = dataPub[k].INT_SUP;
                                datoObjectPublicidad.tipo_letrero_id = dataPub[k].idcarac;
                                datoObjectPublicidad.caracteristica_id = dataPub[k].id_cara;
                                datoObject_pub[pospub] = datoObjectPublicidad;
                                pospub = pospub + 1;
                            };
                        };
                        idPubS = JSON.stringify(datoObject_pub);
                    } else {
                        idPubS = '[]';
                    };
                } else {
                    idPubS = '[]';
                };
                var dataDeuda = '';
                var dataActEco = '';
                dataActEco = '{"tm_va":"' + $scope.datos.f01_factor + '","superficie":"' + $scope.datos.f01_sup + '","codigo_zona":"' + $scope.datos.f01_idCodigoZona + '","categorias_id":' + datoObject_cat + ',"id_zona":"' + $scope.datos.f01_zona_act + '","viae":' + idPubS + '}';
                dataDeuda = '{"actividad_economica":' + JSON.stringify(dataActEco) + ',"yfecha_inicio_cobro":"' + $scope.fechafinalserver + '","yanios":"' + nroges + '"}';
                $scope.calculo_total = 0;
                var calcularD = new reglasnegocioSierra();
                calcularD.identificador = 'SERVICIO_VALLE_AE-3277';
                calcularD.parametros = dataDeuda;
                calcularD.llamarregla_sierra(function(resDeuda) {
                    var deudasAE = JSON.parse(resDeuda);
                    var pagoAE = deudasAE.datos;
                    console.log('calculooooo    ', deudasAE);
                    $scope.datos.montoDeuda = pagoAE;
                    datoObjectPago = [];
                    $scope.btnCalcular = false;
                    for (j = 0; j < pagoAE.length; j++) {
                        datoObjectPP = new Object();
                        datoObjectPP.nro = (j + 1);
                        datoObjectPP.gestion = pagoAE[j].gestion;
                        datoObjectPP.monto_ae = pagoAE[j].monto_ae;
                        datoObjectPP.monto_viae = pagoAE[j].monto_viae;
                        datoObjectPP.descuento = pagoAE[j].descuento;
                        datoObjectPP.monto_total = pagoAE[j].monto_total;
                        datoObjectPP.monto_descuento = pagoAE[j].monto_descuento;
                        datoObjectPP.monto_total_con_descuento = pagoAE[j].monto_total_con_descuento;
                        datoObjectPago[j] = datoObjectPP;
                        $scope.calculo_total = $scope.calculo_total + parseInt(pagoAE[j].monto_total_con_descuento);
                    };
                    $scope.datos.listDeudas = datoObjectPago;
                    $scope.datos.calculo_total = $scope.calculo_total;
                    $scope.listDeudas = datoObjectPago;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    console.log('$scope.listDeudas    ', $scope.datos.listDeudas);
                    $scope.tblDeudas.reload();
                    $.unblockUI();
                })
            }
        };
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

    $scope.generarCorrelativo = function(tipo) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try {
            var resAct = new reglasnegocioSierra();
            resAct.identificador = 'VALLE_PRUEBA-SGEN-3329';
            resAct.parametros = '{"xcorrelativo_tipo":"' + tipo + '"}';
            resAct.llamarregla_sierra(function(responseCorrelativo) {
                var dataCorrelativo = JSON.parse(responseCorrelativo);
                correlativo = dataCorrelativo[0].sp_obtener_correlativo_ae;
                deferred.resolve(correlativo);
            })
        } catch (e) {
            console.log(e);
        }
        return deferred.promise;
    }

    $scope.generarDeudasPendientes = function() {
        var fechaVen = $scope.datos.f01_vencimientoLicencia.split('/');
        var resFechaVen = fechaVen[2] + "-" + fechaVen[1] + "-" + fechaVen[0];
        var fechaAct = $scope.fechafinalserver.split('/');
        var resFechaAct = fechaAct[2] + "-" + fechaAct[1] + "-" + fechaAct[0];
        var fecha1 = moment(resFechaVen);
        var fecha2 = moment(resFechaAct);
        var diasAnticipacion = fecha1.diff(fecha2, 'days');
        console.log(diasAnticipacion, ' dias de diferencia');
        if (diasAnticipacion >= 30) {} else {
            var resDeudaPendiente = new reglasnegocioSierra();
            resDeudaPendiente.identificador = 'SERVICIO_VALLE_AE-3348';
            resDeudaPendiente.parametros = '{"ytaeGestion":"' + fecha.getFullYear() + '","yactividad_economica_id":"' + $scope.datos.f01_id_actividad_economica + '","yfechaActual":"' + $scope.fechafinalserver + '","yusrId":"7777"}';
            resDeudaPendiente.llamarregla_sierra(function(responseDeudasPend) {
                getDeudas = new reglasnegocioSierra();
                getDeudas.identificador = 'SERVICIO_SIERRA-PROC-3284';
                getDeudas.parametros = '{"aeconomica_id":"' + $scope.datos.f01_id_actividad_economica + '","tipo_deuda":"actividadEconomica"}';
                getDeudas.llamarregla_sierra(function(reslstDeudas) {
                    var lstDeudas = JSON.parse(reslstDeudas);
                    datoObjectDeudasPen = [];
                    if (lstDeudas == '[{}]' || lstDeudas == '[{ }]' || lstDeudas == '{}') {} else {
                        $scope.datos.deudasPendiente = lstDeudas;
                        for (var i = 0; i < lstDeudas.length; i++) {
                            var dataDeudas = JSON.parse(lstDeudas[i].data);
                            datoObjectDP = new Object();
                            datoObjectDP.nro = (i + 1);
                            datoObjectDP.deuda_id = dataDeudas.deuda_id;
                            datoObjectDP.gestion = dataDeudas.deuda_data.gestion;
                            datoObjectDP.monto_ae = dataDeudas.deuda_data.montoDeterminado_ae_bs;
                            datoObjectDP.monto_viae = dataDeudas.deuda_data.viaeBs;
                            datoObjectDP.descuento = dataDeudas.deuda_data.porcentaje_desc_pago_adelantado;
                            datoObjectDP.monto_total = dataDeudas.deuda_data.deuda_tributaria_bs;
                            datoObjectDP.monto_descuento_bs_padelantado = dataDeudas.deuda_data.monto_descuento_bs_padelantado;
                            datoObjectDP.monto_total_bs_padelantado = dataDeudas.deuda_data.monto_total_bs_padelantado;
                            datoObjectDeudasPen[i] = datoObjectDP;
                        };
                        $scope.divDeudasPendientes = true;
                        $scope.datos.listDeudasPendientes = datoObjectDeudasPen;
                        var data = $scope.listDeudasPendientes;
                    };
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
            })
        };
    }

    $scope.getGenerarFUM = function() {
        swal({
                title: "Estimado Ciudadano",
                text: "Una vez impresa la Proforma para el pago de sus deudas Ud. tiene un tiempo de 5 días para cancelar dichas deudas, pasado el tiempo NO podrá realizar la solicitud de Pago Adelantado. \n Con este documento deberá proximarse a cualquier banco, para realizar su pago. \n Esta seguro de imprimir la Proforma para el pago de sus deudas?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "SI",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal.close();
                    var nombreCompleto = $scope.datos.f01_pri_nom_prop + ' ' + $scope.datos.f01_ape_pat_prop + ' ' + $scope.datos.f01_ape_mat_prop + ' ' + $scope.datos.f01_ape_cas_prop;
                    //////////////ITEMMMMMM/////////////////////////
                    getITEM = new reglasnegocio();
                    getITEM.identificador = 'PRESUPUESTO-1';
                    getITEM.parametros = '{"id_unidad_recaudadora":"139"}';
                    getITEM.llamarregla(function(resItem) {
                        var generarITEM = JSON.parse(resItem);
                        var generarITEM2 = JSON.parse(generarITEM[19].xtodo);
                        $scope.FUM = generarITEM2.ir_codigo;
                        $scope.descripFUM = generarITEM2.ir_descripcion;
                        $scope.iddeudas = '';
                        $scope.odms = '';
                        $scope.myJSONFUM = '';
                        $scope.myJSONtrans = '';
                        datoObjectFUMFinal = [];
                        datoObjectTransFinal = [];
                        datoObjectTransFinal2 = [];
                        var deudasDuodecimas = JSON.parse($scope.datos.deudasPendiente[0].resultado);
                        var montoufv = parseFloat(deudasDuodecimas.deuda_data.monto_total_bs_padelantado / deudasDuodecimas.deuda_data.ufv_actual).toFixed(5);
                        $scope.iddeudas = $scope.iddeudas + '' + deudasDuodecimas.deuda_id + ',';
                        var dataFum = '';
                        var dataF = '{"gestion_pago":' + deudasDuodecimas.deuda_data.gestion + ',"id_actividad":' + deudasDuodecimas.deuda_actividad_id + ',"tipo_actividad":"actividadEconomica"}';
                        var detalle = '[{"odm_item_recaudador":"' + generarITEM2.ir_codigo + '","odm_pre_unitario":"' + parseFloat(deudasDuodecimas.deuda_data.monto_total_bs_padelantado) + '","odm_cantidad":"1","odm_sub_total":"' + parseFloat(deudasDuodecimas.deuda_data.monto_total_bs_padelantado) + '"}]';
                        dataFum = '{"Tipo":"generarOdm","razon_social":"' + nombreCompleto + '","ci_nit":"' + $scope.datos.f01_num_dos_prop + '","unidad_recaudadora":"139","sucursal":"0","monto_total":"' + parseFloat(deudasDuodecimas.deuda_data.monto_total_bs_padelantado) + '","detalles":' + detalle + ',"data":' + dataF + '}';
                        $.ajax({

                            //url: jsonURLS.CONEXION_MOTOR_SERVICIO+'/poss_pruebas/servicios/ODM_Controller_PRUEBAS.php',//descomentar esta linea una puesto en produccion
                            url: 'http://172.19.160.38:8081/poss_pruebas/servicios/ODM_Controller_PRUEBAS.php', //comentar esta linea una vez puesto en produccion
                            data: dataFum,
                            type: "POST",
                            dataType: "json",
                            async: false,
                            success: function(responseODM) {
                                $scope.codigoODM = responseODM.data[0].nroodm;
                                if (responseODM.data[0].nro_registro == 0) {
                                    swal('', 'Error al generar correlativo, vuelva a imprimir la Proforma Por favor', 'error');
                                } else {
                                    $scope.odms = $scope.odms + '' + $scope.codigoODM + ',';
                                    datoObjectFUM = new Object();
                                    datoObjectTrans = new Object();
                                    datoObjectFUM.observaciones = '';
                                    datoObjectFUM.gestion = deudasDuodecimas.deuda_data.gestion;
                                    datoObjectFUM.urlfum = '';
                                    datoObjectFUM.fum_tipo = 'duodecima';
                                    datoObjectFUM.usuario = sessionService.get('USUARIO');
                                    datoObjectFUMFinal[0] = datoObjectFUM;
                                    datoObjectTrans.idItemR = $scope.FUM;
                                    datoObjectTrans.descripcionItem = $scope.descripFUM;
                                    datoObjectTrans.Monto = montoufv;
                                    datoObjectTransFinal[0] = datoObjectTrans;
                                    datoObjectTransFinal2[0] = datoObjectTransFinal;
                                };
                            },
                            error: function(responseODM, status, error) {
                                dataResp = "{\"errorParametros\":{\"message\":\"" + responseODM + "\",\"code\":700}}";
                                console.log("error", dataResp);
                            }
                        });
                        $scope.myJSONFUM = datoObjectFUMFinal;
                        $scope.myJSONtrans = datoObjectTransFinal2;
                        $scope.registrarFUM($scope.iddeudas, $scope.odms, $scope.myJSONFUM, $scope.myJSONtrans);
                    })
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                } else {
                    swal.close();
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            });
    }

    $scope.registrarFUM = function(iddeudas, odms, myJSONFUM, myJSONtrans) {
        getIDFUM = new reglasnegocioSierra();
        getIDFUM.identificador = 'SERVICIO_SIERRA-MAES-2646';
        getIDFUM.parametros = '{}';
        getIDFUM.llamarregla_sierra(function(resIDFUM) {
            var idfum = JSON.parse(resIDFUM);
            var datos_FUM = JSON.stringify(myJSONFUM);
            var datos_FUM2 = JSON.stringify(datos_FUM);
            var datos_transaccion = JSON.stringify(myJSONtrans);
            var datos_transaccion2 = JSON.stringify(datos_transaccion);
            var jsonFUM = '';
            jsonFUM = '{"xfum_usr_id":7777,"xfum_tipo_act":"actividadEconomica","xdeudas_id":"' + iddeudas.substring(0, iddeudas.length - 1) + '","xfum_data":' + datos_FUM2 + ',"xfum_data_transaccion":' + datos_transaccion2 + ',"xfum_data_glosa":"{}","xfum_num_odm":"' + odms.substring(0, odms.length - 1) + '","xtipo_proforma":"detallada","xtipo_fum":"duodecima","xid_contribuyente":' + $scope.datos.f01_id_contribuyente + '}';
            registrarFUM = new reglasnegocioSierra();
            //registrarFUM.identificador = 'SERVICIO_SIERRA-MAES-3325';
            registrarFUM.identificador = 'SERVICIO_SIERRA-MAES-3386';
            registrarFUM.parametros = jsonFUM;
            registrarFUM.llamarregla_sierra(function(respuestaFUM) {
                var responseF = JSON.parse(respuestaFUM);
                if (responseF[0].sp_insertar_fum != '[]' || responseF[0].sp_insertar_fum != '[ ]') {
                    generarProforma = new reglasnegocioSierra();
                    generarProforma.identificador = 'SERVICIO_SIERRA-MAE-3342';
                    generarProforma.parametros = '{"xfum_grupo":' + idfum[0].sp_obtener_grupo + '}';
                    generarProforma.llamarregla_sierra(function(respuestaProforma) {
                        var dataProforma = JSON.parse(respuestaProforma);
                        if (dataProforma[0].sp_obtener_url_proforma == 'undefined' || dataProforma[0].sp_obtener_url_proforma == undefined) {
                            $.unblockUI();
                            swal('', 'Error al registrar FUM', 'warning');
                        } else {
                            $window.open(dataProforma[0].sp_obtener_url_proforma);
                            $scope.btnFUM = true;
                            $scope.datos.urlFum_duodecimas = dataProforma[0].sp_obtener_url_proforma;
                            $scope.datos.pago_duodecimas = 'NO';
                            $scope.datos.fecha_duodecima = fechactual;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            $scope.serializarInformacion($scope.datos);
                            $.unblockUI();
                        }
                    })
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                } else {
                    sweet.show('', 'Por favor generar nuevamente el FUM', 'warning');
                };
            })
        })
    }

    $scope.almacenarFumAE = function(urlData) {
        var sDocSistema = "IGOB247";
        var sDocProceso = "RENOVACION DE LICENCIA DE FUNCIONAMIENTO";
        var sDocId = 1;
        var sDocCiNodo = "CU";
        var sDocDatos = "";
        var sDocUrl = urlData;
        var sDocVersion = 1;
        var sDocTiempo = 400;
        var sDocFirmaDigital = 0;
        var sDocUsuario = sessionService.get('IDSOLICITANTE');
        var sDocTipoDoc = "pdf";
        var sDocTamDoc = "";
        var sDocNombre = "PROFORMA";
        var sDocTpsId = 0;
        var sDocUrlLogica = urlData;
        var sDocAcceso = "";
        var sDocTipoExt = "";
        var sDocNroTramNexo = "";
        var sCasoCodigo = "0";
        var documento = new gDocumentosIgob();
        documento.doc_sistema = sDocSistema;
        documento.doc_proceso = sDocProceso;
        documento.doc_id = sDocId;
        documento.doc_ci_nodo = sDocCiNodo;
        documento.doc_datos = sDocDatos;
        documento.doc_url = sDocUrl;
        documento.doc_version = sDocVersion;
        documento.doc_tiempo = sDocTiempo;
        documento.doc_firma_digital = sDocFirmaDigital;
        documento.doc_usuario = sDocUsuario;
        documento.doc_tipo_documento = sDocTipoDoc;
        documento.doc_tamanio_documento = sDocTamDoc;
        documento.doc_nombre = sDocNombre;
        documento.doc_tps_doc_id = sDocTpsId;
        documento.doc_url_logica = sDocUrlLogica;
        documento.doc_acceso = sDocAcceso;
        documento.doc_tipo_documento_ext = sDocTipoExt;
        documento.doc_nrotramite_nexo = sDocNroTramNexo;
        documento.doc_id_codigo = sCasoCodigo;
        documento.insertarDocIgob(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                srespuesta = "TRUE";
                swal('FUM', 'Proforma Registrada', 'success');
                return srespuesta;
            } else {
                $.unblockUI();
                swal(resultadoApi.error.message);
                srespuesta = "FALSE";
                return srespuesta;
            }
        });
    }

    $scope.verProforma = function() {
        $window.open($scope.datos.urlFum_duodecimas);
    }

    $scope.getlstDeudas = function() {
        if ($scope.datos.f01_id_actividad_economica) {
            var verificarDuodecima = [$scope.verificarDeudaDuodecima($scope.datos.f01_id_actividad_economica)];
            $q.all(verificarDuodecima).then(function(respDou) {
                if (respDou[0] == '[{}]') {
                    console.log('genera duodecimas ');
                    $scope.mensajeVerificaPago = 'ESTIMADO CIUDADANO, UD. NO CUENTA CON DEUDAS. PUEDE SOLICITAR LA OPCIÓN DE PAGO ADELANTADO.';
                    $scope.mostrarMsgPagoTrue = false;
                    $scope.mostrarMsgPagoFalse = true;
                    $scope.divDeudasPendientes = false;
                    $scope.datos.pago_duodecimas = 'SI';
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                } else {
                    var lstDeudas = JSON.parse(respDou);
                    datoObjectDeudasPen = [];
                    var lstDeudasP = JSON.parse(lstDeudas[0].resultado);
                    if (lstDeudasP.deuda_estado == 'pagado' && lstDeudasP.deuda_tipo_inspag == 'DUODECIMA') {
                        $scope.mensajeVerificaPago = 'ESTIMADO CIUDADANO, UD. NO CUENTA CON DEUDAS. PUEDE SOLICITAR LA OPCIÓN DE PAGO ADELANTADO.';
                        $scope.mostrarMsgPagoTrue = false;
                        $scope.mostrarMsgPagoFalse = true;
                        $scope.divDeudasPendientes = false;
                        $scope.datos.pago_duodecimas = 'SI';
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    } else {
                        $scope.mensajeVerificaPago = 'ESTIMADO CIUDADANO SU(S) DEUDA(S) AÚN NO FUERON PAGADAS.';
                        $scope.datos.deudasPendiente = lstDeudas;
                        $scope.mostrarMsgPagoTrue = true;
                        $scope.mostrarMsgPagoFalse = false;
                        $scope.divDeudasPendientes = true;
                        $scope.datos.pago_duodecimas = 'NO';
                        var lstDeudas = JSON.parse(respDou);
                        datoObjectDeudasPen = [];
                        var lstDeudasP = JSON.parse(lstDeudas[0].resultado);
                        for (var i = 0; i < lstDeudas.length; i++) {
                            var dataDeudas = JSON.parse(lstDeudas[i].resultado);
                            datoObjectDP = new Object();
                            datoObjectDP.nro = (i + 1);
                            datoObjectDP.deuda_id = dataDeudas.deuda_actividad_id;
                            datoObjectDP.gestion = dataDeudas.deuda_data.gestion;
                            datoObjectDP.monto_ae = dataDeudas.deuda_data.montoDeterminado_ae_bs;
                            datoObjectDP.monto_viae = dataDeudas.deuda_data.viaeBs;
                            datoObjectDP.descuento = dataDeudas.deuda_data.porcentaje_desc_pago_adelantado;
                            datoObjectDP.monto_total = dataDeudas.deuda_data.deuda_tributaria_bs;
                            datoObjectDP.monto_descuento_bs_padelantado = dataDeudas.deuda_data.monto_descuento_bs_padelantado;
                            datoObjectDP.monto_total_bs_padelantado = dataDeudas.deuda_data.monto_total_bs_padelantado;
                            datoObjectDeudasPen[i] = datoObjectDP;
                        };
                        $scope.divDeudasPendientes = true;
                        $scope.datos.listDeudasPendientes = datoObjectDeudasPen;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };
                $timeout.cancel($scope.recargarDeudas);
                $scope.callAtTimeout();
            });
        } else {
            $timeout.cancel($scope.recargarDeudas);
            $scope.callAtTimeout();
        };
    }

    $scope.verificarDeudaDuodecima = function(idActEco) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        if (idActEco) {
            getDeudasDou = new reglasnegocioSierra();
            getDeudasDou.identificador = 'SERVICIO_SIERRA-PROC-3398';
            getDeudasDou.parametros = '{"xid_ae":"' + idActEco + '"}';
            getDeudasDou.llamarregla_sierra(function(reslstDeudasDou) {
                deferred.resolve(reslstDeudasDou);
            })
        }
        return deferred.promise;
    }

    $scope.callAtTimeout = function() {
        $scope.recargarDeudas = $timeout(function() {
            $scope.getlstDeudas();
        }, 50000);
    }

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    try {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    } catch (e) {
        console.log("error", e);
    }
};