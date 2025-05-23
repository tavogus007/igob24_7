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
    
  this.idTv,
  this.ae_id,
  this.categoria,
  this.nombre,
  this.correo,
  this.pagina_web,
  this.descripcion,
  this.contactos,
  this.redes_sociales,
  this.ofertas,
  this.oid,
  this.usr,
  this.catalogo,
  this.logotipo,
  this.encabezado,
  this.forma_entrega,
  this.horarios,
  this.dominio
};

dataTiendaVirtual.prototype.crearTiendaVirtual = function (functionResp)
{
  urlCompProducto = "/addtiendavirtual";
  typeCall = "post";
  dataParams = {
    "stv_ae_id":this.ae_id,
    "stv_categoria_id":this.categoria,

    "stv_nombre":this.nombre,
    "stv_correo":this.correo,
    "stv_pagina_web":this.pagina_web,
    "stv_descripcion":this.descripcion,
    "stv_contactos":this.contactos,
    "stv_redes_sociales":this.redes_sociales,
    "stv_ofertas":this.ofertas,
    "stv_oid":this.oid,
    "stv_usr":this.usr,    
    "stv_catalogo":this.catalogo,
    "stv_logotipo":this.logotipo,
    "stv_encabezado":this.encabezado,
    "stv_forma_entrega":this.forma_entrega,
    "stv_horarios":this.horarios,
    "stv_dominio":this.dominio  
  };
  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

dataTiendaVirtual.prototype.actualizarTiendaVirtual = function (functionResp)
{
  urlCompProducto = "/updatetiendavirtual";
  typeCall = "post";
  dataParams = {
    "idtv":this.idtv,
    "stv_ae_id":this.ae_id,
    "stv_categoria_id":this.categoria,
    "stv_nombre":this.nombre,
    "stv_correo":this.correo,
    "stv_pagina_web":this.pagina_web,
    "stv_descripcion":this.descripcion,
    "stv_contactos":this.contactos,
    "stv_redes_sociales":this.redes_sociales,
    "stv_ofertas":this.ofertas,
    "stv_oid":this.oid,
    "stv_usr":this.usr,    
    "stv_catalogo":this.catalogo,
    "stv_logotipo":this.logotipo,
    "stv_encabezado":this.encabezado,
    "stv_forma_entrega":this.forma_entrega,
    "stv_horarios":this.horarios,
    "stv_dominio":this.dominio                    
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

dataTiendaVirtual.prototype.obtCategorias = function (functionResp)
{
    urlCompProducto = "/listarCategoriasProductos";
    typeCall = "post";
    dataParams = {
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataTiendaVirtual.prototype.verificarDominio = function (functionResp)
{
    urlCompProducto = "/verificaDominio";
    typeCall = "post";
    dataParams = {
      "dominio":this.dominio 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

function dataProducto(){
    this.id,
    this.idtv,
    this.idae,
    this.nombre,
    this.descripcion,
    this.precio,
    this.cantidad,
    this.imagen_p,
    this.imagen_a1,
    this.imagen_a2,
    this.oid,
    this.usr,
    this.prd_idc,
    this.prd_ofertac,
    this.prd_descripcion_ofertac,
    this.prd_oferta_defechac,
    this.prd_ofertac_hastafechac
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
dataProducto.prototype.listarProductoTVPW = function (functionResp)
{
  urlCompProducto = "/listarProductosPorIdAe_ae";
  typeCall = "post";
  dataParams = {
    "idAe" : this.idae    
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
        "prd_precioc" : this.precio,
        "prd_imagen_pc" : this.imagen_p,
        "prd_imagen_a1c" : this.imagen_a1,
        "prd_imagen_a2c" : this.imagen_a2,
        "prd_oidc" : this.oid,
        "prd_usrc" : this.usr,
        "prd_ofertac" : this.prd_ofertac,
        "prd_descripcion_ofertac" : this.prd_descripcion_ofertac,
        "prd_oferta_defechac" : this.prd_oferta_defechac,
        "prd_oferta_hastafechac" : this.prd_oferta_hastafechac

    };
    console.log(dataParams);
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataProducto.prototype.eliminaMisProductos = function (functionResp)
{
    urlCompProducto = "/eliminaProducto_ae";
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
      "prd_idc" : this.prd_idc,
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
      "prd_usrc" : this.usr,
      "prd_ofertac" : this.prd_ofertac,
      "prd_descripcion_ofertac" : this.prd_descripcion_ofertac,
      "prd_oferta_defechac" : this.prd_oferta_defechac,
      "prd_oferta_hastafechac" : this.prd_oferta_hastafechac

  };

  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

function dataProductoMod(){
    this.prd_idc,
    this.prd_tv_idc,
    this.prd_nombrec,
    this.prd_descripcionc,
    this.prd_precioc,
    this.prd_imagen_pc,
    this.prd_imagen_a1c,
    this.prd_imagen_a2c,
    this.prd_usrc
    
};

dataProductoMod.prototype.modificarProductoAe = function (functionResp) {
  urlCompProducto = "/modificarProducto_ae";
  typeCall = "post";
  dataParams = {
      "prd_idc" : this.prd_idc,
      "prd_tv_idc" : this.prd_tv_idc,
      "prd_nombrec" : this.prd_nombrec,
      "prd_descripcionc" : this.prd_descripcionc,
      "prd_precioc" : this.prd_precioc,
      "prd_imagen_pc" : this.prd_imagen_pc,
      "prd_imagen_a1c" : this.prd_imagen_a1c,
      "prd_imagen_a2c" : this.prd_imagen_a2c,
      "prd_usrc" : this.prd_usrc,
      "prd_ofertac" : this.prd_ofertac,
      "prd_descripcion_ofertac" : this.prd_descripcion_ofertac,
      "prd_oferta_defechac" : this.prd_oferta_defechac,
      "prd_oferta_hastafechac" : this.prd_oferta_hastafechac
  };
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
      "idAe":this.web_id_ae
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

dataPaginaWeb.prototype.addPaginaWeb = function (functionResp)
{
    urlCompProducto = "/adicionarPaginaWeb";
    typeCall = "post";
    dataParams = {
      "web_contenido":this.web_contenido,
      "web_url":this.web_url,
      "web_usuario":this.web_usr, 
      "web_idae":this.web_id_ae 
    };
    ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};
dataPaginaWeb.prototype.updPaginaWeb = function (functionResp)
{
    urlCompProducto = "/modificarPaginaWeb";
    typeCall = "post";
    dataParams = {
      "web_id":this.web_id,
      "web_contenido":this.web_contenido,
      "web_url":this.web_url,
      "web_estado":this.web_estado_publicar,
      "web_usuario":this.web_usr, 
      "web_idae":this.web_id_ae 
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

function dataProductoAc(){
    this.prd_idc
};


dataProductoAc.prototype.activarProductoAe = function (functionResp)
{
  urlCompProducto = "/activarProducto";
  typeCall = "post";
  dataParams = {
    "prd_idc" : this.prd_idc    
  };
  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);

};

dataProductoAc.prototype.desactivarProductoAe = function (functionResp)
{
  urlCompProducto = "/desactivarProducto";
  typeCall = "post";
  dataParams = {
    "prd_idc" : this.prd_idc    
  };
  ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);
};

function dataEstadoProducto(){
  this.vt_id,
  this.vt_estado,
  this.vt_observacion
};


dataEstadoProducto.prototype.getEstadoProducto = function (functionResp)
{
urlCompProducto = "/getEstadoProducto";
typeCall = "post";
dataParams = {
  "idVenta" : this.vt_id    
};
ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);

};

dataEstadoProducto.prototype.actEstadoVenta = function (functionResp)
{
urlCompProducto = "/actEstadoVenta";
typeCall = "post";
dataParams = {
  "ven_idc"    : this.vt_id,
  "ven_estado" : this.vt_estado,
  "ven_obs"    : this.vt_observacion
};
ejecutarAjaxProducto(urlCompProducto, typeCall, dataParams, functionResp);

};