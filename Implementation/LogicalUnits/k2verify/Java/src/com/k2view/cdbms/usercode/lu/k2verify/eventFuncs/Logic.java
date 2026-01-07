/////////////////////////////////////////////////////////////////////////
// LU Functions
/////////////////////////////////////////////////////////////////////////

package com.k2view.cdbms.usercode.lu.k2verify.eventFuncs;

import java.util.*;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.math.*;
import java.io.*;

import com.k2view.cdbms.shared.*;
import com.k2view.cdbms.shared.Globals;
import com.k2view.cdbms.shared.user.UserCode;
import com.k2view.cdbms.sync.*;
import com.k2view.cdbms.lut.*;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.*;
import com.k2view.cdbms.shared.logging.LogEntry.*;
import com.k2view.cdbms.func.oracle.OracleToDate;
import com.k2view.cdbms.func.oracle.OracleRownum;
import com.k2view.cdbms.usercode.lu.k2verify.*;
import com.k2view.fabric.events.*;
import com.k2view.fabric.fabricdb.datachange.TableDataChange;

import static com.k2view.cdbms.shared.utils.UserCodeDescribe.FunctionType.*;
import static com.k2view.cdbms.shared.user.ProductFunctions.*;
import static com.k2view.cdbms.usercode.common.SharedLogic.*;
import static com.k2view.cdbms.usercode.lu.k2verify.Globals.*;

@SuppressWarnings({"unused", "DefaultAnnotationParam"})
public class Logic extends UserCode {
	@type(EventFunction)
    public static void fnReportBucketCompleted(EventDataContext eventDataContext) throws Exception {
        String operationalInterface = getGlobal("K2VERIFY_OPERATIONAL_INTERFACE", "k2verify") + "";
        String operationalSchema = getGlobal("K2VERIFY_OPERATIONAL_SCHEMA", "k2verify") + "";
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        db(operationalInterface).execute(
                "update "+operationalSchema+".task_execution_buckets set status='Completed' , end_time =? where task_id=? and execution_id=? and table_name=? and bucket_id=?"
                , formattedDateTime, Integer.valueOf(getGlobal("K2VERIFY_TASK_ID", "k2verify")+""),
                Integer.valueOf(getGlobal("K2VERIFY_EXEC_ID", "k2verify")+""), getGlobal("K2VERIFY_TABLE_SRC", "k2verify"),
                eventDataContext.getInstanceId().split("_@_")[1]);

    }

    @type(EventFunction)
    public static void fnReportBucketFailed(EventDataContext eventDataContext) throws Exception {
        String operationalInterface = getGlobal("K2VERIFY_OPERATIONAL_INTERFACE", "k2verify") + "";
        String operationalSchema = getGlobal("K2VERIFY_OPERATIONAL_SCHEMA", "k2verify") + "";
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        db(operationalInterface).execute(
                "update " + operationalSchema
                        + ".task_execution_buckets set status='Failed' , end_time=?, error_info=?, total_records=?, failed_records=? where task_id=? and execution_id=? and table_name=? and bucket_id=?",
                formattedDateTime, eventDataContext.getLastException().getMessage(), null, null, Integer.valueOf(getGlobal("K2VERIFY_TASK_ID", "k2verify") + ""),
                Integer.valueOf(getGlobal("K2VERIFY_EXEC_ID", "k2verify") + ""), getGlobal("K2VERIFY_TABLE_SRC", "k2verify"),
                eventDataContext.getInstanceId().split("_@_")[1]);
    }

    
}
