CREATE SCHEMA IF NOT EXISTS ${@schema};

--DROP TABLE IF EXISTS ${@schema}.k2verify_entity_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_entity_summary (
  EXECUTION_ID bigint, 
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

--DROP TABLE IF EXISTS ${@schema}.k2verify_table_summary;

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_table_summary (
  EXECUTION_ID bigint, 
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

CREATE INDEX IF NOT EXISTS IID_TABLE_SUMMARY_IDX ON ${@schema}.k2verify_table_summary (execution_id, source_table_name);

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

CREATE TABLE IF NOT EXISTS  ${@schema}.task_table_properties
(
task_id bigint, 
source_table_name text,
target_table_name text,
table_properties text,
CONSTRAINT fk_task_ref_task
        FOREIGN KEY (task_id)
        REFERENCES ${@schema}.tasks (task_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);


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
    time_until_pk          timestamp without time zone,
    time_after_pk          timestamp without time zone,
    time_until_index          timestamp without time zone,
    time_after_index          timestamp without time zone,
    time_after_record_summary timestamp without time zone,
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

CREATE TABLE IF NOT EXISTS ${@schema}.task_execution_history
(
    execution_id       bigint NOT NULL DEFAULT nextval('${@schema}.task_execution_id_seq'::regclass),
    number_of_fields_match bigint,
    number_of_fields_mismatch   bigint,
    number_of_fields_only_in_source         bigint,
    number_of_fields_only_in_target         bigint,
    PRIMARY KEY (execution_id)

);

CREATE INDEX IF NOT EXISTS task_execution_history_taskid_execid_desc_idx
ON ${@schema}.task_execution (execution_id DESC);


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
    task_id                                  bigint NOT NULL                                       ,
    execution_id                             bigint NOT NULL                                       ,
    table_name                               text NOT NULL                                         ,
    bucket_id                                text NOT NULL                                       ,
    status                                   text                                                  ,
    total_records                            numeric(20,0)                                         ,
    total_fields                             numeric(20,0)                                         ,
    processed_records                        numeric(20,0)                                         ,
    failed_records                           numeric(20,0)                                         ,
    start_time                               timestamp without time zone                           ,
    end_time                                 timestamp without time zone                           ,
    error_info                               text                                                  ,
    time_until_copy                          timestamp without time zone                           ,
    time_after_copy                          timestamp without time zone                           ,
    failed_fields                            integer                                               ,
    prepare_keys_group_duration              integer                                               ,
    create_src_statement_duration            integer                                               ,
    verify_all_keys_exists_duration          integer                                               ,
    verify_all_records_duration              integer                                               ,
    update_nx1000_records_duration           integer                                               ,
    duration_6                               integer                                               ,
    verify_source_target_data_start          timestamp without time zone                           ,
    keys_group_loop_start                    timestamp without time zone                           ,
    end_of_process                           timestamp without time zone                           ,
    select_all_records_from_source_duration  integer                                               ,
    all_src_transformation_duration          integer                                               ,
    select_all_records_from_tartget_duration integer                                               ,
    all_tar_transformation_duration          integer                                               ,
    all_src_records_map_duration             integer                                               ,
    all_tar_records_map_duration             integer                                               ,
    create_tar_statement_duration            integer                                               ,
    get_bucket_key_list_duration             integer                                               ,
    src_bucket_rows_duration                 integer                                               ,
    tar_bucket_rows_duration                 integer                                               ,
    lu_function_duration                     integer                                               ,

    CONSTRAINT task_execution_buckets_pk PRIMARY KEY (task_id, execution_id, table_name, bucket_id),
    CONSTRAINT task_exec_buckets_fk FOREIGN KEY (task_id, execution_id, table_name) REFERENCES ${@schema}.task_execution_tables (task_id, execution_id, table_name) ON
    UPDATE
      CASCADE ON
    DELETE
      CASCADE 
);


CREATE INDEX IF NOT EXISTS task_exec_buckets_tbl_lstatus_idx
ON ${@schema}.task_execution_buckets (task_id, execution_id, table_name, lower(status) DESC, bucket_id);

CREATE TABLE IF NOT EXISTS ${@schema}.verify_configuration (
    source_environment TEXT NOT NULL,
    source_interface TEXT NOT NULL,
    source_table_name TEXT NOT NULL,
    source_schema TEXT NOT NULL,
    source_transformation_flow TEXT,
    source_ignore_null_columns TEXT,
 
    target_environment TEXT NOT NULL,
    target_interface TEXT NOT NULL,
    target_table_name TEXT NOT NULL,
    target_schema TEXT NOT NULL,
    target_transformation_flow TEXT,
    target_ignore_null_columns TEXT,
 
    comparison_keys TEXT,
    pii_column_names TEXT,
    excluded_columns_names TEXT,
    active BOOLEAN DEFAULT TRUE,
    rows_filter_condition TEXT,
    column_name_mapping TEXT,
    partitions_count INTEGER,
    partitions_assignment_method TEXT,
 
    PRIMARY KEY (source_table_name, target_table_name)
);

CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_table_count  (
  source_interface  text   NOT NULL,
  source_schema     text   NOT NULL,
  source_table      text   NOT NULL,
 
  db_type           text   NULL,
  est_rows          bigint NULL,
 
  bucket_count      int    NOT NULL,
  updated_at        timestamptz NOT NULL DEFAULT now(),
 
  CONSTRAINT k2verify_k2verify_table_count_pkey
    PRIMARY KEY (source_interface, source_schema, source_table)
);


CREATE TABLE IF NOT EXISTS ${@schema}.k2verify_error_codes  (
  error_code  text   NOT NULL,
  error_desc     text   NOT NULL,
 
  CONSTRAINT k2verify_error_codes_pkey
    PRIMARY KEY (error_code)
);

insert into ${@schema}.k2verify_error_codes (error_code,error_desc) values ('EXCESSIVE_COMPARISON_FAILURES','Verify process was aborted because the number of record comparison failures exceeded the allowed limit, indicating repeated errors during the comparison stage');
--"Too many record comparisons failed during processing, causing the job to stop."        "Execution stopped after exceeding the maximum allowed number of comparison failures, indicating repeated errors during source-to-target record comparison."

insert into ${@schema}.k2verify_error_codes (error_code,error_desc) values ('EXCESSIVE_RECORD_MISMATCHES','The process was aborted because the number of mismatched records exceeded the allowed limit, indicating significant discrepancies between source and target data');
--"Too many records did not match between source and target."            "Execution stopped after exceeding the maximum allowed number of record mismatches during comparison.

insert into ${@schema}.k2verify_error_codes (error_code,error_desc) values ('DATABASE_OPERATION_FAILED','A database operation failed due to an SQL-related error, such as a missing object, timeout, permission issue, or other execution failure');

insert into ${@schema}.k2verify_error_codes (error_code,error_desc) values ('FILE_WRITE_FAILED','Failed to write data file to storage due to an I/O error, such as insufficient space, permission issues, or filesystem failure');
