package com.easyPoint.service.impl;

import com.easyPoint.util.AesCbcUtil;
import com.easyPoint.util.HttpRequestUserInfoUtil;
import com.easyPoint.util.JwtUtil;
import com.easyPoint.pojo.user.UserInfo;
import com.easyPoint.service.GetUserInfoService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GetUserInfoServiceImpl implements GetUserInfoService {

    public static final Logger log = LoggerFactory.getLogger(GetUserInfoServiceImpl.class);
    /**
     * APPID是你小程序的appid,
     * SECRET是你小程序的appsercet,
     * js_code是前台登陆成功后返回给你的code,
     * grant_type为固定值authorization_code.
     * url为请求路径
     */
    private static final String APPID = "wxe01ead21cec586c4";
    private static final String SECRET = "679aa6c79c85459b23f9a87bdd173759";
    private static final String url = "https://api.weixin.qq.com/sns/jscode2session";

    @Override
    public UserInfo getUserInfo(String code, String encryptedData, String iv) {
        String param = "appid=" + APPID + "&secret=" + SECRET + "&js_code="+code+"&grant_type=authorization_code";
        String session_key;
        //获取微信授权用户的openid和session_key
        String data = HttpRequestUserInfoUtil.sendGet(url, param);
        if(data != null && !data.equals("")){
            //解析json数据，获取openid和session_key
            ObjectMapper mapper = new ObjectMapper();
            try {
                JsonNode rootNode = mapper.readTree(data);
                String openId = rootNode.path("openid").asText();
                UserInfo userInfo = findUserInfoByOpenId(openId);
                //判断数据库中是否有该用户的信息，有则返回，无则解密用户信息，并插入数据库中
                if(userInfo != null){
                    return userInfo;
                }else {
                    session_key = rootNode.path("session_key").asText();
                    String result = AesCbcUtil.decrypt(encryptedData, session_key, iv, "UTF-8");
                    //判断解密过程是否发生错误，若result==null,则发生错误，否则解密正确
                    if(result != null){
                        //解析json数据，并插入数据库，插入无误后返回用户基本信息
                        rootNode = mapper.readTree(result);
                        userInfo = new UserInfo();
                        userInfo.setOpenId(rootNode.path("openId").asText());
                        userInfo.setNickName(rootNode.path("nickName").asText());
                        userInfo.setGender(rootNode.path("gender").asInt());
                        userInfo.setAvatarUrl(rootNode.path("avatarUrl").asText());
                        //解析完成后
                        int returnCode = insertUserInfo(userInfo);
                        //根据返回判断用户信息是否正确插入数据库,1为正确
                        if(returnCode == 1){
                            userInfo = findUserInfoByOpenId(openId);
                            return userInfo;
                        }
                        else
                            return null;
                    }else {
                        //发生错误，返回null
                        return null;
                    }
                }
            } catch (IOException e) {
                log.error("解析用户信息的Json数据出错");
                return null;
            }
        }
        return null;
    }

    @Override
    public UserInfo findUserInfoByOpenId(String openId) {
        return null;
    }

    @Override
    public Integer insertUserInfo(UserInfo userInfo) {
        return 1;
    }

    @Override
    public Integer updateUserInfo(UserInfo userInfo) {
        return 1;
    }
}
