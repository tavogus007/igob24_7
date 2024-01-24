var urlCompPago;
var dataRespPago;
var dataParamsPago;
var typeCallPago;
if(jsonURLS){
  var urlPagos = jsonURLS.CONEXION_PAGOS + 'api/'; 
  var urlFacPuente = jsonURLS.CONEXION_FACPUENTE;
  var urlFacturacionV2 = jsonURLS.CONEXION_FACTURACION_AE_V2;
}

/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxPago(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlPagos + vUrlComp,
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

/*COMANDO PARA GENERAR HTML PAGO */
function ejecutarAjaxPagoHTML(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
  $.ajax({
    type: vTypeCall,
    url: urlFacPuente + vUrlComp,
    data:  JSON.stringify(vDataCall),
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


////////////////////////////////////////////////SERVICIOS FACTURACION v2//////////////////////////////////////////
function ejecutarAjaxFacturacionV2Token(vUrlComp, vTypeCall, vDataCall, vFunctionResp,tokenFAC) {
console.log("urlFacturacionV2 (1):",urlFacturacionV2);
  $.ajax({
      type: vTypeCall,
      url:  urlFacturacionV2 + vUrlComp,
      data: vDataCall,
      async: false,
      success: function (response) {
          dataResp = JSON.stringify(response);
          vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
          dataResp = "{\"errorParametros\":{\"message\":\"" + response + "\",\"code\":700}}";
          console.log("error", dataResp);
          vFunctionResp(dataResp);
      }
  });
  return dataResp;
};

function ejecutarAjaxFacturacionV2(vUrlComp, vTypeCall, vDataCall, vFunctionResp,tokenFacV2) {
  var headers = {};
  $.ajax({
      type: vTypeCall,
      url:  urlFacturacionV2 + vUrlComp,
      data: vDataCall,
      async: false,
      headers: {
          'authorization': tokenFacV2
      },
      success: function (response) {
          dataResp = JSON.stringify(response);
          vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
          dataResp = "{\"errorParametros\":{\"message\":\"" + response + "\",\"code\":700}}";
          console.log("error", dataResp);
          vFunctionResp(dataResp);
      }
  });
  return dataResp;
};


/*///////////////GUARDAR factura//////////////////////*/
function datafactura() {
  this.operacion;
  this.usr_usuario;
  this.usr_clave;
  this.idSucursal;
  this.tokenFactura;  
  this.codigo;  
}
datafactura.prototype.dataFactura = function (functionResp) {
  urlCompPago = "factura.php";
  typeCallPago = "post";
  dataParamsPago = {
    "operacion":this.operacion,
    "usr_usuario":this.usr_usuario,
    "usr_clave":this.usr_clave,
    "idSucursal":this.idSucursal,
    "tokenFactura":this.tokenFactura,
    "codigo":this.codigo    
  };
  ejecutarAjaxPagoHTML(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};

/*///////////////GUARDAR ATC//////////////////////*/
function datahtml() {
  
  this.odm;
  this.total;
  this.nombres;
  this.apellidos;
  this.direccion;
  this.email;
  this.celular;
  this.sistema;
  this.ci_nit;
  this.oid_ciudadano;
  this.sucursal_facturacion;
  this.id_usuario_facturacion;
  this.servicio;
  
  this.usuario_fac;
  this.clave_fac ;
  this.nit_factura ;
  this.nombre_factura;
  this.data_opcional;
  this.items;

};

datahtml.prototype.generacionHtml = function (functionResp) {
  urlCompPago = "registrarTrx";
  typeCallPago = "post";
  dataParamsPago = {
    "odm":this.odm,
    "total":this.total,
    "nombres":this.nombres,
    "apellidos":this.apellidos,
    "direccion":this.direccion,
    "email":this.email,
    "celular":this.celular,
    "sistema":this.sistema,
    "ci_nit":this.ci_nit,
    "oid_ciudadano":this.oid_ciudadano,
    "sucursal_facturacion":this.sucursal_facturacion,
    "id_usuario_facturacion":this.id_usuario_facturacion,
    "servicio":this.servicio,

    "usuario_fac":this.usuario_fac,
    "clave_fac":this.clave_fac,
    "nit_factura":this.nit_factura,
    "nombre_factura":this.nombre_factura,
    "data_opcional":this.data_opcional,
    "items":this.items
   
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
/*FIM DATA HTML */

/*///////////////GUARDAR ATC//////////////////////*/
function atc() {
    this.id_actividadeconomica;
    this.id_organizacion;
    this.access_key;
    this.profile_id;
    this.secret_key;
    this.cod_agregador;
};

atc.prototype.registroAtc = function (functionResp) {
    urlCompPago = "/registroREDENLACE";
    typeCallPago = "post";
    dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica,
      "id_agregador"          : this.cod_agregador,
        /*"id_organizacion"       : this.id_organizacion,
        "access_key"            : this.access_key,
        "profile_id"            : this.profile_id,
        "secret_key"            : this.secret_key, */
    };
    ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};

atc.prototype.getRegistroAtc = function (functionResp) {
  urlCompPago = "/get-credenciales-redenlace-ae";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};

/*///////////////qr//////////////////////*/
function qr() {
    this.id_actividadeconomica;
    this.service_code;
    this.cuenta_bancaria;
};

qr.prototype.registroQr = function (functionResp) {
    urlCompPago = "/registroBCP";
    typeCallPago = "post";
    dataParamsPago = {
        "id_actividadeconomica" : this.id_actividadeconomica,
        "service_code" : this.service_code,
        "cuenta_bancaria" : this.cuenta_bancaria
    };
    ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};

qr.prototype.getCredencialQr = function (functionResp) {
  urlCompPago = "/get-credenciales-bcp-ae";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
/*/////////////// Transferencia Bancaria //////////////////////*/
function tbancaria() {
  
  this.id_actividadeconomica;
  this.entidad_financiera;
  this.numero_cuenta;
  this.nombre_abono;
  this.ci_nit_abono;
  this.id_venta;
  this.estado;
  this.observacion;
  this.idContribuyente;
};

tbancaria.prototype.registroTransferencia = function (functionResp) {
  urlCompPago = "/registroTRANSFERENCIA";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica,
      "entidad_financiera"    : this.entidad_financiera,
      "numero_cuenta"         : this.numero_cuenta,
      "nombre_abono"          : this.nombre_abono,
      "ci_nit_abono"          : this.ci_nit_abono
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
tbancaria.prototype.getCredTransferencia = function (functionResp) {
  urlCompPago = "/get-credenciales-transferencia-ae";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
tbancaria.prototype.getEntidades = function (functionResp) {
  urlCompPago = "/get-entidad-financiera";
  typeCallPago = "post";
  dataParamsPago = {
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};

tbancaria.prototype.pagoCambioEstado = function (functionResp) { 
  urlCompPago = "/cambio-estado-pago-ae";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica,
      "id_venta"              : this.id_venta,
      "estado"                : this.estado,
      "observacion"           : this.observacion,
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);       
};
/*/////////////// Mis Transacciones //////////////////////*/
function lstTransaciones() {
  this.id_actividadeconomica;
  this.fecha_inicio;
  this.fecha_fin;
};

lstTransaciones.prototype.listaTransaciones = function (functionResp) {
  urlCompPago = "/listar-pago-ae";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica,
      "fecha_inicio"          : this.fecha_inicio,
      "fecha_fin"             : this.fecha_fin
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
/*/////////////// Inhabilitar credencial //////////////////////*/
function inCredencial() {
  this.id_actividadeconomica;
  this.tipo_credencial;
};

inCredencial.prototype.eliminaCredencial = function (functionResp) {
  urlCompPago = "/eliminarCREDENCIALES";
  typeCallPago = "post";
  dataParamsPago = {
      "id_actividadeconomica" : this.id_actividadeconomica,
      "tipo_credencial"       : this.tipo_credencial
  };
  ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};


////////////////////////////////FACTURACION ELECTRONICA ONLINE v2//////////////////////////////
function tokenFacturacionV2(){
  this.usr_usuario;  
  this.usr_clave;
};
tokenFacturacionV2.prototype.generaToken=function(functionResp){
  urlComp = 'api/iFacturas/login';
  typeCall = "POST";
  dataParams= {
      "usr_usuario"      :this.usr_usuario,
      "usr_clave"        :this.usr_clave
  };
  ejecutarAjaxFacturacionV2Token(urlComp, typeCall, dataParams, functionResp);
};

function tipoDocumentos(){
  this.dominio;  
};
tipoDocumentos.prototype.lstTipoDocumentos=function(functionResp){
  var tokenFacV2 = sessionStorage.getItem('TOKEN_FACTURACIONV2');
  urlComp = 'api/tipoDocumentos';
  typeCall = "POST";
  dataParams= {
      "dominio"        :this.dominio
  };
  ejecutarAjaxFacturacionV2(urlComp, typeCall, dataParams, functionResp,tokenFacV2);
};

function itemRecaudadorFacturacion(){
  this.numero_sucursal;  
};
itemRecaudadorFacturacion.prototype.lstItemRecaudador=function(functionResp){
  var tokenFacV2 = sessionStorage.getItem('TOKEN_FACTURACIONV2');
  urlComp = 'api/itemRecaudador';
  typeCall = "POST";
  dataParams= {
      "numero_sucursal"        :this.numero_sucursal
  };
  ejecutarAjaxFacturacionV2(urlComp, typeCall, dataParams, functionResp,tokenFacV2);
};


function buscaDocumento(){
  this.documento;
  this.tipo_documento;
};
buscaDocumento.prototype.buscaDocumentoDetalle=function(functionResp){
  var tokenFacV2 = sessionStorage.getItem('TOKEN_FACTURACIONV2');
  urlComp = 'api/factura/informacionCiudadano/'+this.documento+'/'+this.tipo_documento;
  typeCall = "GET";
  dataParams= {};
  ejecutarAjaxFacturacionV2(urlComp, typeCall, dataParams, functionResp,tokenFacV2);
};

function obtenerEstado(){
  this.sucursal;
  this.punto_venta;
};
obtenerEstado.prototype.obtenerEstadoCufd=function(functionResp){
  var tokenFacV2 = sessionStorage.getItem('TOKEN_FACTURACIONV2');
  urlComp = 'api/masivas/obtenerEsatdoCufd';
  typeCall = "POST";
  dataParams= {
      "sucursal"          :this.sucursal,
      "punto_venta"       :this.punto_venta
  };
  ejecutarAjaxFacturacionV2(urlComp, typeCall, dataParams, functionResp,tokenFacV2);
};

function buscarItem(){
  this.sucursal;
};
buscarItem.prototype.buscarItemFacturacion=function(functionResp){
  var tokenFacV2 = sessionStorage.getItem('TOKEN_FACTURACIONV2');
  urlComp = 'api/item/listar';
  typeCall = "POST";
  dataParams= {
      "sucursal"          :this.sucursal
  };
  ejecutarAjaxFacturacionV2(urlComp, typeCall, dataParams, functionResp,tokenFacV2);
};