var urlCompPago;
var dataRespPago;
var dataParamsPago;
var typeCallPago;

if(jsonURLS){
  var urlPagos = jsonURLS.CONEXION_PAGOS+"api"; 
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

/*///////////////GUARDAR ATC//////////////////////*/
function atc() {
    this.id_actividadeconomica;
    this.access_key;
    this.profile_id;
    this.secret_key;
};

atc.prototype.registroAtc = function (functionResp) {
    urlCompPago = "/registroREDENLACE";
    typeCallPago = "post";
    dataParamsPago = {
        "id_actividadeconomica" : this.id_actividadeconomica,
        "access_key" : this.access_key,
        "profile_id" : this.profile_id,
        "secret_key" : this.secret_key,
    };
    ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};


/*///////////////qr//////////////////////*/
function qr() {
    this.id_actividadeconomica;
    this.service_code;
};

qr.prototype.registroQr = function (functionResp) {
    urlCompPago = "/registroREDENLACE";
    typeCallPago = "post";
    dataParamsPago = {
        "id_actividadeconomica" : this.id_actividadeconomica,
        "service_code" : this.service_code
    };
    ejecutarAjaxPago(urlCompPago, typeCallPago, dataParamsPago, functionResp);    
};
