function documentosAPKController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload) 
{
  $scope.inicioDocumentosAPK = function () 
  {
    $scope.renderApkIGOB(1);    
  }
  
  $scope.renderApkIGOB =function(valueId)
  {

    window.scrollTo(0,0);

    $.blockUI(); 
    setTimeout(function()
    {

      var d = $.getJSON( "../registro_ciudadano/documentos_Apk/data.json", function(data) 
      {
        /*
         * Mostrar todas las app
         */
        $scope.obj = data;

        angular.forEach(data, function(value, key) 
        {
          /*
           * Mostrar la app individualmente
           */
          var idApp= valueId;
          var id   = value['idApp'];

          if(id==idApp)
          {
            $scope.idApp    = value['idApp'];
            $scope.titulo   = value['titulo'];
            $scope.imagen0  = value['imagen0'];
            $scope.imagen1  = value['imagen1'];
            $scope.imagen2  = value['imagen2'];
            $scope.imagen3  = value['imagen3'];
            $scope.imagen4  = value['imagen4'];
            $scope.imagen5  = value['imagen5'];
            $scope.entidad  = value['entidad'];
            $scope.direccion=value['direccion'];
            $scope.descripcion_corta=value['descripcion_corta'];


            var p = $scope.idApp = value['idApp'];
            //console.log()

            

            $scope.objt = p;
            

            
            var information = $scope.informacion=value['informacion'];
            angular.forEach(information, function(dataValue, dataKey) 
            {
              $scope.desarrollado=dataValue['desarrollado'];
              $scope.informe=dataValue['informe'];
              $scope.ofrecido=dataValue['ofrecido'];
              $scope.actualizado=dataValue['actualizado'];
              $scope.clasificacion=dataValue['clasificacion'];
              $scope.tamanio=dataValue['tamanio'];
              $scope.version=dataValue['version'];            

            });

            $scope.fecha=value['fecha'];
            $scope.url=value['url'];
            $scope.descarga=value['descarga'];
            $scope.descargaios=value['descarga_ios'];
            $scope.descripcion_corta=value['descripcion_corta'];
            $scope.descripcion_larga=value['descripcion_larga'];
            $scope.descripcion =value['descripcion'];
            $scope.verdescargaandroid = false;
            $scope.verdescargaios = false;
            var verandroid  =   ((typeof($scope.descarga)    == 'undefined' || $scope.descarga    == null) ? '' : $scope.descarga);
            var veraios  =   ((typeof($scope.descargaios)    == 'undefined' || $scope.descargaios    == null) ? '' : $scope.descargaios);
            if(verandroid != ''){
                $scope.verdescargaandroid = true;
            }else{
                $scope.verdescargaandroid = false;
            }
            if(veraios != ''){
              $scope.verdescargaios = true;
            }else{
              $scope.verdescargaios = false;
            }
            var showChar = 100;            
            var ellipsestext = " . . . ";
            var moretext = "+ MÁS INFORMACIÓN";
            var lesstext = "- MENOS INFORMACIÓN";       
            
            var content = $scope.descripcion_larga=value['descripcion_larga'];

            if(content.length > showChar) 
            {
              var c = content.substr(0, showChar);
              var html = '<div  class="abstract" style="text-align: justify !important;">' + c + ellipsestext + '</div>' + '<div class="morecontent" style="text-align: justify !important;">' + content + '</div>' + '<a><span class="ready-btn1">' + moretext + '</span></a>';
              $('.more').html(html);
            }
               
            $('.ready-btn1').click(function() 
            {
              if($(this).hasClass('less')) 
              {
                $(this).removeClass('less');
                $(this).html(moretext);
                $('.abstract').removeClass('hidden');
              }
              else
              {
                $(this).addClass('less');
                $(this).html(lesstext);
                $('.abstract').addClass('hidden');
              }
                $(this).parent().prev().slideToggle('fast');
                $(this).prev().slideToggle('fast');
                return false;
            });
          }
        });
        $scope.$apply();
      }); 
      $.unblockUI();
    },300);
  }
}