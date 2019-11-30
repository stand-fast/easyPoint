package com.easyPoint.service.template.Impl;

import com.easyPoint.util.HttpRequestUtil;
import com.easyPoint.util.MiniProConstants;
import com.easyPoint.service.template.TemplateMessageService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TemplateMessageServiceImpl implements TemplateMessageService {

    public static final Logger log = LoggerFactory.getLogger(TemplateMessageServiceImpl.class);

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    @Override
    public void sendTemplateMessage(String param) {
        //从redis中获取accessToken
        String accessToken = redisTemplate.opsForValue().get("access_token");
        //如果accessToke不为空，则发送模板消息
        if(accessToken != null && accessToken != ""){
            String url = MiniProConstants.TEMPLATE_SEND_URL + "?access_token=" + accessToken;
            System.out.println("发送模板消息");
            //发送模板消息请求
            String re = HttpRequestUtil.sendPost(url,param);
            System.out.println("放回结果："+re);
            return;
        }
        //请求获取小程序的access_token的请求参数
        String getAccessTokenParam = "grant_type=" + MiniProConstants.MESSAGE_GRANT_TYPE +
                        "&appid=" + MiniProConstants.APPID +
                        "&secret=" + MiniProConstants.SECRET;
        //发起请求，获取携带access_token的返回Json数据
        String accessTokenJson = HttpRequestUtil.sendGet(MiniProConstants.GET_ACCESS_TOKEN_URL, getAccessTokenParam);
        //解析Json数据，获取access_token
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(accessTokenJson);
            //System.out.println("jsonNode:--------"+jsonNode);
            accessToken = jsonNode.path("access_token").asText();
            //将access_token存入redis中，并设置缓存时间为7200秒
            redisTemplate.opsForValue().set("access_token",accessToken,7200, TimeUnit.SECONDS);
            System.out.println("redis缓存accessToken："+accessToken);
            //发送模板消息的请求路径
            String url = MiniProConstants.TEMPLATE_SEND_URL + "?access_token=" + accessToken;
            System.out.println("发送模板消息");
            //发送模板消息请求
            String re = HttpRequestUtil.sendPost(url,param);
            System.out.println("放回结果："+re);
        }catch (Exception e){
            log.error("解析accessToken出现异常");
        }
    }
}
