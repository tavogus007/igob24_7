//var urlSalud = "http://sersalud.lapaz.bo";
//var urlSalud = "http://192.168.5.141:9099";
//var urlSalud = "http://172.19.161.188:9091";
//var urlSalud2 = "http://192.168.34.18:9091";

var urlCompSalud;
var dataResp;
var dataParams;
var typeCall;
var urlSalud = "";
if(jsonURLS){
  var urlSalud = jsonURLS.CONEXION_API_PG_SALUD+"wsSalud";
}
/*///////////////////////////////////////////////// EJECUTAR AJAX /////////////////////////////////////////////////*/
function ejecutarAjaxSalud(vurlCompSalud, vTypeCall, vDataCall, vFunctionResp) {
    //console.log(urlSalud);
    $.ajax({
      type: vTypeCall,
      url: urlSalud + vurlCompSalud,
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

/*///////////////////////////////////////////////// NATURAL /////////////////////////////////////////////////*/
function dataSalud(){
    this.ci
    this.idHospital
    this.genero,
    this.idTipoPaciente,
    this.fechaNacimiento
    this.idServicio,
    this.fechaDisponible,
    this.idTurno
    this.nroFicha
    this.idDoctor,
    this.idPaciente,
    this.habilitacion,
    this.idMedico,
    this.codigoFicha,
    this.horaInicio,
    this.horaFinal
    this.fechaSql,
    this.cuaCodigo,
    this.codigoMedicoSice,
    this.idTipoPaciente,
    this.codigoCarpeta,
    this.idGrupo,
    this.idServicioSice,
    this.nroTrabajoHospital,
    this.idConsultorio,
    this.idHorario,
    this.tipoTurno,
    this.dtpoid,

    this.vidpaciente,
    this.vidservicio,
    this.vfechaatencion,
    this.vhabilitacion,
    this.vnumeroficha,
    this.vhospitalid,
    this.vmedicoid,
    this.vturnoid,
    this.vcodigoficha,
    this.vusuario,
    this.vhorainicioficha,
    this.vhorafinficha,
    this.vtipoconsulta,
    this.vtipopaciente,
    this.vcancelo,
    this.vnro_fila,
    this.vhistoria_sice,
    this.vcentro_salud
};

dataSalud.prototype.reservarFichaInternet = function (functionResp)
{
    urlCompSalud = "/insertarFicha";
    typeCall = "post";
    dataParams = {
    "vidpaciente":this.vidpaciente,
    "vidservicio":this.vidservicio,
    "vfechaatencion":this.vfechaatencion,
    "vhabilitacion":this.vhabilitacion,
    "vnumeroficha":this.vnumeroficha,
    "vhospitalid":this.vhospitalid,
    "vmedicoid":this.vmedicoid,
    "vturnoid":this.vturnoid,
    "vcodigoficha":this.vcodigoficha,
    "vusuario":this.vusuario,
    "vhorainicioficha":this.vhorainicioficha,
    "vhorafinficha":this.vhorafinficha,
    "vtipoconsulta":this.vtipoconsulta,
    "vtipopaciente":this.vtipopaciente,
    "vcancelo":this.vcancelo,
    "vnro_fila":this.vnro_fila,
    "vhistoria_sice":this.vhistoria_sice,
    "vcentro_salud":this.vcentro_salud
    };

    ejecutarAjaxSalud(urlCompSalud, typeCall, dataParams, functionResp);
};

function insertar_actual() {
      this.idHospital;
      this.s_auditoria;
      this.i_operacion;
      this.i_tipo;
      this.i_Emp_Codigo;
      this.i_HCL_CODIGO;
      this.i_HCL_APPAT;
      this.i_HCL_APMAT;
      this.i_HCL_NOMBRE;
      this.i_HCL_NUMCI;
      this.i_HCL_SEXO;
      this.i_HCL_FECNAC;
      this.i_DEP_CODIGO_RES;
      this.i_PRO_CODIGO_RES;
      this.i_MUN_CODIGO_RES;
      this.i_HCL_ESTCIV;
      this.i_HCL_DIRECC;
      this.i_HCL_TELDOM;
      this.i_PProCodPro;
      this.i_HCL_LUGTRA;
      this.i_HCL_DIRTRA;
      this.i_HCL_TELTRA;
      this.i_HCL_NOMFAM;
      this.i_HCL_TELFAM;
      this.i_HCL_NOMPAD;
      this.i_HCL_NOMMAD;
      this.i_HCL_CodCSB;
      this.i_HCL_CodSegSoc;
      this.i_HCL_CodFam;
      this.i_zon_codigo;
      this.i_usuario;
      this.i_DEP_CODIGO_NAC;
      this.i_PRO_CODIGO_NAC;
      this.i_MUN_CODIGO_NAC;
      this.i_hc_alfa;
      this.i_hc_NivelEstudio;
      this.i_HCL_SUMI;
      this.i_HCL_SUMI_FECHA;
      this.i_HCL_TIPODOC;
      this.i_SegSocial;
      this.i_Idioma;
      this.i_IdiomaMaterno;
      this.i_Autopertenencia;
      this.i_LugarExpedicion;
};

insertar_actual.prototype.insertar_actualizar = function (functionResp) {
    urlComp = "/insertar_actualizar";
    typeCall = "post";
    dataParams = {
                  "idHospital":this.idHospital,
                  "s_auditoria":this.s_auditoria,
                  "i_operacion":this.i_operacion,
                  "i_tipo":this.i_tipo,
                  "i_Emp_Codigo":this.i_Emp_Codigo,
                  "i_HCL_CODIGO":this.i_HCL_CODIGO,
                  "i_HCL_APPAT":this.i_HCL_APPAT,
                  "i_HCL_APMAT":this.i_HCL_APMAT,
                  "i_HCL_NOMBRE":this.i_HCL_NOMBRE,
                  "i_HCL_NUMCI":this.i_HCL_NUMCI,
                  "i_HCL_SEXO":this.i_HCL_SEXO,
                  "i_HCL_FECNAC":this.i_HCL_FECNAC,
                  "i_DEP_CODIGO_RES":this.i_DEP_CODIGO_RES,
                  "i_PRO_CODIGO_RES":this.i_PRO_CODIGO_RES,
                  "i_MUN_CODIGO_RES":this.i_MUN_CODIGO_RES,
                  "i_HCL_ESTCIV":this.i_HCL_ESTCIV,
                  "i_HCL_DIRECC":this.i_HCL_DIRECC,
                  "i_HCL_TELDOM":this.i_HCL_TELDOM,
                  "i_PProCodPro":this.i_PProCodPro,
                  "i_HCL_LUGTRA":this.i_HCL_LUGTRA,
                  "i_HCL_DIRTRA":this.i_HCL_DIRTRA,
                  "i_HCL_TELTRA":this.i_HCL_TELTRA,
                  "i_HCL_NOMFAM":this.i_HCL_NOMFAM,
                  "i_HCL_TELFAM":this.i_HCL_TELFAM,
                  "i_HCL_NOMPAD":this.i_HCL_NOMPAD,
                  "i_HCL_NOMMAD":this.i_HCL_NOMMAD,
                  "i_HCL_CodCSB":this.i_HCL_CodCSB,
                  "i_HCL_CodSegSoc":this.i_HCL_CodSegSoc,
                  "i_HCL_CodFam":this.i_HCL_CodFam,
                  "i_zon_codigo":this.i_zon_codigo,
                  "i_usuario":this.i_usuario,
                  "i_DEP_CODIGO_NAC":this.i_DEP_CODIGO_NAC,
                  "i_PRO_CODIGO_NAC":this.i_PRO_CODIGO_NAC,
                  "i_MUN_CODIGO_NAC":this.i_MUN_CODIGO_NAC,
                  "i_hc_alfa":this.i_hc_alfa,
                  "i_hc_NivelEstudio":this.i_hc_NivelEstudio,
                  "i_HCL_SUMI":this.i_HCL_SUMI,
                  "i_HCL_SUMI_FECHA":this.i_HCL_SUMI_FECHA,
                  "i_HCL_TIPODOC":this.i_HCL_TIPODOC,
                  "i_SegSocial":this.i_SegSocial,
                  "i_Idioma":this.i_Idioma,
                  "i_IdiomaMaterno":this.i_IdiomaMaterno,
                  "i_Autopertenencia":this.i_Autopertenencia,
                  "i_LugarExpedicion":this.i_LugarExpedicion
        };
    ejecutarAjaxSalud(urlComp, typeCall, dataParams, functionResp);
};

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
        "fecha_creacion_sice":this.fecha_creacion_sice,
        "vconyuge":this.vconyuge,
        "votras_personas":this.votras_personas,
        "vpaterno_proximo":this.vpaterno_proximo,
        "vmaterno_proximo":this.vmaterno_proximo,
        "vnombre_proximo":this.vnombre_proximo,
        "vciudad_proximo":this.vciudad_proximo,
        "vzona_proximo":this.vzona_proximo,
        "vcalle_proximo":this.vcalle_proximo,
        "vtelefono_proximo":this.vtelefono_proximo
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