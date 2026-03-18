package com.k2view.cdbms.usercode.common.k2verify;

import java.util.*;
import java.sql.*;
import java.math.*;
import java.io.*;
import com.k2view.cdbms.shared.*;
import com.k2view.cdbms.sync.*;
import com.k2view.cdbms.lut.*;
import com.k2view.cdbms.shared.logging.LogEntry.*;
import static com.k2view.cdbms.shared.user.UserCode.*;
import static com.k2view.cdbms.shared.utils.UserCodeDescribe.FunctionType.*;

public class RocketImsMetadata {

    
  public static List<String> listColumns(Connection conn, String schema, String table) throws SQLException {
    DatabaseMetaData meta = conn.getMetaData();
    List<Col> cols = new ArrayList<>();

    try (ResultSet rs = meta.getColumns(null, schema, table, null)) {
      while (rs.next()) {
        String colName = rs.getString("COLUMN_NAME");
        int ordinal = rs.getInt("ORDINAL_POSITION"); // Rocket usually provides it
        cols.add(new Col(ordinal, colName));
      }
    }

    cols.sort(Comparator.comparingInt(c -> c.ordinal));
    List<String> out = new ArrayList<>(cols.size());
    for (Col c : cols) out.add(c.name);
    return out;
  }

  private static class Col {
    final int ordinal;
    final String name;
    Col(int ordinal, String name) { this.ordinal = ordinal; this.name = name; }
  }
	



  
    public static void test_ims2() throws SQLException {
        Connection conn = getConnection("IMS");    
        
        printPrimaryKeys(conn, null, "DVSQL", "ACPDW802_IN");
        /*schemaExists(conn);
        tableExists();
        columnExists();
        resolveColumnCase();*/
    }

    public static void printPrimaryKeys(
            Connection conn,
            String catalog,   // usually null for Rocket
            String schema,    // try null first, then "IMS" if needed
            String tableName
    ) throws SQLException {

        DatabaseMetaData meta = conn.getMetaData();

        try (ResultSet rs = meta.getPrimaryKeys(catalog, schema, tableName)) {
            boolean found = false;
            while (rs.next()) {
                found = true;

                String tableCat   = rs.getString("TABLE_CAT");
                String tableSchem = rs.getString("TABLE_SCHEM");
                String table      = rs.getString("TABLE_NAME");
                String column     = rs.getString("COLUMN_NAME");
                short keySeq      = rs.getShort("KEY_SEQ");
                String pkName     = rs.getString("PK_NAME");

                log.info(
                    "#######  PK → " +
                    "table=" + table +
                    ", column=" + column +
                    ", seq=" + keySeq +
                    ", pkName=" + pkName +
                    ", catalog=" + tableCat +
                    ", schema=" + tableSchem
                );
            }

            if (!found) {
                log.info(
                    "NO PRIMARY KEY returned by driver for table: " + tableName
                );
            }
        }
    }

    public static boolean schemaExists(Connection c, String schema) throws SQLException {
        DatabaseMetaData m = c.getMetaData();
        try (ResultSet rs = m.getSchemas()) {
          while (rs.next()) {
            String s = rs.getString("TABLE_SCHEM");
            if (s != null && s.equalsIgnoreCase(schema)) return true;
          }
          return false;
        }
      }
    
      public static boolean tableExists(Connection c, String schema, String table) throws SQLException {
        DatabaseMetaData m = c.getMetaData();
        // types=null => all; or new String[]{"TABLE"} depending on driver
        try (ResultSet rs = m.getTables(null, schema, table, null)) {
          while (rs.next()) {
            String t = rs.getString("TABLE_NAME");
            if (t != null && t.equalsIgnoreCase(table)) return true;
          }
          return false;
        }
      }
    
      public static boolean columnExists(Connection c, String schema, String table, String column) throws SQLException {
        DatabaseMetaData m = c.getMetaData();
        try (ResultSet rs = m.getColumns(null, schema, table, null)) {
          while (rs.next()) {
            String col = rs.getString("COLUMN_NAME");
            if (col != null && col.equalsIgnoreCase(column)) return true;
          }
          return false;
        }
      }
    
      public static String resolveColumnCase(Connection c, String schema, String table, String column) throws SQLException {
        DatabaseMetaData m = c.getMetaData();
        try (ResultSet rs = m.getColumns(null, schema, table, null)) {
          while (rs.next()) {
            String col = rs.getString("COLUMN_NAME");
            if (col != null && col.equalsIgnoreCase(column)) return col; // returns actual case
          }
          return null;
        }
      }
}






