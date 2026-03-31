/////////////////////////////////////////////////////////////////////////
// LU Functions
/////////////////////////////////////////////////////////////////////////

package com.k2view.cdbms.usercode.lu.verify.eventFuncs;

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
import com.k2view.cdbms.usercode.lu.verify.*;
import com.k2view.fabric.events.*;
import com.k2view.fabric.fabricdb.datachange.TableDataChange;

import static com.k2view.cdbms.shared.utils.UserCodeDescribe.FunctionType.*;
import static com.k2view.cdbms.shared.user.ProductFunctions.*;
import static com.k2view.cdbms.usercode.common.SharedLogic.*;
import static com.k2view.cdbms.usercode.lu.verify.Globals.*;

@SuppressWarnings({ "unused", "DefaultAnnotationParam" })
public class Logic extends UserCode {
        @type(EventFunction)
        public static void fnReportBucketCompleted(EventDataContext eventDataContext) throws Exception {
                Boolean dummyGet = Boolean.valueOf(fabric().fetch("set K2VERIFY_CSV_MODE_DUMMY_GET").firstValue() + "");
                if (dummyGet)
                        return;
                String operationalInterface = getGlobal("K2VERIFY_OPERATIONAL_INTERFACE", "verify") + "";
                String operationalSchema = getGlobal("K2VERIFY_OPERATIONAL_SCHEMA", "verify") + "";
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedDateTime = now.format(formatter);
                Integer executionId = Integer.valueOf(getGlobal("K2VERIFY_EXEC_ID", "verify") + "");
                Integer taskId = Integer.valueOf(getGlobal("K2VERIFY_TASK_ID", "verify") + "");
                Boolean isCsvMode = Boolean.valueOf(fabric().fetch("set K2VERIFY_CSV_MODE").firstValue() + "");
                String tableName = getGlobal("K2VERIFY_TABLE_SRC", "verify");
                String IID = eventDataContext.getInstanceId();
                if (isCsvMode) {
                        tableName = db(operationalInterface).fetch(
                                        "select table_name from " + operationalSchema
                                                        + ".task_execution_buckets where task_id=? and execution_id=? and bucket_id=?",
                                        taskId, executionId, IID).firstValue() + "";
                } else {
                        IID = IID.split("_@_")[1];
                }
                fabric().execute("broadway verify.bwRemoveResultFile bucket_id=?, execution_id=?, table_name=?",
                                eventDataContext.getInstanceId(), executionId, tableName);
                db(operationalInterface).execute(
                                "update " + operationalSchema
                                                + ".task_execution_buckets set status='Completed' , end_time =? where task_id=? and execution_id=? and table_name=? and bucket_id=?",
                                formattedDateTime, taskId, executionId, tableName, IID);

        }

        @type(EventFunction)
        public static void fnReportBucketFailed(EventDataContext eventDataContext) throws Exception {
                Boolean dummyGet = Boolean.valueOf(fabric().fetch("set K2VERIFY_CSV_MODE_DUMMY_GET").firstValue() + "");
                if (dummyGet)
                        return;
                String operationalInterface = getGlobal("K2VERIFY_OPERATIONAL_INTERFACE", "verify") + "";
                String operationalSchema = getGlobal("K2VERIFY_OPERATIONAL_SCHEMA", "verify") + "";
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedDateTime = now.format(formatter);
                Integer executionId = Integer.valueOf(getGlobal("K2VERIFY_EXEC_ID", "verify") + "");
                Integer taskId = Integer.valueOf(getGlobal("K2VERIFY_TASK_ID", "verify") + "");
                Boolean isCsvMode = Boolean.valueOf(fabric().fetch("set K2VERIFY_CSV_MODE").firstValue() + "");
                String tableName = getGlobal("K2VERIFY_TABLE_SRC", "verify");
                String IID = eventDataContext.getInstanceId();
                if (isCsvMode) {
                        tableName = db(operationalInterface).fetch(
                                        "select table_name from " + operationalSchema
                                                        + ".task_execution_buckets where task_id=? and execution_id=? and bucket_id=?",
                                        taskId, executionId, IID).firstValue() + "";
                } else {
                        IID = IID.split("_@_")[1];

                }
                fabric().execute("broadway verify.bwRemoveResultFile bucket_id=?, execution_id=?, table_name=?",
                                eventDataContext.getInstanceId(), executionId, tableName);
                db(operationalInterface).execute(
                                "update " + operationalSchema
                                                + ".task_execution_buckets set status='Failed' , end_time=?, error_info=?, total_records=?, failed_records=? where task_id=? and execution_id=? and table_name=? and bucket_id=?",
                                formattedDateTime, eventDataContext.getLastException().getMessage(), null, null, taskId,
                                executionId, tableName,
                                IID);

        }

}
