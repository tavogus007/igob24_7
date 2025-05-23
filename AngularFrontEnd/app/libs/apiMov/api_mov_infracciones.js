if(jsonURLS){
    urlMov = jsonURLS.CONEXION_MOVILIDAD + "wsMov";
}

var urlComp;
var dataResp;
var dataParams;
var typeCall;


/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxMov(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
  $.ajax({
    type: vTypeCall,
    url: urlMov + vUrlComp,
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

//*****************************INFRACCIONES*****************************************
function buscaInfraccion(){
  this.placa;
};

buscaInfraccion.prototype.buscaInfraccionesPlaca = function (functionResp) {
  urlComp = "/buscaInfraccionesPlaca";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

buscaInfraccion.prototype.buscaDecomisoPlacas = function(functionResp){
  urlComp = "/buscaDecomiso";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
}

buscaInfraccion.prototype.buscaCantidadConmutaciones = function(functionResp){
  urlComp = "/buscaCantidadConmutaciones";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
}

buscaInfraccion.prototype.buscaCantidadRosetas = function(functionResp){
  urlComp = "/buscaCantidadRosetas";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
}

function buscaOperador(){
  this.uid_ciudadano;
};

buscaOperador.prototype.buscaOperadorRT = function (functionResp) {
  urlComp = "/buscaOperadorRT";
  typeCall = "post";
  dataParams = {
    "uid_ciudadano" : this.uid_ciudadano
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function buscaOperadorRadioTaxi(){
  this.uid_ciudadano;
};

buscaOperadorRadioTaxi.prototype.listaOperadorRadioTaxi = function (functionResp) {
  urlComp = "/lstRadioTaxi";
  typeCall = "post";
  dataParams = {
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function buscaInfraccionesTipo(){
  this.placa;  
  this.tipo;
};

buscaInfraccionesTipo.prototype.buscaInfraccionesPlacaTipo = function (functionResp) {
  urlComp = "/buscaInfraccionesPlacaTipo";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa,
    "tipo" : this.tipo

  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};


function insertConmutacion(){
  this.placa;  
  this.oid;
  this.datos;
};

insertConmutacion.prototype.registraConmutacion = function (functionResp) {
  urlComp = "/registraConmutacion";
  typeCall = "post";
  dataParams = {
    "placa" : this.placa,
    "oid" : this.oid,
    "datos" : this.datos,
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

