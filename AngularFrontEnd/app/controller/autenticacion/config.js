var jsonURLS    =   {
    APIURL: "http://192.168.5.141:80/rest",
    SERVICE: "wsServiceRP",// BASE DE DATOS DEL CIUDADANO PG
    SERVICER: "wsNuevoGenesis",// BASE DE DATOS DEL CIUDADANO PG
    SERVICE_IF: "wsIf", // BASE DE DATOS DEL IF PG
    SERVICERC: "wsRP", // BASE DE DATOS DEL CIUDADANO MONGO
    SERVICE_ARCHIVO: "files", //SERVICIO DE REGISTRO DE ARCHIVOS

    // DUPLICADOS
    SERVICE_SIT: "wsSIT_",                                              //xxx
    SERVICE_SITOL: "wsSITOnline_",                                      //xxx
    //SERVICE_SITOLext: "http://sim.lapaz.bo/sitolservicios/Servicios/",  //xxx
    //SERVICE_SITOLextgen: "http://sim.lapaz.bo/sitolservicios/",         //xxx
    SERVICE_SITOLext: "http://gmlpsr00035/sitolservicios/Servicios/",  
    SERVICE_SITOLextgen: "http://gmlpsr00035/sitolservicios/",
    //AUTOCONSULTA CIUDADANO
    SERVICE_SIMGEP_AE: "wsSimgepAe",                                    //xxx
    SERVICE_SIMGEP_TERRITORIAL: "wsSimgepTerritorial",                  //xxx
    SERVICE_SITRAM247: "wsSitram247",                                   //xxx
    SERVICE_SITRAM: "wsSitram",                                         //pgsql:host=192.168.5.141;dbname=sitram247_pruebas
    SERVICE_SH: "wsSeHaEstido",
    //CREDENCIALES
    APP_NAME: "todoangular",
    CREDENCIAL: {
              "body": {
                  "email": 'admin.01@gmail.com',
                  "password": '1234567'
              }
        },
    TYPE: "dream",
    HOMEPATH: "#/home",
    //COMPROBAR
    DSP_URL: "http://localhost:86",
    DSP_API_KEY: "todomongo",
    IMG_URL: "",
    UPLOAD_URL: "",
    API_URL_DMS: "",
    CREDENCIAL_MOTORES: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : '123456'
    },
    KEY: 'igob24_7',
    SERVICE_ENVIO_CORREO: "http://200.105.139.183:9090/" + "smsemail/email/mail.php",
    CONEXION_API_PG_IF: "http://192.168.5.141:9091/",
    CONEXION_API_PG_GENESIS: "http://192.168.5.141:9097/",
    CONEXION_API_PG_RC: "http://192.168.5.141:8003/",
    CONEXION_MOTOR_SERVICIO: "http://192.168.5.69/motorservicio_pruebas/public/",    
    CONEXION_API_PG_IF_OFICIAL: "http://192.168.5.141:9091/",    
    CONEXION_API_PG_SALUD: "http://serigobvprueba.lapaz.bo/",
    CONEXION_GENERAR_FUM: "http://200.105.139.183:9090/igob247/",    
    CONEXION_PUENTE_IMG: "http://200.105.139.183:9090",
    API_URL_DMS_2: "http://192.168.5.141:80/dreamfactory/dist/generarIgobPdf/",
    API_URL_DMS_HTML: "http://192.168.5.141:80/dreamfactory/dist/generadorPaginas/",    
    CONEXION_SERVICIOATM: "http://172.19.161.3/",
    CONEXION_SERVICIOMASCOTAS: "http://192.168.5.69/",
    SERVICIO_URL_MASCOTAS:"http://40.117.46.159/dreamfactory/crearImagenBase64.php",
    URL_FILES:"http://192.168.5.141",    
    CONEXION_MOVILIDAD: "http://192.168.5.141:2020/",
    CONEXION_SITV3: "http://192.168.6.111/SITv3Desarrollo/",
    SIT_GEO: "http://192.168.5.84:8080/",
    UDIT_GEO:"http://192.168.6.46:8080/",
    URL_SITRAM: "http://192.168.5.141",
    CONEXION_SITRAM: "http://192.168.5.141", 
    CONEXION_API_PG_PRODUCTO: "http://192.168.5.141:8010/",
	SERVICE_SIERRAM : "http://131.0.0.11:90/api/",
    CONEXION_SIERRA: "http://172.18.26.176:9090/",    
    
    CREDENCIAL_MOTORES_SIERRA: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : 'Adm1nSierra113'
    },
	SERVICE_SIERRA_ODM : "http://sierra247.lapaz.bo/SierraValle_Oficial/public/",
	CREDENCIAL_MOTORESODM: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : '123456'
    },	
    SERVICE_GIS_AE_DZ:"https://servmonitoreo.lapaz.bo/",
    CONEXION_PAGOS: "http://52.226.130.135:5433/api/",
    CONEXION_ODM : "http://200.105.139.183:9090/poss_pruebas/servicios/ODM_Controller_PRUEBAS.php",
    CONEXION_CORREOS : "http://200.105.139.183:9090/" + "smsemail/email/mailSalud2_0_BORRAR.php",
    SERVICE_PAGOS_TARJETA:"http://172.18.2.194:4500/api/registrarTrx"
    
    
};
try{
    if(app){
        app.constant('CONFIG', jsonURLS);
    }
}catch(e){console.log("Warning:", e);}