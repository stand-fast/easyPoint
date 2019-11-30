package com.easyPoint.service.administrator.account.impl;

import com.easyPoint.service.administrator.account.SendMessageService;
import com.easyPoint.util.GetMessageUtil;
import com.wxapi.WxApiCall.WxApiCall;
import com.wxapi.model.RequestModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author FHJ
 * @date 2019/11/23 20:26
 */
@Service("sendMessageService")
public class SendMessageServiceImpl implements SendMessageService {
    @Override
    public void sendMessage(String phone, Integer flag) {
        RequestModel model = new RequestModel();
        model.setGwUrl("https://way.jd.com/chuangxin/dxjk");
        model.setAppkey("fa04a14d29a75d0ffa33f32c5dab2b1e");
        Map queryMap = new HashMap();
        queryMap.put("mobile", phone); //访问参数
        String verifyCode = GetMessageUtil.getMessage();
        if (flag == 1) {
            queryMap.put("content", "【易点校园】亲爱的用户，您的手机注册验证码为" + verifyCode + "，该验证码5分钟内有效。如非本人操作，请忽略此短信。"); //访问参数
        } else if (flag == 2) {
            queryMap.put("content", "【易点校园】亲爱的用户，您找回密码的验证码为" + verifyCode + "，该验证码5分钟内有效。请勿泄露于他人。"); //访问参数
        } else if (flag == 3) {
            queryMap.put("content", "【易点校园】亲爱的用户，您的登录验证码为" + verifyCode + "，该验证码5分钟内有效。请勿泄露于他人。"); //访问参数
        }
        model.setQueryParams(queryMap);
        WxApiCall call = new WxApiCall();
        call.setModel(model);
        String re = call.request();
        System.out.println(re);
    }
}
