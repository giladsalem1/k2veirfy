package com.k2view.cdbms.usercode.common.k2verify;

import java.util.*;
import java.sql.*;
import java.math.*;
import java.io.*;
import com.k2view.cdbms.shared.*;
import com.k2view.cdbms.sync.*;
import com.k2view.cdbms.lut.*;
import com.k2view.cdbms.shared.logging.LogEntry.*;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.category;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.desc;

public class SharedGlobals {

	@desc("Location where to store the k2verify result tables. To store  in Fabric's Common table, use fabric")
	@category("K2VERIFY")
	public static String K2VERIFY_OPERATIONAL_INTERFACE = "K2VERIFY_OPERATIONAL_DB";
	@desc("Name of the schema where the result tables are stored. When stored in fabric Common tables, use the schema name specified in the Common table properties")
	@category("K2VERIFY")
	public static String K2VERIFY_OPERATIONAL_SCHEMA = "k2verify";
	@desc("K2VERIFY (MTable) column Delimitter.")
	@category("K2VERIFY")
	public static String K2VERIFY_CONF_SEPARATOR = "|";
	@category("K2VERIFY")		
	public static String K2VERIFY_KEYS_FETCH_SIZE = "1000";
	@category("K2VERIFY")		
	public static String K2VERIFY_CQLSH_BIN_DIR = "/opt/apps/fabric/workspace/apache-cassandra-4.1.3/bin";
	@category("K2VERIFY")		
	public static String K2VERIFY_KEYS_TABLE_NAME = "keys_table";
	@category("K2VERIFY")		
	public static String K2VERIFY_RESULT_FILES_PATH = "/opt/apps/fabric/workspace/verify";
	@category("K2VERIFY")		
	public static String K2VERIFY_MAX_EXECUTIONS_TO_KEEP = "1";
	 @category("K2VERIFY")  
 	public static String MIN_PROCESSED_THRESHOLD_PCT = "10";
	@category("K2VERIFY")  
	public static String MAX_COMPARISON_FAILURE_PCT = "10";
	@category("K2VERIFY")  
	public static String MAX_RECORD_MISMATCH_PCT = "10";
	@category("K2VERIFY")  
	public static String MAX_SLIDING_WINDOW_FAILURE_PCT = "10";
	@category("K2VERIFY")  
	public static String PARTITION_SIZE = "10000";
	@category("K2VERIFY")  
	public static String DEFAULT_PARTITION_COUNT = "10";

	public static String TDM_K2VERIFY_LOGPASS = "false";
    public static String TDM_K2VERIFY_PII_ONLY_COMPARISON = "false";
    public static String TDM_K2VERIFY_MAXWORKERSPERNODE = "5";
    public static String TDM_K2VERIFY_NUM_OF_BUCKETS = "5";

    public static String EXECUTE_VERIFY_TASK_ID = "";




}

