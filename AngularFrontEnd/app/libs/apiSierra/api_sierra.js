if(jsonURLS){
  var urlLoginSierra =  jsonURLS.SERVICE_SIERRAM+"apiLogin"; //crearTramiteDigital
  var urlCredenciales = jsonURLS.CREDENCIAL_MOTORESSIERRA;
}

function ejecutarAjaxTokenSierra() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: urlLoginSierra,
        data: urlCredenciales,
        async: false,
        success: function(response) {
            console.log('siiierrrrrr    ',response);
            dataResp = JSON.stringify(response);
            sessionStorage.setItem('TOKEN_SIERRA', response.token);
        },
        error: function(response, status, error) {
            dataResp = "{\"error\":{\"message\":\"" + response.responseText + "\",\"code\":700}}";
            console.log(dataResp);
        }
    });
}

function gLoginSierra() {};
gLoginSierra.prototype.login_sierra = function (functionResp) {
    ejecutarAjaxTokenSierra(functionResp);
};
