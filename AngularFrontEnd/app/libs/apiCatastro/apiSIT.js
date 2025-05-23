//var urlSIT = "http://serviciosrs.lapaz.bo/wsSIT";

//var urlSIT = "http://localhost:9091/wsSIT";
//var urlSIT = "http://gmlppc06408:9091/wsSIT";

var wsMethodSIT;
var dataResp;
var dataParams;
var typeCall;
var stokensit = "";

if(jsonURLS){
    var urlSIT = jsonURLS.CONEXION_API_PG_IF_OFICIAL +"wsSIT";
}

function ejecutarAjaxSIT(vwsMethodSIT, vTypeCall, vDataCall, vFunctionResp) {
	stokensit = sessionStorage.getItem('TOKEN_API');
    $.ajax({
        type: vTypeCall,
        url: urlSIT + vwsMethodSIT,
        data: vDataCall,
        //dataType: "json",
        async: false,
		headers: {
			'Authorization': 'Bearer ' + stokensit
		},
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

function dataSIT(){
    this.ci

};
// ------------------------
//  DUPLICADO
// ------------------------
dataSIT.prototype.dplBusCodCat = function (vCodCat, vNroDoc, vTipoDoc, functionResp)
{ 
    wsMethodSIT = "/dplBusCert";
    typeCall = "post";
    dataParams = {
        "codigoCatastral":  vCodCat
        ,"nroDocumento":  vNroDoc
        ,"tipoDoc" : vTipoDoc
    };

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

// Busca CC del ciudadano
dataSIT.prototype.dplLstCC = function (vNroDoc, functionResp)
{
    wsMethodSIT = "/dplLstCC";
    typeCall = "post";
    dataParams = {"nroDocumento":  vNroDoc};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

// ------------------------
//  ACTUALIZACIONES
// ------------------------

dataSIT.prototype.actCatastroListaDocumento = function (vIdDocumento, vDescripcion, vCodigoUsuario,vAccion, functionResp)
{
    wsMethodSIT = "/actCatastroListaDocumento";
    typeCall = "post";
    dataParams = {
        "iddocumento":  vIdDocumento
        ,"descripcion":  vDescripcion
        ,"codigousuario":  vCodigoUsuario
        ,"accion" : vAccion
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.actCatastroListaExpedido = function (vIdExpedido, vDescCorta, vDescLarga,vAccion, functionResp)
{
    wsMethodSIT = "/actCatastroListaExpedido";
    typeCall = "post";
    dataParams = {
        "idExpedido":  vIdExpedido
        ,"descCorta":  vDescCorta
        ,"descLarga":  vDescLarga
        ,"accion" : vAccion
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

/*
 dataSIT.prototype.actCatastroListaDocumento = function (vIdDocumento, vDescripcion, vCodigoUsuario,vAccion, functionResp)
 {
 wsMethodSIT = "/actCatastroListaDocumento";
 typeCall = "post";
 dataParams = {
 "iddocumento":  vIdDocumento
 ,"descripcion":  vDescripcion
 ,"codigousuario":  vCodigoUsuario
 ,"accion" : vAccion
 };
 ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
 };*/

dataSIT.prototype.actBuscarCertificado = function (vCodigoCatastral, functionResp)
{
    wsMethodSIT = "/actBuscarCertificado";
    typeCall = "post";
    dataParams = {
        "codigoCatastral":  vCodigoCatastral
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.actCatastroPredVias = function (vIdCodigo,vIdVia,vCodigoCatastral,vViaPrincipal,vCodigoUsuario,vAccion, functionResp)
{

    if(isNaN(vIdCodigo) || vIdCodigo==null){vIdCodigo=0}
    if(isNaN(vIdVia)|| vIdVia==null){vIdVia=0}
    if(isNaN(vCodigoUsuario)|| vCodigoUsuario==null){vCodigoUsuario=0}
    //deben ser datos numericos
    wsMethodSIT = "/actCatastroPredVias";
    typeCall = "post";
    dataParams = {
        "idCodigo":  vIdCodigo
        ,"idVia":  vIdVia
        ,"codigoCatastral":  vCodigoCatastral
        ,"viaPrincipal":  vViaPrincipal
        ,"codigoUsuario":  vCodigoUsuario
        ,"accion":  vAccion
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

// ------------------------
//  PERMISOS DE CONSTRUCCION
// ------------------------
// Obtiene datos del predio
dataSIT.prototype.pcPredio = function (vCC,vAccion, functionResp)
{
    wsMethodSIT = "/pcPredio";
    typeCall = "post";
    dataParams = {"codCat":  vCC, "accion":vAccion};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.pcPredioRiesgo = function (vWKT, functionResp)
{
    wsMethodSIT = "/pcPredioRiesgo";
    typeCall = "post";
    dataParams = {"wkt":  vWKT};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.pcPredioLUSU = function (vWKT, functionResp)
{
    wsMethodSIT = "/pcPredioLUSU";
    typeCall = "post";
    dataParams = {"wkt":  vWKT};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.pcListaArquitecto = function (functionResp)
{
    wsMethodSIT = "/pcListaArquitecto";
    typeCall = "post";
    dataParams = {};
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};


dataSIT.prototype.pcPrediosConsolidado = function (codCat, functionResp)
{
    wsMethodSIT = "/pcPrediosConsolidado";
    typeCall = "post";
    dataParams = {"codCat":  codCat};
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.pcPrediosConsolidadoAct = function (codCat, functionResp)
{
    wsMethodSIT = "/pcPrediosConsolidadoAct";
    typeCall = "post";
    dataParams = {"codCat":  codCat};
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};
// ------------------------
//  AUTORIZACIONES MENORES
// ------------------------
dataSIT.prototype.dplLstCCAM = function (vNroDoc, functionResp)
{
    wsMethodSIT = "/dplLstCCAM";
    typeCall = "post";
    dataParams = {"nroDocumento":  vNroDoc};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};


dataSIT.prototype.amLstRequisitos = function (vRiesgo, vNroPlantas,vCartilla,vImpactoVial,vIdTipoTramite,vIdSubTipoTramite,vApoderado, functionResp)
{
    wsMethodSIT = "/amLstRequisitos";
    typeCall = "post";
    dataParams = {  "riesgo":  vRiesgo,
                    "rroPlantas":vNroPlantas,
                    "cartilla":vCartilla,
                    "impactoVial":vImpactoVial,
                    "idTipoTramite":vIdTipoTramite,
                    "idSubTipoTramite":vIdSubTipoTramite,
                    "apoderado":vApoderado };

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.amLstRequisitos = function (vRiesgo, vNroPlantas,vCartilla,vImpactoVial,vIdTipoTramite,vIdSubTipoTramite,vApoderado, functionResp)
{
    wsMethodSIT = "/amLstRequisitos";
    typeCall = "post";
    dataParams = {"riesgo":  vRiesgo,
        "rroPlantas":vNroPlantas,
        "cartilla":vCartilla,
        "impactoVial":vImpactoVial,
        "idTipoTramite":vIdTipoTramite,
        "idSubTipoTramite":vIdSubTipoTramite,
        "apoderado":vApoderado};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.amTasaValor = function (vidsubtipoTramite, vidPCCartilla,vtipoVia,vCountVariables,vaccion,functionResp)
{
    wsMethodSIT = "/amTasaValor";
    typeCall = "post";
    dataParams = {  "idsubtipoTramite":vidsubtipoTramite,
        "idPCCartilla":vidPCCartilla,
        "tipoVia":vtipoVia,
        "countVariables":vCountVariables,
        "accion":vaccion};
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.tramitesEnCurso = function (codigoCatastral,functionResp)
{
    wsMethodSIT = "/tramitesEnCurso";
    typeCall = "post";
    dataParams = {
        "codigoCatastral":  codigoCatastral,
        "accion": "C2"
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

dataSIT.prototype.prediosRestringidos = function (codigoCatastral,functionResp)
{
    wsMethodSIT = "/prediosRestringidos";
    typeCall = "post";
    dataParams = {
        "codigoCatastral": codigoCatastral,
        "accion": "C1"
    };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};


dataSIT.prototype.tipoVia = function (vcodigoCatastral,functionResp)
{
    wsMethodSIT = "/tipoVia";
    typeCall = "post";
    dataParams = {  
        "codigoCatastral":vcodigoCatastral
        };
    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};



// ------------------------
//  REGISTRO CATASTRAL
// ------------------------
// Obtiene datos del predio x codigo catastral
dataSIT.prototype.catObtenerPredioxCodcat = function (vCC,vAccion, functionResp)
{
    wsMethodSIT = "/catObtenerPredioxCodcat";
    typeCall = "post";
    dataParams = {"codCat":  vCC, "accion":vAccion};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};
// Obtiene datos del predio x wkt
dataSIT.prototype.catObtenetPredioxWkt = function (vwkt,vAccion, functionResp)
{
    wsMethodSIT = "/catObtenetPredioxWkt";
    typeCall = "post";
    dataParams = {"wkt":  vwkt, "accion":vAccion};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};
// Verifica si el predio tiene certificacion
dataSIT.prototype.catPredioConCertificacion = function (vCC, functionResp)
{
    wsMethodSIT = "/catPredioConCertificacion";
    typeCall = "post";
    dataParams = {"codCat":  vCC};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};

// Verifica reingreso
dataSIT.prototype.catPredioReingreso = function (vCC,idTipoRegimen, functionResp)
{
    wsMethodSIT = "/catPredioReingreso";
    typeCall = "post";
    dataParams = {"codCat":  vCC, "idTipoRegimen":idTipoRegimen};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};
// Verifica tramite en proceso
dataSIT.prototype.catPredioTramiteEnProceso = function (vCC, functionResp)
{
    wsMethodSIT = "/catPredioTramiteEnproceso";
    typeCall = "post";
    dataParams = {"codCat":  vCC};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};
// Obtiene tasas de catastro
dataSIT.prototype.catTasasCatastro = function ( functionResp)
{
    wsMethodSIT = "/catTasasCatastro";
    typeCall = "post";
    dataParams = {};

    ejecutarAjaxSIT(wsMethodSIT, typeCall, dataParams, functionResp);
};


