//filtro para dar el formato SERCAT al codigo catastral - OK
app.filter("FormatoSercat", function(){
    return function(text) {
        if(text != null){
            if(text.length == 15)
            {
                var cc = text;
                var cc1 = cc.substring(0,3) + '-' + cc.substring(3,7) + '-' + cc.substring(7,11) + '-' + cc.substring(11,15);
                return cc1;
            }
            else
            {
                return text;
            }
        }
    }
});

app.filter("FormatoFecha", function(){
    return function(text) {
        function getFormattedDate(date) {
            var year = date.getFullYear();

            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;

            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;

            return day + '/' + month + '/' + year;
        }

        if(text != null){
            var f =  "";
            var fechaRegistro = new Date(text);
            var f = getFormattedDate(fechaRegistro);

            return f;

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

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
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
function arrayObjectIndexOf(miArray, buscarTexto, propiedad) {
    for (var i = 0, len = miArray.length; i < len; i++) {
        if (miArray[i][propiedad] === buscarTexto) return i;
    }
    return -1;
}

function CatastrogeneralController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
    //IMPORTANTE
    $scope.configParametros = {
        documentoSolicitud:{
            idTipoDocIfile : 0, //Actualizar para PRODUCCION
            acciones:{
                obtener:function () {
                    var conf = new dataSITOL();
                    conf.catObtenerParam("CatastroDocIDRegistro",function(resultado){
                        var resApi = JSON.parse(resultado);
                        //console.log("datos param--->",resApi);
                        if(resApi.success)
                        {
                            $scope.configParametros.documentoSolicitud.idTipoDocIfile = parseInt(resApi.success.dataSql[0].valorParametro);
                        }
                        else
                        {
                            swal('', 'Error al obtener datos', 'error');
                            console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
                            //$.unblockUI();
                        }
                    });
                }
            }
        },

    }

    $scope.loading = {
        blockUI: false,
        show:function () {
            $scope.loading.blockUI = true;
        },
        hide:function () {
            $scope.loading.blockUI = false;
        }
    };
    dbg = $scope;

    $scope.servicios={
        registroCatastral:{
            municipal:function () {
                sessionService.set('servicioCat',2);
                //window.location="#catastro|registro";
            },
            externo:function () {
                sessionService.set('servicioCat',3);
                //window.location="#catastro|registro";
            }
        },
        vistas:{
            datosLegales:function () {
                sessionService.set('vistaCat',1);
                //window.location="#catastro|registroAct";
            },
            datosTecnicos:function () {
                sessionService.set('vistaCat',2);
                //window.location="#catastro|registroAct";
            }
        }
    }

    //window.location="#catastro|catastro";

    $scope.inicio = function () {
        //$('html, body').animate({scrollTop:0}, 'slow');
        setTimeout(function()
        {
            try{

                //$scope.configParametros.documentoSolicitud.acciones.obtener();
                
            }catch(e)
            {
                console.log("error", e);
            }
        },500);

    }




}
