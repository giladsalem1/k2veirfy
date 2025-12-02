package com.k2view.cdbms.usercode.common.K2Verify;

import com.k2view.broadway.model.Context;
import com.k2view.broadway.model.Data;
import com.k2view.fabric.session.broadway.FabricAbstractActor;

import static com.k2view.cdbms.shared.user.UserCode.getLuType;

public class GetLUName extends FabricAbstractActor {

    public void fabricAction(Data input, Data output, Context context) {
       output.put("lu_name", getLuType().luName);
    }
}
