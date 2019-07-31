app.controller('regMedicoController', function ($scope) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    $scope.antecedentes = [ //<--- Adding the data
            {id:1,ant:'Alergias o medicamentos',det:'Penicilina'},
            {id:2,ant:'Problemas respiratorios',det:'asma'},
            {id:3,ant:'Problemas congenitos',det:'malformaciones'}
        ];
    $scope.antecedentesFamiliares = [ //<--- Adding the data
            {id:1,ante:'Diabetes'},
            {id:2,ante:'Cirrocis'},
            {id:3,ante:'Cancer'}
        ];
    $scope.checkboxes = { 'checked': true, items: {} };
    $scope.checkboxesi = { 'checked': true, items: {} };
    
    
});
