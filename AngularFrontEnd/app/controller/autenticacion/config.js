var jsonURLS    =   {
    //SERVICIOS NECESARIOS PARA 24/7 CIUDADANO
    //APIURL: "http://40.117.238.8:80/rest",
    APIURL: "http://192.168.5.141:80/rest",
    SERVICE: "wsServiceRP",// BASE DE DATOS DEL CIUDADANO PG      //pgsql:host=192.168.5.141;dbname=rcciudadano_prueba4
    SERVICER: "wsNuevoGenesis",// BASE DE DATOS DEL CIUDADANO PG  //pgsql:host=localhost;dbname=oficialgenesis_urae
    SERVICE_IF: "wsIf", // BASE DE DATOS DEL IF PG                //pgsql:host=localhost;dbname=oficialgenesis_urae
    SERVICERC: "wsRP", // BASE DE DATOS DEL CIUDADANO MONGO       //MongoDB:192.168.5.243  RC_Lapaz
    SERVICE_ARCHIVO: "files", //SERVICIO DE REGISTRO DE ARCHIVOS  //Local File Storage:Local file storage access

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
    KEY: 'igob24_7',
    SERVICE_ENVIO_CORREO: "http://200.105.139.183:9090/smsemail/email/mail.php",
    //URLS_API
    //CONEXION_API_PG_IF: "http://172.19.161.199:9091/",//login, apirc, lotus
    //REVISAR INICIO
    CONEXION_API_PG_IF: "http://192.168.5.141:9091/",
    CONEXION_API_PG_GENESIS: "http://192.168.5.141:9091/",
    //REVISAR FIN
    //CONEXION_API_PG_RC: "http://40.117.46.159:9093/",//login, apirc, lotus
    CONEXION_API_PG_RC: "http://192.168.5.141:8003/",//login, apirc, lotusoficial
    CONEXION_MOTOR_SERVICIO: "http://192.168.5.69/motorservicio_pruebas/public/",//apirc
    //http://192.168.5.69/motorservicio_pruebas/public/reglaNegocio/ejecutarWeb
    CONEXION_API_PG_IF_OFICIAL: "http://192.168.6.107:91/",//apirc
    //CONEXION_API_PG_SALUD: "http://serigobvprueba.lapaz.bo/",//apisalud pruebas
    CONEXION_API_PG_SALUD: "http://localhost:9094/",//apisalud pruebas
    CONEXION_GENERAR_FUM: "http://200.105.139.183:9090/igob247/",//generador de fum pruebas
    //CONEXION_GENERAR_FUM: "https://gamlpmotores.lapaz.bo/gamlp179/",//generador de fum oficial
    CONEXION_PUENTE_IMG: "http://200.105.139.183:9090",
    API_URL_DMS_2: "http://192.168.5.141:80/dreamfactory/dist/generarIgobPdf/",
    API_URL_DMS_HTML: "http://192.168.5.141:80/dreamfactory/dist/generadorPaginas/",
    ///opt/dreamfactory-1.9.4-2/apps/dreamfactory/htdocs/web/dreamfactory/dist/generadorPaginas/elaborarPdf/elaborar    
    CONEXION_SERVICIOATM: "http://172.19.161.3/",//apiATM, CORREGIR SEGUN  EL AUTCONTROLLER
    SERVICIO_URL_MASCOTAS:"http://40.117.46.159/dreamfactory/crearImagenBase64.php", //externo MASCOTAS
    URL_FILES:"http://192.168.5.141", //SERVICIO QUE GENERA URL
    //CONEXION_MOVILIDAD: "http://serigobvprueba.lapaz.bo/"
    CONEXION_MOVILIDAD: "http://192.168.5.141:2020/",
    CONEXION_SITV3: "http://192.168.6.111/SITv3Desarrollo/",
    //CONEXION_SITV3_Antena: "http://sitservicios.lapaz.bo/",
    SIT_GEO: "http://sitservicios.lapaz.bo",//Pruebas
    URL_SITRAM: "http://192.168.5.141",
    CONEXION_SITRAM: "http://192.168.5.141", 
    CONEXION_API_PG_PRODUCTO: "http://192.168.5.141:8010/",//apirc
    CONEXION_PAGOS: "http://52.226.130.135:5433/",//apirc   
    SERVICE_SIERRAM : "http://172.19.160.133/api/",///conexion sierra
    CREDENCIAL_MOTORESSIERRA: {
        'usr_usuario'   : 'administrador',
        'usr_clave'     : '123456'
    },
    SERVICE_GIS_AE_DZ:"https://servmonitoreo.lapaz.bo/",
    //https://gamlpmotores.lapaz.bo/gamlp179/igob247/generarFumOficial.php
    SERVICEODM: "http://172.19.160.38:8081"
};
try{
    if(app){
        app.constant('CONFIG', jsonURLS);
    }
}catch(e){console.log("Warning:", e);}