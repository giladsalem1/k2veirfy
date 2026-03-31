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
import com.k2view.cdbms.jobs.JobExecutor;
import com.k2view.cdbms.shared.*;
import com.k2view.cdbms.lut.*;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.*;
import com.k2view.fabric.common.ClusterUtil;
import com.k2view.fabric.common.io.basic.IoSimpleRow;
import com.k2view.fabric.common.mtable.MTable;
import com.k2view.fabric.common.mtable.MTables;
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
import java.nio.ByteBuffer;
import org.postgresql.PGConnection;
import org.postgresql.copy.CopyManager;
import com.k2view.fabric.common.ParamConvertor;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;

@SuppressWarnings({ "unused", "DefaultAnnotationParam" })
public class SharedLogic {

    // Added Below Line to split based on the Global Delimitter
    private static String DELIMITTER = '\\' + getLuType().ludbGlobals.get("K2VERIFY_CONF_SEPARATOR");

    private static final String CATALOG_SCHEMA = "schema";
    private static final String CATALOG_TABLE = "dataset";
    private static final String CATALOG_FIELD = "field";

    @out(name = "result", type = Object.class, desc = "")
    public static ArrayList<Map<String, Object>> fnVerifySourceNTarget(Map<String, Object> sourceMap,
            Map<String, Object> targetMap,
            String source_columns_to_Ignore_null, String target_columns_to_Ignore_null, String pii_columns,
            String execution_id, String source_table_name,
            String target_table_name, String customized_key_values, String log_pass,
            String source_env_contains_sensitive_data, String target_env_contains_sensitive_data)
            throws Exception {

        ArrayList<Map<String, Object>> compareResult = new ArrayList<>();
        Set<String> piiCols = new HashSet<>(Arrays.asList(pii_columns.split(DELIMITTER)));

        LUType luType = getLuType();
        Set<String> tctin = new HashSet<>();
        for (String column : target_columns_to_Ignore_null.split(DELIMITTER)) {
            tctin.add(column.toUpperCase());
        }
        Set<String> sctin = new HashSet<>();
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
            final boolean equal;
            if (srcTrans instanceof byte[] && tarTrans instanceof byte[]) {
                equal = Arrays.equals((byte[]) srcTrans, (byte[]) tarTrans);
            } else if (srcTrans instanceof Blob && tarTrans instanceof Blob) {
                equal = compareBlobs((Blob) srcTrans, (Blob) tarTrans);
            } else if (srcTrans instanceof Clob && tarTrans instanceof Clob) {
                equal = compareClobs((Clob) srcTrans, (Clob) tarTrans);
            } else if (srcTrans instanceof ByteBuffer && tarTrans instanceof ByteBuffer) {
                ByteBuffer b1 = ((ByteBuffer) srcTrans).duplicate();
                ByteBuffer b2 = ((ByteBuffer) tarTrans).duplicate();
                if (b1.remaining() != b2.remaining()) {
                    equal = false;
                } else {
                    equal = b1.equals(b2);
                }
            } else {
                equal = (srcTrans == tarTrans) ||
                        (srcTrans != null && srcTrans.equals(tarTrans));
            }
            final boolean treatedAsEqual = equal
                    || (srcTrans != null && tarValue == null && tarIgnoreNullForCol)
                    || (srcTrans == null && tarValue != null && srcIgnoreNullForCol);

            final String matchResult;
            final String targetSecured;

            boolean bothEnvironmentsMaskedOrNot = (source_env_contains_sensitive_data.equalsIgnoreCase("true")
                    && target_env_contains_sensitive_data.equalsIgnoreCase("true"))
                    || (source_env_contains_sensitive_data.equalsIgnoreCase("false")
                            && target_env_contains_sensitive_data.equalsIgnoreCase("false"));

            if (treatedAsEqual) {
                if (piiCol && !bothEnvironmentsMaskedOrNot) {
                    matchResult = "NOT PASSED";
                    targetSecured = "false";
                    srcValue = "*";
                    tarValue = "*";
                } else {
                    matchResult = "PASSED";
                    targetSecured = "true";
                }
            } else {
                if (piiCol && !bothEnvironmentsMaskedOrNot) {
                    matchResult = "PASSED";
                    targetSecured = "true";
                    srcValue = "*";
                    // keep tarValue as-is (same as your previous behavior)
                } else {
                    matchResult = "NOT PASSED";
                    targetSecured = "false";
                }
            }

            boolean shouldLog = "true".equalsIgnoreCase(log_pass) || "NOT PASSED".equals(matchResult);
            if (shouldLog) {
                Map<String, Object> columnResult = new HashMap<>(16);
                if (tarValue == null) {
                    tarValue = "\\N";
                }
                if (srcValue == null) {
                    srcValue = "\\N";
                }

                columnResult.put("EXECUTION_ID", execution_id);
                columnResult.put("IID", 0);
                columnResult.put("SOURCE_TABLE_NAME", source_table_name);
                columnResult.put("TARGET_TABLE_NAME", target_table_name);
                columnResult.put("CUSTOMIZED_KEY", customized_key_values);
                columnResult.put("SOURCE_COLUMN_VALUE_TRANS", convertForVarchar(srcTrans));
                columnResult.put("TARGET_COLUMN_VALUE_TRANS", convertForVarchar(tarTrans));
                columnResult.put("COLUMN_NAME", colName);
                columnResult.put("SOURCE_COLUMN_VALUE", convertForVarchar(srcValue));
                columnResult.put("TARGET_COLUMN_VALUE", convertForVarchar(tarValue));
                columnResult.put("MATCH_RESULT", matchResult);
                columnResult.put("TARGET_VALUE_SECURED", targetSecured);
                compareResult.add(columnResult);
            }
        }
        return compareResult;
    }

    private static byte[] blobToBytesSafe(Blob blob) throws Exception {
        try (InputStream is = blob.getBinaryStream();
                ByteArrayOutputStream bos = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[8192];
            int read;
            while ((read = is.read(buffer)) != -1) {
                bos.write(buffer, 0, read);
            }
            return bos.toByteArray();
        }
    }

    private static String clobToStringSafe(Clob clob) throws Exception {
        try (Reader r = clob.getCharacterStream();
                StringWriter w = new StringWriter()) {

            char[] buffer = new char[8192];
            int read;
            while ((read = r.read(buffer)) != -1) {
                w.write(buffer, 0, read);
            }
            return w.toString();
        }
    }

    private static Object convertForVarchar(Object value) {
        try {
            if (value instanceof Blob) {
                Blob blob = (Blob) value;
                byte[] bytes = blob.getBytes(1, (int) blob.length());
                return Arrays.toString(bytes);
            }

            if (value instanceof byte[]) {
                return Arrays.toString((byte[]) value);
            }

            if (value instanceof Clob) {
                Clob clob = (Clob) value;
                return clob.getSubString(1, (int) clob.length());
            }
            if (value instanceof java.nio.ByteBuffer) {
                return byteBufferToHex((ByteBuffer) value);
            }

            return value;

        } catch (Exception e) {
            return "[LOB_READ_ERROR]";
        }
    }

    public static String byteBufferToHex(ByteBuffer buffer) {

        if (buffer == null)
            return null;

        ByteBuffer duplicate = buffer.duplicate();

        StringBuilder hex = new StringBuilder("0x");

        while (duplicate.hasRemaining()) {
            hex.append(String.format("%02x", duplicate.get()));
        }

        return hex.toString();
    }

    private static boolean compareBlobs(Blob b1, Blob b2) throws Exception {
        if (b1 == b2)
            return true;
        if (b1 == null || b2 == null)
            return false;
        if (b1.length() != b2.length()) {
            return false;
        }
        try {
            byte[] bufferOne = ParamConvertor.toBuffer(b1);
            byte[] bufferTwo = ParamConvertor.toBuffer(b2);
            if (Arrays.equals(bufferOne, bufferTwo)) {
                return true;
            }
        } catch (Exception e) {
            try (InputStream is1 = b1.getBinaryStream();
                    InputStream is2 = b2.getBinaryStream()) {

                byte[] buffer1 = new byte[8192];
                byte[] buffer2 = new byte[8192];
                int read1, read2;
                while ((read1 = is1.read(buffer1)) != -1) {
                    read2 = is2.read(buffer2);

                    if (read1 != read2)
                        return false;

                    for (int i = 0; i < read1; i++) {
                        if (buffer1[i] != buffer2[i]) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }

    private static boolean compareClobs(Clob c1, Clob c2) throws Exception {
        if (c1 == c2)
            return true;
        if (c1 == null || c2 == null)
            return false;
        if (c1.length() != c2.length()) {
            return false;
        }
        try {
            byte[] bufferOne = ParamConvertor.toBuffer(c1);
            byte[] bufferTwo = ParamConvertor.toBuffer(c2);
            if (Arrays.equals(bufferOne, bufferTwo)) {
                return true;
            }
        } catch (Exception e) {
            try (Reader r1 = c1.getCharacterStream();
                    Reader r2 = c2.getCharacterStream()) {

                char[] buffer1 = new char[8192];
                char[] buffer2 = new char[8192];

                int read1, read2;

                while ((read1 = r1.read(buffer1)) != -1) {
                    read2 = r2.read(buffer2);

                    if (read1 != read2)
                        return false;

                    for (int i = 0; i < read1; i++) {
                        if (buffer1[i] != buffer2[i]) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }

    @desc("Get Resporce FIle of LU fnhandleComplexDBColumns")
    @out(name = "convertedColType", type = Object.class, desc = "")
    public static Object fnhandleComplexDBColumns(String columnName,
            String dbType,
            String columnType) {

        if (dbType != null && dbType.equalsIgnoreCase("DB2 (Db)")) {

            if (columnType != null &&
                    (columnType.equalsIgnoreCase("BLOB")
                            || columnType.equalsIgnoreCase("CLOB"))) {

                // Return DB2 SHA-256 hash expression
                return "HASH(" + columnName + ", 2)";
            }
        }

        // For normal columns return as is
        return columnName;
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

    private static Map<String, Object> toLowerCaseKeys(Map<String, Object> original) {
        Map<String, Object> normalized = new HashMap<>(original.size() * 4 / 3 + 1);
        for (Map.Entry<String, Object> entry : original.entrySet()) {
            normalized.put(entry.getKey().toLowerCase(), entry.getValue());
        }
        return normalized;
    }

    public static Map<String, Map<String, Object>> fnMergeValuesNdKeysArray(
            List<Map<String, Object>> targetList,
            List<Map<String, Object>> sourceList,
            List<String> joinKeys,
            String env_prefix) {

        final int keyCount = joinKeys.size();
        final String envPrefixLower = env_prefix.toLowerCase(Locale.ROOT);

        // Lowercase the join keys once
        List<String> lowerJoinKeys = new ArrayList<>(keyCount);
        for (String key : joinKeys) {
            lowerJoinKeys.add(key.toLowerCase(Locale.ROOT));
        }

        // Precompute source-side prefixed join keys once: e.g. src_customer_id
        List<String> prefixedKeys = new ArrayList<>(keyCount);
        for (String key : lowerJoinKeys) {
            prefixedKeys.add(envPrefixLower + "_" + key);
        }

        // * Build source lookup using a normalized helper map for fast lookup,
        // * but store the ORIGINAL source map as the lookup value.
        // * This preserves downstream expectations about original key casing.

        Map<String, Map<String, Object>> sourceLookup = new HashMap<>(sourceList.size() * 4 / 3 + 1);

        for (Map<String, Object> srcOriginal : sourceList) {
            Map<String, Object> srcNormalized = toLowerCaseKeys(srcOriginal);

            StringBuilder keyBuilder = new StringBuilder();
            for (int i = 0; i < keyCount; i++) {
                Object value = srcNormalized.get(prefixedKeys.get(i));
                keyBuilder.append(value == null ? "" : value.toString());
                if (i < keyCount - 1) {
                    keyBuilder.append('\0');
                }
            }

            // Store ORIGINAL map, not normalized map
            sourceLookup.put(keyBuilder.toString(), srcOriginal);
        }

        // * Match targets to sources.
        // * Normalize each target map once for fast lookup,
        // * but do not return normalized maps downstream.

        Map<String, Map<String, Object>> result = new LinkedHashMap<>(targetList.size() * 4 / 3 + 1);

        for (Map<String, Object> tgtOriginal : targetList) {
            Map<String, Object> tgtNormalized = toLowerCaseKeys(tgtOriginal);

            Object[] values = new Object[keyCount];
            StringBuilder lookupKey = new StringBuilder();

            for (int i = 0; i < keyCount; i++) {
                values[i] = tgtNormalized.get(lowerJoinKeys.get(i));
                lookupKey.append(values[i] == null ? "" : values[i].toString());
                if (i < keyCount - 1) {
                    lookupKey.append('\0');
                }
            }

            Map<String, Object> matchedSourceOriginal = sourceLookup.get(lookupKey.toString());
            if (matchedSourceOriginal != null) {
                StringBuilder jsonKey = new StringBuilder("{");
                for (int i = 0; i < keyCount; i++) {
                    jsonKey.append("\"")
                            .append(joinKeys.get(i))
                            .append("\":\"")
                            .append(values[i] == null ? "" : values[i].toString())
                            .append("\"");
                    if (i < keyCount - 1) {
                        jsonKey.append(",");
                    }
                }
                jsonKey.append("}");

                result.put(jsonKey.toString(), matchedSourceOriginal);
            }
        }

        return result;
    }

    @out(name = "result", type = Object.class, desc = "")
    public static Set<String> fnMergeSrcTrgKeys(
            List<Map<String, Object>> rs1,
            List<Map<String, Object>> rs2) {

        final String DELIMITER = "|";

        SortedSet<String> keyNames = new TreeSet<>();
        List<Map<String, Object>> allRows = new ArrayList<>();

        for (List<Map<String, Object>> rs : new List[] { rs1, rs2 }) {
            if (rs == null)
                continue;
            for (Map<String, Object> row : rs) {
                if (row == null)
                    continue;
                keyNames.addAll(row.keySet());
                allRows.add(row);
            }
        }

        if (keyNames.isEmpty()) {
            return Collections.emptySet();
        }

        List<String> orderedKeys = new ArrayList<>(keyNames);

        Set<String> result = new LinkedHashSet<>(allRows.size() * 4 / 3 + 1);

        for (Map<String, Object> row : allRows) {
            StringBuilder sb = new StringBuilder(orderedKeys.size() * 16);
            boolean valid = true;

            for (int i = 0; i < orderedKeys.size(); i++) {
                Object val = row.get(orderedKeys.get(i));

                // Original behavior: missing key → skip entire row
                if (val == null) {
                    valid = false;
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

        return result;
    }

    public static List<String> getTableFieldsByJDBC(String dbInterfaceName, String schemaName,
            String tableName) throws SQLException {
        List<String> result = new ArrayList<>();
        DatabaseMetaData metaData = getConnection(dbInterfaceName).getMetaData();
        ResultSet primaryKeys = metaData.getPrimaryKeys(null, schemaName, tableName);
        while (primaryKeys.next()) {
            HashMap<String, String> map = new HashMap<>();
            result.add(primaryKeys.getString("COLUMN_NAME"));
        }
        if (primaryKeys != null) {
            primaryKeys.close();
        }
        return result;
    }

    public static List<String> getTableNamesByInterfaceAndSchema(
            String interfaceName,
            String schemaName,
            String envName,String dbType) throws Exception {

        String env = normalizeOrDefault(envName, "_dev");
        String schemaFilter = normalizeRequired(schemaName, "schemaName");
        String ifaceName = normalizeRequired(interfaceName, "interfaceName");

        com.k2view.cdbms.shared.user.UserCode.fabric()
                .execute("set environment='" + env + "';");

        FabricInterface iface = InterfacesManager.getInstance().getInterface(ifaceName, env);

        if (iface == null) {
            throw new RuntimeException("Interface '" + ifaceName + "' not found in environment '" + env + "'");
        }
        if (!iface.getActiveMode()) {
            throw new RuntimeException("Interface '" + ifaceName + "' is not active in environment '" + env + "'");
        }

        String interfaceType = iface.getTypeName();

        // 1) Try catalog first
        List<String> fromCatalog = getTableNamesFromCatalog(ifaceName, schemaFilter);
        if (!fromCatalog.isEmpty())
            return fromCatalog;

        // 2) Fallback to JDBC if DATABASE
        if ("DATABASE".equalsIgnoreCase(interfaceType)) {
            return getTableNamesFromJDBC(ifaceName, schemaFilter, dbType);
        }

        return Collections.emptyList();
    }

    private static List<String> getTableNamesFromCatalog(String interfaceName, String schemaFilter) throws Exception {

        Map<String, Object> key = new HashMap<>();
        key.put("dataPlatform", interfaceName);

        // If catalog_field_info is keyed by schema, this speeds it up.
        // If it isn't, mapsByKey may return empty; we still filter below in-code.
        key.put("schema", schemaFilter);

        List<Map<String, Object>> rows = MtableLookups("catalog_field_info", key, MTable.Feature.caseInsensitive);

        if (rows == null || rows.isEmpty())
            return Collections.emptyList();

        Set<String> tables = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);

        for (Map<String, Object> r : rows) {
            String schema = String.valueOf(r.get(CATALOG_SCHEMA));
            String table = String.valueOf(r.get(CATALOG_TABLE));

            if (schema == null || "null".equalsIgnoreCase(schema))
                continue;
            if (table == null || "null".equalsIgnoreCase(table) || table.isBlank())
                continue;

            if (schema.equalsIgnoreCase(schemaFilter)) {
                tables.add(table);
            }
        }

        return new ArrayList<>(tables);
    }

    // -------------------------------
    // JDBC path: DatabaseMetaData.getTables
    // -------------------------------
    private static List<String> getTableNamesFromJDBC(String interfaceName, String schemaFilter,String dbType) throws Exception {

        Set<String> tables = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);

        try (Connection conn = com.k2view.cdbms.shared.user.UserCode.getConnection(interfaceName)) {
            DatabaseMetaData md = conn.getMetaData();

            if (dbType != null && dbType.equalsIgnoreCase("mysql (db)")) {
                try (ResultSet rs = md.getTables(schemaFilter, schemaFilter, "%", new String[] { "TABLE" })) {
                    while (rs.next()) {
                        String schema = rs.getString("TABLE_SCHEM");
                        String table = rs.getString("TABLE_NAME");

                        if (table == null || table.isBlank())
                            continue;

                        // Defensive filtering for drivers that ignore schema param
                        if (schemaFilter != null && schema != null && !schema.equalsIgnoreCase(schemaFilter)) {
                            continue;
                        }

                        tables.add(table);
                    }
                }
            } else {
                try (ResultSet rs = md.getTables(null, schemaFilter, "%", new String[] { "TABLE" })) {
                    while (rs.next()) {
                        String schema = rs.getString("TABLE_SCHEM");
                        String table = rs.getString("TABLE_NAME");

                        if (table == null || table.isBlank())
                            continue;

                        // Defensive filtering for drivers that ignore schema param
                        if (schemaFilter != null && schema != null && !schema.equalsIgnoreCase(schemaFilter)) {
                            continue;
                        }

                        tables.add(table);
                    }
                }
            }
        }

        return new ArrayList<>(tables);
    }

    // -------------------------------
    // MTable lookup helper (yours)
    // -------------------------------
    public static List<Map<String, Object>> MtableLookups(
            String name,
            Map<String, Object> key,
            MTable.Feature... features) throws Exception {
        MTable mtable;
        try {
            mtable = MTables.get(name);
        } catch (Exception e) {
            return Collections.emptyList();
        }
        List<Map<String, Object>> rows = mtable.mapsByKey(key, features);
        return rows == null ? Collections.emptyList() : rows;
    }

    // -------------------------------
    // Helpers
    // -------------------------------
    private static String normalizeOrDefault(String value, String def) {
        if (value == null)
            return def;
        String s = value.trim();
        return s.isEmpty() ? def : s;
    }

    private static String normalizeRequired(String value, String name) {
        if (value == null || value.trim().isEmpty()) {
            throw new RuntimeException(name + " is required");
        }
        return value.trim();
    }

    public static List<String> fnFetchColumns(String iface, String schema, String table, String environment)
            throws Exception {
        List<String> columns = fnFetchColumnsFromCatalog(iface, schema, table);
        if (columns == null || columns.size() == 0) {
            columns = fnFetchColumnsFromJDBC(iface, schema, table, environment);
        }
        return columns;
    }

    public static List<String> fnFetchColumnsFromCatalog(String iface, String schema, String table) throws Exception {
        List<String> columns = new ArrayList<>();
        Map<String, Object> key = new HashMap<>();
        key.put("dataPlatform", iface);
        // If catalog_field_info is keyed by schema, this speeds it up.
        // If it isn't, mapsByKey may return empty; we still filter below in-code.
        key.put("schema", schema);
        key.put("dataset", table);
        List<Map<String, Object>> rows = MtableLookups("catalog_field_info", key, MTable.Feature.caseInsensitive);
        if (rows == null || rows.isEmpty())
            return Collections.emptyList();
        Set<String> tables = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        for (Map<String, Object> r : rows) {
            String _schema = String.valueOf(r.get(CATALOG_SCHEMA));
            String _table = String.valueOf(r.get(CATALOG_TABLE));
            String _field = String.valueOf(r.get(CATALOG_FIELD));
            if (_schema == null || "null".equalsIgnoreCase(_schema))
                continue;
            if (_table == null || "null".equalsIgnoreCase(_table) || _table.isBlank())
                continue;
            columns.add(_field.toUpperCase());
        }
        return columns;
    }

    public static List<String> fnFetchColumnsFromJDBC(String iface, String schema, String table, String environment)
            throws Exception {
        fabric().execute("set environment='" + environment + "';");
        DatabaseMetaData meta = getConnection(iface).getMetaData();
        List<String> columns = new ArrayList<>();
        try (ResultSet rs = meta.getColumns(null, schema, table, "%")) {
            while (rs.next()) {
                String colName = rs.getString("COLUMN_NAME");
                columns.add(colName.toUpperCase());
            }
        }
        return columns;
    }

    public static List<Map<String, Integer>> fnValidateSchema(String iface, String schema, String environment)
            throws Exception {

        fabric().execute("set environment='" + environment + "';");
        DatabaseMetaData meta = getConnection(iface).getMetaData();
        try (ResultSet rs = meta.getSchemas()) {
            while (rs.next()) {
                String s = rs.getString("TABLE_SCHEM");
                if (s != null && s.equalsIgnoreCase(schema)) {
                    Map<String, Integer> row = new HashMap<>();
                    row.put("?column?", 1);
                    List<Map<String, Integer>> result = new ArrayList<>();
                    result.add(row);
                    return result;
                }
            }
        }
        List<String> schemaList = new ArrayList<>();
        ResultSet catalogs = meta.getCatalogs();
        while (catalogs.next()) {
            String st = catalogs.getString("TABLE_CAT");
            if (st != null && st.equalsIgnoreCase(schema)) {
                Map<String, Integer> row = new HashMap<>();
                row.put("?column?", 1);
                List<Map<String, Integer>> result = new ArrayList<>();
                result.add(row);
                return result;
            }
        }
        if (catalogs != null) {
            catalogs.close();
        }

        return null; // not found
    }

    public static List<Map<String, Integer>> fnValidateTable(String iface, String schema, String table,
            String environment) throws Exception {
        fabric().execute("set environment='" + environment + "';");
        DatabaseMetaData meta = getConnection(iface).getMetaData();
        try (ResultSet rs = meta.getTables(null, schema, table, new String[] { "TABLE" })) {
            if (rs.next()) {
                Map<String, Integer> row = new HashMap<>();
                row.put("?column?", 1);
                List<Map<String, Integer>> result = new ArrayList<>();
                result.add(row);
                return result;
            }
        }
        return null; // not found
    }

    public static List<Map<String, Integer>> fnValidateColumn(String iface, String schema, String table, String column,
            String environment) throws Exception {
        fabric().execute("set environment='" + environment + "';");
        DatabaseMetaData meta = getConnection(iface).getMetaData();
        try (ResultSet rs = meta.getColumns(null, schema, table, column.toLowerCase())) {
            if (rs.next()) {
                // Column exists
                Map<String, Integer> row = new HashMap<>();
                row.put("?column?", 1);
                List<Map<String, Integer>> result = new ArrayList<>();
                result.add(row);
                return result;
            }
        }
        return null; // Column not found
    }

    public static List<String> getSchemaNamesByInterfaceAndEnv(
            String interfaceName,
            String envName) throws Exception {

        String env = normalizeOrDefault(envName, "_dev");
        String ifaceName = normalizeRequired(interfaceName, "interfaceName");

        com.k2view.cdbms.shared.user.UserCode.fabric()
                .execute("set environment='" + env + "';");

        FabricInterface iface = InterfacesManager.getInstance().getInterface(ifaceName, env);

        if (iface == null) {
            throw new RuntimeException("Interface '" + ifaceName + "' not found in environment '" + env + "'");
        }
        if (!iface.getActiveMode()) {
            throw new RuntimeException("Interface '" + ifaceName + "' is not active in environment '" + env + "'");
        }

        String interfaceType = iface.getTypeName();

        // 1) Try catalog first
        List<String> fromCatalog = getSchemaNamesFromCatalog(ifaceName);
        if (!fromCatalog.isEmpty())
            return fromCatalog;

        // 2) Fallback to JDBC if DATABASE
        if ("DATABASE".equalsIgnoreCase(interfaceType)) {
            return getSchemaNamesFromJDBC(ifaceName);
        }

        return Collections.emptyList();
    }

    // -------------------------------
    // Catalog path: catalog_field_info (distinct schema)
    // -------------------------------

    private static List<String> getSchemaNamesFromCatalog(String interfaceName) throws Exception {

        Map<String, Object> key = new HashMap<>();
        key.put("dataPlatform", interfaceName);

        List<Map<String, Object>> rows = MtableLookups("catalog_field_info", key, MTable.Feature.caseInsensitive);

        if (rows == null || rows.isEmpty())
            return Collections.emptyList();

        Set<String> schemas = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);

        for (Map<String, Object> r : rows) {
            Object sObj = r.get(CATALOG_SCHEMA);
            if (sObj == null)
                continue;

            String schema = String.valueOf(sObj);
            if (schema == null || schema.isBlank() || "null".equalsIgnoreCase(schema))
                continue;

            schemas.add(schema);
        }

        return new ArrayList<>(schemas);
    }

    // -------------------------------
    // JDBC path: DatabaseMetaData.getSchemas
    // -------------------------------

    private static List<String> getSchemaNamesFromJDBC(String dbInterfaceName) throws Exception {
        ResultSet rs = null;
        String[] types = { "TABLE" };
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            DatabaseMetaData md = getConnection(dbInterfaceName).getMetaData();
            ResultSet schemas = md.getSchemas();

            List<String> schemaList = new ArrayList<>();
            List<String> catalogList = new ArrayList<>();

            while (schemas.next()) {
                schemaList.add(schemas.getString("TABLE_SCHEM"));
            }

            if (schemaList.size() == 0) {
                ResultSet catalogs = md.getCatalogs();
                while (catalogs.next()) {
                    schemaList.add(catalogs.getString("TABLE_CAT"));
                }
                if (catalogs != null) {
                    catalogs.close();
                }
            }

            if (schemas != null) {
                schemas.close();
            }

            return schemaList;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get Meta Data of Interface " + dbInterfaceName
                    + ", with Error Message: " + e.getMessage());
        } finally {
            if (rs != null) {
                rs.close();
            }
        }
    }

    public static List<String> fnFetchColumsFromIMS(String interface_name, String schema, String table)
            throws SQLException {
        Connection conn = getConnection(interface_name);
        List<String> columnsList = RocketImsMetadata.listColumns(conn, schema, table);
        return columnsList;
    }

    @desc("Fails the current job execution without retry")
    @out(name = "failureReason", type = String.class, desc = "")
    public static void failJobWithoutRetry(String errorMessage) {
        if (errorMessage != null && !"".equals(errorMessage)) {
            JobExecutor.failJob(new Exception(errorMessage), JobExecutor.FailAnd.noRetry);
        }
    }

    @out(name = "countResult", type = long.class, desc = "")
    public static long executeQueryWithTimeout(int timeoutSeconds, String interfaceName, String schemaName,
            String tableName) throws SQLException {
        String sql = "SELECT COUNT(*) AS cnt FROM " + schemaName + "." + tableName;
        try (Connection conn = getConnection(interfaceName);
                Statement stmt = conn.createStatement()) {
            stmt.setQueryTimeout(timeoutSeconds);
            try (ResultSet rs = stmt.executeQuery(sql)) {
                if (rs.next()) {
                    return rs.getLong("cnt");
                }
                return 0;
            }
        }
    }
}