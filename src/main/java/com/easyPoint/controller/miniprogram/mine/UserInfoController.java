package com.easyPoint.controller.miniprogram.mine;


import com.easyPoint.utils.AesCbcUtil;
import com.easyPoint.utils.JwtUtil;
import com.easyPoint.pojo.user.UserInfo;
import com.easyPoint.service.miniprogram.mine.UserInfoService;
import org.apache.commons.codec.binary.Base64;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * @author FJW
 * 小程序登录授权，更改用户信息模块
 */
@SuppressWarnings("unchecked")
@Controller
@RequestMapping("/miniProgram")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @ResponseBody
    @RequestMapping("/getUserInfoAndToken")
    public Map getUserInfoAndToken( @RequestParam("code") String code, @RequestParam("encryptedData") String encryptedData, @RequestParam("iv") String iv){
        Map result = new HashMap();
        UserInfo userInfo = userInfoService.getUserInfo(code, encryptedData, iv);
        if(userInfo != null){
            //生成token，并将userInfo一起返回给小程序
            String token = JwtUtil.sign(userInfo.getUid(),userInfo.getNickName());
            result.put("code",200);
            result.put("message","授权成功");
            result.put("token",token);
            result.put("userInfo",userInfo);
            System.out.println(userInfo);
            return result;
        }else {
            result.put("code",400);
            result.put("message","授权失败");
            return result;
        }
    }

    @Test
    public void test() throws Exception{
        // 密钥32位，实际开发中不足应该补足
        String key = "Is0RmkK56t8Mn7jTtJbRhPVnp6uihzz7";
        key = Base64.encodeBase64String(key.getBytes("UTF-8"));
        System.out.println("AES密钥：" + key);
        // 偏移向量16位
        String iv = "L5RuPKJPzwUYQiHB";
        iv = Base64.encodeBase64String(iv.getBytes("UTF-8"));
        System.out.println("iv：" + iv);
        String data = "1";
        System.out.println("被加密数据原文：" + data);
        String a = AesCbcUtil.encrypt(data,key,iv,"UTF-8");
        System.out.println(a);
        a = AesCbcUtil.decrypt(a,key,iv,"UTF-8");
        System.out.println("----" + a);
    }

}
