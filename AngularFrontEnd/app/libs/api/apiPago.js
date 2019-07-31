var dataResp;
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxToken(vFunctionResp) {
    $.ajax({
        dataType: "json",
        type: "POST",
        url : 'https://pagonline.lapaz.bo/api/logueo',
        data: {
            'usr_usuario'   : 'tecnico',
            'usr_clave'     : '123456'
        },
        async: false,
        success: function(response) {
            //sessionService.set('TOKEN', response.token);
            dataResp = JSON.stringify(response);
            sessionStorage.setItem("TOKEN", response.token);
            vFunctionResp(dataResp);
        },
        error: function (response, status, error) {
            dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        }
    });
    return dataResp;
};
/*///////////////////////////////////////////////// CREAR TRAMITE AE LINEA /////////////////////////////////*/
function gLogin() {};
gLogin.prototype.login = function (functionResp) {
    ejecutarAjaxToken(functionResp);    
};