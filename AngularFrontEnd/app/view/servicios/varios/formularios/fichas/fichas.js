function fichasController($scope, $rootScope, $filter, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet, registroLog, ngTableParams, FileUploader, fileUpload, fileUpload1, $sce, $q) {

    $scope.macrodistritos = [];
    $scope.servicios = [];
    $scope.horarios = [];
    $scope.listaFichasAtencion = []; // Lista para almacenar las fichas de atención
    $scope.plataformaSeleccionadaReservar = null;

    $scope.plataformaIdMonitor = null; // Para el monitor
    $scope.plataformaIdMisFichas = null; // Para "Mis Fichas"
    


    $scope.OIDCIUDADANO = sessionStorage.IDSOLICITANTE; // Obtener el OID del ciudadano


    const urlFichas = CONFIG.CONEXION_IFICHAS; // URL de la API





    

    $scope.cargarMisFichas = function() {
        // Lógica para cargar las fichas del usuario
    };
    
    // Llama a la función para cargar las fichas al inicializar
    $scope.initMisFichas = function() {
        $scope.cargarMisFichas();
    };
    
    $scope.initMisFichas();

    
    // Obtener plataformas
    $scope.obtPlataformas = function () {
        $scope.getPlataforma().then(function (data) {
            $scope.macrodistritos = JSON.parse(data || []); // Asignar plataformas
        });
    };

    $scope.getPlataforma = function () {
        var def = $q.defer();
        var macrodistritos_ = new plataforma();

        macrodistritos_.plataformas(function (resultado) {
            def.resolve(resultado); // Resolviendo la promesa con el resultado
        });

        return def.promise;
    };

    //horarios API


   $scope.ObtHorarios= function(idPlataforma){
    $scope.getHorarios(idPlataforma).then(function (data) {
        var hour = JSON.parse(data);

        // Asegurarte de que el resultado sea un array
        $scope.horarios = hour.disponibles;
          // Si data es undefined o null, asigna un array vacío
      
        
    });
   }



    $scope.getHorarios = function (idPlataforma) {
        var def = $q.defer();  // Crear una promesa para manejar la llamada asíncrona
        var horariosApi = new horarioA(); 
        horariosApi.idPlataforma=idPlataforma; 
    
        horariosApi.horarios_(idPlataforma, function (resultado) {
            def.resolve(resultado);
        });
    
        return def.promise;  // Retornar la promesa
    };
    
   

    



    
    $scope.verificarFichaDia = function(idCiudadano, idPlataforma) {
       
        return $scope.getOID(idCiudadano).then(function(data) {
            var fichasUsuario = JSON.parse(data);  // Convertir el JSON en un array de objetos

            var tieneFichaHoy = fichasUsuario.some(function(ficha) {
                return ficha.id_plataforma === parseInt(idPlataforma); // Verifica solo la plataforma
            });
    
            
            return tieneFichaHoy;  // Devolver el resultado de la verificación
        })
    };
    
    
    $scope.obtenerPlataforma = function(plataforma) {
        $scope.plataformaId = plataforma;
        

        $scope.obtServicio(plataforma);
        $scope.cambiarUbicacionPorID(plataforma);
        $scope.verificarFichaDia($scope.OIDCIUDADANO, plataforma).then(function(tieneFicha) {
            if (tieneFicha) {
               
               $scope.horarios = []; // O cualquier lógica para no mostrar horarios
               $('#noPuedeSacarFichaModal').modal('show'); // Muestra el modal

          } else {
                $scope.ObtHorarios(plataforma); 
          }
         });
    
        if ($scope.hola.length > 0) {
           $scope.hola[0].horaSeleccionada = null;
        }

        $http.get(urlFichas + `plataforma/${plataforma}`)
        .then(function(response) {
            const plataformaData = response.data;
            $scope.direccionPlataforma = plataformaData.plt_direccion_plataforma;


       
        })
        
        .catch(function(error) {
            console.error("Error al obtener la dirección de la plataforma:", error);
        });
    };
    
    





    $scope.obtServicio = function (idPlataforma) {
    
        $scope.getServicio(idPlataforma).then(function (data) {
            try {
                var servicios = JSON.parse(data);
                $scope.servicios = servicios.asignados; 
    
    
                // Verificar si hay servicios disponibles para esta plataforma
                if ($scope.servicios.length === 0) {
                    $scope.mostrarHorarios = false;  
                    $scope.mensajeError = "No hay servicios disponibles para esta plataforma."; // Mostrar mensaje de error
                } else {
                    // Si hay servicios, resetear los mensajes para permitir la selección de servicio
                    $scope.mostrarHorarios = false; 
                    $scope.mensajeError = ""; 
                }
    
                
            } catch (e) {
                console.error("Error al procesar los datos de la Plataforma:", e);
                $scope.servicios = [];  // Si hay un error, se usa un array vacío
                $scope.mostrarHorarios = false;  // Ocultar horarios
                $scope.mensajeError = "ESCOJA LA PLATAFORMA Y EL SERVICIO "; // Mostrar mensaje de error
            }
    
            
        }).catch(function (error) {
            console.error("Error al obtener los servicios de la Plataforma:", error);
            $scope.mostrarHorarios = false;
            $scope.mensajeError = "Error al obtener los servicios de la plataforma."; // Mostrar mensaje de error
        });
    };
    
    // Controlador para la Selección de Servicio
    $scope.seleccionarServicio = function (idServicio) {
    
        if (!idServicio) {
            $scope.mostrarHorarios = false;
            $scope.mensajeError = "Por favor, selecciona un servicio.";  
            return;
        }
    
        $scope.getServicio(idServicio).then(function (data) {
            try {
                var servicioData = JSON.parse(data);
                $scope.horarios = servicioData.horarios; 
    
                // Verificar si hay horarios disponibles para el servicio seleccionado
                if ($scope.horarios.length === 0) {
                    $scope.mostrarHorarios = false;
                    $scope.mensajeError = "No hay horarios disponibles para este servicio."; // Mensaje si no hay horarios
                } else {
                    $scope.mostrarHorarios = true;  // Mostrar los horarios si hay
                    $scope.mensajeError = "";  // Limpiar el mensaje de error
                }
    
            } catch (e) {
                console.error("Error al manejar los datos del Servicio:", e);
                $scope.horarios = [];  // Si hay un error, se vacía el array de horarios
                $scope.mostrarHorarios = false;
                $scope.mensajeError = "Error al cargar los horarios."; // Mostrar mensaje de error
            }
        }).catch(function (error) {
            console.error("Error al obtener los horarios del servicio:", error);
            $scope.mostrarHorarios = false;
            $scope.mensajeError = "Error al obtener los horarios."; // Mostrar mensaje de error
        });
    };
    

    
    
    
    // Al seleccionar un servicio
    $scope.seleccionarServicio = function(servicio) {
        if (servicio) {
            $scope.mostrarHorarios = true; // Mostrar horarios si se selecciona un servicio
            // Aquí podrías llamar a la función que carga los horarios
        } else {
            $scope.mostrarHorarios = false; // Ocultar horarios si no hay servicio seleccionado
        }
    };
    
    
    
    
    $scope.getServicio = function (idPlataforma) {
        var def = $q.defer();  // Crear una promesa    
        var servicioInstancia = new servicio();  // Crear instancia de la clase servicio
        
        // Llamar al método servicios con el ID de la plataforma
        servicioInstancia.servicios(idPlataforma, function (resultado) {
            def.resolve(resultado);  // Resolviendo la promesa con el resultado
        });
    
        return def.promise;  // Devolver la promesa para manejar el resultado de forma asincrónica
    };


function generarHoras() {
    var horas = [];
    var horaInicio = 8;
    var minutoInicio = 0;

    // Obtener la hora y los minutos actuales
    var fechaActual = new Date();
    var horaActual = fechaActual.getHours();
    var minutosActual = fechaActual.getMinutes();

    while (horaInicio < 17) {
        var horaFormateada = horaInicio.toString().padStart(2, '0') + ':' + minutoInicio.toString().padStart(2, '0');

        // Revisar si la hora generada es posterior a la hora y minutos actuales
        var horaCompleta = horaInicio * 60 + minutoInicio; // Convertir a minutos para comparación
        var horaActualCompleta = horaActual * 60 + minutosActual;

        if (horaCompleta >= horaActualCompleta) {
            horas.push(horaFormateada); // Agregar solo las horas disponibles
        }

        // Avanzar a la siguiente media hora
        minutoInicio += 30;
        if (minutoInicio === 60) {
            minutoInicio = 0;
            horaInicio++;
        }
    }

    return horas;


    }
    
    
    $scope.btnCelda = function(semana, hora) {
        // Verificar si ya hay una hora seleccionada
        if (semana.horaSeleccionada) {
            // Almacenar la nueva hora seleccionada en una variable temporal
            $scope.nuevaHoraSeleccionada = hora; // Variable para guardar la nueva hora
    
            // Mostrar el modal de confirmación
            $('#modalConfirmacionCambio').modal('show');
            
            // Guardar la referencia a la semana para actualizar después
            $scope.semanaActual = semana;
        } else {
            // Si no hay hora seleccionada, simplemente establecer la nueva hora
            semana.horaSeleccionada = hora; 
            semana.estado = 'ocupado'; 
            
            // Mostrar el botón de guardar ficha
            $scope.hola[0].horaSeleccionada = hora; // Esto asegura que el modelo de la vista se actualiza
        }
    };

    $scope.confirmarCambioHora = function() {
        // Cambiar el estado de la hora previamente seleccionada a 'disponible'
        $scope.semanaActual.estado = 'disponible'; 
        
        // Establecer la nueva hora seleccionada
        $scope.semanaActual.horaSeleccionada = $scope.nuevaHoraSeleccionada; 
        $scope.semanaActual.estado = 'ocupado'; 
    
        // Mostrar el botón de guardar ficha
        $scope.hola[0].horaSeleccionada = $scope.nuevaHoraSeleccionada; // Esto asegura que el modelo de la vista se actualiza
    
        // Cerrar el modal
        $('#modalConfirmacionCambio').modal('hide');
    };
    
    
    
    
    
    
    
    $scope.seleccionar = function(semana, hora) {
        
        semana.horaSeleccionada = hora;
        semana.estado = 'ocupado'; 
        alert('Se ha marcado la celda del día ' + semana.dia + ' y hora ' + hora + ' como ocupada.');
    };
    
    $scope.hola = []; 
    
    var diasSemana = [
        { id: 1, dia: 'Lunes', horaSeleccionada: null },
        { id: 2, dia: 'Martes', horaSeleccionada: null },
        { id: 3, dia: 'Miércoles', horaSeleccionada: null },
        { id: 4, dia: 'Jueves', horaSeleccionada: null },
        { id: 5, dia: 'Viernes', horaSeleccionada: null },
        { id: 6, dia: 'Sábado', horaSeleccionada: null },
        { id: 7, dia: 'Domingo', horaSeleccionada: null }
    ];
    
    var fechaActual = new Date();
    var diaActual = fechaActual.getDay(); 
    diaActual = (diaActual === 0) ? 7 : diaActual; 
    var horasAtencion = generarHoras();
    
    for (var i = 0; i < diasSemana.length; i++) {
        if (diasSemana[i].id === diaActual) {
            $scope.hola.push({
                id: diasSemana[i].id,
                dia: diasSemana[i].dia,
                horas: horasAtencion,
                diaAnterior: false, 
                estado: 'disponible',
                horaSeleccionada: null
            });
        }
    }
    
    $scope.cambiarDia = function() {
        diaActual = diaActual === 7 ? 1 : diaActual + 1;
    
        $scope.hola = [];
    
        for (var i = 0; i < diasSemana.length; i++) {
            if (diasSemana[i].id === diaActual) {
                $scope.hola.push({
                    id: diasSemana[i].id,
                    dia: diasSemana[i].dia,
                    horas: horasAtencion, 
                    diaAnterior: false, 
                    estado: 'disponible',
                    horaSeleccionada: null
                });
            }
        }
    };

    // GUARDAR DATOS DE LAS FICHAS

    
    $scope.OIDCIUDADANO =sessionStorage.IDSOLICITANTE

    $scope.misFichas = []; 



$scope.mostrarModalConfirmacion = function() {

};

// Función para confirmar y guardar la ficha cuando se presione el botón de Confirmar en el modal
$scope.confirmarGuardarFicha = function() {
    $scope.fichaData = {
        fpro_oid_solicitante: $scope.OIDCIUDADANO,
        fpro_serv_id: parseInt($scope.servc),
        fpro_plat_id: parseInt($scope.plataf),
        fpro_usr_registrador_id: 0,
        fpro_nro_fichas_programadas: 0,
        fpro_nro_fichas_reservadas: 0,
        fpro_hora_seleccionada: $scope.hola[0].horaSeleccionada
    };

    if (!$scope.fichaData) {
        console.error("No hay datos de ficha para guardar. Asegúrate de preparar los datos antes de confirmar.");
        return;
    }

    // Llamada POST a la API para guardar la ficha
    $http.post(urlFichas + 'ficha-programada/', $scope.fichaData)
    .then(function(response) {
        // Llamar a la función para actualizar "Mis Fichas" después de guardar
        return $scope.obtenerFichasPorOID(); // Asegúrate de tener esta función definida
    })
    .then(function() {
        // Mostrar el modal de éxito
        document.getElementById('modalExito').style.display = 'block';

        // Ocultar el modal de éxito después de 2 segundos
        setTimeout(function() {
            document.getElementById('modalExito').style.display = 'none';
        }, 3000);

        // Cerrar el modal de declaración
        $('#declaracion').modal('hide');
        
        // Limpiar las variables necesarias
        $scope.horarios = [];
        $scope.hola[0].horaSeleccionada = null; 
    })
    .catch(function(error) {
        console.error("Error al guardar la ficha:", error);
        // Manejo de errores (opcional)
    });
};


// Función para obtener las fichas del usuario
//$scope.obtenerFichasPorOID = function() {
  //  const oidUsuario = $scope.OIDCIUDADANO;
//
  //  $http.get(urlFichas + `ficha-programada/oid/${oidUsuario}`)
    //    .then(function(response) {
      //      // Actualizar el array misFichas con los datos obtenidos
        //    $scope.misFichas = response.data.map(function(ficha) {
          //      return {
            //        hora: ficha._fpro_hora_seleccionada,
              //      nombrePlataforma: ficha.sigla_plataforma, 
                //    nombreServicio: ficha.nombre_servicio, 
                  //  siglaServicio: ficha._sigla_servicio,
                    //plat_id: ficha._id_plataforma, 
                    //fecha: new Date().toLocaleDateString() // Asegúrate de formatear correctamente la fecha
                //};
            //});
        //})
        //.catch(function(error) {
          //  console.error("Error al obtener las fichas del usuario:", error);
        //});
//};



 

//LISTAR FICHAS MEDIANTE EL OID

$scope.init = function() {
    // Recuperar el OID del usuario desde el sessionStorage
    $scope.OIDCIUDADANO = sessionStorage.IDSOLICITANTE;

    // Verificar si el OID se ha asignado correctamente
    if ($scope.OIDCIUDADANO) {
        $scope.obtenerFichasPorOID();
    } 
};

$scope.obtenerFichasPorOID = function() {
    const oidUsuario = $scope.OIDCIUDADANO;

    $http.get(urlFichas+`ficha-programada/oid/${oidUsuario}`)
        .then(function(response) {
           

            // Actualizar el array misFichas con los datos obtenidos
            $scope.misFichas = response.data.map(function(ficha) {
                return {
                    hora: ficha._fpro_hora_seleccionada,
                    nombreServicio: ficha.nombre_servicio, 
                    nombrePlataforma: ficha.sigla_plataforma, 
                    siglaServicio: ficha._sigla_servicio,
                    mificha:ficha._fpro_codigo_ficha_programada,
                    plat_id: ficha.id_plataforma, 

                    fecha: new Date(),
                     
                    
                };
            });
        })
        .catch(function(error) {
            console.error("Error al obtener las fichas del usuario:", error);
        });
};
$scope.init();









//// OID USUARIO 

$scope.oidUsuario= function(idCiudadano){
    $scope.getOID(idCiudadano).then(function (data) {
        var person = JSON.parse(data);

        // Asegurarte de que el resultado sea un array
        //$scope.personas = person.disponibles;
          // Si data es undefined o null, asigna un array vacío
        
    });
   }



    $scope.getOID = function (idCiudadano) {
        var def = $q.defer();  // Crear una promesa para manejar la llamada asíncrona
        var oidapi = new obtOID(); 
        oidapi.idCiudadano=idCiudadano; 
    
        oidapi.obtOID_(idCiudadano, function (resultado) {
            def.resolve(resultado);
        });
    
        return def.promise;  // Retornar la promesa
    };
    

/////////MAPA///////////////

// Función para cambiar la ubicación según el ID de la plataforma
$scope.cambiarUbicacionPorID = function (idPlataforma) {
    if (!idPlataforma) {
      console.error("ID de la plataforma no proporcionado.");
      return;
    }
  
    // Realizar una llamada HTTP para obtener los datos de la plataforma según el ID
    $http.get(urlFichas+`plataforma/${idPlataforma}`)
      .then(function(response) {
        var plataforma = response.data;
  
        if (plataforma && plataforma.latitud && plataforma.longitud) {
          // Obtener las coordenadas desde la API
          var latLon = [parseFloat(plataforma.longitud), parseFloat(plataforma.latitud)];
  
          // Actualizar el centro del mapa a la ubicación seleccionada
          $scope.setCenterPositionMarker(latLon, 15);  // Zoom más cercano para la ubicación
          $scope.drawMarkerGPS(latLon);  // Mostrar marcador en la ubicación
        } 
      })
      .catch(function(error) {
        console.error("Error al obtener la ubicación de la plataforma desde la API:", error);
      });
  };
  
  // Definir el centro y zoom inicial del mapa
  $scope.obtMapCenter = {
    center: [-68.095184, -16.525105],  // LonLat inicial de La Paz, Bolivia
    zoom: 12
  };
  
  // Función para inicializar el mapa
  $scope.iniciarMapa = function () {
    if (!window.ol) {
      console.error('OpenLayers no está disponible.');
      return;
    }
  
    if (!$scope.obtMapCenter || !$scope.obtMapCenter.center || !$scope.obtMapCenter.zoom) {
      console.error('El centro del mapa o el zoom no están definidos correctamente.');
      return;
    }
  
    if (!$scope.obtMap) {
      $scope.obtMap = new ol.Map({
        target: 'map',  // ID del div donde se mostrará el mapa
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()  // Utiliza OpenStreetMap como capa base
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat($scope.obtMapCenter.center),  // Convierte las coordenadas LonLat a la proyección del mapa
          zoom: $scope.obtMapCenter.zoom  // Establece el nivel de zoom inicial
        })
      });
  
    }
  
    // Asegurarse de que el mapa se renderice correctamente
    setTimeout(function () {
      $scope.obtMap.updateSize();
    }, 200);
  };
  
  // Función para centrar el mapa en una posición específica y cambiar el nivel de zoom
  $scope.setCenterPositionMarker = function (latLon, zoom) {
    var view = $scope.obtMap.getView();
    view.setCenter(ol.proj.fromLonLat(latLon));  // Convertir la posición a la proyección correcta
    view.setZoom(zoom);
  };
  
  // Función para dibujar un marcador en la posición seleccionada con un diseño de pin
  $scope.drawMarkerGPS = function (latLon) {
    if ($scope.markerGPS) {
      $scope.obtMap.removeOverlay($scope.markerGPS);  // Eliminar marcador previo, si existe
    }
  
    // Crear un elemento de marcador con estilo de pin
    var elementMarkerGPS = document.createElement('div');
    elementMarkerGPS.style.width = '50px';
    elementMarkerGPS.style.height = '50px';
    elementMarkerGPS.style.backgroundImage = 'url("https://maps.google.com/mapfiles/ms/icons/red-dot.png")';  // Pin rojo de Google Maps
    elementMarkerGPS.style.backgroundSize = 'contain';
    elementMarkerGPS.style.backgroundRepeat = 'no-repeat';
    elementMarkerGPS.style.position = 'absolute';
    elementMarkerGPS.style.transform = 'translate(-50%, -50%)';  // Centrar el marcador
  
    // Crear el overlay del marcador en el mapa
    $scope.markerGPS = new ol.Overlay({
      position: ol.proj.fromLonLat(latLon),  // Convertir la posición a la proyección correcta
      positioning: 'center-center',
      element: elementMarkerGPS,
      stopEvent: false
    });
  
    // Añadir el marcador al mapa
    $scope.obtMap.addOverlay($scope.markerGPS);
  };
  
  // Inicializar el mapa al cargar la vista
  $scope.iniciarMapa();
  
  // Llamada inicial para simular la selección de una plataforma por ID (puedes cambiarlo por la selección real en tu interfaz)
  $scope.cambiarUbicacionPorID(1); 



 
  
  
  

    
    ///// pdf 
    $scope.impirmir = function(ficha) {
      
    
        if (!ficha) {
            console.error("No se recibió una ficha válida.");
            return;
        }
    
        const printContents =
            "<span style='font-family: Lucida Console;'><center>" +
            "<strong style='font-size: 12px;'>FICHA DE ATENCIÓN EN LÍNEA</strong><br><br>" +
            "<strong style='font-size: 12px;'>--------------------------------------------------</strong><br>" +
            "<strong style='font-size: 20px;'>DETALLES DEL SERVICIO</strong><br><br>" +
            "<strong style='font-size: 18px; color: #333;'>" + ficha.mificha+ "</strong><br><br>" +  // Mostrar la sigla más grande
            "<table>" +
            "<tr><td align='right'><strong style='font-size: 12px;'>PLATAFORMA : </strong></td><td align='left'><strong style='font-size: 12px;'>" +
            ficha.nombrePlataforma + "</strong></td></tr>" +
            "<tr><td align='right'><strong style='font-size: 12px;'>SERVICIO: </strong></td><td align='left'><strong style='font-size: 12px;'>" +
            ficha.nombreServicio + "</strong></td></tr>" +
            "<tr><td align='right'><strong style='font-size: 12px;'>Hora: </strong></td><td align='left'><strong style='font-size: 12px;'>" +
            ficha.hora + "</strong></td></tr>" +
            "<tr><td align='right'><strong style='font-size: 12px;'>Fecha: </strong></td><td align='left'><strong style='font-size: 12px;'>" +
            $filter('date')(ficha.fecha, 'dd/MM/yyyy') + "</strong></td></tr>" +
            "</table>" +
            "<strong style='font-size: 12px;'>--------------------------------------------------</strong><br>" +
            "<strong style='font-size: 12px;'>Se recomienda que todo usuario esté presente como mínimo 15 minutos antes de la hora reservada.</strong><br>" +
            "<strong style='font-size: 12px;'>Para más información, ingrese a www.lapaz.bo</strong><br>" +
            "</center></span>" +
            "<center><span><strong style='font-size: 12px;'>GRACIAS</strong></span></center>";
    
        const popupWin = window.open("", "_blank", "width=400,height=400");
        if (popupWin) {
            popupWin.document.open();
            popupWin.document.write('<html><head><title>Ficha de Atención</title></head><body onload="window.print()">' + printContents + "<br><br></body></html>");
        } else {
            console.error("No se pudo abrir la ventana emergente. Asegúrate de que el navegador no esté bloqueando los pop-ups.");
        }
    };
    


    //fecha en formato dd/mm/yy
    $scope.fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });

 /////MONITOR//////

const INTERVALO_ACTUALIZACION = 5000; // 5 segundos
let intervaloActualizacion;

// Obtener lista de fichas en tiempo real para el monitor
$scope.obtenerListaAtencion = function(idPlataforma) {
    if (!idPlataforma) {
        console.error("ID de la plataforma no proporcionado.");
        return;
    }

    const url = urlFichas + `ficha/plataforma/${idPlataforma}/hoy/punto_atencion/atender/pendiente/en_atencion`;

    $http.get(url)
        .then(function(response) {
            // Asumir que response.data es un array de fichas
            $scope.listaFichasAtencion = response.data.map(ficha => {
                // Marcar la ficha del usuario
                ficha.esMiFicha = (ficha._oidUsuario === $scope.OIDCIUDADANO);
                return ficha;
            });
        })
        .catch(function(error) {
            console.error("Error al obtener la lista de atención de fichas desde la API:", error);
        });
};

// Función para iniciar la actualización automática del monitor de fichas
$scope.iniciarActualizacionAutomatica = function(idPlataforma) {
    // Detener cualquier intervalo anterior
    if (intervaloActualizacion) {
        clearInterval(intervaloActualizacion);
    }

    // Llama a la función de actualización inmediatamente
    $scope.obtenerListaAtencion(idPlataforma);

    // Configura el intervalo de actualización automática
    intervaloActualizacion = setInterval(function() {
        $scope.obtenerListaAtencion(idPlataforma);
        $scope.$apply(); // Asegura que los cambios se reflejen en la vista
    }, INTERVALO_ACTUALIZACION);
};

// Detener la actualización automática cuando se salga de la vista
$scope.detenerActualizacionAutomatica = function() {
    if (intervaloActualizacion) {
        clearInterval(intervaloActualizacion);
        intervaloActualizacion = null;
    }
};

// Actualizar el monitor
$scope.actualizarMonitor = function(idPlataforma) {
    if (!idPlataforma) {
        console.error("ID de la plataforma no proporcionado.");
        return;
    }
    $scope.iniciarActualizacionAutomatica(idPlataforma);
};

// Limpiar al destruir la vista
$scope.$on('$destroy', function() {
    $scope.detenerActualizacionAutomatica();
});

// Inicializar plataformas al cargar el controlador
$scope.obtPlataformas();



// mi turno
$scope.listaMisFichasAtencion = []; // Nueva variable para "Mis Fichas"

// Cambia la función para obtener la atención de la plataforma seleccionada
$scope.obtenerAtencionPorPlataformaFichas = function(plataformaId) {
    console.log("ID de la plataforma:", plataformaId);
    if (!plataformaId) {
        console.error("ID de la plataforma no proporcionado para 'Ver Atención'.");
        return;
    }

    const url = urlFichas + `ficha/plataforma/${plataformaId}/hoy/punto_atencion/atender/pendiente/en_atencion`;
    $http.get(url)
        .then(function(response) {
            // Asigna la respuesta a la nueva variable
            $scope.listaMisFichasAtencion = response.data; 
        })
        .catch(function(error) {
            console.error("Error al obtener la lista de atención de la plataforma:", error);
        });
};





// cambiar vista 

    $scope.mostrarReservarFicha = true; //  por defecto a
    $scope.mostrarMisReservas = false;
    $scope.mostrarMonitorFicha = false; // Ocultar la vista

    $scope.btnTabReservarFicha = function() {
        $scope.mostrarReservarFicha = true; 
        $scope.mostrarMisReservas = false; 
        $scope.mostrarMonitorFicha = false;  
    };
    
    $scope.btnTabMisReservas = function() {
        $scope.mostrarReservarFicha = false; 
        $scope.mostrarMisReservas = true; 
        $scope.mostrarMonitorFicha = false;  
    };
    
    $scope.btnTabMiMonitor = function() {
        $scope.mostrarReservarFicha = false;
        $scope.mostrarMisReservas = false;
        $scope.mostrarMonitorFicha = true; 
    };
    


    



//cambiar vista modal

$scope.mostrarModal = false; 

// Función que se activa al hacer clic en "Guardar Ficha"
$scope.mostrarModalConfirmacion = function() {
    $scope.mostrarModal = true; 
};

// Cerrar el modal
$scope.cerrarModal = function() {
    $scope.mostrarModal = false; // Ocultar el modal
};




    $scope.obtenerServicio= function(servc){
      
        $scope.idserve=servc;
    }


    $scope.$on('api:ready',function(){

    });

    $scope.inicioFichas = function () {
        
        $scope.obtPlataformas();
        
    };



}