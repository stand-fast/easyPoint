package com.easyPoint.controller;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.user.UserInfo;
import com.easyPoint.service.GetUserInfoService;
import com.easyPoint.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;
@SuppressWarnings("unchecked")
@Controller
public class GetUserInfoController {

    @Autowired
    GetUserInfoService getUserInfoService;

    @ResponseBody
    @RequestMapping("/getUserInfoAndToken")
    public Map getUserInfoAndToken( @RequestParam("code") String code, @RequestParam("encryptedData") String encryptedData, @RequestParam("iv") String iv){
        Map result = new HashMap();
        UserInfo userInfo = getUserInfoService.getUserInfo(code, encryptedData, iv);
        if(userInfo != null){
            //生成token，并将userInfo一起返回给小程序
            String token = JwtUtil.sign(userInfo.getUid(),userInfo.getNickName());
            result.put("code",200);
            result.put("message","授权成功");
            result.put("token",token);
            result.put("userInfo",userInfo);
            return result;
        }else {
            result.put("code",400);
            result.put("message","授权失败");
            return result;
        }
    }
    @RequestMapping("/test")
    public Result test(){

        return new Result(200,"sfdasf",null);
    }
}
