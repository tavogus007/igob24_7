var urlComp;
var dataResp;
var dataParams;
var typeCall;
//var urlAservicio    =    "";//"http://192.168.5.69/api/reglaNegocio/ejecutarWeb";


if(jsonURLS){
    urlMaservicio    =   jsonURLS.CONEXION_SERVICIOMASCOTAS + "api/reglaNegocio/ejecutarWeb";
    console.log('INTERMEDIO-----',urlMaservicio);
    key = jsonURLS.KEY;

}

/*function ejecutarAjaxMASCOTAS(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
  var headers = {};
  $.ajax({
      type: vTypeCall,
      url: urlMaservicio + vUrlComp,
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
};*/


function ejecutarAjaxMASCOTAS(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
  var headers = {};
  $.ajax({
    url: urlMaservicio + vUrlComp,
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
function reglasnegocioM(){
    this.identificador;
    this.parametros;
};

reglasnegocioM.prototype.llamarregla=function(functionResp){
  var idtoken =   sessionStorage.getItem('TOKEN_MOTORM');
  var stoquenM =  'Bearer ' + idtoken ;
    urlComp = "";
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxMASCOTAS(urlComp, typeCall, dataParams, functionResp,stoquenM);
};

// ATM
/*function rcTramitesAtm(){
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
  }*/