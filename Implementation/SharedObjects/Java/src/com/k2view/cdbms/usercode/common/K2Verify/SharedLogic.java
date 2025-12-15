/////////////////////////////////////////////////////////////////////////
// Project Shared Functions
/////////////////////////////////////////////////////////////////////////

package com.k2view.cdbms.usercode.common.K2Verify;

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
import org.json.JSONObject;

import static com.k2view.cdbms.shared.user.UserCode.*;
import java.math.*;
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

@SuppressWarnings({ "unused", "DefaultAnnotationParam" })
public class SharedLogic {

    // Added Below Line to split based on the Global Delimitter
    static String DELIMITTER;
    static {
        DELIMITTER = '\\' + getLuType().ludbGlobals.get("K2VERIFY_CONF_SEPARATOR");
    }

    @out(name = "result", type = Object.class, desc = "")
    public static Object fnVerifySourceNTarget(Object row, String customizedKeyComparison,
            String source_columns_to_Ignore_null, String target_columns_to_Ignore_null, String sourceEnv,
            String targetEnv, String pii_columns)
            throws Exception {
        List<String> pii_columns_arr = Arrays.asList(pii_columns.split(DELIMITTER));

        LUType luType = getLuType();

        Map<String, Object> sourceMap = new HashMap<>();
        Map<String, Object> targetMap = new HashMap<>();

        StringBuilder stringBuilder = new StringBuilder();
        LinkedHashMap<String, Object> ioSimpleRow = (LinkedHashMap) row;

        for (Map.Entry<String, Object> entryRow : ioSimpleRow.entrySet()) {
            String columnName;
            Object columnValue = entryRow.getValue();
            String customFunctionName = null;

            if (entryRow.getKey().startsWith(sourceEnv)) {
                columnName = entryRow.getKey().replaceFirst(sourceEnv + "_", "");
                sourceMap.put(columnName + "_k2orig", columnValue != null ? columnValue.toString() : null);
                sourceMap.put(columnName, columnValue == null ? null : columnValue.toString());
            } else if (entryRow.getKey().startsWith(targetEnv)) {
                columnName = entryRow.getKey().replaceFirst(targetEnv + "_", "");
                targetMap.put(columnName + "_k2orig", columnValue != null ? columnValue.toString() : null);
                targetMap.put(columnName, columnValue == null ? null : columnValue.toString());
            }
        }

        List<String> tctin = new ArrayList<>();
        for (String column : target_columns_to_Ignore_null.split(DELIMITTER)) {
            tctin.add(column.toUpperCase());
        }

        List<String> sctin = new ArrayList<>();
        for (String column : source_columns_to_Ignore_null.split(DELIMITTER)) {
            sctin.add(column.toUpperCase());
        }

        Map<String, Map<String, Object>> compareResult = new HashMap<>();
        sourceMap.forEach((key, value) -> {
            if (key.contains("_k2orig"))
                return;

            Map<String, Object> columnResult = new HashMap<>();
            columnResult.put("COLUMN_NAME", key);
            columnResult.put("SOURCE_VALUE", value);
            columnResult.put("TARGET_VALUE", targetMap.get(key));
            columnResult.put("SOURCE_COLUMN_ORIG_VALUE", sourceMap.get(key + "_k2orig"));
            columnResult.put("TARGET_COLUMN_ORIG_VALUE", targetMap.get(key + "_k2orig"));
            Object targetValue = targetMap.get(key);
            if ((value == null && targetValue == null) || (value != null && value.equals(targetValue))
                    || (value != null && targetValue == null && tctin.contains(key.toUpperCase()))
                    || (value == null && targetValue != null && sctin.contains(key))) {
                if (pii_columns_arr.contains(key.toUpperCase())) {
                    columnResult.put("RESULT", "NOT PASSED");
                    columnResult.put("TARGET_SECURED", "false");
                } else
                    columnResult.put("RESULT", "PASSED");
                    columnResult.put("TARGET_SECURED", "true");
            } else {
                if (pii_columns_arr.contains(key.toUpperCase())) {
                    columnResult.put("RESULT", "PASSED");
                    columnResult.put("TARGET_SECURED", "true");
                } else
                    columnResult.put("RESULT", "NOT PASSED");
                    columnResult.put("TARGET_SECURED", "false");
            }
            compareResult.put(key, columnResult);
        });
        targetMap.forEach((key, value) -> {
            if (key.contains("_k2orig"))
                return;

            Map<String, Object> columnResult = new HashMap<>();
            columnResult.put("COLUMN_NAME", key);
            columnResult.put("SOURCE_VALUE", sourceMap.get(key));
            columnResult.put("TARGET_VALUE", value);
            columnResult.put("SOURCE_COLUMN_ORIG_VALUE", sourceMap.get(key + "_k2orig"));
            columnResult.put("TARGET_COLUMN_ORIG_VALUE", targetMap.get(key + "_k2orig"));
            Object srcValue = sourceMap.get(key);
            if ((value == null && srcValue == null) || (value != null && value.equals(srcValue))
                    || (value != null && srcValue == null && sctin.contains(key.toUpperCase()))
                    || (value == null && srcValue != null && tctin.contains(key))) {
                if (pii_columns_arr.contains(key.toUpperCase())) {
                    columnResult.put("RESULT", "NOT PASSED");
                    columnResult.put("TARGET_SECURED", "false");
                    columnResult.put("SOURCE_VALUE", "*");
                    columnResult.put("TARGET_VALUE", "*");
                } else
                    columnResult.put("RESULT", "PASSED");
                    columnResult.put("TARGET_SECURED", "true");
            } else {
                if (pii_columns_arr.contains(key.toUpperCase())) {
                    columnResult.put("RESULT", "PASSED");
                    columnResult.put("TARGET_SECURED", "true");
                    columnResult.put("SOURCE_VALUE", "*");
                    columnResult.put("TARGET_VALUE", targetMap.get(key));
                } else
                    columnResult.put("RESULT", "NOT PASSED");
                    columnResult.put("TARGET_SECURED", "false");
            }
            compareResult.put(key, columnResult);
        });

        return compareResult;
    }

    @out(name = "customizedKey", type = String.class, desc = "")
    public static String fnGetCustomizedKey(Map<String, Object> rowMap, String customizedKey) throws Exception {
        JSONObject jsonObject = new JSONObject();
        String[] cusKeyArr = customizedKey.split(DELIMITTER);
        for (String cusKey : cusKeyArr) {
            Object cusKeyVal = rowMap.get("SRC_"+cusKey.toUpperCase());
            jsonObject.put(cusKey, cusKeyVal == null ? "" : cusKeyVal.toString());
        }

        return "[" + jsonObject.toString().substring(1, jsonObject.toString().length() - 1) + "]";
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

       public static Map<String, Map<String, Object>> fnMergeValuesNdKeysArray(
            List<Map<String, Object>> targetList,
            List<Map<String, Object>> sourceList,
            List<String> joinKeys, String env_prefix) throws Exception {

        // Lookup map for source by composite key
        Map<String, Map<String, Object>> sourceLookup = new HashMap<>();

        // Build lookup for source: uses "SRC_" + key names
        for (Map<String, Object> src : sourceList) {
            StringBuilder keyBuilder = new StringBuilder();
            for (int i = 0; i < joinKeys.size(); i++) {
                String key = joinKeys.get(i);
                Object value = src.get(env_prefix +"_" + key);
                keyBuilder.append(String.valueOf(value));
                if (i < joinKeys.size() - 1) {
                    keyBuilder.append("_");
                }
            }
            sourceLookup.put(keyBuilder.toString(), src);
        }

        // Result map: key is formatted like ["CUSTOMER_ID":"2","SSN":"3516458918"]
        Map<String, Map<String, Object>> result = new LinkedHashMap<>();

        for (Map<String, Object> tgt : targetList) {
            // Composite key for lookup
            StringBuilder lookupKey = new StringBuilder();
            for (int i = 0; i < joinKeys.size(); i++) {
                String key = joinKeys.get(i);
                Object value = tgt.get(key);
                lookupKey.append(String.valueOf(value));
                if (i < joinKeys.size() - 1) {
                    lookupKey.append("_");
                }
            }

            Map<String, Object> matched = sourceLookup.get(lookupKey.toString());
            if (matched != null) {
                // Build the pretty key: ["CUSTOMER_ID":"2","SSN":"3516458918"]
                StringBuilder jsonKey = new StringBuilder("{");
                for (int i = 0; i < joinKeys.size(); i++) {
                    String k = joinKeys.get(i);
                    Object value = tgt.get(k);
                    jsonKey.append("\"")
                           .append(k)
                           .append("\":\"")
                           .append(String.valueOf(value))
                           .append("\"");
                    if (i < joinKeys.size() - 1) jsonKey.append(",");
                }
                jsonKey.append("}");
                result.put(jsonKey.toString(), matched);
            }            
        }
        return result;
    }

}