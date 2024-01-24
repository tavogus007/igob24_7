var urlComp;
var dataResp;
var dataParams;
var typeCall;
var urlAservicio    =    "";

if(jsonURLS){
    urlATM = jsonURLS.CONEXION_API_PG_RC + "wsATM";
    key = jsonURLS.KEY;

}

function ejecutarAjaxATM(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
	token = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlATM + vUrlComp,
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

function rcTramitesAtm(){
    this.sidciudadano;
  };
  
  rcTramitesAtm.prototype.obtTramitesAtm = function (functionResp)
  {
  urlComp = "/listarTramitesAtm";
  typeCall = "post";
  dataParams = {
          "sidciudadano": this.sidciudadano
  };
  ejecutarAjaxATM(urlComp, typeCall, dataParams, functionResp);
  }