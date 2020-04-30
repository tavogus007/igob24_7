
var urlCompAe;
var dataRespAe;
var dataParamsAe;
var typeCallAe;

//CONEXION GENESIS

var urlComp;
var dataResp;
var dataParams;
var typeCall;

if(jsonURLS){
  var urlGENESIS = jsonURLS.CONEXION_API_PG_GENESIS+"wsGENESIS";
  var urlIf2 = jsonURLS.CONEXION_API_PG_IF+"wsIf"; 
}

/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxIF2(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlIf2 + vUrlComp,
      data: vDataCall,
      async: false,
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
    $.ajax({
      type: vTypeCall,
      url: urlGENESIS + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
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