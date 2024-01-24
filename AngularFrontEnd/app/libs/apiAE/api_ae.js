
var urlCompAe;
var dataRespAe;
var dataParamsAe;
var typeCallAe;
var urlCopiarArch = "";

//CONEXION GENESIS

var urlComp;
var dataResp;
var dataParams;
var typeCall;

var stokenae = "";

if(jsonURLS){
  var urlGENESIS = jsonURLS.CONEXION_API_PG_IF+"wsGENESIS";
  var urlIf2 = jsonURLS.CONEXION_API_PG_IF+"wsIf"; 
  //var urlCopiarArch = jsonURLS.CONEXION_COPIA_ARCHIVOS;
  var urlCopiarArch = jsonURLS.CONEXION_COPIA_DOCUMENTOS;
}

function ejecutarAjaxArchivo(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlCopiarArch + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
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

/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxIF2(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
	stokenae = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlIf2 + vUrlComp,
      data: vDataCall,
      async: false,
		headers: {
			'Authorization': 'Bearer ' + token
		},		  
      success: function(response) {
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataResp);
      }
    });
    return dataResp;
};
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxAE(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
	stokenae = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlGENESIS + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
		headers: {
			'Authorization': 'Bearer ' + token
		},	  
      success: function(response) {
        //console.log(response);
        dataRespAe = JSON.stringify(response);
        vFunctionResp(dataRespAe);
      },
      error: function (response, status, error) {
        //dataRespAe = response.responseText; 
        dataRespAe = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataRespAe);
      }
    });
    return dataRespAe;
};
/*///////////////spsp_categoria_agrupada_licencia//////////////////////*/


/*///////////////spCActividadEconomicaContribuyenteSimgep//////////////////////*/
function gLstActividadEconomica() {
    this.idContribuyente;
    this.tipo;
};

gLstActividadEconomica.prototype.lstActividadEconomica = function (functionResp) {
    urlCompAe = "/lstActividaEconomica";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "tipo":this.tipo
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

/*/////////////////////////////////////////////////GENESIS DATOS/////////////////////////////////*/
function gLstDatos() {
    this.idContribuyente;
    this.clase;
    this.padron;
    this.identificacion;
    this.primerNombre;      
    this.primerApellido;
    this.segundoApellido;
    this.nit;
    this.empresa;
    this.p_accion;
};
gLstDatos.prototype.lstDatosContribuyente = function (functionResp) {
    urlCompAe = "/lstDatosGenesis";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "clase":this.clase,
        "padron":this.padron,
        "identificacion":this.identificacion,
        "primerNombre":this.primerNombre,
        "primerApellido":this.primerApellido,
        "segundoApellido":this.segundoApellido,
        "nit":this.nit,
        "empresa":this.empresa,
        "p_accion":this.p_accion
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};
/*///////////////DATOS GENERALES//////////////////////*/
function gDatosGenerales() {
    this.idActividadEconomica;
    this.tipo;
};

//idActividadEconomica +"\', @tipo
gDatosGenerales.prototype.lstDatosGenerales = function (functionResp) {
    urlCompAe = "/lstDatosGeneralesAE";
    typeCallAe = "post";
    dataParamsAe = {
        "idActividadEconomica":this.idActividadEconomica,
        "tipo":this.tipo
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

function datosRepresentanteLgEmpresa(){
    this.idEmpresa;
};
datosRepresentanteLgEmpresa.prototype.datos_RepresentanteLgEmpresa = function (functionResp) {
    urlCompAe = "/datosRepresentanteLgEmpresa";
    typeCallAe = "post";
    dataParamsAe = {
      "idEmpresa" : this.idEmpresa
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);
};
/*///////////////DATOS GENERALES//////////////////////*/



/*///////////////DATOS GENERALES CON VIAE//////////////////////*/
function getDatosAEViae() {
    this.idActividadEconomica;
};

//idActividadEconomica +"\', @tipo
getDatosAEViae.prototype.getDatosAE_Viae = function (functionResp) {
    urlCompAe = "/getDatosAE_viae_contribuyente";
    typeCallAe = "post";
    dataParamsAe = {
        "idActividadEconomica":this.idActividadEconomica
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

gLstDatos.prototype.lstDatosContribuyenteLey272 = function (functionResp) {
    urlCompAe = "/lstDatosGenesisLey272";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "clase":this.clase,
        "padron":this.padron,
        "identificacion":this.identificacion,
        "primerNombre":this.primerNombre,
        "primerApellido":this.primerApellido,
        "segundoApellido":this.segundoApellido,
        "nit":this.nit,
        "empresa":this.empresa,
        "p_accion":this.p_accion
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

gLstActividadEconomica.prototype.lstActividadEconomicaLey272 = function (functionResp) {
    urlCompAe = "/lstActividaEconomicaLey272";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "tipo":this.tipo
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

//////LEY 343
function getDatosActividadDesarrollada343(){
};
getDatosActividadDesarrollada343.prototype.getDatos_ActividadDesarrollada343 = function (functionResp) {
    urlCompAe = "/listarActDesarrollada";
    typeCallAe = "post";
    dataParamsAe = {
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);
};

function getDatosLicencia() {
    this.idActividadDesarrollada;
    this.superficie;
};

//idActividadEconomica +"\', @tipo
getDatosLicencia.prototype.getDatos_Licencia = function (functionResp) {
    urlCompAe = "/cargarTipoLicencia";
    typeCallAe = "post";
    dataParamsAe = {
        "idActividadDesarrollada":this.idActividadDesarrollada,
        "superficie":this.superficie
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

function getHomologacion() {
    this.idActividadDesarrollada;
};

getHomologacion.prototype.get_Homologacion = function (functionResp) {
    urlCompAe = "/obtenerHomologacion";
    typeCallAe = "post";
    dataParamsAe = {
        "idActividadDesarrollada":this.idActividadDesarrollada
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

/*Servicio para el ssitema de Ventas*/

function lstActividadEconomicaVentas() {
    this.idContribuyente;
    this.tipo;
};

lstActividadEconomicaVentas.prototype.lstActividadEconomicaVentas = function (functionResp) {
    urlCompAe = "/lstActividadEconomicaVentas";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "tipo":this.tipo
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

function primerEmprendimiento() {
    this.idActividadDesarrollada;
    this.clase;
    this.identificacion;
};

primerEmprendimiento.prototype.consultaEmprendimiento = function (functionResp) {
    urlCompAe = "/consultaEmprendimiento";
    typeCallAe = "post";
    dataParamsAe = {
        "idActividadDesarrollada": this.idActividadDesarrollada,
        "clase":this.clase,
        "identificacion":this.identificacion
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

///////////////////////////////////VALIDAR MULTISERVICIO//////////////////////////////////
function validarMultiservicio() {
    this.cadena;
};

validarMultiservicio.prototype.validacionActividadDesarrollada = function (functionResp) {
    urlCompAe = "/validacionActividadDesarrollada";
    typeCallAe = "post";
    dataParamsAe = {
        "cadena": this.cadena
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

/******************************LISTAR PUBLICIDADES**************************/
function listarPublicidad() {
    this.identificacion;
    this.clase;
    this.tipoPublicidad;
};

listarPublicidad.prototype.buscarPublicidades = function (functionResp) {
    urlComp = "/buscarPublicidades";
    typeCall = "post";
    dataParams = {
      "identificacion" : this.identificacion,
      "clase" : this.clase,
      "tipoPublicidad" : this.tipoPublicidad
    };
    ejecutarAjaxAE(urlComp, typeCall, dataParams, functionResp);
};

//////////////COPIA LEGALIZADA//////////////////////////
gLstActividadEconomica.prototype.lstActividadEconomicaLegalizacion = function (functionResp) {
    urlCompAe = "/lstActividaEconomicaLegalizacion";
    typeCallAe = "post";
    dataParamsAe = {
        "idContribuyente":this.idContribuyente,
        "tipo":this.tipo
    };
    ejecutarAjaxAE(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};

//COPIAR ARCHIVO
function gCopiarArchivo() {
    this.nombre_archivo;
};
gCopiarArchivo.prototype.copiarArchivoLinea = function (functionResp) {
    urlComp = "copiaArchivopdf.php";
    typeCall = "post";
    dataParams = {
      "nombre_licencia" : this.nombre_archivo
    };
    ejecutarAjaxArchivo(urlComp, typeCall, dataParams, functionResp);    
};
