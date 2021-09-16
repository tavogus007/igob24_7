/*var urlLogin = "http://23.96.28.144:90/wsRC";*/
/*var urlCaptcha = "http://23.96.28.144:90/wsRCPG";*/
var urlLogin = "";
var urlCaptcha = "";
var urlComLogin;
var dataRespLogin;
var dataParamsLogin;
var typeCallLogin;

if(jsonURLS){
    urlLogin = jsonURLS.CONEXION_API_PG_RC + "wsRCIgob";
    urlCaptcha = jsonURLS.CONEXION_API_PG_RC + "wsRCPG";
}

function ejecutarAjaxLoginRc(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlLogin + vUrlComp,
      data: vDataCall,
      async: true,
      success: function(response) {
        dataRespLogin = JSON.stringify(response);
        vFunctionResp(dataRespLogin);
      },
      error: function (response, status, error) {        
        dataRespLogin = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataRespLogin);
      }
    });
    return dataRespLogin;
};
function ejecutarAjaxCaptcha(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    token = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlCaptcha + vUrlComp,
      data: vDataCall,
      async: false,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: function(response) {
        dataRespLogin = JSON.stringify(response);
        vFunctionResp(dataRespLogin);
      },
      error: function (response, status, error) {        
        dataRespLogin = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        vFunctionResp(dataRespLogin);
      }
    });
    return dataRespLogin;
};

function loginNode() {
    this.usuario;
    this.pin;
};

loginNode.prototype.iniciarLogin = function (functionResp) {
    urlComLogin = "/login";
    typeCallLogin = "post";
    dataParamsLogin = {
        "usuario":this.usuario,
        "pin":this.pin
    };
    ejecutarAjaxLoginRc(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

function loginNodeApp() {
    this.soid;
};

loginNodeApp.prototype.iniciarLoginApp = function (functionResp) {
    urlComLogin = "/loginApp";
    typeCallLogin = "post";
    dataParamsLogin = {
        "soid":this.soid
    };
    ejecutarAjaxLoginRc(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};


loginNode.prototype.iniciarLoginFG = function (functionResp) {
    urlComLogin = "/loginOut";
    typeCallLogin = "post";
    dataParamsLogin = {
        "correo":this.correo
    };
    ejecutarAjaxLoginRc(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

function password() {
    this.usuario;
    this.correo;
};

password.prototype.resetPass = function (functionResp) {
    urlComLogin = "/recuperarPIN";
    typeCallLogin = "post";
    dataParamsLogin = {
        "usuario":this.usuario,
        "correo":this.correo
    };
    ejecutarAjaxLoginRc(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

function captcha() {
    this.res;
};

captcha.prototype.obtcaptcha = function (functionResp) {
    urlComLogin = "/getcaptcha";
    typeCallLogin = "post";
    dataParamsLogin = {};
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

captcha.prototype.verificarCaptcha = function (functionResp) {
    urlComLogin = "/verificarCaptcha";
    typeCallLogin = "post"; dataParamsLogin = {
        "identificador":this.identificador,
        "respuesta":this.respuesta
    };
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};


function idiomaPlat() {
    this.idioma;
};

idiomaPlat.prototype.obtenerTitulos = function (functionResp) {
    urlComLogin = "/getTitulos";
    typeCallLogin = "post"; 
    dataParamsLogin = {
        "filtro" : this.idioma
    };
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

idiomaPlat.prototype.obtenerContenidos = function (functionResp) {
    urlComLogin = "/getContenidos";
    typeCallLogin = "post"; 
    dataParamsLogin = {
        "filtro" : this.idioma
    };
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

idiomaPlat.prototype.obtenerImagenes = function (functionResp) {
    urlComLogin = "/getImagenes";
    typeCallLogin = "post"; 
    dataParamsLogin = {
        "filtro" : this.idioma
    };
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};

idiomaPlat.prototype.obtenerMensajes = function (functionResp) {
    urlComLogin = "/getMensajes";
    typeCallLogin = "post"; 
    dataParamsLogin = {
        "filtro" : this.idioma
    };
    ejecutarAjaxCaptcha(urlComLogin, typeCallLogin, dataParamsLogin, functionResp);    
};


