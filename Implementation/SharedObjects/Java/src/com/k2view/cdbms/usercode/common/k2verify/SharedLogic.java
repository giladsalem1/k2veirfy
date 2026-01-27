/////////////////////////////////////////////////////////////////////////
// Project Shared Functions
/////////////////////////////////////////////////////////////////////////

package com.k2view.cdbms.usercode.common.k2verify;

import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;
import java.sql.*;

import com.k2view.cdbms.interfaces.FabricInterface;
import com.k2view.cdbms.interfaces.InterfacesUtils;
import com.k2view.cdbms.shared.*;
import com.k2view.cdbms.lut.*;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.*;
import com.k2view.fabric.common.ClusterUtil;
import com.k2view.fabric.common.io.basic.IoSimpleRow;

import static com.k2view.cdbms.shared.user.UserCode.*;
import java.math.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.*;
import com.k2view.cdbms.shared.user.UserCode;
import com.k2view.cdbms.sync.*;
import com.k2view.cdbms.shared.logging.LogEntry.*;
import com.k2view.cdbms.func.oracle.OracleToDate;
import com.k2view.broadway.lookahead.LookaheadDescribed;
import com.k2view.broadway.util.DescribedIoResult;
import com.k2view.cdbms.func.oracle.OracleRownum;
import com.k2view.fabric.events.*;
import com.k2view.fabric.fabricdb.datachange.TableDataChange;
import static com.k2view.cdbms.shared.user.ProductFunctions.*;
import static com.k2view.cdbms.shared.utils.UserCodeDescribe.FunctionType.*;
import static com.k2view.cdbms.usercode.common.SharedGlobals.*;

import org.postgresql.PGConnection;
import org.postgresql.copy.CopyManager;

import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;

@SuppressWarnings({ "unused", "DefaultAnnotationParam" })
public class SharedLogic {

    // Added Below Line to split based on the Global Delimitter
    static String DELIMITTER;
    static {
        DELIMITTER = '\\' + getLuType().ludbGlobals.get("K2VERIFY_CONF_SEPARATOR");
    }

    @out(name = "result", type = Object.class, desc = "")
    public static ArrayList<Map<String, Object>> fnVerifySourceNTarget(Map<String, Object> sourceMap,
            Map<String, Object> targetMap, String customizedKeyComparison,
            String source_columns_to_Ignore_null, String target_columns_to_Ignore_null, String sourceEnv,
            String targetEnv, String pii_columns, String execution_id, String source_table_name,
            String target_table_name, String customized_key_values, String log_pass)
            throws Exception {

        ArrayList<Map<String, Object>> compareResult = new ArrayList<>();
        List<String> piiCols = Arrays.asList(pii_columns.split(DELIMITTER));
        LUType luType = getLuType();
        List<String> tctin = new ArrayList<>();
        for (String column : target_columns_to_Ignore_null.split(DELIMITTER)) {
            tctin.add(column.toUpperCase());
        }
        List<String> sctin = new ArrayList<>();
        for (String column : source_columns_to_Ignore_null.split(DELIMITTER)) {
            sctin.add(column.toUpperCase());
        }

        for (Map.Entry<String, Object> entry : sourceMap.entrySet()) {
            final String key = entry.getKey();

            // Skip transform/orig helper keys themselves, and non-src keys
            if (key.endsWith("_ORIG") || !key.startsWith("SRC_")) {
                continue;
            }

            final String colName = key.substring(4); // remove "SRC_"
            final String colNameUpper = colName.toUpperCase(Locale.ROOT);

            final boolean piiCol = piiCols.contains(colNameUpper);

            Object srcValue = entry.getValue();
            Object tarValue = targetMap.get("TAR_" + colName);
            Object srcTrans = srcValue;
            Object tarTrans = tarValue;
            if (sourceMap.get(key + "_ORIG") != null) {
                srcValue = sourceMap.get(key + "_ORIG");
            }
            if (targetMap.get("TAR_" + colName + "_ORIG") != null) {
                tarValue = targetMap.get("TAR_" + colName + "_ORIG");
            }

            final boolean tarIgnoreNullForCol = tctin.contains(colNameUpper);
            final boolean srcIgnoreNullForCol = sctin.contains(colNameUpper);

            final boolean equal = (srcTrans == tarTrans) ||
                    (srcTrans != null && srcTrans.equals(tarTrans));

            final boolean treatedAsEqual = equal
                    || (srcTrans != null && tarValue == null && tarIgnoreNullForCol)
                    || (srcTrans == null && tarValue != null && srcIgnoreNullForCol);

            final String matchResult;
            final String targetSecured;

            // Apply your logic, but avoid overwriting TARGET_VALUE_SECURED incorrectly
            if (treatedAsEqual) {
                if (piiCol) {
                    matchResult = "NOT PASSED";
                    targetSecured = "false";
                    srcValue = "*";
                    tarValue = "*";
                } else {
                    matchResult = "PASSED";
                    targetSecured = "true";
                }
            } else {
                if (piiCol) {
                    matchResult = "PASSED";
                    targetSecured = "true";
                    srcValue = "*";
                    // keep tarValue as-is (same as your previous behavior)
                } else {
                    matchResult = "NOT PASSED";
                    targetSecured = "false";
                }
            }
            if ("false".equals(log_pass)) {
                if ("NOT PASSED".equals(matchResult)) {
                    Map<String, Object> columnResult = new HashMap<>();
                    columnResult.put("EXECUTION_ID", execution_id);
                    columnResult.put("IID", 0);
                    columnResult.put("SOURCE_TABLE_NAME", source_table_name);
                    columnResult.put("TARGET_TABLE_NAME", target_table_name);
                    columnResult.put("CUSTOMIZED_KEY", customized_key_values);
                    columnResult.put("SOURCE_COLUMN_VALUE_TRANS", srcTrans);
                    columnResult.put("SOURCE_COLUMN_VALUE_TRANS", tarTrans);
                    columnResult.put("COLUMN_NAME", colName);
                    columnResult.put("SOURCE_COLUMN_VALUE", srcValue);
                    columnResult.put("TARGET_COLUMN_VALUE", tarValue);
                    columnResult.put("MATCH_RESULT", matchResult);
                    columnResult.put("TARGET_VALUE_SECURED", targetSecured);
                    compareResult.add(columnResult);
                }
            } else {
                Map<String, Object> columnResult = new HashMap<>();
                columnResult.put("EXECUTION_ID", execution_id);
                columnResult.put("IID", 0);
                columnResult.put("SOURCE_TABLE_NAME", source_table_name);
                columnResult.put("TARGET_TABLE_NAME", target_table_name);
                columnResult.put("CUSTOMIZED_KEY", customized_key_values);
                columnResult.put("SOURCE_COLUMN_VALUE_TRANS", srcTrans);
                columnResult.put("SOURCE_COLUMN_VALUE_TRANS", tarTrans);
                columnResult.put("COLUMN_NAME", colName);
                columnResult.put("SOURCE_COLUMN_VALUE", srcValue);
                columnResult.put("TARGET_COLUMN_VALUE", tarValue);
                columnResult.put("MATCH_RESULT", matchResult);
                columnResult.put("TARGET_VALUE_SECURED", targetSecured);
                compareResult.add(columnResult);
            }
        }
        return compareResult;
    }

    private static Object getTransformedValue(String customFunctionName, LUType luType, Object columnValue)
            throws ReflectiveOperationException, InterruptedException, SQLException {
        String luName = getLuType().luName;
        if (customFunctionName != null) {
            Db.Row row = fabric()
                    .fetch(String.format("Broadway %s.%s value=?", luName, customFunctionName), columnValue).firstRow();
            columnValue = row.get("value");
            // columnValue = luType.invokeFunction(customFunctionName, null, new
            // Object[]{columnValue});
        }
        return columnValue == null ? null : columnValue.toString();
    }

    @desc("Get Resporce FIle of LU")
    @out(name = "result", type = Object.class, desc = "")
    public static Object fnLoadFromResource(String path) throws Exception {
        return loadResource(path);
    }

    @out(name = "interfaceDetails", type = Map.class, desc = "")
    public static Map<String, String> fnGetCustomInterfaceDetails(String customInterfaceName) throws Exception {
        return getCustomProperties(customInterfaceName);
    }

    private static Object getIgnoreCase(Map<String, Object> map, String key) {
        for (String k : map.keySet()) {
            if (k.equalsIgnoreCase(key)) {
                return map.get(k);
            }
        }
        return null;
    }

    public static Map<String, Map<String, Object>> fnMergeValuesNdKeysArray(
            List<Map<String, Object>> targetList,
            List<Map<String, Object>> sourceList,
            List<String> joinKeys,
            String env_prefix) {

        Map<String, Map<String, Object>> sourceLookup = new HashMap<>();

        // Build lookup for source
        for (Map<String, Object> src : sourceList) {
            StringBuilder keyBuilder = new StringBuilder();

            for (int i = 0; i < joinKeys.size(); i++) {
                String logicalKey = env_prefix + "_" + joinKeys.get(i);
                Object value = getIgnoreCase(src, logicalKey);

                keyBuilder.append(value == null ? "" : value.toString());
                if (i < joinKeys.size() - 1)
                    keyBuilder.append("_");
            }

            sourceLookup.put(keyBuilder.toString(), src);
        }

        Map<String, Map<String, Object>> result = new LinkedHashMap<>();

        for (Map<String, Object> tgt : targetList) {
            StringBuilder lookupKey = new StringBuilder();

            for (int i = 0; i < joinKeys.size(); i++) {
                Object value = getIgnoreCase(tgt, joinKeys.get(i));
                lookupKey.append(value == null ? "" : value.toString());
                if (i < joinKeys.size() - 1)
                    lookupKey.append("_");
            }

            Map<String, Object> matched = sourceLookup.get(lookupKey.toString());
            if (matched != null) {

                // Build JSON-style key
                StringBuilder jsonKey = new StringBuilder("{");
                for (int i = 0; i < joinKeys.size(); i++) {
                    String k = joinKeys.get(i);
                    Object value = getIgnoreCase(tgt, k);

                    jsonKey.append("\"")
                            .append(k)
                            .append("\":\"")
                            .append(value == null ? "" : value.toString())
                            .append("\"");

                    if (i < joinKeys.size() - 1)
                        jsonKey.append(",");
                }
                jsonKey.append("}");

                result.put(jsonKey.toString(), matched);
            }
        }

        return result;
    }

    @out(name = "result", type = Object.class, desc = "")
    public static Set<String> fnMergeSrcTrgKeys(
            List<Map<String, Object>> rs1,
            List<Map<String, Object>> rs2) {

        final String DELIMITER = "|";

        // 1) Collect all key names (deterministic ordering)
        SortedSet<String> keyNames = new TreeSet<>();
        if (rs1 != null) {
            for (Map<String, Object> row : rs1) {
                if (row != null) {
                    keyNames.addAll(row.keySet());
                }
            }
        }

        if (rs2 != null) {
            for (Map<String, Object> row : rs2) {
                if (row != null) {
                    keyNames.addAll(row.keySet());
                }
            }
        }

        if (keyNames.isEmpty()) {
            return Collections.emptySet();
        }

        List<String> orderedKeys = new ArrayList<>(keyNames);

        // 2) Build composite keys and dedupe
        Set<String> result = new LinkedHashSet<>();

        for (List<Map<String, Object>> rs : new List[] { rs1, rs2 }) {
            if (rs == null)
                continue;

            for (Map<String, Object> row : rs) {
                if (row == null)
                    continue;

                StringBuilder sb = new StringBuilder();
                boolean valid = true;

                for (int i = 0; i < orderedKeys.size(); i++) {
                    String key = orderedKeys.get(i);
                    Object val = row.get(key);

                    if (val == null) {
                        valid = false; // strict mode: missing key → skip row
                        break;
                    }

                    if (i > 0)
                        sb.append(DELIMITER);
                    sb.append(val.toString());
                }

                if (valid) {
                    result.add(sb.toString());
                }
            }
        }
        return result;
    }
}