function mecController(
  $scope,
  $rootScope,
  $filter,
  $routeParams,
  $location,
  $http,
  Data,
  sessionService,
  CONFIG,
  LogGuardarInfo,
  sweet,
  registroLog,
  ngTableParams,
  FileUploader,
  fileUpload,
  fileUpload1,
  $sce,
  $q,
  $timeout
) {
  // Variables de sesión
  $scope.con_central_riesgos = false;
  $scope.con_historial = false;
  $scope.hospitalesMostrar = false;
  $scope.tablaTramites = {};
  $scope.idCiudadano = sessionService.get("IDSOLICITANTE");
  $scope.nroCi = sessionService.get("CICIUDADANO");
  $scope.tipoCiudadano = sessionService.get("TIPO_PERSONA");
  $scope.nombrePersona = sessionService.get("US_NOMBRE");
  $scope.appaternoPersona = sessionService.get("US_PATERNO");
  $scope.apmaternoPersona = sessionService.get("US_MATERNO");
  $scope.email = sessionService.get("US_EMAIL");
  $scope.tramitesUsuario = [];
  $scope.dataRechazos = [];
  $scope.hospitales_vista = false;
  $scope.especialidad_vista = false;
  $scope.FormularioPago = false;
  $scope.hoja_referencia = false;
  $scope.img_hoja_referencia = false;
  $scope.lstatencionesvacias = false;
  $scope.lstatenciones = false;
  $scope.mostrarIframe = false;
  $scope.habAcepto = true;
  $scope.habSiguiente = false;
  $scope.obtDatosCiud = [];
  $scope.habPagoQR = false;
  $scope.mensaje = "";
  $scope.abrirmodal = "";
  $scope.qrcodeString = "";
  $scope.vectorMensaje = [
    "Nro. de Proforma:",
    "Nombres:",
    "Apellidos:",
    "Correo Electrónico:",
    "Ciudad:",
    "País:",
    "Especialidad:",
    "Precio (Bs):",
  ];

  // Estado general de la aplicación
  $scope.vistaActual = "inicio";
  $scope.mostrarModal = false;
  $scope.cargando = false;
  $scope.doctores = [];
  $scope.metodoPago = "";
  $scope.formData = {
    motivoConsulta: "",
    numeroReferencia: "",
  };
  $scope.ubicacion = {
    direccion: "",
    referencia: "",
    coordenadas: null,
  };
  $scope.datosConsulta = {};
  $scope.imagenes = ["imgs/mec_bg1.png", "imgs/mec_bg3.png", "imgs/mec_bg2.png"];
  $scope.currentIndex = 0;
  // Agrega esta variable al scope
  $scope.showErrors = false;

  //para el FAB
  $scope.ayudaSlideActual = 0;
  $scope.totalAyudaSlides = 6;

  //Informacion para el mapa (macrodistrito, distrito, zona)
  $scope.mostrarMacrodistritos = true;
  $scope.mostrarDistritos = false;
  $scope.mostrarZonas = false;
  $scope.mostrarRedes = false;

// Variables para controlar el QR
  $scope.mostrarModalQR = false;
  $scope.timeoutQR = null;

  // **********
  $scope.showDoctorError = false;
  $scope.showPageError = false;
  //Bandera para controlar el mapa
  let bloqueoRecursivo = false;
  let ultimaDireccionProcesada = '';
  // Variables para mapeo de hospitales
  $scope.hospitalesMapa = {}; // Almacenará nombre -> ID
  
  // Variables para almacenar las capas
  let map;
  let marker;
  let macrodistritosLayer;
  let distritosLayer;
  let zonasLayer;
  let redesLayer;



// Variable para el estado de la ficha
$scope.variableEstadoFicha = false; // Valor por defecto

  // Función para obtener los id_ciudadano desde la tabla form_amd
  function obtenerIdCiudadanos() {
    return $http.get('http://172.18.2.144:3000/form-amd')
      .then(function (response) {
        if (response.data && Array.isArray(response.data)) {
          return response.data.map(item => item.formAmdIdCiudadano);
        } else {
          console.warn("La respuesta no es un arreglo válido:", response.data);
          return [];
        }
      })
      .catch(function (error) {
        console.error("Error al obtener id_ciudadano:", error);
        return [];
      });
  }

// Función para mostrar el ID del ciudadano
// Función para mostrar el ID del ciudadano y verificar estado
function mostrarIdCiudadano() {
  $scope.idCiudadano = sessionService.get("IDSOLICITANTE");
  console.log("ID de usuario actual:", $scope.idCiudadano);

  obtenerIdCiudadanos().then(function(ids) {
    // Verificar si el ID del usuario actual está en la lista
    $scope.variableEstadoFicha = ids.includes($scope.idCiudadano);
    console.log("Estado de ficha actualizado:", $scope.variableEstadoFicha);
  });
}
// Llamar a las funciones cuando sea necesari
mostrarIdCiudadano();


$scope.limpiarDatosTemporales = function() {
  $scope.datosConsulta = {};
  $scope.formData = { motivoConsulta: "", numeroReferencia: "" };
  $scope.ubicacion = { direccion: "", referencia: "", coordenadas: null };
  $scope.metodoPago = "";
  $scope.doctorSeleccionado = null;
  $scope.showPagoError = false;
  $scope.showDoctorError = false;
  localStorage.removeItem("datosConsulta");
};

  

  $scope.mostrarQR = function() {
    $scope.mostrarModalQR = true;
    
    // Limpiar timeout anterior si existe
    if ($scope.timeoutQR) {
      $timeout.cancel($scope.timeoutQR);
    }
    
    // Ocultar automáticamente después de 5 segundos
    $scope.timeoutQR = $timeout(function() {
      $scope.mostrarModalQR = false;
    }, 5000);
  };
  
  // Función para cerrar manualmente el QR
  $scope.cerrarQR = function() {
    $scope.mostrarModalQR = false;
    if ($scope.timeoutQR) {
      $timeout.cancel($scope.timeoutQR);
    }
  };
  
  // Limpiar el timeout cuando se cambia de vista
  // En el controlador (medicoEnTuCasa2.js)
$scope.$on('$destroy', function() {
  window.onbeforeunload = function(e) {
    if (localStorage.getItem("datosConsulta")) {
      // SweetAlert falló, usaremos el confirm nativo
      if (!confirm("¿Estás seguro de salir?\nLos datos no guardados se perderán.")) {
        e.preventDefault();
        e.returnValue = ""; // Necesario para algunos navegadores
        return false;
      } else {
        $scope.limpiarDatosTemporales();
      }
    }
  };
});

// Limpia datos al cargar la página (evita datos residuales)
// $scope.limpiarDatosTemporales();

  // Añade esta función para validar el número de referencia
  $scope.isValidReference = function (reference) {
    return /^[0-9]{8}$/.test(reference);
  };

  // Agrega esto al inicio del controlador, después de las variables de sesión
  window.addEventListener('beforeunload', function(e) {
    const datosGuardados = localStorage.getItem("datosConsulta");
    
    if (datosGuardados) {
        e.preventDefault();
        sweet.show({
            title: "¿Salir?",
            text: "Los datos no guardados se perderán.",
            type: "warning",
            showCancelButton: true,
        }).then(function(result) {
            if (result.value) {
                $scope.limpiarDatosTemporales();
                window.location.reload(true);
            }
        });
    }
});

  // Modifica la función de inicialización para manejar la recarga
  $scope.$on("$locationChangeStart", function (event) {
    const datosGuardados = localStorage.getItem("datosConsulta");
    if (
      datosGuardados &&
      !confirm(
        "¿Estás seguro de salir? Se perderán todos los datos introducidos."
      )
    ) {
      event.preventDefault();
    }
  });

  // Funciones del carrusel
  $scope.nextImage = function () {
    $scope.currentIndex = ($scope.currentIndex + 1) % $scope.imagenes.length;
  };

  $scope.prevImage = function () {
    $scope.currentIndex =
      ($scope.currentIndex - 1 + $scope.imagenes.length) %
      $scope.imagenes.length;
  };

  $scope.goToImage = function (index) {
    $scope.currentIndex = index;
  };

  // Navegación entre vistas
  $scope.cambiarVista = function (vista) {
    // Si intentan navegar desde la vista inicial y ya tiene ficha, no permitirlo
    if ($scope.estado && vista !== 'inicio') {
      return; // No hacer nada
    }

    console.log("cambiando a vista: ", vista);

    $scope.vistaActual = vista;

    if (vista === "ubicacion") {
      $timeout(function () {
        $scope.inicializarMapa();
      }, 100);
    }

    if (vista === "confirmacionExitosa") {
      const datosGuardados = cargarconExpracion;
      if (datosGuardados) {
        $scope.datosConsulta = datosGuardados;
        if (!$scope.datosConsulta.formData) $scope.datosConsulta.formData = {};
    if (!$scope.datosConsulta.ubicacion) $scope.datosConsulta.ubicacion = {};
    if (!$scope.datosConsulta.doctor) $scope.datosConsulta.doctor = {};
    if (!$scope.datosConsulta.metodoPago) $scope.datosConsulta.metodoPago = {};
      }
    }

    if (vista === "listaDoctores") {
      $scope.doctorSeleccionado = $scope.datosConsulta.doctor || null;
      $scope.cargarDoctores();
    }
  };

  $scope.formularioValido = function () {
    return (
      $scope.formData.motivoConsulta &&
      $scope.formData.motivoConsulta.trim() !== "" &&
      $scope.formData.numeroReferencia &&
      $scope.isValidReference($scope.formData.numeroReferencia)
    );
  };

  // Configuración de expiración (30 minutos)
const EXPIRACION_MINUTOS = 30;

// Función para guardar con timestamp
function guardarConExpiracion(datos) {
    const datosConExpiracion = {
        datos: datos,
        timestamp: new Date().getTime()
    };
    localStorage.setItem("datosConsulta", JSON.stringify(datosConExpiracion));
}


// Función para cargar verificando expiración
function cargarConExpiracion() {
  const datosGuardados = localStorage.getItem("datosConsulta");
  if (!datosGuardados) return null;
  
  const parsedData = JSON.parse(datosGuardados);
  const ahora = new Date().getTime();
  const diferenciaMinutos = (ahora - parsedData.timestamp) / (1000 * 60);
  
  if (diferenciaMinutos > EXPIRACION_MINUTOS) {
    localStorage.removeItem("datosConsulta");
    return null;
  }
  
  // Asigna los datos al scope directamente
  $scope.datosConsulta = parsedData.datos;
  return parsedData.datos;
}





  $scope.guardarDatosPersonales = function () {
    // Activa las validaciones
    $scope.showErrors = true;

    // Verifica si el formulario es válido
    if (
      !$scope.formData.motivoConsulta ||
      !$scope.formData.numeroReferencia ||
      !$scope.isValidReference($scope.formData.numeroReferencia)
    ) {
      return; // Detiene la ejecución si hay errores
    }

    // Si todo está bien, continúa
    $scope.datosConsulta.formData = angular.copy($scope.formData);
    guardarConExpiracion($scope.datosConsulta)
    $scope.cambiarVista("ubicacion");
    $scope.showErrors = false;
  };

  // Función para cargar hospitales desde el endpoint
function cargarHospitales() {
  $http.get('http://172.18.2.144:3000/hospital-municipal')
    .then(function(response) {
      if (response.data && Array.isArray(response.data)) {
        response.data.forEach(function(hospital) {
          $scope.hospitalesMapa[hospital.hospitalNombre] = hospital.hospitalId;
        });
        console.log('Mapa de hospitales cargado:', $scope.hospitalesMapa);
      }
    })
    .catch(function(error) {
      console.error('Error al cargar hospitales:', error);
    });
}

// Llamar la función al inicializar el controlador
cargarHospitales();

  function calcularHospitalSegunRed(nombreRed, clickLatLng) {
    // Mapeo de redes a hospitales específicos
    const redAHospital = {
        "RED 2 - NOR OESTE": "Hospital Municipal La Portada",
        "RED 1 - SUR OESTE": "Hospital Municipal Cotahuma",
        "RED 3 - NORTE CENTRAL": "Hospital Municipal La Merced",
        "RED 5 - SUR": "Hospital Municipal Los Pinos"
    };

    // Si es RED 4, usar el cálculo de hospital más cercano
    if (nombreRed === "RED 4") {
        return calcularHospitalMasCercano(clickLatLng);
    }

    // Para otras redes, obtener el hospital asignado
    const hospitalAsignado = redAHospital[nombreRed];
    
    if (hospitalAsignado) {
        console.log(`El hospital asignado para ${nombreRed} es: ${hospitalAsignado}`);
        return hospitalAsignado;
    } else {
        console.log(`No hay hospital asignado para la red: ${nombreRed}`);
        return null;
    }
}

  //FUNCION PARA EL CALCULO DE LOS HOSPITALES MAS CERCANOS
  function calcularHospitalMasCercano(clickLatLng) {
    const hospitales = [
        { nombre: "Hospital Municipal La Portada", lat: -16.489365231841166, lng: -68.16571862342599 },
        { nombre: "Hospital municipal La Paz", lat: -16.496108626426576, lng: -68.14586072307415 },
        { nombre: "Hospital Municipal Cotahuma", lat: -16.515514505897233, lng: -68.13943846334942 },
        { nombre: "Hospital Municipal La Merced", lat: -16.471145061337026, lng: -68.11777155096068 },
        { nombre: "Hospital Municipal Los Pinos", lat: -16.542421315622047, lng: -68.07158994733659 } 
    ];

    // Función para calcular distancia entre dos puntos en km
    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // Calcular distancias a todos los hospitales
    let hospitalMasCercano = null;
    let distanciaMinima = Infinity;

    hospitales.forEach(hospital => {
        const distancia = calcularDistancia(
            clickLatLng.lat, clickLatLng.lng,
            hospital.lat, hospital.lng
        );
        
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            hospitalMasCercano = hospital.nombre;
        }
    });
    console.log(`El hospital más cercano es: ${hospitalMasCercano}`);
}


  $scope.inicializarMapa = function() {
    // Configuración inicial
    const plazaMurillo = [-16.4956, -68.1336];
    const zoomPorDefecto = 18;
    const zoomPrecision = 18; // Zoom cuando se obtiene ubicación precisa
    
    // Crear mapa
    const map = L.map("map").setView(plazaMurillo, zoomPorDefecto);

    // Capa base OSM
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Configuración de capas WMS con transparencia
    const capasWMS = {
        macrodistritos: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
            layers: 'lapaz:macrodistritos_2020',
            styles: 'lp_macrodistritos2019',
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            zIndex: 1
        }),
        
        distritos: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
            layers: 'lapaz:distritos_2021',
            styles: 'lp_distritos2021',
            format: 'image/png',
            transparent: true,
            version: '1.1.1',
            zIndex: 2
        }),
        
        zonas: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
            layers: 'sim:zonasSimPoa2018',
            styles: 'sim_zonas',
            format: 'image/png',
            transparent: true,
            version: '1.1.1',
            zIndex: 3
        }),
        redes: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
          layers: 'sit:sedes_redsalud',
          styles: 'sedes_redsalud',
          format: 'image/png',
          transparent: true,
          version: '1.1.1',
          zIndex: 4
      }),
        hsp: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
          layers: 'sit:sedes_redsalud',
          styles: 'sedes_redsalud',
          format: 'image/png',
          transparent: true,
          version: '1.1.1',
          zIndex: 5,
          cql_filter: 'codredsal = 2072 OR codredsal = 2073 OR codredsal = 2074 OR codredsal = 2071 OR codredsal = 2069'
      }),
      soloHsp: L.tileLayer.wms('http://192.168.5.84:8080/geoserver/wms', {
        layers: 'sit:salud',
        styles: 'sit_salud',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        zIndex: 6,
        cql_filter: "Nombre = 'Hospital Municipal Cotahuma' OR Nombre = 'Hospital Municipal La Paz' OR Nombre = 'Hospital Municipal La Portada' OR Nombre = 'Hospital Municipal La Merced' OR Nombre = 'Hospital Municipal Los Pinos'"
    })
    };

    // Control de capas
    L.control.layers(null, {
        "Macrodistritos": capasWMS.macrodistritos,
        "Distritos": capasWMS.distritos,
        "Zonas": capasWMS.zonas,
        "Redes": capasWMS.redes,
        "Redes_hospitales": capasWMS.hsp,
        "Solo hospitales": capasWMS.soloHsp
    }, { position: 'topright', collapsed: false }).addTo(map);

    // Función para obtener dirección mediante geocodificación inversa
    const obtenerDireccion = async (latlng) => {
        try {
            const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.fa4659136898b9f0bf8d25058837faa2&lat=${latlng.lat}&lon=${latlng.lng}&format=json&normalizeaddress=1`);
            
            const data = await response.json();
            
            if (data && data.address) {
                const address = data.address;
                let direccionCompleta = '';
                
                if (address.road) direccionCompleta += address.road;
                if (address.house_number) direccionCompleta += ' ' + address.house_number;
                if (address.neighbourhood && !direccionCompleta.includes(address.neighbourhood)) {
                    direccionCompleta += (direccionCompleta ? ', ' : '') + address.neighbourhood;
                }
                if (address.suburb && !direccionCompleta.includes(address.suburb)) {
                    direccionCompleta += (direccionCompleta ? ', ' : '') + address.suburb;
                }
                if (address.city && !direccionCompleta.includes(address.city)) {
                    direccionCompleta += (direccionCompleta ? ', ' : '') + address.city;
                }
                
                return direccionCompleta || 'Dirección no disponible';
            }
            return data.display_name || 'Dirección no disponible';
        } catch (error) {
            console.error('Error con LocationIQ:', error);
            return 'Dirección no disponible';
        }
    };

    // Función para geocodificar una dirección y marcar en el mapa
    $scope.geocodificarDireccion = async function(direccion) {
      try {
          const viewbox = '-69.0,-17.0,-67.0,-15.0';
          const response = await fetch(
              `https://us1.locationiq.com/v1/search?key=pk.fa4659136898b9f0bf8d25058837faa2` +
              `&q=${encodeURIComponent(direccion)}` +
              `&format=json` +
              `&limit=1` +
              `&viewbox=${viewbox}` +
              `&bounded=1` +
              `&countrycodes=bo`
          );
          
          const data = await response.json();
          
          if (data && data.length > 0) {
              const resultado = data[0];
              const latlng = {
                  lat: parseFloat(resultado.lat),
                  lng: parseFloat(resultado.lon)
              };
              
              // Actualizar marcador
              if (marcadorSeleccion) {
                  map.removeLayer(marcadorSeleccion);
              }
              
              marcadorSeleccion = L.marker(latlng, {
                  draggable: true,
                  icon: L.icon({
                      iconUrl: '/marc1.png',
                      iconSize: [32, 32],
                      iconAnchor: [16, 32]
                  })
              }).addTo(map);
              
              map.setView(latlng, zoomPrecision);
              
              // Obtener dirección completa
              const direccionCompleta = await obtenerDireccion(latlng);
              const utm = convertirWGS84aUTM(latlng.lat, latlng.lng);
              
              // Actualizar modelo sin triggerear el watcher
              bloqueoRecursivo = true;
              $scope.ubicacion.coordenadas = {
                  latitud: latlng.lat,
                  longitud: latlng.lng,
                  utm: utm
              };
              $scope.ubicacion.direccion = direccionCompleta;
              ultimaDireccionProcesada = direccionCompleta;
              $scope.$apply();
              bloqueoRecursivo = false;
              
              return true;
          }
          return false;
      } catch (error) {
          console.error('Error con geocodificación directa:', error);
          bloqueoRecursivo = false;
          return false;
      }
  };


    // Función para convertir WGS84 a UTM
    function convertirWGS84aUTM(lat, lng) {
        const zona = Math.floor((lng + 180) / 6) + 1;
        const hemisferio = lat >= 0 ? 'N' : 'S';
        
        const utmProj = `+proj=utm +zone=${zona} +${hemisferio === 'N' ? '' : '+south '}+ellps=WGS84 +datum=WGS84 +units=m +no_defs`;
        
        const puntoUTM = proj4('WGS84', utmProj, [lng, lat]);
        
        return {
            este: puntoUTM[0].toFixed(2),
            norte: puntoUTM[1].toFixed(2),
            zona: zona,
            hemisferio: hemisferio,
            codigoZona: `${zona}${hemisferio}`
        };
    }

    let marcadorSeleccion = null;

    // Función para manejar ubicación encontrada
    const onLocationFound = async (e) => {
      if (marcadorSeleccion) map.removeLayer(marcadorSeleccion);
        
        // selectionCircle = L.circle(e.latlng, {
        //     color: '#3388ff',
        //     fillColor: '#3388ff',
        //     fillOpacity: 0.2,
        //     radius: 5
        // }).addTo(map);
        
        marcadorSeleccion = L.marker(e.latlng, {
          draggable: true, // puedes mover el marcador si deseas
          icon: L.icon({
              iconUrl: '/marc1.png', // Puedes usar tu propio ícono
              iconSize: [32, 32],
              iconAnchor: [16, 32]
          })
      }).addTo(map);


        map.setView(e.latlng, zoomPrecision);
        
        // Obtener dirección
        const direccion = await obtenerDireccion(e.latlng);
        const utm = convertirWGS84aUTM(e.latlng.lat, e.latlng.lng);

        // Actualizar scope
        $scope.$apply(() => {
            $scope.ubicacion = {
                coordenadas: {
                    latitud: e.latlng.lat,
                    longitud: e.latlng.lng,
                    utm: utm
                },
                direccion: direccion
            };
        });
    };

    // Función para manejar errores de geolocalización
    const onLocationError = () => {
        map.setView(plazaMurillo, zoomPorDefecto);
    };

    // Intento automático de geolocalización
    map.locate({
        setView: false,
        maxZoom: zoomPrecision,
        enableHighAccuracy: true,
        timeout: 5000
    })
    .on('locationfound', onLocationFound)
    .on('locationerror', onLocationError);

    // Evento de clic en el mapa
    map.on('click', async (e) => {
      if (bloqueoRecursivo) return;
      origenDelCambio = 'mapa';
      bloqueoRecursivo = true;

      if (marcadorSeleccion) map.removeLayer(marcadorSeleccion);
        
        marcadorSeleccion = L.marker(e.latlng, {
          draggable: true, // puedes mover el marcador si deseas
          icon: L.icon({
              iconUrl: '/app/view/autenticacion/imgs/marc1.png',
              iconSize: [40, 40],
              iconAnchor: [16, 32]
          })
      }).addTo(map);
        
        // Obtener dirección
        //MENSAJE BANDERA

        const referenciaExist = $scope.ubicacion.referencia || "";
        const direccion = await obtenerDireccion(e.latlng);
        const utm = convertirWGS84aUTM(e.latlng.lat, e.latlng.lng);
        const wkt = `POINT(${e.latlng.lng} ${e.latlng.lat})`;
        console.log("wkt: ", wkt);
        
        const url = `http://192.168.5.84:8080/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:sedes_redsalud&outputFormat=json&cql_filter=INTERSECTS(geom,${wkt})`;
        
        console.log("URL completa:", url);

        // Usando reqwest para la consulta
        reqwest({
          url: url,
          method: 'GET',
          type: 'json',
          success: function(data) {
              console.log("Respuesta completa:", data);
              
              if(data.features && data.features.length > 0) {
                  const feature = data.features[0];
                  console.log("Feature encontrado:", feature);
                  
                  // Extraer propiedades (ajusta según tus necesidades)
                  const propiedades = feature.properties;
                  const nombreRed = propiedades.nombrered || '';
                  const nombre = propiedades.nombrered || 'Sede sin nombre';
                  const codigo = propiedades.codredsal || 'N/A';
                  // const redesEspeciales = ["RED 1 - SUR OESTE", "RED 2 - NOR OESTE", "RED 3 - NORTE CENTRAL", "RED 5 - SUR"];
                  // const popupPosition = L.latLng(e.latlng.lat + 0.001, e.latlng.lng); 

                  if (nombreRed) {
                    const hospitalAsignado = calcularHospitalSegunRed(nombreRed, e.latlng);
                    // console.log("Hospital asignado:", hospitalAsignado);
                    // Obtener ID del hospital
                    const hospitalId = $scope.hospitalesMapa[hospitalAsignado] || 'No encontrado';
                    console.log(`ID del hospital: ${hospitalId}`);

                     // Guardar el ID en el scope para usarlo después
                    $scope.hospitalIdSeleccionado = hospitalId; // <-- Nueva línea
                    
                    $scope.$apply(() => {
                        $scope.ubicacion.hospitalAsignado = hospitalAsignado;
                    });
                }
                  // Mostrar resultados
                  L.popup({ offset: [0, -20] })
                      .setLatLng(e.latlng)
                      .setContent(`
                        <b>${nombre}</b>
                    `)
                      .openOn(map);
                      
                  // Actualizar modelo AngularJS
                  $scope.$apply(() => {
                      $scope.ubicacion.sede = {
                          nombre: nombre,
                          codigo: codigo,
                          propiedades: propiedades
                      };
                  });
              } else {
                  L.popup()
                      .setLatLng(e.latlng)
                      .setContent("No hay sedes en esta ubicación")
                      .openOn(map);
              }
          },
          error: function(err) {
              console.error("Error:", err);
              L.popup()
                  .setLatLng(e.latlng)
                  .setContent("Error al consultar el servicio")
                  .openOn(map);
          }
      });

        // Actualizar scope
        $scope.$apply(() => {
            $scope.ubicacion = {
                coordenadas: {
                    latitud: e.latlng.lat,
                    longitud: e.latlng.lng,
                    utm: utm
                },
                direccion: direccion,
                referencia: referenciaExist,
            };
            $scope.cambioEnProgreso = false;
        });
        
        console.log("Coordenadas del click:", e.latlng);
        console.log("Coordenadas UTM:", utm);

         // Resetear después de un pequeño delay
        setTimeout(() => { origenDelCambio = null; }, 100);

        ultimaDireccionProcesada = direccion;
        bloqueoRecursivo = false;
    });

    $scope.$watch('ubicacion.direccion', function(nuevaDireccion, viejaDireccion) {
      // Evitar procesamiento si:
      // - Está bloqueado
      // - La dirección es muy corta
      // - No ha cambiado realmente
      // - Viene del mapa
      if (bloqueoRecursivo || 
          !nuevaDireccion || 
          nuevaDireccion.length < 4 || 
          nuevaDireccion === viejaDireccion || 
          nuevaDireccion === ultimaDireccionProcesada) {
          return;
      }
      
      // Limpiar timeout anterior
      if ($scope.geocodeTimeout) {
          clearTimeout($scope.geocodeTimeout);
      }
      
      // Establecer timeout con debounce
      $scope.geocodeTimeout = setTimeout(function() {
          bloqueoRecursivo = true;
          ultimaDireccionProcesada = nuevaDireccion;
          
          $scope.geocodificarDireccion(nuevaDireccion).finally(function() {
              bloqueoRecursivo = false;
          });
      }, 800); // Aumentamos el debounce a 800ms para menos sensibilidad
  });
};

  $scope.guardarUbicacion = function () {
    // Activa las validaciones
    $scope.showErrors = true;

    // Verifica si el formulario es válido
    if (!$scope.ubicacion.direccion || !$scope.ubicacion.coordenadas) {
      return; // Detiene la ejecución si hay errores
    }

    // Si todo está bien, continúa
    $scope.datosConsulta.ubicacion = angular.copy($scope.ubicacion);
    guardarConExpiracion($scope.datosConsulta)
    $scope.cambiarVista("listaDoctores");
    $scope.showErrors = false; // Resetea para la próxima vez
  };

  $scope.cargarDoctores = function () {
    $scope.cargando = true;

    const backendUrl = "http://172.18.2.144:3000/doctor";

    $http
      .get(backendUrl)
      .then(function (response) {
        console.log("Respuesta de doctores:", response.data);

        if (Array.isArray(response.data)) {
          const doctoresFiltrados = response.data.filter(doctor => 
            doctor.hospital?.hospitalId === $scope.hospitalIdSeleccionado
          );

          // Mostrar en consola la información requerida
          console.log("Doctores asociados al hospital:", $scope.hospitalIdSeleccionado);
          doctoresFiltrados.forEach(doctor => {
            console.log(
              `Nombre: ${doctor.persona.persNombre} ${doctor.persona.persPaterno} ${doctor.persona.persMaterno || ""} | Celular: ${doctor.doctorCelular}`
            );
          });


          $scope.doctores = doctoresFiltrados.map((doctor) => {
            const basePath = "imgs/";
            const nombreCompleto = doctor.persona ? 
                `${doctor.persona.persNombre} ${doctor.persona.persPaterno} ${doctor.persona.persMaterno || ''}`.trim() 
                : "Nombre no disponible";
                return {
                  id: doctor.personaId,
                  nombre: nombreCompleto,
                  especialidad: doctor.doctorEspecialidad || "Medicina General",
                  celular: doctor.doctorCelular || "No disponible",
                  imagen: basePath + (doctor.persona?.persSexo === "F" ? "docF.png" : "docM.png")
              };
        });


        } else {
          console.error("La respuesta no es un array:", response.data);
          sweet.show("Error", "Formato de datos incorrecto", "error");
          $scope.doctores = [];
        }
      })
      .catch(function (error) {
        console.error("Error al cargar doctores:", error);
        sweet.show(
          "Error",
          "No se pudieron cargar los doctores. Intente nuevamente.",
          "error"
        );
        $scope.doctores = [];
      })
      .finally(function () {
        $scope.cargando = false;
      });
  };

  $scope.seleccionarDoctor = function (doctor) {
    $scope.doctorSeleccionado = doctor;
    $scope.showDoctorError = false; // Ocultar error cuando se selecciona un doctor
    $scope.datosConsulta.doctor = {
      id: doctor.id,
      nombre: doctor.nombre,
      especialidad: doctor.especialidad,
      celular: doctor.celular,
    };
    guardarConExpiracion($scope.datosConsulta)
  };

  $scope.confirmarDoctor = function() {
    // Verificación explícita
    if (!$scope.doctorSeleccionado) {
      $scope.showDoctorError = true;
      console.log("Error: No se ha seleccionado doctor"); // Debug
      sweet.show("Error", "Debe seleccionar un doctor para continuar", "error");
      return;
    }
    // Si pasa la validación
    $scope.showDoctorError = false;
    $scope.cambiarVista("metodoPago");
  };

  $scope.getMetodoPagoText = function (metodo) {
    switch (metodo) {
      case "efectivo":
        return "Efectivo";
      case "qr":
        return "Pago por QR";
      default:
        return "";
    }
  };

  $scope.$watch('metodoPago', function(newVal) {
    if (newVal) {
      $scope.showPagoError = false; // Oculta el error cuando se selecciona un método
    }
  });

  $scope.guardarMetodoPago = function() {
    if (!$scope.metodoPago) {
      $scope.showPagoError = true;
      sweet.show("Error", "Debe seleccionar un método de pago para continuar", "error");
      return;
    }
    
    // Construye el objeto completo de datosConsulta
    $scope.datosConsulta = {
      formData: angular.copy($scope.formData),
      ubicacion: angular.copy($scope.ubicacion),
      doctor: angular.copy($scope.doctorSeleccionado),
      metodoPago: {
        tipo: $scope.metodoPago,
        importe: 30.00
      }
    };
    
    guardarConExpiracion($scope.datosConsulta);
    $scope.cambiarVista("confirmacionExitosa");
  };

  $scope.confirmarSolicitud = function () {   
    $scope.cargando = true;

    const payload = {
      formAmdMotivoConsulta: $scope.datosConsulta.formData.motivoConsulta,
      formAmdNumReferencia:
        $scope.datosConsulta.formData.numeroReferencia || null,
      formAmdDireccion: $scope.datosConsulta.ubicacion.direccion,
      formAmdLatitud: $scope.datosConsulta.ubicacion.coordenadas.latitud,
      formAmdLongitud: $scope.datosConsulta.ubicacion.coordenadas.longitud,
      formAmdRefAdicional: $scope.datosConsulta.ubicacion.referencia || null,
      formAmdImporte: 30.0,
      formAmdMetodoPago: $scope.datosConsulta.metodoPago.tipo,
      formAmdEstado: 1,
      // Añadiendo los nuevos campos desde sessionService
      formAmdTipoCiudadano: $scope.tipoCiudadano,
      formAmdIdCiudadano: $scope.idCiudadano,
      formAmdEmail: $scope.email,
    };

    // Reemplaza "192.168.x.x" con la IP de tu computadora en la red local
    const backendUrl = "http://172.18.2.144:3000";

    $http
      .post(backendUrl + "/form-amd", payload)
      .then((response) => {
        alert("¡Solicitud registrada con éxito!");
        // Limpiar todos los datos después del envío exitoso
        $scope.limpiarDatosTemporales();
        
        $timeout(function() {
          mostrarIdCiudadano();
      }, 100);
      $scope.cambiarVista("inicio");
        // $scope.mostrarIdCiudadano();
    })
      .catch((error) => {
        console.error("Error detallado:", error);
        alert(
          `Error: ${
            error.data?.message || "Verifica la consola para más detalles"
          }`
        );
      })
      .finally(() => ($scope.cargando = false));
  };





$scope.volverAlInicio = function () {
  sweet.show({
      title: "Confirmar acción",
      text: "¿Estás seguro de salir? Se perderán todos los datos introducidos",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d42230",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
  }).then(function (result) {
      if (result.value) {
          $scope.limpiarDatosTemporales();
          $scope.cambiarVista("inicio");
      }
  });
};

  $scope.nextAyudaSlide = function () {
    if ($scope.ayudaSlideActual < $scope.totalAyudaSlides - 1) {
      $scope.ayudaSlideActual++;
    } else {
      $scope.ayudaSlideActual = 0; // Vuelve al primer slide
    }
    $scope.$apply();
  };
  
  $scope.prevAyudaSlide = function () {
    if ($scope.ayudaSlideActual > 0) {
      $scope.ayudaSlideActual--;
    } else {
      $scope.ayudaSlideActual = $scope.totalAyudaSlides - 1; // Va al último slide
    }
    $scope.$apply();
  };

  $scope.cambiarAyudaSlide = function (index) {
    $scope.ayudaSlideActual = index;
    // No necesitas aplicar el timeout si usas $applyAsync
    $scope.$apply();
  };

  function cerrarModalExterno(event) {
    const modalContent = document.querySelector('.FABmodal-content');
    const botonFlotante = document.querySelector('.mec-ayuda-flotante');
    
    // Verificar si el clic fue fuera del modal y del botón
    if (!modalContent.contains(event.target) && !botonFlotante.contains(event.target)) {
      $scope.$apply(function() {
        $scope.mostrarModal = false;
        angular.element(document).off('click', cerrarModalExterno);
      });
    }
  }

  $scope.toggleAyuda = function(event) {
    if (event) {
      event.stopPropagation(); // Evitar que el clic se propague
    }
    $scope.mostrarModal = !$scope.mostrarModal;
    if ($scope.mostrarModal) {
      $scope.ayudaSlideActual = 0;
      // Agregar listener para cerrar al hacer clic fuera
      $timeout(function() {
        angular.element(document).on('click', cerrarModalExterno);
      });
    } else {
      // Remover listener cuando se cierra el modal
      angular.element(document).off('click', cerrarModalExterno);
    }
  };

  $scope.$on('$destroy', function() {
    angular.element(document).off('click', cerrarModalExterno);
  });

  $scope.irAPaginaAnterior = function () {
    const rutas = [
      "inicio",
      "datosPersonales",
      "ubicacion",
      "listaDoctores",
      "metodoPago",
      "confirmacionExitosa",
    ];
    const indexActual = rutas.indexOf($scope.vistaActual);
    if (indexActual > 0) {
      $scope.cambiarVista(rutas[indexActual - 1]);
    }
  };

  $scope.get_renderizarHospitales = function (x) {
    return $sce.trustAsHtml(x);
  };

$scope.limpiarDatosTemporales();







//   // Inicialización
//   const datosCargados = cargarConExpiracion();
// if (datosCargados) {
//     $scope.datosConsulta = datosCargados;
//     $scope.formData = $scope.datosConsulta.formData || $scope.formData;
//     $scope.ubicacion = $scope.datosConsulta.ubicacion || $scope.ubicacion;
// }

  // URLs de conexión
  if (jsonURLS) {
    var urlODM = CONFIG.CONEXION_SIERRA_VALLE + "v.0.1/sierra/generacion_ODM";
    var urlPagoTarjetaX = CONFIG.CONEXION_PAGOS + "api/v2/registrarTrx";
    var urlPagoQR = CONFIG.CONEXION_PAGOS_QR + "api/v2/registrarQrBcp";
    var urlCorreo = CONFIG.CONEXION_CORREOS;
    var urlCorreoIgob = CONFIG.CONEXION_CORREOS_IGOB;
    var urlTipDoc = CONFIG.CONEXION_FACTURACION_V2 + "api/sincronizar/listar";
  }

  var tiemporespuesta = null;
  var data = $scope.users;
}
