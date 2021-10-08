var urlCompPago;
var dataRespPago;
var dataParamsPago;
var typeCallPago;

if(jsonURLS){
  var urlPagos = jsonURLS.CONEXION_PAGOS; 
 // var urlPagosHTML = "http://172.18.2.194:4500/api";
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
/* function ejecutarAjaxPagoHTML(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
  $.ajax({
    type: vTypeCall,
    url: urlPagosHTML + vUrlComp,
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
}; */
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