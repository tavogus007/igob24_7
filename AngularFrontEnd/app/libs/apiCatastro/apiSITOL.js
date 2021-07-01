//var urlSITOL = "http://serviciosrs.lapaz.bo/wsSITOL";
//var urlSITOL = "http://192.168.5.141:9098/wsSITOL";
//var urlSITOL = "http://localhost:9091/wsSITOL";
//var urlSITOL = "http://gmlppc06408:9091/wsSITOL";

var wsMethodSITOL;
var dataResp;
var dataParams;
var typeCall;

if(jsonURLS){
    var urlSITOL = jsonURLS.CONEXION_API_PG_IF_OFICIAL +"wsSITOL";
}

function ejecutarAjaxSITOL(vwsMethodSITOL, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
        type: vTypeCall,
        url: urlSITOL + vwsMethodSITOL,
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

function dataSITOL(){
    this.ci

};

// ------------------------
//  DUPLICADO
// ------------------------

dataSITOL.prototype.dplLstSol = function (vNroDoc, vTipoDoc, functionResp)
{
    wsMethodSITOL = "/dplLstSol";
    typeCall = "post";
    dataParams = {
        "nroDocumento":  vNroDoc
        ,"tipoDoc" : vTipoDoc
    };

    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.dplLstMotivos = function (functionResp)
{
    wsMethodSITOL = "/dplLstMotivos";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.dplLstMotivosDet = function (vidMotivo, functionResp)
{
    wsMethodSITOL = "/dplLstMotivosDet";
    typeCall = "post";
    dataParams = {
        "IdMotivo":  vidMotivo
    };

    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


dataSITOL.prototype.dplRegFum = function (vTipoTra,vIdCiudadano,vOIDCiudadano,vApellidos,vNombres,vNumeroDocumento,vExpedido,vTipoDocumento,vFUM,vIdMotivo,vIdMotivoDetalle,vCodigoCatastral,vNumInmueble,vNumCertificado,vfumEnc,vidTipoPago,vcodPago,vaccion, functionResp) //vtipoPago,vcodPago,
{
    wsMethodSITOL = "/dplRegFum";
    typeCall = "post";
    dataParams = {
        "TipoTra":vTipoTra
        ,"IdCiudadano":vIdCiudadano
        ,"OIDCiudadano":vOIDCiudadano
        ,"Apellidos":vApellidos
        ,"Nombres":vNombres
        ,"NumeroDocumento":vNumeroDocumento
        ,"Expedido":vExpedido
        ,"TipoDocumento":vTipoDocumento
        ,"FUM":vFUM
        ,"IdMotivo":vIdMotivo
        ,"IdMotivoDetalle":vIdMotivoDetalle
        ,"CodigoCatastral":vCodigoCatastral
        ,"NumInmueble":vNumInmueble
        ,"NumCertificado":vNumCertificado
        ,"fumEnc":vfumEnc
        ,"idTipoPago":vidTipoPago
        ,"codPago":vcodPago
        ,"accion":vaccion
    };

    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

// ------------------------
//  ACTUALIZACIONES
// ------------------------
dataSITOL.prototype.actTramiteLineaActualizaEstado = function (vIdActualiza, vIdEstadoActOnline, vAccion, functionResp)
{
    wsMethodSITOL = "/actTramiteLineaActualizaEstado";
    typeCall = "post";
    dataParams = {
        "IdActualiza":  vIdActualiza
        ,"idEstadoActOnline":  vIdEstadoActOnline
        ,"accion" : vAccion
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.actTramiteLineaActualizaLista = function (vIdObs, vDescripcion, vAccion, functionResp)
{
    wsMethodSITOL = "/actTramiteLineaActualizaLista";
    typeCall = "post";
    dataParams = {
        "idObs":  vIdObs
        ,"descripcion":  vDescripcion
        ,"accion" : vAccion
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.actTramiteLineaActualiza = function (vIdEstado, vNumeroSolicitud, vGestion,vIdActualiza, vIdLineaPropietario, vNumeroPuerta,vSuperficieLegal, vObservacionCertificado, vFolioReal,vNumTestimonio, vValoracion, vActVarios,vEstadoRegistro, vCodigocatastral, vNumInmueble,vViaPrincipal, vOIDCiudadano, vObsVarios,vIdEstadoActOnline, vAccion, functionResp)
{
    wsMethodSITOL = "/actTramiteLineaActualiza";
    typeCall = "post";
    dataParams = {
        "idEstado":  vIdEstado
        ,"numeroSolicitud":  vNumeroSolicitud
        ,"gestion" : vGestion
        ,"idActualiza":  vIdActualiza
        ,"idLineaPropietario" : vIdLineaPropietario
        ,"numeroPuerta":  vNumeroPuerta
        ,"superficieLegal" : vSuperficieLegal
        ,"observacionCertificado":  vObservacionCertificado
        ,"folioReal" : vFolioReal
        ,"numTestimonio":  vNumTestimonio
        ,"valoracion" : vValoracion
        ,"actVarios":  vActVarios
        ,"estadoRegistro" : vEstadoRegistro
        ,"codigocatastral":  vCodigocatastral
        ,"numInmueble" : vNumInmueble
        ,"viaPrincipal":  vViaPrincipal
        ,"oidCiudadano" : vOIDCiudadano
        ,"obsVarios":  vObsVarios
        ,"idEstadoActOnline" : vIdEstadoActOnline
        ,"accion":  vAccion
    };
    //.log("superficie",vSuperficieLegal);
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.actTramiteLineaPropietario = function (vIdActualiza, vIdLineaPropietario, vNombre,vApPaterno, vApMaterno, vNumeroDocumento,vTipoDocumento, vExpedido, vFechaNacimiento,vNumeroPMC, vEmail, vTelefono,vTipoPropietario, vDireccion,vPorcentaje, vAccion, functionResp)

{
    if(vAccion == 'A' || vAccion == 'C'){
        //console.log("fnac1",vFechaNacimiento);
        var cadFecha=vFechaNacimiento.split("/");
        //cadFecha=cadFecha.split("-");
        //console.log("fnac",cadFecha);
        vFechaNacimiento=cadFecha[2]+'-'+cadFecha[1]+'-'+cadFecha[0];
    }
    else{
        vFechaNacimiento=null;
    }

    //console.log("fnac2",vFechaNacimiento);
    wsMethodSITOL = "/actTramiteLineaPropietario";
    typeCall = "post";
    dataParams = {
        "idActualiza":  vIdActualiza
        ,"idLineaPropietario":  vIdLineaPropietario
        ,"nombreProp" : vNombre
        ,"apPaterno":  vApPaterno
        ,"apMaterno" : vApMaterno
        ,"numeroDocumento":  vNumeroDocumento
        ,"tipoDocumento" : vTipoDocumento
        ,"docExpedido":  vExpedido
        ,"fechaNacimiento" : vFechaNacimiento
        ,"numeroPMC":  vNumeroPMC
        ,"emailProp" : vEmail
        ,"telefonoProp":  vTelefono
        ,"tipoPropietario" : vTipoPropietario
        ,"direccionProp":  vDireccion
        ,"porcentaje":  vPorcentaje
        ,"accion":  vAccion
    };
    //console.log("param prop",vIdLineaPropietario,vAccion,vFechaNacimiento);
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.actTramiteLineaTramiteLineaPredVias = function (vIdActualiza, vIdVia, vIdMatCalle,vViaPrincipal, vNombreVia,vAccion,functionResp)
{
    vViaPrincipal=vViaPrincipal?1:0;
    //console.log("viaPrincipal",vViaPrincipal);
    if(vIdActualiza==null){vIdActualiza=0}
    if(vIdVia==null){vIdVia=0}
    if(vIdMatCalle==null){vIdMatCalle=0}

    wsMethodSITOL = "/actTramiteLineaTramiteLineaPredVias";
    typeCall = "post";
    dataParams = {
        "idActualiza":  vIdActualiza
        ,"idVia":  vIdVia
        ,"idMatCalle" : vIdMatCalle
        ,"viaPrincipal":  vViaPrincipal
        ,"nombreVia" : vNombreVia
        ,"accion" : vAccion
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


// ------------------------
//  PERMISOS DE CONSTRUCCION
// ------------------------

dataSITOL.prototype.pcSolicitudReg = function (idTipoTramite,
                                               macrodistrito,
                                               distritoMunicipal,
                                               lusu,
                                               superficieReal,
                                               codigoCatastral,
                                               nombreSolicitante,
                                               paternoSolicitante,
                                               maternoSolicitante,
                                               numeroDocumentoSol,
                                               tipoDocumento,
                                               expedido,
                                               telefonoSolicitante,
                                               emailSolicitante,
                                               arquitectoNombre,
                                               arquitectoRegistroNacionalCAB,
                                               arquitectoEmail,
                                               arquitectoTelefono,
                                               autorizacionEntregaDocumentos,
                                               autorizacionSeguimientoTramite,
                                               riesgoConstruccionLocalizacionCategoria,
                                               idPendTerreno,
                                               anchoVia,
                                               idEstado,
                                               idPCCartilla,
                                               zona,
                                               direccion,
                                               nroInmueble,
                                               pendienteVia,
                                               functionResp)
{
    wsMethodSITOL = "/pcSolicitudReg";
    typeCall = "post";
    dataParams = {
        "idTipoTramite":idTipoTramite,
        "macrodistrito":macrodistrito,
        "distritoMunicipal":distritoMunicipal,
        "lusu":lusu,
        "superficieReal":superficieReal,
        "codigoCatastral":codigoCatastral,
        "nombreSolicitante":nombreSolicitante,
        "paternoSolicitante":paternoSolicitante,
        "maternoSolicitante":maternoSolicitante,
        "numeroDocumentoSol":numeroDocumentoSol,
        "tipoDocumento":tipoDocumento,
        "expedido":expedido,
        "telefonoSolicitante":telefonoSolicitante,
        "emailSolicitante":emailSolicitante,
        "arquitectoNombre":arquitectoNombre,
        "arquitectoRegistroNacionalCAB":arquitectoRegistroNacionalCAB,
        "arquitectoEmail":arquitectoEmail,
        "arquitectoTelefono":arquitectoTelefono,
        "autorizacionEntregaDocumentos": (autorizacionEntregaDocumentos != null?autorizacionEntregaDocumentos:false),
        "autorizacionSeguimientoTramite":(autorizacionSeguimientoTramite != null?autorizacionSeguimientoTramite : false),
        "riesgoConstruccionLocalizacionCategoria":riesgoConstruccionLocalizacionCategoria,
        "idPendTerreno":idPendTerreno,
        "anchoVia":anchoVia,
        "idEstado":idEstado,
        "idPCCartilla":idPCCartilla,
        "zona":zona,
        "direccion":direccion,
        "nroInmueble":nroInmueble,
        "pendienteVia":pendienteVia
    };
    //.log("superficie",vSuperficieLegal);
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


dataSITOL.prototype.pcSolicitudAct = function (idFichaTecnica,
                                               idTipoTramite,
                                               macrodistrito,
                                               distritoMunicipal,
                                               lusu,
                                               superficieReal,
                                               codigoCatastral,
                                               nombreSolicitante,
                                               paternoSolicitante,
                                               maternoSolicitante,
                                               numeroDocumentoSol,
                                               tipoDocumento,
                                               expedido,
                                               telefonoSolicitante,
                                               emailSolicitante,
                                               arquitectoNombre,
                                               arquitectoRegistroNacionalCAB,
                                               arquitectoEmail,
                                               arquitectoTelefono,
                                               autorizacionEntregaDocumentos,
                                               autorizacionSeguimientoTramite,
                                               riesgoConstruccionLocalizacionCategoria,
                                               idPendTerreno,
                                               anchoVia,
                                               idEstado,
                                               idPCCartilla,
                                               pendienteVia, functionResp)
{
    wsMethodSITOL = "/pcSolicitudAct";
    typeCall = "post";
    dataParams = {
        "idFichaTecnica":idFichaTecnica,
        "idTipoTramite":idTipoTramite,
        "macrodistrito":macrodistrito,
        "distritoMunicipal":distritoMunicipal,
        "lusu":lusu,
        "superficieReal":superficieReal,
        "codigoCatastral":codigoCatastral,
        "nombreSolicitante":nombreSolicitante,
        "paternoSolicitante":paternoSolicitante,
        "maternoSolicitante":maternoSolicitante,
        "numeroDocumentoSol":numeroDocumentoSol,
        "tipoDocumento":tipoDocumento,
        "expedido":expedido,
        "telefonoSolicitante":telefonoSolicitante,
        "emailSolicitante":emailSolicitante,
        "arquitectoNombre":arquitectoNombre,
        "arquitectoRegistroNacionalCAB":arquitectoRegistroNacionalCAB,
        "arquitectoEmail":arquitectoEmail,
        "arquitectoTelefono":arquitectoTelefono,
        "autorizacionEntregaDocumentos": (autorizacionEntregaDocumentos != null?autorizacionEntregaDocumentos:false),
        "autorizacionSeguimientoTramite":(autorizacionSeguimientoTramite != null?autorizacionSeguimientoTramite : false),
        "riesgoConstruccionLocalizacionCategoria":riesgoConstruccionLocalizacionCategoria,
        "idPendTerreno":idPendTerreno,
        "anchoVia":anchoVia,
        "idEstado":idEstado,
        "idPCCartilla":idPCCartilla,
        "pendienteVia":pendienteVia
    };
    //.log("superficie",vSuperficieLegal);
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


dataSITOL.prototype.pcSolicitudActFumPagado = function (idFichaTecnica, functionResp)
{
    wsMethodSITOL = "/pcSolicitudActFumPagado";
    typeCall = "post";
    dataParams = {
        "idFichaTecnica":idFichaTecnica
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


dataSITOL.prototype.pcSolicitudLst = function (solicitanteNroDoc, functionResp)
{
    wsMethodSITOL = "/pcSolicitudLst";
    typeCall = "post";
    dataParams = {
        "solicitanteNroDoc":  solicitanteNroDoc
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcSolicitudGet = function (idFichaTecnica, functionResp)
{
    wsMethodSITOL = "/pcSolicitudGet";
    typeCall = "post";
    dataParams = {
        "idFichaTecnica":  idFichaTecnica
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcTipoTramiteLst = function (functionResp)
{
    wsMethodSITOL = "/pcTipoTramiteLst";
    typeCall = "post";
    dataParams = {
        
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcLusuParametrosAlturaMaxima = function (idPCCartilla,anchoVia,functionResp)
{
    wsMethodSITOL = "/pcLusuParametrosAlturaMaxima";
    typeCall = "post";
    dataParams = {
        "idPCCartilla":idPCCartilla,
        "anchoVia":anchoVia
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcLusuParametrosCompleto = function (idPCCartilla,anchoVia,functionResp)
{
    wsMethodSITOL = "/pcLusuParametrosCompleto";
    typeCall = "post";
    dataParams = {
        "idPCCartilla":idPCCartilla,
        "anchoVia":anchoVia
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

// ------------------------
//  FRACCIONAMIENTO AS BUILT
// ------------------------


dataSITOL.prototype.solicitudLstxTipo = function (solicitanteNroDoc, idTipoTramite, functionResp)
{
    wsMethodSITOL = "/solicitudLstxTipo";
    typeCall = "post";
    dataParams = {
        "solicitanteNroDoc":  solicitanteNroDoc,
        "idTipoTramite":  idTipoTramite
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.solicitudLstPagos = function (idTramite, functionResp)
{
    wsMethodSITOL = "/solicitudLstPagos";
    typeCall = "post";
    dataParams = {
        "idTramite":  idTramite
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcSolicitudFumPagado = function (idTramite, idSolicitudPago, functionResp)
{
    wsMethodSITOL = "/pcSolicitudFumPagado";
    typeCall = "post";
    dataParams = {
        "idTramite":idTramite,
        "idSolicitudPago":idSolicitudPago
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};
/*
dataSITOL.prototype.pcLusuParametros = function (patron,functionResp)
{
    wsMethodSITOL = "/pcLusuParametros";
    typeCall = "post";
    dataParams = {
        "patron":patron
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcLusuParametrosAnchoVia = function (idFormularioCartilla,functionResp)
{
    wsMethodSITOL = "/pcLusuParametrosAnchoVia";
    typeCall = "post";
    dataParams = {
        "idFormularioCartilla":idFormularioCartilla
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcLusuParametrosVoladizo = function (idFormularioCartilla,functionResp)
{
    wsMethodSITOL = "/pcLusuParametrosVoladizo";
    typeCall = "post";
    dataParams = {
        "idFormularioCartilla":idFormularioCartilla
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.pcLusuParametrosRetiros = function (idFormularioCartilla,functionResp)
{
    wsMethodSITOL = "/pcLusuParametrosRetiros";
    typeCall = "post";
    dataParams = {
        "idFormularioCartilla":idFormularioCartilla
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};
*/






//------------------------------------
//  autorizaciones menores

dataSITOL.prototype.amSolicitudLstPorTipo = function (solicitanteNroDoc,idTipoTramite, functionResp)
{
    wsMethodSITOL = "/amSolicitudLstPorTipo";
    typeCall = "post";
    dataParams = {
        "solicitanteNroDoc":  solicitanteNroDoc
        ,"idTipoTramite": idTipoTramite
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.amSolicitudReg = function (idTipoTramite,
                                               idSubTipoTramite,
                                               macrodistrito,
                                               distritoMunicipal,
                                               lusu,
                                               patronLusu,
                                               superficieReal,
                                               codigoCatastral,
                                               nombreSolicitante,
                                               paternoSolicitante,
                                               maternoSolicitante,
                                               numeroDocumentoSol,
                                               tipoDocumento,
                                               expedido,
                                               telefonoSolicitante,
                                               emailSolicitante,
                                               anchoVia,
                                               riesgoConstruccionLocalizacionCategoria,
                                               idEstado,
                                               idPCCartilla,
                                               zona,
                                               direccion,
                                               nroInmueble,
                                               pendienteVia,
                                               requisitos,
                                               fum,
                                               monto,
                                               DiasExpiracionAM,
                                               functionResp
                                               )
{
    wsMethodSITOL = "/amSolicitudReg";
    typeCall = "post";
    dataParams = {
        "idTipoTramite":idTipoTramite,
        "idSubTipoTramite":idSubTipoTramite,
        "macrodistrito":macrodistrito,
        "distritoMunicipal":distritoMunicipal,
        "lusu":lusu,
        "patronLusu":patronLusu,
        "superficieReal":superficieReal,
        "codigoCatastral":codigoCatastral,
        "nombreSolicitante":nombreSolicitante,
        "paternoSolicitante":paternoSolicitante,
        "maternoSolicitante":maternoSolicitante,
        "numeroDocumentoSol":numeroDocumentoSol,
        "tipoDocumento":tipoDocumento,
        "expedido":expedido,
        "telefonoSolicitante":telefonoSolicitante,
        "emailSolicitante":emailSolicitante,
        "anchoVia":anchoVia,
        "riesgoConstruccionLocalizacionCategoria":riesgoConstruccionLocalizacionCategoria,
        "idEstado":idEstado,
        "idPCCartilla":idPCCartilla,
        "zona":zona,
        "direccion":direccion,
        "nroInmueble":nroInmueble,
        "pendienteVia":pendienteVia,
        "requisitos":requisitos,
        "fum":fum,
        "monto":monto,
        "DiasExpiracionAM":DiasExpiracionAM
    };
    //.log("superficie",vSuperficieLegal);
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.amSolicitud = function (vidFichaTecnica,vaccion,functionResp)
{
    //se envia el idPcFichaTecnica encriptado
    wsMethodSITOL = "/amSolicitud";
    typeCall = "post";
    dataParams = {"idFichaTecnica":vidFichaTecnica,
        "accion":vaccion};
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);

};

dataSITOL.prototype.amLstTipoTramite = function (vidTipoTramite, vAccion, functionResp)
{
    wsMethodSITOL = "/amLstTipoTramite";
    typeCall = "post";
    dataParams = {"idTipoTramite":  vidTipoTramite, "accion":vAccion};

    ejecutarAjaxSIT(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.getVariables = function (vidsubtipoTramite,vidPcFichaTecnica,vaccion,functionResp)
{
    wsMethodSITOL = "/getVariables";
    typeCall = "post";
    dataParams = {"idsubtipoTramite":vidsubtipoTramite,
        "idPcFichaTecnica":vidPcFichaTecnica,
        "accion":vaccion};
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.guardarDatosVariable = function (vdato,vidPcFichaTecnica,vidVariable,vdatoJson,vaccion,functionResp)
{
    wsMethodSITOL = "/guardarDatosVariable";
    typeCall = "post";
    dataParams = {"dato":vdato,
        "idPcFichaTecnica":vidPcFichaTecnica,
        "idVariable":vidVariable,
	"datoJson":vdatoJson,
        "accion":vaccion};

    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.actualizarIdFichaAnterior = function (vidPcFichaTecnica,vidFichaTecnicaAnterior,functionResp)
{
    wsMethodSITOL = "/actualizarIdFichaAnterior";
    typeCall = "post";
     dataParams = {
         "idFichaTecnica":vidPcFichaTecnica,
         "idFichaTecnicaAnterior":vidFichaTecnicaAnterior
     };

    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

dataSITOL.prototype.solicitudPago = function (vidSolicitudPago,vidTramite,vfum,vdescripcion,vpagado,vidEstado,vidDocumento,vaccion,functionResp)
{
    wsMethodSITOL = "/solicitudPago";
    typeCall = "post";
    dataParams = {
        "idSolicitudPago":vidSolicitudPago,
        "idTramite":vidTramite,
        "fum":vfum,
        "descripcion":vdescripcion,
        "pagado":vpagado,
        "idEstado":vidEstado,
        "idDocumento":vidDocumento,
        "accion":vaccion
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};

//------------------------------------


// ------------------------
//  REGISTRO CATASTRAL
// ------------------------

dataSITOL.prototype.catListaSolicitudes = function (numDocumento,functionResp)
{
    wsMethodSITOL = "/catListaSolicitudes";
    typeCall = "post";
    dataParams = {
        "numDocumento" : numDocumento
    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};


dataSITOL.prototype.catSolicitudReg = function (idCatastroTramiteOL,wkt,idTipoRegimen, idCatastroTipoTramite, solicitante, idTipoDocumento, numDocumento, idExpedido, telefonoSolicitante, emailSolicitante, tipoPersona, profesionalNombre, profesionalEmail, profesionalTelefono, profesionalCab,idmacroDistrito,iddistritoMunicipal,codigoCatastral,direccion,zona,nroPuerta,edificio,idCodPlanimetria,descPlanimetria,idTipoLote, conCertificado,carTerrPendiente,serBasAlcantarillado,serBasEnergiaElectrica,serBasTelefono,serBasAguaPotable,serBasAlumbradoPublico,serBasGasDomiciliario,tieneMensura,idInsFlujoAnterior,
                                                functionResp)
{
    wsMethodSITOL = "/catSolicitudReg";
    typeCall = "post";
    dataParams = {

        "idCatastroTramiteOL" : idCatastroTramiteOL,
        //"idInsFlujo" : idInsFlujo,
        "wkt" : wkt,
        "idTipoRegimen" : idTipoRegimen,
        "idCatastroTipoTramite" : idCatastroTipoTramite,
        "solicitante" : solicitante,
        "idTipoDocumento" : idTipoDocumento,
        "numDocumento" : numDocumento,
        "idExpedido" : idExpedido,
        "telefonoSolicitante" : telefonoSolicitante,
        "emailSolicitante" : emailSolicitante,
        "tipoPersona" : tipoPersona,
        "profesionalNombre" : profesionalNombre,
        "profesionalEmail" : profesionalEmail,
        "profesionalTelefono" : profesionalTelefono,
        "profesionalCab" : profesionalCab,
        "idmacroDistrito" : idmacroDistrito,
        "iddistritoMunicipal" : iddistritoMunicipal,
        "codigoCatastral" : codigoCatastral,
        "direccion" : direccion,
        "zona" : zona,
        "nroPuerta" : nroPuerta,
        //"sector" : sector,
        "edificio" : edificio,
        //"bloque" : bloque,
        //"riesgo" : riesgo,
        "idCodPlanimetria" : idCodPlanimetria,
        "descPlanimetria" : descPlanimetria,
        "idTipoLote" : idTipoLote,
        //"superficie" : superficie,
        //"numeroPisos" : numeroPisos,
        //"numeroBloques" : numeroBloques,
        //"tieneSotano" : tieneSotano,
        //"numeroInmueble" : numeroInmueble,
        //"pmc" : pmc,
        //"observaciones" : observaciones,
        //"idRequisitos" : idRequisitos,
        "conCertificado" : conCertificado,
        "tieneMensura":tieneMensura,
        "idInsFlujoAnterior":idInsFlujoAnterior,
        //"FUMCertificado" : FUMCertificado,
        //"pagadoCertificado" : pagadoCertificado,
        //"fechaRegistro" : fechaRegistro,
        //"idEstado" : idEstado,
        //"idResultado" : idResultado,
        //"archivo1" : archivo1,
        //"archivo2" : archivo2,
        //"fechaEnvio" : fechaEnvio,
        //"archivo3" : archivo3,
        //"carTerrUbicacion" : carTerrUbicacion,
        "carTerrPendiente" : carTerrPendiente,
        //"carTerrNivel" : carTerrNivel,
        //"carTerrForma" : carTerrForma,
        //"carTerrAcera" : carTerrAcera,
        //"carTerrFrente" : carTerrFrente,
        //"carTerrFondo" : carTerrFondo,
        "serBasAlcantarillado" : serBasAlcantarillado,
        "serBasEnergiaElectrica" : serBasEnergiaElectrica,
        "serBasTelefono" : serBasTelefono,
        "serBasAguaPotable" : serBasAguaPotable,
        "serBasAlumbradoPublico" : serBasAlumbradoPublico,
        "serBasGasDomiciliario" : serBasGasDomiciliario
        //"supTotalConstruida" : supTotalConstruida,
        //"supSegunLevantamiento" : supSegunLevantamiento,
        //"supSegunTestimonio" : supSegunTestimonio,
        //"correosProcesamiento" : correosProcesamiento,
        //"idTipoAcceso" : idTipoAcceso,
        //"archivo4" : archivo4,
        //"telefonoSolicitanteProp" : telefonoSolicitanteProp,
        //"emailSolicitanteProp" : emailSolicitanteProp,
        //"carViaPendiente" : carViaPendiente,

    };
    ejecutarAjaxSITOL(wsMethodSITOL, typeCall, dataParams, functionResp);
};
