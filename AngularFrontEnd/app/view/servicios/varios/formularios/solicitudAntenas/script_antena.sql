
CREATE TABLE antena.rep_legal
(
  rpl_id   serial PRIMARY KEY,
  rpl_nit_empresa text NOT NULL,
  rpl_ci text NOT NULL,
  rpl_nombre text NOT NULL,
  rpl_paterno text NOT NULL,
  rpl_materno text NOT NULL DEFAULT ''::text,
  rpl_extension text NOT NULL,
  rpl_num_poder text NOT NULL,
  rpl_data jsonb DEFAULT '[{"ci_inverso": "", "ci_reverso": "","poder_legal": ""}]'::jsonb,
  rpl_usuario text NOT NULL,
  rpl_registrado timestamp without time zone NOT NULL DEFAULT now(),
  rpl_modificado timestamp without time zone NOT NULL DEFAULT now(),
  rpl_estado character(1) NOT NULL DEFAULT 'A'::bpchar
);


CREATE OR REPLACE FUNCTION antena.sp_get_representantes(IN nit_rep text)
  RETURNS TABLE(id_rep integer, nit text, ci text, nombre text, paterno text, materno text, ext text, numero_poder text, datarep jsonb, usuario text) AS
$BODY$

BEGIN    
    RETURN QUERY   select rpl_id,rpl_nit_empresa,rpl_ci,rpl_nombre,rpl_paterno,rpl_materno,rpl_extension,rpl_num_poder,rpl_data,rpl_usuario
         from antena.rep_legal
         where rpl_estado = 'A' and rpl_nit_empresa = nit_rep
         order by rpl_id desc;          
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

CREATE OR REPLACE FUNCTION antena.inserta_representante(
    nit text,
    ci text,
    nombre text,
    paterno text,
    materno text,
    ext text,
    numpoder text,
    datarep jsonb,
    usuario text)
  RETURNS SETOF boolean AS
$BODY$
BEGIN
   INSERT INTO antena.rep_legal(
             rpl_nit_empresa,rpl_ci,rpl_nombre,rpl_paterno,rpl_materno,rpl_extension,rpl_num_poder,rpl_data,rpl_usuario)
    VALUES (nit ,ci ,nombre ,paterno,materno,ext,numPoder ,dataRep ,usuario );
    RETURN QUERY SELECT true;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

CREATE OR REPLACE FUNCTION antena.actualiza_representante(
    id_registro integer,
    nit text,
    ci text,
    nombre text,
    paterno text,
    materno text,
    ext text,
    numpoder text,
    datarep jsonb,
    usuario text)
  RETURNS SETOF boolean AS
$BODY$

BEGIN

    UPDATE antena.rep_legal
    SET 
        rpl_nit_empresa = nit,
        rpl_ci = ci,
        rpl_nombre = nombre,
        rpl_paterno = paterno,
        rpl_materno = materno,
        rpl_extension = ext,
        rpl_num_poder = numPoder,
        rpl_data = dataRep,
        rpl_usuario = usuario
     WHERE rpl_estado = 'A' and rpl_id = id_registro;
    RETURN QUERY SELECT true;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

CREATE OR REPLACE FUNCTION antena.sp_delete_representante_id(
    id_registro integer,
    usuario text)
  RETURNS SETOF boolean AS
$BODY$

BEGIN

    UPDATE antena.rep_legal
    SET 
        rpl_estado = 'B',
        rpl_modificado = now(),
        rpl_usuario = usuario
     WHERE rpl_estado = 'A' and rpl_id = id_registro;
    RETURN QUERY SELECT true;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;