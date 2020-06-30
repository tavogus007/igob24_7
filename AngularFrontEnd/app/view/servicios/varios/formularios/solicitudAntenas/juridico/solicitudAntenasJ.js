function solicitudJAntenasController($scope, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http,
  FileUploader, $sce, fileUpload, $timeout, filterFilter, FileUploader, fileUpload1, $location, wsRgistrarPubliciadad, obtFechaActual) {
  $scope.URLAPI = CONFIG.CONEXION_API_PG_IF;
  $scope.urlSITv3 = CONFIG.CONEXION_SITV3;

  $scope.radiobase_simple = null;
  $scope.mostrar = null;
  $scope.mostrarRM = null;
  $scope.mostrarGU = null;
  $rootScope.mostrarGM = null;
  $rootScope.rbase_multiple = true;
  $scope.soporteRM = null;
  $scope.guardarbtn = "mostrar";
  $scope.opcion1 = null;
  $scope.opcion2 = null;
  $scope.opciones = null;
  $scope.btnValida1 = false;
  $scope.btnValida2 = false;
  $scope.btnValida3 = false;
  $scope.btnValida4 = false;
  $scope.btnValida5 = false;
  $scope.btnValida6 = false;
  $scope.requisito = null;
  $scope.continuar = null;
  $scope.req_difusion = "";
  $scope.rutaArchEnvioLotus = [];
  $rootScope.tabAdj = false;
  $scope.requisitosOcultar = true;
  $scope.n_autorizacion = false;
  $scope.chec_autorizacion = false;
  $scope.n_autorizacion_1 = true;
  $scope.mostrar1 = "mostrar";
  $rootScope.botonesrodo = true;
  $rootScope.botonesrodolfo = true;
  $scope.observarData = true;

  /////////// valores ocultos de los reuisitos
  $scope.ANTT_CON_ARR = null;
  $scope.ANTT_CART_NOTARIADA = null;
  $scope.ANTT_AUT_ESC_COPROP = null;
  $scope.ANTT_LIC_AMB = null;
  $scope.ANTT_CAL_ESTRUC_SOP = null;
  $scope.ANTT_POL_SEG = null;
  $scope.ANTT_CERT_AUT_TRIB = null;
  $scope.ANTT_CART_NOT = null;
  $scope.ANTT_PLAN_MIME = null;
  $scope.ANTT_PLAN_MANT = null;
  $scope.ANTT_EST_GEOLOGICO = null;
  $scope.ANTT_PLAN_FORM_DIG = null;
  $scope.ANTT_PLAN_ALT_SOPORTE = null;
  $scope.ANTT_PLAN_SITIO = null;
  $scope.ANTT_PLAN_MED_PREV_SEG = null;
  $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
  $scope.ANTT_INF_TEC_POS = null;
  $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
  $scope.ANTT_PLAN_DET_CONST_CAT = null;
  $scope.ANTT_DOC_AUT_LUG_ESP_PUB_GAB = null;
  $scope.FORMATO_DIG_ADJ = null;
  $scope.hab_boton_guardar = true;

  $rootScope.requistosfile = true;
  $rootScope.soporteRU = true;
  $scope.ANTT_PLAN_FORM_DIG = true;

  $scope.tipoTramite = "";

  $scope.dataforma_sj = {
    availableOptions: [
      { id: 'AUTOSOPORTADOS', name: 'AUTOSOPORTADOS' },
      { id: 'ARRIOSTRADOS', name: 'ARRIOSTRADOS' },
      { id: 'ADOSADOS', name: 'ADOSADOS' }
    ]
  };
  $scope.datacategoria = {
    availableOptions: [
      { id: 'GRAN ESCALA', name: 'I. GRAN ESCALA' },
      { id: 'ESCALA MEDIA', name: 'II. ESCALA MEDIA' },
      { id: 'ESCALA MENOR', name: 'III. ESCALA MENOR' },
      { id: 'ESCALA DOMÉSTICA', name: 'IV. ESCALA DOMÉSTICA' }
    ]
  };

  $scope.datasoporte = {
    availableOptions: [
      { id: 'MÁSTILES', name: 'MÁSTILES' },
      { id: 'MONOPOSTES', name: 'MONOPOSTES (Postes mayores)' },
      { id: 'TORRES', name: 'TORRES' },
      { id: 'POSTES', name: 'POSTES' },
      { id: 'TORRETAS', name: 'TORRETAS' },
      { id: 'COW', name: 'COW (Celdas sobre ruedas)' },
      { id: 'COLT', name: 'COLT (Celdas en camiones de luz)' },
      { id: 'GABINETES', name: 'GABINETES' },
      { id: 'PARA ANTENAS SATELITALES', name: 'PARA ANTENAS SATELITALES' }
    ]
  };

  $scope.habilitaSoprteRU = function () {
    $rootScope.soporteRU = false;
    $scope.actualizar_soporte = true;
    $scope.guardar_soporte = false;
    $("#tipo_sop").val("");
    $("#categoria").val("");
    $("#forma_sj").val("");
    $("#altura").val("");
    $("#n_antenas").val("");

  }
  $scope.limpiarValores = function () {
    //$scope.radiobase_simple = null; 
    $scope.mostrar = null;
    $scope.mostrarRM = null;
    $scope.mostrarGU = null;
    $rootScope.mostrarGM = null;
    $rootScope.rbase_multiple = true;
    $scope.soporteRM = null;
    $scope.guardarbtn = "mostrar";
    $scope.opcion1 = null;
    $scope.opcion2 = null;
    $scope.opciones = null;
    $scope.btnValida1 = true;
    $scope.btnValida2 = true;
    $scope.btnValida3 = true;
    $scope.btnValida4 = true;
    $scope.btnValida5 = true;
    $scope.btnValida6 = false;
    $scope.requisito = null;
    $scope.continuar = null;
    $scope.req_difusion = "";
    $scope.rutaArchEnvioLotus = [];
    $rootScope.tabAdj = false;
    $scope.requisitosOcultar = true;
    $scope.n_autorizacion = true;
    $scope.chec_autorizacion = true;
    $scope.n_autorizacion_1 = true;
    $scope.mostrar1 = "mostrar";
    $rootScope.botonesrodo = true;
    $rootScope.botonesrodolfo = true;
    $rootScope.mostrarRMGM = true;
    $scope.mostrarRUGU = null;// true;
    //$scope.cargar_mapa();
    $("#ANTT_CON_ARR_campo").val("");
    $("#ANTT_CART_NOTARIADA_campo").val("");
    $("#ANTT_AUT_ESC_COPROP_campo").val("");
    $("#ANTT_LIC_AMB_campo").val("");
    $("#ANTT_CAL_ESTRUC_SOP_campo").val("");
    $("#ANTT_POL_SEG_campo").val("");
    $("#ANTT_CERT_AUT_TRIB_campo").val("");
    $("#ANTT_CART_NOT_campo").val("");
    $("#ANTT_PLAN_MIME_campo").val("");
    $("#ANTT_PLAN_MANT_campo").val("");
    $("#ANTT_EST_GEOLOGICO_campo").val("");
    $("#ANTT_PLAN_ALT_SOPORTE_campo").val("");
    $("#ANTT_PLAN_SITIO_campo").val("");
    $("#ANTT_PLAN_MED_PREV_SEG_campo").val("");
    $("#ANTT_DESC_ESQ_BALIZAMIENTO_campo").val("");
    $("#ANTT_INF_TEC_POS_campo").val("");
    $("#ANTT_DOC_AUT_LUG_ESP_PUB_campo").val("");
    $("#ANTT_PLAN_DET_CONST_CAT_campo").val("");
    $("#ANTT_DOC_AUT_LUG_ESP_PUB_GAB_campo").val("");


    $("#den_auto").val("");

    var radios = $('input:radio[name=r_tipo]:checked').val();
    if (radios == undefined) {
      $scope.valorControl = $rootScope.datosIniciales.g_tipo;
      if ($scope.valorControl == "RBM") {
        radios = "RM";
      }
    }
    if (radios == undefined) {
      radios = $scope.tipo_rvnTramite;
    }
    switch (radios) {
      case "RU":

        $scope.mostrarRUGU = "mostrar";//false;
        $scope.mostrarbtn_multiple = false;
        $scope.radiobase_simple = "mostrar";
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;

        break;
      case "RM":


        $scope.mostrarRUGU = null;//false;
        $scope.mostrarbtn_multiple = true;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = true;
        $rootScope.botonesrodolfo = false;
        $rootScope.botonesrodo = true;
        $scope.mostrarbtn_multiple = false;
        $scope.actualizarbtn_multiple = true;

        //$scope.habilitaAdjuntosM();


        break;
      case "GU":
        $scope.mostrarRUGU = "mostrar";//false;
        $scope.mostrarbtn_multiple = false;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;
        //$scope.hab_sop_gabinete();
        break;
      case "GM":
        $rootScope.rbase_multiple = true;
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.gabineteEnvio = "mostrar";
        $rootScope.mostrarGM = "mostrar";
        $scope.guardarbtn1 = "mostrar";
        $scope.mostrar = "ocultar";
        $rootScope.mostraRM_adjuntos = null;
        $rootScope.grillaRM = null;
        $scope.tipoReg = "G_MULTIPLE";
        $rootScope.soporteRM = null;
        $rootScope.mostrarRMGM = false;//"mostrar";
        $rootScope.mostrarRUGU = null;
        $rootScope.tabAdj = true;
        $scope.mostrarRM = null;
        break;
      default:
        swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias..", "error");
    }
  }
  $scope.tipoReg;
  $rootScope.botones1 = true;
  $scope.valid_tipo = function () {

    var radios = $('input:radio[name=r_tipo]:checked').val();
    $("#den_auto").val("");
    $("#den_rbase").val("");
    $("#ub_rbase").val("");
    $("#tp_prop").val("");
    $("#lt_ubicacion").val("");
    $("#ln_ubicacion").val("");
    $("#den_ngabinete").val("");
    $("#observacion").val("");
    $("#macrodistrito").val("");
    $("#zona").val("");
    $("#latitud_reg").val("");
    $("#longitud_reg").val("");

    $rootScope.requistosfile = true;
    $("#ANTT_DOC_AUT_LUG_ESP_PUB_campo").val("");
    $("#ANTT_CON_ARR_campo").val("");
    $("#ANTT_CART_NOTARIADA_campo").val("");
    $("#ANTT_AUT_ESC_COPROP_campo").val("");

    $("#ANTT_LIC_AMB_campo").val("");
    $("#ANTT_CAL_ESTRUC_SOP_campo").val("");
    $("#ANTT_POL_SEG_campo").val("");
    $("#ANTT_CERT_AUT_TRIB_campo").val("");
    $("#ANTT_CART_NOT_campo").val("");
    $("#ANTT_PLAN_MIME_campo").val("");
    $("#ANTT_PLAN_MANT_campo").val("");
    $("#ANTT_EST_GEOLOGICO_campo").val("");
    $("#ANTT_INF_TEC_EMITIDO_campo").val("");
    $("#ANTT_PLAN_FORM_DIG_campo").val("");
    $("#ANTT_INF_TEC_EMITIDO_GAB_campo").val("");
    $("#ANTT_PLAN_FORM_DIG_campo").val("");
    $("#ANTT_PLAN_ALT_SOPORTE_campo").val("");
    $("#ANTT_PLAN_SITIO_campo").val("");
    $("#ANTT_PLAN_MED_PREV_SEG_campo").val("");
    $("#ANTT_DESC_ESQ_BALIZAMIENTO_campo").val("");

    $scope.ANTT_CON_ARR = null;
    $scope.ANTT_CART_NOTARIADA = null;
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
    $scope.ANTT_AUT_ESC_COPROP = null;
    $scope.ANTT_LIC_AMB = null;
    $scope.ANTT_CAL_ESTRUC_SOP = null;
    $scope.ANTT_POL_SEG = null;
    $scope.ANTT_CERT_AUT_TRIB = null;
    $scope.ANTT_CART_NOT = null;
    $scope.ANTT_PLAN_MIME = null;
    $scope.ANTT_PLAN_MANT = null;
    $scope.ANTT_EST_GEOLOGICO = null;
    $scope.ANTT_INF_TEC_EMITIDO = null;
    $scope.ANTT_INF_TEC_EMITIDO_GAB = null;
    $scope.ANTT_PLAN_FORM_DIG = null;
    $scope.ANTT_PLAN_ALT_SOPORTE = null;
    $scope.ANTT_PLAN_SITIO = null;
    $scope.ANTT_PLAN_MED_PREV_SEG = null;
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;


    $scope.ArchivoRequisitos = [];
    $scope.lstSoporteprevio = [];
    $scope.lstSoportes();
    $scope.grilla_rbmultiple = [];
    $scope.lst_grilla_multiple();
    $rootScope.mostrardiv = null;
    $rootScope.soporteRU = true;

    $rootScope.radiobas_env = null;
    $scope.mostrarRUGU = null;//false;
    $scope.mostrarbtn_multiple = true;
    $scope.radiobase_simple = null;
    $scope.mostrarRMGM = true;
    $rootScope.mostrarRU = true;
    $rootScope.botonesrodolfo = true;
    $rootScope.botonesrodo = true;
    $scope.mostrarbtn_multiple = true;
    $scope.actualizarbtn_multiple = true;
    $rootScope.tabAdj = true;
    $scope.hab_boton_guardar = true;
    $scope.ANTT_CON_ARR = null;
    $scope.observarData = true;
    $('#f01_pri_nom_rep').val($rootScope.datosIniciales.f01_pri_nom_rep);
    $('#f01_ape_pat_rep').val($rootScope.datosIniciales.f01_ape_pat_prop);
    $('#f01_ape_mat_rep').val($rootScope.datosIniciales.f01_ape_mat_rep);
    $('#f01_num_doc_rep').val($rootScope.datosIniciales.f01_num_doc_rep);
    $('#f01_expedido_rep').val($rootScope.datosIniciales.f01_expedido_rep);
    $('#f01_ges_vig_pod').val($rootScope.datosIniciales.f01_ges_vig_pod);
    $('#f01_ape_cas_rep').val($rootScope.datosIniciales.f01_ape_cas_rep);
    //mostrarRMGM
    switch (radios) {
      case "RU":
        //botonesrodo
        mapas(sessionService.get('IDTRAMITE'));
        $scope.tipoReg = "R_UNICO";
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.radiobas_env = "mostrar";
        $rootScope.soporteRU = true;
        $scope.mostrarRUGU = "mostrar";//false;
        $scope.mostrarbtn_multiple = false;
        $scope.radiobase_simple = "mostrar";
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;
        $scope.hab_boton_guardar = true;
        $scope.ANTT_ADJ_AUTORIZACION = null;
        $rootScope.botones1 = false;


        break;
      case "RM":
        $scope.tipoReg = "R_MULTIPLE";
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.radiobas_env = null;
        $rootScope.tabAdj = true;
        $scope.mostrarRUGU = null;//false;
        $scope.mostrarbtn_multiple = true;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = true;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = false;
        $scope.actualizarbtn_multiple = true;
        $scope.hab_boton_guardar = true;
        $rootScope.botones1 = false;
        $scope.habilitaAdjuntosM();

        break;
      case "GU":
        mapas(sessionService.get('IDTRAMITE'));

        $scope.tipoReg = "G_UNICO";
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.gabineteEnvio = "mostrar";
        $scope.mostrarRUGU = "mostrar";//false;
        $scope.mostrarbtn_multiple = false;
        $scope.radiobase_simple = null;//"mostrar";
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;
        $scope.hab_boton_guardar = true;
        $scope.btnGuardarRegistro = false;
        $scope.ANTT_ADJ_AUTORIZACION = null;

        break;
      case "GM":
        $scope.tipoReg = "G_MULTIPLE";
        $rootScope.rbase_multiple = true;
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";

        $scope.mostrarRUGU = null;
        $scope.mostrarbtn_multiple = true;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = true;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = false;
        $scope.actualizarbtn_multiple = true;
        $scope.hab_boton_guardar = true;
        $rootScope.requistosfile = true;
        $rootScope.tabAdj = true;


        break;
      default:
        swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias44..", "error");

    }
  }
  $scope.habilitarR = function (radio) {
    var radioss = radio

    switch (radioss) {
      case "RU":
        $scope.requisitosOcultar = false;
        $scope.n_autorizacion = true;
        $scope.chec_autorizacion = true;
        break;
      case "RM":
        $scope.requisitosOcultar = true;
        $scope.n_autorizacion = false;
        $scope.chec_autorizacion = false;
        break;
      case "GU":
        $scope.requisitosOcultar = false;
        $scope.n_autorizacion = true;
        $scope.chec_autorizacion = true;
        break;
      case "GM":
        $scope.requisitosOcultar = true;
        $scope.n_autorizacion = false;
        $scope.chec_autorizacion = false;
        break;
    }
  }

  $scope.habilitacion = function () {
    $scope.requisito = "mostrar";
    $scope.continuar = null;
  }

  $scope.recuperaDescripcion = function (nombre) {

    var texto = '';
    switch (nombre) {
      case "ANTT_CON_ARR":
        if ($("#tp_prop").val() == "PRIVADA" || $("#tp_prop").val() == "HORIZONTAL") {
          var tf_con_arr = "";
          if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
            tf_con_arr = "gabinete.";
          } else {
            tf_con_arr = "soportes de antenas.";

          }
          texto = 'a) Contrato de Arrendamiento vigente suscrito entre el propietario del sitio y el solicitante, que establezca tiempo, lugar y la autorización para el emplazamiento de ' + tf_con_arr;
        } else if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
          texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento del soporte de antenas señalado en el Artículo 10 del presente Reglamento.';
        }
        break;
      case "ANTT_CART_NOTARIADA":
        texto = 'b) Carta Notariada de Autorización que garantice el acceso irrestricto al sitio del emplazamiento, a los servidores públicos del Gobierno Autónomo Municipal de La Paz, únicamente para fines de inspección durante el proceso de solicitud de autorización; y posteriormente, cuando sea requerido por el Gobierno Autónomo Municipal de La Paz, para propósitos de verificación y fiscalización periódica respecto al cumplimiento de las condiciones técnicas del emplazamiento, mimetización y seguridad, definidas en la Ley Municipal Autonómica Nº 278. Los días y horarios de inspección serán coordinados con anticipación por la Unidad de Administración y Control Territorial y/o la Unidad de Fiscalización y Control Predial de la Sub Alcaldía correspondiente.';

        break;
      case "ANTT_AUT_ESC_COPROP":
        texto = 'c) Autorización escrita de los copropietarios sea a través de la Asociación de Copropietarios, Directiva o Representante Legal debidamente acreditado; en caso de que el emplazamiento se encuentre en una edificación bajo el régimen de propiedad horizontal.';


        break;
      case "ANTT_LIC_AMB":

        texto = 'd) Licencia Ambiental vigente extendida por la autoridad competente, para el emplazamiento específico solicitado.';

        break;
      case "ANTT_CAL_ESTRUC_SOP":

        texto = 'e) Cálculo estructural del o de los soportes específico para el cual se solicita autorización ó documento equivalente que señale que dichas estructuras no representan riesgos para el predio donde se emplazarán; firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
        break;
      case "ANTT_POL_SEG":

        var tf_polSeg = "";
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          tf_polSeg = "gabinetes.";
        } else {
          tf_polSeg = "soportes de antenas de telecomunicaciones.";

        }
        texto = 'f) Póliza de Seguro de Responsabilidad Civil y/o Daños a Terceros que cubra al titular de la solicitud sobre posibles daños a terceros durante la instalación, construcción, funcionamiento y/o vida útil del o los ' + tf_polSeg + ' Dicha garantía o su renovación deberá encontrarse indefectiblemente vigente por el tiempo que dure la autorización, no debiendo existir periodos sin cobertura.';

        break;
      case "ANTT_CERT_AUT_TRIB":
        texto = 'g) Certificación de la Autoridad Tributaria Municipal sobre la inexistencia de deudas pendientes de pago con el municipio, respecto a obligaciones pendientes de pago por gestiones vencidas o deudas de cualquier tipo provenientes de resoluciones o sentencias ejecutoriadas.';

        break;
      case "ANTT_CART_NOT":
        var tf_carnot = "";
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          tf_carnot = "gabinetes ";
        } else {
          tf_carnot = "soportes ";

        }
        texto = 'h) Carta Notariada del solicitante señalando que el o los ' + tf_carnot + 'para los cuales se gestiona autorización no cuentan con sanciones pendientes de cumplimiento con el Gobierno Autónomo Municipal de La Paz.';

        break;
      case "ANTT_PLAN_MIME":
        texto = 'i) Plan de mimetización, de acuerdo a lo señalado en el Artículo 12 de la Ley Municipal Autonómica Nº 278, y el Artículo 13 del presente Reglamento. * Cuando la mimetización no sea factible, se deberá presentar un Informe Técnico fundamentado con respaldo en criterios estructurales, ambientales y otros, según corresponda; y será elaborado y firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
        break;
      case "ANTT_PLAN_MANT":
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          texto = "j) Plan de mantenimiento del o los gabinetes de acuerdo a lo señalado en el Artículo 30 del Reglamento a la LMA Nº 278.";
        } else {
          texto = 'j) Plan de mantenimiento del o los soportes y de la radio base de acuerdo a lo señalado en el Artículo 30 del presente Reglamento.';

        }

        break;
      case "ANTT_EST_GEOLOGICO":
        texto = 'k) En el caso específico de que el emplazamiento de soportes de antenas de Gran Escala esté ubicado en áreas de riesgo muy alto de acuerdo Mapa de Riesgos vigente del Gobierno Autónomo Municipal de La Paz se deberá adjuntar obligatoriamente a la solicitud, un estudio geológico geotécnico que detalle las obras civiles específicas que deberán realizarse a fin de que aseguren la estabilidad de la o las estructuras a emplazarse; y el plan de ejecución de las mismas. Estos documentos deberán estar elaborados y firmados por un profesional  debidamente habilitado para el ejercicio profesional.';

        break;
      case "ANTT_PLAN_FORM_DIG":
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          texto = "i) Planos en formato digital (PDF) con la firma del profesional responsable de su elaboración, de los detalles constructivos, características de los gabinetes y elementos complementarios como del sistema eléctrico.";
        } else {
          texto = 'l) Planos en formato digital (PDF) del diseño esquemático del o de los soportes y de la radio base (las estructuras y de los ambientes complementarios), incluyendo alturas, número de elementos radiantes adosados al soporte y detalles constructivos (con la firma del profesional responsable de su elaboración) bajo las siguientes especificaciones técnicas:';

        }
        break;
      case "ANTT_PLAN_ALT_SOPORTE":
        texto = 'l.1) Plano de altura del o de los soportes (a escala 1:50 y acotado), y detalle del número de elementos radiantes a ser adosados.';
        break;
      case "ANTT_PLAN_SITIO":
        texto = 'l.2) Plano del sitio (1); plano de planta del sitio en el cual se vea la ubicación del o de los soportes (1); plano de la radio base (1); planos de elevaciones del sitio en los cuales se vean el o los soportes (2); plano de corte de la radio base (1); planos de  detalles constructivos del o de los soportes y equipos (2); planos del sistema eléctrico y aterramiento (2).';

        break;
      case "ANTT_PLAN_MED_PREV_SEG":
        texto = 'l.3) Plano en el que se identifiquen las medidas de prevención y seguridad a ser implementadas así como la ubicación de señalización y otros.';

        break;
      case "ANTT_DESC_ESQ_BALIZAMIENTO":
        texto = 'l.4) Descripción esquemática del balizamiento, de acuerdo a las normas de seguridad establecidas por la Dirección General de Aeronáutica Civil.';

        break;
      case "ANTT_INF_TEC_EMITIDO":
        texto = 'm) Para soportes a ser emplazados en predios declarados y valorados con la Categoría “C” Valor de Integración y/o en Conjuntos Patrimoniales de Interés Histórico y Urbano, identificados y delimitados en el Mapa de Administración Patrimonial de la Ley de Uso de Suelos, adicionalmente se deberá presentar un Informe Técnico positivo emitido por la instancia competente encargada y especializada en el tema patrimonial del Gobierno Autónomo Municipal de La Paz.';

        break;
      case "ANTT_INF_TEC_EMITIDO_GAB":
        texto = 'm) Para gabinetes a ser emplazados en predios declarados y valorados con la Categoría “C” Valor de Integración y/o en Conjuntos Patrimoniales de Interés Histórico y Urbano, identificados y delimitados en el Mapa de Administración Patrimonial de la Ley de Uso de Suelos, adicionalmente se deberá presentar un Informe Técnico positivo emitido por la instancia competente encargada y especializada en el tema patrimonial del Gobierno Autónomo Municipal de La Paz.';

        break;

      case "ANTT_DOC_AUT_LUG_ESP_PUB":
        texto = 'n) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento del soporte de antenas señalado en el Artículo 10 del presente Reglamento.';

        break;
      case "ANTT_PLAN_DET_CONST_CAT":
        texto = 'o) Planos de detalles constructivos, características de los gabinetes, identificación y elementos complementarios como del Sistema eléctrico y su ubicación exacta del sitio de emplazamiento. *Para Gabinetes complementarios, el solicitante no deberá presentar requisitos adicionales a los ya presentados para la solicitud del soporte; por lo que en éstas circunstancias, no se cobrarán estos gabinetes por el concepto de su autorización. ';

        break;
      case "ANTT_DOC_AUT_LUG_ESP_PUB_ANT":
        texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento.';

        break;
      case "ANTT_PLAN_CAR_GAB":
        texto = 'ii) Plano de características de los gabinetes.';

        break;

      case "ANTT_PLAN_ELEM_COMPL":
        texto = 'iii) Plano de elementos complementarios como el sistema eléctrico.';

        break;

      case "ANTT_ADJ_AUTORIZACION":
        texto = 'Documento que permita verificar la autorización.';

        break;
      default:
        swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias..", "error");
    }
    return texto;
  }
  $scope.guardarFiles = function (campo, nombre, url) {
    var parAdjunto = '{"campo":"' + campo + '","nombre":"' + nombre + '","url":"' + url + '"}';
    $scope.requiRecuperados.push(JSON.parse(parAdjunto));
    $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.requiRecuperados) + '}';
    $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
  }
  $scope.guardarFilesFInal = function (campo, nombre, url) {
    var parAdjunto = '{"campo":"' + campo + '","nombre":"' + nombre + '","url":"' + url + '"}';
    $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
    $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.rutaArchEnvioLotus) + '}';
    $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
  }

  $scope.guardarFilesAntenas = function (campo, nombre, url) {
    $scope.descripcion = $scope.recuperaDescripcion(nombre);
    var parAdjunto = '{"campo":"' + campo + '","nombre":"' + $scope.descripcion + '","url":"' + url + '","id_campo":"' + nombre + '"}';
    $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
    $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.rutaArchEnvioLotus) + '}';
    $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
  }
  $scope.requiRecuperados = [];
  $scope.cert_difusion = function (nombre) {
    $rootScope.opcioncheck = false;
    $scope.tipoTramite = "NUEVO";
    $scope.btnEnviarFormLinea = true;
    $scope.rutaArchEnvioLotus = [];
    $scope.requiRecuperados = [];
    $rootScope.botonesrodolfo = true;
    var verifFiles = new reglasnegocio();
    var tipo_file = "FILE_LIC_RADIODIFUSION";
    verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
    var oid_ciu = sessionService.get('IDSOLICITANTE');
    var oid_ciu1 = sessionService.get('IDCIUDADANO');

    verifFiles.parametros = '{"oidCiudadano":"' + oid_ciu + '","tipo_file":"' + tipo_file + '"}';
    verifFiles.llamarregla(function (data) {
      $scope.$apply();
      setTimeout(function () {
        data = JSON.parse(data);
        if (data[0].ant_sp_busquedafile != '' &&
          $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA != "" &&
          $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR != "" &&
          $rootScope.datosIniciales.f01_poder_representante != "") {
          $scope.file_CERT_RADIODIFUSION = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA + "/" + data[0].ant_sp_busquedafile + "?app_name=todoangular";
          $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";
          $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";
          $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";
          var nombre_certificado = "Licencia de Radiodifusión";
          $scope.guardarFiles(data[0].ant_sp_busquedafile, nombre_certificado, $scope.file_CERT_RADIODIFUSION);
          var nombre_ci = "Cedula de Identidad";
          $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA, nombre_ci, $scope.file_CI);
          var nombre_ci_inv = "Cedula de Identidad Inversa";
          $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR, nombre_ci_inv, $scope.file_CI_inv);
          var rep_legal = "Documento del Representante Legal";
          $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, rep_legal, $scope.rep_legal);
          var radios = $('input:radio[name=r_tipo]:checked').val();
          $scope.autoriza = null;
          $scope.valor = false;
          $rootScope.botonesrodolfo = true;
          document.getElementById("condiciones").checked = 0;
          if (radios == "RM" || radios == "GM" && $scope.myFile == undefined) {

            $rootScope.tabAdj = true;
          }
          if ($('input:radio[name=r_tipo]:checked').val() != undefined) {
            $scope.requisito = null;
            $scope.continuar = "mostrar";
            $scope.valid_tipo();
          } else {
            swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias555..", "error");

          }
        } else {
          swal("Error!..", "Es necesario que complemente los documentos necesarios para realizar el registro. Por favor Actualice su Información.", "error");
        }
        $scope.$apply();
      }, 200);

    });

  }
  $scope.reqPropiedad = function (propiedad) {
    if ($scope.tipoTramite == "NUEVO" || $scope.tipoTramite == "MULTIPLE_RG") {
      $rootScope.requistosfile = false;
      switch (propiedad) {
        case "PRIVADA":
          $scope.ANTT_CON_ARR = "mostrar";
          $scope.ANTT_CART_NOTARIADA = "mostrar";
          $scope.ANTT_AUT_ESC_COPROP = null;
          $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
          $scope.ANTT_PLAN_FORM_DIG = null;

          break;
        case "HORIZONTAL":
          $scope.ANTT_CON_ARR = "mostrar";
          $scope.ANTT_CART_NOTARIADA = "mostrar";
          $scope.ANTT_AUT_ESC_COPROP = "mostrar";
          $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "DOMINIO MUNICIPAL":
          $scope.ANTT_CON_ARR = null;
          $scope.ANTT_CART_NOTARIADA = null;
          $scope.ANTT_AUT_ESC_COPROP = null;
          $scope.ANTT_DOC_AUT_LUG_ESP_PUB = "mostrar";
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
      }
      if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
        $scope.limpearRequisitos();
        $scope.hab_sop_gabinete();
      }
    }

  }
  $scope.radianes = [];
  $scope.addRadianes = function () {
    var tam = $scope.radianes.length;
    $scope.radianes.push({
      "id": tam,
      "descripcion": "",
      "tamanio": "",
      "vsca_datos": {
        "mostrarbtnGS": true,
        "mostrarbtnES": false,
        "mostrarbtnDS": false,
        "btneditar": false,
        "btneliminar": false,
        "btneliminarpos": true,
        "mostrar": false
      }
    });
  }
  $scope.eliminarPosicion = function (datos, posicion) {

    $scope.radianes.splice(posicion, 1);
  }

  $scope.eliminarSoporte = function (datos, posicion) {
    swal({
      title: "¿Esta seguro de eliminar el Registro del Soporte?",
      text: "",
      type: "warning", 
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    }, function () {

      $scope.lstSoporteprevio.splice(posicion, 1);
      swal('', 'El registro del soporte se elimino correctamente', 'success');

      $scope.lstSoportes();
    });
  }
  $scope.editaSoporte = function (datos,posgrillasoporte) {
    $scope.actualizar_soporte = false;
    $scope.guardar_soporte = true;
    $rootScope.soporteRU = false;
    $("#tipo_sop").val(datos.tipoSoporte);
    $("#categoria").val(datos.categoria);
    $("#forma_sj").val(datos.frmSujecion);
    $("#altura").val(datos.altura);
    $("#n_antenas").val(datos.nro_antenas);
    $scope.possoporte = posgrillasoporte;
  }
  $scope.act_datasoporte = function (data) {

    try {
      $scope.soporteActualizar = [];
      for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
        if (i == $scope.possoporte) {
          var dataregistro = '{"tipoSoporte":"' + $("#tipo_sop").val() + '","categoria":"' + $("#categoria").val() + '","frmSujecion":"' + $("#forma_sj").val() + '","altura":"' + $("#altura").val() + '","nro_antenas":' + $("#n_antenas").val() + '}';
          $scope.soporteActualizar.push(JSON.parse(dataregistro));
        } else {
          $scope.soporteActualizar.push($scope.lstSoporteprevio[i]);

        }
      }
      $scope.lstSoporteprevio = [];
      $scope.lstSoporteprevio = $scope.soporteActualizar;
      $scope.lstSoportes();
      $rootScope.soporteRU = true;
      swal("Ok!", "La actualización del soporte fue exitoso", "success");
      $scope.mostrar_ActualizarRequisitos();
      $scope.torres_torretas_monoposte = null;
      $scope.mastiles_postes = null;
      $scope.cow = null;
      $scope.antsatelites = null;
      $rootScope.requisitosrbase = "mostrar";
      //$rootScope.soporteRU = true;
      for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
        if ($scope.lstSoporteprevio[i].tipoSoporte == "TORRES" || $scope.lstSoporteprevio[i].tipoSoporte == "TORRETAS" || $scope.lstSoporteprevio[i].tipoSoporte == "MONOPOSTES") {
          $scope.torres_torretas_monoposte = "mostrar";
        }
        if ($scope.lstSoporteprevio[i].tipoSoporte == "MÁSTILES" || $scope.lstSoporteprevio[i].tipoSoporte == "POSTES") {
          $scope.mastiles_postes = "mostrar";

        }
        if ($scope.lstSoporteprevio[i].tipoSoporte == "COW") {
          $scope.cow = "mostrar";

        }
        if ($scope.lstSoporteprevio[i].tipoSoporte == "GABINETES") {
          $scope.antsatelites = "mostrar";

        }
      }
    } catch (e) {
      console.log("Error", e);
    }
    $("#tipo_sop").val("");
    $("#categoria").val("");
    $("#forma_sj").val("");
    $("#altura").val("");
    $("#n_antenas").val("");

  }
  $scope.eliminarSoporteMultiple = function (datos, posicion) {
    $scope.lstSoporteprevio_m.splice(posicion, 1);
    $scope.lstSoportes_m();
  }

  $scope.inc_Radianes = function () {
    $scope.html = "";
    var idName = 1;
    var titulo = "Altura Radian ";
    var cantidad = 3;

    for (var i = 0; i < cantidad; i++) {
      $scope.html = $scope.html + '<div class="col-md-12"> ';
      $scope.html = $scope.html + '<div class="form-group" > ';
      $scope.html = $scope.html + '<div class="controls"> ';
      $scope.html = $scope.html + '<label for="url" >' + titulo + i + ':</label> ';
      $scope.html = $scope.html + '<input id="radian" onkeyUp="return conMayusculas(this)" name="registro" value = "" type="number" class="form-control" placeholder="' + titulo + '" ng-model="dataAnt.rad' + idName + '">';
      $scope.html = $scope.html + '</div></div></div> ';
    }
    document.getElementById("cont_radianes").innerHTML = $scope.html;
  }
  $scope.reg_soporte = function (data) {
    try {
      if ($("#tp_prop").val() == "") {
        swal("Nota", "Para completar el registro del soporte es necesario selecionar el tipo de propiedad Gracias", "error");

      } else {
        if ($("#categoria").val() != "" && $("#forma_sj").val() != "" && $("#tipo_sop").val() != "") {
          if (data.altura != undefined && data.n_antenas != undefined) {
            $scope.radianeslst = [];
            var datos;
            for (var i = 0; i < $scope.radianes.length; i++) {
              datos = '{"descripcion":"' + $scope.radianes[i].descripcion + '","tamanio":"' + $scope.radianes[i].tamanio + '"}';
              $scope.radianeslst.push(JSON.parse(datos));
            }
            var dataregistro = '{"tipoSoporte":"' + data.tipo_sop + '","categoria":"' + data.categoria + '","frmSujecion":"' + data.forma_sj + '","altura":"' + data.altura + '","nro_antenas":' + data.n_antenas + '}';
            $scope.lstSoporteprevio.push(JSON.parse(dataregistro));
            for (var i = 0; i < $scope.arrayfiles.length; i++) {

              $scope.rutaArchEnvioLotus.push($scope.arrayfiles[i]);
            }

            for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
              if ($scope.lstSoporteprevio[i].tipoSoporte == "TORRES" || $scope.lstSoporteprevio[i].tipoSoporte == "TORRETAS" || $scope.lstSoporteprevio[i].tipoSoporte == "MONOPOSTES") {
                $scope.torres_torretas_monoposte = "mostrar";
              }
              if ($scope.lstSoporteprevio[i].tipoSoporte == "MÁSTILES" || $scope.lstSoporteprevio[i].tipoSoporte == "POSTES") {
                $scope.mastiles_postes = "mostrar";

              }
              if ($scope.lstSoporteprevio[i].tipoSoporte == "COW") {
                $scope.cow = "mostrar";

              }
              if ($scope.lstSoporteprevio[i].tipoSoporte == "GABINETES") {
                $scope.antsatelites = "mostrar";

              }
            }
            swal("Ok!", "Se registro el soporte con exitó Gracias", "success");
            $scope.arrayfiles = [];
            $("#tipo_sop").val("");
            $("#categoria").val("");
            $("#forma_sj").val("");
            $("#altura").val("");
            $("#n_antenas").val("");
            $scope.radianes = [];
            if ($scope.tipoTramite != "REENVIO") {
              $scope.mostrar_ActualizarRequisitos();
            }
            $scope.lstSoportes();
            $scope.torres_torretas_monoposte = null;
            $scope.mastiles_postes = null;
            $scope.cow = null;
            $scope.antsatelites = null;
            $rootScope.requisitosrbase = "mostrar";
            $rootScope.soporteRU = true;

          } else {
            swal("Error", "Es necesario completar la altura y el número de antenas Gracias", "error");

          }

        } else {
          swal("Error", "Es necesario completar el tipo de soperte, la categoria y la forma de sujeción Gracias", "error");
        }

      }

    } catch (e) {
    }
  }
  $scope.limpearRequisitos = function () {

    $scope.ANTT_LIC_AMB = null;
    $scope.ANTT_CAL_ESTRUC_SOP = null;
    $scope.ANTT_POL_SEG = null;
    $scope.ANTT_CERT_AUT_TRIB = null;
    $scope.ANTT_CART_NOT = null;
    $scope.ANTT_PLAN_MIME = null;
    $scope.ANTT_PLAN_MANT = null;
    $scope.ANTT_EST_GEOLOGICO = null;
    $scope.ANTT_INF_TEC_EMITIDO = null;
    $scope.ANTT_INF_TEC_EMITIDO_GAB = null;
    $scope.ANTT_PLAN_FORM_DIG = null;
    $scope.ANTT_PLAN_ALT_SOPORTE = null;
    $scope.ANTT_PLAN_SITIO = null;
    $scope.ANTT_PLAN_MED_PREV_SEG = null;
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
    $scope.ANTT_INF_TEC_POS = null;
    $scope.ANTT_PLAN_DET_CONST_CAT = null;
    $scope.ANTT_PLAN_CAR_GAB = null;
    $scope.ANTT_PLAN_ELEM_COMPL = null;
    $scope.ANTT_ADJ_AUTORIZACION = null;
    $scope.FORMATO_DIG_ADJ = null;
    //$("#ANTT_LIC_AMB_campo").val("");  
  }
  $scope.mostrar_ActualizarRequisitos = function () {
    //$scope.limpearRequisitos(); 
    $scope.den_autorizacionFIle = $("#den_auto").val();
    if ($scope.den_autorizacionFIle.length > 0) {
      $scope.ANTT_ADJ_AUTORIZACION = "mostrar";
    } else {
      $scope.ANTT_ADJ_AUTORIZACION = null;
    }
    var tipoProp = $("#tp_prop").val();
    var categoria = "";
    for (var i = 0; i < $scope.lstSoporte.length; i++) {
      var tipo = $scope.lstSoporte[i].tipoSoporte;
      $rootScope.requistosfile = false;
      categoria = $scope.lstSoporte[i].categoria;
      switch (tipo) {
        case "TORRETAS":
        case "TORRES":
        case "MONOPOSTES":
          $scope.habilitasoporte1(categoria);
          break;
        case "MÁSTILES":
        case "POSTES":
        case "ADOSADOS":
          $scope.habilitasoporte2(categoria);
          break;
        case "PARA ANTENAS SATELITALES":
          $scope.habilitasoporte3(categoria);
          break;
        case "COW":
          $scope.habilitasoporte4(categoria);
          break;
        case "GABINETES":
          $scope.hab_sop_gabinete();
          break;
        default:
      }
    }
  }
  $scope.habilitasoporte1 = function (categoria) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";//14
  }

  $scope.habilitasoporte2 = function (categoria) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";//14

  }
  $scope.habilitasoporte3 = function (categoria) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";//13

  }
  $scope.habilitasoporte4 = function (categoria) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";//15
  }

  $scope.hab_sop_gabinete = function () {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO_GAB = "mostrar";
    $scope.FORMATO_DIG_ADJ = "mostrar";//8
  }

  $scope.hab_sop_prop_mun = function (categoria) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB = "mostrar";
    $scope.ANTT_INF_TEC_EMITIDO = "mostrar";//12
  }

  $scope.habilitasoporte7 = function (categoria) {
    $scope.ANTT_CON_ARR = null;
    $scope.ANTT_CART_NOTARIADA = null;
    $scope.ANTT_AUT_ESC_COPROP = null;
    $scope.ANTT_LIC_AMB = null;
    $scope.ANTT_CAL_ESTRUC_SOP = null;
    $scope.ANTT_POL_SEG = null;
    $scope.ANTT_CERT_AUT_TRIB = null;
    $scope.ANTT_CART_NOT = null;
    $scope.ANTT_PLAN_MIME = null;
    $scope.ANTT_PLAN_MANT = null;
    $scope.ANTT_EST_GEOLOGICO = null;
    $scope.ANTT_PLAN_FORM_DIG = null;
    $scope.ANTT_PLAN_ALT_SOPORTE = null;
    $scope.ANTT_PLAN_SITIO = null;
    $scope.ANTT_PLAN_MED_PREV_SEG = null;
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
    $scope.ANTT_INF_TEC_POS = null;
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
    $scope.ANTT_PLAN_DET_CONST_CAT = null;
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB_GAB = null;
  }


  $scope.lstSoporte = [];
  $scope.lstSoporteprevio = [];
  $scope.lstSoportes = function () {
    $scope.lstSoporte = $scope.lstSoporteprevio;
    var data = $scope.lstSoporteprevio;
    $scope.tablalstSoporte.reload();
  }

  $scope.tablalstSoporte = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.lstSoporte.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.lstSoporte, params.filter()) :
        $scope.lstSoporte;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.lstSoporte;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  var dataEnvLotus;
  $scope.arraySoporte = [];
  $scope.infodatamultiple = [];
  $scope.dataUbicacionNueva = "";
  $scope.ultimoRegistro = function (dataAnt) {
    switch ($scope.tipoReg) {
      case "R_UNICO":
        for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
          var objeto = '{"altura":"' + $scope.lstSoporteprevio[i].altura + '","categoria":"' + $scope.lstSoporteprevio[i].categoria + '","frmSujecion":"' + $scope.lstSoporteprevio[i].frmSujecion + '","tipoSoporte":"' + $scope.lstSoporteprevio[i].tipoSoporte + '","nro_antenas":' + $scope.lstSoporteprevio[i].nro_antenas + '}';
          $scope.arraySoporte.push(JSON.parse(objeto));
        }
        var autorizacion1 = dataAnt.den_auto;
        var autorizacion2 = '';
        if (autorizacion1 != null) { autorizacion2 = dataAnt.den_auto; } else { autorizacion2 = ''; }
        dataEnvLotus = '[{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","ANT_NOM_RADBASE":"' + dataAnt.den_rbase + '","ANT_UBICA_RBASE":"' + dataAnt.ub_rbase + '","ANT_TIP_PROPIEDAD":"' + dataAnt.tp_prop + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData) + ',"f01_GRD_SOPORTE":' + JSON.stringify($scope.arraySoporte) + ',"ANT_NRO_GAB":' + dataAnt.den_ngabinete + ',"ANT_NRO_AUTO":"' + autorizacion2 + '","ANT_OBSERVACION":"' + $("#observacion").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '"}]';
        $rootScope.Antenas = JSON.parse(dataEnvLotus);
        $scope.tipoProceso = "ANTT";
        $scope.arraySoporte = [];
        var ubicacionutm = $("#ln_ubicacion").val();
        ubicacionutm = ubicacionutm.split("(");
        ubicacionutm = ubicacionutm[1].split(")");
        ubicacionutm = ubicacionutm[0];
        var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
        $scope.dataUbicacionNueva = dataUbi;

        break;
      case "R_MULTIPLE":
        for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
          var objeto = '{"altura":"' + $scope.lstSoporteprevio[i].altura + '","categoria":"' + $scope.lstSoporteprevio[i].categoria + '","frmSujecion":"' + $scope.lstSoporteprevio[i].frmSujecion + '","tipoSoporte":"' + $scope.lstSoporteprevio[i].tipoSoporte + '","nro_antenas":' + $scope.lstSoporteprevio[i].nro_antenas + '}';
          $scope.arraySoporte.push(JSON.parse(objeto));
        }

        for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
          $scope.guardarUbicacion($scope.grilla_rbmultiple[i].f01_UbicacionUdit);

        }
        $rootScope.Antenas = $scope.grilla_rbmultiple;//JSON.parse(dataEnvLotus); 
        $scope.tipoProceso = "RBM";
        break;
      case "G_UNICO":

        var autorizacion1 = dataAnt.den_auto;
        var autorizacion2 = '';
        if (autorizacion1 != null) { autorizacion2 = dataAnt.den_auto; } else { autorizacion2 = ''; }
        dataEnvLotus = '[{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","ANT_NOM_RADBASE":"' + dataAnt.den_rbase + '","ANT_UBICA_RBASE":"' + dataAnt.ub_rbase + '","ANT_TIP_PROPIEDAD":"' + dataAnt.tp_prop + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData) + ',"ANT_NRO_GAB":' + dataAnt.den_ngabinete + ',"ANT_NRO_AUTO":"' + autorizacion2 + '","ANT_OBSERVACION":"' + $("#observacion").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '"}]';
        $rootScope.Antenas = JSON.parse(dataEnvLotus);
        $scope.tipoProceso = "RG";

        var ubicacionutm = $("#ln_ubicacion").val();
        ubicacionutm = ubicacionutm.split("(");
        ubicacionutm = ubicacionutm[1].split(")");
        ubicacionutm = ubicacionutm[0];
        var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
        $scope.dataUbicacionNueva = dataUbi;
        break;
      case "G_MULTIPLE":
        for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
          $scope.guardarUbicacion($scope.grilla_rbmultiple[i].f01_UbicacionUdit);

        }
        $rootScope.Antenas = $scope.grilla_rbmultiple;
        $scope.tipoProceso = "GM";
        break;
      default:
    }
  }

  // inicio codigo epifanio DesarrollOTecnologicO24/7
  $scope.recuperacheck = function () {
    var valor = $('#condiciones:checked').val();
    if (valor == 1) { 
      $scope.autoriza = "mostrar"; 
    } else { 
      $scope.autoriza = null;
      $("#den_auto").val(""); 
      $("#fecha_venRA").val("");
      $scope.fecha_venRATexto = true;
      
    }


  }
  $scope.lstradianes = [];
  $scope.detalleradianes = function (dataAnt) {
    $scope.lstradianes = dataAnt.dataRadianes;
    var data = dataAnt.dataRadianes;
    $scope.tablalstradianes.reload();

  }
  $scope.tablalstradianes = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.lstradianes.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.lstradianes, params.filter()) :
        $scope.lstradianes;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.lstradianes;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });


  /*nuevo incorporacion de registro de radio base unico*/
  $scope.lstDatos = [];
  $scope.lstvista = [];
  $scope.rcdata = [];
  $scope.puntosprevios;
  $scope.lstDatosIniciales = function (Antenas) {
    if (Antenas != undefined) {
      if ($scope.lstvista != []) {
        $scope.rcdataprevio = [];
        for (var i = 1; i < Antenas.length; i++) {
          $scope.rcdataprevio.push(Antenas[i]);
        }
        $scope.puntosprevios = $scope.rcdataprevio;
        $scope.lstDatos = $scope.rcdataprevio;
        var data = $scope.rcdataprevio;
        $scope.tablalst.reload();
      }
    } else {
      if ($scope.lstvista != []) {
        $scope.lstDatos = $scope.lstvista;
        var data = $scope.lstvista;
        $scope.tablalst.reload();
      }
    }
  }
  $scope.tablalst = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.lstDatos.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.lstDatos, params.filter()) :
        $scope.lstDatos;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.lstDatos;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  $scope.habilitasoporte1_req1 = function (files) {
    $scope.ANTT_CON_ARR = "mostrar";
    $scope.ANTT_CART_NOTARIADA = "mostrar";
    $scope.ANTT_AUT_ESC_COPROP = "mostrar";
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_CON_ARR":
          $scope.ANTT_CON_ARR = null;
          break;
        case "ANTT_CART_NOTARIADA":
          $scope.ANTT_CART_NOTARIADA = null;
          break;
        case "ANTT_AUT_ESC_COPROP":
          $scope.ANTT_AUT_ESC_COPROP = null;
          break;
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_CAL_ESTRUC_SOP":
          $scope.ANTT_CAL_ESTRUC_SOP = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MIME":
          $scope.ANTT_PLAN_MIME = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;
        case "ANTT_EST_GEOLOGICO":
          $scope.ANTT_EST_GEOLOGICO = null;
          break;
        case "ANTT_PLAN_FORM_DIG":
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "ANTT_PLAN_ALT_SOPORTE":
          $scope.ANTT_PLAN_ALT_SOPORTE = null;
          break;
        case "ANTT_PLAN_SITIO":
          $scope.ANTT_PLAN_SITIO = null;
          break;
        case "ANTT_PLAN_MED_PREV_SEG":
          $scope.ANTT_PLAN_MED_PREV_SEG = null;
          break;
        case "ANTT_DESC_ESQ_BALIZAMIENTO":
          $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
          break;
        default:
      }
    }
  }
  $scope.habilitasoporte_req2 = function (files) {
    $scope.ANTT_CON_ARR = "mostrar";
    $scope.ANTT_CART_NOTARIADA = "mostrar";
    $scope.ANTT_AUT_ESC_COPROP = "mostrar";
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_CON_ARR":
          $scope.ANTT_CON_ARR = null;
          break;
        case "ANTT_CART_NOTARIADA":
          $scope.ANTT_CART_NOTARIADA = null;
          break;
        case "ANTT_AUT_ESC_COPROP":
          $scope.ANTT_AUT_ESC_COPROP = null;
          break;
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_CAL_ESTRUC_SOP":
          $scope.ANTT_CAL_ESTRUC_SOP = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MIME":
          $scope.ANTT_PLAN_MIME = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;

        case "ANTT_EST_GEOLOGICO":
          $scope.ANTT_EST_GEOLOGICO = null;
          break;
        case "ANTT_PLAN_FORM_DIG":
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "ANTT_PLAN_ALT_SOPORTE":
          $scope.ANTT_PLAN_ALT_SOPORTE = null;
          break;
        case "ANTT_PLAN_SITIO":
          $scope.ANTT_PLAN_SITIO = null;
          break;
        case "ANTT_DESC_ESQ_BALIZAMIENTO":
          $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
          break;
        default:
      }
    }
  }
  $scope.habilitasoporte_req3 = function (files) {
    $scope.ANTT_CON_ARR = "mostrar";
    $scope.ANTT_CART_NOTARIADA = "mostrar";
    $scope.ANTT_AUT_ESC_COPROP = "mostrar";
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    $scope.ANTT_INF_TEC_POS = "mostrar";
    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_CON_ARR":
          $scope.ANTT_CON_ARR = null;
          break;
        case "ANTT_CART_NOTARIADA":
          $scope.ANTT_CART_NOTARIADA = null;
          break;
        case "ANTT_AUT_ESC_COPROP":
          $scope.ANTT_AUT_ESC_COPROP = null;
          break;
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_CAL_ESTRUC_SOP":
          $scope.ANTT_CAL_ESTRUC_SOP = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MIME":
          $scope.ANTT_PLAN_MIME = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;
        case "ANTT_EST_GEOLOGICO":
          $scope.ANTT_EST_GEOLOGICO = null;
          break;
        case "ANTT_PLAN_FORM_DIG":
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "ANTT_PLAN_ALT_SOPORTE":
          $scope.ANTT_PLAN_ALT_SOPORTE = null;
          break;
        case "ANTT_PLAN_SITIO":
          $scope.ANTT_PLAN_SITIO = null;
          break;
        case "ANTT_PLAN_MED_PREV_SEG":
          $scope.ANTT_PLAN_MED_PREV_SEG = null;
          break;
        case "ANTT_DESC_ESQ_BALIZAMIENTO":
          $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
          break;
        case "ANTT_INF_TEC_POS":
          $scope.ANTT_INF_TEC_POS = null;
          break;
        default:
      }
    }
  }
  $scope.habilitasoporte_req4 = function (files) {
    $scope.ANTT_CON_ARR = "mostrar";
    $scope.ANTT_CART_NOTARIADA = "mostrar";
    $scope.ANTT_AUT_ESC_COPROP = "mostrar";
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    $scope.ANTT_INF_TEC_POS = "mostrar";

    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_CON_ARR":
          $scope.ANTT_CON_ARR = null;
          break;
        case "ANTT_CART_NOTARIADA":
          $scope.ANTT_CART_NOTARIADA = null;
          break;
        case "ANTT_AUT_ESC_COPROP":
          $scope.ANTT_AUT_ESC_COPROP = null;
          break;
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;
        case "ANTT_EST_GEOLOGICO":
          $scope.ANTT_EST_GEOLOGICO = null;
          break;
        case "ANTT_PLAN_FORM_DIG":
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "ANTT_PLAN_ALT_SOPORTE":
          $scope.ANTT_PLAN_ALT_SOPORTE = null;
          break;
        case "ANTT_PLAN_SITIO":
          $scope.ANTT_PLAN_SITIO = null;
          break;
        case "ANTT_DESC_ESQ_BALIZAMIENTO":
          $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
          break;
        case "ANTT_PLAN_MED_PREV_SEG":
          $scope.ANTT_PLAN_MED_PREV_SEG = null;
          break;
        case "ANTT_INF_TEC_POS":
          $scope.ANTT_INF_TEC_POS = null;
          break;
        default:
      }
    }

  }
  $scope.hab_sop_gabinete_req = function (files) {
    $scope.ANTT_CON_ARR = "mostrar";
    $scope.ANTT_CART_NOTARIADA = "mostrar";
    $scope.ANTT_AUT_ESC_COPROP = "mostrar";
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_PLAN_DET_CONST_CAT = "mostrar";
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB_GAB = "mostrar";
    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_CON_ARR":
          $scope.ANTT_CON_ARR = null;
          break;
        case "ANTT_CART_NOTARIADA":
          $scope.ANTT_CART_NOTARIADA = null;
          break;
        case "ANTT_AUT_ESC_COPROP":
          $scope.ANTT_AUT_ESC_COPROP = null;
          break;
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;
        case "ANTT_PLAN_DET_CONST_CAT":
          $scope.ANTT_PLAN_DET_CONST_CAT = null;
          break;
        case "ANTT_DOC_AUT_LUG_ESP_PUB_GAB":
          $scope.ANTT_DOC_AUT_LUG_ESP_PUB_GAB = null;
          break;
        default:
      }
    }
  }
  $scope.hab_sop_prop_mun_req = function (files) {
    $scope.ANTT_LIC_AMB = "mostrar";
    $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
    $scope.ANTT_POL_SEG = "mostrar";
    $scope.ANTT_CERT_AUT_TRIB = "mostrar";
    $scope.ANTT_CART_NOT = "mostrar";
    $scope.ANTT_PLAN_MIME = "mostrar";
    $scope.ANTT_PLAN_MANT = "mostrar";
    $scope.ANTT_EST_GEOLOGICO = "mostrar";
    $scope.ANTT_PLAN_FORM_DIG = "mostrar";
    $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
    $scope.ANTT_PLAN_SITIO = "mostrar";
    $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
    $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    $scope.ANTT_DOC_AUT_LUG_ESP_PUB = "mostrar";
    for (var i = 4; i < files.length; i++) {
      switch (files[i].id_campo) {
        case "ANTT_LIC_AMB":
          $scope.ANTT_LIC_AMB = null;
          break;
        case "ANTT_CAL_ESTRUC_SOP":
          $scope.ANTT_CAL_ESTRUC_SOP = null;
          break;
        case "ANTT_POL_SEG":
          $scope.ANTT_POL_SEG = null;
          break;
        case "ANTT_CERT_AUT_TRIB":
          $scope.ANTT_CERT_AUT_TRIB = null;
          break;
        case "ANTT_CART_NOT":
          $scope.ANTT_CART_NOT = null;
          break;
        case "ANTT_PLAN_MIME":
          $scope.ANTT_PLAN_MIME = null;
          break;
        case "ANTT_PLAN_MANT":
          $scope.ANTT_PLAN_MANT = null;
          break;
        case "ANTT_EST_GEOLOGICO":
          $scope.ANTT_EST_GEOLOGICO = null;
          break;
        case "ANTT_PLAN_FORM_DIG":
          $scope.ANTT_PLAN_FORM_DIG = null;
          break;
        case "ANTT_PLAN_ALT_SOPORTE":
          $scope.ANTT_PLAN_ALT_SOPORTE = null;
          break;
        case "ANTT_PLAN_SITIO":
          $scope.ANTT_PLAN_SITIO = null;
          break;
        case "ANTT_PLAN_MED_PREV_SEG":
          $scope.ANTT_PLAN_MED_PREV_SEG = null;
          break;
        case "ANTT_DESC_ESQ_BALIZAMIENTO":
          $scope.ANTT_DESC_ESQ_BALIZAMIENTO = null;
          break;
        case "ANTT_DOC_AUT_LUG_ESP_PUB":
          $scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
          break;
        default:
      }
    }
  }
  $scope.mostrar_Req_rec = function (datarec) {
    $scope.tipoProp = datarec.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD;
    $scope.lstSoportesreq = datarec.GRD_ANTENAS[0].f01_GRD_SOPORTE;
    if ($scope.tipoProp != "DOMINIO MUNICIPAL") {
      var soprte_req = "";
      for (var i = 0; i < $scope.lstSoportesreq.length; i++) {
        soprte_req = $scope.lstSoportesreq[i].tipoSoporte;
        switch (soprte_req) {
          case "TORRETAS":
          case "TORRES":
          case "MONOPOSTES":
            $scope.habilitasoporte1_req1(datarec.File_Adjunto);
            break;
          case "MÁSTILES":
          case "POSTES":
          case "ADOSADOS":
            $scope.habilitasoporte_req2(datarec.File_Adjunto);
            break;
          case "PARA ANTENAS SATELITALES":
            $scope.habilitasoporte_req3(datarec.File_Adjunto);
            break;
          case "COW":
            $scope.habilitasoporte_req4(datarec.File_Adjunto);
            break;
          case "GABINETES":
            $scope.hab_sop_gabinete_req(datarec.File_Adjunto);
            break;
          default:
        }
      }
    } else {
      $scope.hab_sop_prop_mun_req(datarec.File_Adjunto);
    }
  }
  $scope.estadoTramite = "";
  $scope.datarenviada = "";
  $scope.grilla_rbmultiple_reenvio = [];
  $rootScope.asgnvalores = function (data, estado) {
    //////////////////  CODIGO MARAVILLA ///////////
    //$rootScope.datosIniciales  = data;
    $scope.btnEnviarFormLinea = true;
    $scope.fechaVerifica = obtFechaActual.obtenerFechaActual();
    $scope.fechaVerifica = $scope.fechaVerifica.split(" ")[0];
    $scope.fechaDia = $scope.fechaVerifica.split("-");
    $scope.dia = $scope.fechaDia[2];
    if ($scope.dia <= 9) {
      $scope.fechaVerifica = $scope.fechaDia[0] + "-" + $scope.fechaDia[1] + "-0" + $scope.dia;
    };
    $scope.infoReserva = $rootScope.datosIniciales;

    $scope.grilla_rbmultiple_reenvio = data;
    $scope.estadoTramite = estado;
    var filesAdjunto = JSON.parse(data[0].form_contenido);
    $scope.datarenviada = filesAdjunto;
    var data2 = JSON.parse(data[0].form_contenido);
    $('#f01_pri_nom_rep').val(data2.f01_pri_nom_rep);
    $('#f01_ape_pat_rep').val(data2.f01_ape_pat_rep);
    $('#f01_ape_mat_rep').val(data2.f01_ape_mat_rep);
    $('#f01_ape_cas_rep').val(data2.f01_ape_cas_rep);
    $('#f01_num_doc_rep').val(data2.f01_num_doc_rep);
    $('#f01_expedido_rep').val(data2.f01_expedido_rep);
    $('#f01_ges_vig_pod').val(data2.f01_ges_vig_pod);
    $scope.rutaArchEnvioLotus = data2.File_Adjunto;
    if (data2.g_tipo == "ANTT") {
      $scope.tipoReg = "R_UNICO";
    }
    if (data2.g_tipo == "RBM") {
      $scope.tipoReg = "R_MULTIPLE";
    }
    if (data2.g_tipo == "GM") {
      $scope.tipoReg = "G_MULTIPLE";
    }
    if (data2.g_tipo == "RG") {
      $scope.tipoReg = "G_UNICO";
    }
    $scope.getArchivosAdjuntos(filesAdjunto);
    if (estado == "NO") {
      $rootScope.botones = false;
      $rootScope.botonesrodolfo = true;
      $rootScope.botonesrodo = true;
      $scope.n_autorizacion_1 = false;
      $scope.n_autorizacion = false;
      $scope.tipoTramite = "REENVIO";
      $scope.dataRecuperadoCP = data;
      //$scope.mostrarReqfaltantes();
    } else {
      $rootScope.botones = true;
      $rootScope.botonesrodolfo = false;
      $rootScope.botonesrodo = true;
      $scope.n_autorizacion_1 = true;
      $scope.n_autorizacion = true;
      $scope.mostrarbtn_multiple = true;

      if ($scope.tipoReg == "G_UNICO") {
        $scope.mostrarRUGU = "mostrar";
        $scope.mostrarRMGM = true;
        $rootScope.tabAdj = false;
      }


    }

    var datas = data2.GRD_ANTENAS[0];
    $scope.valor = true;
    switch (datas.f01_TIPO_REGISTRO) {
      case "R_UNICO":
        mapas(sessionService.get('IDTRAMITE'));
        $("#idtramite").val(sessionService.get('IDTRAMITE'));

        $scope.n_autorizacion = true;
        $scope.n_autorizacion_1 = true;
        $scope.den_rbase = datas.ANT_NOM_RADBASE;

        $("#macrodistrito").val(datas.f01_Ubicacion.macrodistrito);
        $("#zona").val(datas.f01_Ubicacion.zona);
        $("#cod_catastral").val(datas.f01_Ubicacion.cod_catastral);
        $("#den_rbase").val(datas.ANT_NOM_RADBASE);
        $("#ub_rbase").val(datas.ANT_UBICA_RBASE);
        $("#tp_prop").val(datas.ANT_TIP_PROPIEDAD);
        $("#ln_ubicacion").val(datas.f01_LONGITUD);
        $("#den_ngabinete").val(datas.ANT_NRO_GAB);
        $("#observacion").val(datas.ANT_OBSERVACION);
        $("#latitud_reg").val(datas.ANT_LATITUD);
        $("#longitud_reg").val(datas.ANT_LOGITUD);
        $scope.radiobase_simple = "mostrar";
        $scope.lstSoporteprevio = datas.f01_GRD_SOPORTE;
        $scope.lstSoportes();

        if (estado == "NO") {
          $rootScope.botonesrodolfo = true;
          $rootScope.botonesrodo = false;
          $scope.mostrar_Req_rec(data2);
          $scope.mostrarbtn_multiple = true;
        } else {
          $rootScope.botonesrodolfo = false;
          $rootScope.botonesrodo = true;

        }
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.radiobas_env = "mostrar";
        $rootScope.soporteRU = true;
        $scope.mostrarRUGU = "mostrar";//false;
        $scope.mostrarbtn_multiple = false;
        $scope.radiobase_simple = "mostrar";
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;

        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;
        $scope.hab_boton_guardar = true;
        break;
      case "G_UNICO":
        $scope.radiobase_simple = "mostrar";
        mapas(sessionService.get('IDTRAMITE'));
        $("#idtramite").val(sessionService.get('IDTRAMITE'));
        $scope.n_autorizacion = true;
        $scope.n_autorizacion_1 = true;
        $scope.den_rbase = datas.ANT_NOM_RADBASE;

        $("#macrodistrito").val(datas.f01_Ubicacion.macrodistrito);
        $("#zona").val(datas.f01_Ubicacion.zona);
        $("#cod_catastral").val(datas.f01_Ubicacion.cod_catastral);
        $("#den_rbase").val(datas.ANT_NOM_RADBASE);
        $("#ub_rbase").val(datas.ANT_UBICA_RBASE);
        $("#tp_prop").val(datas.ANT_TIP_PROPIEDAD);
        $("#lt_ubicacion").val(datas.f01_LATITUD);
        $("#ln_ubicacion").val(datas.f01_LONGITUD);
        $("#den_ngabinete").val(datas.ANT_NRO_GAB);
        $("#observacion").val(datas.ANT_OBSERVACION);
        $("#latitud_reg").val(datas.ANT_LATITUD);
        $("#longitud_reg").val(datas.ANT_LOGITUD);

        if (datas.f01_GRD_SOPORTE != undefined) {
          $scope.lstSoporteprevio = datas.f01_GRD_SOPORTE;
          $scope.lstSoportes();
        }

        $scope.mostrarRUGU = "mostrar";//false;
        $scope.radiobase_simple = null;
        if (estado == "NO") {
          $scope.btnGuardarRegistro = false;
          $rootScope.botonesrodolfo = true;
          $rootScope.botonesrodo = true;
          //$scope.mostrar_Req_rec(data2);
          $scope.mostrarbtn_multiple = true;
          //$scope.radiobase_simple = null;

        } else {
          $rootScope.botonesrodolfo = false;
          $rootScope.botonesrodo = true;

        }
        $rootScope.mostrarRU = false;
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.radiobas_env = "mostrar";
        $rootScope.soporteRU = true;
        $scope.mostrarbtn_multiple = false;
        //$scope.radiobase_simple = "mostrar";
        $scope.mostrarRMGM = true;

        $scope.mostrarbtn_multiple = true;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;
        $scope.hab_boton_guardar = true;
        break;
      case "R_MULTIPLE":
        $scope.grilla_rbmultiple = data2.GRD_ANTENAS;
        $scope.dataGrillaM = angular.toJson($scope.grilla_rbmultiple);
        $scope.grilla_rbmultiple = JSON.parse($scope.dataGrillaM);
        $scope.lst_grilla_multiple();
        if (estado == "NO") {
          $scope.autoriza = null;
          $rootScope.botonesrodo = false;
          $rootScope.botonesrodolfo = true;
          if (data2.ANT_NRO_AUTORIZACION != "") {
            $scope.n_autorizacion_1 = true;
            $scope.n_autorizacion = false;
            $scope.chec_autorizacion = true;
            $scope.autoriza = "mostrar";
            $("#den_auto").val(data2.ANT_NRO_AUTORIZACION);
            $rootScope.rbase_multiple = false;
          } else {
            $scope.n_autorizacion = false;
            $scope.n_autorizacion_1 = true;
            $scope.chec_autorizacion = false;
          }
        } else {
          $scope.chec_autorizacion = true;
          $scope.n_autorizacion = true;
          $scope.n_autorizacion_1 = false;
          $("#den_auto1").val(data2.ANT_NRO_AUTORIZACION);

        }
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";
        $rootScope.radiobas_env = null;
        $rootScope.tabAdj = true;
        $scope.mostrarRUGU = null;//false;
        $scope.mostrarbtn_multiple = true;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = true;

        $scope.mostrarbtn_multiple = false;
        $scope.actualizarbtn_multiple = true;
        $scope.hab_boton_guardar = true;
        break;
      case "G_MULTIPLE":
        if (estado == "NO") {
          $scope.autoriza = null;
          $rootScope.botonesrodo = false;
          $rootScope.botonesrodolfo = true;
          if (data2.ANT_NRO_AUTORIZACION != "") {
            $scope.n_autorizacion_1 = true;
            $scope.n_autorizacion = false;
            $scope.chec_autorizacion = true;
            $scope.autoriza = "mostrar";
            $("#den_auto").val(data2.ANT_NRO_AUTORIZACION);
            //$rootScope.rbase_multiple = false; 
          } else {
            $scope.n_autorizacion = false;
            $scope.n_autorizacion_1 = true;
            $scope.chec_autorizacion = false;
          }
        } else {

          $scope.chec_autorizacion = true;
          $scope.n_autorizacion = true;
          $scope.n_autorizacion_1 = false;
          $("#den_auto1").val(data2.ANT_NRO_AUTORIZACION);

        }
        $scope.grilla_rbmultiple = data2.GRD_ANTENAS;
        $scope.dataGrillaM = angular.toJson($scope.grilla_rbmultiple);
        $scope.grilla_rbmultiple = JSON.parse($scope.dataGrillaM);
        $scope.lst_grilla_multiple();
        //$scope.tipoReg = "G_MULTIPLE";
        $rootScope.rbase_multiple = true;
        $rootScope.mostrardiv = null;
        $rootScope.mostrardivform = "mostrar";

        $scope.mostrarRUGU = null;
        $scope.mostrarbtn_multiple = true;
        $scope.radiobase_simple = null;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = true;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = false;
        $scope.mostrarbtn_multiple = false;
        $scope.actualizarbtn_multiple = true;
        $scope.hab_boton_guardar = true;
        $rootScope.tabAdj = true;

        break;

    }

    $scope.initMap();
    var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
    var detalle = datas.f01_DENOMINACION;
    beachMarker = new google.maps.Marker({
      position: { lat: parseFloat(datas.f01_LATITUD), lng: parseFloat(datas.f01_LONGITUD) },
      map: map,
      icon: image,
      title: detalle
    });
  }

  $scope.getArchivosAdjuntos = function (datos) {

    var archivosValidos = [];
    if (datos.File_Adjunto) {
      for (var i = 0; i < datos.File_Adjunto.length; i++) {
        archivo = ((typeof (datos.File_Adjunto[i]) == 'undefined' || datos.File_Adjunto[i] == null) ? "" : datos.File_Adjunto[i]);
        if (archivo != "") {
          archivosValidos.push(datos.File_Adjunto[i]);
        }
      };
      $scope.obtArchivosAdjuntos = archivosValidos;
    }

  };
  $scope.imprimirArchivo = function (fum) {
    var escudo = new Image();
    escudo.src = fum;
    $scope.varSpin = true;
    $scope.RegistroFUM = {
      registrado: 'OK',
      mensaje: ''
    };
    var cadena = fum;
    if (cadena.indexOf('?') != -1) {
      separador = '?';
      arreglodecadena = cadena.split(separador);
      cadena = arreglodecadena[0];
    }
    var tipoarch = cadena.substr(-4);
    var imagen = cadena.indexOf('.jpeg');
    if (tipoarch == '.PDF') {
      $scope.archotro = false;
      $scope.archpdf = true;
      $('#visorFum object').attr('data', fum);
      $timeout(function () { $scope.varSpin = false }, 1000);
    } else {
      var tipoimg = tipoarch.toUpperCase();
      if (tipoimg == '.BMP1' || tipoimg == '.GIF1' || tipoimg == '.gif') {
        $scope.archotro = true;
        $scope.archpdf = false;
        $scope.archivoP = fum;
        $('#imgSalida').attr("src", fum);
      } else {
        $('#docsVisor').modal('hide');
        $scope.archotro = false;
        $scope.archpdf = false;
        angular.element('#docsVisor').modal('hide');
        $('#docsVisor').modal().hide();
        $('.docsVisor').removeClass('show');
        window.open(fum, "visorMapa", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
      }
    }
  };
  $scope.eliminarArchivo = function (archivo, index) {
    swal({
      title: "¿Esta seguro de eliminar el Registro?",
      text: "",
      type: "warning", 
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    }, function () {
      $.blockUI();

      var nuevoAdjuntos = [];
      for (var i = 0; i < $scope.obtArchivosAdjuntos.length; i++) {
        if (i == index) {
          $scope.volverVisualizar($scope.obtArchivosAdjuntos[i].id_campo);
        }
      }
      $scope.obtArchivosAdjuntos.splice(index, 1);
      swal("Ok.", "El adjunto fue eliminado...", "success");
      for (var i = 0; i < $scope.obtArchivosAdjuntos.length; i++) {

        nuevoAdjuntos.push($scope.obtArchivosAdjuntos[i]);

      };
      $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.obtArchivosAdjuntos) + '}';
      $scope.rutaArchEnvioLotus = nuevoAdjuntos;
      $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
      $scope.obtArchivosAdjuntos = nuevoAdjuntos;
      $scope.datos.File_Adjunto = nuevoAdjuntos;
      $.unblockUI();
      $scope.$apply();
    });
  };
  $scope.volverVisualizar = function (requisito) {
    $rootScope.requistosfile = false;
    $scope.ANTT_PLAN_FORM_DIG = null;
    $scope.ANTT_AUT_ESC_COPROP = null;

    switch (requisito) {
      case "ANTT_CON_ARR":
        $scope.ANTT_CON_ARR = "mostrar";
        break;
      case "ANTT_CART_NOTARIADA":
        $scope.ANTT_CART_NOTARIADA = "mostrar";
        break;
      case "ANTT_AUT_ESC_COPROP":
        $scope.ANTT_AUT_ESC_COPROP = "mostrar";
        break;
      case "ANTT_DOC_AUT_LUG_ESP_PUB":
        $scope.ANTT_DOC_AUT_LUG_ESP_PUB = "mostrar";
        break;
      case "ANTT_LIC_AMB":
        $scope.ANTT_LIC_AMB = "mostrar";
        break;
      case "ANTT_CAL_ESTRUC_SOP":
        $scope.ANTT_CAL_ESTRUC_SOP = "mostrar";
        break;
      case "ANTT_POL_SEG":
        $scope.ANTT_POL_SEG = "mostrar";
        break;
      case "ANTT_CERT_AUT_TRIB":
        $scope.ANTT_CERT_AUT_TRIB = "mostrar";
        break;
      case "ANTT_CART_NOT":
        $scope.ANTT_CART_NOT = "mostrar";
        break;
      case "ANTT_PLAN_MIME":
        $scope.ANTT_PLAN_MIME = "mostrar";
        break;
      case "ANTT_PLAN_MANT":
        $scope.ANTT_PLAN_MANT = "mostrar";
        break;
      case "ANTT_EST_GEOLOGICO":
        $scope.ANTT_EST_GEOLOGICO = "mostrar";
        break;
      case "ANTT_INF_TEC_EMITIDO":
        $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
        $scope.ANTT_AUT_ESC_COPROP = null;
        break;
      case "ANTT_PLAN_FORM_DIG":
        $scope.ANTT_PLAN_FORM_DIG = "mostrar";
        if ($scope.tipoReg == "G_UNICO") {
          $scope.FORMATO_DIG_ADJ = "mostrar";
        }
        break;
      case "ANTT_INF_TEC_EMITIDO_GAB":
        $scope.ANTT_INF_TEC_EMITIDO_GAB = "mostrar";
        break;
      case "ANTT_PLAN_ALT_SOPORTE":
        $scope.ANTT_PLAN_ALT_SOPORTE = "mostrar";
        break;
      case "ANTT_PLAN_SITIO":
        $scope.ANTT_PLAN_SITIO = "mostrar";
        break;
      case "ANTT_PLAN_MED_PREV_SEG":
        $scope.ANTT_PLAN_MED_PREV_SEG = "mostrar";
        break;
      case "ANTT_DESC_ESQ_BALIZAMIENTO":
        $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
        break;
      case "ANTT_INF_TEC_POS":
        $scope.ANTT_INF_TEC_POS = "mostrar";
        break;
      case "ANTT_PLAN_DET_CONST_CAT":
        $scope.ANTT_PLAN_DET_CONST_CAT = "mostrar";
        break;
      case "ANTT_PLAN_CAR_GAB":
        $scope.ANTT_PLAN_CAR_GAB = "mostrar";
        break;
      case "ANTT_ADJ_AUTORIZACION":
        $scope.ANTT_ADJ_AUTORIZACION = "mostrar";
        break;
      default:
        texto = '';//$scope.tipoReg
    }

  }
  $scope.registroNuevo = function (data) {

    $scope.myVar = "Hello World!";
    $("#lt_ubicacion").val(data[0]);
    $("#ln_ubicacion").val(data[1]);
    $scope.den_rbase = "holaaaaaaa";

    var data_mapa = '{"latitud":"' + data[0] + '","longitud":"' + data[1] + '"}';
    $scope.initMap();
    $scope.listarmrcmapa(JSON.parse(data_mapa));

  }

  $scope.registra = function (datosR) {
    var vlongitud = $("#ant_longitud").val();
    var vlatitud = $("#ant_latitud").val();
    if (datosR != undefined) {
      if (datosR.den_rbase != undefined && datosR.nsoporte != undefined && datosR.n_radiantes != undefined && datosR.tp_prop != undefined && datosR.ngabinete != undefined && datosR.ub_rbase != undefined && datosR.tipo_sop != undefined && datosR.forma_sj != undefined && datosR.categoria != undefined && datosR.altura != undefined && datosR.ant_nombre != undefined) {
        var datai = '{"latitud": "' + vlatitud + '","longitud": "' + vlongitud + '","nombre": "' + datosR.ant_nombre + '","ciciudadano":' + sessionService.get('CICIUDADANO') + ',"ant_den_rbase": "' + datosR.den_rbase + '","ant_nsoporte": ' + datosR.nsoporte + ' ,"ant_nradiantes":' + datosR.n_radiantes + ' ,"ant_tppropiedad": "' + datosR.tp_prop + '","ant_ngabinete": ' + datosR.ngabinete + ' ,"ant_ubrbase":"' + datosR.ub_rbase + '","ant_tpsoporte": "' + datosR.tipo_sop + '","ant_frmsujecion": "' + datosR.forma_sj + '","ant_categoria": "' + datosR.categoria + '","ant_altura": ' + datosR.altura + '}';
        $scope.lstvista.push(JSON.parse(datai));
        swal('Ok!', 'Se completo el proceso de registro correctamente', 'success');
        $("#den_rbase").val("");
        $("#nsoporte").val("");
        $("#n_radiantes").val("");
        $("#tp_prop").val("");
        $("#ngabinete").val("");
        $("#ub_rbase").val("");
        $("#ant_nombre").val("");
        $("#tipo_sop").val("");
        $("#forma_sj").val("");
        $("#categoria").val("");
        $("#altura").val("");
        $scope.lstDatosIniciales(undefined);
        $scope.initMap();
        $scope.getCaptchasXX();
      } else {

        swal('Ups!', 'Es necesario completar todos los campos', 'error');
      }
    } else {
      swal('Ups!', 'Es necesario completar todos los campos', 'error');
    }
  }
  $scope.eliminar = function (dataR) {
    swal({
      title: "¿Esta seguro de eliminar el Registro?",
      text: "",
      type: "warning", 
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    }, function () {
      var elim_reg_Antena = new reglasnegocio();
      elim_reg_Antena.id = 272;
      elim_reg_Antena.parametros = '{"id_antena":' + dataR.id_antena + '}';
      elim_reg_Antena.llamarregla(function (data) {
        data = JSON.parse(data);
        if (data[0].ant_sp_elimina_antena_rc) {
          swal('Ok!', 'El registro se elimino correctamente', 'success');
          $scope.$apply();
          $scope.lstDatosIniciales();
          $scope.initMap();
        } else {
          swal('Error!', 'Se presento un problema al eliminar el registro', 'error');

        }
      });
    });
  }
  //implementacion de la capa dde google maps
  $scope.detalleData = function (dataR) {
    var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
    var latitud1 = parseFloat(dataR.latitud);
    var longitud1 = parseFloat(dataR.longitud);
    var haightAshbury = {
      lat: latitud1,//-16.493042595164994,//,"-16.495635"
      lng: longitud1//-68.14869144596389,//-68.133543
    };
    map = new google.maps.Map(document.getElementById('mapActividad'), {
      zoom: 15,
      center: haightAshbury
    });

    var detalle = dataR.nombre;//"qqqq";//data[i].nombre;
    beachMarker = new google.maps.Marker({
      position: { lat: latitud1, lng: longitud1 },
      map: map,
      icon: image,
      title: detalle
    });
    $scope.listarmarcadores("inicioss");
    $scope.nombrev = dataR.nombre;
    $scope.latitudv = dataR.latitud;
    $scope.longitudv = dataR.longitud;
    map.addListener('click', function (event) {
      $scope.deleteMarkers();
      $rootScope.laaa = event.latLng.lat();
      $rootScope.looo = event.latLng.lng();
      latLong[0] = $rootScope.laaa;
      latLong[1] = $rootScope.looo;
      $scope.addMarker(event.latLng);
      $scope.registroNuevo(latLong);
    });
  }
  $scope.refrescarDatos = function () {
    $scope.lstDatosIniciales();
    $scope.listarmarcadores("inicio");
    $scope.initMap();
  }


  //INCIO DE GOOGLE MAPS

  $scope.listarmrcmapa = function (datamapa) {
    var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
    beachMarker = new google.maps.Marker({
      position: { lat: parseFloat(datamapa.latitud), lng: parseFloat(datamapa.longitud) },
      map: map,
      icon: image,
      title: "detalle"
    });
  }

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
  var latLong = [];
  $scope.initMap = function () {
    var haightAshbury = {
      lat: -16.495635,//parseFloat(lat),//-16.493042595164994,//,"-16.495635"
      lng: -68.133543//parseFloat(long)//-68.14869144596389,//-68.133543
    };

    try {
      map = new google.maps.Map(document.getElementById('mapActividad'), {
        zoom: 15,
        center: haightAshbury
      });
      $scope.listarmarcadores("inicio");
      map.addListener('click', function (event) {
        $scope.deleteMarkers();
        $rootScope.laaa = event.latLng.lat();
        $rootScope.looo = event.latLng.lng();
        latLong[0] = $rootScope.laaa;
        latLong[1] = $rootScope.looo;
        $scope.addMarker(event.latLng);
        $scope.registroNuevo(latLong);

      });
    } catch (err) { }
  }
  $scope.listarmarcadores = function (datab) {
    var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
    var ci_ciudadano = sessionService.get('CICIUDADANO');
    if ($scope.puntosprevios == undefined) {
      data = $scope.lstvista;
      if (data != "") {
        for (var i = 0; i < data.length; i++) {
          var detalle = data[i].nombre;
          beachMarker = new google.maps.Marker({
            position: { lat: parseFloat(data[i].latitud), lng: parseFloat(data[i].longitud) },
            map: map,
            icon: image,
            title: detalle
          });
        }
      }

    } else {
      data = $scope.puntosprevios;
      if (data != "") {
        for (var i = 0; i < data.length; i++) {
          var detalle = data[i].nombre;
          beachMarker = new google.maps.Marker({
            position: { lat: parseFloat(data[i].latitud), lng: parseFloat(data[i].longitud) },
            map: map,
            icon: image,
            title: detalle
          });
        }
      }
    }
  }
  // Adds a marker to the map and push to the array.
  $scope.addMarker = function (location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  $scope.setMapOnAll = function (map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  $scope.clearMarkers = function () {
    $scope.setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  $scope.showMarkers = function () {
    $scope.setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  $scope.deleteMarkers = function () {
    $scope.clearMarkers();
    markers = [];
  }

  //FIN MAPAS DE GOOGLE 








  $scope.ultimoArrayAdjunto = function () {
    $scope.rcdata.push(JSON.parse('{ "tipo": "GRD", "campos": "f01_ADUL_G_CI|f01_ADUL_EXP_CIUD", "titulos": "CI|Exp.", "impresiones": "true|true|"}'));
    for (var i = 0; i < $scope.lstvista.length; i++) {
      $scope.rcdata.push($scope.lstvista[i]);
    }
    $rootScope.Antenas = $scope.rcdata;
  }


  ////////////////// registro radio base multiple /////////////////////////////////////
  $scope.lstSoporte_m = [];
  $scope.lstSoporteprevio_m = [];
  $scope.lstSoportes_m = function () {
    $scope.lstSoporte_m = $scope.lstSoporteprevio_m;
    var data = $scope.lstSoporteprevio_m;
    $scope.tb_lstSoporte_m.reload();
  }

  $scope.tb_lstSoporte_m = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.lstSoporte_m.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.lstSoporte_m, params.filter()) :
        $scope.lstSoporte_m;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.lstSoporte_m;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.grilla_rbm = [];
  $scope.grilla_rbmultiple = [];
  $scope.lst_grilla_multiple = function () {
    $scope.estadoTramite = sessionService.get('ESTADO');
    $scope.grilla_rbm = $scope.grilla_rbmultiple;
    var data = $scope.grilla_rbmultiple;
    $scope.tb_grilla_multiple.reload();
  }

  $scope.tb_grilla_multiple = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.grilla_rbm.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.grilla_rbm, params.filter()) :
        $scope.grilla_rbm;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.grilla_rbm;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  $scope.mostrarDet_m = function () {
    $scope.soporteRM = "mostrar";
    $scope.detalleRM = null;

  }
  $scope.resGabineteMultiple = null;
  
  $scope.inireg_rbMultiple = function () {

    $scope.mostrarRUGU = "mostrar";//false;
    $scope.mostrarbtn_multiple = false;
    $scope.actualizarbtn_multiple = true;
    $scope.mostrarRMGM = true;
    $rootScope.mostrarRU = false;
    $scope.btnGuardarRegistro = true;

    if ($scope.tipoReg == "R_MULTIPLE") {
      $scope.radiobase_simple = "mostrar";
      $rootScope.rbase_multiple = false;
      $scope.hab_boton_guardar = true;
      $scope.resGabineteMultiple = null;
    } else {
      $scope.hab_boton_guardar = false;
      $scope.radiobase_simple = null;
      $rootScope.rbase_multiple = true;
      $scope.resGabineteMultiple = "mostrar";
    }
    $scope.soporteRM = null;
    $scope.guardarbtn1 = "mostrar";

    //mapas(sessionService.get('IDTRAMITE'));
    mapas(0);
    //$scope.cargar_mapa();
    $scope.lst_grilla_multiple();
    $scope.lstSoporteprevio_m = [];
    $("#den_rbase").val("");
    $("#ub_rbase").val("");
    $("#tp_prop").val("");
    $("#lt_ubicacion").val("");
    $("#den_ngabinete").val("");
    $("#observacion").val("");
    $("#zona").val("");
    $("#macrodistrito").val("");
    $("#cod_catastral").val("");
    $("#den_auto").val("");
    $("#longitud_reg").val("");
    $("#latitud_reg").val("");
    $("#fecha_venRA").val("");

    $scope.lstSoporteprevio = [];
    $scope.lstSoportes();
    $scope.autoriza = null;
    $scope.chec_autorizacion = false;
    $rootScope.botones = true;
    document.getElementById("condiciones").checked = 0;
  }
  $scope.grilla_multiple = [];
  $scope.guardar_data = function (data) {
    if ($("#tipo_sop_m").val() != "" && $("#categoria_m").val() != "" && $("#forma_sj_m").val() != "" && $("#altura_m").val() != "" && $("#n_antenas_m").val() != "") {
      $scope.radianeslst = [];
      var datos;
      for (var i = 0; i < $scope.radianes.length; i++) {
        datos = '{"descripcion":"' + $scope.radianes[i].descripcion + '","tamanio":"' + $scope.radianes[i].tamanio + '"}';
        $scope.radianeslst.push(JSON.parse(datos));
      }
      var dataregistro = '{"tipoSoporte":"' + data.tipo_sop_m + '","categoria":"' + data.categoria_m + '","frmSujecion":"' + data.forma_sj_m + '","altura":"' + data.altura_m + '","nro_antenas":' + data.n_antenas_m + '}';
      $scope.lstSoporteprevio_m.push(JSON.parse(dataregistro));
      $scope.grilla_multiple = $scope.lstSoporteprevio_m;
      $("#tipo_sop_m").val("");
      $("#categoria_m").val("");
      $("#forma_sj_m").val("");
      $("#altura_m").val("");
      $("#n_antenas_m").val("");
      $scope.radianes = [];
      $scope.lstSoportes_m();
      $scope.soporteRM = null;
      $rootScope.rbase_multiple = false;//"mostrar";
    } else {
      swal("Error", "Para realizar el dettalle del soporte es necesario completar todos los campos Gracias", "error");

    }

  }
  $scope.close_datos = function () {
    $("#tipo_sop_m").val("");
    $("#categoria_m").val("");
    $("#forma_sj_m").val("");
    $("#altura_m").val("");
    $scope.radianes = [];
    $scope.lstSoportes_m();
    $scope.soporteRM = null;
    $rootScope.soporteRU = true;
    $rootScope.rbase_multiple = false;//"mostrar";
  }
  $scope.close_data_multiple = function (data) {

    $scope.mostrarRUGU = null;//true;
    $scope.mostrarbtn_multiple = true;
    $scope.radiobase_simple = null;
    $scope.mostrarRMGM = false;
    $rootScope.mostrarRU = true;
    $scope.btnGuardarRegistro = false;
    $rootScope.botones = false;
  }
  $scope.cargar_mapa = function () {
    $("#mapa1").empty();
    $("#ctlBusquedas").empty();
    $("#pal").text("BUSQUEDA");
    $("#msg1").empty();
    $("#results").empty();
    $("#dlgBusquedas").empty();
    $("#resultBusquedas").empty();
    graficar_mapa("mapa1");
  }

  $scope.lst_rb_multiples = [];
  $scope.reg_radiantes_multiple = function (data) {
    if (data != undefined) {
      if ($scope.tipoReg == "R_MULTIPLE") {
        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#den_ngabinete").val() != "" && data.den_rbase != undefined && $("#zona").val() != "" && data.den_ngabinete != undefined
          && data.tp_prop != undefined && data.ub_rbase != undefined && $scope.lstSoporteprevio.length > 0) {


          var ubicacionutm = $("#ln_ubicacion").val();
          ubicacionutm = ubicacionutm.split("(");
          ubicacionutm = ubicacionutm[1].split(")");
          ubicacionutm = ubicacionutm[0];
          var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
          dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val(), "latitud_extra": $("#latitud_reg").val(), "longitud_extra": $("#longitud_reg").val() };

          var dataGrilla = '{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","f01_DENOMINACION":"' + data.den_rbase + '","f01_UBI_RB":"' + data.ub_rbase + '","f01_TIPO_UBIC":"' + data.tp_prop + '","f01_Ubicacion":' + JSON.stringify(dataAnt1) + ',"f01_UbicacionUdit":' + JSON.stringify(dataUbi) + ',"f01_NRO_GABINETE":' + data.den_ngabinete + ',"cod_catastral":"' + $("#cod_catastral").val() + '","f01_GRILLA_SOPORTE":' + JSON.stringify($scope.lstSoporteprevio) + ',"f01_NRO_AUTORIZACION":"' + $("#den_auto").val() + '","ANTT_FECHA_VENCIMIENTO_RA":"' + $("#fecha_venRA").val() + '","estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}';
          var valor = $('#condiciones:checked').val();
          if (valor == 1) {
            if ($("#den_auto").val() != "" && $("#fecha_venRA").val() != "") {

              $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
              $scope.lst_grilla_multiple();
              $scope.lstSoporte_m = [];
              $scope.mostrarRUGU = null;
              $scope.mostrarbtn_multiple = true;
              $scope.radiobase_simple = null;
              $scope.lstSoporteprevio = [];
              $scope.lstSoportes();
              $scope.tipoProceso_envio = "RBM";
              $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
              $rootScope.botones = false;
              swal("Ok.", "Información Registrada exitosamente Gracias", "success");
              $scope.habilitaAdjuntosM();
              $("#den_rbase").val("");
              $("#ub_rbase").val("");
              $("#tp_prop").val("");
              $("#lt_ubicacion_m").val("");
              $("#ln_ubicacion_m").val("");
              $("#den_ngabinete").val("");
              $("#observacion").val("");
              $("#zona").val("");
              $("#macrodistrito").val("");
              $("#cod_catastral").val("");
              $("#den_auto").val("");
              $("#latitud_reg").val("");
              $("#longitud_reg").val("");
              $scope.cargar_mapa();
              document.getElementById("condiciones").checked = 0;
              $scope.autoriza = null;
              $scope.btnGuardarRegistro = false;
              $('#registroRBM').modal("hide");
              $scope.mostrarRMGM = false;
            } else {
              alertify.warning('Información Incompleta es Necesario Registrar el Número y Fecha de Vencimiento del R.A.');
            }
          } else {
            $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
            $scope.lst_grilla_multiple();
            $scope.lstSoporte_m = [];
            $scope.mostrarRUGU = null;
            $scope.mostrarbtn_multiple = true;
            $scope.radiobase_simple = null;
            $scope.lstSoporteprevio = [];
            $scope.lstSoportes();
            $scope.tipoProceso_envio = "RBM";
            $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
            $rootScope.botones = false;
            swal("Ok.", "Información Registrada exitosamente Gracias", "success");
            $scope.habilitaAdjuntosM();
            $("#den_rbase").val("");
            $("#ub_rbase").val("");
            $("#tp_prop").val("");
            $("#lt_ubicacion_m").val("");
            $("#ln_ubicacion_m").val("");
            $("#den_ngabinete").val("");
            $("#observacion").val("");
            $("#zona").val("");
            $("#macrodistrito").val("");
            $("#cod_catastral").val("");
            $("#den_auto").val("");
            $("#latitud_reg").val("");
            $("#longitud_reg").val("");
            $scope.cargar_mapa();
            document.getElementById("condiciones").checked = 0;
            $scope.autoriza = null;
            $scope.btnGuardarRegistro = false;
            $('#registroRBM').modal("hide");
            $scope.mostrarRMGM = false;
          }

        } else {
          alertify.warning('Por favor es Necesario completar todos los campos Gracias');
          ///swal("Error","Por favor es necesario completar todos los campos Gracias","error");

        }
      } else if ($scope.tipoReg == "G_MULTIPLE") {

        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#den_ngabinete").val() != "" && data.den_rbase != undefined && $("#zona").val() != "" && data.den_ngabinete != undefined
          && data.tp_prop != undefined && data.ub_rbase != undefined) {

          var ubicacionutm = $("#ln_ubicacion").val();
          ubicacionutm = ubicacionutm.split("(");
          ubicacionutm = ubicacionutm[1].split(")");
          ubicacionutm = ubicacionutm[0];
          var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '","latitud_extra":"' + $("#latitud_reg").val() + '","longitud_extra":"' + $("#longitud_reg").val() + '"}';
          dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
          var dataGrilla = '{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","f01_DENOMINACION":"' + data.den_rbase + '","f01_UBI_RB":"' + data.ub_rbase + '","f01_TIPO_UBIC":"' + data.tp_prop + '","f01_Ubicacion":' + JSON.stringify(dataAnt1) + ',"f01_UbicacionUdit":' + JSON.stringify(dataUbi) + ',"f01_NRO_GABINETE":' + data.den_ngabinete + ',"cod_catastral":"' + $("#cod_catastral").val() + '","f01_GRILLA_SOPORTE":' + JSON.stringify($scope.lstSoporteprevio) + ',"f01_NRO_AUTORIZACION":"' + $("#den_auto").val() + '","ANTT_FECHA_VENCIMIENTO_RA":"' + $("#fecha_venRA").val() + '","estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}';
          if ($('#condiciones:checked').val() == 1) {
            if ($("#den_auto").val() != "" && $("#fecha_venRA").val() != "") {
              $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
              $scope.lst_grilla_multiple();
              $scope.tipoProceso_envio = "GM";
              $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
              $scope.lstSoporte_m = [];
              $scope.mostrarRUGU = null;//true;
              $scope.mostrarbtn_multiple = true;
              $scope.radiobase_simple = null;
              $scope.lstSoporteprevio_m = [];
              $scope.habilitaAdjuntosM();
              $("#den_rbase").val("");
              $("#ub_rbase").val("");
              $("#tp_prop").val("");
              $("#zona").val("");
              $("#macrodistrito").val("");
              $("#den_ngabinete").val("");
              $("#observacion").val("");
              $("#latitud_reg").val("");
              $("#longitud_reg").val("");
              $scope.cargar_mapa();
              $('#registroRBM').modal("hide");
              swal("Ok.", "Información Registrada exitosamente Gracias", "success");
              $scope.mostrarRMGM = false;
              $("#den_auto").val("");
              document.getElementById("condiciones").checked = 0;
              $scope.autoriza = null;
              $scope.btnGuardarRegistro = false;
              $rootScope.botones = false;
            }else{

              alertify.warning('Información Incompleta es Necesario Registrar el Número y Fecha de Vencimiento del R.A.');
            }
          }else{
            $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
            $scope.lst_grilla_multiple();
            $scope.tipoProceso_envio = "GM";
            $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
            $scope.lstSoporte_m = [];
            $scope.mostrarRUGU = null;//true;
            $scope.mostrarbtn_multiple = true;
            $scope.radiobase_simple = null;
            $scope.lstSoporteprevio_m = [];
            $scope.habilitaAdjuntosM();
            $("#den_rbase").val("");
            $("#ub_rbase").val("");
            $("#tp_prop").val("");
            $("#zona").val("");
            $("#macrodistrito").val("");
            $("#den_ngabinete").val("");
            $("#observacion").val("");
            $("#latitud_reg").val("");
            $("#longitud_reg").val("");
            $scope.cargar_mapa();
            $('#registroRBM').modal("hide");
            swal("Ok.", "Información Registrada exitosamente Gracias", "success");
            $scope.mostrarRMGM = false;
            $("#den_auto").val("");
            document.getElementById("condiciones").checked = 0;
            $scope.autoriza = null;
            $scope.btnGuardarRegistro = false;
            $rootScope.botones = false;
          }

        } else {
          alertify.warning('Por favor es Necesario completar todos los campos Gracias');
          //swal("Error","Por favor es necesario completar todos los campos Gracias","error");

        }
      }

    } else {

      swal("Error", "Por favor es necesario completar todos los campos Gracias", "error");
    }
    
  }


  $rootScope.datosIniciales_previaG = [];
  $scope.guardarGrillaMultiple = function (grillaMultiple) {
    $scope.grilla_revisada = [];

    $rootScope.datosIniciales_previaG = $rootScope.datosIniciales;
    var fechactual = obtFechaActual.obtenerFechaActual();
    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
    $rootScope.datosIniciales_previaG.ANT_NRO_AUTORIZACION = "";//$("#den_auto").val();
    $rootScope.datosIniciales_previaG.g_fecha = fechactual;
    $rootScope.datosIniciales_previaG.g_tipo = $scope.tipoProceso_envio;
    $rootScope.datosIniciales_previaG.File_Adjunto = "";
    $rootScope.datosIniciales_previaG.File_Adjunto = $scope.rutaArchEnvioLotus;
    $rootScope.datosIniciales_previaG.INT_FORM_ALMACENADO = "G";
    $rootScope.datosIniciales_previaG.f01_tipo_per = 'J';
    $rootScope.datosIniciales_previaG.f01_tipo_per_desc = 'JURIDICO';
    $rootScope.datosIniciales_previaG.ANT_TIPO_PERSONA = '2';
    $rootScope.datosIniciales_previaG.ANT_NIT = $rootScope.datosIniciales.f01_num_doc_per_jur;
    $rootScope.datosIniciales_previaG.ANT_RAZ_SOC = $rootScope.datosIniciales.f01_raz_soc_per_jur;
    $rootScope.datosIniciales_previaG.ANT_NUM_PODER = $rootScope.datosIniciales.f01_poder_representante;
    $rootScope.datosIniciales_previaG.ANT_NUM_PODER = $rootScope.datosIniciales.f01_ges_vig_pod;
    $rootScope.datosIniciales_previaG.ANT_EMP_TEL = "";
    $rootScope.datosIniciales_previaG.ANT_NUM_NOTARIA = $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
    $rootScope.datosIniciales_previaG.ANT_EMP_CEL = "";
    $rootScope.datosIniciales_previaG.ANT_EMP_CORREO = "";
    $rootScope.datosIniciales_previaG.ANT_NUM_CI = $rootScope.datosIniciales.f01_num_doc_per_jur;
    $rootScope.datosIniciales_previaG.ANT_NOM = $rootScope.datosIniciales.f01_pri_nom_rep; + " " + $rootScope.datosIniciales.f01_seg_nom_rep;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
    $rootScope.datosIniciales_previaG.ANT_PAT = $rootScope.datosIniciales.f01_ape_pat_rep;
    $rootScope.datosIniciales_previaG.ANT_MAT = $rootScope.datosIniciales.f01_ape_mat_rep;
    $rootScope.datosIniciales_previaG.ANT_CAS = $rootScope.datosIniciales.f01_ape_cas_rep;
    $rootScope.datosIniciales_previaG.ANT_DOM = $rootScope.datosIniciales.f01_zon_rep_valor;
    $rootScope.datosIniciales_previaG.ANT_CELU = $rootScope.datosIniciales.f01_cel_rep;
    $rootScope.datosIniciales_previaG.ANT_TEL = $rootScope.datosIniciales.f01_telef_rep;
    $rootScope.datosIniciales_previaG.ANT_MAIL = $rootScope.datosIniciales.f01_email_rep;
    $rootScope.datosIniciales_previaG.f01_macro_act = 1;
    var json = angular.toJson(grillaMultiple);

    grillaMultiple = JSON.parse(json);
    for (let index = 0; index < grillaMultiple.length; index++) {
      const element = JSON.stringify(grillaMultiple[index]);
      $scope.grilla_revisada.push(JSON.parse(element));
    }
    $rootScope.datosIniciales_previaG.GRD_ANTENAS = $scope.grilla_revisada;//$rootScope.Antenas_multiple;
    try {
      $rootScope.datosIniciales = $rootScope.datosIniciales_previaG;//JSON.parse(datosGradarCd);
      var datosSerializados = JSON.stringify($rootScope.datosIniciales_previaG);
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      var idServicio = sessionService.get('IDSERVICIO');
      var Parametros = new datosFormularios();
      Parametros.frm_tra_dvser_id = idServicio;
      Parametros.data_json = datosSerializados;
      Parametros.frm_tra_id_ciudadano = idCiudadano;
      Parametros.frm_tra_id_usuario = 1;
      Parametros.frm_idTramite = idTramite;
      $rootScope.btnGuardarForm = true;
      $.blockUI();
      Parametros.sp_crear_datos_formulario(function (results) {
        results = JSON.parse(results);
        results = results.success;
        if (results.length > 0) {
          $.unblockUI();

        } else {
          $.unblockUI();
          //$scope.btnEnviarFormLinea    =   true;
        }
      });
    } catch (e) {
      $scope.btnGuardarForm = false;
      $.unblockUI();
    }
  }
  $scope.habilitaAdjuntosM = function () {
    if ($scope.tipoReg == "R_MULTIPLE") {
      $rootScope.radiobas_env = "mostrar";
      $rootScope.requisitos = "mostrar";
      $rootScope.grillaRM = "mostrar";
      $scope.mostrarRequisitos($scope.grilla_rbmultiple);

    }
  }
  $rootScope.requisitosrbase = null;

  $scope.mostrarRequisitos = function (objeto) {
    $rootScope.requisitosrbase = "mostrar";
    $scope.torres_torretas_monoposte = null;
    $scope.mastiles_postes = null;
    $scope.cow = null;
    $scope.antsatelites = null;
    for (var i = 0; i < objeto.length; i++) {
      var data = objeto[i].f01_GRILLA_SOPORTE;
      for (var j = 0; j < data.length; j++) {

        switch (data[j].tipoSoporte) {
          case "TORRES":
          case "MONOPOSTES":
          case "TORRETAS":

            $scope.torres_torretas_monoposte = "mostrar";

            break;
          case "MÁSTILES":
          case "POSTES":

            $scope.mastiles_postes = "mostrar";
            break;
          case "COW":

            $scope.cow = "mostrar";
            break;
          case "PARA ANTENAS SATELITALES":
            $scope.antsatelites = "mostrar";
            break;
          case "GABINETES":
            $scope.antsatelites = "mostrar";
            break;
        }
      }
    }
  }
  $scope.elim_reg_radiobase = function (datos, posicion) {
    swal({
      title: "¿Esta seguro de eliminar el Registro?",
      text: "",
      type: "warning", 
      showCancelButton:   true,
      cancelButtonText:   "Cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText:  "Si, Eliminar!",
      closeOnConfirm:     false
    }, function () {
      swal('Ok!', 'El registro se elimino correctamente', 'success');
      $scope.grilla_rbmultiple.splice(posicion, 1);
      $scope.lst_grilla_multiple();
    });
  }
  $scope.fecha_venRATexto = true;
  $scope.det_grilla_multiple = function (data,pos_grilla) {
    try {
      $scope.btnGuardarRegistro = true;
      $scope.resGabineteMultiple = null;
      $("#den_rbase").val(data.f01_DENOMINACION);
      $("#ub_rbase").val(data.f01_UBI_RB);
      $("#tp_prop").val(data.f01_TIPO_UBIC);
      $("#lt_ubicacion").val(data.f01_LATITUD);
      $("#den_ngabinete").val(data.f01_NRO_GABINETE);
      if (data.ANT_OBSERVACION == undefined) {
        $("#observacion").val(data.observacion);
      } else {
        $("#observacion").val(data.ANT_OBSERVACION);
      }
      $("#latitud_reg").val(data.ANT_LATITUD);
      $("#longitud_reg").val(data.ANT_LOGITUD);
      $scope.ubicacion = data.f01_Ubicacion;
      var puntosxy = $scope.ubicacion;
      puntosxy = puntosxy.ubicacion.split(" ");
      grafica_XY(puntosxy[0], puntosxy[1]);
      $("#zona").val($scope.ubicacion.zona);
      $("#macrodistrito").val($scope.ubicacion.macrodistrito);
      $("#cod_catastral").val($scope.ubicacion.cod_catastral);
      $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
      $scope.tipoReg == data.f01_TIPO_REGISTRO;
      if (data.f01_NRO_AUTORIZACION != "") {
        $scope.autoriza = "mostrar";
        $scope.chec_autorizacion = false;
        $("#den_auto").val(data.f01_NRO_AUTORIZACION);
        $("#fecha_venRA").val(data.ANTT_FECHA_VENCIMIENTO_RA);
        document.getElementById("condiciones").checked = 1;
        $scope.fecha_venRATexto = false;
      } else {
        $scope.autoriza = null;
        $scope.chec_autorizacion = false;
        document.getElementById("condiciones").checked = 0;
        $("#den_auto").val("");

      }
      $scope.lstSoporteprevio = [];
      $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
      $scope.lstSoportes();
      $scope.posicion = pos_grilla;
      if ($scope.tipoReg == "R_MULTIPLE") {
        $scope.radiobase_simple = "mostrar";
        $scope.actualizarbtn_multiple = true;
        $scope.hab_boton_guardar = true;
        $scope.guardarbtn1 = "mostrar";

      } else {
        if ($scope.tipoReg == "G_MULTIPLE") {
          $scope.resGabineteMultiple = "mostrar";
          $scope.actualizarbtn_multiple = true;
          $scope.hab_boton_guardar = true;
          $scope.guardarbtn1 = "mostrar";

        } else {
          $scope.radiobase_simple = null;
          $scope.actualizarbtn_multiple = false;
          $scope.hab_boton_guardar = true;
        }
      }
      $scope.mostrarRUGU = "mostrar";//false;
      $scope.mostrarbtn_multiple = true;
      $scope.mostrarRMGM = true;
      $rootScope.mostrarRU = false;
      $scope.actualizarbtn_multiple = false;

    } catch (e) {
      console.log("Error", e);
    }
  }

  $scope.enviarTRamiteRBM = true;
  $scope.verTRamiteRBM = true;
  $scope.det_grilla_multiple_vista = function (data,pos_grillaM) {
    try {
      $rootScope.tabAdj = true;
      $scope.enviarTRamiteRBM = false;
      $scope.verTRamiteRBM = true;
      $scope.observarData = false;
      $scope.btnGuardarRegistro = true;
      $scope.mostrarbtn_multiple = true;
      $("#den_rbase").val(data.f01_DENOMINACION);
      $("#ub_rbase").val(data.f01_UBI_RB);
      $("#tp_prop").val(data.f01_TIPO_UBIC);
      $("#lt_ubicacion").val(data.f01_LATITUD);
      $("#den_ngabinete").val(data.f01_NRO_GABINETE);
      if (data.ANT_OBSERVACION == undefined) {
        $("#observacion").val(data.observacion);
      } else {
        $("#observacion").val(data.ANT_OBSERVACION);
      }

      $("#latitud_reg").val(data.ANT_LATITUD);
      $("#longitud_reg").val(data.ANT_LOGITUD);
      $scope.ubicacion = data.f01_Ubicacion;
      var puntosxy = $scope.ubicacion;
      puntosxy = puntosxy.ubicacion.split(" ");
      grafica_XY(puntosxy[0], puntosxy[1]);
      $("#zona").val($scope.ubicacion.zona);
      $("#macrodistrito").val($scope.ubicacion.macrodistrito);
      $("#cod_catastral").val($scope.ubicacion.cod_catastral);
      $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
      $scope.tipoReg == data.f01_TIPO_REGISTRO;
      if (data.f01_NRO_AUTORIZACION != "") {
        $scope.autoriza = "mostrar";
        $scope.n_autorizacion = false;
        $scope.chec_autorizacion = true;
        $("#den_auto").val(data.f01_NRO_AUTORIZACION);
        document.getElementById("condiciones").checked = 1;
        $("#fecha_venRA").val(data.ANTT_FECHA_VENCIMIENTO_RA);
        $scope.fecha_venRATexto = false;
      } else {
        $scope.autoriza = null;
        $scope.chec_autorizacion = false;
        $scope.n_autorizacion = true;
        document.getElementById("condiciones").checked = 0;
      }
      $scope.lstSoporteprevio = [];
      $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
      $scope.lstSoportes();
      $scope.posicion = pos_grillaM;
      if ($scope.tipoReg == "R_MULTIPLE") {
        $scope.mostrarRU = false;
        $scope.radiobase_simple = "mostrar"
        $rootScope.botonesrodolfo = false;

      } else {
        $scope.radiobase_simple = null;
        $scope.actualizarbtn_multiple = false;
        $scope.hab_boton_guardar = true;


      }
      if (data.estadoTramite == "ENVIADO") {
        $rootScope.tabAdj = false;
        $scope.archEnvPos1 = [];
        $scope.archguardaenv = data.AdjuntosTramite;
        for (var i = 0; i < $scope.archguardaenv.length; i++) {

          $scope.archEnvPos1.push($scope.archguardaenv[i]);

        };
        $scope.obtArchivosAdjuntos = $scope.archEnvPos1;
      }
      $scope.mostrarRUGU = "mostrar";//false;
      //$scope.mostrarbtn_multiple = true;
      $scope.mostrarRMGM = true;
      $rootScope.mostrarRU = false;
      $scope.actualizarbtn_multiple = true;

    } catch (e) {
      console.log("Error", e);
    }
  }
  $scope.actualizar_multiple = function (data) {
    $scope.grilla_edita_multiple = [];
    if ($scope.tipoReg == "R_MULTIPLE") {
      for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
        if (i == $scope.posicion) {
          var ubicacionutm = $("#ln_ubicacion").val();
          ubicacionutm = ubicacionutm.split("(");
          if (ubicacionutm.length == 2) {
            ubicacionutm = ubicacionutm[1].split(")");
            ubicacionutm = ubicacionutm[0];
          } else {
            ubicacionutm = ubicacionutm[0];
          }
          var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
          dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
          var nro_autorizacion = "";
          if ($('#condiciones:checked').val() == 1) {
            nro_autorizacion = $("#den_auto").val();
          } else {
            nro_autorizacion = "";
            $("#fecha_venRA").val("");
          }
          var dataGrilla = '{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '", "f01_DENOMINACION":"' + $("#den_rbase").val() + '", "f01_UBI_RB":"' + $("#ub_rbase").val() + '", "f01_TIPO_UBIC":"' + $("#tp_prop").val() + '", "f01_Ubicacion":' + JSON.stringify(dataAnt1) + ', "f01_UbicacionUdit":' + JSON.stringify(dataUbi) + ', "f01_NRO_GABINETE":' + $("#den_ngabinete").val() + ', "cod_catastral":"' + $("#cod_catastral").val() + '", "f01_GRILLA_SOPORTE":' + JSON.stringify($scope.lstSoporteprevio) + ', "f01_NRO_AUTORIZACION":"' + nro_autorizacion + '",  "ANTT_FECHA_VENCIMIENTO_RA":"' +$("#fecha_venRA").val() + '", "estadoTramite":"NO ENVIADO", "fecha_envio":"SIN FECHA", "ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '" }';
          $scope.grilla_edita_multiple.push(JSON.parse(dataGrilla));

        } else {
          $scope.grilla_edita_multiple.push($scope.grilla_rbmultiple[i]);
        }
        $scope.tipoProceso_envio = "RBM";

      }
    } else {
      for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
        if (i == $scope.posicion) {
          var ubicacionutm = $("#ln_ubicacion").val();
          ubicacionutm = ubicacionutm.split("(");
          if (ubicacionutm.length == 2) {
            ubicacionutm = ubicacionutm[1].split(")");
            ubicacionutm = ubicacionutm[0];
          } else {
            ubicacionutm = ubicacionutm[0];
          }
          var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
          dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
          var nro_autorizacion = "";
          if ($('#condiciones:checked').val() == 1) {
            nro_autorizacion = $("#den_auto").val();

          } else {
            nro_autorizacion = "";
            $("#fecha_venRA").val("");
          }
          var dataGrilla = '{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","f01_DENOMINACION":"' + $("#den_rbase").val() + '","f01_UBI_RB":"' + $("#ub_rbase").val() + '","f01_TIPO_UBIC":"' + $("#tp_prop").val() + '","f01_Ubicacion":' + JSON.stringify(dataAnt1) + ',"f01_UbicacionUdit":' + JSON.stringify(dataUbi) + ',"f01_NRO_GABINETE":' + $("#den_ngabinete").val() + ',"cod_catastral":"' + $("#cod_catastral").val() + '","f01_GRILLA_SOPORTE":' + JSON.stringify($scope.lstSoporteprevio) + ',"f01_NRO_AUTORIZACION":"' + nro_autorizacion + '", "ANTT_FECHA_VENCIMIENTO_RA":"' +$("#fecha_venRA").val() + '", "estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}';
          $scope.grilla_edita_multiple.push(JSON.parse(dataGrilla));

        } else {
          $scope.grilla_edita_multiple.push($scope.grilla_rbmultiple[i]);
        }
        $scope.tipoProceso_envio = "GM";
      }

    }
    if ($('#condiciones:checked').val() == 1) {
      if ($("#den_auto").val() != "" && $("#fecha_venRA").val() != "") {
        $scope.grilla_rbmultiple = [];
        $scope.grilla_rbmultiple = $scope.grilla_edita_multiple;
        $scope.dataGrillaM = angular.toJson($scope.grilla_rbmultiple);
        $scope.grilla_rbmultiple = JSON.parse($scope.dataGrillaM);
        $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
        swal('Ok!', 'La actualización del Registro se realizo correctamente', 'success');
        $scope.cargar_mapa();
        $scope.lst_grilla_multiple();
        $scope.btnGuardarRegistro = false;
        $scope.radiobase_simple = null;
        $scope.mostrarRUGU = null;//false;
        $scope.mostrarbtn_multiple = false;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = false;
        $scope.actualizarbtn_multiple = true;
      }else{

        alertify.warning('Información Incompleta es Necesario Registrar el Número y Fecha de Vencimiento del R.A.');
      }


    }else{
        $scope.grilla_rbmultiple = [];
        $scope.grilla_rbmultiple = $scope.grilla_edita_multiple;
        $scope.dataGrillaM = angular.toJson($scope.grilla_rbmultiple);
        $scope.grilla_rbmultiple = JSON.parse($scope.dataGrillaM);
        $scope.guardarGrillaMultiple($scope.grilla_rbmultiple);
        swal('Ok!', 'La actualización del Registro se realizo correctamente', 'success');
        $scope.cargar_mapa();
        $scope.lst_grilla_multiple();
        $scope.btnGuardarRegistro = false;
        $scope.radiobase_simple = null;
        $scope.mostrarRUGU = null;//false;
        $scope.mostrarbtn_multiple = false;
        $scope.mostrarRMGM = false;
        $rootScope.mostrarRU = false;
        $scope.actualizarbtn_multiple = true;
    }
  }
  $scope.close_editar_multiple = function () {
    $scope.radiobase_simple = null;
    $scope.mostrarRUGU = null;//false;
    $scope.mostrarbtn_multiple = false;
    $scope.mostrarRMGM = false;
    $rootScope.mostrarRU = false;
    $scope.actualizarbtn_multiple = true;
    $scope.btnGuardarRegistro = false;
    $scope.observarData = true;
    $scope.cargar_mapa();
    $rootScope.tabAdj = true;
  }
  $scope.verfifcarTipo = function () {
    var tipo_prop = $("#tipo_propiedad").val();
    if (tipo_prop == "SI") {
      $scope.opcion1 = "mostrar";
      $scope.opcion2 = null;
      $scope.opciones = "mostrar";
    }
    if (tipo_prop == "NO") {
      $scope.opcion1 = null;
      $scope.opcion2 = "mostrar";
      $scope.opciones = "mostrar";

    }

  }
  $scope.eliminarSoportemultiple = function (datos, posicion) {

    $scope.lstSoporteprevio_m.splice(posicion, 1);
    $scope.lstSoportes_m();
  }

  $scope.initMap1 = function () {
    var haightAshbury = {
      lat: -16.495635,//parseFloat(lat),//-16.493042595164994,//,"-16.495635"
      lng: -68.133543//parseFloat(long)//-68.14869144596389,//-68.133543
    };

    try {
      map = new google.maps.Map(document.getElementById('mapActividad2'), {
        zoom: 15,
        center: haightAshbury
      });
      $scope.listarmarcadores("inicio");
      map.addListener('click', function (event) {
        $scope.deleteMarkers();
        $rootScope.laaa = event.latLng.lat();
        $rootScope.looo = event.latLng.lng();
        latLong[0] = $rootScope.laaa;
        latLong[1] = $rootScope.looo;
        $scope.addMarker(event.latLng);
        $scope.registroNuevo_m(latLong);

      });
    } catch (err) { }
  }

  $scope.botonesHabilita = function () {
    $scope.soporteRM = "mostrar";
    $rootScope.rbase_multiple = true;
  }
  $scope.registroNuevo_m = function (data) {
    $("#lt_ubicacion_m").val(data[0]);
    $("#ln_ubicacion_m").val(data[1]);
    var data_mapa = '{"latitud":"' + data[0] + '","longitud":"' + data[1] + '"}';
    $scope.initMap1();
    $scope.listarmrcmapa(JSON.parse(data_mapa));
  }
  $scope.habGuardar = true;
  $scope.btnEnviarFormLinea = true;
  $scope.getCaptchasX = function () {
    $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
    $scope.resultadoC = "";
    var objCaptcha = new captcha();
    objCaptcha.obtcaptcha(function (resultado) {
      json = JSON.parse(resultado);
      partes = json.success[0].sp_captcha_porx1.split(',');
      numero = partes[0].substring(1);
      i1 = (partes[2] + "," + partes[3]);
      i2 = (partes[4] + "," + partes[5]);
      $scope.imageLNG = i1.substring(1, i1.length - 1);
      $scope.imageCST = i2.substring(1, i2.length - 2);
      var lengua = "";
      if (partes[1] == 'A') {
        lengua = 'AYMARA';
      } else if (partes[1] == 'Q') {
        lengua = 'QUECHUA';
      } else if (partes[1] == 'G') {
        lengua = 'GUARANI';
      } else if (partes[1] == 'C') {
        lengua = 'CASTELLANO';
      }
      $scope.toltipTt = "Palabra en " + lengua;
      $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
    });
  };
  $scope.getCaptchasXX = function () {
    $("#resultadoCC").val("");
    $scope.habGuardar = true;
    $scope.validarAdjuntos = true;
    $scope.ErrorCapchasXX = "";
    $scope.SuccesCapchasxx = "";
    $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
    $scope.resultadoCC = "";
    var objCaptcha = new captcha();
    objCaptcha.obtcaptcha(function (resultado) {
      json = JSON.parse(resultado);
      partes = json.success[0].sp_captcha_porx1.split(',');
      numero1 = partes[0].substring(1);
      i1 = (partes[2] + "," + partes[3]);
      i2 = (partes[4] + "," + partes[5]);
      $scope.imageLNGG = i1.substring(1, i1.length - 1);
      $scope.imageCSTT = i2.substring(1, i2.length - 2);
      var lengua = "";
      if (partes[1] == 'A') {
        lengua = 'AYMARA';
      } else if (partes[1] == 'Q') {
        lengua = 'QUECHUA';
      } else if (partes[1] == 'G') {
        lengua = 'GUARANI';
      } else if (partes[1] == 'C') {
        lengua = 'CASTELLANO';
      } else
        $scope.toltipTt = "Palabra en " + lengua;
      $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
    });
  };
  $scope.lmpCaptcha = function (datos) {
    $scope.ErrorCapcha = '';
  }
  var numero = 0;
  $scope.VerificarCapcha = function (responce, resp) {
    $scope.habGuardar = true;
    var captch = $("#resultadoC").val();
    var id = numero;
    var verCaptcha = new captcha();
    verCaptcha.identificador = id;
    verCaptcha.respuesta = captch;
    verCaptcha.verificarCaptcha(function (resultado) {
      json = JSON.parse(resultado);
      if (json.success[0] == undefined) {
        $scope.getCaptchasX();
        $scope.ErrorCapcha = 'Error en el captcha intentar de nuevo por favor';
      } else {
        $scope.confirmarServicioGamlp(responce, resp);
      }
    });
    $scope.getCaptchasX();
  };
  $scope.arrayfiles = [];

  $scope.continuar47 = null; $scope.continuar48 = null; $scope.continuar49 = null;

  $scope.c_solicitud = 0;  //requisitos
  $scope.c_requisito2 = 0; //torres torretas monopostes mastiles y postes
  $scope.c_requisito3 = 0; //mastiles postes
  $scope.c_requisito4 = 0; //torres torretas monopostes
  $scope.c_requisito5 = 0;  // cow
  $scope.c_requisito6 = 0;  //gabinete
  $scope.c_requisito7 = 0;  //gabinete unico
  $scope.vald_requisitos = function (datanro, valida) {
    $scope.rutaArchivoDoc = "req_Antenas/";
    $scope.nombre;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.rutaArchivoDoc + "Adjunto";
    $scope.file;
    $scope.fileverif;


    if ($scope.fileverif != undefined) {
      $ex = $scope.file.type.split("/");
      if ($ex[1] == "pdf" || $ex[1] == "jpeg" || $ex[1] == "jpg" || $ex[1] == "png") {

        var nombreFile = $scope.file.name;
        var extension = $scope.file.type;
        extension = extension.split("/");
        var tamaño = $scope.file.size;
        tamaño = tamaño.toString();
        var cadenaURL = uploadUrl + $scope.file.name + '?app_name=' + CONFIG.APP_NAME;
        var parAdjunto = '{"campo":"' + $scope.file.name + '","nombre":"' + $scope.nombre + '","url":"' + cadenaURL + '","posicion":"' + datanro + '"}';
        $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
        $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.rutaArchEnvioLotus) + '}';
        $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
        $scope.direccionvirtual = CONFIG.APIURL + "/files/" + $scope.rutaArchivoDoc;
        var cadenaURI = $scope.direccionvirtual + "/" + $scope.file.name;
        fileUpload.uploadFileToUrl($scope.file, uploadUrl);
        swal("OK!", "El documento fue adicionado exitosamente gracias.", "success");
      } else {
        swal("Error", "El archivo que selecciono no es de extension(.pdf, .jpeg, .jpg, .png), vuelva a seleccionar otro archivo por favor gracias.", "error");
      }

    } else {
      swal("Error", "Debe seleccionar un archivo por favor gracias.", "error");
    }
  }
  $scope.validaTipo = function (file) {
    if (file != undefined) {
      $ex = file.type.split("/");
      if ($ex[1] == "pdf" || $ex[1] == "jpeg" || $ex[1] == "jpg" || $ex[1] == "png") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  $scope.n_soporte = null;
  $scope.g_soporte = "mostrar";

  $scope.dividirtabla = function (num) {
    if (num == 1) {

      $scope.n_soporte = "mostrar";
      $scope.g_soporte = null;
    } else {
      $scope.n_soporte = null;
      $scope.g_soporte = "mostrar";
    }
  }

  $scope.torres_torretas_monoposte = null;
  $scope.mastiles_postes = null;
  $scope.cow = null;
  $scope.antsatelites = null;
  $scope.activarAdjuntos = function (valor) {
    $scope.arrayfiles = [];
    switch (valor) {
      case "MASTILES":
        $scope.mastiles_postes = "mostrar";
        $scope.torres_torretas_monoposte = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        break;
      case "MONOPOSTES":
        $scope.torres_torretas_monoposte = "mostrar";
        $scope.mastiles_postes = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        break;
      case "TORRES":
        $scope.torres_torretas_monoposte = "mostrar";
        $scope.mastiles_postes = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        break;
      case "POSTES":
        $scope.mastiles_postes = "mostrar";
        $scope.torres_torretas_monoposte = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        break;
      case "TORRETAS":
        $scope.torres_torretas_monoposte = "mostrar";
        $scope.mastiles_postes = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        break;
      case "COW":
        $scope.cow = "mostrar";
        $scope.torres_torretas_monoposte = null;
        $scope.mastiles_postes = null;
        $scope.antsatelites = null;
        break;
      case "ANTSATELITALES":
        $scope.antsatelites = "mostrar";
        $scope.torres_torretas_monoposte = null;
        $scope.mastiles_postes = null;
        $scope.cow = null;
        break;
    }
  }
  var tiemporespuesta = null;
  $scope.ArchivoRequisitos = [];
  $scope.ordenarRequisitos = function () {
    var max = 0;

    for (var i = 0; i < $scope.img.length; i++) {
      if (max < $scope.img[i].posicion) {
        max = $scope.img[i].posicion;
      }
    }
    $scope.ArchivoRequisitos = [];
    var buscpos = 1;//$scope.img
    for (var j = 0; j <= max; j++) {
      for (var l = 0; l < $scope.img.length; l++) {
        if (buscpos == $scope.img[l].posicion) {
          $scope.ArchivoRequisitos.push($scope.img[l]);
        }
      }
      buscpos += 1;
    }
  }

  $scope.juntarRequisitos = function () {
    $scope.ordenarRequisitos();

    $scope.rutaArchEnvioLotus = [];
    //for (var i = 0; i < $scope.requiRecuperados.length; i++) {
    for (var i = 0; i < 4; i++) {
      $datareq = $scope.requiRecuperados[i];
      $scope.guardarFilesFInal($datareq.campo, $datareq.nombre, $datareq.url);

    }
    for (var i = 0; i < $scope.ArchivoRequisitos.length; i++) {
      if ($scope.estadofile($scope.ArchivoRequisitos[i].nombre)) {
        $scope.guardarFilesAntenas($scope.ArchivoRequisitos[i].campo, $scope.ArchivoRequisitos[i].nombre, $scope.ArchivoRequisitos[i].url);

      }
    }
  }
  $scope.estadofile = function (campo) {
    var estado = false;
    switch (campo) {
      case "ANTT_CON_ARR":
        if ($scope.ANTT_CON_ARR != null) { estado = true; };
        break;
      case "ANTT_CART_NOTARIADA":
        if ($scope.ANTT_CART_NOTARIADA != null) { estado = true; };
        break;
      case "ANTT_AUT_ESC_COPROP":
        if ($scope.ANTT_AUT_ESC_COPROP != null) { estado = true; };
        break;
      case "ANTT_LIC_AMB":
        if ($scope.ANTT_LIC_AMB != null) { estado = true; };
        break;
      case "ANTT_POL_SEG":
        if ($scope.ANTT_POL_SEG != null) { estado = true; };
        break;
      case "ANTT_CERT_AUT_TRIB":
        if ($scope.ANTT_CERT_AUT_TRIB != null) { estado = true; };
        break;
      case "ANTT_CART_NOT":
        if ($scope.ANTT_CART_NOT != null) { estado = true; };
        break;
      case "ANTT_PLAN_MANT":
        if ($scope.ANTT_PLAN_MANT != null) { estado = true; };
        break;
      case "ANTT_PLAN_MIME":
        if ($scope.ANTT_PLAN_MIME != null) { estado = true; };
        break;
      case "ANTT_EST_GEOLOGICO":
        if ($scope.ANTT_EST_GEOLOGICO != null) { estado = true; };
        break;
      case "ANTT_PLAN_FORM_DIG":
        if ($scope.ANTT_PLAN_FORM_DIG != null) { estado = true; };
        break;
      case "ANTT_PLAN_ALT_SOPORTE":
        if ($scope.ANTT_PLAN_ALT_SOPORTE != null) { estado = true; };
        break;
      case "ANTT_PLAN_SITIO":
        if ($scope.ANTT_PLAN_SITIO != null) { estado = true; };
        break;
      case "ANTT_DESC_ESQ_BALIZAMIENTO":
        if ($scope.ANTT_DESC_ESQ_BALIZAMIENTO != null) { estado = true; };
        break;
      case "ANTT_PLAN_MED_PREV_SEG":
        if ($scope.ANTT_PLAN_MED_PREV_SEG != null) { estado = true; };
        break;
      case "ANTT_INF_TEC_POS":
        if ($scope.ANTT_INF_TEC_POS != null) { estado = true; };
        break;
      case "ANTT_CAL_ESTRUC_SOP":
        if ($scope.ANTT_CAL_ESTRUC_SOP != null) { estado = true; };
        break;
      case "ANTT_INF_TEC_EMITIDO":
        if ($scope.ANTT_INF_TEC_EMITIDO != null) { estado = true; };
        break;
      case "ANTT_INF_TEC_EMITIDO_GAB":
        if ($scope.ANTT_INF_TEC_EMITIDO_GAB != null) { estado = true; };
        break;
      case "ANTT_PLAN_FORM_DIG":
        if ($scope.ANTT_PLAN_FORM_DIG != null) { estado = true; };
        break;

      case "ANTT_PLAN_DET_CONST_CAT":
        if ($scope.ANTT_PLAN_DET_CONST_CAT != null) { estado = true; };
        break;
      case "ANTT_PLAN_CAR_GAB":
        if ($scope.ANTT_PLAN_CAR_GAB != null) { estado = true; };
        break;
      case "ANTT_DOC_AUT_LUG_ESP_PUB":
        if ($scope.ANTT_DOC_AUT_LUG_ESP_PUB != null) { estado = true; };
        break;
      case "ANTT_PLAN_ELEM_COMPL":
        if ($scope.ANTT_PLAN_ELEM_COMPL != null) { estado = true; };
        break;
      case "ANTT_ADJ_AUTORIZACION":
        if ($scope.ANTT_ADJ_AUTORIZACION != null) { estado = true; };
        break;

      default:
    }
    return estado;

  }
  $scope.verif_requisitos = function () {
    switch ($scope.tipoReg) {
      case "R_UNICO":
        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#macrodistrito").val() != "") {
          if ($("#cod_catastral").val() != "") {
            $scope.cantidadfile = 0;
            if ($("#tp_prop").val() == "PRIVADA") {
              $scope.cantidadfile = 2 + 4;
            }
            if ($("#tp_prop").val() == "HORIZONTAL") {
              $scope.cantidadfile = 3 + 4;
            }
            if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
              $scope.cantidadfile = 1 + 4;
            }
            $scope.cantidadrufile = 0;
            $scope.cantidadrufile1 = 0;
            for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
              if ($scope.lstSoporteprevio[i].tipoSoporte == "COW" || $scope.lstSoporteprevio[i].tipoSoporte == "COLT") {
                $scope.cantidadrufile1 = 10;
              } else {
                $scope.cantidadrufile = 13;
              }
            }
            if ($scope.cantidadrufile > 0) {
              $scope.cantidadfile = $scope.cantidadrufile + $scope.cantidadfile;
            } else {
              $scope.cantidadfile = $scope.cantidadrufile1 + $scope.cantidadfile;

            }

            $scope.juntarRequisitos();
            //$scope.cantidadfile = 1; //borrar
            if ($scope.rutaArchEnvioLotus.length >= $scope.cantidadfile) {
              return true;
            }

          } else {
            swal('', 'Codigo Catastral no definido', 'error');
            return false;

          }

        } else {

          return false;
        }
        break;
      case "R_MULTIPLE":

        if ($scope.grilla_rbmultiple.length > 0) {
          return true;

        } else {

          return false;
        }
        break;
      case "G_UNICO":

        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#den_ngabinete").val() != "") {
          $scope.cantidadfile = 0;
          if ($("#tp_prop").val() == "PRIVADA") {
            $scope.cantidadfile = 9 + 4;
          }
          if ($("#tp_prop").val() == "HORIZONTAL") {
            $scope.cantidadfile = 10 + 4;

          }
          if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
            $scope.cantidadfile = 8 + 4;

          }
          $scope.juntarRequisitos();
          //$scope.cantidadfile = 1;//borrar
          if ($scope.rutaArchEnvioLotus.length >= $scope.cantidadfile) {
            return true;
          }

        } else {

          return false;
        }

        break;
      case "G_MULTIPLE":

        if ($scope.grilla_rbmultiple.length > 0) {

          return true;

        } else {

          return false;
        }

        break;
      default:
        swal("Es necesario seleccionar una de las opciones Gracias...", "error");
    }
  }

  $scope.requisitos = "mostrar";
  $scope.requisitos2 = "mostrar";
  $scope.requisitos3 = "mostrar";
  $scope.requisitos4 = "mostrar";
  $scope.requisitos5 = "mostrar";
  $scope.requisitos6 = "mostrar";
  $scope.requisitos7 = "mostrar";
  $scope.verif_req = function () {
    if ($scope.c_solicitud == 6) { $scope.requisitos = null; }
    if ($scope.c_requisito2 == 2) { $scope.requisitos2 = null; }
    if ($scope.c_requisito3 == 9) { $scope.requisitos3 = null; }
    if ($scope.c_requisito4 == 11) { $scope.requisitos4 = null; }
    if ($scope.c_requisito5 == 8) { $scope.requisitos5 = null; }
    if ($scope.c_requisito6 == 5) { $scope.requisitos6 = null; }
    if ($scope.c_requisito7 == 5) { $scope.requisitos7 = null; }
  }
  $scope.VerificarCapchaa = function (datos) {
    var captch = $("#resultadoCC").val();
    if (captch.length == 0)
      $scope.ErrorCapchasXX = "";

    if (captch.length > 3) {
      clearTimeout(tiemporespuesta);
      tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
    }
  };
  $scope.validarFormProcesos = function () {
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
      tramiteIgob.frm_tra_proforma = "rodolfo";

      tramiteIgob.validarFormProcesos(function (resultado) {
        swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma de la Dirección de Administración Territorial y Catastral para recabar mayor información.");
        $rootScope.botones = true;
        $rootScope.requistosfile = true;
        //$scope.ConsumoServCatastro();
        $scope.tramitesCiudadano();
        $scope.limpiarValores();
      });
    } catch (error) {
      console.log("Error : ", error);
      swal('', 'Registro no modificado', 'error');
      $.unblockUI();
    }
  };

  $rootScope.recuperaInf = function (data) {
    $scope.recuperado = data.GRD_ANTENAS[0].ANT_NOM_RADBASE;
    $scope.ultimoRegistro($scope.recuperado);


  }
  $scope.idrespuesta;
  $scope.guardarUbicacion = function (dataUbicacion) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      url: $scope.URLAPI + 'wsUbi/ubicacionGeoserver',
      dataType: 'json',
      data: dataUbicacion,//'{  "cas_id":'+$scope.cas_id+',"fr_casos":'+JSON.stringify($scope.frcasos)+'}',
      success: function (data) {
        $scope.idrespuesta = 4;

      },
      error: function (data) { console.log(data); }
    });
  }
  var rItems = new Array();
  $scope.ConsumoServCatastro = function () {

    rItems = [];
    var nroTramiteEnviado = 1;
    /*var id_item = nroTramiteEnviado;
    id_item = id_item.split("/");
    id_item = id_item[0];*/
    id_item = 0;
    inform = $rootScope.Antenas;
    for (var i = 0; i < inform.length; i++) {
      var punto = inform[i].f01_Ubicacion.ubicacion;
      punto = punto.split(" ");;
      var puntox = punto[0];
      var puntoy = punto[1];
      punto = puntox + "," + puntoy;

      id_item = id_item + 1;
      if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
        nro_Soporte = 0;
        if ($scope.tipoReg == "G_UNICO") {

          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].ANT_NOM_RADBASE + '","ubicacion":"' + inform[i].ANT_UBICA_RBASE + '","tipo_propiedad":"' + inform[i].ANT_TIP_PROPIEDAD + '","nro_gabinetes":"' + inform[i].ANT_NRO_GAB + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        } else if ($scope.tipoReg == "G_MULTIPLE") {
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].f01_DENOMINACION + '","ubicacion":"' + inform[i].f01_UBI_RB + '","tipo_propiedad":"' + inform[i].f01_TIPO_UBIC + '","nro_gabinetes":"' + inform[i].f01_NRO_GABINETE + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';

        }
      } else {
        if ($scope.tipoReg == "R_MULTIPLE") {
          nro_Soporte = inform[i].f01_GRILLA_SOPORTE.length;
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].f01_DENOMINACION + '","ubicacion":"' + inform[i].f01_UBI_RB + '","tipo_propiedad":"' + inform[i].f01_TIPO_UBIC + '","nro_gabinetes":"' + inform[i].f01_NRO_GABINETE + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';

        } else {
          nro_Soporte = inform[i].f01_GRD_SOPORTE.length;
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].ANT_NOM_RADBASE + '","ubicacion":"' + inform[i].ANT_UBICA_RBASE + '","tipo_propiedad":"' + inform[i].ANT_TIP_PROPIEDAD + '","nro_gabinetes":"' + inform[i].ANT_NRO_GAB + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        }

      }
      rItems.push(items);
    }

    $scope.data_Sitv3 = '{"id_mapa":1,"ext_id_tramite":"' + nroTramiteEnviado + '","usuario":"sistema.externo","items":[' + rItems + ']}';
  }

  $scope.UbicacionData = "";
  $scope.serializarInformacion = function (dataAnt) {
    $scope.btnfirmar = true;
    if ($scope.estadoTramite == "NO") {
      if ($scope.tipoTramite == "NUEVO") {
        var ubicacionutm = $("#ln_ubicacion").val();
        if (ubicacionutm != "") {
          ubicacionutm = ubicacionutm.split("(");
          if (ubicacionutm[1] != undefined) {
            ubicacionutm = ubicacionutm[1].split(")");
          }
          ubicacionutm = ubicacionutm[0];
          var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
          dataAnt = { "den_rbase": $("#den_rbase").val(), "ub_rbase": $("#ub_rbase").val(), "tp_prop": $("#tp_prop").val(), "den_ngabinete": $("#den_ngabinete").val(), "ANT_OBSERVACION": $("#observacion").val(), "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val(), "ubicacion": ubicacionutm };
          $scope.UbicacionData = dataAnt;
        }

        if ($scope.verif_requisitos() && dataAnt != undefined) {
          $scope.ultimoRegistro(dataAnt);
          //$scope.btnfirmar = true;
          $rootScope.datosIniciales.ANT_NRO_AUTORIZACION = $("#den_auto").val();
          var fechactual = obtFechaActual.obtenerFechaActual();
          $rootScope.datosIniciales.g_fecha = fechactual;
          $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
          $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
          $rootScope.datosIniciales.File_Adjunto = "";
          $rootScope.datosIniciales.File_Adjunto = $scope.rutaArchEnvioLotus;
          $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          $scope.tipoPersona = sessionService.get('TIPO_PERSONA');

          $rootScope.datosIniciales.f01_tipo_per = 'J';
          $rootScope.datosIniciales.f01_tipo_per_desc = 'JURIDICO';
          $rootScope.datosIniciales.ANT_TIPO_PERSONA = '2';
          $rootScope.datosIniciales.ANT_NIT = $rootScope.datosIniciales.f01_num_doc_per_jur;
          $rootScope.datosIniciales.ANT_RAZ_SOC = $rootScope.datosIniciales.f01_raz_soc_per_jur;
          $rootScope.datosIniciales.ANT_NUM_PODER = $rootScope.datosIniciales.f01_poder_representante;
          $rootScope.datosIniciales.ANT_EMP_TEL = "";
          $rootScope.datosIniciales.ANT_NUM_NOTARIA = $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
          $rootScope.datosIniciales.ANT_EMP_CEL = "";
          $rootScope.datosIniciales.ANT_EMP_CORREO = "";
          $rootScope.datosIniciales.ANT_DOM = $rootScope.datosIniciales.f01_zon_rep_valor;
          $rootScope.datosIniciales.ANT_CELU = $rootScope.datosIniciales.f01_cel_rep;
          $rootScope.datosIniciales.ANT_TEL = $rootScope.datosIniciales.f01_telef_rep;
          $rootScope.datosIniciales.ANT_MAIL = $rootScope.datosIniciales.f01_email_rep;
          $rootScope.datosIniciales.f01_macro_act = 1;

          if ($rootScope.datosIniciales.opcional == "SI") {

            $rootScope.datosIniciales.ANT_NOM = $('#f01_pri_nom_rep').val();
            $rootScope.datosIniciales.ANT_PAT = $('#f01_ape_pat_rep').val();
            $rootScope.datosIniciales.ANT_MAT = $('#f01_ape_mat_rep').val();
            $rootScope.datosIniciales.ANT_CAS = " ";//$rootScope.datosIniciales.f01_ape_cas_rep;
            $rootScope.datosIniciales.ANT_NUM_CI = $('#f01_num_doc_rep').val();
            $rootScope.datosIniciales.ANT_EXP_CI = $('#f01_expedido_rep').val();
            $rootScope.datosIniciales.ANT_NUM_PODER = $('#f01_ges_vig_pod').val();
            $rootScope.datosIniciales.f01_expedido_prop = $('#f01_expedido_rep').val();
            $rootScope.datosIniciales.f01_pri_nom_rep = $('#f01_pri_nom_rep').val();
            $rootScope.datosIniciales.f01_num_doc_rep = $('#f01_num_doc_rep').val();
            $rootScope.datosIniciales.f01_ges_vig_pod = $('#f01_ges_vig_pod').val();
            $rootScope.datosIniciales.f01_ape_pat_rep = $('#f01_ape_pat_rep').val();
            $rootScope.datosIniciales.f01_ape_mat_rep = $('#f01_ape_mat_rep').val();
            $rootScope.datosIniciales.f01_ape_cas_rep = $('#f01_ape_cas_rep').val();

          } else {

            $rootScope.datosIniciales.ANT_NOM = $rootScope.datosIniciales.f01_pri_nom_rep + " " + $rootScope.datosIniciales.f01_seg_nom_rep;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
            $rootScope.datosIniciales.ANT_PAT = $rootScope.datosIniciales.f01_ape_pat_rep;
            $rootScope.datosIniciales.ANT_MAT = $rootScope.datosIniciales.f01_ape_mat_rep;
            $rootScope.datosIniciales.ANT_CAS = $rootScope.datosIniciales.f01_ape_cas_rep;
            $rootScope.datosIniciales.ANT_NUM_CI = $rootScope.datosIniciales.f01_num_doc_per_jur;
            $rootScope.datosIniciales.ANT_NUM_PODER = $rootScope.datosIniciales.f01_ges_vig_pod;
            $rootScope.datosIniciales.ANT_EXP_CI = $rootScope.datosIniciales.f01_expedido_rep;
          }

          var fechactual = obtFechaActual.obtenerFechaActual();
          $rootScope.datosIniciales.g_fecha = fechactual;
          $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
          $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
          $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          $scope.fecha_sit2 = fechactual;
          $scope.datosIniciales.f01_ges_vig_pod_sec = "";


          $.blockUI();
          setTimeout(function () {
            $scope.$apply(function () {
              $scope.formularioDJ_Antenas($rootScope.datosIniciales);
              $.unblockUI();


            });
          }, 1000);
          $scope.estadoTramite = "NO";

        } else {
          if ($scope.tipoReg == "R_UNICO" || $scope.tipoReg == "G_UNICO") {
            swal("Error!", "Para guardar el formulario por favor completar todos los campos y los documentos gracias...", "error");

          } else if ($scope.tipoReg == "R_MULTIPLE") {
            swal("Error!", "Para guardar el formulario por favor registrar una radio base gracias...", "error");

          } else if ($scope.tipoReg == "G_MULTIPLE") {

            swal("Error!", "Para guardar el formulario por favor registrar un gabinete gracias...", "error");

          }
          $scope.estadoTramite = "NO";
        }
      } else {
        $scope.recupe1 = JSON.parse($scope.dataRecuperadoCP[0].form_contenido);
        var ubicacionutm = $("#ln_ubicacion").val();
        if (ubicacionutm != "") {
          if ($scope.recupe1 != "RBM" || $scope.recupe1 != "GM") {
            ubicacionutm = ubicacionutm.split("(");
            if (ubicacionutm.length == 2) {
              ubicacionutm = ubicacionutm[1].split(")");
              ubicacionutm = ubicacionutm[0];
            } else {
              ubicacionutm = ubicacionutm[0];
            }
            var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
            dataAnt = { "den_rbase": $("#den_rbase").val(), "ub_rbase": $("#ub_rbase").val(), "tp_prop": $("#tp_prop").val(), "den_ngabinete": $("#den_ngabinete").val(), "ANT_OBSERVACION": $("#observacion").val(), "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
            dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val(), "latitud_extra": $("#latitud_reg").val(), "longitud_extra": $("#longitud_reg").val() };
            $scope.UbicacionData_previa = dataAnt1;
          }

          $scope.ultimoRegistro_renevio($scope.datarenviada);
        } else {

          ubicacionutm = $scope.datarenviada.GRD_ANTENAS[0].f01_Ubicacion.ubicacion;
          if ($scope.datarenviada.GRD_ANTENAS[0].f01_Ubicacion.ubicacion != undefined || $scope.datarenviada.GRD_ANTENAS[0].f01_Ubicacion.ubicacion != null) {

            var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
            dataAnt = { "den_rbase": $("#den_rbase").val(), "ub_rbase": $("#ub_rbase").val(), "tp_prop": $("#tp_prop").val(), "den_ngabinete": $("#den_ngabinete").val(), "ANT_OBSERVACION": $("#observacion").val(), "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
            dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val(), "latitud_extra": $("#latitud_reg").val(), "longitud_extra": $("#longitud_reg").val() };
            $scope.UbicacionData_previa = dataAnt1;
            $scope.ultimoRegistro_renevio($scope.datarenviada);

          } else {
            swal("Error!", "Para guardar el formulario es necesario ubicar un punto de referencia", "error");

          }


        }



      }

    } else {

      var ubicacionutm = $("#ln_ubicacion").val();
      if (ubicacionutm != "") {

        ubicacionutm = ubicacionutm.split("(");
        if (ubicacionutm.length == 2) {

          ubicacionutm = ubicacionutm[1].split(")");
          ubicacionutm = ubicacionutm[0];
        } else {
          ubicacionutm = ubicacionutm[0];

        }
        var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
        // Fin Informacion Ubicacion
        dataAnt = { "den_rbase": $("#den_rbase").val(), "ub_rbase": $("#ub_rbase").val(), "tp_prop": $("#tp_prop").val(), "den_ngabinete": $("#den_ngabinete").val(), "ANT_OBSERVACION": $("#observacion").val(), "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
        dataAnt1 = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
        $scope.UbicacionData_previa = dataAnt1;
      } else {
        swal("Error!", "Para guardar el formulario es necesario ubicar un punto de referencia", "error");

      }
    }

  };


  $scope.dataUbicacion = "";
  $scope.ultimoRegistro_renevio = function (dataPrevia) {

    $scope.adjuntosExtraidos = dataPrevia.File_Adjunto;
    if ($scope.img.length > 0) {
      for (var i = 0; i < $scope.img.length; i++) {
        for (var j = 0; j < $scope.adjuntosExtraidos.length; j++) {
          if ($scope.img[i].nombre == $scope.adjuntosExtraidos[j].id_campo) {
            $scope.adjuntosExtraidos[j].url = $scope.img[i].url;
          }
        }
      }
      $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.adjuntosExtraidos) + '}';
      $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
      $rootScope.requistosfile = true;
    }
    dataPrevia.ANT_NOM = $('#f01_pri_nom_rep').val();
    dataPrevia.f01_pri_nom_rep = $('#f01_pri_nom_rep').val();
    dataPrevia.ANT_PAT = $('#f01_ape_pat_rep').val();
    dataPrevia.f01_ape_pat_rep = $('#f01_ape_pat_rep').val();
    dataPrevia.ANT_MAT = $('#f01_ape_mat_rep').val();
    dataPrevia.f01_ape_mat_rep = $('#f01_ape_mat_rep').val();
    dataPrevia.ANT_NUM_CI = $('#f01_num_doc_rep').val();
    dataPrevia.f01_num_doc_rep = $('#f01_num_doc_rep').val();
    dataPrevia.f01_expedido_rep = $('#f01_expedido_rep').val();
    dataPrevia.ANT_EXP_CI = $('#f01_expedido_rep').val();
    dataPrevia.ANT_NUM_PODER = $('#f01_ges_vig_pod').val();
    dataPrevia.f01_ges_vig_pod = $('#f01_ges_vig_pod').val();
    switch ($scope.tipoReg) {
      case "R_UNICO":
        for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
          var objeto = '{"altura":"' + $scope.lstSoporteprevio[i].altura + '","categoria":"' + $scope.lstSoporteprevio[i].categoria + '","frmSujecion":"' + $scope.lstSoporteprevio[i].frmSujecion + '","tipoSoporte":"' + $scope.lstSoporteprevio[i].tipoSoporte + '","nro_antenas":' + $scope.lstSoporteprevio[i].nro_antenas + '}';
          $scope.arraySoporte.push(JSON.parse(objeto));
        }
        var autorizacion1 = dataPrevia.GRD_ANTENAS[0].ANT_NRO_AUTO;
        var autorizacion2 = '';
        if (autorizacion1 != null) { autorizacion2 = dataPrevia.GRD_ANTENAS[0].ANT_NRO_AUTO; } else { autorizacion2 = ''; }
        dataEnvLotus = '[{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","ANT_NOM_RADBASE":"' + $("#den_rbase").val() + '","ANT_UBICA_RBASE":"' + $("#ub_rbase").val() + '","ANT_TIP_PROPIEDAD":"' + $("#tp_prop").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData_previa) + ',"f01_GRD_SOPORTE":' + JSON.stringify($scope.arraySoporte) + ',"ANT_NRO_GAB":' + $("#den_ngabinete").val() + ',"ANT_NRO_AUTO":"' + autorizacion2 + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}]';
        $rootScope.Antenas = JSON.parse(dataEnvLotus);
        $scope.tipoProceso = "ANTT";
        $scope.arraySoporte = [];

        var ubicacionutm = $scope.UbicacionData_previa.ubicacion;
        var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';

        dataPrevia.File_Adjunto = $scope.adjuntosExtraidos;
        dataPrevia.GRD_ANTENAS = $rootScope.Antenas;
        dataPrevia.g_tipo = $scope.tipoProceso;
        $scope.tipo_rvnTramite = "RU";
        $scope.dataUbicacion = dataUbi;

        break;
      case "R_MULTIPLE":

        var dataRBM_previo = JSON.parse($scope.grilla_rbmultiple_reenvio[0].form_contenido);
        dataRBM_previo = dataRBM_previo.GRD_ANTENAS;
        var catidad_previa = dataRBM_previo.length;
        for (var i = catidad_previa; i < $scope.grilla_rbmultiple.length; i++) {
          $scope.guardarUbicacion($scope.grilla_rbmultiple[i].f01_UbicacionUdit);

        }
        $rootScope.Antenas = $scope.grilla_rbmultiple;//JSON.parse(dataEnvLotus); 
        $rootScope.Antenas = JSON.parse(angular.toJson($rootScope.Antenas));
        dataPrevia.GRD_ANTENAS = $rootScope.Antenas;
        $scope.tipoProceso = "RBM";
        $scope.tipo_rvnTramite = "RM";
        $scope.btnEnviarFormLinea = false;
        break;
      case "G_UNICO":
        var autorizacion1 = dataPrevia.GRD_ANTENAS[0].ANT_NRO_AUTO;
        var autorizacion2 = '';
        if (autorizacion1 != null) { autorizacion2 = dataPrevia.GRD_ANTENAS[0].ANT_NRO_AUTO; } else { autorizacion2 = ''; }
        dataEnvLotus = '[{"f01_TIPO_REGISTRO":"' + $scope.tipoReg + '","ANT_NOM_RADBASE":"' + $("#den_rbase").val() + '","ANT_UBICA_RBASE":"' + $("#ub_rbase").val() + '","ANT_TIP_PROPIEDAD":"' + $("#tp_prop").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData_previa) + ',"ANT_NRO_GAB":' + $("#den_ngabinete").val() + ',"ANT_NRO_AUTO":"' + autorizacion2 + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}]';
        $rootScope.Antenas = JSON.parse(dataEnvLotus);
        $scope.tipoProceso = "RG";

        var ubicacionutm = $scope.UbicacionData_previa.ubicacion;
        var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
        dataPrevia.File_Adjunto = $scope.adjuntosExtraidos;
        dataPrevia.GRD_ANTENAS = $rootScope.Antenas;
        dataPrevia.g_tipo = $scope.tipoProceso;
        $scope.tipo_rvnTramite = "GU";
        $scope.dataUbicacion = dataUbi;
        break;
      case "G_MULTIPLE":
        var dataRBM_previo = JSON.parse($scope.grilla_rbmultiple_reenvio[0].form_contenido);
        dataRBM_previo = dataRBM_previo.GRD_ANTENAS;
        var catidad_previa = dataRBM_previo.length;
        for (var i = catidad_previa; i < $scope.grilla_rbmultiple.length; i++) {
          $scope.guardarUbicacion($scope.grilla_rbmultiple[i].f01_UbicacionUdit);
        }
        $rootScope.Antenas = $scope.grilla_rbmultiple;
        $rootScope.Antenas = JSON.parse(angular.toJson($rootScope.Antenas));
        dataPrevia.GRD_ANTENAS = $rootScope.Antenas;
        $scope.tipoProceso = "GM";
        $scope.tipo_rvnTramite = "GM";
        $scope.btnEnviarFormLinea = false;
        break;
      default:
    }
    $.blockUI();
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.formularioDJ_Antenas(dataPrevia);
        $.unblockUI();
      });
    }, 1000);
  }
  $scope.cerrarTramite = function () {
    $scope.btnEnviarFormLinea = true;
  }
  $scope.formularioDJ_Antenas = function (datos) {
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
    var deno_data = "";

    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
    if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
      datos.f01_tipo_per_desc = 'JURIDICO';
      urlFormularioN = "../../docs/Formulario_DJ_Antenas.html";
      $("#msgformularioJ").load(urlFormularioN, function (data) {
        stringFormulario40 = data;
        if ($scope.tipoProceso == "ANTT" || $scope.tipoProceso == "RG") {
          var style_antt = 'class="row"  style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px"';
          deno_data = '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Denominación: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            datos.GRD_ANTENAS[0].ANT_NOM_RADBASE +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Tipo de Propiedad: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            datos.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Código catastral: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            datos.GRD_ANTENAS[0].f01_Ubicacion.cod_catastral +
            '</div>' +
            '</div>';
          deno_data += '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Ubicación: </label>' +
            '</div>' +
            '<div class="col-md-6">' + datos.GRD_ANTENAS[0].ANT_UBICA_RBASE + '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Macrodistrito: </label>' +
            '</div>' +
            '<div class="col-md-6">' + datos.GRD_ANTENAS[0].f01_Ubicacion.macrodistrito +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Zona: </label>' +
            '</div>' +
            '<div class="col-md-6">' + datos.GRD_ANTENAS[0].f01_Ubicacion.zona +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Nro. Gabinetes: </label>' +
            '</div>' +
            '<div class="col-md-6">' + datos.GRD_ANTENAS[0].ANT_NRO_GAB +
            '</div>' +
            '</div>';
        } else {
          var style_antt = '';
          deno_data = '<table id="TblMult1" class="table table-striped table-bordered">';
          deno_data += '<tr><td>NRO</td>' +
            '<td>DENOMINACIÓN</td>' +
            '<td>UBICACIÓN</td>' +
            '<td>TIPO DE UBICACIÓN</td>' +
            '<td>NRO. GABINETES</td>' +
            '<td>NRO. AUTORIZACIÓN</td>';
          if ($scope.tipoProceso == "RBM") {
            deno_data += '<td>NRO. SOPORTE</td>';
          }
          deno_data += '</tr>';
          for (var i = 0; i < datos.GRD_ANTENAS.length; i++) {
            deno_data = deno_data + '<tr>' +
              '<td>' + (i + 1) + '</td>' +
              '<td>' + datos.GRD_ANTENAS[i].f01_DENOMINACION + '</td>' +
              '<td>' + datos.GRD_ANTENAS[i].f01_UBI_RB + '</td>' +
              '<td>' + datos.GRD_ANTENAS[i].f01_TIPO_UBIC + '</td>' +
              '<td>' + datos.GRD_ANTENAS[i].f01_NRO_GABINETE + '</td>' +
              '<td>' + datos.GRD_ANTENAS[i].f01_NRO_AUTORIZACION + '</td>';
            if ($scope.tipoProceso == "RBM") {
              deno_data += '<td>' + datos.GRD_ANTENAS[i].f01_GRILLA_SOPORTE.length + '</td>';
            }
            deno_data += '</tr>';
          }

          deno_data += '</table>';
        }
        detSoporte = '';
        if ($scope.tipoProceso == "ANTT") {
          detSoporte = '<tr><td>NRO</td>' +
            '<td>SOPORTE</td>' +
            '<td>CATEGORIA</td>' +
            '<td>FORMA SUJECIÓN</td>' +
            '<td>ALTURA(Mts.)</td>' +
            '<td>NRO. ANTENAS</td>' +
            '</tr>';
          var soporte = datos.GRD_ANTENAS[0].f01_GRD_SOPORTE;
          for (i = 0; i < soporte.length; i++) {
            detSoporte = detSoporte + '<tr>' +
              '<td>' + (i + 1) + '</td>' +
              '<td>' + soporte[i].tipoSoporte + '</td>' +
              '<td>' + soporte[i].categoria + '</td>' +
              '<td>' + soporte[i].frmSujecion + '</td>' +
              '<td>' + soporte[i].altura + '</td>' +
              '<td>' + soporte[i].nro_antenas + '</td></tr>';
          }
          $scope.tipo_de_registro = "<h3>DETALLE SOPORTES</h3>";
        }
        if ($scope.tipoProceso == "RG") {
          $scope.tipo_de_registro = "";
        }
        if ($scope.tipoProceso == "RBM" || $scope.tipoProceso == "GM") {
          $scope.tipo_de_registro = "";
        }
        stringFormulario40 = stringFormulario40.replace("#divft#", $scope.tipo_de_registro);
        stringFormulario40 = stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_rl_nit);
        //DATOS GENERALES
        stringFormulario40 = stringFormulario40.replace("#f01_pri_nom_rep#", datos.f01_pri_nom_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_pat_rep#", datos.f01_ape_pat_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_mat_rep#", datos.f01_ape_mat_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_cas_rep#", datos.f01_ape_cas_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_tipo_viarep#", datos.f01_tipo_viarep);
        stringFormulario40 = stringFormulario40.replace("#f01_tip_doc_rep#", datos.f01_tip_doc_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_rep#", datos.f01_num_doc_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_expedido_rep#", datos.f01_expedido_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_zon_rep_valor#", datos.f01_zon_rep_valor);
        stringFormulario40 = stringFormulario40.replace("#f01_nom_via_rep#", datos.f01_nom_via_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_rep#", datos.f01_num_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_telef_rep#", datos.f01_telef_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_cel_rep#", datos.f01_cel_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_pod_leg#", datos.f01_num_pod_leg);
        stringFormulario40 = stringFormulario40.replace("#f01_ges_vig_pod#", datos.f01_ges_vig_pod);
        stringFormulario40 = stringFormulario40.replace("#f01_num_notaria#", datos.f01_num_notaria);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_num_doc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
        //DATOS DEL EMPLAZAMIENTO
        stringFormulario40 = stringFormulario40.replace("#style_div#", style_antt);
        stringFormulario40 = stringFormulario40.replace("#div_denominacion#", deno_data);
        stringFormulario40 = stringFormulario40.replace("#lst_informacion#", detSoporte);
        stringFormulario40 = stringFormulario40.replace("#f01_denominacion#", datos.GRD_ANTENAS[0].ANT_NOM_RADBASE);
        stringFormulario40 = stringFormulario40.replace("#f01_tipo_propiedad#", datos.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD);
        stringFormulario40 = stringFormulario40.replace("#f01_cod_catastral#", datos.GRD_ANTENAS[0].f01_Ubicacion.cod_catastral);
        stringFormulario40 = stringFormulario40.replace("#f01_ubicacion#", datos.GRD_ANTENAS[0].ANT_UBICA_RBASE);
        stringFormulario40 = stringFormulario40.replace("#f01_macrodistrito#", datos.GRD_ANTENAS[0].f01_Ubicacion.macrodistrito);
        stringFormulario40 = stringFormulario40.replace("#f01_zona#", datos.GRD_ANTENAS[0].f01_Ubicacion.zona);
        stringFormulario40 = stringFormulario40.replace("#f01_nro_gabinetes#", datos.GRD_ANTENAS[0].ANT_NRO_GAB);
        stringFormulario40 = stringFormulario40.replace("#f01_nro_autorizacion#", datos.GRD_ANTENAS[0].ANT_NRO_AUTO);
        //FECHA DE LA DECLARACION
        stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
        stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
        stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);

        $scope.msgformularioJ = stringFormulario40;
        $scope.fecha_sist2 = fechaActualS;
        $scope.hora_sist = sHora;
        //$scope.notifcondicionesuso = stringFormulario40;
        $scope.guardarDataAntena = datos;

        setTimeout(function () {
          $scope.fmostrarFormulario();
        }, 500);
      })
      $scope.armarDatosFormDJ_ANTENAS(datos, fechaActualS, sHora);
    }
  }
  $scope.armarDatosFormDJ_ANTENAS = function (data, sfecha, sHora) {
    $rootScope.datosFormDJ_Antenas = "";
    var dataForm = {};
    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
    if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
      dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
      dataForm['f01_raz_soc_per_jur'] = data.f01_raz_soc_per_jur;
      dataForm['f01_num_doc_per_jur'] = data.f01_num_doc_per_jur;
      dataForm['f01_pri_nom_rep'] = data.f01_pri_nom_rep;
      dataForm['f01_seg_nom_rep'] = data.f01_seg_nom_rep;
      dataForm['f01_ape_pat_rep'] = data.f01_ape_pat_rep;
      dataForm['f01_ape_mat_rep'] = data.f01_ape_mat_rep;
      dataForm['f01_ape_cas_rep'] = data.f01_ape_cas_rep;
      dataForm['f01_tip_doc_rep'] = data.f01_tip_doc_rep;
      dataForm['f01_tipo_viarep'] = data.f01_tipo_viarep;
      dataForm['f01_num_doc_rep'] = data.f01_num_doc_rep;
      dataForm['f01_expedido_rep'] = data.f01_expedido_rep;
      dataForm['f01_zon_rep_valor'] = data.f01_zon_rep_valor;
      dataForm['f01_nom_via_rep'] = data.f01_nom_via_rep;
      dataForm['f01_num_rep'] = data.f01_num_rep;
      dataForm['f01_telef_rep'] = data.f01_telef_rep;
      dataForm['f01_cel_rep'] = data.f01_cel_rep;
      dataForm['f01_num_pod_leg'] = data.f01_num_pod_leg;
      dataForm['f01_ges_vig_pod'] = data.f01_ges_vig_pod;
      dataForm['f01_num_notaria'] = data.f01_num_notaria;
      dataForm['f01_email_prop'] = data.f01_email_prop;


      if ($scope.tipoProceso == "ANTT" || $scope.tipoProceso == "RG") {
        var style_antt = 'class="row"  style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px"';
        deno_data = '<table border="0.5" style="width:100%">' +
          '<tbody><tr><td>';
        deno_data += '<table border="0" style="width:100%">' +
          '<tbody>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">DENOMINACI&Oacute;N:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].ANT_NOM_RADBASE + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">TIPO DE PROPIEDAD</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">C&Oacute;DIGO CATASTRAL</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].f01_Ubicacion.cod_catastral + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">UBICACI&Oacute;N:</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].ANT_UBICA_RBASE + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">MACRODISTRITO:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].f01_Ubicacion.macrodistrito + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">ZONA:</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].f01_Ubicacion.zona + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">NRO. GABINETES:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + data.GRD_ANTENAS[0].ANT_NRO_GAB + '</span></td>' +
          '<td style="width:20%">&nbsp;</td>' +
          '<td style="width:20%">&nbsp;</td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '</tbody>' +
          '</table>';
        deno_data += '</td></tr> </tbody>' +
          '</table>';
      } else {
        var style_antt = '';
        if ($scope.tipoProceso == "RBM") {
          deno_data = '<table border="0.2" style="width:100%">' +
            '<tbody>' +
            '<tr>' +
            '<td style="width:5%">NRO</td>' +
            '<td style="width:15%">DENOMINACI&Oacute;N</td>' +
            '<td style="width:15%">UBICACI&Oacute;N</td>' +
            '<td style="width:20%">TIPO DE UBICACI&Oacute;N</td>' +
            '<td style="width:15%">NRO. GABINETES</td>' +
            '<td style="width:15%">NRO. AUTORIZACI&Oacute;N</td>' +
            '<td style="width:15%">NRO. SOPORTE</td>' +
            '</tr>';
          for (var i = 0; i < data.GRD_ANTENAS.length; i++) {
            deno_data = deno_data + '<tr>' +
              '<td style="width:5%"><br>' + (i + 1) + '<br></td>' +
              '<td style="width:15%"><br>' + data.GRD_ANTENAS[i].f01_DENOMINACION + '<br></td>' +
              '<td style="width:15%"><br>' + data.GRD_ANTENAS[i].f01_UBI_RB + '<br></td>' +
              '<td style="width:20%"><br>' + data.GRD_ANTENAS[i].f01_TIPO_UBIC + '<br></td>' +
              '<td style="width:15%"><br>' + data.GRD_ANTENAS[i].f01_NRO_GABINETE + '<br></td>' +
              '<td style="width:15%"><br>' + data.GRD_ANTENAS[i].f01_NRO_AUTORIZACION + '<br></td>' +
              '<td style="width:15%"><br>' + data.GRD_ANTENAS[i].f01_GRILLA_SOPORTE.length + '<br></td>' +
              '</tr>';

          }
          deno_data += '</tbody></table>';
        } else {
          deno_data = '<table border="0.2" style="width:100%">' +
            '<tbody>' +
            '<tr>' +
            '<td style="width:5%">NRO</td>' +
            '<td style="width:18%">DENOMINACI&Oacute;N</td>' +
            '<td style="width:17%">UBICACI&Oacute;N</td>' +
            '<td style="width:20%">TIPO DE UBICACI&Oacute;N</td>' +
            '<td style="width:20%">NRO. GABINETES</td>' +
            '<td style="width:20%">NRO. AUTORIZACI&Oacute;N</td>' +
            '</tr>';
          for (var i = 0; i < data.GRD_ANTENAS.length; i++) {
            deno_data = deno_data + '<tr>' +
              '<td style="width:5%"><br>' + (i + 1) + '<br></td>' +
              '<td style="width:18%"><br>' + data.GRD_ANTENAS[i].f01_DENOMINACION + '<br></td>' +
              '<td style="width:17%"><br>' + data.GRD_ANTENAS[i].f01_UBI_RB + '<br></td>' +
              '<td style="width:20%"><br>' + data.GRD_ANTENAS[i].f01_TIPO_UBIC + '<br></td>' +
              '<td style="width:20%"><br>' + data.GRD_ANTENAS[i].f01_NRO_GABINETE + '<br></td>' +
              '<td style="width:20%"><br>' + data.GRD_ANTENAS[i].f01_NRO_AUTORIZACION + '<br></td>' +
              '</tr>';

          }
          deno_data += '</tbody></table>';
        }
      }

      dataForm['style_div'] = style_antt;
      dataForm['div_denominacion'] = deno_data;
      detSoporte = '';
      if ($scope.tipoProceso == "ANTT") {
        detSoporte = '<table border="0.2" style="width:100%">' +
          '<tbody>' +
          '<tr>' +
          '<td style="width:5%"><span style="font-size:8px"> <br>NRO <br></span></td>' +
          '<td style="width:23%"><span style="font-size:8px"> <br>SOPORTE <br></span></td>' +
          '<td style="width:20%"><span style="font-size:8px"> <br>CATEGORIA <br></span></td>' +
          '<td style="width:20%"><span style="font-size:8px"> <br>FORMA SUJECI&Oacute;N <br></span></td>' +
          '<td style="width:15%"><span style="font-size:8px"> <br>ALTURA(Mts.) <br></span></td>' +
          '<td style="width:17%"><span style="font-size:8px"> <br>NRO. ANTENAS <br></span></td>' +
          '</tr>';
        var soporte = data.GRD_ANTENAS[0].f01_GRD_SOPORTE;
        for (i = 0; i < soporte.length; i++) {
          detSoporte += '<tr>' +
            '<td style="width:5%"><span style="font-size:8px"><br>' + (i + 1) + '<br></span></td>' +
            '<td style="width:23%"><span style="font-size:8px"><br>' + soporte[i].tipoSoporte + '<br></span></td>' +
            '<td style="width:20%"><span style="font-size:8px"><br>' + soporte[i].categoria + '<br></span></td>' +
            '<td style="width:20%"><span style="font-size:8px"><br>' + soporte[i].frmSujecion + '<br></span></td>' +
            '<td style="width:15%"><p style="text-align:center"><span style="font-size:8px aling="><br>' + soporte[i].altura + '<br></span></p></td>' +
            '<td style="width:17%"><p style="text-align:center"><span style="font-size:8px"><br>' + soporte[i].nro_antenas + '<br></span></p></td>' +
            '</tr>';
        }

        detSoporte += '</tbody>' +
          '</table>';
        $scope.tipo_de_registro = "<h3>DETALLE SOPORTES</h3>";
      }

      dataForm['lst_informacion'] = detSoporte;
      dataForm['fecha_sist'] = sfecha;
      dataForm['fecha_sist2'] = sfecha;
      dataForm['usuario'] = sessionService.get('USUARIO');
      dataForm['hora_sist'] = sHora;
      $rootScope.datosFormDJ_Antenas = dataForm;
      $rootScope.datosFormDJ_Antenas['g_fecha'] = sfecha + " " + sHora;
    }
  }
  $scope.fmostrarFormulario = function () {

    $("#declaracionJ").modal({ backdrop: 'static', keyboard: false });
    $('#msgformularioJ').html($scope.msgformularioJ);

  }
  $scope.guardarInformacioAntena = function () {
    var dataRescatada = "";
    if ($scope.data_tramite_multiple != undefined) {
      dataRescatada = $scope.data_tramite_multiple;
      $scope.data_tramite_final = JSON.stringify($scope.data_tramite_multiple);
    } else {
      dataRescatada = $scope.guardarDataAntena;
    }
    $.blockUI();
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.guardarInformacionCiudadano(JSON.stringify(dataRescatada));
        $.unblockUI();
      });
    }, 1000);
  }
  $scope.guardarUbicacionActualizada = function (dataUbicacion) {
    $scope.btnEnviarFormLinea = false;
    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      url: $scope.URLAPI + 'wsUbi/updateUbicacionGeoserver',
      dataType: 'json',
      data: dataUbicacion,//'{  "cas_id":'+$scope.cas_id+',"fr_casos":'+JSON.stringify($scope.frcasos)+'}',
      success: function (data) {
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
  $scope.guardarInformacionCiudadano = function (datosGradarCd) {

    try {
      $rootScope.datosIniciales = JSON.parse(datosGradarCd);
      var datosSerializados = datosGradarCd;
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      var idServicio = sessionService.get('IDSERVICIO');
      var Parametros = new datosFormularios();
      Parametros.frm_tra_dvser_id = idServicio;
      Parametros.data_json = datosSerializados;
      Parametros.frm_tra_id_ciudadano = idCiudadano;
      Parametros.frm_tra_id_usuario = 1;
      Parametros.frm_idTramite = idTramite;
      $rootScope.btnGuardarForm = true;
      $.blockUI();
      Parametros.sp_crear_datos_formulario(function (results) {
        results = JSON.parse(results);
        results = results.success;
        if (results.length > 0) {
          $.unblockUI();

          if (($scope.tipoReg == "R_UNICO" || $scope.tipoReg == "G_UNICO") && $scope.tipoTramite == "NUEVO") {
            $scope.guardarUbicacion($scope.dataUbicacionNueva);
          } else if (($scope.tipoReg == "R_UNICO" || $scope.tipoReg == "G_UNICO") && $scope.tipoTramite != "NUEVO") {
            //$scope.guardarUbicacion($scope.dataUbicacion);
            $scope.guardarUbicacionActualizada($scope.dataUbicacion);
          }
          swal('', "Formulario almacenado", 'success');

          $scope.btnEnviarFormLinea = false;

        } else {
          $.unblockUI();
          swal('', "Formulario no almacenado", 'error');
          $scope.btnEnviarFormLinea = true;
        }
      });
    } catch (e) {
      $scope.btnGuardarForm = false;
      $.unblockUI();
    }
  }

  $scope.categorizador = function (tipo_sop) {
    switch (tipo_sop) {

      case "TORRES":
      case "MONOPOSTES":

        $scope.dataAnt.categoria = "I. GRAN ESCALA";
        $scope.dataAnt.categoria_m = "I. GRAN ESCALA";

        break;

      case "TORRETAS":
      case "MÁSTILES":
      case "POSTES":

        $scope.dataAnt.categoria = "II. ESCALA MEDIA";
        $scope.dataAnt.categoria_m = "II. ESCALA MEDIA";

        break;
      case "GABINETES":
      case "COW":

        $scope.dataAnt.categoria = "III. ESCALA MENOR";
        $scope.dataAnt.categoria_m = "III. ESCALA MENOR";

        break;
      case "PARA ANTENAS SATELITALES":

        $scope.dataAnt.categoria = "IV.  ESCALA DOMÉSTICA";
        $scope.dataAnt.categoria_m = "IV.  ESCALA DOMÉSTICA";

        break;
      default:
        $scope.dataAnt.categoria = "";
        $scope.dataAnt.categoria_m = "";
    }

  }

  $scope.$broadcast("items_changed")
  angular.module("ui.scrollToTopWhen", [])
    .directive("scrollToTopWhen", function ($timeout) {
      function link(scope, element, attrs) {
        scope.$on(attrs.scrollToTopWhen, function () {
          $timeout(function () {
            angular.element(element)[0].scrollTop = 0;
          });
        });
      }
    });

  $scope.enviarData = function () {

    var fecha = new Date();
    $scope.fechaDj = fecha.getFullYear() + '' + (fecha.getMonth() + 1) + '' + fecha.getDate() + '' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();


    $.blockUI();
    $scope.ConsumoServCatastro();
    $rootScope.datosIniciales.itemENVIOSITv3 = $scope.data_Sitv3;
    $rootScope.datosIniciales.fechaDj = $scope.fechaDj;
    var datosSerializados = JSON.stringify($rootScope.datosIniciales);
    setTimeout(function () {
      $scope.$apply(function () {
        var crearCaso = new gCrearCasoLinea();
        crearCaso.usr_id = 1,
          crearCaso.datos = datosSerializados,
          crearCaso.procodigo = $scope.tipoProceso,
          crearCaso.crearCasoLinea(function (response) {
            try {
              response = JSON.parse(response);
              var results = response.success.data;
              datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
              datosIF2 = datosIF[1];
              datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
              $scope.nrotramitec = datosIF[0];
              sessionService.set('NROTRAMITE', datosIF[0]);
              sessionService.set('NROTRAMITEID', datosIF[1]);
              sessionService.set('IDPROCESO', datosIF[6]);
              $rootScope.requisitosrbase = null;
              try {
                $scope.validarFormProcesos();
                $rootScope.botones = true;
                $scope.desabilitado = true;
                $rootScope.datosFormDJ_Antenas['ANT_NRO_CASO'] = $scope.nrotramitec;
                $scope.generarDocumentoPhpAntena($scope.nrotramitec, $scope.fechaDj);
                setTimeout(function () {
                  $scope.$apply(function () {
                    location.reload();
                    $.unblockUI();
                  });
                }, 5000);
                $.unblockUI();
              } catch (e) { }

              $.unblockUI();
            } catch (e) {
              alert("conexion fallida ");
            }
          });
        $.unblockUI();
      });
    }, 1000);
  };
  $scope.inicio = null;

  ///////////////////////INICIO DE ADJUNTOS V02//////////////////
  $scope.cambiarFile = function (obj, valor) {
    if (typeof (obj.files[0]) != 'undefined') {
      setTimeout(function () {
        var nombre = obj.getAttribute("name");
        var tamaniofile = obj.files[0];
        var tipoDoc = obj.files[0].name;
        var nameArrayci = tipoDoc.split('.');
        tipoDoc = nameArrayci[nameArrayci.length - 1].toLowerCase();
        tipoDoc = tipoDoc.toLowerCase();
        if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm') {
          $scope.datos[obj.name] = obj.files[0].name;
          $.blockUI();
          $scope.subirRequisitos(obj, valor);
          //$.unblockUI();
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
          document.getElementById(obj.name + '_campo').value = '';
          valor = '';
          $.unblockUI();
        };
        //$.unblockUI();
      }, 1000);
    }
  };
  $scope.img = [];
  $scope.subirRequisitos = function (sobj, svalor) {
    $.blockUI();
    var fechaNueva = "";
    var fechaserver = new fechaHoraServer();
    fechaserver.fechahora(function (resp) {
      var sfecha = JSON.parse(resp);
      var fechaServ = (sfecha.success.fecha).split(' ');
      var fecha_ = fechaServ[0].split('-');
      var hora_ = fechaServ[1].split(':');
      fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
    });

    var nombrecampo = sobj.id;
    var tipoDoc = sobj.files[0].name;
    var nameArray = tipoDoc.split('.');
    tipoDoc = nameArray[nameArray.length - 1].toLowerCase();
    var idTramite = sessionService.get('IDTRAMITE');
    var nombreNuevo = nombrecampo.substring(5, nombrecampo.length) + '_' + fechaNueva + '.' + tipoDoc;
    $scope.url_img = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/Antenas/" + idTramite + "/";
    var rMisDocs = new Array();
    if (sobj.files[0]) {
      rMisDocs.push(sobj.files[0]);
      $scope.almacenarRequisitos(rMisDocs, sobj.id, nombreNuevo, $scope.url_img);
      //$.unblockUI();
    }else{
      $.unblockUI();
    }
  };
  $scope.registroFileobjImg = function (nombre, sobjid, urlImg) {
    if (!$scope.verficaFIle(sobjid, $scope.img)) {
      $scope.pos = $scope.obtOrdenRequisito(sobjid);
      $scope.img.push({
        campo: nombre,//sobj.files[0].name,
        nombre: sobjid,
        url: urlImg,
        posicion: $scope.pos

      });
    } else {
      $scope.posicion = $scope.obt_pos(sobj.id, $scope.img);
      $scope.remplazarArchivo($scope.posicion);
      $scope.pos = $scope.obtOrdenRequisito(sobj.id);
      $scope.img.push({
        campo: nombre,//sobj.files[0].name,
        nombre: sobjid,
        url: urlImg,
        posicion: $scope.pos
      });
    }
  }
  $scope.ejecutarFile = function (idfile) {
    var sid = document.getElementById(idfile);
    if (sid) {
      document.getElementById(idfile).click();
    } else {
      alert("Error ");
    }
  };
  $scope.almacenarRequisitos = function (aArchivos, nombrecampo, nombreNuevo, url_img) {
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
      var nombre = aArchivos[0].name;
      var tamaniofile = aArchivos[0].size;
      var oidCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      $scope.direccionvirtual = "RC_CLI";
      var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/Antenas/" + idTramite + "/";
      $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/Antenas/" + aArchivos[0].name + "?app_name=todoangular";

      if (typeof (aArchivos[0]) != 'undefined') {
        var tipoDoc = aArchivos[0].name;
        var nameArray = tipoDoc.split('.');
        tipoDoc = nameArray[nameArray.length -1 ].toLowerCase();
        var nombre = nameArray[0] + '.zip';
        if (tamaniofile > 500000 || tamaniofile.size <= 15000000) {
          if (tipoDoc == "png" || tipoDoc == "jpg" || tipoDoc == "jpeg" || tipoDoc == "bmp" || tipoDoc == "gif") {
            $scope.veriCompFile = true;
            var filecompress = compressImage(aArchivos[0]).then(function (respuesta) {
              var imagenCompr = respuesta.name.split('.');
              var tipoCia = imagenCompr[1];
              nombreNuevo = nombrecampo.substring(5, nombrecampo.length) + '_' + fechaNueva + '.' + tipoCia;
              $.blockUI();
              fileUpload1.uploadFileToUrl1(respuesta, uploadUrl, nombreNuevo);
              document.getElementById(nombrecampo + '_campo').value = nombreNuevo;
              var urlImagen = url_img + nombreNuevo + "?app_name=todoangular";
              UrlExists(urlImagen);
              $scope.registroFileobjImg(nombreNuevo, nombrecampo, urlImagen);
              //$.unblockUI();
            });
          } else {
            if (tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm') {
              var zipci = new JSZip();
              zipci.file(aArchivos[0].name, aArchivos[0]);
              zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blob) {
                nombreNuevo = nombrecampo.substring(5, nombrecampo.length) + '_' + fechaNueva + '.zip';
                $.blockUI();
                var resp = fileUpload1.uploadFileToUrl1(blob, uploadUrl, nombreNuevo);
                document.getElementById(nombrecampo + '_campo').value = nombreNuevo;
                var urlImagen = url_img + nombreNuevo + "?app_name=todoangular";
                UrlExists(urlImagen);
                $scope.registroFileobjImg(nombreNuevo, nombrecampo, urlImagen);
              });
              //$.unblockUI();
            }
            else {
              swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
              $.unblockUI();
            };
          };
        } else {
          if (tamaniofile <= 500000) {
            if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm' || tipoDoc == 'PDF') {
              nombreNuevo = nombrecampo.substring(5, nombrecampo.length) + '_' + fechaNueva + '.' + tipoDoc;
              $.blockUI();
              fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl, nombreNuevo);
              document.getElementById(nombrecampo + '_campo').value = nombreNuevo;
              var urlImagen = url_img + nombreNuevo + "?app_name=todoangular";
              //UrlExists(urlImagen);
              $scope.registroFileobjImg(nombreNuevo, nombrecampo, urlImagen);
              //$.unblockUI();
            } else {
              swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
              document.getElementById('btn_ANTT_CON_ARR').value = "";
              $scope.ANTT_CON_ARR = "";
              $scope.datos.ANTT_CON_ARR = "";
              $.unblockUI();
            };
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy alta, seleccione otra por favor.', 'error');
            $(this).val("");
            $.unblockUI();
          };
        }
      }
      $.unblockUI();
    }, 1000);
  };
  function UrlExists(url) {
    $.blockUI();
    $.get(url)
       .done(function() { 
           $.unblockUI();
          }).fail(function() { 
            setTimeout(() => {
              UrlExists(url);
            }, 3000);
       }) 
  }
  $scope.mosDetAdj = function (data) {
    var texto = '';
    switch (data) {
      case "btn_ANTT_CON_ARR":
        if ($("#tp_prop").val() == "PRIVADA" || $("#tp_prop").val() == "HORIZONTAL") {
          var tf_con_arr = "";
          if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
            tf_con_arr = "gabinete.";
          } else {
            tf_con_arr = "soportes de antenas.";

          }
          texto = 'a) Contrato de Arrendamiento vigente suscrito entre el propietario del sitio y el solicitante, que establezca tiempo, lugar y la autorización para el emplazamiento de ' + tf_con_arr;
        } else if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
          texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento del soporte de antenas señalado en el Artículo 10 del presente Reglamento.';
        }
        break;
      case "btn_ANTT_CART_NOTARIADA":
        texto = 'b) Carta Notariada de Autorización que garantice el acceso irrestricto al sitio del emplazamiento, a los servidores públicos del Gobierno Autónomo Municipal de La Paz, únicamente para fines de inspección durante el proceso de solicitud de autorización; y posteriormente, cuando sea requerido por el Gobierno Autónomo Municipal de La Paz, para propósitos de verificación y fiscalización periódica respecto al cumplimiento de las condiciones técnicas del emplazamiento, mimetización y seguridad, definidas en la Ley Municipal Autonómica Nº 278. Los días y horarios de inspección serán coordinados con anticipación por la Unidad de Administración y Control Territorial y/o la Unidad de Fiscalización y Control Predial de la Sub Alcaldía correspondiente.';

        break;
      case "btn_ANTT_AUT_ESC_COPROP":
        texto = 'c) Autorización escrita de los copropietarios sea a través de la Asociación de Copropietarios, Directiva o Representante Legal debidamente acreditado; en caso de que el emplazamiento se encuentre en una edificación bajo el régimen de propiedad horizontal.';

        break;
      case "btn_ANTT_LIC_AMB":

        texto = 'd) Licencia Ambiental vigente extendida por la autoridad competente, para el emplazamiento específico solicitado.';

        break;
      case "btn_ANTT_CAL_ESTRUC_SOP":

        texto = 'e) Cálculo estructural del o de los soportes específico para el cual se solicita autorización ó documento equivalente que señale que dichas estructuras no representan riesgos para el predio donde se emplazarán; firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
        break;
      case "btn_ANTT_POL_SEG":

        var tf_polSeg = "";
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          tf_polSeg = "gabinetes.";
        } else {
          tf_polSeg = "soportes de antenas de telecomunicaciones.";

        }
        texto = 'f) Póliza de Seguro de Responsabilidad Civil y/o Daños a Terceros que cubra al titular de la solicitud sobre posibles daños a terceros durante la instalación, construcción, funcionamiento y/o vida útil del o los ' + tf_polSeg + ' Dicha garantía o su renovación deberá encontrarse indefectiblemente vigente por el tiempo que dure la autorización, no debiendo existir periodos sin cobertura.';

        break;
      case "btn_ANTT_CERT_AUT_TRIB":
        texto = 'g) Certificación de la Autoridad Tributaria Municipal sobre la inexistencia de deudas pendientes de pago con el municipio, respecto a obligaciones pendientes de pago por gestiones vencidas o deudas de cualquier tipo provenientes de resoluciones o sentencias ejecutoriadas.';

        break;
      case "btn_ANTT_CART_NOT":
        var tf_carnot = "";
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          tf_carnot = "gabinetes ";
        } else {
          tf_carnot = "soportes ";

        }
        texto = 'h) Carta Notariada del solicitante señalando que el o los ' + tf_carnot + 'para los cuales se gestiona autorización no cuentan con sanciones pendientes de cumplimiento con el Gobierno Autónomo Municipal de La Paz.';

        break;
      case "btn_ANTT_PLAN_MIME":
        texto = 'i) Plan de mimetización, de acuerdo a lo señalado en el Artículo 12 de la Ley Municipal Autonómica Nº 278, y el Artículo 13 del presente Reglamento. * Cuando la mimetización no sea factible, se deberá presentar un Informe Técnico fundamentado con respaldo en criterios estructurales, ambientales y otros, según corresponda; y será elaborado y firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
        break;
      case "btn_ANTT_PLAN_MANT":
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          texto = "j) Plan de mantenimiento del o los gabinetes de acuerdo a lo señalado en el Artículo 30 del Reglamento a la LMA Nº 278.";
        } else {
          texto = 'j) Plan de mantenimiento del o los soportes y de la radio base de acuerdo a lo señalado en el Artículo 30 del presente Reglamento.';

        }

        break;
      case "btn_ANTT_EST_GEOLOGICO":
        texto = 'k) En el caso específico de que el emplazamiento de soportes de antenas de Gran Escala esté ubicado en áreas de riesgo muy alto de acuerdo Mapa de Riesgos vigente del Gobierno Autónomo Municipal de La Paz se deberá adjuntar obligatoriamente a la solicitud, un estudio geológico geotécnico que detalle las obras civiles específicas que deberán realizarse a fin de que aseguren la estabilidad de la o las estructuras a emplazarse; y el plan de ejecución de las mismas. Estos documentos deberán estar elaborados y firmados por un profesional  debidamente habilitado para el ejercicio profesional.';

        break;
      case "btn_ANTT_PLAN_FORM_DIG":
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          texto = "i) Planos en formato digital (PDF) con la firma del profesional responsable de su elaboración, de los detalles constructivos, características de los gabinetes y elementos complementarios como del sistema eléctrico.";
        } else {
          texto = 'l) Planos en formato digital (PDF) del diseño esquemático del o de los soportes y de la radio base (las estructuras y de los ambientes complementarios), incluyendo alturas, número de elementos radiantes adosados al soporte y detalles constructivos (con la firma del profesional responsable de su elaboración) bajo las siguientes especificaciones técnicas:';

        }
        break;
      case "btn_ANTT_PLAN_ALT_SOPORTE":
        texto = 'l.1) Plano de altura del o de los soportes (a escala 1:50 y acotado), y detalle del número de elementos radiantes a ser adosados.';
        break;
      case "btn_ANTT_PLAN_SITIO":
        texto = 'l.2) Plano del sitio (1); plano de planta del sitio en el cual se vea la ubicación del o de los soportes (1); plano de la radio base (1); planos de elevaciones del sitio en los cuales se vean el o los soportes (2); plano de corte de la radio base (1); planos de  detalles constructivos del o de los soportes y equipos (2); planos del sistema eléctrico y aterramiento (2).';

        break;
      case "btn_ANTT_PLAN_MED_PREV_SEG":
        texto = 'l.3) Plano en el que se identifiquen las medidas de prevención y seguridad a ser implementadas así como la ubicación de señalización y otros.';

        break;
      case "btn_ANTT_DESC_ESQ_BALIZAMIENTO":
        texto = 'l.4) Descripción esquemática del balizamiento, de acuerdo a las normas de seguridad establecidas por la Dirección General de Aeronáutica Civil.';

        break;
      case "btn_ANTT_INF_TEC_EMITIDO":
        texto = 'm) Para soportes a ser emplazados en predios declarados y valorados con la Categoría “C” Valor de Integración y/o en Conjuntos Patrimoniales de Interés Histórico y Urbano, identificados y delimitados en el Mapa de Administración Patrimonial de la Ley de Uso de Suelos, adicionalmente se deberá presentar un Informe Técnico positivo emitido por la instancia competente encargada y especializada en el tema patrimonial del Gobierno Autónomo Municipal de La Paz.';

        break;
      case "btn_ANTT_INF_TEC_EMITIDO_GAB":
        texto = 'm) Para gabinetes a ser emplazados en predios declarados y valorados con la Categoría “C” Valor de Integración y/o en Conjuntos Patrimoniales de Interés Histórico y Urbano, identificados y delimitados en el Mapa de Administración Patrimonial de la Ley de Uso de Suelos, adicionalmente se deberá presentar un Informe Técnico positivo emitido por la instancia competente encargada y especializada en el tema patrimonial del Gobierno Autónomo Municipal de La Paz.';

        break;

      case "btn_ANTT_DOC_AUT_LUG_ESP_PUB":
        texto = 'n) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento del soporte de antenas señalado en el Artículo 10 del presente Reglamento.';

        break;
      case "btn_ANTT_PLAN_DET_CONST_CAT":
        texto = 'o) Planos de detalles constructivos, características de los gabinetes, identificación y elementos complementarios como del Sistema eléctrico y su ubicación exacta del sitio de emplazamiento. *Para Gabinetes complementarios, el solicitante no deberá presentar requisitos adicionales a los ya presentados para la solicitud del soporte; por lo que en éstas circunstancias, no se cobrarán estos gabinetes por el concepto de su autorización. ';

        break;
      case "btn_ANTT_DOC_AUT_LUG_ESP_PUB_ANT":
        if ($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE") {
          texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento de gabinete  señalado en el Artículo 10 del Reglamento a la LMA Nº 278.';
        } else {
          texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento.';
        }
        break;
      case "btn_ANTT_PLAN_CAR_GAB":
        texto = 'ii) Plano de características de los gabinetes.';

        break;

      case "btn_ANTT_PLAN_ELEM_COMPL":
        texto = 'iii) Plano de elementos complementarios como el sistema eléctrico.';

        break;

      case "btn_ANTT_ADJ_AUTORIZACION":
        texto = 'Documento que permita verificar la autorización.';

        break;
      default:
        swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias..", "error");
    }
    swal("", texto, "");
  }
  $scope.obtOrdenRequisito = function (data) {

    var posicion = 0;
    //data = "btn_"+data
    switch (data) {
      case "ANTT_CON_ARR":
        posicion = 1;
        break;
      case "ANTT_CART_NOTARIADA":
        posicion = 2;

        break;
      case "ANTT_AUT_ESC_COPROP":
        posicion = 3;

        break;
      case "ANTT_LIC_AMB":
        posicion = 4;

        break;
      case "ANTT_CAL_ESTRUC_SOP":
        posicion = 5;
        break;
      case "ANTT_POL_SEG":
        posicion = 6;

        break;
      case "ANTT_CERT_AUT_TRIB":
        posicion = 7;

        break;
      case "ANTT_CART_NOT":
        posicion = 8;

        break;
      case "ANTT_PLAN_MIME":
        posicion = 9;
        break;
      case "ANTT_PLAN_MANT":
        posicion = 10;

        break;
      case "ANTT_EST_GEOLOGICO":
        posicion = 11;

        break;
      case "ANTT_PLAN_FORM_DIG":
        posicion = 12;

        break;
      case "ANTT_PLAN_ALT_SOPORTE":
        posicion = 13;
        break;
      case "ANTT_PLAN_SITIO":
        posicion = 14;

        break;
      case "ANTT_PLAN_MED_PREV_SEG":
        posicion = 15;

        break;
      case "ANTT_DESC_ESQ_BALIZAMIENTO":
        posicion = 16;

        break;
      case "ANTT_INF_TEC_POS":
        posicion = 17;
        break;
      case "ANTT_DOC_AUT_LUG_ESP_PUB":
        posicion = 18;

        break;
      case "ANTT_PLAN_DET_CONST_CAT":
        posicion = 19;

        break;
      case "ANTT_DOC_AUT_LUG_ESP_PUB_GAB":
        posicion = 20;

        break;
      case "ANTT_INF_TEC_EMITIDO":
        posicion = 21;

        break;
      case "ANTT_PLAN_FORM_DIG":
        posicion = 22;

        break;

      case "ANTT_PLAN_CAR_GAB":
        posicion = 23;

        break;

      case "ANTT_PLAN_ELEM_COMPL":
        posicion = 24;
        break;
      case "ANTT_ADJ_AUTORIZACION":
        posicion = 25;
        break;
      case "ANTT_INF_TEC_EMITIDO_GAB":
        posicion = 26;

        break;

      default:
        swal("Error!..", "Por favor selecione el tipo de registro que realizara Gracias..", "error");


    }
    return posicion;
  }
  $scope.mostrarimgjuridico = function (imagen) {
    $.blockUI();
    var estado = false;
    var url = "";
    $scope.extension = "";
    for (var i = 0; i < $scope.img.length; i++) {
      if ($scope.img[i].nombre == imagen) {
        estado = true;
        url = $scope.img[i].url;
        $scope.extension = $scope.img[i].campo;
      }
    }

    if (estado) {
      var extPod = $scope.extension.split(".")[1];
      try {
        $scope.archivoPOD = url;
        if (extPod == 'pdf' || extPod == 'docx' || extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' || extPod == 'png' || extPod == 'gif') {
          window.open($scope.archivoPOD, "_blank");
        }/*else if(){
                    $("#fotpod").modal("show");             
                }*/
        $.unblockUI();

      } catch (e) {
        console.log("error", e);
        $.unblockUI();
      }


    } else {
      swal('Error', 'Todavia no selecciono un documento desde su equipo', 'error');
    }

    $.unblockUI();
  }
  $scope.remplazarArchivo = function (index) {
    $scope.img.splice(index, 1);
  };
  $scope.verficaFIle = function (campo, obj) {
    var estado = false;
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].nombre == campo) {
        estado = true;
      }
    }
    return estado;
  }
  $scope.obt_pos = function (campo, obj) {
    var posicion;
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].nombre == campo) {
        posicion = i;
      }
    }
    return posicion;
  }
  $scope.vaciarinputArchivos = function () {
    $("#ANTT_CON_ARR_campo").val("");
    $("#ANTT_CART_NOTARIADA_campo").val("");
    $("#ANTT_AUT_ESC_COPROP_campo").val("");
    $("#ANTT_LIC_AMB_campo").val("");
    $("#ANTT_CAL_ESTRUC_SOP_campo").val("");
    $("#ANTT_POL_SEG_campo").val("");
    $("#ANTT_CERT_AUT_TRIB_campo").val("");
    $("#ANTT_CART_NOT_campo").val("");
    $("#ANTT_PLAN_MIME_campo").val("");
    $("#ANTT_PLAN_MANT_campo").val("");
    $("#ANTT_EST_GEOLOGICO_campo").val("");
    $("#ANTT_PLAN_ALT_SOPORTE_campo").val("");
    $("#ANTT_PLAN_SITIO_campo").val("");
    $("#ANTT_PLAN_MED_PREV_SEG_campo").val("");
    $("#ANTT_DESC_ESQ_BALIZAMIENTO_campo").val("");
    $("#ANTT_INF_TEC_POS_campo").val("");
    $("#ANTT_DOC_AUT_LUG_ESP_PUB_campo").val("");
    $("#ANTT_PLAN_DET_CONST_CAT_campo").val("");
    $("#ANTT_DOC_AUT_LUG_ESP_PUB_GAB_campo").val("");
  }
  ///////////////////////FIN DE ADJUNTOS V02/////////////////////
  //// data par el envio de informacion de  antenas multiple ///////
  $scope.registro_i_data_multiple = function (data,pos_grilla_i) {
    $scope.img = [];
    $scope.vaciarinputArchivos();
    $scope.enviarTRamiteRBM = true;
    $scope.verTRamiteRBM = false;
    $scope.mostrarbtn_multiple = true;
    var contgrilla_rbm = 0;
    $scope.grilla_rbm.forEach(element => {
      if ( data.f01_DENOMINACION == element.f01_DENOMINACION && data.f01_UBI_RB == element.f01_UBI_RB && data.f01_TIPO_UBIC == element.f01_TIPO_UBIC) {
        pos_grilla_i = contgrilla_rbm;
      }
      contgrilla_rbm =  contgrilla_rbm + 1;
    });
    $scope.codigoAntena = pos_grilla_i;
    $scope.ANTT_NROAUTORIZACION = data.f01_NRO_AUTORIZACION;
    $("#den_auto").val("");
    try {
      $scope.observarData = false;
      $scope.btnGuardarRegistro = true;
      $("#den_rbase").val(data.f01_DENOMINACION);
      $("#ub_rbase").val(data.f01_UBI_RB);
      $("#tp_prop").val(data.f01_TIPO_UBIC);
      $("#lt_ubicacion").val(data.f01_LATITUD);
      $("#den_ngabinete").val(data.f01_NRO_GABINETE);
      $("#observacion").val(data.ANT_OBSERVACION);
      $("#latitud_reg").val(data.ANT_LATITUD);
      $("#longitud_reg").val(data.ANT_LOGITUD);
      $scope.ubicacion = data.f01_Ubicacion;
      var puntosxy = $scope.ubicacion;
      puntosxy = puntosxy.ubicacion.split(" ");
      grafica_XY(puntosxy[0], puntosxy[1]);
      $("#zona").val($scope.ubicacion.zona);
      $("#macrodistrito").val($scope.ubicacion.macrodistrito);
      $("#cod_catastral").val($scope.ubicacion.cod_catastral);
      $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
      $scope.tipoReg == data.f01_TIPO_REGISTRO;
      if (data.f01_NRO_AUTORIZACION != "") {
        $scope.autoriza = "mostrar";
        $scope.n_autorizacion = false;
        $scope.chec_autorizacion = false;
        $("#den_auto").val(data.f01_NRO_AUTORIZACION);
        document.getElementById("condiciones").checked = 1;
        $("#fecha_venRA").val(data.ANTT_FECHA_VENCIMIENTO_RA);
        $scope.fecha_venRATexto = false;
      } else {
        $scope.autoriza = null;
        $scope.chec_autorizacion = false;
        $scope.n_autorizacion = true;
        document.getElementById("condiciones").checked = 0;
      }
      $scope.lstSoporteprevio = [];
      $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
      $scope.dataSoporte_pos_i = data.f01_GRILLA_SOPORTE;
      $scope.lstSoportes();
      $scope.posicion = pos_grilla_i;
      if ($scope.tipoReg == "R_MULTIPLE") {
        $scope.mostrarRU = false;
        $scope.radiobase_simple = "mostrar"
        $rootScope.botonesrodolfo = false;
        $scope.tipoProceso = "RBM";

      } else {
        $scope.radiobase_simple = null;
        $scope.actualizarbtn_multiple = false;
        $scope.hab_boton_guardar = true;
        $scope.tipoProceso = "GM";


      }
      $scope.mostrarRUGU = "mostrar";//false;
      //$scope.mostrarbtn_multiple = true;
      $scope.mostrarRMGM = true;
      $rootScope.mostrarRU = false;
      $scope.actualizarbtn_multiple = true;
      $rootScope.tabAdj = false;

      //FUNCIONES  PARA MOSTRAR ADJUNTOS
      $scope.btnGuardarRegistro = false;
      $scope.requiRecuperados = [];
      $scope.SubDocNecesarios();
      $scope.estadoTramite_posi = "NO";
      $scope.tipoTramite = "MULTIPLE_RG";
      $scope.limpearRequisitos();
      $scope.reqPropiedad(data.f01_TIPO_UBIC);
      $scope.mostrar_ActualizarRequisitos();

    } catch (e) {
      console.log("Error", e);
    }
  }
  $scope.SubDocNecesarios = function () {

    var tipo_file = "FILE_LIC_RADIODIFUSION";
    var oid_ciu = sessionService.get('IDSOLICITANTE');
    var oid_ciu1 = sessionService.get('IDCIUDADANO');
    var verifFiles = new reglasnegocio();
    verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
    verifFiles.parametros = '{"oidCiudadano":"' + oid_ciu + '","tipo_file":"' + tipo_file + '"}';
    verifFiles.llamarregla(function (data) {
      $scope.$apply();
      setTimeout(function () {
        data = JSON.parse(data);
        if (data[0].ant_sp_busquedafile != '' &&
          $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA != "" &&
          $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR != "" &&
          $rootScope.datosIniciales.f01_poder_representante != "") {
          $scope.file_CERT_RADIODIFUSION = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA + "/" + data[0].ant_sp_busquedafile + "?app_name=todoangular";

          var nombre_certificado = "Licencia de Radiodifusión";
          var nombre_ci = "Cedula de Identidad";
          var nombre_ci_inv = "Cedula de Identidad Inversa";
          var rep_legal = "Documento del Representante Legal";
          $scope.guardarFiles(data[0].ant_sp_busquedafile, nombre_certificado, $scope.file_CERT_RADIODIFUSION);
          if (sessionService.get('NRO_PODER_PRINCIPAL') == $("#f01_ges_vig_pod").val()) {

            $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";
            $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";
            $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";
            $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA, nombre_ci, $scope.file_CI);
            $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR, nombre_ci_inv, $scope.file_CI_inv);
            $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, rep_legal, $scope.rep_legal);
          } else {

            var obt_data_file_rep_leg = new reglasnegocio();
            obt_data_file_rep_leg.identificador = "RCCIUDADANO_ANTENA-20-7";
            obt_data_file_rep_leg.parametros = '{"nit":"' + sessionService.get('NITCIUDADANO') + '","nro_poder":"' + $("#f01_ges_vig_pod").val() + '"}';
            obt_data_file_rep_leg.llamarregla(function (data) {

              $scope.$apply();
              data = JSON.parse(data);
              data = JSON.parse(data[0].data_file_rp);
              $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + data[0].ci_inverso + "?app_name=todoangular";
              $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + data[0].ci_reverso + "?app_name=todoangular";
              $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + data[0].poder_legal + "?app_name=todoangular";
              $scope.guardarFiles(data[0].ci_inverso, nombre_ci, $scope.file_CI);
              $scope.guardarFiles(data[0].ci_reverso, nombre_ci_inv, $scope.file_CI_inv);
              $scope.guardarFiles(data[0].poder_legal, rep_legal, $scope.rep_legal);
            });
          }
        } else {
          swal("Error!..", "Es necesario que complemente los documentos necesarios para realizar el registro. Por favor Actualice su Información.", "error");
        }
        //$scope.$apply();
      }, 200);

    });
  }

  $scope.serializarInformacionMultiple = function (dataAnt) {
    $scope.btnfirmar = true;
    $scope.tipoPersona = $rootScope.datosIniciales.f01_tipo_per;
    var ubicacionutm = $("#ln_ubicacion").val();
    var dataUbi = '{"xgeo_frm_id":' + sessionService.get('IDTRAMITE') + ',"xgoe_ciudadano_id":"' + sessionService.get('IDUSUARIO') + '","xgeo_ubicacion":"' + ubicacionutm + '"}';
    $scope.dataUbicacionNueva = dataUbi;
    // Fin Informacion Ubicacion
    $scope.UbicacionData_m = { "ubicacion": ubicacionutm, "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
    dataAnt = { "den_rbase": $("#den_rbase").val(), "ub_rbase": $("#ub_rbase").val(), "tp_prop": $("#tp_prop").val(), "den_ngabinete": $("#den_ngabinete").val(), "ANT_OBSERVACION": $("#observacion").val(), "macrodistrito": $("#macrodistrito").val(), "zona": $("#zona").val(), "cod_catastral": $("#cod_catastral").val() };
    if ($scope.verif_requisitos_desp() && dataAnt != undefined) {
      $scope.ultimoRegistro(dataAnt);
      if ($scope.tipoProceso == "RBM") {
        $scope.tipoProceso_envio = "ANTT";
        $scope.tipoReg_desp = "R_UNICO";
        dataEnvLotus_M = '[{"f01_TIPO_REGISTRO":"R_UNICO","ANT_NOM_RADBASE":"' + $("#den_rbase").val() + '","ANT_UBICA_RBASE":"' + $("#ub_rbase").val() + '","ANT_TIP_PROPIEDAD":"' + $("#tp_prop").val() + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData_m) + ',"f01_GRD_SOPORTE":' + JSON.stringify($scope.dataSoporte_pos_i) + ',"ANT_NRO_GAB":"' + $("#den_ngabinete").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}]';
        $rootScope.Antenas_multiple = JSON.parse(dataEnvLotus_M);
      } else if ($scope.tipoProceso == "GM") {
        $scope.tipoProceso_envio = "ANTT";
        $scope.tipoReg_desp = "G_UNICO";
        dataEnvLotus_M = '[{"f01_TIPO_REGISTRO":"G_UNICO","ANT_NOM_RADBASE":"' + $("#den_rbase").val() + '","ANT_UBICA_RBASE":"' + $("#ub_rbase").val() + '","ANT_TIP_PROPIEDAD":"' + $("#tp_prop").val() + '","f01_Ubicacion":' + JSON.stringify($scope.UbicacionData_m) + ',"ANT_NRO_GAB":"' + $("#den_ngabinete").val() + '","ANT_LOGITUD":"' + $("#longitud_reg").val() + '","ANT_LATITUD":"' + $("#latitud_reg").val() + '","ANT_OBSERVACION":"' + $("#observacion").val() + '"}]';
        $rootScope.Antenas_multiple = JSON.parse(dataEnvLotus_M);
      }

      var fechactual = obtFechaActual.obtenerFechaActual();
      $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
      $rootScope.datosIniciales_rcp.ANT_NRO_AUTORIZACION = $("#den_auto").val();
      $rootScope.datosIniciales_rcp.g_fecha = fechactual;
      $rootScope.datosIniciales_rcp.g_tipo = $scope.tipoProceso_envio;
      $rootScope.datosIniciales_rcp.File_Adjunto = "";
      $rootScope.datosIniciales_rcp.File_Adjunto = $scope.rutaArchEnvioLotus;
      $rootScope.datosIniciales_rcp.INT_FORM_ALMACENADO = "G";
      $rootScope.datosIniciales_rcp.f01_tipo_per = 'J';
      $rootScope.datosIniciales_rcp.f01_tipo_per_desc = 'JURIDICO';
      $rootScope.datosIniciales_rcp.ANT_TIPO_PERSONA = '2';
      $rootScope.datosIniciales_rcp.ANT_NIT = $rootScope.datosIniciales.f01_num_doc_per_jur;
      $rootScope.datosIniciales_rcp.ANT_RAZ_SOC = $rootScope.datosIniciales.f01_raz_soc_per_jur;
      $rootScope.datosIniciales_rcp.ANT_NUM_PODER = $('#f01_ges_vig_pod').val();//$rootScope.datosIniciales.f01_ges_vig_pod;           
      $rootScope.datosIniciales_rcp.ANT_EMP_TEL = "";
      $rootScope.datosIniciales_rcp.ANT_NUM_NOTARIA = $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
      $rootScope.datosIniciales_rcp.ANT_EMP_CEL = "";
      $rootScope.datosIniciales_rcp.ANT_EMP_CORREO = "";
      $rootScope.datosIniciales_rcp.ANT_NUM_CI = $('#f01_num_doc_rep').val();//$rootScope.datosIniciales.f01_num_doc_per_jur;

      $rootScope.datosIniciales_rcp.ANT_NOM = $('#f01_pri_nom_rep').val();//$rootScope.datosIniciales.f01_pri_nom_rep;+ " " + $rootScope.datosIniciales.f01_seg_nom_rep ;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
      $rootScope.datosIniciales_rcp.ANT_PAT = $('#f01_ape_pat_rep').val();//$rootScope.datosIniciales.f01_ape_pat_rep;
      $rootScope.datosIniciales_rcp.ANT_MAT = $('#f01_ape_mat_rep').val();//$rootScope.datosIniciales.f01_ape_mat_rep;
      $rootScope.datosIniciales_rcp.ANT_CAS = $('#f01_ape_cas_rep').val(); $rootScope.datosIniciales.f01_ape_cas_rep;
      $rootScope.datosIniciales_rcp.ANT_EXP_CI = $('#f01_expedido_rep').val();
      $rootScope.datosIniciales_rcp.ANT_DOM = $rootScope.datosIniciales.f01_zon_rep_valor;
      $rootScope.datosIniciales_rcp.ANT_CELU = $rootScope.datosIniciales.f01_cel_rep;
      $rootScope.datosIniciales_rcp.ANT_TEL = $rootScope.datosIniciales.f01_telef_rep;
      $rootScope.datosIniciales_rcp.ANT_MAIL = $rootScope.datosIniciales.f01_email_rep;
      $rootScope.datosIniciales_rcp.f01_macro_act = 1;
      $rootScope.datosIniciales_rcp.f01_pri_nom_rep = $('#f01_pri_nom_rep').val();
      $rootScope.datosIniciales_rcp.f01_ape_pat_rep = $('#f01_ape_pat_rep').val();
      $rootScope.datosIniciales_rcp.f01_ape_mat_rep = $('#f01_ape_mat_rep').val();
      $rootScope.datosIniciales_rcp.f01_ape_cas_rep = $('#f01_ape_cas_rep').val();
      $rootScope.datosIniciales.f01_num_doc_rep = $('#f01_num_doc_rep').val();
      $rootScope.datosIniciales.f01_expedido_rep = $('#f01_expedido_rep').val();
      $rootScope.datosIniciales.f01_ges_vig_pod = $('#f01_ges_vig_pod').val();

      $rootScope.datosIniciales_rcp.GRD_ANTENAS = $rootScope.Antenas_multiple;

      try {
        var datosSerializados = JSON.stringify($rootScope.datosIniciales_rcp);
        $rootScope.btnGuardarForm = true; $scope.btnEnviarFormLinea = false;
        var datosSerializados_UPDATE = $scope.infoReserva;
        ///////// PROCEDEREMOS A ACTUALIZAR LA INFORMACION DE LA GRILLA /////
        $scope.grd_antenas_nueva = [];
        for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {

          if (i == $scope.codigoAntena) {
            //$scope.grilla_rbmultiple[i].estadoTramite = "ENVIADO";
            $scope.grilla_rbmultiple[i].f01_DENOMINACION = $rootScope.Antenas_multiple[0].ANT_NOM_RADBASE;
            $scope.grilla_rbmultiple[i].f01_TIPO_UBIC = $rootScope.Antenas_multiple[0].ANT_TIP_PROPIEDAD;
            $scope.grilla_rbmultiple[i].f01_UBI_RB = $rootScope.Antenas_multiple[0].ANT_UBICA_RBASE;
            //$scope.grilla_rbmultiple[i].estadoTramite = $rootScope.Antenas_multiple[0].f01_TIPO_REGISTRO;
            $scope.grilla_rbmultiple[i].f01_Ubicacion = $rootScope.Antenas_multiple[0].f01_Ubicacion;
            $scope.grilla_rbmultiple[i].f01_NRO_GABINETE = $rootScope.Antenas_multiple[0].ANT_NRO_GAB;
            $scope.grilla_rbmultiple[i].ANT_OBSERVACION = $rootScope.Antenas_multiple[0].ANT_OBSERVACION;
            $scope.grilla_rbmultiple[i].AdjuntosTramite = $scope.rutaArchEnvioLotus;
            $scope.grd_antenas_nueva.push($scope.grilla_rbmultiple[i]);
          } else {
            $scope.grd_antenas_nueva.push($scope.grilla_rbmultiple[i]);
          }
        }
        datosSerializados_UPDATE.GRD_ANTENAS = $scope.grd_antenas_nueva;
        datosSerializados_UPDATE.File_Adjunto = $scope.requiRecuperados;
        datosSerializados_UPDATE.g_tipo = $scope.tipoProceso;//"RBM";
        $.blockUI();
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.formularioDJ_Antenas_multiple(datosSerializados_UPDATE, $scope.codigoAntena);
            $.unblockUI();
          });
        }, 1000);

        $scope.data_tramite_multiple = datosSerializados_UPDATE;

      } catch (e) {
        $scope.btnGuardarForm = false;
        $.unblockUI();
      }
    } else {
      
      //swal("Error!", "Para guardar el formulario es necesario completar todos los campos y los documentos", "error");
      alertify.warning('Información Incompleta es Necesario Registrar el Número y Fecha de Vencimiento del R.A.');

    }
    $scope.estadoTramite = "";

  }
  $scope.formularioDJ_Antenas_multiple = function (datos, codigoAntena) {
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
    var deno_data = "";
    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
    if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
      datos.f01_tipo_per_desc = 'JURIDICO';
      urlFormularioN = "../../docs/Formulario_DJ_Antenas.html";
      $("#msgformularioJ").load(urlFormularioN, function (data) {
        stringFormulario40 = data;
        $scope.grilla_1 = datos.GRD_ANTENAS;
        for (var i = 0; i < $scope.grilla_1.length; i++) {
          if (i == codigoAntena) {
            $scope.dataAntenapos_i = $scope.grilla_1[i];
          }

        }
        if ($scope.dataAntenapos_i.f01_TIPO_REGISTRO == "G_MULTIPLE") {
          $scope.tipoProceso_i = "RG";
        } else {
          $scope.tipoProceso_i = "ANTT";

        }


        if ($scope.tipoProceso_i == "ANTT" || $scope.tipoProceso_i == "RG") {
          var style_antt = 'class="row"  style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px"';
          deno_data = '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Denominación: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            $scope.dataAntenapos_i.f01_DENOMINACION +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Tipo de Propiedad: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            $scope.dataAntenapos_i.f01_TIPO_UBIC +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Código catastral: </label>' +
            '</div>' +
            '<div class="col-md-6">' +
            $scope.dataAntenapos_i.cod_catastral +
            '</div>' +
            '</div>';
          deno_data += '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Ubicación: </label>' +
            '</div>' +
            '<div class="col-md-6">' + $scope.dataAntenapos_i.f01_UBI_RB + '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Macrodistrito: </label>' +
            '</div>' +
            '<div class="col-md-6">' + $scope.dataAntenapos_i.f01_Ubicacion.macrodistrito +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Zona: </label>' +
            '</div>' +
            '<div class="col-md-6">' + $scope.dataAntenapos_i.f01_Ubicacion.zona +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="col-md-4">' +
            '<label>Nro. Gabinetes: </label>' +
            '</div>' +
            '<div class="col-md-6">' + $scope.dataAntenapos_i.f01_NRO_GABINETE +
            '</div>' +
            '</div>';
          if ($scope.dataAntenapos_i.f01_NRO_AUTORIZACION != "") {
            deno_data += '<div class="col-md-6">' +
              '<div class="col-md-4">' +
              '<label>Nro._Autorización: </label>' +
              '</div>' +
              '<div class="col-md-6">' + $scope.dataAntenapos_i.f01_NRO_AUTORIZACION + '</div>' +
              '</div>';
          }

        }
        detSoporte = '';
        if ($scope.tipoProceso_i == "ANTT") {
          detSoporte = '<tr><td>NRO</td>' +
            '<td>SOPORTE</td>' +
            '<td>CATEGORIA</td>' +
            '<td>FORMA SUJECIÓN</td>' +
            '<td>ALTURA(Mts.)</td>' +
            '<td>NRO. ANTENAS</td>' +
            '</tr>';
          var soporte = $scope.dataAntenapos_i.f01_GRILLA_SOPORTE;
          for (i = 0; i < soporte.length; i++) {
            detSoporte = detSoporte + '<tr>' +
              '<td>' + (i + 1) + '</td>' +
              '<td>' + soporte[i].tipoSoporte + '</td>' +
              '<td>' + soporte[i].categoria + '</td>' +
              '<td>' + soporte[i].frmSujecion + '</td>' +
              '<td>' + soporte[i].altura + '</td>' +
              '<td>' + soporte[i].nro_antenas + '</td></tr>';
          }
          $scope.tipo_de_registro = "<h3>DETALLE SOPORTES</h3>";
        }
        if ($scope.tipoProceso_i == "RG") {
          $scope.tipo_de_registro = "";
        }

        stringFormulario40 = stringFormulario40.replace("#divft#", $scope.tipo_de_registro);
        stringFormulario40 = stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_rl_nit);
        //DATOS GENERALES
        stringFormulario40 = stringFormulario40.replace("#f01_pri_nom_rep#", datos.f01_pri_nom_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_pat_rep#", datos.f01_ape_pat_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_mat_rep#", datos.f01_ape_mat_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_ape_cas_rep#", datos.f01_ape_cas_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_tipo_viarep#", datos.f01_tipo_viarep);
        stringFormulario40 = stringFormulario40.replace("#f01_tip_doc_rep#", datos.f01_tip_doc_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_rep#", datos.f01_num_doc_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_expedido_rep#", datos.f01_expedido_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_zon_rep_valor#", datos.f01_zon_rep_valor);
        stringFormulario40 = stringFormulario40.replace("#f01_nom_via_rep#", datos.f01_nom_via_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_rep#", datos.f01_num_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_telef_rep#", datos.f01_telef_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_cel_rep#", datos.f01_cel_rep);
        stringFormulario40 = stringFormulario40.replace("#f01_num_pod_leg#", datos.f01_num_pod_leg);
        stringFormulario40 = stringFormulario40.replace("#f01_ges_vig_pod#", datos.f01_ges_vig_pod);
        stringFormulario40 = stringFormulario40.replace("#f01_num_notaria#", datos.f01_num_notaria);
        stringFormulario40 = stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_num_doc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
        stringFormulario40 = stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
        //DATOS DEL EMPLAZAMIENTO
        stringFormulario40 = stringFormulario40.replace("#style_div#", style_antt);
        stringFormulario40 = stringFormulario40.replace("#div_denominacion#", deno_data);
        stringFormulario40 = stringFormulario40.replace("#lst_informacion#", detSoporte);
        stringFormulario40 = stringFormulario40.replace("#f01_denominacion#", datos.GRD_ANTENAS[0].ANT_NOM_RADBASE);
        stringFormulario40 = stringFormulario40.replace("#f01_tipo_propiedad#", datos.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD);
        stringFormulario40 = stringFormulario40.replace("#f01_cod_catastral#", datos.GRD_ANTENAS[0].f01_Ubicacion.cod_catastral);
        stringFormulario40 = stringFormulario40.replace("#f01_ubicacion#", datos.GRD_ANTENAS[0].ANT_UBICA_RBASE);
        stringFormulario40 = stringFormulario40.replace("#f01_macrodistrito#", datos.GRD_ANTENAS[0].f01_Ubicacion.macrodistrito);
        stringFormulario40 = stringFormulario40.replace("#f01_zona#", datos.GRD_ANTENAS[0].f01_Ubicacion.zona);
        stringFormulario40 = stringFormulario40.replace("#f01_nro_gabinetes#", datos.GRD_ANTENAS[0].ANT_NRO_GAB);
        stringFormulario40 = stringFormulario40.replace("#f01_nro_autorizacion#", datos.GRD_ANTENAS[0].ANT_NRO_AUTO);
        //FECHA DE LA DECLARACION
        stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
        stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
        stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);
        $scope.msgformularioJ = stringFormulario40;
        //$scope.notifcondicionesuso = stringFormulario40;
        setTimeout(function () {
          $scope.fmostrarFormulario();
        }, 500);
      })
      $scope.armarDatosFormDJ_ANTENAS_multiple(datos, fechaActualS, sHora, codigoAntena);
    }
  }
  $scope.armarDatosFormDJ_ANTENAS_multiple = function (data, sfecha, sHora, codigoAntena) {
    if (data.g_tipo == "GM") {
      $scope.tipoProceso_i2 = "RG";
    } else {
      $scope.tipoProceso_i2 = "ANTT";

    }
    $rootScope.datosFormDJ_Antenas = "";
    var dataForm = {};
    $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
    if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
      dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
      dataForm['f01_raz_soc_per_jur'] = data.f01_raz_soc_per_jur;
      dataForm['f01_num_doc_per_jur'] = data.f01_num_doc_per_jur;
      dataForm['f01_pri_nom_rep'] = data.f01_pri_nom_rep;
      dataForm['f01_seg_nom_rep'] = data.f01_seg_nom_rep;
      dataForm['f01_ape_pat_rep'] = data.f01_ape_pat_rep;
      dataForm['f01_ape_mat_rep'] = data.f01_ape_mat_rep;
      dataForm['f01_ape_cas_rep'] = data.f01_ape_cas_rep;
      dataForm['f01_tip_doc_rep'] = data.f01_tip_doc_rep;
      dataForm['f01_tipo_viarep'] = data.f01_tipo_viarep;
      dataForm['f01_num_doc_rep'] = data.f01_num_doc_rep;
      dataForm['f01_expedido_rep'] = data.f01_expedido_rep;
      dataForm['f01_zon_rep_valor'] = data.f01_zon_rep_valor;
      dataForm['f01_nom_via_rep'] = data.f01_nom_via_rep;
      dataForm['f01_num_rep'] = data.f01_num_rep;
      dataForm['f01_telef_rep'] = data.f01_telef_rep;
      dataForm['f01_cel_rep'] = data.f01_cel_rep;
      dataForm['f01_num_pod_leg'] = data.f01_num_pod_leg;
      dataForm['f01_ges_vig_pod'] = data.f01_ges_vig_pod;
      dataForm['f01_num_notaria'] = data.f01_num_notaria;
      dataForm['f01_email_prop'] = data.f01_email_prop;

      $scope.dataphp_i = data.GRD_ANTENAS;
      for (var i = 0; i < $scope.dataphp_i.length; i++) {
        if (i == codigoAntena) {
          $scope.info_data_php_i = $scope.dataphp_i[i];
        }
      }

      if ($scope.tipoProceso_i2 == "ANTT" || $scope.tipoProceso_i2 == "RG") {
        var style_antt = 'class="row"  style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px"';
        deno_data = '<table border="0.5" style="width:100%">' +
          '<tbody><tr><td>';
        deno_data += '<table border="0" style="width:100%">' +
          '<tbody>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">DENOMINACI&Oacute;N:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_DENOMINACION + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">TIPO DE PROPIEDAD</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_TIPO_UBIC + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">C&Oacute;DIGO CATASTRAL</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_Ubicacion.cod_catastral + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">UBICACI&Oacute;N:</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_UBI_RB + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">MACRODISTRITO:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_Ubicacion.macrodistrito + '</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">ZONA:</span></td>' +
          '<td style="width:20%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_Ubicacion.zona + '</span></td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>' +
          '<tr>' +
          '<td style="width:25%"><span style="font-size:8px">NRO. GABINETES:</span></td>' +
          '<td style="width:35%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_NRO_GABINETE + '</span></td>' +
          '<td style="width:20%">&nbsp;</td>' +
          '<td style="width:20%">&nbsp;</td>' +
          '</tr>' +
          '<tr><td></td><td></td></tr>';
        if ($scope.info_data_php_i.f01_NRO_AUTORIZACION != "") {
          deno_data += '<tr>' +
            '<td style="width:25%"><span style="font-size:8px">NRO. AUTORIZACIÓN:</span></td>' +
            '<td style="width:35%"><span style="font-size:8px">' + $scope.info_data_php_i.f01_NRO_AUTORIZACION + '</span></td>' +
            '<td style="width:20%">&nbsp;</td>' +
            '<td style="width:20%">&nbsp;</td>' +
            '</tr>' +
            '<tr><td></td><td></td></tr>';
        }
        deno_data += '</tbody>' +
          '</table>';
        deno_data += '</td></tr> </tbody>' +
          '</table>';
      }
      var style_antt = '';
      dataForm['style_div'] = style_antt;
      dataForm['div_denominacion'] = deno_data;
      detSoporte = '';
      if ($scope.tipoProceso_i2 == "ANTT") {
        detSoporte = '<table border="0.2" style="width:100%">' +
          '<tbody>' +
          '<tr>' +
          '<td style="width:5%"><span style="font-size:8px"> <br>NRO <br></span></td>' +
          '<td style="width:23%"><span style="font-size:8px"> <br>SOPORTE <br></span></td>' +
          '<td style="width:20%"><span style="font-size:8px"> <br>CATEGORIA <br></span></td>' +
          '<td style="width:20%"><span style="font-size:8px"> <br>FORMA SUJECI&Oacute;N <br></span></td>' +
          '<td style="width:15%"><span style="font-size:8px"> <br>ALTURA(Mts.) <br></span></td>' +
          '<td style="width:17%"><span style="font-size:8px"> <br>NRO. ANTENAS <br></span></td>' +
          '</tr>';
        var soporte = $scope.info_data_php_i.f01_GRILLA_SOPORTE;
        for (i = 0; i < soporte.length; i++) {
          detSoporte += '<tr>' +
            '<td style="width:5%"><span style="font-size:8px"><br>' + (i + 1) + '<br></span></td>' +
            '<td style="width:23%"><span style="font-size:8px"><br>' + soporte[i].tipoSoporte + '<br></span></td>' +
            '<td style="width:20%"><span style="font-size:8px"><br>' + soporte[i].categoria + '<br></span></td>' +
            '<td style="width:20%"><span style="font-size:8px"><br>' + soporte[i].frmSujecion + '<br></span></td>' +
            '<td style="width:15%"><p style="text-align:center"><span style="font-size:8px aling="><br>' + soporte[i].altura + '<br></span></p></td>' +
            '<td style="width:17%"><p style="text-align:center"><span style="font-size:8px"><br>' + soporte[i].nro_antenas + '<br></span></p></td>' +
            '</tr>';
        }

        detSoporte += '</tbody>' +
          '</table>';
        $scope.tipo_de_registro = "<h3>DETALLE SOPORTES</h3>";
      }
      dataForm['lst_informacion'] = detSoporte;
      dataForm['fecha_sist'] = sfecha;
      dataForm['fecha_sist2'] = sfecha;
      dataForm['usuario'] = sessionService.get('USUARIO');
      dataForm['hora_sist'] = sHora;
      $rootScope.datosFormDJ_Antenas_multiple = dataForm;
      $rootScope.datosFormDJ_Antenas_multiple['g_fecha'] = sfecha + " " + sHora;

    }
  }
  // ==================> 52535

  $scope.guardarInformacionCiudadano_multiple = function (datosGradarCd) {

    try {
      $rootScope.datosIniciales = JSON.parse(datosGradarCd);
      var datosSerializados = datosGradarCd;
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      var idServicio = sessionService.get('IDSERVICIO');
      var Parametros = new datosFormularios();
      Parametros.frm_tra_dvser_id = idServicio;
      Parametros.data_json = datosSerializados;
      Parametros.frm_tra_id_ciudadano = idCiudadano;
      Parametros.frm_tra_id_usuario = 1;
      Parametros.frm_idTramite = idTramite;
      $rootScope.btnGuardarForm = true;
      $.blockUI();
      Parametros.sp_crear_datos_formulario(function (results) {
        results = JSON.parse(results);
        results = results.success;
        if (results.length > 0) {
          $.unblockUI();

        } else {
          $.unblockUI();
          $scope.btnEnviarFormLinea = true;
        }
      });
    } catch (e) {
      $scope.btnGuardarForm = false;
      $.unblockUI();
    }
  }
  $scope.enviarData_multiple = function () {

    $scope.data_tramite_final1 = JSON.parse($scope.data_tramite_final);
    $scope.data_registro_i = $scope.data_tramite_final1.GRD_ANTENAS;
    for (var i = 0; i < $scope.data_registro_i.length; i++) {
      if (i == $scope.codigoAntena) {
        $scope.data_registro_i[i].estadoTramite = "ENVIADO";
      }
    }
    $scope.data_tramite_final1.GRD_ANTENAS = $scope.data_registro_i;
    $scope.guardarInformacionCiudadano_multiple(JSON.stringify($scope.data_tramite_final1));

    var datosSerializados = $rootScope.datosIniciales_rcp;
    $scope.codigoenvioLotus = $rootScope.datosIniciales_rcp.g_tipo;
    datosSerializados.GRD_ANTENAS = $rootScope.Antenas_multiple;
    datosSerializados.File_Adjunto = $scope.rutaArchEnvioLotus;
    datosSerializados.ANT_NRO_AUTORIZACION = $scope.ANTT_NROAUTORIZACION;
    if ($scope.codigoenvioLotus == "RBM") {
      $scope.codigoenvioLotus = "ANTT";
      datosSerializados.g_tipo = "ANTT";
    } else {
      $scope.codigoenvioLotus = "RG";
      datosSerializados.g_tipo = "RG";
    }
    var fecha = new Date();
    $scope.fechaDjM = fecha.getFullYear() + '' + (fecha.getMonth() + 1) + '' + fecha.getDate() + '' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();

    $scope.ConsumoServCatastro_desp($scope.tipoReg_desp);
    $rootScope.datosIniciales_rcp.fechaDj = $scope.fechaDjM;
    $rootScope.datosIniciales_rcp.itemENVIOSITv3 = $scope.data_Sitv3_v01;
    datosSerializados = JSON.stringify($rootScope.datosIniciales_rcp);
    var crearCaso = new gCrearCasoLinea();
    crearCaso.usr_id = 1,
      crearCaso.datos = datosSerializados,
      crearCaso.procodigo = $scope.codigoenvioLotus,
      crearCaso.crearCasoLinea(function (response) {
        try {
          response = JSON.parse(response);
          var results = response.success.data;
          datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
          datosIF2 = datosIF[1];
          datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
          $scope.nrotramitec = datosIF[0];
          $scope.envio_despliegue = "proceder";
          $rootScope.requisitosrbase = null;
          try {
            //$scope.ConsumoServCatastro_desp($scope.nrotramitec,$scope.tipoReg_desp);
            swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + $scope.nrotramitec + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma de la Dirección de Administración Territorial y Catastral para recabar mayor información.");
            $rootScope.botones = true;
            $scope.desabilitado = true;
            $scope.enviarTRamiteRBM = false;
            $scope.radiobase_simple = null;
            $scope.mostrarRUGU = null;//false;
            $scope.mostrarbtn_multiple = false;
            $scope.mostrarRMGM = false;
            $rootScope.mostrarRU = false;
            $scope.actualizarbtn_multiple = true;
            $scope.btnGuardarRegistro = false;
            $scope.observarData = true;
            $rootScope.tabAdj = true;
            $scope.limpearRequisitos();
            $rootScope.datosFormDJ_Antenas_multiple['ANT_NRO_CASO'] = $scope.nrotramitec;
            $rootScope.datosFormDJ_Antenas = $rootScope.datosFormDJ_Antenas_multiple;
            $scope.generarDocumentoPhpAntena($scope.nrotramitec, $scope.fechaDjM);
            setTimeout(function () {
              $scope.$apply(function () {
                location.reload();
              });
            }, 5000);
          } catch (e) { }

          $.unblockUI();
        } catch (e) {
          alert("conexion fallida ");
        }
      });
  };

  var rItems = new Array();
  $scope.ConsumoServCatastro_desp = function (tipoReg_desp) {
    rItems = [];
    var nroTramiteEnviado = 1;
    id_item = 0;
    inform = $rootScope.Antenas_multiple;
    for (var i = 0; i < inform.length; i++) {
      var punto = inform[i].f01_Ubicacion.ubicacion;
      punto = punto.split(" ");;
      var puntox = punto[0];
      var puntoy = punto[1];
      punto = puntox + "," + puntoy;
      id_item = id_item + 1;
      if (tipoReg_desp == "G_UNICO" || tipoReg_desp == "G_MULTIPLE") {
        nro_Soporte = 0;
        if (tipoReg_desp == "G_UNICO") {
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].ANT_NOM_RADBASE + '","ubicacion":"' + inform[i].ANT_UBICA_RBASE + '","tipo_propiedad":"' + inform[i].ANT_TIP_PROPIEDAD + '","nro_gabinetes":"' + inform[i].ANT_NRO_GAB + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        } else if (tipoReg_desp == "G_MULTIPLE") {
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].f01_DENOMINACION + '","ubicacion":"' + inform[i].f01_UBI_RB + '","tipo_propiedad":"' + inform[i].f01_TIPO_UBIC + '","nro_gabinetes":"' + inform[i].f01_NRO_GABINETE + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        }
      } else {
        if (tipoReg_desp == "R_MULTIPLE") {
          nro_Soporte = inform[i].f01_GRILLA_SOPORTE.length;
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].f01_DENOMINACION + '","ubicacion":"' + inform[i].f01_UBI_RB + '","tipo_propiedad":"' + inform[i].f01_TIPO_UBIC + '","nro_gabinetes":"' + inform[i].f01_NRO_GABINETE + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        } else {
          nro_Soporte = inform[i].f01_GRD_SOPORTE.length;
          var items = '{"ext_id_item":"' + id_item + '","denominacion":"' + inform[i].ANT_NOM_RADBASE + '","ubicacion":"' + inform[i].ANT_UBICA_RBASE + '","tipo_propiedad":"' + inform[i].ANT_TIP_PROPIEDAD + '","nro_gabinetes":"' + inform[i].ANT_NRO_GAB + '","nro_soportes":"' + nro_Soporte + '","geom":{"type":"Point","coordinates":[' + punto + ']}}';
        }

      }
      rItems.push(items);
    }


    $scope.data_Sitv3_v01 = '{"id_mapa":1,"ext_id_tramite":"' + nroTramiteEnviado + '","usuario":"sistema.externo","items":[' + rItems + ']}';

  }
  $scope.verif_requisitos_desp = function () {
    if ($scope.tipoProceso == "RBM") {
      $scope.tipoReg_desp = "R_UNICO";
    } else {
      $scope.tipoReg_desp = "G_UNICO";
    }
    switch ($scope.tipoReg_desp) {
      case "R_UNICO":
        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "") {
          $scope.cantidadfile = 0;
          if ($("#tp_prop").val() == "PRIVADA") {
            $scope.cantidadfile = 2 + 4;
          }
          if ($("#tp_prop").val() == "HORIZONTAL") {
            $scope.cantidadfile = 3 + 4;
          }
          if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
            $scope.cantidadfile = 1 + 4;
          }
          $scope.cantidadrufile = 0;
          $scope.cantidadrufile1 = 0;
          for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
            if ($scope.lstSoporteprevio[i].tipoSoporte == "COW" || $scope.lstSoporteprevio[i].tipoSoporte == "COLT") {
              $scope.cantidadrufile1 = 10;
            } else {
              $scope.cantidadrufile = 12;
            }
          }
          if ($scope.cantidadrufile > 0) {
            $scope.cantidadfile = $scope.cantidadrufile + $scope.cantidadfile;
          } else {
            $scope.cantidadfile = $scope.cantidadrufile1 + $scope.cantidadfile;

          }
          $scope.veri_autorizacion = $('#condiciones:checked').val();
          if ($scope.veri_autorizacion == 1) {
            $scope.cantidadfile += 1;
          }
          $scope.juntarRequisitos();
          //$scope.cantidadfile = 1; //borrar
          if ($('#condiciones:checked').val() == 1) {
            if ($("#den_auto").val() != "" && $("#fecha_venRA").val() != "" && $("#ANTT_ADJ_AUTORIZACION_campo").val() != "") {
              return true;
            }else{
              return false;
            }
          }else{

            if ($scope.rutaArchEnvioLotus.length >= $scope.cantidadfile) {
              return true;
            }
          }

        } else {

          return false;
        }
        break;
      case "R_MULTIPLE":

        if ($scope.grilla_rbmultiple.length >= 0) {
          return true;

        } else {

          return false;
        }
        break;
      case "G_UNICO":

        if ($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#den_ngabinete").val() != "") {
          $scope.cantidadfile = 0;
          if ($("#tp_prop").val() == "PRIVADA") {
            $scope.cantidadfile = 9 + 4;
          }
          if ($("#tp_prop").val() == "HORIZONTAL") {
            $scope.cantidadfile = 10 + 4;

          }
          if ($("#tp_prop").val() == "DOMINIO MUNICIPAL") {
            $scope.cantidadfile = 8 + 4;

          }
          var valor = $('#condiciones:checked').val();
          if (valor == 1 && $("#den_auto").val() != "") {
            $scope.cantidadfile = $scope.cantidadfile + 1;
          }
          $scope.juntarRequisitos();

          if ($('#condiciones:checked').val() == 1) {
            if ($("#den_auto").val() != "" && $("#fecha_venRA").val() != "" && $("#ANTT_ADJ_AUTORIZACION_campo").val() != "") {
              return true;
            }else{
              return false;
            }
          }else{
            if ($scope.rutaArchEnvioLotus.length >= $scope.cantidadfile) {
              return true;
            }
          }

          

        } else {

          return false;
        }

        break;
      case "G_MULTIPLE":

        if ($scope.grilla_rbmultiple.length >= 0) {

          return true;

        } else {

          return false;
        }

        break;
      default:
        swal("Es necesario seleccionar el tipo de registro a realizar..", "error");
    }
  }
  $scope.hab_btnFirma = function () {
    $scope.firma = $('#checkFirma:checked').val();
    if ($scope.firma == 0) {
      var fecha = new Date();
      $scope.fecha_sist2 = fecha.getDate() + " - " + (fecha.getMonth() + 1) + " - " + fecha.getFullYear();
      $scope.hora_sist = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
      $scope.btnfirmar = false;

    } else {
      $scope.btnfirmar = true;
      $scope.fecha_sist2 = "";
      $scope.hora_sist = "";
    }
  }

  $scope.recuperarRepLegal = function (dataRepreSec) {
    idRepresentante = dataRepreSec.idrepresentante;
    var resRepresentante = new reglasnegocio();
    resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-5';
    resRepresentante.parametros = '{"idRepresentante":' + idRepresentante + ',"nit":"' + sessionService.get('NITCIUDADANO') + '"}';
    resRepresentante.llamarregla(function (response) {
      $scope.obtDatos = JSON.parse(response);
      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
        $.unblockUI();
      } else {
        $scope.dataRepAdjunto = JSON.parse($scope.obtDatos[0].data_rep);
        $('#f01_pri_nom_rep').val($scope.obtDatos[0].nombre);
        $('#f01_ape_pat_rep').val($scope.obtDatos[0].paterno);
        $('#f01_ape_mat_rep').val($scope.obtDatos[0].materno);
        $('#f01_num_doc_rep').val($scope.obtDatos[0].nro_documento);
        $('#f01_expedido_rep').val($scope.obtDatos[0].extension);
        $('#f01_ges_vig_pod').val(dataRepreSec.nro_poder);
        $('#f01_ape_cas_rep').val("");
        $scope.ci_inverso = $scope.dataRepAdjunto[0].ci_inverso;
        $scope.ci_reverso = $scope.dataRepAdjunto[0].ci_reverso;
        $scope.poder_legal = $scope.dataRepAdjunto[0].poder_legal;
        $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA + "/" + $scope.ci_inverso + "?app_name=todoangular";
        $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA + "/" + $scope.ci_reverso + "?app_name=todoangular";
        $scope.poder_legal111 = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA + "/" + $scope.poder_legal + "?app_name=todoangular";
        //$scope.rep_legal    = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 +"/" + $scope.poder_legal + "?app_name=todoangular"; 

        $scope.obtArchivosAdjuntos[1].campo = $scope.ci_inverso;
        $scope.obtArchivosAdjuntos[1].url = $scope.file_CI;
        $scope.obtArchivosAdjuntos[2].campo = $scope.ci_reverso;
        $scope.obtArchivosAdjuntos[2].url = $scope.file_CI_inv;
        $scope.obtArchivosAdjuntos[3].campo = $scope.poder_legal;
        $scope.obtArchivosAdjuntos[3].url = $scope.poder_legal111;


        $scope.requiRecuperados[1].campo = $scope.ci_inverso;
        $scope.requiRecuperados[1].url = $scope.file_CI;
        $scope.requiRecuperados[2].campo = $scope.ci_reverso;
        $scope.requiRecuperados[2].url = $scope.file_CI_inv;
        $scope.requiRecuperados[3].campo = $scope.poder_legal;
        $scope.requiRecuperados[3].url = $scope.poder_legal111;

      };
    });


  }
  $scope.recuperarrepresentante = function () {
    sessionService.set('NRO_PODER_PRINCIPAL', $rootScope.datosIniciales.f01_ges_vig_pod);
    var resRepresentante = new reglasnegocio();
    resRepresentante.identificador = 'RCCIUDADANO_ANTENA-20-6';
    resRepresentante.parametros = '{"nit":"' + sessionService.get('NITCIUDADANO') + '"}';
    resRepresentante.llamarregla(function (response) {
      $scope.obtDatos = JSON.parse(response);
      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
        $.unblockUI();
      } else {
        $scope.representantes = $scope.obtDatos;

      };
    });
  }
  $scope.repPrincipal = true;
  $scope.controlRepresentante = function (valorCheck) {
    if (valorCheck == 'SI') {
      $scope.recuperarrepresentante();
      $scope.repPrincipal = false;

    } else if (valorCheck == 'NO') {
      $scope.repPrincipal = true;
      $('#f01_pri_nom_rep').val($rootScope.datosIniciales.f01_pri_nom_rep);
      $('#f01_ape_pat_rep').val($rootScope.datosIniciales.f01_ape_pat_rep);
      $('#f01_ape_mat_rep').val($rootScope.datosIniciales.f01_ape_mat_rep);
      $('#f01_ape_cas_rep').val($rootScope.datosIniciales.f01_ape_cas_rep);
      $('#f01_num_doc_rep').val($rootScope.datosIniciales.f01_num_doc_rep);
      $('#f01_expedido_rep').val($rootScope.datosIniciales.f01_expedido_rep);
      $('#f01_ges_vig_pod').val(sessionService.get('NRO_PODER_PRINCIPAL'));
      $scope.datosIniciales.f01_ges_vig_pod_sec = "";
      //var oid_ciu1 = sessionService.get('IDCIUDADANO');
      $scope.file_CI_origen = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";
      $scope.file_CI_inv_origen = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";
      $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";
      $scope.obtArchivosAdjuntos[1].campo = $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA;
      $scope.obtArchivosAdjuntos[1].url = $scope.file_CI_origen;

      $scope.obtArchivosAdjuntos[2].campo = $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR;
      $scope.obtArchivosAdjuntos[2].url = $scope.file_CI_inv_origen;

      $scope.obtArchivosAdjuntos[3].campo = $rootScope.datosIniciales.f01_poder_representante;
      $scope.obtArchivosAdjuntos[3].url = $scope.rep_legal;

      ////////////////////////
      $scope.requiRecuperados[1].campo = $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA;
      $scope.requiRecuperados[1].url = $scope.file_CI_origen;

      $scope.requiRecuperados[2].campo = $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR;
      $scope.requiRecuperados[2].url = $scope.file_CI_inv_origen;

      $scope.requiRecuperados[3].campo = $rootScope.datosIniciales.f01_poder_representante;
      $scope.requiRecuperados[3].url = $scope.rep_legal;
    }

  }
  $scope.iniAntenas = function () {
    $scope.nro_rep_legalPrincipal = $rootScope.datosIniciales.f01_num_pod_leg;
    graficar_mapa("mapa1");
    //graficar_mapa("mapa2");
    //mapas(sessionService.get('IDTRAMITE'));
    $scope.recuperarrepresentante();
    $("#idtramite").val(sessionService.get('IDTRAMITE'));
  }

  $scope.startDateOpen = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened = true;
  };
}