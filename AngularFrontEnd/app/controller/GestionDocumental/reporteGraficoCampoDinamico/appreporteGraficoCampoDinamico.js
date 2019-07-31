app.controller('reporteGraficoCampoDinamicoController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar   

    // **************DECLARACION DE VARIABLE GLOBALES *******
    var mapaObjectFinal = new Array();
    var data=new Array();   
    var mapaObject=new Array();   
    var data2=new Array();
    $scope.cargarInformacionvista12 = true;
    $scope.cargarInformacion = true;
 
     /************s1**********/
     $scope.getDocumento = function(){        
       var resRoles = new reglasnegocio();
       resRoles.identificador = 'RCCIUDADANO_92';
       resRoles.parametros = '{}';
       resRoles.llamarregla(function(response){
       var obj = JSON.parse(response);
       });
        obj.success(function (response) {
            $scope.obtDatos = response;            
            $.unblockUI();            
        });     
    };   
    //****************************tipo de documentacion *************
    /*********s2********/
    $scope.tiposDocumentacion = function(){
       // $.blockUI();
        var resDocumentacion = new reglasnegocio();
        resDocumentacion.identificador = 'RCCIUDADANO_76';
        resDocumentacion.parametros = '{}';
        resDocumentacion.llamarregla(function(response){ 
            var obj = JSON.parse(response);
            obj.success(function (response) { 
                $scope.datadocumentaciones = response;
            })    
            //$.unblockUI();              
        }); 
    };
    /*********s3*************/
    $scope.tiposCampos = function(vidtipodocumento){  
        var restipoCampo = new reglasnegocio();
        restipoCampo.identificador = 'RCCIUDADANO_105';
        restipoCampo.parametros = '{"idtipodocumentacion":"'+ vidtipodocumento +'"}';
        restipoCampo.llamarregla(function(response){ 
            response = JSON.parse(response);       
            $scope.datatipocampos = response;      
        });
    };
 /****************/
    //***************** BUSQUEDA POR DOMINIO Y CAMPO ****************************
    /********s4**********/
    $scope.tiposCamposPorDominio = function(vidtipodocumento){
         var restipoCampoPdominio = new reglasnegocio();
         restipoCampoPdominio.identificador = 'RCCIUDADANO_106';
         restipoCampoPdominio.parametros = '{"idtipodocumentacion":"'+ vidtipodocumento +'"}';
         restipoCampoPdominio.llamarregla(function(response){
         response = JSON.parse(response);
            $scope.datatipocamposPorDominio = response;      
        }); 
    };
    /****************/

    $scope.datosElaboracion = function(vidtipodocumento){
        //$.blockUI();        
        /**********s5**********/
        var resdatos = new reglasnegocio();
        resdatos.identificador = 'RCCIUDADANO_107';
        resdatos.parametros ='{"idtipodocumentacion":"'+ vidtipodocumento +'"}';
        mapaObjectFinal = [];        
        data=[];
        data2=[];        
        i=0;         
        c=0;  
        resdatos.llamarregla(function(response){
        response = JSON.parse(response);
        /***********************/
            //$.unblockUI();
            var sdatos=''; 
            var aRes = new Array(); 
            $scope.datadatos = response;
            if( $scope.datadatos.length>0){
               $scope.cargarInformacionvista12 = null;
               $scope.cargarInformacion = null;
                while (i<$scope.datadatos.length){
                    var aporte = {};             
                    var j=0;
                    sdatos = $scope.datadatos[i].vdoc_datos;
                    var obj = JSON.parse(sdatos); 
                    var objs = eval("("+obj+")");       
                    $scope.datos2 = objs ;
                    var f=0;
                    var x = 0;
                  
                    while(j<$scope.datos2.length){
                        if($scope.campo == $scope.datos2[j].clave){
                            x = x+1;
                            aRes.push($scope.datos2[j].valor);                       
                        }
                        j=j+1;
                       
                    }                           
                    i=i+1;
                }                
                kkk=0;                
                p=0;
                var uu = new Array(); 
                for (var u = 0; u <aRes.length; u++) {
                    uu[p]=aRes[u];  
                    p++;                                         
                };

                var aResultadoduplicados = new Array(); 
                var aResultadoduplicados3 = new Array(); 
                var ress = new Array(); 
                aResultadoduplicados = aRes;
                h=0;
                n = 0; aRes.sort();
                contt=0;
                while(n < aRes.length)
                    {
                        aRes[n+1] == aRes[n] ?
                         aRes.splice(n,1)  : n++ 
                        
                     }                     
                     aResultadoduplicados3 = aRes;                    
                     for (var kkg = 0; kkg <aResultadoduplicados3.length; kkg++) {
                            varloress =   calculaPrecioTotal(aResultadoduplicados3[kkg],uu);                              
                            ress[h]=varloress;
                            h=h+1;
                    };                  
                    var aporte = {};
                    for (var kkg = 0; kkg <aRes.length; kkg++) {
                        var aporte = {};
                            aporte['valor'] =  aRes[kkg];                          
                            aporte['total'] =  ress[kkg];                               
                            data[c]=aporte; 
                            c++;                          
                    };
                    $scope.datavalores=data;
                    for (var m =0; m<$scope.datavalores.length; m++) {
                        mapaObject = new Object();
                        mapaObject.name = data[m].valor; 
                        mapaObject.y = data[m].total;
                        mapaObjectFinal[m] = mapaObject;                        
                    };
                     $scope.graficarTorta();                    
           
            } else 
            {
                $scope.cargarInformacionvista12 = true;
                $scope.cargarInformacion = true;
            }                
        })
        obj.error(function(error) {
            sweet.show('', 'No tiene registros', 'error');           
        }); 
    };

    function calculaPrecioTotal(valor, vectora) {
        var cont=0;
        for (var kk = 0; kk <vectora.length; kk++) {
            if(valor == vectora[kk] ){
                cont=cont+1;                
            }                        
        };
        return cont;
    }

     $scope.graficarTorta = function () {       
    // Create the chart  
        
        $('#container').highcharts({
            chart: {
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: 'Documentos Elaborados de '+ $scope.valortipo
            },
            subtitle: {
                text: 'De acuedo a ' + $scope.campo + ':'
            },
            xAxis: {
                categories: [null, null, null, null, null, null, null,null, null, null] //mapaObjectFinal[name] //Highcharts.getOptions().lang.shortMonths // 
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            
            /*legend: { enabled: false },*/
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            /*tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> en total<br/>'
            },*/
            series: [{
                name: $scope.campo,
                colorByPoint: true,
                data: mapaObjectFinal
            }]
        });


       /* $('#container').highcharts({
        chart: {
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'Documentos Elaborados de '+ $scope.valortipo
        },
        subtitle: {
            text: 'De acuedo a ' + $scope.campo + ':'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: [null, null, null, null, null, null, null,null, null, null] //mapaObjectFinal[name] //Highcharts.getOptions().lang.shortMonths // 
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: $scope.campo,
            data: mapaObjectFinal//[2, 3, null, 4, 0, 5, 1, 4, 6, 3]
        }]
    });*/
    };


    $scope.buscarcampos = function(data){
        $scope.campo=data.vdoct_titulo;
        $scope.datosElaboracion(data.vtps_doc_id);
        $scope.tiposCamposPorDominio(data.vtps_doc_id);
        var porId=document.getElementById("vtps_doc_id").options.selectedIndex;
        $scope.valortipo=document.getElementById("vtps_doc_id").options[porId].text
    }
    
  //********************************************************   

  
    
    $scope.limpiar = function(){   
        $scope.datostipoDocumento = '';  
        $scope.cargarInformacionvista12 = true;
        $scope.cargarInformacion = true;     
    }; 
    $scope.$on('api:ready',function(){
        $scope.getDocumento();       
        $scope.tiposDocumentacion();
    });
    $scope.inicioreporteDocumentos = function () {
        $scope.getDocumento(); 
        $scope.tiposDocumentacion();           
    }; 

});