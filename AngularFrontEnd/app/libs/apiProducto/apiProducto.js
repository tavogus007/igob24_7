//var urlSalud = "http://sersalud.lapaz.bo";
//var urlSalud = "http://192.168.5.141:9099";
//var urlSalud = "http://172.19.161.188:9091";
//var urlSalud2 = "http://192.168.34.18:9091";

var urlCompSalud;
var dataResp;
var dataParams;
var typeCall;
var urlProducto = "";
if(jsonURLS){
  var urlProducto = jsonURLS.CONEXION_API_PG_PRODUCTO+"wsRCPG";
  
}
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxProducto(vurlCompProducto, vTypeCall, vDataCall, vFunctionResp) {
    //console.log(urlSalud);
    $.ajax({
      type: vTypeCall,
      url: urlProducto + vurlCompProducto,
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

function dataTiendaVirtual(){
    this.ae_id,
    this.pagweb_id,
    this.nombre,
    this.correo,
    this.pagina_web,
    this.descripcion,
    this.sucursales,
    this.contactos,
    this.redes_sociales,
    this.ofertas,
    this.oid,
    this.usr
};
dataTiendaVirtual.prototype.crearTiendaVirtual = function (functionResp)
{
    urlCompProducto = "/addtiendavirtual";
    typeCall = "post";
    dataParams = {
      "stv_ae_id":this.ae_id,
      "stv_pagweb_id":this.pagweb_id,
      "stv_nombre":this.nombre,
      "stv_correo":this.correo,
      "stv_pagina_web":this.pagina_web,
      "stv_descripcion":this.descripcion,
      "stv_sucursales":this.sucursales,
      "stv_contactos":this.contactos,
      "stv_redes_sociales":this.redes_sociales,
      "stv_ofertas":this.ofertas,
      "stv_oid":this.oid,
      "stv_usr":this.usr    
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

dataTiendaVirtual.prototype.obtDataTiendaVirtual = function (functionResp)
{
    urlCompProducto = "/listarTiendaVirtualPorIdAe";
    typeCall = "post";
    dataParams = {
      "idAe":this.idAe 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};


function dataProducto(){
    this.id,
    this.idtv,
    this.nombre,
    this.descripcion,
    this.precio,
    this.cantidad,
    this.imagen_p,
    this.imagen_a1,
    this.imagen_a2,
    this.oid,
    this.usr
};

dataProducto.prototype.listarProductoTV = function (functionResp)
{
  urlCompProducto = "/listarProductosPorIdTv_ae";
  typeCall = "post";
  dataParams = {
    "idTv" : this.idtv    
  };
  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);

};



dataProducto.prototype.lstMisProductos = function (functionResp)
{
    urlCompProducto = "/listarProductos";
    typeCall = "post";
    dataParams = {
    
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

dataProducto.prototype.lstMisProductosOID = function (functionResp)
{
    urlCompProducto = "/listarProductosPorOid";
    typeCall = "post";
    dataParams = {
      "oid_ciu":this.oid
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

dataProducto.prototype.lstMisProductosOIDAE = function (functionResp)
{
    //urlCompProducto = "/listarproductosporidae_oid";
    urlCompProducto = "/listarProductosPorIdAe_Oid_Ae";

    typeCall = "post";
    dataParams = {
      "oidc":this.oid,
      "id_ae":this.ae
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};




dataProducto.prototype.crearProducto = function (functionResp) {
    //urlCompProducto = "/adicionarProducto";
    urlCompProducto = "/adicionarProducto_ae";   
    typeCall = "post";
    dataParams = {
        "prd_tv_idc" : this.idtv,
        "prd_nombrec" : this.nombre,
        "prd_descripcionc" : this.descripcion,
        "prd_precioc" : parseInt(this.precio),
        "prd_cantidadc" : parseInt(this.cantidad),
        "prd_imagen_pc" : this.imagen_p,
        "prd_imagen_a1c" : this.imagen_a1,
        "prd_imagen_a2c" : this.imagen_a2,
        "prd_oidc" : this.oid,
        "prd_usrc" : this.usr
    };
    console.log(dataParams);
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataProducto.prototype.eliminaMisProductos = function (functionResp)
{
    urlCompProducto = "/eliminaProducto";
    typeCall = "post";
    dataParams = {
      "prd_idc":this.prd_idc
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataProducto.prototype.modificarMiProducto = function (functionResp) {

  urlCompProducto = "/modificarProducto";
  typeCall = "post";
  dataParams = {
      "prd_idc" : this.id,
      "prd_nombrec" : this.nombre,
      "prd_descripcionc" : this.descripcion,
      "prd_precioc" : parseInt(this.precio),
      "prod_aec" : parseInt(this.ae),
      "prod_sucursalc" : parseInt(this.sucursal),
      "prd_marcac" : this.marca,
      "prd_categoriac" : this.categoria,
      "prd_imagen_pc" : this.imagen_p,
      "prd_imagen_a1c" : this.imagen_a1,
      "prd_imagen_a2c" : this.imagen_a2,
      "prd_oidc" : this.oid_ciu,
      "prd_telefono_referenciac" : this.telefono_referencia,
      "prd_usrc" : this.usr
  };
  console.log(dataParams);
  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
function dataPaginaWeb(){
  this.web_id,
  this.web_contenido,
  this.web_url,
  this.web_estado_publicar,
  this.web_registrado,
  this.web_modificado,
  this.web_usr,
  this.web_estado,
  this.web_id_ae
};
dataPaginaWeb.prototype.obtDataPaginaWeb = function (functionResp)
{
    urlCompProducto = "/listarPaginaWebPorIdAe";
    typeCall = "post";
    dataParams = {
      "idAe":this.idAe 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataPaginaWeb.prototype.activaEstadoPublicacion = function (functionResp)
{
  urlCompProducto = "/activarPublicacionPaginaWeb";
    typeCall = "post";
    dataParams = {
      "idWeb":this.idWeb, 
      "idAe":this.idAe 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataPaginaWeb.prototype.desactivaEstadoPublicacion = function (functionResp)
{
  urlCompProducto = "/desactivarPublicacionPaginaWeb";
    typeCall = "post";
    dataParams = {
      "idWeb":this.idWeb, 
      "idAe":this.idAe 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};




/*

function historiaClinica() {
    this.nombres;
    this.paterno;
    this.materno;
    this.ci;
    this.complemento;
    this.sexo;
    this.fechanacimiento;
    this.estcivil;
    this.direccion;
    this.telefono;
    this.expedido;
    this.ocupacion;
    this.usr_id;
    this.zona;
    this.correo;
    this.hospital;
    this.tp_id;
    this.codigoexp;
    this.lugarexpedicion;
    this.dep_codigo_res;
    this.prov_cod_res;
    this.mun_codigo_res;
    this.estciv;
    this.nivelestudio;
    this.idioma;
    this.vlugtra;
    this.vdirtra;
    this.vteltra;
    this.vnomfam;
    this.vtelfam;
    this.vnompad;
    this.vnommad;
    this.vcodigoseg;
    this.vcodigosegsocial;
    this.vdep_codigo_nac;
    this.vmun_codigo_nac;
    this.vembarazada;
    this.vtipo_atencion;
    this.vmacrodistrito;
    this.vdistrito;
    this.vorigen;
    this.vcelular;
    this.vlugarnac;
    this.fecha_creacion_sice;
};


historiaClinica.prototype.crearHistoriaClinicaWeb = function (functionResp) {
    urlComp = "/insertarPacienteSIIS";
    typeCall = "post";
    dataParams = {
        "nombres":this.nombres,
        "paterno":this.paterno,
        "materno":this.materno,
        "ci":this.ci,
        "complemento":this.complemento,
        "sexo":this.sexo,
        "fechanacimiento":this.fechanacimiento,
        "estcivil":this.estcivil,
        "direccion":this.direccion,
        "telefono":this.telefono,
        "expedido":this.expedido,
        "ocupacion":this.ocupacion,
        "usr_id":this.usr_id,
        "zona":this.zona,
        "correo":this.correo,
        "hospital":this.hospital,
        "tp_id":this.tp_id,
        "codigoexp":this.codigoexp,
        "lugarexpedicion":this.lugarexpedicion,
        "dep_codigo_res":this.dep_codigo_res,
        "prov_cod_res":this.prov_cod_res,
        "mun_codigo_res":this.mun_codigo_res,
        "estciv":this.estciv,
        "nivelestudio":this.nivelestudio,
        "idioma":this.idioma,
        "vlugtra":this.vlugtra,
        "vdirtra":this.vdirtra,
        "vteltra":this.vteltra,
        "vnomfam":this.vnomfam,
        "vtelfam":this.vtelfam,
        "vnompad":this.vnompad,
        "vnommad":this.vnommad,
        "vcodigoseg":this.vcodigoseg,
        "vcodigosegsocial":this.vcodigosegsocial,
        "vdep_codigo_nac":this.vdep_codigo_nac,
        "vmun_codigo_nac":this.vmun_codigo_nac,
        "vembarazada":this.vembarazada,
        "vtipo_atencion":this.vtipo_atencion,
        "vmacrodistrito":this.vmacrodistrito,
        "vdistrito":this.vdistrito,
        "vorigen":this.vorigen,
        "vcelular":this.vcelular,
        "vlugarnac":this.vlugarnac,
        "fecha_creacion_sice":this.fecha_creacion_sice              
    };
    ejecutarAjaxSalud(urlComp, typeCall, dataParams, functionResp);
};

function centros(){
  
}

centros.prototype.lstcentrosSalud = function (functionResp)
{
    urlCompSalud = "/lstCentrosweb";
    typeCall = "post";
    dataParams = {
    
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};




dataSalud.prototype.listarDptos = function (functionResp)
{
    urlCompSalud = "/lstDptos";
    typeCall = "post";
    dataParams = {
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.listarMunicipios = function (functionResp)
{
    urlCompSalud = "/lstMunicipios";
    typeCall = "post";
    dataParams = {
      "vdpto_id":this.vdpto_id
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.listarCentros = function (functionResp)
{
    urlCompSalud = "/lstCentros";
    typeCall = "post";
    dataParams = {
      "vdpto_id":this.vdpto_id,
      "vmun_id":this.vmun_id
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};


dataSalud.prototype.buscarSeguro = function (functionResp)
{
    urlCompSalud = "/VerificarSeguroSocial";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.centralRiesgos = function (functionResp)
{
    urlCompSalud = "/centralRiesgos";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.listaHospital = function (functionResp)
{
    urlCompSalud = "/listaHospital";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.listaHospitalIgob = function (functionResp)
{
    urlCompSalud = "/listaHospitalIgob";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};


dataSalud.prototype.listaAtencion = function (functionResp)
{
    urlCompSalud = "/listaAtencion";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.datosPaciente = function (functionResp)
{
    urlCompSalud = "/datosPaciente";
    typeCall = "post";
    dataParams = {
      "ci":  this.ci,
      "idHospital":  this.idHospital
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.listaServicios = function (functionResp)
{
    urlCompSalud = "/listaServicios";
    typeCall = "post";
    dataParams = {
      "genero":  this.genero,
      "idHospital":  this.idHospital,
      "idTipoPaciente":  this.idTipoPaciente,
      "fechaNacimiento":  this.fechaNacimiento
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.fechaServicio = function (functionResp)
{
    urlCompSalud = "/fechaServicio";
    typeCall = "post";
    dataParams = {
      "idServicio":  this.idServicio,
      "idHospital":  this.idHospital
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.doctorServicio = function (functionResp)
{
    urlCompSalud = "/doctorServicio";
    typeCall = "post";
    dataParams = {
      "idHospital":  this.idHospital,
      "fechaDisponible":  this.fechaDisponible,
      "idServicio":  this.idServicio
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.cronogramaServicio = function (functionResp)
{
    urlCompSalud = "/cronogramaServicio";
    typeCall = "post";
    dataParams = {
      "idHospital":  this.idHospital,
      "idTurno":  this.idTurno
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.graficaFichas = function (functionResp)
{
    urlCompSalud = "/graficaFichas";
    typeCall = "post";
    dataParams = {
      "idTurno":  this.idTurno
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.verificaFichas = function (functionResp)
{
    urlCompSalud = "/verificaFichas";
    typeCall = "post";
    dataParams = {
      "idTurno":  this.idTurno,
      "nroFicha":  this.nroFicha
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

dataSalud.prototype.pacienteFicha = function (functionResp)
{
    urlCompSalud = "/pacienteFicha";
    typeCall = "post";
    dataParams = {
      "idHospital":  this.idHospital,
      "idDoctor":  this.idDoctor,
      "idTurno":  this.idTurno,
      "fechaDisponible":  this.fechaDisponible
    };
    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};




dataSalud.prototype.guardarFicha = function (functionResp)
{
    urlCompSalud = "/guardarFicha";
    typeCall = "post";
    dataParams = {
      "idPaciente":  this.idPaciente,
      "idServicio":  this.idServicio,
      "fechaDisponible":  this.fechaDisponible,
      "habilitacion":  this.habilitacion,
      "nroFicha":  this.nroFicha,
      "idHospital":  this.idHospital,
      "idMedico":  this.idMedico,
      "idTurno":  this.idTurno,
      "codigoFicha":  this.codigoFicha,
      "horaInicio":  this.horaInicio,
      "horaFinal":  this.horaFinal,
      "fechaSql":  this.fechaSql,
      "cuaCodigo":  this.cuaCodigo,
      "codigoMedicoSice":  this.codigoMedicoSice,
      "idTipoPaciente":  this.idTipoPaciente,
      "codigoCarpeta":  this.codigoCarpeta,
      "idGrupo":  this.idGrupo,
      "idServicioSice":  this.idServicioSice,
      "nroTrabajoHospital":  this.nroTrabajoHospital,
      "idConsultorio":  this.idConsultorio,
      "idHorario":  this.idHorario,
      "tipoTurno":  this.tipoTurno
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};



function guardarSalud(){
    this.idHospital
    this.id_reg_ciudadano
    this.nombre
    this.paterno
    this.materno
    this.cedula
    this.complemento
    this.sexo
    this.fecha_nacimiento
    this.fechaSQL
    this.coddeptoNac
    this.estado_civil
    this.direccion
    this.telefono
    this.expedido
    this.ocupacionid
    this.zonacodigoVive
    this.correo
    this.tipoSeguroSalud
    this.codigoCarpeta
    this.coddeptoVive
    this.codmunicipVive
    this.codproVive
    this.codigoSeguroSice
    this.codmunicipNac
    this.macrodistritoVive
    this.distritoVive

    this.lugarTrabajo
    this.direccionTrabajo
    this.telefonoTrabajo
    this.responsableFamilia
    this.nombrePadreTutor
    this.nombreMadre
    this.telefonoRef
};

guardarSalud.prototype.guardarHistoria = function (functionResp)
{
    urlCompSalud = "/crearHistoriaClinica";
    typeCall = "post";
    dataParams = {
        "idHospital": this.idHospital,
        "id_reg_ciudadano": this.id_reg_ciudadano,
        "nombre": this.nombre,
        "paterno": this.paterno,
        "materno": this.materno,
        "cedula": this.cedula,
        "complemento": this.complemento,
        "sexo": this.sexo,
        "fecha_nacimiento": this.fecha_nacimiento,
        "fechaSQL": this.fechaSQL,
        "coddeptoNac": this.coddeptoNac,
        "estado_civil": this.estado_civil,
        "direccion": this.direccion,
        "telefono": this.telefono,
        "expedido": this.expedido,
        "ocupacionid": this.ocupacionid,
        "zonacodigoVive": this.zonacodigoVive,
        "correo": this.correo,
        "tipoSeguroSalud": this.tipoSeguroSalud,
        "codigoCarpeta": this.codigoCarpeta,
        "coddeptoVive": this.coddeptoVive,
        "codmunicipVive": this.codmunicipVive,
        "codproVive": this.codproVive,
        "codigoSeguroSice": this.codigoSeguroSice,
        "codmunicipNac": this.codmunicipNac,
        "macrodistritoVive": this.macrodistritoVive,
        "distritoVive": this.distritoVive,
        "lugarTrabajo": this.lugarTrabajo,
        "direccionTrabajo": this.direccionTrabajo,
        "telefonoTrabajo": this.telefonoTrabajo,
        "responsableFamilia": this.responsableFamilia,
        "nombrePadreTutor": this.nombrePadreTutor,
        "nombreMadre": this.nombreMadre,
        "telefonoRef": this.telefonoRef

    };
    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

function dataDinamic() {
    this.consulta;
};

dataDinamic.prototype.SqlDinamic = function (functionResp) {
    try{
        urlComp = "/dinamico";
        typeCall = "post";
        dataParams = {
          "consulta" : this.consulta
        };
        ejecutarAjaxSalud(urlComp, typeCall, dataParams, functionResp);
    } catch(e){
        console.log("Error de conexion : ", e);
    }
};
*/