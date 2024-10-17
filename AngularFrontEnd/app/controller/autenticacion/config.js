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
    SERVICE_SITOLext: "http://sim.lapaz.bo/sitolservicios/Servicios/",  //xxx
    SERVICE_SITOLextgen: "http://sim.lapaz.bo/sitolservicios/",         //xxx
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
	/*,
    CREDENCIAL_MOTORES: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : 'Adm1nSierra113'
    },*/
    KEY: 'igob24_7',
    SERVICE_ENVIO_CORREO: "http://200.105.139.183:9090/smsemail/email/mail.php",
    CONEXION_API_PG_IF: "http://192.168.5.141:9091/",
    CONEXION_API_PG_GENESIS: "http://192.168.5.141:9091/",
    CONEXION_API_PG_RC: "http://192.168.5.141:8003/",

    CONEXION_MOTOR_SERVICIO: "http://192.168.5.69/motorservicio_pruebas/public/",   
	//CONEXION_MOTOR_SERVICIO: "http://172.18.27.29:8000/",  
	
    CONEXION_API_PG_IF_OFICIAL: "http://192.168.5.141:9091/",    
    //CONEXION_API_PG_SALUD: "http://serigobvprueba.lapaz.bo/",
	CONEXION_API_PG_SALUD: "http://192.168.5.100:9898/",     /* local salud */
    CONEXION_GENERAR_FUM: "http://200.105.139.183:9090/igob247/",    
    CONEXION_PUENTE_IMG: "http://200.105.139.183:9090",
    API_URL_DMS_2: "http://192.168.5.141:80/dreamfactory/dist/generarIgobPdf/",
    API_URL_DMS_HTML: "http://192.168.5.141:80/dreamfactory/dist/generadorPaginas/",    
    CONEXION_SERVICIOATM: "http://172.19.161.3/",
    
	CONEXION_SERVICIOMASCOTAS: "http://192.168.5.69/",
	
    SERVICIO_URL_MASCOTAS:"http://40.117.46.159/dreamfactory/crearImagenBase64.php",
    URL_FILES:"http://192.168.5.141",    
    CONEXION_MOVILIDAD: "http://192.168.5.141:9091/",
    CONEXION_SITV3: "http://192.168.6.111/SITv3Desarrollo/",
    SIT_GEO: "http://192.168.5.84:8080/",
    UDIT_GEO:"http://192.168.6.46:8080/",
    URL_SITRAM: "http://192.168.5.141",
    CONEXION_SITRAM: "http://192.168.5.141", 
    CONEXION_API_PG_PRODUCTO: "http://192.168.5.141:8010/",
	SERVICE_SIERRAM : "http://172.18.2.202/api/",
    //CONEXION_PAGOS: "http://172.18.2.153:8000/api/",    
	CONEXION_PAGOS: "http://172.18.2.194:4501/",    
    //CONEXION_PAGOS: "http://52.226.130.135:5433/api/",    
    //CONEXION_PAGOS: "http://131.0.0.12:8080/payme/public/api/",
    //CONEXION_ODM : "http://172.18.2.41:8081/poss_pruebas/servicios/ODM_Controller_PRUEBAS.php",
    CONEXION_ODM : "http://200.105.139.183:9090/poss_pruebas/servicios/ODM_Controller_PRUEBAS.php",
    CREDENCIAL_MOTORES_SIERRA: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : 'Adm1nSierra113'
    },
	SERVICE_SIERRA_ODM : "http://sierra247.lapaz.bo/SierraValle_Oficial/public/",
	CREDENCIAL_MOTORESODM: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : '123456'
    },	
    SERVICE_GIS_AE_DZ:"http://192.168.6.46:9081/",//https://servmonitoreo.lapaz.bo/,
	CONEXION_API_ATM: "https://atmservicios.lapaz.bo:443/",     	
	SIT_GEO_EXT : "https://servgeo.lapaz.bo/sit/",
	SERVICE_PAGOS_TARJETA:"http://172.18.2.194:4501/api/registrarTrx",
    CREDENCIALES_ODM: {
        "usr_usuario":"usuario.desarrollo",
        "usr_clave":"des4rr0ll0"
    },	
    CONEXION_SIERRA_PRUEBAS : "http://192.168.8.5/",
    CONEXION_WS_GENESIS : "http://172.18.2.238:3035/",
    CONEXION_COPIA_ARCHIVO : "http://192.168.6.91:9090/",
	CONEXION_FACTURACION_v2 : "http://192.168.8.6:9000/",
	
    ////CEMENTERIO - CARONTE -- IGOB
    CONEXION_API_FEEL: "http://172.19.100.80:90/",
    CONEXION_API_CEMENTERIO: "http://172.19.100.69/",
    CONEXION_API_BACKPAGOS: "http://172.19.100.29/",
    /*CREDENCIAL_CARONTE: {
       'usr_usuario'   : 'adminCaronte',
       'usr_clave'     : 'caronteFeel'
   },*/
   
    CREDENCIAL_CARONTE: {
        '06aa56a48f42226a8d5c4069d40b009c':'46e239955a9610117bde5f3f269f758b4a921ba1efaea0a05bf646498bc192f0ee54550852cbbf32fa3d6240da6dbcf7',
        '6840dcab45a63980eb8b79be1980a11e':'46e239955a9610117bde5f3f269f758b65a691e3456fb51d127807bf3e58618bee54550852cbbf32fa3d6240da6dbcf7'
     },
   
    CONEXION_FACPUENTE : "http://172.18.2.228/",
    //CONEXION_ARCHIVOS : "http://gmlppc08901:3035/"	
	CONEXION_ARCHIVOS : "http://gmlppc08901:3035/archivocsv/",
    SERVICIOS_GEO_EDMCLP: "http://172.19.100.179:1234/",
    CONEXION_DEPORTES_SIERRA :"http://192.168.8.5/",
    //CONEXION_IFICHAS : "http://192.168.6.156:3096/",
    CONEXION_IFICHAS : "http://172.18.2.207:3095/",

	
};
try{
    if(app){
        app.constant('CONFIG', jsonURLS);
    }
}catch(e){console.log("Warning:", e);}