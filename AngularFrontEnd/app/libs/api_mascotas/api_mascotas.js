var urlComp;
var dataResp;
var dataParams;
var typeCall;
//var urlAservicio    =    "";//"http://192.168.5.69/api/reglaNegocio/ejecutarWeb";


if(jsonURLS){
    urlMaservicio    =   jsonURLS.CONEXION_SERVICIOMASCOTAS + "/motorservicio_pruebas/public/api/apiLogin";
    urlMaservicioReglas    =   jsonURLS.CONEXION_SERVICIOMASCOTAS + "motorservicio_pruebas/public/api/reglaNegocio/ejecutarWeb";
    urlRCPG = jsonURLS.CONEXION_API_PG_RC + "wsRCPG";
    key = jsonURLS.KEY;

}

function ejecutarAjax1(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
  token = sessionStorage.getItem('TOKEN_API');
  $.ajax({
    type: vTypeCall,
    url: urlRCPG + vUrlComp,
    data: vDataCall,
    //dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + token
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

function ejecutarAjaxMASCOTAS(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
  var headers = {};
  $.ajax({
    url: urlMaservicioReglas,
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
    urlComp = urlMaservicioReglas;
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxMASCOTAS(urlComp, typeCall, dataParams, functionResp,stoquenM);
};
function registroServicioMascotas() {
    this.id_servicio;
    this.oid_ciudadano;
    this.id_usuario;
    this.data_formulario;
    this.data_ciudadano;      
    
};
registroServicioMascotas.prototype.registro_Servicio_Mascotas = function (functionResp) {
    urlCompAe = "/adicionaServiciosFormulario";
    typeCallAe = "post";
    dataParamsAe = {
        "id_servicio":this.id_servicio,
        "oid_ciudadano":this.oid_ciudadano,
        "id_usuario":this.id_usuario,
        "data_formulario":this.data_formulario,
        "data_ciudadano":this.data_ciudadano
        
    };
    ejecutarAjax1(urlCompAe, typeCallAe, dataParamsAe, functionResp);    
};
