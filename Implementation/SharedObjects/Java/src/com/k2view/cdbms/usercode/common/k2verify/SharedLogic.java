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
    static final int COL_EXECUTION_ID = 0;
    static final int COL_IID = 1;
    static final int COL_SOURCE_TABLE = 2;
    static final int COL_TARGET_TABLE = 3;
    static final int COL_CUSTOMIZED_KEY = 4;
    static final int COL_COLUMN_NAME = 5;
    static final int COL_SOURCE_VALUE = 6;
    static final int COL_TARGET_VALUE = 7;
    static final int COL_MATCH_RESULT = 8;
    static final int COL_TARGET_SECURED = 9;
    static final int COL_SOURCE_ORIG = 10;
    static final int COL_TARGET_ORIG = 11;

    static final int FIELD_ROW_SIZE = 12;
    static String DELIMITTER = '\\' + getLuType().ludbGlobals.get("K2VERIFY_CONF_SEPARATOR");

    public static ArrayList<String> fnVerifySourceNTarget(
            Map<String, Object> sourceMap,
            Map<String, Object> targetMap,
            String source_columns_to_Ignore_null,
            String target_columns_to_Ignore_null,
            String sourceEnv,
            String targetEnv,
            String pii_columns,
            String execution_id,
            String source_table_name,
            String target_table_name,
            String customized_key_values,
            String log_pass) {
        // long t1 = System.nanoTime();
        List<String> piiCols = Arrays.asList(pii_columns.split(DELIMITTER));
        final Set<String> tarIgnoreNull = splitToUpperSet(target_columns_to_Ignore_null);
        final Set<String> srcIgnoreNull = splitToUpperSet(source_columns_to_Ignore_null);

        final int expected = Math.max(16, sourceMap.size());
        final ArrayList<String> result = new ArrayList<>(expected);

        final String execId = execution_id;
        final String iid = "0";
        final String srcTable = source_table_name;
        final String tarTable = target_table_name;
        final String ck = customized_key_values;

        final StringBuilder sb = new StringBuilder(512);

        for (Map.Entry<String, Object> entry : sourceMap.entrySet()) {
            final String key = entry.getKey();

            // Skip transform/orig helper keys themselves, and non-src keys
            if (key.endsWith("ORIG") || !key.startsWith("SRC_")) {
                continue;
            }

            final String colName = key.substring(4); // remove "SRC_"
            final String colNameUpper = colName.toUpperCase(Locale.ROOT);

            final boolean piiCol = piiCols.contains(colNameUpper);

            Object srcValue = entry.getValue();
            Object tarValue = targetMap.get("TAR_" + colName);

            // "TRANS" values come from *_k2orig in your current structure
            final Object srcTrans = sourceMap.get(key + "_ORIG"); // SRC_<col>_k2orig
            final Object tarTrans = targetMap.get("TAR_" + colName + "_ORIG"); // TAR_<col>_k2orig

            final boolean tarIgnoreNullForCol = tarIgnoreNull.contains(colNameUpper);
            final boolean srcIgnoreNullForCol = srcIgnoreNull.contains(colNameUpper);

            final boolean equal = (srcValue == tarValue) ||
                    (srcValue != null && srcValue.equals(tarValue));

            final boolean treatedAsEqual = equal
                    || (srcValue != null && tarValue == null && tarIgnoreNullForCol)
                    || (srcValue == null && tarValue != null && srcIgnoreNullForCol);

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
            if ("false".equalsIgnoreCase(log_pass)) {

                if ("NOT PASSED".equals(matchResult)) {
                    // Build CSV line in the exact order you requested
                    sb.setLength(0);
                    appendCsv(sb, execId);
                    appendCsv(sb, iid);
                    appendCsv(sb, srcTable);
                    appendCsv(sb, tarTable);
                    appendCsv(sb, ck);
                    appendCsv(sb, colName);
                    appendCsv(sb, matchResult);
                    appendCsv(sb, targetSecured);
                    appendCsv(sb, srcValue);
                    appendCsv(sb, tarValue);
                    appendCsv(sb, srcTrans);
                    appendCsv(sb, tarTrans, true); // last column
                    sb.append('\n');
                    result.add(sb.toString());

                }
            } else {
                sb.setLength(0);
                appendCsv(sb, execId);
                appendCsv(sb, iid);
                appendCsv(sb, srcTable);
                appendCsv(sb, tarTable);
                appendCsv(sb, ck);
                appendCsv(sb, colName);
                appendCsv(sb, matchResult);
                appendCsv(sb, targetSecured);
                appendCsv(sb, srcValue);
                appendCsv(sb, tarValue);
                appendCsv(sb, srcTrans);
                appendCsv(sb, tarTrans, true); // last column
                sb.append('\n');
                result.add(sb.toString());
            }
        }
        // long t2 = System.nanoTime();
        // long duration = t2 -t1;
        // try {
        // db("K2VERIFY_OPERATIONAL_DB_managedPG").execute("insert into
        // k2verify.k2verify_record_debug
        // (execution_id,iid,source_table_name,target_table_name,customized_key,duration)
        // values (?,?,?,?,?,?)",
        // execution_id,"0",source_table_name,target_table_name,customized_key_values,duration);
        // }
        // catch (Exception e) {
        // log.error("aaa");
        // }

        return result;
    }

    private static Set<String> splitToUpperSet(String s) {
        if (s == null || s.isBlank())
            return Collections.emptySet();
        return Arrays.stream(s.split(DELIMITTER)) // DELIMITTER = your existing delimiter
                .map(String::trim)
                .filter(x -> !x.isEmpty())
                .map(x -> x.toUpperCase(Locale.ROOT))
                .collect(Collectors.toSet());
    }

    /**
     * Appends a value as a CSV field + comma (unless last=true).
     * Escapes quotes and wraps in quotes if needed.
     */
    private static void appendCsv(StringBuilder sb, Object val) {
        appendCsv(sb, val, false);
    }

    private static void appendCsv(StringBuilder sb, Object val, boolean last) {
        String s = (val == null) ? "" : String.valueOf(val);

        boolean needsQuotes = false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"' || c == ',' || c == '\n' || c == '\r') {
                needsQuotes = true;
                break;
            }
        }

        if (needsQuotes) {
            sb.append('"');
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                if (c == '"')
                    sb.append("\"\"");
                else
                    sb.append(c);
            }
            sb.append('"');
        } else {
            sb.append(s);
        }

        if (!last)
            sb.append(',');
    }

    @out(name = "result", type = Object.class, desc = "")
    public static ArrayList<Object[]> fnVerifySourceNTargetOld(Map<String, Object> sourceMap,
            Map<String, Object> targetMap, String customizedKeyComparison,
            String source_columns_to_Ignore_null, String target_columns_to_Ignore_null, String sourceEnv,
            String targetEnv, String pii_columns, String execution_id, String source_table_name,
            String target_table_name, String customized_key_values)
            throws Exception {
        // List<String> pii_columns_arr = Arrays.asList(pii_columns.split(DELIMITTER));
        // Use Sets for O(1) contains
        final Set<String> piiCols = splitToUpperSet(pii_columns);
        final Set<String> tarIgnoreNull = splitToUpperSet(target_columns_to_Ignore_null);
        final Set<String> srcIgnoreNull = splitToUpperSet(source_columns_to_Ignore_null);

        // Estimate number of compared columns: sourceMap includes *_k2orig keys too
        final int expected = Math.max(16, sourceMap.size() / 2);
        final ArrayList<Object[]> compareResult = new ArrayList<>(expected);

        // Constants reused for every field row
        final String execId = execution_id;
        final Integer iid = 0; // keep as Integer if your pipeline expects Object
        final String srcTable = source_table_name;
        final String tarTable = target_table_name;
        final String ck = customized_key_values;

        for (Map.Entry<String, Object> entry : sourceMap.entrySet()) {
            final String key = entry.getKey();

            // Your original code skips keys that "contain _k2orig".
            // Cheaper & more accurate: skip only suffix "_k2orig".
            if (key.endsWith("_k2orig")) {
                continue;
            }

            // Expect "SRC_<col>"
            if (!key.startsWith("SRC_")) {
                continue;
            }

            final String origKey = key.substring(4); // remove "SRC_"
            final String origKeyUpper = origKey.toUpperCase(Locale.ROOT);

            final boolean piiCol = piiCols.contains(origKeyUpper);

            final Object srcValue = entry.getValue();
            final Object tarValue = targetMap.get("TAR_" + origKey);

            final Object srcOrig = sourceMap.get(key + "_k2orig");
            final Object tarOrig = targetMap.get("TAR_" + origKey + "_k2orig");

            final boolean tarIgnoreNullForCol = tarIgnoreNull.contains(origKeyUpper);
            final boolean srcIgnoreNullForCol = srcIgnoreNull.contains(origKeyUpper);

            final boolean equal = (srcValue == tarValue) ||
                    (srcValue != null && srcValue.equals(tarValue));

            final boolean treatedAsEqual = equal
                    || (srcValue != null && tarValue == null && tarIgnoreNullForCol)
                    || (srcValue == null && tarValue != null && srcIgnoreNullForCol);

            // Build Object[] row
            final Object[] row = new Object[FIELD_ROW_SIZE];
            row[COL_EXECUTION_ID] = execId;
            row[COL_IID] = iid;
            row[COL_SOURCE_TABLE] = srcTable;
            row[COL_TARGET_TABLE] = tarTable;
            row[COL_CUSTOMIZED_KEY] = ck;

            row[COL_COLUMN_NAME] = origKey;

            row[COL_SOURCE_ORIG] = srcOrig;
            row[COL_TARGET_ORIG] = tarOrig;

            row[COL_SOURCE_VALUE] = srcValue;
            row[COL_TARGET_VALUE] = tarValue;

            // Decide match + secured (also fixes the "secured overwritten" issue)
            if (treatedAsEqual) {
                if (piiCol) {
                    row[COL_MATCH_RESULT] = "NOT PASSED";
                    row[COL_TARGET_SECURED] = "false";
                    row[COL_SOURCE_VALUE] = "*";
                    row[COL_TARGET_VALUE] = "*";
                } else {
                    row[COL_MATCH_RESULT] = "PASSED";
                    row[COL_TARGET_SECURED] = "true";
                }
            } else {
                if (piiCol) {
                    // mismatch in PII means it was secured properly -> passed
                    row[COL_MATCH_RESULT] = "PASSED";
                    row[COL_TARGET_SECURED] = "true";
                    row[COL_SOURCE_VALUE] = "*";
                    // keep target value visible (same as your original)
                    row[COL_TARGET_VALUE] = tarValue;
                } else {
                    row[COL_MATCH_RESULT] = "NOT PASSED";
                    row[COL_TARGET_SECURED] = "false";
                }
            }

            compareResult.add(row);
        }

        return compareResult;
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