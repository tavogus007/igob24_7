//var urlRC = "http://23.96.28.144:90/wsRC";
//var urlRCPG = "http://23.96.28.144:90/wsRCPG";
var urlRC   = "";//"http://192.168.5.141:9098/wsRC";
var urlRCPG = "";//"http://192.168.5.141:9098/wsRCPG";
var urlMservicio    =    "";//"http://192.168.5.69/api/reglaNegocio/ejecutarWeb";

//var urlMservicio="http://localhost:9000/api/reglaNegocio/ejecutarWeb";
//var urlRCPG = "http://192.168.35.84:9098/wsRCPG";

var urlComp;
var dataResp;
var dataParams;
var typeCall;

if(jsonURLS){
    urlRC = jsonURLS.CONEXION_API_PG_RC + "wsRCIgob";
    urlRCPG = jsonURLS.CONEXION_API_PG_RC + "wsRCPG";
    ///////////////////////ARBOLADO////////////////////////////
    urlRCPG_A = jsonURLS.CONEXION_API_PG_RC_A + "wsRCPG";
    ///////////////////////////////////////////////////////////
    urlMservicio    =   jsonURLS.CONEXION_MOTOR_SERVICIO + "api/reglaNegocio/ejecutarWeb";
    key = jsonURLS.KEY;
}

//////////////////////////////////////////EJECUTAR AJAX TOKEN ///////////////////////////////////////////////////////
function ejecutarAjaxP(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
  var headers = {};
  $.ajax({
    type: vTypeCall,
    url: urlRC + vUrlComp,
    data: vDataCall,
    //dataType: "json",
    async: false,
    headers: {
      'authorization': token
    }, 
    success: function(response) {
      dataResp = response;
      dataResp = CryptoJS.AES.decrypt(dataResp, key);
      dataResp =  dataResp.toString(CryptoJS.enc.Utf8);
      //console.log(dataResp,'dataResp');
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
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjax(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    token = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlRC + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      //processData: true,
      success: function(response) {
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

function ejecutarAjax1(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    token = sessionStorage.getItem('TOKEN_API');
    $.ajax({
      type: vTypeCall,
      url: urlRCPG + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      //processData: true,
      success: function(response) {
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

//////////////////////////////ARBOLADO///////////////////////////////////////////////////
function ejecutarAjax_A(vUrlComp, vTypeCall, vDataCall, vFunctionResp) {
    $.ajax({
      type: vTypeCall,
      url: urlRCPG_A + vUrlComp,
      data: vDataCall,
      //dataType: "json",
      async: false,
      //processData: true,
      success: function(response) {
        dataResp = JSON.stringify(response);
        console.log("AAAAAAAAAAAAAAAAAAAAA...",dataResp);
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
////////////////////////////////////////////////////////////////////////////////////////

function ejecutarAjaxMServicio(vUrlComp, vTypeCall, vDataCall, vFunctionResp,token) {
    var headers = {};
    $.ajax({
      url: urlMservicio,
      data: vDataCall,
      type:"POST",
      dataType: "json",
      //crossDomain : true,
      headers: {
         'authorization': token
      },
      success: function(response) {
        dataResp = JSON.stringify(response);
        vFunctionResp(dataResp);
      },
      error: function (response, status, error) {
        dataResp = "{\"error\":{\"message\":\""+response+"\",\"code\":700}}";
        console.log("error",dataResp);
        vFunctionResp(dataResp);
      }
    });
    return dataResp;
};

///////////////////////modifica imagen///////////////////////////
function modificaPerfil(){
    this.URL;
    this.oid;
}

modificaPerfil.prototype.modificaPerfilImagen = function (functionResp)
{
    urlComp = "/updateImgPerfil/" + this.oid;
    typeCall = "put";
    dataParams = {
      "URL": ((typeof(this.URL) == 'undefined' || this.URL == null) ? "" : this.URL.toString()),
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};


/*///////////////////////////////////////////////// VALIDAR CAMPOS /////////////////////////////////////////////////*/
function validarDocumento(documento) {
    if( typeof(documento) != 'undefined' && documento != null && documento != "" && documento.slice(-1) == "-" ){
        return false
    }
    else {
        if (/^([0-9\-])*$/.test(documento)) { return true } else { return false }
    }
};

function validarNatural(opcion, datos) {
    switch(opcion)
    {
      case "NEW":
        if( ( typeof(datos.nombre) != 'undefined' && datos.nombre != null && datos.nombre != "") &&
            ( typeof(datos.materno) != 'undefined' && datos.materno != null && datos.materno != "") &&
            ( typeof(datos.ci) != 'undefined' && datos.ci != null && datos.ci != "") &&
            ( typeof(datos.expedido) != 'undefined' && datos.expedido != null && datos.expedido != "") &&
            ( typeof(datos.fec_nacimiento) != 'undefined' && datos.fec_nacimiento != null && datos.fec_nacimiento != "") &&
            ( typeof(datos.lugar_nacimiento) != 'undefined' && datos.lugar_nacimiento != null && datos.lugar_nacimiento != "") &&
            ( typeof(datos.sexo) != 'undefined' && datos.sexo != null && datos.sexo != "") &&
            ( typeof(datos.id_estado_civil) != 'undefined' && datos.id_estado_civil != null && datos.id_estado_civil != "") &&
            ( typeof(datos.profesion) != 'undefined' && datos.profesion != null && datos.profesion != "") )
        {
            return true
        }
        break;

      case "UPD":
        if( ( typeof(datos.nombre) != 'undefined' && datos.nombre != null && datos.nombre != "") &&
            ( typeof(datos.materno) != 'undefined' && datos.materno != null && datos.materno != "") &&
            ( typeof(datos.ci) != 'undefined' && datos.ci != null && datos.ci != "") &&
            ( typeof(datos.expedido) != 'undefined' && datos.expedido != null && datos.expedido != "") &&
            ( typeof(datos.fec_nacimiento) != 'undefined' && datos.fec_nacimiento != null && datos.fec_nacimiento != "") &&
            ( typeof(datos.lugar_nacimiento) != 'undefined' && datos.lugar_nacimiento != null && datos.lugar_nacimiento != "") &&
            ( typeof(datos.sexo) != 'undefined' && datos.sexo != null && datos.sexo != "") &&
            ( typeof(datos.id_estado_civil) != 'undefined' && datos.id_estado_civil != null && datos.id_estado_civil != "") &&
            ( typeof(datos.profesion) != 'undefined' && datos.profesion != null && datos.profesion != "")

            // ( typeof(datos.pais) != 'undefined' && datos.pais != null && datos.pais != "") &&
            // ( typeof(datos.departamento) != 'undefined' && datos.departamento != null && datos.departamento != "") &&
            // ( typeof(datos.provincia) != 'undefined' && datos.provincia != null && datos.provincia != "") &&
            // ( typeof(datos.municipio) != 'undefined' && datos.macrodistrito != null && datos.macrodistrito != "") &&
            // ( typeof(datos.macrodistrito) != 'undefined' && datos.profesion != null && datos.profesion != "") &&
            // ( typeof(datos.distrito) != 'undefined' && datos.distrito != null && datos.distrito != "") &&
            // ( typeof(datos.zona) != 'undefined' && datos.zona != null && datos.zona != "") &&
            // ( typeof(datos.tipo_via) != 'undefined' && datos.tipo_via != null && datos.tipo_via != "") &&
            // ( typeof(datos.nombre_via) != 'undefined' && datos.nombre_via != null && datos.nombre_via != "")
            )
        {
            return true
        }
        break;

      case "DEL":
        return false
        break;

      return false
    }
};


function validarJuridico(opcion, datos) {
    switch(opcion)
    {
      case "NEW":
        if( ( typeof(datos.nit) != 'undefined' && datos.nit != null && datos.nit != "")
            // ( typeof(datos.razonSocial) != 'undefined' && datos.razonSocial != null && datos.razonSocial != "") &&
            // ( typeof(datos.ci_representante) != 'undefined' && datos.ci_representante != null && datos.ci_representante != "") &&
            // ( typeof(datos.poder_replegal) != 'undefined' && datos.poder_replegal != null && datos.poder_replegal != "") &&
            // ( typeof(datos.nro_notaria) != 'undefined' && datos.nro_notaria != null && datos.nro_notaria != "")
          )
        {
            return true
        }
        break;

      case "UPD":
        if( ( typeof(datos.nit) != 'undefined' && datos.nit != null && datos.nit != "") &&
            ( typeof(datos.razonSocial) != 'undefined' && datos.razonSocial != null && datos.razonSocial != "") &&
            ( typeof(datos.ci_representante) != 'undefined' && datos.ci_representante != null && datos.ci_representante != "") &&
            ( typeof(datos.poder_replegal) != 'undefined' && datos.poder_replegal != null && datos.poder_replegal != "") &&
            ( typeof(datos.nro_notaria) != 'undefined' && datos.nro_notaria != null && datos.nro_notaria != "")&&

            ( typeof(datos.pais) != 'undefined' && datos.pais != null && datos.pais != "")&&
            ( typeof(datos.departamento) != 'undefined' && datos.departamento != null && datos.departamento != "")&&
            ( typeof(datos.provincia) != 'undefined' && datos.provincia != null && datos.provincia != "")&&
            ( typeof(datos.municipio) != 'undefined' && datos.municipio != null && datos.municipio != "")&&
            ( typeof(datos.macrodistrito) != 'undefined' && datos.macrodistrito != null && datos.macrodistrito != "")&&
            ( typeof(datos.distrito) != 'undefined' && datos.distrito != null && datos.distrito != "")&&
            ( typeof(datos.zona) != 'undefined' && datos.zona != null && datos.zona != "")&&
            ( typeof(datos.tipo_via) != 'undefined' && datos.tipo_via != null && datos.tipo_via != "")&&
            ( typeof(datos.nombre_via) != 'undefined' && datos.nombre_via != null && datos.nombre_via != "") )
        {
            return true
        }
        break;

      case "DEL":
        return false
        break;

      return false
    }
};

////////////////////////////////////////////PROFESION///////////////////////////
function rcProfesion() {
};
rcProfesion.prototype.getProfesiones = function (functionResp)
{

      urlComp = "/getProfesiones";
      typeCall = "post";
      dataParams = {
      };

      ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);

};
/*///////////////////////////////////////////////// LOGUIN /////////////////////////////////////////////////*/
function rcLoguin() {
    this.usuario;
    this.pin;
};

rcLoguin.prototype.loguinDatosNatural = function (functionResp)
{
    if(validarDocumento(this.usuario))
    {
      urlComp = "/loguin";
      typeCall = "post";
      dataParams = {
        "usuario":  this.usuario,
        "pin": this.pin
      };

      ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
      dataResp = "{\"error\":{\"message\":\"usuario con formato incorrecto\",\"code\":701}}";
      functionResp(dataResp);
    }
};

/*///////////////////////////////////////////////// NATURAL /////////////////////////////////////////////////*/
function rcNatural(){
    this.nombre;
    this.paterno;
    this.materno;
    this.tercer_apellido;
    this.ci;
    this.complemento;
    this.expedido;
    this.fec_nacimiento;
    this.lugar_nacimiento;
    this.pais_origen;
    this.sexo;
    this.id_estado_civil;
    this.profesion;
    this.otra_profesion;
    this.telefono;
    this.movil;
    this.correo;
    this.direccion;

    this.pais;
    this.departamento;
    this.provincia;
    this.municipio;
    this.macrodistrito;
    this.macrodistrito_desc;
    this.distrito;
    this.distrito_desc;
    this.zona;
    this.zona_desc;
    this.tipo_via;
    this.nombre_via;
    this.numero_casa;
    this.edificio;
    this.bloque;
    this.piso;
    this.oficina;
    this.latitud;
    this.longitud;
    this.usr_id;
    this.activacionf;
    this.activaciond;
    this.file_fotocopia_ci;
    this.file_fotocopia_ci_r;
    this.fec_vencimiento;
    this.verificado;
    this.file_factura_luz;
    this.URL;
    this.oid;
    this.pinAnterior;
    this.pinNuevo;
    this.pin;
    this.tipo_documento;

};

rcNatural.prototype.buscarPersona = function (functionResp)
{
    urlComp = "/buscarPersona";
    typeCall = "post";
    dataParams = {
      "tipo_persona":  this.tipo_persona,
      "ci":  this.ci,
      "nombres":  this.nombres,
      "paterno":  this.paterno,
      "materno":  this.materno,
      "nit":  this.nit,
      "razon_social":  this.razonSocial,
      "ci_representante":  this.ci_r,
      "representante":  this.representante
    };

    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

//////////////////////////////ARBOLADO///////////////////////////////////////////////
datosFormularios.prototype.spbusquedaformularioArbolado=function(functionResp){
    urlComp = "/spbusquedaformularioArbolado";
    typeCall = "post";
    dataParams= {
        "idCiudadano" : this.frm_tra_id_ciudadano
    };
    ejecutarAjax_A(urlComp, typeCall, dataParams, functionResp);
};

datosFormularios.prototype.crearTramiteIgob=function(functionResp){
    urlComp = "/crearTramiteIgob";
    typeCall = "post";
    dataParams= {
        "idServicio" : this.frm_tra_dvser_id,
        "idCiudadano" : this.frm_tra_id_ciudadano,
        "fechaTramite" : this.frm_tra_fecha,
        "enviado" : this.frm_tra_enviado,
        "registro" : this.frm_tra_registrado,
        "modificado" : this.frm_tra_modificado,
        "idusuario" : this.frm_tra_id_usuario
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};
////////////////////////////////////////////////////////////////////////////////////

datosFormularios.prototype.sp_crear_datos_formulario=function(functionResp){
   urlComp = "/sp_crear_datos_formulario";
   typeCall = "post";
   dataParams= {
       "idServicio" : this.frm_tra_dvser_id,
       "data_json" : this.data_json,
       "idCiudadano" : this.frm_tra_id_ciudadano,
       "idusuario" : this.frm_tra_id_usuario,
       "idTramite" : this.frm_idTramite
   };
   ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

datosFormularios.prototype.sp_crear_datos_formulario_sitram=function(functionResp){
    urlComp = "/sp_crear_datos_formulario_sitram";
    typeCall = "post";
    dataParams= {
        "idServicio" : this.frm_tra_dvser_id,
        "data_json" : this.data_json,
        "idCiudadano" : this.frm_tra_id_ciudadano,
        "idusuario" : this.frm_tra_id_usuario,
        "idTramite" : this.frm_idTramite
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
 };


rcNatural.prototype.buscarNatural = function (functionResp)
{
    urlComp = "/ciudadano";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci,
      "complemento":  this.complemento,
      "nombre":  this.nombre,
      "paterno":  this.paterno,
      "materno":  this.materno,
    };

    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

rcNatural.prototype.buscarNatural_c = function (functionResp)
{
  var stoquen = "";
  var urlToken = urlRC + "/token2";
  $.ajax({
      dataType: "json",
      type: "POST",
      url : urlToken,
      data: {},
      async: false,
      success: function(response) {
        var token = response.token;
        stoquen =  'Bearer ' + token;
      },
      error: function (response, status, error) {
          dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
          console.log(dataResp);
      }
  });
  urlComp = "/ciudadano_c";
  typeCall = "post";
  dataParams = {
    "ci":  this.ci,
    "complemento":  this.complemento,
    "nombre":  this.nombre,
    "paterno":  this.paterno,
    "materno":  this.materno,
  };
  ejecutarAjaxP(urlComp, typeCall, dataParams, functionResp,stoquen);
};

rcNatural.prototype.buscarNatural_nit = function (functionResp)
{
    urlComp = "/ciudadano_nit";
    typeCall = "post";
    dataParams = {
      "nit":  this.nit,
    };

    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

/*rcNatural.prototype.crearNatural = function (functionResp)
{
    urlComp = "/new";
    typeCall = "post";

    if(validarNatural("NEW", this))
    {
        dataParams = {
          "ci": this.ci,
          "complemento": this.complemento,
          "nombres": this.nombre,
          "paterno": this.paterno,
          "materno": this.materno,
          "tercer_apellido": this.tercer_apellido,
          "expedido": this.expedido,
          "fec_nacimiento": this.fec_nacimiento,
          "lugar_nacimiento": this.lugar_nacimiento,
          "pais_origen": this.pais_origen,
          "sexo": this.sexo,
          "id_estado_civil": this.id_estado_civil,
          "profesion": this.profesion,
          "otra_profesion": this.otra_profesion,
          "telefono": this.telefono,
          "movil": this.movil,
          "correo": this.correo,
          "direccion": this.direccion,
          "sistema_creado":this.sistema_creado,

          "tipo_persona": "NATURAL",
          "usr_id": this.usr_id,
          "activacionf": "NO",
          "activaciond": "NO",
          "tipo_documento": this.tipo_documento 
        };
        ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
        dataResp = "{\"error\":{\"message\":\"Uno o varios campos obligatorios vacios\",\"code\":702}}";
        functionResp(dataResp);
    }
};*/

rcNatural.prototype.crearNatural = function (functionResp)
{
    urlComp = "/new";
    typeCall = "post";

    if(validarNatural("NEW", this))
    {
        dataParams = {
          "ci": this.ci,
          "complemento": this.complemento,
          "nombres": this.nombre,
          "paterno": this.paterno,
          "materno": this.materno,
          "tercer_apellido": this.tercer_apellido,
          "expedido": this.expedido,
          "fec_nacimiento": this.fec_nacimiento,
          "lugar_nacimiento": this.lugar_nacimiento,
          "pais_origen": this.pais_origen,
          "sexo": this.sexo,
          "id_estado_civil": this.id_estado_civil,
          "profesion": this.profesion,
          "otra_profesion": this.otra_profesion,
          "telefono": this.telefono,
          "movil": this.movil,
          "correo": this.correo,
          "direccion": this.direccion,
          
          "pais": this.pais,
          "departamento": this.departamento,
          "provincia": this.provincia,
          "municipio": this.municipio,
          "macrodistrito": this.macrodistrito,
          "macrodistrito_desc": this.macrodistrito_desc,
          "distrito": this.distrito,
          "distrito_desc": this.distrito_desc,
          "zona": this.zona,
          "zona_desc": this.zona_desc,
          "tipo_via": this.tipo_via,
          "nombre_via": this.nombre_via,
          "numero_casa": this.numero_casa,
          "edificio": this.edificio,
          "bloque": this.bloque,
          "piso": this.piso,
          "oficina": this.oficina,
          "latitud": this.latitud,
          "longitud": this.longitud,

          "sistema":"IGOB247",
          "sistema_creado":"IGOB247",
          "tipo_persona": "NATURAL",
          "usr_id": this.usr_id,
          "activacionf": "SI",
          "activaciond": "SI",
          "tipo_documento": this.tipo_documento 
        };

        //console.log("PARAEMTRSO...:",dataParams);

        ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
      dataResp = "{\"error\":{\"message\":\"Uno o varios campos obligatorios vacios\",\"code\":702}}";
        functionResp(dataResp);
    }
};

rcNatural.prototype.datosCiudadanoNatural = function (functionResp)
{
  var idtoken =   sessionStorage.getItem('TOKEN_API');
  var stoquen =  'Bearer ' + idtoken ;
  urlComp = "/obtDatos";
  typeCall = "post";

  dataParams = {
          "oid": this.oid
  };
  ejecutarAjaxP(urlComp, typeCall, dataParams, functionResp, stoquen);
}

rcNatural.prototype.modificarNatural = function (functionResp)
{
    //var id="57798d0e2f59181eb2806c01";
    urlComp = "/updatePrs/" + this.oid;
    //urlComp = "/updatePrs/" + id;
    typeCall = "put";

    if(validarNatural("UPD", this)) {
        dataParams = {
          "nombres": ((typeof(this.nombre) == 'undefined' || this.nombre == null) ? "" : this.nombre),
          "paterno": ((typeof(this.paterno) == 'undefined' || this.paterno == null) ? "" : this.paterno),
          "materno": ((typeof(this.materno) == 'undefined' || this.materno == null) ? "" : this.materno),
          "tercer_apellido": ((typeof(this.tercer_apellido) == 'undefined' || this.tercer_apellido == null) ? "" : this.tercer_apellido),
          "ci": ((typeof(this.ci) == 'undefined' || this.ci == null) ? "" : this.ci),
          "complemento": ((typeof(this.complemento) == 'undefined' || this.complemento == null) ? "" : this.complemento),
          "expedido": ((typeof(this.expedido) == 'undefined' || this.expedido == null) ? "" : this.expedido),
          "fec_nacimiento": ((typeof(this.fec_nacimiento) == 'undefined' || this.fec_nacimiento == null) ? "" : this.fec_nacimiento),
          "lugar_nacimiento": ((typeof(this.lugar_nacimiento) == 'undefined' || this.lugar_nacimiento == null) ? "" : this.lugar_nacimiento),
          "pais_origen": ((typeof(this.pais_origen) == 'undefined' || this.pais_origen == null) ? "" : this.pais_origen),
          "sexo": ((typeof(this.sexo) == 'undefined' || this.sexo == null) ? "" : this.sexo),
          "id_estado_civil": ((typeof(this.id_estado_civil) == 'undefined' || this.id_estado_civil == null) ? "" : this.id_estado_civil),
          "profesion": ((typeof(this.profesion) == 'undefined' || this.profesion == null) ? "" : this.profesion),
          "otra_profesion": ((typeof(this.otra_profesion) == 'undefined' || this.otra_profesion == null) ? "" : this.otra_profesion),
          "telefono": ((typeof(this.telefono) == 'undefined' || this.telefono == null) ? "" : this.telefono),
          "movil": ((typeof(this.movil) == 'undefined' || this.movil == null) ? "" : this.movil),
          "correo": ((typeof(this.correo) == 'undefined' || this.correo == null) ? "" : this.correo),
          "direccion": ((typeof(this.direccion) == 'undefined' || this.direccion == null) ? "" : this.direccion),

          "pais": ((typeof(this.pais) == 'undefined' || this.pais == null) ? "" : this.pais),
          "departamento": ((typeof(this.departamento) == 'undefined' || this.departamento == null) ? "" : this.departamento),
          "provincia": ((typeof(this.provincia) == 'undefined' || this.provincia == null) ? "" : this.provincia),
          "municipio": ((typeof(this.municipio) == 'undefined' || this.municipio == null) ? "" : this.municipio),
          "macrodistrito": ((typeof(this.macrodistrito) == 'undefined' || this.macrodistrito == null) ? "" : this.macrodistrito),
          "macrodistrito_desc": ((typeof(this.macrodistrito_desc) == 'undefined' || this.macrodistrito_desc == null) ? "" : this.macrodistrito_desc),
          "distrito": ((typeof(this.distrito) == 'undefined' || this.distrito == null) ? "" : this.distrito),
          "distrito_desc": ((typeof(this.distrito_desc) == 'undefined' || this.distrito_desc == null) ? "" : this.distrito_desc),
          "zona": ((typeof(this.zona) == 'undefined' || this.zona == null) ? "" : this.zona),
          "zona_desc": ((typeof(this.zona_desc) == 'undefined' || this.zona_desc == null) ? "" : this.zona_desc),
          "tipo_via": ((typeof(this.tipo_via) == 'undefined' || this.tipo_via == null) ? "" : this.tipo_via),
          "nombre_via": ((typeof(this.nombre_via) == 'undefined' || this.nombre_via == null) ? "" : this.nombre_via),
          "numero_casa": ((typeof(this.numero_casa) == 'undefined' || this.numero_casa == null) ? "" : this.numero_casa),
          "edificio": ((typeof(this.edificio) == 'undefined' || this.edificio == null) ? "" : this.edificio),
          "bloque": ((typeof(this.bloque) == 'undefined' || this.bloque == null) ? "" : this.bloque),
          "piso": ((typeof(this.piso) == 'undefined' || this.piso == null) ? "" : this.piso),
          "oficina": ((typeof(this.oficina) == 'undefined' || this.oficina == null) ? "" : this.oficina),

          "latitud": ((typeof(this.latitud) == 'undefined' || this.latitud == null) ? "" : this.latitud),
          "longitud":((typeof(this.longitud) == 'undefined' || this.longitud == null) ? "" : this.longitud),
          "verificado":((typeof(this.verificado) == 'undefined' || this.verificado == null) ? "" : this.verificado),

          //((typeof(this.) == 'undefined' || this. == null) ? "" : this.)

          "tipo_persona": "NATURAL",
          "usr_id": ((typeof(this.usr_id) == 'undefined' || this.usr_id == null) ? "" : this.usr_id),
          "activacionf": ((typeof(this.activacionf) == 'undefined' || this.activacionf == null) ? "" : this.activacionf),
          "activaciond": ((typeof(this.activaciond) == 'undefined' || this.activaciond == null) ? "" : this.activaciond),

          "file_fotocopia_ci": ((typeof(this.file_fotocopia_ci) == 'undefined' || this.file_fotocopia_ci == null) ? "" : this.file_fotocopia_ci),
          "file_fotocopia_ci_r": ((typeof(this.file_fotocopia_ci_r) == 'undefined' || this.file_fotocopia_ci_r == null) ? "" : this.file_fotocopia_ci_r),
          "fec_vencimiento": ((typeof(this.fec_vencimiento) == 'undefined' || this.fec_vencimiento == null) ? "" : this.fec_vencimiento),
          "file_factura_luz": ((typeof(this.file_factura_luz) == 'undefined' || this.file_factura_luz == null) ? "" : this.file_factura_luz),
          "URL": this.URL,
          "ci_discapacitado": ((typeof(this.ci_discapacitado) == 'undefined' || this.ci_discapacitado == null) ? "" : this.ci_discapacitado),
          "persona_discapacidad": ((typeof(this.persona_discapacidad) == 'undefined' || this.persona_discapacidad == null) ? "" : this.persona_discapacidad),
          "fec_expiracion_dis": ((typeof(this.fec_expiracion_dis) == 'undefined' || this.fec_expiracion_dis == null) ? "" : this.fec_expiracion_dis),
          "sistema_modificador": 'IGOB_MOD'
        };
        ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
        dataResp = "{\"error\":{\"message\":\"Uno o varios campos obligatorios vacios\",\"code\":702}}";
        functionResp(dataResp);
    }
};

rcNatural.prototype.modificarRegistro = function (functionResp)
{
    urlComp = "/updateRegistro/" + this.oid;
    typeCall = "put";
    dataParams = {
      "pin": ((typeof(this.pin) == 'undefined' || this.pin == null) ? "" : this.pin.toString()),
      "correo": ((typeof(this.correo) == 'undefined' || this.correo == null) ? "" : this.correo),
      "verificado":((typeof(this.verificado) == 'undefined' || this.verificado == null) ? "" : this.verificado),
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};


rcNatural.prototype.modificarCambioPinNatural = function (functionResp)
{
  urlComp = "/setCambioPin/" + this.oid;
  typeCall = "put";
  dataParams = {
          "pin": ((typeof(this.pinAnterior) == 'undefined' || this.pinAnterior == null) ? "" : this.pinAnterior),
          "pinNuevo": ((typeof(this.pinNuevo) == 'undefined' || this.pinNuevo == null) ? "" : this.pinNuevo),
        };
        ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};
/*///////////////////////////////////////////////// JURIDICO /////////////////////////////////////////////////*/
function rcJuridico() {
    this.nit;
    this.razonSocial;
    this.telefono;
    this.movil;
    this.correo;
    this.profesion;
    this.otra_profesion;
    this.direccion;
    this.sistema_creado;

    this.ci_representante;
    this.complemento_representante;
    this.representante;
    this.nombre;
    this.paterno;
    this.materno;
    this.poder_replegal;
    this.nro_notaria;

    this.pais;
    this.departamento;
    this.provincia;
    this.municipio;
    this.macrodistrito;
    this.macrodistrito_desc;
    this.distrito;
    this.distrito_desc;
    this.zona;
    this.zona_desc;
    this.tipo_via;
    this.nombre_via;
    this.numero_casa;
    this.edificio;
    this.bloque;
    this.piso;
    this.oficina;

    this.latitud;
    this.longitud;

    this.usr_id;
    this.activacionf;
    this.activaciond;

    this.file_fotocopia_ci;
    this.file_factura_luz;
    this.URL;

    this.oid;
    this.tipo_empresa;
};


rcJuridico.prototype.buscarJuridico = function (functionResp)
{
    urlComp = "";
    typeCall = "post";
    dataParams = {
      "nit":  this.nit,
      "razon_social":  this.razonSocial,
      "ci_representante": this.ci

    };

    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

rcJuridico.prototype.crearJuridico = function (functionResp)
{
    urlComp = "/new";
    typeCall = "post";

    if(validarJuridico("NEW", this))
    {
        dataParams = {
          "nit":  this.nit,
          "razon_social": this.razonSocial,
          "telefono" : this.telefono,
          "movil" : this.movil,
          "correo" : this.correo,
          "ci_representante": this.ci,
          "complemento_representante": this.complemento,
          "representante":this.nombre + " " + this.paterno + " " + this.materno,
          "poder_replegal": this.poder_replegal,
          "nro_notaria": this.nro_notaria,
          "sistema_creado":this.sistema_creado,
          "tipo_persona": "JURIDICO",
          "tipo_empresa": this.tipo_empresa,

          "sistema":"IGOB247",
          "sistema_creado":"IGOB247",
          "usr_id": this.usr_id,
          "activacionf": "SI",
          "activaciond": "SI"
        };

        ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
    }
    else
    {
        dataResp = "{\"error\":{\"message\":\"Uno o varios campos obligatorios vacios\",\"code\":702}}";
        functionResp(dataResp);
    }
};

rcJuridico.prototype.modificarJuridico = function (functionResp)
{
    urlComp = "/updateEmp/" + this.oid;;
    typeCall = "put";
    dataParams = {
        "nit":  ((typeof(this.nit) == 'undefined' || this.nit == null) ? "" : this.nit),
        "razon_social": ((typeof(this.razonSocial) == 'undefined' || this.razonSocial == null) ? "" : this.razonSocial),
        "telefono" : ((typeof(this.telefono) == 'undefined' || this.telefono == null) ? "" : this.telefono),
        "movil" : ((typeof(this.movil) == 'undefined' || this.movil == null) ? "" : this.movil),
        "correo" : ((typeof(this.correo) == 'undefined' || this.correo == null) ? "" : this.correo),
        "ci_representante": ((typeof(this.ci) == 'undefined' || this.ci == null) ? "" : this.ci),
        "complemento_representante": ((typeof(this.complemento) == 'undefined' || this.complemento == null) ? "" : this.complemento),
        "representante":((typeof(this.representante) == 'undefined' || this.representante == null) ? "" : this.representante),
        "poder_replegal": ((typeof(this.poder_replegal) == 'undefined' || this.poder_replegal == null) ? "" : this.poder_replegal),
        "nro_notaria": ((typeof(this.nro_notaria) == 'undefined' || this.nro_notaria == null) ? "" : this.nro_notaria),
        "profesion": ((typeof(this.profesion) == 'undefined' || this.profesion == null) ? "" : this.profesion),
        "otra_profesion": ((typeof(this.otra_profesion) == 'undefined' || this.otra_profesion == null) ? "" : this.otra_profesion),
        "direccion" : ((typeof(this.direccion) == 'undefined' || this.direccion == null) ? "" : this.direccion),
        "pais" : ((typeof(this.pais) == 'undefined' || this.pais == null) ? "" : this.pais),
        "departamento" : ((typeof(this.departamento) == 'undefined' || this.departamento == null) ? "" : this.departamento),
        "provincia" :((typeof(this.provincia) == 'undefined' || this.provincia == null) ? "" : this.provincia),
        "municipio" : ((typeof(this.municipio) == 'undefined' || this.municipio == null) ? "" : this.municipio),
        "macrodistrito" : ((typeof(this.macrodistrito) == 'undefined' || this.macrodistrito == null) ? "" : this.macrodistrito),
        "macrodistrito_desc": ((typeof(this.macrodistrito_desc) == 'undefined' || this.macrodistrito_desc == null) ? "" : this.macrodistrito_desc),
        "distrito" : ((typeof(this.distrito) == 'undefined' || this.distrito == null) ? "" : this.distrito),
        "distrito_desc": ((typeof(this.distrito_desc) == 'undefined' || this.distrito_desc == null) ? "" : this.distrito_desc),
        "zona" : ((typeof(this.zona) == 'undefined' || this.zona == null) ? "" : this.zona),
        "zona_desc" : ((typeof(this.zona_desc) == 'undefined' || this.zona_desc == null) ? "" : this.zona_desc),
        "tipo_via" : ((typeof(this.tipo_via) == 'undefined' || this.tipo_via == null) ? "" : this.tipo_via),
        "nombre_via" : ((typeof(this.nombre_via) == 'undefined' || this.nombre_via == null) ? "" : this.nombre_via),
        "numero_casa" : ((typeof(this.numero_casa) == 'undefined' || this.numero_casa == null) ? "" : this.numero_casa),
        "edificio" : ((typeof(this.edificio) == 'undefined' || this.edificio == null) ? "" : this.edificio),
        "bloque" : ((typeof(this.bloque) == 'undefined' || this.bloque == null) ? "" : this.bloque),
        "piso" :((typeof(this.piso) == 'undefined' || this.piso == null) ? "" : this.piso),
        "oficina" : ((typeof(this.oficina) == 'undefined' || this.oficina == null) ? "" : this.oficina),
        "latitud" : ((typeof(this.latitud) == 'undefined' || this.latitud == null) ? "" : this.latitud),
        "longitud" : ((typeof(this.longitud) == 'undefined' || this.longitud == null) ? "" : this.longitud),
        "tipo_persona": "JURIDICO",
        "usr_id": this.usr_id,
        "activacionf": ((typeof(this.activacionf) == 'undefined' || this.activacionf == null) ? "" : this.activacionf),
        "activaciond": ((typeof(this.activaciond) == 'undefined' || this.activaciond == null) ? "" : this.activaciond),
        "file_fotocopia_ci" : ((typeof(this.file_fotocopia_ci) == 'undefined' || this.file_fotocopia_ci == null) ? "" : this.file_fotocopia_ci),
        "file_fotocopia_ci_r" : ((typeof(this.file_fotocopia_ci_r) == 'undefined' || this.file_fotocopia_ci_r == null) ? "" : this.file_fotocopia_ci_r),
        "file_poder_legal" : ((typeof(this.file_poder_legal) == 'undefined' || this.file_poder_legal == null) ? "" : this.file_poder_legal),
        "file_test_const" : ((typeof(this.file_test_const) == 'undefined' || this.file_test_const == null) ? "" : this.file_test_const),
        "file_num_ident" : ((typeof(this.file_num_ident) == 'undefined' || this.file_num_ident == null) ? "" : this.file_num_ident),
        "file_fund_emp" : ((typeof(this.file_fund_emp) == 'undefined' || this.file_fund_emp == null) ? "" : this.file_fund_emp),
        "file_reg_comer" : ((typeof(this.file_reg_comer) == 'undefined' || this.file_reg_comer == null) ? "" : this.file_reg_comer),
        "URL": this.URL,
        "sistema_modificador":'IGOB_MOD'
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

function rcIdioma(){
    this.filtro;
};
rcIdioma.prototype.obtenerTitulos = function (functionResp)
{
  urlComp = "/getTitulos";
  typeCall = "post";

  dataParams = {
          "filtro": this.filtro
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

rcIdioma.prototype.obtenerContenidos = function (functionResp)
{
  urlComp = "/getContenidos";
  typeCall = "post";

  dataParams = {
          "filtro": this.filtro
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}
rcIdioma.prototype.obtenerImagenes = function (functionResp)
{
  urlComp = "/getImagenes";
  typeCall = "post";

  dataParams = {
          "filtro": this.filtro
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}
rcIdioma.prototype.obtenerMensajes = function (functionResp)
{
  urlComp = "/getMensajes";
  typeCall = "post";

  dataParams = {
          "filtro": this.filtro
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}


function adiconarServicio(){
    this.frm_tra_dvser_id;
    this.frm_tra_id_ciudadano;
    this.frm_tra_fecha;
    this.frm_tra_enviado;
    this.frm_tra_registrado;
    this.frm_tra_modificado;
    this.frm_tra_idCag;
    this.frm_tra_Cag;
    this.frm_tra_id_usuario;
};
adiconarServicio.prototype.adiconar_Servicio=function(functionResp){
    urlComp = "/adiconarServicio";
    typeCall = "post";
    dataParams= {
        "frm_tra_dvser_id" : this.frm_tra_dvser_id,
        "frm_tra_id_ciudadano": this.frm_tra_id_ciudadano,
        "frm_tra_fecha":  this.frm_tra_fecha,
        "frm_tra_enviado": this.frm_tra_enviado,
        "frm_tra_registrado": this.frm_tra_registrado,
        "frm_tra_modificado": this.frm_tra_modificado,
        "frm_tra_idCag": this.frm_tra_idCag,
        "frm_tra_Cag":  this.frm_tra_Cag,
        "frm_tra_id_usuario": this.frm_tra_id_usuario
    };
    ejecutarAjaxIF2(urlComp, typeCall, dataParams, functionResp);
};

function creardatosformulario(){
    this.frm_dvser_id;
    this.frm_dato;
    this.frm_id_ciudadano;
    this.frm_id_usuario;
    this.frm_id_tramite;
};
creardatosformulario.prototype.crear_datos_formulario=function(functionResp){
    urlComp = "/creardatosformulario";
    typeCall = "post";
    dataParams= {
        "frm_dvser_id" : this.frm_dvser_id,
        "frm_dato": this.frm_dato,
        "frm_id_ciudadano":  this.frm_id_ciudadano,
        "frm_id_usuario": this.frm_id_usuario,
        "frm_id_tramite": this.frm_id_tramite
    };
    ejecutarAjaxIF2(urlComp, typeCall, dataParams, functionResp);
};

function adicionaTramitesFormulario(){
  this.frm_tra_fecha;
  this.frm_tra_enviado;
  this.frm_tra_registrado;
  this.frm_tra_modificado;
  this.id_servicio;
  this.data_json;
  this.oid_ciudadano;
  this.id_usuario;
  this.frm_data_ciudadano;    
};
adicionaTramitesFormulario.prototype.adiciona_Tramites_Formulario=function(functionResp){
  var sdataCiudadano = {};
  try{      
    var stipopersona = sessionStorage.getItem("TIPO_PERSONA");
    var sidciudadano = sessionStorage.getItem("IDCIUDADANO");        
    sdataCiudadano.stipopersona = stipopersona;
    sdataCiudadano.sidciudadano = sidciudadano; 
    if(stipopersona == 'NATURAL'){
      var sciciudadano = sessionStorage.getItem("CICIUDADANO");           
      var sapeparterno = sessionStorage.getItem("US_PATERNO");
      var sap_ematerno = sessionStorage.getItem("US_MATERNO");
      var s_correoelec = sessionStorage.getItem("US_EMAIL");
      var s_nombre = sessionStorage.getItem("US_NOMBRE");
      sdataCiudadano.sciciudadano = sciciudadano;
      sdataCiudadano.sapeparterno = sapeparterno; 
      sdataCiudadano.sap_ematerno = sap_ematerno;
      sdataCiudadano.s_correoelec = s_correoelec; 
      sdataCiudadano.s_nombre = s_nombre; 
    }else if(stipopersona == 'JURIDICO'){
      var snitciudaano = sessionStorage.getItem("NITCIUDADANO");
      var cirepresentante = sessionStorage.getItem("REPRESENTANTECI");
      var srepresentante = sessionStorage.getItem("REPRESENTANTE");
      var srazonsocial = sessionStorage.getItem("US_NOMBRE");
      sdataCiudadano.snitciudaano = snitciudaano;
      sdataCiudadano.cirepresentante = cirepresentante; 
      sdataCiudadano.srepresentante = srepresentante;
      sdataCiudadano.srazonsocial = srazonsocial; 
    }      
  }catch(e){console.log("Error al recuperar Datos:", e);}    
  var sjonDataCiudano = JSON.stringify(sdataCiudadano);    
  urlComp = "/adicionaTramitesFormulario";
  typeCall = "post";
  dataParams= {
      "frm_tra_fecha" : this.frm_tra_fecha,
      "frm_tra_enviado": this.frm_tra_enviado,
      "frm_tra_registrado":  this.frm_tra_registrado,
      "frm_tra_modificado": this.frm_tra_modificado,
      "id_servicio": this.id_servicio,
      "data_json": this.data_json,
      "oid_ciudadano": this.oid_ciudadano,
      "id_usuario": this.id_usuario,
      "frm_data_ciudadano":sjonDataCiudano
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};


function rcNotificaciones(){
    this.oid;
};
rcNotificaciones.prototype.obtenerNotificaciones = function (functionResp)
{
  urlComp = "/getNotificaciones";
  typeCall = "post";
  dataParams = {
          "oid": this.oid
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

rcNotificaciones.prototype.archivarNotificacion = function (functionResp)
{
  urlComp = "/delNotificacion";
  typeCall = "post";
  dataParams = {
          "idTramite": this.oid
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function adicionaTramitesFormulario2(){
    this.oid;
};

adicionaTramitesFormulario2.prototype.adiciona_Tramites_Formulario2=function(functionResp){
    urlComp = "/adicionaTramitesFormulario2";
    typeCall = "post";
    dataParams= {
        "frm_tra_id_ciudadano" : this.frm_tra_id_ciudadano,
        "frm_tra_enviado": this.frm_tra_enviado,
        "frm_tra_if_codigo":  this.frm_tra_if_codigo,
        "data_json": this.data_json
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

/*API REGLAS DE NEGOCIO*/
function reglasnegocio(){
    this.identificador;
    this.parametros;
};

reglasnegocio.prototype.llamarregla=function(functionResp){
  var idtoken =   sessionStorage.getItem('TOKEN_MOTOR');
  var stoquen =  'Bearer ' + idtoken ;
    urlComp = "";
    typeCall = "post";
    dataParams= {
        "identificador" : this.identificador,
        "parametros": this.parametros
    };
    ejecutarAjaxMServicio(urlComp, typeCall, dataParams, functionResp,stoquen);
};


function datosFormularios(){
    this.frm_idTramite;
    this.frm_tra_enviado;
    this.frm_tra_id_usuario;
    this.frm_tra_modificado;

    this.frm_tra_dvser_id;
    this.frm_tra_id_ciudadano;
    this.frm_tra_fecha;
    this.frm_tra_enviado;
    this.frm_tra_registrado;
    this.frm_tra_if_codigo;
    this.data_json;

};

datosFormularios.prototype.splistafrmdatos=function(functionResp){
    urlComp = "/splistafrmdatos";
    typeCall = "post";
    dataParams= {
        "idCiudadano" : this.frm_tra_id_ciudadano,
        "idServicio" : this.frm_tra_dvser_id,
        "idTramite" : this.frm_idTramite

    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

/*dream-buscarRepreXCI*/
function bscRepresentante(){
    this.ci_rep;
    this.estado;
};

bscRepresentante.prototype.buscarep = function (functionResp)
{
    urlComp = "/getDatosRepresentantexCI";
    typeCall = "post";
    dataParams = {
      "ci_rep":  this.ci_rep,
      "estado":  this.estado
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

function lstformdatos(){
    this.sidciudadano;
    this.sidservicio;
    this.sidtramite;
};

lstformdatos.prototype.lstdata = function (functionResp)
{
    urlComp = "/lstformdatos";
    typeCall = "post";
    dataParams = {
            "sidciudadano": this.sidciudadano,
            "sidservicio": this.sidservicio,
            "sidtramite": this.sidtramite
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function zonaLstM(){
    this.idMacro;
};

zonaLstM.prototype.obtzonaM = function (functionResp)
{
  urlComp = "/zonaLstM";
  typeCall = "post";
  dataParams = {
          "idMacro": this.idMacro
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

datosFormularios.prototype.enviarFormulario=function(functionResp){
    urlComp = "/enviarForm";
    typeCall = "post";
    dataParams= {
        "idTramite" : this.frm_idTramite,
        "enviado" : this.frm_tra_enviado,
        "usuario" : this.frm_tra_id_usuario,
        "modificado" : this.frm_tra_modificado
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

datosFormularios.prototype.validarFormProcesos=function(functionResp){
    urlComp = "/validarFormProcesos";
    typeCall = "post";
    dataParams= {
        "idTramite" : this.frm_idTramite,
        "enviado" : this.frm_tra_enviado,
        "codigo" : this.frm_tra_if_codigo,
        "idusuario" : this.frm_tra_id_usuario
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

/* INICIO API INTERMEDIO PARA AE */
function rcTramitesAe(){
    this.oid;
};

rcTramitesAe.prototype.obtTramites = function (functionResp)
{
  urlComp = "/listarTramitesAE";
  typeCall = "post";

  dataParams = {
          "oid": this.oid
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

rcTramitesAe.prototype.listaraevirtual = function (functionResp)
{
  urlComp = "/listadoVirtualae";
  typeCall = "post";

  dataParams = {
          "idCiudadano": this.oid
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

rcTramitesAe.prototype.listarProducto = function (functionResp)
{
  urlComp = "/listadoProducto";
  typeCall = "post";
  dataParams = {
          "idCiudadano": this.oid
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}
//**********************************MOVILIDAD**********************************

function listaTramitesMov(){
  this.idCiudadano;
  this.tra_ser;
}

listaTramitesMov.prototype.spbusquedaformulariomovilidad=function(functionResp){
  urlComp = "/spbusquedaformulariomovilidad";
  typeCall = "post";
  dataParams= {
      "idCiudadano" : this.idCiudadano,
      "tra_ser" : this.tra_ser
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

listaTramitesMov.prototype.busquedaMovilidadInfracciones=function(functionResp){
  urlComp = "/busquedaFormularioMovilidadInfracciones";
  typeCall = "post";
  dataParams= {
      "idCiudadano" : this.idCiudadano
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

function tramitesMovilidad(){
  this.idCiudadano;
  this.descripcion;
}

tramitesMovilidad.prototype.listaTramitesMovilidad=function(functionResp){
  urlComp = "/listaTramitesMovilidad";
  typeCall = "post";
  dataParams= {
      "idCiudadano" : this.idCiudadano,
      "descripcion" : this.descripcion
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};


function rcTramites(){
    this.oid;
};

rcTramites.prototype.obtTramitesPorTipoTramite=function (functionResp)
{
  urlComp = "/listarTramitesPorCodigo";
  typeCall = "post";

  dataParams = {
          "oid": this.oid,
          "codigo": this.codigo
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function obtIdServicio(){
  this.codigo;
};

obtIdServicio.prototype.obt_Id_Servicio = function (functionResp)
{
urlComp = "/obtIdServicio";
typeCall = "post";

dataParams = {
        "codigo": this.codigo
};

ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function macrodistritoLstid(){
    this.idMacro;
};

macrodistritoLstid.prototype.obtmacrodistrito = function (functionResp)
{
  urlComp = "/macrodistritoLstid";
  typeCall = "post";

  dataParams = {
          "idMacro": this.idMacro
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function distritoLstid(){
    this.idDistrito;
};

distritoLstid.prototype.obtdistrito = function (functionResp)
{
  urlComp = "/distritoLstid";
  typeCall = "post";

  dataParams = {
          "idDistrito": this.idDistrito
  };

  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function zonaLstid(){
    this.idZona;
};

zonaLstid.prototype.obtzona = function (functionResp)
{
  urlComp = "/zonaLstid";
  typeCall = "post";

  dataParams = {
          "idZona": this.idZona
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function zonaLstM(){
    this.idMacro;
};

zonaLstM.prototype.obtzonaM = function (functionResp)
{
  urlComp = "/zonaLstM";
  typeCall = "post";
  dataParams = {
          "idMacro": this.idMacro
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function macrodistritoLst(){
};
macrodistritoLst.prototype.obtmacro = function (functionResp)
{
  urlComp = "/macrodistritoLst";
  typeCall = "post";
  dataParams = {   
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function distritoZona(){
  this.idMacro;
};

distritoZona.prototype.obtdist = function (functionResp)
{
  urlComp = "/distritoZona";
  typeCall = "post";
  dataParams = {
          "idMacro": this.idMacro
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function distritoZonalst(){
  this.idZona;
};

distritoZonalst.prototype.obtdistritoZona = function (functionResp)
{
  urlComp = "/distritoZonalst";
  typeCall = "post";
  dataParams = {
          "idZona": this.idZona
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function tipoVia(){
  this.idz;
  this.tipo;
};

tipoVia.prototype.obt_tipoVia = function (functionResp)
{
  urlComp = "/tipoVia";
  typeCall = "post";
  dataParams = {
          "idz": this.idz,
          "tipo": this.tipo
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function provinciaLst(){
  this.idProv;
};

provinciaLst.prototype.obtprovincia = function (functionResp)
{
  urlComp = "/provinciaLst";
  typeCall = "post";
  dataParams = {
          "idProv": this.idProv
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function municipioLst(){
  this.idMun;
};

municipioLst.prototype.obtmunicipio = function (functionResp)
{
  urlComp = "/municipioLst";
  typeCall = "post";
  dataParams = {
          "idMun": this.idMun
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function macrodistritoLst(){
  this.idMacro;
};

macrodistritoLst.prototype.obtmacrodistrito = function (functionResp)
{
  urlComp = "/macrodistrito";
  typeCall = "post";
  dataParams = {
          "idMacro": this.idMacro
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function distritoLst(){
  this.idDistrito;
};

distritoLst.prototype.obtdistrito = function (functionResp)
{
  urlComp = "/distrito";
  typeCall = "post";
  dataParams = {
          "idDistrito": this.idDistrito
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}
/* INICIO API INTERMEDIO PARA AE */

function ZonaMacro(){
};

ZonaMacro.prototype.Zona_Macro = function (functionResp)
{
  urlComp = "/lst_zona_macro";
  typeCall = "post";
  dataParams = {
  };
  ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
}

function rcCondicionesUso(){
    this.oid_ciudadano;
};

rcCondicionesUso.prototype.mostrarCondicionesUso = function (functionResp)
{
    urlComp = "/aceptacionServicios";
    typeCall = "post";
    dataParams = {
      "oid":  this.oid_ciudadano,
      "aceptacion":  this.aceptacion      
    };

    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};

function fechaHoraServer() {
};
fechaHoraServer.prototype.fechahora = function (functionResp)
{
    urlComp = "/fechaHora";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

function gDocumentosIgob() {
    this.doc_sistema;
    this.doc_proceso;
    this.doc_id;
    this.doc_ci_nodo;
    this.doc_datos;
    this.doc_url;
    this.doc_version;
    this.doc_tiempo;
    this.doc_firma_digital;
    this.doc_usuario;
    this.doc_tipo_documento;
    this.doc_tamanio_documento;
    this.doc_nombre;
    this.doc_tps_doc_id;
    this.doc_url_logica;
    this.doc_acceso;
    this.doc_tipo_documento_ext;
    this.doc_nrotramite_nexo;
    this.doc_id_codigo;
};
gDocumentosIgob.prototype.insertarDocIgob = function (functionResp) {
    urlComp = "/gDocumentosIf";
    typeCall = "post";
    dataParams = {
      "sdoc_sistema" : this.doc_sistema,
      "sdoc_proceso" : this.doc_proceso,
      "sdoc_id" : this.doc_id.toString(),
      "sdoc_ci_nodo" : this.doc_ci_nodo,
      "sdoc_datos" : this.doc_datos,
      "sdoc_url" : this.doc_url,
      "sdoc_version" : this.doc_version,
      "sdoc_tiempo" : this.doc_tiempo,
      "sdoc_firma_digital" : this.doc_firma_digital.toString(),
      "sdoc_usuario" : this.doc_usuario,
      "sdoc_tipo_documento" : this.doc_tipo_documento,
      "sdoc_tamanio_documento" : this.doc_tamanio_documento,
      "sdoc_nombre" : this.doc_nombre,
      "sdoc_tps_doc_id" : this.doc_tps_doc_id,
      "sdoc_url_logica" : this.doc_url_logica,
      "sdoc_acceso" : this.doc_acceso,
      "sdoc_tipo_documento_ext" : this.doc_tipo_documento_ext,
      "sdoc_nrotramite_nexo" : this.doc_nrotramite_nexo,
      "sdoc_id_codigo" : this.doc_id_codigo.toString()
    };
    ejecutarAjax1(urlComp, typeCall, dataParams, functionResp);
};

function validarCiudadanoR(){
  this.ci;
  this.tipo_documento;
};
validarCiudadanoR.prototype.validar_CiudadanoR=function(functionResp){
var stoquen = "";
var urlToken = urlRC + "/token2";
$.ajax({
    dataType: "json",
    type: "POST",
    url : urlToken,
    data: {},
    async: false,
    success: function(response) {
      var token = response.token;
      stoquen =  'Bearer ' + token;
    },
    error: function (response, status, error) {
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        //console.log('RESPUESTA =========>',dataResp);
    }
});
urlComp = "/validarciudadano";
typeCall = "post";
dataParams = {
  "ci":  this.ci,
  "tipo_documento": this.tipo_documento    
};
ejecutarAjaxP(urlComp, typeCall, dataParams, functionResp,stoquen);

};
function validarCiudadanoR_n(){
  this.ci;
  this.tipo_documento;
};
validarCiudadanoR_n.prototype.validar_CiudadanoR_n=function(functionResp){
var stoquen = "";
var urlToken = urlRC + "/token2";
$.ajax({
    dataType: "json",
    type: "POST",
    url : urlToken,
    data: {},
    async: false,
    success: function(response) {
      var token = response.token;
      stoquen =  'Bearer ' + token;
    },
    error: function (response, status, error) {
        dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
        console.log(dataResp);
    }
});
urlComp = "/validarciudadano_n";
typeCall = "post";
dataParams = {
  "ci":  this.ci,
  "tipo_documento": this.tipo_documento   
};
ejecutarAjaxP(urlComp, typeCall, dataParams, functionResp,stoquen);
};

function validarCiudadanoR_j(){
    this.nit;
};
validarCiudadanoR_j.prototype.validar_CiudadanoR_j=function(functionResp){
  var stoquen = "";
  var urlToken = urlRC + "/token2";
  $.ajax({
      dataType: "json",
      type: "POST",
      url : urlToken,
      data: {},
      async: false,
      success: function(response) {
        var token = response.token;
        stoquen =  'Bearer ' + token;
      },
      error: function (response, status, error) {
          dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
          console.log(dataResp);
      }
  });
  urlComp = "/validarciudadano_j";
  typeCall = "post";
  dataParams = {
    "nit":  this.nit     
  };
  ejecutarAjaxP(urlComp, typeCall, dataParams, functionResp,stoquen);
};

function verificarClave(){
  this.usuario;
  this.clave;
  this.tipo;
}
verificarClave.prototype.verificar_Clave = function(functionResp){
  urlComp = "/verificarClave";
    typeCall = "post";
    dataParams= {
        "usuario" : this.usuario,
        "clave" : this.clave,
        "tipo" : this.tipo
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
}

/////////////////////////*GUARDAR CONDICIONES DE USO*/////////////////////////////////
function guardarCondicionUso(){
    this.oid;
    this.nombreCU;
}

guardarCondicionUso.prototype.guardarCondicion_deUso = function (functionResp){
    urlComp = "/saveCondicionUso"
    typeCall = "post";
    dataParams = {
      "oid": this.oid,
      "nombreCU": this.nombreCU
    };
    ejecutarAjax(urlComp, typeCall, dataParams, functionResp);
};