var urlComp;
var dataResp;
var dataParams;
var typeCall;
var urlAservicio    =    "";//"http://192.168.5.69/api/reglaNegocio/ejecutarWeb";


if(jsonURLS){
    urlATM = jsonURLS.CONEXION_API_PG_RC + "wsATM";
    urlAservicio    =   jsonURLS.CONEXION_SERVICIOATM + "api/reglaNegocio/ejecutarWeb";
    key = jsonURLS.KEY;

}

function ejecutarAjaxATM(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlATM + vUrlComp,
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

function ejecutarAjaxATMServicio(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
    var headers = {};
    $.ajax({
      url: urlAservicio,
      data: vDataCall,
      type:"POST",
      dataType: "json",
      //crossDomain : true,
      headers: {
         'authorization': token
      },
      success: function(response) {
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        dataResp = "{\"error\":{\"message\":\""+response+"\",\"code\":700}}";
        console.log("error",dataResp);
        vFunctionResp(dataResp);
      }
    });
    return dataResp;
};

/*API REGLAS DE NEGOCIO*/
function reglasnegocioA(){
    this.identificador;
    this.parametros;
};

reglasnegocioA.prototype.llamarregla=function(functionResp){
  var idtoken =   sessionStorage.getItem('TOKEN_MOTOR');
  var stoquen =  'Bearer ' + idtoken ;
    urlComp = "";
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxATMServicio(urlComp, typeCall, dataParams, functionResp,stoquen);
};

// ATM
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