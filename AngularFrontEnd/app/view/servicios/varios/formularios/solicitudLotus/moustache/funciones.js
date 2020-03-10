var dataIgob = JSON.parse( sessionStorage.getItem('tramiteIgob'));
dataIgob['g_usuario'] = sessionStorage.getItem('US_NOMBRE') + " " + sessionStorage.getItem('US_PATERNO') + " " + sessionStorage.getItem('US_MATERNO');
dataIgob['g_oid'] = sessionStorage.getItem('IDUSUARIO');
dataIgob['g_sistema'] = "IGOB 24_7";
var jsonError = "";
var valoresOC = new Array();
var valoresOM = new Array();
posicion = 0;
tabOrder = 1;
var fechaactualh = new fechaserver();
fechaactualh.obtfechahora(function(resultado){
    sfecha  =   JSON.parse(resultado).success.fecha;
    dataIgob['g_fecha'] =  sfecha;
});
document.getElementById("senddata").disabled = true;
function validarFormularioRender() {
    var todoCorrecto = true;
    campos = "";
    for (var i = 0; i < valoresOC.length; i++) {
        //console.log(document.frmCiudadano.elements[valoresOC[i]].value);
        if (document.frmCiudadano.elements[valoresOC[i]].value == null || document.frmCiudadano.elements[valoresOC[i]].value.length == 0 || /^\s*$/.test(document.frmCiudadano.elements[valoresOC[i]].value) || ( document.frmCiudadano.elements[valoresOC[i]].type == "select-one" && document.frmCiudadano.elements[valoresOC[i]].value == "-1" )){
            todoCorrecto=false;
            campos = campos + valoresOM[i] + ", ";
        }
    }
    if (todoCorrecto ==true) {
        guardarData();
    } else {
        campos = campos.substring(0, campos.length - 2);
        swal("CAMPOS OBLIGATORIOS", campos, "error");
    }
}
function guardarData () {
    var dataFrm = document.frmCiudadano.elements;
    try{
        if(dataFrm.length > 0 ) {
            for (var i = 0; i < dataFrm.length; i++) {
                valorCampo = dataFrm[i].value;
                nombreCampo = dataFrm[i].id;
                tipo = dataFrm[i].type;
                //dataIgob[nombreCampo] = valorCampo;
                if (document.getElementById(nombreCampo+"_ifr")){
                    var iFrame =  document.getElementById(nombreCampo+"_ifr");
                    var iFrameBody;
                    if ( iFrame.contentDocument )
                    { // FF
                        iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
                        valorCampo = iFrameBody.outerHTML;
                        quitarComillas = new RegExp('"', "g");
                        valorCampo = valorCampo.replace(quitarComillas,"'");
                    }
                    else if ( iFrame.contentWindow )
                    { // IE
                        iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
                        valorCampo = iFrameBody.outerHTML;
                        quitarComillas = new RegExp('"', "g");
                        valorCampo = valorCampo.replace(quitarComillas,"'");
                    }
                } 
                if (nombreCampo && tipo != 'button'){
                    if(tipo == 'select-one'){
                        var campoSelect = document.getElementById(nombreCampo);
                        var valor = campoSelect.options[campoSelect.selectedIndex].text;
                        dataIgob[nombreCampo+'_VALOR'] = valor;
                    }
                    dataIgob[nombreCampo] = valorCampo;
                }
            }
            //console.log("dataIgob" , dataIgob);
            try {
                var datosSerializados = JSON.stringify(dataIgob);
                var idCiudadano         = sessionStorage.getItem('IDSOLICITANTE');
                var idTramite           = sessionStorage.getItem('IDTRAMITE');
                var idServicio          = sessionStorage.getItem('IDSERVICIO');
                var Parametros = new datosFormularios();
                Parametros.frm_tra_dvser_id = idServicio;
                Parametros.data_json = datosSerializados;
                Parametros.frm_tra_id_ciudadano = idCiudadano;
                Parametros.frm_tra_id_usuario = 1;
                Parametros.frm_idTramite = idTramite;
                Parametros.sp_crear_datos_formulario_sitram(function(results){
                    results = JSON.parse(results);
                    results = results.success;                    
                    if(results.length > 0){
                        alertify.success("Formulario almacenado");
                        //swal("¡Bien!", "Formulario almacenado", "success");
                        document.getElementById("senddata").disabled = false;
                    }else{
                        swal("ERROR ", "Formulario NO almacenado", "error");
                    }
                }); 
            } catch(e) {
                console.log("Error..",e);
            }
        }
    } catch(e) {
        console.log('error', e);
    }
}
function validarFrmProcesos (){
    var idTramite = sessionStorage.getItem('IDTRAMITE');
    idUsuario = sessionStorage.getItem('IDUSUARIO');
    nroTramiteEnviado = sessionStorage.getItem('NROTRAMITE');
    idUsuario = 4;
    try {
        var idTramite = sessionStorage.getItem('IDTRAMITE');
        nroTramiteEnviado = sessionStorage.getItem('NROTRAMITE');
        idUsuario = 4; 
        var tramiteIgob = new datosFormularios();
        tramiteIgob.frm_idTramite = idTramite;
        tramiteIgob.frm_tra_enviado = 'SI';
        tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
        tramiteIgob.frm_tra_id_usuario = idUsuario;
        tramiteIgob.validarFormProcesos(function(resultado){
            swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente", "Su número de Trámite es: " + nroTramiteEnviado + "\n", "success");
            angular.element(document.getElementById("id_serviciosLotusController")).scope().tramitesCiudadano();
            $('#botones').hide();
            document.getElementById("senddata").disabled = true;
            document.getElementById("savedata").disabled = true;
        });
    } catch (errorValidar){
        console.log("Error : ", errorValidar);
        swal("ERROR!", "Registro no modificado", "error");
    }
};


function validarEnvioTramite (){
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud es una Declaración Jurada, generará todos los derechos y obligaciones establecidas por ley.\n¿Se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function(){
                enviarData();
            }, 1000);
        });
};

function enviarData() {
    nroDatos = JSON.stringify(dataIgob).length;
    if (nroDatos > 2){
        var datosSerializados = JSON.stringify(dataIgob);
        var idProcodigo = 'SITR@M-';
        var crearCaso   =   new gCrearCasoSitram();
        /*crearCaso.usr_id    = 1;
        crearCaso.datos     = datosSerializados;
        crearCaso.procodigo = idProcodigo;
        crearCaso.tipoTramite = document.getElementById('POC_TIPO_TRAMITE').value;
        console.log(document.getElementById('POC_SUBTIPO_TRAMITE').value)
        crearCaso.subtipoTramite = ((typeof(document.getElementById('POC_SUBTIPO_TRAMITE').value) == 'undefined' || document.getElementById('POC_SUBTIPO_TRAMITE').value == null || document.getElementById('POC_SUBTIPO_TRAMITE').value == "NaN" || document.getElementById('POC_SUBTIPO_TRAMITE').value == "") ? 0   : parseInt(document.getElementById('POC_SUBTIPO_TRAMITE').value));
*/
        crearCaso.proid = 73;
        crearCaso.actid = 599;
        crearCaso.usr_id = 0;
        crearCaso.datos = datosSerializados;
        crearCaso.procodigo = idProcodigo;
        crearCaso.macro_id = 0;
        crearCaso.nodo_id = 1628;
        crearCaso.tipo_tramite = document.getElementById('POC_TIPO_TRAMITE').value;
        crearCaso.fojas = 0;
        crearCaso.desc_fojas = 0;
        crearCaso.crearCasoAeLineaSitram(function(response){
            try {
                response    =   JSON.parse(response);
                var results = response.success.data[0];
                indice = 0;
                datosIF2 = results.casoid;
                nrotramitec = results.casonro;
                sessionStorage.setItem('NROTRAMITE', nrotramitec);
                sessionStorage.setItem('NROTRAMITEID', datosIF2);
                sessionStorage.setItem('IDPROCESO', results.procid);
                var idTramite1 =  sessionStorage.getItem('NROTRAMITEID') ;
                dataIgob['POC_UIDHISTO'] = results.casodata.POC_UID;
                guardarData(); 
                ocultarFormulario();
                try{
                    validarFrmProcesos();
                }catch(e){}
            } catch(error){
                    console.log("falla: ", error);
                    swal("ERROR", "conexion fallida ", "error");
            }
        });
    } else {
        swal("ERROR", "Formulario sin datos ", "error");
    }
}
function ocultarFormulario(id){
    frm = document.forms['frmCiudadano']; 
    for(i=0; ele=frm.elements[i]; i++) {
        ele.disabled=true;
    }
    $('.mce-tinymce').addClass("disabledbutton");
}
function f_oculta_div(id){
    if (document.getElementById){
        try{
            var el = document.getElementById(id.trim());
            el.style.display = 'none';
        }catch(e){
            var serror  = "ADVERTENCIA DE CAMPO METODO: f_oculta_div - " +  id + ":" + e.toString();
            jsonError   =   jsonError   +   serror +    "<br>";
        }
    }
}
function f_muestra_div(id){
    if (document.getElementById){
        try{
            var el = document.getElementById(id.trim());
            el.style.display = 'block';
        }catch(e){
            var serror  = "ADVERTENCIA DE CAMPO METODO: f_muestra_div - " +  id + ":" + e.toString();
            jsonError   =   jsonError   +   serror +    "<br>";
        }
    }
}
function f_obtener_valor(id){
    if (document.getElementById){
        try{
        var val = document.getElementById(id.trim()).value;
        }catch(e){
            console.log("Error de comportamiento:", id);
            var serror  = "ADVERTENCIA DE CAMPO METODO: f_obtener_valor - " +  id + ":" + e.toString();
            jsonError   =   jsonError   +   serror +    "<br>";
        }
        return val;
    }
}
function f_asignar_valor(id, valor){
    if (document.getElementById){
        try{
        document.getElementById(id.trim()).value = valor;
        }catch(e){
            console.log("Error de comportamiento:", id);
            var serror  = "ADVERTENCIA DE CAMPO METODO: f_asignar_valor - " +  id + ":" + e.toString();
            jsonError   =   jsonError   +   serror +    "<br>";
        }
        return val;
    }
}
function f_obtener_valor_chkm(id){
    if (document.getElementById){
        var srespuesta  =   "";
        try{
            var val = document.getElementById(id.trim());
            var schecks =   $('input:checkbox[id="' + id + '"]:checked');
            var ItemArray = [];
            $.each(schecks, function (cont, data){
                ItemArray.push({
                    nombre : data.value,
                    valor: data.checked
                });
            });
            srespuesta  =   JSON.stringify(ItemArray);
        }catch(e){
            console.log("Error de comportamiento:", id);
            var serror  = "ADVERTENCIA DE CAMPO METODO: f_obtener_valor - " +  id + ":" + e.toString();
            jsonError   =   jsonError   +   serror +    "<br>";
        }
        return srespuesta;
    }
}
function f_obtener_texto(id){
    try{
        var combo = document.getElementById(id.trim());
        var selected = combo.options[combo.selectedIndex].text;
        document.getElementById(id+'_VALOR').value = selected;
        //console.log(selected);
    }catch(e){
        var serror  = "ADVERTENCIA DE CAMPO METODO: f_obtener_texto - " +  id + ":" + e.toString();
        jsonError   =   jsonError   +   serror +    "<br>";
    }
}