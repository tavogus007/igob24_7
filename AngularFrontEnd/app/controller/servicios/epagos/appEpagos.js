app.controller('pagosLineaController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet,$sce) {
    
    $scope.btnPagarForm     =   true;
    $scope.sDatosCompletos  =   false;
    $scope.datosCiudadano   =   [];
    $scope.master           =   {};
    var secuencialidfum     =   "";
    
	
	/**/
	
    
    $scope.generarPagoLinea = function(fum) {
        $scope.master = angular.copy(fum);
        var formData = {
            'usr_usuario'	: 'tecnico',
            'usr_clave'		:	'123456'
        };

        $.ajax({
            dataType: "json",
            //content-Type:"Application/json",
            type: "POST",
            url         : 'https://pagonline.lapaz.bo/api/logueo',
            data: formData,
            async: false,
            success: function(response) {
                console.log(response);
                dataResp = JSON.stringify(response);
                console.log("MI TOQUEIN:", dataResp);                
                $scope.obtenerFumDatos(fum.idfum,response.token);
            },
            error: function (response, status, error) {
                dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
            }
        });	
    };
    
    
    $scope.obtenerFumDatos	  = function() {
        var idfum   =   sessionService.get('IDFUM');
        var idtoken =   sessionService.get('TOKEN');
        var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';
        var headers = {};
        
        var formData = {
        'idfum'	: idfum
        };
        
        $.blockUI();

        $.ajax({
            type        : 'POST',            
            url         : 'https://pagonline.lapaz.bo/api/datosContribuyente',
            data        : formData,
            //dataType    : 'json',
            crossDomain : true,
            headers: {
                'authorization': stoquen
            },
            success     : function(data) {
                //["{\"error\":\"Proforma Pagada !!\"}"]
                var msg   =   JSON.parse(data);
                
                console.log("MESAJE DE ERROR:", msg.error);
                
                if (typeof msg.error === 'undefined') {
                    data = JSON.parse(data[0]);
                    console.log("PAGOS ONLINE: ", data);

                    var monto   =   data.AcctotalGeneral;
                    monto       =   monto.split('.');
                    var montof  =   monto[0] + monto[1];

                    $scope.datosCiudadano.purchaseAmount            = montof;
                    $scope.datosCiudadano.descriptionProducts       = data.cabecera;                    
                    $scope.datosCiudadano.reserved1                 = data.idFum;                    
                    $scope.datosCiudadano.purchaseOperationNumber   = data.secuencial;                    
                    secuencialidfum                                 = data.secuencial;

                    $scope.$apply();
                    $scope.pagarWalletEnvio($scope.datosCiudadano);
                } else {
                    sweet.show('', 'Proforma pagada !!', 'error');
                    window.location.href = "#dashboard";
                    $('#messages').addClass('alert alert-success').append('<p>' + data.message + '</p>');
                }
            },
            error: function (xhr, status, error) {
                $.unblockUI();
                alert("Error Intente de nuevo !!");
            }
        });
    };
    
    //WalletEnvio
    $scope.pagarWalletEnvio	  = function(datos) {
        console.log("DATOS CIUDADANO:", datos, " SECUENCIAL: ", secuencialidfum);
        var idfum   =   sessionService.get('IDFUM');        
        var formData = {
            'identificacion': datos.carnet_t,
            'idfum':secuencialidfum,
            'nombres':datos.shippingFirstName,
            'apellidos':datos.shippingLastName,
            'correo':datos.shippingEmail,
            'direccion':datos.shippingAddress,
            'total':datos.purchaseAmount,
            'cabecera':datos.descriptionProducts
        };
        var idtoken =   sessionService.get('TOKEN');
        var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';        
        
        $.ajax({
            type        : 'POST',            
            url         : 'https://pagonline.lapaz.bo/api/consumoWalletEnvio',
            data        : formData,
            dataType    : 'json',
            crossDomain : true,
            headers: {
                'authorization': stoquen
            },             
            success     : function(data) {
                $scope.datosCiudadano.userCommerce      = data.DatosCliente.identificacion;                
                $scope.datosCiudadano.userCodePayme      = data.ConsumoWallet.codAsoCardHolderWallet;                
                $scope.datosCiudadano.purchaseVerification   = data.DatosCliente.purchaseVerification;
                $scope.btnPagarForm     =   false;
                $scope.$apply();
                $.unblockUI(); 
                if ( ! data.success) {
                    $scope.deshabilitado    =   false;
                    console.log(data);
                } else {
                    $('#messages').addClass('alert alert-success').append('<p>' + data.message + '</p>');
                }
            },
            error: function (xhr, status, error) {
                $.unblockUI();
                alert("Error Intente de nuevo !!");
            }
        });
    };
    
    
    $scope.iniciarData = function(){        
        //VALIDACION CAMPOS OBLIGATORIOS
        var nombre      =   "";
        var paterno     =   "";
        var materno     =   "";
        var correo      =   "";
        var zona        =   "";
        var ci          =   "";
        
        nombre      =   $scope.dataCiudadano[0].dtspsl_nombres;
        paterno     =   $scope.dataCiudadano[0].dtspsl_paterno;
        materno     =   $scope.dataCiudadano[0].dtspsl_materno;        
        correo      =   $scope.dataCiudadano[0].dtspsl_correo;
        zona        =   $scope.dataCiudadano[0].dtspsl_zona_desc;
        ci          =   $scope.dataCiudadano[0].dtspsl_ci;        
        
        console.log(nombre, " * ", paterno, " * ", materno, " * ", correo, " * ", zona, " * ", ci);
        $scope.datosCiudadano.acquirerId				= "35";
        $scope.datosCiudadano.idCommerce                = "6935";
        $scope.datosCiudadano.purchaseAmount            = "";
        $scope.datosCiudadano.purchaseCurrencyCode      = "068";
        $scope.datosCiudadano.language                  = "SP";
        $scope.datosCiudadano.shippingZIP               = "33"
        $scope.datosCiudadano.shippingCity              = "La Paz";
        $scope.datosCiudadano.shippingState             = "La Paz";
        $scope.datosCiudadano.shippingCountry           = "BO";
        $scope.datosCiudadano.userCommerce              = "";        
        $scope.datosCiudadano.userCodePayme             = "";        
        $scope.datosCiudadano.descriptionProducts       = "";        
        $scope.datosCiudadano.programmingLanguage       = "PHP";
        $scope.datosCiudadano.reserved1                 = "Prueba Reservado";
        $scope.datosCiudadano.purchaseVerification      = "";     
        $scope.datosCiudadano.shippingAddress           = $scope.dataCiudadano[0].dtspsl_zona_desc;
        $scope.datosCiudadano.segundo_apellido_t        = $scope.dataCiudadano[0].dtspsl_materno;
        $scope.datosCiudadano.ci_expedido_t             = $scope.dataCiudadano[0].dtspsl_expedido;         
        
        if(nombre != 'undefined' && paterno != 'undefined' && correo != 'undefined' && ci != 'undefined' && nombre != '' && paterno != '' && correo != '' && ci != ''){
            $scope.datosCiudadano.purchaseOperationNumber   = sessionService.get('IDFUM');
            $scope.datosCiudadano.shippingFirstName         = $scope.dataCiudadano[0].dtspsl_nombres;
            $scope.datosCiudadano.shippingLastName          = $scope.dataCiudadano[0].dtspsl_paterno;
            $scope.datosCiudadano.shippingEmail             = $scope.dataCiudadano[0].dtspsl_correo;
            $scope.datosCiudadano.carnet_t                  = $scope.dataCiudadano[0].dtspsl_ci;
            $scope.sDatosCompletos  =   true;
        }else{
            $scope.sDatosCompletos  =   false;            
            sweet.show({
                title: 'Editar Información',
                text: 'Los datos personales son obligatorios, debe completar la información de su cuenta. Desea realizarlo en este instante ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'SI',
                closeOnConfirm: false
            }, function() {
                sweet.close();
                window.location.href = "#registro_ciudadano|modificarRegistro";
            });
        }
    }
        
    $scope.pagarCertificado = function(){
        sweet.show({
            title: 'Pago en linea',
            text: 'Esta seguro de realizar esta transacción ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            closeOnConfirm: false
        }, function() {
            sweet.close();
            $('[name="frmVPOS2"]').submit();
            //window.location.href = "#registro_ciudadano|servicios|index3.html";
            window.location.href = "#dashboard";
        });
    }
    
	$scope.$on('api:ready',function(){        
        var sIdCiudadano    =   sessionService.get('IDCIUDADANO');        
        var datosCiudadano  =   new rcNatural();
        datosCiudadano.oid  =   sIdCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            results = JSON.parse(resultado);
            $scope.dataCiudadano = results;
            $scope.iniciarData();            
            $scope.obtenerFumDatos();
            console.log($scope.dataCiudadano);
        });
    });       
    
    $scope.iniciarDataCiudadano = function(){
        var sIdCiudadano    =   sessionService.get('IDCIUDADANO');        
        var datosCiudadano  =   new rcNatural();
        datosCiudadano.oid  =   sIdCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            results = JSON.parse(resultado);
            $scope.dataCiudadano = results;
            $scope.iniciarData();            
            $scope.obtenerFumDatos();
            console.log($scope.dataCiudadano);
        });
    }
});