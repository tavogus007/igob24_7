function fichasController($scope, $rootScope,$filter, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog,ngTableParams,FileUploader,fileUpload, fileUpload1, $sce, $q) {

    $scope.macrodistritos = [];
    $scope.servicios = [];
    $scope.horarios=[];

    $scope.obtPlataformas = function () {
        console.log("Iniciando la obtención de plataformas...");
        $scope.getPlataforma().then(function (data) {
            // Asegurarte de que el resultado sea un array
            $scope.macrodistritos = JSON.parse(data || []);  // Si data es undefined o null, asigna un array vacío
            console.log("Datos obtenidos:", $scope.macrodistritos);
        });
    };
    
    $scope.getPlataforma = function () {
        var def = $q.defer();
        var macrodistritos_ = new plataforma();
        
        macrodistritos_.plataformas(function (resultado) {
            def.resolve(resultado);  // Resolviendo la promesa con el resultado
        });
        
        return def.promise;
    };

    //horarios API


   $scope.ObtHorarios= function(idPlataforma){
    $scope.getHorarios(idPlataforma).then(function (data) {
        console.log(data);
        var hour = JSON.parse(data);
        console.log(hour);

        // Asegurarte de que el resultado sea un array
        $scope.horarios = hour.disponibles;
          // Si data es undefined o null, asigna un array vacío
        console.log("horas obtenidos:", $scope.horarios, "OID",$scope.OIDCIUDADANO);
        
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
    
   

    



    
    // Función para obtner el id 
    $scope.obtenerPlataforma = function(plataforma) {
        console.log("Plataforma seleccionada:", plataforma);
        $scope.plataformaId=plataforma;
        $scope.obtServicio(plataforma);
        $scope.ObtHorarios(plataforma);
    };

    $scope.obtServicio = function (idPlataforma) {
        console.log("Iniciando la obtención de servicios para ID de Plataforma:", idPlataforma);
    
        $scope.getServicio(idPlataforma).then(function (data) {
            try {
                console.log("DATA recibida de la Plataforma:", data);
                var servicios = JSON.parse(data);
                $scope.servicios = servicios.asignados; 
    
                console.log("Servicios obtenidos de la Plataforma:", $scope.servicios);
    
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
        console.log("Servicio seleccionado con ID:", idServicio);
    
        if (!idServicio) {
            $scope.mostrarHorarios = false;
            $scope.mensajeError = "Por favor, selecciona un servicio.";  
            return;
        }
    
        $scope.getServicio(idServicio).then(function (data) {
            try {
                console.log("Datos del Servicio:", data);
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
    
                console.log("Horarios obtenidos del Servicio:", $scope.horarios);
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
            var confirmacion = confirm('Ya has seleccionado la hora ' + semana.horaSeleccionada + ' para el día ' + semana.dia + '. ¿Deseas cambiar a la hora ' + hora + '?');
            if (!confirmacion) {
                return; 
            }
            
            // Cambiar el estado de la hora previamente seleccionada a 'disponible'
            semana.estado = 'disponible'; 
            console.log('La hora ' + semana.horaSeleccionada + ' ha vuelto a estar disponible.');
        }
        
        // Establecer la nueva hora seleccionada y cambiar su estado
        semana.horaSeleccionada = hora; 
        semana.estado = 'ocupado'; 
    
        // Log para depuración
        console.log('Hora seleccionada: ', hora);  
        console.log('Semana: ', semana);
        
        // Mostrar el botón de guardar ficha
        $scope.hola[0].horaSeleccionada = hora; // Esto asegura que el modelo de la vista se actualiza
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

    $scope.misFichas = []; // Inicializar el array de fichas

    $scope.guardarFicha = function() {
        // Crear el objeto que se enviará a la API
        const fichaData = {
            fpro_codigo_ficha_programada: "PRUEBA ", // Aquí podrías incluir un contador si es necesario
            fpro_oid_solicitante: $scope.OIDCIUDADANO,
            fpro_serv_id: parseInt($scope.servc),
            fpro_plat_id: parseInt($scope.plataf),
            fpro_usr_registrador_id: 0,
            fpro_nro_fichas_programadas: 0,
            fpro_nro_fichas_reservadas: 0,
            fpro_hora_seleccionada: $scope.hola[0].horaSeleccionada
        };
    
        console.log("Los datos a enviar:", fichaData);
    
        // Hacer la llamada POST a la API
        $http.post('http://172.18.2.207:3095/ficha-programada/', fichaData)
        .then(function(response) {
            console.log('Ficha guardada correctamente:', response.data);
            
            // Agregar la ficha guardada al array misFichas
            $scope.misFichas.push({
                hora: $scope.hola[0].horaSeleccionada,
                nombrePlataforma: $scope.plataf,
                nombreServicio: $scope.servc, // Cambia esto si necesitas el nombre del servicio
                fecha: new Date().toLocaleDateString() // Cambia esto si necesitas otra fecha
               // Se guarda la fecha actual como objeto Date

            });
            alert('¡Guardado con éxito!');

          //  $location.path();
        })

    };
    


    
    

    //fecha en formato dd/mm/yy
    $scope.fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });

// cambiar vista 

    $scope.mostrarReservarFicha = true; //  por defecto a
    $scope.mostrarMisReservas = false; // Ocultar la vista

    $scope.btnTabReservarFicha = function() {
    $scope.mostrarReservarFicha = true; 
    $scope.mostrarMisReservas = false; 
    };

    $scope.btnTabMisReservas = function() {
    $scope.mostrarReservarFicha = false; 
    $scope.mostrarMisReservas = true; 
    };






    $scope.obtenerServicio= function(servc){
        console.log("servc", servc);
        $scope.idserve=servc;
    }


    $scope.$on('api:ready',function(){

    });

    $scope.inicioFichas = function () {
        console.log("hola mundo"); 
        $scope.obtPlataformas();
        
    };



}