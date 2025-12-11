package com.k2view.cdbms.usercode.common.K2Verify;

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

	@desc("Location where to store the K2Verify result tables. To store  in Fabric's Common table, use fabric")
	@category("K2VERIFY")
	public static String K2VERIFY_OPERATIONAL_INTERFACE = "K2VERIFY_OPERATIONAL_DB";
	@desc("Name of the schema where the result tables are stored. When stored in fabric Common tables, use the schema name specified in the Common table properties")
	@category("K2VERIFY")
	public static String K2VERIFY_OPERATIONAL_SCHEMA = "k2verify";
	@desc("K2VERIFY (MTable) column Delimitter.")
	@category("K2VERIFY")
	public static String K2VERIFY_CONF_SEPARATOR = "|";
	@category("K2VERIFY")		
	public static String K2VERIFY_KEYS_FETCH_SIZE = "10";
	@category("K2VERIFY")		
	public static String K2VERIFY_CQLSH_BIN_DIR = "/opt/apps/fabric/workspace/apache-cassandra-4.1.3/bin";
	@category("K2VERIFY")		
	public static String K2VERIFY_KEYS_TABLE_NAME = "keys_table";


}

