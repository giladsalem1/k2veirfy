CREATE SCHEMA IF NOT EXISTS ${@schema};

--DROP TABLE IF EXISTS ${@schema}.k2verify_field_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_field_summary (
  EXECUTION_ID character varying(200), 
  IID character varying(200), 
  SOURCE_TABLE_NAME character varying(200), 
  TARGET_TABLE_NAME character varying(200), 
  CUSTOMIZED_KEY character varying(1000), 
  COLUMN_NAME character varying(200), 
  MATCH_RESULT character varying(50), 
  TARGET_VALUE_SECURED character varying(50), 
  SOURCE_COLUMN_VALUE character varying(1000), 
  TARGET_COLUMN_VALUE character varying(1000), 
  SOURCE_COLUMN_VALUE_TRANS character varying(1000), 
  TARGET_COLUMN_VALUE_TRANS character varying(1000), 
  BW_TRANSFORMATION_FLOW boolean, 
  NULL_COMPARE boolean, 
  LOOKUP boolean, 
  DEFAULT_VALUE boolean, 
  PRIMARY KEY(
    EXECUTION_ID, IID, SOURCE_TABLE_NAME, 
    TARGET_TABLE_NAME, CUSTOMIZED_KEY, 
    COLUMN_NAME
  )
);

CREATE INDEX IF NOT EXISTS IID_FIELD_SUMMARY_IDX ON ${@schema}.k2verify_field_summary (iid);

--DROP TABLE IF EXISTS ${@schema}.k2verify_entity_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_entity_summary (
  EXECUTION_ID character varying(200), 
  IID character varying(200), 
  NUMBER_OF_FIELDS_MATCH integer, 
  NUMBER_OF_FIELDS_MISMATCH integer, 
  NUMBER_OF_FIELDS_ONLY_IN_SOURCE integer, 
  NUMBER_OF_FIELDS_ONLY_IN_TARGET integer, 
  NUMBER_OF_FIELDS_UNSECURED_IN_TARGET integer, 
  NUMBER_OF_RECORDS_MATCH integer, 
  NUMBER_OF_RECORDS_MISMATCH integer, 
  NUMBER_OF_RECORDS_UNSECURED_IN_TARGET integer, 
  MATCH_RESULT character varying(200), 
UPDATE_TIME timestamp, 
  PRIMARY KEY(EXECUTION_ID, IID)
);

CREATE INDEX IF NOT EXISTS IID_ENTITY_SUMMARY_IDX ON ${@schema}.k2verify_entity_summary (iid, update_time);

--DROP TABLE IF EXISTS ${@schema}.k2verify_record_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_record_summary (
  EXECUTION_ID character varying(200), 
  IID character varying(200), 
  SOURCE_TABLE_NAME character varying(200), 
  TARGET_TABLE_NAME character varying(200), 
  CUSTOMIZED_KEY character varying(1000), 
  NUMBER_OF_FIELDS_MATCH integer, 
  NUMBER_OF_FIELDS_MISMATCH integer, 
  NUMBER_OF_FIELDS_ONLY_IN_SOURCE integer, 
  NUMBER_OF_FIELDS_ONLY_IN_TARGET integer, 
  NUMBER_OF_FIELDS_UNSECURED_IN_TARGET integer, 
  MATCH_RESULT character varying(200), 
  PRIMARY KEY(
    EXECUTION_ID, IID, SOURCE_TABLE_NAME, 
    TARGET_TABLE_NAME, CUSTOMIZED_KEY
  )
);

CREATE INDEX IF NOT EXISTS IID_RECORD_SUMMARY_IDX ON ${@schema}.k2verify_record_summary (iid);

--DROP TABLE IF EXISTS ${@schema}.k2verify_table_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_table_summary (
  EXECUTION_ID text, 
  IID text, 
  SOURCE_TABLE_NAME text, 
  TARGET_TABLE_NAME text, 
  NUMBER_OF_RECORDS_MATCH integer, 
  NUMBER_OF_RECORDS_MISMATCH integer, 
  NUMBER_OF_RECORDS_ONLY_IN_SOURCE integer, 
  NUMBER_OF_RECORDS_ONLY_IN_TARGET integer, 
  NUMBER_OF_RECORDS_UNSECURED_IN_TARGET integer, 
  MATCH_RESULT text, 
  PRIMARY KEY(
    EXECUTION_ID, IID, SOURCE_TABLE_NAME, 
    TARGET_TABLE_NAME
  )
);

CREATE INDEX IF NOT EXISTS IID_TABLE_SUMMARY_IDX ON ${@schema}.k2verify_table_summary (iid);

--DROP VIEW IF EXISTS ${@schema}.k2verify_execution_summary;

CREATE 
OR REPLACE VIEW ${@schema}.k2verify_execution_summary AS 
SELECT 
  es.EXECUTION_ID, 
  count(es.iid) AS TOTAL_NUMBER_OF_ENTITIES, 
  (
    SELECT 
      count(*) AS TOTAL_NUMBER_OF_MATCHES 
    FROM 
      ${@schema}.k2verify_entity_summary m 
    WHERE 
      m.EXECUTION_ID :: text = es.EXECUTION_ID :: text 
      AND m.MATCH_RESULT :: text = 'Match' :: text
  ) AS TOTAL_NUMBER_OF_MATCHES, 
  (
    SELECT 
      count(*) AS TOTAL_NUMBER_OF_MATCHES 
    FROM 
      ${@schema}.k2verify_entity_summary mm 
    WHERE 
      mm.EXECUTION_ID :: text = es.EXECUTION_ID :: text 
      AND mm.MATCH_RESULT :: text = 'Mismatch' :: text
  ) AS TOTAL_NUMBER_OF_MISMATCHES, 
  (
    (
      SELECT 
        count(*) AS TOTAL_NUMBER_OF_MATCHES 
      FROM 
        ${@schema}.k2verify_entity_summary m 
      WHERE 
        m.EXECUTION_ID :: text = es.EXECUTION_ID :: text 
        AND m.MATCH_RESULT :: text = 'Match' :: text
    )
  ):: numeric / (
    count(es.IID):: numeric + 0.0000001
  ) * 100 :: numeric AS MATCH_RATE 
FROM 
  ${@schema}.k2verify_entity_summary es 
GROUP BY 
  es.EXECUTION_ID;


--DROP VIEW IF EXISTS ${@schema}.k2verify_execution_tables_summary;

CREATE 
OR REPLACE VIEW ${@schema}.k2verify_execution_tables_summary AS 
SELECT 
  ${@schema}.k2verify_table_summary.EXECUTION_ID, 
  ${@schema}.k2verify_table_summary.SOURCE_TABLE_NAME, 
  sum(
    ${@schema}.k2verify_table_summary.NUMBER_OF_RECORDS_MATCH
  ) AS RECORDS_MATCH, 
  sum(
    ${@schema}.k2verify_table_summary.NUMBER_OF_RECORDS_MISMATCH
  ) AS RECORDS_MISMATCH, 
  sum(
    ${@schema}.k2verify_table_summary.NUMBER_OF_RECORDS_ONLY_IN_SOURCE
  ) AS RECORDS_IN_SOURCE, 
  sum(
    ${@schema}.k2verify_table_summary.NUMBER_OF_RECORDS_ONLY_IN_TARGET
  ) AS RECORDS_IN_TARGET, 
  max(${@schema}.k2verify_table_summary.MATCH_RESULT) AS MATCH_RESULT 
FROM 
  ${@schema}.k2verify_table_summary 
GROUP BY 
  ${@schema}.k2verify_table_summary.EXECUTION_ID, 
  ${@schema}.k2verify_table_summary.SOURCE_TABLE_NAME;


CREATE SEQUENCE IF NOT EXISTS ${@schema}.tasks_task_id_seq
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE SEQUENCE IF NOT EXISTS ${@schema}.task_execution_id_seq
    INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE IF NOT EXISTS ${@schema}.tasks
(
    task_id            bigint NOT NULL DEFAULT nextval('${@schema}.tasks_task_id_seq'::regclass),
    task_title         text   NOT NULL,
    task_description   text,
    task_status        text   NOT NULL DEFAULT 'Active',
    properties         text,
    source_interface   text,
    target_interface   text,
    created_by         text,
    created_at         timestamp without time zone NOT NULL DEFAULT now(),
    updated_by         text,
    updated_at         timestamp without time zone,
    CONSTRAINT tasks_pkey PRIMARY KEY (task_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS tasks_active_name_ux
    ON ${@schema}.tasks (task_title)
    WHERE task_status <> 'inactive';
CREATE INDEX IF NOT EXISTS tasks_status_taskid_idx
ON ${@schema}.tasks (lower(task_status), task_id DESC);

CREATE TABLE IF NOT EXISTS ${@schema}.task_execution
(
    execution_id       bigint NOT NULL DEFAULT nextval('${@schema}.task_execution_id_seq'::regclass),
    task_id            bigint NOT NULL,
    execution_status   text,
    start_time         timestamp without time zone,
    started_by         text,
    end_time           timestamp without time zone,
    CONSTRAINT task_execution_pk PRIMARY KEY (execution_id, task_id),
    CONSTRAINT task_execution_id_ux UNIQUE (execution_id),
    CONSTRAINT task_execution_task_fk FOREIGN KEY (task_id)
        REFERENCES ${@schema}.tasks (task_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS task_execution_taskid_execid_desc_idx
ON ${@schema}.task_execution (task_id, execution_id DESC);
CREATE INDEX IF NOT EXISTS task_execution_running_idx
ON ${@schema}.task_execution (execution_id)
INCLUDE (task_id)
WHERE lower(execution_status) NOT IN ('failed','completed','stopped','killed');


CREATE TABLE IF NOT EXISTS ${@schema}.task_execution_tables
(
    task_id            bigint NOT NULL,
    execution_id       bigint NOT NULL,
    table_name         text   NOT NULL,
    batch_id           text,
	bucket_count       int,
    status             text,
    start_time         timestamp without time zone,
    end_time           timestamp without time zone,

    CONSTRAINT task_execution_tables_fk
        FOREIGN KEY (execution_id, task_id)
        REFERENCES ${@schema}.task_execution (execution_id, task_id)
        ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT task_execution_tables_pk PRIMARY KEY (task_id, execution_id, table_name),
    CONSTRAINT task_execution_tables_ux UNIQUE (task_id, execution_id, table_name, batch_id)
);

CREATE INDEX IF NOT EXISTS task_exec_tables_fk_support_idx
ON ${@schema}.task_execution_tables (execution_id, task_id);


CREATE TABLE IF NOT EXISTS ${@schema}.task_execution_buckets
(
    task_id           bigint NOT NULL,
    execution_id      bigint NOT NULL,
    table_name        text   NOT NULL,
    bucket_id         bigint NOT NULL,
    status            text,
    total_records     numeric(20,0),
    processed_records numeric(20,0),
    failed_records    numeric(20,0),
    start_time        timestamp without time zone,
    end_time          timestamp without time zone,
    error_info        text,
    CONSTRAINT task_execution_buckets_pk
        PRIMARY KEY (task_id, execution_id, table_name, bucket_id),

    CONSTRAINT task_exec_buckets_fk FOREIGN KEY (task_id, execution_id, table_name)
        REFERENCES ${@schema}.task_execution_tables (task_id, execution_id, table_name)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS task_exec_buckets_tbl_lstatus_idx
ON ${@schema}.task_execution_buckets (task_id, execution_id, table_name, lower(status) DESC, bucket_id);