var urlCemServicio = "";
var urlCementerio = "";
var urlRespuestaPagoBackEnd = "";
var stokenCem = sessionStorage.getItem('TOKEN_CEM');

var urlCompCem;
var dataRespCemUbi;
var dataParamsCem;
var typeCallCem;

var urlCompCemClvs;
var dataRespCemUbiClvs;
var dataParamsCemClvs;
var typeCallCemClvs;

var urlCompCemSols;
var typeCallCemSols;
var dataParamsCemSols;
var dataRespBsqSols;

var urlCompCemRegSols;
var typeCallCemRegSols;
var dataParamsCemRegSols;
var dataRespBsqRegSols;

var urlCompCemFuecProc;
var typeCallCemFuecProc;
var dataParamsCemFuecProc;
var dataRespBsqFuecProc;

var urlCompCemItemsRec;
var typeCallCemItemsRec;
var dataParamsCemItemsRec;
var dataRespBsqItemsRec;

var urlCompCemBuscarFall;
var typeCallCemBuscarFall;
var dataParamsCemBuscarFall;
var dataRespBsqBuscarFall;

var urlCompCemRegFuecs;
var typeCallCemRegFuecs;
var dataParamsCemRegFuecs;
var dataRespRegFuecs;

var urlCompCemUndRec;
var typeCallCemUndRec;
var dataParamsCemUndRec;
var dataRespUndRec;

var urlCompCemRegPago;
var typeCallCemRegPago;
var dataParamsCemRegPago;
var dataRespRegPago;

var urlCompCemTipoServ;
var typeCallCemTipoServ;
var dataParamsCemTipoServ;
var dataRespTipoServ;

var urlCompCemPagosSol;
var typeCallCemPagosSol;
var dataParamsCemPagosSol;
var dataRespPagosSol;

var urlCompCemGrupoFuec;
var typeCallCemGrupoFuec;
var dataParamsCemGrupoFuec;
var dataRespGrupoFuec;

var urlCompCemBsqDoc;
var typeCallCemBsqDoc;
var dataRespBsqDoc;

var urlCompCemElimTranac;
var typeCallCemElimTransc;
var dataRespElimTransc;

var dataRespPagosOl;


if (jsonURLS) {
  try {
    urlFeel = jsonURLS.CONEXION_API_FEEL + "api/factura/dataCliente/";
    urlCementerio = jsonURLS.CONEXION_API_CEMENTERIO + "api/wsCmt/carIgob/";
    urlBackEndPagosOL = jsonURLS.CONEXION_API_BACKPAGOS + "api/registrarTrx";
    urlRespuestaPagoBackEnd = jsonURLS.CONEXION_API_BACKPAGOS;
    key = jsonURLS.KEY;
  } catch (e) {
    console.log("Warning:", e);
  }
}

//ELIMINAR TRANSACCION
function elimTrans() {
  this.fuec;
}

elimTrans.prototype.ElimTrans = function (functionRespED) {
  urlCompCemElimTransc = "cementerio/eliminar_transaccion";
  typeCallCemElimTransc = "POST";
  dataParamsCemElimTransc = {
    "xnum_fuec": this.fuec
  };
  ejecutarAjaxCemElimTransc(urlCompCemElimTransc, typeCallCemElimTransc, dataParamsCemElimTransc, functionRespED);
};

function ejecutarAjaxCemElimTransc(vUrlComp, vTypeCall, vDataCall, vFunctionRespED) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespElim = JSON.stringify(response);
      vFunctionRespED(dataRespElim);
    },
    error: function (response, status, error) {
      dataRespElim = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionRespED(dataRespElim);
    }
  });
  return dataRespElim;
};

//BUSCAR DOCUMENT
function bsqdoc() {
  this.ci_nit;
  this.tipo;
}

bsqdoc.prototype.bsqDocFact = function (functionRespDD) {
  urlCompCemBsqDoc = this.ci_nit + "/" + this.tipo;
  typeCallCemBsqDoc = "GET";
  ejecutarAjaxCemObtDoc(urlCompCemBsqDoc, typeCallCemBsqDoc, functionRespDD);
};

function ejecutarAjaxCemObtDoc(vUrlComp, vTypeCall, vFunctionRespDD) {
  $.ajax({
    type: vTypeCall,
    url: urlFeel + vUrlComp,
    dataType: "json",
    async: false,
    success: function (response) {
      dataRespBsqDoc = JSON.stringify(response);
      vFunctionRespDD(dataRespBsqDoc);
    },
    error: function (response, status, error) {
      dataRespBsqDoc = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionRespDD(dataRespBsqDoc);
    }
  });
  return dataRespBsqDoc;
};

//falls
function bsqUbiFalls() {
  this.codigo;
};
bsqUbiFalls.prototype.ubiCmtFalls = function (functionResp) {
  urlCompCem = "cementerio/bsqFalls";
  typeCallCem = "POST";
  dataParamsCem = {
    "codigo": this.codigo
  };
  ejecutarAjaxCemUbi(urlCompCem, typeCallCem, dataParamsCem, functionResp);
};

function ejecutarAjaxCemUbi(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      console.log('data ubi encontrada 2024', response);
      dataRespCemUbi = JSON.stringify(response);
      vFunctionResp(dataRespCemUbi);
    },
    error: function (response, status, error) {
      dataRespCemUbi = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp(dataRespCemUbi);
    }
  });
  return dataRespCemUbi;
};

//Clvs
function bsqUbiClvs() {
  this.id_ubi;
};

bsqUbiClvs.prototype.ubiCmtClvs = function (functionResp2) {
  urlCompCemClvs = "cementerio/bsqClvs";
  typeCallCemClvs = "POST";
  dataParamsCemClvs = {
    "xid_ubi": this.id_ubi
  };
  ejecutarAjaxCemUbiClvs(urlCompCemClvs, typeCallCemClvs, dataParamsCemClvs, functionResp2);
};

function ejecutarAjaxCemUbiClvs(vUrlComp, vTypeCall, vDataCall, vFunctionResp2) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespCemUbiClvs = JSON.stringify(response);
      vFunctionResp2(dataRespCemUbiClvs);
    },
    error: function (response, status, error) {
      dataRespCemUbiClvs = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp2(dataRespCemUbiClvs);
    }
  });
  return dataRespCemUbiClvs;
};

//Solicitante
function bsqSol() {
  this.ci_nit;
  this.tipo;
};


bsqSol.prototype.ubiCmtSols = function (functionResp3) {
  urlCompCemSols = "cementerio/bsqSols";
  typeCallCemSols = "POST";
  dataParamsCemSols = {
    "xci_nit_sol": this.ci_nit,
    "xtipo_sol": this.tipo
  };
  ejecutarAjaxBsqSols(urlCompCemSols, typeCallCemSols, dataParamsCemSols, functionResp3);
};

function ejecutarAjaxBsqSols(vUrlComp, vTypeCall, vDataCall, vFunctionResp3) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespBsqSols = JSON.stringify(response);
      vFunctionResp3(dataRespBsqSols);
    },
    error: function (response, status, error) {
      
      dataRespBsqSols = response.responseText;
      dataRespBsqSols = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp3(dataRespBsqSols);
    }
  });
  return dataRespBsqSols;
};

//Reg Sol
function regSol() {
  this.tipoS;
  this.idc;
  this.dataS;
  this.usr;
};

regSol.prototype.solReg = function (functionResp4) {
  urlCompCemRegClvs = "cementerio/insrtSols";
  typeCallCemRegClvs = "POST";
  dataParamsCemRegClvs = {
    "xcmt_solicitante_tipo": this.tipoS,
    "xcmt_solicitante_registro_ciudadano_id": this.idc,
    "xcmt_solicitante_data": this.dataS,
    "xcmt_solicitante_usr_id": this.usr
  };
  ejecutarAjaxCemRegSols(urlCompCemRegClvs, typeCallCemRegClvs, dataParamsCemRegClvs, functionResp4);
};


function ejecutarAjaxCemRegSols(vUrlComp, vTypeCall, vDataCall, vFunctionResp4) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespCemUbiClvs = JSON.stringify(response);
      vFunctionResp4(dataRespCemUbiClvs);
    },
    error: function (response, status, error) {
      dataRespBsqRegSols = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp4(dataRespBsqRegSols);
    }
  });
  return dataRespBsqRegSols;
};


regSol.prototype.solReg = function (functionResp4) {
  urlCompCemRegClvs = "cementerio/insrtSols";
  typeCallCemRegClvs = "POST";
  dataParamsCemRegClvs = {
    "xcmt_solicitante_tipo": this.tipoS,
    "xcmt_solicitante_registro_ciudadano_id": this.idc,
    "xcmt_solicitante_data": this.dataS,
    "xcmt_solicitante_usr_id": this.usr
  };
  ejecutarAjaxCemRegSols(urlCompCemRegClvs, typeCallCemRegClvs, dataParamsCemRegClvs, functionResp4);
};

//FUECS PROCESO
function obtFuecProc() {
  this.tipo1;
  this.tipo2;
}

obtFuecProc.prototype.fuecProc = function (functionResp5) {
  urlCompCemFuecProc = "cementerio/fuecProceso";
  typeCallCemFuecProc = "POST";
  dataParamsCemFuecProc = {
    "xtipoF": this.tipo1,
    "xtipoP": this.tipo2,
  };
  ejecutarAjaxCemFuecProceso(urlCompCemFuecProc, typeCallCemFuecProc, dataParamsCemFuecProc, functionResp5);
};

function ejecutarAjaxCemFuecProceso(vUrlComp, vTypeCall, vDataCall, vFunctionResp5) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespBsqFuecProc = JSON.stringify(response);
      vFunctionResp5(dataRespBsqFuecProc);
    },
    error: function (response, status, error) {
      dataRespBsqFuecProc = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp5(dataRespBsqFuecProc);
    }
  });
  return dataRespBsqFuecProc;
};

//FUECS ITEMS
function obtItemsClv() {
  this.sigla1;
  this.sigla2;
}

obtItemsClv.prototype.itemsEncClv = function (functionResp6) {
  urlCompCemItemsRec = "cementerio/itemsRec";
  typeCallCemItemsRec = "POST";
  dataParamsCemItemsRec = {
    "ysigla1": this.sigla1,
    "ysigla2": this.sigla2,
  };
  ejecutarAjaxCemItemsRec(urlCompCemItemsRec, typeCallCemItemsRec, dataParamsCemItemsRec, functionResp6);
};

function ejecutarAjaxCemItemsRec(vUrlComp, vTypeCall, vDataCall, vFunctionResp6) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespBsqItemsRec = JSON.stringify(response);
      vFunctionResp6(dataRespBsqItemsRec);
    },
    error: function (response, status, error) {
      dataRespBsqItemsRec = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp6(dataRespBsqItemsRec);
    }
  });
  return dataRespBsqItemsRec;
};

//BSQ FALLECIDOS
function dataFalls() {
  this.idf;
  this.nomf;
  this.patf;
  this.matf;
  this.casf;
  this.cif;
}

dataFalls.prototype.fallsEnc = function (functionResp7) {
  urlCompCemBuscarFall = "cementerio/bsqFallsGen";
  typeCallCemBuscarFall = "POST";
  dataParamsCemBuscarFall = {
    "xid_fll": this.idf,
    "xnombre_fll": this.nomf,
    "xpaterno_fll": this.patf,
    "xmaterno_fll": this.matf,
    "xcasada_fll": this.casf,
    "xci_fll": this.cif
  };
  ejecutarAjaxCemBuscarFall(urlCompCemBuscarFall, typeCallCemBuscarFall, dataParamsCemBuscarFall, functionResp7);
};

function ejecutarAjaxCemBuscarFall(vUrlComp, vTypeCall, vDataCall, vFunctionResp7) {
  //stokenCem = sessionStorage.getItem('TOKEN_MOTOR_CEM');
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespBsqBuscarFall = JSON.stringify(response);
      vFunctionResp7(dataRespBsqBuscarFall);
    },
    error: function (response, status, error) {
      dataRespBsqBuscarFall = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp7(dataRespBsqBuscarFall);
    }
  });
  return dataRespBsqBuscarFall;
};

//SAVE FUEC
function regFuec() {
  //this.urId,
  this.deudaId,
    this.tip,
    this.monto,
    this.contrib,
    this.trans,
    this.dGlosa,
    this.fuecOb,
    this.edcUsu,
    this.urlC
}

regFuec.prototype.RegFuec = function (functionResp8) {
  urlCompCemRegFuecs = "cementerio/insFuecsIgob";
  typeCallCemRegFuecs = "POST";
  dataParamsCemRegFuecs = {
    "xfum_deuda_id": this.deudaId,
    "xfum_tipo_origen": this.tip,
    "xfum_monto_pagar": this.monto,
    "xfum_data_contribuyente": this.contrib,
    "xfum_data_transaccion": this.trans,
    "xfum_data_glosa": this.dGlosa,
    "xfum_numero_correlativo": this.fuecOb,
    "xfum_usr_id": this.edcUsu,
    "xfum_url": this.urlC
  };
  ejecutarAjaxCemRegFuec(urlCompCemRegFuecs, typeCallCemRegFuecs, dataParamsCemRegFuecs, functionResp8);
};

function ejecutarAjaxCemRegFuec(vUrlComp, vTypeCall, vDataCall, vFunctionResp8) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespRegFuecs = JSON.stringify(response);
      vFunctionResp8(dataRespRegFuecs);
    },
    error: function (response, status, error) {
      dataRespRegFuecs = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp8(dataRespRegFuecs);
    }
  });
  return dataRespRegFuecs;
};

//UNIDAD RECAUDADORA
function obtUndRec() {
}

obtUndRec.prototype.unidadRec = function (functionResp9) {
  urlCompCemUndRec = "cementerio/obtUndRec";
  typeCallCemUndRec = "POST";
  dataParamsCemUndRec = {};
  ejecutarAjaxCemUndRec(urlCompCemUndRec, typeCallCemUndRec, dataParamsCemUndRec, functionResp9);
};

function ejecutarAjaxCemUndRec(vUrlComp, vTypeCall, vDataCall, vFunctionResp9) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      
      dataRespUndRec = JSON.stringify(response);
      vFunctionResp9(dataRespUndRec);
    },
    error: function (response, status, error) {
      dataRespUndRec = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp9(dataRespUndRec);
    }
  });
  return dataRespUndRec;
};


//TIPO DE SERVICIOS
function obtTipoServ() {
}

obtTipoServ.prototype.servicioTipo = function (functionResp10) {
  urlCompCemTipoServ = "cementerio/obtServClv";
  typeCallCemTipoServ = "POST";
  dataParamsCemTipoServ = {};
  ejecutarAjaxCemUndRec(urlCompCemTipoServ, typeCallCemTipoServ, dataParamsCemTipoServ, functionResp10);
};

function ejecutarAjaxCemUndRec(vUrlComp, vTypeCall, vDataCall, vFunctionResp10) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespTipoServ = JSON.stringify(response);
      vFunctionResp10(dataRespTipoServ);
    },
    error: function (response, status, error) {
      dataRespTipoServ = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp10(dataRespTipoServ);
    }
  });
  return dataRespTipoServ;
};

//SAVE PAGO
function regPago() {
  this.pUbiId,
    this.pTitId,
    this.pSolId,
    this.pFallId,
    this.pData,
    this.pDetData,
    this.pDataClv,
    this.pGest,
    this.pUsr
}

regPago.prototype.RegPago = function (functionResp11) {
  urlCompCemRegPago = "cementerio/insPagClv";
  typeCallCemRegPago = "POST";
  dataParamsCemRegPago = {
    "xcmt_pago_ubicacion_id": this.pUbiId,
    "xcmt_pago_titular_id": this.pTitId,
    "xcmt_pago_solicitante_id": this.pSolId,
    "xcmt_pago_fallecido_id": this.pFallId,
    "xcmt_pago_data": this.pData,
    "xcmt_pago_detalle_data": this.pDetData,
    "xcmt_data_clv": this.pDataClv,
    "xcmt_pago_gestiones": this.pGest,
    "xcmt_pago_usr_id": this.pUsr
  };
  ejecutarAjaxCemRegPago(urlCompCemRegPago, typeCallCemRegPago, dataParamsCemRegPago, functionResp11);
};

function ejecutarAjaxCemRegPago(vUrlComp, vTypeCall, vDataCall, vFunctionResp11) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespRegPago = JSON.stringify(response);
      vFunctionResp11(dataRespRegPago);
    },
    error: function (response, status, error) {
      dataRespRegPago = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp11(dataRespRegPago);
    }
  });
  return dataRespRegPago;
};

//PAGOS SOLICITANTE
function obtPagosSol() {
  this.idSol;
}

obtPagosSol.prototype.pagosSol = function (functionResp12) {
  urlCompCemPagosSol = "cementerio/obtPagsSol";
  typeCallCemPagosSol = "POST";
  dataParamsCemPagosSol = {
    "xidsolicitante": this.idSol,
  };
  ejecutarAjaxCemPagosSol(urlCompCemPagosSol, typeCallCemPagosSol, dataParamsCemPagosSol, functionResp12);
};

function ejecutarAjaxCemPagosSol(vUrlComp, vTypeCall, vDataCall, vFunctionResp12) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      dataRespPagosSol = JSON.stringify(response);
      vFunctionResp12(dataRespPagosSol);
    },
    error: function (response, status, error) {
      dataRespPagosSol = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp12(dataRespPagosSol);
    }
  });
  return dataRespPagosSol;
};

//REIMPRESION FUECS
function obtFuec() {
  this.fuec1;
}

obtFuec.prototype.rfuec = function (functionResp13) {
  urlCompCemGrupoFuec = "cementerio/obtGrupoFuec";
  typeCallCemGrupoFuec = "POST";
  dataParamsCemGrupoFuec = {
    "xnum_fuec": this.fuec1,
  };
  ejecutarAjaxCemGrupoFuec(urlCompCemGrupoFuec, typeCallCemGrupoFuec, dataParamsCemGrupoFuec, functionResp13);
};

function ejecutarAjaxCemGrupoFuec(vUrlComp, vTypeCall, vDataCall, vFunctionResp13) {
  $.ajax({
    type: vTypeCall,
    url: urlCementerio + vUrlComp,
    data: vDataCall,
    dataType: "json",
    async: false,
    headers: {
      'Authorization': 'Bearer ' + stokenCem
    },
    success: function (response) {
      vFunctionResp13(response);
    },
    error: function (response, status, error) {
      dataRespGrupoFuec = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp13(dataRespGrupoFuec);
    }
  });
  return dataRespGrupoFuec;
};

//ENVIO DE DATOS A BACKEND PAGOS OL
function enviarDatosPagos() {
  this.logueo,
    this.fecha_ultima_compra,
    this.recurrente,
    this.comercio,
    this.sistema,
    this.ci_nit,
    this.id_servicio,
    this.servicio,
    this.total,
    this.oid_ciudadano,
    this.fuec,
    this.nombres,
    this.apellidos,
    this.email,
    this.celular,
    this.direccion,
    this.items,
    this.tipoPer,
    this.nombRazFact,
    this.ciNitFact,
    this.correoFact
}

enviarDatosPagos.prototype.EnviarDatosPagos = function (functionResp14) {
  var dataParamsCemRegPagoOl = {
    "logueo": this.logueo,
    "fecha_ultima_compra": this.fecha_ultima_compra,
    "recurrente": this.recurrente,
    "comercio": this.comercio,
    "sistema": this.sistema,
    "ci_nit": this.ci_nit,
    "id_servicio": this.id_servicio,
    "servicio": this.servicio,
    "total": this.total,
    "oid_ciudadano": this.oid_ciudadano,
    "fuec": this.fuec,
    "nombres": this.nombres,
    "apellidos": this.apellidos,
    "email": this.email,
    "celular": this.celular,
    "direccion": this.direccion,
    "items": this.items,
    "tipoPer": this.tipoPer,
    "nombRazFact": this.nombRazFact,
    "ciNitFact": this.ciNitFact,
    "correoFact": this.correoFact
  };
  ejecutarAjaxCemDatosP(dataParamsCemRegPagoOl, functionResp14);
};

function ejecutarAjaxCemDatosP(vDataCall, vFunctionResp14) {
  $.ajax({
    type: "POST",
    url: urlBackEndPagosOL,
    data: vDataCall,
    async: false,
    success: function (response) {
      dataRespPagosOl = JSON.stringify(response);
      vFunctionResp14(dataRespPagosOl);
    },
    error: function (response, status, error) {
      dataRespPagosOl = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
      vFunctionResp14(dataRespPagosOl);
    }
  });
  return dataRespRegPago;
};