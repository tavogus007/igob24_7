var urlSitram = "http://192.168.34.70:91/wsSitram";//crearTramiteDigital
var urlComp;
var dataResp;
var dataParams;
var typeCall;

/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxSitram(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlSitram + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        console.log(response);
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

function validarDocumento(documento) {
    if( typeof(documento) != 'undefined' && documento != null && documento != "" && documento.slice(-1) == "-" ){ 
        return false 
    }
    else { 
        if (/^([0-9\-])*$/.test(documento)) { return true } else { return false }
    }
};

function validarTramitesitram(opcion, datos) {
    switch(opcion)
    {
      case "NEW": 
        /*if( 
          ( typeof(datos.datos_dinamicos) != 'undefined' && datos.datos_dinamicos != null && datos.datos_dinamicos != "") &&
          ( typeof(datos.tipo_tramite) != 'undefined' && datos.tipo_tramite != null && datos.tipo_tramite != "") &&
          ( typeof(datos.sub_tipoTramite_id) != 'undefined' && datos.sub_tipoTramite_id != null && datos.sub_tipoTramite_id != "") &&
          ( typeof(datos.tipo_hoja_tuta) != 'undefined' && datos.tipo_hoja_tuta != null && datos.tipo_hoja_tuta != "") &&
          ( typeof(datos.correlativo) != 'undefined' && datos.correlativo != null && datos.correlativo != "") &&
          ( typeof(datos.hoja_asunto) != 'undefined' && datos.hoja_asunto != null && datos.hoja_asunto != "") &&
          ( typeof(datos.descrip_fojas) != 'undefined' && datos.descrip_fojas != null && datos.descrip_fojas != "") &&
          ( typeof(datos.fojas) != 'undefined' && datos.fojas != null && datos.fojas != "") &&
          ( typeof(datos.nodo_origen) != 'undefined' && datos.nodo_origen != null && datos.nodo_origen != "") &&
          ( typeof(datos.nodo_id) != 'undefined' && datos.nodo_id != null && datos.nodo_id != "") &&
          ( typeof(datos.usuario) != 'undefined' && datos.usuario != null && datos.usuario != "") &&
          ( typeof(datos.estado) != 'undefined' && datos.estado != null && datos.estado != "") &&
          ( typeof(datos.actdetalle) != 'undefined' && datos.actdetalle != null && datos.actdetalle != "") )
        {
            return true
        }*/
        return true
        break;
      case "DEL": 
        return false
        break;

      return false
    }
};

rcTramitesitram.prototype.crearTramitesitram = function (functionResp)
{
    urlComp = "/crearTramite";
    typeCall = "post";

    if(validarTramitesitram("NEW", this))
    {
        dataParams = {
          "datos_dinamicos": this.datos_dinamicos,
          "tipo_tramite": this.tipo_tramite,
          "sub_tipoTramite_id": this.sub_tipoTramite_id,
          "tipo_hoja_tuta": this.tipo_hoja_tuta,
          "correlativo": this.correlativo,
          "hoja_asunto": this.hoja_asunto,
          "descrip_fojas": this.descrip_fojas,
          "fojas": this.fojas,
          "nodo_origen": this.nodo_origen,
          "nodo_id": this.nodo_id,
          "usuario": this.usuario,
          "estado": this.estado,
          "actdetalle": this.actdetalle
        };
        console.log("PARAEMTRSO...:",dataParams);
        ejecutarAjaxSitram(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
        dataResp = "{\"error\":{\"message\":\"Uno o varios campos obligatorios vacios\",\"code\":702}}";
        functionResp(dataResp);
    }
};

function rcTramitesitram(){
    
    this.datos_dinamicos;
    this.tipo_tramite;
    this.sub_tipoTramite_id;
    this.tipo_hoja_tuta;
    this.correlativo;
    this.hoja_asunto;
    this.descrip_fojas;
    this.fojas;
    this.nodo_origen;
    this.nodo_id;
    this.usuario;
    this.estado;
    this.actdetalle;
};



/*///////////////////////////////////////////////// CREAR TRAMITE sitram 17/03/2020 /////////////////////////////////*/

function gCrearCasoSitramEnLinea() {
    this.datos;
    this.tipo_tramite;
    this.sub_tipo_tramite;
    this.tipo_hr;
    this.correlativo;
    this.hoja_asunto;
    this.desc_fojas;    
    this.fojas;
    this.nodo_origen;
    this.nodo_id;
    this.usuario;
    this.estado;
};
gCrearCasoSitramEnLinea.prototype.crearCasoEnLineaSitram = function (functionResp) {
    urlComp = "/crearTramiteDigital";
    typeCall = "post";
    dataParams = {
      "datodinamico": this.datos,
      "tipotramite": this.tipo_tramite,
      "subtipotramite": this.sub_tipo_tramite,
      "tipohojaruta": this.tipo_hr,
      "correlativo": this.correlativo,
      "hojaasunto": this.hoja_asunto,
      "descripcionfojas": this.desc_fojas,
      "fojas": this.fojas,
      "nodoorigen": this.nodo_origen,
      "nodoid": this.nodo_id,
      "usuario": this.usuario,
      "estado": this.estado
    };
    ejecutarAjaxSitram(urlComp, typeCall, dataParams, functionResp);
};