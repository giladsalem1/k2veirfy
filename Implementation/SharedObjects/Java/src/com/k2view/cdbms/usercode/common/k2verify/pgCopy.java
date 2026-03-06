package com.k2view.cdbms.usercode.common.k2verify;

import com.k2view.broadway.actors.builtin.DbCommand;
import com.k2view.broadway.actors.builtin.DbLoad;
import com.k2view.broadway.model.Context;
import com.k2view.broadway.model.Data;
import com.k2view.cdbms.lut.DbInterface;
import com.k2view.cdbms.lut.InterfacesManager;
import com.k2view.cdbms.shared.user.UserCode;
import com.k2view.cdbms.shared.user.UserCode;
import com.k2view.fabric.common.ParamConvertor;
import com.k2view.fabric.session.broadway.FabricAbstractActor;

import org.postgresql.PGConnection;
import org.postgresql.copy.CopyManager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import static com.k2view.cdbms.shared.user.UserCode.fabric;
import static com.k2view.cdbms.shared.user.UserCode.getActiveEnvironmentName;
import static com.k2view.cdbms.shared.user.UserCode.getConnection;
import static com.k2view.cdbms.shared.user.UserCode.getCustomProperties;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import java.nio.charset.StandardCharsets;

public class pgCopy extends FabricAbstractActor {

    public void fabricAction(Data input, Data output, Context context)
            throws SQLException, FileNotFoundException, IOException, ClassNotFoundException {

        String intr = input.string("interface");
        String fileName = input.string("file_path");
        String tableName = input.string("schema") + "." + input.string("table");

        Iterable<String> fields = input.iterableOf("fields", ParamConvertor::toString);
        boolean header = input.bool("header");
        Map<String, String> props = getPGInterfaceDetails(intr);
        String url = props.get("connectionString");
        String user = props.get("user");
        ;
        String pass = props.get("password");

        // Build "col1,col2,col3"
        StringBuilder cols = new StringBuilder();
        for (String s : fields) {
            if (s == null || s.isBlank())
                continue;
            if (cols.length() > 0)
                cols.append(",");
            cols.append(s.trim());
        }
        if (cols.length() == 0) {
            throw new IllegalArgumentException("fields list is empty - cannot build COPY column list");
        }

        // COPY SQL
        String copySql = String.format(
                "COPY %s (%s) FROM STDIN WITH (FORMAT csv, HEADER %s, NULL '')",
                tableName,
                cols,
                header ? "true" : "false");
        Class.forName("org.postgresql.Driver");
        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            // COPY must not run inside a transaction
            if (!conn.getAutoCommit())
                conn.setAutoCommit(true);

            CopyManager copyManager = conn.unwrap(PGConnection.class).getCopyAPI();

            // Faster file reading
            try (Reader reader = new BufferedReader(
                    new InputStreamReader(new FileInputStream(fileName), StandardCharsets.UTF_8),
                    1 << 20 // 1MB buffer
            )) {
                long rows = copyManager.copyIn(copySql, reader);
                output.put("rows_loaded", rows);
            }
        }
    }

    private static Map<String, String> getPGInterfaceDetails(String interfaceName) {
        Map<String, String> properties = new HashMap<>();
        String activeEnvironment = getActiveEnvironmentName();
        try {
            DbInterface interfaceDetails = (DbInterface) InterfacesManager.getInstance().getInterface(interfaceName,
                    activeEnvironment);
            properties.put("user", interfaceDetails.getDbUser());
            properties.put("password", interfaceDetails.getPassword());
            properties.put("connectionString", interfaceDetails.connString + "");
        } catch (Exception e) {
            return null;
        }
        return properties;
    }
}