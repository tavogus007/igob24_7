app.controller('serviciosLotusController', function ($scope, $rootScope ,$routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload,fileUpload1, obtFechaActual,wsRgistrarPubliciadad, fileUploadcorr) {
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.formRegularRegistrado   =   "";
    $scope.datosinic = {};
    $scope.btover_c = false;

    $scope.templates =
    [ 
        {name: 'template0.html', url: '../../../app/index.html'},//no existe en bd
        {name: 'template1.html', url: '../../../app/view/servicios/varios/formularios/solicitudLotus/moustache/moustache.html'}
    ];
    $scope.btnEnviarForm = true;
    $scope.habGuardar1 = true;
    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();
    $scope.hoverOut = function(){
        //$("#btnAyuda1").css("color", "red");
    };

    $scope.volver = function(){
        $("#element").show();
        $("#element2").hide();
        $("#volver").hide();
        $("#titleModal").show();
        $("#titleModal2").hide();
    }


    $scope.functionAyuda = function(i_xXs)
    {
        //$("#element2").fadeIn("5000");
        $("#element2").fadeIn("slow");
        $("#element").hide();
        $("#element2").show();
        $("#volver").show();
        $("#titleModal").hide();
        $("#titleModal2").show();

        var idData = $.getJSON("../../controller/registro_ciudadano/servicios/ayuda.json", function(data) 
        {
           
            angular.forEach(data, function(value, key) 
            {
              var idAyuda = i_xXs;
              var id      = value['id'];
              
              if(id==idAyuda)
              {
                $scope.id         = value['id']; 
                $scope.name       = value['name'];
                $scope.objetivo   = value['objetivo'];
                $scope.description= value['description'];
                $scope.image1     = value['image1'];
                $scope.image2     = value['image2'];
                $scope.image3     = value['image3'];
                $scope.step1      = value['step1'];
                $scope.step2      = value['step2'];
                $scope.step3      = value['step3'];
                $scope.step4      = value['step4'];
                $scope.step5      = value['step5'];
                $scope.step6      = value['step6'];
                //document.getElementById('texto').innerHTML= $scope.step1;

                var showChar = 100;
                var ellipsestext = " . . . ";
                var moretext = "+ MÁS DESCRIPCIÓN";
                var lesstext = "- MENOS DESCRIPCIÓN";                      
                var content = $scope.description= value['description'];

                if(content.length > showChar) 
                {
                    var c = content.substr(0, showChar);
                    var html = '<div  class="abstract" style="text-align: justify !important;">' + c + ellipsestext + '</div>' + '<div class="morecontent" style="text-align: justify !important;">' + content + '</div>' + '<a><span class="ready-btn1">' + moretext + '</span></a>';
                    $('.more').html(html);
                }
                else
                {
                    var html = '<div class="" style="text-align: justify !important;">' + content + '</div>';
                    $('.more').html(html);
                }
                   
                $('.ready-btn1').click(function() 
                {
                  if($(this).hasClass('less')) 
                  {
                    $(this).removeClass('less');
                    $(this).html(moretext);
                    $('.abstract').removeClass('hidden');
                  }
                  else
                  {
                    $(this).addClass('less');
                    $(this).html(lesstext);
                    $('.abstract').addClass('hidden');
                  }
                    $(this).parent().prev().slideToggle('fast');
                    $(this).prev().slideToggle('fast');
                    return false;
                });

                //CATASTRO
                var showCharCat = 100;
                var ellipsestextCat = " . . . ";
                var moretextCat = "+ MÁS DESCRIPCIÓN";
                var lesstextCat = "- MENOS DESCRIPCIÓN";                      
                var contentCat = $scope.step1= value['step1'];

                if(contentCat.length > showCharCat) 
                {
                    var c = contentCat.substr(0, showCharCat);
                    var html = '<div  class="abstract" style="text-align: justify !important;">' + c + ellipsestextCat + '</div>' + '<div class="morecontent" style="text-align: justify !important;">' + contentCat + '</div>' + '<a><span class="ready-btnCat">' + moretextCat + '</span></a>';
                    $('.moreCat').html(html);
                }
                else
                {
                    var html = '<div class="" style="text-align: justify !important;">' + contentCat + '</div>';
                    $('.moreCat').html(html);
                }
                   
                $('.ready-btnCat').click(function() 
                {
                  if($(this).hasClass('less')) 
                  {
                    $(this).removeClass('less');
                    $(this).html(moretextCat);
                    $('.abstract').removeClass('hidden');
                  }
                  else
                  {
                    $(this).addClass('less');
                    $(this).html(lesstextCat);
                    $('.abstract').addClass('hidden');
                  }
                    $(this).parent().prev().slideToggle('fast');
                    $(this).prev().slideToggle('fast');
                    return false;
                });
                //FIN CATASTRO

              }
            });
            $scope.$apply();
        });      
    }

    $scope.volverMenuAyuda = function()
    {   
        $("#element").fadeIn("slow");

        $("#element").show();
        $("#titleModal").show();
        $("#titleModal2").hide();
        $("#element2").hide();
        $("#btnVolver").hide();
    }

    $scope.cerrarMenuAyuda = function()
    {

        $("#element2").hide();
        $("#btnVolver").hide();
        //$("#registroLotus").modal('toggle');
    }


    $scope.recuperarDatosRegistro = function(){
        $.blockUI();
        var datosini = {};
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            results = JSON.parse(resultado);
            if (results[0].dtspsl_file_fotocopia_ci) {
                $scope.btover=true;
            }
            if (results[0].dtspsl_file_fotocopia_ci_r) {
                $scope.btover1=true;
            }                
            if(results[0].dtspsl_tipo_persona == "NATURAL") 
            {                   
                var cidate = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                datosini['FILE_FACTURA_LUZ'] = results[0].dtspsl_file_factura_luz;
            }
            else if(results[0].dtspsl_tipo_persona == "JURIDICO"){ 
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                $.unblockUI(); 
            }        
        });

        $scope.datosinic = datosini;
        $rootScope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        $rootScope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        $rootScope.archivoLuz = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FACTURA_LUZ + "?app_name=todoangular";
        $.unblockUI();
    };

    $scope.validacionDatosNatural = function(datos){
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if(datos.dtspsl_file_fotocopia_ci == '' || datos.dtspsl_file_fotocopia_ci == ''){
             datosfaltantes.push(' ANVERSO DE CARNET DE IDENTIDAD');
        }
        if(datos.dtspsl_file_fotocopia_ci_r == '' || datos.dtspsl_file_fotocopia_ci_r == ' '){
             datosfaltantes.push(' REVERSO DE CARNET DE IDENTIDAD');
        }
        if(datos.dtspsl_fec_vencimiento == '' || datos.dtspsl_fec_vencimiento == ' '){
            datosfaltantes.push(' FECHA DE VENCIMIENTO');
        }
        $scope.datosfalt = datosfaltantes; 
    }
    $scope.validacionDatosJuridico = function(datos){
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if(datos.dtspsl_ci_representante == '' || datos.dtspsl_ci_representante == ' '){
             datosfaltantes.push('CI DEL REPRESENTANTE LEGAL');
        }
        if(datos.dtspsl_razon_social == '' || datos.dtspsl_razon_social == ' '){
             datosfaltantes.push(' RAZON SOCIAL');
        }
        if(datos.dtspsl_nit == ''){
            datosfaltantes.push(' NIT');
        }
        if((datos.dtspsl_correo == '')||(datos.dtspsl_correo == ' ')){
            datosfaltantes.push(' CORREO');
        }
        $scope.datosfalt = datosfaltantes; 
    }
    //RECUPERANDO DATOS DEL REGISTRO CIUDADANO
    $scope.recuperandoDatosInicialesCiudadano = function()
    {       
        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.habGuardar1 = true;
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function(resultado){            
            var resultadoApi    =   JSON.parse(resultado);
            datos           =   resultadoApi[0];
            $scope.datosIniciales = resultadoApi[0];
            var fechaServer = $rootScope.fechaServer.split(" ");
            var fechaFin = new Date($scope.datosIniciales.dtspsl_fec_vencimiento);
            var fechaInicio = new Date(fechaServer[0]);
            var diasdif= fechaFin.getTime()-fechaInicio.getTime();
            var contdias = Math.round(diasdif/(1000*60*60*24));
            if($scope.datosIniciales.dtspsl_tipo_persona=="NATURAL"){
                $scope.validacionDatosNatural($scope.datosIniciales);
                if ($scope.datosIniciales.dtspsl_file_fotocopia_ci=="" || $scope.datosIniciales.dtspsl_file_fotocopia_ci == "" || $scope.datosIniciales.dtspsl_file_fotocopia_ci_r==" " || $scope.datosIniciales.dtspsl_file_fotocopia_ci_r == " " || $scope.datosIniciales.dtspsl_fec_vencimiento=="" || $scope.datosIniciales.dtspsl_fec_vencimiento==" ") {   
                        setTimeout(function(){
                            swal({
                                title: 'Editar su Información',
                                text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'OK',
                                closeOnConfirm: true
                            }, function() {                                
                                window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                                //$.unblockUI();
                            });
                        },300);
                } else {
                    //validacion de fecha
                    if (contdias<0){
                        setTimeout(function(){
                            swal({
                                title: 'Editar su Información',
                                text: 'Estimado ciudadano su carnet de identidad expiro, debe actualizar su información',
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'OK',
                                closeOnConfirm: true
                            }, function() {                                
                                window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                                //$.unblockUI();
                            });
                        },300);
                    }
                }
            } else {
                if($scope.datosIniciales.dtspsl_tipo_persona=="JURIDICO"){
                    $scope.validacionDatosJuridico($scope.datosIniciales);
                    if ((datos.dtspsl_razon_social == '' || datos.dtspsl_nit == '' || datos.dtspsl_ci_representante == '' || datos.dtspsl_correo == '') || (datos.dtspsl_ci_representante == ' ' || datos.dtspsl_razon_social == ' ' || datos.dtspsl_correo == ' ' )) {
                        setTimeout(function(){
                            swal({
                                title: 'Completar información',
                                text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'OK',
                                closeOnConfirm: true
                            }, function() {
                                window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                                //$.unblockUI();
                            });
                        },300);
                    }
                } else {
                    window.location.href = "#servicios|varios|index.html?url='dashboard'";                   
                }
            }

            




        });
    };

    /*LISTADO DE TRAMITES GRILLA - SOLICITUD*/
    $scope.tramitesCiudadano = function(tramite){
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramites();
            rData.oid = sIdCiudadano;
            rData.codigo = 'SITRAM_C';
            rData.obtTramitesPorTipoTramite (function(res){
                r = JSON.parse(res);                
                results = r.success;
                angular.forEach(results,function(val, index){
                    var fechadata = new Date(results[index].vregistrado);
                    if(fechadata.getDate()<9)
                        dia = "0" + fechadata.getDate();
                    else
                        dia = fechadata.getDate();
                    if(fechadata.getMonth()<9)
                        mes = "0" + (fechadata.getMonth() + 1);
                    else
                        mes = (fechadata.getMonth() + 1);
                    var fechaactualH = dia + "/" + mes + "/" + fechadata.getFullYear();
                    if(fechaactualH == $scope.fechafinalserver){
                        results[index].TramiteNow = 'NUEVO';
                    } else {
                        results[index].TramiteNow = 'PASADO';
                    }
                    if(val['form_contenido'])
                    {
                        results[index].datos=JSON.parse(val['form_contenido']);
                    }
                    

                });

                $scope.tramitesUsuario = results;
                var data = results;
                $scope.tablaTramites.reload();
                if(tramite){
                    $scope.seleccionarTramite(tramite);
                }
            });
        } catch(error){
            console.log("Error Interno : ", error);
        }
    };

    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            vtra_id: 'desc'
        }
    }, {
        total: $scope.tramitesUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.tramitesUsuario, params.filter()) :
            $scope.tramitesUsuario;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.tramitesUsuario;
            params.total($scope.tramitesUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });   
    
    /*CIUDADANO-INICIAR DATOS CONTRI*/
    $scope.iniciandoDatos = function(){
        var datosIniciales = $scope.datosIniciales;
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
        datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
        datosForm_inicio['f01_nom_completo'] = datosIniciales.f01_nom_completo;
        datosForm_inicio['f01_tip_doc_prop'] = datosIniciales.f01_tip_doc_prop;
        datosForm_inicio['f01_num_dos_prop'] = datosIniciales.f01_num_dos_prop;
        datosForm_inicio['f01_expedido_prop'] = datosIniciales.f01_expedido_prop;
        datosForm_inicio['f01_email_prop'] = datosIniciales.f01_email_prop;
        datosForm_inicio['f01_cel_prop'] = datosIniciales.f01_cel_prop;
        datosForm_inicio['f01_telef_prop'] = datosIniciales.f01_telef_prop;
        datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
        datosForm_inicio['f01_ape_mat_prop'] = datosIniciales.f01_ape_mat_prop;
        datosForm_inicio['f01_ape_pat_prop'] = datosIniciales.f01_ape_pat_prop;
        datosForm_inicio['f01_pri_nom_prop'] = datosIniciales.f01_pri_nom_prop;
        datosForm_inicio['f01_tel_ciudadano'] = datosIniciales.f01_tel;
        datosForm_inicio['f01_piso_prop'] = datosIniciales.f01_piso_prop;
        datosForm_inicio['f01_depa_prop'] = datosIniciales.f01_depa_prop;
        //DATOS INICIALES PERSONA JURIDICA
        datosForm_inicio['f01_rl_nit'] = datosIniciales.f01_rl_nit;
        datosForm_inicio['f01_rl_razon_zocial'] = datosIniciales.f01_rl_razon_zocial;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = "";
        datosForm_inicio['f01_rl_num_documento'] = "";
        datosForm_inicio['f01_tipo_per'] = datosIniciales.f01_tipo_per;
        //f01_pri_nom_prop
        datosForm_inicio['f01_pri_nom_prop'] = datosIniciales.f01_pri_nom_prop;
        datosForm_inicio['f01_ape_pat_prop'] = datosIniciales.f01_ape_pat_prop;
        datosForm_inicio['f01_ape_mat_prop'] = datosIniciales.f01_ape_mat_prop;
        datosForm_inicio['f01_ape_cas_prop'] = datosIniciales.f01_ape_cas_prop;
        //DATOS INICIALES PERSONA NATURAL
        datosForm_inicio['f01_macro']       = datosIniciales.f01_macro;
        datosForm_inicio['f01_macro_des']   = datosIniciales.f01_macro_des;
        datosForm_inicio['f01_distrito']    = datosIniciales.f01_distrito;
        datosForm_inicio['f01_distrito_desc']   = datosIniciales.f01_distrito_desc;
        datosForm_inicio['f01_zona']        = datosIniciales.f01_zona;
        datosForm_inicio['f01_zon_prop_valor']  = datosIniciales.f01_zon_prop_valor;
        datosForm_inicio['INT_VIA']         = datosIniciales.INT_VIA;
        datosForm_inicio['f01_nom_via_prop']    = datosIniciales.f01_nom_via_prop;
        datosForm_inicio['f01_num_prop']    = datosIniciales.f01_num_prop;
        datosForm_inicio['INT_EDIF']        = datosIniciales.INT_EDIF;
        datosForm_inicio['f01_bloq_prop']   = datosIniciales.f01_bloq_prop;
        datosForm_inicio['INT_PISO']        = datosIniciales.INT_PISO;
        datosForm_inicio['INT_NUM_DEP']     = datosIniciales.INT_NUM_DEP;
        datosForm_inicio['INT_DIR_DET']     = datosIniciales.INT_DIR_DET;
        //DATOS INCIALES PERSONA JURIDICA
        datosForm_inicio['INT_RL_FEC_EMISION_DOCUMENTO']    = datosIniciales.INT_RL_FEC_EMISION_DOCUMENTO;
        datosForm_inicio['INT_NACIONALIDAD']        = datosIniciales.INT_NACIONALIDAD;
        datosForm_inicio['INT_RL_FEC_NACIMIENTO'] = datosIniciales.INT_RL_FEC_NACIMIENTO;
        datosForm_inicio['INT_NIT']                 = datosIniciales.INT_NIT;
        datosForm_inicio['f01_tip_via_prop']        = datosIniciales.f01_tip_via_prop;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO']   = datosIniciales.INT_RL_TIPO_DOCUMENTO;
        datosForm_inicio['f01_rl_num_documento']    = datosIniciales.f01_rl_num_documento;
        datosForm_inicio['INT_RL_FECHA_NAC']        = datosIniciales.INT_RL_FECHA_NAC;
        datosForm_inicio['IDTRAMITE']               = datosIniciales.IDTRAMITE;
        datosForm_inicio['f01_num_doc_rep']        = datosIniciales.f01_num_doc_rep;
        datosForm_inicio['f01_num_notaria']         =  datosIniciales.f01_num_notaria;
        datosForm_inicio['f01_num_rep']            = datosIniciales.f01_num_rep;
        datosForm_inicio['f01_tip_doc_rep'] = "NIT";
        datosForm_inicio['f01_num_doc_per_jur'] = datosIniciales.f01_num_doc_per_jur;
        datosForm_inicio['f01_raz_soc_per_jur'] =  datosIniciales.f01_raz_soc_per_jur;
        datosForm_inicio['f01_tip_doc_rep'] = datosIniciales.f01_tip_doc_rep;
        datosForm_inicio['f01_expedido_rep'] = datosIniciales.f01_expedido_rep;
        datosForm_inicio['f01_pri_nom_rep'] = datosIniciales.f01_pri_nom_rep;
        datosForm_inicio['f01_seg_nom_rep'] = datosIniciales.f01_seg_nom_rep;
        datosForm_inicio['f01_ter_nom_rep'] = datosIniciales.f01_ter_nom_rep;
        datosForm_inicio['f01_ape_pat_rep'] = datosIniciales.f01_ape_pat_rep;
        datosForm_inicio['f01_ape_mat_rep'] = datosIniciales.f01_ape_mat_rep;
        datosForm_inicio['f01_ape_cas_rep'] = datosIniciales.f01_ape_cas_rep;
        datosForm_inicio['f01_ges_vig_pod'] = datosIniciales.f01_ges_vig_pod;
        datosForm_inicio['f01_num_doc_rep'] = datosIniciales.f01_num_doc_rep;
        datosForm_inicio['f01_num_pod_leg'] = datosIniciales.f01_num_pod_leg;
        datosForm_inicio['f01_tip_doc_rep'] = datosIniciales.f01_tip_doc_rep;
        datosForm_inicio['f01_email_rep'] = datosIniciales.f01_email_rep;
        datosForm_inicio['f01_cel_rep'] = datosIniciales.f01_cel_rep;
        datosForm_inicio['f01_telef_rep'] = datosIniciales.f01_telef_rep;
        datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
        datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
        datosForm_inicio['TIPO'] = "AE_INT_EMISION";
        datosForm_inicio['f01_raz_soc'] = datosIniciales.f01_raz_soc;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = "NIT";
        datosForm_inicio['f01_num_rep'] = datosIniciales.f01_num_rep;
        datosForm_inicio['f01_nom_via_rep'] = datosIniciales.f01_nom_via_rep;
        datosForm_inicio['f01_tipo_viarep'] = datosIniciales.f01_tipo_viarep;
        datosForm_inicio['f01_id_zona_rep'] = datosIniciales.f01_id_zona_rep;
        datosForm_inicio['f01_zona_rep'] = datosIniciales.f01_zona_rep;
        datosForm_inicio['f01_zon_rep_valor'] = datosIniciales.f01_zon_rep_valor;
        datosForm_inicio['INT_NIT'] = datosIniciales.INT_NIT;
        datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
        datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
        datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
        datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
        datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;
        datosForm_inicio['INT_AC_TIP_VIA']      =   datosIniciales.INT_AC_TIP_VIA;
        if(datosIniciales.f01_tipo_per == 'N' || datosIniciales.f01_tipo_per == 'NATURAL'){
            datosForm_inicio['FILE_FOTOCOPIA_CI']   =   $scope.datosinic.FILE_FOTOCOPIA_CI;
            datosForm_inicio['FILE_FOTOCOPIA_CI_R'] =   $scope.datosinic.FILE_FOTOCOPIA_CI_R;
            datosForm_inicio['FILE_FACTURA_LUZ']    =   $scope.datosinic.FILE_FACTURA_LUZ;
        }else{
            if(datosIniciales.f01_tipo_per == 'J' || datosIniciales.f01_tipo_per == 'JURIDICO'){
                $scope.btover_c = true;
                datosForm_inicio['id_representante']    = datosIniciales.id_representante;
                datosForm_inicio['FILE_FOTOCOPIA_CI']   = datosIniciales.FILE_FOTOCOPIA_CI_RA;
                datosForm_inicio['FILE_FOTOCOPIA_CI_R'] = datosIniciales.FILE_FOTOCOPIA_CI_RR;
                datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;
            }
        }
        datosForm_inicio['IDTRAMITE']           =   $scope.sIdTramiteSeleccionado
        //DATOS ADJUNTOS        
        $rootScope.looo = 0;
        $rootScope.laaa = 0;
        $scope.datos = datosForm_inicio;

        if(datosIniciales.f01_tipo_per == 'N' || datosIniciales.f01_tipo_per == 'NATURAL'){
            if (datosIniciales.f01_macro && datosIniciales.f01_distrito && datosIniciales.f01_distrito_desc && datosIniciales.f01_zona && datosIniciales.f01_zon_prop_valor && datosIniciales.f01_tip_via_prop && datosIniciales.f01_nom_via_prop && datosIniciales.f01_num_prop) {
                $scope.validacionDireccion = false;
            } else {
                $scope.validacionDireccion = true;
                sweet.show('Complete información', "Datos de dirección son obligatorios debe completar la información de su cuenta", 'error');
            }
        }  
    };    

    $scope.seleccionarProcesoT = function (tramite) {
        $scope.procesoSeleccionado  =   tramite.id;
        $scope.formtramite  =   tramite;   
        $scope.tramiteSeleccionadoP  =   tramite.idcampo;
    };

    /*SELECCCIONAR TRAMITE CIUDADANO*/
    $scope.seleccionarTramite = function (tramite) {
        $scope.template =   "";
        $.blockUI();
        setTimeout(function(){
            $scope.recuperarFormsxProceso(tramite);
        },500);        
    }

    $scope.recuperarFormsxProceso = function (tramite) {
            try{
                jDataFormsLotus     =   [];
                $.getJSON( "../../controller/registro_ciudadano/servicios/correspondencia.json", function( respuesta ) {
                    var forms   =   respuesta.success.data[0].exportar_formulario;         
                    jDataFormsLotus =   forms;
                    $scope.tramiteSeleccionadoP  =   tramite.idcampo;
                    $scope.formtramite  =   tramite;
                    //CARGAR FORMULARIO
                    $scope.seleccionarTramiteRender(tramite);
                    $scope.$apply();
                    $.unblockUI();
                });
            }catch(e){
                console.log("Error al Procesar formulario:",e);
                $.unblockUI();
            }
    };    

    $scope.seleccionarTramiteRender = function (tramite) {  
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        sessionService.set('tramiteIgob', JSON.stringify(tramite.datos));
        $scope.template     = "";
        $scope.formulario   = "mostrar";
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   tramite.vdvser_id;
        $scope.template         =   $scope.templates[1];
        $scope.recuperarSerializarInfo(tramite);
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
    };

    var adjuntos = '';
    var datoFinalA = new Array();
    
    /*RECUPERAR DATOS - INICIAR FORMULARIO*/
    $scope.recuperarSerializarInfo= function(tramite){
        try{
            var sIdTramite      = tramite.vtra_id;
            var sIdCiudadano    = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
            var sIdServicio     = sessionService.get('IDSERVICIO');
            var rData           = null;
            $scope.btover_c     = true;
            $scope.sIdTramiteSeleccionado = tramite.vtra_id;
            rData           = new datosFormularios();
            rData.frm_tra_id_ciudadano  = sIdCiudadano;
            rData.frm_tra_dvser_id      = sIdServicio;
            rData.frm_idTramite         = sIdTramite;
            rData.splistafrmdatos(function(result){
                var formalmacenado      = "";
                results                 = JSON.parse(result).success[0].form_contenido;
                svalorJosn  = [];            
                if(Object.keys(JSON.parse(results)).length > 5){
                    datos   =   [];
                    svalorJosn   = JSON.parse(results);
                }else{                
                    datos   =   $scope.datosIniciales;
                    datos.DATA_FORM  =   JSON.parse(results);
                }
                dataFinal = $scope.datos;
            });
        }catch(e){
            console.log("Error al recuperar datos del formulario:",e);
            $.unblockUI();
        }
    };


    $scope.clsRegistrarNuevo    =   function()
    {
        $("#btnVolver").hide();     
        $("#titleModal2").hide();
        $("#element2").hide();
        $("#element").show();
        $("#titleModal").show();
        $scope.formtramite  =   {};
    }


    $scope.adicionarServicioGamlpV = function(tramite){
        swal({
            title: 'CONFIRMAR',
            text: 'Está a punto de crear un trámite de ' + tramite.name + ' .\n¿Se encuentra seguro de realizar dicha creación?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                 $scope.adicionarServicioGamlp(tramite);
            }, 1000);
        });
    }

    $scope.adicionarServicioGamlp = function(tramite){
        $scope.template = "";
        var dataInicio  =   { };
        var dataInicioForm  =   { };
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = tramite.id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;        
        dataInicio.INT_FORM_ALMACENADO  =   'C';
        dataInicio.INT_ID_FORM_LOTUS    =   tramite.idcampo;
        dataInicio.POC_TIPO_TRAMITE     =   tramite.scodigo;
        //PARA SELECCIONAR DE MANERA AUTOMATICA EL FORMULARIO
        dataInicioForm.vdvser_id = tramite.id;
        dataInicioForm.venviado = "NO";
        dataInicioForm.datos = dataInicio;
        dataInicioForm.form_contenido = JSON.stringify(dataInicio);
        var datosSerializados   =  JSON.stringify(dataInicio);
        $.blockUI();
        try{
            var crea = new adicionaTramitesFormulario();
            crea.frm_tra_fecha = sFechaTramite;
            crea.frm_tra_enviado = "NO";
            crea.frm_tra_registrado = fechactual;
            crea.frm_tra_modificado = fechactual;
            crea.id_servicio = sIdServicio;
            crea.data_json = datosSerializados;
            crea.oid_ciudadano = sIdCiudadano;
            crea.id_usuario = 3;
            $.blockUI();
            crea.adiciona_Tramites_Formulario(function(res){
                x = JSON.parse(res);
                response = x.success;
                if(response.length  > 0){                    
                    sessionService.set('IDTRAMITE : ', response[0].sp_insertar_formulario_tramites_datos);
                    $.unblockUI();
                    dataInicioForm.vtra_id = response[0].sp_insertar_formulario_tramites_datos;
                    $scope.tramitesCiudadano(dataInicioForm);
                    $scope.getCaptchasX();
                    alertify.success("Formulario creado correctamente ..");                    
                    //sweet.show('', 'Registro almacenado correctamente', 'success');
                    sessionService.destroy('NROTRAMITE');
                    sessionService.destroy('NROTRAMITEID');
                    sessionService.destroy('IDPROCESO');
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                $('#registro').modal('hide');
                }
                else{
                    $.unblockUI();
                }
            });         
        }catch(e){
            console.log('*Error*');
            $.unblockUI();
        }
    };
    $scope.almacenarRequisitos = function(aArchivos, idFile){
        document.getElementById('href_f01_upload_'+idFile).href = '';
        document.getElementById(idFile).value = '';
        document.getElementById(idFile+'_url').value = '';
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var tipoDocci = archivo.name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[nameArrayci.length-1];                
                if (archivo.size <= 15000000) {
                    if(tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm' || tipoDocci == 'PNG' || tipoDocci == 'JPG' || tipoDocci == 'JPEG' || tipoDocci == 'BMP' || tipoDocci == 'GIF' || tipoDocci == 'PDF' || tipoDocci == 'DOCX' || tipoDocci == 'DOCXLM'){
                        nombreNuevo = 'adjunto_'+fechaNueva+'.'+tipoDocci;
                        url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                        fileUploadcorr.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo).then(function(data){
                            if(data.status == 200){
                                document.getElementById('href_f01_upload_'+idFile).href = url;
                                document.getElementById(idFile).value = nombreNuevo;
                                document.getElementById(idFile+'_url').value = url;                        
                            }else{
                                swal('Advertencia', 'Problemas al cargar el adjunto seleccionado', 'error');   
                            } 
                        });
                    }else{
                        swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        document.getElementById(idFile).value = '';
                    }
                }else{
                    swal({
                        title:'Advertencia',
                        text: "El tama&ntilde;o del archivo es muy grande",
                        html: true,
                        type: "error",
                        customClass: 'swal-wide',
                        showCancelButton: true,
                        showConfirmButton:false
                    });                    
                }
            }else{
            }
        });
    };
    $scope.tablaHistorico = {};
    $scope.actH = false;    

    $scope.lista_historico =  function (tramite) {
        $scope.tablaHistoricoMovimientos = [];
        $scope.actH = false;
        var tru = "";
        var trd = "";      
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: CONFIG.CONEXION_API_PG_IF + 'wsIf/listaHistorico',
            dataType: 'json',
            data: '{"uid":"'+ tramite.datos.POC_UIDHISTO +'", "nrocopia":"0"}',
            success: function (response){ 
                $scope.tablaHistoricoMovimientos = response.success.data;
                $scope.$apply();
            },
            error: function (response){ console.log(response);}
        });
    }

    $scope.obtenerDatosServicio = function(){
        $scope.tramite_ciudadano = 'SITRAM_C';
        var sData = new obtIdServicio();
        sData.codigo = $scope.tramite_ciudadano;
        sData.obt_Id_Servicio(function(res){
            $scope.res = JSON.parse(res);
            $scope.resMenu = $scope.res.success;
            $rootScope.serviciosLotus = $scope.resMenu;
        })
    }
   
    $scope.$on('api:ready',function(){
        $scope.recuperandoDatosInicialesCiudadano();        
        $scope.tramitesCiudadano();
        $scope.obtenerDatosServicio();
       
    });

    $scope.inicioServicios = function () {        
        $scope.recuperandoDatosInicialesCiudadano();        
        $scope.tramitesCiudadano();
        $scope.obtenerDatosServicio();
        

    };
});