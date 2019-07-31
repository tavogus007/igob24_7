
-- TABLAS--
CREATE TABLE public.dms_foro_principal
(
  pri_id integer NOT NULL DEFAULT nextval('dms_foro_principal_pri_id_seq'::regclass),
  pri_nombre text,
  pri_imagen_grupo text,
  pri_resgistrado timestamp without time zone NOT NULL DEFAULT now(),
  pri_modificado timestamp without time zone NOT NULL DEFAULT now(),
  pri_usuario text NOT NULL,
  pri_estado text NOT NULL DEFAULT 'ACTIVO'::text,
  pri_nro_visto integer DEFAULT 0,
  pri_orden integer,
  CONSTRAINT dms_foro_principal_pkey PRIMARY KEY (pri_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.dms_foro_principal
  OWNER TO postgres;

INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('EDUCACIÓN', 'educacion.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('CULTURAS', 'cultura.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('DEPORTES', 'running.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('SALUD', 'salud.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('MEDIO AMBIENTE', 'medioAmbiente.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('SEGURIDAD CIUDADANA', 'seguridadCiuda.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('TRANSPORTE', 'transporte.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('TURISMO', 'turismo.png', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('INFRAESTRUCTURA', 'infraestructura.png', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('SOCIAL', 'otro.svg', '1');
INSERT INTO dms_foro_principal(pri_nombre, pri_imagen_grupo,pri_usuario) VALUES ('VARIOS', 'otro.svg', '1');


CREATE TABLE public.dms_foro_grupos
(
  grp_id serial NOT NULL, 
  grp_nombre_grupo text,
  grp_imagen_grupo text,
  grp_resgistrado timestamp without time zone NOT NULL DEFAULT now(),
  grp_modificado timestamp without time zone NOT NULL DEFAULT now(),
  grp_usuario text NOT NULL,
  grp_estado text NOT NULL DEFAULT 'ACTIVO'::text,
  grp_nro_visto integer DEFAULT 0,
  grp_orden integer,
  grp_pri_id integer,
  CONSTRAINT dms_foro_grupos_pkey PRIMARY KEY (grp_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.dms_foro_grupos
  OWNER TO postgres;

INSERT INTO dms_foro_grupos(grp_nombre_grupo, grp_imagen_grupo,grp_usuario,grp_pri_id)VALUES ('Como ciudadano. ¿Qué propones para mejorar el trato en nuestros hospitales y centros médicos municipales?', '', '1', 1);
INSERT INTO dms_foro_grupos(grp_nombre_grupo, grp_imagen_grupo,grp_usuario,grp_pri_id)VALUES ('¿Cómo incentivamos a los niños y jóvenes a participar, pensando en su municipio?', '', '1', 4);
INSERT INTO dms_foro_grupos(grp_nombre_grupo, grp_imagen_grupo,grp_usuario,grp_pri_id)VALUES ('Como ciudadano ¿Qué debemos poner de nuestra parte para que exista mayor y mejor seguridad ciudadana?', '', '1', 6);
INSERT INTO dms_foro_grupos(grp_nombre_grupo, grp_imagen_grupo,grp_usuario,grp_pri_id)VALUES ('Como ciudadano ¿Tienes alguna solución posible al problema de transporte en nuestra ciudad?', '', '1', 7);
INSERT INTO dms_foro_grupos(grp_nombre_grupo, grp_imagen_grupo,grp_usuario,grp_pri_id)VALUES ('¿Cómo podemos enseñar con el ejemplo a que la gente bote la basura en su lugar?', '', '1', 5);


CREATE TABLE public.dms_foro_temas
(
  ftm_id_tema serial,
  ftm_tema text NOT NULL,
  ftm_autor text NOT NULL,
  ftm_nro_respuestas integer,
  ftm_nro_visitas integer,
  ftm_registro timestamp without time zone NOT NULL DEFAULT now(),
  ftm_modificacion timestamp without time zone NOT NULL DEFAULT now(),
  ftm_usuario text NOT NULL,
  ftm_estado text NOT NULL DEFAULT 'ACTIVO'::text,
  imagen_perfil_tema text,
  nro_likes_tema integer,
  ftm_id_grupo integer,
  ftm_descripcion_tema text,
  ftm_estrellas integer DEFAULT 1,
  ftm_cantidad_calificacion integer DEFAULT 1,
  CONSTRAINT dms_foro_temas_pkey PRIMARY KEY (ftm_id_tema)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.dms_foro_temas
  OWNER TO postgres;

CREATE TABLE dms_respuestas_tema (
    rtm_id_respuesta serial NOT NULL,
    rtm_id_tema text NOT NULL,
    rtm_nombre_respuesta text NOT NULL,
    rtm_respuesta text NOT NULL,
    rtm_registro timestamp without time zone DEFAULT now() NOT NULL,
    rtm_modificado timestamp without time zone DEFAULT now() NOT NULL,
    rtm_usuario text NOT NULL,
    rtm_estado text DEFAULT 'ACTIVO'::text NOT NULL,
    rtm_nro_likes integer,
    rtm_id_respuesta_hijo integer,
    imagen_perfil_respuesta text,
    rtm_value integer,
    CONSTRAINT dms_respuestas_tema_pkey PRIMARY KEY (rtm_id_respuesta)
);

----SP'S---

CREATE OR REPLACE FUNCTION public.ftm_principal_listar()
  RETURNS TABLE(xpri_id integer, xpri_nombre text, xpri_imagen_grupo text, xpri_resgistrado timestamp without time zone, xpri_modificado timestamp without time zone, xpri_usuario text, xpri_estado text, xpri_nro_visto integer, xpri_orden integer) AS
$BODY$

BEGIN
    RETURN QUERY SELECT pri_id, pri_nombre, pri_imagen_grupo, pri_resgistrado, pri_modificado, pri_usuario, pri_estado, pri_nro_visto, pri_orden
        FROM dms_foro_principal
        WHERE pri_estado = 'ACTIVO'
        ORDER BY pri_id ASC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION public.ftm_principal_listar()
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.ftm_grupos_listar(IN idprincipal integer)
  RETURNS TABLE(grpid integer, grpnombregrupo text, grpimagengrupo text, grpresgistrado timestamp without time zone, grpmodificado timestamp without time zone, grpusuario text, grpestado text, grpnrovisto integer, grporden integer, conttemasdato text) AS
$BODY$

BEGIN
    RETURN QUERY SELECT grp_id, grp_nombre_grupo, grp_imagen_grupo, grp_resgistrado, grp_modificado, grp_usuario, grp_estado, grp_nro_visto, grp_orden,
        (SELECT count(*)::text FROM dms_foro_temas WHERE ftm_id_grupo = grp_id) AS contTemas
        FROM dms_foro_grupos
        WHERE grp_estado = 'ACTIVO' and grp_pri_id=idprincipal
        ORDER BY grp_id DESC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION public.ftm_grupos_listar(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.ftm_temas_listar(IN idgrupo integer)
  RETURNS TABLE(ftmidtema integer, ftmtema text, ftmautor text, ftmnrorespuestas integer, ftmnrovisitas integer, ftmregistro timestamp without time zone, ftmmodificacion timestamp without time zone, ftmestado text, ftmusuario text, ftmdescripciontema text, imagenperfiltema text, nrolikestema integer, ftmidgrupo integer, promediocalificacion integer) AS
$BODY$

BEGIN
  RETURN QUERY SELECT ftm_id_tema, ftm_tema, ftm_autor, (select count(*)::integer from dms_respuestas_tema where rtm_id_tema = ftm_id_tema::text) as ftm_nro_respuestas, ftm_nro_visitas, 
        ftm_registro, ftm_modificacion, ftm_estado, ftm_usuario, ftm_descripcion_tema,imagen_perfil_tema,nro_likes_tema,ftm_id_grupo,
        (ftm_estrellas/ftm_cantidad_calificacion) as promedio_calificacion
        FROM dms_foro_temas
        WHERE ftm_id_grupo = 1
        ORDER BY ftm_id_tema DESC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION public.ftm_temas_listar(integer)
  OWNER TO postgres;


CREATE OR REPLACE FUNCTION public.frm_insert_response_tema(
    rtm_id_tema_value text,
    rtm_nombre_respuesta_value text,
    rtm_respuesta_value text,
    rtm_estado_value text,
    rtm_usuario_value text,
    rtm_nro_likes_value integer,
    rtm_id_respuesta_hijo_value integer,
    imagen_perfil_respuesta_value text)
  RETURNS SETOF integer AS
$BODY$
BEGIN    
    INSERT INTO dms_respuestas_tema(rtm_id_tema,
                    rtm_nombre_respuesta,
                    rtm_respuesta,
                    rtm_estado,
                    rtm_usuario,
                    rtm_nro_likes,
                    rtm_id_respuesta_hijo,
                    imagen_perfil_respuesta,
                    rtm_value)
    VALUES (rtm_id_tema_value, 
        rtm_nombre_respuesta_value,
        rtm_respuesta_value,
        rtm_estado_value,
        rtm_usuario_value,
        rtm_nro_likes_value,
        rtm_id_respuesta_hijo_value,
        imagen_perfil_respuesta_value,
        0);
    RETURN QUERY SELECT max(dt_id) FROM _denuncia_top;  
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION public.frm_insert_response_tema(text, text, text, text, text, integer, integer, text)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ftm_principal_listar_web()
  RETURNS TABLE(xpri_id integer, xpri_nombre text, xpri_imagen_grupo text, xpri_resgistrado timestamp without time zone, xpri_modificado timestamp without time zone, xpri_usuario text, xpri_estado text, xpri_nro_visto integer, xpri_orden integer, xcantgrgupo bigint, xcantchat bigint) AS
$BODY$

BEGIN
    RETURN QUERY SELECT I.pri_id, I.pri_nombre, I.pri_imagen_grupo, I.pri_resgistrado, I.pri_modificado, I.pri_usuario, I.pri_estado, I.pri_nro_visto, I.pri_orden, count(grp_id),
    (select count(ftm_id_tema)as chat from dms_foro_temas left join public.dms_foro_grupos ON ftm_id_grupo=grp_id
    left join public.dms_foro_principal as pr ON pr.pri_id=grp_pri_id
    where ftm_estado='ACTIVO' and  pr.pri_id = I.pri_id)
        FROM dms_foro_principal as I left join public.dms_foro_grupos ON grp_pri_id = pri_id
        WHERE pri_estado = 'ACTIVO' GROUP BY I.pri_id,I.pri_nombre,I.pri_imagen_grupo,I.pri_resgistrado, I.pri_modificado, I.pri_usuario, I.pri_estado, I.pri_nro_visto, pri_orden
        ORDER BY I.pri_resgistrado ASC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION ftm_principal_listar_web()
  OWNER TO usr_cj;


CREATE OR REPLACE FUNCTION ftm_grupos_listar_web(IN idprincipal integer)
  RETURNS TABLE(grpid integer, grpnombregrupo text, grpimagengrupo text, grpresgistrado timestamp without time zone, grpmodificado timestamp without time zone, grpusuario text, grpestado text, grpnrovisto integer, grporden integer, imgprin text, conttemasdato text) AS
$BODY$

BEGIN
RETURN QUERY SELECT I.grp_id, I.grp_nombre_grupo, I.grp_imagen_grupo, I.grp_resgistrado, I.grp_modificado, I.grp_usuario, I.grp_estado, I.grp_nro_visto, I.grp_orden,pri_imagen_grupo,
    (select count(ftm_id_tema)::text from dms_foro_temas 
    where ftm_estado='ACTIVO' and ftm_id_grupo = I.grp_id)
        FROM dms_foro_grupos as I left join public.dms_foro_principal as pr ON pr.pri_id=I.grp_pri_id
        WHERE grp_estado = 'ACTIVO' AND I.grp_pri_id=idprincipal GROUP BY I.grp_id, I.grp_nombre_grupo, I.grp_imagen_grupo, I.grp_resgistrado, I.grp_modificado, I.grp_usuario, I.grp_estado, I.grp_nro_visto, I.grp_orden,pri_imagen_grupo
        ORDER BY I.grp_resgistrado DESC;

END;

$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION ftm_grupos_listar_web(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ftm_temas_listar(IN idgrupo integer)
  RETURNS TABLE(ftmidtema integer, ftmtema text, ftmautor text, ftmnrorespuestas integer, ftmnrovisitas integer, ftmregistro timestamp without time zone, ftmmodificacion timestamp without time zone, ftmestado text, ftmusuario text, ftmdescripciontema text, imagenperfiltema text, nrolikestema integer, ftmidgrupo integer, promediocalificacion integer) AS
$BODY$

BEGIN
  RETURN QUERY SELECT ftm_id_tema, ftm_tema, ftm_autor, (select count(*)::integer from dms_respuestas_tema where rtm_id_tema = ftm_id_tema::text) as ftm_nro_respuestas, ftm_nro_visitas, 
        ftm_registro, ftm_modificacion, ftm_estado, ftm_usuario, ftm_descripcion_tema,imagen_perfil_tema,nro_likes_tema,ftm_id_grupo,
        (ftm_estrellas/ftm_cantidad_calificacion) as promedio_calificacion
        FROM dms_foro_temas
        WHERE ftm_id_grupo = idgrupo
        ORDER BY ftm_registro DESC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION ftm_temas_listar(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION frm_listar_respuestas_por_tema_value(IN idtemaprincipal text)
  RETURNS TABLE(rtmidrespuesta integer, rtmidtema text, rtmnombrerespuesta text, rtmrespuesta text, rtmregistro timestamp without time zone, rtmmodificado timestamp without time zone, rtmestado text, rtmusuario text, rtmnro_likes integer, rtmid_respuesta_hijo integer, imagenperfilrespuesta text, rtmvalue integer) AS
$BODY$

BEGIN
    RETURN QUERY SELECT 
            rtm_id_respuesta,
            rtm_id_tema,
            rtm_nombre_respuesta,
            rtm_respuesta,
            rtm_registro,
            rtm_modificado,
            rtm_estado,
            rtm_usuario,
            rtm_nro_likes,
            rtm_id_respuesta_hijo,
            imagen_perfil_respuesta,
            rtm_value
        FROM    dms_respuestas_tema AS rsptm 
        WHERE rtm_id_tema = idtemaprincipal::text
        ORDER BY rtm_id_respuesta DESC;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION frm_listar_respuestas_por_tema_value(text)
  OWNER TO postgres;



CREATE OR REPLACE FUNCTION dms_contar_grupos_principal(idprincipal integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
      --select count(grp_pri_id)from dms_foro_grupos where grp_pri_id = idprincipal;


      RETURN QUERY select (select count(grp_pri_id)from dms_foro_grupos where grp_pri_id = idprincipal)::integer from dms_foro_grupos where grp_pri_id = idprincipal limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_contar_grupos_principal(integer)
  OWNER TO postgres;


CREATE OR REPLACE FUNCTION dms_contar_visitas_principal(idprincipal integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
      update dms_foro_principal
      set pri_nro_visto = pri_nro_visto + 1
      where pri_id = idprincipal ;

      RETURN QUERY select pri_nro_visto from dms_foro_principal where pri_id = idprincipal limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_contar_visitas_principal(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_contar_visitas_grupo(idgrupo integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
      update dms_foro_grupos
      set grp_nro_visto = grp_nro_visto +1
      where grp_id = idgrupo ;

      RETURN QUERY select grp_nro_visto from dms_foro_grupos where grp_id = idgrupo limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_contar_visitas_grupo(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_megusta_tema(idtema integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
    update dms_foro_temas
    set nro_likes_tema = nro_likes_tema +1
    where ftm_id_tema = idTema ;

      RETURN QUERY select nro_likes_tema from dms_foro_temas where ftm_id_tema = idTema limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_megusta_tema(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_contar_likes_tema(idtema integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN 
      RETURN QUERY select nro_likes_tema as likestemas from dms_foro_temas where ftm_id_tema = idtema limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_contar_likes_tema(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ftm_sumar_calificacion(
    IN nrocalificacion integer,
    IN idtemaprincipal integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN    
    UPDATE dms_foro_temas
    SET ftm_estrellas = ftm_estrellas+nrocalificacion,
        ftm_cantidad_calificacion = ftm_cantidad_calificacion+1
    WHERE ftm_id_tema = idtemaprincipal;

    RETURN QUERY select (ftm_estrellas/ftm_cantidad_calificacion) as promedio_calificacion
      from dms_foro_temas
      WHERE ftm_id_tema = idtemaprincipal;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION ftm_sumar_calificacion(integer, integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_contar_respuestas(IN ftm_id_tema integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN
  RETURN QUERY select count(*)::integer 
               from dms_respuestas_tema 
               where rtm_id_tema = ftm_id_tema::text;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_contar_respuestas(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION frm_insert_response_tema(
    rtm_id_tema_value text,
    rtm_nombre_respuesta_value text,
    rtm_respuesta_value text,
    rtm_estado_value text,
    rtm_usuario_value text,
    rtm_nro_likes_value integer,
    rtm_id_respuesta_hijo_value integer,
    imagen_perfil_respuesta_value text)
  RETURNS SETOF integer AS
$BODY$
BEGIN    
    INSERT INTO dms_respuestas_tema(rtm_id_tema,
                    rtm_nombre_respuesta,
                    rtm_respuesta,
                    rtm_estado,
                    rtm_usuario,
                    rtm_nro_likes,
                    rtm_id_respuesta_hijo,
                    imagen_perfil_respuesta,
                    rtm_value)
    VALUES (rtm_id_tema_value, 
        rtm_nombre_respuesta_value,
        rtm_respuesta_value,
        rtm_estado_value,
        rtm_usuario_value,
        rtm_nro_likes_value,
        rtm_id_respuesta_hijo_value,
        imagen_perfil_respuesta_value,
        0);
    RETURN QUERY SELECT max(dt_id) FROM _denuncia_top;  
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION frm_insert_response_tema(text, text, text, text, text, integer, integer, text)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION frm_update_increment_value(idrespuesta integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
    update dms_respuestas_tema
    set rtm_value = rtm_value + 1
    where rtm_id_respuesta = idrespuesta ;

    RETURN QUERY select rtm_value from dms_respuestas_tema where rtm_id_respuesta = idrespuesta limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION frm_update_increment_value(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_megusta_respuesta(idrespuesta integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
    update dms_respuestas_tema
    set rtm_nro_likes = rtm_nro_likes +1
    where rtm_id_respuesta = idrespuesta ;

    RETURN QUERY select rtm_nro_likes from dms_respuestas_tema where rtm_id_respuesta = idrespuesta limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_megusta_respuesta(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION frm_update_decrease_value(idrespuesta integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
    update dms_respuestas_tema
    set rtm_value = rtm_value - 1
    where rtm_id_respuesta = idrespuesta ;

    RETURN QUERY select rtm_value from dms_respuestas_tema where rtm_id_respuesta = idrespuesta limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION frm_update_decrease_value(integer)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION dms_nomegusta_respuesta(idrespuesta integer)
  RETURNS SETOF integer AS
$BODY$
BEGIN  
    update dms_respuestas_tema
    set rtm_nro_likes = rtm_nro_likes - 1
    where rtm_id_respuesta = idrespuesta ;

    RETURN QUERY select rtm_nro_likes from dms_respuestas_tema where rtm_id_respuesta = idrespuesta limit 1;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION dms_nomegusta_respuesta(integer)
  OWNER TO postgres;


