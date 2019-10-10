package com.easyPoint.Util;

public class MiniProConstants {

    //APPID是你小程序的appid,
    public static final String APPID = "wxe01ead21cec586c4";
    //SECRET是你小程序的appsercet,
    public static final String SECRET = "679aa6c79c85459b23f9a87bdd173759";
    //小程序授权的grant_type为固定值authorization_code.
    public static final String USERINFO_GRANT_TYPE = "authorization_code";
    //小程序授权获取用户的openid和session_key的请求路径
    public static final String GET_USERINFO_URL = "https://api.weixin.qq.com/sns/jscode2session";
    //消息模板发送前获取access_token的请求路径
    public static final String GET_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
    //消息模板发送的grant_type为固定值client_credential
    public static final String MESSAGE_GRANT_TYPE = "client_credential";
    //消息模板发送的请求路径
    public static final String TEMPLATE_SEND_URL = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send";

}
