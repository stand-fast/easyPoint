package com.easyPoint.Util;

import jdk.internal.dynalink.beans.StaticClass;

public class MiniProConstants {

    //APPID是你小程序的appid,
    public static final String APPID = "wx1c379b39de912818";
    //SECRET是你小程序的appsercet,
    public static final String SECRET = "eebd4ee9fdcf742049711e0c158199b3";
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

    //租车消息模板id
    public static final String TOURISM_TEMPLATE_ID = "MXx5oV9hCr8BsckFe56ro3x9fsgzJU9fW1sdIP3wvx0";

    //退款数据密钥Is0RmkK56t8Mn7jTtJbRhPVnp6uihzz7
    public static final String REFUND_DATA_KEY = "SXMwUm1rSzU2dDhNbjdqVHRKYlJoUFZucDZ1aWh6ejc=";

    //退款数据偏移量L5RuPKJPzwUYQiHB
    public static final String REFUND_DATA_VI = "TDVSdVBLSlB6d1VZUWlIQg==";

}
