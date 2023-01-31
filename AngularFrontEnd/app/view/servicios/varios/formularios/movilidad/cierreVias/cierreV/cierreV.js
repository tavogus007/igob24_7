function cierreVController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {

    var sIdCiudadano= sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.ocultaTipo = false;
    $scope.desabilitado = false;
    $scope.aMacrodistritos = {};
    $scope.div_otros = false;
    $scope.div_ruta = false;
    $scope.div_nom_conductor = false;
    $scope.aListadoOperadorTaxi = {};
    // 1  1  1 
    $scope.requi_nota = 'NOTA DIRIGIDA AL LIC. ENRIQUE GUSTAVO VILLANUEVA GUTIÉRREZ SECRETARIO MUNICIPAL DE LA MOVILIDAD Y SEGURIDAD CIUDADANA ADJUNTANDO LA JUSTIFICACIÓN NECESARIA';
    //bb 2
    $scope.contrato = 'CONTRATO PARA LA EJECUCIÓN DE OBRAS CIVILES CUANDO CORRESPONDA (ORIGINAL Y FOTOCOPIA)';
    //cc 3
    $scope.cro_ubi = 'CROQUIS DE UBICACIÓN DE LA VÍA DONDE SOLICITA EL PERMISO EXCEPCIONAL';
    //dd 4 
    $scope.permiso_contr = 'PERMISO DE CONSTRUCCIÓN (ORIGINAL Y FOTOCOPIA)';
    //ee 5 
    $scope.autorizacion = 'AUTORIZACIÓN PARA MOVIMIENTO DE TIERRA. CUANDO CORRESPONDA';
    //ff 6 
    $scope.plano_aprob = 'PLANOS APROBADOS POR EL G.A.M.L.P.. CUANDO CORRESPONDA';
    //gg    2 
    $scope.licencia = 'LICENCIA DE FUNCIONAMIENTO VIGENTE DE LA ACTIVIDAD ECONÓMICA, CUANDO CORRESPONDA. (ORIGINAL Y FOTOCOPIA)';
    //hh    3 
    $scope.conformidad = 'CONFORMIDAD DE LA SECRETARIA MUNICIPAL DE CULTURAS, DE LA RESPECTIVA SUBALCALDIA O DE LA DIRECCIÓN DE DEPORTES, SEGÚN CORRESPONDA';
    //kk    4  2
    $scope.croquis = 'CROQUIS CON EL DETALLE DE VIAS Y RECORRIDO PROPUESTO PARA LA ACTIVIDAD';
    // 7  5  3
    $scope.manejo_trafico = 'PLAN DE MANEJO DE TRAFICO, PARA EL CASO DE CIERRE DE VIAS PRIMARIAS Y DE VÍAS SECUNDARIAS O TERCIARIAS POR DONDE CIRCULEN RUTAS DEL SERVICIO PUBLICO DE TRANSPORTE COLECTIVO DE PASAJEROS';
    $scope.tituloPrincipal = 'OTRAS: MANIFESTACIONES FOLCLÓRICAS POPULARES QUE NO ESTÉN PREVISTAS EN EL CALENDARIO FESTIVO, FOLCLÓRICO Y RITUAL DE LA SECRETARIA MUNICIPAL DE CULTURAS, NO PODRAN RECABAR EL PERMISO EXCEPCIONAL.';
    
    $scope.inicio = function(){
    }
  
    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
      console.log("JSON.parse(data)");
      console.log(data);
      console.log(data.vdvser_id);
      if(data.vdvser_id == 85){ $scope.aaa = true;}else{  $scope.aaa = false;}
      if(data.vdvser_id == 86){ $scope.bbb = true;}else{  $scope.bbb = false;}
      if(data.vdvser_id == 87){ $scope.ccc = true;}else{  $scope.ccc = false;}
      $scope.open_map_reg_ope();
      $scope.serviciomov = data.vservicio;
      $scope.datos = JSON.parse(data.form_contenido);
      //$scope.dinamicoTipoVehiculo($scope.datos.INF_TIPO_VEHICULO);
      $scope.enviado = sessionService.get('ESTADO');
      //$scope.macrodistritos();
      //$scope.operadorRadiotaxis();
      //$scope.listaZona($scope.datos.INF_ORT_MACRO);
      //$scope.dinamicoTipoServicio($scope.datos.INF_TIPO_SERVICIO);
      if($scope.enviado == 'SI'){
        $scope.desabilitado = true;
      }else{
        $scope.desabilitado = false;
      }
      document.getElementById('gu').disabled=true;
      $scope.$apply();
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);  
    });
    

    $scope.ejecutarFile = function (idfile) {
      console.log("ejecutarFile");
      console.log(idfile);
      setTimeout(function () {
          var sid = document.getElementById(idfile);
          if (sid) {
              document.getElementById(idfile).click();
          } else {
              alert("Error ");
          }
      }, 1000);
    };

    $scope.cambiarFile = function (obj, valor) {
      var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm","png","jpg","jpeg"];
      $scope.registroAdj = [];
      var fechaNueva = "";
      var fechaserver = new fechaHoraServer();
      fechaserver.fechahora(function (resp) {
          var sfecha = JSON.parse(resp);
          var fechaServ = (sfecha.success.fecha).split(' ');
          var fecha_ = fechaServ[0].split('-');
          var hora_ = fechaServ[1].split(':');
          fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
      });
      $.blockUI();
      setTimeout(function () {
        var nombre = obj.getAttribute("name");
        var objarchivo = obj.files[0];
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var sDirTramite = sessionService.get('IDTRAMITE');
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
        console.log("nombre");
        console.log(nombre);
        console.log(obj.files[0]);
        
        
        if (nombre == 'FILE_requi_nota' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_requi_nota = nombreNuevo;
                    $scope.FILE_requi_nota = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover1 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_requi_nota = nombreNuevo;
                        $scope.FILE_requi_nota = blobcir;
                        $scope.btover1 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_requi_nota = "";
                    $scope.FILE_requi_nota = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_contrato' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_contrato = nombreNuevo;
                    $scope.FILE_contrato = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover2 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_contrato = nombreNuevo;
                        $scope.FILE_contrato = blobcir;
                        $scope.btover2 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_contrato = "";
                    $scope.FILE_contrato = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_cro_ubi' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_cro_ubi = nombreNuevo;
                    $scope.FILE_cro_ubi = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover3 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_cro_ubi = nombreNuevo;
                        $scope.FILE_cro_ubi = blobcir;
                        $scope.btover3 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_cro_ubi = "";
                    $scope.FILE_cro_ubi = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_permiso_contr' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_permiso_contr = nombreNuevo;
                    $scope.FILE_permiso_contr = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover4 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_permiso_contr = nombreNuevo;
                        $scope.FILE_permiso_contr = blobcir;
                        $scope.btover4 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_permiso_contr = "";
                    $scope.FILE_permiso_contr = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_autorizacion' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_autorizacion = nombreNuevo;
                    $scope.FILE_autorizacion = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover5 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_autorizacion = nombreNuevo;
                        $scope.FILE_autorizacion = blobcir;
                        $scope.btover5 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_autorizacion = "";
                    $scope.FILE_autorizacion = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_plano_aprob' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_plano_aprob = nombreNuevo;
                    $scope.FILE_plano_aprob = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover6 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_plano_aprob = nombreNuevo;
                        $scope.FILE_plano_aprob = blobcir;
                        $scope.btover6 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_plano_aprob = "";
                    $scope.FILE_plano_aprob = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_licencia' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_licencia = nombreNuevo;
                    $scope.FILE_licencia = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover7 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_licencia = nombreNuevo;
                        $scope.FILE_licencia = blobcir;
                        $scope.btover7 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_licencia = "";
                    $scope.FILE_licencia = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_conformidad' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_conformidad = nombreNuevo;
                    $scope.FILE_conformidad = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover8 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_conformidad = nombreNuevo;
                        $scope.FILE_conformidad = blobcir;
                        $scope.btover8 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_conformidad = "";
                    $scope.FILE_conformidad = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_croquis' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_croquis = nombreNuevo;
                    $scope.FILE_croquis = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover9 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_croquis = nombreNuevo;
                        $scope.FILE_croquis = blobcir;
                        $scope.btover9 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_croquis = "";
                    $scope.FILE_croquis = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
        
        if (nombre == 'FILE_manejo_trafico' && (typeof (obj.files[0]) != 'undefined')) {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (arraydoc.indexOf(ext_doc) >= 0) {
                if (objarchivo.size <= 1000000) {
                    var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                    console.log(objarchivo);
                    console.log(uploadUrl);
                    console.log(nombreNuevo);
                    fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                    $scope.datos.FILE_manejo_trafico = nombreNuevo;
                    $scope.FILE_manejo_trafico = objarchivo;
                    document.getElementById("txt_" + nombre).value = nombreNuevo;
                    document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.btover0 = "mostrar";
                } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                    var zipcir = new JSZip();
                    zipcir.file(nomdocumento, objarchivo);
                    zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                        var nombreNuevo = nombre + fechaNueva + '.zip';
                        fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_manejo_trafico = nombreNuevo;
                        $scope.FILE_manejo_trafico = blobcir;
                        $scope.btover0 = "mostrar";
                    });
                    $.unblockUI();
                } else {
                    swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_manejo_trafico = "";
                    $scope.FILE_manejo_trafico = "";
                    $.unblockUI();
                }

            } else {
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }
        }
  
      }, 1000);
      $.unblockUI();
    }

    // caargado de mapa 
    var datos;
    var vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({source: vectorSource});
    $scope.open_map_reg_ope = function(latitud, longitud){
        console.log("Entrando open_map_ae");
        console.log('latitud    ',latitud,'    longitud    ',longitud);
        setTimeout(function()
        {
            
            var iconStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color: 'red'})
                })
            });
            var raster = new ol.layer.Tile({
              source: new ol.source.OSM()
            });
            
            var vector = new ol.layer.Vector({
              source: vectorSource, //ol.source.Vector(),
              style: new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                  color: '#FF8000',
                  width: 5
                }),
                image: new ol.style.Circle({
                  radius: 7,
                  //fill: new ol.style.Fill({color: '#ffcc33'})
                  fill: new ol.style.Fill({color: 'red'})
                })
              })
            });

            $("#mapActividad1").empty();
                //////////////////////////////////////////////////////////////////
            var epsg32719 = 'EPSG:32719';
            var epsg4326 = 'EPSG:4326';
            proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
            proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
            ////////////////////////////////////////////////////////////////////////
            $scope.mapa = new ol.Map({
                layers: [/*
                        new ol.layer.Group({
                            title: 'Mapas Base',
                            layers: [
                                osm,
                                municipios,
                                zonas_tributarias,
                                zonas,
                                vias,
                                vectorLayer
                            ]
                        }), */
                        raster,vector
                        ],
                //overlays: [featureOverlay],
                target: 'mapActividad1',
                //controls: controls,
                interactions: interactions,
                view: view
            });

            var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
            $scope.mapa.addControl(layerSwitcher);
            ////////////////////////////////////////////////////////////////////////
            vectorLayer.getSource().clear();
            /*
            if(isNaN(latitud) && isNaN(longitud)){
                console.log("no existe Lat y Lon o son undefined");
            }else{
                if(latitud === '' || longitud === ''){
                    console.log("lat y lon son cadena vacia");
                    mapa.getView().setCenter(ol.proj.fromLonLat([-68.133605,-16.495745]));
                    mapa.getView().setZoom(16);
                }else{
                    console.log("existe lat y lon");
                    latitud = parseFloat(latitud);
                    longitud = parseFloat(longitud);
                    var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                    feature.setStyle(iconStyle);
                    vectorSource.addFeature(feature);
                    $scope.mapa.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                    $scope.mapa.getView().setZoom(15);
                }  
            }
            */
            ////////////////////////////////////////////////////////////////////////
            //var n_genesis = geo_id_genesis.length;
            //console.log("n_id_gene...",n_genesis);
            //console.log("n_id_sit...",geo_id_sit.length);
            //console.log("n_id_serv...",geo_id_sit_servicio.length);

            var Modify = {
              init: function() {
                this.select = new ol.interaction.Select();
                $scope.mapa.addInteraction(this.select);
                this.modify = new ol.interaction.Modify({
                  features: this.select.getFeatures()
                });
                $scope.mapa.addInteraction(this.modify);
                this.setEvents();
              },
              setEvents: function() {
                var selectedFeatures = this.select.getFeatures();
                this.select.on('change:active', function() {
                  selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
                });
              },
              setActive: function(active) {
                this.select.setActive(active);
                this.modify.setActive(active);
              }
            };
            Modify.init();
            
            var optionsForm = document.getElementById('optionsformmap');

            var poligono =  new ol.interaction.Draw({
              source: vector.getSource(),
              type: /** @type {ol.geom.GeometryType} */ ('Polygon')
            });
            poligono.on('drawstart', (evt) => {
              vector.getSource().clear();
            });
            poligono.on('drawend', function(evt) {
              const latilong = [];
              var features =evt.feature.getGeometry().getCoordinates()[0];
              for (let index = 0; index < features.length; index++) {
                const element = features[index];
                var centro_1 = ol.proj.transform(element, 'EPSG:3857', epsg4326);
                latilong.push([centro_1[1],centro_1[0]]);
              }
              console.log("latilong poligono");
              console.log(latilong);
            });
            
            var linea = new ol.interaction.Draw({
              source: vector.getSource(),
              type: /** @type {ol.geom.GeometryType} */ ('LineString')
            });
            linea.on('drawstart', (evt) => {
              vector.getSource().clear();
            });
            linea.on('drawend', function(evt) {
              const latilong = [];
              var features =evt.feature.getGeometry().getCoordinates();
              for (let index = 0; index < features.length; index++) {
                const element = features[index];
                var centro_1 = ol.proj.transform(element, 'EPSG:3857', epsg4326);
                latilong.push([centro_1[1],centro_1[0]]);
              }
              console.log("latilong linea");
              console.log(latilong);
            });
            var punto = new ol.interaction.Draw({
              source: vector.getSource(),
              type: /** @type {ol.geom.GeometryType} */ ('Point')
            });
            punto.on('drawstart', (evt) => {
              vector.getSource().clear();
            });
            punto.on('drawend', function(evt) {
              const latilong = [];
              var centro_1 = ol.proj.transform([evt.feature.getGeometry().getCoordinates()[0],evt.feature.getGeometry().getCoordinates()[1]], 'EPSG:3857', epsg4326);
              latilong.push([centro_1[1],centro_1[0]]);
              console.log("latilong punto");
              console.log(latilong);
            });
            
            var Draw = {
              init: function() {
                $scope.mapa.addInteraction(this.Point);
                this.Point.setActive(false);
                $scope.mapa.addInteraction(this.LineString);
                this.LineString.setActive(false);
                $scope.mapa.addInteraction(this.Polygon);
                this.Polygon.setActive(false);
              },
              Point: punto,
              LineString: linea,
              Polygon: poligono,
              getActive: function() {
                return this.activeType ? this[this.activeType].getActive() : false;
              },
              setActive: function(active) {
                var type = document.getElementById('draw-type').value;
                if (active) {
                  this.activeType && this[this.activeType].setActive(false);
                  this[type].setActive(true);
                  this.activeType = type;
                } else {
                  this.activeType && this[this.activeType].setActive(false);
                  this.activeType = null;
                }
              }
            };
            Draw.init();
            
            optionsForm.onchange = function(e) {
              var type = e.target.getAttribute('name');
              var value = e.target.value;
              if (type == 'draw-type') {
                Draw.getActive() && Draw.setActive(true);
                vector.getSource().clear();
              } else{ 
                if (type == 'interaction') {
                  if (value == 'modify') {
                    Draw.setActive(false);
                    Modify.setActive(true);
                  } else if (value == 'draw') {
                    Draw.setActive(true);
                    Modify.setActive(false);
                  }
                }
              }
            };
            
            Draw.setActive(true);
            Modify.setActive(false);
            var snap = new ol.interaction.Snap({
              source: vector.getSource()
            });
            $scope.mapa.addInteraction(snap);
            // limpiar el mapa
            document.getElementById('undo').addEventListener('click', function () {
              vector.getSource().clear();
            });
            /*$scope.mapa.on('click', function (evt){
              console.log("evt");
              console.log(evt);
              console.log("evt.pixel");
              console.log(evt.pixel);
              var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
              var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
              var wkt = '';
              var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
              var latitud = centro_1[1];
              var longitud = centro_1[0];
              wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
              $scope.datos.latitud = latitud;
              $scope.datos.longitud = longitud;
              console.log("Latitud...",latitud);
              console.log("Longitud...",longitud);
            });
            */
            /*
            $scope.mapa.on('click', function (evt)
            {
              vectorSource.clear();
              var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
              var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
              var wkt = '';
              var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
              var latitud = centro_1[1];
              var longitud = centro_1[0];
              wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
              $scope.datos.latitud = latitud;
              $scope.datos.longitud = longitud;
              console.log("Latitud...",latitud);
              console.log("Longitud...",longitud);
              
              /////////////////////////////////////////////////////////////////////
              var feature = $scope.mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                  return feature;
              });
              if (feature){
                  var coord = feature.getGeometry().getCoordinates();
                  var props = feature.getProperties();
              }else{
                  //alert();
                  var url_zonas_tributarias = zonas_tributarias.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'grupovalor'
                      }
                  );
                  var url_zonas = zonas.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'zonaref,macrodistrito,subalcaldia,codigozona,macro,distrito'
                      }
                  );
                  var url_vias = vias.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'nombrevia,tipovia'
                      }
                  );
                  reqwest({
                      url: url_zonas_tributarias,
                      type: 'json',
                  }).then(function(data){
                      var feature = data.features[0];
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                      $scope.datos.codigo_zona_tributaria = codigo_zona_tributaria;
                      console.log("codigo zona tributaria: ",codigo_zona_tributaria);
                      $scope.datos.f01_idCodigoZona = codigo_zona_tributaria;
                      ///////////////////////////////////////////////////////////
                  });
                  reqwest({
                      url: url_zonas,
                      type: 'json',
                  }).then(function(data){
                      var feature = data.features[0];
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      console.log('miooo',cod);
                      var zona = cod.zonaref;
                      var macrodistrito = cod.macrodistrito;
                      var idMacrodistrito = cod.macro;
                      var cod_zona= cod.codigozona;
                      var distrito= cod.distrito;
                      $scope.datos.RO_MAC_OF = idMacrodistrito;
                      $scope.distritoZonas(idMacrodistrito);
                      $scope.datos.RO_ZONA_OF_VALUE = zona;
                      $scope.$apply();
                      console.log('idMacrodistrito',idMacrodistrito)
                      console.log("cod zona serv sit: ",cod_zona);
                      /////////////////////////////////////////////
                      //console.log("hhhhh",n_genesis);
                      for (var i=0;i<n_genesis;i++) {
                          if(geo_id_sit_servicio[i ]=== cod_zona) {
                              cod_zona_genesis = geo_id_genesis[i];
                              console.log("cod zona genesis: ",cod_zona_genesis);
                          }
                      }
                      /////////////////////////////////////////////
                      console.log("zona: ",zona);
                      console.log("macrodistrito: ",macrodistrito);
                      console.log("distrito: ",distrito);
                  });
                  reqwest({
                      url: url_vias,
                      type: 'json',
                  }).then(function(data){
                      var feature = data.features[0];
                      if(feature=== undefined){
                        console.log("No se encontro datos para via...");
                        $scope.datos.RO_NOM_VIA_SUC  = '';
                        $scope.datos.RO_TIPO_VIA_SUC = '';
                      }else{
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      var nombre_via = cod.nombrevia;
                      var tipo_via = cod.tipovia;
                      switch (tipo_via) {
                          case 'AVENIDA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'AV';
                          break;
                          case 'CALLE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CA';
                          break;
                          case 'CALLEJON':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CL';
                          break;
                          case 'PLAZA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PL';
                          break;
                          case 'CANCHA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CN';
                          break;
                          case 'PARQUE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PR';
                          break;
                          case 'PASAJE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PA';
                          break;
                          case 'NO DEFINIDO':
                              $scope.datos.RO_TIPO_VIA_SUC = 'ND';
                          break;
                      }
                      $scope.datos.RO_NOM_VIA_SUC  = nombre_via;
                      console.log("nombre via: ",nombre_via);
                      console.log("tipo via: ",tipo_via);
                      ///////////////////////////////////////////////////////////
                      }
                      $scope.$apply();
                  });
              }
              /////////////////////////////////////////////////////////////////////
              var feature = new ol.Feature(
              new ol.geom.Point(ol.proj.fromLonLat(centro_1))
              );
              feature.setStyle(iconStyle);
              vectorSource.addFeature(feature);
            });
            */
        },500);
    };
    $scope.addInteractiondata = function () {
      var value = typeSelect.value;
      if (value !== 'None') {
          var geometryFunction, maxPoints;
          if (value === 'Square') {
          value = 'Circle';
          geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
          } else if (value === 'Box') {
              value = 'LineString';
              maxPoints = 2;
              geometryFunction = function(coordinates, geometry) {
                  if (!geometry) {
                      geometry = new ol.geom.Polygon(null);
                  }
                  var start = coordinates[0];
                  var end = coordinates[1];
                  geometry.setCoordinates([
                      [start, [start[0], end[1]], end, [end[0], start[1]], start]
                  ]);
                  return geometry;
              };
          }
          draw = new ol.interaction.Draw({
              source: source,
              type: /** @type {ol.geom.GeometryType} */ (value),
              geometryFunction: geometryFunction,
              maxPoints: maxPoints
          });
          $scope.mapa.addInteraction(draw);
      }
  }
    
    var controls =  new ol.control.defaults({
        attributionOptions: ({collapsible: false})
      }).extend([
        //new ol.control.ZoomSlider(),
        //new ol.control.Rotate(),
        //new ol.control.OverviewMap(),
        //new ol.control.FullScreen(),
        //new ol.control.ScaleLine(),
        new ol.control.MousePosition({
                                      //coordinateFormat: ol.coordinate.toStringHDMS,
                                      coordinateFormat: ol.coordinate.createStringXY(6),
                                      //projection: 'EPSG:3857'
                                      projection: 'EPSG:4326'
                                      // projection: projection19
                                      
                                    })
      ]);
    var interactions =  new ol.interaction.defaults().extend([
          new ol.interaction.Select({condition: ol.events.condition.mouseMove})
    ]);
    
    $scope.distritoZonas = function(idMacroJ){ 
      var idMacro = "";
      if(idMacroJ != 'OTRO'){
        $scope.mostrarOtraZona = false;
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
      }
      else{
        $scope.mostrarOtraZona = true;
      }
    };
    // ****************************************************************************
    //////////////////////////GUARDA TRAMITE//////////////////////
    $scope.guardar_tramite = function(datos){ 
      for(var i = 0 ; i < $scope.aDistritoZona.length ; i++){
        if(datos.INF_O_RT_ZONA == $scope.aDistritoZona[i].dist_nombre){
          $scope.datos.INF_ORT_ID_MACRO = $scope.aDistritoZona[i].dist_macro_id;
          $scope.datos.INF_O_RT_ZONA_ID = $scope.aDistritoZona[i].dist_id;
        }
      }
      if($scope.datos.INF_TIPO_SERVICIO == 'Servicio de Radio Taxi'){
        for(var i = 0 ; i < $scope.aListadoOperadorTaxi.length ; i++){
          if(datos.INF_O_RT_NOMBRE_O_RT == $scope.aListadoOperadorTaxi[i].ope_denominacion){
            $scope.datos.INF_O_RT_NOMBRE_O_RT_ID = $scope.aListadoOperadorTaxi[i].ope_id;
            $scope.datos.INF_O_RT_NOMBRE_O_RT_CIU_RESPONSABLE = $scope.aListadoOperadorTaxi[i].repr_uidciudadano;
          }
        }
      }
      datos.Tipo_tramite_creado = "WEB";
      try {
        var datosSerializados   =  JSON.stringify(datos);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var crear = new datosFormularios();
        crear.frm_tra_dvser_id = sessionService.get('IDSERVICIO');
        crear.data_json = datosSerializados;
        crear.frm_tra_id_ciudadano = sIdCiudadano;
        crear.frm_tra_id_usuario = 1;
        crear.frm_idTramite = idTramite;
        $.blockUI();
        crear.sp_crear_datos_formulario(function(results){
          results = JSON.parse(results);
          results = results.success;
          if(results.length > 0){
            //$scope.tramitesCiudadano();
            alertify.success("Formulario almacenado");
            document.getElementById('gu').disabled=false;     
            $.unblockUI();
          }else{
            $.unblockUI();
            sweet.show('', "Formulario no almacenado", 'error');
          }
        });
      }catch(e){
        console.log("Error..",e);
        $.unblockUI();
      }
    }
    ///////////////////////// VALIDADOR PREVIO A GUARDAR ///////////////////
    $scope.validarTramiteGuardar = function(datos){
      if($scope.datos.INF_TIPO_SERVICIO == undefined){
      $scope.mensajeError("Porfavor seleccione el tipo de servicio a cual denunciara");
      }else if($scope.datos.INF_ORT_MACRO == undefined){
        $scope.mensajeError("Porfavor seleccione el macro distrito");
      }else if($scope.datos.INF_TIPO_VEHICULO == undefined){
          $scope.mensajeError("Porfavor ingrese el tipo de vehiculo");
      }else if($scope.datos.INF_O_RT_LUGAR == undefined){
          $scope.mensajeError("Porfavor ingrese el lugar");
      }else if($scope.datos.INF_O_RT_ZONA == undefined){
          $scope.mensajeError("Porfavor ingrese la zona");
      }else if($scope.datos.INF_O_RT_FECHA == undefined){
          $scope.mensajeError("Porfavor ingrese la fecha");
      }else if($scope.datos.INF_O_RT_HORA == undefined){
          $scope.mensajeError("Porfavor ingrese la hora");
      }else if($scope.datos.INF_PLACA_CIRCULACION == undefined){
          $scope.mensajeError("Porfavor ingrese la placa del vehiculo");
      }else if($scope.datos.INF_TIPO_VEHICULO == 'Otro' && $scope.datos.INF_DES_OTROS_VEHICULOS == undefined){
          $scope.mensajeError("Porfavor especifique la descripción de otro tipo de vehículo");
      }else if($scope.datos.INF_O_RT_BREVE_DESC_O_RT == undefined){
          $scope.mensajeError("Porfavor ingrese una breve descripción");
      }else if($scope.datos.INF_TIPO_SERVICIO == 'Servicio de Transporte Público' && $scope.datos.INF_RUTA_VEHICULO == undefined){
          $scope.mensajeError("Porfavor ingrese la Ruta del transporte público");
      }else if($scope.datos.INF_TIPO_SERVICIO == 'Servicio de Radio Taxi' && $scope.datos.INF_O_RT_NOMBRE_O_RT == undefined){
          $scope.mensajeError("Porfavor ingrese Operador de Radio Taxi");
      }else{
          $scope.guardar_tramite(datos);
      }
    }
    ///////////////////////////ENVIO//////////////////////////////
    $scope.mensajeError = function(sms){
      swal({
        title: 'ALERTA',
        text: sms,
        type: 'warning',
        cancelButtonText: 'ACEPTAR',

      });
    };
    //////////////////////////////////////////////
    $scope.validarEnvio = function(data){
      swal({
        title: 'CONFIRMAR',
        text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        closeOnConfirm: false
      }, function() {
        swal.close();
        setTimeout(function(){
          $scope.crea_tramite_lotus(data);
        }, 1000);
      });
    };
  
    $scope.crea_tramite_lotus = function (datos) {
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
        $.blockUI();
        var f = new Date();  
        datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
        datos.g_tipo_tramite = 'MOV_DEN_CON';
        datos.vtra_id = sessionService.get('IDTRAMITE');
        data_form = JSON.stringify(datos);
        var tramite = new crearTramiteMovilidad();
        tramite.usr_id = 1;    
        tramite.datos = data_form;
        tramite.procodigo = 'DEN_CON';
        tramite.tramite_linea(function(results){ 
          results = JSON.parse(results);
          if (results !=null) {
            results = results.success.data[0].crea_tramite_linea;
            $scope.mostrar_form_ope = false;
            $scope.datosMostrar = 1;
            $scope.validarFormProcesos(results);
            $.unblockUI();
          }else{
            alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
            $.unblockUI();
          }
        }); 
      },300);         
    };
  
    $scope.validarFormProcesos = function(nroTramite){
      idUsuario = sessionService.get('IDUSUARIO');
      try {
        idUsuario = 4; 
        var tramiteIgob = new datosFormularios();
        tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
        tramiteIgob.frm_tra_enviado = 'SI';
        tramiteIgob.frm_tra_if_codigo = nroTramite;
        tramiteIgob.frm_tra_id_usuario = idUsuario;
        tramiteIgob.validarFormProcesos(function(resultado){
          swal({
            title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
            text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2>\n',
            html: true,
            type: 'success',
            //timer: 5000,
          });
          $scope.tramitesCiudadano();
          $scope.desabilitado = true;
        });
      } catch (error){
        alertify.success('Registro no modificado');
        $.unblockUI(); 
      }
    };
    
    $scope.ocultar = function(tipo){
      if(tipo=='OTRO'){
        $scope.ocultaTipo = true;
      }else{
        $scope.ocultaTipo = false;
      }
    }
  
    $scope.macrodistritos = function(){
      var datosP = new macrodistritoLst();
      datosP.obtmacro(function(resultado){
        data = JSON.parse(resultado);
        if(data.success.length > 0){
          $scope.aMacrodistritos = data.success;
        }else{
            $scope.msg = "Error !!";
        }
      });
    }
  
    $scope.listaZona = function(idMacroJ){ 
      var idMacro = "";
      if($scope.aMacrodistritos){
        angular.forEach($scope.aMacrodistritos, function(value, key) {
          if(value.mcdstt_macrodistrito == idMacroJ){
            idMacro = value.mcdstt_id;
          }
        });
      }        
      $scope.datos.idMacro = idMacro;
      $scope.aDistritoZona = {};
      try{
        if(idMacroJ.length != 0){
          var parametros = new distritoZona();
          parametros.idMacro = idMacro;
          parametros.obtdist(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
              $scope.aDistritoZona = data.success;
            }else{
              $scope.msg = "Error !!";
            } 
          });
        }
      }catch(error){
        console.log('error',error);
      }
    }

    $scope.dinamicoTipoVehiculo = function(data){
        if(data == 'Otro'){
            $scope.div_otros = true;
        }else{
            $scope.div_otros = false;
        }
    }

    $scope.dinamicoTipoServicio = function(data){
      if(data == 'Servicio de Transporte Público'){
        $scope.div_ruta = true;
        $scope.div_nom_conductor =false;
      }else if(data == 'Servicio de Radio Taxi'){
        $scope.div_ruta = false;
        $scope.div_nom_conductor =true;
      }else{
        $scope.div_ruta = false;
        $scope.div_nom_conductor =false;
      }
    }

    $scope.operadorRadiotaxis = function(){
      var datosP = new buscaOperadorRadioTaxi();
      datosP.listaOperadorRadioTaxi(function(resultado){
        data = JSON.parse(resultado);
        $scope.aListadoOperadorTaxi = data.success;
        $scope.aListadoOperadorTaxi = $scope.aListadoOperadorTaxi.data;
      });
    }
  
  }
  