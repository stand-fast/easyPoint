package com.easyPoint.util;


import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 身份证验证
 *
 * @author FHJ
 * @date 2019/11/9 20:52
 */

public class IdCardVerification {

    public static void verification(String idCard, String name) {
        String host = "https://idcert.market.alicloudapi.com";
        String path = "/idcard";
        String method = "GET";
        String appCode = "0c099cd976bc480095a6f4cf38fb64ef";
        Map<String, String> headers = new HashMap();

        headers.put("Authorization", "APPCODE " + appCode);
        Map<String, String> query = new HashMap();
        query.put("idCard", idCard);
        query.put("name", name);

        try {
            HttpResponse response = HttpUtils.doGet(host, path, method, headers, query);
            //System.out.println(response.toString());如不输出json, 请打开这行代码，打印调试头部状态码。
            //状态码: 200 正常；400 URL无效；401 appCode错误； 403 次数用完； 500 API网管错误
            System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
