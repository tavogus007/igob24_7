if(jsonURLS){
    //var urlLoginSierra =  jsonURLS.CONEXION_MOTOR_SERVICIO+"motorservicio_pruebas/public/api/apiLogin"; //DESCOMENTAR ESTA LINEA UNA VEZ PUESTO EN PRODUCCION
    var urlLoginSierra =  jsonURLS.SERVICE_SIERRAM+"apiLogin";//COMENTAR ESTA LINEA UNA VEZ PUESTO EN PRODUCCION
    var urlCredenciales = jsonURLS.CREDENCIAL_MOTORES;
}


function ejecutarAjaxTokenSierra() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: urlLoginSierra,
        data: urlCredenciales,
        async: false,
        success: function(response) {
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
