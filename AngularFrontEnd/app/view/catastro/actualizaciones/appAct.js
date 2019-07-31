app.filter("FormatoSercat", function(){
    return function(text) {
        if(text != null){
            if(text.length == 15)
            {
                var cc = text;
                return cc.substring(0, 3) + '-' + cc.substring(3, 7) + '-' + cc.substring(7, 11) + '-' + cc.substring(11, 15);
            }
            else
            {
                return text;
            }
        }
    }
});
app.directive('vaCombo', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.indexOf("e") > -1) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

//Para convertir a object params los parametros enviados por el metodo POST -- OK
Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};

//Funcion padleft
function Padleft(pad,valor) {
    var str = "" + valor;
    return ans = pad.substring(0, pad.length - str.length) + str;
};

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});


function ActController($scope, $rootScope, $routeParams, $location, $http, sessionService,CONFIG, LogGuardarInfo, $element,  ngTableParams, sweet, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout) 
{
    $scope.tablaSolicitudes        =   {};
    $scope.solicitudesUsuario      =   [];
    $scope.listaExp = [];
    $scope.listaTipoDoc = [
        {id:'1',Desc:'CARNET DE IDENTIDAD'},
        {id:'7',Desc:'NIT'}
    ];
    $scope.modificado = false;
    $scope.requisitos=[];
    $scope.fecha1='';
    $scope.idAct='';
    $scope.registroOld={matricula:'',testimonio:'',numInmueble:'',numPuerta:'',superficies:'',obsVarios:'',actVarios:'',gestion:''};
    $scope.registro={matricula:'',testimonio:'',numInmueble:'',numPuerta:'',superficies:'',obsVarios:'',actVarios:'',gestion:''};
    $scope.registroBool={matriculaInt:false,testimonioInt:false,numInmuebleInt:'',numPuertaInt:false,superficiesInt:false};
    $scope.checksOld={zona:false,suelo:false,area:false,predioADM:false,predioPatr:false,plazo:false,valor:false};
    $scope.checks={zona:false,suelo:false,area:false,predioADM:false,predioPatr:false,plazo:false,valor:false};
    $scope.codSolicitud="";
    $scope.obs=false;
    $scope.flagActVarios={propietario:false,datosLegales:false,numPuerta:false,observaciones:false,valoracion:false,ordenVia:false,materialVia:false};
    $scope.atras=false;$scope.mod=false;
    $scope.ubicacion="Vía principal";
    $scope.codCat="";
    $scope.codCat1="";
    $scope.vista=false;
    $scope.estadoActualizacion=5;
    $scope.newRow=false;
    $scope.temp="";
    $scope.temp1="";
    $scope.actVarios="";
    $scope.btnValidar=false;
    $scope.msgError1="Por favor revise los datos de propietario";
    //datos estaticos para el reporte
    $scope.actTipo=[];
    $scope.users = [{idUsr:'',ci: '',expedido:'',tipoDoc:'',tipoProp:'',fechaNac: '',ap:'',am:'',nombres:'',dir:'',pmc:'',cel:'',correo: '',porc: ''}];
    $scope.vias=[{idVia:'',nombreVia:'',idMatCalle:'',Desc:'',viaPrincipal:'',idMatCalleInicial:'',viaPrincipalInicial:''}];
    var aReg = { "cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"",
        "fecha_nacimiento":"","materno":"","nombre":"","ocupacion":"","paterno":"","sexo":"","telefono":"",
        "cedula2": "","nit2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
        "nit": "","razonSocial": "","tipoP": "","cestcivil_id": "","expedido":""};
    $scope.formReq=false;
    $scope.ConfIntegra = {  //la misma configuración que duplicados en linea, revisar
        idServicio : 8, //1
        idProcodigo:'AE-RAJ',
        idTramite : 0
    };

    //============ consultas dreamFactory ==================
    $scope.consultaActTipo=function()
    {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualizaEstado(null,null,"C4", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.actTipo=resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consulta Tipo de Actividad", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consulta Tipo de Actividad", resApi.error.code);
            }
        });

        dataSitOL.actTramiteLineaActualizaEstado(null,null,"C5", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.MatCalle=resApi.success.dataSql;
                $scope.listaMaterial=$scope.MatCalle;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consulta Tipo de Actividad", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consulta Tipo de Actividad", resApi.error.code);
            }
        });
    };

    $scope.consultarFecha=function()
    {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualizaEstado(null,null,"C3", function(resultado)
        {
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var res=resApi.success.dataSql[0];
                var fecha =res.fecha.split("/");
                var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
                var diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
                $scope.fecha1=diasSemana[res.dia - 1] + ', ' + fecha[0] + ' de ' + meses[parseInt(fecha[1]) - 1] + ' de ' + fecha[2] + ', ' + res.hora.substring(0, 5);
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion consultar fecha", resApi.error.message);
                console.log("Error al recuperar datos en la funcion consultar fecha", resApi.error.code);
            }
        });
    };

    $scope.listaExpedido=function ()
    {
        var dataSit = new dataSIT();
        dataSit.actCatastroListaExpedido(null,null,null,"C2", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaExp=resApi.success.dataSql;
                $scope.listaExp.splice(0,1); $scope.listaExp.splice(9,1);
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Lista Expedido", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Lista Expedido", resApi.error.code);
            }
        });
    };

    $scope.getListaObservaciones=function () {

        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualizaLista(null,null,"C1", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var res=resApi.success.dataSql;
                $scope.listaObs=res;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Lista de Observaciones", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Lista de Observaciones", resApi.error.code);
            }
        });
    };

    $scope.consultarTramite=function ()
    {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualiza(null/*idE*/,null/*numsol*/,null/*ges*/,$scope.idAct/*idact*/,null/*idlinea*/,null/*numP*/,0/*sup*/,null/*obs*/,null/*fReal*/,null/*numT*/,null/*val*/,null/*actVa*/,null/*estR*/,null/*codcat*/,null/*numInm*/,null/*viaPrin*/,null/*oidcuidadano*/,null,null,"C10", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var results=resApi.success.dataSql;
                $scope.registro.matricula=results[0].FolioReal;
                $scope.registro.numInmueble=results[0].NumInmueble;
                $scope.registro.testimonio=results[0].numTestimonio;
                $scope.registro.numPuerta=results[0].NumeroPuerta;
                $scope.registro.superficies=results[0].SuperficieLegal;
                $scope.registro.actVarios=results[0].ActVarios;
                $scope.registro.obsVarios=results[0].ObsVarios;
                $scope.obs=results[0].ObservacionCertificado == 1;
                $scope.codCat1=results[0].codigocatastral;
                $scope.codSolicitud=results[0].NumeroSolicitud;
                $scope.registro.gestion=results[0].Gestion;
                $scope.codCat=results[0].codigocatastral.substring(0, 3)+' '+results[0].codigocatastral.substring(3, 7)+' '+results[0].codigocatastral.substring(7, 11)+' '+results[0].codigocatastral.substring(11, 15);
                //====================consulta de observaciones=======
                $scope.getObs();
                $scope.getActVarios();
                $scope.consultaRequisitos(results[0].ActVarios,results[0].ObsVarios);
                $scope.consultaSucursales();
                $scope.checks.valor=(results[0].Valoracion == 1);
                $scope.checksOld.valor=(results[0].Valoracion==1);
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consultar Tramite", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consultar Tramite", resApi.error.code);
            }
        });
    };
    
    $scope.adicionarTramite=function () {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualiza(null/*idE*/,null/*numsol*/,null/*ges*/,null/*idact*/,null/*idlinea*/,''/*numP*/,0/*sup*/,0/*obs*/,''/*fReal*/,''/*numT*/,0/*val*/,''/*actVa*/,0/*estR*/,$scope.codCat1/*codcat*/,''/*numInm*/,null/*viaPrin*/,sessionService.get('IDUSUARIO')/*oidcuidadano*/,''/*ObsVarios*/,5,"A", function(resultado){
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
                $scope.flagActVarios.propietario=false;
                $scope.idAct=results[0].IdActualiza;
                $scope.consultarTramite();
                $scope.users=[];$scope.insertado={};
                $scope.insertado = {idUsr:'',ci: '',expedido:'',tipoDoc:'',tipoProp:'',fechaNac: '',ap:'',am:'',nombres:'',dir:'',pmc:'',cel:'',correo: '',porc: '100'};
                $scope.users.push($scope.insertado);
                $scope.users[0].correo=aReg.correo;datoCorreo=aReg.correo;
        $scope.users[0].fechaNac=aReg.fecha_nacimiento;
                if (tipoPersona == 'NATURAL') {
                    $scope.datospersonaNatural = null;
                    $scope.datospersonaJuridica = "ocultar";
                    $scope.users[0].ap=aReg.paterno;
                    $scope.users[0].am=aReg.materno;
                    $scope.users[0].nombres=aReg.nombre;
                    $scope.users[0].ci=aReg.cedula;
                    $scope.users[0].tipoDoc='1';
                    $scope.users[0].cel=aReg.telefono;
                    $scope.users[0].dir=aReg.direccion;
                    $scope.users[0].tipoProp='P';
                    var exp = aReg.expedido;
                    $scope.users[0].expedido=$scope.setExpedido(exp);                    
                }
                else{
                    $scope.datospersonaJuridica = null;
                    $scope.datospersonaNatural = "ocultar";
                    $scope.users[0].nombres=aReg.razonSocial;
                    $scope.users[0].ci=aReg.nit;
                    $scope.users[0].tipoDoc='7';
                    $scope.users[0].cel=aReg.telefono;
                    $scope.users[0].tipoProp='E';
                }
                $scope.adicionarPropietario(0);
                $scope.consultarPropietarios();
            }
            else {
                sweet.show('', 'Error al registrar tramite', 'error');
                console.log("Error al recuperar datos en la funcion Adicinar Tramite", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Adicinar Tramite", resApi.error.code);
            }
        });

        //consulta de vias por codigo catastral
        var dataSit = new dataSIT();
        dataSit.actCatastroPredVias(null/*vIdCodigo*/,null/*vIdVia*/,$scope.codCat1/*vCodigoCatastral*/,null/*vViaPrincipal*/,null/*vCodigoUsuario*/,"C3"/*vAccion*/, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql) {
                    var results = resApi.success.dataSql;
                    $scope.vias = [];
                    for (i = 0; i < results.length; i++) {
                        $scope.insertado = {};
                        $scope.insertado = {
                            idVia: results[i].IdVia,
                            nombreVia: results[i].nombrevia,
                            idMatCalle: results[i].IdMatCalle,
                            Desc: results[i].Descripcion,
                            viaPrincipal: results[i].ViaPrincipal,
                            idMatCalleInicial: results[i].IdMatCalle,
                            viaPrincipalInicial: results[i].ViaPrincipal
                        };
                        $scope.vias.push($scope.insertado);
                        $scope.adicionarVia(i);
                    }
                }
                else{
                    sweet.show('', 'Error: \n no se pudo recuperar vias del predio', 'error');
                }
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion actCatastroPredVias", resApi.error.message);
                console.log("Error al recuperar datos en la funcion actCatastroPredVias", resApi.error.code);
            }
        });
        $scope.solicitudesCiudadano();
    };

    $scope.modificarTramite=function () {
        var superficies=($scope.registro.superficies.length!=0)?$scope.registro.superficies:0;
        $scope.setObs();
        var obs=($scope.obs==true)?1:0;
        var valoracion=($scope.checks.valor==true)?1:0;
        $scope.setActVarios();
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualiza(null/*idE*/,null/*numsol*/,null/*ges*/,$scope.idAct/*idact*/,null/*idlinea*/,$scope.registro.numPuerta/*numP*/,superficies/*sup*/,obs/*obs*/,$scope.registro.matricula/*fReal*/,$scope.registro.testimonio/*numT*/,valoracion/*val*/,$scope.registro.actVarios/*actVa*/,0/*estR*/,$scope.codCat1/*codcat*/,$scope.registro.numInmueble/*numInm*/,null/*viaPrin*/,sessionService.get('IDUSUARIO')/*oidcuidadano*/,$scope.registro.obsVarios/*obsVarios*/,5/*estadoAct*/,"C", function(resultado) {
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var results=resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Modificar Tramite", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Modificar Tramite", resApi.error.code);
            }
        });
    };

    $scope.modificarFechaTramite=function () {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualizaEstado($scope.idAct,null,"C2", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
            }
            else {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Modificar Fecha Tramite", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Modificar Fecha Tramite", resApi.error.code);
            }
        });
    };

    $scope.cambiarEstadoTramite=function () {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualizaEstado($scope.idAct,6,"C1", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
                $scope.solicitudesCiudadano();
            }
            else {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Cambiar Estado Tramite", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Cambiar Estado Tramite", resApi.error.code);
            }
        });
    };

    $scope.consultarPropietarios=function () {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaPropietario($scope.idAct/*idAct*/ ,null /*vIdLineaPropietario*/,null /*vNombre*/,null/*vApPaterno*/,null /*vApMaterno*/,null /*vNumeroDocumento*/,null/*vTipoDocumento*/,null /*vExpedido*/,null /*vFechaNacimiento*/,null/*vNumeroPMC*/,null /*vEmail*/,null /*vTelefono*/,null/*vTipoPropietario*/,null /*vDireccion*/,0/*vPorcentaje*/,"C1", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success) {
                var results = resApi.success.dataSql;
                $scope.users=[];
                for(i=0;i<results.length;i++) {
                    $scope.insertado = {
                        idUsr: results[i].IdLineaPropietario,
                        ci: results[i].NumeroDocumento,
                        expedido: results[i].Expedido,
                        tipoDoc: results[i].TipoDocumento,
                        tipoProp: results[i].TipoPropietario,
                        fechaNac: results[i].FechaNacimiento,
                        ap: results[i].ApPaterno,
                        am: results[i].ApMaterno,
                        nombres: results[i].Nombre,
                        dir: results[i].Direccion,
                        pmc: results[i].NumeroPMC,
                        cel: results[i].Telefono,
                        correo: results[i].Email,
                        porc: results[i].Porcentaje
                    };
                    $scope.users.push($scope.insertado);
                }
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consulta Propietario", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consulta Propietario", resApi.error.code);
            }
        });
    };

    $scope.adicionarPropietario=function (i) {
        $scope.users[i].tipoProp=($scope.users[i].tipoDoc==1)?'P':'E';
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaPropietario($scope.idAct/*idAct*/ ,null /*vIdLineaPropietario*/,$scope.users[i].nombres /*vNombre*/,$scope.users[i].ap/*vApPaterno*/,$scope.users[i].am /*vApMaterno*/,$scope.users[i].ci /*vNumeroDocumento*/,$scope.users[i].tipoDoc/*vTipoDocumento*/,$scope.users[i].expedido /*vExpedido*/,$scope.users[i].fechaNac /*vFechaNacimiento*/,$scope.users[i].pmc/*vNumeroPMC*/,$scope.users[i].correo /*vEmail*/,$scope.users[i].cel /*vTelefono*/,$scope.users[i].tipoProp/*vTipoPropietario*/,$scope.users[i].dir /*vDireccion*/,$scope.users[i].porc/*vPorcentaje*/,"A", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
                $scope.users[i].idUsr=results[0].IdLineaPropietario;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Adicionar Propietario", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Adicionar Propietario", resApi.error.code);
            }
        });
    };

    $scope.modificarPropietario=function (i) {
        $scope.users[i].tipoProp=($scope.users[i].tipoDoc==1)?'P':'E';
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaPropietario(null/*idAct*/ ,$scope.users[i].idUsr /*vIdLineaPropietario*/,$scope.users[i].nombres /*vNombre*/,$scope.users[i].ap/*vApPaterno*/,$scope.users[i].am /*vApMaterno*/,$scope.users[i].ci /*vNumeroDocumento*/,$scope.users[i].tipoDoc/*vTipoDocumento*/,$scope.users[i].expedido /*vExpedido*/,$scope.users[i].fechaNac/*vFechaNacimiento*/,$scope.users[i].pmc/*vNumeroPMC*/,$scope.users[i].correo /*vEmail*/,$scope.users[i].cel /*vTelefono*/,$scope.users[i].tipoProp/*vTipoPropietario*/,$scope.users[i].dir /*vDireccion*/,$scope.users[i].porc/*vPorcentaje*/,"C", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Modificar Propietario", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Modificar Propietario", resApi.error.code);
            }
        });
    };

    $scope.eliminarPropietario=function (i) {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaPropietario(null/*idAct*/ ,$scope.users[i].idUsr /*vIdLineaPropietario*/,null /*vNombre*/,$scope.users[i].ap/*vApPaterno*/,$scope.users[i].am /*vApMaterno*/,$scope.users[i].ci /*vNumeroDocumento*/,$scope.users[i].tipoDoc/*vTipoDocumento*/,$scope.users[i].expedido /*vExpedido*/,$scope.users[i].fechaNac /*vFechaNacimiento*/,$scope.users[i].pmc/*vNumeroPMC*/,$scope.users[i].correo /*vEmail*/,$scope.users[i].cel /*vTelefono*/,$scope.users[i].tipoProp/*vTipoPropietario*/,$scope.users[i].dir /*vDireccion*/,0/*vPorcentaje*/,"B", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Eliminar Propietario", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Eliminar Propietario", resApi.error.code);
            }
        });
        
    };

    $scope.consultarVias=function () {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaTramiteLineaPredVias($scope.idAct/*vIdActualiza*/,null /*vIdVia*/,null /*vIdMatCalle*/,null/*vViaPrincipal*/,null /*vNombreVia*/,"C1", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success) {
                var results = resApi.success.dataSql;
                $scope.vias=[];
                for(i=0;i<results.length;i++){
                    $scope.insertado = {
                        idVia: results[i].IdVia,
                        nombreVia: results[i].nombreVia,
                        idMatCalle: results[i].IdMatCalle,
                        Desc: '',//recuperar material descripcion de material via
                        viaPrincipal: results[i].ViaPrincipal,
                        idMatCalleInicial: results[i].IdMatCalleInicial,
                        viaPrincipalInicial: results[i].ViaPrincipalInicial
                    };
                    $scope.vias.push($scope.insertado);
                }
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consultar Vias", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consultar Vias", resApi.error.code);
            }
        });
    };

    $scope.adicionarVia=function (i){
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaTramiteLineaPredVias($scope.idAct/*vIdActualiza*/,$scope.vias[i].idVia /*vIdVia*/,$scope.vias[i].idMatCalle /*vIdMatCalle*/,$scope.vias[i].viaPrincipal/*vViaPrincipal*/,$scope.vias[i].nombreVia /*vNombreVia*/,"A", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success) {
                var results = resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Adicionar Via", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Adicionar Via", resApi.error.code);
            }
        });
    };

    $scope.modificarVia=function (i) {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaTramiteLineaPredVias($scope.idAct/*vIdActualiza*/,$scope.vias[i].idVia /*vIdVia*/,$scope.vias[i].idMatCalle /*vIdMatCalle*/,null/*vViaPrincipal*/,null /*vNombreVia*/,"C2", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success) {
                var results = resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Modificar Via", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Modificar Via", resApi.error.code);
            }
        });
    };

    $scope.modificarOrden=function (i) {
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaTramiteLineaPredVias($scope.idAct/*vIdActualiza*/,$scope.vias[i].idVia /*vIdVia*/,null /*vIdMatCalle*/,$scope.vias[i].viaPrincipal/*vViaPrincipal*/,null /*vNombreVia*/,"C3", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success) {
                var results = resApi.success.dataSql;
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Modificar Orden", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Modificar Orden", resApi.error.code);
            }
        });
    };
    
    $scope.consultaRequisitos=function(actVarios,obsVarios)
    {
        if($scope.formReq==true) {
            if (actVarios.length) 
            {
                var dataSitOL = new dataSITOL();
                dataSitOL.actTramiteLineaActualiza(null/*idE*/, null/*numsol*/, null/*ges*/, $scope.idAct/*idact*/, null/*idlinea*/, null/*numP*/, 0/*sup*/, null/*obs*/, null/*fReal*/, null/*numT*/, null/*val*/, actVarios/*actVa*/, null/*estR*/, null/*codcat*/, null/*numInm*/, null/*viaPrin*/, null/*oidcuidadano*/, null/*obsVarios*/, null/*idEstado*/, "C12", function (resultado) {
                    var resApi = JSON.parse(resultado);
                    if (resApi.success)
                    {
                        var results = resApi.success.dataSql;
                        $scope.requisitos = results;
                        if (obsVarios.length) {
                            var cadena = obsVarios.split(',');
                            for (i = 0; i < cadena.length; i++) {
                                if (cadena[i] != 6) {
                                    var dataSitOL = new dataSITOL();
                                    dataSitOL.actTramiteLineaActualiza(null/*idE*/, null/*numsol*/, null/*ges*/, $scope.idAct/*idact*/, null/*idlinea*/, null/*numP*/, 0/*sup*/, null/*obs*/, null/*fReal*/, null/*numT*/, null/*val*/, null/*actVa*/, null/*estR*/, null/*codcat*/, null/*numInm*/, null/*viaPrin*/, null/*oidcuidadano*/, cadena[i]/*obsVarios*/, null, "C14", function (resultado) {
                                        var resApi = JSON.parse(resultado);
                                        if(resApi.success)
                                        {
                                            var results = resApi.success.dataSql;
                                            $scope.requisitos.push(results[0]);
                                        }
                                        else {
                                            sweet.show('', 'Error al recuperar datos', 'error');
                                            console.log("Error al recuperar datos en la funcion Consultar Requisitos", resApi.error.message);
                                            console.log("Error al recuperar datos en la funcion Consultar Requisitos", resApi.error.code);
                                        }
                                    });
                                }
                            }
                        }
                    }
                    else {
                        sweet.show('', 'Error al recuperar datos', 'error');
                        console.log("Error al recuperar datos en la funcion Consultar Requisitos", resApi.error.message);
                        console.log("Error al recuperar datos en la funcion Consultar Requisitos", resApi.error.code);
                    }
                });
            }
            else {
                $scope.requisitos = [];
            }
        }
    };

    $scope.consultaSucursales=function (){
        var idDistrito=parseInt($scope.codCat1.substring(0,3));
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualiza(null/*idE*/,idDistrito/*numsol*/,null/*ges*/,null/*idact*/,null/*idlinea*/,null/*numP*/,0/*sup*/,null/*obs*/,null/*fReal*/,null/*numT*/,null/*val*/,null/*actVa*/,null/*estR*/,null/*codcat*/,null/*numInm*/,null/*viaPrin*/,null/*oidcuidadano*/,null/*obsVarios*/,null/*idEstado*/,"C13", function(resultado) {
            var resApi = JSON.parse(resultado);
            if (resApi.success) {
                var results = resApi.success.dataSql;
                $scope.sucursales = results;
            }
            else {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Consultar Sucursales", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Consultar Sucursales", resApi.error.code);
            }
        });
    };

    $scope.recuperarDatosRegistro = function(){
        var datosCiudadano=new rcNatural();
        datosCiudadano.oid=sessionService.get('IDCIUDADANO');
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            var response = JSON.parse(resultado);
            if (response.length > 0) {
                var results = response;
                tipoPersona = results[0].dtspsl_tipo_persona;
                var dateObj = new Date();
                var month = dateObj.getMonth() + 1; //months from 1-12
                var day = dateObj.getDate();
                var year = dateObj.getFullYear();
                aReg.fecha_nacimiento = day + '/' + month + '/' + year;
                //aReg.fecha_nacimiento =null;
                if(results[0].dtspsl_fec_nacimiento){
                    var dateObj = new Date(results[0].dtspsl_fec_nacimiento);
                    var month = dateObj.getMonth() + 1; //months from 1-12
                    var day = dateObj.getDate();
                    var year = dateObj.getFullYear();
                    aReg.fecha_nacimiento = day + '/' + month + '/' + year;
                }
                if (tipoPersona == 'NATURAL') {
                    $scope.datospersonaNatural = null;
                    $scope.datospersonaJuridica = "ocultar";
                    aReg.nombre = results[0].dtspsl_nombres;
                    aReg.paterno = results[0].dtspsl_paterno;
                    aReg.materno = results[0].dtspsl_materno;
                    aReg.cedula = results[0].dtspsl_ci;
                    aReg.expedido = results[0].dtspsl_expedido;
                    aReg.sexo=(results[0].dtspsl_sexo=='M')?'MASCULINO':'FEMENINO';

                    aReg.ocupacion = results[0].dtspsl_ocupacion;
                    aReg.direccion = null;
                    if(results[0].dtspsl_direccion){if(results[0].dtspsl_direccion.length>0){aReg.direccion = results[0].dtspsl_direccion}}
                    aReg.correo = '';//results[0].dtspsl_correo;
                    aReg.telefono = '';//results[0].dtspsl_telefono;
                    aReg.telefono = null;
                    if(results[0].dtspsl_telefono1)
                    {
                        if(results[0].dtspsl_telefono1.length>0){
                            aReg.telefono = results[0].dtspsl_telefono;
                        }
                    }
                    else if(results[0].dtspsl_movil.length){
                        if(results[0].dtspsl_movil.length>0){
                            aReg.telefono = results[0].dtspsl_movil;
                        }
                    }
                    aReg.celular = '';//results[0].dtspsl_movil;
                    angelNatural = aReg;
                }
                else{
                    $scope.datospersonaJuridica = null;
                    $scope.datospersonaNatural = "ocultar";
                    aReg.nombre = results[0].dtspsl_nombres;
                    aReg.paterno = results[0].dtspsl_paterno;
                    aReg.materno = results[0].dtspsl_materno;
                    aReg.cedula = results[0].dtspsl_ci;
                    aReg.repLegal = results[0].dtspsl_poder_replegal;
                    aReg.nroNotaria = results[0].dtspsl_nro_notaria;
                    aReg.nroDocumento = results[0].dtspsl_nro_documento;
                    //DATOS INICIALES REGISTRO CIUDADANO
                    aReg.razonSocial   = results[0].dtspsl_razon_social;
                    if(results[0].dtspsl_telefono.length>0)
                    {
                        aReg.telefono = results[0].dtspsl_telefono;
                    }
                    else if(results[0].dtspsl_movil.length>0){
                        aReg.telefono = results[0].dtspsl_movil;
                    }
                    else{aReg.telefono = null}
                    aReg.celular       =  '';//results[0].dtspsl_movil;
                    aReg.correo        =  '';//results[0].dtspsl_correo;
                    aReg.nit           = results[0].dtspsl_nit;
                    if(results[0].dtspsl_direccion){aReg.direccion = results[0].dtspsl_direccion}else{aReg.direccion = null}
                    aReg.nrocasa       = results[0].dtspsl_numero_casa;
                    aReg.nrooficina    = results[0].dtspsl_oficina;

                }
                switch(aReg.expedido) {
                    case 'LPZ':
                        aReg.expedido = 1;
                        break;
                    case 'CBB':
                        aReg.expedido = 2;
                        break;
                    case 'SCZ':
                        aReg.expedido = 3;
                        break;
                    case 'ORU':
                        aReg.expedido = 4;
                        break;
                    case 'PTS':
                        aReg.expedido = 5;
                        break;
                    case 'CHQ':
                        aReg.expedido = 6;
                        break;
                    case 'TJA':
                        aReg.expedido = 7;
                        break;
                    case 'BNI':
                        aReg.expedido = 8;
                        break;
                    case 'PND':
                        aReg.expedido = 9;
                        break;
                }
            }
            else{
                console.log("Error no se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
            }
        });
    };

    $scope.adicionarIF = function(paramForm){
        var idProcodigo = $scope.ConfIntegra.idProcodigo;
        var datosSerializados = JSON.stringify(paramForm);
        var serIF = new gCrearCaso();
        serIF.usr_id=1;
        serIF.datos=datosSerializados;
        serIF.procodigo=$scope.ConfIntegra.idProcodigo;
        serIF.crearCasoAeLinea( function(resultado){
            $.unblockUI();
        });
    };
    
    //============ consultas dreamFactory fin==================

    $scope.$on('api:ready',function(){
        $scope.inicioSolicitudes();
    });

    /*$scope.inicioSolicitudes = function ()
    {
            $scope.recuperarDatosRegistro();
            $scope.consultaActTipo();
            $scope.consultarFecha();
            $scope.listaExpedido();
            $scope.getListaObservaciones();
            $scope.solicitudesCiudadano();
    };*/


    $scope.inicioSolicitudes = function () 
    { 
         $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px', 

                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                },message: "Espere un momento porfavor..." }); 
        setTimeout(function()
        {
            try{
                $scope.recuperarDatosRegistro();
                $scope.consultaActTipo();
                $scope.consultarFecha();
                $scope.listaExpedido();
                $scope.getListaObservaciones();
                $scope.solicitudesCiudadano();
            }catch(e)
            {
                console.log("error", e);
            }
         },500);
    };





    $scope.setExpedido=function (exp) {
        switch (exp){
            case '1':
                return '1';
                break;
            case '2':
                return '2';
                break;
            case '3':
                return '3';
                break;
            case '4':
                return '6';
                break;
            case '5':
                return '7';
                break;
            case '6':
                return '5';
                break;
            case '7':
                return '4';
                break;
            case '8':
                return '8';
                break;
            case '9':
                return '9';
                break;
            default:
                return '11';
                break;
        }
    };

    $scope.ErrorCapcha='';
    $scope.getlimpiareRROR=function(){$scope.ErrorCapcha='';};

    $scope.CargarPopupBuscador=function () {
        $scope.codigoCatastral={};
        $scope.resultadoBusqueda = {};
        $scope.confirmacionCiudadano = null;
        $scope.getCaptchasX();
    };
    var numero = "";
    $scope.getCaptchasX=function(){
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            document.getElementById('img2').src = i1.substring(1, i1.length - 1);
            document.getElementById('img1').src = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            document.getElementById('img1').title = "Palabra en " + lengua;
            document.getElementById('resultadoC').value = "";
            document.getElementById('resultadoC').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
            document.getElementById('lbllengua').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };

    $scope.VerificarCapcha = function(codigoCatastral){
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
                $scope.getCaptchasX();
                $scope.codigoCatastral={};
                $scope.resultadoC="";
                sweet.show('Capcha incorrecto','', 'error');
            }else{
                $scope.BuscarCertificado(codigoCatastral);
            }
        });
    };

    $scope.BuscarCertificado=function (codcat) {
        var d = Padleft('000',$scope.codigoCatastral.distrito);
        var m = Padleft('0000',$scope.codigoCatastral.manzana);
        var p = Padleft('0000',$scope.codigoCatastral.predio);
        if($scope.codigoCatastral.subpredio==undefined)
            $scope.codigoCatastral.subpredio =0;
        var sp = Padleft('0000',$scope.codigoCatastral.subpredio);
        var cc = d+m+p+sp;

        var nrodoc =  sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            nrodoc = sessionService.get('NITCIUDADANO');
        }

        var dataSit = new dataSIT();
        dataSit.actBuscarCertificado(cc, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var results=resApi.success.dataSql[0];
                if(results.res == "OK"){
                    $scope.vista=true;
                    $('#divPopup1').modal('hide');
                    $scope.codCat=d+" "+m+" "+p+" "+sp;
                    $scope.codCat1=d+m+p+sp;
                    $scope.generarSolicitud();
                    $('#divPopup').modal('show');
                }
                else
                {
                    results.msg
                    if(results.msg.search() ){

                    }
                    sweet.show('No se encontró codigo catastral','','error');
                    $scope.getCaptchasX();
                }
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Buscar Certificado", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Buscar Certificado", resApi.error.code);
            }
        });
    };
    // ******FIN DE CAPCHA****************
    $scope.solicitudesCiudadano = function(){
        //$.blockUI();
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        var OIDciudadano = sessionService.get('IDUSUARIO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var dataSitOL = new dataSITOL();
        dataSitOL.actTramiteLineaActualiza(null/*idE*/,null/*numsol*/,null/*ges*/,null/*idact*/,null/*idlinea*/,null/*numP*/,0/*sup*/,null/*obs*/,null/*fReal*/,null/*numT*/,null/*val*/,null/*actVa*/,null/*estR*/,null/*codcat*/,null/*numInm*/,null/*viaPrin*/,OIDciudadano,null,null,"C7", function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $.unblockUI();
                $scope.solicitudesUsuario = resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
            }
            else
            {
                sweet.show('', 'Error al recuperar datos', 'error');
                console.log("Error al recuperar datos en la funcion Solicitudes Ciudadano", resApi.error.message);
                console.log("Error al recuperar datos en la funcion Solicitudes Ciudadano", resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.tablaSolicitudes = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            NumeroSolicitud: 'de sc'
        }
    },{
        total: $scope.solicitudesUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ? $filter('filter')($scope.solicitudesUsuario, params.filter()) : $scope.solicitudesUsuario;
            var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitudesUsuario;
            params.total($scope.solicitudesUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.generarSolicitud=function (){
        //nuevo tramite
        $scope.flagActVarios={propietario:false,datosLegales:false,numPuerta:false,observaciones:false,valoracion:false,ordenVia:false,materialVia:false};
        $scope.registro={matricula:'',testimonio:'',numInmueble:'',numPuerta:'',superficies:'',obsVarios:''};
        $scope.checks={zona:false,suelo:false,area:false,predioADM:false,predioPatr:false,plazo:false,valor:false};
        $scope.adicionarTramite();
    };

    $scope.obtenerDatosTramite=function (solicitud,tipo)
    {
        // $scope.rowform.$cancel();
        // $scope.rowform1.$cancel();
        if(tipo==2){
            $('#divPopupReporte').modal('show');
            //$scope.consultaRequisitos($scope.registro.actVarios,$scope.registro.obsVarios);
            // $scope.consultarFecha();
            $scope.formReq=true;
        }
        else{
            $scope.formReq=false;
            //$('#divPopupReporte').modal('show');
        }
        $scope.idAct = solicitud.IdActualiza;
        $scope.consultarTramite();
        $scope.consultarPropietarios();
        $scope.consultarVias();

        $scope.btnValidar=false;
    };

    $scope.guardarTramite=function(){
        $scope.modificarTramite();
        $scope.users=[];
        $scope.vias=[];
        $scope.btnValidar=false;
        $scope.sucursales=[];
        if($scope.modificado==true){
            $scope.registro = {
                matricula: '',
                testimonio: '',
                numInmueble: '',
                numPuerta: '',
                superficies: '',
                obsVarios: '',
                actVarios: '',
                gestion: ''
            };
            $scope.modificado = false;
        }
    };

    $scope.getActVarios=function(){
        $scope.cadena=$scope.registro.actVarios.split(",");
        $scope.flagActVarios={propietario:false,datosLegales:false,numPuerta:false,observaciones:false,valoracion:false,ordenVia:false,materialVia:false};
        for(i=0;i<$scope.cadena.length;i++){
            if($scope.cadena[i]==1){
                $scope.flagActVarios.propietario=true;
            }
            if($scope.cadena[i]==2){
                $scope.flagActVarios.datosLegales=true;
            }
            if($scope.cadena[i]==3){
                $scope.flagActVarios.numPuerta=true;
            }
            if($scope.cadena[i]==4){
                $scope.flagActVarios.observaciones=true;
            }
            if($scope.cadena[i]==5){
                $scope.flagActVarios.valoracion=true;
            }
            if($scope.cadena[i]==6){
                $scope.flagActVarios.ordenVia=true;
            }
            if($scope.cadena[i]==7){
                $scope.flagActVarios.materialVia=true;
            }
        }
    };

    $scope.setActVarios=function (){
        $scope.validarVia();
        $scope.registro.actVarios="";
        if($scope.flagActVarios.propietario){
            $scope.registro.actVarios=$scope.registro.actVarios+"1,";
        }
        if($scope.registro.matricula.length  || $scope.registro.testimonio.length || $scope.registro.numInmueble.length || $scope.registro.superficies != 0){ //
            $scope.flagActVarios.datosLegales=true;
            $scope.registro.actVarios=$scope.registro.actVarios+"2,";
        }
        if($scope.registro.numPuerta.length){
            $scope.flagActVarios.numPuerta=true;
            $scope.registro.actVarios=$scope.registro.actVarios+"3,";
        }
        if($scope.obs){
            $scope.flagActVarios.observaciones=true;
            $scope.registro.actVarios=$scope.registro.actVarios+"4,";
        }
        if($scope.checks.valor){
            $scope.flagActVarios.valoracion=true;
            $scope.registro.actVarios=$scope.registro.actVarios+"5,";
        }
        if($scope.flagActVarios.ordenVia==true){
            $scope.registro.actVarios=$scope.registro.actVarios+"6,";
        }
        if($scope.flagActVarios.materialVia==true){
            $scope.registro.actVarios=$scope.registro.actVarios+"7,";
        }
        $scope.registro.actVarios=$scope.registro.actVarios.substring(0,$scope.registro.actVarios.length-1);
    };

    $scope.validarVia=function () {
        $scope.flagActVarios.materialVia=false;
        $scope.flagActVarios.ordenVia=false;
        for(i=0;i<$scope.vias.length;i++){
            if($scope.vias[i].idMatCalle!=$scope.vias[i].idMatCalleInicial){
                $scope.flagActVarios.materialVia=true;
            }
            if($scope.vias[i].viaPrincipal!=$scope.vias[i].viaPrincipalInicial){
                $scope.flagActVarios.ordenVia=true;
            }
        }
    };

    $scope.getObs=function(){
        $scope.cadena=$scope.registro.obsVarios.split(",");
        $scope.checks={zona:false,suelo:false,area:false,predioADM:false,predioPatr:false,plazo:false,valor:false};
        for(i=0;i<$scope.cadena.length;i++){
            if($scope.cadena[i]==1){
                $scope.checks.zona=true;
            }
            if($scope.cadena[i]==2){
                $scope.checks.suelo=true;
            }
            if($scope.cadena[i]==3){
                $scope.checks.area=true;
            }
            if($scope.cadena[i]==4){
                $scope.checks.predioADM=true;
            }
            if($scope.cadena[i]==5){
                $scope.checks.predioPatr=true;
            }
            if($scope.cadena[i]==6){
                $scope.checks.plazo=true;
            }
        }
    };

    aa=$scope.obs;
    $scope.changeOb=function(id){
        switch (id){
            case 1: $scope.checks.zona=$scope.checks.zona != true;break;
            case 2: $scope.checks.suelo=$scope.checks.suelo != true;break;
            case 3: $scope.checks.area=$scope.checks.area != true;break;
            case 4: $scope.checks.predioADM=$scope.checks.predioADM != true;break;
            case 5: $scope.checks.predioPatr=$scope.checks.predioPatr != true;break;
            case 6: $scope.checks.plazo=$scope.checks.plazo != true;break;
            case 7: $scope.checks.valor=$scope.checks.valor != true;break;
        }
        
        if($scope.checks.zona==true || $scope.checks.suelo==true || $scope.checks.area==true || $scope.checks.predioADM==true || $scope.checks.predioPatr==true || $scope.checks.plazo==true){
            $scope.obs=true;
        }
        else{
            $scope.obs=false;
        }
    };
    $scope.changeObs=function(){

        $('.glyphy').click(function (e) {
            if ($(e.target).is('input')) { // prevent double-event due to bubbling
                $(this).find('.glyphicon').toggleClass('glyphicon-ok glyphicon-unchecked');
            }
        });


        if($scope.checks.zona==true || $scope.checks.suelo==true || $scope.checks.area==true || $scope.checks.predioADM==true || $scope.checks.predioPatr==true || $scope.checks.plazo==true){
            $scope.obs=true;
        }
        else{
            $scope.obs=false;
        }  
    };
    $scope.setObs=function () {
        $scope.registro.obsVarios='';
        if($scope.checks.zona){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"1,";
        }
        if($scope.checks.suelo){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"2,";
        }
        if($scope.checks.area){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"3,";
        }
        if($scope.checks.predioADM){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"4,";
        }
        if($scope.checks.predioPatr){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"5,";
        }
        if($scope.checks.plazo){
            $scope.registro.obsVarios=$scope.registro.obsVarios+"6,";
        }
        $scope.registro.obsVarios=$scope.registro.obsVarios.substring(0,$scope.registro.obsVarios.length-1);
    };

    $scope.validarPorc=function () {
        var total=0;
        for(i=0;i<$scope.users.length;i++){
            total += parseInt($scope.users[i].porc);
        }
        if($scope.mod==true){
            sweet.show('Debe guardar sus cambios efectuados','', 'error');
        }
        else if(total!=100){
            sweet.show('La suma de porcentajes debe ser igual a 100%','', 'error');
        }
        else{
            $('#divPopup2').modal('hide');
            $('#divPopup').modal('show');
        }
    };


    $scope.showExp1=function(data){};

    $scope.validarFecha=function(fecha){
        var current_year=new Date().getFullYear();
        var trueYear =current_year-10;
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((fecha.match(RegExPattern)) && (fecha!='')) {
            var cadFecha=fecha.split('/');
            var dia=cadFecha[0];
            var mes=cadFecha[1];
            var year=cadFecha[2];
            if(mes<=0 || mes>12){
                return false;}
            if(dia<=0 || dia > 31){
                return false;}
            if((year < 1920) || (year > current_year)) {
                return false;}
            return true;

        } else {
            console.log("Error al recuperar datos en la funcion Validar Fecha");
            return false;
        }
    };

    $scope.validar=function (data,index){
        $scope.varError=false;
        if (data.tipoDoc == '' ){
            $scope.msgError='Elija el tipo de documento.';$scope.varError=true;
            return "error";
        }
        if (data.ci == ''){
            $scope.msgError='El Nro. Documento no es válido.';$scope.varError=true;
            return "error";
        }


        if(data.tipoDoc=='1') {
            if (data.expedido == '' || data.expedido == 0 || data.expedido == 10) {
                $scope.msgError = 'El lugar del documento expedido no es válido.';
                $scope.varError = true;
                return "error";
            }
        }

        if(!$scope.validarFecha(data.fechaNac)){
            $scope.msgError='La fecha de nacimiento no es válida.';$scope.varError=true;
            return "error";
        };

        if(data.tipoDoc=='1'){
            if (data.ap == '' || data.ap.length >50){
                $scope.msgError='El Apellido Paterno no es válido.';$scope.varError=true;
                return "error";
            }
        }
        if (data.nombres == ''|| data.nombres.length >50 ){
            $scope.msgError='El nombre del propietario o de la empresa no es válido.';$scope.varError=true;
            return "error";
        }
        if (data.dir == '' ){
            $scope.msgError='La dirección no es válida.';$scope.varError=true;
            return "error";
        }
        if (data.pmc != ''){
            for(i=0;i<$scope.users.length;i++){
                if(index!=i){
                    if(data.pmc == $scope.users[i].pmc){
                        $scope.msgError='Ya existe el número PMC.';$scope.varError=true;
                        return "error";
                    }
                }
            }
        }
        if (data.cel == '' || isNaN(data.cel) || data.cel.length >8 || data.cel.length<6){
            $scope.msgError='El número de telefono no es válido.';$scope.varError=true;
            return "error";
        }
        if(data.correo.length>0) {
            var atpos = data.correo.indexOf("@");
            var dotpos = data.correo.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= data.correo.length) {
                $scope.msgError = 'El correo no es válido.';
                $scope.varError = true;
                return "error";
            }
        }

        for(i=0;i<$scope.users.length;i++) {
            if(index!=i) {
                if (data.ci == $scope.users[i].ci ) {
                    $scope.msgError = 'Ya existe el número de documento.';
                    $scope.varError = true;
                    return "error";
                }
                if ((data.ap.toUpperCase()+data.am.toUpperCase()+data.nombres.toUpperCase()) == ($scope.users[i].ap+$scope.users[i].am+$scope.users[i].nombres)) {
                    $scope.msgError = 'Ya existe el nombre del propietario';
                    $scope.varError = true;
                    return "error";
                }
            }
        }

        if (data.porc == '' || data.porc > 100 || data.porc <= 0 || isNaN(data.porc)){
            $scope.msgError='El porcentaje de participación no es válido.';$scope.varError=true;
            return "error";
        }
    };

    $scope.open = function($event, elementOpened){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        // rowform.$cancel()
    };

    $scope.cancelMod=function(rowform,index){
        rowform.$cancel();
        $scope.mod=false;
        if($scope.newRow==true){
            $scope.users.splice(index, 1);
        }
    };
    $scope.cambiarImagen=function(idImg){
        if(idImg==0){
            $scope.srcTutorial="../catastro/img/actInfografia.png";
        }
        else{
            $scope.srcTutorial="../catastro/img/actPaso"+idImg+".png";
        }
        $scope.idNav=idImg;
    };

    $scope.navegarGuiaTramite=function () {
        switch ($scope.idNav){
            case 1:
            $('#divPopup1').modal('show');
                break;
            case 2:
                $('#divPopup').modal('show');
                break;
            case 3:
                $('#divPopup4').modal('show');
                break;
            case 4:
                $('#divPopupReporte').modal('show');
                break;
            default:

        }
    };
    //=============formulario propietarios
    $scope.mayusculas=function (i) {
        $scope.users[i].ap = $scope.users[i].ap.toUpperCase();
        $scope.users[i].am = $scope.users[i].am.toUpperCase();
        $scope.users[i].nombres = $scope.users[i].nombres.toUpperCase();
        $scope.users[i].dir = $scope.users[i].dir.toUpperCase();
    };

    $scope.addUsuario = function(){
        $scope.mod=true;
        $scope.newRow=true;
        $scope.inserted = {idUsr:'',ci: '',expedido:'',tipoDoc:'',tipoProp:'',fechaNac: '',ap:'',am:'',nombres:'',dir:'',pmc:'',cel:'',correo: '',porc: ''};
        $scope.users.push($scope.inserted);
    };

    $scope.saveUser = function(i) {
        $scope.flagActVarios.propietario=true;
        $scope.mod=false;
        if($scope.newRow==false){
            $scope.mayusculas(i);
            $scope.modificarPropietario(i);
        }
        else{
            $scope.mayusculas(i);
            $scope.adicionarPropietario(i);
        }
    };

    $scope.modUsr = function(rowform){
        rowform.$show();
        $scope.newRow=false;
        $scope.mod=true;
    };

    $scope.removeUser = function(index) {
        $scope.eliminarPropietario(index);
        $scope.consultarPropietarios();
    };

    $scope.showExp = function(user) {
        var selected = [];
        if(user.expedido) {
            selected = $filter('filter')($scope.listaExp, {IdExpedido: user.expedido});
        }
        return selected.length ? selected[0].DescCorta : 'Elija una opción';
    };

    $scope.showTipoDoc = function(user) {
        var selected = [];
        if(user.tipoDoc) {
            selected = $filter('filter')($scope.listaTipoDoc, {id: user.tipoDoc});
        }
        return selected.length ? selected[0].Desc : 'Elija una opción';
    };
    //========================form propietarios
    $scope.codigoCatastral={
        distrito:null,
        manzana:null,
        predio:null,
        subpredio:null
    };

    $scope.modVia = function(rowform){
        rowform.$show();
    };

    $scope.cancelVia=function(rowform,index){
        rowform.$cancel();
        if($scope.newRow==true){
            $scope.vias.splice(index, 1);
        }
    };

    $scope.showMaterial = function(via) {
        var selected = [];
        if(via.idMatCalle) {
            selected = $filter('filter')($scope.listaMaterial, {value: via.idMatCalle});
        }
        return selected.length ? selected[0].text : 'No definido';
    };

    $scope.showListaVias=function (vias) {
        var selected = [];
        if(vias.idMatCalle){
            selected = $filter('filter')($scope.listaMaterial, {value: vias.idMatCalle});
        }
        return selected.length ? selected[0].text : 'No definido';
    };

    $scope.showMaterial1 = function(idVia) {
        var selected = [];
        if(idVia) {
            selected = $filter('filter')($scope.listaMaterial, {value: idVia});
        }
        return selected.length ? selected[0].text : 'No definido';
    };

    $scope.removeVia = function(index) {
        $scope.vias.splice(index, 1);
    };

    $scope.verEliminarUsr=function (index){
        if(index==0){
            return false
        }
        else{
            return true
        }
    };

    $scope.removeEmp = function(index) 
    {
        $scope.Emp.splice(index, 1);
    };

    $scope.addVia = function()
    {
        $scope.newRow=true;
        $scope.inserted = {
            idVia: '',
            nombreVia: '',
            idMatCalle: '',
            Desc: '',
            viaPrincipal: 0
        };
        $scope.vias.push($scope.inserted);
    };

    $scope.addEmpresa = function()
    {
        $scope.newRow=true;
        $scope.inserted = {
            razon: '',
            dir: '',
            telefono: '',
            correo: '',
            casilla: '',
            porc: 0};
        $scope.emp.push($scope.inserted);
    };

    $scope.cancelar=function () 
    {
        $scope.vista = false;
    };

    $scope.guardarDatos=function () 
    {
        $scope.cambiarEstadoTramite();
        $scope.modificarFechaTramite();
        $scope.formReq=true;
        $scope.consultaRequisitos($scope.registro.actVarios,$scope.registro.obsVarios);
        $scope.solicitudesCiudadano();
        $scope.consultaSucursales();
        var di={};
        if (tipoPersona != 'NATURAL') {
            di = {
                TipoTra: "ACTUALIZACION",
                TipoPersona:"JURIDICO",
                OIDCiudadano: sessionService.get('IDUSUARIO'),
                Apellidos: aReg.razonSocial,
                Nombres: aReg.razonSocial,
                NumeroDocumento: aReg.nit,
                Expedido: "",
                TipoDocumento: "NIT",
                CodigoCatastral: $scope.codCat1
            };
        }
        else{
            di = {
                TipoTra: "ACTUALIZACION",
                TipoPersona:"NATURAL",
                OIDCiudadano: sessionService.get('IDUSUARIO'),
                Apellidos: aReg.paterno + ' ' + aReg.materno,
                Nombres: aReg.nombre,
                NumeroDocumento: aReg.cedula,
                Expedido: aReg.expedido,
                TipoDocumento: "CI",
                CodigoCatastral: $scope.codCat1
            };
        }
        $scope.adicionarIF(di);
    };

    $scope.recuperarReporte=function (solicitud) 
    {
        $scope.idAct = solicitud.IdActualiza;
        $scope.consultarTramite();
        $scope.consultarPropietarios();
        $scope.consultarVias();
        $scope.openJSPdf();
    };

    var splitOnce = function(str, delim) 
    {
        var components = str.split(delim);
        var result = [components.shift()];
        if(components.length) {
            result.push(components.join(delim));
        }
        return result;
    };

    $scope.procesarTramite=function()
    {
        $scope.btnValidar=false;
        $scope.modificarTramite();
        if(!($scope.flagActVarios.propietario || $scope.registro.matricula.length  || $scope.registro.testimonio.length || $scope.registro.numInmueble.length || $scope.registro.superficies != 0 || $scope.registro.numPuerta.length || $scope.obs || $scope.checks.valor ||$scope.flagActVarios.ordenVia || $scope.flagActVarios.materialVia)){
            $scope.msgError1="No tiene actualizaciones a realizar";
            return false;
        }
        var total=0;
        for(i=0;i<$scope.users.length;i++){
            total+=parseInt($scope.users[i].porc);
        }
        if(total!=100){
            $scope.msgError1="Por favor revise los porcentajes de participación";
            return false;}
        $scope.btnValidar=true;
    };

    $scope.cambiarOrden=function(index)
    {
        for(i=0;i<$scope.vias.length;i++){
            $scope.vias[i].viaPrincipal=0;
            if(index==i){
                $scope.vias[index].viaPrincipal=1;
            }
           $scope.modificarOrden(i);
        }
    };

    $scope.showOrdenVia=function(i)
    {
        if($scope.vias[i].viaPrincipal==1){
            return 'SI'
        }
        else{
            return 'NO'
        }
    };

    $scope.limpiarDatos=function()
    {
        $scope.registro={matricula:'',testimonio:'',numInmueble:'',numPuerta:'',superficies:'',obsVarios:'',actVarios:'',gestion:''};
        $scope.users=[];
        $scope.vias=[];
        $scope.sucursales=[];
        $scope.btnValidar=false;
    };

    $scope.generarDatos=function () 
    {
        $scope.generarSolicitud();
    }

    $scope.mostrarPDF=function()
    {
        $scope.consultarFecha();
        setTimeout(function()
        {
            $scope.openJSPdf();
        },600);        
    };

    $scope.validarSup=function () 
    {
        if ($scope.registro.superficies.indexOf(',') > -1)
        {
            var str = $scope.registro.superficies;
            var res = str.replace(",", ".");
            $scope.registro.superficies=res;
        }
    };

    // ******generacion de pdf inicio****************
    function setActTipo (i)
    {
        var selected = [];
        selected = $filter('filter')($scope.actTipo, {IdTipoActualizacion: i});
        var txtActTipo= selected.length? selected[0].Descripcion : '*';
        return txtActTipo.charAt(0).toUpperCase() + txtActTipo.slice(1).toLowerCase();
    }
    
    function textoJusto(texto,largo)
    {
        var text=texto;
        var cadena=[];
        while(text.length>largo){
            var n = text.substring(0,largo).lastIndexOf(" ");
            cadena.push(text.substring(0,n));
            text=text.substring(n+1,text.length);
        }
        cadena.push(text.substring(0,text.length));
        return cadena;
    }
    
    $scope.openJSPdf = function()
    {
        function pieDePagina ()
        {
            doc.setFontSize(7);doc.setFontStyle('normal');
            doc.text(105, 273, '- '+ pag +' -' ); //+ '/' + numPag
            doc.text(135, 273, 'Fecha de impresión: '+$scope.fecha1);
            pag++;doc.setFontSize(8);
            doc.rect(11,5,196,264);
        }
        function colorBorde()
        {
            doc.setDrawColor(70,130,180); 
        }

        $scope.vias1 = $filter('orderBy')($scope.vias, 'viaPrincipal',true);
        var doc = new jsPDF('p','mm',[279.4,215.9]);
        var xmax=194,desborde=0,anchoB=0.4;
        var x,y,x1,x2,y1,y2,c1,c2,f1,f2,i,j;
        var pag=1,numPag=2;
        
        pieDePagina();
        doc.setTextColor(0,0,0);
        doc.setFontSize(12);
        y=20;doc.setFontStyle('bold');
        var logoSit='data:image/jpeg;base64,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';
        doc.addImage(logoSit, 'JPEG', 12, 8, 40, 15);
        var logoSMPD='data:image/jpeg;base64,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';
        doc.addImage(logoSMPD, 'JPEG', 161, 8, 30, 15);
        var logoLaPaz='data:image/jpeg;base64,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';
        doc.addImage(logoLaPaz, 'JPEG', 191, 8, 15, 14);
        doc.text(55, y, 'FORMULARIO DE SOLICITUD DE ACTUALIZACIÓN'); y+=5;
        doc.text(75, y, 'DE CERTIFICADO CATASTRAL');y+=10;
        //----------------
        doc.setDrawColor(0,0,0);
        doc.setFontStyle('bold');doc.setFontSize(8);
        x=12;
        doc.text(x, y, 'CÓDIGO DE SOLICITUD:');doc.setFontStyle('normal');
        x1=x+35; y1=y-4;
        doc.text(x1, y, $scope.codSolicitud+' / '+$scope.registro.gestion);
        x=145;doc.setFontStyle('bold');
        doc.text(x, y, 'CÓDIGO CATASTRAL:');doc.setFontStyle('normal');
        x1=x+33;y1=y-4;
        doc.text(x1, y, $scope.codCat);
        doc.line(11, y+4, 207, y+4);
        y+=15;
        x1=15;y1=y-5;
        doc.setFontSize(8);y+=2;
        doc.setFontStyle('bold');
        if($scope.flagActVarios.propietario || $scope.registro.superficies>0 || $scope.registro.numInmueble>0 )
        {
            doc.text(x1+3, y, 'ACTUALIZACIÓN DE DATOS LEGALES');y+=5;
        }
        doc.setFontStyle('normal');
        if($scope.flagActVarios.propietario)
        {
            doc.text(x1+3, y,'* '+setActTipo(1));y+=5;
        }
        if($scope.registro.matricula.length  || $scope.registro.testimonio.length || $scope.registro.numInmueble.length || $scope.registro.superficies != 0)
        {
            doc.text(x1+3, y,'* '+setActTipo(2));y+=5;
        }
        doc.setFontStyle('bold');
        if($scope.registro.numPuerta.length>0 || $scope.flagActVarios.materialVia || $scope.flagActVarios.ordenVia || $scope.obs)
        {
            doc.text(x1+3, y, 'ACTUALIZACIÓN DE DATOS TECNICOS');y+=5;
        }
        doc.setFontStyle('normal');
        if($scope.registro.numPuerta.length>0)
        {
            doc.text(x1+3, y,'* '+setActTipo(3));y+=5;
        }
        if($scope.obs)
        {
            doc.text(x1+3, y,'* '+setActTipo(4));y+=5;
        }
        if($scope.flagActVarios.ordenVia)
        {
            doc.text(x1+3, y,'* '+setActTipo(6));y+=5;
        }
        if($scope.flagActVarios.materialVia)
        {
            doc.text(x1+3, y,'* '+setActTipo(7));y+=5;
        }
        if($scope.checks.valor)
        {
            doc.setFontStyle('bold');
            doc.text(x1+3, y, 'ACTUALIZACIÓN DE VALORACIÓN');y+=5;
            doc.setFontStyle('normal');
            doc.text(x1+3, y,'* '+setActTipo(5));y+=5;
        }
        y2=y+3;c1=y2;doc.setLineWidth(anchoB);
        y=y1;
        doc.setFontSize(8);
        doc.setFontStyle('bold');
        x1=90;
        doc.setFontStyle('normal');
        doc.setFontSize(7);
        if($scope.requisitos.length>0) 
        {
            for (i = 0; i < $scope.requisitos.length; i++) 
            {
                var k = i + 1;
                if ($scope.requisitos[i].DocumentoRequerido.length > 100) 
                {
                    var cadena2 = $scope.requisitos[i].DocumentoRequerido.substring(85, $scope.requisitos[i].DocumentoRequerido.length);
                    var cadenas = splitOnce(cadena2, " ");
                    y += 5;
                    doc.text(x1 + 2, y, k + '. ' + $scope.requisitos[i].DocumentoRequerido.substring(0, 85) + cadenas[0]);
                    y += 5;
                    doc.text(x1 + 3, y, ' ' + cadenas[1]);

                }
                else 
                {
                    y += 5;
                    doc.text(x1 + 2, y, k + '. ' + $scope.requisitos[i].DocumentoRequerido);
                }
            }
        }
        y2=y+3;c2=y2;
        colorBorde();
        if(c1>c2)
        {
            y=c1;
        }
        else
        {
            y=c2;
        }
        doc.rect(12,y1,74,y-y1);
        doc.rect(90,y1,116,y-y1);
        doc.setDrawColor(0);doc.setFontSize(8);
        doc.setFillColor(255,255,255);
        doc.rect(14,y1-3,42, 6, 'F');doc.setFontStyle('bold');
        doc.text(16, y1+1, 'TIPOS DE ACTUALIZACIÓN');
        doc.setDrawColor(0);
        doc.setFillColor(255,255,255);
        doc.setFontSize(8);
        doc.rect(x1+2,y1-3,45, 6, 'F');doc.setFontStyle('bold');
        doc.text(x1+4, y1+1, 'REQUISITOS A PRESENTAR');
        y+=10;
        f1=y;
        
        if($scope.flagActVarios.propietario || $scope.registro.matricula.length  || $scope.registro.testimonio.length || $scope.registro.numInmueble.length || $scope.registro.superficies != 0)
        {
            x=10;
            doc.setFontSize(8);
            y1=y-5;y+=3; var yHead=y1;
            if($scope.flagActVarios.propietario)
            {
                doc.text(x+5, y, 'DATOS DE(LOS) PROPIETARIO(S) Y/O APODERADO(S)');
                doc.setDrawColor(200,200,200);doc.setLineWidth(0.2);y+=5;
                doc.setFontSize(7);y1=5;
                x=13;x1=6;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'No.');
                x+=x1;x1=18;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'PMC');
                x+=x1;x1=48;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'NOMBRE COMPLETO');
                x+=x1;x1=25;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'NUMERO DOC.');
                x+=x1;x1=18;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'TIPO DOC.');
                x+=x1;x1=7;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, '%');
                x+=x1;x1=20;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'FECHA NAC.');
                x+=x1;x1=49;doc.rect(x,y,x1,y1);doc.text(x+1, y+3, 'DIRECCIÓN');
                //---------------------------------
                doc.setFontStyle('normal');
                doc.setFontSize(7);
                y+=y1;
                if($scope.users.length>0) 
                {
                    for (i = 0; i < $scope.users.length; i++) 
                    {
                        y1 = 5;
                        x = 13;
                        var nombre = $scope.users[i].nombres + ' ' + $scope.users[i].ap + ' ' + $scope.users[i].am;//si el nombre de empresa va en el campo ap, llevar ap al inicio de cadena;
                        var tDocu = $scope.showTipoDoc($scope.users[i]);
                        var dir = $scope.users[i].dir;
                        var nombreC = textoJusto(nombre, 29);
                        var tipoDocC = textoJusto(tDocu, 10);
                        var dirC = textoJusto(dir, 31);
                        var filas = Math.max(nombreC.length, tipoDocC.length, dirC.length);
                        y1 = y1 + (filas - 1) * 3;
                        j = i + 1;
                        x1 = 6;
                        doc.rect(x, y, x1, y1);
                        doc.text(x + 1, y + 3, '' + j);
                        x += x1;
                        x1 = 18;
                        doc.rect(x, y, x1, y1);
                        doc.text(x + 1, y + 3, $scope.users[i].pmc + ' ');
                        x += x1;
                        x1 = 48;
                        doc.rect(x, y, x1, y1);
                        var yFila = y;
                        for (k = 0; k < nombreC.length; k++) 
                        {
                            doc.text(x + 1, yFila + 3, '' + nombreC[k]);
                            yFila += 3;
                        }
                        x += x1;
                        x1 = 25;
                        doc.rect(x, y, x1, y1);
                        doc.text(x + 1, y + 3, $scope.users[i].ci + ' ');
                        x += x1;
                        x1 = 18;
                        doc.rect(x, y, x1, y1);
                        var yFila = y;
                        for (k = 0; k < tipoDocC.length; k++) 
                        {
                            doc.text(x + 1, yFila + 3, '' + tipoDocC[k]);
                            yFila += 3;
                        }

                        x += x1;
                        x1 = 7;
                        doc.rect(x, y, x1, y1);
                        doc.text(x + 1, y + 3, $scope.users[i].porc + ' ');
                        x += x1;
                        x1 = 20;
                        doc.rect(x, y, x1, y1);
                        var fecha = $scope.users[i].fechaNac;
                        doc.text(x + 1, y + 3, fecha + ' ');
                        x += x1;
                        x1 = 49;
                        doc.rect(x, y, x1, y1);
                        yFila = y;
                        for (k = 0; k < dirC.length; k++) 
                        {
                            doc.text(x + 1, yFila + 3, '' + dirC[k]);
                            yFila += 3;
                        }
                        y += y1;
                        if(y >= 235) 
                        {
                            doc.setDrawColor(0, 0, 0);
                            y += 5;
                            doc.rect(10, f1 - 5, xmax, y - f1 + 5);
                            //--------------------
                            doc.addPage();
                            y = 20;
                            f1 = y;
                            desborde = 1;
                            doc.setDrawColor(200, 200, 200);
                        }
                    }
                }
                y+=5;            
            }
            if($scope.registro.matricula.length  || $scope.registro.testimonio.length || $scope.registro.numInmueble.length || $scope.registro.superficies != 0)
            {
                x=15;
                doc.setDrawColor(0,0,0);
                doc.setFontStyle('bold');doc.setFontSize(8);
                doc.text(x, y, 'REGISTRO DE LA PROPIEDAD EN DERECHOS REALES');
                y+=6;doc.setFontStyle('bold');
                //--------
                // cordenadas
                // 
                $scope.coord=[{xa:15},{xa:115},{xa:15},{xa:115}];
                var i=0;
                if($scope.registro.superficies != 0){
                    doc.setFontStyle('bold');
                    doc.text($scope.coord[i].xa, y,'Nueva Sup. Legal:');
                    doc.setFontStyle('normal');
                    doc.text($scope.coord[i].xa+35, y, $scope.registro.superficies+'');
                    i+=1;
                    //x1=x+40;y1=y-3; doc.rect(x1,y1,40,5)
                }
                if($scope.registro.matricula.length){
                    doc.setFontStyle('bold');
                    doc.text($scope.coord[i].xa, y,'Folio Real / Matricula:');
                    doc.setFontStyle('normal');
                    doc.text($scope.coord[i].xa+35, y, $scope.registro.matricula);
                    //x1=x+40;y1=y-3;
                     i+=1;
                }
                var salto=0;
                if(i>1){y+=6;salto=1;}
                if($scope.registro.numInmueble.length){
                    doc.setFontStyle('bold');
                    // doc.rect(x1,y1,40,5);x1=x+40;y1=y-3;
                    doc.text($scope.coord[i].xa, y, 'Número Inmueble:');
                    doc.setFontStyle('normal');
                    doc.text($scope.coord[i].xa+35, y, $scope.registro.numInmueble);
                    i+=1;
                }
                if(i>1 && salto == 0){y+=6;}
                if($scope.registro.testimonio.length){
                    doc.setFontStyle('bold');
                    // doc.rect(x1,y1,40,5);
                    doc.text($scope.coord[i].xa, y, 'Número Testimonio:');
                    doc.setFontStyle('normal');
                    doc.text($scope.coord[i].xa+35, y, $scope.registro.testimonio);
                    // x1=x+40;y1=y-3;doc.rect(x1,y1,40,5);
                    i+=1;
                }
                y+=10;
            }
            doc.setLineWidth(anchoB);
            var yfin=y-f1;
            colorBorde();
            doc.rect(12,f1-5,xmax,y-f1);
            x1=13;
            doc.setDrawColor(0);
            doc.setFillColor(255,255,255);doc.setFontSize(8);
            doc.rect(x1,yHead-3,58, 6, 'F');doc.setFontStyle('bold');
            doc.text(x1+2, yHead+1, 'ACTUALIZACIÓN DE DATOS LEGALES');
            y+=5;
        }
    
        if(y>219)
        {
            doc.addPage();
            y=20;
        }
        
        if($scope.registro.numPuerta!="" || $scope.flagActVarios.materialVia || $scope.flagActVarios.ordenVia )
        {
            x=15;
            f1=y;y1=y;
            y1=y-3;y+=3;
            doc.setFontSize(8);
            if($scope.registro.numPuerta!="")
            {
                doc.setFontStyle('bold');
                doc.text(x, y, 'Número de puerta:');
                doc.setFontStyle('normal');
                doc.setLineWidth(0.2);
                doc.text(x1+30, y, $scope.registro.numPuerta);
                y+=5;
            }
            if($scope.flagActVarios.materialVia || $scope.flagActVarios.ordenVia)
            {
                doc.setFontStyle('bold');
                doc.text(x, y, 'ORDEN DE VÍA');
                doc.setDrawColor(200,200,200);doc.setFontSize(7);
                y3=5;y+=5;
                x=14;x1=65;doc.rect(x,y,x1,y3);doc.text(x+1, y+3, 'CALLE ASOCIADA');
                x+=x1;x1=35;doc.rect(x,y,x1,y3);doc.text(x+1, y+3, 'MATERIAL DE LA VÍA');
                x+=x1;x1=35;doc.rect(x,y,x1,y3);doc.text(x+1, y+3, 'VÍA PRINCIPAL');
                doc.setFontStyle('normal');
                for(i=0;i<$scope.vias.length;i++)
                {
                    y+=y3;
                    x=14;x1=65;doc.rect(x,y,x1,y3);doc.text(x+1, y+3, $scope.vias[i].nombreVia);
                    x+=x1;x1=35;doc.rect(x,y,x1,y3);doc.text(x+1, y+3, $scope.showMaterial1($scope.vias[i].idMatCalle));
                    x+=x1;x1=35;doc.rect(x,y,x1,y3);
                    if($scope.vias[i].viaPrincipal==1)
                    {
                        var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                        doc.addImage(check, 'JPEG', x+5, y+1, 4, 3);
                    }
                }
                doc.setFontStyle('normal');
                y+=10;
            }
            x=15;
            $scope.calles="";
            for(i=0;i<$scope.vias1.length;i++)
            {
                if($scope.registro.numPuerta.length && i==0)
                {
                    $scope.calles+=$scope.vias1[i].nombreVia+' # '+$scope.registro.numPuerta+', ';
                }
                else
                {
                    $scope.calles+=$scope.vias1[i].nombreVia+', ';
                }
            }
            $scope.calles=$scope.calles.substring(0,$scope.calles.length-2);
            doc.setFontStyle('bold');
            doc.text(x, y, "Ubicación del predio:"); doc.setFontStyle('normal');
            doc.text(x+32, y, $scope.calles);y+=10;
            doc.setLineWidth(anchoB);
            colorBorde();
            doc.rect(12,f1-5,xmax,y-f1);
            doc.setDrawColor(0);
            x1=13;
            doc.setFillColor(255,255,255);doc.setFontSize(8);
            doc.rect(x1,y1-5,60, 6, 'F');doc.setFontStyle('bold');
            doc.text(x1+2, y1-1, 'ACTUALIZACIÓN DE DATOS TÉCNICOS');
            y+=5;
        }

        if(y>=225)
        {
            doc.addPage();
            pieDePagina();
            y=20;
        }
        y1=y-3;
        
        if($scope.checks.zona==true || $scope.checks.suelo==true || $scope.checks.area==true || $scope.checks.predioADM==true || $scope.checks.predioPatr==true || $scope.checks.plazo==true)
        {
            x=15;
            f1=y;
            doc.setFontStyle('bold');doc.setFontSize(8);
            doc.text(x, y, 'Descripción');x+=60;
            doc.text(x, y, 'Actualización');x+=40;
            doc.setFontStyle('normal');
            y+=5;
            x=15;j=1;
            
            if($scope.checks.zona)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[0].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            if($scope.checks.suelo)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[1].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            if($scope.checks.area)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[2].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            if($scope.checks.predioADM)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[3].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            if($scope.checks.predioPatr)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[4].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            if($scope.checks.plazo)
            {
                doc.text(x,y,j+'. '+$scope.listaObs[5].Descripcion);
                var check='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAqAC0DASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMHCAYFAf/EAC4QAAEDAwMCBAQHAAAAAAAAAAECAwQABQYHESExUQgSIkETUnGBFBUyQ3KCkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDVNKUoFKGqV121mawsfkOOJTOyqQAlKEjziN5uElQHVZO2yPoTxsCHYaiaj2rDVR4IbdueQTCEQ7VF9Tzyj0J+VO/ufsDXr4azkIgOSsrkR1T5KgsQ4yQGoaduG0q6rPuVE8noAK4HQzTJ7HUO5Rly1zszuQLj7z6vOqMlX7YPzbdSP4jgc3COBQN6VS2qd8y/TK5PZPbCu+4m+4FTrfIV64SzsPM0vYlLZPsdwCexG0c7xE4gcDl3q3Pld1bSEt2p8eR4uq6A+xSOpUCeB3IFBP4htXWcBtBttocS5k0xvdpPBEZB4+Kod/lB6nnoOeE8LWmj0yQdQcqC35b61OQEv+pSif1SFE9STuB9z2qo9LcZueseqbki+POPsFz8Zc3zx6N+EDtvwkAdBv2re0SO1EjNR4zaWmGkJbbbQNkoSBsAB2AoJgNq+0pQQS4zMyK7HlNIeYdSUONuJCkrSRsQQeoIrC3iD0jfwG8m4WltbuNTHNmVDdRjLPPwlH/fKfccdRW8K8+9xI023uMTI7MhklKi26gLSSFAg7HjggGgr7w8YEnBtP4yJLQTd7gBKmEjZSSR6W/6g7fUmrRoKUClKUH/2Q==';
                doc.addImage(check, 'JPEG', x+65, y-4, 4, 4);
                j+=1;y+=5;
            }
            
            var ymax=y;
            x=12;x1=x;
            y+=10;
            doc.setLineWidth(anchoB);
            colorBorde();
            doc.rect(x,f1-5,xmax,ymax-f1+7);
            doc.setDrawColor(0);
            doc.setFillColor(255,255,255);doc.setFontSize(8);
            doc.rect(x1+1,y1-5,50, 6, 'F');doc.setFontStyle('bold');
            doc.text(x1+3, y1-1, 'OBSERVACIONES TÉCNICAS');
        }
        
        if(y>=185)
        {
            doc.addPage();
            y=20;
            pieDePagina();
        }
        x=100;y+=38;doc.setFontSize(8);
        
        if($scope.users.length>0)
        {
            var prop = $scope.users[0].nombres + ' ' + $scope.users[0].ap + ' ' + $scope.users[0].am;
            var nDoc = 'Nro. Doc.: ' + $scope.users[0].ci;
            var size=prop.length;var sizeDoc=nDoc.length;
            var tam=Math.max(size,sizeDoc);
            doc.setDrawColor(0,0,0);
            doc.line(105-tam, y-5, 105+tam, y-5);
            doc.text(108-size, y, prop);y+=5;
            doc.text(109-sizeDoc, y, nDoc);y+=5;
        }
    
        y+=5;x=20;doc.setFontStyle('normal');
        doc.text(x, y, 'JURO / DECLARO RESPONSABLEMENTE:');
        y+=3;
        y+=3;
        doc.text(x, y, '1º Que los datos consignados en la declaración jurada, se encuentran plasmados en documentación original bajo mi custodia, ejerciendo');y+=3;
        doc.text(x, y, '   mi legitimo título como propietario/poseedor/apoderado, haciéndome responsable de las modificaciones por la actualización a realizarse');y+=3;
        doc.text(x, y, '   mediante la presente solicitud al Gobierno Autónomo Municipal de La Paz.');y+=3;
        doc.text(x, y, '2º Que el bien inmueble no ha sufrido mutación alguna en la superficie técnica u otro tipo de modificaciones que afecte lo descrito en el');y+=3;
        doc.text(x, y, '   CRC vigente.');y+=3;
        doc.text(x, y, '3º En caso que la información proporcionada resulte falsa, me someto a la instancia legal competente constituyéndose lo declarado como');y+=3;
        doc.text(x, y, '   CONFESIÓN EXTRA JUDICIAL, con los efectos legales correspondientes.');
        y+=3;
        y+=3;
        doc.text(x, y, ' OFICINAS DE ATENCIÓN:');y+=3;
        y+=3;
        var f = 0;
    
        for(i=0;i<$scope.sucursales.length;i++)
        {
            f=f+1;
            if(f>3)
            {
                doc.text(x + 10, y, '- ' + $scope.sucursales[i].Descripcion + ', ' + $scope.sucursales[i].direccion);
                y += 5;
            }
        }
        //doc.output('dataurlnewwindow'); 
        doc.save('Formulario de Solicitud.pdf');
    }
    // ******generacion de pdf fin****************
}