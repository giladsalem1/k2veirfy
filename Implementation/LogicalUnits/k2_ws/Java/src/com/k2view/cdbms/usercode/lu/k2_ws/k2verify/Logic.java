package com.k2view.cdbms.usercode.lu.k2_ws.k2verify;

import com.k2view.cdbms.shared.user.WebServiceUserCode;
import com.k2view.fabric.api.endpoint.Endpoint.MethodType;
import com.k2view.fabric.api.endpoint.Endpoint.Produce;
import com.k2view.fabric.api.endpoint.Endpoint.resultMetaData;
import com.k2view.fabric.api.endpoint.Endpoint.webService;
import com.k2view.fabric.api.endpoint.Endpoint.param;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.desc;
import com.k2view.cdbms.shared.utils.UserCodeDescribe.*;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;



@SuppressWarnings({ "unused", "DefaultAnnotationParam" })
public class Logic extends WebServiceUserCode {

    // Used by wsK2VerifyAgentProxyRoute to route download request to another node
    private static final String WS_AGENT_PROXY_ROUTER_URL_TEMPLATE =
            "http://%s:3213/api/wsK2VerifyAgentDownloadResource?nodeId=%s&path=%s";

    /**
     * Download file from specified node.
     *
     * @param nodeId node id where file exists
     * @param path   absolute file path on that node
     * @throws Exception
     * @author: Sathish Puram
     * @since  June 2025 - k2verify Session
     */
    @desc("")
    @webService(verb = { MethodType.GET }, elevatedPermission = false)
    
    public static void wsK2VerifyAgentDownloadResource(
            @param(description = "nodeId") String nodeId,
            @param(description = "exectuionId") String exectuionId
    ) throws Exception {

        if (nodeId == null || nodeId.trim().isEmpty())
            throw new Exception("Invalid/Null value in mandatory nodeId");
        
            if (exectuionId == null || exectuionId.trim().isEmpty())
            throw new Exception("Invalid/Null value in mandatory exectuionId");


        String fNodeId = nodeId.trim();
        String fExectuionId = exectuionId.trim();

        // Proxy if target node is not local
       
        // wsK2VerifyAgentProxyRoute(fNodeId, fPath);
        
        String fPath = (String) fabric().fetch("broadway k2_ws.bwK2VerifyDownloadFilesUpdate execution_id=?",fExectuionId).firstValue();
        HttpServletResponse httpResponse = response();
        File file = new File(fPath);

        // Validate existence and readability
        if (!file.exists()) {
            throw new Exception(String.format("File: %s not found.", fPath));
        } else if (!file.canRead()) {
            throw new Exception(String.format("File: %s has no read permission.", fPath));
        }

        // Stream file to client
        httpResponse.setContentType("application/octet-stream");
        httpResponse.setContentLengthLong(file.length());
        httpResponse.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");

        try (BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
             BufferedOutputStream out = new BufferedOutputStream(httpResponse.getOutputStream())) {

            byte[] buffer = new byte[64 * 1024];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
        }
    }

    /**
     * Route the request to correct destination/target node to fetch the data.
     */
    private static void wsK2VerifyAgentProxyRoute(String nodeId, String path) throws Exception {

        HttpServletRequest clientRequest = request();
        HttpServletResponse clientResponse = response();
        
        String targetIP = nodeId;
        log.info("*********** ip:",targetIP);
        String fileName = path.substring(path.lastIndexOf('/') + 1);

        String nodeIdEncoded = URLEncoder.encode(nodeId, StandardCharsets.UTF_8.toString());
        String pathEncoded = URLEncoder.encode(path, StandardCharsets.UTF_8.toString());

        URL targetUrl = new URI(String.format(
                WS_AGENT_PROXY_ROUTER_URL_TEMPLATE, targetIP, nodeIdEncoded, pathEncoded
        )).toURL();

        HttpURLConnection conn = (HttpURLConnection) targetUrl.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", clientRequest.getHeader("Authorization"));

        int status = conn.getResponseCode();
        if (status != HttpURLConnection.HTTP_OK) {
            clientResponse.sendError(HttpServletResponse.SC_BAD_GATEWAY,
                    "Failed to fetch file from target server.");
            return;
        }

        String contentType = conn.getContentType();
        int contentLength = conn.getContentLength();

        clientResponse.setContentType(contentType != null ? contentType : "application/octet-stream");
        clientResponse.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        if (contentLength > 0) {
            clientResponse.setContentLength(contentLength);
        }

        try (InputStream in = new BufferedInputStream(conn.getInputStream());
             OutputStream out = new BufferedOutputStream(clientResponse.getOutputStream())) {

            byte[] buffer = new byte[64 * 1024];
            int len;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
        } finally {
            conn.disconnect();
        }
    }
}
