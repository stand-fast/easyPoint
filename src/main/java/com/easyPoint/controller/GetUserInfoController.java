package com.easyPoint.controller;

import com.easyPoint.pojo.Result;
import com.easyPoint.pojo.user.UserInfo;
import com.easyPoint.service.GetUserInfoService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GetUserInfoController {

    @Autowired
    GetUserInfoService getUserInfoService;

    @ResponseBody
        @RequestMapping("/getUserInfo")
        public Result getUserInfo(@Param("code") String code, @Param("encryptedData") String encryptedData, @Param("iv") String iv){
            Result<UserInfo> result;
            UserInfo userInfo = getUserInfoService.getUserInfo(code, encryptedData, iv);
            if(userInfo != null){
                return result = new Result<UserInfo>(200,"解析用户信息成功", userInfo);
            }else {
                return result = new Result<>(400,"解析用户信息发生错误", null);
            }


    }
}
