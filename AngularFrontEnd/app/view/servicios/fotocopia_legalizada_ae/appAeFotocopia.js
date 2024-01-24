function solicitudFotocopiaAEController($scope,sessionService, CONFIG,ngTableParams, $filter) {
    $scope.fechaActual = "";
    $scope.idTramite = 0;
    var fechaserver = new fechaHoraServer(); 
    $scope.unidadRecaudadora = 0;
    var sucursal = 206;
    $scope.itemRecaudador = 0;
    $scope.costo = 0;
    $scope.usuarioTokenFacturacion = 'ifacturas';
    $scope.claveTokenFacturacion = 'F4cOnl1n3';

    $scope.descItemRecaudador = "LEGALIZACIÓN DE LICENCIAS DE FUNCIONAMIENTO UAE (A.E. GRAL SIN INSPECCIÓN, ESTABLECIMIENTOS DE EXPENDIO DE ALIMENTOS Y VEHICULOS DE EXPENDIO DE ALIMENTOS PREPARADOS)";
    $scope.mostrarPago = true;
    fechaserver.fechahora(function(resp){
        var sfecha = JSON.parse(resp);
        var fechaServ = (sfecha.success.fecha).split(' ');
        $scope.fechaActual = fechaServ[0];
    });
    $scope.datos = {};
    $scope.dataGenesisCiudadano = {};
    $scope.tblTramites          =   {};
    $scope.trmUsuario           =   [];
    $scope.tblLicencias         =   {};
    $scope.licencias            =   [];
    $scope.tblSolicitudes       =   {};
    $scope.solicitudes          =   [];
    $scope.idAE                 = 0;
    $scope.urlLicencia          = "";
    $scope.mostrarLegalizacion = false;

    $scope.inicioSolicitus = function(){
        $scope.datos = {};
        $.blockUI(); 
        var token = new tokenFacturacionV2();
        token.usr_usuario = $scope.usuarioTokenFacturacion;
        token.usr_clave = $scope.claveTokenFacturacion;
        token.generaToken(function (response){
            var respuestaToken = JSON.parse(response);
            if(respuestaToken.message == "Acceso exitoso."){
                sessionStorage.setItem('TOKEN_FACTURACIONV2',"Bearer "+respuestaToken.data.token);
                var cufd = new obtenerEstado();
                cufd.sucursal = sucursal;
                cufd.punto_venta = "0";
                cufd.obtenerEstadoCufd(function (response){
                    var respuesta = JSON.parse(response);
                    if(respuesta.estado){
                        $.ajax({
                            type: "POST",
                            url: CONFIG.CONEXION_FACTURACION_AE_V2+"api/item/listar",
                            data: JSON.stringify({
                                "numero_sucursal":sucursal
                            }),
                            async: false,
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            success: function(response) {
                                console.log("response123",response);
                                if(response.success){
                                    if(response.data.length>0){
                                        var detalleItem = response.data.find( item => item.descripcion == ($scope.descItemRecaudador));
                                        console.log("detalleItem",detalleItem);
                                        if(detalleItem != undefined){
                                            $scope.unidadRecaudadora = detalleItem.unidad_recaudadora;
                                            $scope.itemRecaudador = detalleItem.codigo_item;
                                            $scope.costo = detalleItem.precio;
                                            $scope.mostrar = true;
                                            var datosCiudadano = new rcNatural();
                                            datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
                                            datosCiudadano.datosCiudadanoNatural(function(resultado){ 
                                                var response = JSON.parse(resultado)[0];
                                                if(response.dtspsl_tipo_persona =="NATURAL"){
                                                    $scope.datos.tipoPersona = response.dtspsl_tipo_persona;
                                                    $scope.datos.oidCiudadano = response._id;
                                                    $scope.datos.nombres = response.dtspsl_nombres;
                                                    $scope.datos.primerApellido = response.dtspsl_paterno;
                                                    $scope.datos.secundoApellido = response.dtspsl_materno;
                                                    $scope.datos.tipoDocumento = "CI";
                                                    $scope.datos.documento = response.dtspsl_ci;
                                                    $scope.datos.expedido = response.dtspsl_expedido;
                                                    $scope.datos.correo = response.dtspsl_correo;
                                                    $scope.datos.celular = response.dtspsl_movil;
                                                }else{
                                                    $scope.datos.tipoPersona = response.dtspsl_tipo_persona;
                                                    $scope.datos.oidCiudadano = response._id;
                                                    $scope.datos.documento = response.dtspsl_nit;
                                                    $scope.datos.razonSocial = response.dtspsl_razon_social;
                                                    $scope.datos.documentoRepresentante = response.dtspsl_ci_representante;
                                                    $scope.datos.tipoDocumento = "NIT";
                                                    var buscarRepresentante = new rcNatural();
                                                    buscarRepresentante.tipo_persona = "NATURAL";
                                                    buscarRepresentante.ci = $scope.datos.documentoRepresentante;
                                                    buscarRepresentante.buscarPersona(function(resultadoN){
                                                        var datosRep = JSON.parse(resultadoN)[0];
                                                        $scope.datos.nombreRepresentante = datosRep.dtspsl_nombres;
                                                        $scope.datos.primerApRepresentante = datosRep.dtspsl_paterno;
                                                        $scope.datos.secundoApRepresentante = datosRep.dtspsl_materno;
                                                        $scope.datos.secundoApRepresentante = datosRep.dtspsl_materno;
                                                        $scope.datos.expedidoRepresentante = datosRep.dtspsl_expedido;
                                                        $scope.datos.correo = datosRep.dtspsl_correo;
                                                        $scope.datos.celular = datosRep.dtspsl_movil;
                                                    })
                                                }
                                                $scope.datos.costo_fotocopias = $scope.costo;
                                                $scope.datos.numero_fotocopias = 1;
                                                var tipoContribuyente   =  $scope.datos.tipoPersona;
                                                var ciDocumento         =  '';
                                                var nitDocumento        =  '';
                                                var sAccion             =  '';
                                                if(tipoContribuyente == 'NATURAL'){
                                                    ciDocumento          =   $scope.datos.documento ;
                                                    sAccion              =  'C01';
                                                }else if(tipoContribuyente == 'JURIDICO'){
                                                    nitDocumento         =   $scope.datos.documento;
                                                    sAccion              =  'C02';
                                                }
                                                var contriGenesis  =   new gLstDatos();
                                                contriGenesis.idContribuyente = "";
                                                contriGenesis.clase="";
                                                contriGenesis.padron="";
                                                contriGenesis.identificacion=ciDocumento;
                                                contriGenesis.primerNombre="";
                                                contriGenesis.primerApellido="";
                                                contriGenesis.segundoApellido="";
                                                contriGenesis.nit=nitDocumento;
                                                contriGenesis.empresa="";
                                                contriGenesis.p_accion=sAccion;
                                                try{
                                                    contriGenesis.lstDatosContribuyente(function(resultado){
                                                        resultadoApi = JSON.parse(resultado);
                                                        if (resultadoApi.success) {
                                                            var response    =   resultadoApi;
                                                            if(response.success.dataSql.length > 0){
                                                                $scope.dataGenesisCiudadano  =   response.success.dataSql;
                                                            } else {
                                                                $scope.dataGenesisCiudadano  =  '';
                                                            }
                                                            $.unblockUI();
                                                        } else {
                                                            $.unblockUI();
                                                        }
                                                    });
                                                }catch(e){
                                                    $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
                                                };
                                                $.unblockUI();
                                            })
                                        }else{
                                            swal('', "No se pudo recuperar el Item!!", 'error');
                                        }
                                    }else{
                                        swal('', "Ocurrio un error al recuperar el Item!!", 'error');
                                    }
                                }else{
                                    swal('', "Ocurrio un error al recuperar el Item!!", 'error');
                                }
                            },
                            error: function (response, status, error) {
                                $.unblockUI();
                                swal('', "Ocurrio un error al recuperar el Item!!", 'error');
                            }
                        }); 
                    }
                    else{
                        $scope.mostrar = false;
                        swal('', "No se tiene el Cufd activo!!!", 'error');
                    }
                   
                })
            }else{
                swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
            }
        })
    }

    $scope.tblLicencias = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.licencias.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.licencias, params.filter()) :
            $scope.licencias;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.licencias;
            params.total($scope.licencias.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.listaAE = function(){
        $.blockUI(); 
        $scope.mostrarLegalizacion = false;
        $scope.idAE = 0;
        try {
            var tipoPer = "";
            if($scope.datos.tipoPersona == 'NATURAL'){
                tipoPer = 'N';
            }else{
                tipoPer = 'J';
            }
            var listaActividades   =   new gLstActividadEconomica();
            listaActividades.idContribuyente   =   $scope.dataGenesisCiudadano[0].idContribuyente;
            listaActividades.tipo  =   tipoPer;
            listaActividades.lstActividadEconomicaLegalizacion(function(resultado){
                var resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    if(resultadoApi.success.dataSql.length > 0){
                        $scope.licencias = resultadoApi.success.dataSql;
                        $scope.tblLicencias.reload();
                    } else {
                        swal('', "Estimado Ciudadano usted no cuenta con licencia de funcionamiento.", 'warning');
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } catch (error) {
            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
        }
        $.unblockUI();

    }

    $scope.legalizar = function(datos_licencia){
        $scope.datos.motivo_solicitud = "";
        $scope.datos.costo_fotocopias = $scope.costo;
        $scope.datos.numero_fotocopias = 1;
        $scope.datos.idActividad = datos_licencia.IdActividad;
        $scope.datos.denominacionAe = datos_licencia.denominacion;
        $scope.datos.actividadDesarrolladaAe = datos_licencia.actividadDesarrollada343;
        $scope.datos.idActividadDesarrolladaAe = datos_licencia.idactividadDesarrollada343;
        $scope.datos.fechaInicioLic = datos_licencia.fechaEmision;
        $scope.datos.FechaFinLic = datos_licencia.fechaVencimiento;
        $scope.datos.descripcion = datos_licencia.Descripcion;
        $scope.datos.urlLicencia = datos_licencia.urlLicencia;
        $scope.datos.numeroLicencia = datos_licencia.numeroLicencia;
        $scope.datos.idLicencia = datos_licencia.idLicenciaActividadEconomica;
        $scope.mostrarLegalizacion = true;
        $scope.idAE = datos_licencia.IdActividad;
    }

    $scope.guardarSolicitud = function(datos){
        //$scope.datos = datos;
        $.blockUI(); 
        if($scope.datos.motivo_solicitud != 'undefined' && $scope.datos.motivo_solicitud != undefined && $scope.datos.motivo_solicitud!=""){
            if($scope.datos.tipoPersona == "NATURAL"){
                $scope.datos.doc_complemento_fac = "";
                if(datos.documento.indexOf('-') != -1){
                    var arrayDoc = datos.documento.split('-');
                    $scope.datos.documento_fac = arrayDoc[0];
                    $scope.datos.doc_complemento_fac = arrayDoc[1];                    
                }else{
                    $scope.datos.documento_fac = datos.documento;
                }
                if($scope.datos.primerApellido != ""){
                    $scope.datos.razon_social_fac = $scope.datos.primerApellido;
                }else{
                    $scope.datos.razon_social_fac = $scope.datos.secundoApellido;
                }
            }else if($scope.datos.tipoPersona == "JURIDICO"){
                $scope.datos.documento_fac = $scope.datos.documento;
                $scope.datos.razon_social_fac = $scope.datos.razonSocial;
            }
            $scope.datos.correo_fac = $scope.datos.correo;
            $scope.datos.celular_fac = $scope.datos.celular;
            var token = new tokenFacturacionV2();
            token.usr_usuario = $scope.usuarioTokenFacturacion;
            token.usr_clave = $scope.claveTokenFacturacion;
            token.generaToken(function (response){
                var respuestaToken = JSON.parse(response);
                if(respuestaToken.message == "Acceso exitoso."){
                    sessionStorage.setItem('TOKEN_FACTURACIONV2',"Bearer "+respuestaToken.data.token);
                    var documentos = new tipoDocumentos();
                    documentos.dominio = "TipoDocumentoIdentidad";
                    documentos.lstTipoDocumentos(function (response){
                        $scope.tipoDocumentos = JSON.parse(response);
                        var resultado = $scope.tipoDocumentos.find( documento => documento.nombre.startsWith($scope.datos.tipoDocumento));
                        $scope.datos.tipo_doc_fac = resultado.codigo;
                        $.unblockUI();
                        $('#formFacturacion').modal('show');
                    })
                }else{
                    swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                }
            })
        }else{
            swal('','Debe ingresar el motivo de la solicitud','error');
            $.unblockUI();
        }
    }

    $scope.limpiaCampos = function(){
        $scope.datos.documento_fac = "";
        $scope.datos.doc_complemento_fac = "";
        $scope.datos.razon_social_fac = "";
        $scope.datos.correo_fac = "";
        $scope.datos.celular_fac = "";
    }

    $scope.buscarDatos = function(datos){
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
            var token = new tokenFacturacionV2();
            token.usr_usuario = $scope.usuarioTokenFacturacion;
            token.usr_clave = $scope.claveTokenFacturacion;
            token.generaToken(function (response){
                var respuestaToken = JSON.parse(response);
                if(respuestaToken.message == "Acceso exitoso."){
                    sessionStorage.setItem('TOKEN_FACTURACIONV2',"Bearer "+respuestaToken.data.token);
                    var busca = new buscaDocumento();
                    var documento = datos.documento_fac;
                    /*if(datos.tipo_doc_fac=="1" && datos.doc_complemento_fac !=""){
                        documento = datos.documento_fac + "-" + datos.doc_complemento_fac;
                    }*/
                    busca.documento = documento;
                    busca.tipo_documento = datos.tipo_doc_fac;
                    busca.buscaDocumentoDetalle(function (response){
                        var respuesta = JSON.parse(response);
                        if(respuesta.estado == true){
                            $scope.datos.documento_fac = respuesta.data.nit_ci;
                            $scope.datos.doc_complemento_fac = respuesta.data.complemento;
                            $scope.datos.razon_social_fac = respuesta.data.razon_social;
                            $scope.datos.correo_fac = respuesta.data.correo;
                            $scope.datos.celular_fac = respuesta.data.celular; 
                        }
                        if(respuesta.data.mensaje == 'NIT ACTIVO'){
                            swal('', respuesta.data.mensaje, 'success');
                            $scope.datos.mensaje_fac = respuesta.data.mensaje;
                        }
                        $scope.datos.busqueda_fac = 1;
                        $.unblockUI();
                    })
                }else{
                    $.unblockUI();
                    swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                }
            })
        },1000);
    }

    $scope.generacionOdm = function(datos){
        var sw = 1;
        if(datos.tipo_doc_fac == '5'){
            if(datos.busqueda_fac == 1){
                sw = 1;
            }else{ 
                sw = 0;
            }
        }else{
            datos.mensaje_fac = 'CI ACTIVO';
        }
        if(sw == 1){
            if(datos.mensaje_fac == 'NIT ACTIVO' || datos.mensaje_fac == 'CI ACTIVO'){
                swal({
                    title: 'Pagar',
                    text: 'Esta seguro de realizar el pago de la copia legalizada?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'SI',
                    closeOnConfirm: true
                }, function(isConfirm) {
                    if(isConfirm){
                        $('#formFacturacion').modal('hide');
                        $.blockUI();
                        try {
                            var nombre_completo_re = "";
                            var nombre_=""
                            var ci_nit = "";
                            var apellidos = "";
                            var montoTotal = datos.numero_fotocopias*(datos.costo_fotocopias);
                            $.ajax({
                                type: "POST",
                                url: CONFIG.CONEXION_SIERRA_VALLE + 'api/apiLogin',
                                data: CONFIG.CREDENCIALES_ODM,
                                async: false,
                                success: function(response) {
                                    var token = "Bearer "+response.token;
                                    if(datos.tipoPersona=='NATURAL'){
                                        nombre_ = (datos.nombres).trim();
                                        apellidos = (datos.primerApellido).trim()+' '+(datos.primerApellido).trim();
                                        nombre_completo_re = nombre_ +' '+apellidos;
                                        ci_nit = datos.documento;
                                    }else{
                                        nombre_ = (datos.nombreRepresentante).trim();
                                        apellidos = (datos.primerApRepresentante).trim()+' '+(datos.secundoApRepresentante).trim();
                                        nombre_completo_re = nombre_ + ' ' +apellidos;
                                        ci_nit = datos.documento;
                                    }
                                    var datosEnvio = {
                                        "razon_social": nombre_completo_re,
                                        "ci_nit": ci_nit,
                                        "unidad_recaudadora": $scope.unidadRecaudadora,
                                        "sucursal": sucursal,
                                        "monto_total": montoTotal.toString(),
                                        "detalles": [
                                            {
                                                "odm_item_recaudador": $scope.itemRecaudador,
                                                "odm_pre_unitario": datos.costo_fotocopias,
                                                "odm_cantidad": datos.numero_fotocopias.toString(),
                                                "odm_sub_total":  montoTotal.toString()
                                            }
                                        ],
                                        "data": {
                                        }
                                    };           
                                    $.ajax({
                                        type: "POST",
                                        url: CONFIG.CONEXION_SIERRA_VALLE + 'v.0.1/sierra/generacion_ODM',
                                        data: JSON.stringify(datosEnvio),
                                        async: false,
                                        headers: {
                                            'authorization': token
                                        }, 
                                        success: function(response) {
                                            if(JSON.stringify(response).includes('success')){
                                                if(response.success.code==200){
                                                    datos.nro_odm = response.data.nro_odm;
                                                    datos.nro_registro = response.data.nro_registro;
                                                    datos.nro_sucursal = response.data.nro_sucursal;
                                                    datos.tipoPago = "TARJETA";
                                                    datos.origen_solicitud = "igob";
                                                    var creaSolicitud = new adicionaRegistroSolicitud();
                                                    creaSolicitud.cod_servicio = 'LEG-LF';
                                                    creaSolicitud.id_usuario = 3;
                                                    creaSolicitud.data_formulario = JSON.stringify($scope.datos);
                                                    creaSolicitud.enviado = "SI";
                                                    try {
                                                        creaSolicitud.adicionaRegistroSolicitudServicio(function(res){
                                                            var respuesta = (JSON.parse(res)).success;
                                                            if(respuesta.length  > 0){
                                                                sessionService.set('IDTRAMITE', respuesta[0].vfrm_ser_id);
                                                                sessionService.set('CODTRAMITE', respuesta[0].vfrm_ser_codigo_servicio);        
                                                                $scope.pagarSolicitud(datos,response,nombre_,apellidos,ci_nit);
                                                            }
                                                            else{
                                                                $.unblockUI();
                                                            }
                                                        })
                                                    } catch (error) {
                                                        swal('','Ocurrio un error','error')
                                                        $.unblockUI();
                                                    }
                                                }else{
                                                    $.unblockUI();
                                                    swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');  
                                                }
                                            }else{
                                                $.unblockUI();
                                                swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');  
                                                
                                            }
                                        },
                                        error: function (response, status, error) {
                                            $.unblockUI();
                                            swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                        }
                                    });
                                },
                                error: function (response, status, error) {
                                    $.unblockUI();
                                    swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');
                                }
                            });
                        } catch (error) {
                            $.unblockUI();
                            swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');
                        }
                    }
                })
            }else{
                swal('',datos.mensaje_fac , 'error');
            }
        }else{
            swal('', "Debe realizar la busqueda del NIT!!!", 'error');
        }
    }

    $scope.pagarSolicitud = function(datos,respuestaOdm,nombre_,apellidos,ci_nit){
        
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
            var apellidos_primer = "";
            if(datos.tipoPersona=='NATURAL'){
                apellidos_primer = (datos.primerApellido).trim();
            }else{
                apellidos_primer = (datos.primerApRepresentante).trim();
            }
            var idTramite = sessionService.get('IDTRAMITE');
            var codTramite = sessionService.get('CODTRAMITE');
            if(respuestaOdm.data){
                var token = new tokenFacturacionV2();
                token.usr_usuario = $scope.usuarioTokenFacturacion;
                token.usr_clave = $scope.claveTokenFacturacion;
                token.generaToken(function (response){
                    var respuestaToken = JSON.parse(response);
                    if(respuestaToken.message == "Acceso exitoso."){
                        sessionStorage.setItem('TOKEN_FACTURACIONV2',"Bearer "+respuestaToken.data.token);
                        var item = new itemRecaudadorFacturacion();
                        item.numero_sucursal = sucursal;
                        item.lstItemRecaudador(function (response){
                            var arrayItems = JSON.parse(response);
                            if(arrayItems.success != undefined){
                                arrayItems = arrayItems.data;
                                var detalleItemFac = arrayItems.find( itemFacturacion => itemFacturacion.codigo_item == ($scope.itemRecaudador));
                                console.log("entra aqui",detalleItemFac);
                                if(detalleItemFac.codigo_item == $scope.itemRecaudador){
                                    $.blockUI();
                                    var respuesta = respuestaOdm.data;
                                    var detallePago = respuesta.detalles[0];
                                    var itemsPago = [{
                                        "concepto": $scope.descItemRecaudador,
                                        "cantidad": parseInt(detallePago.odm_cantidad),
                                        "precio_unitario": parseFloat(detalleItemFac.precio),
                                        "cod_Item_recaudador": parseInt(detallePago.odm_item_recaudador),
                                        "monto_descuento": 0,
                                        "subtotal":  parseFloat(detalleItemFac.precio)*parseInt(detallePago.odm_cantidad),
                                        "id_item": detalleItemFac.id_item
                                    }];
                                    console.log("datos",datos);
                                    var datosPago = {
                                        "odm": respuesta.nro_odm,
                                        "total":  parseFloat(detalleItemFac.precio)*parseInt(detallePago.odm_cantidad),
                                        "nombres": nombre_,
                                        "apellidos": apellidos,
                                        "direccion": "Z/ CENTRAL",
                                        "email": datos.correo_fac,
                                        "celular": datos.celular_fac,
                                        "sistema": "IGOB",
                                        "ci_nit": datos.documento,
                                        "oid_ciudadano": datos.oidCiudadano,
                                        "sucursal_facturacion": sucursal,
                                        "id_usuario_facturacion": 354,
                                        "reprogramacion": "NO",
                                        "servicio": "LEGALIZACION_FOTOCOPIAS_AE",
                                        "nit_factura": datos.documento_fac,
                                        "nombre_factura": datos.razon_social_fac,
                                        "tipo_documento": datos.tipo_doc_fac,
                                        "complemento": datos.doc_complemento_fac,
                                        "unidad_recaudadora":$scope.unidadRecaudadora,
                                        "data_opcional": [
                                            {
                                                "idSolicitud": idTramite,
                                                "codSolicitud":codTramite,
                                                "tipoPago": "TARJETA"
                                            }
                                        ],
                                        "items": itemsPago
                                    };
                                    $.blockUI();
                                    $.ajax({
                                        type: "POST",
                                        url: CONFIG.CONEXION_PAGOS + 'api/v2/registrarTrx',
                                        data: JSON.stringify(datosPago),
                                        async: false, 
                                        "headers": {
                                            "Content-Type": "application/json"
                                        },
                                        success: function(response) {
                                            var urlPago = JSON.parse(response);
                                            if(urlPago.formulario){
                                                $.unblockUI(); 
                                                $('#vistaPago').attr('src',CONFIG.CONEXION_PAGOS+urlPago.formulario);
                                                $('#pago').modal('show');
                                                $scope.mostrarPago = true;
                                                $scope.mostrarLegalizacion = false;
                                            }
                                            else{
                                                $.unblockUI(); 
                                                swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');
                                            }
                                        },
                                        error: function (response, status, error) {
                                            $.unblockUI();  
                                            swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');
                                        }
                                    });
                                }else{
                                    swal('', "Ocurrio un error con el Item Recaudador!!!", 'error');
                                }
                            }else{
                                swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                            }
                        })
                    }else{
                        swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                    }
                })
            }else{
                $.unblockUI();  
                swal('', "Ocurrio un error al momento de realizar el pago!!!", 'error');
            }
        },400);  
    }




    $scope.mostrarLicencia = function (url) {
        $('#licen').attr('src',url);
		window.open(url);
    };

    $scope.listarSolicitudes = function(){
        $.blockUI(); 
        try {
            var lstSolicitud   =   new lstRegistroSolicitud();
            lstSolicitud.oid_ciudadano  =   sessionService.get('IDSOLICITANTE');
            lstSolicitud.tipo_servicio  =   'LEG-LF';
            lstSolicitud.listaSolicitudServicio(function(resultado){
                var resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    if(resultadoApi.success.length > 0){
                        $scope.solicitudes = resultadoApi.success;
                        console.log("$scope.solicitudes",$scope.solicitudes);
                        $scope.tblSolicitudes.reload();
                    } else {
                        swal('', "Estimado Ciudadano usted no cuenta con solicitudes de fotocopia legalizada.", 'warning');
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } catch (error) {
            console.log(error);
            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
        }
        $.unblockUI();
    }

    $scope.tblSolicitudes = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.solicitudes.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.solicitudes, params.filter()) :
            $scope.solicitudes;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.solicitudes;
            params.total($scope.solicitudes.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.irSolicitud = function(){
        $("#solicitud").tab('show');
        $scope.listaAE();
    }

    $scope.cerrarModal = function(){
        swal({
            title: "Confirmar",
            text: "Esta seguro de haber concluido la solitud de pago?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "SI",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true },
            function(isConfirm){
            if (isConfirm) {
                $('#pago').modal('hide');
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
                    $scope.idTramite = sessionService.get('IDTRAMITE');
                    console.log("$scope.idTramite",$scope.idTramite);
                    var buscar = new buscarServicio();
                    buscar.id_form_ser = $scope.idTramite;
                    buscar.buscarServicioSolicitud(function (response) {
                        var res = JSON.parse(response);
                        console.log("entraaa",res);
                        if(res.success!=undefined){
                            if(res.success[0].vfrm_ser_estado_pago=='PAGADO'){
                                $scope.imprimirCopia(res.success[0]);
                            }else{
                                $.unblockUI();
                                swal('', "Su solicitud no fue pagada!!!", 'error');
                            }
                        }else{
                            $.unblockUI();
                            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                        }
                    })
                    $("#tramites").tab('show');
                    $scope.listarSolicitudes();
                    swal.close();
                    sessionService.destroy('IDTRAMITE');
                    sessionService.destroy('CODTRAMITE');
                },4000)
            }
        })
    }

    $scope.imprimirCopia = function(solicitud){
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
            if(solicitud.vfrm_ser_dataformulario.urlCopiaLegalizada == undefined){
                var motivo = solicitud.vfrm_ser_dataformulario.motivo_solicitud;
                if(solicitud.vfrm_ser_dataformulario.motivo_solicitud == 'OTRO'){
                    motivo = motivo + " "+ solicitud.vfrm_ser_dataformulario.motivo_solicitud_otro;
                }
                var datosEnvio = {
                    "idActividadEconomica":solicitud.vfrm_ser_dataformulario.idActividad,
                    "idLicenciaActividadEconomica":solicitud.vfrm_ser_dataformulario.idLicencia,
                    "numeroLicencia":solicitud.vfrm_ser_dataformulario.numeroLicencia,
                    "fechaPago":solicitud.fecha_pago,
                    "usuario":solicitud.vfrm_ser_dataformulario.nombres+" "+solicitud.vfrm_ser_dataformulario.primerApellido+" "+solicitud.vfrm_ser_dataformulario.secundoApellido,
                    "ipEquip":"127.0.0.1",
                    "equip":"GMLPPC08901",
                    "funcionar":"",
                    "origen":"igob",
                    "motivo":motivo
                };
                $.ajax({
                    type: "POST",
                    url: CONFIG.CONEXION_WS_GENESIS +"copiaLegalizadaLicencias.php",
                    data: JSON.stringify(datosEnvio),
                    async: false, 
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    success: function (data){
                        var res = JSON.parse(data);
                        console.log("res",res);
                        if(res.generaLicenciaAELegalizacionResult!=undefined){
                            if(res.generaLicenciaAELegalizacionResult.resultado == 'SI'){
                                var urlCopiaLegalizada = res.generaLicenciaAELegalizacionResult.descripcion;
                                var datosActualizados = solicitud.vfrm_ser_dataformulario;
                                datosActualizados.fechaFinCopiaLeg = res.generaLicenciaAELegalizacionResult.fechaCopiaVencimiento;
                                datosActualizados.fechaRegistroCopiaLeg = res.generaLicenciaAELegalizacionResult.fechaRegistro;
                                if((urlCopiaLegalizada.toLowerCase()).includes('http://prometeo/') == true){
                                    datosActualizados.urlCopiaLegalizada = urlCopiaLegalizada;
                                    $scope.actualizaInformacion(solicitud.vfrm_ser_id,datosActualizados);
                                }else{
                                    urlCopiaLegalizada = urlCopiaLegalizada.replace("gmlpsr0074", "192.168.5.208");
                                    var copiararch = new gCopiarArchivo();
                                    copiararch.nombre_archivo = urlCopiaLegalizada;
                                    copiararch.copiarArchivoLinea(function (response) {
                                        if((response.toLowerCase()).includes('error') != true){
                                            var miUrl = response;
                                            miUrl = miUrl.replace(/\"/g, '');
                                            miUrl = miUrl.replace(/\\r/g, '');
                                            miUrl = miUrl.replace(/\\n/g, '');
                                            datosActualizados.urlCopiaLegalizada = miUrl;
                                            $scope.actualizaInformacion(solicitud.vfrm_ser_id,datosActualizados);
                                        }else{
                                            $.unblockUI();
                                            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                                        }
                                    });
                                }
                            }else{
                                $.unblockUI();
                                swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                            }
                        }else{
                            $.unblockUI();
                            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                        }
                    },
                    error: function (data){
                        $.unblockUI();
                        swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
                    }
                });
            }
            else{
                $scope.mostrarCopiaLegalizadaLicencia(solicitud.vfrm_ser_dataformulario.urlCopiaLegalizada);
                $.unblockUI();
            }
        }, 3000);
    }

    $scope.actualizaInformacion = function(idServicio,datosForm){
        var actualizarInformacion = new actualizaServicio();
        actualizarInformacion.id_form_ser = idServicio;
        actualizarInformacion.datos_formulario = JSON.stringify(datosForm);
        actualizarInformacion.id_usuario = 3;
        actualizarInformacion.actualizaServicioSolicitud(function (response){
            if(JSON.parse(response).success!=undefined){
                $scope.listarSolicitudes();
                $scope.mostrarCopiaLegalizadaLicencia(datosForm.urlCopiaLegalizada);
                $.unblockUI();
            }else{
                $.unblockUI();
                swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
            }
        })
    }

    $scope.mostrarCopiaLegalizadaLicencia = function(urlCopia){
        $('#verLicencia').modal('show');
        $('#licen').attr('src',urlCopia);
		window.open(urlCopia);
    }

    $scope.asignadaId  =function(id){
        $scope.idTramite =  id;
    }
    //**********************VER FACTURA***************************************/
    $scope.verFactura = function(urlFac){
        /*var fac = urlFac.replace('192.168.8.6','131.0.0.16');
        window.open(fac);*/
        window.open(urlFac);
    }
};