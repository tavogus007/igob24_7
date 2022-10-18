//var urlIf = "http://serviciosrs.lapaz.bo/wsIf";
var urlComp;
var dataResp;
var dataParams;
var typeCall;

if(jsonURLS){
  var urlIf = jsonURLS.CONEXION_API_PG_IF+"wsIf";
  var urlSitram = jsonURLS.CONEXION_API_PG_IF+"wsSitram";
  var urlSigetuTramite = jsonURLS.CONEXION_API_PG_IF_OFICIAL+"wsSTTF";
}

/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxIF(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlIf + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        //console.log(response);
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        //dataResp = response.responseText;
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataResp);
      }
    });

    return dataResp;
};
/*//////////////////////////////////PERSONA EXTRAVIADA //////////////////////////////////////////*/

function visitas() {
    this.nro;
    this.visitas;
};

visitas.prototype.agregarVisitas = function (functionResp) {
    urlComp = "/agregarVisitas";
    typeCall = "post";
    dataParams = {
      "nro" : this.nro,
      "visitas" : this.visitas
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function Extraviado() {
    this.ta;
    this.nombre;
    this.fec;
};

Extraviado.prototype.buscarExtraviado = function (functionResp) {
    urlComp = "/busquedaExtraviado";
    typeCall = "post";
    dataParams = {
      "ta" : this.ta,
      "nombre" : this.nombre,
      "fec" : this.fec
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

Extraviado.prototype.lstExtraviados = function (functionResp) {
    urlComp = "/lstExtraviados";
    typeCall = "post";
    dataParams = {

    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};
/*///////////////////////////////////////////////// CREAR TRAMITE AE LINEA /////////////////////////////////*/

function gCrearCaso() {
    this.usr_id;
    this.datos;
    this.procodigo;
};
gCrearCaso.prototype.crearCasoAeLinea = function (functionResp) {
    urlComp = "/crearCasoAeLinea";
    typeCall = "post";
    dataParams = {
      "usr_id" : this.usr_id,
      "datos" : this.datos,
      "procodigo" : this.procodigo
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function gCrearCasoLinea() {
    this.usr_id;
    this.datos;
    this.procodigo;
};
gCrearCasoLinea.prototype.crearCasoLinea = function (functionResp) {
    urlComp = "/crearCasoEnLinea";
    typeCall = "post";
    dataParams = {
      "usr_id" : this.usr_id,
      "datos" : this.datos,
      "procodigo" : this.procodigo
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function gCrearCasoSitram() {
    this.proid;
    this.actid;
    this.usr_id;
    this.datos;
    this.procodigo;
    this.macro_id;
    this.nodo_id;
    this.tipo_tramite;
    this.fojas;
    this.desc_fojas;
};
gCrearCasoSitram.prototype.crearCasoAeLineaSitram = function (functionResp) {
    urlComp = "/crearCasoSitram";
    typeCall = "post";
    dataParams = {
      "proid" : this.proid,
      "actid" : this.actid,
      "usr_id" : this.usr_id,
      "datos" : this.datos,
      "procodigo" : this.procodigo,
      "macro_id" : this.macro_id,
      "nodo_id" : this.nodo_id,
      "tipo_tramite": this.tipo_tramite,
      "fojas":this.fojas,
      "desc_fojas":this.desc_fojas
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};
gCrearCaso.prototype.crearSolicitudViaje = function (functionResp) {
    urlComp = "/crearSolicitudViaje";
    typeCall = "post";
    dataParams = {
      "usr_id" : this.usr_id,
      "datos" : this.datos,
      "procodigo" : this.procodigo
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function gModal() {
    this.busq;
    this.ci;
    this.tipo;
    this.nombre;
    this.appat;
    this.apmat;
    this.sql;
};
gModal.prototype.prohibicionebsq = function(functionResp){
    urlComp = "/prohibicionebsq";
    typeCall = "post";
    dataParams = {
      "bsq" : this.busq,
      "ci" : this.ci,
      "tipo" : this.tipo,
      "nombre" : this.nombre,
      "appat" : this.appat,
      "apmat" : this.apmat
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};
gModal.prototype.reporte_dinamico = function(functionResp){
    urlComp = "/reporte_dinamico";
    typeCall = "post";
    dataParams = {
      "sql" : this.sql
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

/*///////////////////////////////////////////////// NATURAL /////////////////////////////////////////////////*/
function gDocumentos() {
    this.doc_sistema;
    this.doc_proceso;
    this.doc_id;
    this.doc_ci_nodo;
    this.doc_datos;
    this.doc_titulo;
    this.doc_palabras;
    this.doc_url;
    this.doc_version;
    this.doc_tiempo;
    this.doc_firma_digital;
    this.doc_registro;
    this.doc_modificacion;
    this.doc_estado;
    this.doc_usuario;
    this.doc_tipo_documento;
    this.doc_tamanio_documento;
    this.doc_nombre;
    this.doc_tps_doc_id;
    this.doc_url_logica;
    this.doc_acceso;
    this.doc_cuerpo;
    this.doc_tipo_documentacion;
    this.doc_tipo_ingreso;
    this.doc_estado_de_envio;
    this.doc_correlativo;
    this.doc_tipo_documento_ext;
    this.doc_nrotramite_nexo;
    this.doc_id_carpeta;
};
gDocumentos.prototype.insertarDoc = function (functionResp) {
    urlComp = "/crearAdjunto";
    typeCall = "post";
    dataParams = {
      "doc_sistema" : this.doc_sistema,
      "doc_proceso" : this.doc_proceso,
      "doc_id" : this.doc_id.toString(),
      "doc_ci_nodo" : this.doc_ci_nodo,
      "doc_datos" : this.doc_datos,
      "doc_titulo" : this.doc_titulo,
      "doc_palabras" : this.doc_palabras,
      "doc_url" : this.doc_url,
      "doc_version" : this.doc_version,
      "doc_tiempo" : this.doc_tiempo,
      "doc_firma_digital" : this.doc_firma_digital.toString(),
      "doc_registro" : this.doc_registro,
      "doc_modificacion" : this.doc_modificacion,
      "doc_estado" : this.doc_estado,
      "doc_usuario" : this.doc_usuario,
      "doc_tipo_documento" : this.doc_tipo_documento,
      "doc_tamanio_documento" : this.doc_tamanio_documento,
      "doc_nombre" : this.doc_nombre,
      "doc_tps_doc_id" : this.doc_tps_doc_id,
      "doc_url_logica" : this.doc_url_logica,
      "doc_acceso" : this.doc_acceso,
      "doc_cuerpo" : this.doc_cuerpo,
      "doc_tipo_documentacion" : this.doc_tipo_documentacion,
      "doc_tipo_ingreso" : this.doc_tipo_ingreso,
      "doc_estado_de_envio" : this.doc_estado_de_envio,
      "doc_correlativo" : this.doc_correlativo,
      "doc_tipo_documento_ext" : this.doc_tipo_documento_ext,
      "doc_nrotramite_nexo" : this.doc_nrotramite_nexo,
      "doc_id_carpeta" : this.doc_id_carpeta.toString()
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aelstNombreVia(){
    this.idzona;
    this.tipovia;
};
aelstNombreVia.prototype.aelst_NombreVia = function (functionResp){
    urlComp = "/aelstNombreVia";
    typeCall = "post";
    dataParams = {
        "idzona" : this.idzona,
        "tipovia" : this.tipovia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

//FECHA Y HORA DEL SERVIDOR
function fechaserver() {
};
fechaserver.prototype.obtfechahora = function (functionResp) {
    urlComp = "/fechaHora";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

/*///////////////DATOS GENERALES//////////////////////*/
function categoriaLicencia() {
    this.dependencia;
};

categoriaLicencia.prototype.categoria_Licencia = function (functionResp) {
    urlComp = "/categoriaLicencia";
    typeCall = "post";
    dataParams= {
        "dependencia" : this.dependencia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);    
};

function datosLicencia() {
};

datosLicencia.prototype.datos_Licencia = function (functionResp) {
    urlComp = "/datosLicencia";
    typeCall = "post";
    dataParams= {};
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);    
};

/*function categoriasAgrpLicencia() {
    this.dependencia;
};

categoriasAgrpLicencia.prototype.categorias_AgrpLicencia = function (functionResp) {
    urlComp = "/categoriasAgrpLicencia";
    typeCall = "post";
    dataParams= {
        "dependencia" : this.dependencia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);    
};*/

function actividadDesarrolladaLic() {
    this.dependencia;
};
actividadDesarrolladaLic.prototype.actividad_DesarrolladaLic = function (functionResp) {
    urlComp = "/actividadDesarrolladaLic";
    typeCall = "post";
    dataParams= {
        "dependencia" : this.dependencia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);    
};

///////////////////////////Combo Buscador////////////////////////////////

function bsqActividadDesarrollada() {
    this.idCatAgrupada;
    this.descrip;
};

bsqActividadDesarrollada.prototype.bsqActividad_Desarrollada = function (functionResp) {
    urlComp = "/bsqActividadDesarrollada";
    typeCall = "post";
    dataParams= {
        "idCatAgrupada" : this.idCatAgrupada,
        "descrip": this.descrip
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);    
};


function aelstRequisitosDocCategoria(){
    this.dependencia;
    this.tipopersona;
};

aelstRequisitosDocCategoria.prototype.aelst_RequisitosDocCategoria = function (functionResp) {
    urlComp = "/aelstRequisitosDocCategoria";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia,
        "tipopersona" : this.tipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aelstRequisitosTecCategoria(){
    this.idCategoria;
    this.tipopersona;
};

aelstRequisitosTecCategoria.prototype.aelst_RequisitosTecCategoria = function (functionResp) {
    urlComp = "/aelstRequisitosTecCategoria";
    typeCall  = "post";
    dataParams  = {
        "idCategoria" : this.idCategoria,
        "tipopersona" : this.tipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};



/*MULTISERVICIOS*/
function datosLicenciaigob(){
};
datosLicenciaigob.prototype.datos_Licenciaigob = function (functionResp) {
    urlComp = "/datosLicenciaigob";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aeRequisitosDoc2018(){
    this.sidcategoria;
    this.stipopersona;
};
aeRequisitosDoc2018.prototype.aelstRequisitos2018 = function (functionResp) {
    urlComp = "/lstRequisitos2018";
    typeCall = "post";
    dataParams = {
        "sidcategoria" : this.sidcategoria,
        "stipopersona" : this.stipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aelstRequisitostecmul(){
    this.dependencia;
    this.tipopersona;
};
aelstRequisitostecmul.prototype.aelst_Requisitostecmul = function (functionResp) {
    urlComp = "/aelstRequisitostecmul";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia,
        "tipopersona" : this.tipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aeRequisitosDoc2018array(){
    this.asidcategoria;
    this.astipopersona;
};
aeRequisitosDoc2018array.prototype.aelstRequisitos2018_array = function (functionResp) {
    urlComp = "/lstRequisitos2018array";
    typeCall = "post";
    dataParams = {
        "asidcategoria" : this.asidcategoria,
        "astipopersona" : this.astipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function datosLicenciasmul(){
};
datosLicenciasmul.prototype.datos_Licenciamul = function (functionResp) {
    urlComp = "/datosLicenciamul";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function categoriasAgrpLicencia(){
    this.dependencia;
};
categoriasAgrpLicencia.prototype.categorias_AgrpLicencia = function (functionResp) {
    urlComp = "/categoriasAgrpLicencia_igob";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};


function aelstRequisitosTecActividad(){
    this.dependencia;
    this.tipopersona;
};
aelstRequisitosTecActividad.prototype.aelst_RequisitosTecActividad = function (functionResp){
    urlComp = "/aelstRequisitosTecActividad";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia,
        "tipopersona" : this.tipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aelstRequisitosDocActividad(){
    this.dependencia;
    this.tipopersona;
};
aelstRequisitosDocActividad.prototype.aelst_RequisitosDocActividad = function (functionResp){
    urlComp = "/aelstRequisitosDocActividad";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia,
        "tipopersona" : this.tipopersona
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function lstCaracteristica(){
    this.clasificador;
};
lstCaracteristica.prototype.lst_Caracteristica = function (functionResp) {
    urlComp = "/lstCaracteristica";
    typeCall = "post";
    dataParams = {
        "clasificador" : this.clasificador
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};


//formulario 10
function aelstdistritos() {
    this.id_macrodistrito;
};
aelstdistritos.prototype.aelst_distritos = function (functionResp) {
  
    urlComp = "/aelstdistritos";
    typeCall = "post";
    dataParams = {
        "id_macrodistrito" : this.id_macrodistrito
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp); 
};

function aelstzonas(){
    this.id_distrito;
};
aelstzonas.prototype.aelst_zonas = function (functionResp) {
  console.log('ksdlcfldknfv');
    urlComp = "/aelstzonas";
    typeCall = "post";
    dataParams = {
        "id_distrito" : this.id_distrito
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function aelstNombreVia(){
    this.idzona;
    this.tipovia;
};
aelstNombreVia.prototype.aelst_NombreVia = function (functionResp){
    urlComp = "/aelstNombreVia";
    typeCall = "post";
    dataParams = {
        "idzona" : this.idzona,
        "tipovia" : this.tipovia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function PUBlstCategoriaL(){
};
PUBlstCategoriaL.prototype.PUB_lstCategoriaL = function (functionResp) {
    urlComp = "/PUBlstCategoriaL";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
}; 

function actividaddesarrolladagrupo(){
};
actividaddesarrolladagrupo.prototype.actividad_desarrolladagrupo = function (functionResp) {
    urlComp = "/actividaddesarrolladagrupo";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
}; 

function categoriaagrupadalicenciades(){
    this.dependencia;
};
categoriaagrupadalicenciades.prototype.categoriaagrupadalicencia_des = function (functionResp){
    urlComp = "/categoriaagrupadalicenciades";
    typeCall = "post";
    dataParams = {
        "dependencia" : this.dependencia
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function getFormulario(){
    this.idprc;
    this.idcampo;    
};
getFormulario.prototype.obtForms = function (functionResp){
    urlComp = "/exportar_formulario";
    typeCall = "post";
    dataParams = {
        "idprc" : this.idprc,
        "idcampo" : this.idcampo
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};



////// SIGE TU TRAMITE

function ejecutarAjaxSigetuTramite(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlSigetuTramite + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        //dataResp = response.responseText;
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataResp);
      }
    });
    return dataResp;
};

function ejecutarAjaxSITRAM(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlSitram + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        //console.log(response);
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        //dataResp = response.responseText;
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataResp);
      }
    });

    return dataResp;
};

function lstTramitesAE(){
    this.ci;
    this.clave;    
};
lstTramitesAE.prototype.lstTramites_AE = function (functionResp){
    urlComp = "/lstTramites";
    typeCall = "post";
    dataParams = {
        "ci" : this.ci,
        "clave" : this.clave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};

function vizualizarTramitesAE(){
    this.clave;
    this.ci;    
};
vizualizarTramitesAE.prototype.vizualizar_TramitesAE = function (functionResp){
    urlComp = "/visualizarTramite";
    typeCall = "post";
    dataParams = {
        "clave" : this.clave,
        "ci" : this.ci
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};

function lstTramitesTerritorial(){
    this.ci;
    this.clave;    
};
lstTramitesTerritorial.prototype.lstTramites_Territorial = function (functionResp){
    urlComp = "/lstTramiteTerritorial";
    typeCall = "post";
    dataParams = {
        "ci" : this.ci,
        "clave" : this.clave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};

function visualizarTramitesTerritorial(){
    this.clave;
    this.ci;    
};
visualizarTramitesTerritorial.prototype.visualizarTramites_Territorial = function (functionResp){
    urlComp = "/visualizarTramiteTerritorial";
    typeCall = "post";
    dataParams = {
        "clave" : this.clave,
        "ci" : this.ci
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};

function lstTramitesSitram(){
    this.ci;
    this.clave;    
};
lstTramitesSitram.prototype.lstTramites_Sitram = function (functionResp){
    urlComp = "/lstTramitesSITRAM";
    typeCall = "post";
    dataParams = {
        "ci" : this.ci,
        "clave" : this.clave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};

function visualizarTramitesSitram(){
    this.nroTramite;
    this.clave;    
};
visualizarTramitesSitram.prototype.visualizarTramites_Sitram = function (functionResp){
    urlComp = "/visualizarTramitesSITRAM";
    typeCall = "post";
    dataParams = {
        "nroTramite" : this.nroTramite,
        "clave" : this.clave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);
};


function lstTramitesLotus() {
    this.ltci;
    //this.ltcodigo;
    //this.ltclave;
};


lstTramitesLotus.prototype.lstTramites_Lotus = function (functionResp) {
    urlComp = "/lstTramitesXci";
    typeCall = "post";
    dataParams= {
        "ltci" : this.ltci
        //"ltcodigo": this.ltcodigo,
        //"ltclave": this.ltclave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);    
};

function visualizarTramitesLotus() {
    this.ltci;
    this.ltcodigo;
    this.ltclave;
};

visualizarTramitesLotus.prototype.visualizar_TramitesLotus = function (functionResp) {
    urlComp = "/visualizarTramitesXci";
    typeCall = "post";
    dataParams= {
        "ltci" : this.ltci,
        "ltcodigo": this.ltcodigo,
        "ltclave": this.ltclave
    };
    ejecutarAjaxSigetuTramite(urlComp, typeCall, dataParams, functionResp);    
};

//crea tram movilidad
function crear_Tramite_lotus(){
    this.proid;
    this.actid;
    this.usr_id;
    this.datos;
    this.procodigo;
    this.macro_id;
    this.nodo_id;
    this.ws_id;
};
crear_Tramite_lotus.prototype.tram_lotus = function (functionResp) {
  urlComp = "/crearTramiteLotus";
  typeCall = "post";
  dataParams = {
    "proid" : this.proid,
    "actid" : this.actid,
    "usr_id" : this.usr_id,
    "datos" : this.datos,
    "procodigo" : this.procodigo,
    "macro_id" : this.macro_id,
    "nodo_id" : this.nodo_id,
    "ws_id" : this.ws_id
  };
  ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};

function crearTramiteMovilidad(){
  this.usr_id;
  this.datos;
  this.procodigo;
}

crearTramiteMovilidad.prototype.tramite_linea = function(functionResp){
  urlComp = "/crearTramiteMovPermiso";
  typeCall = "post";
  dataParams = {
    "usr_id" : this.usr_id,
    "datos" : this.datos,
    "procodigo" : this.procodigo
  };
  ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
}

//Ley 343
function getCategoriaLicencia(){ 
    this.dependencia; 
};

getCategoriaLicencia.prototype.getCategoria_Licencia = function (functionResp) { 
    urlCompif = "/getDatosLicencia"; 
    typeCallif = "post"; 
    dataParamsif = { 
        "dependencia" : this.dependencia 
    }; 
    ejecutarAjaxIF(urlCompif, typeCallif, dataParamsif, functionResp); 
};

function getDatosAELotus() {
    this.caso;
    this.idActividad;
};

getDatosAELotus.prototype.getDatosAE_Lotus = function (functionResp) {
    urlCompAe = "/datos_tramite";
    typeCallAe = "post";
    dataParamsAe = {
        "caso":this.caso,
        "idActividad":this.idActividad
    };
    ejecutarAjaxIF(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

function gCrearTramiteLinea() {
    this.usr_id;
    this.datos;
    this.procodigo;
};
gCrearTramiteLinea.prototype.crearTramiteLinea = function (functionResp) {
    urlComp = "/crearCasoGestorEmpresarial";
    typeCall = "post";
    dataParams = {
      "usr_id" : this.usr_id,
      "datos" : this.datos,
      "procodigo" : this.procodigo
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};
//Sistema de ventas.
function tiendaVirtual() {
  this.id_ae;
  this.estado;
  this.categoria;
  this.imagen;
  this.datosAuxiliares;
  this.nombre;
}
tiendaVirtual.prototype.modificarTiendaVirtual = function (functionResp) {
    urlComp = "/modificarAEDelivery";
    typeCall = "post";
    dataParams = {
      "idae_m" : this.id_ae,
      "estadop_m" : this.estado,
      "categoria_m" : this.categoria,
      "url_imagen_m" : this.imagen,
      "data_m" : this.datosAuxiliares,
      "nombretv_m" : this.nombre
    };
    ejecutarAjaxIF(urlComp, typeCall, dataParams, functionResp);
};
