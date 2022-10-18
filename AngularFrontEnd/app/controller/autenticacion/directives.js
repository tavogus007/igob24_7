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

/* Directive */
app.directive('excelExport',
    function () {
      return {
        restrict: 'A',
        scope: {
            fileName: "@",
            data: "&exportData"
        },
        replace: true,
        template: '<button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c mb-10" ng-click="download()"><i class="fa fa-file-excel-o"></i>&nbsp; Exportar Excel </button>',
        link: function (scope, element) {
            
            scope.download = function() {

                function datenum(v, date1904) {
                    if(date1904) v+=1462;
                    var epoch = Date.parse(v);
                    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
                };
                
                function getSheet(data, opts) {
                    var ws = {};
                    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
                    for(var R = 0; R != data.length; ++R) {
                        for(var C = 0; C != data[R].length; ++C) {
                            if(range.s.r > R) range.s.r = R;
                            if(range.s.c > C) range.s.c = C;
                            if(range.e.r < R) range.e.r = R;
                            if(range.e.c < C) range.e.c = C;
                            var cell = {v: data[R][C] };
                            if(cell.v == null) continue;
                            var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
                            
                            if(typeof cell.v === 'number') cell.t = 'n';
                            else if(typeof cell.v === 'boolean') cell.t = 'b';
                            else if(cell.v instanceof Date) {
                                cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                cell.v = datenum(cell.v);
                            }
                            else cell.t = 's';
                            
                            ws[cell_ref] = cell;
                        }
                    }
                    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                    return ws;
                };
                
                function Workbook() {
                    if(!(this instanceof Workbook)) return new Workbook();
                    this.SheetNames = [];
                    this.Sheets = {};
                }
                 
                var wb = new Workbook(), ws = getSheet(scope.data());
                /* add worksheet to workbook */
                wb.SheetNames.push(scope.fileName);
                wb.Sheets[scope.fileName] = ws;
                var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), scope.fileName+'.xlsx');
                
            };
        
        }
      };
    }
 );


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
