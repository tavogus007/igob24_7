if(jsonURLS){
    urlMov = jsonURLS.CONEXION_MOVILIDAD + "wsMov";
    urlIf1 = jsonURLS.CONEXION_API_PG_IF1+"wsIf";
}

var urlComp;
var dataResp;
var dataParams;
var typeCall;

var urlCompIf;
var dataRespIf;
var dataParamsIf;
var typeCallIf;

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

function ejecutarAjaxIF9097(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlIf1 + vUrlComp,
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

//**********************REGISTRO DE OPERADORES**********************************

function listaModalidad(){
};

listaModalidad.prototype.lstModalidad = function (functionResp) {
    urlComp = "/lstModalidad";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function operador(){
  this.rz;
  this.denominacion;    
  this.tipooperador;
  this.nit;
  this.datosope;
  this.datosreq;
  this.datosrev;
  this.id_usr ;
};
operador.prototype.operadorInsert = function (functionResp) {
    urlComp = "/insertOperador";
    typeCall = "post";
    dataParams = {
    "rz"           : this.rz,
    "denominacion" : this.denominacion,    
    "tipooperador" : this.tipooperador,
    "nit"          : this.nit,
    "datosope"     : this.datosope,
    "datosreq"     : this.datosreq,
    "datosrev"     : this.datosrev,
    "id_usr"       : this.id_usr 
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function requisitosOperador(){
  this.id;
  this.datosreq;
};

requisitosOperador.prototype.actualizarReqOperador = function (functionResp) {
    urlComp = "/actualizarReqOperador";
    typeCall = "post";
    dataParams = {
    "id"           : this.id,
    "datosreq"     : this.datosreq
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function representante(){
  this.op_id;     
  this.ci_repr; 
  this.datos;    
  this.usr_id;     
  this.persona;
  this.oidciudadano;
};

representante.prototype.representanteInsert = function (functionResp) {
    urlComp = "/insertRepresentanteOperador";
    typeCall = "post";
    dataParams = {
    "op_id" : this.op_id,   
    "ci_repr" : this.ci_repr, 
    "datos" : this.datos,  
    "usr_id" : this.usr_id,    
    "persona" : this.persona,
    "oidciudadano" : this.oidciudadano
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function ubicacion(){
  this.id; 
  this.idope;
  this.oficina; 
  this.datos; 
  this.revision; 
  this.viae; 
  this.usr; 
  this.opcion;
} 

ubicacion.prototype.datosOficina = function (functionResp) {
  urlComp = "/oficinas";
  typeCall = "post";
  dataParams = {
    "id"       : this.id, 
    "idope"    : this.idope,
    "oficina"  : this.oficina, 
    "datos"    : this.datos, 
    "revision" : this.revision, 
    "viae"     : this.viae, 
    "usr"      : this.usr,
    "opcion"   : this.opcion
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function buscaOficinas(){ 
  this.idope;
} 

buscaOficinas.prototype.buscaOficinasOperador = function (functionResp) {
  urlComp = "/buscaOficinasOperador";
  typeCall = "post";
  dataParams = {
    "idope"    : this.idope
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};


function listaOficinas(){
  this.idope;
} 

listaOficinas.prototype.lstOficinas = function (functionResp) {
  urlComp = "/lstOficinas";
  typeCall = "post";
  dataParams = {
    "idope"    : this.idope
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};


function conductor(){
  this.id; 
  this.ope_id;
  this.ci;
  this.datos; 
  this.usr_id; 
  this.ofi_id; 
  this.opcion; 
} 

conductor.prototype.conductorAbm = function (functionResp) {
  urlComp = "/abmConductor";
  typeCall = "post";
  dataParams = {
    "id"      :this.id, 
    "ope_id"  :this.ope_id, 
    "ci"      :this.ci, 
    "datos"   :this.datos, 
    "usr_id"  :this.usr_id, 
    "ofi_id" :this.ofi_id, 
    "opcion"  :this.opcion
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function listaConductor(){
  this.ope_id;
}
listaConductor.prototype.lstConductor = function(functionResp){
  urlComp = "/lstConductor";
  typeCall = "post";
  dataParams = {
    "ope_id"  :this.ope_id
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
}

function buscaConductorVeh(){
  this.ci;
}
buscaConductorVeh.prototype.buscaConductor = function(functionResp){
  urlComp = "/buscaConductor1";
  typeCall = "post";
  dataParams = {
    "ci"  :this.ci
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
}

function vehiculo(){
  this.id; 
  this.ope_id; 
  this.placa; 
  this.datos; 
  this.usr_id; 
  this.tipo_ser; 
  this.id_ofi; 
  this.opcion;
} 

vehiculo.prototype.vehiculoAbm = function (functionResp) {
  urlComp = "/abmVehiculo";
  typeCall = "post";
  dataParams = {
    "id"      :this.id, 
    "ope_id"  :this.ope_id, 
    "placa"   :this.placa, 
    "datos"   :this.datos, 
    "usr_id"  :this.usr_id, 
    "tipo_ser":this.tipo_ser, 
    "id_ofi" :this.id_ofi, 
    "opcion"  :this.opcion
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function listaVehiculo(){
  this.ope_id; 
} 

listaVehiculo.prototype.lstVehiculo = function (functionResp) {
  urlComp = "/lstVehiculo";
  typeCall = "post";
  dataParams = {
    "ope_id"  :this.ope_id
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function verifPlaca(){
  this.placa; 
} 

verifPlaca.prototype.verificaPlaca = function (functionResp) {
  urlComp = "/verificaPlaca";
  typeCall = "post";
  dataParams = {
    "placa"  :this.placa
  };
  ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function claseVehiculo(){
  this.tipo;

};

claseVehiculo.prototype.combo_clase_v = function (functionResp) {
  urlCompIf = "/claseVehiculo";
  typeCallIf = "post";
  dataParamsIf = {
    "tipo" : this.tipo
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf, dataParamsIf, functionResp);
};

function marcaVehiculo(){
};

marcaVehiculo.prototype.combo_marca_v = function (functionResp) {
  urlCompIf = "/marcaVehiculo";
  typeCallIf = "post";
  dataParamsIf = {
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf, dataParamsIf, functionResp);
};

function listaRequisitos(){
  this.tipo;
};

listaRequisitos.prototype.lstRequisitos = function (functionResp) {
  urlCompIf = "/lstRequisitos";
  typeCallIf = "post";
  dataParamsIf = {
    "tipo": this.tipo
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf, dataParamsIf, functionResp);
};

function listaRequisitosTaxi(){
};

listaRequisitosTaxi.prototype.lstRequisitosTaxi = function (functionResp) {
  urlCompIf = "/lstRequisitosTaxi";
  typeCallIf = "post";
  dataParamsIf = {
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf, dataParamsIf, functionResp);
};
//********************************************************************************
///////////////////////////Datos form////////////////////////////////

function operador_data(){
    this.ci;
    this.datos;
    this.usuario;
};
operador_data.prototype.operador_form = function (functionResp) {
    urlComp = "/operador_form";
    typeCall = "post";
    dataParams = {
        "ci" : this.ci,
        "datos" : this.datos,
        "usuario" : this.usuario
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

////////////////Administracion Operadores///////////////////////////
function operadoresHab(){
    this.nroDoc;
    this.idCiu;
};
operadoresHab.prototype.listaOperadoresRep = function (functionResp) {
    urlComp = "/listaOperadoresRep";
    typeCall = "post";
    dataParams = {
        "nroDoc" : this.nroDoc,
        "idCiu"  : this.idCiu,
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function actualizaEstadoVehCond(){
    this.ope_id;
};
actualizaEstadoVehCond.prototype.actualiza_veh_cond = function (functionResp) {
    urlComp = "/actualiza_veh_cond";
    typeCall = "post";
    dataParams = {
        "ope_id" : this.ope_id
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function abmObservacionesCondVeh(){
  this.id;
  this.tipo_id;
  this.tipo;
  this.obs;
  this.opcion;
};
abmObservacionesCondVeh.prototype.abmObservaciones = function (functionResp) {
    urlComp = "/abmObservaciones";
    typeCall = "post";
    dataParams = {
      "id"      : this.id,
      "tipo_id" : this.tipo_id,
      "tipo"    : this.tipo,
      "obs"     : this.obs,
      "opcion"  : this.opcion
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function listaObservacionesCondVeh(){
  this.idtipo;
  this.tipo;
};
listaObservacionesCondVeh.prototype.lstObservaciones = function (functionResp) {
    urlComp = "/lstObservaciones";
    typeCall = "post";
    dataParams = {
      "idtipo"  : this.idtipo,
      "tipo"    : this.tipo
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function buscaObservacionesCondVeh(){
  this.identificador;
  this.tipo;
};
buscaObservacionesCondVeh.prototype.buscaObservaciones = function (functionResp) {
    urlComp = "/buscaObservaciones";
    typeCall = "post";
    dataParams = {
      "identificador"  : this.identificador,
      "tipo"    : this.tipo
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};

function observaciones(){
}

observaciones.prototype.lstTodasObservaciones = function (functionResp) {
    urlComp = "/listaTodasObservaciones";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxMov(urlComp, typeCall, dataParams, functionResp);
};
//*******************************Renovacion TIC y TMOV*********************************
function renovacionVehTmov(){
  this.id_veh;
  this.detalle_ren;
};

renovacionVehTmov.prototype.renovacionTmov = function (functionResp) {     
  urlCompIf =  "/renovacionTmov";     
  typeCallIf = "post";     
  dataParamsIf = { 
    "id_veh":      this.id_veh,
    "detalle_ren": this.detalle_ren
  };    
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
};

function renovacionCondTic(){
  this.id_cond;
  this.detalle_ren;
};

renovacionCondTic.prototype.renovacionTic = function (functionResp){     
  urlCompIf =  "/renovacionTic";     
  typeCallIf = "post";     
  dataParamsIf = { 
    "id_cond":      this.id_cond,
    "detalle_ren": this.detalle_ren
  };    
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
};

//************************************Modificacion Operadores********************************************
function oficinasAprobadas(){
  this.idOperador;
}

oficinasAprobadas.prototype.listaOficinasAprob = function(functionResp){
  urlCompIf = "/listaOficinasAprob";
  typeCallIf = "post";
  dataParamsIf = {
    "idOperador" : this.idOperador
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
}

function modOficinasAprobadas(){
  this.xofi_id;
  this.xofi_oficina;
  this.xofi_datos;
  this.xofi_viae;
}

modOficinasAprobadas.prototype.modificaOficina = function(functionResp){
  urlCompIf = "/modificaOficina";
  typeCallIf = "post";
  dataParamsIf = {
    "xofi_id"      : this.xofi_id,
    "xofi_oficina" : this.xofi_oficina,
    "xofi_datos"   : this.xofi_datos,
    "xofi_viae"    : this.xofi_viae
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
}

function actualizaRepresentante(){
  this.ope_id;
  this.ci_repr; 
  this.datos;
  this.usr_id;
  this.persona;
  this.oidciudadano;
  this.repr_adjuntos;
}

actualizaRepresentante.prototype.modificaRepresentante = function(functionResp){
  urlCompIf = "/modificaRepresentante";
  typeCallIf = "post";
  dataParamsIf = {
    "ope_id"        : this.ope_id,
    "ci_repr"       : this.ci_repr, 
    "datos"         : this.datos,
    "usr_id"        : this.usr_id,
    "persona"       : this.persona,
    "oidciudadano"  : this.oidciudadano,
    "repr_adjuntos" : this.repr_adjuntos
  };
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
}


function busca_placa(){
    this.placa;
};

busca_placa.prototype.busca_placa_sam = function (functionResp) {     
  urlCompIf =  "/buscaVehiculoSam";     
  typeCallIf = "post";     
  dataParamsIf = { "placa": this.placa };    
  ejecutarAjaxMov(urlCompIf, typeCallIf,
  dataParamsIf, functionResp); 
};

function busca_conductor(){
    this.ci;
};

busca_conductor.prototype.busca_conductor_sam = function (functionResp) {     
  urlCompIf =  "/buscaConductorSam";     
  typeCallIf = "post";     
  dataParamsIf = { "ci": this.ci };    
  ejecutarAjaxMov(urlCompIf, typeCallIf,
  dataParamsIf, functionResp); 
};


//********************************************************************************************************
function asig_dinamico(){
    this.consulta;
};

asig_dinamico.prototype.dinamico = function (functionResp) {     
  urlCompIf =  "/dinamico";     
  typeCallIf = "post";     
  dataParamsIf = { "consulta": this.consulta };    
  ejecutarAjaxMov(urlCompIf, typeCallIf,dataParamsIf, functionResp); 
};

//***********************TEMPORAL************************
function crear_Tramite_lotus1(){
    this.proid;
    this.actid;
    this.usr_id;
    this.datos;
    this.procodigo;
    this.macro_id;
    this.nodo_id;
    this.ws_id;
};

crear_Tramite_lotus1.prototype.tram_lotus1 = function (functionResp) {
  urlComp = "/crearTramiteLotus";
  alert(123);
  typeCall = "post";
  dataParams = {
    "proid" : this.proid,
    "actid" : this.actid,
    "usr_id" : this.usr_id,
    "datos" : this.datos,
    "procodigo" : this.procodigo,
    "macro_id" : this.macro_id,
    "nodo_id" : this.nodo_id,
    "ws_id" : this.ws_id
  };
  ejecutarAjaxIF9097(urlComp, typeCall, dataParams, functionResp);
};

