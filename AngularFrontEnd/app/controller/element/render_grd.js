function addRow(cadena,tableID){
    var adicionarcalculo = 0;
    var form_rc = 0;
    var existe = 0;
    var matriz = cadena.split(',');
    if(document.getElementById('myModalGrilla') != null){
        elemento=document.getElementById('myModalGrilla');
        elemento.parentNode.removeChild(elemento);
    }
    Modal.innerHTML = '<div></div>';
    Modal.id = 'myModalGrilla';
    Modal.className = 'modal fade';
    Modal.setAttribute("data-backdrop", "static");
    document.body.appendChild(Modal);
    var dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    Modal.appendChild(dialog);
    var content = document.createElement('div');
    content.className = 'modal-content';
    dialog.appendChild(content);
    var header = document.createElement('div');
    header.className = 'modal-header';
    content.appendChild(header);
    var cerrarmodal = document.createElement('button');
    cerrarmodal.type = "button"
    cerrarmodal.className = 'close';
    cerrarmodal.setAttribute("data-dismiss", "modal");
    cerrarmodal.setAttribute("aria-label", "Close");
    cerrarmodal.innerText = 'x';
    header.appendChild(cerrarmodal);       
    var title = document.createElement('h4');
    title.className = 'modal-title';
    title.innerText = 'Nuevo Registro ';
    header.appendChild(title);
    var body = document.createElement('div');
    body.id="fmrgrilla";
    body.className = 'modal-body';
    content.appendChild(body);
    var calculo = 0;
    var requerido = 0;
    var obligatorio = 1;
    var obligatori = 1;
    for(var i = 0 ; i <= matriz.length-7 ;i=i+7){
        var combo = matriz[i+2].split(':');
        var br = document.createElement('br');
        body.appendChild(br);
        var div = document.createElement('div');
        div.className = 'row';
        body.appendChild(div);
        var div1 = document.createElement('div');
        div1.className = 'col-md-3';
        div.appendChild(div1);
        var div2 = document.createElement('div');
        div2.className = 'col-md-7';
        div.appendChild(div2);
        var label = document.createElement("Label");
        label.htmlFor = "text" + i
        label.innerHTML= matriz[i];
        div1.appendChild(label);
        var tip;
        if(matriz[i+4] == 'lectura'){
            tip = document.createElement("input");
            tip.id = matriz[i+1];
            tip.className = "form-control";
            tip.type = "text";
            tip.readOnly = true;
            tip.disabled = true;
        }
        else{
            /*TEXT AREA EN LA GRILLA*/
            if(matriz[i+2]=='TXTA'){
                tip = document.createElement("textarea");
                tip.id = matriz[i+1];
                tip.className = "form-control";
                //tip.type = "numbe";
                tip.step = "any";
            }
            if(matriz[i+2]=='TXT'){
                tip = document.createElement("input");
                tip.id = matriz[i+1];
                tip.className = "form-control";
                //tip.type = "text";
                tip.value = document.createElement("input").value; 
      
                /////////////////////////////////VALIDACION DE TELEFONOS EN GRILLA DE NIÑOS-CREAR////////////////////////////////////////////
                 if (matriz[i+1]=="f01_USU_TER_TEL" || matriz[i+1]=="f01_AGR_TER_TEL" || matriz[i+1]=="f01_GF_TER_TEL" || matriz[i+1]=="f01_DENUN_TER_TEL") { 
                  tip.type = "number"; 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[11]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 7 && verific == "2" || telefono.length == 7 && verific == "3" || telefono.length == 7 &&verific == "4") { 

                      }else { 

                        sweetAlert('Número telefonico inválido', 'Ej. 2545789', 'error'); 
                        document.getElementById(consultas[11]).value = ""; 
                      } 
                  } 
                }else{ 
                  tip.type = "text"; 
                } 
                if (matriz[i+1]=="f01_USU_G_TELF" || matriz[i+1]=="f01_AGR_G_TELF" || matriz[i+1]=="f01_GF_G_TELF" || matriz[i+1]=="f01_DENUN_G_TELF") { 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[12]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 8 && verific == "7" || telefono.length == 8 && verific == "6") { 
                      }else { 
                        sweetAlert('Número de celular inválido', 'Ej. 75260602', 'error'); 
                        document.getElementById(consultas[12]).value = ""; 
                      } 
                  } 
                }else{ 
                  tip.type = "text"; 
                }
                ///////////////////////////////////VALIDACION DE TELEFONOS EN GRILLA DE ADULTOS MAYORES/////////////////////////////////////////////////
                 if (matriz[i+1]=="f01_TAM_TER_TEL") { 
                  tip.type = "number"; 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[15]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 7 && verific == "2" || telefono.length == 7 && verific == "3" || telefono.length == 7 &&verific == "4") { 

                      }else { 

                        sweetAlert('Número telefonico inválido', 'Ej. 2545789', 'error'); 
                        document.getElementById(consultas[15]).value = ""; 
                      } 
                  } 
                }else{ 
                  tip.type = "text"; 
                } 
                if (matriz[i+1]=="f01_TAM_G_TELF") { 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[16]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 8 && verific == "7" || telefono.length == 8 && verific == "6") { 
                      }else { 
                        sweetAlert('Número de celular inválido', 'Ej. 75260602', 'error'); 
                        document.getElementById(consultas[16]).value = ""; 
                      } 
                  } 
                }else{ 
                  tip.type = "text"; 
                }
                if (matriz[i+5] == 'BSQ'){
                    var consulta = matriz[i+6];
                    var busquedas = consulta.split("#");
                    tip.onchange = function() {
                        angular.element(document.getElementById('renderFormulario')).scope().bucarProhibidoNombre(document.getElementById(busquedas[0]).value,document.getElementById(busquedas[1]).value,document.getElementById(busquedas[2]).value);
                    }
                } else if(matriz[i+5] == 'RC'){
                    form_rc = 1;
                    var consulta = matriz[i+6];
                    var dependiente = matriz[i+5];
                    var campo = matriz[i+1]; 
                    var carnet = matriz[i-6];
                    consultas = consulta.split("#");
                    tip.onchange = function() {
                        tipodoc = document.getElementById(carnet).value;
                        ciciudadano = document.getElementById(campo).value;
                        angular.element(document.getElementById('renderFormulario')).scope().bucarProhibido(ciciudadano,tipodoc);
                        if(tipodoc == 'CI'){
                            cicomplemento = " ";
                            var cicomp = ciciudadano.split("-");
                            var datosCiudadano = new rcNatural();
                            if(cicomp.length>1){
                                ciciudadano = cicomp[0];
                                cicomplemento = cicomp[1];
                                datosCiudadano.complemento = cicomplemento; 
                            }
                            datosCiudadano.ci = ciciudadano;    
                            datosCiudadano.buscarNatural(function(resultado){
                                //document.getElementById("fmrgrilla").reset();
                                results = JSON.parse(resultado);
                                if(results.length > 0 ){
                                    console.log(matriz.length);
                                    var departamentosA = ["BNI","CBB","CHQ","LPZ","ORU","PND","PTS","SCZ","TJA","EXT"];
                                    if (parseInt(results[0].dtspsl_expedido) == 1||parseInt(results[0].dtspsl_expedido) == 2||parseInt(results[0].dtspsl_expedido) == 3||parseInt(results[0].dtspsl_expedido) == 4||parseInt(results[0].dtspsl_expedido) == 5||parseInt(results[0].dtspsl_expedido) == 6||parseInt(results[0].dtspsl_expedido) == 7||parseInt(results[0].dtspsl_expedido) == 8||parseInt(results[0].dtspsl_expedido) == 9||parseInt(results[0].dtspsl_expedido) == 10)
                                    results[0].dtspsl_expedido = departamentosA[parseInt(results[0].dtspsl_expedido) -1];
                                    var expedido  =  ((typeof(results[0].dtspsl_expedido)  == 'undefined' || results[0].dtspsl_expedido == null || results[0].dtspsl_expedido.trim() == "") ? '-1' : results[0].dtspsl_expedido);
                                    var nombres  =   ((typeof(results[0].dtspsl_nombres)  == 'undefined' || results[0].dtspsl_nombres == null) ? '' : results[0].dtspsl_nombres); 
                                    var paterno  =   ((typeof(results[0].dtspsl_paterno)  == 'undefined' || results[0].dtspsl_paterno == null) ? '' : results[0].dtspsl_paterno); 
                                    var materno  =   ((typeof(results[0].dtspsl_materno)  == 'undefined' || results[0].dtspsl_materno == null) ? '' : results[0].dtspsl_materno); 
                                    var fec_nacimiento  =   ((typeof(results[0].dtspsl_fec_nacimiento)  == 'undefined' || results[0].dtspsl_fec_nacimiento == null) ? '' : results[0].dtspsl_fec_nacimiento); 
                                    var lugar_nacimiento  =   ((typeof(results[0].dtspsl_lugar_nacimiento)  == 'undefined' || results[0].dtspsl_lugar_nacimiento == null || results[0].dtspsl_lugar_nacimiento.trim() == "") ? '-1' : results[0].dtspsl_lugar_nacimiento);  
                                    var departamento_r  =   ((typeof(results[0].dtspsl_departamento)  == 'undefined' || results[0].dtspsl_departamento == null || results[0].dtspsl_departamento.trim() == "") ? '-1' : results[0].dtspsl_departamento);
                                    var sexo  =   ((typeof(results[0].dtspsl_sexo)  == 'undefined' || results[0].dtspsl_sexo == null || results[0].dtspsl_sexo.trim() == "") ? '-1' : results[0].dtspsl_sexo);  
                                    var pais  =   ((typeof(results[0].dtspsl_pais)  == 'undefined' || results[0].dtspsl_pais == null || results[0].dtspsl_pais.trim() == "") ? '-1' : results[0].dtspsl_pais);  
                                    var departamento  =   ((typeof(results[0].dtspsl_departamento)  == 'undefined' || results[0].dtspsl_departamento == null || results[0].dtspsl_departamento.trim() == "") ? '-1' : results[0].dtspsl_departamento);
                                    var provincia  =   ((typeof(results[0].dtspsl_provincia)  == 'undefined' || results[0].dtspsl_provincia == null || results[0].dtspsl_provincia.trim() == "") ? '-1' : results[0].dtspsl_provincia);
                                    var municipio  =   ((typeof(results[0].dtspsl_municipio)  == 'undefined' || results[0].dtspsl_municipio == null || results[0].dtspsl_municipio.trim() == "") ? '-1' : results[0].dtspsl_municipio);
                                    var macrodistrito  =   ((typeof(results[0].dtspsl_macrodistrito)  == 'undefined' || results[0].dtspsl_macrodistrito == null || results[0].dtspsl_macrodistrito.trim() == "" || isNaN(results[0].dtspsl_macrodistrito) == true) ? '-1' : results[0].dtspsl_macrodistrito); 
                                    var zona  =   ((typeof(results[0].dtspsl_zona)  == 'undefined' || results[0].dtspsl_zona == null || results[0].dtspsl_zona.trim() == "" || isNaN(results[0].dtspsl_zona) == true) ? '-1' : results[0].dtspsl_zona); 
                                    var direccion  =   ((typeof(results[0].dtspsl_direccion)  == 'undefined' || results[0].dtspsl_direccion == null) ? '' : results[0].dtspsl_direccion); 
                                    var telefono  =   ((typeof(results[0].dtspsl_telefono)  == 'undefined' || results[0].dtspsl_telefono == null) ? '' : results[0].dtspsl_telefono); 
                                    var movil  =   ((typeof(results[0].dtspsl_movil)  == 'undefined' || results[0].dtspsl_movil == null) ? '' : results[0].dtspsl_movil); 

                                    existe = 1;


                                    sweetAlert('', 'Ciudadano Existente', 'success');
                                    //NO TOCAR 
                                    //ADULTO MAYOR
                                   if(matriz.length==140){

                                     var consultsql = "select zona_id as valor, dist_nombre||& - &||zona_nombre as dato from ae._ae_distritos , ae._ae_zona where dist_macro_id = "+results[0].dtspsl_macrodistrito+" and zona_distrito_id = dist_id order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[13],consultsql );
                                    //provincias 
                                    /*var consultsql1 = "select prv_codigo_compuesto as valor, prv_provincia as dato from _bp_provincias where prv_dpto_codigo = '"+results[0].dtspsl_departamento+"' order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[10],consultsql1 );
                                    setTimeout(function(){  document.getElementById(consultas[10]).value = results[0].dtspsl_provincia; }, 2000);-LUZ*/
                                    var consultsql2 = "select  mnc_codigo_compuesto as valor, mnc_municipio as dato from _bp_municipios where mnc_codigo_compuesto_prov = '"+results[0].dtspsl_provincia+"' order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[11],consultsql2 );
                                    setTimeout(function(){  document.getElementById(consultas[11]).value = results[0].dtspsl_municipio; }, 2000);
                                    
                                    //provincias 
                                    /*var consultsql1 = "select prv_codigo_compuesto as valor, prv_provincia as dato from _bp_provincias where prv_dpto_codigo = '"+results[0].dtspsl_departamento+"' order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[10],consultsql1);-LUZ*/
                                    //setTimeout(function(){  document.getElementById(consultas[10]).value = results[0].dtspsl_provincia; }, 2000);
                                    document.getElementById(consultas[0]).value = expedido;
                                    document.getElementById(consultas[1]).value = nombres;
                                    document.getElementById(consultas[2]).value = paterno;
                                    document.getElementById(consultas[3]).value = materno;
                                    
                                    /////////////////////////////////////////////CALCULA LOS AÑOS CON LA FECHA DE NACIMIENTO///////////////////////////////////////////////
                                    /////////////////////////////////////////////ACTUALIZACION 15/03/2018///////////////////////////////////////////////
                                    var fecnac = new Date(results[0].dtspsl_fec_nacimiento);
                                    var mes = fecnac.getMonth() + 1;
                                    var dia = fecnac.getDate();
                                    if(fecnac.getDate()<10){
                                        dia = "0"+ dia;
                                    }
                                    if(fecnac.getMonth()<9){
                                        mes = "0"+ mes;
                                    }
                                    results[0].dtspsl_fec_nacimiento = fecnac.getFullYear()+"-"+mes+"-"+dia;
                                    try {
                                    var fec_act2 = new Date(fec_nacimiento);
                                    var mes = fecnac.getMonth() + 1;
                                    var dia = fec_act2.getDate();
                                    if(fec_act2.getDate()<10){
                                        dia = "0"+ dia;
                                    }
                                    if(fec_act2.getMonth()<9){
                                        mes = "0"+ mes;
                                    }
                                   var calculo_edad2 = fec_act2.getFullYear();

                                    var fec_act = new Date();
                                     console.log(fec_act,"fecha actual");
                                    var mes = fecnac.getMonth() + 1;
                                    var dia = fec_act.getDate();
                                    if(fec_act.getDate()<10){
                                        dia = "0"+ dia;
                                    }
                                    if(fec_act.getMonth()<9){
                                        mes = "0"+ mes;
                                    }
                                    
                                        var calculo_edad = fec_act.getFullYear();
                                        var edad = calculo_edad-calculo_edad2;
                                        if(edad < 60 && matriz.length==140){
                                            document.getElementById("f01_EDAD").value=""; 
                                            $("#btnGuardarGrilla").attr("disabled", true);
                                            sweetAlert('Menor de 60 años', '', 'error');                                                
                                        }else{
                                            $("#btnGuardarGrilla").attr("disabled", false);
                                            document.getElementById("f01_EDAD").value=""+edad+"";
                                        }
                                        console.log("EDAD 1 :", edad);                             
                                   
                                   }catch(error) {
                                    console.log('NO TIENE EL CAMPO EDAD');
                                   }
                                    //////////////////////////////////////////////FIN CALCULA LOS AÑOS CON LA FECHA DE NACIMIENTO//////////////////////////////////////////


                                    document.getElementById(consultas[4]).value = fec_nacimiento;
                                    document.getElementById(consultas[5]).value = lugar_nacimiento;
                                    document.getElementById(consultas[6]).value = departamento;
                                    document.getElementById(consultas[7]).value = sexo;
                                    document.getElementById(consultas[8]).value = pais;
                                    document.getElementById(consultas[9]).value = departamento;  
                                    document.getElementById("f01_TAM_PAIS").value= "1";////////llluz 
                                    document.getElementById("f01_TAM_DPTO").value= "LPZ";////////llluz                                      
                                    document.getElementById(consultas[10]).value = provincia;
                                    document.getElementById(consultas[11]).value = municipio;
                                    document.getElementById(consultas[12]).value = macrodistrito;
                                    setTimeout(function(){ document.getElementById(consultas[13]).value = zona; }, 2000);  
                                    document.getElementById(consultas[14]).value = direccion;
                                    document.getElementById(consultas[15]).value = telefono;
                                    document.getElementById(consultas[16]).value = movil;

                                   }
                                 // defensorias 168=USU, DENUN; 175=AGR, GF
                                    if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175 ||matriz.length==183){
                                        console.log("defensorias");
                                        console.log("resultsssssssssssssss",results);
                                         var consultsql = "select zona_id as valor, dist_nombre||& - &||zona_nombre as dato from ae._ae_distritos , ae._ae_zona where dist_macro_id = "+results[0].dtspsl_macrodistrito+" and zona_distrito_id = dist_id order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[9],consultsql );
                                    document.getElementById(consultas[0]).value = expedido;
                                    document.getElementById(consultas[1]).value = nombres;
                                    document.getElementById(consultas[2]).value = paterno;
                                    document.getElementById(consultas[3]).value = materno;
                                    var fecnac = new Date(results[0].dtspsl_fec_nacimiento);
                                    var mes = fecnac.getMonth() + 1;
                                    var dia = fecnac.getDate();
                                    if(fecnac.getDate()<10){
                                        dia = "0"+ dia;
                                    }
                                    if(fecnac.getMonth()<9){
                                        mes = "0"+ mes;
                                    }
                                    results[0].dtspsl_fec_nacimiento = fecnac.getFullYear()+"-"+mes+"-"+dia;
                  /////////////////////////////////////////////CALCULA LOS AÑOS CON LA FECHA DE NACIMIENTO///////////////////////////////////////////////
                                    try {
                                    var fec_act2 = new Date(fec_nacimiento);
                                    var mes = fec_act2.getMonth() + 1;
                                    var dia = fec_act2.getDate();
                                    /*if(fec_act2.getDate()<10){
                                        dia = "0"+ dia;
                                    }
                                    if(fec_act2.getMonth()<9){
                                        mes = "0"+ mes;
                                    }*/

                                   var calculo_edad2 = fec_act2.getFullYear();

                                    var fec_act = new Date();
                                     console.log(fec_act,"fecha actual");
                                    var mes2 = fecnac.getMonth() + 1;
                                    var dia2 = fec_act.getDate();
                                    /*if(fec_act.getDate()<10){
                                        dia2 = "0"+ dia2;
                                    }
                                    if(fec_act.getMonth()<9){
                                        mes2 = "0"+ mes2;
                                    }*/
                                   var calculo_edad = fec_act.getFullYear();
                                   var edad = calculo_edad-calculo_edad2;
                                   var mes_cal = mes2 - mes;
                                   var dias_cal = dia2 -dia;
                                   document.getElementById("f01_EDAD").value=""+edad+" años "+ mes_cal +" meses "+dias_cal+" dias";
                                   }catch(error) {
                                    console.log('NO TIENE EL CAMPO EDAD');
                                   }

                  //////////////////////////////////////////////FIN CALCULA LOS AÑOS CON LA FECHA DE NACIMIENTO//////////////////////////////////////////
                                    
                                    document.getElementById(consultas[4]).value = fec_nacimiento;
                                    document.getElementById(consultas[5]).value = lugar_nacimiento;
                                    document.getElementById(consultas[6]).value = departamento;
                                    document.getElementById(consultas[7]).value = sexo;
                                    document.getElementById(consultas[8]).value = macrodistrito;
                                    setTimeout(function(){ document.getElementById(consultas[9]).value = zona; }, 2000);
                                    document.getElementById(consultas[10]).value = direccion;
                                    document.getElementById(consultas[11]).value = telefono;
                                    document.getElementById(consultas[12]).value = movil;
                                    }
                                }else{
                                    existe = 0;

                                  if(matriz.length==140){
                                    document.getElementById(consultas[0]).value = "-1";
                                    document.getElementById(consultas[1]).value = "";
                                    document.getElementById(consultas[2]).value = "";
                                    document.getElementById(consultas[3]).value = "";
                                    document.getElementById(consultas[4]).value = "";
                                    document.getElementById(consultas[5]).value = "-1";
                                    document.getElementById(consultas[6]).value = "-1";
                                    document.getElementById(consultas[7]).value = "-1";
                                    document.getElementById(consultas[8]).value = "-1";
                                    document.getElementById(consultas[9]).value = "-1";
                                    document.getElementById("f01_TAM_PAIS").value= "1";////////llluz 
                                    document.getElementById("f01_TAM_DPTO").value= "LPZ";////////llluz                                      
                                    document.getElementById(consultas[10]).value = "-1";
                                    document.getElementById(consultas[11]).value = "-1";
                                    document.getElementById(consultas[12]).value = "-1";
                                    document.getElementById(consultas[13]).value = "-1";
                                    document.getElementById(consultas[14]).value = "";
                                    document.getElementById(consultas[15]).value = "";
                                    document.getElementById(consultas[16]).value = "";
                                  }
                                 if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                                    document.getElementById(consultas[0]).value = "-1";
                                    document.getElementById(consultas[1]).value = "";
                                    document.getElementById(consultas[2]).value = "";
                                    document.getElementById(consultas[3]).value = "";
                                    document.getElementById(consultas[4]).value = "";
                                    document.getElementById(consultas[5]).value = "-1";
                                    document.getElementById(consultas[6]).value = "-1";
                                    document.getElementById(consultas[7]).value = "-1";
                                    document.getElementById(consultas[8]).value = "-1";
                                    document.getElementById(consultas[9]).value = "-1";
                                    document.getElementById(consultas[10]).value = "";
                                    document.getElementById(consultas[11]).value = "";
                                    document.getElementById(consultas[12]).value = "";
                                    }

                                    sweetAlert('', 'Ciudadano No Existente', 'error');
                                   
                                   // document.getElementById(consultas[13]).value = "";
                                }
                            });
                        }
                        else{
                            
                            if(matriz.length==140){
                                    document.getElementById(consultas[0]).value = "-1";
                                    document.getElementById(consultas[1]).value = "";
                                    document.getElementById(consultas[2]).value = "";
                                    document.getElementById(consultas[3]).value = "";
                                    document.getElementById(consultas[4]).value = "";
                                    document.getElementById(consultas[5]).value = "-1";
                                    document.getElementById(consultas[6]).value = "-1";
                                    document.getElementById(consultas[7]).value = "-1";
                                    document.getElementById(consultas[8]).value = "-1";
                                    document.getElementById(consultas[9]).value = "-1";
                                    document.getElementById(consultas[10]).value = "-1";
                                    document.getElementById(consultas[11]).value = "-1";
                                    document.getElementById(consultas[12]).value = "-1";
                                    document.getElementById(consultas[13]).value = "-1";
                                    document.getElementById(consultas[14]).value = "";
                                    document.getElementById(consultas[15]).value = "";
                                    document.getElementById(consultas[16]).value = "";
                                  }
                                 if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                                    document.getElementById(consultas[0]).value = "-1";
                                    document.getElementById(consultas[1]).value = "";
                                    document.getElementById(consultas[2]).value = "";
                                    document.getElementById(consultas[3]).value = "";
                                    document.getElementById(consultas[4]).value = "";
                                    document.getElementById(consultas[5]).value = "-1";
                                    document.getElementById(consultas[6]).value = "-1";
                                    document.getElementById(consultas[7]).value = "-1";
                                    document.getElementById(consultas[8]).value = "-1";
                                    document.getElementById(consultas[9]).value = "-1";
                                    document.getElementById(consultas[10]).value = "";
                                    document.getElementById(consultas[11]).value = "";
                                    document.getElementById(consultas[12]).value = "";
                                    }
                           // document.getElementById(consultas[13]).value = "";
                        }
                    };
                } else if(matriz[i+5] != '-'  && matriz[i+5]  != ""){
                    var consulta = matriz[i+6];
                    var dependiente = matriz[i+5];
                    var campo = matriz[i+1]; 
                    tip.onchange = function() {
                        var valorDependencia = document.getElementById(campo).value;
                        var xConsulta = consulta.replace("*",",");  
                        xConsulta = xConsulta.replace("xId", valorDependencia); 
                        angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependiente, xConsulta);
                    };
                }
            }else if(matriz[i+2]=='NRO'){
                tip = document.createElement("input");
                tip.id = matriz[i+1];
                tip.className = "form-control";
                tip.type = "number";
                tip.step = "any";
            }else if(matriz[i+2]=='SUM'){
                adicionarcalculo = 1;
                tip = document.createElement("input");
                tip.id = matriz[i+1];
                tip.className = "form-control";
                tip.type = "number";
                tip.step = "any";
            }else if(matriz[i+2]=='PROM'){
                adicionarcalculo = 1;
                tip = document.createElement("input");
                tip.id = matriz[i+1]; 
                tip.type = "number";
                tip.step = "any";
                tip.className = "form-control";
            }else if(matriz[i+2]=='ARC'){
                tip = document.createElement("div");
                tip.className = "custom-upload";
                var tip2;
                tip2 = document.createElement("input");
                tip2.type = "file";
                tip2.id = matriz[i+1];
                tip2.setAttribute("accept", "image/*");
                var campoArc = matriz[i+1];
                tip2.onchange = function(){
                    var a = $(this).val();
                    var z = a.split("\\");
                    if (z[2] === undefined){
                        document.getElementById('l_'+campoArc).value = a;
                    }
                    else{
                        document.getElementById('l_'+campoArc).value = z[2];
                    }                        
                }
                tip.appendChild(tip2);
                var tip3 = document.createElement("div");
                tip3.className = "fake-file";
                tip.appendChild(tip3);
                var tip4 = document.createElement("input");
                tip4.id = 'l_'+matriz[i+1];
                tip4.type = 'text';
                tip4.value = " ";
                tip3.appendChild(tip4);
            }else if(matriz[i+2]=='CHK'){
                tip = document.createElement("input");
                tip.id = matriz[i+1];
                tip.type = "checkbox";
                try {
                tip.onchange = direccion_grd;
                 } catch(error) {
                console.log('NO TIENE EL CAMPOooooo');
                }                 
            }else if(combo[0]=='CBO') { 
                tip = document.createElement('select');
                tip.id = matriz[i+1];
                tip.className = "form-control";
                filas = combo[1].split('#'); 
                
                if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        };
                    
                }
             
                 if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_USU_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        };
                    
                }

                 if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_AGR_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        }; 
                }

                 if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_GF_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        }; 
                }

                if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_DENUN_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        }; 
                }

                //provincias
                /*if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_PROV'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta1 = cboConsulta.replace("*",","); 
                    var dependienteCbo1 = matriz[i+5];
                    var campoCbo1 = matriz[i+1];
                    //combo Macrodistrito
                        tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo1).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta1.replace("*",",");
                            xCboConsulta1 = xCboConsulta.replace("xId","'"+valorDependencia+"'");
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo1, xCboConsulta1);
                        };
                    
                }-LUZ*/
                //fin provincias

                 //municipio
                if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_MUN'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta2 = cboConsulta.replace("*",","); 
                    var dependienteCbo2 = matriz[i+5];
                    var campoCbo2 = matriz[i+1];
                    //combo Macrodistrito
                        tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo2).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta2.replace("*",",");
                            xCboConsulta2 = xCboConsulta.replace("xId","'"+valorDependencia+"'");
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo2, xCboConsulta2);
                        };
                }
                //fin municipio

                if(matriz[i+4] == 'obligatorio'){
                    tip.options[0] = new Option('--Seleccione--','');
                } else{
                    tip.options[0] = new Option('--Seleccione--','-1');
                }
                for(var j = 0; j < filas.length ;j++){
                    columna= filas[j].split('|');
                    tip.options[j+1] = new Option(columna[1],columna[0]);
                }
            }else if(matriz[i+2]=='FEC'){
                tip = document.createElement("input");
                tip.id = matriz[i+1];
                tip.type = "date";
                tip.className = "form-control";
            ///////////////////////////////////VALIDACION DE AÑO DE NACIMIENTO/////////////////////////////////////////////////

                 if (matriz[i+1]=="f01_USU_G_FEC_NAC" || matriz[i+1]=="f01_AGR_G_FEC_NAC" || matriz[i+1]=="f01_GF_G_FEC_NAC" || matriz[i+1]=="f01_DENUN_G_FEC_NAC" || matriz[i+1]=="f01_TAM_G_FEC_NAC") { 
                    var vali;
                    tip.onblur = function() { 
                    //var val_ano=1;
                    //alert(123);
                    console.log("posicion 4", document.getElementById(consultas[4]).value);
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia<10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    //var ano
                    var ano = fecnac.split("-");
                    console.log("año",ano[0]);
                    console.log("año",ano[0].length);
                    if (ano[0].length==4){ 
                       vali = 0;
                       console.log("0",vali);
                    }else{
                        vali = 1;
                        console.log("1",vali);
                    }
                     if (vali == 1) {
                         console.log("1",vali);
                        sweetAlert('','Ingrese una fecha valida','error');
                        document.getElementById(consultas[4]).value="";

                    } 
                        //try {
                            /*var fec_act2 = new Date(fecnac);
                            var mes = fecnac.getMonth() + 1;
                            var dia = fec_act2.getDate();
                            if(fec_act2.getDate()<10){
                                dia = "0"+ dia;
                            }
                            if(fec_act2.getMonth()<9){
                                mes = "0"+ mes;
                            }
                           var calculo_edad2 = fec_act2.getFullYear();*/

                              var fec_act22 = new Date();
                             console.log(fec_act22,"fecha actual");
                            var mes2 = fec_act22.getMonth() + 1;
                            var dia2 = fec_act22.getDate();
                            if(fec_act22.getDate()<10){
                                dia2 = "0"+ dia2;
                            }
                            if(fec_act22.getMonth()<9){
                                mes2 = "0"+ mes2;
                            }
                            
                           var calculo_edad = fec_act22.getFullYear();
                           console.log("calculo_edad",calculo_edad);
                           var edad = calculo_edad-ano[0]; 
                           var mes_cal = mes2 - mes;
                           var dias_cal = dia2 -dia;   
                            if(edad < 60  && matriz.length==140 ){
                                document.getElementById("f01_EDAD").value=""; 
                                $("#btnGuardarGrilla").attr("disabled", true);
                                sweetAlert('Menor de 60 años', '', 'error');                                     
                            }else{
                                $("#btnGuardarGrilla").attr("disabled", false);
                            document.getElementById("f01_EDAD").value=""+edad+" años "+ mes_cal +" meses "+dias_cal+" dias";
                            }                               
                            console.log("EDAD 3 :", edad);                              
                       /*}catch(error) {
                        console.log('NO TIENE EL CAMPO EDAD');
                       }*/

                    }
                     
                }
            //////////////////////////////////FIN VALIDAR AÑO/////////////////////////////////////////////////////////////////////     





            }
        }
        if(matriz[i+4] == 'obligatorio'){
            requerido = 1;
            tip.required = true;
            obligatori = obligatori+'#'+matriz[i+1];
        } 
        div2.appendChild(tip);  
    }
    var footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.innerText = '  ';
    content.appendChild(footer);
    var addBtn = document.createElement('button');
    addBtn.onclick = function () { 
        if(requerido == 1){
            obligatorios = obligatori.split('#');
            for(var i = 1;i<obligatorios.length;i++){
                if(document.getElementById(obligatorios[i]).value != ""){
                   obligatorio = 0;
                }
                else{
                    obligatorio = 1;
                    break;
                }
            }
        }else{
            obligatorio = 0;
        }  
        
        if(obligatorio == 0){     
            if(adicionarcalculo == 1){ 
                var sum = document.getElementById(tableID+'_CAL').value.split(",").map(parseFloat);
                var count = parseInt(document.getElementById(tableID+'_CONT').value);
                 count++;
                document.getElementById(tableID+'_CONT').value = count;
                var table = document.getElementById('tabla_'+tableID);
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                row.id=tableID+"_row"+(rowCount);
                var newdiv = document.createElement('td');
                var jsonSting="{";
                var j = 0;
                var id = rowCount-1;
                var datos = JSON.parse(document.getElementById(tableID).value);
                delete datos[id];
                var nuevosDatos=[];
                nuevosDatos = JSON.stringify(datos);
                document.getElementById(tableID).value = nuevosDatos;
                cambiarDisplay(tableID+'_row'+ id);                
            }
            else{
                var table = document.getElementById('tabla_'+tableID);
                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
                row.id=tableID+"_row"+(rowCount);
                var newdiv = document.createElement('td');
                var jsonSting="{";
                var j = 0;
            }
            for(var i = matriz.length-7; i >=0 ;i=i-7){
                cell1 = row.insertCell(0); 
                cell1.id = "c_"+matriz[i+1]+(rowCount);
                var componente = matriz[i+2].split(':');
                if(componente[0] == 'ARC'){
                    var fArchivo = document.getElementById(matriz[i+1]);
                    if(fArchivo.value == ""){
                        var newlink = document.createElement('div'); 
                        var currenttext = document.createElement('div');
                        currenttext.innerHTML = '<div class = "col-md-12"><button  value = "0"  id="'+matriz[i+1]+(rowCount)+'" class = "btn btn-default btn-circle" onclick = "verImagen(0);"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_'+ matriz[i+1]+(rowCount)+'" value="0" readonly="readonly"></div></td>';   
                        jsonSting = jsonSting+'"'+matriz[i+1]+'":"0",';
                    } else{
                        var url = angular.element(document.getElementById("renderFormulario")).scope().guardarArchivo(fArchivo);
                        var a = url.split('"')
                        var newlink = document.createElement('div'); 
                        var currenttext = document.createElement('div');
                        var b = a[4].split("/");
                        b = b[7].split("?");
                        currenttext.innerHTML = '<div class = "col-md-12"><button  value = "'+a[4]+'"  id="'+matriz[i+1]+(rowCount)+'" class = "btn btn-default btn-circle" onclick = "verImagen(\'' + a[4] +'\');"><i class = "fa fa-eye" style="color:#249FE6"></i></button><input style="border: none;" id="l_'+ matriz[i+1]+(rowCount)+'" value="'+b[0]+'" readonly="readonly"></div></td>';   
                        jsonSting = jsonSting+'"'+matriz[i+1]+'":"'+a[4]+'",';
                    }
                }else if(componente[0] == 'NRO'){
                    jsonSting = jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    var currenttext = document.createElement("input"); 
                    currenttext.id = matriz[i+1]+(rowCount);
                    currenttext.type = "text";
                    currenttext.disabled = "true";
                    currenttext.readonly = "readonly";
                    currenttext.className = "";
                    currenttext.value = document.getElementById(matriz[i+1]).value;  
                    if(document.getElementById(matriz[i+1]).value == ""){
                        document.getElementById(matriz[i+1]).value = 0;
                    } ;
                    if(sum[j] == undefined){
                        sum[j] = 0;
                    } ;
                    sum[j] = sum[j] + parseFloat(document.getElementById(matriz[i+1]).value);
                }else if(componente[0] == 'CHK'){
                    if(document.getElementById(matriz[i+1]).checked){
                        document.getElementById(matriz[i+1]).value = 'SI';
                    }
                    else {
                        document.getElementById(matriz[i+1]).value = 'NO';
                    }
                    jsonSting = jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    var currenttext = document.createElement("input"); 
                    currenttext.id = matriz[i+1]+(rowCount);
                    currenttext.type = "text";
                    currenttext.disabled = "true";
                    currenttext.readonly = "readonly";
                    currenttext.className = "";
                    currenttext.value = document.getElementById(matriz[i+1]).value;
                }else if(componente[0] == 'CBO'){
                    var selected = document.getElementById(matriz[i+1]);
                    jsonSting = jsonSting+'"'+matriz[i+1]+'_valor":"'+document.getElementById(matriz[i+1]).value+'",';
                    jsonSting = jsonSting+'"'+matriz[i+1]+'":"'+selected.options[selected.selectedIndex].text+'",';
                    var cbovalor = document.createElement("input"); 
                    cbovalor.id = matriz[i+1]+(rowCount);
                    cbovalor.type = "text";
                    cbovalor.disabled = "true";
                    cbovalor.readonly = "readonly";
                    cbovalor.value = selected.options[selected.selectedIndex].text;
                    cell1.appendChild(cbovalor);
                    var currenttext = document.createElement("input"); 
                    currenttext.id = matriz[i+1]+(rowCount)+"_valor";
                    currenttext.type = "hidden";
                    currenttext.disabled = "true";
                    currenttext.readonly = "readonly";
                    currenttext.className = "";
                    currenttext.value = document.getElementById(matriz[i+1]).value;
                }else if(componente[0] == 'TXTA'){//SMDS2018
                    jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    var currenttext = document.createElement("textarea"); 
                    currenttext.id = matriz[i+1]+(rowCount);
                    currenttext.type = "textarea";
                    currenttext.disabled = "true";
                    currenttext.cols = "150";
                    currenttext.readonly = "readonly";
                    currenttext.className = "";
                    currenttext.value = document.getElementById(matriz[i+1]).value;
                }
                else {  
                    jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    var currenttext = document.createElement("input"); 
                    currenttext.id = matriz[i+1]+(rowCount);
                    currenttext.type = "text";
                    currenttext.disabled = "true";
                    currenttext.readonly = "readonly";
                    currenttext.className = "";
                    currenttext.value = document.getElementById(matriz[i+1]).value;
                }
                if(matriz[i+3] && matriz[i+3] != 0)
                        currenttext.size = matriz[i+3];
                    else
                        currenttext.size = 10;
                cell1.appendChild(currenttext);
                j++;
            }
            newdiv.innerHTML = '<button class="btn btn-default btn-circle" onclick="eliminarTabla(' + rowCount + ',\'' + tableID + '\',\'' + cadena + '\');"><i class="fa fa-trash-o" style="color:#249FE6"></i></button> <button class="btn btn-default btn-circle" onclick="editarGrilla(' + rowCount + ',\'' + cadena + '\',\'' + tableID + '\');"><i class="fa fa-pencil" style="color:#249FE6"></i></button></td>';
            newdiv.id="c_btn_"+row.id;
            cell1 = row.insertCell(0);
            cell1.appendChild(newdiv);
            jsonSting = jsonSting.substring(0,jsonSting.length-1);
            jsonSting = jsonSting + "}";
            addRowJson(jsonSting,tableID);
            if(adicionarcalculo == 1){
                var rowCount1 = table.rows.length;
                var row1 = table.insertRow(rowCount1);
                row1.id=tableID+"_row"+(rowCount1);
                var newdiv = document.createElement('td');
                var jsonSting="{";
                var j = 0;
                for(var i = matriz.length-7; i >=0 ;i=i-7){
                    cell2 = row1.insertCell(0);
                    cell2.id="c_"+matriz[i+1]+(rowCount1);
                    var componente = matriz[i+2].split(':');               
                    if(componente[0] == 'PROM'){
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount1);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = ""; 
                        if(document.getElementById(matriz[i+1]).value == ""){
                            document.getElementById(matriz[i+1]).value = 0;
                        } ;
                        if(sum[j] == undefined || sum[j] == NaN){
                            sum[j] = 0;
                        } ;
                        sum[j] = sum[j] + parseFloat(document.getElementById(matriz[i+1]).value);
                        var prom = sum[j]/count;
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+prom+'",';
                        currenttext.value = prom; 
                    }else if(componente[0] == 'SUM'){
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";  

                        if(document.getElementById(matriz[i+1]).value == ""){
                            document.getElementById(matriz[i+1]).value = 0;
                        } ;
                        if(sum[j] == undefined || sum[j] == NaN ){
                            sum[j] = 0;
                        } ;
                        sum[j] = sum[j] + parseFloat(document.getElementById(matriz[i+1]).value);
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+sum[j]+'",';
                        currenttext.value = sum[j]; 
                    }
                    else {
                       jsonSting=jsonSting+'"'+matriz[i+1]+'":" ",';
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "";
                        currenttext.value = " ";          
                    }
                    if(matriz[i+3] && matriz[i+3]!=0)
                        currenttext.size = matriz[i+3];
                    else
                        currenttext.size = 10;
                    cell2.appendChild(currenttext);
                    j++;
                }
                newdiv.innerHTML = '<div></div></td>';
                newdiv.id="c_btn_"+row1.id;
                cell2 = row1.insertCell(0);
                cell2.appendChild(newdiv);
                jsonSting = jsonSting.substring(0,jsonSting.length-1);
                jsonSting = jsonSting + "}";
                addRowJson(jsonSting,tableID);
                document.getElementById(tableID+'_CAL').value = sum;
            }
            
            if(form_rc==1 &&  tipodoc == 'CI'){
                if(existe == 1){
                    if(matriz.length==140){
                    var modificarCiudadano = new rcNatural();
                    modificarCiudadano.oid = results[0]._id;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = document.getElementById(consultas[3]).value;
                    modificarCiudadano.tercer_apellido = results[0].dtspsl_tercer_apellido;
                    modificarCiudadano.ci = ciciudadano;
                    modificarCiudadano.complemento = results[0].dtspsl_complemento;
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate()+1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(results[0].dtspsl_id_estado_civil)
                        modificarCiudadano.id_estado_civil = results[0].dtspsl_id_estado_civil;
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(results[0].dtspsl_profesion)
                        modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    else
                    modificarCiudadano.profesion = " ";
                    modificarCiudadano.otra_profesion = results[0].dtspsl_otra_profesion;
                    modificarCiudadano.telefono = document.getElementById(consultas[15]).value
                    modificarCiudadano.movil = document.getElementById(consultas[16]).value
                    modificarCiudadano.correo = results[0].dtspsl_correo;
                    modificarCiudadano.direccion = document.getElementById(consultas[14]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.departamento = document.getElementById(consultas[9]).value;
                    modificarCiudadano.provincia = document.getElementById(consultas[10]).value;
                    modificarCiudadano.municipio = document.getElementById(consultas[11]).value;
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[12]).value;
                    modificarCiudadano.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;
                    modificarCiudadano.distrito = results[0].dtspsl_distrito;
                    modificarCiudadano.distrito_desc = results[0].dtspsl_distrito_desc;
                    modificarCiudadano.zona = document.getElementById(consultas[13]).value;
                    modificarCiudadano.zona_desc = results[0].dtspsl_zona_desc;
                    modificarCiudadano.tipo_via = results[0].dtspsl_tipo_via;
                    modificarCiudadano.nombre_via = results[0].dtspsl_nombre_via;
                    modificarCiudadano.numero_casa = results[0].dtspsl_numero_casa;
                    modificarCiudadano.edificio = results[0].dtspsl_edificio;
                    modificarCiudadano.bloque = results[0].dtspsl_bloque;
                    modificarCiudadano.piso = results[0].dtspsl_piso;
                    modificarCiudadano.oficina = results[0].dtspsl_oficina;
                    modificarCiudadano.latitud = results[0].dtspsl_latitud;
                    modificarCiudadano.longitud = results[0].dtspsl_longitud;
                    modificarCiudadano.usr_id = results[0].dtspsl_id;
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //modificarCiudadano.file_fotocopia_ci = document.getElementById(consultas[13]).value;
                    modificarCiudadano.fec_vencimiento = results[0].dtspsl_fec_vencimiento;
                    modificarCiudadano.file_factura_luz = results[0].dtspsl_file_factura_luz;
                    if(results[0].dtspsl_URL)
                        modificarCiudadano.URL = results[0].dtspsl_URL;
                    else
                        modificarCiudadano.URL = " ";
                    modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        console.log("resultado", resultadoApi);
                        if( typeof(resultadoApi.success) != 'undefined')
                            {
                                sweetAlert('','Modificado Exitosamente','success');
                            } else {  
                                sweetAlert('','Modificado Falló','error');
              
                            }
                        });
                    }
                   if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                     var modificarCiudadano = new rcNatural();
                    modificarCiudadano.oid = results[0]._id;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = document.getElementById(consultas[3]).value;
                    modificarCiudadano.tercer_apellido = results[0].dtspsl_tercer_apellido;
                    modificarCiudadano.ci = ciciudadano;
                    modificarCiudadano.complemento = results[0].dtspsl_complemento;
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = " ";
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(results[0].dtspsl_id_estado_civil)
                        modificarCiudadano.id_estado_civil = results[0].dtspsl_id_estado_civil;
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(results[0].dtspsl_profesion)
                        modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    else
                    modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    modificarCiudadano.otra_profesion = results[0].dtspsl_otra_profesion;
                    modificarCiudadano.telefono = document.getElementById(consultas[11]).value
                    modificarCiudadano.movil = document.getElementById(consultas[12]).value
                    modificarCiudadano.correo = results[0].dtspsl_correo;
                    modificarCiudadano.direccion = document.getElementById(consultas[10]).value;
                    modificarCiudadano.pais = results[0].dtspsl_pais;
                    modificarCiudadano.departamento =document.getElementById(consultas[6]).value;
                    modificarCiudadano.provincia = results[0].dtspsl_provincia;
                    modificarCiudadano.municipio = results[0].dtspsl_municipio;
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[8]).value;
                    modificarCiudadano.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;
                    modificarCiudadano.distrito = results[0].dtspsl_distrito;
                    modificarCiudadano.distrito_desc = results[0].dtspsl_distrito_desc;
                    modificarCiudadano.zona = document.getElementById(consultas[9]).value;
                    modificarCiudadano.zona_desc = results[0].dtspsl_zona_desc;
                    modificarCiudadano.tipo_via = results[0].dtspsl_tipo_via;
                    modificarCiudadano.nombre_via = results[0].dtspsl_nombre_via;
                    modificarCiudadano.numero_casa = results[0].dtspsl_numero_casa;
                    modificarCiudadano.edificio = results[0].dtspsl_edificio;
                    modificarCiudadano.bloque = results[0].dtspsl_bloque;
                    modificarCiudadano.piso = results[0].dtspsl_piso;
                    modificarCiudadano.oficina = results[0].dtspsl_oficina;
                    modificarCiudadano.latitud = results[0].dtspsl_latitud;
                    modificarCiudadano.longitud = results[0].dtspsl_longitud;
                    modificarCiudadano.usr_id = results[0].dtspsl_id;
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //modificarCiudadano.file_fotocopia_ci = document.getElementById(consultas[13]).value;
                    modificarCiudadano.fec_vencimiento = results[0].dtspsl_fec_vencimiento;
                    modificarCiudadano.file_factura_luz = results[0].dtspsl_file_factura_luz;
                    if(results[0].dtspsl_URL)
                        modificarCiudadano.URL = results[0].dtspsl_URL;
                    else
                        modificarCiudadano.URL = " ";
                    modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado); 
                        if( typeof(resultadoApi.success) != 'undefined')
                            {
                               sweetAlert('','Registro Modificado','success' );

                            } else {                    
                            }
                        });
                   }

                    
                } 
                else{
                    if( document.getElementById(consultas[3]).value == ""){
                        materno = " ";
                    }else{
                        materno =  document.getElementById(consultas[3]).value;
                    }
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() +1;
                    if(dia<10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    


                    if(matriz.length==140){
                        var registrarCiudadano = new rcNatural();
                    registrarCiudadano.ci = ciciudadano;
                    registrarCiudadano.complemento = " ";
                    registrarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    registrarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    registrarCiudadano.materno = materno;
                    registrarCiudadano.tercer_apellido = " ";
                    registrarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    
                    registrarCiudadano.fec_nacimiento = fecnac;
                    console.log("esta es la fecha", registrarCiudadano.fec_nacimiento);
                    
                    

                    registrarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    registrarCiudadano.pais = document.getElementById(consultas[8]).value;
                    registrarCiudadano.departamento = document.getElementById(consultas[9]).value;
                    registrarCiudadano.provincia = document.getElementById(consultas[10]).value;
                    registrarCiudadano.municipio = document.getElementById(consultas[11]).value;
                    registrarCiudadano.macrodistrito = document.getElementById(consultas[12]).value;
                    registrarCiudadano.distrito = " ";
                    registrarCiudadano.zona = document.getElementById(consultas[13]).value;
                    registrarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    registrarCiudadano.id_estado_civil = " ";
                    registrarCiudadano.profesion = " ";
                    registrarCiudadano.otra_profesion = " ";
                    registrarCiudadano.telefono = document.getElementById(consultas[15]).value;
                    registrarCiudadano.movil = document.getElementById(consultas[16]).value;
                    registrarCiudadano.correo = " ";
                    registrarCiudadano.direccion = document.getElementById(consultas[14]).value;
                    registrarCiudadano.usr_id = "0";
                    registrarCiudadano.activacionf = "SI";
                    registrarCiudadano.activaciond = "SI";

//
                    registrarCiudadano.crearNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        if( typeof(resultadoApi.success) != 'undefined')
                        {
                    //almacenando el campo oid en campo_oid 
                    var campo_oid = resultadoApi.success.oid; 
                    var usuario = resultadoApi.success.usuario.trim('-');
                    var pin = resultadoApi.success.pin;   
                    var carnet = resultadoApi.success.usuario;               
                    //creando el objeto modificar ciudadano
                    var modificarCiudadano = new rcNatural();
                    //cargando los datos para modificar
                    modificarCiudadano.oid = campo_oid;
                    //modificar 
                    modificarCiudadano.ci = carnet;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = materno;
                    modificarCiudadano.tercer_apellido = " ";
                    modificarCiudadano.complemento = " ";
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(" ")
                        modificarCiudadano.id_estado_civil = " ";
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(" ")
                        modificarCiudadano.profesion = " ";
                    else
                    modificarCiudadano.profesion = " ";
                    modificarCiudadano.otra_profesion = " ";
                    modificarCiudadano.telefono = document.getElementById(consultas[15]).value;
                    modificarCiudadano.movil = document.getElementById(consultas[16]).value;
                    modificarCiudadano.correo = " ";
                    modificarCiudadano.direccion = document.getElementById(consultas[14]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.departamento = document.getElementById(consultas[9]).value;
                    modificarCiudadano.provincia = document.getElementById(consultas[10]).value;
                    modificarCiudadano.municipio = document.getElementById(consultas[11]).value;
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[12]).value;
                    modificarCiudadano.macrodistrito_desc = " ";
                    modificarCiudadano.distrito = " ";
                    modificarCiudadano.distrito_desc = " ";
                    modificarCiudadano.zona = document.getElementById(consultas[13]).value;
                    modificarCiudadano.zona_desc = " ";
                    modificarCiudadano.tipo_via = " ";
                    modificarCiudadano.nombre_via = " ";
                    modificarCiudadano.numero_casa = " ";
                    modificarCiudadano.edificio = " ";
                    modificarCiudadano.bloque = " ";
                    modificarCiudadano.piso = " ";
                    modificarCiudadano.oficina = " ";
                    modificarCiudadano.latitud = " ";
                    modificarCiudadano.longitud = " ";
                    modificarCiudadano.usr_id = " ";
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //Llamar a la funcion modificar 
                    //if ano
                     
                            
                     modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado); 
                        if( typeof(resultadoApi.success) != 'undefined'){
                            sweetAlert('','Registro Exitoso','success');
                            } 
                        else {  
                            sweetAlert('','Error al Registrar','error');
                        }
                     });
                    
                        }
                        else
                        {  

                        }
                      });

                    }

                    if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                        var registrarCiudadano = new rcNatural();
                    registrarCiudadano.ci = ciciudadano;
                    registrarCiudadano.complemento = " ";
                    registrarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    registrarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    registrarCiudadano.materno = materno;
                    registrarCiudadano.tercer_apellido = " ";
                    registrarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia<10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    registrarCiudadano.fec_nacimiento = fecnac;
                    registrarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    registrarCiudadano.pais = " ";
                    registrarCiudadano.departamento = " ";
                    registrarCiudadano.provincia = " ";
                    registrarCiudadano.municipio = " ";
                    registrarCiudadano.macrodistrito = document.getElementById(consultas[8]).value;
                    registrarCiudadano.distrito = " ";
                    registrarCiudadano.zona = document.getElementById(consultas[9]).value;
                    registrarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    registrarCiudadano.id_estado_civil = " ";
                    registrarCiudadano.profesion = " ";
                    registrarCiudadano.otra_profesion = " ";
                    registrarCiudadano.telefono = document.getElementById(consultas[11]).value;
                    registrarCiudadano.movil = document.getElementById(consultas[12]).value;
                    registrarCiudadano.correo = " ";
                    registrarCiudadano.direccion = document.getElementById(consultas[10]).value;
                    registrarCiudadano.usr_id = "0";
                    registrarCiudadano.activacionf = "SI";
                    registrarCiudadano.activaciond = "SI";
                    registrarCiudadano.crearNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        if( typeof(resultadoApi.success) != 'undefined')
                        {
                    //almacenando el campo oid en campo_oid 
                    var usuario = resultadoApi.success.usuario.trim('-');
                    var pin = resultadoApi.success.pin; 
                    var campo_oid = resultadoApi.success.oid;    
                    var carnet = resultadoApi.success.usuario;;                
                    //creando el objeto modificar ciudadano
                    var modificarCiudadano = new rcNatural();
                    //cargando los datos para modificar
                    modificarCiudadano.oid = campo_oid;
                    //modificar 
                    modificarCiudadano.ci = carnet;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = materno;
                    modificarCiudadano.tercer_apellido = " ";
                    modificarCiudadano.complemento = " ";
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = " ";
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(" ")
                        modificarCiudadano.id_estado_civil = " ";
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(" ")
                        modificarCiudadano.profesion = " ";
                    else
                    modificarCiudadano.profesion = " ";
                    modificarCiudadano.otra_profesion = " ";
                    modificarCiudadano.telefono = document.getElementById(consultas[11]).value;
                    modificarCiudadano.movil = document.getElementById(consultas[12]).value;
                    modificarCiudadano.correo = " ";
                    modificarCiudadano.direccion = document.getElementById(consultas[10]).value;
                    modificarCiudadano.pais = " ";
                    modificarCiudadano.departamento = " ";
                    modificarCiudadano.provincia = " ";
                    modificarCiudadano.municipio = " ";
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[8]).value;
                    modificarCiudadano.macrodistrito_desc = " ";
                    modificarCiudadano.distrito = " ";
                    modificarCiudadano.distrito_desc = " ";
                    modificarCiudadano.zona = document.getElementById(consultas[9]).value;
                    modificarCiudadano.zona_desc = " ";
                    modificarCiudadano.tipo_via = " ";
                    modificarCiudadano.nombre_via = " ";
                    modificarCiudadano.numero_casa = " ";
                    modificarCiudadano.edificio = " ";
                    modificarCiudadano.bloque = " ";
                    modificarCiudadano.piso = " ";
                    modificarCiudadano.oficina = " ";
                    modificarCiudadano.latitud = " ";
                    modificarCiudadano.longitud = " ";
                    modificarCiudadano.usr_id = " ";
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //Llamar a la funcion modificar 
                     modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado); 
                        if( typeof(resultadoApi.success) != 'undefined'){
                            sweetAlert('','Registro Exitoso','success');
                            } 
                        else {  
                            sweetAlert('','Error al Registrar','error' );
                        }
                     });
                        }
                        else
                        {                            
                        }
                      });
                    }
                }
            }
             $("#myModalGrilla").modal('hide');
        }else{
            
            sweetAlert('','Complete Todos Los Datos correctamente','error');
        }                    
           
    };
    addBtn.setAttribute("type", "button");
    addBtn.className = 'btn btn-primary btn-inverse';
    addBtn.id = 'btnGuardarGrilla';     
    addBtn.innerText = 'Guardar';
    footer.appendChild(addBtn);        
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.setAttribute("type", "button");
    closeBtn.className = 'btn btn-primary btn-inverse';
    closeBtn.innerText = 'Cerrar';
    footer.appendChild(closeBtn);
    $("#myModalGrilla").modal('show');
    try {
        var a = sessionStorage.getItem('TRAMITE_ACTUAL');
        document.getElementById('f01_DEF_CODIGO_TRAM').value=a;
    } catch(error) {
        console.log('NO TIENE EL CAMPO');
    }
}

/*EDITAR GRILLA*/
function editarGrilla(k,item,nombre){
    var editarCalculo = 0; 
    var form_rc = 0;
    var existe = 0;
    var matriz = item.split(','); 
    var table = document.getElementById('tabla_'+nombre);
    var rowCount = table.rows.length - 1; 
    if(document.getElementById('myModalGrilla') != null){
        elemento=document.getElementById('myModalGrilla');
        elemento.parentNode.removeChild(elemento);
    }
    Modal.innerHTML = '<div></div>';
    Modal.id = 'myModalGrilla';
    Modal.className = 'modal fade';
    Modal.setAttribute("data-backdrop", "static");
    document.body.appendChild(Modal);
    var dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    Modal.appendChild(dialog);
    var content = document.createElement('div');
    content.className = 'modal-content';
    dialog.appendChild(content);
    var header = document.createElement('div');
    header.className = 'modal-header';
    content.appendChild(header);        
    var cerrarmodal = document.createElement('button');
    cerrarmodal.type = "button"
    cerrarmodal.className = 'close';
    cerrarmodal.setAttribute("data-dismiss", "modal");
    cerrarmodal.setAttribute("aria-label", "Close");
    cerrarmodal.innerText = 'x';
    header.appendChild(cerrarmodal);
    var title = document.createElement('h4');
    title.className = 'modal-title';
    title.innerText = 'Editar Registro';
    header.appendChild(title);
    var body = document.createElement('div');
    body.className = 'modal-body';
    content.appendChild(body);
    var requerido = 0;
    var obligatorio = 1;
    var obligatori = 1;
    var consultas ;
    //aqui lo mismo
    for(var i = 0 ; i <= matriz.length-7 ;i=i+7){         
        var combo = matriz[i+2].split(':');
        var br = document.createElement('br');
        body.appendChild(br);
        var div = document.createElement('div');
        div.className = 'row';
        body.appendChild(div);
        var div1 = document.createElement('div');
        div1.className = 'col-md-3';
        div.appendChild(div1);
        var div2 = document.createElement('div');
        div2.className = 'col-md-7';
        div.appendChild(div2);
        var label = document.createElement("Label"); 
        label.htmlFor = "text" + i
        label.innerHTML= matriz[i];
        div1.appendChild(label);
        var tip;
        if(matriz[i+4] == 'lectura'){
            tip = document.createElement("input");
            tip.id = matriz[i+1]; 
            tip.type = "text";
            tip.readOnly = true;
            tip.disabled = true;
            tip.value = document.getElementById(matriz[i+1]+k).value;
        }
        else{

            if(matriz[i+2]=='TXTA'){                
                tip = document.createElement("textarea");
                tip.id = matriz[i+1]; 
                tip.className = "form-control";
                //tip.type = "number";
                tip.step = "any";
                tip.value = document.getElementById(matriz[i+1]+k).value;
            }



            if(matriz[i+2]=='TXT'){                
                tip = document.createElement("input");
                tip.id = matriz[i+1]; 
                //tip.type = "text";
                tip.className = "form-control";
                tip.value = document.getElementById(matriz[i+1]+k).value;

                ///////////////////////////////////VALIDACION DE TELEFONOS EN GRILLAS RC-CREAR/////////////////////////////////////////////////
                if (matriz[i+1]=="f01_USU_TER_TEL" || matriz[i+1]=="f01_AGR_TER_TEL" || matriz[i+1]=="f01_GF_TER_TEL" || matriz[i+1]=="f01_DENUN_TER_TEL") { 
                  tip.type = "number"; 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[11]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 7 && verific == "2" || telefono.length == 7 && verific == "3" || telefono.length == 7 &&verific == "4") { 

                      }else { 

                        sweetAlert('Número telefonico inválido', 'Ej. 2395789', 'error'); 
                        document.getElementById(consultas[11]).value = ""; 
                      } 

                  } 
                }else{ 
                  tip.type = "text"; 
                } 
                if (matriz[i+1]=="f01_USU_G_TELF" || matriz[i+1]=="f01_AGR_G_TELF" || matriz[i+1]=="f01_GF_G_TELF" || matriz[i+1]=="f01_DENUN_G_TELF") { 
                  tip.onchange = function() { 
                      var telefono = document.getElementById(consultas[12]).value; 
                      var verific = telefono[0]; 

                      if (telefono.length == 8 && verific == "7" || telefono.length == 8 && verific == "6") { 
                      }else { 
                        sweetAlert('Número de celular inválido', 'Ej. 71260602', 'error'); 
                        document.getElementById(consultas[12]).value = ""; 
                      } 

                  } 
                }else{ 
                  tip.type = "text"; 
                }
///////////////////////////////////////////////////////////////////////////////////////////////////////
                if (matriz[i+5] == 'BSQ'){
                    var consulta = matriz[i+6];
                    var busquedas = consulta.split("#");
                    tip.onchange = function() {
                        angular.element(document.getElementById('renderFormulario')).scope().bucarProhibidoNombre(document.getElementById(busquedas[0]).value,document.getElementById(busquedas[1]).value,document.getElementById(busquedas[2]).value);
                        
                    }
                } else if(matriz[i+5] == 'RC'){
                    form_rc = 1;
                    var consulta = matriz[i+6];
                    var dependiente = matriz[i+5];
                    var campo = matriz[i+1]; 
                    var carnet = matriz[i-6]; 
                    consultas = consulta.split("#");
                    tipodoc = document.getElementById(carnet+k+'_valor').value;
                    ciciudadano = document.getElementById(campo+k).value;
                    if(tipodoc == 'CI'){
                        cicomplemento = " ";
                        var cicomp = ciciudadano.split("-");
                        var datosCiudadano = new rcNatural();
                        if(cicomp.length>1){
                            ciciudadano = cicomp[0];
                            cicomplemento = cicomp[1];
                            datosCiudadano.complemento = cicomplemento; 
                        }
                        datosCiudadano.ci = ciciudadano;    
                        datosCiudadano.buscarNatural(function(resultado){
                            results = JSON.parse(resultado);
                            if(results.length > 0 ){
                                existe = 1;
                                //bandera
                                //ZONA
                               if(matriz.length==140){
                                    var consultsql = "select zona_id as valor, dist_nombre||& - &||zona_nombre as dato from ae._ae_distritos , ae._ae_zona where dist_macro_id = "+results[0].dtspsl_macrodistrito+" and zona_distrito_id = dist_id order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[13],consultsql );
                                    setTimeout(function(){ document.getElementById(consultas[13]).value = results[0].dtspsl_zona; }, 2000);
                                      /*var consultsql1 = "select prv_codigo_compuesto as valor, prv_provincia as dato from _bp_provincias where prv_dpto_codigo = '"+results[0].dtspsl_departamento+"' order by 2";
                                        angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[10],consultsql1 );
                                        setTimeout(function(){  document.getElementById(consultas[10]).value = results[0].dtspsl_provincia; }, 2000);-LUZ*/
                                //MUNICIPIO
                                 var consultsql2 = "select  mnc_codigo_compuesto as valor, mnc_municipio as dato from _bp_municipios where mnc_codigo_compuesto_prov = '"+results[0].dtspsl_provincia+"' order by 2";
                                angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[11],consultsql2);
                                setTimeout(function(){  document.getElementById(consultas[11]).value = results[0].dtspsl_municipio; }, 2000);
                                }
                                if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                                         var consultsql = "select zona_id as valor, dist_nombre||& - &||zona_nombre as dato from ae._ae_distritos , ae._ae_zona where dist_macro_id = "+results[0].dtspsl_macrodistrito+" and zona_distrito_id = dist_id order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[9],consultsql );
                                       setTimeout(function(){ document.getElementById(consultas[9]).value = results[0].dtspsl_zona; }, 2000);
                                       // document.getElementById(consultas[10]).value = results[0].dtspsl_direccion;
                                       // document.getElementById(consultas[11]).value = results[0].dtspsl_telefono;
                                        //document.getElementById(consultas[12]).value = results[0].dtspsl_movil;

                                    }
                               //PROVINCIA
                                
                            }else{
                                existe = 0;
                                
                            }
                        });
                    }
                    tip.onchange = function() {
                        tipodoc = document.getElementById(carnet).value;
                        ciciudadano = document.getElementById(campo).value;
                        angular.element(document.getElementById('renderFormulario')).scope().bucarProhibido(ciciudadano,tipodoc);                            
                        if(tipodoc == 'CI'){
                            cicomplemento = " ";
                            var cicomp = ciciudadano.split("-");
                            var datosCiudadano = new rcNatural();
                            if(cicomp.length>1){
                                ciciudadano = cicomp[0];
                                cicomplemento = cicomp[1];
                                datosCiudadano.complemento = cicomplemento; 
                            }
                            datosCiudadano.ci = ciciudadano;    
                            datosCiudadano.buscarNatural(function(resultado){
                                results = JSON.parse(resultado);
                                if(results.length > 0 ){
                                    existe = 1;
                                    sweetAlert('', 'Ciudadano Existente', 'success');
                                    var consultsql = "select zona_id as valor, dist_nombre||& - &||zona_nombre as dato from ae._ae_distritos , ae._ae_zona where dist_macro_id = "+results[0].dtspsl_macrodistrito+" and zona_distrito_id = dist_id order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[13],consultsql );
                                    //provincias 
                                    /*var consultsql1 = "select prv_codigo_compuesto as valor, prv_provincia as dato from _bp_provincias where prv_dpto_codigo = '"+results[0].dtspsl_departamento+"' order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[10],consultsql1 );
                                    setTimeout(function(){  document.getElementById(consultas[10]).value = results[0].dtspsl_provincia; }, 2000);-LUZ*/

                                    //provincias

                                    //municipio 
                                     var consultsql2 = "select  mnc_codigo_compuesto as valor, mnc_municipio as dato from _bp_municipios where mnc_codigo_compuesto_prov = '"+results[0].dtspsl_provincia+"' order by 2";
                                    angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(consultas[11],consultsql2 );
                                    setTimeout(function(){  document.getElementById(consultas[11]).value = results[0].dtspsl_municipio; }, 2000);

                                    //municipio
                                    document.getElementById(consultas[0]).value = expedido;
                                    document.getElementById(consultas[1]).value = nombres;
                                    document.getElementById(consultas[2]).value = paterno;
                                    document.getElementById(consultas[3]).value = materno;
                                    var fecnac = new Date(results[0].dtspsl_fec_nacimiento);
                                    var mes = fecnac.getMonth() + 1;
                                    var dia = fecnac.getDate() + 1
                                    if(fecnac.getDate()<10){
                                        dia = "0"+ dia+1;
                                    }
                                    if(fecnac.getMonth()<9){
                                        mes = "0"+ mes;
                                    }
                                    results[0].dtspsl_fec_nacimiento = fecnac.getFullYear()+"-"+mes+"-"+dia;
                                    document.getElementById(consultas[4]).value = fec_nacimiento;
                                    document.getElementById(consultas[5]).value = lugar_nacimiento;
                                    document.getElementById(consultas[6]).value = departamento_r;
                                    document.getElementById(consultas[7]).value = sexo;
                                    document.getElementById(consultas[8]).value = pais;
                                    document.getElementById(consultas[9]).value = departamento;
                                    document.getElementById(consultas[10]).value = provincia;
                                    document.getElementById(consultas[11]).value = municipio;
                                    document.getElementById(consultas[12]).value = macrodistrito;
                                    setTimeout(function(){ document.getElementById(consultas[13]).value = zona; }, 2000);
                                    document.getElementById(consultas[14]).value = direccion;
                                    /*document.getElementById(consultas[15]).value = telefono;
                                    document.getElementById(consultas[16]).value = movil;
                                   // document.getElementById(consultas[13]).value = results[0].dtspsl_file_fotocopia_ci;*/
                                }else{
                                    existe = 0;
                                    sweetAlert('', 'Ciudadano No Existente', 'error');
                                    document.getElementById(consultas[0]).value = "-1";
                                    document.getElementById(consultas[1]).value = "";
                                    document.getElementById(consultas[2]).value = "";
                                    document.getElementById(consultas[3]).value = "";
                                    document.getElementById(consultas[4]).value = "";
                                    document.getElementById(consultas[5]).value = "-1";
                                    document.getElementById(consultas[6]).value = "-1";
                                    document.getElementById(consultas[7]).value = "-1";
                                    document.getElementById(consultas[8]).value = "-1";
                                    document.getElementById(consultas[9]).value = "-1";
                                    document.getElementById(consultas[10]).value = "-1";
                                    document.getElementById(consultas[11]).value = "-1";
                                    document.getElementById(consultas[12]).value = "-1";
                                    document.getElementById(consultas[13]).value = "-1";
                                    document.getElementById(consultas[14]).value = "";
                                    document.getElementById(consultas[15]).value = "";
                                    document.getElementById(consultas[16]).value = "";
                                   // document.getElementById(consultas[13]).value = "";
                                }
                            });
                        }
                        else{
                            document.getElementById(consultas[0]).value = "-1";
                            document.getElementById(consultas[1]).value = "";
                            document.getElementById(consultas[2]).value = "";
                            document.getElementById(consultas[3]).value = "";
                            document.getElementById(consultas[4]).value = "";
                            document.getElementById(consultas[5]).value = "-1";
                            document.getElementById(consultas[6]).value = "-1";
                            document.getElementById(consultas[7]).value = "-1";
                            document.getElementById(consultas[8]).value = "-1";
                            document.getElementById(consultas[9]).value = "-1";
                            document.getElementById(consultas[10]).value = "-1";
                            document.getElementById(consultas[11]).value = "-1";
                            document.getElementById(consultas[12]).value = "-1";
                            document.getElementById(consultas[13]).value = "-1";
                            document.getElementById(consultas[14]).value = "";
                            document.getElementById(consultas[15]).value = "";
                            document.getElementById(consultas[16]).value = "";
                            //document.getElementById(consultas[13]).value = "";
                        }
                    };
                 } else if(matriz[i+5] != '-'  && matriz[i+5]  != ""){
                    var consulta = matriz[i+6];
                    var dependiente = matriz[i+5];
                    var campo = matriz[i+1]; 
                    tip.onchange = function() {
                        var valorDependencia = document.getElementById(campo).value;
                        var xConsulta = consulta.replace("*",",");  
                        xConsulta = xConsulta.replace("xId", valorDependencia); 
                        angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependiente, xConsulta);
                    };
                }
            }else if(matriz[i+2]=='NRO'){
                tip = document.createElement("input");
                tip.id = matriz[i+1]; 
                tip.type = "number";
                tip.step = "any";
                tip.className = "form-control";
                tip.value = document.getElementById(matriz[i+1]+k).value;
            }else if(matriz[i+2]=='SUM'){
                editarCalculo = 1;
                tip = document.createElement("input"); 
                tip.id = matriz[i+1]; 
                tip.className = "form-control";
                tip.type = "number";
                tip.step = "any";
                tip.value = document.getElementById(matriz[i+1]+k).value;
            }else if(matriz[i+2]=='PROM'){
                editarCalculo = 1;
                tip = document.createElement("input");
                tip.id = matriz[i+1]; 
                tip.className = "form-control";
                tip.type = "number";
                tip.step = "any";
                tip.value = document.getElementById(matriz[i+1]+k).value;
            }else if(matriz[i+2]=='CHK'){
                tip = document.createElement("input");
                tip.id = matriz[i+1]; 
                tip.type = "checkbox";
                if(document.getElementById(matriz[i+1]+k).value == 'SI'){
                    tip.checked = true;
                } else{
                    tip.checked = false;
                }
            }else if(matriz[i+2]=='ARC'){
                tip = document.createElement("div");
                tip.className = "custom-upload";
                var tip2;
                tip2 = document.createElement("input");
                tip2.type = "file";
                tip2.id = matriz[i+1];
                tip2.setAttribute("accept", "image/*");
                var campoArc = matriz[i+1];
                tip2.onchange = function(){
                    var a = $(this).val();
                    var z = a.split("\\");
                    if (z[2] === undefined){
                        document.getElementById('l_'+campoArc).value = a;
                    }
                    else{
                        document.getElementById('l_'+campoArc).value = z[2];
                    }                        
                }
                tip.appendChild(tip2);
                var tip3 = document.createElement("div");
                tip3.className = "fake-file";
                tip.appendChild(tip3);
                var tip4 = document.createElement("input");
                tip4.id = 'l_'+matriz[i+1];
                tip4.type = 'text';
                tip4.value = document.getElementById("l_"+matriz[i+1]+k).value;
                tip3.appendChild(tip4);
            }else if(combo[0]=='CBO') { 
                tip = document.createElement('select');
                tip.id = matriz[i+1]; 
                tip.className = "form-control";
                filas = combo[1].split('#'); 
             if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        };
                    
                }
         
                 if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_USU_TER_ZONA'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta = cboConsulta.replace("*",","); 
                    var dependienteCbo = matriz[i+5];
                    var campoCbo = matriz[i+1];
                    //combo Macrodistrito
                            tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta.replace("*",",");              
                            xCboConsulta = xCboConsulta.replace("xId", mValorDependencia[0]);
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo, xCboConsulta);
                        };
                    
                }
                //provincias
                /*if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_PROV'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta1 = cboConsulta.replace("*",","); 
                    var dependienteCbo1 = matriz[i+5];
                    var campoCbo1 = matriz[i+1];
                    //combo Macrodistrito
                        tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo1).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta1.replace("*",",");
                            xCboConsulta1 = xCboConsulta.replace("xId","'"+valorDependencia+"'");
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo1, xCboConsulta1);
                        };
                    
                }-LUZ*/
                //fin provincias

                 //municipio
                if(matriz[i+5] != '-'  && matriz[i+5]  != "" && matriz[i+5]=='f01_TAM_MUN'){
                    var cboConsulta = matriz[i+6];
                    cboConsulta2 = cboConsulta.replace("*",","); 
                    var dependienteCbo2 = matriz[i+5];
                    var campoCbo2 = matriz[i+1];
                    //combo Macrodistrito
                        tip.onchange = function() {
                            var valorDependencia = document.getElementById(campoCbo2).value;
                            var mValorDependencia = valorDependencia.split('~');    
                            var xCboConsulta = cboConsulta2.replace("*",",");
                            xCboConsulta2 = xCboConsulta.replace("xId","'"+valorDependencia+"'");
                            angular.element(document.getElementById('renderFormulario')).scope().datosComboRenderGrd(dependienteCbo2, xCboConsulta2);
                        };
                    
                }
                //fin municipio

                
                if(matriz[i+4] == 'obligatorio'){
                    tip.options[0] = new Option('--Seleccione--','');
                } else{
                    tip.options[0] = new Option('--Seleccione--','-1');
                }
                for(var j = 0; j < filas.length ;j++){
                    columna= filas[j].split('|');
                    tip.options[j+1] = new Option(columna[1],columna[0]);
                }
                if(filas.length<=1)
                {
                    var seleccion =document.getElementById(matriz[i+1]+k).value;
                    var opcion = seleccion.split("~");
                    tip.options[j] = new Option(opcion[1],document.getElementById(matriz[i+1]+k).value);
                }
                tip.value = document.getElementById(matriz[i+1]+k+'_valor').value;  

            }else if(matriz[i+2]=='FEC'){
                tip = document.createElement("input");
                tip.id = matriz[i+1];  
                tip.type = "date";
                tip.className = "form-control";
                tip.value = document.getElementById(matriz[i+1]+k).value;

            ///////////////////////////////////VALIDACION DE AÑO DE NACIMIENTO/////////////////////////////////////////////////

                 if (matriz[i+1]=="f01_USU_G_FEC_NAC" || matriz[i+1]=="f01_AGR_G_FEC_NAC" || matriz[i+1]=="f01_GF_G_FEC_NAC" || matriz[i+1]=="f01_DENUN_G_FEC_NAC" || matriz[i+1]=="f01_TAM_G_FEC_NAC") { 
                    var vali;
                    tip.onblur = function() { 
                    //var val_ano=1;
                    //alert(123);
                    console.log("posicion 4", document.getElementById(consultas[4]).value);
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia<10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    //var ano
                    var ano = fecnac.split("-");
                    console.log("año",ano[0]);
                    console.log("año",ano[0].length);
                    if (ano[0].length==4){ 
                       vali = 0;
                       console.log("0",vali);
                    }else{
                        vali = 1;
                        console.log("1",vali);
                    }
                     if (vali == 1) {
                         console.log("1",vali);
                        sweetAlert('','Ingrese una fecha valida','error');
                        document.getElementById(consultas[4]).value="";

                    } 

                        //try {
                            /*var fec_act2 = new Date(fecnac);
                            var mes = fecnac.getMonth() + 1;
                            var dia = fec_act2.getDate();
                            if(fec_act2.getDate()<10){
                                dia = "0"+ dia;
                            }
                            if(fec_act2.getMonth()<9){
                                mes = "0"+ mes;
                            }
                           var calculo_edad2 = fec_act2.getFullYear();*/

                            var fec_act22 = new Date();
                             console.log(fec_act22,"fecha actual");
                            var mes = fec_act22.getMonth() + 1;
                            var dia = fec_act22.getDate();
                            if(fec_act22.getDate()<10){
                                dia = "0"+ dia;
                            }
                            if(fec_act22.getMonth()<9){
                                mes = "0"+ mes;
                            }
                           var calculo_edad = fec_act22.getFullYear();
                           console.log("calculo_edad_reg",calculo_edad);
                           var edad = calculo_edad-ano[0];                                  
                           document.getElementById("f01_EDAD").value=""+edad+"";
                       /*}catch(error) {
                        console.log('NO TIENE EL CAMPO EDAD');
                       }*/

                    }
                     
                }
                
//////////////////////////////////FIN VALIDAR AÑO/////////////////////////////////////////////////////////////////////     
            }
        }
        if(matriz[i+4] == 'obligatorio'){
            requerido = 1;
            tip.required = true;
            obligatori = obligatori+'#'+matriz[i+1];
        }               
        div2.appendChild(tip); 
    }
    var footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.innerText = '  ';
    content.appendChild(footer);
    var addBtn = document.createElement('button');
    addBtn.onclick = function () {
         if(requerido == 1){
            obligatorios = obligatori.split('#');
            for(var i = 1;i<obligatorios.length;i++){
                if(document.getElementById(obligatorios[i]).value != ""){
                   obligatorio = 0;
                }
                else{
                    obligatorio = 1;
                    break;
                }
            }
        }else{
            obligatorio = 0;
        }  
        if(obligatorio == 0){ 
            var jsonSting="{";
            var j = 0;
            if( editarCalculo != 0){
                
                console.log("NOMBRE:",editarCalculo);
                console.log("NOMBRE:", document.getElementById(nombre+'_CAL').value);                



                var sum = document.getElementById(nombre+'_CAL').value.split(",").map(parseFloat);
                console.log("jsonstring :", jsonSting);
                var count = parseInt(document.getElementById(nombre+'_CONT').value);
            }

            

            for(var i = 0 ; i <= matriz.length-7 ;i=i+7){
                j++;
            }
            for(var i = 0 ; i <= matriz.length-7 ;i=i+7){
                j--;
                try{
                    var componente = matriz[i+2].split(':');
                    if( componente[0] == 'CHK'){ 
                        if(document.getElementById(matriz[i+1]).checked){
                            jsonSting=jsonSting+'"'+matriz[i+1]+'":"SI",';
                            document.getElementById(matriz[i+1]+k).value = 'SI';
                        }
                        else {
                            jsonSting=jsonSting+'"'+matriz[i+1]+'":"NO",';
                            document.getElementById(matriz[i+1]+k).value = 'NO';
                        }
                    }
                    else if(componente[0] == 'SPAN'){
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).innerText+'",';
                    }
                    else if(componente[0] == 'ARC'){
                        var fArchivo = document.getElementById(matriz[i+1]);
                        if(fArchivo.value == ""){
                            jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]+k).value+'",';
                        }
                        else{
                            var url = angular.element(document.getElementById("renderFormulario")).scope().guardarArchivo(fArchivo);
                            var a = url.split('"');
                            document.getElementById(matriz[i+1]+k).onclick = function onclick(event) {
                                verImagen(a[4]);
                            };
                            var b=a[4].split("/");
                            b = b[7].split("?");
                            document.getElementById('l_'+matriz[i+1]+k).value = b[0];
                            jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+a[4]+'",';
                        }
                    }   else if(componente[0] == 'CBO'){
                        var selected = document.getElementById(matriz[i+1]);
                        jsonSting = jsonSting+'"'+matriz[i+1]+'_valor":"'+document.getElementById(matriz[i+1]).value+'",';
                        jsonSting = jsonSting+'"'+matriz[i+1]+'":"'+selected.options[selected.selectedIndex].text+'",';
                        document.getElementById(matriz[i+1]+k+'_valor').value = document.getElementById(matriz[i+1]).value;                   
                        document.getElementById(matriz[i+1]+k).value = selected.options[selected.selectedIndex].text;
                    }else if(componente[0] == 'SUM'){ 
                        sum[j] = sum[j] - parseFloat(document.getElementById(matriz[i+1]+k).value) + parseFloat(document.getElementById(matriz[i+1]).value);
                        document.getElementById(matriz[i+1]+k).value = document.getElementById(matriz[i+1]).value;
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    }else if(componente[0] == 'PROM'){
                        sum[j] = sum[j] - parseFloat(document.getElementById(matriz[i+1]+k).value) + parseFloat(document.getElementById(matriz[i+1]).value);
                        document.getElementById(matriz[i+1]+k).value = document.getElementById(matriz[i+1]).value;
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    }else { 
                        document.getElementById(matriz[i+1]+k).value = document.getElementById(matriz[i+1]).value;
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+document.getElementById(matriz[i+1]).value+'",';
                    }
                }catch(e){}
            }
            jsonSting = jsonSting.substring(0,jsonSting.length-1);
            jsonSting = jsonSting + "}";
            updRowJson(jsonSting, nombre,k);  
            if(editarCalculo != 0){
                document.getElementById(nombre+'_CAL').value = sum;
                datos = JSON.parse(document.getElementById(nombre).value);
                delete datos[rowCount];
                var nuevosDatos=[];
                nuevosDatos = JSON.stringify(datos);
                document.getElementById(nombre).value = nuevosDatos;
                cambiarDisplay(nombre+'_row'+ rowCount);
                var rowCount1 = table.rows.length;
                var row1 = table.insertRow(rowCount1);
                row1.id=nombre+"_row"+(rowCount1);
                var newdiv = document.createElement('td');
                var jsonSting="{";
                var j = 0;
                for(var i = matriz.length-7; i >=0 ;i=i-7){
                    cell2 = row1.insertCell(0);
                    cell2.id="c_"+matriz[i+1]+(rowCount1);
                    var componente = matriz[i+2].split(':');               
                    if(componente[0] == 'PROM'){
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount1);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "form-control";
                        var prom = sum[j]/count;
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+prom+'",';
                        currenttext.value = prom; 
                    }else if(componente[0] == 'SUM'){
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "form-control";
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+sum[j]+'",';
                        currenttext.value = sum[j]; 
                    }
                    else {
                        jsonSting=jsonSting+'"'+matriz[i+1]+'":" ",';
                        var currenttext = document.createElement("input"); 
                        currenttext.id = matriz[i+1]+(rowCount);
                        currenttext.type = "text";
                        currenttext.disabled = "true";
                        currenttext.readonly = "readonly";
                        currenttext.className = "form-control";
                        currenttext.value = " ";          
                    }
                    cell2.appendChild(currenttext);
                    j++;
                }
                newdiv.innerHTML = '<div></div></td>';
                newdiv.id="c_btn_"+row1.id;
                cell2 = row1.insertCell(0);
                cell2.appendChild(newdiv);
                jsonSting = jsonSting.substring(0,jsonSting.length-1);
                jsonSting = jsonSting + "}";
                addRowJson(jsonSting,nombre); 
            }
            if(form_rc==1 && tipodoc == 'CI'){
                if(existe == 1){
                     if(matriz.length==140){
                    var modificarCiudadano = new rcNatural();
                    modificarCiudadano.oid = results[0]._id;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = document.getElementById(consultas[3]).value;
                    modificarCiudadano.tercer_apellido = results[0].dtspsl_tercer_apellido;
                    modificarCiudadano.ci = ciciudadano;
                    modificarCiudadano.complemento = results[0].dtspsl_complemento;
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(results[0].dtspsl_id_estado_civil)
                        modificarCiudadano.id_estado_civil = results[0].dtspsl_id_estado_civil;
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(results[0].dtspsl_profesion)
                        modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    else
                    modificarCiudadano.profesion = " ";
                    modificarCiudadano.otra_profesion = results[0].dtspsl_otra_profesion;
                    modificarCiudadano.telefono = document.getElementById(consultas[15]).value
                    modificarCiudadano.movil = document.getElementById(consultas[16]).value
                    modificarCiudadano.correo = results[0].dtspsl_correo;
                    modificarCiudadano.direccion = document.getElementById(consultas[14]).value;
                    modificarCiudadano.pais = document.getElementById(consultas[8]).value;
                    modificarCiudadano.departamento = document.getElementById(consultas[9]).value;
                    modificarCiudadano.provincia = document.getElementById(consultas[10]).value;
                    modificarCiudadano.municipio = document.getElementById(consultas[11]).value;
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[12]).value;
                    modificarCiudadano.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;
                    modificarCiudadano.distrito = results[0].dtspsl_distrito;
                    modificarCiudadano.distrito_desc = results[0].dtspsl_distrito_desc;
                    modificarCiudadano.zona = document.getElementById(consultas[13]).value;
                    modificarCiudadano.zona_desc = results[0].dtspsl_zona_desc;
                    modificarCiudadano.tipo_via = results[0].dtspsl_tipo_via;
                    modificarCiudadano.nombre_via = results[0].dtspsl_nombre_via;
                    modificarCiudadano.numero_casa = results[0].dtspsl_numero_casa;
                    modificarCiudadano.edificio = results[0].dtspsl_edificio;
                    modificarCiudadano.bloque = results[0].dtspsl_bloque;
                    modificarCiudadano.piso = results[0].dtspsl_piso;
                    modificarCiudadano.oficina = results[0].dtspsl_oficina;
                    modificarCiudadano.latitud = results[0].dtspsl_latitud;
                    modificarCiudadano.longitud = results[0].dtspsl_longitud;
                    modificarCiudadano.usr_id = results[0].dtspsl_id;
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //modificarCiudadano.file_fotocopia_ci = document.getElementById(consultas[13]).value;
                    modificarCiudadano.fec_vencimiento = results[0].dtspsl_fec_vencimiento;
                    modificarCiudadano.file_factura_luz = results[0].dtspsl_file_factura_luz;
                    if(results[0].dtspsl_URL)
                        modificarCiudadano.URL = results[0].dtspsl_URL;
                    else
                        modificarCiudadano.URL = " ";
                    modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado); 
                        if( typeof(resultadoApi.success) != 'undefined')
                            {
                                sweetAlert('','Modifcacion Existosa','success');
                            } else {  
                                sweetAlert('','Error al Modicar','error');
                            }
                        });
                    }
                   if(matriz.length==168 ||matriz.length==161 ||matriz.length==154 ||matriz.length==175){
                    var modificarCiudadano = new rcNatural();
                    modificarCiudadano.oid = results[0]._id;
                    modificarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    modificarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    modificarCiudadano.materno = document.getElementById(consultas[3]).value;
                    modificarCiudadano.tercer_apellido = results[0].dtspsl_tercer_apellido;
                    modificarCiudadano.ci = ciciudadano;
                    modificarCiudadano.complemento = results[0].dtspsl_complemento;
                    modificarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 1;
                    if(dia < 10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    modificarCiudadano.fec_nacimiento = fecnac;
                    modificarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    modificarCiudadano.pais = " ";
                    modificarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    if(results[0].dtspsl_id_estado_civil)
                        modificarCiudadano.id_estado_civil = results[0].dtspsl_id_estado_civil;
                    else 
                        modificarCiudadano.id_estado_civil = " ";
                    if(results[0].dtspsl_profesion)
                        modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    else
                    modificarCiudadano.profesion = results[0].dtspsl_profesion;
                    modificarCiudadano.otra_profesion = results[0].dtspsl_otra_profesion;
                    modificarCiudadano.telefono = document.getElementById(consultas[11]).value
                    modificarCiudadano.movil = document.getElementById(consultas[12]).value
                    modificarCiudadano.correo = results[0].dtspsl_correo;
                    modificarCiudadano.direccion = document.getElementById(consultas[10]).value;
                    modificarCiudadano.pais = results[0].dtspsl_pais;
                    modificarCiudadano.departamento =document.getElementById(consultas[6]).value;
                    modificarCiudadano.provincia = results[0].dtspsl_provincia;
                    modificarCiudadano.municipio = results[0].dtspsl_municipio;
                    modificarCiudadano.macrodistrito = document.getElementById(consultas[8]).value;
                    modificarCiudadano.macrodistrito_desc = results[0].dtspsl_macrodistrito_desc;
                    modificarCiudadano.distrito = results[0].dtspsl_distrito;
                    modificarCiudadano.distrito_desc = results[0].dtspsl_distrito_desc;
                    modificarCiudadano.zona = document.getElementById(consultas[9]).value;
                    modificarCiudadano.zona_desc = results[0].dtspsl_zona_desc;
                    modificarCiudadano.tipo_via = results[0].dtspsl_tipo_via;
                    modificarCiudadano.nombre_via = results[0].dtspsl_nombre_via;
                    modificarCiudadano.numero_casa = results[0].dtspsl_numero_casa;
                    modificarCiudadano.edificio = results[0].dtspsl_edificio;
                    modificarCiudadano.bloque = results[0].dtspsl_bloque;
                    modificarCiudadano.piso = results[0].dtspsl_piso;
                    modificarCiudadano.oficina = results[0].dtspsl_oficina;
                    modificarCiudadano.latitud = results[0].dtspsl_latitud;
                    modificarCiudadano.longitud = results[0].dtspsl_longitud;
                    modificarCiudadano.usr_id = results[0].dtspsl_id;
                    modificarCiudadano.activacionf = "SI";
                    modificarCiudadano.activaciond = "SI";
                    //modificarCiudadano.file_fotocopia_ci = document.getElementById(consultas[13]).value;
                    modificarCiudadano.fec_vencimiento = results[0].dtspsl_fec_vencimiento;
                    modificarCiudadano.file_factura_luz = results[0].dtspsl_file_factura_luz;
                    if(results[0].dtspsl_URL)
                        modificarCiudadano.URL = results[0].dtspsl_URL;
                    else
                        modificarCiudadano.URL = " ";
                    modificarCiudadano.modificarNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado); 
                        if( typeof(resultadoApi.success) != 'undefined')
                            {
                               sweetAlert('','Modifcacion Existosa','success');

                            } else {   
                                sweetAlert('','Error al Modicar','error');
                            }
                        });
                   }
                } 
                else{
                   /* console.log("registrar");
                    var registrarCiudadano = new rcNatural();
                    registrarCiudadano.ci = ciciudadano;
                    registrarCiudadano.complemento = cicomplemento;
                    registrarCiudadano.nombre = document.getElementById(consultas[1]).value;
                    registrarCiudadano.paterno = document.getElementById(consultas[2]).value;
                    registrarCiudadano.materno = document.getElementById(consultas[3]).value;
                    registrarCiudadano.tercer_apellido = " ";
                    registrarCiudadano.expedido = document.getElementById(consultas[0]).value;
                    var fecnac = new Date(document.getElementById(consultas[4]).value);
                    var mes = fecnac.getMonth() + 1;
                    if(fecnac.getMonth()<9){
                        mes = "0"+ mes;
                    }
                    var dia =fecnac.getDate() + 2;
                    if(dia<10){
                        dia = "0"+ dia;
                    }
                    fecnac = fecnac.getFullYear()+"-"+mes+"-"+dia;
                    registrarCiudadano.fec_nacimiento = fecnac;
                    registrarCiudadano.lugar_nacimiento = document.getElementById(consultas[5]).value;
                    registrarCiudadano.pais = document.getElementById(consultas[8]).value;
                    registrarCiudadano.departamento = document.getElementById(consultas[9]).value;
                    registrarCiudadano.provincia = document.getElementById(consultas[10]).value;
                    registrarCiudadano.municipio = document.getElementById(consultas[11]).value;
                    registrarCiudadano.macrodistrito = document.getElementById(consultas[12]).value;
                    registrarCiudadano.distrito = " ";
                    registrarCiudadano.zona = document.getElementById(consultas[13]).value;
                    registrarCiudadano.sexo = document.getElementById(consultas[7]).value;
                    registrarCiudadano.id_estado_civil = "S";
                    registrarCiudadano.profesion = "50";
                    registrarCiudadano.otra_profesion = " ";
                    registrarCiudadano.telefono = document.getElementById(consultas[15]).value;
                    registrarCiudadano.movil = document.getElementById(consultas[16]).value;
                    registrarCiudadano.correo = " ";
                    registrarCiudadano.direccion = document.getElementById(consultas[14]).value;
                    registrarCiudadano.usr_id = "0";
                    registrarCiudadano.activacionf = "SI";
                    registrarCiudadano.activaciond = "SI";
                    registrarCiudadano.crearNatural(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        console.log("resultado de la api",resultadoApi.success);
                        if( typeof(resultadoApi.success) != 'undefined')
                        {
                           
                        }
                        else
                        {                            
                        }
                    });*/
                }
            }
            $("#myModalGrilla").modal('hide');
        }else{
            sweetAlert('','Complete Todos Los Datos correctamente','error');
                               
        }
    };
    addBtn.setAttribute("type", "button");
    addBtn.className = 'btn btn-primary btn-inverse';
    addBtn.innerText = 'Guardar';
    footer.appendChild(addBtn);
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.setAttribute("type", "button");
    closeBtn.className = 'btn btn-primary btn-inverse';
    closeBtn.innerText = 'Cerrar';
    footer.appendChild(closeBtn);
    $("#myModalGrilla").modal('show');
}

function eliminarTabla(id, campo,cadena){
    var eliminarcalc = 0; 
    var cantidad = 0;
    datos = JSON.parse(document.getElementById(campo).value);
    if(cadena != undefined){
    var matriz = cadena.split(',');
    angular.forEach(datos[id], function(value, key) {
        cantidad++;
        for(var i = 0 ; i <= matriz.length-7 ;i=i+7){  
            var componente = matriz[i+2].split(':');
            if(componente[0] == 'SUM' ){   
                eliminarcalc = 1; 
            }else if( componente[0] == 'PROM'){ 
                eliminarcalc = 1; 
            }
        }
    }, log);
    }
    if(eliminarcalc != 0){
        var sum = document.getElementById(campo+'_CAL').value.split(",").map(parseFloat);
        var count = parseInt(document.getElementById(campo+'_CONT').value);
        count--;
        document.getElementById(campo+'_CONT').value = count;
        var table = document.getElementById('tabla_'+campo);
        var rowCount = table.rows.length - 1;    
        angular.forEach(datos[id], function(value, key) {
            var j = cantidad;
            for(var i = 0 ; i <= matriz.length-7 ;i=i+7){  
                j = j - 1;         
                if(matriz[i+1] == key){
                    var componente = matriz[i+2].split(':');
                    if(componente[0] == 'SUM' ){ 
                        sum[j] = sum[j] - value;  
                    }else if( componente[0] == 'PROM'){                 
                        sum[j] = sum[j] - value;
                    }
                }
            }
        }, log);
        document.getElementById(campo+'_CAL').value = sum;
        delete datos[id];
        delete datos[rowCount];
        var nuevosDatos=[];
        nuevosDatos = JSON.stringify(datos);
        document.getElementById(campo).value = nuevosDatos;
        cambiarDisplay(campo+'_row'+ id);
        cambiarDisplay(campo+'_row'+ rowCount);

        var rowCount1 = table.rows.length;
        var row1 = table.insertRow(rowCount1);
        row1.id=campo+"_row"+(rowCount1);
        var newdiv = document.createElement('td');
        var jsonSting="{";
        var j = 0;
        for(var i = matriz.length-7; i >=0 ;i=i-7){
            cell2 = row1.insertCell(0);
            cell2.id="c_"+matriz[i+1]+(rowCount1);
            var componente = matriz[i+2].split(':');               
            if(componente[0] == 'PROM'){
                var currenttext = document.createElement("input"); 
                currenttext.id = matriz[i+1]+(rowCount1);
                currenttext.type = "text";
                currenttext.disabled = "true";
                currenttext.readonly = "readonly";
                currenttext.className = "form-control";
                var prom = sum[j]/count;
                jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+prom+'",';
                currenttext.value = prom; 
            }else if(componente[0] == 'SUM'){
                var currenttext = document.createElement("input"); 
                currenttext.id = matriz[i+1]+(rowCount);
                currenttext.type = "text";
                currenttext.disabled = "true";
                currenttext.readonly = "readonly";
                currenttext.className = "form-control";
                jsonSting=jsonSting+'"'+matriz[i+1]+'":"'+sum[j]+'",';
                currenttext.value = sum[j]; 
            }
            else {
                jsonSting=jsonSting+'"'+matriz[i+1]+'":" ",';
                var currenttext = document.createElement("input"); 
                currenttext.id = matriz[i+1]+(rowCount);
                currenttext.type = "text";
                currenttext.disabled = "true";
                currenttext.readonly = "readonly";
                currenttext.className = "form-control";
                currenttext.value = " ";          
            }
            cell2.appendChild(currenttext);
            j++;
        }
        newdiv.innerHTML = '<div></div></td>';
        newdiv.id="c_btn_"+row1.id;
        cell2 = row1.insertCell(0);
        cell2.appendChild(newdiv);
        jsonSting = jsonSting.substring(0,jsonSting.length-1);
        jsonSting = jsonSting + "}";
        addRowJson(jsonSting,campo);

    } else{
        datos = JSON.parse(document.getElementById(campo).value);
        delete datos[id];
        var nuevosDatos=[];
        nuevosDatos = JSON.stringify(datos);
        document.getElementById(campo).value = nuevosDatos;
        cambiarDisplay(campo+'_row'+ id);
    }
}
