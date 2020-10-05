//var urlMservicio = CONFIG.SERVICE_SIERRAM+"reglaNegocio/ejecutarWeb";
var urlMservicio = "http://172.19.160.133/api/reglaNegocio/ejecutarWeb";

var urlMservicioODM = "http://192.168.5.69/motorservicio_pruebas/public/api/reglaNegocio/ejecutarWeb";

function ejecutarAjaxMotorS(vUrlComp, vTypeCall, vDataCall, vFunctionResp, token) {
    var headers = {};
    $.ajax({
        url: urlMservicioODM,
        data: vDataCall,
        type: "POST",
        dataType: "json",
        headers: {
            'authorization': token
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

function ejecutarAjaxMServicio(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
    var headers = {};
    $.ajax({
        url: urlMservicio,
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

function reglasnegocioSierra(){
    this.identificador;
    this.parametros;
};

reglasnegocioSierra.prototype.llamarregla_sierra=function(functionResp){
    var idtoken =   sessionStorage.getItem('TOKEN_MOTOR');
    var stoquen =  'Bearer ' + idtoken ;
    urlComp = "";
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxMServicio(urlComp, typeCall, dataParams, functionResp,stoquen);
};

/*function reglasnegocioODM(){
    this.identificador;
    this.parametros;
};

reglasnegocioODM.prototype.llamarreglaODM=function(functionResp){
  var idtoken =   sessionStorage.getItem('TOKEN_MOTORODM');
  var stoquen =  'Bearer ' + idtoken ;
    urlComp = "";
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxMotorS(urlComp, typeCall, dataParams, functionResp,stoquen);
};*/