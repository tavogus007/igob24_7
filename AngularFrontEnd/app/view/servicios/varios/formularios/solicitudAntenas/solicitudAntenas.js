function solicitudJAntenasController($scope,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter, $route,sweet,$http,
  FileUploader,$sce,fileUpload,$timeout , filterFilter,FileUploader,fileUpload1, $location, wsRgistrarPubliciadad, obtFechaActual ) 
{
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
    $scope.req_difusion ="";
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

    $scope.dataforma_sj = {
      availableOptions: [
        {id: 'AUTOSOPORTADOS', name: 'AUTOSOPORTADOS'},
        {id: 'ARRIOSTRADOS', name: 'ARRIOSTRADOS'},
        {id: 'ADOSADOS', name: 'ADOSADOS'}
      ]
    };
    $scope.datacategoria = {
      availableOptions: [
        {id: 'GRAN ESCALA', name: 'I. GRAN ESCALA'},
        {id: 'ESCALA MEDIA', name: 'II. ESCALA MEDIA'},
        {id: 'ESCALA MENOR', name: 'III. ESCALA MENOR'},
        {id: 'ESCALA DOMÉSTICA', name: 'IV. ESCALA DOMÉSTICA'}
      ]
    };

    $scope.datasoporte = {
      availableOptions: [
        {id: 'MÁSTILES', name: 'MÁSTILES'},
        {id: 'MONOPOSTES', name: 'MONOPOSTES (Postes mayores)'},
        {id: 'TORRES', name: 'TORRES'},
        {id: 'POSTES', name: 'POSTES'},
        {id: 'TORRETAS', name: 'TORRETAS'},
        {id: 'COW', name: 'COW (Celdas sobre ruedas)'},
        {id: 'COLT', name: 'COLT (Celdas en camiones de luz)'},
        {id: 'GABINETES', name: 'GABINETES'},
        {id: 'PARA ANTENAS SATELITALES', name: 'PARA ANTENAS SATELITALES'}
      ]
    };

    $scope.habilitaSoprteRU = function(){
      $rootScope.soporteRU = false;
      $scope.actualizar_soporte = true;
      $scope.guardar_soporte = false;
      $("#tipo_sop").val("");
      $("#categoria").val("");
      $("#forma_sj").val("");
      $("#altura").val("");
      $("#n_antenas").val("");

    }
    $scope.limpiarValores = function(){
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
        $scope.req_difusion ="";
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
        if(radios == undefined){
          $scope.valorControl = $rootScope.datosIniciales.g_tipo;
          if($scope.valorControl == "RBM"){
            radios = "RM";
          }
        }
        console.log("AAAAAA",radios);
        console.log("bla vla bla ",$rootScope.datosIniciales);
        switch(radios) {
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
              swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias..","error");
        }
    }
    $scope.tipoReg;
    $scope.valid_tipo = function() {
      alert($scope.URLAPI);
      var radios = $('input:radio[name=r_tipo]:checked').val();
      $("#den_auto").val("");
      $("#den_rbase").val("");
      $("#ub_rbase").val("");
      $("#tp_prop").val("");
      $("#lt_ubicacion").val("");
      $("#ln_ubicacion").val("");
      $("#den_ngabinete").val("");
      $("#observacion").val("");
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
      $scope.ANTT_CART_NOTARIADA  = null;
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
      //mostrarRMGM
      switch(radios) {
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

              //$scope.ANTT_PLAN_FORM_DIG = null;
              //$scope.hab_sop_gabinete();
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
              swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias44..","error");

      }     
    }
    $scope.habilitarR = function(radio){
     var radioss = radio

     switch(radioss) {
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

    $scope.habilitacion = function(){
      $scope.requisito = "mostrar";
      $scope.continuar = null;
    }
    
    $scope.recuperaDescripcion = function(nombre){
       
      var texto = '';
      switch(nombre) {
          case "ANTT_CON_ARR":
              if($("#tp_prop").val() == "PRIVADA" || $("#tp_prop").val() == "HORIZONTAL" ){
                var tf_con_arr = "";
                if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                  tf_con_arr = "gabinete.";
                }else{
                  tf_con_arr = "soportes de antenas.";

                }
                texto = 'a) Contrato de Arrendamiento vigente suscrito entre el propietario del sitio y el solicitante, que establezca tiempo, lugar y la autorización para el emplazamiento de '+ tf_con_arr;
              }else if($("#tp_prop").val() == "DOMINIO MUNICIPAL"){
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
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                tf_polSeg = "gabinetes.";
              }else{
                tf_polSeg = "soportes de antenas de telecomunicaciones.";

              }
              texto = 'f) Póliza de Seguro de Responsabilidad Civil y/o Daños a Terceros que cubra al titular de la solicitud sobre posibles daños a terceros durante la instalación, construcción, funcionamiento y/o vida útil del o los '+tf_polSeg+' Dicha garantía o su renovación deberá encontrarse indefectiblemente vigente por el tiempo que dure la autorización, no debiendo existir periodos sin cobertura.';
              
              break;
          case "ANTT_CERT_AUT_TRIB":
              texto = 'g) Certificación de la Autoridad Tributaria Municipal sobre la inexistencia de deudas pendientes de pago con el municipio, respecto a obligaciones pendientes de pago por gestiones vencidas o deudas de cualquier tipo provenientes de resoluciones o sentencias ejecutoriadas.';
              
              break;
          case "ANTT_CART_NOT":
              var tf_carnot = "";
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                tf_carnot = "gabinetes ";
              }else{
                tf_carnot = "soportes ";

              }
              texto = 'h) Carta Notariada del solicitante señalando que el o los '+tf_carnot+'para los cuales se gestiona autorización no cuentan con sanciones pendientes de cumplimiento con el Gobierno Autónomo Municipal de La Paz.';
              
              break;
          case "ANTT_PLAN_MIME":
              texto = 'i) Plan de mimetización, de acuerdo a lo señalado en el Artículo 12 de la Ley Municipal Autonómica Nº 278, y el Artículo 13 del presente Reglamento. * Cuando la mimetización no sea factible, se deberá presentar un Informe Técnico fundamentado con respaldo en criterios estructurales, ambientales y otros, según corresponda; y será elaborado y firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
              break;
          case "ANTT_PLAN_MANT":
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                texto = "j) Plan de mantenimiento del o los gabinetes de acuerdo a lo señalado en el Artículo 30 del Reglamento a la LMA Nº 278.";
              }else{
                texto = 'j) Plan de mantenimiento del o los soportes y de la radio base de acuerdo a lo señalado en el Artículo 30 del presente Reglamento.';

              }
              
              break;
          case "ANTT_EST_GEOLOGICO":
              texto = 'k) En el caso específico de que el emplazamiento de soportes de antenas de Gran Escala esté ubicado en áreas de riesgo muy alto de acuerdo Mapa de Riesgos vigente del Gobierno Autónomo Municipal de La Paz se deberá adjuntar obligatoriamente a la solicitud, un estudio geológico geotécnico que detalle las obras civiles específicas que deberán realizarse a fin de que aseguren la estabilidad de la o las estructuras a emplazarse; y el plan de ejecución de las mismas. Estos documentos deberán estar elaborados y firmados por un profesional  debidamente habilitado para el ejercicio profesional.';
              
              break;
          case "ANTT_PLAN_FORM_DIG":
            if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                texto = "i) Planos en formato digital (PDF) con la firma del profesional responsable de su elaboración, de los detalles constructivos, características de los gabinetes y elementos complementarios como del sistema eléctrico.";
              }else{
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
              swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias..","error");
      }
      return texto;
    }
    $scope.guardarFiles = function(campo, nombre,url){
        var parAdjunto = '{"campo":"'+campo+'","nombre":"'+nombre+'","url":"'+url+'"}';
        $scope.requiRecuperados.push(JSON.parse(parAdjunto));
        $scope.fileadj = '{"File_Adjunto":'+JSON.stringify($scope.requiRecuperados)+'}';
        $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
    }
    $scope.guardarFilesFInal = function(campo, nombre,url){
        var parAdjunto = '{"campo":"'+campo+'","nombre":"'+nombre+'","url":"'+url+'"}';
        $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
        $scope.fileadj = '{"File_Adjunto":'+JSON.stringify($scope.rutaArchEnvioLotus)+'}';
        $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
    }
    
    $scope.guardarFilesAntenas = function(campo, nombre,url){
        $scope.descripcion = $scope.recuperaDescripcion(nombre);
        var parAdjunto = '{"campo":"'+campo+'","nombre":"'+$scope.descripcion+'","url":"'+url+'","id_campo":"'+nombre+'"}';
        $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
        $scope.fileadj = '{"File_Adjunto":'+JSON.stringify($scope.rutaArchEnvioLotus)+'}';
        $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
    }
    $scope.requiRecuperados = [];
    $scope.cert_difusion = function(nombre){
      console.log("$rootScope.datosIniciales====>",$rootScope.datosIniciales);
      $scope.btnEnviarFormLinea  =   true;
      $scope.rutaArchEnvioLotus = [];
      $scope.requiRecuperados   = [];
      $rootScope.botonesrodolfo = true;
      var verifFiles = new reglasnegocio();
      var tipo_file = "FILE_LIC_RADIODIFUSION";
      verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
      var oid_ciu = sessionService.get('IDSOLICITANTE');
      var oid_ciu1 = sessionService.get('IDCIUDADANO');
      
      verifFiles.parametros ='{"oidCiudadano":"' + oid_ciu + '","tipo_file":"'+ tipo_file +'"}';
      verifFiles.llamarregla(function(data){
          $scope.$apply();
          setTimeout(function(){
            data = JSON.parse(data);
            if(data[0].ant_sp_busquedafile != '' && 
              $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA != "" && 
              $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR!= "" && 
              $rootScope.datosIniciales.f01_poder_representante != "" )
            {
              $scope.file_CERT_RADIODIFUSION = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA +"/" + data[0].ant_sp_busquedafile + "?app_name=todoangular";  
              $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante +"/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";  
              $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante +"/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";  
              $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 +"/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";  
              var nombre_certificado = "Licencia de Radiodifusión";
              $scope.guardarFiles(data[0].ant_sp_busquedafile, nombre_certificado ,$scope.file_CERT_RADIODIFUSION );
              var nombre_ci = "Cedula de Identidad";
              $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA, nombre_ci ,$scope.file_CI );
              var nombre_ci_inv = "Cedula de Identidad Inversa";
              $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR, nombre_ci_inv ,$scope.file_CI_inv );
              var rep_legal = "Documento del Representante Legal";
              $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, rep_legal ,$scope.rep_legal );
              var radios = $('input:radio[name=r_tipo]:checked').val();
              $scope.autoriza = null;
              $scope.valor = false;
              $rootScope.botonesrodolfo = true;
              document.getElementById("condiciones").checked = 0;
              if(radios == "RM" || radios == "GM" && $scope.myFile == undefined){
                
                $rootScope.tabAdj = true; 
              }    
              if($('input:radio[name=r_tipo]:checked').val() != undefined){
                      $scope.requisito = null;
                      $scope.continuar = "mostrar";
                      $scope.valid_tipo();
              }else{
                    swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias555..","error");
                
              }
            }else{
                swal("Error!..","Es necesario que complemente los documentos necesarios para realizar el registro. Por favor Actualice su Información.","error");
            }
            $scope.$apply();
          },200);

        });

    }
    $scope.reqPropiedad = function(propiedad){
        $rootScope.requistosfile = false;
        /*$scope.den_autorizacionFIle = $("#den_auto").val();
        if( $scope.den_autorizacionFIle.length > 0){
          $scope.ANTT_ADJ_AUTORIZACION = "mostrar";
        }else{
           $scope.ANTT_ADJ_AUTORIZACION = null;
        }*/
        switch(propiedad) {
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
          //default:
              //$scope.ANTT_PLAN_FORM_DIG = null;
              //$scope.ANTT_CON_ARR = null;
              //$scope.ANTT_CART_NOTARIADA = null;
              //$scope.ANTT_AUT_ESC_COPROP = null;
              //$scope.ANTT_DOC_AUT_LUG_ESP_PUB = null;
        }
        if($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
          $scope.limpearRequisitos();
          $scope.hab_sop_gabinete();
        }
    }
    $scope.radianes = [];
    $scope.addRadianes = function(){
      var tam = $scope.radianes.length;
      $scope.radianes.push({
        "id":tam,
        "descripcion":"",
        "tamanio":"",
        "vsca_datos":{
        "mostrarbtnGS":true,
        "mostrarbtnES":false,
        "mostrarbtnDS":false,
        "btneditar":false,
        "btneliminar":false,
        "btneliminarpos":true,
        "mostrar":false
        }
      });
    }
    $scope.eliminarPosicion = function(datos,posicion){
    
      $scope.radianes.splice(posicion,1);
    }

    $scope.eliminarSoporte = function(datos,posicion){
      swal({  title: "Esta seguro de eliminar el Registro del Soporte?",
              text: "Presione Si para eliminar el Registro!",
              type: "warning",   showCancelButton: true,
              confirmButtonColor: "#DD6B55",  
              confirmButtonText: "Si, Eliminar!",
              closeOnConfirm: false
              }, function(){

                $scope.lstSoporteprevio.splice(posicion,1);
                swal('Ok!', 'El registro del soporte se elimino correctamente', 'success');
                
                $scope.lstSoportes();
      });
    }
    $scope.editaSoporte = function(datos){
          $scope.actualizar_soporte = false;
          $scope.guardar_soporte = true;
          $rootScope.soporteRU = false;
          $("#tipo_sop").val(datos.tipoSoporte);
          $("#categoria").val(datos.categoria);
          $("#forma_sj").val(datos.frmSujecion);
          $("#altura").val(datos.altura);
          $("#n_antenas").val(datos.nro_antenas);
          $scope.possoporte = datos.$$hashKey;
    } 
    $scope.act_datasoporte = function(data){
     
      try{
        $scope.soporteActualizar = [];
        for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
          if($scope.lstSoporteprevio[i].$$hashKey == $scope.possoporte){
            var dataregistro = '{"tipoSoporte":"'+data.tipo_sop+'","categoria":"'+data.categoria+'","frmSujecion":"'+data.forma_sj+'","altura":"'+data.altura+'","nro_antenas":'+data.n_antenas+'}';
            $scope.soporteActualizar.push(JSON.parse(dataregistro));
          }else{
            $scope.soporteActualizar.push($scope.lstSoporteprevio[i]);
            
          }
        }
        $scope.lstSoporteprevio = [];
        $scope.lstSoporteprevio = $scope.soporteActualizar;
        $scope.lstSoportes();
        $rootScope.soporteRU = true;
        swal("Ok!","La actualización del soporte fue exitoso","success");
        $scope.mostrar_ActualizarRequisitos();
        $scope.torres_torretas_monoposte = null;
        $scope.mastiles_postes = null;
        $scope.cow = null;
        $scope.antsatelites = null;
        $rootScope.requisitosrbase = "mostrar";
        //$rootScope.soporteRU = true;
        for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
          if($scope.lstSoporteprevio[i].tipoSoporte == "TORRES" || $scope.lstSoporteprevio[i].tipoSoporte == "TORRETAS" || $scope.lstSoporteprevio[i].tipoSoporte == "MONOPOSTES"){
            $scope.torres_torretas_monoposte = "mostrar";
          }
          if($scope.lstSoporteprevio[i].tipoSoporte == "MÁSTILES" || $scope.lstSoporteprevio[i].tipoSoporte == "POSTES"){
            $scope.mastiles_postes = "mostrar";

          }
          if($scope.lstSoporteprevio[i].tipoSoporte == "COW"){
            $scope.cow = "mostrar";

          }
          if($scope.lstSoporteprevio[i].tipoSoporte == "GABINETES"){
            $scope.antsatelites = "mostrar";

          }
        }
      }catch(e){
        console.log("Error",e);
      }
      $("#tipo_sop").val("");
      $("#categoria").val("");
      $("#forma_sj").val("");
      $("#altura").val("");
      $("#n_antenas").val("");

    }
    $scope.eliminarSoporteMultiple = function(datos,posicion){
      $scope.lstSoporteprevio_m.splice(posicion,1);
      $scope.lstSoportes_m();
    }
    
    $scope.inc_Radianes = function(){
      $scope.html = "";
      var idName = 1;
      var titulo = "Altura Radian ";
      var cantidad = 3;

      for (var i = 0; i < cantidad; i++) {
        $scope.html = $scope.html + '<div class="col-md-12"> ';
        $scope.html = $scope.html + '<div class="form-group" > ' ;
        $scope.html = $scope.html + '<div class="controls"> ' ;
        $scope.html = $scope.html + '<label for="url" >' + titulo+i+ ':</label> ' ;
        $scope.html = $scope.html + '<input id="radian" onkeyUp="return conMayusculas(this)" name="registro" value = "" type="number" class="form-control" placeholder="' + titulo + '" ng-model="dataAnt.rad' + idName + '">' ;
        $scope.html = $scope.html + '</div></div></div> ';
      }
      document.getElementById("cont_radianes").innerHTML=$scope.html;
    }
    $scope.reg_soporte = function(data){

      try{

        if($("#tp_prop").val() == ""){
            swal("Nota","Para completar el registro del soporte es necesario selecionar el tipo de propiedad Gracias","error");

        }else{
          if($("#categoria").val() != "" && $("#forma_sj").val() != "" && $("#tipo_sop").val() != "" ){
            if( data.altura != undefined  && data.n_antenas != undefined){
              $scope.radianeslst = [];
              var datos;
              for (var i = 0; i < $scope.radianes.length; i++) {
                datos = '{"descripcion":"'+$scope.radianes[i].descripcion+'","tamanio":"'+$scope.radianes[i].tamanio+'"}';
                $scope.radianeslst.push(JSON.parse(datos));
              }
              var dataregistro = '{"tipoSoporte":"'+data.tipo_sop+'","categoria":"'+data.categoria+'","frmSujecion":"'+data.forma_sj+'","altura":"'+data.altura+'","nro_antenas":'+data.n_antenas+'}';
              $scope.lstSoporteprevio.push(JSON.parse(dataregistro));
              for (var i = 0; i < $scope.arrayfiles.length; i++) {

                  $scope.rutaArchEnvioLotus.push($scope.arrayfiles[i]);
              }
             
              for (var i = 0; i < $scope.lstSoporteprevio.length; i++) {
                if($scope.lstSoporteprevio[i].tipoSoporte == "TORRES" || $scope.lstSoporteprevio[i].tipoSoporte == "TORRETAS" || $scope.lstSoporteprevio[i].tipoSoporte == "MONOPOSTES"){
                  $scope.torres_torretas_monoposte = "mostrar";
                }
                if($scope.lstSoporteprevio[i].tipoSoporte == "MÁSTILES" || $scope.lstSoporteprevio[i].tipoSoporte == "POSTES"){
                  $scope.mastiles_postes = "mostrar";

                }
                if($scope.lstSoporteprevio[i].tipoSoporte == "COW"){
                  $scope.cow = "mostrar";

                }
                if($scope.lstSoporteprevio[i].tipoSoporte == "GABINETES"){
                  $scope.antsatelites = "mostrar";

                }
              }
              swal("Ok!","Se registro el soporte con exitó Gracias","success");
               $scope.arrayfiles =[];
              $("#tipo_sop").val("");
              $("#categoria").val("");
              $("#forma_sj").val("");
              $("#altura").val("");
              $("#n_antenas").val("");
              $scope.radianes =[];
              $scope.lstSoportes();
              $scope.mostrar_ActualizarRequisitos();
              $scope.torres_torretas_monoposte = null;
              $scope.mastiles_postes = null;
              $scope.cow = null;
              $scope.antsatelites = null;
              $rootScope.requisitosrbase = "mostrar";
              $rootScope.soporteRU = true;

            }else{
              swal("Error","Es necesario completar la altura y el número de antenas Gracias","error");
              
            }
           
          }else{
            swal("Error","Es necesario completar el tipo de soperte, la categoria y la forma de sujeción Gracias","error");
          }
          
        }

      }catch(e){
      }
    }
    $scope.limpearRequisitos = function(){

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
      $("#ANTT_LIC_AMB_campo").val("");  
    }
    $scope.mostrar_ActualizarRequisitos = function(){
      //console.log("Estudio fffff",$scope.lstSoporte);
      //$scope.limpearRequisitos(); 
      $scope.den_autorizacionFIle = $("#den_auto").val();
        if( $scope.den_autorizacionFIle.length > 0){
          $scope.ANTT_ADJ_AUTORIZACION = "mostrar";
        }else{
          $scope.ANTT_ADJ_AUTORIZACION = null;
      }
      var tipoProp = $("#tp_prop").val();
      //console.log("tipoProp",tipoProp); 
      var categoria = "";
        for (var i = 0; i < $scope.lstSoporte.length ; i++) {
          var tipo = $scope.lstSoporte[i].tipoSoporte;
          $rootScope.requistosfile = false;
          categoria = $scope.lstSoporte[i].categoria;
          //console.log("TIPOOOO",tipo);
            switch(tipo) {
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
    $scope.habilitasoporte1 = function(categoria){
        $scope.ANTT_LIC_AMB = "mostrar";

        //if(categoria =="GRAN ESCALA"){
          $scope.ANTT_EST_GEOLOGICO = "mostrar";
        //}
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
        $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    }

    $scope.habilitasoporte2 = function(categoria){
        $scope.ANTT_LIC_AMB = "mostrar";
        //if(categoria =="GRAN ESCALA"){
          $scope.ANTT_EST_GEOLOGICO = "mostrar";

        //}
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
        $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";

    }                 
    $scope.habilitasoporte3 = function(categoria){
        $scope.ANTT_LIC_AMB = "mostrar";
        //if(categoria =="GRAN ESCALA"){
          $scope.ANTT_EST_GEOLOGICO = "mostrar";
        //}
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
        $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";

    }
    $scope.habilitasoporte4 = function(categoria){
        $scope.ANTT_LIC_AMB = "mostrar";
        //if(categoria =="GRAN ESCALA"){
          $scope.ANTT_EST_GEOLOGICO = "mostrar";

         //}
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
        $scope.ANTT_DESC_ESQ_BALIZAMIENTO = "mostrar";
    }
    
    $scope.hab_sop_gabinete = function(){
        console.log("dddddd",$scope.requistosfile);
        $scope.ANTT_LIC_AMB = "mostrar";
        $scope.ANTT_POL_SEG = "mostrar";
        $scope.ANTT_CERT_AUT_TRIB = "mostrar";
        $scope.ANTT_CART_NOT = "mostrar";
        $scope.ANTT_PLAN_MANT = "mostrar";
        //$scope.ANTT_INF_TEC_EMITIDO = "mostrar";
        $scope.ANTT_PLAN_FORM_DIG = "mostrar";
        $scope.ANTT_INF_TEC_EMITIDO_GAB = "mostrar";
        $scope.FORMATO_DIG_ADJ = "mostrar";
        //$scope.ANTT_PLAN_DET_CONST_CAT = "mostrar";
        //$scope.ANTT_PLAN_ELEM_COMPL = "mostrar";
        //$scope.ANTT_PLAN_CAR_GAB = "mostrar";
    }

    $scope.hab_sop_prop_mun = function(categoria){
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
        $scope.ANTT_INF_TEC_EMITIDO = "mostrar";
    }

    $scope.habilitasoporte7 = function(categoria){
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
    $scope.lstSoportes = function() {
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
        getData: function($defer, params) {
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
    var dataEnvLotus ; 
    $scope.arraySoporte = [];
    $scope.infodatamultiple = [];
    $scope.ultimoRegistro = function(dataAnt){
      switch($scope.tipoReg) {
          case "R_UNICO":
              for (var i = 0; i < $scope.lstSoporteprevio.length ; i++) {
                var objeto = '{"altura":"'+$scope.lstSoporteprevio[i].altura+'","categoria":"'+$scope.lstSoporteprevio[i].categoria+'","frmSujecion":"'+$scope.lstSoporteprevio[i].frmSujecion+'","tipoSoporte":"'+$scope.lstSoporteprevio[i].tipoSoporte+'","nro_antenas":'+$scope.lstSoporteprevio[i].nro_antenas+'}';
                $scope.arraySoporte.push(JSON.parse(objeto));
              }
              var autorizacion1 =dataAnt.den_auto;
              var autorizacion2='';
              if(autorizacion1!=null){autorizacion2 =dataAnt.den_auto;}else{autorizacion2='';}
              dataEnvLotus = '[{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","ANT_NOM_RADBASE":"'+dataAnt.den_rbase+'","ANT_UBICA_RBASE":"'+dataAnt.ub_rbase+'","ANT_TIP_PROPIEDAD":"'+dataAnt.tp_prop+'","f01_Ubicacion":'+JSON.stringify($scope.UbicacionData)+',"f01_GRD_SOPORTE":'+JSON.stringify($scope.arraySoporte)+',"ANT_NRO_GAB":'+dataAnt.den_ngabinete+',"ANT_NRO_AUTO":"'+autorizacion2+'","ANT_OBSERVACION":"'+$("#observacion").val()+'"}]';
              $rootScope.Antenas = JSON.parse(dataEnvLotus);
              $scope.tipoProceso = "ANTT"; 
              $scope.arraySoporte = [];
              var ubicacionutm = $("#ln_ubicacion").val();
              ubicacionutm = ubicacionutm.split("(");
              ubicacionutm = ubicacionutm[1].split(")");
              ubicacionutm = ubicacionutm[0];
              var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
              $scope.guardarUbicacion(dataUbi); 

              break;
          case "R_MULTIPLE":
              for (var i = 0; i < $scope.lstSoporteprevio.length ; i++) {
                var objeto = '{"altura":"'+$scope.lstSoporteprevio[i].altura+'","categoria":"'+$scope.lstSoporteprevio[i].categoria+'","frmSujecion":"'+$scope.lstSoporteprevio[i].frmSujecion+'","tipoSoporte":"'+$scope.lstSoporteprevio[i].tipoSoporte+'","nro_antenas":'+$scope.lstSoporteprevio[i].nro_antenas+'}';
                $scope.arraySoporte.push(JSON.parse(objeto));
              }

              for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
                $scope.guardarUbicacion($scope.grilla_rbmultiple[i].f01_UbicacionUdit); 
            
              }
              $rootScope.Antenas = $scope.grilla_rbmultiple;//JSON.parse(dataEnvLotus); 
              $scope.tipoProceso = "RBM"; 
              break;
          case "G_UNICO":

              var autorizacion1 =dataAnt.den_auto;
              var autorizacion2='';
              if(autorizacion1!=null){ autorizacion2 =dataAnt.den_auto; }else{autorizacion2='';}
              dataEnvLotus = '[{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","ANT_NOM_RADBASE":"'+dataAnt.den_rbase+'","ANT_UBICA_RBASE":"'+dataAnt.ub_rbase+'","ANT_TIP_PROPIEDAD":"'+dataAnt.tp_prop+'","f01_Ubicacion":'+JSON.stringify($scope.UbicacionData)+',"ANT_NRO_GAB":'+dataAnt.den_ngabinete+',"ANT_NRO_AUTO":"'+autorizacion2+'","ANT_OBSERVACION":"'+$("#observacion").val()+'"}]';
              $rootScope.Antenas = JSON.parse(dataEnvLotus);
              $scope.tipoProceso = "RG";

              var ubicacionutm = $("#ln_ubicacion").val();
              ubicacionutm = ubicacionutm.split("(");
              ubicacionutm = ubicacionutm[1].split(")");
              ubicacionutm = ubicacionutm[0];
              var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
              $scope.guardarUbicacion(dataUbi); 
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
    $scope.recuperacheck = function(){
      var valor = $('#condiciones:checked').val(); 
      if(valor=='1'){ $scope.autoriza="mostrar";}else{ $scope.autoriza=null; $("#den_auto").val("");}
      
    }
    $scope.lstradianes = [];
    $scope.detalleradianes = function(dataAnt){
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
        getData: function($defer, params) {
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
    $scope.lstDatosIniciales = function(Antenas) {
      if (Antenas != undefined){
        if($scope.lstvista != []){
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
        if($scope.lstvista != []){
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
        getData: function($defer, params) {
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
    $scope.habilitasoporte1_req1 = function(files){
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
           switch(files[i].id_campo) {
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
    $scope.habilitasoporte_req2 = function(files){
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
           switch(files[i].id_campo) {
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
    $scope.habilitasoporte_req3 = function(files){
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
           switch(files[i].id_campo) {
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
    $scope.habilitasoporte_req4 = function(files){
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
         switch(files[i].id_campo) {
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
    $scope.hab_sop_gabinete_req = function(files){
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
           switch(files[i].id_campo) {
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
    $scope.hab_sop_prop_mun_req = function(files){
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
          switch(files[i].id_campo) {
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
    $scope.mostrar_Req_rec = function(datarec){

      $scope.tipoProp = datarec.GRD_ANTENAS[0].ANT_TIP_PROPIEDAD;
      $scope.lstSoportesreq = datarec.GRD_ANTENAS[0].f01_GRD_SOPORTE;
      if($scope.tipoProp != "DOMINIO MUNICIPAL"){
        var soprte_req = "";
        for (var i = 0; i < $scope.lstSoportesreq.length; i++) {
          soprte_req = $scope.lstSoportesreq[i].tipoSoporte;
          switch(soprte_req) {
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
      }else{
        $scope.hab_sop_prop_mun_req(datarec.File_Adjunto);
      }
    }
    $scope.estadoTramite = "";
    $rootScope.asgnvalores = function(data,estado) {
      ////////////////// RODOLFO CODIGO MARAVILLA ///////////
      $scope.fechaVerifica = obtFechaActual.obtenerFechaActual();
      $scope.fechaVerifica = $scope.fechaVerifica.split(" ")[0];
      $scope.fechaDia = $scope.fechaVerifica.split("-");
      $scope.dia = $scope.fechaDia[2];
      if($scope.dia <= 9) {
        $scope.fechaVerifica = $scope.fechaDia[0] + "-" + $scope.fechaDia[1] + "-0"+$scope.dia; 
      };
      $scope.infoReserva = $rootScope.datosIniciales;
      $scope.estadoTramite = estado;
      var filesAdjunto = JSON.parse(data[0].form_contenido);
      var data2 = JSON.parse(data[0].form_contenido);

      $scope.rutaArchEnvioLotus = data2.File_Adjunto;
      if(data2.g_tipo == "ANTT"){
        $scope.tipoReg = "R_UNICO";
      }
      if(data2.g_tipo == "RBM"){
        $scope.tipoReg = "R_MULTIPLE"; 
      }
      if(data2.g_tipo == "GM"){
        $scope.tipoReg = "G_MULTIPLE"; 
      }
      if(data2.g_tipo == "RG"){
        $scope.tipoReg = "G_UNICO"; 
      }    
      //alert($scope.tipoReg);  
      $scope.getArchivosAdjuntos(filesAdjunto);
      if(estado == "NO"){
        $rootScope.botones = false;
        $rootScope.botonesrodolfo = true;
        $rootScope.botonesrodo = true;
        $scope.n_autorizacion_1 = false;
        $scope.n_autorizacion = false;
        //$scope.mostrarReqfaltantes();
      }else{
        //alert(454354);
        $rootScope.botones = true;
        $rootScope.botonesrodolfo = false;
        $rootScope.botonesrodo = true;
        $scope.n_autorizacion_1 = true;
        $scope.n_autorizacion = true;
        $scope.mostrarbtn_multiple = true;

        if($scope.tipoReg == "G_UNICO"){
          $scope.mostrarRUGU = "mostrar";
          $scope.mostrarRMGM = true;
          $rootScope.tabAdj = false;
        }


      }
      //console.log("=========>",$scope.mostrarRUGU);
      var datas = data2.GRD_ANTENAS[0];
      //console.log("sssssasdasdsadasdasdsadas",datas);
      $scope.valor = true;

      switch (datas.f01_TIPO_REGISTRO){
        case "R_UNICO":
          //alert("r_unico");

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
          $scope.radiobase_simple = "mostrar";
          $scope.lstSoporteprevio = datas.f01_GRD_SOPORTE;
          $scope.lstSoportes();

          if(estado == "NO"){
            $rootScope.botonesrodolfo = true;
            $rootScope.botonesrodo = false;
            $scope.mostrar_Req_rec(data2);
            $scope.mostrarbtn_multiple = true;
          }else{
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
          //alert("g_unico");
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

          $scope.lstSoporteprevio = datas.f01_GRD_SOPORTE;
          $scope.lstSoportes();

          if(estado == "NO"){
            $rootScope.botonesrodolfo = true;
            $rootScope.botonesrodo = false;
            $scope.mostrar_Req_rec(data2);
            $scope.mostrarbtn_multiple = true;
          }else{
            $rootScope.botonesrodolfo = false;
            $rootScope.botonesrodo = true;

          }
              $rootScope.mostrarRU = false;
              $rootScope.mostrardiv = null;
              $rootScope.mostrardivform = "mostrar";
              $rootScope.radiobas_env = "mostrar";
              $rootScope.soporteRU = true;
              $scope.mostrarRUGU = "mostrar";//false;
              $scope.mostrarbtn_multiple = false;
              $scope.radiobase_simple = "mostrar";
              $scope.mostrarRMGM = true;
             
              $scope.mostrarbtn_multiple = true;
              $scope.actualizarbtn_multiple = true;
              $rootScope.tabAdj = false;
              $scope.hab_boton_guardar = true;
          break;
        case "R_MULTIPLE":
          $scope.grilla_rbmultiple = data2.GRD_ANTENAS; 
          $scope.lst_grilla_multiple();
          if(estado == "NO" ){
            $scope.autoriza = null;
            $rootScope.botonesrodo = false;
            $rootScope.botonesrodolfo = true;
            if(data2.ANT_NRO_AUTORIZACION != ""){
              $scope.n_autorizacion_1 = true;
              $scope.n_autorizacion = false;
              $scope.chec_autorizacion = true;
              $scope.autoriza = "mostrar";
              $("#den_auto").val(data2.ANT_NRO_AUTORIZACION);
              $rootScope.rbase_multiple = false; 
            }else{
              $scope.n_autorizacion = false;
              $scope.n_autorizacion_1 = true;
              $scope.chec_autorizacion = false;
            }
          }else{
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
          if(estado == "NO" ){
            $scope.autoriza = null;
            $rootScope.botonesrodo = false;
            $rootScope.botonesrodolfo = true;
            if(data2.ANT_NRO_AUTORIZACION != ""){
              $scope.n_autorizacion_1 = true;
              $scope.n_autorizacion = false;
              $scope.chec_autorizacion = true;
              $scope.autoriza = "mostrar";
              $("#den_auto").val(data2.ANT_NRO_AUTORIZACION);
              //$rootScope.rbase_multiple = false; 
            }else{
              $scope.n_autorizacion = false;
              $scope.n_autorizacion_1 = true;
              $scope.chec_autorizacion = false;
            }
          }else{

            $scope.chec_autorizacion = true;
            $scope.n_autorizacion = true;
            $scope.n_autorizacion_1 = false;
            $("#den_auto1").val(data2.ANT_NRO_AUTORIZACION);

          }
          $scope.grilla_rbmultiple = data2.GRD_ANTENAS; 
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
          position: {lat: parseFloat(datas.f01_LATITUD) , lng: parseFloat(datas.f01_LONGITUD)},
          map: map,
          icon: image,
          title: detalle
      });
    }

    $scope.getArchivosAdjuntos = function(datos){

        var archivosValidos = [];
        if (datos.File_Adjunto) {
            for (var i = 0; i<datos.File_Adjunto.length; i++) {
                archivo = ((typeof(datos.File_Adjunto[i]) == 'undefined' || datos.File_Adjunto[i] == null) ? ""   : datos.File_Adjunto[i]);
                if (archivo != "") {
                    archivosValidos.push(datos.File_Adjunto[i]);
                } 
            };
            $scope.obtArchivosAdjuntos=archivosValidos;
        } 

    };
    $scope.imprimirArchivo = function (fum) {
            var escudo = new Image();
            escudo.src = fum;
            $scope.varSpin = true;
            $scope.RegistroFUM={
                registrado:'OK',
                mensaje:''
            };
            var cadena= fum;
            if (cadena.indexOf('?') != -1){
                separador = '?';
                arreglodecadena = cadena.split(separador);
                cadena = arreglodecadena[0];
            }
            var tipoarch=cadena.substr(-4);
            var imagen = cadena.indexOf('.jpeg');
            if( tipoarch == '.PDF'){
                $scope.archotro = false;
                $scope.archpdf = true;
                $('#visorFum object').attr('data',fum);
                $timeout(function(){$scope.varSpin=false}, 1000);
            } else {
                var tipoimg = tipoarch.toUpperCase();
                if(tipoimg == '.BMP' || tipoimg == '.GIF') {
                $scope.archotro = true;
                $scope.archpdf = false;
                $scope.archivoP=fum;
                $('#imgSalida').attr("src",fum);
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
    $scope.eliminarArchivo = function(archivo, index){
        swal({   title: "Esta seguro de eliminar el Registro?",
              text: "Presione Si para eliminar el Registro!",
              type: "warning",   showCancelButton: true,
              confirmButtonColor: "#DD6B55",  
              confirmButtonText: "Si, Eliminar!",
              closeOnConfirm: false
              }, function(){
              $.blockUI();

                var nuevoAdjuntos = [];
                for (var i = 0; i< $scope.obtArchivosAdjuntos.length; i++) {
                  if(i == index){
                    $scope.volverVisualizar($scope.obtArchivosAdjuntos[i].id_campo);
                  }
                }
                $scope.obtArchivosAdjuntos.splice(index,1);
                swal("Ok.","El adjunto fue eliminado...","success");
                for (var i = 0; i< $scope.obtArchivosAdjuntos.length; i++) {
                    
                  nuevoAdjuntos.push($scope.obtArchivosAdjuntos[i]);
                    
                };
                $scope.fileadj = '{"File_Adjunto":'+JSON.stringify($scope.obtArchivosAdjuntos)+'}';
                $scope.rutaArchEnvioLotus = nuevoAdjuntos;
                $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
                $scope.obtArchivosAdjuntos = nuevoAdjuntos;
                $scope.datos.File_Adjunto = nuevoAdjuntos;
                $.unblockUI();     
                $scope.$apply();
        });
    };
    $scope.volverVisualizar = function(requisito){
      switch(requisito) {
          case "ANTT_CON_ARR":
            $scope.ANTT_CON_ARR = "mostrar";
              break;
          case "ANTT_CART_NOTARIADA":
              $scope.ANTT_CART_NOTARIADA = "mostrar";
              break;
          case "ANTT_AUT_ESC_COPROP":
              $scope.ANTT_AUT_ESC_COPROP = "mostrar";
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
          case "ANTT_PLAN_FORM_DIG":
              $scope.ANTT_PLAN_FORM_DIG = "mostrar";
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
          case "ANTT_DOC_AUT_LUG_ESP_PUB":
              $scope.ANTT_DOC_AUT_LUG_ESP_PUB = "mostrar";
              break;
          case "ANTT_PLAN_DET_CONST_CAT":
              $scope.ANTT_PLAN_DET_CONST_CAT = "mostrar";
              break;
          case "ANTT_DOC_AUT_LUG_ESP_PUB_ANT":
              $scope.ANTT_DOC_AUT_LUG_ESP_PUB_ANT = "mostrar";
              break;
          default:
              texto = '';
      }

    }
    $scope.registroNuevo = function(data) {
      
      $scope.myVar = "Hello World!";
      $("#lt_ubicacion").val(data[0]);
      $("#ln_ubicacion").val(data[1]);
      $scope.den_rbase = "holaaaaaaa";

      var data_mapa = '{"latitud":"'+data[0]+'","longitud":"'+data[1]+'"}';
      $scope.initMap();
      $scope.listarmrcmapa(JSON.parse(data_mapa));

    }

    $scope.registra = function(datosR) {
        var vlongitud = $("#ant_longitud").val();
        var vlatitud = $("#ant_latitud").val();
        if(datosR != undefined){
            if(datosR.den_rbase != undefined && datosR.nsoporte != undefined&& datosR.n_radiantes != undefined && datosR.tp_prop != undefined && datosR.ngabinete != undefined&& datosR.ub_rbase != undefined&& datosR.tipo_sop != undefined&& datosR.forma_sj != undefined&& datosR.categoria != undefined&& datosR.altura != undefined && datosR.ant_nombre != undefined){
                var datai = '{"latitud": "'+vlatitud+'","longitud": "'+vlongitud+'","nombre": "'+datosR.ant_nombre+'","ciciudadano":'+sessionService.get('CICIUDADANO')+',"ant_den_rbase": "'+datosR.den_rbase+'","ant_nsoporte": '+datosR.nsoporte+' ,"ant_nradiantes":'+datosR.n_radiantes+' ,"ant_tppropiedad": "'+datosR.tp_prop+'","ant_ngabinete": '+datosR.ngabinete+' ,"ant_ubrbase":"'+datosR.ub_rbase+'","ant_tpsoporte": "'+datosR.tipo_sop+'","ant_frmsujecion": "'+datosR.forma_sj+'","ant_categoria": "'+datosR.categoria+'","ant_altura": '+datosR.altura+'}';                
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
            }else{
                
                swal('Ups!', 'Es necesario completar todos los campos', 'error');//alert("debe llenar los datos");
            }
        }else{
            swal('Ups!', 'Es necesario completar todos los campos', 'error');//alert("debe llenar los datos");
        }
    }
    $scope.eliminar = function(dataR){
        swal({   title: "Esta seguro de eliminar el Registro?",
            text: "Presione Si para eliminar el Registro!",
            type: "warning",   showCancelButton: true,
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Si, Eliminar!",
            closeOnConfirm: false
            }, function(){
            var elim_reg_Antena = new reglasnegocio();
            elim_reg_Antena.id = 272;                
            elim_reg_Antena.parametros = '{"id_antena":'+dataR.id_antena+'}';
            elim_reg_Antena.llamarregla(function(data){
                data = JSON.parse(data);
                if(data[0].ant_sp_elimina_antena_rc){
                    swal('Ok!', 'El registro se elimino correctamente', 'success');
                    $scope.$apply();
                    $scope.lstDatosIniciales();
                    $scope.initMap();
                }else{
                    swal('Error!', 'Se presento un problema al eliminar el registro', 'error');

                }
            });
        });
    }
    //implementacion de la capa dde google maps
    $scope.detalleData = function(dataR){
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
          position: {lat: latitud1 , lng: longitud1},
          map: map,
          icon: image,
          title: detalle
      });
      $scope.listarmarcadores("inicioss");
      $scope.nombrev = dataR.nombre;
      $scope.latitudv = dataR.latitud;
      $scope.longitudv = dataR.longitud;
      map.addListener('click', function(event) {
          $scope.deleteMarkers();
          $rootScope.laaa = event.latLng.lat();
          $rootScope.looo = event.latLng.lng();
          latLong[0] = $rootScope.laaa;
          latLong[1] = $rootScope.looo;
          $scope.addMarker(event.latLng);
          $scope.registroNuevo(latLong);
      });
    }
    $scope.refrescarDatos = function(){
      $scope.lstDatosIniciales();
      $scope.listarmarcadores("inicio");
      $scope.initMap(); 
    }


  //INCIO DE GOOGLE MAPS

    $scope.listarmrcmapa = function(datamapa) {
        var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
        beachMarker = new google.maps.Marker({
                      position: {lat: parseFloat(datamapa.latitud) , lng: parseFloat(datamapa.longitud)},
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
    $scope.initMap = function() {
        var haightAshbury = {
            lat: -16.495635,//parseFloat(lat),//-16.493042595164994,//,"-16.495635"
            lng: -68.133543//parseFloat(long)//-68.14869144596389,//-68.133543
        };

        try{
            map = new google.maps.Map(document.getElementById('mapActividad'), {
                zoom: 15,
                center: haightAshbury
            });
            $scope.listarmarcadores("inicio");
            map.addListener('click', function(event) {
                $scope.deleteMarkers();
                $rootScope.laaa = event.latLng.lat();
                $rootScope.looo = event.latLng.lng();
                latLong[0] = $rootScope.laaa;
                latLong[1] = $rootScope.looo;
                $scope.addMarker(event.latLng);
                $scope.registroNuevo(latLong);

            });
        }catch(err){}
    }
    $scope.listarmarcadores = function(datab) {
        var image = '../servicios/varios/formularios/solicitudAntenas/lpz_m.png';
        var ci_ciudadano = sessionService.get('CICIUDADANO');
        if($scope.puntosprevios == undefined){
            data = $scope.lstvista;
            if(data != ""){
                for(var i=0;i<data.length;i++){
                  var detalle = data[i].nombre;
                    beachMarker = new google.maps.Marker({
                      position: {lat: parseFloat(data[i].latitud) , lng: parseFloat(data[i].longitud)},
                      map: map,
                      icon: image,
                      title: detalle
                  }); 
              }
            }
          
        }else{
          data = $scope.puntosprevios;
            if(data != ""){
                for(var i=0;i<data.length;i++){
                  var detalle = data[i].nombre;
                    beachMarker = new google.maps.Marker({
                      position: {lat: parseFloat(data[i].latitud) , lng: parseFloat(data[i].longitud)},
                      map: map,
                      icon: image,
                      title: detalle
                  }); 
              }
            }
        }
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

  //FIN MAPAS DE GOOGLE 








    $scope.ultimoArrayAdjunto = function(){
      $scope.rcdata.push(JSON.parse('{ "tipo": "GRD", "campos": "f01_ADUL_G_CI|f01_ADUL_EXP_CIUD", "titulos": "CI|Exp.", "impresiones": "true|true|"}'));
      for (var i = 0; i < $scope.lstvista.length; i++) {
        $scope.rcdata.push($scope.lstvista[i]);
      }
      $rootScope.Antenas = $scope.rcdata;
    }

    
    ////////////////// registro radio base multiple /////////////////////////////////////
    $scope.lstSoporte_m = [];
    $scope.lstSoporteprevio_m = [];
    $scope.lstSoportes_m = function() {
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
        getData: function($defer, params) {
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
    $scope.lst_grilla_multiple = function() {
      //alert();
      $scope.estadoTramite = sessionService.get('ESTADO');
      console.log("lista de la grilla multiple",$scope.grilla_rbmultiple);
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
        getData: function($defer, params) {
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
    $scope.mostrarDet_m =function(){
      $scope.soporteRM = "mostrar";
      $scope.detalleRM = null;

    }
    $scope.resGabineteMultiple = null;
    $scope.inireg_rbMultiple =function(){

      $scope.mostrarRUGU = "mostrar";//false;
      $scope.mostrarbtn_multiple = false;
      $scope.actualizarbtn_multiple = true;
      $scope.mostrarRMGM = true;
      $rootScope.mostrarRU = false;
      $scope.btnGuardarRegistro = true;

      if($scope.tipoReg == "R_MULTIPLE"){
        $scope.radiobase_simple = "mostrar";
        $rootScope.rbase_multiple = false;
        $scope.hab_boton_guardar = true;
        $scope.resGabineteMultiple = null;
      }else{
        $scope.hab_boton_guardar = false;
        $scope.radiobase_simple = null;
        $rootScope.rbase_multiple = true;
        $scope.resGabineteMultiple = "mostrar";
      }
      $scope.soporteRM = null;
      $scope.guardarbtn1 = "mostrar";
      
      mapas(sessionService.get('IDTRAMITE'));
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
      $scope.lstSoporteprevio = [];
      $scope.lstSoportes();
      $scope.autoriza = null;
      $scope.chec_autorizacion = false;
      $rootScope.botones = true;

    }
    $scope.grilla_multiple = [];    
    $scope.guardar_data = function(data){
      if($("#tipo_sop_m").val() != "" && $("#categoria_m").val() != "" && $("#forma_sj_m").val() != "" && $("#altura_m").val() != "" && $("#n_antenas_m").val() != ""){
        $scope.radianeslst = [];
        var datos;
        for (var i = 0; i < $scope.radianes.length; i++) {
          datos = '{"descripcion":"'+$scope.radianes[i].descripcion+'","tamanio":"'+$scope.radianes[i].tamanio+'"}';
          $scope.radianeslst.push(JSON.parse(datos));
        }
        var dataregistro = '{"tipoSoporte":"'+data.tipo_sop_m+'","categoria":"'+data.categoria_m+'","frmSujecion":"'+data.forma_sj_m+'","altura":"'+data.altura_m+'","nro_antenas":'+data.n_antenas_m+'}';
        $scope.lstSoporteprevio_m.push(JSON.parse(dataregistro));
        $scope.grilla_multiple = $scope.lstSoporteprevio_m;
        $("#tipo_sop_m").val("");
        $("#categoria_m").val("");
        $("#forma_sj_m").val("");
        $("#altura_m").val("");
        $("#n_antenas_m").val("");
        $scope.radianes =[];
        $scope.lstSoportes_m();
        $scope.soporteRM = null;
        $rootScope.rbase_multiple = false;//"mostrar";
      }else{
          swal("Error","Para realizar el dettalle del soporte es necesario completar todos los campos Gracias","error");

      }

    }
    $scope.close_datos = function(){
      $("#tipo_sop_m").val("");
      $("#categoria_m").val("");
      $("#forma_sj_m").val("");
      $("#altura_m").val("");
      $scope.radianes =[];
      $scope.lstSoportes_m();
      $scope.soporteRM = null;
      $rootScope.soporteRU = true;
      $rootScope.rbase_multiple = false;//"mostrar";
    }
    $scope.close_data_multiple = function(data){

      $scope.mostrarRUGU = null;//true;
      $scope.mostrarbtn_multiple = true;
      $scope.radiobase_simple = null;
      $scope.mostrarRMGM = false;
      $rootScope.mostrarRU = true;
      $scope.btnGuardarRegistro = false;
      $rootScope.botones = false;
    }
    $scope.cargar_mapa = function()
    {
      $("#mapa1").empty();
      $("#ctlBusquedas").empty();
      $("#pal").text("BUSQUEDA");
      $("#msg1").empty();
      $("#results").empty();
      $("#dlgBusquedas").empty();
      $("#resultBusquedas").empty();
      graficar_mapa("mapa1");
    }

    $scope.lst_rb_multiples =[];
    $scope.reg_radiantes_multiple = function(data){
      if(data != undefined){
        if($scope.tipoReg == "R_MULTIPLE"){
          if($("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#den_ngabinete").val() != "" && data.den_rbase != undefined && $("#zona").val() != "" && data.den_ngabinete != undefined 
            && data.tp_prop != undefined && data.ub_rbase != undefined  )
          {
            var ubicacionutm = $("#ln_ubicacion").val();
            ubicacionutm = ubicacionutm.split("(");
            ubicacionutm = ubicacionutm[1].split(")");
            ubicacionutm = ubicacionutm[0];
            var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
            dataAnt1 = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()}; 

            var dataGrilla = '{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","f01_DENOMINACION":"'+data.den_rbase+'","f01_UBI_RB":"'+data.ub_rbase+'","f01_TIPO_UBIC":"'+data.tp_prop+'","f01_Ubicacion":'+JSON.stringify(dataAnt1)+',"f01_UbicacionUdit":'+JSON.stringify(dataUbi)+',"f01_NRO_GABINETE":'+data.den_ngabinete+',"cod_catastral":"'+$("#cod_catastral").val()+'","f01_GRILLA_SOPORTE":'+JSON.stringify($scope.lstSoporteprevio)+',"f01_NRO_AUTORIZACION":"'+$("#den_auto").val()+'","estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA"}';
            
            var grilla = JSON.parse(dataGrilla);
            $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
            $scope.lst_grilla_multiple();
            $scope.lstSoporte_m = [];
            $scope.mostrarRUGU = null;//true;
            $scope.mostrarbtn_multiple = true;
            $scope.radiobase_simple = null;
            //$scope.lstSoporteprevio_m = [];
            $scope.lstSoporteprevio = [];
            $scope.lstSoportes();
            swal("Ok.","Información Registrada exitosamente Gracias","success");
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
            $scope.cargar_mapa();
            document.getElementById("condiciones").checked = 0;
            $scope.autoriza = null;
            $scope.btnGuardarRegistro = false;
            //graficar_mapa("mapa1");
            $('#registroRBM').modal("hide");
            $scope.mostrarRMGM = false;
          }else{
            swal("Error","Por favor es necesario completar todos los campos Gracias","error");

          }
        }else if ($scope.tipoReg == "G_MULTIPLE"){
            //alert("gmultiple");
            if( $("#den_rbase").val() != "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#den_ngabinete").val() != "" && data.den_rbase != undefined && $("#zona").val() != "" && data.den_ngabinete != undefined 
            && data.tp_prop != undefined && data.ub_rbase != undefined){

              var ubicacionutm = $("#ln_ubicacion").val();
              ubicacionutm = ubicacionutm.split("(");
              ubicacionutm = ubicacionutm[1].split(")");
              ubicacionutm = ubicacionutm[0];
              var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
              dataAnt1 = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()}; 
              var dataGrilla = '{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","f01_DENOMINACION":"'+data.den_rbase+'","f01_UBI_RB":"'+data.ub_rbase+'","f01_TIPO_UBIC":"'+data.tp_prop+'","f01_Ubicacion":'+JSON.stringify(dataAnt1)+',"f01_UbicacionUdit":'+JSON.stringify(dataUbi)+',"f01_NRO_GABINETE":'+data.den_ngabinete+',"cod_catastral":"'+$("#cod_catastral").val()+'","f01_GRILLA_SOPORTE":'+JSON.stringify($scope.lstSoporteprevio)+',"f01_NRO_AUTORIZACION":"'+$("#den_auto").val()+'","estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA"}';
              
              var grilla = JSON.parse(dataGrilla);
              $scope.grilla_rbmultiple.push(JSON.parse(dataGrilla));
              $scope.lst_grilla_multiple();
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

              $('#registroRBM').modal("hide");
              swal("Ok.","Información Registrada exitosamente Gracias","success");
              $scope.mostrarRMGM = false;
              $("#den_auto").val("");
              document.getElementById("condiciones").checked = 0;
              $scope.autoriza = null;
              $scope.btnGuardarRegistro = false;

            }else{
              swal("Error","Por favor es necesario completar todos los campos Gracias","error");

            }
        }
      }else{
        
        swal("Error","Por favor es necesario completar todos los campos Gracias","error");
      }
      $rootScope.botones = false;
    }

    $scope.habilitaAdjuntosM = function(){
      if($scope.tipoReg == "R_MULTIPLE"){
        $rootScope.radiobas_env = "mostrar";
        $rootScope.requisitos = "mostrar";
        $rootScope.grillaRM= "mostrar";
        $scope.mostrarRequisitos($scope.grilla_rbmultiple);
        
      }
    }
    $rootScope.requisitosrbase = null;

    $scope.mostrarRequisitos = function(objeto){
      $rootScope.requisitosrbase = "mostrar";
      $scope.torres_torretas_monoposte = null;
      $scope.mastiles_postes = null;
      $scope.cow = null;
      $scope.antsatelites = null;
      for (var i = 0; i < objeto.length; i++) {
        var data = objeto[i].f01_GRILLA_SOPORTE;
        for (var j = 0; j < data.length; j++) {
          
          switch(data[j].tipoSoporte) {
              case "TORRES":
              case "MONOPOSTES":
              case "TORRETAS":
                
                  $scope.torres_torretas_monoposte = "mostrar";
                
                  break;  
              case "MÁSTILES":
              case "POSTES":  

                $scope.mastiles_postes =  "mostrar";
                  break;
              case "COW":
              
                $scope.cow =  "mostrar";
                  break;
              case "PARA ANTENAS SATELITALES":
                $scope.antsatelites =  "mostrar";
                  break;
              case "GABINETES":
                $scope.antsatelites =  "mostrar";
                  break;
              
          }
        }
      }
    }
    $scope.elim_reg_radiobase = function(datos,posicion){
      swal({   title: "Esta seguro de eliminar el Registro?",
            text: "Presione Si para eliminar el Registro!",
            type: "warning",   showCancelButton: true,
            confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Si, Eliminar!",
            closeOnConfirm: false
            }, function(){
              swal('Ok!', 'El registro se elimino correctamente', 'success');
              $scope.grilla_rbmultiple.splice(posicion,1);
              $scope.lst_grilla_multiple();
      });
    }

    $scope.det_grilla_multiple = function(data){
      try{

        $scope.btnGuardarRegistro = true;
        console.log("DFGDFG",datos);
        $scope.resGabineteMultiple = null;
        $("#den_rbase").val(data.f01_DENOMINACION);
        $("#ub_rbase").val(data.f01_UBI_RB);
        $("#tp_prop").val(data.f01_TIPO_UBIC);
        $("#lt_ubicacion").val(data.f01_LATITUD);
        $("#den_ngabinete").val(data.f01_NRO_GABINETE);
        $("#observacion").val(data.ANT_OBSERVACION);

        $scope.ubicacion = data.f01_Ubicacion;
        var puntosxy = $scope.ubicacion;
        puntosxy = puntosxy.ubicacion.split(" ");
        grafica_XY(puntosxy[0],puntosxy[1]);
        $("#zona").val($scope.ubicacion.zona);
        $("#macrodistrito").val($scope.ubicacion.macrodistrito);
        $("#cod_catastral").val($scope.ubicacion.cod_catastral);
        $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
        $scope.tipoReg == data.f01_TIPO_REGISTRO;
        if(data.f01_NRO_AUTORIZACION != ""){
          $scope.autoriza = "mostrar";
          $scope.chec_autorizacion = false;
          $("#den_auto").val(data.f01_NRO_AUTORIZACION);
          document.getElementById("condiciones").checked = 1;

        }else{
          $scope.autoriza = null;
          $scope.chec_autorizacion = false;
          document.getElementById("condiciones").checked = 0;
        }
        $scope.lstSoporteprevio = [];
        $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
        $scope.lstSoportes(); 
        $scope.posicion = data.$$hashKey;
        if($scope.tipoReg == "R_MULTIPLE"){
          $scope.radiobase_simple = "mostrar";
          $scope.actualizarbtn_multiple = true;
          $scope.hab_boton_guardar = true;

        }else{
          if($scope.tipoReg == "G_MULTIPLE"){
            $scope.resGabineteMultiple = "mostrar";
            $scope.actualizarbtn_multiple = true;
            $scope.hab_boton_guardar = true;

          }else{
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
      }catch(e){
        console.log("Error",e);
      }
    }

    $scope.enviarTRamiteRBM = true;
    $scope.verTRamiteRBM = true;
    $scope.det_grilla_multiple_vista = function(data){
      try{
        $rootScope.tabAdj = true;
        $scope.enviarTRamiteRBM = false;
        $scope.verTRamiteRBM = true;
        $scope.observarData = false;
        $scope.btnGuardarRegistro = true;
        $scope.mostrarbtn_multiple =  true;
        $("#den_rbase").val(data.f01_DENOMINACION);
        $("#ub_rbase").val(data.f01_UBI_RB);
        $("#tp_prop").val(data.f01_TIPO_UBIC);
        $("#lt_ubicacion").val(data.f01_LATITUD);
        $("#den_ngabinete").val(data.f01_NRO_GABINETE);
        $("#observacion").val(data.ANT_OBSERVACION);
        $scope.ubicacion = data.f01_Ubicacion;
        var puntosxy = $scope.ubicacion;
        puntosxy = puntosxy.ubicacion.split(" ");
        grafica_XY(puntosxy[0],puntosxy[1]);
        $("#zona").val($scope.ubicacion.zona);
        $("#macrodistrito").val($scope.ubicacion.macrodistrito);
        $("#cod_catastral").val($scope.ubicacion.cod_catastral);
        $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
        $scope.tipoReg == data.f01_TIPO_REGISTRO;
        if(data.f01_NRO_AUTORIZACION != ""){
          $scope.autoriza = "mostrar";
          $scope.chec_autorizacion = false;
          $("#den_auto").val(data.f01_NRO_AUTORIZACION);
          document.getElementById("condiciones").checked = 1;

        }else{
          $scope.autoriza = null;
          $scope.chec_autorizacion = false;
          document.getElementById("condiciones").checked = 0;
        }
        $scope.lstSoporteprevio = [];
        $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
        $scope.lstSoportes(); 
        $scope.posicion = data.$$hashKey;
        if($scope.tipoReg == "R_MULTIPLE"){
          $scope.mostrarRU = false;
          $scope.radiobase_simple = "mostrar"
          $scope.botonesrodolfo = false;

        }else{
          $scope.radiobase_simple = null;
          $scope.actualizarbtn_multiple = false;
          $scope.hab_boton_guardar = true;


        }
        $scope.mostrarRUGU = "mostrar";//false;
        //$scope.mostrarbtn_multiple = true;
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $scope.actualizarbtn_multiple = true;
      }catch(e){
        console.log("Error",e);
      }
    }
    $scope.actualizar_multiple = function(data){
        $scope.grilla_edita_multiple = [];
      if($scope.tipoReg == "R_MULTIPLE"){
        for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
            if($scope.grilla_rbmultiple[i].$$hashKey == $scope.posicion){
              var ubicacionutm = $("#ln_ubicacion").val();
              ubicacionutm = ubicacionutm.split("(");
              if(ubicacionutm.length == 2){
                ubicacionutm = ubicacionutm[1].split(")");
                ubicacionutm = ubicacionutm[0];
              }else{
                ubicacionutm = ubicacionutm[0];
              }
              var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
              dataAnt1 = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()}; 
              var dataGrilla = '{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","f01_DENOMINACION":"'+data.den_rbase+'","f01_UBI_RB":"'+data.ub_rbase+'","f01_TIPO_UBIC":"'+data.tp_prop+'","f01_Ubicacion":'+JSON.stringify(dataAnt1)+',"f01_UbicacionUdit":'+JSON.stringify(dataUbi)+',"f01_NRO_GABINETE":'+data.den_ngabinete+',"cod_catastral":"'+$("#cod_catastral").val()+'","f01_GRILLA_SOPORTE":'+JSON.stringify($scope.lstSoporteprevio)+',"f01_NRO_AUTORIZACION":"'+$("#den_auto").val()+'","estadoTramite":"NO ENVIADO","fecha_envio":"SIN FECHA"}';
              $scope.grilla_edita_multiple.push(JSON.parse(dataGrilla));   
              $scope.cargar_mapa();


            }else{
              $scope.grilla_edita_multiple.push($scope.grilla_rbmultiple[i]);
            }
        }
      }else{
        for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
            if($scope.grilla_rbmultiple[i].$$hashKey == $scope.posicion){
              var ubicacionutm = $("#ln_ubicacion").val();
              ubicacionutm = ubicacionutm.split("(");
              if(ubicacionutm.length == 2){
                ubicacionutm = ubicacionutm[1].split(")");
                ubicacionutm = ubicacionutm[0];
              }else{
                ubicacionutm = ubicacionutm[0];
              }
              var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
              dataAnt1 = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()}; 
              var dataGrilla = '{"f01_TIPO_REGISTRO":"'+$scope.tipoReg+'","f01_DENOMINACION":"'+data.den_rbase+'","f01_UBI_RB":"'+data.ub_rbase+'","f01_TIPO_UBIC":"'+data.tp_prop+'","f01_Ubicacion":'+JSON.stringify(dataAnt1)+',"f01_UbicacionUdit":'+JSON.stringify(dataUbi)+',"f01_NRO_GABINETE":'+data.den_ngabinete+',"cod_catastral":"'+$("#cod_catastral").val()+'","f01_GRILLA_SOPORTE":'+JSON.stringify($scope.lstSoporteprevio)+',"f01_NRO_AUTORIZACION":"'+$("#den_auto").val()+'"}';
              $scope.grilla_edita_multiple.push(JSON.parse(dataGrilla));      

            }else{
              $scope.grilla_edita_multiple.push($scope.grilla_rbmultiple[i]);
            }
        }
              
      }
          $scope.grilla_rbmultiple = [];
          $scope.grilla_rbmultiple = $scope.grilla_edita_multiple;
          swal('Ok!', 'La actualización del Registro se realizo correctamente', 'success');
          $scope.lst_grilla_multiple();
          $scope.btnGuardarRegistro = false;
          $scope.radiobase_simple = null;
          $scope.mostrarRUGU = null;//false;
          $scope.mostrarbtn_multiple = false;
          $scope.mostrarRMGM = false;
          $rootScope.mostrarRU = false;
          $scope.actualizarbtn_multiple = true;
    }
    $scope.close_editar_multiple = function(){
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
    $scope.verfifcarTipo = function(){
      var tipo_prop = $("#tipo_propiedad").val();
      if(tipo_prop == "SI"){
        $scope.opcion1 = "mostrar";
        $scope.opcion2 = null;
        $scope.opciones = "mostrar";
      }
      if(tipo_prop == "NO"){
        $scope.opcion1 = null;
        $scope.opcion2 = "mostrar";
        $scope.opciones = "mostrar";

      }
      
    }
    $scope.eliminarSoportemultiple = function(datos,posicion){
      
      $scope.lstSoporteprevio_m.splice(posicion,1);
      $scope.lstSoportes_m();
    }

    $scope.initMap1 = function() {
        var haightAshbury = {
            lat: -16.495635,//parseFloat(lat),//-16.493042595164994,//,"-16.495635"
            lng: -68.133543//parseFloat(long)//-68.14869144596389,//-68.133543
        };

        try{
            map = new google.maps.Map(document.getElementById('mapActividad2'), {
                zoom: 15,
                center: haightAshbury
            });
            $scope.listarmarcadores("inicio");
            map.addListener('click', function(event) {
                $scope.deleteMarkers();
                $rootScope.laaa = event.latLng.lat();
                $rootScope.looo = event.latLng.lng();
                latLong[0] = $rootScope.laaa;
                latLong[1] = $rootScope.looo;
                $scope.addMarker(event.latLng);
                $scope.registroNuevo_m(latLong);

            });
        }catch(err){}
    }

    $scope.botonesHabilita = function(){
      $scope.soporteRM = "mostrar";
      $rootScope.rbase_multiple = true;
    }
    $scope.registroNuevo_m = function(data) {
      $("#lt_ubicacion_m").val(data[0]);
      $("#ln_ubicacion_m").val(data[1]);
      var data_mapa = '{"latitud":"'+data[0]+'","longitud":"'+data[1]+'"}';
      $scope.initMap1();
      $scope.listarmrcmapa(JSON.parse(data_mapa));
    }
    $scope.habGuardar=true;
    $scope.btnEnviarFormLinea  =   true;
    $scope.getCaptchasX=function(){
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNG = i1.substring(1, i1.length - 1);
            $scope.imageCST = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } 
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    $scope.getCaptchasXX=function(){
        $("#resultadoCC").val("");
        $scope.habGuardar = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx="";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else 
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    $scope.lmpCaptcha = function(datos) {
        $scope.ErrorCapcha='';
    }
    var numero = 0;
    $scope.VerificarCapcha = function(responce, resp){
          $scope.habGuardar = true;
          var captch  = $("#resultadoC").val();
          var id = numero;
          var verCaptcha = new captcha();
          verCaptcha.identificador = id;
          verCaptcha.respuesta = captch;
          verCaptcha.verificarCaptcha(function(resultado){
               json = JSON.parse(resultado);
               if(json.success[0] == undefined){
                   $scope.getCaptchasX();
                   $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
               }else{
                   $scope.confirmarServicioGamlp(responce,resp);
               }
           });
           $scope.getCaptchasX();
    };
    $scope.arrayfiles = [];
   
    $scope.continuar47 = null; $scope.continuar48 = null; $scope.continuar49 = null; 
    
    $scope.c_solicitud = 0 ;  //requisitos
    $scope.c_requisito2 = 0 ; //torres torretas monopostes mastiles y postes
    $scope.c_requisito3 = 0 ; //mastiles postes
    $scope.c_requisito4 = 0 ; //torres torretas monopostes
    $scope.c_requisito5 = 0 ;  // cow
    $scope.c_requisito6 = 0 ;  //gabinete
    $scope.c_requisito7 = 0 ;  //gabinete unico
    $scope.vald_requisitos = function(datanro,valida){
        $scope.rutaArchivoDoc = "req_Antenas/";
        $scope.nombre ;
        var uploadUrl = CONFIG.APIURL+"/files/"+$scope.rutaArchivoDoc+"Adjunto";
        $scope.file;
        $scope.fileverif;
        

      if($scope.fileverif != undefined  ){
        $ex = $scope.file.type.split("/");
        if($ex[1] == "pdf" || $ex[1] == "jpeg" || $ex[1] == "jpg" || $ex[1] == "png"){

          var nombreFile = $scope.file.name;
          var extension = $scope.file.type;
          extension = extension.split("/");
          var tamaño = $scope.file.size;
          tamaño = tamaño.toString();
          var cadenaURL = uploadUrl + $scope.file.name + '?app_name=' + CONFIG.APP_NAME;
          var parAdjunto = '{"campo":"'+$scope.file.name+'","nombre":"'+$scope.nombre+'","url":"'+cadenaURL+'","posicion":"'+datanro+'"}';
          $scope.rutaArchEnvioLotus.push(JSON.parse(parAdjunto));
          $scope.fileadj = '{"File_Adjunto":'+JSON.stringify($scope.rutaArchEnvioLotus)+'}';
          $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
          $scope.direccionvirtual = CONFIG.APIURL+"/files/"+$scope.rutaArchivoDoc;
          var cadenaURI = $scope.direccionvirtual +"/" + $scope.file.name;
          fileUpload.uploadFileToUrl($scope.file, uploadUrl); 
          swal("OK!","El documento fue adicionado exitosamente gracias.","success");
        }else{
          swal("Error","El archivo que selecciono no es de extension(.pdf, .jpeg, .jpg, .png), vuelva a seleccionar otro archivo por favor gracias.","error");
        }

      }else{
         swal("Error","Debe seleccionar un archivo por favor gracias.","error");
      }
    }
    $scope.validaTipo = function(file){
        
        if(file != undefined  ){
          $ex = file.type.split("/");
          if($ex[1] == "pdf" || $ex[1] == "jpeg" || $ex[1] == "jpg" || $ex[1] == "png"){

            return  true;
          }else{
            return false;
          }
        }else{
          return false;
        }
    }
    $scope.n_soporte = null;
    $scope.g_soporte = "mostrar";
    
    $scope.dividirtabla = function(num){
      if(num == 1){

        $scope.n_soporte = "mostrar";
        $scope.g_soporte = null;
      }else{
        $scope.n_soporte = null;
        $scope.g_soporte = "mostrar";
      }
    }

    $scope.torres_torretas_monoposte = null;
    $scope.mastiles_postes = null;
    $scope.cow = null;
    $scope.antsatelites = null;
    $scope.activarAdjuntos = function(valor){
      $scope.arrayfiles = [];
      switch(valor) {
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
    $scope.ordenarRequisitos = function(){
        var max = 0;
        
        for (var i = 0; i < $scope.img.length; i++) {
            if(max < $scope.img[i].posicion){
              max = $scope.img[i].posicion;
            }
        }
        $scope.ArchivoRequisitos = [];
        var buscpos = 1 ;//$scope.img
        for (var j = 0; j <= max; j++) {
          for (var l = 0; l < $scope.img.length; l++) {
            if(buscpos == $scope.img[l].posicion){
                $scope.ArchivoRequisitos.push($scope.img[l]);
            }
          }
          buscpos += 1;
        }
    }

    $scope.juntarRequisitos = function(){
        $scope.ordenarRequisitos();

        $scope.rutaArchEnvioLotus = [];
        //for (var i = 0; i < $scope.requiRecuperados.length; i++) {
        for (var i = 0; i < 4; i++) {
          $datareq = $scope.requiRecuperados[i];
          $scope.guardarFilesFInal($datareq.campo, $datareq.nombre ,$datareq.url );

        }
        for (var i = 0; i < $scope.ArchivoRequisitos.length; i++) {
          if($scope.estadofile($scope.ArchivoRequisitos[i].nombre)){
            $scope.guardarFilesAntenas($scope.ArchivoRequisitos[i].campo,$scope.ArchivoRequisitos[i].nombre,$scope.ArchivoRequisitos[i].url);
            
          }
        }
        console.log("requisitos a enviar",$scope.rutaArchEnvioLotus);
    }
    $scope.estadofile = function(campo){
      var estado = false;
      switch(campo) {
            case "ANTT_CON_ARR":
                if($scope.ANTT_CON_ARR != null){ estado = true;};
                break;
            case "ANTT_CART_NOTARIADA":
                if($scope.ANTT_CART_NOTARIADA != null){ estado = true;};
                break;
            case "ANTT_AUT_ESC_COPROP":
                if($scope.ANTT_AUT_ESC_COPROP != null){ estado = true;};
                break;
            case "ANTT_LIC_AMB":
                if($scope.ANTT_LIC_AMB != null){ estado = true;};
                break;
            case "ANTT_POL_SEG":
                if($scope.ANTT_POL_SEG != null){ estado = true;};
                break;
            case "ANTT_CERT_AUT_TRIB":
                if($scope.ANTT_CERT_AUT_TRIB != null){ estado = true;};
                break;
            case "ANTT_CART_NOT":
                if($scope.ANTT_CART_NOT != null){ estado = true;};
                break;
            case "ANTT_PLAN_MANT":
                if($scope.ANTT_PLAN_MANT != null){ estado = true;};
                break;
            case "ANTT_PLAN_MIME":
                if($scope.ANTT_PLAN_MIME != null){ estado = true;};
                break;
            case "ANTT_EST_GEOLOGICO":
                if($scope.ANTT_EST_GEOLOGICO != null){ estado = true;};
                break;
            case "ANTT_PLAN_FORM_DIG":
                if($scope.ANTT_PLAN_FORM_DIG != null){ estado = true;};
                break;
            case "ANTT_PLAN_ALT_SOPORTE":
                if($scope.ANTT_PLAN_ALT_SOPORTE != null){ estado = true;};
                break;
            case "ANTT_PLAN_SITIO":
                if($scope.ANTT_PLAN_SITIO != null){ estado = true;};
                break;
            case "ANTT_DESC_ESQ_BALIZAMIENTO":
                if($scope.ANTT_DESC_ESQ_BALIZAMIENTO != null){ estado = true;};
                break;
            case "ANTT_PLAN_MED_PREV_SEG":
                if($scope.ANTT_PLAN_MED_PREV_SEG != null){ estado = true;};
                break;
            case "ANTT_INF_TEC_POS":
                if($scope.ANTT_INF_TEC_POS != null){ estado = true;};
                break;
            case "ANTT_CAL_ESTRUC_SOP":
                if($scope.ANTT_CAL_ESTRUC_SOP != null){ estado = true;};
                break;
            case "ANTT_INF_TEC_EMITIDO":
                if($scope.ANTT_INF_TEC_EMITIDO != null){ estado = true;};
                break;
            case "ANTT_INF_TEC_EMITIDO_GAB":
                if($scope.ANTT_INF_TEC_EMITIDO_GAB != null){ estado = true;};
                break;
            case "ANTT_PLAN_FORM_DIG":
                if($scope.ANTT_PLAN_FORM_DIG != null){ estado = true;};
                break;

            case "ANTT_PLAN_DET_CONST_CAT":
                if($scope.ANTT_PLAN_DET_CONST_CAT != null){ estado = true;};
                break;
            case "ANTT_PLAN_CAR_GAB":
                if($scope.ANTT_PLAN_CAR_GAB != null){ estado = true;};
                break;
            case "ANTT_DOC_AUT_LUG_ESP_PUB":
                if($scope.ANTT_DOC_AUT_LUG_ESP_PUB != null){ estado = true;};
                break;
            case "ANTT_PLAN_ELEM_COMPL":
                if($scope.ANTT_PLAN_ELEM_COMPL != null){ estado = true;};
                break;
            case "ANTT_ADJ_AUTORIZACION":
                if($scope.ANTT_ADJ_AUTORIZACION != null){ estado = true;};
                break;                
                
            default:
        } 
        return estado;
        
    }
    $scope.verif_requisitos = function(){
        switch($scope.tipoReg) {
            case "R_UNICO":
                if($("#den_rbase").val()!= "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#macrodistrito").val() != "" ){
                  console.log("catastral",$("#cod_catastral").val());
                  if($("#cod_catastral").val() != ""){
                    $scope.juntarRequisitos();
                    if($scope.lstSoporteprevio.length > 0 && $scope.rutaArchEnvioLotus.length > 7){
                      return true;
                    }

                  }else{
                    swal('', 'Codigo Catastral no definido', 'error');  
                    return false;

                  }
                 
                }else{

                 return false;
                }
                break;
            case "R_MULTIPLE":
                
                if($scope.grilla_rbmultiple.length >= 0 ){
                  return true;

                }else{

                 return false;
                }
                break;
            case "G_UNICO":

                if($("#den_rbase").val()!= "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#den_ngabinete").val() != "" ){
                    $scope.juntarRequisitos();
                    if($scope.rutaArchEnvioLotus.length  > 5){
                      return true;
                    }

                }else{
                  
                    return false;
                }

                break;
            case "G_MULTIPLE":
    
                //alert("En proceso..");
                if($scope.grilla_rbmultiple.length >= 0 ){

                  return true;

                }else{

                 return false;
                }

                break;
            default:
                swal("ES NECESARIO SELECIONAR UNA DE LAS OPCIONES GRACIAS..","error");
        }
    }

    $scope.requisitos = "mostrar";
    $scope.requisitos2 = "mostrar";
    $scope.requisitos3 = "mostrar";
    $scope.requisitos4 = "mostrar";
    $scope.requisitos5 = "mostrar";
    $scope.requisitos6 = "mostrar";
    $scope.requisitos7 = "mostrar";
    $scope.verif_req = function(){
      if($scope.c_solicitud == 6){  $scope.requisitos = null; }
      if($scope.c_requisito2 == 2){ $scope.requisitos2 = null;}
      if($scope.c_requisito3 == 9){ $scope.requisitos3 = null;}
      if($scope.c_requisito4 == 11){ $scope.requisitos4 = null;}
      if($scope.c_requisito5 == 8){ $scope.requisitos5 = null;}
      if($scope.c_requisito6 == 5){ $scope.requisitos6 = null;}
      if($scope.c_requisito7 == 5){ $scope.requisitos7 = null;}
    }
    $scope.VerificarCapchaa = function(datos) {
        var captch  = $("#resultadoCC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasXX = "";

        if(captch.length > 3){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };
    $scope.validarFormProcesos = function(){
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

            tramiteIgob.validarFormProcesos(function(resultado){
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma de la Dirección de Administración Territorial y Catastral para recabar mayor información.");
                $rootScope.botones = true;
                $rootScope.requistosfile = true;
                $scope.ConsumoServCatastro(nroTramiteEnviado);
                $scope.tramitesCiudadano();
                $scope.limpiarValores();
            });
        } catch (error){
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI(); 
        }
    };

    $rootScope.recuperaInf = function(data){
      $scope.recuperado = data.GRD_ANTENAS[0].ANT_NOM_RADBASE;
      $scope.ultimoRegistro($scope.recuperado);


    }
    $scope.idrespuesta;
    $scope.guardarUbicacion = function(dataUbicacion){
      //alert(2222);
      $.ajax({
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          url: $scope.URLAPI+'wsUbi/ubicacionGeoserver',
          //url: 'http://192.168.5.141:9098/wsUbi/ubicacionGeoserver',
          dataType: 'json',
          data: dataUbicacion,//'{  "cas_id":'+$scope.cas_id+',"fr_casos":'+JSON.stringify($scope.frcasos)+'}',
          success: function (data){ 
              //$scope.respuesta = data.success.data[0].id_form_caso;
              $scope.idrespuesta = 4;
             
           },
          error: function (data){ console.log(data);}
      });
    }
    var rItems = new Array();
    $scope.ConsumoServCatastro = function(nroTramiteEnviado)
    {
      
      rItems = [];
      var id_item = nroTramiteEnviado;
      id_item = id_item.split("/");
      id_item = id_item[0];
      inform = $rootScope.Antenas;
      for (var i = 0; i < inform.length; i++) {
        var punto = inform[i].f01_Ubicacion.ubicacion;
        punto = punto.split(" ");;
        var puntox = punto[0];
        var puntoy = punto[1];
        punto = puntox+ ","+puntoy;

        id_item = id_item +(i+1);
        if($scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
          nro_Soporte = 0;
            if($scope.tipoReg == "G_UNICO"){
              
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].ANT_NOM_RADBASE+'","ubicacion":"'+inform[i].ANT_UBICA_RBASE+'","tipo_propiedad":"'+inform[i].ANT_TIP_PROPIEDAD+'","nro_gabinetes":"'+inform[i].ANT_NRO_GAB+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';
            }else if($scope.tipoReg == "G_MULTIPLE"){
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].f01_DENOMINACION+'","ubicacion":"'+inform[i].f01_UBI_RB+'","tipo_propiedad":"'+inform[i].f01_TIPO_UBIC+'","nro_gabinetes":"'+inform[i].f01_NRO_GABINETE+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';

            }
        }else{
          if($scope.tipoReg == "R_MULTIPLE"){
              nro_Soporte = inform[i].f01_GRILLA_SOPORTE.length;
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].f01_DENOMINACION+'","ubicacion":"'+inform[i].f01_UBI_RB+'","tipo_propiedad":"'+inform[i].f01_TIPO_UBIC+'","nro_gabinetes":"'+inform[i].f01_NRO_GABINETE+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';

          }else{
              nro_Soporte = inform[i].f01_GRD_SOPORTE.length;
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].ANT_NOM_RADBASE+'","ubicacion":"'+inform[i].ANT_UBICA_RBASE+'","tipo_propiedad":"'+inform[i].ANT_TIP_PROPIEDAD+'","nro_gabinetes":"'+inform[i].ANT_NRO_GAB+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';
          }

        }
        rItems.push(items);
      }
      var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMT1RVUyIsInN1YiI6Ik1hcGEgQW50ZW5hcyIsImV4cCI6NjM2NzQwNzMwMzk5MjA4OTg2LCJ1c3VhcmlvIjoibG90dXMuYW50ZW5hcyIsImlkVXN1YXJpbyI6MH0=.N4/Gddm85L7tAxCMiudUvfKeCYywANrxgw8OA6HrCyE=';
      $.ajax({
          type: 'POST',
          headers:{
            AuthorizationServices: 'Bearer '+token
          },
         url: $scope.urlSITv3+'GeoDB/publico/swPublicoRegistrarItemsTramite',
         dataType: 'json',
         data: '{"id_mapa":1,"ext_id_tramite":"'+nroTramiteEnviado+'","usuario":"sistema.externo","items":['+rItems+']}',
         success: function (data){                    
            console.log("respuesta de catastro ", data);
          },
         error: function (data){ console.log(data);}
      });

    }
   
    $scope.UbicacionData = "";
    $scope.serializarInformacion = function(dataAnt){
      console.log("informaciona enviar",dataAnt);
      if($scope.estadoTramite == "NO"){
          //alert("NO");
          var ubicacionutm = $("#ln_ubicacion").val();
          console.log("dsdfsdfsdfsdf",ubicacionutm);
          if(ubicacionutm != "" ){
            ubicacionutm = ubicacionutm.split("(");
            console.log("wwwwww:  ",ubicacionutm);
            console.log("ubicacionutm[1]",ubicacionutm[1]);
            if(ubicacionutm[1] != undefined){
              ubicacionutm = ubicacionutm[1].split(")");

            }
            
            ubicacionutm = ubicacionutm[0];
            var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
            $scope.guardarUbicacion(dataUbi); 
            dataAnt = {"den_rbase":$("#den_rbase").val(),"ub_rbase":$("#ub_rbase").val(),"tp_prop":$("#tp_prop").val(),"den_ngabinete":$("#den_ngabinete").val(),"observacion":$("#observacion").val() ,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val(),"ubicacion":ubicacionutm};  
            $scope.UbicacionData = dataAnt;
          }

        if($scope.verif_requisitos() && dataAnt != undefined){
          $scope.ultimoRegistro(dataAnt);
          $rootScope.datosIniciales.ANT_NRO_AUTORIZACION = $("#den_auto").val();
          var fechactual = obtFechaActual.obtenerFechaActual();
          $rootScope.datosIniciales.g_fecha = fechactual;
          $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
          $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
          $rootScope.datosIniciales.File_Adjunto = "";
          $rootScope.datosIniciales.File_Adjunto = $scope.rutaArchEnvioLotus;
          $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          $scope.tipoPersona          =   sessionService.get('TIPO_PERSONA');
          if ($scope.tipoPersona == 'NATURAL'){
              var combox      = document.getElementById('ANT_EXP_CI');
              var selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_EXP_CI_VALOR = selected;
              combox      = document.getElementById('ANT_GEN');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_GEN_VALOR = selected;
              combox      = document.getElementById('ANT_LUG_NAC');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_LUG_NAC_VALOR = selected;
              combox      = document.getElementById('ANT_E_CIVIL');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_E_CIVIL_VALOR = selected;
              var fechactual = obtFechaActual.obtenerFechaActual();
              $rootScope.datosIniciales.g_fecha = fechactual;
              $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
              $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
              $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          }else if($scope.tipoPersona == 'JURIDICO'){
            
              $rootScope.datosIniciales.f01_tipo_per            =   'J';
              $rootScope.datosIniciales.f01_tipo_per_desc       =   'JURIDICO';
              $rootScope.datosIniciales.ANT_TIPO_PERSONA        =   '2';
              $rootScope.datosIniciales.ANT_NIT                 =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales.ANT_RAZ_SOC             =   $rootScope.datosIniciales.f01_raz_soc_per_jur;
              $rootScope.datosIniciales.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_poder_representante; 
              $rootScope.datosIniciales.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_ges_vig_pod;           
              $rootScope.datosIniciales.ANT_EMP_TEL             =   "";
              $rootScope.datosIniciales.ANT_NUM_NOTARIA         =   $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
              $rootScope.datosIniciales.ANT_EMP_CEL             =   "";
              $rootScope.datosIniciales.ANT_EMP_CORREO          =   "";
              $rootScope.datosIniciales.ANT_NUM_CI              =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales.ANT_NOM                =   $rootScope.datosIniciales.f01_pri_nom_rep;+ " " + $rootScope.datosIniciales.f01_seg_nom_rep ;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
              $rootScope.datosIniciales.ANT_PAT                =   $rootScope.datosIniciales.f01_ape_pat_rep;
              $rootScope.datosIniciales.ANT_MAT                =   $rootScope.datosIniciales.f01_ape_mat_rep;
              $rootScope.datosIniciales.ANT_CAS                =   $rootScope.datosIniciales.f01_ape_cas_rep;
              $rootScope.datosIniciales.ANT_DOM                =   $rootScope.datosIniciales.f01_zon_rep_valor;
              $rootScope.datosIniciales.ANT_CELU               =   $rootScope.datosIniciales.f01_cel_rep;   
              $rootScope.datosIniciales.ANT_TEL                =   $rootScope.datosIniciales.f01_telef_rep;     
              $rootScope.datosIniciales.ANT_MAIL               =   $rootScope.datosIniciales.f01_email_rep;
              $rootScope.datosIniciales.f01_macro_act          =   1; 

              var fechactual = obtFechaActual.obtenerFechaActual();
              $rootScope.datosIniciales.g_fecha                = fechactual;
              $rootScope.datosIniciales.g_tipo                 = $scope.tipoProceso;
              $rootScope.datosIniciales.GRD_ANTENAS            = $rootScope.Antenas;            
              $rootScope.datosIniciales.INT_FORM_ALMACENADO    = "G";            
          }
          try {
                var datosSerializados   =  JSON.stringify($rootScope.datosIniciales);
                var idCiudadano         = sessionService.get('IDSOLICITANTE');
                var idTramite           = sessionService.get('IDTRAMITE');
                var idServicio          = sessionService.get('IDSERVICIO');
                var Parametros = new datosFormularios();
                Parametros.frm_tra_dvser_id = idServicio;
                Parametros.data_json = datosSerializados;
                Parametros.frm_tra_id_ciudadano = idCiudadano;
                Parametros.frm_tra_id_usuario = 1;
                Parametros.frm_idTramite = idTramite;
                $rootScope.btnGuardarForm   =   true;
                $.blockUI();
                Parametros.sp_crear_datos_formulario(function(results){ 
                    results = JSON.parse(results);
                    results = results.success;
                    if(results.length > 0){
                        $.unblockUI();
                        swal('', "Formulario almacenado", 'success');
                        $scope.btnEnviarFormLinea    =   false;
                    }else{
                        $.unblockUI();
                        swal('', "Formulario no almacenado", 'error');
                        $scope.btnEnviarFormLinea    =   true;
                    }
                }); 
            }catch(e){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
            }
        }else{
          swal("Error!","Para guardar el formulario es necesario completar todos los campos y los documentos","error");
        }
        $scope.estadoTramite = "";
      }else{

          var ubicacionutm = $("#ln_ubicacion").val();
          if(ubicacionutm != ""){

            ubicacionutm = ubicacionutm.split("(");
            if(ubicacionutm.length == 2){

              ubicacionutm = ubicacionutm[1].split(")");
              ubicacionutm = ubicacionutm[0];
            }else{
              ubicacionutm = ubicacionutm[0];

            }
            var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
            // Fin Informacion Ubicacion
            dataAnt = {"den_rbase":$("#den_rbase").val(),"ub_rbase":$("#ub_rbase").val(),"tp_prop":$("#tp_prop").val(),"den_ngabinete":$("#den_ngabinete").val(),"observacion":$("#observacion").val(),"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()};  
            dataAnt1 = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()};  
            $scope.UbicacionData = dataAnt1;
          }else{
            swal("Error!","Para guardar el formulario es necesario ubicar un punto de referencia","error");

          }

        if($scope.verif_requisitos() && dataAnt != undefined){
        
          $scope.ultimoRegistro(dataAnt);
          
        
          $rootScope.datosIniciales.ANT_NRO_AUTORIZACION = $("#den_auto").val();
          var fechactual = obtFechaActual.obtenerFechaActual();
          $rootScope.datosIniciales.g_fecha = fechactual;
          $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
          $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
          $rootScope.datosIniciales.File_Adjunto = "";
          $rootScope.datosIniciales.File_Adjunto = $scope.rutaArchEnvioLotus;
          $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          $scope.tipoPersona          =   sessionService.get('TIPO_PERSONA');
          if ($scope.tipoPersona == 'NATURAL'){
              var combox      = document.getElementById('ANT_EXP_CI');
              var selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_EXP_CI_VALOR = selected;
              combox      = document.getElementById('ANT_GEN');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_GEN_VALOR = selected;
              combox      = document.getElementById('ANT_LUG_NAC');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_LUG_NAC_VALOR = selected;
              combox      = document.getElementById('ANT_E_CIVIL');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales.ANT_E_CIVIL_VALOR = selected;
              var fechactual = obtFechaActual.obtenerFechaActual();
              $rootScope.datosIniciales.g_fecha = fechactual;
              $rootScope.datosIniciales.g_tipo = $scope.tipoProceso;
              $rootScope.datosIniciales.GRD_ANTENAS = $rootScope.Antenas;
              $rootScope.datosIniciales.INT_FORM_ALMACENADO = "G";
          }else if($scope.tipoPersona == 'JURIDICO'){
            
              $rootScope.datosIniciales.f01_tipo_per            =   'J';
              $rootScope.datosIniciales.f01_tipo_per_desc       =   'JURIDICO';
              $rootScope.datosIniciales.ANT_TIPO_PERSONA        =   '2';
              $rootScope.datosIniciales.ANT_NIT                 =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales.ANT_RAZ_SOC             =   $rootScope.datosIniciales.f01_raz_soc_per_jur;
              $rootScope.datosIniciales.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_poder_representante; 
              $rootScope.datosIniciales.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_ges_vig_pod;           
              $rootScope.datosIniciales.ANT_EMP_TEL             =   "";
              $rootScope.datosIniciales.ANT_NUM_NOTARIA         =   $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
              $rootScope.datosIniciales.ANT_EMP_CEL             =   "";
              $rootScope.datosIniciales.ANT_EMP_CORREO          =   "";
              $rootScope.datosIniciales.ANT_NUM_CI              =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales.ANT_NOM                =   $rootScope.datosIniciales.f01_pri_nom_rep;+ " " + $rootScope.datosIniciales.f01_seg_nom_rep ;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
              $rootScope.datosIniciales.ANT_PAT                =   $rootScope.datosIniciales.f01_ape_pat_rep;
              $rootScope.datosIniciales.ANT_MAT                =   $rootScope.datosIniciales.f01_ape_mat_rep;
              $rootScope.datosIniciales.ANT_CAS                =   $rootScope.datosIniciales.f01_ape_cas_rep;
              $rootScope.datosIniciales.ANT_DOM                =   $rootScope.datosIniciales.f01_zon_rep_valor;
              $rootScope.datosIniciales.ANT_CELU               =   $rootScope.datosIniciales.f01_cel_rep;   
              $rootScope.datosIniciales.ANT_TEL                =   $rootScope.datosIniciales.f01_telef_rep;     
              $rootScope.datosIniciales.ANT_MAIL               =   $rootScope.datosIniciales.f01_email_rep;
              var fechactual = obtFechaActual.obtenerFechaActual();
              $rootScope.datosIniciales.g_fecha                = fechactual;
              $rootScope.datosIniciales.g_tipo                 = $scope.tipoProceso;
              $rootScope.datosIniciales.GRD_ANTENAS            = $rootScope.Antenas;            
              $rootScope.datosIniciales.INT_FORM_ALMACENADO    = "G"; 
              $rootScope.datosIniciales.f01_macro_act          =   3;

          }
          try {
                var datosSerializados   =  JSON.stringify($rootScope.datosIniciales);
                var idCiudadano         = sessionService.get('IDSOLICITANTE');
                var idTramite           = sessionService.get('IDTRAMITE');
                var idServicio          = sessionService.get('IDSERVICIO');
                var Parametros = new datosFormularios();
                Parametros.frm_tra_dvser_id = idServicio;
                Parametros.data_json = datosSerializados;
                Parametros.frm_tra_id_ciudadano = idCiudadano;
                Parametros.frm_tra_id_usuario = 1;
                Parametros.frm_idTramite = idTramite;
                $rootScope.btnGuardarForm   =   true;
                $.blockUI();
                Parametros.sp_crear_datos_formulario(function(results){ 
                    results = JSON.parse(results);
                    results = results.success;
                    if(results.length > 0){
                        $.unblockUI();
                        swal('', "Formulario almacenado", 'success');
                        $scope.btnEnviarFormLinea    =   false;
                    }else{
                        $.unblockUI();
                        swal('', "Formulario no almacenado", 'error');
                        $scope.btnEnviarFormLinea    =   true;
                    }
                }); 
          }catch(e){
              $scope.btnGuardarForm   =   false;
              $.unblockUI();
          }
        }else{
          swal("Error!","Para guardar el formulario es necesario completar todos los campos y los documentos","error");
        }
      }
      
    };
    


    $scope.categorizador = function(tipo_sop) {
      switch(tipo_sop) {
          
          case "TORRES":
          case "MONOPOSTES":
            
            $scope.dataAnt.categoria =  "I. GRAN ESCALA";
            $scope.dataAnt.categoria_m =  "I. GRAN ESCALA";
              
              break;
          
          case "TORRETAS":   
          case "MÁSTILES":
          case "POSTES":  
            
            $scope.dataAnt.categoria =  "II. ESCALA MEDIA";
            $scope.dataAnt.categoria_m =  "II. ESCALA MEDIA";

              break;
          case "GABINETES":
          case "COW":
            
            $scope.dataAnt.categoria =  "III. ESCALA MENOR";
            $scope.dataAnt.categoria_m =  "III. ESCALA MENOR";
            
              break;
          case "PARA ANTENAS SATELITALES":
            
            $scope.dataAnt.categoria =  "IV.  ESCALA DOMÉSTICA";
            $scope.dataAnt.categoria_m =  "IV.  ESCALA DOMÉSTICA";
            
              break;
          default:
            $scope.dataAnt.categoria =  "";
            $scope.dataAnt.categoria_m =  "";
      }
               
    }

    $scope.$broadcast("items_changed")
    angular.module("ui.scrollToTopWhen", [])
    .directive("scrollToTopWhen", function ($timeout) {
      function link (scope, element, attrs) {
        scope.$on(attrs.scrollToTopWhen, function () {
          $timeout(function () {
            angular.element(element)[0].scrollTop = 0;
          });
        });
      }
    });

    $scope.enviarData = function() {
      $.blockUI();
      var datosSerializados = JSON.stringify($rootScope.datosIniciales);
      console.log("==========>",datosSerializados);
      var crearCaso   =   new gCrearCaso();
      crearCaso.usr_id    = 1,
      crearCaso.datos     = datosSerializados,
      crearCaso.procodigo = $scope.tipoProceso,
      //crearCaso.crearCasoAeLinea(function(response){
      crearCaso.crearCasoEnLinea(function(response){
          try{
              response    =   JSON.parse(response);
              var results = response.success.data;
                  datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
                  datosIF2 = datosIF[1];
                  datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                  $scope.nrotramitec = datosIF[0];
                  sessionService.set('NROTRAMITE', datosIF[0]);
                  sessionService.set('NROTRAMITEID', datosIF[1]);
                  sessionService.set('IDPROCESO', datosIF[6]);
                  $rootScope.requisitosrbase = null;
                  try{
                      $scope.validarFormProcesos();
                      $rootScope.botones = true;
                      $scope.desabilitado = true;
                      setTimeout(function () {
                            $scope.$apply(function () {
                                location.reload();
                            });
                      }, 3000);
                  }catch(e){}

                  $.unblockUI();
          }catch(e){
              alert("conexion fallida ");
          }
        });
    };
    $scope.inicio = null;

  ///////////////////////INICIO DE ADJUNTOS V02//////////////////
    $scope.cambiarFile = function(obj, valor){
        if(typeof(obj.files[0]) != 'undefined'){
          $.blockUI(); 
          setTimeout(function(){ 
            var nombre = obj.getAttribute("name");
            var tamaniofile = obj.files[0];
            var tipoDoc = obj.files[0].name;
            var nameArrayci = tipoDoc.split('.');
            tipoDoc = nameArrayci[1];
            tipoDoc = tipoDoc.toLowerCase();
            if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm') {
                 $scope.datos[obj.name] =  obj.files[0].name;
                 $scope.subirRequisitos(obj, valor);
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById(obj.name+'_campo').value = '';
                valor = '';
                $.unblockUI();
            };
          $.unblockUI();
          },1000);
        }   
    };
    $scope.img = [];
    $scope.subirRequisitos  =   function(sobj, svalor){
      var fechaNueva = "";
      var fechaserver = new fechaHoraServer(); 
      fechaserver.fechahora(function(resp){
          var sfecha = JSON.parse(resp);
          var fechaServ = (sfecha.success.fecha).split(' ');
          var fecha_ = fechaServ[0].split('-');
          var hora_ = fechaServ[1].split(':');
          fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
      });
      var nombrecampo = sobj.id;
      var tipoDoc = sobj.files[0].name;
      var nameArray = tipoDoc.split('.');
      tipoDoc = nameArray[1].toLowerCase();
      var idTramite = sessionService.get('IDTRAMITE');
      var nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
      $scope.url_img = CONFIG.APIURL +"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/Antenas/"+idTramite + "/"+nombreNuevo+"?app_name=todoangular";

      if(!$scope.verficaFIle(sobj.id,$scope.img)){
          $scope.pos = $scope.obtOrdenRequisito(sobj.id);
          $scope.img.push({
            campo : nombreNuevo,//sobj.files[0].name,
            nombre : sobj.id,
            url : $scope.url_img,
            posicion : $scope.pos

         });
      }else{
        $scope.posicion  = $scope.obt_pos(sobj.id,$scope.img);
        $scope.remplazarArchivo($scope.posicion);
        $scope.pos = $scope.obtOrdenRequisito(sobj.id);
          $scope.img.push({
            campo : nombreNuevo,//sobj.files[0].name,
            nombre : sobj.id,
            url : $scope.url_img,
            posicion : $scope.pos

         });
      }
      var rMisDocs = new Array();
      if(sobj.files[0]){
          rMisDocs.push(sobj.files[0]);
          $scope.almacenarRequisitos(rMisDocs,nombrecampo);
      }
    };
    $scope.ejecutarFile = function(idfile){
      var sid =   document.getElementById(idfile);
      if(sid){
          document.getElementById(idfile).click();
      }else{
          alert("Error ");
      }
    };
    $scope.almacenarRequisitos = function(aArchivos,nombrecampo){
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });

        $.blockUI();  
        setTimeout(function(){ 
            var nombre = aArchivos[0].name;
            var tamaniofile = aArchivos[0].size;
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            var idTramite = sessionService.get('IDTRAMITE');
            $scope.direccionvirtual = "RC_CLI";
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/Antenas/"+idTramite + "/";
            $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/Antenas/" + aArchivos[0].name + "?app_name=todoangular";
            if(typeof(aArchivos[0]) != 'undefined'){
                var tipoDoc = aArchivos[0].name;
                var nameArray = tipoDoc.split('.');
                tipoDoc = nameArray[1].toLowerCase();
                var nombre = nameArray[0] + '.zip';
                if (tamaniofile > 500000 || tamaniofile.size <= 15000000) { 
                  if (tipoDoc == "png" || tipoDoc == "jpg" || tipoDoc == "jpeg" || tipoDoc == "bmp" || tipoDoc == "gif") {
                        $.blockUI();  
                        var filecompress = compressImage(aArchivos[0]).then(function(respuesta){
                            var imagenCompr = respuesta.name.split('.');
                            var tipoCia = imagenCompr[1];
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.'+tipoCia;
                            fileUpload1.uploadFileToUrl1(respuesta, uploadUrl, nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 

                            $.unblockUI();
                        });
                    } else{
                        if (tipoDoc == 'pdf' ||  tipoDoc == 'docx' ||  tipoDoc == 'docxlm') {
                            var zipci = new JSZip();
                            zipci.file(aArchivos[0].name, aArchivos[0]);
                            zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blob) {
                                nombreNuevo = nombrecampo.substring(5 , nombrecampo.length)+'_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blob, uploadUrl, nombreNuevo);
                                document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 

                            })
                        }
                        else{
                            swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            $.unblockUI();
                        };                        
                    };
                }else{
                  if (tamaniofile <= 500000) {
                        if (tipoDoc == 'png' || tipoDoc == 'jpg' || tipoDoc == 'jpeg' || tipoDoc == 'bmp' || tipoDoc == 'gif' || tipoDoc == 'pdf' || tipoDoc == 'docx' || tipoDoc == 'docxlm' || tipoDoc == 'PDF') {
                            $.blockUI();  
                            nombreNuevo = nombrecampo.substring(5 , nombrecampo.length) +'_'+fechaNueva+'.'+tipoDoc;
                            fileUpload1.uploadFileToUrl1(aArchivos[0], uploadUrl,nombreNuevo);
                            document.getElementById(nombrecampo+'_campo').value = nombreNuevo; 
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo que esta enviando no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('btn_ANTT_CON_ARR').value = ""; 
                            $scope.ANTT_CON_ARR = "";
                            $scope.datos.ANTT_CON_ARR = "";
                            $.unblockUI();
                        };
                  }else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande Ingrese otra por favor.', 'error');
                        $(this).val("");
                        $.unblockUI();
                  };
                }

              
            }

        $.unblockUI();
        },1000);
    };
    $scope.mosDetAdj =function(data){
      console.log("aaaaa",$scope.tipoReg);
      var texto = '';
      switch(data) {
          case "btn_ANTT_CON_ARR":
              if($("#tp_prop").val() == "PRIVADA" || $("#tp_prop").val() == "HORIZONTAL" ){
                var tf_con_arr = "";
                if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                  tf_con_arr = "gabinete.";
                }else{
                  tf_con_arr = "soportes de antenas.";

                }
                texto = 'a) Contrato de Arrendamiento vigente suscrito entre el propietario del sitio y el solicitante, que establezca tiempo, lugar y la autorización para el emplazamiento de '+ tf_con_arr;
              }else if($("#tp_prop").val() == "DOMINIO MUNICIPAL"){
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
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                tf_polSeg = "gabinetes.";
              }else{
                tf_polSeg = "soportes de antenas de telecomunicaciones.";

              }
              texto = 'f) Póliza de Seguro de Responsabilidad Civil y/o Daños a Terceros que cubra al titular de la solicitud sobre posibles daños a terceros durante la instalación, construcción, funcionamiento y/o vida útil del o los '+tf_polSeg+' Dicha garantía o su renovación deberá encontrarse indefectiblemente vigente por el tiempo que dure la autorización, no debiendo existir periodos sin cobertura.';
              
              break;
          case "btn_ANTT_CERT_AUT_TRIB":
              texto = 'g) Certificación de la Autoridad Tributaria Municipal sobre la inexistencia de deudas pendientes de pago con el municipio, respecto a obligaciones pendientes de pago por gestiones vencidas o deudas de cualquier tipo provenientes de resoluciones o sentencias ejecutoriadas.';
              
              break;
          case "btn_ANTT_CART_NOT":
              var tf_carnot = "";
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                tf_carnot = "gabinetes ";
              }else{
                tf_carnot = "soportes ";

              }
              texto = 'h) Carta Notariada del solicitante señalando que el o los '+tf_carnot+'para los cuales se gestiona autorización no cuentan con sanciones pendientes de cumplimiento con el Gobierno Autónomo Municipal de La Paz.';
              
              break;
          case "btn_ANTT_PLAN_MIME":
              texto = 'i) Plan de mimetización, de acuerdo a lo señalado en el Artículo 12 de la Ley Municipal Autonómica Nº 278, y el Artículo 13 del presente Reglamento. * Cuando la mimetización no sea factible, se deberá presentar un Informe Técnico fundamentado con respaldo en criterios estructurales, ambientales y otros, según corresponda; y será elaborado y firmado por un profesional que avale el contenido y que esté debidamente habilitado para el ejercicio profesional.';
              break;
          case "btn_ANTT_PLAN_MANT":
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                texto = "j) Plan de mantenimiento del o los gabinetes de acuerdo a lo señalado en el Artículo 30 del Reglamento a la LMA Nº 278.";
              }else{
                texto = 'j) Plan de mantenimiento del o los soportes y de la radio base de acuerdo a lo señalado en el Artículo 30 del presente Reglamento.';

              }
              
              break;
          case "btn_ANTT_EST_GEOLOGICO":
              texto = 'k) En el caso específico de que el emplazamiento de soportes de antenas de Gran Escala esté ubicado en áreas de riesgo muy alto de acuerdo Mapa de Riesgos vigente del Gobierno Autónomo Municipal de La Paz se deberá adjuntar obligatoriamente a la solicitud, un estudio geológico geotécnico que detalle las obras civiles específicas que deberán realizarse a fin de que aseguren la estabilidad de la o las estructuras a emplazarse; y el plan de ejecución de las mismas. Estos documentos deberán estar elaborados y firmados por un profesional  debidamente habilitado para el ejercicio profesional.';
              
              break;
          case "btn_ANTT_PLAN_FORM_DIG":
            if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                texto = "i) Planos en formato digital (PDF) con la firma del profesional responsable de su elaboración, de los detalles constructivos, características de los gabinetes y elementos complementarios como del sistema eléctrico.";
              }else{
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
              if( $scope.tipoReg == "G_UNICO" || $scope.tipoReg == "G_MULTIPLE"){
                texto = 'a) Documento que autorice el tiempo y lugar del uso del espacio público para el emplazamiento de gabinete  señalado en el Artículo 10 del Reglamento a la LMA Nº 278.';
              }else{
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
              swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias..","error");
      }
      swal("",texto,"");
    }
    $scope.obtOrdenRequisito =function(data){
      
      var posicion = 0;
      //data = "btn_"+data
      switch(data) {
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
              swal("Error!..","Por favor selecione el tipo de registro que realizara Gracias222..","error");

      
      }
      return posicion;
    }
    $scope.mostrarimgjuridico  =   function(imagen){  
        $.blockUI();
        var estado = false;
        var url =""; 
        $scope.extension =""; 
        for (var i = 0; i < $scope.img.length; i++) {
            if($scope.img[i].nombre == imagen){
              estado = true; 
              url = $scope.img[i].url;
              $scope.extension = $scope.img[i].campo;
            }
        }
     
        if (estado) {
            var extPod   =   $scope.extension.split(".")[1];
            try{
                $scope.archivoPOD = url;             
                if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' ||  extPod == 'png' ||  extPod == 'gif'){
                    window.open($scope.archivoPOD, "_blank");
                }/*else if(){
                    $("#fotpod").modal("show");             
                }*/
                $.unblockUI();

            }catch(e){
              console.log("error",e);
              $.unblockUI();
            }
            
            
        }else{
          swal('Error', 'Todavia no selecciono un documento desde  su equipo', 'error');
        }
              
        $.unblockUI();
    }
    $scope.remplazarArchivo = function(index){
       $scope.img.splice(index,1);
    };
    $scope.verficaFIle = function(campo,obj){
      var estado = false;
      for (var i = 0; i < obj.length; i++) {
        if(obj[i].nombre == campo){
          estado = true;
        }
      }
      return estado;
    }
    $scope.obt_pos = function(campo,obj){
      var posicion ;
      for (var i = 0; i < obj.length; i++) {
        if(obj[i].nombre == campo){
          posicion = i;
        }
      }
      return posicion;
    }
  ///////////////////////FIN DE ADJUNTOS V02/////////////////////
  //// data par el envio de informacion de  antenas multiple ///////
  $scope.registro_i_data_multiple = function(data){
      $scope.enviarTRamiteRBM = true;
      $scope.verTRamiteRBM = false;  
      $scope.mostrarbtn_multiple =  true;
      console.log("ssssss",data);
      $scope.codigoAntena = data.$$hashKey;
      console.log("NRO DE AUTORIZACION", data.f01_NRO_AUTORIZACION);
      $scope.ANTT_NROAUTORIZACION = data.f01_NRO_AUTORIZACION;
      $("#den_auto").val("");
      try{
        $scope.observarData = false;
        $scope.btnGuardarRegistro = true;
        $("#den_rbase").val(data.f01_DENOMINACION);
        $("#ub_rbase").val(data.f01_UBI_RB);
        $("#tp_prop").val(data.f01_TIPO_UBIC);
        $("#lt_ubicacion").val(data.f01_LATITUD);
        $("#den_ngabinete").val(data.f01_NRO_GABINETE);
        $("#observacion").val(data.ANT_OBSERVACION);
        $scope.ubicacion = data.f01_Ubicacion;
        var puntosxy = $scope.ubicacion;
        puntosxy = puntosxy.ubicacion.split(" ");
        grafica_XY(puntosxy[0],puntosxy[1]);
        $("#zona").val($scope.ubicacion.zona);
        $("#macrodistrito").val($scope.ubicacion.macrodistrito);
        $("#cod_catastral").val($scope.ubicacion.cod_catastral);
        $("#ln_ubicacion").val($scope.ubicacion.ubicacion);
        $scope.tipoReg == data.f01_TIPO_REGISTRO;
        if(data.f01_NRO_AUTORIZACION != ""){
          $scope.autoriza = "mostrar";
          $scope.n_autorizacion = false;
          $scope.chec_autorizacion = false;
          $("#den_auto").val(data.f01_NRO_AUTORIZACION);
          document.getElementById("condiciones").checked = 1;
        }else{
          $scope.autoriza = null;
          $scope.chec_autorizacion = false;
          $scope.n_autorizacion = true;
          document.getElementById("condiciones").checked = 0;
        }
        $scope.lstSoporteprevio = [];
        $scope.lstSoporteprevio = data.f01_GRILLA_SOPORTE;
        $scope.dataSoporte_pos_i = data.f01_GRILLA_SOPORTE;
        $scope.lstSoportes(); 
        $scope.posicion = data.$$hashKey;
        if($scope.tipoReg == "R_MULTIPLE"){
          $scope.mostrarRU = false;
          $scope.radiobase_simple = "mostrar"
          $scope.botonesrodolfo = false;

        }else{
          $scope.radiobase_simple = null;
          $scope.actualizarbtn_multiple = false;
          $scope.hab_boton_guardar = true;


        }
        $scope.mostrarRUGU = "mostrar";//false;
        //$scope.mostrarbtn_multiple = true;
        $scope.mostrarRMGM = true;
        $rootScope.mostrarRU = false;
        $scope.actualizarbtn_multiple = true;
        $rootScope.tabAdj = false;

        //FUNCIONES  PARA MOSTRAR ADJUNTOS
        $scope.btnGuardarRegistro = false;
        console.log("recuperadossss",$scope.requiRecuperados);
        $scope.requiRecuperados = [];
        $scope.SubDocNecesarios();
        console.log("documentos subidos",$scope.obtArchivosAdjuntos);
        $scope.estadoTramite_posi = "NO";
        $scope.reqPropiedad(data.f01_TIPO_UBIC);
        $scope.mostrar_ActualizarRequisitos();

      }catch(e){
        console.log("Error",e);
      }
    }
    $scope.SubDocNecesarios = function(){
      
      var tipo_file = "FILE_LIC_RADIODIFUSION";
      var oid_ciu = sessionService.get('IDSOLICITANTE');
      var oid_ciu1 = sessionService.get('IDCIUDADANO');
      var verifFiles = new reglasnegocio();
      verifFiles.identificador = "RCCIUDADANO_VERIF_FILES";
      verifFiles.parametros ='{"oidCiudadano":"' + oid_ciu + '","tipo_file":"'+ tipo_file +'"}';
      verifFiles.llamarregla(function(data){
          $scope.$apply();
          setTimeout(function(){
            data = JSON.parse(data);
            if(data[0].ant_sp_busquedafile != '' && 
              $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA != "" && 
              $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR!= "" && 
              $rootScope.datosIniciales.f01_poder_representante != "" )
            {
              $scope.file_CERT_RADIODIFUSION = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.CI_BIGDATA +"/" + data[0].ant_sp_busquedafile + "?app_name=todoangular";  
              $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante +"/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";  
              $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante +"/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";  
              $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 +"/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";  
              var nombre_certificado = "Licencia de Radiodifusión";
              $scope.guardarFiles(data[0].ant_sp_busquedafile, nombre_certificado ,$scope.file_CERT_RADIODIFUSION );
              var nombre_ci = "Cedula de Identidad";
              $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA, nombre_ci ,$scope.file_CI );
              var nombre_ci_inv = "Cedula de Identidad Inversa";
              $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR, nombre_ci_inv ,$scope.file_CI_inv );
              var rep_legal = "Documento del Representante Legal";
              $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, rep_legal ,$scope.rep_legal );
            }else{
                swal("Error!..","Es necesario que complemente los documentos necesarios para realizar el registro. Por favor Actualice su Información.","error");
            }
            //$scope.$apply();
          },200);

        });
    }
    $scope.serializarInformacionMultiple = function(dataAnt){
          console.log("codigoAntena_editable",$scope.codigoAntena);
          
          //console.log("asssssasaadd",$scope.dataSoporte_pos_i);

          //console.log("adjuntosssss..",$scope.requiRecuperados);
          $scope.tipoPersona = $rootScope.datosIniciales.f01_tipo_per;
          console.log("datos iniciales antes del modificaco",$rootScope.datosIniciales);
          var ubicacionutm = $("#ln_ubicacion").val();
          //ubicacionutm = ubicacionutm.split("(");
          //ubicacionutm = ubicacionutm[1].split(")");
          //ubicacionutm = ubicacionutm[0];
          var dataUbi = '{"xgeo_frm_id":'+sessionService.get('IDTRAMITE')+',"xgoe_ciudadano_id":"'+sessionService.get('IDUSUARIO')+'","xgeo_ubicacion":"'+ubicacionutm+'"}';
          $scope.guardarUbicacion(dataUbi); 
          // Fin Informacion Ubicacion
          $scope.UbicacionData_m = {"ubicacion":ubicacionutm,"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()}; 

          dataAnt = {"den_rbase":$("#den_rbase").val(),"ub_rbase":$("#ub_rbase").val(),"tp_prop":$("#tp_prop").val(),"den_ngabinete":$("#den_ngabinete").val(),"observacion":$("#observacion").val(),"macrodistrito":$("#macrodistrito").val(),"zona":$("#zona").val(),"cod_catastral":$("#cod_catastral").val()};  
          //$scope.UbicacionData_m = dataAnt;
          console.log("wwwww111",$scope.UbicacionData_m);

        if($scope.verif_requisitos_desp() && dataAnt != undefined){

          console.log("respuesta de la funcion",$scope.verif_requisitos_desp());
          $scope.ultimoRegistro(dataAnt);
          console.log("$scope.tipoProceso ",$scope.tipoProceso );
          if($scope.tipoProceso == "RBM"){

            $scope.tipoProceso_envio = "ANTT";
            $scope.tipoReg_desp = "R_UNICO";
            dataEnvLotus_M = '[{"f01_TIPO_REGISTRO":"R_UNICO","ANT_NOM_RADBASE":"'+$("#den_rbase").val()+'","ANT_UBICA_RBASE":"'+$("#ub_rbase").val()+'","ANT_TIP_PROPIEDAD":"'+$("#tp_prop").val()+'","f01_Ubicacion":'+JSON.stringify($scope.UbicacionData_m)+',"f01_GRD_SOPORTE":'+JSON.stringify($scope.dataSoporte_pos_i)+',"ANT_NRO_GAB":"'+$("#den_ngabinete").val()+'","ANT_OBSERVACION":"'+$("#observacion").val()+'"}]';
            console.log("qqqqqqqqqqqqqqqq",dataEnvLotus_M);
            $rootScope.Antenas_multiple = JSON.parse(dataEnvLotus_M);

          }else if( $scope.tipoProceso == "GM"){
            $scope.tipoProceso_envio = "ANTT";
            $scope.tipoReg_desp = "G_UNICO";

            dataEnvLotus_M = '[{"f01_TIPO_REGISTRO":"G_UNICO","ANT_NOM_RADBASE":"'+$("#den_rbase").val()+'","ANT_UBICA_RBASE":"'+$("#ub_rbase").val()+'","ANT_TIP_PROPIEDAD":"'+$("#tp_prop").val()+'","f01_Ubicacion":'+JSON.stringify($scope.UbicacionData_m)+',"ANT_NRO_GAB":"'+$("#den_ngabinete").val()+'","ANT_OBSERVACION":"'+$("#observacion").val()+'"}]';
            console.log("qqqqqqqqqqqqqqqqllllllllllllllllllllllllll",dataEnvLotus_M);
            $rootScope.Antenas_multiple = JSON.parse(dataEnvLotus_M);

          }
            console.log("QQQQAAA",$rootScope.Antenas_multiple);
          $rootScope.datosIniciales_rcp.ANT_NRO_AUTORIZACION = $("#den_auto").val();
          var fechactual = obtFechaActual.obtenerFechaActual();
          $rootScope.datosIniciales_rcp.g_fecha = fechactual;

          $rootScope.datosIniciales_rcp.g_tipo = $scope.tipoProceso_envio;
          console.log("$rootScope.datosIniciales_rcp.g_tipo",$rootScope.datosIniciales_rcp.g_tipo);
          //$rootScope.datosIniciales_rcp.GRD_ANTENAS = $rootScope.Antenas_multiple;
          $rootScope.datosIniciales_rcp.File_Adjunto = "";
          $rootScope.datosIniciales_rcp.File_Adjunto = $scope.rutaArchEnvioLotus;
          $rootScope.datosIniciales_rcp.INT_FORM_ALMACENADO = "G";
          console.log("bbbbbbb",$rootScope.datosIniciales_rcp);

          $scope.tipoPersona          =   sessionService.get('TIPO_PERSONA');
          if ($scope.tipoPersona == 'NATURAL'){
              var combox      = document.getElementById('ANT_EXP_CI');
              var selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales_AG.ANT_EXP_CI_VALOR = selected;
              combox      = document.getElementById('ANT_GEN');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales_AG.ANT_GEN_VALOR = selected;
              combox      = document.getElementById('ANT_LUG_NAC');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales_AG.ANT_LUG_NAC_VALOR = selected;
              combox      = document.getElementById('ANT_E_CIVIL');
              selected    = combox.options[combox.selectedIndex].text;
              $rootScope.datosIniciales_AG.ANT_E_CIVIL_VALOR = selected;
              var fechactual = obtFechaActual.obtenerFechaActual();
              $rootScope.datosIniciales_AG.g_fecha = fechactual;
              $rootScope.datosIniciales_AG.g_tipo = $scope.tipoProceso;
              $rootScope.datosIniciales_AG.GRD_ANTENAS = $rootScope.Antenas;
              $rootScope.datosIniciales_AG.INT_FORM_ALMACENADO = "G";
          }else if($scope.tipoPersona == 'JURIDICO'){
             console.log("por else",$rootScope.datosIniciales);
              $rootScope.datosIniciales_rcp.f01_tipo_per            =   'J';
              $rootScope.datosIniciales_rcp.f01_tipo_per_desc       =   'JURIDICO';
              $rootScope.datosIniciales_rcp.ANT_TIPO_PERSONA        =   '2';
              $rootScope.datosIniciales_rcp.ANT_NIT                 =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales_rcp.ANT_RAZ_SOC             =   $rootScope.datosIniciales.f01_raz_soc_per_jur;
              $rootScope.datosIniciales_rcp.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_poder_representante; 
              $rootScope.datosIniciales_rcp.ANT_NUM_PODER           =   $rootScope.datosIniciales.f01_ges_vig_pod;           
              $rootScope.datosIniciales_rcp.ANT_EMP_TEL             =   "";
              $rootScope.datosIniciales_rcp.ANT_NUM_NOTARIA         =   $rootScope.datosIniciales.f01_num_notaria;//f01_num_notaria
              $rootScope.datosIniciales_rcp.ANT_EMP_CEL             =   "";
              $rootScope.datosIniciales_rcp.ANT_EMP_CORREO          =   "";
              $rootScope.datosIniciales_rcp.ANT_NUM_CI              =   $rootScope.datosIniciales.f01_num_doc_per_jur;
              $rootScope.datosIniciales_rcp.ANT_NOM                 =   $rootScope.datosIniciales.f01_pri_nom_rep;+ " " + $rootScope.datosIniciales.f01_seg_nom_rep ;//+ " " + $rootScope.datosIniciales.f01_ter_nom_rep;
              $rootScope.datosIniciales_rcp.ANT_PAT                 =   $rootScope.datosIniciales.f01_ape_pat_rep;
              $rootScope.datosIniciales_rcp.ANT_MAT                 =   $rootScope.datosIniciales.f01_ape_mat_rep;
              $rootScope.datosIniciales_rcp.ANT_CAS                 =   $rootScope.datosIniciales.f01_ape_cas_rep;
              $rootScope.datosIniciales_rcp.ANT_DOM                 =   $rootScope.datosIniciales.f01_zon_rep_valor;
              $rootScope.datosIniciales_rcp.ANT_CELU                =   $rootScope.datosIniciales.f01_cel_rep;   
              $rootScope.datosIniciales_rcp.ANT_TEL                 =   $rootScope.datosIniciales.f01_telef_rep;     
              $rootScope.datosIniciales_rcp.ANT_MAIL                =   $rootScope.datosIniciales.f01_email_rep;
              $rootScope.datosIniciales_rcp.f01_macro_act           =   1; 
              $rootScope.datosIniciales_rcp.GRD_ANTENAS = $rootScope.Antenas_multiple;

          }
          try {
                //$rootScope.datosIniciales.GRD_MULTIPLE_ANTENAS = $rootScope.datosIniciales_AG;
                //console.log("WWQWEQWEQWEQWe",$rootScope.datosIniciales_rcp); 
                var datosSerializados   = JSON.stringify($rootScope.datosIniciales_rcp);
                //console.log("PPPOPOPOPPO",datosSerializados); 
                $rootScope.btnGuardarForm   =   true; $scope.btnEnviarFormLinea    =   false;

                var datosSerializados_UPDATE = $scope.infoReserva;

                console.log("informcaion a actualizar",datosSerializados_UPDATE); 
                ///////// PROCEDEREMOS A ACTUALIZAR LA INFORMACION DE LA GRILLA /////
                $scope.grd_antenas_nueva = [];
                for (var i = 0; i < $scope.grilla_rbmultiple.length; i++) {
                  if($scope.grilla_rbmultiple[i].$$hashKey == $scope.codigoAntena){
                    $scope.grilla_rbmultiple[i].estadoTramite = "ENVIADO";
                    $scope.grilla_rbmultiple[i].AdjuntosTramite = $scope.rutaArchEnvioLotus;
                    $scope.grd_antenas_nueva.push($scope.grilla_rbmultiple[i]);
                  }else{
                    $scope.grd_antenas_nueva.push($scope.grilla_rbmultiple[i]);
                  }
                }

                //console.log("nueva grilla envio espero que funcioneee",$scope.grd_antenas_nueva);
                console.log("adjuntos recuperados",$scope.requiRecuperados);
                datosSerializados_UPDATE.GRD_ANTENAS = $scope.grd_antenas_nueva;
                datosSerializados_UPDATE.File_Adjunto = $scope.requiRecuperados;

                datosSerializados_UPDATE.g_tipo = $scope.tipoProceso;//"RBM";

                console.log("despues del vaciado y nuevo valor",datosSerializados_UPDATE); 
                //console.log("vvvvvvvvvvvvvvv",$scope.grilla_rbmultiple);
                var idCiudadano         = sessionService.get('IDSOLICITANTE');
                var idTramite           = sessionService.get('IDTRAMITE');
                var idServicio          = sessionService.get('IDSERVICIO');
                var Parametros = new datosFormularios();
                Parametros.frm_tra_dvser_id = idServicio;
                Parametros.data_json =  JSON.stringify(datosSerializados_UPDATE);
                Parametros.frm_tra_id_ciudadano = idCiudadano;
                Parametros.frm_tra_id_usuario = 1;
                Parametros.frm_idTramite = idTramite;
                $rootScope.btnGuardarForm   =   true;
                $.blockUI();
                console.log("parametros para actualizar ",Parametros);
                Parametros.sp_crear_datos_formulario(function(results){ 
                    results = JSON.parse(results);
                    results = results.success;
                    if(results.length > 0){
                        $.unblockUI();
                        swal('', "Formulario almacenado", 'success');
                        $scope.btnEnviarFormLinea    =   false;
                    }else{
                        $.unblockUI();
                        swal('', "Formulario no almacenado", 'error');
                        $scope.btnEnviarFormLinea    =   true;
                    }
                }); 
            }catch(e){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
            }
        }else{
          swal("Error!","Para guardar el formulario es necesario completar todos los campos y los documentos","error");
        }
        $scope.estadoTramite = "";
      
    }

    // ==================> 52535
    $scope.enviarData_multiple = function() {


      var datosSerializados = $rootScope.datosIniciales_rcp;
      //console.log("data a neviar Rodod",datosSerializados);
      $scope.codigoenvioLotus                = $rootScope.datosIniciales_rcp.g_tipo;
      datosSerializados.GRD_ANTENAS          = $rootScope.Antenas_multiple;
      datosSerializados.File_Adjunto         = $scope.rutaArchEnvioLotus;
      datosSerializados.ANT_NRO_AUTORIZACION = $scope.ANTT_NROAUTORIZACION;
      //console.log("envio de data antenas....",$rootScope.Antenas_multiple);
      //console.log("Esto esta asi ",datosSerializados);
      //console.log("AAAAAAAAAAAAA",$scope.codigoenvioLotus);
      if($scope.codigoenvioLotus == "RBM"){
        $scope.codigoenvioLotus = "ANTT"; 
        datosSerializados.g_tipo = "ANTT"; 
        //console.log("datos para el envio",datosSerializados.g_tipo);
      }else{
        $scope.codigoenvioLotus = "RG"; 
        datosSerializados.g_tipo = "RG";
        //console.log("datos para el enviogffgfgf====>",datosSerializados.g_tipo);
      } 
      datosSerializados = JSON.stringify($rootScope.datosIniciales_rcp);
      console.log("datos envio Lotus OK======>",datosSerializados);
  
      var crearCaso   =   new gCrearCaso();
      crearCaso.usr_id    = 1,
      crearCaso.datos     = datosSerializados,
      crearCaso.procodigo = $scope.codigoenvioLotus,
      crearCaso.crearCasoAeLinea(function(response){
          try{
              response    =   JSON.parse(response);
              //console.log("==========>",response);
              var results = response.success.data;
                //console.log("qqqqwwwwqqqwww",results);
                  datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                  datosIF2 = datosIF[1];
                  datosIF[0]= datosIF[0].substring(1, datosIF[0].length);
                  $scope.nrotramitec = datosIF[0];
                  //console.log("RESpuestadddd",$scope.nrotramitec);
                  $scope.envio_despliegue = "proceder";
                  //sessionService.set('NROTRAMITE', datosIF[0]);
                  //sessionService.set('NROTRAMITEID', datosIF[1]);
                  //sessionService.set('IDPROCESO', datosIF[6]);
                  $rootScope.requisitosrbase = null;
                  try{
                      $scope.ConsumoServCatastro_desp($scope.nrotramitec,$scope.tipoReg_desp);
                      swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + $scope.nrotramitec + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma de la Dirección de Administración Territorial y Catastral para recabar mayor información.");
                      //$scope.validarFormProcesos_multiple();
                      $rootScope.botones = true;
                      $scope.desabilitado = true;
                      $scope.enviarTRamiteRBM = false;
                     // setTimeout(function(){
                        //VOLVER AL MENU
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

                        setTimeout(function () {
                              $scope.$apply(function () {
                                  location.reload();
                              });
                        }, 3000);
                        //FIN VOLVER MENU
                     // },200);

                  }catch(e){}

                  $.unblockUI();
          }catch(e){
              alert("conexion fallida ");
          }
      });
    };

    var rItems = new Array();
    $scope.ConsumoServCatastro_desp = function(nroTramiteEnviado,tipoReg_desp)
    {
      rItems = [];
      var id_item = nroTramiteEnviado;
      id_item = id_item.split("/");
      id_item = id_item[0];
      console.log("rrrrrrrrrrrrr",$rootScope.Antenas_multiple);
      inform = $rootScope.Antenas_multiple;

      for (var i = 0; i < inform.length; i++) {
        var punto = inform[i].f01_Ubicacion.ubicacion;
        punto = punto.split(" ");;
        var puntox = punto[0];
        var puntoy = punto[1];
        punto = puntox+ ","+puntoy;
        id_item = id_item +(i+1);
        if(tipoReg_desp == "G_UNICO" || tipoReg_desp == "G_MULTIPLE"){
          nro_Soporte = 0;
            if(tipoReg_desp == "G_UNICO"){
              
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].ANT_NOM_RADBASE+'","ubicacion":"'+inform[i].ANT_UBICA_RBASE+'","tipo_propiedad":"'+inform[i].ANT_TIP_PROPIEDAD+'","nro_gabinetes":"'+inform[i].ANT_NRO_GAB+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';
            }else if(tipoReg_desp == "G_MULTIPLE"){
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].f01_DENOMINACION+'","ubicacion":"'+inform[i].f01_UBI_RB+'","tipo_propiedad":"'+inform[i].f01_TIPO_UBIC+'","nro_gabinetes":"'+inform[i].f01_NRO_GABINETE+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';

            }
        }else{
          if(tipoReg_desp == "R_MULTIPLE"){
              nro_Soporte = inform[i].f01_GRILLA_SOPORTE.length;
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].f01_DENOMINACION+'","ubicacion":"'+inform[i].f01_UBI_RB+'","tipo_propiedad":"'+inform[i].f01_TIPO_UBIC+'","nro_gabinetes":"'+inform[i].f01_NRO_GABINETE+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';

          }else{
              nro_Soporte = inform[i].f01_GRD_SOPORTE.length;
              var items = '{"ext_id_item":"'+id_item+'","denominacion":"'+inform[i].ANT_NOM_RADBASE+'","ubicacion":"'+inform[i].ANT_UBICA_RBASE+'","tipo_propiedad":"'+inform[i].ANT_TIP_PROPIEDAD+'","nro_gabinetes":"'+inform[i].ANT_NRO_GAB+'","nro_soportes":"'+nro_Soporte+'","geom":{"type":"Point","coordinates":['+punto+']}}';
          }

        }
        rItems.push(items);
      }
      var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMT1RVUyIsInN1YiI6Ik1hcGEgQW50ZW5hcyIsImV4cCI6NjM2NzQwNzMwMzk5MjA4OTg2LCJ1c3VhcmlvIjoibG90dXMuYW50ZW5hcyIsImlkVXN1YXJpbyI6MH0=.N4/Gddm85L7tAxCMiudUvfKeCYywANrxgw8OA6HrCyE=';
      $.ajax({
          type: 'POST',
          headers:{
            AuthorizationServices: 'Bearer '+token
          },
         url: $scope.urlSITv3+'GeoDB/publico/swPublicoRegistrarItemsTramite',
         dataType: 'json',
         data: '{"id_mapa":1,"ext_id_tramite":"'+nroTramiteEnviado+'","usuario":"antenasIGOB","items":['+rItems+']}',
         success: function (data){                    
            
          },
         error: function (data){ console.log(data);}
      });

    }
    $scope.verif_requisitos_desp = function(){
      console.log("$scope.tipoProceso",$scope.tipoProceso);
          if($scope.tipoProceso == "RBM"){
            $scope.tipoReg_desp = "R_UNICO";
          }else{
            $scope.tipoReg_desp = "G_UNICO";
          }
        switch($scope.tipoReg_desp) {
            case "R_UNICO":
                if($("#den_rbase").val()!= "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" ){
                  $scope.juntarRequisitos();
                  if($scope.lstSoporteprevio.length > 0 && $scope.rutaArchEnvioLotus.length > 7){

                    return true;
                  }
                 
                }else{

                 return false;
                }
                break;
            case "R_MULTIPLE":
                
                if($scope.grilla_rbmultiple.length >= 0 ){
                  return true;

                }else{

                 return false;
                }
                break;
            case "G_UNICO":

                if($("#den_rbase").val()!= "" && $("#ub_rbase").val() != "" && $("#tp_prop").val() != "" && $("#ln_ubicacion").val() != "" && $("#den_ngabinete").val() != "" ){
                    $scope.juntarRequisitos();
                    if($scope.rutaArchEnvioLotus.length  > 5){
                      return true;
                    }

                }else{
                  
                    return false;
                }

                break;
            case "G_MULTIPLE":
    
                if($scope.grilla_rbmultiple.length >= 0 ){

                  return true;

                }else{

                 return false;
                }

                break;
            default:
                swal("ES NECESARIO SELECIONAR UNA DE LAS OPCIONES GRACIAS..","error");
        }
    }

    $scope.iniAntenas = function(){
      
      graficar_mapa("mapa1");
      //graficar_mapa("mapa2");
     //mapas(sessionService.get('IDTRAMITE'));
     $("#idtramite").val(sessionService.get('IDTRAMITE'));
     
      //$scope.mostrarmapa();
    }
}