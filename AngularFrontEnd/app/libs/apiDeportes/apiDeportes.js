

var urlCompSalud;
var dataResp;
var dataParams;
var typeCall;
var urlSalud = "";
if (jsonURLS) {
    var urlSalud = jsonURLS.CONEXION_API_PG_SALUD + "wsSalud";
    var urlSierra = jsonURLS.CONEXION_FACPUENTE;
    var urlDeportes = jsonURLS.CONEXION_DEPORTES_SIERRA;
    var urlPagos = jsonURLS.CONEXION_PAGOS_TARJETA;
}



function ejecutarAjaxCamposDeportivos(vurlCompSalud, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
        type: vTypeCall,
        url: urlDeportes + "/api" + vurlCompSalud,
        data: vDataCall,
        async: false,
        headers:{
            'Content-type': 'application/json'
        },
        success: function (response) {
            vFunctionResp(response);
        },
        error: function (response, status, error) {
            vFunctionResp(response);
        }
    });
    return dataResp;
};


function ejecutarAjaxCamposDeportivosV2(vurlCompSalud, vTypeCall, vDataCall, vtoken, vFunctionResp) {
    var header_ = {};
    if (vtoken != null) {
        header_ = {
            'authorization': 'Bearer ' + vtoken,
            'Content-type': 'application/json'
        }
    }    
    $.ajax({
        type: vTypeCall,
        url: urlDeportes + "/api" + vurlCompSalud,
        data: JSON.stringify(vDataCall),
        async: false,
        headers: header_,
        dataType: "json",
        success: function (response) {
            vFunctionResp(response);
        },
        error: function (response, status, error) {
            vFunctionResp(response);
        }
    });
    return dataResp;
};


function ejecutarAjaxSierra(vurlCompSalud, vTypeCall, vDataCall, vtoken, vFunctionResp) {
    var header_ = {};
    if (vtoken != null) {
        header_ = {
            'authorization': 'Bearer ' + vtoken,
            'Content-type': 'application/json'
        }
    }
    $.ajax({
        type: vTypeCall,
        url: urlDeportes + vurlCompSalud,
        data: vDataCall,

        headers: header_,
        dataType: "json",
        async: false,
        success: function (response) {
            console.log("response :: ", response);
            vFunctionResp(response);
        },
        error: function (response, status, error) {
            vFunctionResp(response);
        }
    });
    return dataResp;
};


function ejecutarAjaxPagos(vurlCompSalud, vTypeCall, vDataCall, vheaders, vFunctionResp) {
    $.ajax({
        type: vTypeCall,
        url: urlPagos + vurlCompSalud,
        data: vDataCall,
        dataType: "json",
        async: false,
        success: function (response) {
            vFunctionResp(response);
        },
        error: function (response, status, error) {
            vFunctionResp(response);
        }
    });
    return dataResp;
};


function ejecutarAjaxGeoServer(vurlCompSalud, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
        jsonp: false,
        jsonpCallback: 'getJson',
        type: 'GET',
        url: vurlCompSalud,
        async: false,
        dataType: 'jsonp',
        success: function (data) {
            vFunctionResp(data);

        },
        error: function (e) {
            vFunctionResp(e);
        }
    });

    return dataResp;
};


/*
 * canchas deportivas
 */

function getCanchaDeportiva() {
    this.canchaId
}
getCanchaDeportiva.prototype.cancha = function (functionResp) {
    urlCompSalud = "/cancha-deportiva/" + this.canchaId;
    typeCall = "get";
    dataParams = {

    };
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};


function CamposDep() {
    this.macrodistritoId
}
CamposDep.prototype.lstcamposDeportivos = function (functionResp) {
    urlCompSalud = "/campos-deportivos";
    typeCall = "post";
    dataParams = {
        "macrodistritoId": this.macrodistritoId
    };
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};


function CanchasDep() {
    this.id;
    this.suc;
}
CanchasDep.prototype.lstcanchasDeportivos = function (functionResp) {
    urlCompSalud = "/cancha-deportiva";
    typeCall = "post";
    dataParams = {
        "idSuc": this.suc,
        "idCamDep": this.id
    };
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};


//Horarios
function listarHorarios() {
    this.idCanchaDep;
    this.xfechareserv;
}
listarHorarios.prototype.lstHorariosTodos = function (functionResp) {
    urlCompSalud = "/horariosCanchaDep";
    typeCall = "post";
    dataParams = {
        idCanchaDep: this.idCanchaDep,
        xfechareserv: this.xfechareserv,
    };

    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};

function macrodistritos() {

}
macrodistritos.prototype.macros = function (functionResp) {
    urlCompSalud = "/macrodistritos";
    typeCall = "post";
    dataParams = {};
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};




// RESERVA CANCHA DEPORTIVA
function listaSucurl() {
    this.data;
}
listaSucurl.prototype.listarSucursal = function (functionResp) {
    urlCompSalud = "/campoDeportSucursal";
    typeCall = "post";
    dataParams = this.data;
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};

function lstHoraActual() {
}
lstHoraActual.prototype.listaHoraActual = function (functionResp) {
    urlCompSalud = "/fechaActual-Hora";
    typeCall = "post";
    dataParams = {};
    ejecutarAjaxCamposDeportivos(urlCompSalud, typeCall, dataParams, functionResp);
};


// RESERVA CANCHA DEPORTIVA
function reservaCanchaDep() {
    this.data;
    this.token
}
reservaCanchaDep.prototype.canchaDep = function (functionResp) {
    urlCompSalud = "/registrar-reserva";
    typeCall = "post";
    dataParams = this.data;
    ejecutarAjaxCamposDeportivosV2(urlCompSalud, typeCall, dataParams, this.token, functionResp);
};

function listarAlquileres() {
    this.userId;
    this.token
}
listarAlquileres.prototype.lstalquileresUsr = function (functionResp) {
    urlCompSalud = "/listar-alquileres-pagados";
    typeCall = "post";
    dataParams = {
        userId: this.userId
    };
    ejecutarAjaxCamposDeportivosV2(urlCompSalud, typeCall, dataParams, this.token, functionResp);
};


// token sierra
function getTokenSierra() {
    this.usr_usuario;
    this.usr_clave;
}
getTokenSierra.prototype.tokenSierra = function (functionResp) {
    urlCompSalud = "/apiLogin";
    typeCall = "post";
    dataParams = {
        usr_usuario: this.usr_usuario,
        usr_clave: this.usr_clave,      
    };
    token = null;

    ejecutarAjaxSierra(urlCompSalud, typeCall, dataParams, token, functionResp);
};


// GENERA ODM
function generacionODM() {
    this.data;
    this.token

}
generacionODM.prototype.generacion = function (functionResp) {
    urlCompSalud = "/v.0.1/sierra/generacion_ODM";
    typeCall = "post";
    dataParams = JSON.stringify(this.data);
    ejecutarAjaxSierra(urlCompSalud, typeCall, dataParams, this.token, functionResp);
    
};



// login Pagos
function loginPagos() {

}
loginPagos.prototype.login = function (functionResp) {
    urlCompSalud = "api/logueo";
    typeCall = "post";
    dataParams = {
        usr_usuario: "tecnico",
        usr_clave: "123456"
    };
    headers = {  
        'Content-type': 'application/json'
    };

    ejecutarAjaxPagos(urlCompSalud, typeCall, dataParams, headers, functionResp);
};

// registrar pago
function registrarPago() {
    this.data;
}
registrarPago.prototype.regPago = function (functionResp) {
    urlCompSalud = "/api/registrarTrx";
    typeCall = "post";
    dataParams = this.data;
    headers = {
    };

    ejecutarAjaxPagos(urlCompSalud, typeCall, dataParams, headers, functionResp);
};


function geoServer() {

}
geoServer.prototype.campDep = function (functionResp) {
    urlCompSalud = "http://gmlpsr0204/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:camposdeportivos&srsName=EPSG:4326&outputFormat=text/javascript&format_options=callback:getJson&CQL_FILTER=Administracion%09%3D%20'DIRECCION%20DE%20DEPORTES'";
    typeCall = "get";
    dataParams = {

    };
    ejecutarAjaxGeoServer(urlCompSalud, typeCall, dataParams, functionResp);
};

