function productosController($scope, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $q, $route, sweet, $http, FileUploader, $sce, fileUpload, fileUploadcorr) {
    $scope.tblDocumentos = {};
    $scope.frmProducto = null;
    $scope.datosProd = {};
    $scope.listadoProductos = [];
    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !';
    $scope.valida = 0;
    $rootScope.archivosProducto = new Array();
    $scope.imagenprincipalm = false;
    $scope.imagenaux1m = false;
    $scope.imagenaux2m = false;

    var clsIniciarCamposInternet = $rootScope.$on('inicializarProdutos', function(event, data) {
        $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));

    });
    $scope.recuperarSerializarProd = function(data) {
        $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
    }
    $scope.inicioProductos = function() {
        $scope.recuperarSerializarProd($rootScope.datosTiendaVirtual);
        $scope.update = false;
        $scope.nuevo = false;
        $scope.mostrarTxt = false;
        $scope.swP = false;
    };

    $scope.cambiarFile = function(obj, valor) {

        $scope.datosProd[obj.name] = valor;
        setTimeout(function() {
            $rootScope.leyenda1 = obj.name;
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
            //$scope.adicionarArrayDeRequisitos(sobj,idFile);
        }
    };

    $scope.almacenarRequisitos = function(aArchivos, idFiles) {
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        $scope.nombreNuevocom = "";
        fechaserver.fechahora(function(resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1] + hora_[2];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') + "/";
        $.blockUI();
        if ($rootScope.swArchivo == 'A') {
            angular.forEach(aArchivos, function(archivo, key) {
                if (typeof(archivo) != 'undefined') {
                    if (idFiles[key] == 1) {
                        var descDoc = "img_pr";
                        var descArchivo = "img_principal";
                        $scope.imagenprincipalm = true;
                    }
                    if (idFiles[key] == 2) {
                        var descDoc = "img_aux1";
                        var descArchivo = "img_auxiliar1";
                        $scope.imagenaux1m = true;

                    }
                    if (idFiles[key] == 3) {
                        var descDoc = "img_aux2";
                        var descArchivo = "img_auxiliar2";
                        $scope.imagenaux2m = true;
                    }
                    var imagenFile = archivo.name.split('.');;
                    var nombreNuevo = descArchivo + "_" + fechaNueva + '.' + imagenFile[1];
                    var ext_doc = imagenFile[imagenFile.length - 1].toLowerCase();
                    if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                        var filecompress = compressImage(archivo, "producto").then(function(respuestaFile) {
                            $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') + '/' + nombreNuevo + "?app_name=todoangular";
                            fileUploadcorr.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreNuevo;
                        });
                        var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') + '/' + nombreNuevo + "?app_name=todoangular";
                        var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
                        $rootScope.archivosProducto.push(myJSON);
                    } else {

                    }
                } else {}
            });
        } else {
            angular.forEach(aArchivos, function(archivo, key) {
                if (typeof(archivo) != 'undefined') {
                    if (idFiles[key] == 1) {
                        var descDoc = "img_pr";
                        var descArchivo = "img_principal";
                        $scope.imagenprincipalm = true;
                    }
                    if (idFiles[key] == 2) {
                        var descDoc = "img_aux1";
                        var descArchivo = "img_auxiliar1";
                        $scope.imagenaux1m = true;
                    }
                    if (idFiles[key] == 3) {
                        var descDoc = "img_aux2";
                        var descArchivo = "img_auxiliar2";
                        $scope.imagenaux2m = true;
                    }

                    var imagenFile = archivo.name.split('.');;
                    //var tipoFile = imagenFile[1];
                    var nombreNuevo = descArchivo + "_" + fechaNueva + '.' + imagenFile[1];
                    var ext_doc = imagenFile[imagenFile.length - 1].toLowerCase();
                    if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') + '/' + nombreNuevo + "?app_name=todoangular";
                        fileUploadcorr.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                        document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreNuevo;
                        /*var filecompress = compressImage(archivo).then(function(respuestaFile){
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[1];
                            var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                            $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                            fileUploadcorr.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                        });*/
                        var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') + '/' + nombreNuevo + "?app_name=todoangular";
                        var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
                        $rootScope.archivosProducto.push(myJSON);
                    } else {

                    }
                } else {}
            });

        }
        $scope.mostrarDocumentos($rootScope.archivosProducto);
        $.unblockUI();
    };

    $scope.ejecutarFile = function(idfile) {
        $scope.fileId = idfile;
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.mostrarDocumentos = function(documentosSub) {
        var img1 = "";
        var img2 = "";
        var img3 = "";
        if ($rootScope.swArchivo == 'A') {
            for (i = 0; i < documentosSub.length; i++) {
                var imagenesRecorrido = JSON.parse(documentosSub[i]);
                if (imagenesRecorrido.nombre == "img_principal") {
                    img1 = imagenesRecorrido.url;
                    $scope.imagenprincipal = img1;
                }
                if (imagenesRecorrido.nombre == "img_auxiliar1") {
                    img2 = imagenesRecorrido.url;
                    $scope.imagenaux1 = img2;
                }
                if (imagenesRecorrido.nombre == "img_auxiliar2") {
                    img3 = imagenesRecorrido.url;
                    $scope.imagenaux2 = img3;
                }
            }
        } else {
            if ($rootScope.swArchivo == 'M') {
                for (i = 0; i < documentosSub.length; i++) {
                    var imagenesRecorrido = JSON.parse(documentosSub[i]);
                    if (imagenesRecorrido.nombre == "img_principal") {
                        img1 = imagenesRecorrido.url;
                        $scope.imagenprincipal = img1;
                    }
                    if (imagenesRecorrido.nombre == "img_auxiliar1") {
                        img2 = imagenesRecorrido.url;
                        $scope.imagenaux1 = img2;
                    }
                    if (imagenesRecorrido.nombre == "img_auxiliar2") {
                        img3 = imagenesRecorrido.url;
                        $scope.imagenaux2 = img3;
                    }
                }
            }
        }
    }


    $scope.recuperarDocumentos = function(documentos) {
        if (documentos[0]) {
            var docmostrarimgp = JSON.parse(documentos[0]);
            $scope.imagenprincipal = docmostrarimgp.url;

        }

        if (documentos[1]) {
            var docmostrarimgaux1 = JSON.parse(documentos[1]);
            $scope.imagenaux1 = docmostrarimgaux1.url;
        }

        if (documentos[2]) {
            var docmostrarimgaux2 = JSON.parse(documentos[2]);
            $scope.imagenaux2 = docmostrarimgaux2.url;
        }
    }

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

    $scope.newProducto = function() {
        alertify.warning('Creando nuevo Producto');
        $scope.frmProducto = "mostrar";
        $scope.desabilitado = "";
        $scope.nuevo = true;
        $scope.update = false;
        $rootScope.update = false;
        $scope.datosProd = {};
        document.getElementById("txt_f01_upload1").value = '';
        document.getElementById("txt_f01_upload2").value = '';
        document.getElementById("txt_f01_upload3").value = '';

        document.getElementById("f01_upload1").value = '';
        document.getElementById("f01_upload2").value = '';
        document.getElementById("f01_upload3").value = '';


        $scope.txt_f01_upload1 = '';
        $scope.txt_f01_upload2 = '';
        $scope.txt_f01_upload3 = '';

        $scope.f01_upload1 = '';
        $scope.f01_upload2 = '';
        $scope.f01_upload3 = '';
        $rootScope.swArchivo = "A";
        $scope.imagenprincipal = "";
        $scope.imagenaux1 = "";
        $scope.imagenaux2 = "";
        $rootScope.archivosProducto = new Array();
        $scope.imagenprincipalm = false;
        $scope.imagenaux1m = false;
        $scope.imagenaux2m = false;

    }

    $scope.registrarProducto = function(data) {
        var f0 = "";
        var f1 = "";
        var f2 = "";

        $scope.mostrarTxt = false;
        a = 0;
        angular.forEach($rootScope.archivosProducto, function(archivo, key) {
            archivoP = JSON.parse(archivo);
            if (a == 0)
                f0 = archivoP.url;
            if (a == 1)
                f1 = archivoP.url;
            if (a == 2)
                f2 = archivoP.url;
            a = a + 1;
        });

        if (data.f01_oferta_producto == true) {
            $scope.datosProd.f01_producto_oferta = "CON OFERTA";
        } else {
            $scope.datosProd.f01_producto_oferta = "SIN OFERTA";
        }

        if (f0 != "" && f0 != null &&
            data.f01_producto != "" && data.f01_producto != null &&
            data.f01_descripcion != "" && data.f01_descripcion != null &&
            data.f01_precio != "" && data.f01_precio != null) {
            var descripcionsrt = document.getElementById('f01_descripcion').value.replace(/↵/g, "<br />");
            var datosProducto = new dataProducto();
            datosProducto.idtv = sessionService.get("IDTV");
            datosProducto.nombre = data.f01_producto;
            datosProducto.descripcion = descripcionsrt;
            datosProducto.precio = parseFloat(data.f01_precio).toFixed(2);
            datosProducto.imagen_p = f0;
            datosProducto.imagen_a1 = f1;
            datosProducto.imagen_a2 = f2;
            datosProducto.oid_ciu = sessionService.get('IDCIUDADANO');
            datosProducto.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
            datosProducto.prd_ofertac = $scope.datosProd.f01_producto_oferta;
            datosProducto.prd_descripcion_ofertac = data.f01_descripcion_oferta;
            datosProducto.prd_oferta_defechac = data.f01_de_fecha;
            datosProducto.prd_oferta_hastafechac = data.f01_hasta_fecha;
            datosProducto.crearProducto(function(response) {
                results = JSON.parse(response);
                results = results.success;
                if (results.length > 0) {
                    $.unblockUI();
                    $scope.refrescar();
                    swal('', "Producto Registrado", 'success');
                    $scope.limpiar();
                    $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
                    $scope.nuevo = false;
                } else {
                    $.unblockUI();
                    swal('', "Producto no registrado", 'error');
                }
            });

        } else {
            swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
        }
    }

    $scope.getProductos = function(usuario, id_ae) {
        $.blockUI();
        try {
            var datosProducto = new dataProducto();
            /*datosProducto.oid = usuario;*/
            datosProducto.idtv = id_ae;
            datosProducto.listarProductoTV(function(response) {
                resultado = JSON.parse(response);
                var resultadoProd = resultado.success;
                $scope.listadoProductos = resultadoProd;
                var data = resultadoProd;

                if ($scope.listadoProductos == '[]' || $scope.listadoProductos == '[{}]' || $scope.listadoProductos == '[{ }]' || $scope.listadoProductos == ' ' || $scope.listadoProductos == '') {
                    if ($scope.swP == false) {
                        $scope.swP = true;
                        alertify.warning('No existen datos');
                    }
                    $rootScope.$apply();
                } else {
                    $rootScope.$apply();
                }
                $scope.tblDocumentos.reload();
            });
        } catch (error) {
            console.log(error);
        }

        $.unblockUI();
    };

    $scope.tblDocumentos = new ngTableParams({
        page: 1,
        count: 10,
        filter: {},
        sorting: {
            vdoc_idd: 'desc'
        }
    }, {
        total: $scope.listadoProductos.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.listadoProductos, params.filter()) :
                $scope.listadoProductos;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.listadoProductos;
            params.total($scope.listadoProductos.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.refrescar = function() {
        $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
    };

    $scope.eliminarProducto = function(datos) {
        swal({
                title: "Estimado(a) Ciudadano(a)",
                text: "Está seguro(a) de eliminar el producto seleccionado?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    $scope.delProducto(datos);
                    swal("Estimado(a) Ciudadano(a)", "El producto fue eliminado correctamente", "success");
                } else {
                    swal("Estimado(a) Ciudadano(a)", "Se canceló la eliminación del Producto)", "error");
                }
            });
        $scope.btnEnvio = true;
    }

    $scope.nuevaAsigSglUsr = function() {
        //$scope.limpiar();
        $scope.titulo = "Registrar Productos";
        $scope.update = false;
        $scope.nuevo = true;
    }

    $scope.limpiar = function() {
        $scope.datosProd = [''];
        document.getElementById("txt_f01_upload1").value = '';
        document.getElementById("txt_f01_upload2").value = '';
        document.getElementById("txt_f01_upload3").value = '';
        $scope.frmProducto = null;

    }

    $scope.delProducto = function(datos) {
        var datosDelProducto = new dataProducto();
        datosDelProducto.prd_idc = datos.prd_idc;
        datosDelProducto.eliminaMisProductos(function(response) {
            resultado = JSON.parse(response);
            //$scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
            $scope.refrescar();
        });
    }

    $scope.modificarProducto = function(datosP) {
        $scope.frmProducto = "mostrar";
        $scope.desabilitado = "";
        $scope.update = true;
        $scope.nuevo = false;
        $rootScope.idProducto = datosP.prd_idc;
        //document.getElementById("f01_producto").value = datosP.prd_productoc;
        //document.getElementById("f01_descripcion").value = datosP.prd_descripcionc;
        //document.getElementById("f01_precio").value = datosP.prd_precioc;
        //$scope.datosProd = datosP;
        $scope.datosProd.prd_idc = datosP.prd_idc;
        $scope.datosProd.f01_producto = datosP.prd_productoc;
        $scope.datosProd.f01_descripcion = datosP.prd_descripcionc;
        $scope.datosProd.f01_precio = datosP.prd_precioc;


        //document.getElementById("f01_cantidad").value = datosP.prd_cantidadc;
        archivo1 = datosP.prd_imagen_pc.split('/');
        archi1 = archivo1[9].split('?');
        $rootScope._f01_upload1 = archi1[0];
        $scope.datosProd.txt_f01_upload1 = $rootScope._f01_upload1;
        if (datosP.prd_imagen_a1c != "" && datosP.prd_imagen_a1c != null && datosP.prd_imagen_a1c != undefined && datosP.prd_imagen_a1c != 'undefined') {
            archivo2 = datosP.prd_imagen_a1c.split('/');
            archi2 = archivo2[9].split('?');
            $rootScope._f01_upload2 = archi2[0];
            $scope.datosProd.txt_f01_upload2 = $rootScope._f01_upload2;
        } else {
            $scope.datosProd.txt_f01_upload2 = "";
        }
        if (datosP.prd_imagen_a2c != "" && datosP.prd_imagen_a2c != null && datosP.prd_imagen_a2c != undefined && datosP.prd_imagen_a2c != 'undefined') {
            archivo3 = datosP.prd_imagen_a2c.split('/');
            archi3 = archivo3[9].split('?');
            $rootScope._f01_upload3 = archi3[0];
            $scope.datosProd.txt_f01_upload3 = $rootScope._f01_upload3;
        } else {
            $scope.datosProd.txt_f01_upload3 = "";
        }


        $rootScope.swArchivo = "M";
        $scope.file1 = datosP.prd_imagen_pc;
        $scope.file2 = datosP.prd_imagen_a1c;
        $scope.file3 = datosP.prd_imagen_a2c;
        $scope.imagenprincipal = datosP.prd_imagen_pc;
        $scope.imagenaux1 = datosP.prd_imagen_a1c;
        $scope.imagenaux2 = datosP.prd_imagen_a2c;
        $rootScope.archivosProducto = new Array();
        $scope.imagenprincipalm = true;
        if (datosP.prd_imagen_a1c) {
            $scope.imagenaux1m = true;
        }
        if ($scope.imagenaux2) {
            $scope.imagenaux2m = true;
        }

        if (datosP.prd_ofertac == "CON OFERTA") {
            $scope.datosProd.f01_oferta_producto = true;
            $scope.datosProd.f01_descripcion_oferta = datosP.prd_descripcion_ofertac;
            $scope.datosProd.f01_de_fecha = datosP.prd_oferta_defechac;
            $scope.datosProd.f01_hasta_fecha = datosP.prd_oferta_hastafechac;

        } else {
            $scope.datosProd.f01_oferta_producto = false;
        }
    }

    $scope.actualizarProducto = function(data) {
        var img1 = $scope.file1;
        var img2 = $scope.file2;
        var img3 = $scope.file3;
        for (i = 0; i < $rootScope.archivosProducto.length; i++) {
            var imagenesRecorrido = JSON.parse($rootScope.archivosProducto[i]);
            if (imagenesRecorrido.nombre == "img_principal") {
                img1 = imagenesRecorrido.url;
            }
            if (imagenesRecorrido.nombre == "img_auxiliar1") {
                img2 = imagenesRecorrido.url;
            }

            if (imagenesRecorrido.nombre == "img_auxiliar2") {
                img3 = imagenesRecorrido.url;
            }
        }

        if (data.f01_oferta_producto == true) {
            $scope.datosProd.f01_producto_oferta = "CON OFERTA";
        } else {
            $scope.datosProd.f01_producto_oferta = "SIN OFERTA";
        }
        var datosModProducto = new dataProductoMod();
        datosModProducto.prd_idc = data.prd_idc;
        datosModProducto.prd_tv_idc = sessionService.get("IDTV");
        datosModProducto.prd_nombrec = data.f01_producto;
        datosModProducto.prd_descripcionc = data.f01_descripcion;
        datosModProducto.prd_precioc = parseFloat(data.f01_precio).toFixed(2);
        datosModProducto.prd_imagen_pc = img1;
        datosModProducto.prd_imagen_a1c = img2;
        datosModProducto.prd_imagen_a2c = img3;
        datosModProducto.prd_usrc = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosModProducto.prd_ofertac = $scope.datosProd.f01_producto_oferta;
        datosModProducto.prd_descripcion_ofertac = data.f01_descripcion_oferta;
        datosModProducto.prd_oferta_defechac = data.f01_de_fecha;
        datosModProducto.prd_oferta_hastafechac = data.f01_hasta_fecha;
        datosModProducto.modificarProductoAe(function(response) {
            results = JSON.parse(response);
            results = results.success;
            if (results.length > 0) {
                $.unblockUI();
                $scope.refrescar();
                swal('', "Producto Modificado", 'success');
                $scope.update = false;
            } else {
                $.unblockUI();
                swal('', "Producto no Modificado", 'error');
            }
            $scope.limpiar();
        });
    }


    $scope.obtenerContribuyente = function() {
        var tipoContribuyente = sessionService.get('TIPO_PERSONA');
        if (tipoContribuyente == 'NATURAL') {
            ciDocumento = sessionService.get('CICIUDADANO');
            sAccion = 'C01';
            nitDocumento = '';
        } else if (tipoContribuyente == 'JURIDICO') {
            nitDocumento = sessionService.get('NITCIUDADANO');
            sAccion = 'C02';
            ciDocumento = '';
        }
        var conGenesis = new gLstDatos();
        conGenesis.idContribuyente = "";
        conGenesis.clase = "";
        conGenesis.padron = "";
        conGenesis.identificacion = ciDocumento; //'40852017'
        conGenesis.primerNombre = "";
        conGenesis.primerApellido = "";
        conGenesis.segundoApellido = "";
        conGenesis.nit = nitDocumento;
        conGenesis.empresa = "";
        conGenesis.p_accion = sAccion;
        conGenesis.lstDatosContribuyente(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response = resultadoApi;
                $scope.txtMsgConexionGen = "";
                if (response.success.dataSql.length > 0) {
                    $scope.dataGenesisCidadano = response.success.dataSql;
                } else {

                    $scope.dataGenesisCidadano = '';
                }
            } else {
                $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
                //swal(resultadoApi.error.message);
            }
        });
    };

    $scope.listadoActividadesEconomicas = function() {
        $scope.datosProd.rdTipoTramite = "RENOVACION";
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
        var contribuyente = new gLstActividadEconomica();
        contribuyente.idContribuyente = idContribuyente;
        contribuyente.tipo = 'N'; //N para natural y J para Juridico
        contribuyente.lstActividadEconomica(function(resultado) {
            $.unblockUI();
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                //listado de Actividades Economicas
                var response = resultadoApi;
                if (response.success.dataSql.length > 0) {
                    $scope.trmUsuario = response.success.dataSql;
                }
            } else {
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });
    };

    $scope.cambioEstadoProducto = function(data) {
        if (data.prd_estadoc == 'A') {
            var datosDesProducto = new dataProductoAc();
            datosDesProducto.prd_idc = data.prd_idc;
            datosDesProducto.desactivarProductoAe(function(response) {
                resultado = JSON.parse(response);
            });
        } else {
            var datosActProducto = new dataProductoAc();
            datosActProducto.prd_idc = data.prd_idc;
            datosActProducto.activarProductoAe(function(response) {
                resultado = JSON.parse(response);
            });
        }
    }


    $scope.cargarDatos = function(ae, s) {
        $scope.sucursal = parseInt(s);
        $scope.aeAct = parseInt(ae.prod_aec);
        document.getElementById("f01_ae").value = $scope.aeAct;
        document.getElementById("f01_sucursal").value = $scope.sucursal;


    }
    $scope.muestraDatos = function(ae, s) {
        $scope.mostrarTxt = false;
        var aeS = JSON.stringify(ae);
        var aeS1 = JSON.parse(aeS);
        for (i = 0; i <= aeS1.length - 1; i++) {
            if (s == aeS1[i].IdActividad) {
                var suc = aeS1[i].Nro;
                var aeUp = aeS1[i].IdActividad;
                $scope.sucursal = parseInt(suc);
                $scope.aeAct = parseInt(aeUp);
                document.getElementById("f01_ae").value = $scope.aeAct;
                document.getElementById("f01_sucursal").value = $scope.sucursal;

            }
        }
    }

    $scope.activaOferta = function(dato) {
            $scope.Ofertaproducto = dato;
            if (dato == true) {
                $scope.datosProd.f01_producto_oferta = "CON OFERTA";
            } else {
                $scope.datosProd.f01_producto_oferta = "SIN OFERTA";
            }
        }
        ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    } catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};