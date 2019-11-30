package com.easyPoint.service.administrator.account.impl;

import com.easyPoint.service.administrator.account.IdNumVerifyService;
import com.wxapi.WxApiCall.WxApiCall;
import com.wxapi.model.RequestModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author FHJ
 * @date 2019/11/29 15:44
 */
@Service("idNumVerifyService")
public class IdNumVerifyServiceImpl implements IdNumVerifyService {
    @Override
    public void idNumVerify(String name, String idNum) {
        RequestModel model = new RequestModel();
        model.setGwUrl("https://way.jd.com/hangzhoushumaikeji/idcard_checkForCloud");
        model.setAppkey("d491c7fb8a0f050d42fc825992ed694e");
        model.setBodyStr("idcard=" + idNum + "&name=" + name);	//body参数
        Map queryMap = new HashMap();
        model.setQueryParams(queryMap);
        WxApiCall call = new WxApiCall();
        call.setModel(model);
        String re = call.request();
        System.out.println(re);
    }
}
