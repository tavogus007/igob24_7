var urlComp;
var dataResp;
var dataParams;
var typeCall;
if(jsonURLS){  
  var urlFichas = jsonURLS.CONEXION_API_PG_IF+"wsFichas";
}
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxFichas(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlFichas + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        //console.log(response);
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
/*//////////////////////////////////PERSONA EXTRAVIADA //////////////////////////////////////////*/

function agencia() {

};

agencia.prototype.listaAgencia = function (functionResp) {
    urlComp = "/lstAgencia";
    typeCall = "post";
    dataParams = {};
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function servicioAgencia() {
  this.sidagencia;
};

servicioAgencia.prototype.listaServiciosAgencia = function (functionResp) {
    urlComp = "/lstServiciosAgencia";
    typeCall = "post";
    dataParams = {
      "sidagencia" : this.sidagencia
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function atencionPuestoGen() {
  this.sagenciaid;
};

atencionPuestoGen.prototype.listaAtencionPuestoGen = function (functionResp) {
    urlComp = "/lstAtencionPuestoGeneral";
    typeCall = "post";
    dataParams = {
      "sagenciaid" : this.sagenciaid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function fichasEsperaGen() {
  this.sagenciaid;
};

fichasEsperaGen.prototype.listaFichasEsperaGen = function (functionResp) {
    urlComp = "/lstFichasEsperaGeneral";
    typeCall = "post";
    dataParams = {
      "sagenciaid" : this.sagenciaid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};



function colaClientes() {
  this.agenciaid;
};

colaClientes.prototype.listaColaClientes = function (functionResp) {
    urlComp = "/lstColaClientes";
    typeCall = "post";
    dataParams = {
      "agenciaid" : this.agenciaid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};


function atencionPuestos() {
  this.sagenciaid;
  this.sidservicio;
};

atencionPuestos.prototype.listaAtencionPuestos = function (functionResp) {
    urlComp = "/lstAtencionPuestos";
    typeCall = "post";
    dataParams = {
      "sagenciaid" : this.sagenciaid,
      "sidservicio" : this.sidservicio
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};


function fichasEspera() {
  this.sagenciaid;
  this.sidservicio;
};

fichasEspera.prototype.listaFichasEspera = function (functionResp) {
    urlComp = "/lstFichasEspera";
    typeCall = "post";
    dataParams = {
      "sagenciaid" : this.sagenciaid,
      "sidservicio" : this.sidservicio
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function servicioFinalizadoAgencia() {
  this.agenciaid;
  this.servicioid;
};

servicioFinalizadoAgencia.prototype.listaServicioFinalizadoAgencia = function (functionResp) {
    urlComp = "/lstServicioFinalizadoAgencia";
    typeCall = "post";
    dataParams = {
      "agenciaid" : this.agenciaid,
      "servicioid" : this.servicioid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function colaClientesEspecificos() {
  this.agenciaid;
  this.servicioid;
};

colaClientesEspecificos.prototype.listaColaClientesEspecificos = function (functionResp) {
    urlComp = "/lstColaClientesEspecificos";
    typeCall = "post";
    dataParams = {
      "agenciaid" : this.agenciaid,
      "servicioid" : this.servicioid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};

function servFinalizadoAgenciaGeneral() {
  this.agenciaid;
};

servFinalizadoAgenciaGeneral.prototype.listaServFinalizadoAgenciaGeneral = function (functionResp) {
    urlComp = "/lstFinalizadoAgenciaGeneral";
    typeCall = "post";
    dataParams = {
      "agenciaid" : this.agenciaid
    };
    ejecutarAjaxFichas(urlComp, typeCall, dataParams, functionResp);
};