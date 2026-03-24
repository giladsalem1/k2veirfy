package com.k2view.cdbms.usercode.common.k2verify;

import com.k2view.broadway.model.Context;
import com.k2view.broadway.model.Data;
import com.k2view.broadway.model.FlowImp;
import com.k2view.fabric.session.broadway.FabricAbstractActor;

import java.sql.SQLException;

import static com.k2view.cdbms.shared.user.UserCode.openFabricSession;

public class OpenFabricSession extends FabricAbstractActor {

    //Open new fabric session based on current thread ID
    public void fabricAction(Data input, Data output, Context context) throws SQLException {
        String sessionName = input.string("bucket_id");
        openFabricSession(sessionName);
        output.put("sessionName", sessionName);
    }
}
