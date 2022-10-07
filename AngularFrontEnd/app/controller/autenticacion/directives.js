app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);


////directiva de upload
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.directive('actualizacionClave', ['sessionService', function(sessionService){
    var svalidacionCiudadano = sessionService.get('USUARIO');
    return{
        restrict: 'E',
        templateUrl: '../../view/autenticacion/partials/cambioPinDP.html',
        link: function ($scope, $element, $rootScope, sessionService) {
            try {
                var consulta = new rcNaturalJuridico();
                consulta.oid = sessionStorage.getItem('IDUSUARIO');
                consulta.lst_validar_data_igob(function(results){
                    var strcDataLogin = JSON.parse(results);
                    var stcEstadoPin = ((typeof(strcDataLogin[0].dtspsl_actualizacion_pin) == 'undefined' || strcDataLogin[0].dtspsl_actualizacion_pin == null) ? '' : strcDataLogin[0].dtspsl_actualizacion_pin);            
                    if(stcEstadoPin == "RESET"){
                        setTimeout(() => {
                            $("#mdlCambioPin").modal({keyboard: false});                    
                        }, 2000);
                    }
                });                                
            } catch (error) {
                console.log("Error al editar informacion:", error);
            }
		}
    };
}]);